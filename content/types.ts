// content/types.ts

export interface CoreValue {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  period: string;
  role: string;
  tasks: string[];
}

export interface TroubleShooting {
  title: string;
  points: string[];
}

export interface Project {
  id: string;
  title: string;
  period: string;
  summary: string;
  techStack: string[];
  troubleShooting: TroubleShooting;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Education {
  id: string;
  period: string;
  institution: string;
  description: string;
}

export interface Certification {
  id: string;
  date: string;
  title: string;
  issuer: string;
}

// 전체 포트폴리오 데이터를 감싸는 최상위 타입
export interface PortfolioData {
  name: string;
  role: string;
  catchphrase: string;
  introduction: string;
  coreValues: CoreValue[];
  experiences: Experience[];
  projects: Project[];
  educations: Education[];
  certifications: Certification[];
}