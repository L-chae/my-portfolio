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
      {/* 배경 레이어 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* 💡 스펙 적용: 160deg 커스텀 배경 그라데이션 */}
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#EEF2FF_0%,#F8F9FF_50%,#EDE9FE_100%)]" />
        
        {/* 💡 스펙 적용: 좌상단 400px 글로우 효과 */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] blur-[60px] pointer-events-none" />
        
        <div className="bg-grid opacity-50" />
      </div>

      {/* 💡 z-10 유지: 챗봇 바와의 겹침 방지 */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl text-center">
        <div className="font-mono text-sm font-bold text-blue-600 mb-6 tracking-widest uppercase">
          {typedText}<span className="animate-pulse">|</span>
        </div>
        
        {/* 💡 스펙 적용: 제목 #0F172A (slate-900) */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-8 text-slate-900"> 
          경험과 고민을 대화로 공유합니다.
        </h1>
        
        {/* 💡 스펙 적용: 서브텍스트 #64748B (slate-500) */}
        <p className="text-md md:text-lg text-slate-500 leading-relaxed mb-12">
          구현 과정부터 기술적 선택의 근거까지, 무엇이든 물어보세요.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <a href="/resume.pdf" download className="btn-primary">이력서 다운로드</a>
          <a href="https://github.com/your-id" target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub 보기</a>
        </div>
      </div>

      {/* 💡 챗봇 바 위치를 고려하여 하단 문구 배치 */}
      <div className="absolute bottom-28 z-10 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[13px] font-semibold text-slate-500">궁금한 내용을 입력해 대화를 시작하세요.</span>
        <div className="animate-bounce mt-1">
          <ArrowDown size={18} className="text-slate-400" />
        </div>
      </div>
    </section>
  );
}