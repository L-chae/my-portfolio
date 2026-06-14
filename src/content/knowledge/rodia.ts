// src/content/knowledge/rodia.ts
// Rodia 프로젝트: 화물 운송 중개 플랫폼
// 목적:
// 1. 기본 답변은 비전공자, 인사팀, 실무자 모두 이해할 수 있게 설명
// 2. 기술 용어는 사용자가 깊게 물어볼 때만 technicalDetail에서 사용
// 3. 기술 스택은 능숙도 주장이 아니라 "어떤 범위에서 사용했는지"로만 설명

export const rodia = {
  id: "rodia",

  name: "Rodia",

  summary:
    `Rodia는 화주와 기사가 주문, 견적, 운행 상태를 각자의 역할에 맞게 확인할 수 있도록 만든 화물 운송 중개 플랫폼입니다.
React Native와 Expo 기반으로 앱을 개발했으며, 저는 앱 화면 구현과 함께 API 연동 흐름, 모바일 디버깅 방식, 역할별 UI 정책, 디자인 기준 관리 흐름을 정리하는 데 참여했습니다.
기본 설명에서는 어려운 구현 용어보다 “반복 작업과 디버깅 비용을 줄이기 위한 구조를 만든 경험”으로 설명합니다.
 `.trim(),

  keywords: [
    "rodia",
    "Rodia",
    "화물 운송",
    "물류 서비스",
    "화주 앱",
    "기사 앱",
    "주문",
    "견적",
    "운행 상태",
    "React Native",
    "Expo",
    "TypeScript",
    "모바일 앱",
    "API 자동화",
    "OpenAPI",
    "Orval",
    "Axios",
    "인앱 API 디버거",
    "API 로그",
    "cURL",
    "역할별 UI 정책",
    "디자인 토큰",
    "Zod",
    "pnpm Workspaces",
    "Monorepo",
  ],

  uiText: {
    title: "Rodia",
    subtitle: "화물 운송 중개 플랫폼",
    description:
      "화주와 기사가 주문, 견적, 운행 상태를 각자의 역할에 맞게 확인할 수 있도록 만든 React Native 기반 팀 프로젝트입니다.",
    role: "React Native 앱 구현 · API 연동 구조 정리 · 모바일 디버깅 흐름 개선",
    highlight:
      "API 명세 변경 대응, 모바일 통신 이슈 공유, 역할별 UI 정책, 디자인 기준 관리를 반복 가능한 구조로 정리했습니다.",
  },

  projectInfo: {
    period: "2026.02 ~ 2026.03",
    team: "총 4명, FE 2명, BE 2명",
    type: "팀 프로젝트 / 화물 운송 중개 플랫폼",
    role: "React Native 앱 개발 + 공통화/DX 개선",
    githubUrl: "https://github.com/L-chae/Rodia",
  },

  techStack: {
    app: ["React Native", "Expo", "TypeScript"],
    workspace: ["pnpm Workspaces", "Monorepo"],
    api: ["Axios", "Orval", "OpenAPI"],
    validation: ["Zod"],
    dx: ["In-app API Debugger", "cURL export"],
  },

  publicDescription: {
    oneLine:
      "Rodia는 화주와 기사가 각자의 역할에 맞게 주문, 견적, 운행 상태를 확인할 수 있도록 만든 화물 운송 중개 앱입니다.",

    problem:
      "앱 개발 과정에서 API 명세 변경, 모바일 통신 오류 확인, 역할별 화면 규칙, Web/App 스타일 기준 관리가 반복적으로 발생했습니다.",

    solution:
      "API 명세를 기준으로 코드를 생성하는 흐름을 만들고, 앱 안에서 API 요청과 응답을 확인할 수 있는 디버깅 화면을 구성했습니다. 또한 역할별 UI 규칙과 디자인 기준을 따로 정리해 화면마다 같은 조건을 반복해서 작성하지 않도록 했습니다.",

    result:
      "API 변경 대응, 모바일 통신 이슈 공유, 역할별 화면 처리, 디자인 기준 관리를 더 일관된 흐름으로 다룰 수 있게 정리했습니다.",

    learning:
      "앱 개발에서는 화면 구현뿐 아니라 API 변경에 대응하는 방식, 문제를 재현해 공유하는 방식, 역할별 정책을 분리하는 구조가 중요하다는 점을 배웠습니다.",
  },

  contributionScope: {
    teamContext:
      "총 4명 팀 프로젝트에서 프론트엔드 2명 중 한 명으로 참여했습니다.",

    roleSummary:
      "React Native 앱 화면 구현과 함께 API 연동 자동화, 모바일 디버깅 흐름, 역할별 UI 정책, 디자인 토큰 검증 흐름 정리에 참여했습니다.",

    myFocus: [
      "화주 앱과 기사 앱의 주요 화면 구현",
      "React Native와 Expo 기반 앱 개발",
      "API 명세 변경에 대응하기 위한 생성 흐름 정리",
      "생성된 API 코드가 공통 요청 흐름을 거치도록 연결",
      "앱 내부에서 API 요청과 응답을 확인할 수 있는 디버깅 화면 구현",
      "API 이슈를 백엔드와 재현 가능한 형태로 공유하기 위한 cURL 추출 흐름 구현",
      "화주와 기사 역할에 따라 달라지는 UI 규칙 분리",
      "Web/App 공통 스타일 기준을 위한 디자인 토큰 관리 흐름 정리",
      "AI 활용 개발 과정에서 스타일 기준이 흔들리지 않도록 가이드 문서화",
    ],

    doNotClaim: [
      "전체 서비스를 혼자 개발했다고 말하지 않기",
      "백엔드까지 담당했다고 말하지 않기",
      "물류 시스템 전체를 구축했다고 말하지 않기",
      "실제 운영 환경에서 성능을 개선했다고 말하지 않기",
      "수치가 없는 성과를 만들어 말하지 않기",
    ],
  },

  implementationScope: {
    implemented: [
      "React Native 앱 화면 구현",
      "화주 앱 주요 화면 구현",
      "기사 앱 주요 화면 구현",
      "OpenAPI 명세 기반 API client/type 생성 흐름 정리",
      "API 명세 전처리 흐름 구성",
      "생성된 API 함수가 공통 Axios 인스턴스를 거치도록 연결",
      "앱 내부 API Debug Logs 화면 구현",
      "요청 / 응답 / 에러 로그 확인 흐름 구성",
      "민감정보를 마스킹한 cURL 추출 흐름 구현",
      "화주 / 기사 역할별 UI 정책 분리",
      "디자인 토큰 단일 원본 관리 흐름 정리",
      "Zod 기반 디자인 토큰 검증 흐름 정리",
    ],

    limitedOrContextual: [
      "OpenAPI 자동화는 프론트엔드 API client/type 생성 흐름에 한정",
      "인앱 API 디버거는 개발 환경에서 API 이슈를 확인하고 공유하기 위한 용도",
      "requestId는 앱 내부에서 요청 흐름을 묶어 보기 위한 값이며, 서버가 보장하는 고유 식별자는 아님",
      "디자인 토큰 검증은 빌드 단계에서 잘못된 토큰 값을 확인하기 위한 흐름",
      "AI 활용 개발 가이드는 AI 모델 개발이 아니라 개발 과정에서 스타일 기준을 유지하기 위한 문서화",
    ],

    notImplemented: [
      "백엔드 API 구현",
      "물류 배차 알고리즘 구현",
      "실제 운영 환경의 물류 시스템 운영",
      "실제 사용자 지표 기반 성과 측정",
      "성능 개선 수치 검증",
      "AI 모델 직접 개발",
      "디자인 시스템 전체 구축",
      "보안 시스템 구축",
    ],
  },

  technologies: [
    {
      name: "React Native",
      category: "app",
      usageScope:
        "화주와 기사 역할에 맞는 모바일 앱 화면을 구현하는 데 사용했습니다.",
      plainEvidence:
        "Rodia는 React Native 기반 앱 프로젝트이며, 화주 앱과 기사 앱의 주요 화면 구현에 사용했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "React Native를 전문적으로 능숙하게 다룬다고 단정하지 않기",
        "대규모 모바일 앱을 운영했다고 말하지 않기",
      ],
    },
    {
      name: "Expo",
      category: "app",
      usageScope:
        "React Native 앱 개발 환경을 구성하고 실행하는 데 사용했습니다.",
      plainEvidence: "프로젝트 앱 개발 기반으로 Expo를 사용했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "Expo 인프라를 깊게 운영했다고 말하지 않기",
        "앱 배포 자동화 전체를 구축했다고 말하지 않기",
      ],
    },
    {
      name: "TypeScript",
      category: "language",
      usageScope:
        "앱 화면, API 연동 코드, 공통 구조를 타입 기반으로 작성하는 데 사용했습니다.",
      plainEvidence:
        "React Native 앱과 OpenAPI 기반 생성 코드 흐름에서 TypeScript를 사용했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "대규모 타입 아키텍처를 설계했다고 말하지 않기",
        "컴파일 타임에 모든 오류를 완전히 차단했다고 말하지 않기",
      ],
    },
    {
      name: "OpenAPI / Orval",
      category: "api-automation",
      usageScope:
        "백엔드 API 명세를 기준으로 프론트엔드 API 함수와 타입을 생성하는 흐름을 만드는 데 사용했습니다.",
      plainEvidence:
        "OpenAPI 스펙을 전처리한 뒤 Orval로 API client와 타입을 생성하는 흐름을 정리했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "API 변경 대응을 완전히 자동화했다고 말하지 않기",
        "수작업을 완전히 없앴다고 말하지 않기",
        "백엔드 명세 오류를 100% 차단했다고 말하지 않기",
      ],
    },
    {
      name: "Axios",
      category: "api-client",
      usageScope:
        "생성된 API 함수가 공통 요청 흐름을 거치도록 연결하고, 요청 / 응답 / 에러 로깅을 처리하는 데 사용했습니다.",
      plainEvidence:
        "공통 API 요청 흐름과 인앱 API 디버거의 로그 수집에 사용했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "모든 API 오류를 완전히 처리했다고 말하지 않기",
        "보안 수준의 네트워크 시스템을 구축했다고 말하지 않기",
      ],
    },
    {
      name: "In-app API Debugger",
      category: "debugging",
      usageScope:
        "모바일 앱 내부에서 API 요청, 응답, 에러를 확인하고 재현 가능한 형태로 공유하기 위해 구현했습니다.",
      plainEvidence: "API Debug Logs 화면과 cURL 추출 흐름을 구성했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "운영 환경 모니터링 시스템을 구축했다고 말하지 않기",
        "모든 모바일 통신 이슈를 해결했다고 말하지 않기",
      ],
    },
    {
      name: "cURL export",
      category: "debugging",
      usageScope:
        "API 이슈를 말로 설명하는 대신, 같은 요청을 재현 가능한 형태로 공유하기 위해 사용했습니다.",
      plainEvidence:
        "민감정보를 마스킹한 뒤 cURL 형태로 요청을 복사할 수 있도록 했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "협업 속도를 수치로 개선했다고 말하지 않기",
        "백엔드 디버깅을 완전히 대체했다고 말하지 않기",
      ],
    },
    {
      name: "Policy Layer",
      category: "ui-logic",
      usageScope:
        "화주와 기사 역할에 따라 달라지는 UI 규칙을 화면 컴포넌트 밖으로 분리하는 데 사용했습니다.",
      plainEvidence:
        "역할과 상태에 따라 badge, disabled, label 같은 값을 반환하는 정책 함수를 분리했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "서버 상태 변경 시 UI 수정이 0건이라고 말하지 않기",
        "복잡한 권한 시스템을 구축했다고 말하지 않기",
      ],
    },
    {
      name: "Design Tokens",
      category: "design-system",
      usageScope:
        "Web/App에서 공통으로 사용할 색상, 간격, 폰트 기준을 하나의 원본으로 관리하기 위해 사용했습니다.",
      plainEvidence:
        "tokens.json을 단일 원본으로 두고 플랫폼별 산출물을 생성하는 흐름을 정리했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "디자인 시스템 전체를 구축했다고 말하지 않기",
        "모든 디자인 값을 자동화했다고 말하지 않기",
      ],
    },
    {
      name: "Zod",
      category: "validation",
      usageScope:
        "디자인 토큰 JSON 값이 잘못 들어왔을 때 빌드 단계에서 확인하기 위해 사용했습니다.",
      plainEvidence: "토큰 구조와 값 형식을 검증하는 흐름에 사용했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "모든 스타일 오류를 완전히 방지했다고 말하지 않기",
        "컴파일 타임에 100% 감지했다고 말하지 않기",
      ],
    },
    {
      name: "pnpm Workspaces / Monorepo",
      category: "workspace",
      usageScope:
        "앱과 공통 패키지, 디자인 토큰 패키지를 함께 관리하기 위해 사용했습니다.",
      plainEvidence:
        "Web/App과 공통 자산을 같은 작업 공간 안에서 관리하는 구조로 정리했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "대규모 모노레포를 운영했다고 말하지 않기",
        "복잡한 빌드 파이프라인을 완전히 설계했다고 말하지 않기",
      ],
    },
  ],

  serviceFeatures: {
    shipperApp: {
      description:
        "화주가 홈 화면에서 주문과 견적 흐름을 확인하고, 견적 요청 화면을 통해 운송 요청을 진행하는 앱 화면입니다.",
      plainRole:
        "화주가 운송 요청과 견적 흐름을 확인할 수 있도록 구성했습니다.",
      screens: ["화주 앱 홈", "화주 앱 견적 요청"],
    },

    driverApp: {
      description:
        "기사가 홈 화면에서 배정 또는 운행 관련 정보를 확인하고, 오더 상세 화면에서 운행 정보를 확인하는 앱 화면입니다.",
      plainRole:
        "기사가 배정된 운송 정보와 오더 상세 내용을 확인할 수 있도록 구성했습니다.",
      screens: ["기사 앱 홈", "기사 앱 오더 상세"],
    },
  },

  problemSummary: {
    publicProblem:
      "Web/App을 함께 개발하는 과정에서 API 명세 변경, 모바일 통신 오류 확인, 역할별 UI 규칙, 스타일 기준 관리가 반복적으로 발생했습니다.",

    publicAction:
      "API 명세 기반 코드 생성, 앱 내부 API 로그 확인, 역할별 UI 정책 분리, 디자인 토큰 검증 흐름을 정리했습니다.",

    publicValidation:
      "생성 결과, 앱 내부 API 로그, cURL 재현 흐름, 디자인 토큰 검증 로그를 통해 동작을 확인했습니다.",
  },

  apiAutomation: {
    title: "API 명세 변경에 대응하기 위한 자동 생성 흐름",

    publicProblem: `


백엔드 API 명세가 바뀔 때마다 프론트엔드에서 API 호출 코드와 타입을 직접 맞추면 누락이 생길 수 있습니다.
특히 여러 화면에서 같은 API를 사용할수록 수동 수정 비용이 커질 수 있었습니다.
`.trim(),

    publicSolution: `


OpenAPI 명세를 기준으로 API 함수와 타입을 생성하는 흐름을 만들었습니다.
다만 명세를 그대로 사용하면 앱에 필요 없는 API가 섞이거나, 응답 타입이 잘못 생성될 수 있어 생성 전에 명세를 정리하는 단계를 두었습니다.
`.trim(),

    publicResult:
      "API 명세 변경이 있을 때 수동으로 맞추는 대신, 정리된 명세와 생성 결과를 기준으로 변경을 반영할 수 있는 흐름을 만들었습니다.",

    publicLearning:
      "API 자동화는 단순히 코드를 생성하는 일이 아니라, 잘못된 명세를 보정하고 앱에 필요한 범위만 걸러내는 과정까지 포함해야 한다는 점을 배웠습니다.",

    simpleFlow: [
      "1. 백엔드 API 명세를 가져옴",
      "2. 앱에서 사용하기 어렵거나 불필요한 부분을 정리",
      "3. 정리된 명세를 기준으로 API 함수와 타입을 생성",
      "4. 생성된 코드가 공통 API 요청 흐름을 거치도록 연결",
    ],

    technicalDetail: {
      exposeOnlyWhenAsked: true,

      title: "OpenAPI + Orval 생성 파이프라인",

      terms: [
        "OpenAPI",
        "Orval",
        "tags-split",
        "custom instance",
        "mutator",
        "content-type",
        "admin API filtering",
      ],

      pipeline: [
        "백엔드 서버에서 openapi.raw.json fetch",
        "fetch timeout은 10초로 설정하고 실패 시 캐시된 raw 파일 사용",
        "fix-openapi-path-params.mjs에서 OpenAPI 스펙 전처리",
        "openapi.fixed.json 저장",
        "Orval이 openapi.fixed.json 기준으로 API 함수와 스키마 파일 생성",
        "mode: tags-split 설정으로 태그별 모듈 폴더 분리",
        "generated 디렉터리에 API 함수와 스키마 파일 생성",
      ],

      preprocessing: {
        steps: [
          "path params 누락 보완",
          "content-type */*를 application/json으로 일괄 치환",
          "/api/admin 경로와 admin 관련 스키마 제거",
          "shipper-address-controller 태그를 shipper-address로 정규화",
        ],

        reasonForContentTypeFix:
          "raw spec의 일부 응답 content-type이 */*로 선언되어 Orval이 blob 타입을 생성할 수 있었기 때문에 application/json으로 보정했습니다.",
      },

      adminFiltering: {
        reason:
          "사용자 앱에서 필요하지 않은 admin API가 generated 코드에 섞이지 않도록 여러 단계에서 방어했습니다.",

        layers: [
          "전처리 단계에서 /api/admin 경로와 admin 관련 스키마 제거",
          "Orval filters.tags: [/^(?!admin-)/i]로 admin 태그 제외",
          "admin-path-filter.cjs transformer로 경로 레벨에서 최종 차단",
        ],

        whyThreeLayers:
          "전처리, 태그 필터, 경로 필터가 막을 수 있는 범위가 달라서 여러 단계로 나누었습니다.",
      },

      generatedResult: {
        mode: "tags-split",
        output: "generated/",
        modules: 30,
        files: 172,
        description:
          "Orval 생성 결과로 태그별 API 함수와 스키마 파일이 generated 디렉터리에 생성되었습니다.",
      },

      implementationEvidence: {
        command: "pnpm orval:gen",
        rawSpec: "openapi.raw.json",
        fixedSpec: "openapi.fixed.json",
        generatedOutput: "generated/index.ts",
        codeUrl:
          "https://github.com/Haru-hyuk/Freight/commit/59cd887949ef5fff4867af6f6454df3c6bd10ecb",
      },
    },
  },

  customInstance: {
    title: "생성된 API 코드와 공통 요청 흐름 연결",

    publicProblem:
      "API 함수가 제각각 다른 방식으로 서버와 통신하면 인증 처리, 에러 처리, 디버그 로그 수집 같은 공통 흐름을 일관되게 적용하기 어렵습니다.",

    publicSolution:
      "생성된 API 함수가 공통 요청 흐름을 반드시 거치도록 연결했습니다. 이를 통해 앱에서 사용하는 인증 처리, 에러 처리, 디버그 로그 수집 흐름이 한곳에서 적용되도록 했습니다.",

    publicLearning:
      "자동 생성된 코드도 앱의 공통 요청 흐름과 연결되지 않으면 관리가 어려워질 수 있다는 점을 배웠습니다.",

    technicalDetail: {
      exposeOnlyWhenAsked: true,

      title: "Orval custom instance와 Axios 공통 인스턴스 연결",

      terms: ["custom instance", "mutator", "Axios instance", "interceptor"],

      implementationDetails: [
        "Orval override.mutator.path로 custom-instance.ts 연결",
        "Orval 생성 함수가 customInstance를 통해 apiClient.request를 호출하도록 구성",
        "/file 경로가 아닌데 responseType이 blob이면 responseType 제거",
        "FormData payload 요청은 timeout을 60초로 연장",
        "응답에서는 response.data 반환",
      ],

      roleDifference: {
        mutator:
          "Orval 생성 함수가 어떤 axios 인스턴스를 사용할지 결정하는 요청 생성 단계의 연결 지점",
        interceptor:
          "인증 헤더 주입, 에러 처리, 401 대응, 로깅처럼 요청/응답 처리 단계에서 동작하는 계층",
      },

      interviewPoint:
        "interceptor는 요청/응답을 처리하는 계층이고, mutator는 Orval 생성 함수가 공통 axios 인스턴스를 반드시 거치도록 강제하는 연결 계층입니다.",
    },
  },

  apiDebugLogger: {
    title: "모바일 API 이슈를 앱 안에서 확인하고 공유하는 흐름",

    publicProblem: `


모바일 앱은 웹처럼 브라우저 Network 탭을 바로 확인하기 어렵습니다.
그래서 API 연동 중 문제가 생겼을 때 요청 주소, 응답 상태, 에러 메시지를 말로 설명해야 하는 경우가 많았습니다.
`.trim(),

    publicSolution: `


앱 안에서 API 요청, 응답, 에러를 확인할 수 있는 Debug Logs 화면을 만들었습니다.
또한 민감정보를 가린 뒤 cURL 형태로 복사할 수 있게 해, 백엔드와 같은 요청을 기준으로 문제를 공유할 수 있도록 했습니다.
`.trim(),

    publicResult:
      "모바일 통신 이슈를 말로 설명하는 대신, 앱 내부 로그와 cURL을 통해 재현 가능한 요청 정보로 공유할 수 있는 흐름을 만들었습니다.",

    publicLearning:
      "모바일 API 디버깅에서는 에러가 발생했다는 사실보다, 같은 요청을 다시 재현하고 공유할 수 있는 정보가 중요하다는 점을 배웠습니다.",

    technicalDetail: {
      exposeOnlyWhenAsked: true,

      title: "Axios interceptor 기반 인앱 API 디버거",

      terms: [
        "Axios interceptor",
        "requestId",
        "API Debug Logs",
        "cURL export",
        "JWT masking",
      ],

      implementationDetails: [
        "Axios interceptor에서 request / response / error 중앙 수집",
        "requestId로 요청 흐름 묶기",
        "JWT claims preview 제공",
        "JWT 토큰 등 민감정보 마스킹",
        "최근 200건 로그 보관",
        "JSON / 요약 정보 / cURL 3가지 뷰 제공",
        "AUTH, QUOTE, MATCH, OFFER, NOTI 등 API 태그 제공",
        "2XX, 4XX, 5XX, NETWORK_ERROR 상태 필터 제공",
        "LATEST, STATUS, TAG 정렬 제공",
        "개발 환경에서만 env 플래그로 활성화",
      ],

      requestId: {
        generation:
          "클라이언트에서 Date.now() + Math.random() 또는 uuid 방식으로 생성",
        limitation:
          "서버에서 내려주는 값이 아니므로 충돌 가능성은 낮지만 완전한 유일성을 보장한다고 말하지 않습니다.",
      },

      security: {
        reasonForDevOnly:
          "요청/응답에는 JWT 토큰, 내부 API 구조 등 민감한 정보가 포함될 수 있으므로 운영 환경에는 노출하지 않습니다.",
        activation: "__DEV__ 또는 env 플래그로 개발 환경에서만 활성화합니다.",
      },

      validation: {
        evidence:
          "인앱 API Debug Logs 화면에서 인증 요청 실패 로그가 기록되고 메시지가 표시되는 흐름을 캡처했습니다.",
        demoFile: "/evidence/rodia/curl.gif",
      },
    },
  },

  policyLayer: {
    title: "역할별 화면 규칙을 분리한 구조",

    publicProblem:
      "화주와 기사 역할에 따라 같은 운송 상태도 화면에서 다르게 보여야 했습니다. 이 규칙을 화면마다 직접 작성하면 조건문이 여러 곳에 흩어질 수 있었습니다.",

    publicSolution:
      "서버에서 받은 상태를 화면에 필요한 값으로 바꾸는 정책 함수를 따로 분리했습니다. 화면은 그 결과만 사용하고, 역할별 조건은 정책 레이어에서 처리하도록 했습니다.",

    publicResult:
      "화주와 기사 역할에 따라 달라지는 UI 규칙을 화면 컴포넌트가 아니라 별도의 정책 함수에서 관리할 수 있게 했습니다.",

    publicLearning:
      "역할과 상태 조합이 많은 화면에서는 조건문을 화면 안에 직접 두기보다, 별도의 규칙 함수로 분리하는 것이 관리에 더 적합하다는 점을 배웠습니다.",

    technicalDetail: {
      exposeOnlyWhenAsked: true,

      terms: ["policy layer", "badge", "disabled", "label"],

      description:
        "서버 상태를 UI에서 사용할 badge, disabled, label 같은 값으로 변환하는 정책 함수를 분리했습니다.",

      example:
        "getMeetingStatusTokens(status, role)처럼 상태와 역할을 받아 UI 표시 값을 반환하는 구조입니다.",
    },
  },

  designTokens: {
    title: "Web/App 스타일 기준을 하나로 관리하는 흐름",

    publicProblem:
      "Web과 App에서 색상, 간격, 폰트 같은 스타일 기준이 따로 관리되면 같은 서비스 안에서도 화면 기준이 달라질 수 있습니다.",

    publicSolution:
      "디자인 토큰 JSON 파일을 단일 원본으로 두고, 웹과 앱에서 사용할 스타일 산출물을 생성하는 흐름을 만들었습니다. 또한 잘못된 토큰 값이 들어왔을 때 빌드 단계에서 확인할 수 있도록 검증을 추가했습니다.",

    publicResult:
      "디자인 기준을 한곳에서 관리하고, 잘못된 값은 산출물로 변환되기 전에 확인할 수 있는 흐름을 만들었습니다.",

    publicLearning:
      "디자인 토큰은 단일 원본을 만드는 것뿐 아니라, 실제 화면에 적용되기 전에 값의 구조와 형식을 검증하는 과정까지 필요하다는 점을 배웠습니다.",

    technicalDetail: {
      exposeOnlyWhenAsked: true,

      title: "디자인 토큰 SSOT와 Zod 기반 빌드 검증",

      terms: [
        "tokens.json",
        "SSOT",
        "Zod",
        "safeParse",
        "Tailwind",
        "React Native theme",
      ],

      pipeline: [
        "rodia.tokens.json을 단일 소스로 관리",
        "Zod schema로 토큰 구조와 값 형식 검증",
        "build-tokens.ts에서 safeParse 실행",
        "웹용 Tailwind semantic color config 생성",
        "모바일용 React Native theme object 생성",
      ],

      packageStructure: {
        root: "packages/design-tokens",
        source: "packages/design-tokens/src/rodia.tokens.json",
        schema: "packages/design-tokens/src/schema.ts",
        mapping: "packages/design-tokens/src/mapping.ts",
        buildScript: "packages/design-tokens/scripts/build-tokens.ts",
        colorUtil: "packages/design-tokens/scripts/color.ts",
      },

      zodReason:
        "TypeScript는 컴파일 타임 검증이고, Zod는 런타임 검증입니다. JSON 토큰 파일은 외부 데이터이므로 빌드 스크립트 실행 시 Zod로 실제 값을 검증했습니다.",

      validationEvidence: {
        scenario:
          "Invalid hex 값을 주입했을 때 Zod schema validation failed로 빌드 단계에서 검증 실패가 발생하는 흐름을 확인했습니다.",
        codeUrl:
          "https://github.com/Haru-hyuk/Freight/blob/cbb317945292ae850af805a0e66b5cb29efc72b3/frontend/rodia-monorepo/packages/design-tokens/scripts/build-tokens.ts",
      },
    },
  },

  monorepo: {
    title: "공통 자산을 함께 관리하기 위한 작업 공간 구조",

    publicProblem:
      "앱과 공통 패키지, 디자인 토큰처럼 함께 움직여야 하는 자산이 분리되어 있으면 한쪽만 수정되고 다른 쪽은 누락될 수 있습니다.",

    publicSolution:
      "pnpm Workspaces 기반 구조에서 앱과 공통 패키지, 디자인 토큰 패키지를 함께 관리하도록 정리했습니다.",

    publicResult:
      "공통 토큰과 관련 빌드 흐름을 하나의 작업 공간 안에서 관리할 수 있도록 했습니다.",

    publicLearning:
      "모노레포는 단순히 코드를 한 저장소에 모으는 것이 아니라, 공통 자산의 변경과 검증 흐름을 함께 관리하기 위한 구조로 접근해야 한다는 점을 배웠습니다.",
  },

  aiDevelopmentGuide: {
    title: "AI 활용 개발 과정의 스타일 일관성 가이드",

    publicProblem:
      "AI를 활용해 코드를 작성하거나 UI를 확장할 때, 같은 프로젝트 안에서도 스타일 기준이 흔들릴 수 있었습니다.",

    publicSolution:
      "AI에게 전달할 프롬프트와 스타일 가이드를 문서화해, UI 작성 기준과 공통 컴포넌트 사용 기준을 맞추려 했습니다.",

    publicResult:
      "AI 활용 과정에서도 프로젝트의 기존 스타일 기준을 유지하기 위한 가드레일을 마련했습니다.",

    publicLearning:
      "AI를 개발 과정에 사용할 때는 결과물을 빠르게 얻는 것보다, 프로젝트의 기존 기준을 유지하도록 입력 맥락을 정리하는 것이 중요하다는 점을 배웠습니다.",

    doNotClaim: [
      "AI 모델을 직접 개발했다고 말하지 않기",
      "AI가 전체 코드를 자동으로 작성했다고 말하지 않기",
      "AI 개발 자동화 시스템을 구축했다고 말하지 않기",
    ],
  },

  retrospective: {
    keyLearning:
      "앱 개발에서는 화면 구현뿐 아니라 API 명세 변경, 디버깅 공유, 역할별 정책, 디자인 기준 관리까지 함께 고려해야 한다는 점을 배웠습니다.",

    whatWorked: [
      "API 명세 변경에 대응하기 위해 OpenAPI 기반 생성 흐름을 만든 점",
      "모바일 API 문제를 앱 내부 로그와 cURL로 공유할 수 있게 한 점",
      "화주와 기사 역할에 따른 UI 규칙을 정책 레이어로 분리한 점",
      "디자인 토큰을 단일 원본으로 두고 검증 흐름을 추가한 점",
      "AI 활용 개발 과정에서 스타일 기준을 유지하기 위한 가이드를 문서화한 점",
    ],

    whatWasDifficult: [
      "API 명세가 그대로 사용하기 어려운 형태로 내려오는 문제",
      "사용자 앱에 필요 없는 API가 생성 코드에 섞이는 문제",
      "모바일 통신 이슈를 백엔드와 같은 맥락으로 공유하는 문제",
      "화주 / 기사 역할과 운송 상태 조합을 화면마다 흩어지지 않게 관리하는 문제",
      "Web/App 스타일 기준을 하나로 유지하는 문제",
    ],

    lesson:
      "반복되는 문제는 화면 안에서 임시로 처리하기보다, 생성 흐름, 디버깅 도구, 정책 레이어, 토큰 검증처럼 재사용 가능한 구조로 정리하는 것이 중요하다는 점을 배웠습니다.",
  },

  interviewAnswers: {
    short:
      "Rodia는 화주와 기사의 주문, 견적, 운행 상태를 연결한 화물 운송 중개 플랫폼입니다. 저는 React Native 앱 화면 구현과 함께 API 연동 자동화, 모바일 디버깅 흐름, 역할별 UI 정책, 디자인 토큰 관리 흐름을 정리했습니다.",

    medium: `


Rodia는 화주와 기사가 주문, 견적, 운행 상태를 각자의 역할에 맞게 확인할 수 있도록 만든 React Native 기반 팀 프로젝트입니다.
저는 프론트엔드 2명 중 한 명으로 참여해 화주 앱과 기사 앱의 주요 화면을 구현했고, API 명세 변경에 대응하기 위한 생성 흐름과 모바일 API 디버깅 흐름을 정리했습니다.
또한 화주와 기사 역할에 따라 달라지는 UI 규칙을 정책 레이어로 분리하고, Web/App 스타일 기준을 디자인 토큰과 Zod 검증 흐름으로 관리했습니다.
`.trim(),

    detailed: `


Rodia는 화주와 기사의 주문, 견적, 운행 상태를 역할에 맞는 화면으로 연결한 화물 운송 중개 플랫폼입니다.
저는 React Native와 Expo 기반 앱 개발에 참여했고, 화주 앱과 기사 앱의 주요 화면을 구현했습니다.

이 프로젝트에서는 화면 구현뿐 아니라 프론트엔드 개발 과정에서 반복적으로 발생하는 문제를 구조화하는 데 집중했습니다.
API 명세가 바뀔 때마다 수동으로 API 호출 코드와 타입을 맞추는 부담을 줄이기 위해 OpenAPI 기반 생성 흐름을 정리했습니다.
또한 모바일 앱에서는 웹처럼 Network 탭을 바로 확인하기 어렵기 때문에, 앱 내부에서 API 요청과 응답을 확인하고 cURL로 공유할 수 있는 디버깅 흐름을 만들었습니다.

역할별 UI 규칙은 화면마다 조건문으로 처리하지 않고 정책 레이어로 분리했고, Web/App 스타일 기준은 디자인 토큰과 Zod 검증 흐름으로 관리했습니다.
이 경험을 통해 앱 개발에서는 기능 구현뿐 아니라 API 변경 대응, 디버깅 공유, 역할별 정책, 디자인 기준 관리까지 함께 고려해야 한다는 점을 배웠습니다.
`.trim(),

    highlight:
      "Rodia에서는 React Native 앱 개발뿐 아니라 API 명세 변경 대응, 모바일 API 디버깅, 역할별 UI 정책, 디자인 토큰 검증 흐름을 정리했습니다.",
  },

  followUpQuestions: [
    {
      question: "Rodia는 어떤 프로젝트인가요?",
      answer:
        `Rodia는 화주와 기사의 주문, 견적, 운행 상태를 역할에 맞는 화면으로 연결한 화물 운송 중개 플랫폼입니다.
React Native와 Expo 기반으로 앱을 개발했고, 저는 앱 화면 구현과 함께 API 연동 흐름, 모바일 디버깅 흐름, 역할별 UI 정책, 디자인 기준 관리 흐름을 정리했습니다.
     `.trim(),
      technicalTerms: [],
    },
    {
      question: "API 자동화는 왜 했나요?",
      answer:
        `백엔드 API 명세가 바뀔 때마다 프론트엔드에서 API 호출 코드와 타입을 직접 맞추면 누락이 생길 수 있습니다.
그래서 OpenAPI 명세를 기준으로 API 함수와 타입을 생성하는 흐름을 만들었습니다.
다만 명세를 그대로 사용하면 앱에 필요 없는 API가 섞이거나 응답 타입이 잘못 생성될 수 있어, 생성 전에 명세를 정리하는 단계를 두었습니다.
     `.trim(),
      technicalTerms: ["OpenAPI", "Orval", "API client", "type generation"],
    },
    {
      question: "모바일 API 디버거는 왜 만들었나요?",
      answer:
        `모바일 앱은 웹처럼 브라우저 Network 탭을 바로 확인하기 어렵습니다.
그래서 앱 안에서 API 요청, 응답, 에러를 확인할 수 있는 화면을 만들었습니다.
또한 민감정보를 가린 cURL을 복사할 수 있게 해, 백엔드와 같은 요청을 기준으로 문제를 공유할 수 있도록 했습니다.
     `.trim(),
      technicalTerms: ["Axios interceptor", "API Debug Logs", "cURL export"],
      evidenceImageIds: ["rodia-api-debug-curl"],
    },
    {
      question: "정책 레이어는 왜 분리했나요?",
      answer:
        `화주와 기사 역할에 따라 같은 운송 상태도 화면에서 다르게 보여야 했습니다.
이 조건을 화면마다 직접 작성하면 조건문이 여러 곳에 흩어질 수 있습니다.
그래서 서버 상태를 화면에 필요한 값으로 바꾸는 정책 함수를 분리하고, 화면은 그 결과만 사용하도록 했습니다.
     `.trim(),
      technicalTerms: ["policy layer", "badge", "disabled", "label"],
    },
    {
      question: "디자인 토큰은 어떻게 관리했나요?",
      answer:
        `Web과 App에서 색상, 간격, 폰트 기준이 달라지지 않도록 디자인 토큰 JSON 파일을 단일 원본으로 두었습니다.
그리고 웹과 앱에서 사용할 스타일 산출물을 생성하는 흐름을 만들었습니다.
잘못된 토큰 값이 들어왔을 때는 빌드 단계에서 확인할 수 있도록 Zod 검증을 추가했습니다.
     `.trim(),
      technicalTerms: ["tokens.json", "SSOT", "Zod", "safeParse"],
    },
    {
      question: "mutator와 interceptor는 어떻게 다른가요?",
      answer:
        `mutator는 생성된 API 함수가 어떤 공통 요청 함수를 사용할지 연결하는 지점입니다.
interceptor는 요청이나 응답이 오가는 과정에서 인증 처리, 에러 처리, 로그 수집 같은 일을 수행합니다.
Rodia에서는 생성된 API 함수가 공통 요청 흐름을 거치도록 mutator를 연결했고, interceptor에서는 요청과 응답 로그를 수집했습니다.
     `.trim(),
      technicalTerms: ["Orval mutator", "Axios interceptor", "custom instance"],
    },
    {
      question: "Rodia에서 가장 의미 있었던 문제 해결은 무엇인가요?",
      answer:
        `가장 의미 있었던 문제는 모바일 API 디버깅 흐름을 재현 가능한 형태로 만든 것입니다.
기존에는 통신 실패를 말로 설명해야 했지만, 앱 내부 로그와 cURL 추출을 통해 요청 정보를 함께 확인하고 같은 요청을 재현할 수 있게 했습니다.
이 경험을 통해 모바일 디버깅에서는 단순한 에러 표시보다 재현 가능한 요청 정보를 남기는 것이 중요하다는 점을 배웠습니다.
     `.trim(),
      technicalTerms: ["API Debug Logs", "cURL export"],
      evidenceImageIds: ["rodia-api-debug-curl"],
    },
  ],

  evidenceImages: {
    "rodia-api-debug-curl": {
      id: "rodia-api-debug-curl",
      title: "인앱 API Debug Logs와 cURL 재현 흐름",
      src: "/evidence/rodia/curl.gif",
      alt: "React Native 앱 내부의 API Debug Logs 화면에서 인증 요청 실패 로그를 확인하고 cURL 재현 흐름을 보여주는 GIF",
      description:
        "모바일 앱 내부에서 API 요청 실패 로그를 확인하고, 같은 요청을 재현 가능한 형태로 공유하기 위한 인앱 네트워크 로거 흐름입니다.",
    },
  },

  answerPolicy: {
    useOnlyVerifiedContext: true,

    defaultTone:
      "비전공자, 인사팀, 실무자가 모두 이해할 수 있도록 쉬운 말로 설명합니다.",

    technicalTermsOnlyWhenAsked: true,

    fallbackWhenNotInContext:
      "제공된 Rodia 데이터셋 기준으로는 해당 내용이 확인되지 않습니다.",

    preferredDefaultFocus: [
      "화물 운송 중개 플랫폼",
      "React Native 앱 화면 구현",
      "API 명세 변경 대응",
      "모바일 API 디버깅 흐름",
      "역할별 UI 정책 분리",
      "디자인 토큰 검증 흐름",
      "반복되는 문제를 구조화한 경험",
    ],

    technicalDetailAllowedWhenUserAsksAbout: [
      "OpenAPI",
      "Orval",
      "custom instance",
      "mutator",
      "interceptor",
      "requestId",
      "cURL",
      "policy layer",
      "tokens.json",
      "Zod",
      "monorepo",
      "pnpm Workspaces",
      "구현 방식",
      "코드 구조",
    ],

    allowedNumbers: [
      "OpenAPI fetch timeout 10초",
      "OpenAPI 전처리 4단계",
      "admin API 제외 3중 방어",
      "generated 산출물 30개 모듈, 172개 파일",
      "FormData 요청 timeout 60초",
      "인앱 API 로그 최근 200건 보관",
      "JSON / 요약 정보 / cURL 3가지 뷰",
    ],

    doNotSay: [
      "UI 변경 공수 50% 감소",
      "명세 오류가 프로덕션까지 도달하는 상황을 완전 차단했습니다.",
      "컴파일 타임에 100% 감지했습니다.",
      "서버 변경 시 UI 컴포넌트 0건 수정",
      "Metro 이슈를 완전히 제거했습니다.",
      "배포 전 검증율 100%",
      "모든 디자인 값을 자동화했습니다.",
      "성능을 크게 개선했습니다.",
      "협업 속도가 크게 향상되었습니다.",
      "수작업을 완전히 없앴습니다.",
      "물류 시스템 전체를 구축했습니다.",
      "백엔드 API를 구현했습니다.",
      "실제 운영 환경에서 장애를 해결했습니다.",
      "React Native를 능숙하게 다룹니다.",
      "OpenAPI 자동화를 완벽히 구축했습니다.",
      "디자인 시스템 전체를 구축했습니다.",
      "AI가 전체 코드를 자동으로 작성했습니다.",
    ],

    styleRules: [
      "기본 답변에서는 쉬운 표현을 우선 사용한다.",
      "OpenAPI, Orval, mutator, interceptor, policy layer, Zod 같은 용어는 사용자가 구현 방식을 물어볼 때만 자세히 설명한다.",
      "기술 스택을 말할 때는 기술명만 나열하지 말고 Rodia에서 사용한 범위를 함께 설명한다.",
      "수치 근거가 없는 성과는 말하지 않는다.",
      "allowedNumbers에 있는 수치만 사용한다.",
      "완전 차단, 100%, 0건 수정 같은 절대 표현을 사용하지 않는다.",
      "협업 속도 개선 같은 추상 표현은 단독으로 사용하지 말고, cURL 재현 공유처럼 관찰 가능한 변화로 설명한다.",
      "mutator와 interceptor는 역할을 구분해서 설명한다.",
      "정책 레이어는 역할별 UI 조건을 화면에서 분리한 구조로 설명한다.",
      "디자인 토큰은 단일 원본, 검증, 산출물 생성 흐름 관점에서 설명한다.",
      "팀 프로젝트이므로 전체 서비스를 혼자 개발한 것처럼 말하지 않는다.",
      "확인 필요, 내부 TODO, 추정성 표현은 답변에 포함하지 않는다.",
      "이미지 증거가 필요한 질문에는 evidenceImageIds를 함께 반환한다.",
    ],

    showEvidenceImagesWhenUserAsksAbout: [
      "검증",
      "증거",
      "캡처",
      "GIF",
      "API Debug Logs",
      "cURL",
      "디버거",
      "모바일 디버깅",
      "재현",
    ],
  },
} as const;
