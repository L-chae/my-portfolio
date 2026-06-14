export const DEFAULT_SUGGESTIONS = [
  "이채은은 어떤 프론트엔드 개발자인가요?",
  "가장 자신 있는 프로젝트의 아키텍처 설명해 줘",
  "AI 시대에 개발자의 핵심 역량은?",
] as const;

export const SECTION_SUGGESTION_MAP: Record<string, readonly string[]> = {
  hero: DEFAULT_SUGGESTIONS,

  experience: [
    "HiveLab에서 어떤 일을 했나요?",
    "HiveLab 경험이 프론트엔드에 어떻게 연결되나요?",
    "반복 작업의 휴먼 에러를 어떻게 줄였나요?",
  ],

  "core-values": [
    "본인을 시나리오 검증가라고 표현하는 이유는 무엇인가요?",
    "예외 상황을 왜 먼저 고민하나요?",
    "오버엔지니어링을 줄이는 기준은?",
  ],

  projects: [
    "Rodia는 어떤 프로젝트인가요?",
    "StoryLex는 어떤 프로젝트인가요?",
    "포트폴리오 AI는 RAG 없이 어떻게 동작하나요?",
  ],
};

export const SUGGESTION_MAP: Record<string, readonly string[]> = {
  career: [
    "HiveLab에서 어떤 일을 했나요?",
    "HiveLab 경험이 프론트엔드에 어떻게 연결되나요?",
    "반복 작업의 휴먼 에러를 어떻게 줄였나요?",
  ],

  rodia: [
    "Rodia는 어떤 프로젝트인가요?",
    "Rodia에서 어떤 역할을 맡았나요?",
    "모바일 API 디버거는 왜 만들었나요?",
  ],

  storylex: [
    "StoryLex는 어떤 프로젝트인가요?",
    "StoryLex에서 어떤 역할을 맡았나요?",
    "로그인 만료 상황을 왜 고려했나요?",
  ],

  "portfolio-ai": [
    "포트폴리오 AI는 RAG 없이 어떻게 동작하나요?",
    "추천 질문 UX는 어떻게 개선했나요?",
    "AI 챗봇의 환각 방지는 어떻게 했나요?",
  ],

  identity: [
    "이채은은 어떤 프론트엔드 개발자인가요?",
    "협업 시 본인만의 강점은?",
    "어떤 개발 환경에서 가장 잘 일하나요?",
  ],

  "ai-engineering": [
    "AI 도구를 어떻게 검증해서 사용하나요?",
    "AI 시대에 개발자의 핵심 역량은?",
    "Codex나 Claude를 실무에 어떻게 활용했나요?",
  ],

  "problem-solving": [
    "문제를 재현하는 기준은?",
    "버그 수정 전에 무엇을 먼저 확인하나요?",
    "예외 상황을 어떻게 통제하나요?",
  ],
};
