// hooks/useChat.ts
import { create } from 'zustand';

export interface Message {
  id: string; // 💡 이전 ChatMessageItem 최적화를 위해 필수 추가
  role: 'user' | 'assistant';
  content: string;
}

interface ChatStore {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  isTyping: boolean;      // 생각 중 (로딩 인디케이터용)
  isStreaming: boolean;   // 타이핑 출력 중 (스트리밍용)
  inputValue: string;
  setInputValue: (value: string) => void;
  messages: Message[];
  handleSend: (content: string) => Promise<void>;
}

let currentStreamInterval: NodeJS.Timeout | null = null;

const MOCK_RESPONSES = [
  {
    keywords: ["rodia", "로디아", "orval", "인앱", "디버거", "아키텍처"],
    answer: `**Rodia 프로젝트**의 핵심은 **API 통신 안정성과 협업 효율 향상**입니다.\n\n* **OpenAPI 자동화:** Orval을 도입하여 API 명세 변경 시 타입과 클라이언트 코드가 자동 생성되도록 파이프라인을 구축해 타입 불일치를 원천 차단했습니다.\n* **인앱 API 디버거:** 모바일 환경의 네트워크 추적 한계를 극복하기 위해 \`Axios Interceptor\`로 요청/응답을 수집, cURL 형태로 복사할 수 있는 자체 디버깅 환경을 구축했습니다.\n\n> Orval 설정 방식이나 Interceptor 구현 로직 중 어떤 부분이 더 궁금하신가요?`
  },
  {
    keywords: ["storylex", "스토리렉스", "401", "큐", "queue", "상태 분리", "동시성"],
    answer: `**StoryLex 프로젝트**에서 가장 공을 들인 부분은 **동시성 제어와 상태 분리**입니다.\n\n* **Promise Queue 인증 제어:** 엑세스 토큰 만료 시 여러 API가 동시에 401 에러를 반환할 때, 큐(Queue)를 활용하여 토큰 갱신(Refresh) 요청이 **단 1회만 발생**하도록 병목을 해결했습니다.\n* **상태의 책임 분리:** \`React Query\`(서버 상태)와 \`Zustand\`(전역 UI 상태)를 엄격히 분리하여 렌더링 예외 상황을 제거했습니다.\n\n> Promise Queue 구현체 설계나 상태 분리 기준에 대해 더 자세히 설명해 드릴까요?`
  },
  {
    keywords: ["composer", "컴포저", "usememo", "파생"],
    answer: `**React Starter Composer**는 복잡한 의존성을 우아하게 해결하기 위한 아키텍처 프로젝트입니다.\n\n* **파생 상태(Derived State) 활용:** 상태 동기화 오류를 막기 위해 Zustand 스토어에는 사용자의 순수 선택값(selection)만 저장했습니다.\n* **동적 렌더링 결합:** 최종 생성될 JSON 코드나 파일 트리는 렌더링 시점에 \`useMemo\`로 계산하도록 책임을 분리하여 확장성(OCP)을 확보했습니다.\n\n> Rule 기반의 아키텍처 확장성(Library Rule)에 대해서도 설명해 드릴까요?`
  },
  {
    keywords: ["가치", "중요", "철학", "기준"],
    answer: `프론트엔드 개발에서 가장 중요하게 생각하는 가치는 **'안정성'과 '반복 비용 제거'**입니다.\n\n* **안정성 (Edge-case Control):** 정상 흐름뿐만 아니라 데이터 지연, 401 인증 에러 등 예외 상황에서도 사용자의 흐름이 끊기지 않도록 방어적인 시나리오를 검증합니다.\n* **반복 비용 제거 (DX):** 동일한 에러나 커뮤니케이션 비용이 반복되지 않도록 API 타입 자동화, cURL 재현 환경 등을 구축하여 팀 전체의 생산성을 높이는 데 기여합니다.`
  },
  {
    keywords: ["스택", "기술", "요약"],
    answer: `주요 기술 스택과 활용 역량은 다음과 같습니다.\n\n* **Core:** React, React Native, TypeScript\n* **State Management:** Zustand, React Query\n* **Network & API:** Axios, Orval (OpenAPI)\n* **Styling:** Tailwind CSS\n\n단순히 도구를 사용하는 것을 넘어, 각 기술의 동작 원리를 이해하고 프론트엔드 기반으로 디버깅 범위를 좁히는 분석 능력을 갖추고 있습니다.`
  }
];

export const useChat = create<ChatStore>((set, get) => ({
  isExpanded: false,
  setIsExpanded: (expanded) => set({ isExpanded: expanded }),
  
  isTyping: false,
  isStreaming: false,
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),
  
  messages: [
    {
      id: crypto.randomUUID(), // 초기 메시지 ID 부여
      role: 'assistant',
      content: '안녕하세요! 시나리오 검증가 김민준의 포트폴리오 에이전트입니다. 어떤 기술적 고민을 함께 나누고 싶으신가요?',
    },
  ],

  handleSend: async (content) => {
    const { isTyping, isStreaming, messages } = get();
    
    if (!content.trim() || isTyping || isStreaming) return;

    if (currentStreamInterval) {
      clearInterval(currentStreamInterval);
      currentStreamInterval = null;
    }

    // 1. 사용자 메시지 등록 (ID 추가)
    set({
      messages: [...messages, { id: crypto.randomUUID(), role: 'user', content }],
      isTyping: true,
      inputValue: '',
    });

    try {
      // 2. 서버 통신 딜레이 모방
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // 3. 키워드 매칭
      const lowerContent = content.toLowerCase();
      const matchedResponse = MOCK_RESPONSES.find(res => 
        res.keywords.some(keyword => lowerContent.includes(keyword))
      );

      const finalContent = matchedResponse 
        ? matchedResponse.answer 
        : `등록되지 않은 질문입니다.\n\n저는 김민준 개발자의 기술적 의사결정을 설명하는 에이전트입니다. **Rodia**, **StoryLex** 프로젝트의 아키텍처나 상태 관리(Zustand)에 대해 물어보시면 구체적인 근거를 답변해 드립니다.`;

      // 4. 봇 메시지 Placeholder 생성 및 상태 변경 (ID 추가)
      set((state) => ({
        messages: [
          ...state.messages,
          { id: crypto.randomUUID(), role: 'assistant', content: '' },
        ],
        isTyping: false,
        isStreaming: true,
      }));

      // 5. 청크 스트리밍 로직
      let currentIndex = 0;
      const chunkSize = 2; 
      const streamSpeed = 20;

      currentStreamInterval = setInterval(() => {
        set((state) => {
          const newMessages = [...state.messages];
          const lastIndex = newMessages.length - 1;
          
          currentIndex += chunkSize;
          const currentText = finalContent.slice(0, currentIndex);
          
          newMessages[lastIndex] = {
            ...newMessages[lastIndex],
            content: currentText,
          };
          
          return { messages: newMessages };
        });

        // 렌더링 완료 시 정리
        if (currentIndex >= finalContent.length) {
          if (currentStreamInterval) clearInterval(currentStreamInterval);
          set({ isStreaming: false });
        }
      }, streamSpeed);

    } catch (error) {
      set((state) => ({
        messages: [
          ...state.messages, 
          { id: crypto.randomUUID(), role: 'assistant', content: '응답 처리 중 오류가 발생했습니다. 다시 시도해주세요.' }
        ],
        isTyping: false,
        isStreaming: false,
      }));
    }
  },
}));