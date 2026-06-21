import { memo, useMemo } from "react";
import { DEFAULT_SUGGESTIONS, SECTION_SUGGESTION_MAP, SUGGESTION_MAP } from "@/content/suggestions";
import { useChat } from "@/hooks/useChat";

interface ChatSuggestionsProps {
  activeSection: string;
  messageCount: number;
  onSelect: (suggestion: string) => void;
  userMessages: readonly string[];
  isTyping: boolean;
  isStreaming: boolean;
}

function ChatSuggestions({
  activeSection,
  messageCount,
  onSelect,
  userMessages,
  isTyping,
  isStreaming,
}: ChatSuggestionsProps) {
  const currentTopicHint = useChat((state) => state.currentTopicHint);
  const isInitialState = messageCount === 1;

  const suggestions = useMemo(() => {
    const rawSuggestions =
      currentTopicHint && SUGGESTION_MAP[currentTopicHint]
        ? SUGGESTION_MAP[currentTopicHint]
        : SECTION_SUGGESTION_MAP[activeSection] ?? DEFAULT_SUGGESTIONS;

    return rawSuggestions
      .filter((suggestion) => !userMessages.includes(suggestion))
      .slice(0, 3);
  }, [activeSection, currentTopicHint, userMessages]);

  if (isTyping || isStreaming || suggestions.length === 0) return null;

  return (
    <div className="ml-12 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none">
      <p className="text-sm text-ink-muted">
        {isInitialState ? "첫 질문을 선택해 대화를 시작해 보세요" : "현재 내용과 관련된 후속 질문"}
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSelect(suggestion)}
            className={`suggestion-chip px-4 py-2 text-left text-[14px] ${
              isInitialState
                ? "suggestion-chip-featured"
                : ""
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
