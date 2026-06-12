"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Button } from "@/components/ui/Button";

import ChatHeader from "./ChatHeader";
import ChatMessageItem from "./ChatMessageItem";
import ChatSuggestions from "./ChatSuggestions";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

const SECTION_IDS = ["hero", "experience", "core-values", "projects"];

export default function ChatBar() {
  const {
    isExpanded,
    setIsExpanded,
    isTyping,
    messages,
    handleSend,
  } = useChat();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const activeSection = useActiveSection(SECTION_IDS);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 배경 화면 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isExpanded]);

  // 오토 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
    }
  }, [messages, isTyping]);

  // 스크롤 감지 (300px 이상일 때 FAB 노출)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleExpanded = useCallback((expanded: boolean) => {
    if (!expanded) setIsFullScreen(false);
    setIsExpanded(expanded);
  }, [setIsExpanded]);

  useEffect(() => {
    const handleChatIntent = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const trigger = event.target.closest('[data-chat-intent="open"]');
      if (!trigger) return;

      event.preventDefault();
      toggleExpanded(true);
    };

    document.addEventListener("click", handleChatIntent);
    return () => document.removeEventListener("click", handleChatIntent);
  }, [toggleExpanded]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-sm transition-opacity duration-400 ${
          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          if (!isTyping) toggleExpanded(false);
        }}
      />

      {/* FAB: 스크롤 조건만 확인하여 항상 유지 */}
      <div
        className={`fixed bottom-6 right-6 z-40 flex items-center justify-end transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          !isExpanded && isScrolled
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-8 scale-90 pointer-events-none"
        }`}
      >
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleExpanded(true);
          }}
          variant="primary"
          className="group h-14 px-5 text-[15px] shadow-md shadow-blue-600/15"
        >
          <Sparkles size={20} className="transition-transform duration-300 group-hover:scale-110" />
          <span className="font-semibold text-[15px] tracking-tight">AI 질문하기</span>
        </Button>
      </div>

      <div
        className={`fixed z-50 left-0 right-0 mx-auto flex flex-col transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-auto ${
          isExpanded
            ? isFullScreen
              ? "inset-0 w-full max-w-full h-full bg-slate-50 rounded-none shadow-none border-none opacity-100"
              : "bottom-[2dvh] sm:bottom-[5dvh] w-[96vw] max-w-2xl h-[92dvh] sm:h-[85dvh] bg-slate-50 shadow-2xl border border-slate-200/80 rounded-[28px] overflow-hidden opacity-100 scale-100"
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
          className={`flex-1 overflow-y-auto flex flex-col px-5 sm:px-6 py-5 pb-35 transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0 hidden"}`}
        >
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-5">
            {messages.map((msg, idx) => (
              <ChatMessageItem key={idx} message={msg} />
            ))}

            {isTyping && <TypingIndicator />}

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
