"use client";
import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { useActiveSection } from "@/hooks/useActiveSection";

import ChatHeader from "./ChatHeader";
import ChatMessageItem from "./ChatMessageItem";
import ChatSuggestions from "./ChatSuggestions";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

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
  
  const activeSection = useActiveSection(["hero", "experience", "projects", "core-values"]);
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

  const toggleExpanded = (expanded: boolean) => {
    if (!expanded) setIsFullScreen(false);
    setIsExpanded(expanded);
  };

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
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleExpanded(true);
          }}
          className="group h-14 px-5 bg-blue-600 text-white rounded-full shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:bg-blue-700 hover:shadow-[0_6px_28px_rgba(37,99,235,0.45)] flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-1"
        >
          <Sparkles size={20} className="transition-transform duration-300 group-hover:scale-110" />
          <span className="font-semibold text-[15px] tracking-tight">AI 질문하기</span>
        </button>
      </div>

      <div
        className={`fixed z-50 left-0 right-0 mx-auto flex flex-col transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-auto ${
          isExpanded
            ? isFullScreen
              ? "inset-0 w-full max-w-full h-full bg-slate-50 rounded-none shadow-none border-none opacity-100"
              : "bottom-[2dvh] sm:bottom-[5dvh] w-[96vw] max-w-2xl h-[92dvh] sm:h-[85dvh] bg-slate-50 shadow-2xl border border-slate-200/80 rounded-[28px] overflow-hidden opacity-100 scale-100"
            : !isScrolled
              ? "bottom-6 w-[calc(100%-2rem)] max-w-2xl h-14 bg-transparent border-transparent shadow-none pointer-events-none opacity-100 scale-100"
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

        <ChatInput 
          activeSection={activeSection} 
          isExpanded={isExpanded} 
          isTyping={isTyping} 
          onSend={handleSend} 
          onExpand={() => toggleExpanded(true)} 
        />
        
      </div>
    </>
  );
}
