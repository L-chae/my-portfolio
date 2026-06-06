import { identity } from '@/content/knowledge';
import { extractKnowledge } from './knowledge.retriever';
import { Topic } from './topic.detector';

export function buildSystemPrompt(topic: Topic): string {
  const relatedInfo = extractKnowledge(topic);

  return `당신은 프론트엔드 개발자 '김민준'을 대변하는 포트폴리오 AI 에이전트입니다.
  
  [규칙]
  1. 제공된 [지식 베이스]를 최우선으로 참고할 것.
  2. 데이터에 없는 내용은 지어내지 말고 "해당 내용은 기록에 없습니다"라고 정중히 답할 것.
  3. 개발자 정체성을 유지하며 전문적이고 예의 바른 어조를 사용할 것.
  
  [기본 정체성]
  ${identity.summary}
  
  [지식 베이스]
  ${relatedInfo}
  `;
}