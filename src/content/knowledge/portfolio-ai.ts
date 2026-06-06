// src/content/knowledge/portfolio-ai.ts
// 포트폴리오 AI 프로젝트: 대화형 포트폴리오, 데이터 구조화

export const portfolioAi = {
  summary: `
포트폴리오 사이트에 AI 챗봇 탑재하여 정적 포맷 탈피.
방문자가 "당신은 어떤 개발자인가?"를 직접 물어볼 수 있는 대화형 탐색 경험 제공.
  `.trim(),

  keywords: ['portfolio', 'ai', '챗봇', 'rag', 'prompt', '데이터', 'claude'],

  motivation: `
정적 포트폴리오는 방문자가 일방적으로 글을 읽음 → 정보 전달 밀도 약함.
인사담당자/실무자가 의사결정 이유, 실패 경험 등을 직접 물어볼 수 있도록 설계.
    `.trim(),

  uiStrategy: 'FAB(우측 하단) 대신 메인 Hero 영역 → 단순 CS 용도가 아니라 메인 인터페이스로 격상',

  architecture: {
    approach: '정적 프롬프트 주입(Static Context Injection) — RAG 대신',

    whyNotRag: `
포트폴리오 데이터가 벡터 DB 수준의 규모 아님 (100~150 facts).
초기 구현 복잡도, 토큰 비용, 유지보수성 고려.
향후 RAG 확장 가능하도록 구조는 열어둠.
    `.trim(),

    dataCompression: {
      initial: 'Q&A 단순 나열 → 관리 어려움',
      improved: '마크다운 섹션 구조화 + 주제별 분리',
      current: 'Problem → Decision → Result 포맷 규격화 → 일관된 맥락 유도',
    },
  },

  ux: {
    loading: '질문 직후 로딩 상태 즉시 표시 + "답변 생성 중" 메시지',

    errorHandling: 'API 장애 시 무한 로딩 아님 → 명확한 실패 상태 안내',

    prevention: '입력창 비활성화로 중복 요청 방지',

    guardrail: '역할 "포트폴리오 AI"로 제한 → 범위 벗어난 질문은 거절',

    hallucination: '"명시된 근거로만 답변, 모르면 정중히 거절"로 반복 테스트',
  },

  retrospective: {
    hardestPart: 'API 연동이 아니라 "데이터를 정리하고 구조화하는 작업"',

    lesson: 'AI 프로젝트도 화려한 모델 연동보다 "데이터의 품질과 구조 설계"가 핵심',

    keyInsight: `
처음에는 AI API 연동 자체가 가장 어려울 것이라고 생각했습니다.
하지만 실제로는 기능 개발보다 데이터를 정리하고 구조화하는 작업이 훨씬 어려웠습니다.
지금 AI 프로젝트에서 가장 중요한 것은 화려한 모델 연동이 아니라
데이터의 품질과 구조 설계라는 점을 배웠습니다.
    `.trim(),

    futureImprovements: [
      '데이터 증가 시 RAG 도입',
      'Server-Sent Events(SSE) 스트리밍으로 체감 대기 시간 개선',
      '이전 질문 맥락을 기억하는 대화 이력 기반 응답',
    ],
  },
} as const;