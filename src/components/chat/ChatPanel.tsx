"use client";

import { memo } from "react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";

interface ChatPanelProps {
  activeSection: string;
  isExpanded: boolean;
  isFullScreen: boolean;
  onClose: () => void;
  onExpand: () => void;
  setIsFullScreen: (value: boolean) => void;
  titleId: string;
}

function ChatPanel({
  activeSection,
  isExpanded,
  isFullScreen,
  onClose,
  onExpand,
  setIsFullScreen,
  titleId,
}: ChatPanelProps) {
  return (
    <div
      className={`fixed z-50 left-0 right-0 mx-auto flex flex-col transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-auto ${
        isExpanded
          ? isFullScreen
            ? "inset-0 w-full max-w-full h-full bg-surface rounded-none shadow-none border-none opacity-100"
            : "bottom-[2dvh] sm:bottom-[5dvh] w-[96vw] max-w-2xl h-[92dvh] sm:h-[85dvh] bg-surface shadow-card border border-line rounded-card overflow-hidden opacity-100 scale-100"
          : "bottom-6 w-[calc(100%-2rem)] max-w-2xl h-14 bg-transparent border-transparent shadow-none pointer-events-none opacity-0 scale-95"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-hidden={!isExpanded}
    >
      <ChatHeader
        titleId={titleId}
        isExpanded={isExpanded}
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
        onClose={onClose}
      />

      <ChatMessageList activeSection={activeSection} isExpanded={isExpanded} />

      {isExpanded && (
        <ChatInput
          activeSection={activeSection}
          isExpanded={isExpanded}
          onExpand={onExpand}
        />
      )}
    </div>
  );
}

export default memo(ChatPanel);
