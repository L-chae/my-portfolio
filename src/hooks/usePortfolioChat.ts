import { useChat } from '@ai-sdk/react';
import { useTopicDetection } from './useTopicDetection';
import { buildSystemPrompt } from '@/utils/prompt.builder';

export function usePortfolioChat() {
  const { analyze } = useTopicDetection();
  
  const { messages, handleSubmit: originalHandleSubmit, ...rest } = useChat({
    api: '/api/chat',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, input: string) => {
    const topic = analyze(input);
    const systemPrompt = buildSystemPrompt(topic);

    // AI SDK에 시스템 프롬프트 주입
    originalHandleSubmit(e, {
      body: { systemPrompt }
    });
  };

  return { messages, handleSubmit, ...rest };
}