// src/app/api/chat/route.ts

import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { searchKnowledge } from "@/lib/searchKnowledge";
import { buildContextPrompt } from "@/lib/contextBuilder";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const recentMessages: Message[] =
      messages.slice(-6);

    const lastUserMessage = [...recentMessages]
      .reverse()
      .find(
        (msg): msg is Message =>
          msg.role === "user"
      );

    const question =
      lastUserMessage?.content ?? "";

    // 1. Knowledge 검색
    const sections =
      searchKnowledge(question);

    // 2. Context 생성
    const context =
      buildContextPrompt(sections);
      

    // 3. 마지막 질문에 Context 삽입
    const enhancedMessages =
      recentMessages.map((msg) => {
        if (msg !== lastUserMessage) {
          return msg;
        }

        return {
          ...msg,
          content: `
[컨텍스트]
${context}

[질문]
${question}
`,
        };
      });

    const result = await streamText({
      model: anthropic(
        "claude-haiku-4-5-20251001"
      ),

      system: SYSTEM_PROMPT,

      messages: enhancedMessages,
    });

    return new Response(
      result.textStream,
      {
        headers: {
          "Content-Type":
            "text/plain; charset=utf-8",
          "Transfer-Encoding":
            "chunked",
        },
      }
    );
  } catch (error) {
    console.error(
      "Chat API Error:",
      error
    );

    return new Response(
      "Internal Server Error",
      {
        status: 500,
      }
    );
  }
}