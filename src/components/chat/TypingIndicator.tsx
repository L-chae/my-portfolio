import { memo } from "react";

import ChatAiLogo from "./ChatAiLogo";

interface TypingIndicatorProps {
  message?: string;
  showAvatar?: boolean;
}

function TypingIndicator({
  message = "답변 준비 중",
  showAvatar = true,
}: TypingIndicatorProps) {
  return (
    <div
      className="flex gap-4 w-full self-start animate-in fade-in duration-300 motion-reduce:animate-none"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* 아바타 영역 */}
      {showAvatar ? (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-soft bg-brand-pale shadow-sm">
          <ChatAiLogo
            decorative
            size={20}
            className="h-5 w-5 animate-pulse text-ink-muted motion-reduce:animate-none"
          />
        </div>
      ) : (
        <div aria-hidden="true" className="h-8 w-8 shrink-0" />
      )}

      {/* 말풍선 영역 (봇 메시지 스타일과 통일) */}
      <div className="relative max-w-[85%] rounded-2xl rounded-tl-sm border border-line bg-surface px-5 py-3.5 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1" aria-hidden="true">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className="typing-dot h-1.5 w-1.5 rounded-full bg-ink-faint motion-reduce:animate-none"
                style={{ animationDelay: `${index * 160}ms` }}
              />
            ))}
          </div>
          <span className="text-[14px] font-medium text-ink-muted">
            {message}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(TypingIndicator);
