import { memo } from "react";
import { Sparkles } from "lucide-react";

interface TypingIndicatorProps {
  message?: string;
}

function TypingIndicator({ message = "답변을 생성하고 있습니다..." }: TypingIndicatorProps) {
  return (
    <div className="flex gap-4 w-full self-start animate-in fade-in duration-300">
      {/* 아바타 영역 */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand shadow-sm">
        <Sparkles size={16} className="text-white animate-pulse" strokeWidth={2.5} />
      </div>

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
