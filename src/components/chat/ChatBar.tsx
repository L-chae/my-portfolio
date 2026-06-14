"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useChat } from "@/hooks/useChat";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Button } from "@/components/ui/Button";

import ChatAiLogo from "./ChatAiLogo";
import ChatHeader from "./ChatHeader";
import ChatMessageItem from "./ChatMessageItem";
import ChatSuggestions from "./ChatSuggestions";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

const SECTION_IDS = ["hero", "experience", "core-values", "projects"];

function isAssistantRole(role: string) {
  return role === "assistant" || role === "bot";
}

export default function ChatBar() {
  const { isExpanded, setIsExpanded, isTyping, messages, handleSend } =
    useChat();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const activeSection = useActiveSection(SECTION_IDS);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isExpanded]);

  useEffect(() => {
    if (!scrollRef.current) return;

    const timer = setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleExpanded = useCallback(
    (expanded: boolean) => {
      if (!expanded) setIsFullScreen(false);
      setIsExpanded(expanded);
    },
    [setIsExpanded],
  );

  useEffect(() => {
    const handleChatIntent = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const trigger = event.target.closest('[data-chat-intent="open"]');

      if (!trigger) return;

      event.preventDefault();

      const topic = trigger.getAttribute("data-chat-topic")?.trim();

      toggleExpanded(true);

      if (!topic || isTyping) return;

      window.setTimeout(() => {
        handleSend(topic);
      }, 0);
    };

    document.addEventListener("click", handleChatIntent);

    return () => document.removeEventListener("click", handleChatIntent);
  }, [toggleExpanded, handleSend, isTyping]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-navy/10 backdrop-blur-sm transition-opacity duration-400 ${
          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          if (!isTyping) toggleExpanded(false);
        }}
      />

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
            toggleExpanded(true);
          }}
          variant="primary"
          className="group h-14 px-5 text-[15px]"
          aria-label="AI 챗봇 열기"
        >
          <ChatAiLogo
            decorative
            size={24}
            className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110"
          />
          <span className="font-semibold text-[15px]">AI 질문하기</span>
        </Button>
      </div>

      <div
        className={`fixed z-50 left-0 right-0 mx-auto flex flex-col transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-auto ${
          isExpanded
            ? isFullScreen
              ? "inset-0 w-full max-w-full h-full bg-base rounded-none shadow-none border-none opacity-100"
              : "bottom-[2dvh] sm:bottom-[5dvh] w-[96vw] max-w-2xl h-[92dvh] sm:h-[85dvh] bg-base shadow-2xl border border-line rounded-[28px] overflow-hidden opacity-100 scale-100"
            : "bottom-6 w-[calc(100%-2rem)] max-w-2xl h-14 bg-transparent border-transparent shadow-none pointer-events-none opacity-0 scale-95"
        }`}
      >
        <ChatHeader
          isExpanded={isExpanded}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
          onClose={() => toggleExpanded(false)}
        />

        <div
          ref={scrollRef}
          className={`flex-1 overflow-y-auto flex flex-col px-5 sm:px-6 py-5 pb-35 transition-opacity duration-300 ${
            isExpanded ? "opacity-100" : "opacity-0 hidden"
          }`}
        >
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-5">
            {messages.map((msg, idx) => {
              const previousMessage = idx > 0 ? messages[idx - 1] : undefined;
              const showAssistantAvatar =
                !isAssistantRole(msg.role) ||
                !previousMessage ||
                !isAssistantRole(previousMessage.role);

              return (
                <ChatMessageItem
                  key={idx}
                  message={msg}
                  onSuggestedActionSelect={handleSend}
                  showAssistantAvatar={showAssistantAvatar}
                />
              );
            })}

            {isTyping && (
              <TypingIndicator
                showAvatar={
                  messages.length === 0 ||
                  !isAssistantRole(messages[messages.length - 1]?.role ?? "")
                }
              />
            )}

            <ChatSuggestions
              activeSection={activeSection}
              onSelect={handleSend}
              messages={messages}
              isTyping={isTyping}
            />
          </div>
        </div>

        {isExpanded && (
          <ChatInput
            activeSection={activeSection}
            isExpanded={isExpanded}
            isTyping={isTyping}
            onSend={handleSend}
            onExpand={() => toggleExpanded(true)}
          />
        )}
      </div>
    </>
  );
}
