import { create } from 'zustand';
import { STATIC_ANSWERS } from '@/content/staticAnswers';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
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
  handleSend: (content: string) => Promise<void>;
  resetChat: () => void;
}

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const INITIAL_MESSAGE: Message = {
  id: createId(),
  role: 'assistant',
  content: '안녕하세요. 포트폴리오 프로젝트와 기술적 의사결정에 대해 질문해 주세요.',
};

export const useChat = create<ChatStore>((set, get) => ({
  isExpanded: false,
  setIsExpanded: (expanded) => set({ isExpanded: expanded }),

  isTyping: false,
  isStreaming: false,

  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),

  messages: [INITIAL_MESSAGE],

  resetChat: () => set({ messages: [{ ...INITIAL_MESSAGE, id: createId() }] }),

  handleSend: async (content) => {
    const { isTyping, isStreaming } = get();
    if (!content.trim() || isTyping || isStreaming) return;

    set((state) => ({
      messages: [...state.messages, { id: createId(), role: 'user', content }],
      inputValue: '',
      isTyping: false,
    }));

    const assistantId = createId();

    // 캐시 히트 → API 호출 없이 타이핑 효과만
    const cached = STATIC_ANSWERS[content.trim()];
    if (cached) {
      set((state) => ({
        messages: [...state.messages, { id: assistantId, role: 'assistant', content: '' }],
        isStreaming: true,
      }));

      let current = '';
      for (const char of cached) {
        await new Promise((r) => setTimeout(r, 6));
        current += char;
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === assistantId ? { ...msg, content: current } : msg
          ),
        }));
      }

      set({ isStreaming: false });
      return;
    }

    // 캐시 미스 → API 호출
    try {
      const currentMessages = get().messages.slice(-4).map(({ role, content }) => ({ role, content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: currentMessages }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!res.body) throw new Error('No response body');

      set((state) => ({
        messages: [...state.messages, { id: assistantId, role: 'assistant', content: '' }],
        isTyping: false,
        isStreaming: true,
      }));

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let buffer = '';
      let rafId: number | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const text = buffer;
          buffer = '';
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === assistantId
                ? { ...msg, content: msg.content + text }
                : msg
            ),
          }));
        });
      }

      if (buffer) {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: msg.content + buffer }
              : msg
          ),
        }));
      }

      set({ isStreaming: false });

    } catch (error) {
      console.error('Chat error:', error);
      set((state) => ({
        messages: state.messages
          .filter((msg) => msg.id !== assistantId)
          .concat({
            id: createId(),
            role: 'assistant',
            content: '응답 생성 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
          }),
        isTyping: false,
        isStreaming: false,
      }));
    }
  },
}));