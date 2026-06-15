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
      '퀴즈, 플래시카드, 오답노트, AI 스토리를 통해 틀린 단어를 반복 학습할 수 있도록 만든 영어 학습 서비스',
    period: '2025.11 ~ 2025.12',
    team: '총 4명 (프론트엔드 2명, 백엔드 2명)',
    role: '프론트엔드 화면 구현 · 인증 예외 처리 · 상태 관리 구조 정리',
    situation:
      '2025.11 ~ 2025.12 기간 동안 총 4명 팀 프로젝트에서 프론트엔드 2명 중 한 명으로 참여했습니다. 사용자는 퀴즈, 플래시카드, 오답노트, AI 스토리, 대시보드를 통해 학습하고 복습할 수 있습니다.',
    problem:
      '대시보드처럼 여러 데이터를 한 번에 불러오는 화면에서는 로그인이 만료되었을 때 여러 요청이 동시에 실패할 수 있었습니다. 이때 각 요청이 따로 토큰 재발급을 시도하면 같은 재발급 요청이 반복될 위험이 있었습니다.',
    solution:
      '토큰 재발급 요청은 한 번만 실행하고, 동시에 실패한 나머지 요청은 잠시 대기시킨 뒤 새 토큰이 발급되면 다시 시도하도록 흐름을 정리했습니다.',
    judgment:
      '각 화면마다 예외 처리를 따로 넣는 방식은 빠르게 해결할 수 있지만, 화면과 요청이 늘어날수록 중복 처리와 예외 누락이 생길 수 있다고 판단했습니다. 그래서 인증 만료 처리를 화면이 아니라 API 통신 공통 영역에서 관리하는 방향을 선택했습니다.',
    implementation:
      'Axios 공통 인스턴스에서 401 응답을 감지하도록 구성했습니다. 이미 토큰 재발급이 진행 중인 경우에는 실패한 요청을 대기 목록에 넣고, 재발급이 성공하면 새 토큰으로 다시 요청했습니다. 재발급이 실패하면 저장된 토큰과 사용자 정보를 정리해 다시 로그인해야 하는 상태로 처리했습니다.',
    technicalDecision:
      'React Query는 단어 목록, 오답 데이터, 대시보드 통계처럼 서버에서 받아오는 데이터 관리에 사용했습니다. Zustand는 학습 옵션, 선택값, 화면 제어 상태처럼 사용자 조작에 가까운 상태 관리에 사용했습니다. 인증 만료 처리는 개별 화면이 아니라 공통 API 통신 계층에서 처리했습니다.',
    result:
      '여러 요청이 동시에 401 에러를 반환하는 상황에서도 토큰 재발급은 한 번만 실행되고, 기존 요청이 새 토큰으로 다시 처리되는 흐름을 MSW와 개발자 도구 Network 캡처로 확인했습니다.',
    tradeOff:
      '대기 목록, 재시도 여부 확인, 재발급 진행 상태 같은 제어 로직이 추가되었지만, 인증 실패 흐름을 한 곳에서 관리할 수 있게 되어 예외 상황을 더 안정적으로 다룰 수 있었습니다.',
    techStack: [
      'React',
      'JavaScript JSX',
      'React Query',
      'Zustand',
      'Axios',
      'MSW',
      'Recharts',
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
      '화주와 기사가 주문, 견적, 운행 상태를 각자의 역할에 맞게 확인할 수 있도록 만든 화물 운송 중개 앱',
    period: '2026.02 ~ 2026.03',
    team: '총 4명 (프론트엔드 2명, 백엔드 2명)',
    role: 'React Native 앱 화면 구현 · API 명세 변경 대응 · 모바일 디버깅 흐름 정리',
    situation:
      '2026.02 ~ 2026.03 기간 동안 총 4명 팀 프로젝트에서 프론트엔드 2명 중 한 명으로 참여했습니다. 화주 앱과 기사 앱을 함께 개발하면서 API 명세 변경, 역할별 화면 조건, 모바일 환경의 통신 문제를 반복적으로 다뤘습니다.',
    problem:
      'API 명세가 바뀔 때마다 프론트엔드 코드 반영이 누락될 수 있었고, 모바일 앱에서는 웹처럼 Network 탭을 바로 확인하기 어려워 통신 문제를 재현하고 공유하는 데 어려움이 있었습니다.',
    solution:
      'API 명세를 먼저 보정한 뒤 Orval로 API 코드를 생성하고, 생성된 API도 공통 요청 규칙을 거치도록 정리했습니다. 또한 앱 안에서 요청, 응답, 에러 기록을 확인하고 cURL로 재현할 수 있는 디버깅 흐름을 만들었습니다.',
    judgment:
      'API 호출 코드를 매번 수동으로 맞추는 방식은 빠르게 대응할 수 있지만, 명세 변경이 반복되면 누락과 실수가 생길 가능성이 크다고 판단했습니다. 그래서 명세 보정, 코드 생성, 공통 요청 처리, 디버깅 기록을 하나의 흐름으로 연결하는 방향을 선택했습니다.',
    implementation:
      'raw OpenAPI spec을 전처리해 path params, content-type, admin API, tag 관련 문제를 보정했습니다. 이후 Orval로 API 함수와 스키마 파일을 생성하고, 생성된 API가 공통 apiClient를 거치도록 연결했습니다. 요청, 응답, 에러 정보는 Axios interceptor에서 수집해 앱 내부의 API Debug Logs 화면에서 확인할 수 있게 했고, 필요한 경우 cURL 형태로 공유할 수 있게 했습니다.',
    technicalDecision:
      '생성된 API 함수도 기본 요청 설정, 에러 처리, timeout, 디버그 로그 같은 공통 요청 규칙을 거치도록 구성했습니다. 역할별 UI 조건은 화면 코드 안에 흩어두지 않고 별도의 정책 함수로 분리했으며, 디자인 기준은 tokens.json과 Zod 검증 흐름으로 관리했습니다.',
    result:
      'API 명세 변경은 전처리된 spec과 Orval 생성 결과를 기준으로 반영할 수 있게 되었고, 모바일 통신 문제는 앱 내부 로그와 cURL을 통해 재현 가능한 형태로 공유할 수 있게 되었습니다.',
    tradeOff:
      '전처리 스크립트, 생성된 API 파일, 공통 요청 계층을 함께 관리해야 하는 비용은 생겼습니다. 대신 API 변경과 모바일 디버깅 문제를 더 예측 가능한 흐름으로 다룰 수 있었습니다.',
    techStack: [
      'React Native',
      'Expo',
      'TypeScript',
      'OpenAPI',
      'Orval',
      'Axios',
      'Zod',
      'pnpm Workspaces',
      'Monorepo',
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
      '현재 포트폴리오 사이트에서 프로젝트와 경험을 질문형으로 탐색할 수 있도록 만든 개인 AI 챗봇 인터페이스',
    period: '2026.06',
    team: '개인 프로젝트',
    role: '포트폴리오 UI 구현 · knowledge 데이터 구조화 · 챗봇 답변 기준 설계',
    situation:
      '현재 포트폴리오 사이트는 프로젝트, 경험, 기술 선택 이유를 정적인 섹션으로 보여주는 구조였습니다. 하지만 방문자마다 궁금해하는 순서가 다를 수 있어, 포트폴리오 내용을 질문하면서 탐색할 수 있는 개인 프로젝트로 AI 챗봇 인터페이스를 구성했습니다.',
    problem:
      '일반 챗봇처럼 답변 범위를 열어두면 포트폴리오에 없는 내용을 말할 수 있고, 단순 페이지 탐색만으로는 사용자의 질문 맥락을 이어가기 어려웠습니다.',
    solution:
      '현재 포트폴리오 사이트의 프로젝트, 경험, 문제 해결 방식, AI 활용 기준을 구조화된 knowledge 데이터로 정리하고, 질문과 관련 있는 데이터만 답변에 사용하도록 구성했습니다.',
    judgment:
      'AI 모델을 직접 개발하거나 대규모 RAG 시스템을 도입하는 것보다, 현재 포트폴리오 사이트 안에서 확인 가능한 내용만 답변하도록 범위를 제한하는 것이 더 중요하다고 판단했습니다.',
    implementation:
      '주제별 knowledge 데이터를 만들고, searchKnowledge와 contextBuilder를 통해 질문과 관련된 section을 찾아 답변 context로 전달했습니다. 자주 묻는 질문은 prepared answer로 처리해 답변 변동성을 줄였고, 관련 이미지나 후속 질문은 응답 metadata로 연결했습니다.',
    technicalDecision:
      '벡터 DB 기반 RAG를 구현하지 않고, 포트폴리오 규모에 맞는 정적 데이터셋과 내부 검색 흐름을 사용했습니다. 핵심은 모델 개발이 아니라 답변 근거가 되는 데이터 구조화, context 구성, 답변 기준 설계였습니다.',
    result:
      '방문자는 이 포트폴리오 사이트에서 프로젝트를 읽다가 궁금한 내용을 바로 질문할 수 있고, 챗봇은 포트폴리오 데이터 안에서 확인 가능한 내용을 중심으로 답변합니다.',
    tradeOff:
      '범용적인 질문 대응력은 줄어들 수 있지만, 포트폴리오 목적에 맞는 답변 일관성과 근거 통제력을 얻을 수 있었습니다.',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'AI SDK',
      'Anthropic API',
      'Zustand',
      'Static Context Injection',
      'Prepared Answer',
      'Guardrail',
      'Streaming Response',
    ],
    links: [],
    aiQuestion: '포트폴리오 AI는 RAG 없이 어떻게 동작하나요?',
  },
];
