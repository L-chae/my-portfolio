// src/content/knowledge/storylex.ts
// StoryLex 프로젝트: 인증 동시성, 상태 관리, 예외 처리

export const storylex = {
  summary: `
영어 단어 학습의 대시보드부터 복습까지 일관된 흐름 제공.
예외 처리와 상태 관리의 안정성을 최우선으로 설계한 프로젝트.
  `.trim(),

  keywords: ['storylex', '인증', '401', 'queue', '학습', '상태관리', 'react query', 'zustand'],

  coreGoal: '사용자가 학습 중 예기치 못한 에러로 흐름이 끊기지 않도록 설계',

  responsibilities: [
    '대시보드, 단어 목록, 오답 노트, 학습하기 화면',
    '인증 상태 관리, 학습 옵션 유지, API 통신 구조',
  ],

  auth401: {
    problem: `
액세스 토큰이 만료된 상태에서 대시보드 진입 시 여러 API가 동시에 호출.
모두 401 에러 반환 → 각각 토큰 재발급 시도 → 상태 불일치.
    `.trim(),

    solution:
      'Promise Queue 도입 — 토큰 재발급을 한 번만 실행, 나머지는 대기',

    mechanism: [
      '1. 401 에러 발생',
      '2. 토큰 재발급 진행 중인지 확인',
      '3. 진행 중이면 Queue에 대기',
      '4. 재발급 완료 후 대기 요청들이 새 토큰으로 재실행',
    ],

    advantage: '사용자가 토큰 만료를 인지하지 못한 상태에서도 매끄럽게 서비스 이용 가능',

    disadvantage: 'Queue 관리 로직으로 코드 복잡도 증가',

    result: '인증 실패로 인한 화면 멈춤 제거, 사용자 경험 개선',
  },

  stateManagement: {
    separation: {
      reactQuery: '서버 데이터 (API 응답, 캐싱)',
      zustand: '클라이언트 UI 상태 (로딩, 모달, 선택)',
    },

    whyZustand: [
      'Redux는 설정이 무거움 — 간단한 상태 공유만 필요',
      '학습 옵션 유지, 모달 상태 같은 경량 데이터 관리 최적',
    ],

    principle: '서버 데이터는 React Query, 화면 내부 상태는 Zustand',

    result: '책임이 명확하게 분리되어 유지보수와 디버깅이 쉬움',

    lesson: '상태 도구를 두 개 사용하면서 "어디에 뭘 넣을지" 명확한 기준이 중요',
  },

  retrospective: {
    keyLearning: '정상 흐름뿐 아니라 예외 상황도 먼저 설계해야 함',

    coreExperience: '401 동시성 문제 — 여러 요청이 동시 실패하는 예외를 반드시 고려',

    improvements: [
      '인증 로직과 API 계층을 더 깔끔하게 분리',
      '테스트 코드 추가로 회귀 버그 방어',
    ],

    lesson:
      '이후부터 기능을 만들 때 정상 흐름뿐 아니라 예외 상황도 먼저 생각하는 습관이 생겼음',
  },
} as const;