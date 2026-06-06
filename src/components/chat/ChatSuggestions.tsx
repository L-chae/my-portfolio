import { memo, useMemo } from "react";

interface ChatSuggestionsProps {
  activeSection: string;
  onSelect: (suggestion: string) => void;
  messages: { role: string; content: string }[];
  isTyping: boolean;
}

const CONTEXT_DATA: Record<string, string[]> = {
  hero: ["전체 기술 스택 요약해줘", "프론트엔드 개발 시 가장 중요하게 생각하는 가치는?"],
  rodia: ["Orval을 도입한 구체적인 이유는?", "인앱 디버거는 어떻게 구현했어?"],
  storylex: ["401 에러 큐(Queue) 로직 설명해줘", "React Query와 Zustand 분리 이유"],
  composer: ["파생 상태를 useMemo로 분리한 이유는?", "JSON 병합 전략에 대해 설명해줘"],
  default: ["이전 프로젝트에서 겪은 가장 큰 난관은?", "협업 시 본인만의 강점은?"],
};

function ChatSuggestions({ activeSection, onSelect, messages, isTyping }: ChatSuggestionsProps) {
  const isInitialState = messages.length === 1;

  const suggestions = useMemo(() => {
    if (isInitialState) {
      return [
        "가장 자신 있는 프로젝트의 아키텍처 설명해 줘",
        "상태 관리를 다루는 본인만의 기준이 있나요?",
        "이력서 PDF 다운로드하기"
      ];
    }
    
    const rawSuggestions = CONTEXT_DATA[activeSection] || CONTEXT_DATA.default;
    return rawSuggestions.filter(
      (s) => !messages.some((m) => m.role === "user" && m.content === s)
    );
  }, [activeSection, messages, isInitialState]);

  if (isTyping || suggestions.length === 0) return null;

  return (
    <div className="ml-11 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <p className="text-[13px] font-bold text-slate-400">
        {isInitialState ? "👉 첫 질문을 선택해 대화를 시작해 보세요" : "현재 보고 계신 내용과 관련된 질문"}
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