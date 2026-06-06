// src/types/knowledge.ts
export interface KnowledgeSection {
  summary: string;
  principles?: string[];
  coreValues?: string[];
  strengths?: string[];
  weaknesses?: string[];
  lessons?: string[];
  improvements?: string[];
  // 필요한 경우 필드 추가
 [key: string]: string |readonly string[] | undefined;
}