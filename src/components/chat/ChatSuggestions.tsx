import { memo, useMemo } from "react";

interface ChatSuggestionsProps {
  // 💡 부모(Zustand 또는 ChatContainer)로부터 주입받는 동적 추천 질문
  currentSuggestions?: string[]; 
  onSelect: (suggestion: string) => void;
  messages: { role: string; content: string }[];
  isTyping: boolean;
}

// 초기 질문은 컴포넌트 내부에 상수로 두거나 외부에서 import
const INITIAL_QUESTIONS = [
  "가장 자신 있는 프로젝트의 아키텍처 설명해 줘",
  "상태 관리를 다루는 본인만의 기준이 있나요?",
  "오버엔지니어링으로 실패했던 경험이 있나요?"
];

function ChatSuggestions({ 
  currentSuggestions, 
  onSelect, 
  messages, 
  isTyping 
}: ChatSuggestionsProps) {
  const isInitialState = messages.length === 1;

  const suggestions = useMemo(() => {
    if (isInitialState) {
      return INITIAL_QUESTIONS;
    }
    
    const rawSuggestions = currentSuggestions || [];
    
    return rawSuggestions
      .filter((s) => !messages.some((m) => m.role === "user" && m.content === s))
      .slice(0, 3); // UI 레이아웃 안정을 위해 최대 3개까지만 노출
  }, [currentSuggestions, messages, isInitialState]);

  if (isTyping || suggestions.length === 0) return null;

  return (
    <div className="ml-11 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <p className="text-[13px] font-bold text-slate-400">
        {isInitialState ? "👉 첫 질문을 선택해 대화를 시작해 보세요" : "현재 내용과 관련된 후속 질문"}
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSelect(suggestion)}
            className={`px-4 py-2 text-[14px] font-medium transition-all shadow-sm text-left break-keep rounded-xl border ${
              isInitialState 
                ? "bg-blue-50/50 hover:bg-blue-100 text-blue-700 border-blue-200 hover:border-blue-300"
                : "bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200 hover:border-slate-300" 
            }`}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

export default memo(ChatSuggestions);