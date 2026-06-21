"use client";

import { memo, useRef, useState } from "react";
import { ArrowUpRight, Send, Sparkles } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { Button } from "@/components/ui/Button";
import TypingTitle from "@/components/TypingTitle";

const SUGGESTED_TOPICS = [
   {
    label: "토큰 만료 처리",
    question: "StoryLex 401 에러 해결 과정 알려줘",
  },
  {
    label: "API 변경 관리",
    question: "Rodia API 흐름은 어떻게 개선했나요?",
  },
  {
    label: "AI 답변 신뢰도",
    question: "AI 챗봇의 환각 방지는 어떻게 했나요?",
  },
] as const;

const HeroPrompt = memo(function HeroPrompt() {
  const [heroInput, setHeroInput] = useState("");
  const isComposingRef = useRef(false);
  const { handleSend, setIsExpanded, isTyping, isStreaming } = useChat();

  const sendHeroQuestion = async (question: string) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isTyping || isStreaming) return;

    setIsExpanded(true);
    await handleSend(trimmedQuestion);
    setHeroInput("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isComposingRef.current) return;

    void sendHeroQuestion(heroInput);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Enter" &&
      (event.nativeEvent.isComposing || isComposingRef.current)
    ) {
      event.preventDefault();
    }
  };

  const canSend = heroInput.trim().length > 0 && !isTyping && !isStreaming;

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (!projectsSection) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const headerOffset = 64;

    window.scrollTo({
      top: Math.max(0, window.scrollY + projectsSection.getBoundingClientRect().top - headerOffset),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    window.history.replaceState(null, "", "#projects");
  };

  return (
    <div
      className="hero-item mt-9 w-full max-w-3xl"
      style={{ animationDelay: "520ms" }}
    >
      <form
        onSubmit={handleSubmit}
        className="group flex h-14 w-full items-center gap-2 rounded-pill bg-surface-glass px-4 text-left ring-1 ring-line shadow-card transition-all duration-200 hover:bg-surface hover:ring-line focus-within:ring-4 focus-within:ring-brand-ring"
      >
        <Sparkles
          size={18}
          className="ml-1 shrink-0 text-brand transition-transform group-hover:scale-110"
          aria-hidden="true"
        />

        <input
          type="text"
          value={heroInput}
          onChange={(event) => setHeroInput(event.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => {
            isComposingRef.current = true;
          }}
          onCompositionEnd={() => {
            isComposingRef.current = false;
          }}
          placeholder="프로젝트와 기술 선택 과정을 물어보세요"
          className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm font-medium text-navy placeholder:text-ink-faint focus:outline-none"
        />

        <Button
          type="submit"
          disabled={!canSend}
          variant="primary"
          size="icon"
          aria-label="질문 보내기"
        >
          <Send size={14} className="translate-x-px" />
        </Button>
      </form>

     <div className="mt-4 flex flex-wrap justify-center gap-2">
  {SUGGESTED_TOPICS.map(({ label, question }) => (
    <button
      key={label}
      type="button"
      data-chat-intent="open"
      data-chat-topic={question}
      disabled={isTyping || isStreaming}
      onClick={() => {
        void sendHeroQuestion(question);
      }}
      className="inline-flex h-9 items-center rounded-pill border border-line-soft bg-surface-glass px-4 text-[13px] font-semibold text-ink-muted transition-colors duration-200 hover:border-brand-ring hover:bg-brand-pale hover:text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring disabled:pointer-events-none disabled:opacity-45"  >
      {label}
    </button>
  ))}
</div>

      <div className="mt-6 flex justify-center">
        <Button type="button" variant="ghost" size="sm" onClick={scrollToProjects}>
          Projects 보기
          <ArrowUpRight size={14} aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-28 md:pb-24 md:pt-32"
    >
      <style>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translate3d(0, 16px, 0) scale(0.985); }
          to   { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }

        .hero-item {
          opacity: 0;
          will-change: opacity, transform;
          animation: hero-fade-up 820ms cubic-bezier(0.34, 1.32, 0.64, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-item {
            opacity: 1;
            animation: none;
            transform: none;
            will-change: auto;
          }
        }
      `}</style>

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <TypingTitle text="Frontend Developer" />

        <h1
          className="hero-item mt-6 max-w-4xl text-4xl font-bold leading-[1.08] text-navy break-keep sm:text-5xl md:text-6xl"
          style={{ animationDelay: "150ms" }}
        >
          경험과 고민을
          <br className="hidden sm:block" />
          대화로 공유합니다.
        </h1>

        <p
          className="hero-item mt-5 max-w-2xl  leading-8 text-ink break-keep"
          style={{ animationDelay: "280ms" }}
        >
          구현 과정부터 기술적 선택의 근거까지, 무엇이든 물어보세요.
        </p>

        <HeroPrompt />
      </div>
    </section>
  );
}
