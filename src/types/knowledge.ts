// src/types/knowledge.ts
export interface KnowledgeSection {
  summary: string;
  principles?: string[];
  coreValues?: string[];
  strengths?: string[];
  weaknesses?: string[];
  lessons?: string[];
  improvements?: string[];
 keywords?: readonly string[];
  [key: string]: unknown;
}