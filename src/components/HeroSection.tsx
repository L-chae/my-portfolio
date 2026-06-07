"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

const FULL_TEXT = "Frontend Developer";

// Hero는 진입 즉시 보이는 섹션 → IntersectionObserver 불필요
// CSS animation + delay로 처리. 마운트 시 자동 재생.
export default function HeroSection() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setTypedText(FULL_TEXT.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex >= FULL_TEXT.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-150 h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-16 pb-24"
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
          .hero-item { opacity: 1; animation: none; }
        }
      `}</style>

      {/* delay는 인라인 style로 — Tailwind delay-* arbitrary는 빌드 환경 따라 불안정 */}
      <div
        className="hero-item font-mono text-sm font-bold text-blue-600 mb-6 tracking-widest uppercase"
        style={{ animationDelay: "0ms" }}
      >
        {typedText}
        <span className="animate-pulse">|</span>
      </div>

      <h1
        className="hero-item text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-8 text-slate-900 text-center break-keep"
        style={{ animationDelay: "150ms" }}
      >
        경험과 고민을 대화로 공유합니다.
      </h1>

      <p
        className="hero-item text-base md:text-lg text-slate-600 leading-relaxed mb-12 text-center break-keep"
        style={{ animationDelay: "280ms" }}
      >
        구현 과정부터 기술적 선택의 근거까지, 무엇이든 물어보세요.
      </p>

      <div
        className="hero-item flex flex-col sm:flex-row gap-4 w-full justify-center"
        style={{ animationDelay: "400ms" }}
      >
        <a
          href="/resume.pdf"
          download
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold transition-colors text-center"
        >
          이력서 다운로드
        </a>
        <a
          href="https://github.com/your-id"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold transition-colors text-center"
        >
          GitHub 보기
        </a>
      </div>

      <div className="absolute bottom-24 z-10 flex flex-col items-center gap-2 opacity-70">
        <span className="text-sm font-semibold text-slate-500">
          궁금한 내용을 입력해 대화를 시작하세요.
        </span>
        <div className="animate-bounce mt-1">
          <ArrowDown size={18} className="text-blue-500" />
        </div>
      </div>
    </section>
  );
}
