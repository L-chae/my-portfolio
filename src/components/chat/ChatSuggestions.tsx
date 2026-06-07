import { memo, useMemo } from "react";
import { DEFAULT_SUGGESTIONS, SECTION_SUGGESTION_MAP, SUGGESTION_MAP } from "@/content/suggestions";
import { useChat } from "@/hooks/useChat";

interface ChatSuggestionsProps {
  activeSection: string;
  onSelect: (suggestion: string) => void;
  messages: { role: string; content: string }[];
  isTyping: boolean;
}

function ChatSuggestions({ activeSection, onSelect, messages, isTyping }: ChatSuggestionsProps) {
  const activeContextKey = useChat((state) => state.activeContextKey);
  const isInitialState = messages.length === 1;

  const suggestions = useMemo(() => {
    const rawSuggestions =
      activeContextKey && SUGGESTION_MAP[activeContextKey]
        ? SUGGESTION_MAP[activeContextKey]
        : SECTION_SUGGESTION_MAP[activeSection] ?? DEFAULT_SUGGESTIONS;

    return rawSuggestions
      .filter((suggestion) => !messages.some((message) => message.role === "user" && message.content === suggestion))
      .slice(0, 3);
  }, [activeContextKey, activeSection, messages]);

  if (isTyping || suggestions.length === 0) return null;

  return (
    <div className="ml-11 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <p className="text-[13px] font-bold text-slate-400">
        {isInitialState ? "첫 질문을 선택해 대화를 시작해 보세요" : "현재 내용과 관련된 후속 질문"}
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
