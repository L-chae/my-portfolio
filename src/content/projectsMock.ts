export interface ProjectDetail {
  projectKey: string;
  label: string;
  displayLabel: string;
  name: string;
  summary: string;
  period?: string;
  team: string;
  role: string;
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
}

export const PROJECTS_MOCK: ProjectDetail[] = [
  {
    projectKey: 'storylex',
    label: 'Web Application',
    displayLabel: '영어 학습 서비스',
    name: 'StoryLex',
    summary:
      '틀린 영어 단어를 퀴즈, 플래시카드, 오답노트, AI 스토리로 반복 학습할 수 있게 만든 웹 서비스입니다.',
    period: '2025.11 ~ 2025.12',
    team: '총 4명 · 프론트엔드 2명, 백엔드 2명',
    role: '프론트엔드 화면 구현 · 인증 예외 처리 · 상태 관리 정리',

    situation:
      'StoryLex는 사용자가 영어 단어를 학습하고 복습할 수 있도록 만든 팀 프로젝트입니다. 저는 프론트엔드 개발자로 참여해 주요 화면 구현, API 연동, 인증 만료 상황 처리를 담당했습니다.',

    problem:
      '대시보드처럼 여러 API를 동시에 호출하는 화면에서 로그인이 만료되면 여러 요청이 한꺼번에 실패할 수 있었습니다. 이때 각 요청이 따로 토큰 재발급을 시도하면 같은 요청이 반복되는 문제가 생길 수 있었습니다.',

    solution:
      '토큰 재발급은 한 번만 실행되도록 처리했습니다. 동시에 실패한 요청은 잠시 대기시킨 뒤, 새 토큰이 발급되면 다시 요청하도록 흐름을 정리했습니다.',

    judgment:
      '각 화면마다 401 에러 처리를 따로 넣으면 빠르게 해결할 수는 있지만, 화면이 늘어날수록 중복 코드가 많아질 수 있다고 판단했습니다. 그래서 인증 만료 처리는 개별 화면이 아니라 공통 API 처리 영역에서 관리했습니다.',

    implementation:
      'Axios 공통 인스턴스에서 401 응답을 감지했습니다. 토큰 재발급이 이미 진행 중이면 실패한 요청을 대기 목록에 넣고, 재발급이 끝난 뒤 다시 실행했습니다. 재발급에 실패하면 저장된 로그인 정보를 정리해 다시 로그인해야 하는 상태로 처리했습니다.',

    technicalDecision:
      '서버에서 받아오는 단어 목록, 오답 데이터, 대시보드 통계는 React Query로 관리했습니다. 사용자의 선택값이나 화면 제어 상태는 Zustand로 분리했습니다. API 요청과 인증 예외 처리는 Axios 공통 설정에서 처리했습니다.',

    result:
      '여러 요청이 동시에 401 에러를 반환해도 토큰 재발급은 한 번만 실행되고, 기존 요청이 새 토큰으로 다시 처리되는 흐름을 확인했습니다.',

    tradeOff:
      '대기 목록과 재시도 처리 로직이 추가되어 코드가 조금 복잡해졌습니다. 대신 인증 만료 상황을 한 곳에서 관리할 수 있어 예외 처리가 더 안정적이었습니다.',

    techStack: [
      'React',
      'JavaScript',
      'React Query',
      'Zustand',
      'Axios',
      'MSW',
      'Vite',
    ],

    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/L-chae/Project-FE/tree/main',
      },
      {
        label: '배포 사이트',
        href: 'https://project-fe-ebon.vercel.app/',
      },
    ],

    aiQuestion: 'StoryLex 401 에러 해결 과정 알려줘',
  },

  {
    projectKey: 'rodia',
    label: 'Mobile Application',
    displayLabel: '화물 운송 모바일 앱',
    name: 'Rodia',
    summary:
      '화주와 기사가 주문, 견적, 운행 상태를 각자의 역할에 맞게 확인할 수 있도록 만든 화물 운송 앱입니다.',
    period: '2026.02 ~ 2026.03',
    team: '총 4명 · 프론트엔드 2명, 백엔드 2명',
    role: 'React Native 화면 구현 · API 연동 · 모바일 디버깅 정리',

    situation:
      'Rodia는 화물 운송 과정에서 화주와 기사가 필요한 정보를 확인하고 처리할 수 있도록 만든 모바일 팀 프로젝트입니다. 저는 React Native 기반 화면 구현과 API 연동을 담당했습니다.',

    problem:
      '개발 중 API 명세가 자주 바뀌었고, 모바일 앱에서는 웹처럼 Network 탭으로 요청과 응답을 바로 확인하기 어려웠습니다. 그래서 API 변경 반영과 통신 문제 확인에 시간이 많이 들 수 있었습니다.',

    solution:
      'OpenAPI 명세를 기준으로 API 코드를 생성하고, 생성된 API가 공통 요청 설정을 거치도록 정리했습니다. 또한 앱 안에서 요청, 응답, 에러 기록을 확인할 수 있는 디버깅 흐름을 만들었습니다.',

    judgment:
      'API 호출 코드를 매번 직접 작성하면 빠르게 만들 수는 있지만, 명세가 바뀔 때 누락이 생기기 쉽다고 판단했습니다. 그래서 명세 기반으로 API 코드를 생성하고, 공통 요청 처리를 거치게 하는 방식을 선택했습니다.',

    implementation:
      'OpenAPI 명세를 확인한 뒤 Orval로 API 함수와 타입을 생성했습니다. 생성된 API는 Axios 기반 공통 클라이언트를 통해 요청되도록 연결했습니다. 요청 실패나 응답 문제는 앱 내부 로그에서 확인할 수 있게 정리했습니다.',

    technicalDecision:
      'React Native와 Expo를 사용해 모바일 화면을 구현했습니다. API 연동은 OpenAPI와 Orval을 활용해 반복 작업을 줄였고, Axios에서 공통 요청 설정과 에러 처리를 관리했습니다. 데이터 검증이 필요한 부분은 Zod를 사용했습니다.',

    result:
      'API 명세 변경이 생겼을 때 생성 결과를 기준으로 반영할 수 있게 되었고, 모바일 통신 문제도 앱 내부 로그를 통해 더 쉽게 확인하고 공유할 수 있었습니다.',

    tradeOff:
      'OpenAPI 명세와 생성된 API 파일을 함께 관리해야 하는 비용은 생겼습니다. 대신 API 변경에 더 일정한 방식으로 대응할 수 있었고, 모바일 디버깅 과정도 정리할 수 있었습니다.',

    techStack: [
      'React Native',
      'Expo',
      'TypeScript',
      'OpenAPI',
      'Orval',
      'Axios',
      'Zod',
    ],

    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/L-chae/Rodia',
      },
    ],

    aiQuestion: 'Rodia API 흐름은 어떻게 개선했나요?',
  },

  {
    projectKey: 'portfolio-ai',
    label: 'AI Interface',
    displayLabel: '포트폴리오 AI 인터페이스',
    name: 'Portfolio AI',
    summary:
      '포트폴리오 안의 프로젝트와 경험을 질문으로 탐색할 수 있도록 만든 개인 AI 챗봇 인터페이스입니다.',
    period: '2026.06',
    team: '개인 프로젝트',
    role: '포트폴리오 UI 구현 · 데이터 정리 · 챗봇 답변 흐름 설계',

    situation:
      '기존 포트폴리오는 프로젝트와 경험을 정적인 섹션으로 보여주는 구조였습니다. 방문자가 궁금한 내용을 직접 질문하면서 탐색할 수 있도록 포트폴리오 전용 AI 챗봇을 만들었습니다.',

    problem:
      '일반 챗봇처럼 답변 범위를 넓게 두면 포트폴리오에 없는 내용을 답할 수 있었습니다. 반대로 정적인 페이지 구성만으로는 방문자의 질문 흐름에 맞춰 설명하기 어려웠습니다.',

    solution:
      '포트폴리오에 있는 프로젝트, 경험, 기술 선택 이유를 구조화된 데이터로 정리했습니다. 챗봇은 이 데이터 안에서 관련 내용을 찾아 답변하도록 구성했습니다.',

    judgment:
      '이 프로젝트의 목적은 AI 모델을 직접 개발하는 것이 아니라, 포트폴리오 내용을 더 쉽게 탐색하게 만드는 것이었습니다. 그래서 큰 RAG 시스템보다 현재 사이트 규모에 맞는 정적 데이터 기반 구조를 선택했습니다.',

    implementation:
      '프로젝트와 경험 데이터를 주제별로 정리하고, 질문과 관련 있는 내용을 찾아 답변에 사용할 수 있도록 구성했습니다. 자주 묻는 질문은 미리 준비한 답변으로 처리해 답변의 흔들림을 줄였습니다.',

    technicalDecision:
      'Next.js와 TypeScript 기반으로 인터페이스를 만들고, AI SDK와 Anthropic API를 사용해 답변 흐름을 구성했습니다. 챗봇 UI 상태는 Zustand로 관리했습니다.',

    result:
      '방문자는 프로젝트를 읽다가 궁금한 내용을 바로 질문할 수 있고, 챗봇은 포트폴리오 데이터 안에서 확인 가능한 내용을 중심으로 답변합니다.',

    tradeOff:
      '범용적인 질문에는 제한이 있지만, 포트폴리오 목적에 맞는 답변 일관성을 얻을 수 있었습니다.',

    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'AI SDK',
      'Anthropic API',
      'Zustand',
    ],

    links: [],

    aiQuestion: '포트폴리오 AI는 어떻게 동작하나요?',
  },
];