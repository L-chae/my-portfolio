// content/data.ts
import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  name: "김민준",
  role: "Scenario Validator & Frontend Engineer",
  catchphrase: "구현을 넘어, 사용자의 불편을 차단합니다.",
  introduction: "프론트엔드 구조에 대한 깊은 이해를 바탕으로, 기획 의도가 실제 화면에서 엣지 케이스 없이 안전하게 동작하는지 시나리오를 설계하고 검증합니다.",
  
  coreValues: [
    {
      id: "value-edge-case",
      icon: "fa-shield-halved",
      title: "엣지 케이스 제어",
      description: "단순 UI 구현을 넘어 상태 충돌 오류를 사전에 차단합니다. 401 재요청 큐 메커니즘 설계 등 사용자 흐름이 끊기지 않도록 예외 상황을 검증합니다."
    },
    {
      id: "value-data-integrity",
      icon: "fa-database",
      title: "데이터 정합성 검증",
      description: "대용량 AI 학습 데이터의 마이그레이션 과정에서 누락, 경로 오류, 파일 구조를 반복 점검하며 서비스 로직과의 완벽한 정합성을 보장합니다."
    },
    {
      id: "value-frontend-base",
      icon: "fa-code",
      title: "프론트엔드 기반 분석",
      description: "React Native, Zustand 등 현대 프론트엔드 기술 스택의 동작 원리를 이해하여, 개발자와 동일한 언어로 소통하며 디버깅 효율을 극대화합니다."
    }
  ],

  experiences: [
    {
      id: "exp-hivelab",
      company: "HiveLab",
      period: "2026.05 - 현재",
      role: "AIS실 일경험 인턴 · AI 학습 데이터 검증 및 관리",
      tasks: [
        "대용량 파일 로컬 환경 → 클라우드 환경 이관 (WinSCP, Robocopy, SFTP 활용)",
        "확장자, 경로, 폴더 구조 기준 데이터 정합성 점검 및 오류 가능성 반복 검증",
        "Photoshop PSD 파일 데이터 라벨링 문서화 및 정돈 작업 진행",
        "Figma와 Claude를 활용한 프론트엔드 코드 변환 프로세스 검증"
      ]
    }
  ],

  projects: [
    {
      id: "proj-rodia",
      title: "Rodia",
      period: "2026.02 - 2026.03",
      summary: "화물 운송 중개 모바일/웹 플랫폼",
      techStack: ["React Native", "Expo", "TypeScript", "Orval", "Axios"],
      githubUrl: "https://github.com",
      troubleShooting: {
        title: "Issue & Solution",
        points: [
          "분기 로직 개선: 화주/기사 역할별 복잡한 상태를 공통 UI 기준으로 정리하여 수정 범위를 축소",
          "이슈 재현율 향상: 요청/응답을 cURL 형태로 통일하여 백엔드와의 에러 디버깅 효율 극대화",
          "타입 안정성: OpenAPI 기반 코드 생성 구조를 적용해 API 호출 및 타입 오류 원천 차단"
        ]
      }
    },
    {
      id: "proj-storylex",
      title: "StoryLex",
      period: "2025.11 - 2025.12",
      summary: "영어 단어 학습 웹 애플리케이션",
      techStack: ["React", "React Query", "Zustand", "Recharts", "Axios"],
      githubUrl: "https://github.com",
      liveUrl: "https://live-demo.com",
      troubleShooting: {
        title: "User Flow Control",
        points: [
          "동시성 에러 제어: 동시 401 에러 상황에서 토큰 갱신을 1회만 실행하도록 제어하여 중복 요청 차단",
          "상태 충돌 방지: React Query와 Zustand로 상태 흐름을 분리해 렌더링 예외 상황 제거",
          "체감 속도 개선: 스켈레톤 UI와 로딩 상태를 선제적으로 구성해 데이터 지연 시의 흐름 단절 완화"
        ]
      }
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
    },
    {
      id: "cert-gtq",
      date: "2023.08",
      title: "GTQ 그래픽기술자격 1급",
      issuer: "한국생산성본부"
    }
  ]
};