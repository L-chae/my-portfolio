export interface Profile {
  name: string;
  role: string;
  oneLine: string;
  targetPosition: string[];
  strengths: string[];
  interests: string[];
  growthStory: string;
  learning: string;
}

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

export interface ProjectContent {
  situation: string;
  task: string;
  solution: string[];
  result: string[];
}

export interface InterviewQA {
  question: string;
  answer: string;
}

export interface Project {
  id: string;
  title: string;
  period: string;
  summary: string;
  tags: string[];
  techStack: string[];
  content: ProjectContent;
  interviewQA: InterviewQA[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ArchiveProject {
  id: string;
  title: string;
  period: string;
  role: string;
  techStack: string[];
  summary: string;
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
  profile: Profile;
  coreValues: CoreValue[];
  experiences: Experience[];
  projects: Project[];
  archives: ArchiveProject[];
  educations: Education[];
  certifications: Certification[];
}