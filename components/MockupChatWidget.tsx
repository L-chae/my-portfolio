import { Bot, Send } from 'lucide-react';

export default function MockupChatWidget() {
  return (
    <div className="h-[420px] w-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* 헤더 */}
      <div className="border-b border-slate-100 p-4 flex items-center gap-3 bg-slate-50/50">
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Bot size={18} />
          </div>
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">포트폴리오 에이전트</h3>
          <p className="text-xs font-medium text-slate-500">RAG 기반 기술 면접 챗봇</p>
        </div>
      </div>
      
      {/* 대화 영역 (애니메이션 적용) */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 text-sm bg-slate-50/30">
        <div className="chat-bubble flex gap-3 max-w-[85%]">
          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex shrink-0 items-center justify-center">
            <Bot size={14} />
          </div>
          <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 text-slate-700 shadow-sm leading-relaxed">
            안녕하세요! 김민준 지원자의 AI 대리인입니다. 데이터 검증 역량이나 예외 처리 경험에 대해 물어보세요.
          </div>
        </div>
        
        <div className="chat-bubble chat-delay-1 flex gap-3 max-w-[85%] self-end flex-row-reverse">
          <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none text-white shadow-md leading-relaxed">
            StoryLex 프로젝트에서 401 에러 예외 처리는 어떻게 했어?
          </div>
        </div>
        
        <div className="chat-bubble chat-delay-2 flex gap-3 max-w-[85%]">
          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex shrink-0 items-center justify-center">
            <Bot size={14} />
          </div>
          <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></span>
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></span>
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></span>
          </div>
        </div>
      </div>
      
      {/* 입력 영역 */}
      <div className="p-4 border-t border-slate-100 bg-white flex gap-2">
        <input 
          type="text" 
          placeholder="질문을 입력하세요..." 
          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none" 
          disabled 
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg opacity-50 cursor-not-allowed">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}