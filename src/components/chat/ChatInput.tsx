import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

import { useChat } from "@/hooks/useChat";

import ChatAiLogo from "./ChatAiLogo";

interface ChatInputProps {
  activeSection: string;
  isExpanded: boolean;
  onExpand: () => void;
}

const PLACEHOLDER_DATA: Record<string, string> = {
  hero: "포트폴리오 AI에게 질문하기",
  experience: "경험과 데이터 품질 관점에 대해 물어보세요",
  "core-values": "개발 가치관과 예외 처리 기준을 물어보세요",
  projects: "Rodia, StoryLex, Portfolio AI에 대해 물어보세요",
  default: "메시지를 입력하세요...",
};

export default function ChatInput({
  activeSection,
  isExpanded,
  onExpand,
}: ChatInputProps) {
  const isTyping = useChat((state) => state.isTyping);
  const isStreaming = useChat((state) => state.isStreaming);
  const handleSend = useChat((state) => state.handleSend);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isComposingRef = useRef(false);

  useEffect(() => {
    if (!isExpanded) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
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
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      e.key === "Enter" &&
      (e.nativeEvent.isComposing ||
        isComposingRef.current)
    ) {
      e.preventDefault();
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = inputValue.trim();

    if (
      !message ||
      isTyping ||
      isStreaming ||
      isComposingRef.current
    ) {
      return;
    }

    handleSend(message);
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
          ? "border-t border-line bg-surface px-5 pt-3 pb-5 sm:px-6 sm:pb-6"
          : "p-0"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        onClick={() => {
          if (!isExpanded) onExpand();
        }}
        className={`pointer-events-auto flex w-full items-end gap-2 transition-all duration-500 cursor-text overflow-hidden ${
          isExpanded
            ? "max-w-2xl rounded-panel border border-line bg-white px-3 py-2 shadow-soft focus-within:border-brand focus-within:ring-4 focus-within:ring-brand-ring sm:px-4"
            : "max-w-100 h-14 px-4 bg-surface border border-line shadow-card hover:shadow-soft rounded-full group"
        }`}
        >
        {!isExpanded && (
          <ChatAiLogo
            decorative
            size={20}
            className="ml-1 h-5 w-5 text-brand transition-transform duration-300 group-hover:scale-110"
          />
        )}

        <textarea
          ref={inputRef}
          rows={1}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder={placeholder}
          disabled={isTyping || isStreaming}
          readOnly={!isExpanded || isStreaming}
          aria-label="질문 입력"
          className={`min-h-10 max-h-28 min-w-0 flex-1 resize-none overflow-y-auto bg-transparent px-2 py-2 leading-6 text-navy placeholder:text-ink-muted focus:outline-none ${
            isExpanded
              ? "text-[15px]"
              : "cursor-pointer text-[15px] font-medium"
          }`}
        />

        <button
          type="submit"
          disabled={
            isExpanded &&
            (!inputValue.trim() || isTyping || isStreaming)
          }
          aria-label="질문 보내기"
          className={`flex shrink-0 items-center justify-center rounded-pill transition-colors duration-200 ${
            isExpanded
              ? `w-10 h-10 ${
                  inputValue.trim() && !isTyping && !isStreaming
                    ? "bg-brand text-white shadow-brand hover:bg-brand-hover hover:ring-4 hover:ring-brand-ring"
                    : "bg-surface-muted text-ink-faint"
                }`
              : "w-9 h-9 bg-surface-soft text-ink-faint group-hover:bg-brand-soft group-hover:text-brand"
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
