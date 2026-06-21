import { Maximize2, Minimize2, X } from "lucide-react";

import ChatAiLogo from "./ChatAiLogo";

interface ChatHeaderProps {
  titleId: string;
  isExpanded: boolean;
  isFullScreen: boolean;
  setIsFullScreen: (val: boolean) => void;
  onClose: () => void;
}

const iconButtonClassName =
  "flex size-8 items-center justify-center rounded-pill text-ink-muted transition hover:bg-brand-pale hover:text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring";

export default function ChatHeader({
  titleId,
  isExpanded,
  isFullScreen,
  setIsFullScreen,
  onClose,
}: ChatHeaderProps) {
  return (
    <header
      aria-hidden={!isExpanded}
      className={[
        "shrink-0 border-b border-line-soft bg-white/82 px-4 py-3 backdrop-blur-md sm:px-5",
        "transition-opacity duration-300 ease-out",
        isExpanded ? "opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <span id={titleId} className="sr-only">
        Portfolio AI
      </span>

      <div className="flex h-9 items-center justify-between">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-pill bg-brand-pale text-brand">
            <ChatAiLogo decorative size={15} className="h-4 w-4 text-brand" />
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <p className="truncate text-sm font-bold text-navy">
              Portfolio AI
            </p>

            <span className="hidden rounded-pill bg-cyan-pale px-2 py-0.5 text-[11px] font-semibold text-cyan sm:inline-flex">
              assistant
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullScreen(!isFullScreen);
            }}
            className={iconButtonClassName}
            aria-label={isFullScreen ? "채팅창 축소" : "채팅창 확대"}
          >
            {isFullScreen ? (
              <Minimize2 size={17} aria-hidden="true" />
            ) : (
              <Maximize2 size={17} aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className={[
              iconButtonClassName,
              "hover:bg-danger-pale hover:text-danger",
            ].join(" ")}
            aria-label="채팅 닫기"
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}