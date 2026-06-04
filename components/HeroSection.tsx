"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Frontend Developer";

  useEffect(() => {
    let currentLength = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, currentLength + 1));
      currentLength++;
      if (currentLength >= fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-[600px] h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-16 pb-[100px] bg-white"
    >
      {/* 배경 레이어 (성능 최적화된 유체 그라데이션) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-50">
        <style>{`
          /* GPU 가속(translate3d)을 활용한 이동 및 회전으로 유체 느낌 에뮬레이션 */
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

          /* 공통 Blob 스타일: blur 필터 제거, will-change 추가 */
          .blob {
            position: absolute;
            border-radius: 50%;
            mix-blend-mode: multiply;
            opacity: 0.6;
            will-change: transform;
          }
          
          /* 단색 배경 + blur 대신 CSS radial-gradient 사용 (페인트 비용 획기적 감소) */
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
        
        {/* 최적화된 노드 배치 */}
        <div className="blob blob-purple top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px]" />
        <div className="blob blob-cyan top-[20%] right-[-10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px]" />
        <div className="blob blob-blue bottom-[-20%] left-[20%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px]" />
        
        {/* 미세한 투명 그리드 패턴 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* 콘텐츠 레이어 */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl text-center pointer-events-none">
        <div className="font-mono text-sm font-bold text-blue-600 mb-6 tracking-widest uppercase pointer-events-auto">
          {typedText}<span className="animate-pulse">|</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-8 text-slate-900 pointer-events-auto"> 
          경험과 고민을 대화로 공유합니다.
        </h1>
        
        <p className="text-md md:text-lg text-slate-600 leading-relaxed mb-12 pointer-events-auto">
          구현 과정부터 기술적 선택의 근거까지, 무엇이든 물어보세요.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pointer-events-auto">
          <a href="/resume.pdf" download className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all shadow-md">
            이력서 다운로드
          </a>
          <a href="https://github.com/your-id" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold transition-all shadow-sm">
            GitHub 보기
          </a>
        </div>
      </div>

      <div className="absolute bottom-28 z-10 flex flex-col items-center gap-2 opacity-80 pointer-events-none">
        <span className="text-[13px] font-semibold text-slate-500 pointer-events-auto">궁금한 내용을 입력해 대화를 시작하세요.</span>
        <div className="animate-bounce mt-1 pointer-events-auto">
          <ArrowDown size={18} className="text-blue-500" />
        </div>
      </div>
    </section>
  );
}