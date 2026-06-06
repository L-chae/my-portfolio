"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FULL_TEXT = "Frontend Developer";

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const containerRef = useScrollReveal();

  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      setTypedText(FULL_TEXT.slice(0, currentIndex + 1));
      currentIndex++;
      
      if (currentIndex >= FULL_TEXT.length) {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative min-h-150 h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-16 pb-24 bg-white"
    >
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-50">
        <style>{`
          @keyframes fluid-1 {
            0% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
            50% { transform: translate3d(5vw, -5vh, 0) rotate(180deg) scale(1.1); }
            100% { transform: translate3d(0, 0, 0) rotate(360deg) scale(1); }
          }
          @keyframes fluid-2 {
            0% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
            50% { transform: translate3d(-5vw, 5vh, 0) rotate(-180deg) scale(1.2); }
            100% { transform: translate3d(0, 0, 0) rotate(-360deg) scale(1); }
          }
          @keyframes fluid-3 {
            0% { transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
            50% { transform: translate3d(5vw, 5vh, 0) rotate(90deg) scale(0.9); }
            100% { transform: translate3d(0, 0, 0) rotate(180deg) scale(1); }
          }
          .blob {
            position: absolute;
            border-radius: 50%;
            mix-blend-mode: multiply;
            opacity: 0.6;
            will-change: transform;
          }
          .blob-purple {
            background: radial-gradient(circle, rgba(216,180,254,0.8) 0%, rgba(216,180,254,0) 70%);
            animation: fluid-1 12s infinite ease-in-out;
          }
          .blob-cyan {
            background: radial-gradient(circle, rgba(103,232,249,0.8) 0%, rgba(103,232,249,0) 70%);
            animation: fluid-2 15s infinite ease-in-out reverse;
          }
          .blob-blue {
            background: radial-gradient(circle, rgba(191,219,254,0.8) 0%, rgba(191,219,254,0) 70%);
            animation: fluid-3 14s infinite ease-in-out;
          }
        `}</style>
        
        <div className="blob blob-purple -top-10 -left-10 w-[50vw] h-[50vw] max-w-150 max-h-150" />
        <div className="blob blob-cyan top-1/4 -right-10 w-[60vw] h-[60vw] max-w-175 max-h-175" />
        <div className="blob blob-blue -bottom-1/4 left-1/4 w-[70vw] h-[70vw] max-w-200 max-h-200" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl text-center pointer-events-none">
        
        {/* 💡 data-[visible=true] 속성이 추가되면 나타남 */}
        <div className="reveal opacity-0 translate-y-4 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 transition-all duration-700 ease-out font-mono text-sm font-bold text-blue-600 mb-6 tracking-widest uppercase pointer-events-auto">
          {typedText}<span className="animate-pulse">|</span>
        </div>
        
        <h1 className="reveal opacity-0 translate-y-4 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 transition-all duration-700 ease-out delay-100 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-8 text-slate-900 pointer-events-auto"> 
          경험과 고민을 대화로 공유합니다.
        </h1>
        
        <p className="reveal opacity-0 translate-y-4 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 transition-all duration-700 ease-out delay-200 text-base md:text-lg text-slate-600 leading-relaxed mb-12 pointer-events-auto">
          구현 과정부터 기술적 선택의 근거까지, 무엇이든 물어보세요.
        </p>
        
        <div className="reveal opacity-0 translate-y-4 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 transition-all duration-700 ease-out delay-300 flex flex-col sm:flex-row gap-4 w-full justify-center pointer-events-auto">
          <a href="/resume.pdf" download className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all shadow-md">
            이력서 다운로드
          </a>
          <a href="https://github.com/your-id" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold transition-all shadow-sm">
            GitHub 보기
          </a>
        </div>
      </div>

{/* 하단 스크롤 유도 (bottom-24로 위치 상향 조정) */}
      <div className="absolute bottom-24 z-10 flex flex-col items-center gap-2 pointer-events-none opacity-80 transition-opacity duration-1000">
        <span className="text-sm font-semibold text-slate-500 pointer-events-auto">
          궁금한 내용을 입력해 대화를 시작하세요.
        </span>
        <div className="animate-bounce mt-1 pointer-events-auto">
          <ArrowDown size={18} className="text-blue-500" />
        </div>
      </div>
    </section>
  );
}