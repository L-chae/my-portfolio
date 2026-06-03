'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, X, TerminalSquare } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  "Rodia 최적화 경험",
  "StoryLex 401 에러 제어",
  "관련 없는 질문 (예외 테스트)"
];

const getMockResponse = (question: string) => {
  if (question.includes('Rodia')) return 'Rodia 프로젝트에서는 파편화된 상태를 공통 상태 머신으로 통합하여 뷰 렌더링 분기 로직을 약 60% 축소했습니다.';
  if (question.includes('StoryLex') || question.includes('401')) return 'StoryLex에서는 다중 401 에러 시 토큰 갱신 요청 중복을 차단하기 위해 Axios Interceptor 큐를 설계했습니다.';
  if (question.includes('예외') || question.includes('관련 없는')) return '현재 포트폴리오 도메인 외의 질문입니다. 실제 상용 서비스였다면 Fallback 처리를 했겠지만, 현재는 제가 예외 입력값을 어떻게 통제하는지 보여드리기 위해 이 문구를 출력합니다.';
  
  return `"${question}"에 대한 내용은 데이터베이스에 없습니다. 다른 질문을 선택해 보세요.`;
};

export default function DynamicChatBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '안녕하세요! 김민준 지원자의 포트폴리오 에이전트입니다. 어떤 기술적 고민을 함께 나누고 싶으신가요?' }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current && isExpanded) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isExpanded]);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isExpanded]);

  const handleSend = (text: string) => {
    if (!text.trim() || isTyping) return;
    
    if (!isExpanded) setIsExpanded(true);
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: getMockResponse(text) }]);
      setIsTyping(false);
    }, 1200);
  };

  // 💡 사용자가 아직 질문하지 않은 항목만 필터링 (스마트 칩)
  const availableSuggestions = SUGGESTIONS.filter(
    suggestion => !messages.some(msg => msg.content === suggestion)
  );

  return (
    <>
      <div 
        className={`fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-sm transition-opacity duration-400 ease-out ${
          isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => { if (!isTyping && inputValue === '') setIsExpanded(false); }}
      />

      {/* 💡 1. 찌그러짐 방지: rounded-[28px] 로 양 상태의 곡률을 고정하여 이질감 완벽 제거 */}
      <div 
        className={`fixed z-50 left-0 right-0 mx-auto bg-white flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-[0_20px_60px_rgb(0,0,0,0.12)] border border-slate-200/80 rounded-[28px] will-change-auto ${
          isExpanded 
            ? 'bottom-[2vh] sm:bottom-[5vh] w-[96vw] max-w-[800px] h-[92vh] sm:h-[85vh]' 
            : 'bottom-6 w-[calc(100%-2rem)] max-w-[480px] h-[56px] cursor-text hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] hover:-translate-y-1'
        }`}
        onClick={() => {
          if (!isExpanded) {
            setIsExpanded(true);
            setTimeout(() => inputRef.current?.focus(), 150);
          }
        }}
      >
        
        <div className={`shrink-0 bg-slate-50/90 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-slate-200/60 transition-opacity duration-300 ${
          isExpanded ? 'opacity-100' : 'opacity-0 hidden'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600">
              <TerminalSquare size={16} />
            </div>
            <h3 className="font-bold text-[15px] text-slate-700 tracking-wide">Portfolio AI</h3>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }} 
            className="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full p-2 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* 💡 2. 여백 최적화: 내부 패딩(sm:p-7)과 간격(gap-7)을 넓혀 프리미엄 룩 완성 */}
        <div 
          ref={scrollRef} 
          className={`flex-1 overflow-y-auto flex flex-col gap-7 p-5 sm:p-7 scroll-smooth bg-white transition-opacity duration-300 ${
            isExpanded ? 'opacity-100' : 'opacity-0 hidden'
          }`}
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3.5 max-w-[90%] sm:max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-slate-800 text-white' : 'bg-blue-600 text-white'}`}>
                {msg.role === 'user' ? <User size={15} /> : <Bot size={15} />}
              </div>
              <div className={`p-4 sm:p-5 text-[14.5px] shadow-sm leading-relaxed tracking-tight ${
                msg.role === 'user' 
                  ? 'bg-slate-800 text-white rounded-3xl rounded-tr-sm' 
                  : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-3xl rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {/* 💡 3. 스마트 추천 칩: 질문을 한 이후에도 남은 질문이 있다면 계속 표시 */}
          {!isTyping && availableSuggestions.length > 0 && (
            <div className="mt-1 ml-12 flex flex-col gap-2.5 animate-in fade-in duration-500">
              {messages.length === 1 && (
                <p className="text-[12.5px] font-bold text-slate-400 mb-0.5">다음 질문을 선택해보세요</p>
              )}
              <div className="flex flex-wrap gap-2.5">
                {availableSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); handleSend(suggestion); }}
                    className={`px-4.5 py-2.5 text-[14px] font-medium rounded-xl border transition-all duration-200 shadow-sm text-left ${
                      suggestion.includes('예외') 
                        ? 'bg-red-50/50 hover:bg-red-100 text-red-600 border-red-100 hover:border-red-200'
                        : 'bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-700 border-slate-200 hover:border-blue-200'
                    }`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isTyping && (
            <div className="flex gap-3.5 max-w-[90%] self-start">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm"><Bot size={15} /></div>
              <div className="bg-slate-50 p-5 rounded-3xl rounded-tl-sm border border-slate-100 flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
        </div>

        <div className={`shrink-0 bg-white flex flex-col justify-center transition-all duration-300 ${
          isExpanded ? 'p-4 sm:px-6 sm:py-5 border-t border-slate-100' : 'h-[56px] px-2'
        }`}>
          <form className="flex gap-2.5 items-center w-full" onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}>
            {!isExpanded && (
              <div className="w-10 h-10 ml-1 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-blue-600" />
              </div>
            )}
            
            <input 
              ref={inputRef}
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isExpanded ? "메시지를 입력하세요..." : "AI Agent에게 질문하기"} 
              className={`flex-1 bg-transparent px-3 py-2 focus:outline-none transition-all text-slate-800 placeholder-slate-400 ${
                isExpanded ? 'text-[15.5px]' : 'text-[15px] font-semibold cursor-pointer'
              }`}
              disabled={isTyping}
              readOnly={!isExpanded}
            />
            
            <button 
              type="submit" 
              onClick={(e) => {
                if (!isExpanded) {
                  e.preventDefault();
                  setIsExpanded(true);
                  setTimeout(() => inputRef.current?.focus(), 150);
                }
              }}
              className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all ${
                isExpanded && inputValue.trim() && !isTyping
                  ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:scale-105' 
                  : 'bg-slate-100 text-slate-400'
              }`}
              disabled={isExpanded && (!inputValue.trim() || isTyping)}
            >
              <Send size={16} className={isExpanded && inputValue.trim() && !isTyping ? 'translate-x-0.5' : ''} />
            </button>
          </form>
        </div>

      </div>
    </>
  );
}