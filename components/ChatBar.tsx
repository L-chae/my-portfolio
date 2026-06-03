"use client";
import { useState } from "react";
import {
  Bot,
  Send,
  User,
  Sparkles,
  X,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useChat } from "../hooks/useChat";

export default function ChatBar() {
  const {
    isExpanded,
    setIsExpanded,
    inputValue,
    setInputValue,
    isTyping,
    messages,
    handleSend,
    scrollRef,
    inputRef,
  } = useChat();

  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleExpanded = (expanded: boolean) => {
    if (!expanded) setIsFullScreen(false);
    setIsExpanded(expanded);
  };

  const SUGGESTIONS = [
    "Rodia 최적화 경험",
    "StoryLex 401 에러 제어",
    "관련 없는 질문 (예외 테스트)",
  ];
  
  const availableSuggestions = SUGGESTIONS.filter(
    (s) => !messages.some((m) => m.content === s),
  );

  return (
    <>
      {/* 1. 백그라운드 딤 처리 */}
      <div
        className={`fixed inset-0 z-50 bg-slate-900/10 backdrop-blur-sm transition-opacity duration-400 ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => {
          if (!isTyping) toggleExpanded(false);
        }}
      />

      {/* 2. 메인 컨테이너 */}
      <div
        className={`fixed z-60 left-0 right-0 mx-auto flex flex-col transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-auto ${
          isExpanded
            ? isFullScreen
              ? "inset-0 w-full max-w-full h-full bg-white rounded-none shadow-none border-none"
              : "bottom-[2vh] sm:bottom-[5vh] w-[96vw] max-w-[800px] h-[92vh] sm:h-[85vh] bg-white shadow-2xl border border-slate-200/80 rounded-[28px] overflow-hidden"
            : "bottom-6 w-[calc(100%-2rem)] max-w-[280px] h-14 bg-transparent border-transparent shadow-none pointer-events-none"
        }`}
      >
        {/* 헤더 바 */}
        <div className={`shrink-0 bg-slate-50/90 backdrop-blur-md px-5 sm:px-6 py-3 flex justify-between items-center border-b border-slate-200/60 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>
          <div className="flex items-center gap-3">
           <div className="flex items-center gap-2"> {/* 텍스트와의 간격을 위해 부모에 flex와 gap 추가 권장 */}
  <div className="w-7 h-7 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
    <Sparkles size={16} /> 
  </div>
  <h3 className="font-bold text-[15px] text-slate-700">
    Portfolio AI
  </h3>
</div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullScreen(!isFullScreen);
              }}
              className="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full p-2 transition-colors"
            >
              {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(false);
              }}
              className="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full p-2 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 3. 대화 영역 */}
        <div
          ref={scrollRef}
          className={`flex-1 overflow-y-auto flex flex-col px-5 sm:px-6 py-5 pb-[140px] transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0 hidden"}`}
        >
          {/* 💡 gap-5로 일관된 간격 유지 */}
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-5">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3.5 max-w-full ${msg.role === "user" ? "self-end flex-row-reverse sm:max-w-[85%]" : "self-start w-full"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm mt-0.5 ${msg.role === "user" ? "bg-slate-800 text-white" : "bg-blue-600 text-white"}`}
                >
                  {msg.role === "user" ? <User size={15} /> : <Bot size={15} />}
                </div>

                {/* 💡 break-keep 및 leading 조정으로 가독성 최적화 */}
                {msg.role === "user" ? (
                  <div className="px-4 py-3 text-[15px] bg-slate-800 text-white rounded-[20px] rounded-tr-sm shadow-sm leading-relaxed whitespace-pre-wrap break-words break-keep">
                    {msg.content}
                  </div>
                ) : (
                  <div className="flex-1 py-1 text-[15.5px] text-slate-800 leading-[1.7] whitespace-pre-wrap break-words break-keep tracking-tight">
                    {msg.content}
                  </div>
                )}
              </div>
            ))}

            {/* 타이핑 인디케이터 */}
            {isTyping && (
              <div className="flex gap-3.5 w-full self-start animate-in fade-in duration-300">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Bot size={15} />
                </div>
                <div className="flex-1 py-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}

            {/* 질문 추천 요소 */}
            {availableSuggestions.length > 0 && (
              <div
                className={`ml-11 flex flex-col gap-3 transition-opacity duration-300 ${isTyping ? "opacity-40 pointer-events-none" : "opacity-100"}`}
              >
                {messages.length === 1 && (
                  <p className="text-[13px] font-bold text-slate-400">
                    다음 질문을 선택해보세요
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {availableSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(suggestion)}
                      className="px-4 py-2 text-[14px] font-medium bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-slate-200 hover:border-blue-200 rounded-xl transition-all shadow-sm text-left break-keep"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. 입력 폼 영역 */}
        <div
          className={`absolute bottom-0 w-full flex justify-center pointer-events-none transition-all duration-300 ${
            // 💡 좌우 여백을 헤더/대화 영역과 동일하게(px-5 sm:px-6) 맞추어 정렬선 유지
            isExpanded ? "px-5 sm:px-6 pt-2 pb-5 sm:pb-6 bg-gradient-to-t from-white via-white to-transparent" : "p-0"
          }`}
        >
          <form
            className={`pointer-events-auto flex items-center gap-2 w-full transition-all duration-500 cursor-text overflow-hidden ${
              isExpanded
                ? "max-w-2xl min-h-[56px] px-4 py-2 bg-slate-50 border border-slate-200/80 rounded-full focus-within:bg-white focus-within:shadow-sm focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-500/10"
                : "max-w-[280px] h-14 px-3 bg-white border border-slate-300 shadow-md hover:shadow-lg rounded-full"
            }`}
            onClick={() => {
              if (!isExpanded) {
                toggleExpanded(true);
                setTimeout(() => inputRef.current?.focus(), 150);
              }
            }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
          >
            {!isExpanded && (
              <Sparkles size={18} className="text-blue-600 shrink-0 ml-1.5" />
            )}

            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                isExpanded ? "메시지를 입력하세요..." : "Portfolio AI에게 질문하기"
              }
              className={`flex-1 min-w-0 bg-transparent px-2 py-2 focus:outline-none transition-all text-slate-800 placeholder-slate-400 truncate ${
                isExpanded ? "text-[15.5px]" : "text-[14.5px] font-medium"
              }`}
              disabled={isTyping}
              readOnly={!isExpanded}
            />

            <button
              type="submit"
              className={`shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${
                isExpanded
                  ? "w-10 h-10 " +
                    (inputValue.trim() && !isTyping
                      ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                      : "bg-slate-200/60 text-slate-400")
                  : "w-8 h-8 bg-slate-100 text-slate-500 hover:bg-slate-200 mr-1"
              }`}
              disabled={isExpanded && (!inputValue.trim() || isTyping)}
            >
              <Send
                size={isExpanded ? 16 : 14}
                className={
                  isExpanded && inputValue.trim() && !isTyping
                    ? "translate-x-[1px]"
                    : ""
                }
              />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}