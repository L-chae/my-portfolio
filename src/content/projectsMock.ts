export interface ProjectDetail {
  projectKey: string;
  label: string;
  displayLabel: string;
  name: string;
  summary: string;
  problem: string;
  solution: string;
  technicalDecision: string;
  tradeOff: string;
  situation: string;
  judgment: string;
  implementation: string;
  result: string;
  techStack: string[];
  links: { label: string; href: string }[];
  aiQuestion: string;
  featured?: boolean;
}

export const PROJECTS_MOCK: ProjectDetail[] = [
  {
    projectKey: 'storylex',
    label: 'Web Application',
    displayLabel: '영어 학습 서비스',
    name: 'StoryLex',
    summary: '학습 중 인증 만료 상황까지 고려한 영어 학습 서비스',
    problem: '동시 401 응답으로 refresh 요청이 중복 실행되고, 기존 요청 재시도 흐름이 복잡해질 수 있었습니다.',
    solution: 'subscriber queue로 refresh 요청을 한 번만 실행하고, 대기 중인 요청을 새 토큰으로 재시도하도록 정리했습니다.',
    technicalDecision: 'React Query는 서버 상태, Zustand는 사용자 제어 상태로 분리했습니다.',
    tradeOff: 'isRefreshing, refreshSubscribers, _retry 같은 제어 로직은 늘었지만, 인증 만료와 실패 흐름을 공통 httpClient 레이어에서 다룰 수 있었습니다.',
    situation:
      '영어 학습 화면과 대시보드에서는 여러 API 요청이 동시에 발생합니다. access token이 만료된 상태라면 여러 요청이 동시에 401을 반환하고, 각 요청이 개별적으로 refresh를 시도할 수 있었습니다.',
    judgment:
      '개별 요청마다 refresh 처리를 붙이면 빠르게 해결할 수는 있지만, 요청 수가 늘어날수록 refresh 중복 실행, pending 요청, 무한 재시도 가능성이 커진다고 판단했습니다.',
    implementation:
      'Axios 공통 인스턴스에서 401 응답을 감지하고, refresh가 진행 중이면 실패 요청을 refreshSubscribers에 대기시켰습니다. refresh 성공 시 새 토큰으로 대기 요청을 재시도하고, 실패 시 대기 요청을 reject 처리한 뒤 세션 정보를 정리했습니다.',
    result:
      '동시 401 상황에서 refresh가 1회만 실행되고, 성공 시 기존 요청이 새 토큰으로 복구되는 흐름을 MSW와 DevTools Network 캡처로 확인했습니다. 실패 시에는 추가 재시도 없이 세션 정리 흐름으로 이동하도록 했습니다.',
    techStack: ['React', 'JavaScript JSX', 'React Query', 'Zustand', 'Axios', 'MSW'],
    links: [],
    aiQuestion: 'StoryLex 401 에러 해결 과정 알려줘',
    featured: true,
  },
  {
    projectKey: 'rodia',
    label: 'Mobile Application',
    displayLabel: '화물 운송 모바일 앱',
    name: 'Rodia',
    summary: '화주와 기사 앱을 만들며 API 변경과 모바일 디버깅 흐름까지 정리한 프로젝트',
    problem: 'Web/App 동시 개발 과정에서 OpenAPI 명세 변경 반영, 모바일 API 디버깅 공유, 역할별 UI 정책 처리, 스타일 기준 관리가 반복적으로 발생했습니다.',
    solution: 'OpenAPI spec 전처리와 Orval 생성 흐름, customInstance 연결, 인앱 API Debug Logs, 정책 레이어, 디자인 토큰 검증 흐름을 정리했습니다.',
    technicalDecision: '생성된 API 함수도 공통 apiClient를 거치도록 customInstance를 연결하고, 요청/응답/에러는 Axios interceptor에서 수집하도록 분리했습니다.',
    tradeOff: '전처리 스크립트와 공통 요청 계층을 관리해야 하는 비용은 생겼지만, API 명세 변경과 모바일 통신 이슈를 더 재현 가능한 흐름으로 다룰 수 있었습니다.',
    situation:
      '화주와 기사 앱을 함께 개발하면서 API 명세 변경, admin API 제외, content-type 보정, 모바일 환경의 통신 이슈 공유, 역할별 화면 조건 처리가 반복적으로 발생했습니다.',
    judgment:
      'API 호출 코드를 수동으로 맞추는 방식은 명세 변경이 누락되기 쉽고, 모바일 통신 문제를 말로만 공유하면 재현 비용이 크다고 판단했습니다. 그래서 생성 흐름과 디버깅 흐름을 함께 정리하는 쪽을 선택했습니다.',
    implementation:
      'raw OpenAPI spec을 전처리해 path params, content-type, admin API, 태그 문제를 보정한 뒤 Orval로 API 함수와 스키마 파일을 생성했습니다. 생성된 API 함수는 customInstance를 통해 공통 apiClient를 거치게 했고, Axios interceptor 기반 인앱 API Debug Logs와 cURL 추출 흐름을 구현했습니다. 역할별 UI 조건은 정책 레이어로 분리하고, 디자인 토큰은 tokens.json과 Zod safeParse 검증 흐름으로 관리했습니다.',
    result:
      'OpenAPI 명세 변경은 전처리된 spec과 Orval 생성 산출물을 기준으로 반영할 수 있게 되었고, 모바일 통신 문제는 앱 내부 로그와 cURL로 재현 가능한 형태로 공유할 수 있게 되었습니다. 디자인 토큰 오류는 빌드 스크립트 실행 시 Zod 검증으로 확인하는 흐름을 만들었습니다.',
    techStack: ['React Native', 'Expo', 'TypeScript', 'OpenAPI', 'Orval', 'Axios', 'Zod'],
    links: [],
    aiQuestion: 'Rodia API 흐름은 어떻게 개선했나요?',
  },
  {
    projectKey: 'portfolio-ai',
    label: 'AI Interface',
    displayLabel: '포트폴리오 AI 인터페이스',
    name: 'Portfolio AI',
    summary: '포트폴리오 데이터셋 기반 질의응답 인터페이스',
    problem: '일반 포트폴리오는 방문자가 원하는 맥락을 직접 탐색하기 어렵습니다.',
    solution: '문제-해결-트레이드오프 기반 데이터셋으로 답변 범위를 통제했습니다.',
    technicalDecision: '프로젝트별 context 질문과 추천 질문을 연결해 탐색 흐름을 설계했습니다.',
    tradeOff: '범용성은 줄였지만 포트폴리오 목적에 맞는 신뢰도와 일관성을 우선했습니다.',
    situation:
      '정적인 포트폴리오만으로는 방문자가 프로젝트 맥락, 기술 선택 이유, 실패 대응 방식을 원하는 순서로 탐색하기 어려웠습니다.',
    judgment:
      '모델 성능보다 답변 근거가 되는 데이터 구조가 더 중요하다고 보고, 범용 챗봇이 아니라 포트폴리오 목적에 맞춘 제한된 AI 인터페이스로 설계했습니다.',
    implementation:
      '지식 데이터를 주제별로 구조화하고, 질문 의도에 맞는 컨텍스트만 프롬프트에 주입해 답변 범위와 비용을 함께 통제했습니다.',
    result:
      '방문자는 프로젝트를 읽다가 궁금한 지점을 바로 질문할 수 있고, 답변은 포트폴리오 안의 검증된 맥락을 중심으로 유지됩니다.',
    techStack: ['Next.js', 'AI SDK', 'TypeScript', 'Zustand', 'Structured Dataset'],
    links: [],
    aiQuestion: '포트폴리오 AI는 RAG 없이 어떻게 동작하나요?',
  },
];