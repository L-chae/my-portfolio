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
    summary: '인증 만료 상황에서도 학습 흐름이 끊기지 않도록 설계한 영어 학습 서비스',
    situation:
      '퀴즈, 플래시카드, 오답노트, 대시보드처럼 여러 학습 화면에서 API 요청이 동시에 발생하는 구조였습니다.',
    problem:
      'access token이 만료되면 여러 요청이 동시에 401을 반환했고, 각 요청이 따로 refresh를 시도할 수 있었습니다.',
    solution:
      'refresh 요청을 한 번만 실행하고, 대기 중인 요청은 새 토큰으로 재시도하는 흐름으로 정리했습니다.',
    judgment:
      '개별 요청마다 예외 처리를 붙이면 빠르게 해결할 수는 있지만, 요청 수가 늘수록 중복 refresh와 무한 재시도 위험이 커진다고 판단했습니다.',
    implementation:
      'Axios 공통 인스턴스에서 401 응답을 감지하고, refresh 진행 중에는 실패한 요청을 subscriber queue에 대기시켰습니다. refresh 성공 시 대기 요청을 새 토큰으로 재시도하고, 실패 시 세션 정보를 정리했습니다.',
    technicalDecision:
      'React Query는 서버 상태 관리에, Zustand는 사용자 제어 상태 관리에 사용했습니다. 인증 만료 처리는 화면이 아니라 공통 httpClient 레이어에서 다뤘습니다.',
    result:
      '동시 401 상황에서도 refresh는 1회만 실행되고, 기존 요청이 새 토큰으로 복구되는 흐름을 MSW와 DevTools Network 캡처로 확인했습니다.',
    tradeOff:
      'isRefreshing, refreshSubscribers, _retry 같은 제어 로직은 추가됐지만, 인증 실패 흐름을 한 곳에서 관리할 수 있게 됐습니다.',
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
    summary: 'API 변경 대응과 모바일 디버깅 흐름을 함께 정리한 화물 운송 앱',
    situation:
      '화주 앱과 기사 앱을 함께 개발하면서 API 명세 변경, 역할별 화면 조건, 모바일 통신 이슈 공유가 반복적으로 발생했습니다.',
    problem:
      'OpenAPI 명세가 바뀔 때마다 프론트엔드 코드 반영이 누락될 수 있었고, 모바일 환경의 API 문제는 재현과 공유가 어려웠습니다.',
    solution:
      'OpenAPI spec 전처리, Orval 생성 흐름, 공통 apiClient 연결, 인앱 API Debug Logs를 하나의 흐름으로 정리했습니다.',
    judgment:
      'API 호출 코드를 수동으로 맞추는 방식보다, 명세를 보정하고 생성된 API도 공통 요청 규칙을 거치게 만드는 편이 변경에 더 안전하다고 판단했습니다.',
    implementation:
      'raw OpenAPI spec을 전처리해 path params, content-type, admin API, 태그 문제를 보정했습니다. 이후 Orval로 API 함수와 스키마 파일을 생성하고, customInstance를 통해 공통 apiClient와 연결했습니다. 요청/응답/에러 정보는 Axios interceptor에서 수집해 인앱 API Debug Logs와 cURL 재현 흐름으로 확인할 수 있게 했습니다.',
    technicalDecision:
      '생성된 API 함수도 인증 처리, 에러 처리, timeout, 디버깅 로그가 적용되는 공통 요청 계층을 거치도록 구성했습니다.',
    result:
      'API 명세 변경은 전처리된 spec과 Orval 생성 산출물을 기준으로 반영할 수 있게 되었고, 모바일 통신 문제는 앱 내부 로그와 cURL로 재현 가능한 형태로 공유할 수 있게 됐습니다.',
    tradeOff:
      '전처리 스크립트와 공통 요청 계층을 관리해야 하는 비용은 생겼지만, API 변경과 모바일 디버깅 이슈를 더 예측 가능한 흐름으로 다룰 수 있었습니다.',
    techStack: ['React Native', 'Expo', 'TypeScript', 'OpenAPI', 'Orval', 'Axios', 'Zod'],
    links: [],
    aiQuestion: 'Rodia API 흐름은 어떻게 개선했나요?',
  },
  {
    projectKey: 'portfolio-ai',
    label: 'AI Interface',
    displayLabel: '포트폴리오 AI 인터페이스',
    name: 'Portfolio AI',
    summary: '포트폴리오 내용을 질문 흐름으로 탐색할 수 있게 만든 AI 인터페이스',
    situation:
      '정적인 포트폴리오만으로는 방문자가 프로젝트 맥락, 기술 선택 이유, 문제 해결 과정을 원하는 순서로 탐색하기 어려웠습니다.',
    problem:
      '일반 챗봇처럼 답변 범위를 열어두면 포트폴리오에 없는 내용을 말할 수 있고, 단순 페이지 탐색만으로는 질문 맥락을 이어가기 어려웠습니다.',
    solution:
      '프로젝트, 경험, 문제 해결 방식, AI 활용 기준을 구조화된 데이터셋으로 정리하고, 질문 의도에 맞는 컨텍스트만 답변에 사용하도록 구성했습니다.',
    judgment:
      '모델 성능을 확장하는 것보다, 답변이 참조할 수 있는 근거 범위를 명확히 제한하는 것이 포트폴리오 목적에 더 적합하다고 판단했습니다.',
    implementation:
      '주제별 knowledge 데이터를 만들고, 검색된 context를 기반으로 답변을 생성하도록 구성했습니다. 자주 묻는 질문은 preparedAnswers로 분리해 일관된 답변을 제공하고, evidenceImageIds와 suggestedActions는 응답 metadata로 연결했습니다.',
    technicalDecision:
      'RAG 시스템을 크게 도입하기보다, 포트폴리오 범위에 맞는 정적 데이터셋과 검색 흐름으로 답변 신뢰도와 유지보수성을 우선했습니다.',
    result:
      '방문자는 프로젝트를 읽다가 궁금한 지점을 바로 질문할 수 있고, 답변은 포트폴리오 안에서 확인 가능한 맥락을 중심으로 유지됩니다.',
    tradeOff:
      '범용적인 질문 대응력은 줄었지만, 포트폴리오 목적에 맞는 답변 일관성과 근거 통제력을 얻었습니다.',
    techStack: ['Next.js', 'AI SDK', 'TypeScript', 'Zustand', 'Structured Dataset'],
    links: [],
    aiQuestion: '포트폴리오 AI는 RAG 없이 어떻게 동작하나요?',
  },
];