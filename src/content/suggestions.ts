import { career } from "./knowledge";

export const DEFAULT_SUGGESTIONS = [
  "가장 자신 있는 프로젝트의 아키텍처 설명해 줘",
  "상태 관리를 다루는 본인만의 기준이 있나요?",
  "오버엔지니어링으로 실패했던 경험이 있나요?",
] as const;

export const SECTION_SUGGESTION_MAP: Record<string, readonly string[]> = {
  hero: DEFAULT_SUGGESTIONS,
  experience: career.suggestedQuestions,
  "core-values": [
    "시나리오 검증가라는 말은 무슨 뜻인가요?",
    "예외 상황을 왜 먼저 고민하나요?",
    "오버엔지니어링을 줄이는 기준은?",
  ],
  projects: [
    "Rodia 디자인 시스템 어때?",
    "StoryLex 401 에러 해결 과정 알려줘",
    "포트폴리오 AI는 RAG 없이 어떻게 동작하나요?",
  ],
};

export const SUGGESTION_MAP: Record<string, readonly string[]> = {
  career: career.suggestedQuestions,
  rodia: [
    "Rodia 아키텍처를 더 자세히 설명해 줘",
    "모노레포를 도입한 이유는?",
    "Orval과 Feature API를 왜 분리했나요?",
  ],
  storylex: [
    "401 에러 큐(Queue) 로직 설명해줘",
    "React Query와 Zustand 분리 이유",
    "StoryLex에서 예외 처리를 어떻게 설계했나요?",
  ],
  "portfolio-ai": [
    "포트폴리오 AI는 RAG 없이 어떻게 동작하나요?",
    "추천 질문 UX는 어떻게 개선했나요?",
    "AI 챗봇의 환각 방지는 어떻게 했나요?",
  ],
  identity: [
    "협업 시 본인만의 강점은?",
    "오버엔지니어링을 줄이는 기준은?",
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
