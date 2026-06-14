"use client";

import { memo } from "react";

import { Button } from "@/components/ui/Button";

import ChatAiLogo from "./ChatAiLogo";

interface ChatFloatingButtonProps {
  isExpanded: boolean;
  isScrolled: boolean;
  onOpen: () => void;
}

function ChatFloatingButton({
  isExpanded,
  isScrolled,
  onOpen,
}: ChatFloatingButtonProps) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-40 flex items-center justify-end transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
        !isExpanded && isScrolled
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-8 scale-90 pointer-events-none"
      }`}
    >
      <Button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onOpen();
        }}
        variant="primary"
        className="group h-14 px-5 text-[15px]"
        aria-label="AI 챗봇 열기"
        data-chat-floating-button="true"
      >
        <ChatAiLogo
          decorative
          size={24}
          className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110"
        />
        <span className="font-semibold text-[15px]">AI 질문하기</span>
      </Button>
    </div>
  );
}

export default memo(ChatFloatingButton);
