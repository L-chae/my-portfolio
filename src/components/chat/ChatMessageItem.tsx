import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User } from "lucide-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
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

export interface Message {
  id: string | number;
  role: "user" | "bot" | "assistant";
  content: string;
}

interface ChatMessageItemProps {
  message: Message;
  isLast?: boolean;
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-6 mb-2 border-b border-line/60 pb-1.5 text-[15px] font-bold text-navy first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-4 mb-1.5 text-[13.5px] font-semibold text-navy first:mt-0">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-2.5 text-[14px] leading-[1.75] text-ink last:mb-0">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-navy">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="my-3 list-disc space-y-1.5 pl-5 text-ink marker:text-ink-faint">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-3 list-decimal space-y-1.5 pl-5 text-ink marker:text-ink-faint">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-[14px] leading-[1.8]">{children}</li>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-xl border border-line shadow-sm">
      <table className="w-full text-[13px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-line bg-surface-soft">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-line/60">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="transition-colors hover:bg-surface-soft/60">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2.5 text-left text-[12px] font-semibold text-ink-muted">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2.5 text-[13.5px] text-ink">{children}</td>
  ),
  hr: () => <hr className="my-5 border-line/60" />,
  blockquote: ({ children }) => (
    <blockquote className="my-3 rounded-r-xl border-l-[3px] border-accent bg-accent-pale px-4 py-2.5 text-[13.5px] text-ink">
      {children}
    </blockquote>
  ),
  code({ className, children }) {
    const content = String(children).replace(/\n$/, "");
    const match = /language-(\w+)/.exec(className || "");
    const language = match?.[1] ?? "";
    const isInline = !match && !content.includes("\n");

    if (isInline) {
      return (
        <code className="rounded-md bg-surface-muted px-1.5 py-0.5 font-mono text-[12px] text-ink">
          {children}
        </code>
      );
    }

    return (
      <div className="my-4 overflow-hidden rounded-xl border border-line-dark shadow-md">
        <div className="flex items-center justify-between border-b border-line-dark bg-navy-soft px-4 py-2">
          <span className="text-[11px] font-medium text-white/60">
            {language || "code"}
          </span>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          </div>
        </div>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "#07111F",
            fontSize: "13px",
            lineHeight: 1.7,
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
    <div
      className={`flex gap-3 w-full ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full mt-0.5 ${
          isUser
            ? "bg-navy-soft"
            : "bg-brand shadow-sm"
        }`}
      >
        {isUser ? (
          <User size={13} className="text-white" strokeWidth={2.5} />
        ) : (
          <Bot size={13} className="text-white" strokeWidth={2.5} />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`relative max-w-[88%] ${
          isUser
            ? "rounded-2xl rounded-tr-sm bg-navy-soft px-4 py-3 text-[14px] text-white leading-relaxed shadow-sm"
            : "rounded-2xl rounded-tl-sm border border-line bg-surface px-5 py-4 text-ink shadow-sm"
        }`}
      >
        {isUser ? (
          <span className="whitespace-pre-wrap">{message.content}</span>
        ) : (
          <div className="break-words min-w-0">
            <ReactMarkdown
              components={markdownComponents}
              remarkPlugins={[remarkGfm]}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(
  ChatMessageItem,
  (prev, next) =>
    prev.message.id === next.message.id &&
    prev.message.content === next.message.content,
);
