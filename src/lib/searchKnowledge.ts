import * as knowledge from "@/content/knowledge";
import type { KnowledgeSection } from "@/types/knowledge";

type KnowledgeMap = Record<string, KnowledgeSection>;

type ChatMessageLike = {
  role: string;
  content: string;
};

export interface KnowledgeSearchResult {
  id: string;
  sourceId: string;
  title: string;
  summary: string;
  explanation: string;
  tags: readonly string[];
  score: number;
}

export type SearchDebugResult = {
  rewrittenQuery: string;
  expandedQuery: string;
  results: {
    chunkId: string;
    title: string;
    score: number;
    tags: string[];
  }[];
};

export interface RetrievalOptions {
  currentTopicHint?: string | null;
  messages?: readonly ChatMessageLike[];
  minScore?: number;
}

interface KnowledgeChunk extends Omit<KnowledgeSearchResult, "score"> {
  document: string;
  tokens: string[];
}

const knowledgeMap = knowledge as KnowledgeMap;
const META_KEYS = new Set(["id", "keywords", "suggestedQuestions", "preparedAnswers"]);
const DEFAULT_MIN_SCORE = 0.75;
const HINT_BOOST = 3.2;
const BM25_K1 = 1.2;
const BM25_B = 0.75;

const STOP_WORDS = new Set([
  "about",
  "and",
  "for",
  "how",
  "the",
  "what",
  "그",
  "거",
  "것",
  "좀",
  "너",
  "나",
  "뭐",
  "무엇",
  "어떻게",
  "알려줘",
  "설명해줘",
  "궁금해",
  "해주세요",
  "해줘",
]);

const SYNONYMS: Record<string, readonly string[]> = {
  "상태관리": ["zustand", "react query", "server state", "client state", "서버 상태", "클라이언트 상태"],
  "디자인시스템": ["design system", "token", "json token", "디자인 토큰", "zod"],
  "디자인 시스템": ["design system", "token", "json token", "디자인 토큰", "zod"],
  "모노레포": ["monorepo", "pnpm", "workspace", "웹", "모바일", "동기화"],
  "api": ["orval", "openapi", "rest", "feature api", "mapper"],
  "성능": ["optimization", "caching", "memoization", "최적화"],
  "경험": ["career", "hivelab", "하이브랩", "데이터", "검수", "라벨링"],
  "자기소개": ["개발자", "정체성", "강점", "가치관", "frontend"],
  "프로젝트": ["rodia", "storylex", "portfolio ai", "아키텍처", "챗봇"],
  "문제해결": ["버그", "디버깅", "재현", "예외", "에러"],
  "문제 해결": ["버그", "디버깅", "재현", "예외", "에러"],
  "아키텍처": ["설계", "구조", "architecture", "feature api", "orval"],
  "인증": ["401", "토큰", "refresh", "queue", "로그인"],
  "동시": ["401", "refresh", "queue", "인증", "토큰", "요청"],
  "동시에": ["401", "refresh", "queue", "인증", "토큰", "요청"],
  "협업": ["소통", "커뮤니케이션", "협력", "기획자", "디자이너", "백엔드"],
  "강점": ["채용", "장점", "가치관", "핵심 가치"],
  "실패경험": ["실패 경험", "실패", "난관", "오버엔지니어링", "rodia"],
  "ai": ["claude", "codex", "gpt", "생성형", "프롬프트", "검증"],
  "만든 코드": ["code validation", "코드 검증", "교차 검증", "validation"],
  "코드 검증": ["validation", "cross validation", "교차 검증", "의사결정"],
  "rodia": ["로디아", "design system", "토큰", "json", "zod", "orval", "monorepo"],
  "storylex": ["스토리렉스", "스토리랙스", "401", "queue", "zustand", "react query", "인증"],
  "portfolio": ["portfolio ai", "챗봇", "rag", "prompt", "포트폴리오"],
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\w\s가-힣]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeToken(word: string) {
  return word
    .replace(/[^\w가-힣]/g, "")
    .replace(/(은|는|이|가|을|를|의|에|에서|로|으로|과|와|도|만|들|이나|나|랑|이랑|한테|처럼|할|해|한|하고)$/, "");
}

function tokenize(value: string) {
  return normalizeText(value)
    .split(/\s+/)
    .map(normalizeToken)
    .filter((token) => token.length >= 2 && !STOP_WORDS.has(token));
}

export function rewriteQuery(question: string, messages: readonly ChatMessageLike[] = []) {
  const normalized = question.trim();
  const compact = normalized.replace(/\s+/g, "");
  const isFollowUp = [
    "그거",
    "그건",
    "왜",
    "더",
    "자세히",
    "이어서",
    "방금",
    "아까",
    "예시",
    "결과",
    "대안",
    "어려웠던",
    "배웠",
    "과정",
  ].some((marker) => compact.includes(marker));

  if (!isFollowUp) return normalized;

  const previousUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user" && message.content !== question);

  return previousUserMessage ? `${previousUserMessage.content} ${normalized}` : normalized;
}

export function expandQuery(query: string) {
  const normalized = normalizeText(query);
  const expanded = new Set(tokenize(normalized));
  const noSpaceQuery = normalized.replace(/\s+/g, "");

  Object.entries(SYNONYMS).forEach(([term, aliases]) => {
    const normalizedTerm = normalizeText(term);
    const termNoSpace = normalizedTerm.replace(/\s+/g, "");
    if (!termNoSpace || !noSpaceQuery.includes(termNoSpace)) return;

    tokenize(normalizedTerm).forEach((token) => expanded.add(token));
    aliases.slice(0, 8).forEach((alias) => {
      tokenize(alias).forEach((token) => expanded.add(token));
    });
  });

  return Array.from(expanded);
}

function valueToText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(valueToText).filter(Boolean).join("; ");

  if (typeof value === "object" && value !== null) {
    return Object.entries(value as Record<string, unknown>)
      .filter(([key, item]) => !META_KEYS.has(key) && item != null)
      .map(([key, item]) => {
        const parsed = valueToText(item);
        return parsed ? `${key}: ${parsed}` : "";
      })
      .filter(Boolean)
      .join("\n");
  }

  return "";
}

function toTitle(path: readonly string[]) {
  return path
    .map((part) => part.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/-/g, " "))
    .join(" / ");
}

function createChunk(sourceId: string, path: readonly string[], summary: string, explanation: string, tags: readonly string[]) {
  const id = [sourceId, ...path].join(".");
  const title = toTitle(path.length > 0 ? path : [sourceId]);
  const document = [sourceId, title, summary, explanation, tags.join(" ")].filter(Boolean).join("\n");

  return {
    id,
    sourceId,
    title,
    summary,
    explanation,
    tags,
    document,
    tokens: tokenize(document),
  };
}

function collectNestedChunks(
  sourceId: string,
  path: readonly string[],
  value: unknown,
  summary: string,
  tags: readonly string[],
  chunks: KnowledgeChunk[]
) {
  if (value == null) return;

  if (typeof value === "object" && !Array.isArray(value)) {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([key, item]) => !META_KEYS.has(key) && item != null
    );
    const hasNestedObject = entries.some(([, item]) => typeof item === "object" && item !== null && !Array.isArray(item));

    if (!hasNestedObject) {
      const explanation = valueToText(value);
      if (explanation) chunks.push(createChunk(sourceId, path, summary, explanation, [...tags, ...path]));
      return;
    }

    entries.forEach(([key, item]) => {
      collectNestedChunks(sourceId, [...path, key], item, summary, [...tags, key], chunks);
    });
    return;
  }

  const explanation = valueToText(value);
  if (explanation) chunks.push(createChunk(sourceId, path, summary, explanation, [...tags, ...path]));
}

function collectChunks(section: KnowledgeSection, sourceKey: string): KnowledgeChunk[] {
  const sourceId = typeof section.id === "string" ? section.id : sourceKey;
  const sourceSummary = section.summary.trim();
  const tags = section.keywords ?? [];
  const chunks = [createChunk(sourceId, ["summary"], sourceSummary, sourceSummary, tags)];

  Object.entries(section).forEach(([key, value]) => {
    if (key === "summary" || META_KEYS.has(key) || value == null) return;
    collectNestedChunks(sourceId, [key], value, sourceSummary, [...tags, key], chunks);
  });

  return chunks;
}

const knowledgeChunks = Object.entries(knowledgeMap).flatMap(([key, section]) => collectChunks(section, key));
const averageDocumentLength =
  knowledgeChunks.reduce((sum, chunk) => sum + chunk.tokens.length, 0) / Math.max(knowledgeChunks.length, 1);
const documentFrequencies = knowledgeChunks.reduce<Record<string, number>>((acc, chunk) => {
  new Set(chunk.tokens).forEach((token) => {
    acc[token] = (acc[token] ?? 0) + 1;
  });
  return acc;
}, {});

function bm25Score(queryTokens: readonly string[], chunk: KnowledgeChunk) {
  if (queryTokens.length === 0 || chunk.tokens.length === 0) return 0;

  const termFrequencies = chunk.tokens.reduce<Record<string, number>>((acc, token) => {
    acc[token] = (acc[token] ?? 0) + 1;
    return acc;
  }, {});

  return queryTokens.reduce((score, token) => {
    const termFrequency = termFrequencies[token] ?? 0;
    if (termFrequency === 0) return score;

    const documentFrequency = documentFrequencies[token] ?? 0;
    const inverseDocumentFrequency = Math.log(
      1 + (knowledgeChunks.length - documentFrequency + 0.5) / (documentFrequency + 0.5)
    );
    const lengthNormalizer = BM25_K1 * (1 - BM25_B + BM25_B * (chunk.tokens.length / averageDocumentLength));

    return score + inverseDocumentFrequency * ((termFrequency * (BM25_K1 + 1)) / (termFrequency + lengthNormalizer));
  }, 0);
}

function rankChunks(query: string, limit: number, options: RetrievalOptions) {
  const rewrittenQuery = rewriteQuery(query, options.messages ?? []);
  const expandedTokens = expandQuery(rewrittenQuery);

  if (expandedTokens.length === 0) {
    return { rewrittenQuery, expandedTokens, results: [] as KnowledgeSearchResult[] };
  }

  const results = knowledgeChunks
    .map((chunk) => {
      const hintBoost = options.currentTopicHint && chunk.sourceId === options.currentTopicHint ? HINT_BOOST : 0;
      return {
        ...chunk,
        score: bm25Score(expandedTokens, chunk) + hintBoost,
      };
    })
    .filter((chunk) => chunk.score >= (options.minScore ?? DEFAULT_MIN_SCORE))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((chunk) => ({
      id: chunk.id,
      sourceId: chunk.sourceId,
      title: chunk.title,
      summary: chunk.summary,
      explanation: chunk.explanation,
      tags: chunk.tags,
      score: chunk.score,
    }));

  return { rewrittenQuery, expandedTokens, results };
}

export function searchKnowledge(query: string, limit = 3, options: RetrievalOptions = {}) {
  return rankChunks(query, limit, options).results;
}

export function searchKnowledgeDebug(params: {
  query: string;
  currentTopicHint?: string | null;
  messages?: readonly ChatMessageLike[];
  limit?: number;
  minScore?: number;
}): SearchDebugResult {
  const { rewrittenQuery, expandedTokens, results } = rankChunks(params.query, params.limit ?? 3, {
    currentTopicHint: params.currentTopicHint,
    messages: params.messages,
    minScore: params.minScore,
  });

  return {
    rewrittenQuery,
    expandedQuery: expandedTokens.join(" "),
    results: results.map((result) => ({
      chunkId: result.id,
      title: result.title,
      score: Number(result.score.toFixed(3)),
      tags: [...result.tags],
    })),
  };
}
