// src/content/knowledge/rodia.ts
// Rodia 프로젝트: 화물 운송 중개 플랫폼, React Native 앱, OpenAPI 자동화, 인앱 디버거, 정책 레이어, 디자인 토큰 검증
// 목적: 포트폴리오 AI가 확인된 Rodia 원자료 안에서만 답변하도록 하는 컨텍스트

export const rodia = {
  id: "rodia",

  name: "Rodia",

  summary: `
Rodia는 화주와 기사의 주문, 견적, 운행 상태를 역할에 맞는 화면으로 연결한 화물 운송 중개 플랫폼입니다.
React Native와 Expo 기반으로 앱을 개발했으며, 프론트엔드에서는 OpenAPI 스펙 기반 코드 자동화, 인앱 API 디버거, 정책 레이어 분리, 디자인 토큰 SSOT와 Zod 검증 흐름을 함께 정리했습니다.
  `.trim(),

  keywords: [
    "rodia",
    "화물 운송",
    "물류 서비스",
    "화주 앱",
    "기사 앱",
    "react native",
    "expo",
    "typescript",
    "monorepo",
    "pnpm workspaces",
    "axios",
    "orval",
    "openapi",
    "custom instance",
    "mutator",
    "interceptor",
    "in-app debugger",
    "api debug logs",
    "curl",
    "requestId",
    "policy layer",
    "design tokens",
    "tokens json",
    "zod",
  ],

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

  coreGoal:
    "화주와 기사 역할에 맞는 앱 화면을 구현하면서, API 명세 변경 대응, 모바일 통신 이슈 공유, 역할별 UI 정책, Web/App 스타일 기준을 반복 가능한 구조로 정리하는 것",

  responsibilities: [
    "React Native 앱 화면 개발",
    "화주 앱과 기사 앱의 주요 화면 구현",
    "모노레포 기반 프론트엔드 구조 정리",
    "OpenAPI 기반 API client/type 생성 흐름 정리",
    "Orval 전처리 및 생성 파이프라인 구성",
    "Orval custom instance와 Axios 공통 인스턴스 연결",
    "Axios interceptor 기반 인앱 API 디버거 구현",
    "requestId 기반 API 흐름 추적",
    "민감정보 마스킹 후 cURL 추출 흐름 구현",
    "화주/기사 역할별 UI 정책 레이어 분리",
    "tokens.json 기반 디자인 토큰 SSOT 구성",
    "Zod 기반 디자인 토큰 검증 흐름 정리",
    "AI 활용 개발 과정에서 스타일 일관성을 유지하기 위한 프롬프트/가이드 문서화",
  ],

  serviceFeatures: {
    shipperApp: {
      description:
        "화주가 홈 화면에서 주문 및 견적 흐름을 확인하고, 견적 요청 화면을 통해 운송 요청을 진행하는 앱 화면입니다.",
      screens: ["화주 앱 홈", "화주 앱 견적 요청"],
    },

    driverApp: {
      description:
        "기사가 홈 화면에서 배정 또는 운행 관련 정보를 확인하고, 오더 상세 화면에서 운행 정보를 확인하는 앱 화면입니다.",
      screens: ["기사 앱 홈", "기사 앱 오더 상세"],
    },
  },

  problemSummary: {
    problem:
      "Web/App 동시 개발 과정에서 OpenAPI 명세 변경 반영, 모바일 API 디버깅 공유, 역할별 UI 정책 처리, 스타일 기준 관리가 반복적으로 발생했습니다.",

    action:
      "Orval 기반 OpenAPI 자동 생성, 인앱 API 디버거와 cURL 추출, 정책 레이어 분리, tokens.json 기반 디자인 토큰 SSOT와 Zod 검증 흐름을 정리했습니다.",

    validation:
      "생성 산출물, API Debug Logs 캡처/영상, cURL 재현 흐름, 빌드 단계 검증 로그로 동작을 확인했습니다.",
  },

  openApiAutomation: {
    title: "OpenAPI + Orval 자동화",

    problem: `
백엔드 OpenAPI 스펙이 자주 변경되면서 API client와 타입을 수동으로 반복 수정해야 하는 비용이 있었습니다.
수동 수정 방식은 명세 변경이 누락되거나, API 호출 코드와 타입 정의가 서로 어긋날 가능성이 있었습니다.
    `.trim(),

    action: `
Orval을 사용해 OpenAPI 스펙 기반 API client와 타입을 생성하는 흐름을 만들었습니다.
다만 raw spec을 그대로 사용하면 content-type, admin API 포함, 태그 불일치 문제가 있었기 때문에 Orval 실행 전에 전처리 단계를 두었습니다.
    `.trim(),

    pipeline: [
      "1. 백엔드 서버에서 openapi.raw.json fetch",
      "2. fetch timeout은 10초로 설정하고, 실패 시 캐시된 raw 파일 사용",
      "3. fix-openapi-path-params.mjs에서 OpenAPI 스펙 전처리",
      "4. openapi.fixed.json 저장",
      "5. Orval이 openapi.fixed.json을 기준으로 API 함수와 스키마 파일 생성",
      "6. mode: tags-split 설정으로 태그별 모듈 폴더 분리",
      "7. generated 디렉터리에 API 함수와 스키마 파일 생성",
    ],

    preprocessing: {
      file: "fix-openapi-path-params.mjs",

      steps: [
        "path params 누락 보완",
        "content-type */*를 application/json으로 일괄 치환",
        "/api/admin 경로와 admin 관련 스키마 제거",
        "shipper-address-controller 태그를 shipper-address로 정규화",
      ],

      reasonForContentTypeFix: `
raw spec에서 /api/shipper/addresses, /api/driver/matches/{matchId}/photos 등 여러 엔드포인트의 응답 content-type이 */*로 선언되어 있었습니다.
이 경우 Orval이 응답을 blob 타입으로 생성해 런타임 오류로 이어질 수 있었습니다.
이를 막기 위해 전처리 단계에서 application/json으로 치환하고, custom instance에서도 /file 경로가 아닌 blob 응답 타입을 제거하는 이중 방어를 적용했습니다.
      `.trim(),
    },

    adminFiltering: {
      reason:
        "사용자 앱에서 필요하지 않은 admin API가 generated 코드에 섞이지 않도록 여러 단계에서 방어했습니다.",

      layers: [
        "전처리 단계에서 /api/admin 경로와 admin 관련 스키마 제거",
        "Orval filters.tags: [/^(?!admin-)/i]로 admin 태그 제외",
        "admin-path-filter.cjs transformer로 경로 레벨에서 최종 차단",
      ],

      whyThreeLayers: `
각 방어 단계가 우회될 수 있는 상황이 다르기 때문에 3중 방어로 구성했습니다.
전처리는 ORVAL_OPENAPI_URL로 raw spec을 직접 지정하면 우회될 수 있고, tags 필터는 admin과 동일 태그를 공유하는 엔드포인트를 경로 기준으로 걸러내기 어렵습니다.
그래서 transformer를 추가해 경로 레벨에서 한 번 더 차단했습니다.
      `.trim(),
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

    result:
      "OpenAPI 스펙 변경 시 API client와 타입을 수동으로 맞추는 대신, 전처리된 스펙과 Orval 생성 산출물을 기준으로 변경을 반영하는 흐름을 만들었습니다.",

    lesson:
      "API 자동화는 단순 코드 생성이 아니라, 잘못된 스펙 보정, 불필요한 API 제외, 생성 산출물 검토까지 포함한 파이프라인으로 설계해야 한다는 점을 배웠습니다.",
  },

  customInstance: {
    title: "Orval Custom Instance와 Axios 공통 인스턴스 연결",

    problem: `
Orval이 생성한 API 함수가 기본 axios나 개별 인스턴스를 직접 사용하면, 앱에서 사용하는 인증 처리, 에러 처리, 디버그 로깅 같은 공통 흐름을 보장하기 어렵습니다.
또한 raw spec의 content-type 문제로 인해 /file 경로가 아닌 API에도 blob responseType이 붙을 수 있었습니다.
    `.trim(),

    action: `
Orval mutator로 customInstance를 연결해, 생성된 모든 API 함수가 공통 apiClient를 거치도록 했습니다.
customInstance에서는 Orval 생성 과정에서 붙은 불필요한 blob responseType을 보정하고, FormData 요청의 timeout을 조정했습니다.
    `.trim(),

    implementationDetails: [
      "Orval override.mutator.path로 custom-instance.ts 연결",
      "Orval 생성 함수가 customInstance를 통해 apiClient.request를 호출하도록 구성",
      "/file 경로가 아닌데 responseType이 blob이면 responseType 제거",
      "FormData payload 요청은 timeout을 60초로 연장",
      "응답에서는 response.data 반환",
    ],

    example: `
export async function customInstance<T>(config: AxiosRequestConfig): Promise<T> {
  const nextConfig = { ...config };

  if (nextConfig.responseType === 'blob' && !shouldKeepBlobResponse(nextConfig.url)) {
    delete nextConfig.responseType;
  }

  if (isFormDataPayload(nextConfig.data)) {
    nextConfig.timeout = 60_000;
  }

  const response = await apiClient.request<T>(nextConfig);
  return response.data;
}
    `.trim(),

    orvalConfigExample: `
override: {
  mutator: {
    path: './src/shared/api/orval/custom-instance.ts',
    name: 'customInstance',
  },
}
    `.trim(),

    roleDifference: {
      mutator:
        "Orval 생성 함수가 어떤 axios 인스턴스를 사용할지 결정하는 요청 생성 단계의 연결 지점",
      interceptor:
        "인증 헤더 주입, 에러 처리, 401 대응, 로깅처럼 요청/응답 처리 단계에서 동작하는 계층",
    },

    interviewPoint:
      "interceptor는 요청/응답을 처리하는 계층이고, mutator는 Orval 생성 함수가 공통 axios 인스턴스를 반드시 거치도록 강제하는 연결 계층입니다.",
  },

  apiDebugLogger: {
    title: "인앱 API 디버거와 cURL 재현 흐름",

    problem: `
모바일 앱은 웹처럼 DevTools Network 탭을 바로 확인하기 어렵습니다.
백엔드와 API 연동 중 요청/응답이 맞지 않을 때 URL, method, status, message, request body를 말로 설명해야 해서 재현과 공유 비용이 컸습니다.
    `.trim(),

    action: `
Axios interceptor로 request, response, error를 중앙에서 수집하고, 앱 내부의 API Debug Logs 화면에서 확인할 수 있도록 했습니다.
각 요청은 requestId 단위로 묶어 추적하고, 민감정보를 마스킹한 뒤 cURL로 복사해 백엔드가 동일 요청을 재현할 수 있도록 했습니다.
    `.trim(),

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
        "인앱 API Debug Logs 화면에서 POST /api/auth/shipper/login 요청이 401로 기록되고, Authentication required 메시지가 표시되는 흐름을 캡처했습니다.",
      demoFile: "/evidence/rodia/curl.gif",
    },

    result:
      "모바일 통신 이슈를 설명 중심으로 공유하는 대신, 앱 내부 로그와 cURL을 통해 동일 요청을 재현할 수 있는 흐름을 만들었습니다.",

    lesson:
      "모바일 API 디버깅에서는 에러 발생 여부보다, 같은 요청을 다시 재현하고 공유할 수 있는 정보가 중요하다는 점을 배웠습니다.",
  },

  policyLayer: {
    title: "화주/기사 상태 처리를 위한 정책 레이어 분리",

    problem: `
화주와 기사 역할에 따라 같은 운송 상태도 화면에서 다르게 보여야 했습니다.
이 규칙을 화면 컴포넌트마다 직접 처리하면 조건문이 분산되고, 정책 변경 시 여러 화면을 함께 수정해야 하는 문제가 생길 수 있었습니다.
    `.trim(),

    action: `
서버 상태를 UI에서 사용할 badge, disabled, label 같은 값으로 변환하는 정책 함수를 분리했습니다.
UI 컴포넌트는 정책 함수의 반환값만 사용하고, 역할별 조건은 정책 레이어에서 처리하도록 했습니다.
    `.trim(),

    example: `
function getMeetingStatusTokens(status: string, role: 'shipper' | 'driver') {
  return {
    badge: ...,
    disabled: ...,
    label: ...,
  };
}
    `.trim(),

    result:
      "화주/기사 역할별 UI 규칙을 화면 컴포넌트가 아니라 정책 함수에 모아 관리할 수 있도록 했습니다.",

    lesson:
      "역할과 상태 조합이 많은 화면에서는 조건문을 UI에 직접 두기보다, 순수 함수 형태의 정책 레이어로 분리하는 것이 유지보수에 더 적합하다는 점을 배웠습니다.",
  },

  designTokens: {
    title: "디자인 토큰 SSOT와 Zod 기반 빌드 검증",

    problem: `
Web/App 스타일 기준이 분리되어 있으면 색상, 간격, 폰트 같은 값이 서로 다르게 반영될 수 있습니다.
또한 tokens.json은 외부 JSON 파일이기 때문에 TypeScript 타입만으로는 런타임에 잘못된 값이 들어오는 상황을 충분히 막기 어렵습니다.
    `.trim(),

    action: `
rodia.tokens.json을 색상, 간격, 폰트의 단일 소스로 두고, 빌드 스크립트에서 플랫폼별 산출물을 생성했습니다.
Zod safeParse로 토큰 구조를 검증하고, 검증 실패 시 빌드를 중단하도록 했습니다.
    `.trim(),

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

    result:
      "토큰 수정 후 웹과 앱 산출물을 생성하는 흐름을 만들고, 잘못된 토큰 값은 빌드 단계에서 확인할 수 있도록 했습니다.",

    lesson:
      "디자인 토큰은 단일 원본뿐 아니라, 실제 산출물로 변환되기 전에 값의 구조와 형식을 검증하는 과정까지 포함해야 한다는 점을 배웠습니다.",
  },

  monorepo: {
    title: "pnpm Workspaces 기반 모노레포 구조",

    problem: `
Web/App과 공통 패키지가 함께 사용되는 구조에서는 디자인 토큰, API 생성 코드, 공통 설정의 변경을 한 흐름 안에서 관리할 필요가 있었습니다.
각 영역이 분리되어 있으면 한쪽만 갱신되고 다른 쪽은 누락되는 상황이 생길 수 있었습니다.
    `.trim(),

    action:
      "pnpm Workspaces 기반 모노레포 구조에서 앱, 공통 패키지, 디자인 토큰 패키지를 함께 관리하도록 정리했습니다.",

    result:
      "공통 토큰과 관련 빌드 흐름을 하나의 작업 공간 안에서 관리할 수 있도록 했습니다.",

    lesson:
      "모노레포는 단순히 코드를 한 저장소에 모으는 것이 아니라, 공통 자산의 변경과 검증 흐름을 한 번에 관리하기 위한 구조로 접근해야 한다는 점을 배웠습니다.",
  },

  aiDevelopmentGuide: {
    title: "AI 활용 개발 과정의 스타일 일관성 가이드",

    problem:
      "AI를 활용해 코드를 작성하거나 UI를 확장할 때, 같은 프로젝트 안에서도 스타일 기준이 흔들릴 수 있었습니다.",

    action:
      "AI에게 전달할 프롬프트와 스타일 가이드를 문서화해, UI 작성 기준과 공통 컴포넌트 사용 기준을 맞추려 했습니다.",

    result:
      "AI 활용 과정에서도 스타일 기준을 명시적으로 유지하기 위한 가드레일을 마련했습니다.",

    lesson:
      "AI를 개발 과정에 사용할 때는 결과물을 빠르게 얻는 것보다, 프로젝트의 기존 기준을 유지하도록 입력 맥락을 정리하는 것이 중요하다는 점을 배웠습니다.",
  },

  retrospective: {
    whatWorked: [
      "OpenAPI 스펙을 전처리한 뒤 Orval로 API client와 타입을 생성하는 흐름을 만든 점",
      "admin API가 사용자 앱 generated 코드에 섞이지 않도록 여러 단계의 필터링을 둔 점",
      "Orval custom instance를 통해 생성 API가 공통 Axios 인스턴스를 거치도록 만든 점",
      "모바일 앱 내부에서 요청/응답/에러를 확인할 수 있는 API Debug Logs 화면을 만든 점",
      "cURL 추출을 통해 통신 이슈를 재현 가능한 형태로 공유하려 한 점",
      "역할별 UI 상태 처리를 정책 레이어로 분리한 점",
      "tokens.json을 단일 소스로 두고 Web/App 산출물 생성을 연결한 점",
      "Zod 검증으로 디자인 토큰의 잘못된 값을 빌드 단계에서 확인하려 한 점",
    ],

    whatWasDifficult: [
      "raw OpenAPI 스펙의 content-type */* 문제로 Orval이 blob 타입을 생성하던 문제",
      "사용자 앱에 필요 없는 admin API를 generated 코드에서 제외하는 문제",
      "모바일 통신 이슈를 백엔드와 같은 맥락으로 공유할 수 있게 만드는 문제",
      "화주/기사 역할과 운송 상태 조합을 화면마다 흩어지지 않게 관리하는 문제",
      "Web/App 스타일 기준을 하나로 유지하는 문제",
    ],

    keyLessons: [
      "API 자동화는 코드 생성 자체보다 스펙 전처리, 불필요한 API 제외, 공통 인스턴스 연결까지 포함해야 안정적으로 사용할 수 있다는 점",
      "mutator와 interceptor는 역할이 다르며, Orval 생성 함수가 공통 요청 계층을 거치게 하려면 mutator 연결이 필요하다는 점",
      "모바일 디버깅은 실패 결과보다 재현 가능한 요청 정보를 공유하는 것이 중요하다는 점",
      "역할과 상태 조합이 많은 서비스에서는 UI 조건문보다 정책 레이어 분리가 유지보수에 더 적합하다는 점",
      "디자인 토큰은 단일 원본뿐 아니라 검증과 산출물 생성 흐름까지 함께 필요하다는 점",
      "AI를 개발에 활용할 때는 프로젝트 스타일 기준을 유지할 수 있는 가이드가 필요하다는 점",
    ],
  },

  interviewAnswers: {
    short: `
Rodia는 화주와 기사의 주문, 견적, 운행 상태를 연결한 화물 운송 중개 플랫폼입니다.
저는 React Native 앱 개발과 함께, 프론트엔드 개발 과정의 반복 작업과 디버깅 비용을 줄이는 구조를 정리했습니다.
OpenAPI 스펙 변경에 대응하기 위해 Orval 기반 생성 파이프라인을 만들었고, raw spec의 content-type 문제와 admin API 포함 문제를 전처리와 필터링 단계에서 다뤘습니다.
또한 Orval custom instance를 통해 생성 API가 공통 Axios 인스턴스를 거치도록 연결했고, Axios interceptor 기반 인앱 API 디버거와 cURL 추출 기능을 구현했습니다.
역할별 UI 규칙은 정책 레이어로 분리했고, 디자인 토큰은 tokens.json을 단일 소스로 두고 Zod 검증과 플랫폼별 산출물 생성 흐름을 구성했습니다.
    `.trim(),

    highlight:
      "Rodia에서는 React Native 앱 개발뿐 아니라 Orval 기반 OpenAPI 자동화, custom instance와 Axios 공통 인스턴스 연결, 인앱 API 디버거와 cURL 추출, 정책 레이어 분리, tokens.json과 Zod를 활용한 디자인 토큰 검증 흐름을 정리했습니다.",
  },

  followUpQuestions: [
    {
      question: "Rodia는 어떤 프로젝트인가요?",
      answer: `
Rodia는 화주와 기사의 주문, 견적, 운행 상태를 역할에 맞는 화면으로 연결한 화물 운송 중개 플랫폼입니다.
React Native와 Expo 기반으로 앱을 개발했고, 저는 앱 화면 구현과 함께 OpenAPI 자동화, 인앱 API 디버거, 정책 레이어, 디자인 토큰 검증 같은 프론트엔드 DX 개선 작업도 맡았습니다.
      `.trim(),
    },
    {
      question: "Orval은 왜 사용했나요?",
      answer: `
OpenAPI 스펙 변경이 자주 발생하면 타입과 API client를 수동으로 맞추는 과정에서 누락이 생길 수 있습니다.
Rodia에서는 OpenAPI 스펙을 전처리한 뒤 Orval로 API 함수와 스키마 파일을 생성하는 흐름을 만들었습니다.
생성 결과는 tags-split 방식으로 태그별 모듈로 분리했고, generated 디렉터리에 30개 모듈과 172개 파일이 생성되는 것을 확인했습니다.
      `.trim(),
    },
    {
      question: "OpenAPI 전처리는 왜 필요했나요?",
      answer: `
raw OpenAPI spec에는 path params 누락, content-type */* 선언, 사용자 앱에 필요 없는 admin API, 정규화되지 않은 태그 문제가 있었습니다.
특히 */* content-type은 Orval이 응답을 blob으로 생성하게 만들어 런타임 오류로 이어질 수 있었습니다.
그래서 전처리 단계에서 path params를 보완하고, */*를 application/json으로 치환하며, admin 경로와 스키마를 제거하고, 태그를 정규화했습니다.
      `.trim(),
    },
    {
      question: "admin API는 왜 3중으로 방어했나요?",
      answer: `
각 방어 단계가 우회될 수 있는 상황이 다르기 때문입니다.
전처리는 ORVAL_OPENAPI_URL로 raw spec을 직접 지정하면 우회될 수 있고, tags 필터는 admin과 동일 태그를 공유하는 엔드포인트를 경로 기준으로 걸러내기 어렵습니다.
그래서 전처리, Orval tags 필터, transformer를 함께 사용해 사용자 앱에 필요 없는 admin API가 generated 코드에 섞이지 않도록 했습니다.
      `.trim(),
    },
    {
      question: "mutator와 interceptor는 어떻게 다른가요?",
      answer: `
mutator는 Orval이 생성한 API 함수가 어떤 axios 인스턴스를 사용할지 결정하는 연결 지점입니다.
반면 interceptor는 요청이나 응답이 오가는 과정에서 인증 헤더 주입, 에러 처리, 401 대응, 로깅 같은 처리를 수행합니다.
Rodia에서는 mutator로 customInstance를 연결해 생성된 API 함수가 공통 apiClient를 거치도록 했고, interceptor에서는 요청/응답/에러 수집과 공통 처리를 담당하게 했습니다.
      `.trim(),
    },
    {
      question: "인앱 API 디버거는 왜 만들었나요?",
      answer: `
모바일 앱에서는 웹처럼 DevTools Network 탭을 바로 확인하기 어렵습니다.
그래서 Axios interceptor로 request, response, error를 앱 내부에 기록하고, API Debug Logs 화면에서 태그와 상태 코드로 확인할 수 있게 했습니다.
또한 민감정보를 마스킹한 cURL을 추출해 백엔드가 동일 요청을 재현할 수 있도록 했습니다.
      `.trim(),
      evidenceImageIds: ["rodia-api-debug-curl"],
    },
    {
      question: "requestId는 어떻게 만들었나요?",
      answer: `
requestId는 서버에서 내려주는 값이 아니라 클라이언트에서 생성했습니다.
Date.now()와 Math.random()을 조합하거나 uuid 방식으로 만들 수 있으며, 요청 흐름을 앱 내부에서 묶어 보기 위한 목적이었습니다.
다만 서버에서 보장하는 식별자가 아니기 때문에 완전한 유일성을 보장한다고 말하지는 않습니다.
      `.trim(),
    },
    {
      question: "정책 레이어는 왜 분리했나요?",
      answer: `
화주와 기사 역할에 따라 같은 운송 상태도 UI에서 다르게 표현되어야 했습니다.
이 조건을 화면마다 직접 처리하면 조건문이 분산되고 정책 변경 시 여러 화면을 수정해야 할 수 있습니다.
그래서 서버 상태를 badge, disabled, label 같은 UI 값으로 변환하는 정책 함수를 분리하고, UI는 그 반환값만 렌더링하도록 했습니다.
      `.trim(),
    },
    {
      question: "디자인 토큰은 어떻게 관리했나요?",
      answer: `
rodia.tokens.json을 색상, 간격, 폰트의 단일 소스로 두고, 빌드 스크립트에서 웹용 Tailwind semantic color config와 모바일용 React Native theme object를 생성하도록 했습니다.
JSON 토큰 파일은 외부 데이터이므로 TypeScript 타입만으로는 실제 값 검증이 부족할 수 있습니다.
그래서 Zod safeParse로 빌드 스크립트 실행 시 토큰 구조와 값 형식을 검증하고, 실패하면 빌드를 중단하도록 했습니다.
      `.trim(),
    },
    {
      question: "Rodia에서 가장 의미 있었던 문제 해결은 무엇인가요?",
      answer: `
가장 의미 있었던 문제는 모바일 API 디버깅 흐름을 재현 가능한 형태로 만든 것입니다.
기존에는 통신 실패를 말로 설명해야 했지만, 인앱 API 디버거와 cURL 추출을 통해 URL, method, status, message, tag 같은 정보를 함께 확인하고 같은 요청을 재현할 수 있게 했습니다.
이 경험을 통해 모바일 디버깅에서는 단순한 에러 표시보다 재현 가능한 요청 정보를 남기는 것이 중요하다는 점을 배웠습니다.
      `.trim(),
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

    fallbackWhenNotInContext:
      "제공된 Rodia 데이터셋 기준으로는 해당 내용이 확인되지 않습니다.",

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
    ],

    styleRules: [
      "Rodia 답변에서는 화물 운송 중개 플랫폼, React Native 앱 개발, Orval 기반 OpenAPI 자동화, custom instance, 인앱 API 디버거, cURL 추출, 정책 레이어, tokens.json, Zod 검증을 중심으로 설명한다.",
      "구현 사실 기반 수치는 allowedNumbers에 있는 것만 사용한다.",
      "수치 근거가 없는 성과는 말하지 않는다.",
      "완전 차단, 100%, 0건 수정 같은 절대 표현을 사용하지 않는다.",
      "협업 속도 개선 같은 추상 표현은 단독으로 사용하지 말고, “설명에서 cURL 재현 공유로 바꾸었다”처럼 관찰 가능한 변화로 설명한다.",
      "mutator와 interceptor는 역할을 구분해서 설명한다.",
      "정책 레이어는 역할별 UI 조건을 화면에서 분리한 구조로 설명한다.",
      "디자인 토큰은 단일 원본, 검증, 산출물 생성 흐름 관점에서 설명한다.",
      "확인 필요, 내부 TODO, 추정성 표현은 답변에 포함하지 않는다.",
    ],
  },
} as const;
