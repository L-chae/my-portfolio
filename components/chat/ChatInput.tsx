import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";

interface ChatInputProps {
  activeSection: string;
  isExpanded: boolean;
  isTyping: boolean;
  onSend: (message: string) => void;
  onExpand: () => void;
}

const PLACEHOLDER_DATA: Record<string, string> = {
  hero: "포트폴리오 AI에게 질문하기",
  rodia: "Rodia 프로젝트의 API 디버깅에 대해 물어보세요",
  storylex: "StoryLex의 동시성 제어에 대해 물어보세요",
  composer: "Composer의 아키텍처 설계에 대해 물어보세요",
  default: "메시지를 입력하세요...",
};

export default function ChatInput({
  activeSection,
  isExpanded,
  isTyping,
  onSend,
  onExpand,
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const isComposingRef = useRef(false);

  useEffect(() => {
    if (!isExpanded) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    return () => clearTimeout(timer);
  }, [isExpanded]);

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = () => {
    isComposingRef.current = false;
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Enter" &&
      (e.nativeEvent.isComposing ||
        isComposingRef.current)
    ) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = inputValue.trim();

    if (
      !message ||
      isTyping ||
      isComposingRef.current
    ) {
      return;
    }

    onSend(message);
    setInputValue("");
  };

  const placeholder = isExpanded
    ? PLACEHOLDER_DATA[activeSection] ??
      PLACEHOLDER_DATA.default
    : PLACEHOLDER_DATA.hero;

  return (
    <div
      className={`absolute bottom-0 w-full flex justify-center pointer-events-none transition-all duration-300 ${
        isExpanded
          ? "px-5 sm:px-6 pt-2 pb-5 sm:pb-6 bg-linear-to-t from-slate-50 via-slate-50 to-transparent"
          : "p-0"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        onClick={() => {
          if (!isExpanded) onExpand();
        }}
        className={`pointer-events-auto flex items-center gap-2 w-full transition-all duration-500 cursor-text overflow-hidden ${
          isExpanded
            ? "max-w-2xl min-h-14 px-4 py-2 bg-slate-50 border border-slate-200/80 rounded-[28px] focus-within:bg-white focus-within:shadow-sm focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-500/10"
            : "max-w-100 h-14 px-4 bg-white border border-slate-200 shadow-[0_4px_24px_rgba(59,130,246,0.10)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)] rounded-full group"
        }`}
      >
        {!isExpanded && (
          <Sparkles
            size={18}
            className="text-blue-600 shrink-0 ml-1 transition-transform group-hover:scale-110"
          />
        )}

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder={placeholder}
          disabled={isTyping}
          readOnly={!isExpanded}
          className={`flex-1 min-w-0 bg-transparent px-2 py-2 focus:outline-none transition-all text-slate-900 placeholder-slate-500 truncate ${
            isExpanded
              ? "text-[15.5px]"
              : "text-[15px] font-medium cursor-pointer"
          }`}
        />

        <button
          type="submit"
          disabled={
            isExpanded &&
            (!inputValue.trim() || isTyping)
          }
          className={`shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
            isExpanded
              ? `w-10 h-10 ${
                  inputValue.trim() && !isTyping
                    ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                    : "bg-slate-200/60 text-slate-400"
                }`
              : "w-9 h-9 bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600"
          }`}
        >
          <Send
            size={isExpanded ? 16 : 14}
            className={
              isExpanded &&
              inputValue.trim() &&
              !isTyping
                ? "translate-x-px"
                : ""
            }
          />
        </button>
      </form>
    </div>
  );
}