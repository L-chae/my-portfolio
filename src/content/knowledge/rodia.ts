// src/content/knowledge/rodia.ts
// Rodia 프로젝트: 디자인 시스템, 모노레포, API 아키텍처

export const rodia = {
  summary: `
웹과 모바일에서 동일한 디자인 경험을 제공하기 위해 구축한 모노레포 기반 디자인 시스템 및 API 아키텍처.
단일 JSON 토큰에서 시작해 Zod 검증, Orval 자동화, Feature API 계층 설계까지 진행.
  `.trim(),

  keywords: ['rodia', '디자인시스템', '토큰', 'json', 'orval', 'monoreporeact native', 'zod'],

  designSystem: {
    problem: `
웹과 모바일 동시 개발 환경에서 디자인 에셋(색상, 폰트) 파편화.
UI 변경 시 수정 누락 및 플랫폼 간 불일치 발생.
JSON 수동 편집 시 휴먼 에러(오타, 스키마 누락) 검증 불가.
    `.trim(),

    decision: `
JSON으로 단일 진실 공급원(SSOT) 구축 — 플랫폼 독립적 포맷.
빌드 파이프라인으로 웹/모바일용 파일 자동 생성.
Zod로 스키마 검증 — 빌드 단계에서 오류 원천 차단.
    `.trim(),

    tradeoff: {
      pros: [
        'UI 변경 공수 50% 감소',
        '명세 오류 프로덕션 도달 원천 차단',
        '새로운 플랫폼 추가 시 JSON만 확장',
      ],
      cons: [
        '빌드 스크립트 관리 복잡도',
        'JSON 크기 증가 시 수동 편집 어려움',
        '디자이너 직접 수정 불가능 (개발자 의존성)',
      ],
    },

    result: 'UI 변경 공수 50% 감소. 명세 오류가 프로덕션까지 도달하는 상황 완전 차단.',

    lesson: '토큰 포맷 선택은 "누가 이를 수정할 것인가"가 먼저 결정돼야 함',

    nextStep: 'Figma Token 연동 — 디자이너가 Figma에서 수정하면 자동 배포',
  },

  monorepo: {
    problem: '웹/모바일 저장소 분리 → 토큰 변경 시 동시 수정, npm publish/install 배포 조율 필요',

    decision: '모노레포 통합 → 한 번의 커밋으로 양쪽 플랫폼 동시 업데이트 (pnpm workspace)',

    whyNotTurborepo: '빌드 캐싱과 병렬 빌드 불필요 — 프로젝트 규모가 작으면 pnpm 충분',

    result: '토큰 변경 → 빌드 → 배포가 하나의 PR로 원자적 처리',
  },

  reactNativeIntegration: {
    problem:
      'Metro 번들러의 모노레포 심볼릭 링크 직접 참조 불안정 → metro.config.js 복잡도 폭증',

    decision: '기술 완벽도 포기 → 아키텍처 단순화 — 공통 패키지를 빌드된 JS로 제공',

    lesson: '기술적 "가능"과 현실적 "선택"은 다름 — 팀의 용인 범위와 도구 성숙도 먼저 고려',

    result: 'Metro 이슈 제거, 웹/모바일 통합 빌드 안정화',
  },

  apiArchitecture: {
    orval: {
      problem: 'API 40개 증가 → 수동 타입 작성 → 명세 변경 시 3~4곳 누락 → 런타임 에러',

      decision: 'Orval 도입 → OpenAPI 스펙 기반 타입 + React Query 훅 자동 생성',

      whyOrval: 'openapi-typescript는 훅 생성 미지원 → Orval이 최적',

      result: 'API 명세 변경 시 타입도 자동 동기화 → 컴파일 타임 100% 감지',
    },

    featureApi: {
      problem:
        'Generated 타입을 UI가 직접 사용 → 서버 변경 시 수많은 컴포넌트 깨짐 + null 데이터 크래시',

      decision:
        'Feature API 계층 신설 → Mapper 함수로 변환 + fallback 처리',

      mapperExample:
        'Server: { userId: 123, user_name: "Kim", avatar: null } → UI: { id: 123, name: "Kim", avatar: "default.png" }',

      result: '서버 변경 시 Feature API만 수정 → UI 컴포넌트 0건 수정',

      lesson: '자동 생성된 코드를 직접 쓰는 것과 "하나의 계층을 통해 소비하는 것"은 유지보수 비용이 다름',
    },
  },

  retrospective: {
    whatWentWell: [
      '단일 토큰 소스로 웹/모바일 동기화 성공',
      'Orval + Feature API로 API 변경 영향 격리',
      'Zod로 배포 전 검증율 100%',
    ],

    whatFailed: [
      '관리자(데이터 중심) + 사용자(경험 중심) 무리한 공통화 → 분기 로직 비대화',
      'Metro 호환성 문제에 과도한 시간 투자',
    ],

    designSystemIsNot: ['색상 관리 도구', '모든 UI 요소의 무조건 공통화', '완벽한 기술 구현'],

    designSystemIs: ['변경 프로세스 자동화', '영향 범위 격리', '팀 현실에 맞는 설계'],

    keyLessons: [
      '도메인 성격을 먼저 분류 — 무조건 공통화는 오버엔지니어링',
      '기술적 완벽도보다 비즈니스 목적에 맞는 격리가 가치 있음',
      '기술 체크 후 현실성 판단 — 포기할 줄 아는 용기',
    ],
  },
} as const;