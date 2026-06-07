import * as knowledge from "@/content/knowledge";

export interface KnowledgeSection {
  keywords?: readonly string[];
  [key: string]: unknown;
}

const knowledgeMap = knowledge as Record<string, KnowledgeSection>;

const SYNONYMS: Record<string, string[]> = {
  "상태관리": ["zustand", "redux", "react query", "react-query", "state"],
  "아키텍처": ["설계", "구조", "architecture", "feature api", "orval"],
  "인증": ["401", "토큰", "refresh", "queue", "로그인"],
  "협업": ["소통", "커뮤니케이션", "협력", "기획자", "디자이너", "백엔드", "팀원"],
  "강점": ["채용", "장점", "가치관", "핵심 가치"],
  "해결": ["해결했나요", "해결했습니다", "극복"],
  "실패경험": ["실패 경험", "실패", "난관", "오버엔지니어링", "Rodia"],
  "소통방식": ["소통", "디자이너", "기획자", "설명", "협업"],
  "featureapi": ["feature api", "mapper", "orval", "generated type"],
  "rodia": ["design system", "토큰", "json", "zod", "orval", "로디아"],
  "storylex": ["401", "queue", "zustand", "react query", "인증", "스토리렉스", "스토리랙스"],
};

// 1. 객체에서 문자열 데이터만 추출 (기존과 동일) 깊은 데이터까지 텍스트를 추출하는 재귀 함수로 개선
function extractTextForSearch(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  
  if (Array.isArray(value)) {
    return value.map(extractTextForSearch).join(" ").toLowerCase();
  }
  
  if (typeof value === "object" && value !== null) {
    return Object.entries(value as Record<string, unknown>)
      .filter(([key]) => key !== "keywords") // keywords 메타데이터 제외
      .map(([, val]) => extractTextForSearch(val))
      .join(" ")
      .toLowerCase();
  }
  
  return "";
}

// 2. 간이 형태소 분석 (특수문자 및 흔한 조사 제거)
function normalizeToken(word: string): string {
  // 특수문자 제거 (한글, 영문, 숫자만 남김)
  let clean = word.replace(/[^\w가-힣]/g, "");
  // 문장 끝에 붙는 흔한 조사 제거
  clean = clean.replace(/(은|는|이|가|을|를|의|에|에서|로|으로|과|와|도|만|들|이나|나|랑|이랑|한테|처럼|할|해|한|하고)$/, "");
  return clean;
}

export function searchKnowledge(question: string, limit = 1): KnowledgeSection[] {
  // 3. 쿼리 전처리 (공백 유지 버전 vs 공백 제거 버전)
  const rawQuery = question.toLowerCase();
  const cleanQuery = rawQuery.replace(/[^\w\s가-힣]/g, "").trim(); // 특수문자 제거된 원문
  const noSpaceQuery = cleanQuery.replace(/\s+/g, ""); // 띄어쓰기 무시용 (동의어 매칭에 사용)

  const searchTokens = new Set<string>();

  // 4. 단어 토큰화 및 조사 제거 적용
  cleanQuery.split(/\s+/).forEach((word) => {
    const normalized = normalizeToken(word);
    if (normalized.length >= 2) searchTokens.add(normalized);
  });

  // 5. 동의어(Synonym) 맵핑 개선 (띄어쓰기 무시 매칭)
  Object.entries(SYNONYMS).forEach(([canonical, aliases]) => {
    const canonicalNoSpace = canonical.replace(/\s+/g, "");
    // 유저 질문에서 띄어쓰기를 다 붙인 상태로 동의어 키워드가 포함되어 있는지 확인
    if (noSpaceQuery.includes(canonicalNoSpace)) {
      searchTokens.add(canonicalNoSpace);
      aliases.forEach((alias) => searchTokens.add(alias.toLowerCase()));
    }
  });

  const tokensArray = Array.from(searchTokens);

  return Object.entries(knowledgeMap)
    .map(([key, section]) => {
      let score = 0;
      const titleLower = key.toLowerCase();

      // [가중치 1] 섹션명 매칭
      if (rawQuery.includes(titleLower)) {
        score += 30;
      }

      // [가중치 2] 명시적 키워드 매칭
      const keywords = section.keywords ?? [];
      keywords.forEach((keyword) => {
        const k = keyword.toLowerCase();
        if (noSpaceQuery.includes(k.replace(/\s+/g, ""))) {
          score += 15;
        }
      });

      // [가중치 3] 본문 검색
      const content = extractTextForSearch(section);
      
      // 3-1. 질문의 핵심 문구가 본문에 통째로 있을 경우 강력한 가중치 ("Feature API" 등)
      if (cleanQuery.length >= 2 && content.includes(cleanQuery)) {
        score += 20;
      }

      // 3-2. 정제된 토큰(조사 제거됨) 매칭 시 글자 길이에 비례해 점수 부여
      tokensArray.forEach((token) => {
        if (content.includes(token)) {
          // "관리를" -> "관리" (길이2) -> 3점 추가
          // "오버엔지니어링" (길이7) -> 10.5점 추가
          score += (token.length * 1.5); 
        }
      });

      return { key, section, score };
    })
    .filter((item) => item.score >= 5) // 임계점
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.section);
}