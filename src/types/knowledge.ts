// src/types/knowledge.ts
export interface EvidenceImage {
  id: string;
  title: string;
  src: string;
  alt: string;
  description?: string;
}

export interface KnowledgeSection {
  id?: string;
  summary: string;
  evidenceImages?: Record<string, EvidenceImage>;
  principles?: readonly string[];
  coreValues?: readonly string[];
  strengths?: readonly string[];
  weaknesses?: readonly string[];
  lessons?: readonly string[];
  improvements?: readonly string[];
  keywords?: readonly string[];
  suggestedQuestions?: readonly string[];
  preparedAnswers?: Record<string, string>;
  [key: string]: unknown;
}
