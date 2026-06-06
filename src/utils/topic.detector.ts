// src/utils/topic.detector.ts

export type Topic = 
  | 'identity' 
  | 'problem-solving' 
  | 'ai-engineering' 
  | 'rodia' 
  | 'storylex' 
  | 'portfolio-ai' 
  | 'career' 
  | 'faq';

export function detectTopic(question: string): Topic {
  const q = question.toLowerCase();

  if (q.match(/rodia|디자인|토큰|orval|feature/)) return 'rodia';
  if (q.match(/storylex|401|queue|인증|상태관리/)) return 'storylex';
  if (q.match(/portfolio-ai|챗봇|rag|프롬프트/)) return 'portfolio-ai';
  if (q.match(/ai|claude|cursor|코딩/)) return 'ai-engineering';
  if (q.match(/버그|디버깅|문제|에러|해결/)) return 'problem-solving';
  if (q.match(/hivelab|하이브랩|검수|라벨링/)) return 'career';
  if (q.match(/프론트엔드|약점|팀|협업|기여/)) return 'faq';

  return 'identity';
}