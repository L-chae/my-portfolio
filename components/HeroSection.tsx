'use client';

import { useEffect, useState } from 'react';
import { portfolioData } from '../content/data';
import { Terminal, ArrowDown } from 'lucide-react';

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Frontend Engineer";

  useEffect(() => {
    let currentLength = 0;
    const typingInterval = setInterval(() => {
      setTypedText(fullText.slice(0, currentLength + 1));
      currentLength++;
      if (currentLength >= fullText.length) clearInterval(typingInterval);
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[600px] h-[85vh] flex flex-col pt-24 pb-12 px-6 overflow-hidden">
      
      {/* 1. 모눈 배경 (컨테이너 내부 고정) */}
      <div className="absolute inset-0 z-0 bg-grid" />

      {/* 2. 콘텐츠 영역 (카드 레이어 제거, 투명한 배경) */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center max-w-4xl mx-auto w-full text-center reveal">
        
        <div className="font-mono text-xs md:text-sm font-bold text-blue-600 mb-6 flex items-center justify-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
          <Terminal size={14} />
          <span className="border-r-2 border-blue-600 pr-1 animate-pulse tracking-wide">{typedText}</span>
        </div>
        
        <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold leading-[1.1] tracking-tight mb-8 text-slate-900">
          설계가 단단한<br />
          <span className="relative inline-block mt-2">
            사용자 경험
            <span className="absolute left-0 bottom-2 w-full h-4 bg-blue-600/10 -z-10 -rotate-1"></span>
          </span>
          을 구축합니다.
        </h1>
        
        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-10 max-w-2xl font-medium break-keep">
          {portfolioData.introduction}
        </p>
        
        <div className="flex gap-4 flex-wrap justify-center">
          <a href="#projects" className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            성과 확인하기 <ArrowDown size={18} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold transition-all shadow-sm hover:border-slate-300 hover:-translate-y-1">
            <GithubIcon size={18} /> GitHub
          </a>
        </div>
      </div>

      {/* 3. 하단 안내 요소 (레이어 제거, 깔끔한 위치 조정) */}
      <div className="relative z-10 flex flex-col items-center gap-2 opacity-60">
        <div className="text-[12px] font-semibold text-slate-500">
          하단의 AI 검색창에 질문해보세요
        </div>
        <div className="animate-[bounce_2s_infinite]">
          <ArrowDown size={20} className="text-slate-400" />
        </div>
      </div>
    </section>
  );
}