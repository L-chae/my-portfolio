"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Send, Sparkles } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { Button, LinkButton } from "@/components/ui/Button";

const FULL_TEXT = "Frontend Developer";

const SUGGESTED_TOPICS = [
  {
    label: "StoryLex 401 에러",
    question: "StoryLex 401 에러 해결 과정 알려줘",
  },
  {
    label: "Rodia API 흐름",
    question: "Rodia API 흐름은 어떻게 개선했나요?",
  },
  {
    label: "AI 챗봇 환각 방지",
    question: "AI 챗봇의 환각 방지는 어떻게 했나요?",
  },
] as const;

function HeroPrompt() {
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

  return (
    <div
      className="hero-item mt-9 w-full max-w-3xl"
      style={{ animationDelay: "520ms" }}
    >
      <form
        onSubmit={handleSubmit}
        className="group flex h-14 w-full items-center gap-2 rounded-full bg-white/90 px-4 text-left ring-1 ring-slate-900/10 shadow-xl shadow-slate-950/5 transition-all duration-200 hover:bg-white hover:ring-slate-900/20 focus-within:ring-4 focus-within:ring-blue-500/15"
      >
        <Sparkles
          size={18}
          className="ml-1 shrink-0 text-blue-600 transition-transform group-hover:scale-110"
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
          className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm font-medium text-slate-950 placeholder:text-slate-400 focus:outline-none"
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

      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {SUGGESTED_TOPICS.map(({ label, question }) => (
          <Button
            key={label}
            type="button"
            variant="secondary"
            size="sm"
            data-chat-intent="open"
            data-chat-topic={question}
            onClick={() => {
              void sendHeroQuestion(question);
            }}
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        <LinkButton
          href="#projects"
          variant="ghost"
          size="sm"
          className="uppercase tracking-[0.14em]"
        >
          Projects 보기
          <ArrowUpRight size={14} aria-hidden="true" />
        </LinkButton>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      setTypedText(FULL_TEXT.slice(0, currentIndex + 1));
      currentIndex += 1;

      if (currentIndex >= FULL_TEXT.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-6 py-20 md:py-24"
    >
      <style>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-item {
          opacity: 0;
          animation: hero-fade-up 600ms ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-item {
            opacity: 1;
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <div
          className="hero-item font-mono text-sm font-bold uppercase tracking-widest text-blue-600"
          style={{ animationDelay: "0ms" }}
        >
          {typedText}
          <span className="animate-pulse text-blue-500">|</span>
        </div>

        <h1
          className="hero-item mt-6 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 break-keep sm:text-5xl md:text-6xl"
          style={{ animationDelay: "150ms" }}
        >
          경험과 고민을
          <br className="hidden sm:block" />
          대화로 공유합니다.
        </h1>

        <p
          className="hero-item mt-5 max-w-2xl text-base leading-8 text-slate-600 break-keep"
          style={{ animationDelay: "280ms" }}
        >
          구현 과정부터 기술적 선택의 근거까지, 무엇이든 물어보세요.
        </p>

        <HeroPrompt />
      </div>
    </section>
  );
}
