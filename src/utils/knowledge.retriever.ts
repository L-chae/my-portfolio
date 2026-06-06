import * as knowledge from '@/content/knowledge';
import { Topic } from '@/utils/topic.detector';
import { KnowledgeSection } from '@/types/knowledge';

export function extractKnowledge(topic: Topic): string {
  // unknown을 거쳐 강제 타입 변환 (eslint 경고 회피)
  const data = (knowledge as unknown as Record<string, KnowledgeSection>)[topic];

  if (!data) return `### 관련 정보: ${topic}\n\n데이터를 찾을 수 없습니다.`;

  let result = `### 관련 정보: ${topic}\n\n${data.summary}\n\n`;

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'summary') return;

    // readonly 배열도 Array.isArray() 체크를 통과합니다.
    if (Array.isArray(value)) {
      result += `**${key.toUpperCase()}**:\n`;
      value.forEach((item: string) => {
        result += `- ${item}\n`;
      });
      result += '\n';
    }
  });

  return result;
}