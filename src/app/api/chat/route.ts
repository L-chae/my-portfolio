// src/app/api/chat/route.ts

import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { rewriteQuery, searchKnowledge } from "@/lib/searchKnowledge";
import { buildContextPrompt } from "@/lib/contextBuilder";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

function clarificationResponse() {
  return new Response(
    "질문과 연결할 수 있는 포트폴리오 데이터가 충분하지 않습니다. Rodia, StoryLex, HiveLab 경험, AI 활용 방식처럼 조금 더 구체적인 주제로 다시 물어봐 주세요.",
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    }
  );
}

export async function POST(req: Request) {
  try {
    const { currentTopicHint, messages } = await req.json();

    const recentMessages: Message[] = messages.slice(-5);
    const lastUserMessage = [...recentMessages]
      .reverse()
      .find((msg): msg is Message => msg.role === "user");

    const question = lastUserMessage?.content ?? "";
    const rewrittenQuery = rewriteQuery(question, recentMessages.slice(-4));
    const sections = searchKnowledge(rewrittenQuery, 3, {
      currentTopicHint: typeof currentTopicHint === "string" ? currentTopicHint : null,
    });

    if (sections.length === 0) {
      return clarificationResponse();
    }

    const { context, included } = buildContextPrompt(sections);
    const enhancedMessages = recentMessages.map((msg) => {
      if (msg !== lastUserMessage) return msg;

      return {
        ...msg,
        content: `[Context: ${included.join(", ")}]
${context}

[Question]
${question}

[Rewritten Query]
${rewrittenQuery}`,
      };
    });

    const result = await streamText({
      model: anthropic("claude-haiku-4-5-20251001"),
      system: SYSTEM_PROMPT,
      messages: enhancedMessages,
    });

    return new Response(result.textStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
