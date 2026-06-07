// src/types/knowledge.ts
export interface KnowledgeSection {
  id?: string;
  summary: string;
  principles?: readonly string[];
  coreValues?: readonly string[];
  strengths?: readonly string[];
  weaknesses?: readonly string[];
  lessons?: readonly string[];
  improvements?: readonly string[];
  keywords?: readonly string[];
  [key: string]: unknown;
}
