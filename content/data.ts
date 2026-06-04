import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  profile: {
    name: "김민준",
    role: "Scenario Validator & Frontend Engineer",
    oneLine: "React · React Native 기반으로 웹과 모바일을 개발하며 구조 개선과 디버깅 환경 구축에 강점을 가진 개발자",
    targetPosition: ["Frontend Engineer", "Backoffice Frontend Engineer"],
    strengths: ["구조 개선", "디버깅 환경 구축", "상태 관리", "API 자동화", "협업"],
    interests: ["Frontend Architecture", "Developer Experience", "Backoffice", "Quality"],
    growthStory: "멀티미디어 전공 과정에서 HTML, CSS, JSP, Java를 활용한 쇼핑몰 프로젝트를 진행하며 웹 개발에 관심을 갖게 되었습니다. 이후 React 기반 프론트엔드 개발을 학습하며 웹과 모바일 프로젝트를 수행했고, 단순 기능 구현보다 유지보수성과 협업 효율을 높이는 구조 개선에 관심을 가지게 되었습니다.",
    learning: "Next.js App Router, Server Components, 테스트 자동화"
  },

  coreValues: [
    {
      id: "value-structure",
      icon: "fa-layer-group",
      title: "반복 비용 제거",
      description: "동일한 문제가 반복되지 않도록 자동화와 공통화 구조를 설계합니다. OpenAPI 기반 코드 생성, 디자인 토큰 SSOT 구축 경험이 있습니다."
    },
    {
      id: "value-stability",
      icon: "fa-shield-halved",
      title: "안정성 우선",
      description: "정상 흐름뿐 아니라 실패 시나리오를 고려합니다. 인증 재시도 큐, 방어적 데이터 처리, 예외 상황 검증 경험이 있습니다."
    },
    {
      id: "value-collaboration",
      icon: "fa-users",
      title: "협업 중심 개발",
      description: "개인 생산성보다 팀 생산성을 중요하게 생각합니다. cURL 기반 API 재현 환경과 공통 정책 레이어를 구축해 협업 효율을 높였습니다."
    }
  ],

  experiences: [
    {
      id: "exp-hivelab",
      company: "HiveLab",
      period: "2026.05 - 현재",
      role: "AIS실 일경험 인턴 · AI 학습 데이터 검증 및 관리",
      tasks: [
        "대용량 AI 학습 데이터 마이그레이션 및 정합성 검증 프로세스 고도화",
        "확장자, 경로, 폴더 구조 기준 데이터 정합성 점검 및 엣지 케이스 시나리오 테스트",
        "Figma와 Claude를 활용한 코드 변환 검증 및 파이프라인 정합성 점검"
      ]
    }
  ],

  projects: [
    {
      id: "proj-rodia",
      title: "Rodia",
      period: "2026.02 - 2026.03",
      summary: "화물 운송 중개 모바일/웹 플랫폼",
      tags: ["OpenAPI", "Orval", "React Native", "DX", "디버깅", "자동화", "정책레이어", "디자인토큰"],
      techStack: ["React Native", "Expo", "TypeScript", "Orval", "Axios"],
      githubUrl: "https://github.com",
      content: {
        situation: "화주/기사 역할 분기와 상태 규칙이 복잡했고, OpenAPI 스펙 변경이 잦아 API 타입 관리 비용이 높았습니다. 또한 모바일 환경에서는 API 요청 흐름을 추적하기 어려워 디버깅 비용이 컸습니다.",
        task: "타입 불일치로 인한 런타임 에러 방지 및 백엔드와의 API 에러 재현/커뮤니케이션 비용 최소화",
        solution: [
          "OpenAPI 기반 Orval 자동화 파이프라인을 구축해 API 타입과 클라이언트를 자동 생성",
          "Axios interceptor 기반 인앱 API 디버거를 구현해 요청·응답·에러를 중앙 수집하고 cURL 재현 기능 제공",
          "정책 레이어를 분리해 UI와 비즈니스 규칙을 독립적으로 관리"
        ],
        result: [
          "OpenAPI 스펙 변경 시 API 코드 재생성만으로 완벽 대응 가능 (타입 에러 사전 차단)",
          "cURL 기반 재현 환경 구축으로 백엔드 협업 및 디버깅 효율 대폭 향상",
          "정책 수정 시 UI 수정 범위 감소 및 웹·앱 디자인 토큰 일관성 확보"
        ]
      },
      interviewQA: [
        { question: "왜 Orval을 선택했나요?", answer: "OpenAPI 스펙을 기반으로 타입과 API 클라이언트를 자동 생성해 수동 관리 비용과 타입 불일치 문제를 줄일 수 있었기 때문입니다." },
        { question: "Interceptor를 사용한 이유는 무엇인가요?", answer: "요청, 응답, 에러를 중앙에서 수집해 일관된 디버깅 환경을 만들기 위해 사용했습니다." },
        { question: "정책 레이어를 분리한 이유는 무엇인가요?", answer: "상태 규칙을 UI에 직접 작성하면 화면마다 조건문이 중복될 수 있기 때문에 정책 함수를 통해 비즈니스 로직을 분리했습니다." },
        { question: "인앱 API 디버거를 운영 환경에서 노출하지 않은 이유는 무엇인가요?", answer: "API 구조와 인증 정보 등 민감한 데이터가 포함될 수 있기 때문에 개발 환경에서만 활성화하도록 구성했습니다." },
        { question: "디자인 토큰 구조를 도입한 이유는 무엇인가요?", answer: "웹과 앱 간 스타일 일관성을 유지하고 변경 비용을 줄이기 위해 하나의 소스를 기준으로 관리했습니다." }
      ]
    },
    {
      id: "proj-react-starter-composer",
      title: "React Starter Composer",
      period: "2026.04 - 2026.05",
      summary: "React 프로젝트 초기 세팅을 선택형으로 생성하고 ZIP으로 다운로드하는 교육용 생성기",
      tags: ["Scaffolding", "Code Generation", "ZIP", "JSZip", "Zustand", "useMemo", "Architecture"],
      techStack: ["React", "TypeScript", "Zustand", "JSZip", "FileSaver"],
      githubUrl: "https://github.com",
      content: {
        situation: "반복적인 React 프로젝트 초기 세팅 보일러플레이트를 자동화하고자 했으나, 선택한 라이브러리에 따라 동적으로 파일 구조와 코드가 결합되어야 하는 복잡성이 존재했습니다.",
        task: "확장 가능한 아키텍처를 설계하여 라이브러리 간의 조합과 의존성 충돌을 유연하게 제어",
        solution: [
          "파생 상태 분리: 선택된 옵션(selection)만 Zustand 스토어에 저장하고, 최종 결과물(ComposerResult)은 useMemo로 계산하여 불필요한 상태 동기화 제거",
          "JSON 객체 기반 생성: 문자열 조합 대신 JSON 객체 병합 후 stringify하는 방식을 채택하여 확장성 확보",
          "Rule 기반 확장 구조: LibraryRule과 applyLibraryRule을 도입하여 새로운 기술 스택 추가 시 기존 코드를 수정하지 않도록 개방 폐쇄 원칙(OCP) 적용"
        ],
        result: [
          "isGenerating 상태를 활용한 중복 클릭 방지 및 ZIP 생성 시 UX 향상",
          "문자열 오류 없이 안정적으로 보일러플레이트 코드를 생성하는 아키텍처 완성"
        ]
      },
      interviewQA: [
        { question: "파생 상태를 useMemo로 분리한 이유는 무엇인가요?", answer: "스토어에 원본 상태와 결과 상태를 모두 저장하면 동기화 문제가 발생할 수 있어, 순수 데이터만 스토어에 두고 결과물은 렌더링 시점에 계산(useMemo)하도록 설계했습니다." },
        { question: "문자열 조합 대신 JSON 객체 기반 방식을 택한 이유는?", answer: "문자열로 코드를 조합하면 오타나 쉼표 누락 등 구문 에러가 발생하기 쉽지만, 객체로 관리 후 stringify하면 JSON 형식을 100% 보장할 수 있기 때문입니다." }
      ]
    },
    {
      id: "proj-storylex",
      title: "StoryLex",
      period: "2025.11 - 2025.12",
      summary: "영어 단어 학습 웹 애플리케이션",
      tags: ["React Query", "Zustand", "인증", "401", "Queue", "상태관리", "시각화"],
      techStack: ["React", "React Query", "Zustand", "Recharts", "Axios"],
      githubUrl: "https://github.com",
      liveUrl: "https://live-demo.com",
      content: {
        situation: "액세스 토큰 만료 시 다수의 API 요청이 동시에 실패(401)하면서, 토큰 갱신 요청(Refresh)이 중복으로 여러 번 발생하는 병목 현상이 있었습니다.",
        task: "동시성 에러를 제어하고 서버/클라이언트 상태를 명확히 분리하여 렌더링 최적화",
        solution: [
          "401 재요청 큐(Queue) 메커니즘 설계: Promise Queue를 도입하여 첫 401 에러 시 토큰 갱신을 1회만 실행하고, 나머지 요청은 대기시켰다 갱신 완료 후 순차 처리",
          "React Query로 서버 상태를, Zustand로 전역 UI 상태를 완전히 분리하여 책임 경계 명확화",
          "데이터 페칭 지연 시 스켈레톤 UI를 선제적으로 노출하여 체감 로딩 속도 최적화"
        ],
        result: [
          "인증 갱신 중복 요청을 원천 차단하여 서버 부하 및 인증 충돌 제거",
          "데이터 지연 시에도 사용자 화면 단절이 발생하지 않는 매끄러운 UX 제공"
        ]
      },
      interviewQA: [
        { question: "React Query와 Zustand를 함께 사용한 이유는 무엇인가요?", answer: "서버 상태와 클라이언트 UI 상태를 분리해 상태 충돌을 줄이고 책임을 명확히 하기 위해 사용했습니다." },
        { question: "401 Queue를 직접 구현한 이유는 무엇인가요?", answer: "동시에 여러 요청이 401을 받을 경우 토큰 갱신이 중복 실행되는 문제를 방지하기 위해 구현했습니다." },
        { question: "Promise Queue 방식의 장점은 무엇인가요?", answer: "Refresh 요청을 한 번만 수행하고 나머지 요청은 재사용할 수 있어 서버 부하와 인증 오류를 줄일 수 있습니다." },
        { question: "React Query만 사용하지 않은 이유는 무엇인가요?", answer: "UI 상태까지 React Query가 담당하게 되면 책임이 모호해질 수 있다고 판단해 Zustand와 역할을 분리했습니다." }
      ]
    }
  ],

  archives: [
    {
      id: "archive-actionmate",
      title: "Action Mate",
      period: "2025.06 - 2025.08",
      role: "기획, 디자인, 프론트엔드 개발",
      techStack: ["React Native", "Expo", "Figma"],
      summary: "첫 모바일 앱 개발. 기획부터 배포까지 전체 사이클을 경험하며 모바일 UI/UX 제약을 이해함.",
      githubUrl: "https://github.com"
    },
    {
      id: "archive-leafory",
      title: "Leafory (졸업작품)",
      period: "2024.12 - 2025.05",
      role: "풀스택 개발",
      techStack: ["JavaScript", "Java", "JSP/Servlet", "MySQL"],
      summary: "반려식물 커머스 웹. DB 설계부터 관리자/사용자 기능 전반을 직접 구현하며 웹 서비스 흐름 파악.",
      githubUrl: "https://github.com"
    }
  ],

  educations: [
    {
      id: "edu-namseoul",
      period: "2021.03 - 2026.02",
      institution: "남서울대학교",
      description: "멀티미디어학과 졸업 (학점 4.09 / 4.5)"
    },
    {
      id: "edu-thejoeun",
      period: "2025.08 - 2026.03",
      institution: "더조은컴퓨터아카데미",
      description: "JAVA 풀스택 개발자 과정 수료"
    }
  ],

  certifications: [
    {
      id: "cert-info",
      date: "2024.09",
      title: "정보처리산업기사",
      issuer: "한국산업인력공단"
    },
    {
      id: "cert-office",
      date: "2025.09",
      title: "사무자동화산업기사",
      issuer: "한국산업인력공단"
    }
  ]
};