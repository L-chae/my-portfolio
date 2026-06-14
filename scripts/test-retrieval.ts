import { searchKnowledgeDebug } from "@/lib/searchKnowledge";

type RetrievalTestCase = {
  id: string;
  question: string;
  expectedChunkIds: string[];
  acceptableChunkIds?: string[];
  expectedDomain?: string;
  strict?: boolean;
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
  acceptableChunkIds?: string[];
  expectedDomain?: string;
  strict: boolean;
  topResults: {
    rank: number;
    chunkId: string;
    title: string;
    score: number;
    tags: string[];
  }[];
  top1Passed: boolean;
  top2Passed: boolean;
  top3Passed: boolean;
  top3DomainMatched: boolean;
  estimatedTokens: number;
  contextLength: number;
  suspectedReason?: string;
};

// Current retrieval QA role:
// - Broadly checks whether searchKnowledge maps natural questions to the right knowledge area.
// - StoryLex / Rodia expectations follow the new publicDescription + technicalDetail structure.
// - This script is a retrieval QA report. It prints failures but does not force process exit by default.
// - To make gate failure exit non-zero, run with RETRIEVAL_STRICT=1.
// - Final target remains Top-3 >= 92%, but current broad QA gate is 90% while
//   the knowledge dataset is being realigned.
const QUALITY_GATE = {
  top1: 70,
  top2: 85,
  top3: 90,
  avgEstimatedTokens: 900,
  p95EstimatedTokens: 1300,
};

const testCases: RetrievalTestCase[] = [
  // ---------------------------------------------------------------------------
  // StoryLex: current structure
  // ---------------------------------------------------------------------------
  {
    id: "storylex-overview-korean-alias-01",
    question: "스토리렉스는 어떤 프로젝트야?",
    expectedDomain: "storylex",
    expectedChunkIds: [
      "storylex.summary",
      "storylex.publicDescription",
      "storylex.contributionScope",
      "storylex.interviewAnswers",
    ],
  },
  {
    id: "storylex-overview-01",
    question: "StoryLex는 어떤 프로젝트인가요?",
    expectedDomain: "storylex",
    expectedChunkIds: [
      "storylex.summary",
      "storylex.publicDescription",
      "storylex.contributionScope",
      "storylex.interviewAnswers",
    ],
  },
  {
    id: "storylex-role-01",
    question: "StoryLex에서 어떤 역할을 맡았나요?",
    expectedDomain: "storylex",
    expectedChunkIds: [
      "storylex.contributionScope",
      "storylex.interviewAnswers",
      "storylex.summary",
      "storylex.publicDescription",
    ],
  },
  {
    id: "storylex-auth-expire-basic-01",
    question: "로그인 만료 상황을 왜 고려했나요?",
    expectedDomain: "storylex",
    expectedChunkIds: [
      "storylex.publicDescription",
      "storylex.authFlow",
      "storylex.interviewAnswers",
    ],
  },
  {
    id: "storylex-ai-story-01",
    question: "StoryLex AI 스토리는 직접 만든 AI 기능인가요?",
    expectedDomain: "storylex",
    expectedChunkIds: [
      "storylex.keyFeatures.aiStory",
      "storylex.implementationScope",
      "storylex.answerPolicy",
    ],
  },
  {
    id: "storylex-auth-technical-01",
    question: "StoryLex 401 에러는 어떻게 해결했어?",
    strict: true,
    expectedChunkIds: [
      "storylex.authFlow",
      "storylex.authFlow.technicalDetail",
    ],
  },
  {
    id: "storylex-refresh-queue-01",
    question: "refresh token queue 구조 설명해줘",
    strict: true,
    expectedChunkIds: [
      "storylex.authFlow",
      "storylex.authFlow.technicalDetail",
    ],
  },
  {
    id: "storylex-refresh-queue-02",
    question: "동시에 여러 API 요청이 실패하면 어떻게 처리했어?",
    expectedChunkIds: [
      "storylex.authFlow",
      "storylex.authFlow.technicalDetail",
    ],
  },
  {
    id: "storylex-auth-natural-01",
    question: "스토리렉스에서 로그인 풀리면 어떻게 처리했어?",
    expectedChunkIds: [
      "storylex.authFlow",
      "storylex.publicDescription",
      "storylex.interviewAnswers",
    ],
  },
  {
    id: "storylex-auth-natural-02",
    question: "토큰 재발급 중복 문제는 어떻게 막았어?",
    strict: true,
    expectedChunkIds: [
      "storylex.authFlow",
      "storylex.authFlow.technicalDetail",
    ],
  },
  {
    id: "storylex-auth-natural-03",
    question: "동시에 401 여러 개 터지면 어떻게 돼?",
    strict: true,
    expectedChunkIds: [
      "storylex.authFlow",
      "storylex.authFlow.technicalDetail",
    ],
  },
  {
    id: "storylex-react-query-zustand-split-01",
    question: "React Query와 Zustand를 왜 분리했어?",
    strict: true,
    expectedChunkIds: ["storylex.stateManagement"],
  },
  {
    id: "storylex-react-query-01",
    question: "React Query는 어떤 상태를 맡겼어?",
    strict: true,
    expectedChunkIds: ["storylex.stateManagement"],
  },
  {
    id: "storylex-zustand-01",
    question: "Zustand는 왜 사용했어?",
    strict: true,
    expectedChunkIds: ["storylex.stateManagement"],
  },
  {
    id: "storylex-state-split-01",
    question: "서버 상태와 클라이언트 상태를 분리한 기준은?",
    expectedChunkIds: ["storylex.stateManagement"],
  },
  {
    id: "storylex-retro-natural-01",
    question: "StoryLex 다시 만든다면 뭘 개선하고 싶어?",
    expectedChunkIds: ["storylex.retrospective"],
  },
  {
    id: "storylex-learning-01",
    question: "StoryLex 경험을 통해 무엇을 배웠어?",
    expectedDomain: "storylex",
    expectedChunkIds: [
      "storylex.retrospective",
      "storylex.publicDescription",
      "storylex.interviewAnswers",
    ],
  },

  // ---------------------------------------------------------------------------
  // Rodia: current structure
  // ---------------------------------------------------------------------------
  {
    id: "rodia-overview-korean-alias-01",
    question: "로디아는 어떤 프로젝트야?",
    expectedDomain: "rodia",
    expectedChunkIds: [
      "rodia.summary",
      "rodia.publicDescription",
      "rodia.contributionScope",
      "rodia.interviewAnswers",
    ],
    acceptableChunkIds: ["rodia.projectInfo", "rodia.uiText"],
  },
  {
    id: "rodia-overview-01",
    question: "Rodia는 어떤 프로젝트인가요?",
    expectedDomain: "rodia",
    expectedChunkIds: [
      "rodia.summary",
      "rodia.publicDescription",
      "rodia.contributionScope",
      "rodia.interviewAnswers",
    ],
  },
  {
    id: "rodia-role-01",
    question: "Rodia에서 어떤 역할을 맡았나요?",
    expectedDomain: "rodia",
    expectedChunkIds: [
      "rodia.contributionScope",
      "rodia.interviewAnswers",
      "rodia.summary",
      "rodia.publicDescription",
    ],
  },
  {
    id: "rodia-meaningful-problem-01",
    question: "Rodia에서 가장 의미 있었던 문제 해결은 무엇인가요?",
    expectedDomain: "rodia",
    expectedChunkIds: [
      "rodia.apiDebugLogger",
      "rodia.retrospective",
      "rodia.interviewAnswers",
    ],
  },
  {
    id: "rodia-api-debugger-01",
    question: "모바일 API 디버거는 왜 만들었나요?",
    expectedChunkIds: [
      "rodia.apiDebugLogger",
      "rodia.technologies",
      "rodia.problemSummary",
    ],
  },
  {
    id: "rodia-api-natural-01",
    question: "로디아 API 흐름은 어떻게 개선했어?",
    expectedChunkIds: [
      "rodia.apiAutomation",
      "rodia.customInstance",
      "rodia.apiDebugLogger",
      "rodia.problemSummary",
    ],
  },
  {
    id: "rodia-api-natural-02",
    question: "로디아에서 서버 응답 바뀌면 어떻게 대응했어?",
    expectedChunkIds: [
      "rodia.apiAutomation",
      "rodia.customInstance",
      "rodia.problemSummary",
    ],
  },
  {
    id: "rodia-orval-01",
    question: "Orval은 왜 도입했어?",
    strict: true,
    expectedChunkIds: [
      "rodia.apiAutomation",
      "rodia.apiAutomation.technicalDetail",
    ],
  },
  {
    id: "rodia-orval-02",
    question: "OpenAPI 타입 자동 생성은 어떻게 했어?",
    strict: true,
    expectedChunkIds: [
      "rodia.apiAutomation",
      "rodia.apiAutomation.technicalDetail",
    ],
  },
  {
    id: "rodia-orval-natural-01",
    question: "오벌은 왜 썼어?",
    strict: true,
    expectedChunkIds: [
      "rodia.apiAutomation",
      "rodia.apiAutomation.technicalDetail",
    ],
  },
  {
    id: "rodia-orval-natural-02",
    question: "Swagger Codegen 말고 Orval 고른 이유가 뭐야?",
    strict: true,
    expectedChunkIds: [
      "rodia.apiAutomation",
      "rodia.apiAutomation.technicalDetail",
    ],
  },
  {
    id: "rodia-custom-instance-01",
    question: "생성된 API도 공통 요청 흐름을 어떻게 거치게 했어?",
    expectedChunkIds: [
      "rodia.customInstance",
      "rodia.customInstance.technicalDetail",
    ],
    acceptableChunkIds: [
      "rodia.apiAutomation.simpleFlow",
      "rodia.implementationScope",
    ],
  },
  {
    id: "rodia-mutator-interceptor-01",
    question: "mutator와 interceptor는 어떻게 다른가요?",
    strict: true,
    expectedChunkIds: [
      "rodia.customInstance",
      "rodia.customInstance.technicalDetail",
    ],
  },
  {
    id: "rodia-api-debugger-technical-01",
    question: "인앱 API 디버거는 왜 만들었어?",
    strict: true,
    expectedChunkIds: [
      "rodia.apiDebugLogger",
      "rodia.apiDebugLogger.technicalDetail",
    ],
  },
  {
    id: "rodia-curl-01",
    question: "cURL 추출은 어떤 문제를 줄이기 위한 기능인가요?",
    strict: true,
    expectedChunkIds: [
      "rodia.apiDebugLogger",
      "rodia.apiDebugLogger.technicalDetail",
    ],
  },
  {
    id: "rodia-request-id-01",
    question: "requestId는 어떻게 만들었나요?",
    strict: true,
    expectedChunkIds: [
      "rodia.apiDebugLogger",
      "rodia.apiDebugLogger.technicalDetail",
    ],
  },
  {
    id: "rodia-policy-layer-01",
    question: "정책 레이어는 왜 분리했나요?",
    strict: true,
    expectedChunkIds: [
      "rodia.policyLayer",
      "rodia.policyLayer.technicalDetail",
    ],
  },
  {
    id: "rodia-policy-layer-natural-01",
    question: "역할별 UI 규칙은 어떻게 분리했어?",
    strict: true,
    expectedChunkIds: [
      "rodia.policyLayer",
      "rodia.policyLayer.technicalDetail",
    ],
  },
  {
    id: "rodia-design-token-01",
    question: "디자인 토큰은 어떻게 관리했나요?",
    strict: true,
    expectedChunkIds: [
      "rodia.designTokens",
      "rodia.designTokens.technicalDetail",
    ],
  },
  {
    id: "rodia-design-token-02",
    question: "디자인 시스템에서 토큰은 어떤 역할이야?",
    strict: true,
    expectedChunkIds: [
      "rodia.designTokens",
      "rodia.designTokens.technicalDetail",
    ],
  },
  {
    id: "rodia-json-token-01",
    question: "JSON token 구조를 왜 선택했어?",
    strict: true,
    expectedChunkIds: [
      "rodia.designTokens",
      "rodia.designTokens.technicalDetail",
    ],
  },
  {
    id: "rodia-json-token-02",
    question: "웹 모바일 디자인 토큰 동기화는 어떻게 했어?",
    expectedChunkIds: [
      "rodia.designTokens",
      "rodia.monorepo",
      "rodia.designTokens.technicalDetail",
    ],
  },
  {
    id: "rodia-zod-01",
    question: "Zod 검증은 왜 넣었어?",
    strict: true,
    expectedChunkIds: [
      "rodia.designTokens",
      "rodia.designTokens.technicalDetail",
    ],
  },
  {
    id: "rodia-zod-02",
    question: "토큰 스키마 오류는 어떻게 막았어?",
    strict: true,
    expectedChunkIds: [
      "rodia.designTokens",
      "rodia.designTokens.technicalDetail",
    ],
  },
  {
    id: "rodia-token-natural-01",
    question: "디자인 토큰을 JSON으로 둔 이유가 뭐야?",
    strict: true,
    expectedChunkIds: [
      "rodia.designTokens",
      "rodia.designTokens.technicalDetail",
    ],
  },
  {
    id: "rodia-token-natural-02",
    question: "CSS 변수 말고 JSON 토큰 쓴 이유는?",
    strict: true,
    expectedChunkIds: [
      "rodia.designTokens",
      "rodia.designTokens.technicalDetail",
    ],
  },
  {
    id: "rodia-monorepo-01",
    question: "모노레포를 도입한 이유는?",
    strict: true,
    expectedChunkIds: ["rodia.monorepo"],
  },
  {
    id: "rodia-monorepo-02",
    question: "pnpm workspace는 어디에 썼어?",
    expectedChunkIds: ["rodia.monorepo"],
    acceptableChunkIds: ["rodia.techStack", "rodia.technologies"],
  },
  {
    id: "rodia-rn-natural-01",
    question: "React Native에서 공통 패키지 쓸 때 문제는 없었어?",
    expectedChunkIds: [
      "rodia.monorepo",
      "rodia.technologies",
      "rodia.retrospective",
    ],
  },
  {
    id: "rodia-retro-natural-01",
    question: "Rodia에서 실패하거나 아쉬웠던 점은?",
    expectedChunkIds: ["rodia.retrospective"],
  },
  {
    id: "rodia-retro-natural-02",
    question: "관리자랑 사용자 서비스를 왜 분리해야 한다고 느꼈어?",
    expectedChunkIds: [
      "rodia.retrospective",
      "rodia.implementationScope",
      "rodia.answerPolicy",
    ],
  },

  // ---------------------------------------------------------------------------
  // Portfolio AI: current structure
  // ---------------------------------------------------------------------------
  {
    id: "portfolio-ai-overview-01",
    question: "포트폴리오 AI 프로젝트는 어떤 프로젝트인가요?",
    expectedDomain: "portfolio-ai",
    expectedChunkIds: [
      "portfolio-ai.summary",
      "portfolio-ai.motivation",
      "portfolio-ai.problem",
      "portfolio-ai.chatbotAnswerGuide",
    ],
    acceptableChunkIds: ["portfolio-ai.interviewAnswerGuides.projectOverview"],
  },
  {
    id: "portfolio-ai-rag-natural-01",
    question: "왜 RAG 안 썼어?",
    expectedChunkIds: [
      "portfolio-ai.decision",
      "portfolio-ai.implementationScope",
      "portfolio-ai.chatbotAnswerGuide",
    ],
  },
  {
    id: "portfolio-ai-rag-natural-02",
    question: "벡터 DB 없이 어떻게 답변해?",
    expectedChunkIds: [
      "portfolio-ai.decision",
      "portfolio-ai.implementationScope",
      "portfolio-ai.technologies",
    ],
  },
  {
    id: "portfolio-ai-model-natural-01",
    question: "포트폴리오 AI에서 AI 모델을 직접 개발했나요?",
    expectedDomain: "portfolio-ai",
    expectedChunkIds: [
      "portfolio-ai.implementationScope",
      "portfolio-ai.chatbotAnswerGuide",
      "portfolio-ai.avoidStatements",
    ],
    acceptableChunkIds: ["portfolio-ai.interviewAnswerGuides.aiModel"],
  },
  {
    id: "portfolio-ai-data-natural-01",
    question: "포트폴리오 AI에서 제일 어려웠던 건 뭐야?",
    expectedChunkIds: [
      "portfolio-ai.retrospective",
      "portfolio-ai.dataStructure",
    ],
  },
  {
    id: "portfolio-ai-guardrail-natural-01",
    question: "데이터셋에 없는 질문은 어떻게 막아?",
    expectedChunkIds: [
      "portfolio-ai.ux",
      "portfolio-ai.chatbotAnswerGuide",
      "portfolio-ai.avoidStatements",
    ],
  },
  {
    id: "portfolio-ai-latency-natural-01",
    question: "AI 응답이 느릴 때 UX는 어떻게 처리했어?",
    expectedChunkIds: ["portfolio-ai.ux", "portfolio-ai.implementationScope"],
  },
  {
    id: "portfolio-ai-stack-01",
    question: "포트폴리오 AI 기술 스택은 무엇인가요?",
    expectedChunkIds: [
      "portfolio-ai.technologies",
      "portfolio-ai.implementationScope",
    ],
    acceptableChunkIds: ["portfolio-ai.interviewAnswerGuides.technologyStack"],
  },

  // ---------------------------------------------------------------------------
  // Career / HiveLab
  // ---------------------------------------------------------------------------
  {
    id: "hivelab-korean-alias-01",
    question: "하이브랩에서는 어떤 일을 했어?",
    expectedChunkIds: ["career.hivelab", "career.summary"],
  },
  {
    id: "career-hivelab-01",
    question: "하이브랩에서 어떤 일을 했어?",
    expectedChunkIds: ["career.hivelab", "career.summary"],
  },
  {
    id: "career-hivelab-02",
    question: "HiveLab AI 학습 데이터 검수 경험에서 뭘 배웠어?",
    expectedDomain: "career",
    expectedChunkIds: ["career.hivelab"],
  },
  {
    id: "career-hivelab-natural-01",
    question: "데이터 검수 경험이 프론트엔드랑 무슨 관련이 있어?",
    expectedChunkIds: ["career.hivelab", "identity.coreValues"],
  },
  {
    id: "career-hivelab-natural-02",
    question: "하이브랩에서 배운 점은?",
    expectedChunkIds: ["career.hivelab"],
  },
  {
    id: "career-human-error-natural-01",
    question: "반복 작업에서 실수 줄인 경험 있어?",
    expectedChunkIds: ["career.hivelab", "identity.coreValues"],
  },

  // ---------------------------------------------------------------------------
  // AI engineering
  // ---------------------------------------------------------------------------
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
    expectedChunkIds: [
      "ai-engineering.codeValidation",
      "ai-engineering.decisionMaking",
    ],
  },
  {
    id: "ai-cross-validation-01",
    question: "여러 모델 교차 검증은 왜 했어?",
    expectedChunkIds: [
      "ai-engineering.codeValidation",
      "ai-engineering.coreBeliefs",
    ],
  },
  {
    id: "ai-developer-skill-01",
    question: "AI 시대에 개발자 역량은 뭐가 중요해?",
    expectedChunkIds: [
      "ai-engineering.highestValue",
      "ai-engineering.ultimateQuestion",
    ],
  },
  {
    id: "ai-dependency-01",
    question: "특정 AI 도구에 의존하면 어떤 문제가 있어?",
    expectedChunkIds: [
      "ai-engineering.toolDependency",
      "ai-engineering.contingency",
    ],
  },
  {
    id: "ai-tool-natural-01",
    question: "Cursor나 Claude는 어떻게 써?",
    expectedChunkIds: ["ai-engineering.usage", "ai-engineering.toolDependency"],
  },
  {
    id: "ai-judgement-natural-01",
    question: "AI 답변끼리 다르면 어떻게 판단해?",
    expectedChunkIds: [
      "ai-engineering.decisionMaking",
      "ai-engineering.codeValidation",
    ],
  },
  {
    id: "ai-risk-natural-01",
    question: "AI가 만든 코드에서 뭘 조심해?",
    expectedChunkIds: [
      "ai-engineering.codeValidation",
      "ai-engineering.rejection",
    ],
  },
  {
    id: "ai-no-tool-natural-01",
    question: "AI 도구 못 쓰면 개발 못 하는 거 아니야?",
    expectedChunkIds: [
      "ai-engineering.contingency",
      "ai-engineering.toolDependency",
    ],
  },
  {
    id: "ai-future-natural-01",
    question: "AI가 발전해도 개발자에게 남는 역할은 뭐야?",
    expectedChunkIds: [
      "ai-engineering.ultimateQuestion",
      "ai-engineering.highestValue",
    ],
  },

  // ---------------------------------------------------------------------------
  // Identity / communication / problem solving
  // ---------------------------------------------------------------------------
  {
    id: "identity-summary-natural-01",
    question: "너는 어떤 프론트엔드 개발자야?",
    expectedChunkIds: ["identity.summary", "identity.coreValues"],
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
    id: "identity-scenario-natural-01",
    question: "시나리오 검증가가 무슨 뜻이야?",
    expectedChunkIds: [
      "identity.summary",
      "problem-solving.defensiveProgramming",
    ],
  },
  {
    id: "identity-strength-natural-01",
    question: "본인 강점이 뭐야?",
    expectedChunkIds: ["identity.strengths", "identity.communicationStyle"],
  },
  {
    id: "identity-weakness-natural-01",
    question: "약점이나 실패 경험은 뭐야?",
    expectedChunkIds: [
      "identity.lessonsLearned",
      "rodia.retrospective",
      "faq.questions",
    ],
  },
  {
    id: "identity-frontend-natural-01",
    question: "왜 프론트엔드를 선택했어?",
    expectedChunkIds: ["faq.questions"],
  },
  {
    id: "identity-growth-01",
    question: "오버엔지니어링을 겪고 어떻게 성장했어?",
    expectedChunkIds: ["identity.lessonsLearned", "rodia.retrospective"],
  },
  {
    id: "problem-exception-01",
    question: "예외 상황을 어떻게 통제해?",
    expectedChunkIds: [
      "problem-solving.summary",
      "problem-solving.defensiveProgramming",
      "problem-solving.philosophy",
    ],
  },
  {
    id: "problem-reproduction-01",
    question: "버그를 수정하기 전에 왜 재현을 먼저 해?",
    expectedChunkIds: [
      "problem-solving.philosophy",
      "problem-solving.debuggingProcess",
    ],
  },
  {
    id: "problem-debug-natural-01",
    question: "버그 생기면 어떤 순서로 봐?",
    expectedChunkIds: [
      "problem-solving.debuggingProcess",
      "problem-solving.philosophy",
    ],
  },
  {
    id: "problem-repro-natural-01",
    question: "재현 조건을 왜 중요하게 봐?",
    expectedChunkIds: ["problem-solving.philosophy"],
  },
  {
    id: "problem-side-effect-natural-01",
    question: "수정할 때 사이드 이펙트는 어떻게 봐?",
    expectedChunkIds: ["problem-solving.summary", "problem-solving.philosophy"],
  },
  {
    id: "problem-mobile-debug-natural-01",
    question: "모바일 디버깅은 어떻게 했어?",
    expectedChunkIds: ["problem-solving.hardestBug", "rodia.apiDebugLogger"],
  },

  // ---------------------------------------------------------------------------
  // Follow-up with topic hint
  // ---------------------------------------------------------------------------
  {
    id: "follow-rodia-01",
    question: "왜 그렇게 했어?",
    currentTopicHint: "rodia",
    expectedChunkIds: [
      "rodia.problemSummary",
      "rodia.apiAutomation",
      "rodia.apiDebugLogger",
      "rodia.policyLayer",
      "rodia.designTokens",
    ],
  },
  {
    id: "follow-rodia-02",
    question: "다른 대안은 없었어?",
    currentTopicHint: "rodia",
    expectedChunkIds: [
      "rodia.apiAutomation",
      "rodia.customInstance",
      "rodia.monorepo",
      "rodia.designTokens",
    ],
  },
  {
    id: "follow-rodia-03",
    question: "그 과정에서 어려웠던 점은?",
    currentTopicHint: "rodia",
    expectedDomain: "rodia",
    expectedChunkIds: ["rodia.retrospective", "rodia.problemSummary"],
    acceptableChunkIds: [
      "rodia.apiAutomation",
      "rodia.apiDebugLogger",
      "rodia.designTokens",
    ],
  },
  {
    id: "follow-rodia-04",
    question: "그래서 뭘 배웠어?",
    currentTopicHint: "rodia",
    expectedDomain: "rodia",
    expectedChunkIds: ["rodia.retrospective"],
    acceptableChunkIds: [
      "rodia.publicDescription",
      "rodia.interviewAnswers",
      "rodia.problemSummary",
      "rodia.apiAutomation",
      "rodia.apiDebugLogger",
      "rodia.designTokens",
    ],
  },
  {
    id: "follow-rodia-05",
    question: "결과는 어땠어?",
    currentTopicHint: "rodia",
    expectedChunkIds: [
      "rodia.publicDescription",
      "rodia.apiAutomation",
      "rodia.apiDebugLogger",
      "rodia.policyLayer",
      "rodia.designTokens",
    ],
  },
  {
    id: "follow-rodia-api-01",
    question: "그럼 UI 영향은 어떻게 줄였어?",
    currentTopicHint: "rodia",
    expectedChunkIds: [
      "rodia.policyLayer",
      "rodia.customInstance",
      "rodia.apiAutomation",
    ],
  },
  {
    id: "follow-rodia-design-01",
    question: "그럼 토큰은 어떻게 검증했어?",
    currentTopicHint: "rodia",
    expectedDomain: "rodia",
    expectedChunkIds: [
      "rodia.designTokens",
      "rodia.designTokens.technicalDetail",
    ],
  },
  {
    id: "follow-storylex-01",
    question: "왜 그렇게 했어?",
    currentTopicHint: "storylex",
    expectedChunkIds: [
      "storylex.publicDescription",
      "storylex.authFlow",
      "storylex.stateManagement",
    ],
  },
  {
    id: "follow-storylex-02",
    question: "다른 대안은 없었어?",
    currentTopicHint: "storylex",
    expectedChunkIds: ["storylex.authFlow", "storylex.stateManagement"],
  },
  {
    id: "follow-storylex-03",
    question: "그 과정에서 어려웠던 점은?",
    currentTopicHint: "storylex",
    expectedChunkIds: [
      "storylex.authFlow",
      "storylex.stateManagement",
      "storylex.retrospective",
    ],
  },
  {
    id: "follow-storylex-auth-01",
    question: "그럼 재요청은 어떤 순서로 처리돼?",
    currentTopicHint: "storylex",
    expectedChunkIds: [
      "storylex.authFlow",
      "storylex.authFlow.technicalDetail",
    ],
  },
  {
    id: "follow-storylex-state-01",
    question: "그럼 상태는 어디에 저장했어?",
    currentTopicHint: "storylex",
    expectedDomain: "storylex",
    expectedChunkIds: ["storylex.stateManagement"],
  },
  {
    id: "follow-ai-01",
    question: "그래서 뭘 배웠어?",
    currentTopicHint: "ai-engineering",
    expectedChunkIds: [
      "ai-engineering.coreBeliefs",
      "ai-engineering.ultimateQuestion",
    ],
  },
  {
    id: "follow-career-01",
    question: "결과는 어땠어?",
    currentTopicHint: "career",
    expectedChunkIds: ["career.hivelab"],
  },
  {
    id: "follow-portfolio-ai-01",
    question: "그럼 환각은 어떻게 줄였어?",
    currentTopicHint: "portfolio-ai",
    expectedDomain: "portfolio-ai",
    expectedChunkIds: [
      "portfolio-ai.ux",
      "portfolio-ai.chatbotAnswerGuide",
      "portfolio-ai.avoidStatements",
    ],
    acceptableChunkIds: [
      "portfolio-ai.interviewAnswerGuides.hallucinationGuardrail",
      "portfolio-ai.interviewAnswerGuides.promptGuardrail",
    ],
  },
  {
    id: "follow-problem-solving-01",
    question: "그럼 고쳤는지는 어떻게 확인해?",
    currentTopicHint: "problem-solving",
    expectedChunkIds: [
      "problem-solving.completionCriteria",
      "problem-solving.philosophy",
    ],
  },

  // ---------------------------------------------------------------------------
  // Prepared answer / default suggestion coverage
  // ---------------------------------------------------------------------------
  {
    id: "prepared-default-storylex-01",
    question: "StoryLex는 어떤 프로젝트인가요?",
    expectedChunkIds: [
      "storylex.summary",
      "storylex.publicDescription",
      "storylex.contributionScope",
      "storylex.interviewAnswers",
    ],
  },
  {
    id: "prepared-default-rodia-01",
    question: "Rodia는 어떤 프로젝트인가요?",
    expectedChunkIds: [
      "rodia.summary",
      "rodia.publicDescription",
      "rodia.contributionScope",
      "rodia.interviewAnswers",
    ],
  },
  {
    id: "prepared-default-architecture-01",
    question: "가장 자신 있는 프로젝트의 아키텍처 설명해 줘",
    expectedChunkIds: [
      "rodia.summary",
      "rodia.publicDescription",
      "rodia.apiAutomation",
      "rodia.apiDebugLogger",
      "rodia.policyLayer",
      "rodia.designTokens",
    ],
  },
  {
    id: "prepared-default-state-01",
    question: "상태 관리를 다루는 본인만의 기준이 있나요?",
    expectedChunkIds: ["storylex.stateManagement", "identity.coreValues"],
  },
  {
    id: "prepared-default-ai-skill-01",
    question: "AI 시대에 개발자의 핵심 역량은?",
    expectedChunkIds: [
      "ai-engineering.highestValue",
      "ai-engineering.ultimateQuestion",
    ],
  },
];

function includesChunkId(chunkId: string, chunkIds: readonly string[] = []) {
  return chunkIds.some(
    (expected) => chunkId === expected || chunkId.startsWith(`${expected}.`),
  );
}

function isExpectedMatch(chunkId: string, testCase: RetrievalTestCase) {
  return includesChunkId(chunkId, testCase.expectedChunkIds);
}

function isAcceptableMatch(chunkId: string, testCase: RetrievalTestCase) {
  if (testCase.strict) return false;

  return includesChunkId(chunkId, testCase.acceptableChunkIds);
}

function isDomainMatch(chunkId: string, testCase: RetrievalTestCase) {
  if (testCase.strict || !testCase.expectedDomain) return false;

  return (
    chunkId === testCase.expectedDomain ||
    chunkId.startsWith(`${testCase.expectedDomain}.`)
  );
}

function isTop1OrTop2Match(chunkId: string, testCase: RetrievalTestCase) {
  return isExpectedMatch(chunkId, testCase) || isAcceptableMatch(chunkId, testCase);
}

function isTop3Match(chunkId: string, testCase: RetrievalTestCase) {
  return (
    isExpectedMatch(chunkId, testCase) ||
    isAcceptableMatch(chunkId, testCase) ||
    isDomainMatch(chunkId, testCase)
  );
}

function inferSuspectedReason(result: RetrievalResult) {
  if (result.topResults.length === 0) return "no-match";
  if (result.top3Passed && !result.top1Passed) return "ranking-weak";
  if (result.strict) return "strict-miss";

  if (
    result.currentTopicHint &&
    !result.topResults.some((topResult) =>
      topResult.chunkId.startsWith(result.currentTopicHint!),
    )
  ) {
    return "follow-up-context-weak";
  }

  if (result.top3DomainMatched) return "domain-only-match";

  const acceptedIds = [
    ...result.expectedChunkIds,
    ...(result.acceptableChunkIds ?? []),
  ];
  const expectedDomains = acceptedIds.map((id) => id.split(".")[0]);
  const actualDomains = result.topResults.map(
    (resultItem) => resultItem.chunkId.split(".")[0],
  );
  const hasSameDomain = actualDomains.some((domain) =>
    expectedDomains.includes(domain),
  );

  if (!hasSameDomain) return "wrong-domain";

  if (result.expectedDomain) return "ambiguous-question";

  return "expected-missing";
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
    Math.ceil((percentileValue / 100) * sorted.length) - 1,
  );

  return sorted[index] ?? 0;
}

const results: RetrievalResult[] = testCases.map((testCase) => {
  const hintSeed: Record<string, string> = {
    rodia:
      "Rodia API 명세 변경 대응, 모바일 API 디버깅, 정책 레이어, 디자인 토큰 검증 흐름을 설명해줘",
    storylex:
      "StoryLex 로그인 만료 예외 처리, 토큰 재발급 흐름, React Query와 Zustand 상태 관리 분리를 설명해줘",
    "portfolio-ai":
      "포트폴리오 AI의 정적 context 주입, guardrail, prepared answer 구조를 설명해줘",
    "ai-engineering": "AI 코드 검증과 Codex Claude 활용 방식을 설명해줘",
    career: "HiveLab 데이터 검수 경험을 설명해줘",
    "problem-solving": "문제 해결과 재현, 검증 기준을 설명해줘",
  };

  const messages = testCase.currentTopicHint
    ? [
        {
          role: "user",
          content:
            hintSeed[testCase.currentTopicHint] ?? testCase.currentTopicHint,
        },
      ]
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
    ...topResults.map(
      (result) => `${result.chunkId} ${result.title} ${result.tags.join(" ")}`,
    ),
  ].join("\n");

  const estimatedTokens = estimateTokens(estimatedSourceText);
  const contextLength = estimatedSourceText.length;

  const top1Passed =
    topResults[0] != null &&
    isTop1OrTop2Match(topResults[0].chunkId, testCase);
  const top2Passed = topResults
    .slice(0, 2)
    .some((result) => isTop1OrTop2Match(result.chunkId, testCase));
  const top3DomainMatched = topResults.some((result) =>
    isDomainMatch(result.chunkId, testCase),
  );
  const top3Passed = topResults.some((result) =>
    isTop3Match(result.chunkId, testCase),
  );

  const result: RetrievalResult = {
    id: testCase.id,
    question: testCase.question,
    currentTopicHint: testCase.currentTopicHint,
    rewrittenQuery: debug.rewrittenQuery,
    expandedQuery: debug.expandedQuery,
    expectedChunkIds: testCase.expectedChunkIds,
    acceptableChunkIds: testCase.acceptableChunkIds,
    expectedDomain: testCase.expectedDomain,
    strict: testCase.strict ?? false,
    topResults,
    top1Passed,
    top2Passed,
    top3Passed,
    top3DomainMatched,
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
const top2Passed = results.filter((result) => result.top2Passed).length;
const top3Passed = results.filter((result) => result.top3Passed).length;
const failedCases = results.filter((result) => !result.top3Passed);

const tokenValues = results.map((result) => result.estimatedTokens);
const contextLengths = results.map((result) => result.contextLength);

const avgTokens =
  tokenValues.reduce((sum, value) => sum + value, 0) /
  Math.max(tokenValues.length, 1);

const minTokens = Math.min(...tokenValues);
const maxTokens = Math.max(...tokenValues);
const p95Tokens = percentile(tokenValues, 95);

const avgContextLength =
  contextLengths.reduce((sum, value) => value + sum, 0) /
  Math.max(contextLengths.length, 1);

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
        acceptableChunkIds: result.acceptableChunkIds,
        expectedDomain: result.expectedDomain,
        strict: result.strict,
        topResults: result.topResults,
        top1Passed: result.top1Passed,
        top2Passed: result.top2Passed,
        top3Passed: result.top3Passed,
        top3DomainMatched: result.top3DomainMatched,
        contextLength: result.contextLength,
        estimatedTokens: result.estimatedTokens,
      },
      null,
      2,
    ),
  );
}

console.log("\nRetrieval QA Summary");
console.log(`- Total: ${total}`);
console.log(
  `- Top-1 Passed: ${top1Passed} / ${total} (${toPercent(top1Passed, total)})`,
);
console.log(
  `- Top-2 Passed: ${top2Passed} / ${total} (${toPercent(top2Passed, total)})`,
);
console.log(
  `- Top-3 Passed: ${top3Passed} / ${total} (${toPercent(top3Passed, total)})`,
);
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
          acceptableChunkIds: result.acceptableChunkIds,
          expectedDomain: result.expectedDomain,
          strict: result.strict,
          actualTop3: result.topResults.map((topResult) => topResult.chunkId),
          top3DomainMatched: result.top3DomainMatched,
          rewrittenQuery: result.rewrittenQuery,
          expandedQuery: result.expandedQuery,
          contextLength: result.contextLength,
          estimatedTokens: result.estimatedTokens,
          suspectedReason: result.suspectedReason,
        },
        null,
        2,
      ),
    );
  }
}

console.log("\nQuality Gate");
console.log(`- Recommended Top-1 accuracy >= ${QUALITY_GATE.top1}%`);
console.log(`- Recommended Top-2 accuracy >= ${QUALITY_GATE.top2}%`);
console.log(`- Recommended Top-3 accuracy >= ${QUALITY_GATE.top3}%`);
console.log(
  `- Recommended Avg Estimated Tokens <= ${QUALITY_GATE.avgEstimatedTokens}`,
);
console.log(
  `- Recommended P95 Estimated Tokens <= ${QUALITY_GATE.p95EstimatedTokens}`,
);

const top1Percent = Math.round((top1Passed / Math.max(total, 1)) * 100);
const top2Percent = Math.round((top2Passed / Math.max(total, 1)) * 100);
const top3Percent = Math.round((top3Passed / Math.max(total, 1)) * 100);

const gateFailures = [
  top1Percent < QUALITY_GATE.top1
    ? `Top-1 ${top1Percent}% < ${QUALITY_GATE.top1}%`
    : null,
  top2Percent < QUALITY_GATE.top2
    ? `Top-2 ${top2Percent}% < ${QUALITY_GATE.top2}%`
    : null,
  top3Percent < QUALITY_GATE.top3
    ? `Top-3 ${top3Percent}% < ${QUALITY_GATE.top3}%`
    : null,
  avgTokens > QUALITY_GATE.avgEstimatedTokens
    ? `Avg estimated tokens ${Math.round(avgTokens)} > ${QUALITY_GATE.avgEstimatedTokens}`
    : null,
  p95Tokens > QUALITY_GATE.p95EstimatedTokens
    ? `P95 estimated tokens ${p95Tokens} > ${QUALITY_GATE.p95EstimatedTokens}`
    : null,
].filter(Boolean);

if (gateFailures.length > 0) {
  console.log("\nQuality Gate Warnings:");
  for (const failure of gateFailures) {
    console.log(`- ${failure}`);
  }

  if (process.env.RETRIEVAL_STRICT === "1") {
    process.exitCode = 1;
  }
}
