import { memo } from "react";

import ChatAiLogo from "./ChatAiLogo";

interface TypingIndicatorProps {
  message?: string;
  showAvatar?: boolean;
}

function TypingIndicator({
  message = "답변을 생성하고 있습니다...",
  showAvatar = true,
}: TypingIndicatorProps) {
  return (
    <div className="flex gap-4 w-full self-start animate-in fade-in duration-300">
      {/* 아바타 영역 */}
      {showAvatar ? (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-soft bg-brand-pale shadow-sm">
          <ChatAiLogo
            decorative
            size={20}
            className="h-5 w-5 animate-pulse text-ink-muted"
          />
        </div>
      ) : (
        <div aria-hidden="true" className="h-8 w-8 shrink-0" />
      )}

      {/* 말풍선 영역 (봇 메시지 스타일과 통일) */}
      <div className="relative max-w-[85%] rounded-2xl rounded-tl-sm border border-line bg-surface px-5 py-3.5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-[14.5px] font-medium text-ink-muted animate-pulse">
            {message}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(TypingIndicator);
