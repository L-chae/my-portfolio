import { create } from "zustand";
import { findPreparedAnswer } from "@/lib/preparedAnswers";
import { searchKnowledge } from "@/lib/searchKnowledge";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatStore {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  isTyping: boolean;
  isStreaming: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  messages: Message[];
  currentTopicHint: string | null;
  handleSend: (content: string) => Promise<void>;
  resetChat: () => void;
}

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const INITIAL_MESSAGE: Message = {
  id: createId(),
  role: "assistant",
  content: "안녕하세요. 기능 구현을 넘어 예외 상황을 통제하는 프론트엔드 개발자 [이름]의 AI입니다. 무엇이든 물어보세요!",
};

async function streamPreparedAnswer(
  answer: string,
  assistantId: string,
  set: (partial: ChatStore | Partial<ChatStore> | ((state: ChatStore) => ChatStore | Partial<ChatStore>)) => void
) {
  let current = "";
  for (const char of answer) {
    await new Promise((resolve) => setTimeout(resolve, 6));
    current += char;
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === assistantId ? { ...msg, content: current } : msg
      ),
    }));
  }
}

export const useChat = create<ChatStore>((set, get) => ({
  isExpanded: false,
  setIsExpanded: (expanded) => set({ isExpanded: expanded }),
  isTyping: false,
  isStreaming: false,
  inputValue: "",
  setInputValue: (value) => set({ inputValue: value }),
  messages: [INITIAL_MESSAGE],
  currentTopicHint: null,

  resetChat: () =>
    set({
      messages: [{ ...INITIAL_MESSAGE, id: createId() }],
      currentTopicHint: null,
    }),

  handleSend: async (content) => {
    const { currentTopicHint, isTyping, isStreaming } = get();
    const trimmedContent = content.trim();
    if (!trimmedContent || isTyping || isStreaming) return;

    set((state) => ({
      messages: [...state.messages, { id: createId(), role: "user", content: trimmedContent }],
      inputValue: "",
      isTyping: true,
    }));

    const assistantId = createId();
    const localRetrieval = searchKnowledge(trimmedContent, 1, { currentTopicHint })[0];
    const nextTopicHint = localRetrieval?.sourceId ?? currentTopicHint;
    set({ currentTopicHint: nextTopicHint });

    const preparedAnswer = findPreparedAnswer(trimmedContent);
    if (preparedAnswer) {
      set((state) => ({
        messages: [...state.messages, { id: assistantId, role: "assistant", content: "" }],
        isStreaming: true,
        isTyping: false,
      }));

      await streamPreparedAnswer(preparedAnswer, assistantId, set);
      set({ isStreaming: false });
      return;
    }

    try {
      const currentMessages = get().messages.slice(-5).map(({ role, content }) => ({ role, content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentTopicHint: nextTopicHint,
          messages: currentMessages,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!res.body) throw new Error("No response body");

      set((state) => ({
        messages: [...state.messages, { id: assistantId, role: "assistant", content: "" }],
        isTyping: false,
        isStreaming: true,
      }));

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let rafId: number | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        if (rafId) cancelAnimationFrame(rafId);

        rafId = requestAnimationFrame(() => {
          const text = buffer;
          buffer = "";
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === assistantId ? { ...msg, content: msg.content + text } : msg
            ),
          }));
        });
      }

      if (buffer) {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === assistantId ? { ...msg, content: msg.content + buffer } : msg
          ),
        }));
      }

      set({ isStreaming: false });
    } catch (error) {
      console.error("Chat error:", error);
      set((state) => ({
        messages: state.messages
          .filter((msg) => msg.id !== assistantId)
          .concat({
            id: createId(),
            role: "assistant",
            content: "응답 생성 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
          }),
        isTyping: false,
        isStreaming: false,
      }));
    }
  },
}));
