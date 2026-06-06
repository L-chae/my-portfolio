import { PortfolioData } from '@/types/project';

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
      category: "CROSS-PLATFORM ARCHITECTURE",
      title: "Rodia",
      period: "2026.02 - 2026.03",
      oneLiner: "웹과 모바일에서 동일한 디자인 자산을 관리하고 API 통신 안정성을 확보한 모노레포 프로젝트",
      problems: ["플랫폼 간 디자인 값 중복", "OpenAPI 타입 불일치", "모바일 API 디버깅 어려움"],
      techStack: ["TypeScript", "React Native", "Expo", "Turborepo", "Zod", "Orval"],
      githubUrl: "https://github.com"
    },
    {
      id: "proj-storylex",
      category: "WEB APPLICATION",
      title: "StoryLex",
      period: "2025.11 - 2025.12",
      oneLiner: "동시성 에러를 제어하고 서버/클라이언트 상태를 분리해 렌더링을 최적화한 학습용 웹앱",
      problems: ["401 인증 병목", "서버/UI 상태 혼재", "데이터 페칭 시 화면 단절"],
      techStack: ["React", "TypeScript", "React Query", "Zustand"],
      githubUrl: "https://github.com",
      liveUrl: "https://live-demo.com"
    },
    {
      id: "proj-sc",
      category: "WEB APPLICATION",
      title: "StoryLex",
      period: "2025.11 - 2025.12",
      oneLiner: "동시성 에러를 제어하고 서버/클라이언트 상태를 분리해 렌더링을 최적화한 학습용 웹앱",
      problems: [
        "액세스 토큰 만료 시 다수의 API 요청 실패(401) 및 갱신 중복 발생",
        "서버 상태와 전역 UI 상태 혼재로 인한 책임 경계 모호",
        "데이터 페칭 지연 시 발생하는 화면 단절 현상"
      ],
      techStack: ["React", "TypeScript", "React Query", "Zustand", "Recharts", "Axios"],
      githubUrl: "https://github.com",
      liveUrl: "https://live-demo.com",
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