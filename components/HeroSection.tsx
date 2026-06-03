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
  className="relative min-h-[600px] h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-16 pb-[100px]"
>
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="hero-gradient" />
    <div className="bg-grid opacity-50" />
  </div>

      {/* 💡 z-10 유지: 챗봇 바와의 겹침 방지 */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl text-center">
        <div className="font-mono text-sm font-bold text-blue-600 mb-6 tracking-widest uppercase">
          {typedText}<span className="animate-pulse">|</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-8 text-slate-900">
          프론트엔드 개발자<br /> 
          <span className="text-blue-600">이채은</span>입니다.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-12">
          프로젝트 경험과 개발 과정에 대해<br /> 
          AI에게 직접 질문해보세요.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <a href="/resume.pdf" download className="btn-primary">이력서 다운로드</a>
          <a href="https://github.com/your-id" target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub 보기</a>
        </div>
      </div>

      {/* 💡 챗봇 바 위치를 고려하여 하단 문구 배치 */}
      <div className="absolute bottom-28 z-10 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs font-semibold text-slate-500">AI와 대화하며 포트폴리오를 살펴보세요</span>
        <div className="animate-bounce"><ArrowDown size={20} className="text-slate-400" /></div>
      </div>
    </section>
  );
}