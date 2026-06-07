import { searchKnowledgeDebug } from "@/lib/searchKnowledge";

type RetrievalTestCase = {
  id: string;
  question: string;
  expectedChunkIds: string[];
  currentTopicHint?: string | null;
  description?: string;
};

type RetrievalResult = {
  id: string;
  question: string;
  currentTopicHint?: string | null;
  rewrittenQuery: string;
  expandedQuery: string;
  expectedChunkIds: string[];
  topResults: {
    rank: number;
    chunkId: string;
    title: string;
    score: number;
    tags: string[];
  }[];
  top1Passed: boolean;
  top3Passed: boolean;
  estimatedTokens: number;
  contextLength: number;
  suspectedReason?: string;
};

// Recommended quality gate:
// - Top-1 accuracy >= 70%
// - Top-3 accuracy >= 90%
// - Avg context tokens should usually stay under 1500 for this portfolio chatbot.
const testCases: RetrievalTestCase[] = [
  {
    id: "rodia-design-system-01",
    question: "Rodia 디자인 시스템은 어떻게 만들었어?",
    expectedChunkIds: ["rodia.designSystem", "rodia.summary"],
    description: "Rodia design system summary and decision",
  },
  {
    id: "rodia-design-system-02",
    question: "디자인 시스템에서 토큰은 어떤 역할이야?",
    expectedChunkIds: ["rodia.designSystem", "rodia.summary"],
  },
  {
    id: "rodia-json-token-01",
    question: "JSON token 구조를 왜 선택했어?",
    expectedChunkIds: ["rodia.designSystem", "rodia.summary"],
  },
  {
    id: "rodia-json-token-02",
    question: "웹 모바일 디자인 토큰 동기화는 어떻게 했어?",
    expectedChunkIds: ["rodia.designSystem", "rodia.monorepo", "rodia.summary"],
  },
  {
    id: "rodia-zod-01",
    question: "Zod 검증은 왜 넣었어?",
    expectedChunkIds: ["rodia.designSystem", "rodia.summary"],
  },
  {
    id: "rodia-zod-02",
    question: "토큰 스키마 오류는 어떻게 막았어?",
    expectedChunkIds: ["rodia.designSystem"],
  },
  {
    id: "rodia-monorepo-01",
    question: "모노레포를 도입한 이유는?",
    expectedChunkIds: ["rodia.monorepo"],
  },
  {
    id: "rodia-monorepo-02",
    question: "pnpm workspace는 어디에 썼어?",
    expectedChunkIds: ["rodia.monorepo"],
  },
  {
    id: "rodia-orval-01",
    question: "Orval은 왜 도입했어?",
    expectedChunkIds: ["rodia.apiArchitecture.orval"],
  },
  {
    id: "rodia-orval-02",
    question: "OpenAPI 타입 자동 생성은 어떻게 했어?",
    expectedChunkIds: ["rodia.apiArchitecture.orval"],
  },
  {
    id: "rodia-feature-api-01",
    question: "Feature API 계층은 왜 만들었어?",
    expectedChunkIds: ["rodia.apiArchitecture.featureApi"],
  },
  {
    id: "rodia-mapper-01",
    question: "mapper로 서버 응답을 변환한 이유는?",
    expectedChunkIds: ["rodia.apiArchitecture.featureApi"],
  },
  {
    id: "rodia-sync-01",
    question: "웹과 모바일 스타일을 어떻게 맞췄어?",
    expectedChunkIds: ["rodia.designSystem", "rodia.monorepo"],
  },

  {
    id: "storylex-401-01",
    question: "StoryLex 401 에러는 어떻게 해결했어?",
    expectedChunkIds: ["storylex.auth401"],
  },
  {
    id: "storylex-refresh-queue-01",
    question: "refresh token queue 구조 설명해줘",
    expectedChunkIds: ["storylex.auth401"],
  },
  {
    id: "storylex-refresh-queue-02",
    question: "동시에 여러 API 요청이 실패하면 어떻게 처리했어?",
    expectedChunkIds: ["storylex.auth401"],
  },
  {
    id: "storylex-react-query-01",
    question: "React Query는 어떤 상태를 맡겼어?",
    expectedChunkIds: ["storylex.stateManagement.separation", "storylex.stateManagement"],
  },
  {
    id: "storylex-zustand-01",
    question: "Zustand는 왜 사용했어?",
    expectedChunkIds: ["storylex.stateManagement.whyZustand", "storylex.stateManagement"],
  },
  {
    id: "storylex-state-split-01",
    question: "서버 상태와 클라이언트 상태를 분리한 기준은?",
    expectedChunkIds: ["storylex.stateManagement.separation", "storylex.stateManagement"],
  },
  {
    id: "storylex-auth-expire-01",
    question: "인증 만료 상황에서 사용자 흐름은 어떻게 지켰어?",
    expectedChunkIds: ["storylex.auth401"],
  },
  {
    id: "storylex-concurrency-01",
    question: "토큰 만료 때 동시 요청 문제는 어떻게 막았어?",
    expectedChunkIds: ["storylex.auth401"],
  },

  {
    id: "ai-codex-01",
    question: "Codex를 실무에서 어떻게 활용했어?",
    expectedChunkIds: ["ai-engineering.usage", "ai-engineering.toolDependency"],
  },
  {
    id: "ai-claude-01",
    question: "Claude CLI 같은 AI 도구를 어디에 썼어?",
    expectedChunkIds: ["ai-engineering.usage", "ai-engineering.toolDependency"],
  },
  {
    id: "ai-validation-01",
    question: "AI가 만든 코드는 어떻게 검증해?",
    expectedChunkIds: ["ai-engineering.codeValidation", "ai-engineering.decisionMaking"],
  },
  {
    id: "ai-cross-validation-01",
    question: "여러 모델 교차 검증은 왜 했어?",
    expectedChunkIds: ["ai-engineering.codeValidation", "ai-engineering.coreBeliefs"],
  },
  {
    id: "ai-developer-skill-01",
    question: "AI 시대에 개발자 역량은 뭐가 중요해?",
    expectedChunkIds: ["ai-engineering.highestValue", "ai-engineering.ultimateQuestion"],
  },
  {
    id: "ai-dependency-01",
    question: "특정 AI 도구에 의존하면 어떤 문제가 있어?",
    expectedChunkIds: ["ai-engineering.toolDependency", "ai-engineering.contingency"],
  },

  {
    id: "identity-collab-01",
    question: "협업할 때 본인 강점은 뭐야?",
    expectedChunkIds: ["identity.communicationStyle", "identity.strengths"],
  },
  {
    id: "identity-transparent-share-01",
    question: "막혔을 때 팀에 어떻게 공유해?",
    expectedChunkIds: ["identity.communicationStyle", "faq.questions"],
  },
  {
    id: "identity-data-consistency-01",
    question: "데이터 정합성을 왜 중요하게 생각해?",
    expectedChunkIds: ["identity.coreValues", "career.hivelab"],
  },
  {
    id: "career-hivelab-01",
    question: "하이브랩에서 어떤 일을 했어?",
    expectedChunkIds: ["career.hivelab"],
  },
  {
    id: "career-hivelab-02",
    question: "AI 학습 데이터 검수 경험에서 뭘 배웠어?",
    expectedChunkIds: ["career.hivelab"],
  },
  {
    id: "problem-exception-01",
    question: "예외 상황을 어떻게 통제해?",
    expectedChunkIds: ["problem-solving.summary", "problem-solving.defensiveProgramming", "problem-solving.philosophy"],
  },
  {
    id: "problem-reproduction-01",
    question: "버그를 수정하기 전에 왜 재현을 먼저 해?",
    expectedChunkIds: ["problem-solving.philosophy", "problem-solving.debuggingProcess"],
  },
  {
    id: "identity-growth-01",
    question: "오버엔지니어링을 겪고 어떻게 성장했어?",
    expectedChunkIds: ["identity.lessonsLearned", "rodia.retrospective"],
  },

  {
    id: "follow-rodia-01",
    question: "왜 그렇게 했어?",
    currentTopicHint: "rodia",
    expectedChunkIds: ["rodia.designSystem", "rodia.monorepo", "rodia.apiArchitecture.featureApi"],
  },
  {
    id: "follow-rodia-02",
    question: "다른 대안은 없었어?",
    currentTopicHint: "rodia",
    expectedChunkIds: ["rodia.monorepo", "rodia.reactNativeIntegration", "rodia.apiArchitecture.orval"],
  },
  {
    id: "follow-rodia-03",
    question: "그 과정에서 어려웠던 점은?",
    currentTopicHint: "rodia",
    expectedChunkIds: ["rodia.retrospective", "rodia.reactNativeIntegration", "rodia.monorepo"],
  },
  {
    id: "follow-rodia-04",
    question: "그래서 뭘 배웠어?",
    currentTopicHint: "rodia",
    expectedChunkIds: ["rodia.retrospective", "rodia.designSystem"],
  },
  {
    id: "follow-rodia-05",
    question: "결과는 어땠어?",
    currentTopicHint: "rodia",
    expectedChunkIds: ["rodia.designSystem", "rodia.monorepo", "rodia.apiArchitecture.featureApi"],
  },
  {
    id: "follow-storylex-01",
    question: "왜 그렇게 했어?",
    currentTopicHint: "storylex",
    expectedChunkIds: ["storylex.auth401", "storylex.stateManagement"],
  },
  {
    id: "follow-storylex-02",
    question: "다른 대안은 없었어?",
    currentTopicHint: "storylex",
    expectedChunkIds: ["storylex.auth401", "storylex.stateManagement", "storylex.stateManagement.whyZustand"],
  },
  {
    id: "follow-storylex-03",
    question: "그 과정에서 어려웠던 점은?",
    currentTopicHint: "storylex",
    expectedChunkIds: ["storylex.auth401", "storylex.stateManagement", "storylex.retrospective"],
  },
  {
    id: "follow-ai-01",
    question: "그래서 뭘 배웠어?",
    currentTopicHint: "ai-engineering",
    expectedChunkIds: ["ai-engineering.coreBeliefs", "ai-engineering.ultimateQuestion"],
  },
  {
    id: "follow-career-01",
    question: "결과는 어땠어?",
    currentTopicHint: "career",
    expectedChunkIds: ["career.hivelab"],
  },
];

function includesExpected(chunkId: string, expectedChunkIds: string[]) {
  return expectedChunkIds.some((expected) => chunkId === expected || chunkId.startsWith(`${expected}.`));
}

function inferSuspectedReason(result: RetrievalResult) {
  if (result.topResults.length === 0) return "no-match";
  if (result.top3Passed && !result.top1Passed) return "ranking-weak";

  if (
    result.currentTopicHint &&
    !result.topResults.some((topResult) => topResult.chunkId.startsWith(result.currentTopicHint!))
  ) {
    return "follow-up-context-weak";
  }

  const expectedDomains = result.expectedChunkIds.map((id) => id.split(".")[0]);
  const actualDomains = result.topResults.map((resultItem) => resultItem.chunkId.split(".")[0]);
  const hasSameDomain = actualDomains.some((domain) => expectedDomains.includes(domain));

  return hasSameDomain ? "unknown" : "wrong-domain";
}

function toPercent(value: number, total: number) {
  return `${Math.round((value / Math.max(total, 1)) * 100)}%`;
}

function estimateTokens(text: string) {
  return Math.ceil(text.length / 1.0);
}

function percentile(values: number[], percentileValue: number) {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(
    sorted.length - 1,
    Math.ceil((percentileValue / 100) * sorted.length) - 1
  );

  return sorted[index] ?? 0;
}

const results: RetrievalResult[] = testCases.map((testCase) => {
  const hintSeed: Record<string, string> = {
    rodia: "Rodia 디자인 시스템과 모노레포 구조를 설명해줘",
    storylex: "StoryLex 401 인증 queue와 상태관리 구조를 설명해줘",
    "ai-engineering": "AI 코드 검증과 Codex Claude 활용 방식을 설명해줘",
    career: "HiveLab 데이터 검수 경험을 설명해줘",
  };

  const messages = testCase.currentTopicHint
    ? [{ role: "user", content: hintSeed[testCase.currentTopicHint] ?? testCase.currentTopicHint }]
    : [];

  const debug = searchKnowledgeDebug({
    query: testCase.question,
    currentTopicHint: testCase.currentTopicHint ?? null,
    messages,
    limit: 3,
  });

  const topResults = debug.results.map((result, index) => ({
    rank: index + 1,
    chunkId: result.chunkId,
    title: result.title,
    score: result.score,
    tags: result.tags,
  }));

  const estimatedSourceText = [
    debug.rewrittenQuery,
    debug.expandedQuery,
    ...topResults.map((result) => `${result.chunkId} ${result.title} ${result.tags.join(" ")}`),
  ].join("\n");

  const estimatedTokens = estimateTokens(estimatedSourceText);
  const contextLength = estimatedSourceText.length;

  const top1Passed = topResults[0] != null && includesExpected(topResults[0].chunkId, testCase.expectedChunkIds);
  const top3Passed = topResults.some((result) => includesExpected(result.chunkId, testCase.expectedChunkIds));

  const result: RetrievalResult = {
    id: testCase.id,
    question: testCase.question,
    currentTopicHint: testCase.currentTopicHint,
    rewrittenQuery: debug.rewrittenQuery,
    expandedQuery: debug.expandedQuery,
    expectedChunkIds: testCase.expectedChunkIds,
    topResults,
    top1Passed,
    top3Passed,
    estimatedTokens,
    contextLength,
  };

  return {
    ...result,
    suspectedReason: top3Passed ? undefined : inferSuspectedReason(result),
  };
});

const total = results.length;
const top1Passed = results.filter((result) => result.top1Passed).length;
const top3Passed = results.filter((result) => result.top3Passed).length;
const failedCases = results.filter((result) => !result.top3Passed);

const tokenValues = results.map((result) => result.estimatedTokens);
const contextLengths = results.map((result) => result.contextLength);

const avgTokens =
  tokenValues.reduce((sum, value) => sum + value, 0) / Math.max(tokenValues.length, 1);

const minTokens = Math.min(...tokenValues);
const maxTokens = Math.max(...tokenValues);
const p95Tokens = percentile(tokenValues, 95);

const avgContextLength =
  contextLengths.reduce((sum, value) => sum + value, 0) / Math.max(contextLengths.length, 1);

for (const result of results) {
  console.log(
    JSON.stringify(
      {
        id: result.id,
        question: result.question,
        currentTopicHint: result.currentTopicHint ?? null,
        rewrittenQuery: result.rewrittenQuery,
        expandedQuery: result.expandedQuery,
        expectedChunkIds: result.expectedChunkIds,
        topResults: result.topResults,
        top1Passed: result.top1Passed,
        top3Passed: result.top3Passed,
        contextLength: result.contextLength,
        estimatedTokens: result.estimatedTokens,
      },
      null,
      2
    )
  );
}

console.log("\nRetrieval QA Summary");
console.log(`- Total: ${total}`);
console.log(`- Top-1 Passed: ${top1Passed} / ${total} (${toPercent(top1Passed, total)})`);
console.log(`- Top-3 Passed: ${top3Passed} / ${total} (${toPercent(top3Passed, total)})`);
console.log(`- Failed Cases: ${failedCases.length}`);
console.log(`- Avg Context Length: ${Math.round(avgContextLength)} chars`);
console.log(`- Avg Estimated Tokens: ${Math.round(avgTokens)}`);
console.log(`- Min Estimated Tokens: ${minTokens}`);
console.log(`- P95 Estimated Tokens: ${p95Tokens}`);
console.log(`- Max Estimated Tokens: ${maxTokens}`);

if (failedCases.length > 0) {
  console.log("\nFailed Cases:");
  for (const result of failedCases) {
    console.log(
      JSON.stringify(
        {
          id: result.id,
          question: result.question,
          expectedChunkIds: result.expectedChunkIds,
          actualTop3: result.topResults.map((topResult) => topResult.chunkId),
          rewrittenQuery: result.rewrittenQuery,
          expandedQuery: result.expandedQuery,
          contextLength: result.contextLength,
          estimatedTokens: result.estimatedTokens,
          suspectedReason: result.suspectedReason,
        },
        null,
        2
      )
    );
  }
}

console.log("\nQuality Gate");
console.log("- Recommended Top-1 accuracy >= 70%");
console.log("- Recommended Top-3 accuracy >= 90%");
console.log("- Recommended Avg Estimated Tokens <= 1500");