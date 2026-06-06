import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { Bot, User } from "lucide-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// 누락된 테마 import 추가
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"; 

import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("bash", bash);

// Message 타입이 id를 포함한다고 가정
export interface Message {
  id: string | number;
  role: "user" | "bot" | "assistant";
  content: string;
}

interface ChatMessageItemProps {
  message: Message;
}

// 스타일링 세련화 및 prose 충돌 제거
const markdownComponents: Components = {
  p: ({ children }) => <p className="mb-3 leading-relaxed text-slate-700 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
  ul: ({ children }) => <ul className="mb-4 list-disc space-y-1.5 pl-5 text-slate-700 marker:text-slate-400">{children}</ul>,
  ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1.5 pl-5 text-slate-700 marker:text-slate-400">{children}</ol>,
  li: ({ children }) => <li className="pl-1 leading-relaxed">{children}</li>,
  hr: () => <hr className="my-5 border-slate-200" />,
  blockquote: ({ children }) => (
    <blockquote className="my-4 rounded-r-md border-l-4 border-blue-400 bg-blue-50/50 py-2.5 px-4 italic text-slate-700">
      {children}
    </blockquote>
  ),
  code({ className, children, ...props }) {
    const content = String(children).replace(/\n$/, "");
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";
    const isInline = !match && !content.includes("\n");

    if (isInline) {
      return (
        <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[13px] text-blue-700" {...props}>
          {children}
        </code>
      );
    }

    return (
      <div className="my-4 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800/80 px-4 py-1.5">
          <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
            {language || "text"}
          </span>
        </div>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "13.5px",
            lineHeight: 1.6,
          }}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    );
  },
};

function ChatMessageItem({ message }: ChatMessageItemProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-4 w-full ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm ${
          isUser ? "bg-slate-800" : "bg-blue-600"
        }`}
      >
        {isUser ? (
          <User size={16} className="text-white" strokeWidth={2.5} />
        ) : (
          <Bot size={16} className="text-white" strokeWidth={2.5} />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={`relative max-w-[85%] rounded-2xl px-5 py-3.5 text-[15px] shadow-sm ${
          isUser
            ? "rounded-tr-sm bg-slate-800 text-white whitespace-pre-wrap leading-relaxed"
            : "rounded-tl-sm border border-slate-200 bg-white text-slate-800"
        }`}
      >
        {isUser ? (
          message.content
        ) : (
          // prose 클래스 제거 (markdownComponents로 완벽 제어)
          <div className="wrap-break-word">
            <ReactMarkdown components={markdownComponents}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

// 얕은 복사로 인한 불필요한 렌더링 방지 (id 기반 비교)
export default memo(
  ChatMessageItem,
  (prevProps, nextProps) => prevProps.message.id === nextProps.message.id && prevProps.message.content === nextProps.message.content
);