'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { Send, Bot } from 'lucide-react';

export default function ChatWidget() {
  // 1. 라이브러리에서는 메시지 목록과 전송(append) 함수만 가져옵니다.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { messages, append, isLoading } = useChat() as any;
  
  // 2. 입력창 상태는 React 표준 상태로 직접 안전하게 관리합니다.
  const [localInput, setLocalInput] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 3. 직접 구현한 폼 제출 핸들러
  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localInput.trim() || isLoading) return;

    // SDK의 append를 사용해 사용자 메시지 강제 추가
    append({ role: 'user', content: localInput });
    setLocalInput(''); // 전송 후 입력창 초기화
  };

  return (
    <div className="w-full max-w-md h-[500px] flex flex-col bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
      {/* ... 헤더 및 대화 영역(이전과 완벽히 동일하므로 생략 없이 유지) ... */}
      <div className="px-5 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
        <Bot className="w-5 h-5 text-gray-700" />
        <h3 className="font-semibold text-gray-800">민준 AI 에이전트</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {messages.map((m: any) => (
          <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
            )}
            <div className={`p-3 rounded-2xl max-w-[85%] whitespace-pre-wrap text-sm leading-relaxed ${m.role === 'user' ? 'bg-black text-white rounded-tr-sm' : 'bg-gray-100 text-gray-800 rounded-tl-sm'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="p-3 bg-gray-100 rounded-2xl rounded-tl-sm text-sm text-gray-500 animate-pulse">
              답변을 생성하고 있습니다...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 4. 수정된 입력 영역 */}
      <form onSubmit={handleLocalSubmit} className="p-4 border-t border-gray-100 bg-white flex gap-2">
        <input
          className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)}
          placeholder="저에 대해 무엇이든 물어보세요."
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading || !localInput.trim()} 
          className="p-2.5 bg-black text-white rounded-full disabled:opacity-30 transition-opacity"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}