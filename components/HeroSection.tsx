'use client';

import { useEffect, useState, useRef } from 'react';
import { portfolioData } from '../content/data';
import { Terminal, ArrowDown, Bot, User, Sparkles } from 'lucide-react';

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const AutoPlayChatDemo = () => {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeChip, setActiveChip] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const SUGGESTIONS = ["예외 처리 통제 경험은?", "데이터 정합성 검증 방법은?"];

  useEffect(() => {
    let isMounted = true;
    
    const runDemo = async () => {
      while (isMounted) {
        setMessages([]);
        setActiveChip(null);
        setIsTyping(false);
        await new Promise(r => setTimeout(r, 1500));

        if (!isMounted) return;
        setActiveChip(0); 
        await new Promise(r => setTimeout(r, 800));

        if (!isMounted) return;
        const question = SUGGESTIONS[0];
        setActiveChip(null);
        setMessages([{ role: 'user', content: question }]);
        setIsTyping(true);
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        
        await new Promise(r => setTimeout(r, 1500));

        if (!isMounted) return;
        setIsTyping(false);
        setMessages([
          { role: 'user', content: question },
          { role: 'assistant', content: 'StoryLex 프로젝트에서 상태 충돌 및 401 에러 다중 발생 시 토큰 갱신 중복을 차단하는 큐(Queue) 메커니즘을 설계하여 예외를 통제했습니다.' }
        ]);
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

        await new Promise(r => setTimeout(r, 4500));
      }
    };
    
    runDemo();
    return () => { isMounted = false; };
  }, []);

  return (
    // 💡 최소한의 프레임 복구 (글래스모피즘 기반)
    <div className="relative w-full max-w-[360px] mx-auto h-[420px] flex flex-col select-none pointer-events-none bg-white/40 backdrop-blur-md border border-white/60 shadow-xl rounded-3xl p-4">
      
      <div className="flex items-center gap-2 mb-4 ml-1">
        <Sparkles size={14} className="text-blue-600 animate-pulse" />
        <span className="text-[11px] font-extrabold text-blue-600 tracking-wider">
          AI AGENT PREVIEW
        </span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto flex flex-col gap-5 scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        
        {messages.length === 0 && !isTyping && (
          <div className="flex flex-col gap-3 mt-auto">
            {SUGGESTIONS.map((text, idx) => (
              <div 
                key={idx} 
                className={`px-5 py-3 rounded-2xl text-sm font-semibold border transition-all duration-300 w-fit ${
                  activeChip === idx 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-95' 
                    : 'bg-white/80 text-slate-600 border-slate-200/60'
                }`}
              >
                {text}
              </div>
            ))}
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white'}`}>
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={`p-4 text-sm shadow-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-slate-900 text-white rounded-3xl rounded-tr-sm' 
                : 'bg-white border border-slate-100 text-slate-800 rounded-3xl rounded-tl-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-[90%] self-start">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Bot size={14} />
            </div>
            <div className="bg-white p-4 rounded-3xl rounded-tl-sm border border-slate-100 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const fullText = "const role = 'Scenario_Validator';";

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
    <section id="hero" className="min-h-screen flex items-center pt-24 pb-12 relative z-10">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        
        {/* 💡 반응형 정렬 적용: 모바일 중앙 정렬(items-center, text-center), 데스크탑 좌측 정렬(lg:items-start, lg:text-left) */}
        <div className="reveal flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="font-mono text-sm font-bold text-blue-600 mb-6 flex items-center gap-2">
            <Terminal size={18} />
            <span className="border-r-2 border-blue-600 pr-1 animate-pulse">
              {typedText}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6 text-slate-900">
            설계가 단단한<br />
            <span className="relative inline-block mt-2">
              사용자 경험
              <span className="absolute left-0 bottom-2 w-full h-4 bg-blue-600/20 -z-10 -rotate-1"></span>
            </span>
            을 구축합니다.
          </h1>
          
          <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-md font-medium">
            {portfolioData.introduction}
          </p>
          
          {/* 💡 버튼 그룹 정렬 연동 */}
          <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
            <a href="#projects" className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-0.5">
              성과 확인하기 <ArrowDown size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold transition-all shadow-sm hover:border-slate-400">
              <GithubIcon size={18} /> GitHub
            </a>
          </div>
        </div>

        <div className="reveal delay-1 w-full flex justify-center lg:justify-end">
          <AutoPlayChatDemo />
        </div>

      </div>
    </section>
  );
}