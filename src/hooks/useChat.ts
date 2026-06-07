import { create } from 'zustand';
import { STATIC_ANSWERS } from '@/content/staticAnswers';
// 앞서 만든 검색 함수 임포트
import { searchKnowledge } from '@/lib/searchKnowledge'; 

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
  // 💡 추가된 상태: 현재 띄워줄 추천 질문의 키워드
  activeContextKey: string | null; 
  handleSend: (content: string) => Promise<void>;
  resetChat: () => void;
}

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const INITIAL_MESSAGE: Message = {
  id: createId(),
  role: 'assistant',
  content: '안녕하세요. 기능 구현을 넘어 예외 상황을 통제하는 프론트엔드 개발자 [이름]의 AI입니다. 무엇이든 물어보세요!',
};

export const useChat = create<ChatStore>((set, get) => ({
  isExpanded: false,
  setIsExpanded: (expanded) => set({ isExpanded: expanded }),
  isTyping: false,
  isStreaming: false,
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),
  messages: [INITIAL_MESSAGE],
  activeContextKey: null, // 초기화

  resetChat: () => set({ 
    messages: [{ ...INITIAL_MESSAGE, id: createId() }],
    activeContextKey: null // 리셋 시 함께 초기화
  }),

  handleSend: async (content) => {
    const { isTyping, isStreaming } = get();
    const trimmedContent = content.trim();
    if (!trimmedContent || isTyping || isStreaming) return;

    set((state) => ({
      messages: [...state.messages, { id: createId(), role: 'user', content: trimmedContent }],
      inputValue: '',
      isTyping: true, // 로딩 시작
    }));

    const assistantId = createId();
const searchResults = searchKnowledge(trimmedContent, 1);
  const matchedKey = searchResults.length > 0 ? (searchResults[0].id as string) : null;
    // 💡 1. 캐시 히트 (정적 답변)
    const cached = STATIC_ANSWERS[trimmedContent];
    if (cached) {
      set((state) => ({
        messages: [...state.messages, { id: assistantId, role: 'assistant', content: '' }],
        isStreaming: true,
        isTyping: false,
       activeContextKey: matchedKey,// 정적 질문 자체를 키로 사용
      }));

      // (타이핑 효과 로직 동일)
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

    // 💡 2. 캐시 미스 (LLM API 호출)
    try {
      // API 호출 전, 사용자의 질문으로 지식 데이터를 검색하여 주제(Key) 파악
      const searchResults = searchKnowledge(trimmedContent, 1);
      
      // searchKnowledge가 section 객체만 반환하므로, title이나 특정 식별자를 추출
      // (knowledge.ts에서 각 section이 title 속성을 가지고 있다고 가정)
      const matchedTitle = searchResults.length > 0 ? (searchResults[0].title as string) : null;

      const currentMessages = get().messages.slice(-4).map(({ role, content }) => ({ role, content }));

      // 참고: 여기서 matchedTitle에 해당하는 구체적인 데이터를 API body에 같이 실어 보내면(RAG), 
      // 서버에서 별도로 DB 검색을 할 필요 없이 바로 LLM 프롬프트에 주입할 수 있어 더욱 효율적입니다.
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
        activeContextKey: matchedTitle, // 💡 찾아낸 주제로 상태 업데이트
      }));

      // (스트리밍 및 RAF 렌더링 로직 동일)
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
    }catch (error) {
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