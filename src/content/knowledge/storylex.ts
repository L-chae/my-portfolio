// src/content/knowledge/storylex.ts
// StoryLex 프로젝트: 영어 학습 서비스, 인증 동시성 제어, 상태 관리 분리, MSW 검증
// 목적: 포트폴리오 AI가 확인된 근거 안에서만 StoryLex를 설명하도록 하는 컨텍스트

export const storylex = {
  id: "storylex",

  name: "StoryLex",

  summary: `
StoryLex는 영어 단어를 퀴즈, 플래시카드, 오답노트, AI 스토리로 반복 학습할 수 있도록 만든 영어 학습 서비스입니다.
사용자는 대시보드에서 출석, 주간 학습 그래프, 오답 Top5 등 학습 현황을 확인하고, 틀린 단어를 오답노트나 AI 스토리에서 다시 복습할 수 있습니다.
  `.trim(),

  keywords: [
    "storylex",
    "영어 학습",
    "오답노트",
    "AI 스토리",
    "대시보드",
    "401",
    "인증",
    "토큰 갱신",
    "refresh token",
    "single-flight",
    "subscriber queue",
    "axios interceptor",
    "react query",
    "zustand",
    "msw",
  ],

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

  coreGoal:
    "사용자가 학습 중 인증 만료나 API 실패로 흐름이 끊기지 않도록 인증 예외 처리와 서버 상태 관리 구조를 정리하는 것",

  responsibilities: [
    "프론트엔드 파일 구조 설계",
    "공통 UI 컴포넌트 설계 및 구현",
    "대시보드 화면 구현",
    "단어 목록 화면 구현",
    "오답노트 화면 구현",
    "학습 화면 구현",
    "인증 상태 관리와 API 통신 흐름 정리",
    "학습 옵션 상태 관리",
    "오답 대시보드 및 재학습 흐름 기획, 디자인, 구현",
  ],

  keyFeatures: {
    dashboard: {
      description:
        "출석, 주간 학습 그래프, 학습 통계, 오답 Top5 등 학습 현황을 확인하는 화면입니다.",
      relatedTech: ["React Query", "Recharts", "Axios"],
    },

    wordLearning: {
      description:
        "사용자가 단어 목록, 퀴즈, 플래시카드로 단어를 학습하고, 틀린 단어를 복습 흐름으로 연결하는 기능입니다.",
      relatedTech: ["React", "React Query"],
    },

    wrongNote: {
      description:
        "틀린 단어를 다시 확인하고 복습할 수 있는 기능입니다. 오답 단어를 재학습 흐름으로 연결하는 데 초점을 두었습니다.",
      relatedTech: ["React", "React Query", "Zustand"],
    },

    aiStory: {
      description:
        "오답 단어를 이야기와 문장 속에서 다시 노출시키는 학습 기능입니다.",
      relatedTech: ["React", "Axios"],
    },
  },

  auth401: {
    title:
      "토큰 만료 상태에서 여러 API가 동시에 401을 반환하며 refresh 요청이 중복 실행될 수 있는 문제",

    problem: `
대시보드에 진입하면 여러 API가 동시에 호출됩니다.
이때 access token이 만료된 상태라면 여러 요청이 동시에 401 응답을 받을 수 있습니다.
각 요청이 개별적으로 refresh API를 호출하면 refresh 요청이 중복 실행되고, 기존 요청을 어떤 토큰으로 재시도할지 흐름이 복잡해질 수 있었습니다.
    `.trim(),

    risks: [
      "여러 API 요청이 동시에 401을 반환할 수 있음",
      "각 요청이 개별적으로 refresh를 시도하면 refresh 요청이 중복될 수 있음",
      "refresh 성공 이후 기존 요청을 새 토큰으로 재시도하는 순서를 제어해야 함",
      "refresh 실패 시 대기 중인 요청이 pending 상태로 남지 않아야 함",
      "이미 재시도한 요청이 다시 refresh를 시도하면 무한 루프가 생길 수 있음",
    ],

    solution: `
Axios 공통 인스턴스인 httpClient에서 인증 흐름을 중앙화했습니다.
요청 인터셉터에서는 저장된 access token을 Authorization header에 주입했습니다.
응답 인터셉터에서는 401 응답을 감지해 refresh 요청을 수행했습니다.
이미 refresh가 진행 중이면 새로운 refresh 요청을 만들지 않고, refreshSubscribers 배열에 대기 요청의 성공/실패 콜백을 저장했습니다.
refresh 성공 시 notifyRefreshed(newToken)을 호출해 대기 요청을 새 토큰으로 재시도했습니다.
refresh 실패 시 notifyRefreshFailed(error)를 호출해 대기 요청을 모두 reject 처리하고 세션 정보를 정리했습니다.
    `.trim(),

    mechanism: [
      "1. 요청 인터셉터에서 access token을 Authorization header에 주입",
      "2. 응답 인터셉터에서 401 응답 감지",
      "3. originalRequest._retry로 이미 재시도한 요청인지 확인",
      "4. refresh가 진행 중이 아니면 refresh API 호출",
      "5. refresh가 이미 진행 중이면 refreshSubscribers 배열에 대기 요청 등록",
      "6. refresh 성공 시 notifyRefreshed(newToken)으로 대기 요청 재시도",
      "7. refresh 실패 시 notifyRefreshFailed(error)로 대기 요청 reject",
      "8. refresh 실패 후 token과 userInfo 정리",
    ],

    implementationEvidence: {
      mainFile: "src/api/httpClient.js",

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

      sessionCleanup: ["clearTokens()", 'localStorage.removeItem("userInfo")'],
    },

    mswProof: {
      purpose:
        "실제 서버 상태에 의존하지 않고 인증 만료, refresh 성공, refresh 실패 흐름을 재현하기 위해 MSW를 사용했습니다.",

      files: [
        "src/mocks/handlers.js",
        "src/devtools/refreshProofHelpers.js",
        "src/api/httpClient.js",
        "src/utils/storage.js",
      ],

      handlersBehavior: [
        "/api/auth/login에서 의도적으로 expired access token을 반환",
        "보호 API는 Authorization header의 token이 currentAccess와 다르면 401 반환",
        "/api/auth/refresh는 유효한 refresh token을 받으면 valid access token 반환",
        "invalid refresh token을 받으면 refresh 실패 응답 반환",
      ],

      devtoolsHelpers: [
        "__seedRefreshProofTokens()",
        "__runRefreshProof()",
        "__seedRefreshFailProofTokens()",
        "__runRefreshFailProof()",
        "__proofTokens()",
        "__clearProofTokens()",
        "__setProofTokens(a, r)",
      ],

      proofEndpoints: [
        "/api/user/me",
        "/api/dashboard/summary",
        "/api/words/today",
      ],

      successScenario: [
        "expired access token과 valid refresh token 저장",
        "/api/user/me, /api/dashboard/summary, /api/words/today 동시 호출",
        "세 요청이 401 반환",
        "refresh API는 1회만 호출",
        "refresh 성공 후 valid access token 저장",
        "대기 중인 요청들이 새 토큰으로 재시도",
        "원요청들이 200으로 복구",
      ],

      failureScenario: [
        "expired access token과 invalid refresh token 저장",
        "여러 요청이 동시에 401 반환",
        "refresh API 실패",
        "대기 요청 reject 처리",
        "token과 userInfo 정리",
        "추가 재시도 없이 세션 종료 흐름으로 이동",
      ],
    },

    proofScreenshots: {
      success: {
        id: "storylex-auth-refresh-success",
        title: "401 동시 요청 refresh 성공 흐름",
        src: "/evidence/storylex/auth-refresh-success.png",
        alt: "DevTools Network에서 me, summary, today 요청이 401을 반환한 뒤 refresh가 1회 성공하고 원요청들이 200으로 복구되는 캡처",
        description:
          "토큰 만료 상태에서 여러 API가 동시에 401을 반환한 뒤, refresh 요청이 1회만 실행되고 기존 요청들이 새 토큰으로 재시도되어 200으로 복구되는 흐름입니다.",
        flow: "401×3 → refresh 200×1 → retry 200×3",
      },

      failure: {
        id: "storylex-auth-refresh-failure",
        title: "401 동시 요청 refresh 실패 흐름",
        src: "/evidence/storylex/auth-refresh-failure.png",
        alt: "DevTools Network에서 동시 401 이후 refresh가 400으로 실패하고 localStorage가 비워진 상태와 로그인 화면이 표시된 캡처",
        description:
          "refresh 실패 시 추가 재시도 없이 token과 userInfo가 정리되고 로그인 화면으로 복귀하는 흐름입니다.",
        flow: "401×3 → refresh 400 → token/userInfo 삭제 → login page",
      },
    },

    tradeoff: {
      advantages: [
        "refresh 요청 중복 실행 방지",
        "기존 요청 자동 재시도 흐름 구성",
        "화면마다 흩어질 수 있는 인증 예외 처리를 공통 httpClient 레이어로 중앙화",
        "refresh 실패 시 대기 요청을 reject 처리해 pending 상태 방지",
        "_retry 플래그로 무한 재시도 방지",
        "MSW를 통한 성공/실패 시나리오 재현 가능",
      ],

      disadvantages: [
        "isRefreshing, refreshSubscribers, _retry 등 제어 로직이 추가되어 코드 복잡도 증가",
        "공통 httpClient 레이어의 책임 증가",
        "성공/실패 시나리오를 명확히 검증하지 않으면 디버깅이 어려워질 수 있음",
      ],

      decision:
        "코드 복잡도가 일부 증가하더라도, 인증 흐름의 중복 실행 방지와 실패 상황 제어가 더 중요하다고 판단했습니다.",
    },

    result: `
동시 401 상황에서 refresh 요청이 중복 실행되지 않도록 제어했습니다.
성공 케이스에서는 refresh가 1회만 호출된 뒤 대기 중이던 요청들이 새 access token으로 재시도되어 200으로 복구되는 흐름을 DevTools Network에서 확인했습니다.
실패 케이스에서는 refresh 실패 후 추가 재시도 없이 token과 userInfo가 정리되고 로그인 흐름으로 복귀하는 것을 확인했습니다.
    `.trim(),

    lesson: `
인증 처리는 단순히 “401이면 refresh를 호출한다”로 끝나지 않는다는 점을 배웠습니다.
여러 API가 동시에 실패하는 상황에서는 refresh 요청을 한 번만 실행하도록 동시성 제어가 필요합니다.
또한 refresh 성공 흐름뿐 아니라 실패 흐름까지 고정해야 pending 상태나 무한 재시도를 방지할 수 있습니다.
    `.trim(),
  },

  stateManagement: {
    principle:
      "서버와 동기화되는 데이터는 React Query, 클라이언트 내부 UI 상태는 Zustand로 분리했습니다.",

    reactQuery: {
      role: "대시보드 통계, 단어 목록, 오답 데이터처럼 서버와 동기화되는 데이터를 관리했습니다.",
      reason:
        "API 요청 상태, 캐싱, 로딩 및 에러 처리를 화면마다 직접 구현하지 않기 위해 사용했습니다.",
    },

    zustand: {
      role: "학습 옵션, 모달, 선택값처럼 클라이언트 내부에서 유지해야 하는 상태를 관리했습니다.",
      reason:
        "Redux는 프로젝트 규모에 비해 설정이 무겁다고 판단했고, 비교적 단순한 클라이언트 상태 공유에는 Zustand가 더 적합하다고 보았습니다.",
    },

    lesson:
      "상태 관리 도구를 여러 개 사용할 때는 도구 자체보다 어떤 성격의 상태를 어디에 둘 것인지에 대한 기준이 중요하다는 점을 배웠습니다.",
  },

  retrospective: {
    keyLearning:
      "정상 흐름뿐 아니라 여러 요청이 동시에 실패하는 인증 동시성 상황까지 고려해야 한다는 점을 배웠습니다.",

    coreExperience:
      "401 동시성 문제를 Axios 공통 레이어, single-flight refresh, subscriber queue, MSW 검증 흐름으로 다룬 경험",

    lesson:
      "이후부터 기능을 만들 때 정상 동작뿐 아니라 토큰 만료, 중복 요청, refresh 실패, pending 상태 같은 실패 흐름을 먼저 고려하게 되었습니다.",
  },

  interviewAnswers: {
    short: `
StoryLex는 오답 단어를 퀴즈, 플래시카드, AI 스토리로 반복 학습할 수 있도록 만든 영어 학습 서비스입니다.
저는 대시보드, 단어 목록, 오답노트, 학습 화면 등 주요 프론트엔드 흐름을 구현했고, 인증 상태 관리와 API 통신 구조를 정리했습니다.
가장 기억에 남는 문제는 토큰 만료 상태에서 여러 API가 동시에 401을 반환하는 상황이었습니다.
각 요청이 개별적으로 refresh를 호출하면 refresh 요청이 중복될 수 있다고 판단해, Axios 공통 레이어에서 refresh 요청을 single-flight 방식으로 1회만 수행하도록 제어했습니다.
이미 refresh가 진행 중인 요청은 subscriber queue에 대기시키고, refresh 성공 후 새 토큰으로 재시도했습니다.
refresh 실패 시에는 대기 요청을 reject 처리하고 세션을 정리해 pending 상태와 무한 재시도를 방지했습니다.
    `.trim(),

    highlight:
      "StoryLex에서는 토큰 만료 상태에서 여러 API가 동시에 401을 반환하는 상황을 해결하기 위해, Axios 공통 레이어에서 refresh 요청을 single-flight 방식으로 제어하고 대기 요청을 새 토큰으로 재시도하는 구조를 구현했습니다.",
  },

  followUpQuestions: [
    {
      question: "왜 Promise Queue가 필요했나요?",
      answer: `
토큰 만료 상태에서 여러 API가 동시에 401을 받으면 각 요청이 개별적으로 refresh API를 호출할 수 있습니다.
이 경우 refresh 요청이 중복 실행되고, 어떤 요청을 어떤 토큰으로 재시도할지 흐름이 불안정해질 수 있습니다.
그래서 refresh는 한 번만 실행하고, 나머지 요청은 subscriber queue에서 대기한 뒤 새 토큰이 발급되면 재시도하도록 구성했습니다.
      `.trim(),
      evidenceImageIds: ["storylex-auth-refresh-success"],
    },
    {
      question: "Refresh 실패 시에는 어떻게 처리했나요?",
      answer: `
refresh 실패 시에는 대기 중인 요청들을 모두 reject 처리했습니다.
그 후 저장된 token과 userInfo를 정리하고, 일반 환경에서는 로그인 페이지로 이동하도록 처리했습니다.
또한 _retry 플래그를 사용해 이미 재시도한 요청이 다시 refresh를 시도하지 않도록 막아 무한 재시도를 방지했습니다.
      `.trim(),
      evidenceImageIds: ["storylex-auth-refresh-failure"],
    },
    {
      question: "MSW는 왜 사용했나요?",
      answer: `
실제 서버 상태에 의존하지 않고, 인증 만료와 refresh 성공/실패 흐름을 재현하기 위해 사용했습니다.
MSW handler에서 로그인 시 만료된 access token을 내려주고, 보호 API가 401을 반환하도록 구성했습니다.
이를 통해 “401 여러 건 → refresh 1회 → 원요청 재시도 성공” 흐름과 refresh 실패 흐름을 DevTools에서 확인할 수 있었습니다.
      `.trim(),
      evidenceImageIds: [
        "storylex-auth-refresh-success",
        "storylex-auth-refresh-failure",
      ],
    },
    {
      question: "React Query와 Zustand는 어떻게 나눠 사용했나요?",
      answer: `
React Query는 대시보드 통계, 단어 목록, 오답 데이터처럼 서버와 동기화되는 데이터를 관리하는 데 사용했습니다.
Zustand는 학습 옵션이나 모달, 선택값처럼 클라이언트 내부에서 유지해야 하는 상태를 관리하는 데 사용했습니다.
두 도구의 책임을 나누면서 서버 상태와 클라이언트 상태가 섞이지 않도록 했습니다.
      `.trim(),
      evidenceImageIds: [],
    },
    {
      question: "이 경험에서 가장 크게 배운 점은 무엇인가요?",
      answer: `
인증 처리는 단순히 401이 발생했을 때 refresh를 호출하는 것으로 끝나지 않는다는 점을 배웠습니다.
여러 API가 동시에 실패하는 상황에서는 refresh 요청을 한 번만 실행하도록 제어해야 하고, 실패 시에도 pending 상태나 무한 재시도가 남지 않도록 흐름을 고정해야 합니다.
이후부터는 기능을 구현할 때 정상 동작뿐 아니라 실패 흐름과 동시성 예외 상황을 먼저 고려하려고 합니다.
      `.trim(),
      evidenceImageIds: [],
    },
  ],

  evidenceImages: {
    "storylex-auth-refresh-success": {
      id: "storylex-auth-refresh-success",
      title: "401 동시 요청 refresh 성공 흐름",
      src: "/evidence/storylex/auth-refresh-success.png",
      alt: "401 여러 건 이후 refresh가 1회 성공하고 원요청들이 200으로 복구되는 DevTools Network 캡처",
      description:
        "만료된 access token으로 여러 요청이 401을 반환한 뒤 refresh가 1회만 성공하고 원요청들이 200으로 복구되는 캡처입니다.",
    },

    "storylex-auth-refresh-failure": {
      id: "storylex-auth-refresh-failure",
      title: "401 동시 요청 refresh 실패 흐름",
      src: "/evidence/storylex/auth-refresh-failure.png",
      alt: "401 여러 건 이후 refresh가 400으로 실패하고 localStorage가 비워진 상태와 로그인 화면이 표시된 캡처",
      description:
        "동시 401 이후 refresh가 실패했을 때 token과 userInfo를 정리하고 로그인 화면으로 복귀하는 캡처입니다.",
    },
  },

  answerPolicy: {
    useOnlyVerifiedContext: true,

    fallbackWhenNotInContext:
      "제공된 StoryLex 데이터셋 기준으로는 해당 내용이 확인되지 않습니다.",

    doNotSay: [
      "모든 인증 문제를 완벽히 해결했습니다.",
      "서비스 안정성이 크게 향상되었습니다.",
      "사용자 이탈을 줄였습니다.",
      "성능을 크게 개선했습니다.",
      "TypeScript로 타입 안정성을 확보했습니다.",
      "실제 대시보드 전체 API 목록을 모두 검증했습니다.",
      "화면 멈춤을 제거했습니다.",
      "사용자 경험을 개선했습니다.",
    ],

    styleRules: [
      "StoryLex 답변에서는 인증 동시성 문제, single-flight refresh, subscriber queue, 공통 httpClient 레이어, MSW 검증을 중심으로 설명한다.",
      "일반적인 React Query 설명보다 StoryLex에서 실제로 어떤 데이터를 관리했는지 설명한다.",
      "코드 근거 없이 성과를 과장하지 않는다.",
      "수치가 없는 성과를 만들지 않는다.",
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
    ],
  },
} as const;
