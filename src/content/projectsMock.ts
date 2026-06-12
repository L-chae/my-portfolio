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
    summary: '학습 흐름이 끊기지 않는 영어 학습 서비스',
    problem: '동시 401 응답으로 인증 재시도와 사용자 상태가 어긋나는 문제가 있었습니다.',
    solution: 'Promise Queue로 토큰 재발급과 실패 요청 재시도를 한 번에 제어했습니다.',
    technicalDecision: 'React Query는 서버 상태, Zustand는 사용자 제어 상태로 분리했습니다.',
    tradeOff: '큐 관리 비용은 늘었지만, 동시성 상황의 데이터 검증 흐름이 안정화됐습니다.',
    situation:
      '영어 학습 화면에서 여러 API 요청이 동시에 실패하면 인증 갱신과 재요청이 중복 실행되어 사용자가 로그인 상태를 신뢰하기 어려운 상황이 생겼습니다.',
    judgment:
      '개별 요청마다 토큰 갱신을 붙이는 방식은 빠르게 고칠 수 있지만, 실패 요청이 많아질수록 상태가 더 쉽게 꼬인다고 판단했습니다.',
    implementation:
      '토큰 갱신 요청을 하나의 Promise Queue로 묶고, 갱신 성공 이후 대기 중인 요청을 순차적으로 재시도하도록 인증 흐름을 단일 경로로 정리했습니다.',
    result:
      '동시성 상황에서도 인증 상태와 요청 결과가 예측 가능해졌고, 사용자 입장에서는 학습 흐름이 갑자기 끊기는 경험이 줄었습니다.',
    techStack: ['React', 'TypeScript', 'React Query', 'Zustand', 'Promise Queue'],
    links: [],
    aiQuestion: 'StoryLex 401 에러 해결 과정 알려줘',
    featured: true,
  },
  {
    projectKey: 'rodia',
    label: 'Mobile Application',
    displayLabel: '모바일 앱 구조 개선',
    name: 'Rodia',
    summary: 'React Native 기반 모바일 앱과 디자인 자산 통합 경험',
    problem: 'API 응답 변경과 화면 전환 흐름이 맞물려 화면 수정 비용이 커졌습니다.',
    solution: 'Feature API와 Mapper 계층을 분리해 서버 응답 변경 영향을 격리했습니다.',
    technicalDecision: '화면 로직과 API 응답 매핑을 분리하고 Zod/Orval로 포맷 검증을 보강했습니다.',
    tradeOff: '초기 구조화 비용은 늘었지만 반복 수정 비용과 런타임 오류 가능성을 줄였습니다.',
    situation:
      '모바일 화면은 작은 UI 변경도 API 응답 구조, 상태 매핑, 화면 전환 로직과 연결되어 반복 수정 비용이 커지기 쉬웠습니다.',
    judgment:
      '화면 컴포넌트가 서버 응답 형태를 직접 알게 두면 변경 범위가 넓어진다고 보고, API 경계와 화면 경계를 분리하는 쪽을 선택했습니다.',
    implementation:
      'Feature 단위 API 함수와 Mapper를 분리하고, Orval과 Zod를 활용해 응답 타입과 런타임 검증 흐름을 보강했습니다.',
    result:
      '서버 응답 변경이 화면 전체로 번지는 일을 줄였고, QA 단계에서 발견되던 데이터 형태 오류를 더 이른 시점에 통제할 수 있었습니다.',
    techStack: ['React Native', 'TypeScript', 'Mapper', 'Zod', 'Orval'],
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
