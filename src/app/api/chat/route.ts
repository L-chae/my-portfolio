// src/app/api/chat/route.ts
import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export async function POST(req: Request) {
  try {
    // 훅에서 보낸 메시지 목록과 시스템 프롬프트를 받습니다.
    const { messages, systemPrompt } = await req.json();

    // 💡 슬라이딩 윈도우: 전체 대화 기록 중 가장 최근 6개만 잘라서 토큰 낭비를 막습니다.
    const recentMessages = messages.slice(-6);

    const result = await streamText({
      model: anthropic('claude-3-haiku-20240307'),
      system: systemPrompt, // 분석된 부분 지식 주입
      messages: recentMessages,
    });

    return result.toDataStreamResponse();
    
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}