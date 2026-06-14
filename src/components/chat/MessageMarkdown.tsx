import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("bash", bash);

export const markdownRemarkPlugins = [remarkGfm];

export const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-4 mb-2 border-b border-line/60 pb-1.5 text-[16px] font-semibold leading-snug text-navy first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-4 mb-2 text-[15px] font-semibold leading-snug text-navy first:mt-0">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-2 text-[14px] leading-[1.75] text-ink first:mt-0 last:mb-0">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="break-all font-medium text-brand underline underline-offset-2 transition-colors hover:text-brand-hover"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-2 list-disc space-y-1 pl-5 text-ink marker:text-ink-faint">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-2 list-decimal space-y-1 pl-5 text-ink marker:text-ink-faint">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="pl-1 text-[14px] leading-[1.75] [&>p]:my-0">
      {children}
    </li>
  ),
  table: ({ children }) => (
    <div className="my-3 max-w-full overflow-x-auto rounded-xl border border-line shadow-sm">
      <table className="min-w-full border-collapse text-[13px]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-surface-soft">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody>{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="transition-colors hover:bg-surface-soft/60">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="border border-line px-2.5 py-2 text-left text-[13px] font-semibold leading-relaxed text-ink-muted align-top">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-line px-2.5 py-2 text-[13px] leading-relaxed text-ink align-top">
      {children}
    </td>
  ),
  hr: () => <hr className="my-5 border-line/60" />,
  blockquote: ({ children }) => (
    <blockquote className="my-3 border-l-2 border-line pl-3 text-[13.5px] leading-relaxed text-ink-muted">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => <>{children}</>,
  code({ className, children }) {
    const content = String(children).replace(/\n$/, "");
    const match = /language-(\w+)/.exec(className || "");
    const language = match?.[1] ?? "";
    const isInline = !match && !content.includes("\n");

    if (isInline) {
      return (
        <code className="break-words rounded border border-line bg-surface-muted px-1.5 py-0.5 font-mono text-[13px] text-ink">
          {children}
        </code>
      );
    }

    return (
      <div className="my-3 overflow-hidden rounded-xl border border-line bg-surface-muted shadow-sm">
        <div className="flex items-center justify-between border-b border-line-dark bg-navy-soft px-4 py-2">
          <span className="text-[11px] font-medium text-white/60">
            {language || "code"}
          </span>
          <div className="flex gap-1.5" aria-hidden="true">
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
            padding: "0.75rem",
            background: "#07111F",
            fontSize: "13px",
            lineHeight: 1.7,
            overflowX: "auto",
          }}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    );
  },
};

interface MessageMarkdownProps {
  content: string;
  components?: React.ComponentProps<typeof ReactMarkdown>["components"];
  remarkPlugins?: React.ComponentProps<typeof ReactMarkdown>["remarkPlugins"];
}

export default function MessageMarkdown({
  content,
  components = markdownComponents,
  remarkPlugins = markdownRemarkPlugins,
}: MessageMarkdownProps) {
  return (
    <div className="break-words text-[14px] leading-[1.75] text-ink">
      <ReactMarkdown components={components} remarkPlugins={remarkPlugins}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
