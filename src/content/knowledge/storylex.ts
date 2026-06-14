// src/content/knowledge/storylex.ts
// StoryLex 프로젝트: 영어 학습 서비스
// 목적:
// 1. 기본 답변은 비전공자, 인사팀, 실무자 모두 이해할 수 있게 설명
// 2. 기술 용어는 사용자가 깊게 물어볼 때만 technicalDetail에서 사용
// 3. 기술 스택은 능숙도 주장이 아니라 "어떤 범위에서 사용했는지"로만 설명

export const storylex = {
  id: "storylex",

  name: "StoryLex",

  summary:
    `StoryLex는 영어 단어를 퀴즈, 플래시카드, 오답노트, AI 스토리로 반복 학습할 수 있도록 만든 영어 학습 서비스입니다.
사용자는 대시보드에서 출석, 주간 학습 그래프, 오답 Top5 등 학습 현황을 확인하고, 틀린 단어를 다시 복습할 수 있습니다.
저는 팀 프로젝트에서 주요 프론트엔드 화면 구현과 인증 예외 처리, 상태 관리 구조 정리에 참여했습니다.
 `.trim(),

  keywords: [
    "storylex",
    "StoryLex",
    "영어 학습",
    "단어 학습",
    "퀴즈",
    "플래시카드",
    "오답노트",
    "AI 스토리",
    "대시보드",
    "인증 예외 처리",
    "로그인 만료",
    "토큰 갱신",
    "상태 관리",
    "React",
    "JavaScript JSX",
    "React Query",
    "Zustand",
    "Axios",
    "MSW",
    "Recharts",
    "Vite",
  ],

  uiText: {
    title: "StoryLex",
    subtitle: "영어 단어 반복 학습 서비스",
    description:
      "오답 단어를 퀴즈, 플래시카드, 오답노트, AI 스토리로 다시 복습할 수 있도록 만든 팀 프로젝트입니다.",
    role: "프론트엔드 구현 · 인증 예외 처리 · 상태 관리 구조 정리",
    highlight:
      "로그인 만료 상황에서 여러 요청이 동시에 실패할 수 있는 흐름을 고려하고, 토큰 재발급 성공과 실패 상황을 검증했습니다.",
  },

  projectInfo: {
    period: "2025.11 ~ 2025.12",
    team: "총 4명, FE 2명, BE 2명",
    type: "팀 프로젝트 / 영어 학습 서비스",
    deployUrl: "https://project-fe-ebon.vercel.app/",
    githubUrl: "https://github.com/L-chae/Project-FE/tree/main",
    proofCommitUrl:
      "https://github.com/L-chae/Project-FE/commit/a92a02db732e800e8662ed649a8b1da306a0fc8c",
  },

  techStack: {
    frontend: "React 19",
    language: "JavaScript JSX",
    serverState: "React Query 5.90",
    clientState: "Zustand 5.0",
    apiClient: "Axios 1.13",
    mockAndProof: "MSW 2.12",
    chart: "Recharts 3.5",
    buildTool: "Vite 7.2",
  },

  publicDescription: {
    oneLine:
      "StoryLex는 사용자가 틀린 영어 단어를 여러 방식으로 다시 복습할 수 있게 만든 영어 학습 서비스입니다.",
    problem:
      "대시보드처럼 여러 데이터를 한 번에 불러오는 화면에서는 로그인이 만료되었을 때 여러 요청이 동시에 실패할 수 있습니다.",

    solution:
      "토큰 재발급 요청이 여러 번 반복되지 않도록 한 번만 처리하고, 나머지 요청은 새 토큰이 발급된 뒤 다시 시도하도록 흐름을 정리했습니다.",

    result:
      "토큰 재발급이 성공하는 경우와 실패하는 경우를 각각 재현해 보고, 요청이 계속 대기 상태로 남거나 무한히 반복되지 않도록 확인했습니다.",

    learning:
      "기능이 정상적으로 동작하는 것뿐 아니라, 로그인 만료나 요청 실패처럼 사용 흐름이 끊길 수 있는 예외 상황까지 고려해야 한다는 점을 배웠습니다.",
  },

  contributionScope: {
    teamContext:
      "총 4명 팀 프로젝트에서 프론트엔드 2명 중 한 명으로 참여했습니다.",

    roleSummary:
      "주요 프론트엔드 화면 구현, 인증 예외 처리, 상태 관리 구조 정리에 참여했습니다.",

    myFocus: [
      "대시보드, 단어 목록, 오답노트, 학습 화면 등 주요 프론트엔드 흐름 구현",
      "공통 UI 컴포넌트 설계 및 구현",
      "인증 상태 관리와 API 통신 흐름 정리",
      "학습 옵션 상태 관리",
      "오답 대시보드 및 재학습 흐름 기획, 디자인, 구현",
      "로그인 만료 상황에서 여러 요청이 동시에 실패하는 흐름 검증",
    ],

    doNotClaim: [
      "전체 서비스를 혼자 개발했다고 말하지 않기",
      "백엔드까지 담당했다고 말하지 않기",
      "AI 모델이나 스토리 생성 모델을 직접 개발했다고 말하지 않기",
      "실제 운영 환경의 장애를 해결했다고 말하지 않기",
    ],
  },

  implementationScope: {
    implemented: [
      "대시보드 화면 구현",
      "단어 목록 화면 구현",
      "오답노트 화면 구현",
      "학습 화면 구현",
      "공통 UI 컴포넌트 설계 및 구현",
      "인증 만료 상황을 고려한 API 통신 흐름 정리",
      "토큰 재발급 요청이 중복되지 않도록 처리",
      "토큰 재발급 성공 후 기존 요청 재시도 흐름 구성",
      "토큰 재발급 실패 후 세션 정리 흐름 구성",
      "React Query와 Zustand의 역할 분리",
      "MSW를 활용한 인증 성공 / 실패 흐름 재현",
    ],

    limitedOrContextual: [
      "AI 스토리는 오답 단어를 이야기와 문장 속에서 다시 노출하는 학습 기능으로 다룸",
      "프론트엔드에서는 AI 스토리 기능의 화면과 API 통신 흐름을 연결하는 범위에서 다룸",
      "검증은 실제 운영 지표가 아니라 MSW와 브라우저 Network 확인 기준으로 진행",
      "사용자 지표 기반 성과 검증은 포함하지 않음",
    ],

    notImplemented: [
      "AI 모델 직접 개발",
      "AI 모델 학습 또는 파인튜닝",
      "스토리 생성 모델 개발",
      "백엔드 인증 로직 구현",
      "보안 시스템 구축",
      "실제 운영 환경의 인증 장애 대응",
      "실제 사용자 지표 기반 성과 측정",
    ],
  },

  technologies: [
    {
      name: "React",
      category: "frontend",
      usageScope:
        "대시보드, 단어 목록, 오답노트, 학습 화면 등 사용자가 보는 주요 화면을 구성하는 데 사용했습니다.",
      plainEvidence: "StoryLex의 주요 프론트엔드 화면 구현에 사용했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "React를 전문적으로 능숙하게 다룬다고 단정하지 않기",
        "전체 프론트엔드를 혼자 구현했다고 말하지 않기",
        "대규모 React 서비스를 운영했다고 말하지 않기",
      ],
    },
    {
      name: "JavaScript JSX",
      category: "language",
      usageScope:
        "React 화면 구성, API 통신 흐름, 상태 관리 로직을 작성하는 데 사용했습니다.",
      plainEvidence: "StoryLex 프로젝트의 작성 언어는 JavaScript JSX입니다.",
      confidence: "project-used",
      doNotClaim: [
        "TypeScript로 타입 안정성을 확보했다고 말하지 않기",
        "고급 타입 설계를 했다고 말하지 않기",
      ],
    },
    {
      name: "React Query",
      category: "server-state",
      usageScope:
        "대시보드 통계, 단어 목록, 오답 데이터처럼 서버에서 받아오는 데이터를 관리하는 데 사용했습니다.",
      plainEvidence:
        "서버와 동기화되는 데이터의 요청 상태, 로딩 상태, 에러 상태를 관리하는 데 사용했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "React Query를 능숙하게 다룬다고 단정하지 않기",
        "모든 서버 상태 구조를 완벽히 설계했다고 말하지 않기",
      ],
    },
    {
      name: "Zustand",
      category: "client-state",
      usageScope:
        "학습 옵션, 모달, 선택값처럼 화면 안에서 유지해야 하는 상태를 관리하는 데 사용했습니다.",
      plainEvidence:
        "서버 데이터가 아니라 사용자 선택값과 화면 내부 상태를 관리하는 데 사용했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "Zustand를 전문적으로 사용한다고 말하지 않기",
        "복잡한 전역 상태 아키텍처를 구축했다고 말하지 않기",
      ],
    },
    {
      name: "Axios",
      category: "api-client",
      usageScope:
        "서버와 통신하고, 로그인 만료 상황에서 토큰 재발급과 기존 요청 재시도 흐름을 정리하는 데 사용했습니다.",
      plainEvidence: "공통 API 통신 흐름과 인증 예외 처리에 사용했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "모든 인증 문제를 완벽히 해결했다고 말하지 않기",
        "보안 인증 시스템을 구축했다고 말하지 않기",
        "백엔드 인증 로직을 구현했다고 말하지 않기",
      ],
    },
    {
      name: "MSW",
      category: "mock-and-proof",
      usageScope:
        "실제 서버 상태에만 의존하지 않고, 로그인 만료와 토큰 재발급 성공 / 실패 흐름을 재현하는 데 사용했습니다.",
      plainEvidence:
        "인증 예외 상황을 브라우저에서 재현하고 확인하는 데 사용했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "모든 백엔드 상황을 완전히 대체했다고 말하지 않기",
        "실제 운영 환경의 모든 API 실패를 검증했다고 말하지 않기",
      ],
    },
    {
      name: "Recharts",
      category: "chart",
      usageScope:
        "대시보드에서 주간 학습 그래프와 학습 통계를 시각적으로 보여주는 데 사용했습니다.",
      plainEvidence: "학습 현황을 그래프로 표시하는 데 사용했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "복잡한 데이터 시각화 시스템을 구축했다고 말하지 않기",
        "고급 차트 활용 능력을 과장하지 않기",
      ],
    },
    {
      name: "Vite",
      category: "build-tool",
      usageScope: "React 프로젝트 개발 환경과 빌드 도구로 사용했습니다.",
      plainEvidence: "프로젝트 개발 환경 구성에 사용했습니다.",
      confidence: "project-used",
      doNotClaim: [
        "빌드 시스템을 직접 설계했다고 말하지 않기",
        "복잡한 번들링 최적화를 수행했다고 말하지 않기",
      ],
    },
  ],

  keyFeatures: {
    dashboard: {
      description:
        "출석, 주간 학습 그래프, 학습 통계, 오답 Top5 등 학습 현황을 확인하는 화면입니다.",
      plainRole:
        "사용자가 자신의 학습 현황을 한눈에 볼 수 있도록 구성했습니다.",
      relatedTech: ["React Query", "Recharts", "Axios"],
    },

    wordLearning: {
      description:
        "사용자가 단어 목록, 퀴즈, 플래시카드로 단어를 학습하고, 틀린 단어를 복습 흐름으로 연결하는 기능입니다.",
      plainRole:
        "단어를 한 번 보고 끝내는 것이 아니라, 여러 방식으로 반복 학습할 수 있도록 구성했습니다.",
      relatedTech: ["React", "React Query"],
    },

    wrongNote: {
      description: "틀린 단어를 다시 확인하고 복습할 수 있는 기능입니다.",
      plainRole:
        "사용자가 틀린 단어를 다시 학습 흐름으로 가져올 수 있도록 구성했습니다.",
      relatedTech: ["React", "React Query", "Zustand"],
    },

    aiStory: {
      description:
        "오답 단어를 이야기와 문장 속에서 다시 노출시키는 학습 기능입니다.",
      plainRole:
        "단어를 단순 암기보다 문맥 속에서 다시 접할 수 있도록 돕는 학습 흐름입니다.",
      implementationScope:
        "프론트엔드에서는 해당 학습 흐름을 화면과 API 통신으로 연결하는 범위에서 다뤘습니다.",
      relatedTech: ["React", "Axios"],
      doNotClaim: [
        "AI 모델을 직접 개발했다고 말하지 않기",
        "스토리 생성 모델을 학습시켰다고 말하지 않기",
        "AI 스토리 생성 로직 전체를 담당했다고 말하지 않기",
      ],
    },
  },

  authFlow: {
    title: "로그인 만료 상태에서 여러 요청이 동시에 실패할 수 있는 문제",

    publicProblem: `


대시보드에 들어가면 여러 데이터를 한 번에 불러옵니다.
이때 로그인이 만료된 상태라면 여러 요청이 동시에 실패할 수 있습니다.
각 요청이 따로 토큰 재발급을 시도하면 같은 요청이 여러 번 반복되고, 어떤 요청을 언제 다시 시도해야 하는지 흐름이 복잡해질 수 있었습니다.
`.trim(),

    publicSolution: `


토큰 재발급 요청은 한 번만 보내고, 나머지 요청은 잠시 기다리도록 흐름을 정리했습니다.
새 토큰을 받으면 기다리던 요청들이 다시 실행되도록 했고, 토큰 재발급이 실패하면 대기 중인 요청을 정리하고 로그인 흐름으로 돌아가도록 처리했습니다.
`.trim(),

    publicResult: `


토큰 재발급이 성공하는 경우에는 기존 요청들이 다시 실행되는 흐름을 확인했습니다.
반대로 토큰 재발급이 실패하는 경우에는 요청이 계속 대기 상태로 남거나 반복되지 않고, 세션이 정리되는 흐름을 확인했습니다.
`.trim(),

    publicLearning: `


인증 처리는 단순히 실패한 요청을 다시 보내는 것으로 끝나지 않는다는 점을 배웠습니다.
여러 요청이 동시에 실패하는 상황에서는 중복 요청, 대기 상태, 실패 이후 정리 흐름까지 함께 고려해야 합니다.
`.trim(),

    simpleFlow: [
      "1. 여러 API 요청이 동시에 실패할 수 있는 상황을 고려",
      "2. 토큰 재발급 요청은 한 번만 실행",
      "3. 나머지 요청은 새 토큰이 발급될 때까지 대기",
      "4. 재발급 성공 시 기존 요청을 다시 실행",
      "5. 재발급 실패 시 세션을 정리하고 로그인 흐름으로 이동",
    ],

    validation: {
      method:
        "MSW를 사용해 로그인 만료, 토큰 재발급 성공, 토큰 재발급 실패 상황을 재현했습니다.",

      successScenario: [
        "만료된 토큰으로 여러 요청이 동시에 실패",
        "토큰 재발급 요청은 한 번만 실행",
        "새 토큰 발급 후 기존 요청들이 다시 성공",
      ],

      failureScenario: [
        "만료된 토큰으로 여러 요청이 동시에 실패",
        "토큰 재발급 실패",
        "대기 중인 요청 정리",
        "저장된 로그인 정보 정리",
        "로그인 흐름으로 이동",
      ],
    },

    technicalDetail: {
      exposeOnlyWhenAsked: true,

      title: "동시 401 응답 상황에서 refresh 요청 중복을 막기 위한 제어 구조",

      terms: [
        "401 응답",
        "refresh token",
        "single-flight refresh",
        "subscriber queue",
        "Axios interceptor",
        "_retry guard",
      ],

      problem: `


access token이 만료된 상태에서 대시보드의 여러 API가 동시에 호출되면 여러 요청이 동시에 401 응답을 받을 수 있습니다.
각 요청이 개별적으로 refresh API를 호출하면 refresh 요청이 중복 실행되고, 원요청 재시도 순서가 불안정해질 수 있습니다.
`.trim(),

      mechanism: [
        "요청 인터셉터에서 access token을 Authorization header에 주입",
        "응답 인터셉터에서 401 응답 감지",
        "이미 재시도한 요청인지 _retry 값으로 확인",
        "refresh가 진행 중이 아니면 refresh API 호출",
        "refresh가 이미 진행 중이면 대기 queue에 요청 등록",
        "refresh 성공 시 대기 요청을 새 토큰으로 재시도",
        "refresh 실패 시 대기 요청을 reject 처리하고 세션 정리",
      ],

      implementationEvidence: {
        mainArea: "공통 API 클라이언트",
        variables: ["isRefreshing", "refreshSubscribers"],
        functions: [
          "subscribeTokenRefresh",
          "notifyRefreshed",
          "notifyRefreshFailed",
          "setAuthHeader",
          "clearSessionStorage",
          "redirectToLogin",
        ],
        retryGuard: "originalRequest._retry",
        sessionCleanup: [
          "clearTokens()",
          'localStorage.removeItem("userInfo")',
        ],
      },

      tradeoff: {
        advantages: [
          "refresh 요청 중복 실행 방지",
          "기존 요청 재시도 흐름 정리",
          "인증 예외 처리를 공통 API 통신 레이어로 모음",
          "refresh 실패 시 대기 요청을 정리해 pending 상태 방지",
          "_retry 값으로 무한 재시도 방지",
          "MSW를 통한 성공 / 실패 시나리오 재현 가능",
        ],

        disadvantages: [
          "인증 제어 로직이 추가되어 코드 복잡도 증가",
          "공통 API 통신 레이어의 책임 증가",
          "성공 / 실패 시나리오를 명확히 검증하지 않으면 디버깅이 어려울 수 있음",
        ],

        decision:
          "코드 복잡도가 일부 늘어나더라도, 인증 흐름의 중복 실행 방지와 실패 상황 정리가 더 중요하다고 판단했습니다.",
      },
    },
  },

  stateManagement: {
    publicSummary:
      "서버에서 받아오는 데이터와 화면 안에서만 유지되는 상태를 구분해 관리했습니다.",

    principle:
      "서버와 동기화되는 데이터는 React Query, 클라이언트 내부 UI 상태는 Zustand로 분리했습니다.",

    reactQuery: {
      easyExplanation:
        "대시보드 통계, 단어 목록, 오답 데이터처럼 서버에서 받아와야 하는 데이터에 사용했습니다.",
      role: "서버와 동기화되는 데이터를 관리했습니다.",
      reason:
        "API 요청 상태, 로딩, 에러 처리를 화면마다 직접 반복해서 만들지 않기 위해 사용했습니다.",
    },

    zustand: {
      easyExplanation:
        "학습 옵션, 모달, 선택값처럼 화면 안에서 유지해야 하는 상태에 사용했습니다.",
      role: "클라이언트 내부에서 유지해야 하는 상태를 관리했습니다.",
      reason:
        "Redux는 프로젝트 규모에 비해 설정이 무겁다고 판단했고, 비교적 단순한 클라이언트 상태 공유에는 Zustand가 더 적합하다고 보았습니다.",
    },

    lesson:
      "상태 관리 도구를 여러 개 사용할 때는 도구 자체보다 어떤 성격의 상태를 어디에 둘 것인지에 대한 기준이 중요하다는 점을 배웠습니다.",
  },

  retrospective: {
    keyLearning:
      "정상 흐름뿐 아니라 여러 요청이 동시에 실패하는 인증 예외 상황까지 고려해야 한다는 점을 배웠습니다.",

    coreExperience:
      "로그인 만료 상태에서 여러 요청이 동시에 실패할 때, 토큰 재발급 중복을 막고 성공 / 실패 흐름을 정리한 경험",

    lesson:
      "이후부터 기능을 만들 때 정상 동작뿐 아니라 토큰 만료, 중복 요청, 재시도 실패, 대기 상태 같은 실패 흐름을 먼저 고려하게 되었습니다.",
  },

  interviewAnswers: {
    short:
      "StoryLex는 오답 단어를 반복 학습할 수 있도록 만든 영어 학습 서비스입니다. 저는 주요 프론트엔드 화면 구현과 인증 예외 처리, 상태 관리 구조 정리에 참여했습니다.",

    medium: `


StoryLex는 영어 단어를 퀴즈, 플래시카드, 오답노트, AI 스토리로 반복 학습할 수 있도록 만든 팀 프로젝트입니다.
저는 프론트엔드 2명 중 한 명으로 참여해 대시보드, 단어 목록, 오답노트, 학습 화면 등 주요 화면 구현과 인증 예외 처리, 상태 관리 구조 정리에 참여했습니다.
특히 로그인 만료 상태에서 여러 요청이 동시에 실패할 수 있는 상황을 고려해, 토큰 재발급 요청이 중복되지 않도록 흐름을 정리하고 성공 / 실패 상황을 검증했습니다.
`.trim(),

    detailed: `


StoryLex는 오답 단어를 퀴즈, 플래시카드, AI 스토리로 반복 학습할 수 있도록 만든 영어 학습 서비스입니다.
저는 총 4명 팀 프로젝트에서 프론트엔드 2명 중 한 명으로 참여했고, 대시보드, 단어 목록, 오답노트, 학습 화면 등 주요 프론트엔드 흐름을 구현했습니다.

가장 중점적으로 다룬 문제는 로그인 만료 상태에서 여러 API 요청이 동시에 실패하는 상황이었습니다.
각 요청이 따로 토큰 재발급을 시도하면 재발급 요청이 중복될 수 있다고 판단했습니다.
그래서 토큰 재발급 요청은 한 번만 보내고, 나머지 요청은 새 토큰이 발급된 뒤 다시 시도하도록 흐름을 정리했습니다.

또한 토큰 재발급이 실패하는 경우에는 요청이 계속 대기 상태로 남지 않도록 정리하고, 로그인 흐름으로 돌아가도록 처리했습니다.
이 경험을 통해 기능이 정상적으로 동작하는 것뿐 아니라, 실패 상황과 예외 흐름까지 함께 고려해야 한다는 점을 배웠습니다.
`.trim(),

    highlight:
      "StoryLex에서는 로그인 만료 상태에서 여러 요청이 동시에 실패하는 상황을 고려해, 토큰 재발급 요청이 중복되지 않도록 처리하고 성공 / 실패 흐름을 검증했습니다.",
  },

  followUpQuestions: [
    {
      question: "로그인이 만료되면 어떤 문제가 생길 수 있었나요?",
      answer:
        `대시보드처럼 여러 데이터를 한 번에 불러오는 화면에서는 로그인이 만료된 상태일 때 여러 요청이 동시에 실패할 수 있습니다.
이때 각 요청이 따로 토큰 재발급을 시도하면 같은 요청이 여러 번 반복되고, 기존 요청을 언제 다시 실행해야 하는지 흐름이 복잡해질 수 있었습니다.
     `.trim(),
      technicalTerms: ["401", "refresh token", "request retry"],
      evidenceImageIds: ["storylex-auth-refresh-success"],
    },
    {
      question: "그 문제를 어떻게 해결했나요?",
      answer:
        `토큰 재발급 요청은 한 번만 보내고, 나머지 요청은 기다리도록 처리했습니다.
새 토큰이 발급되면 기다리던 요청을 다시 실행하고, 재발급이 실패하면 대기 중인 요청을 정리한 뒤 로그인 흐름으로 돌아가도록 했습니다.
     `.trim(),
      technicalTerms: ["single-flight refresh", "subscriber queue"],
      evidenceImageIds: ["storylex-auth-refresh-success"],
    },
    {
      question: "토큰 재발급 실패 시에는 어떻게 처리했나요?",
      answer:
        `토큰 재발급이 실패하면 기다리던 요청들을 정리하고, 저장된 로그인 정보를 삭제한 뒤 로그인 흐름으로 돌아가도록 처리했습니다.
또한 이미 다시 시도한 요청이 반복해서 재시도되지 않도록 막았습니다.
     `.trim(),
      technicalTerms: ["reject", "_retry guard", "session cleanup"],
      evidenceImageIds: ["storylex-auth-refresh-failure"],
    },
    {
      question: "MSW는 왜 사용했나요?",
      answer:
        `실제 서버 상황에만 의존하지 않고, 로그인 만료와 토큰 재발급 성공 / 실패 상황을 직접 재현하기 위해 사용했습니다.
이를 통해 여러 요청이 동시에 실패한 뒤 재발급이 한 번만 일어나는 흐름과, 재발급 실패 후 정리되는 흐름을 확인할 수 있었습니다.
     `.trim(),
      technicalTerms: ["MSW", "mock handler", "DevTools Network"],
      evidenceImageIds: [
        "storylex-auth-refresh-success",
        "storylex-auth-refresh-failure",
      ],
    },
    {
      question: "React Query와 Zustand는 어떻게 나눠 사용했나요?",
      answer:
        `React Query는 대시보드 통계, 단어 목록, 오답 데이터처럼 서버에서 받아와야 하는 데이터를 관리하는 데 사용했습니다.
Zustand는 학습 옵션이나 모달, 선택값처럼 화면 안에서 유지해야 하는 상태를 관리하는 데 사용했습니다.
두 도구의 역할을 나누면서 서버 데이터와 화면 내부 상태가 섞이지 않도록 했습니다.
     `.trim(),
      technicalTerms: ["server state", "client state"],
      evidenceImageIds: [],
    },
    {
      question: "AI 스토리는 직접 만든 AI 기능인가요?",
      answer: `AI 모델이나 스토리 생성 모델을 직접 개발한 것은 아닙니다.
StoryLex에서 AI 스토리는 오답 단어를 이야기와 문장 속에서 다시 노출시키는 학습 기능이며, 프론트엔드에서는 해당 학습 흐름을 화면과 API 통신으로 연결하는 범위에서 다뤘습니다.
     `.trim(),
      technicalTerms: [],
      evidenceImageIds: [],
    },
    {
      question: "이 경험에서 가장 크게 배운 점은 무엇인가요?",
      answer:
        `기능이 정상적으로 동작하는 것만 확인해서는 부족하다는 점을 배웠습니다.
로그인 만료, 여러 요청의 동시 실패, 토큰 재발급 실패처럼 예외 상황까지 고려해야 실제 사용 흐름이 끊기지 않을 수 있습니다.
이후부터는 기능을 구현할 때 정상 흐름뿐 아니라 실패 흐름을 먼저 함께 생각하려고 합니다.
     `.trim(),
      technicalTerms: [],
      evidenceImageIds: [],
    },
  ],

  evidenceImages: {
    "storylex-auth-refresh-success": {
      id: "storylex-auth-refresh-success",
      title: "토큰 재발급 성공 흐름",
      src: "/evidence/storylex/auth-refresh-success.png",
      alt: "여러 요청이 실패한 뒤 토큰 재발급이 한 번 성공하고 기존 요청들이 다시 성공하는 브라우저 Network 캡처",
      description:
        "로그인 만료 상태에서 여러 요청이 실패한 뒤, 토큰 재발급이 한 번 실행되고 기존 요청들이 다시 성공하는 흐름입니다.",
      technicalFlow: "401×3 → refresh 200×1 → retry 200×3",
    },

    "storylex-auth-refresh-failure": {
      id: "storylex-auth-refresh-failure",
      title: "토큰 재발급 실패 흐름",
      src: "/evidence/storylex/auth-refresh-failure.png",
      alt: "여러 요청이 실패한 뒤 토큰 재발급이 실패하고 저장된 로그인 정보가 정리되는 브라우저 Network 캡처",
      description:
        "토큰 재발급이 실패했을 때 대기 중인 요청을 정리하고 로그인 흐름으로 복귀하는 흐름입니다.",
      technicalFlow: "401×3 → refresh 400 → token/userInfo 삭제 → login page",
    },
  },

  answerPolicy: {
    useOnlyVerifiedContext: true,

    defaultTone:
      "비전공자, 인사팀, 실무자가 모두 이해할 수 있도록 쉬운 말로 설명합니다.",

    technicalTermsOnlyWhenAsked: true,

    fallbackWhenNotInContext:
      "제공된 StoryLex 데이터셋 기준으로는 해당 내용이 확인되지 않습니다.",

    preferredDefaultFocus: [
      "영어 단어 반복 학습 서비스",
      "주요 프론트엔드 화면 구현",
      "로그인 만료 상황에서 여러 요청이 동시에 실패할 수 있는 문제",
      "토큰 재발급 요청이 중복되지 않도록 흐름 정리",
      "성공 / 실패 상황을 MSW로 재현해 확인",
      "서버 데이터와 화면 내부 상태의 역할 분리",
    ],

    technicalDetailAllowedWhenUserAsksAbout: [
      "401",
      "refresh token",
      "single-flight",
      "subscriber queue",
      "Promise Queue",
      "Axios interceptor",
      "_retry",
      "MSW handler",
      "Network 캡처",
      "구현 방식",
      "코드 구조",
    ],

    doNotSay: [
      "모든 인증 문제를 완벽히 해결했습니다.",
      "서비스 안정성이 크게 향상되었습니다.",
      "사용자 이탈을 줄였습니다.",
      "성능을 크게 개선했습니다.",
      "TypeScript로 타입 안정성을 확보했습니다.",
      "실제 대시보드 전체 API 목록을 모두 검증했습니다.",
      "화면 멈춤을 제거했습니다.",
      "사용자 경험을 개선했습니다.",
      "AI 스토리 생성 모델을 직접 개발했습니다.",
      "백엔드 인증 시스템을 구현했습니다.",
      "보안 인증 시스템을 구축했습니다.",
      "실제 운영 환경에서 인증 장애를 해결했습니다.",
      "모든 API 실패 상황을 검증했습니다.",
      "React Query를 능숙하게 다룹니다.",
      "Zustand를 전문적으로 사용합니다.",
      "MSW로 모든 백엔드 상황을 완전히 대체했습니다.",
      "전체 서비스를 혼자 개발했습니다.",
      "백엔드까지 담당했습니다.",
      "대규모 영어 학습 서비스를 운영했습니다.",
    ],

    styleRules: [
      "기본 답변에서는 쉬운 표현을 우선 사용한다.",
      "single-flight, subscriber queue, Axios interceptor 같은 용어는 사용자가 구현 방식을 물어볼 때만 사용한다.",
      "기술 스택을 말할 때는 기술명만 나열하지 말고 StoryLex에서 사용한 범위를 함께 설명한다.",
      "AI 스토리는 AI 모델 개발 경험이 아니라 오답 단어를 다시 노출하는 학습 기능으로 설명한다.",
      "코드 근거 없이 성과를 과장하지 않는다.",
      "수치가 없는 성과를 만들지 않는다.",
      "팀 프로젝트이므로 전체 서비스를 혼자 개발한 것처럼 말하지 않는다.",
      "현재 프로젝트 언어는 JavaScript JSX이므로 TypeScript 관련 표현은 사용하지 않는다.",
      "확인 필요, 내부 TODO, 추정성 표현은 답변에 포함하지 않는다.",
      "이미지 증거가 필요한 질문에는 evidenceImageIds를 함께 반환한다.",
    ],

    showEvidenceImagesWhenUserAsksAbout: [
      "검증",
      "증거",
      "캡처",
      "MSW",
      "401 재현",
      "refresh 성공",
      "refresh 실패",
      "Network 확인",
      "토큰 재발급",
    ],
  },
} as const;
