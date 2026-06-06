import { create } from 'zustand';

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

const createId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const KNOWLEDGE_BASE = [
  {
    keywords: ['rodia', '로디아', '디자인 시스템', 'orval'],
    answer: `
### Rodia

웹과 모바일에서 동일한 디자인 값을 사용할 수 있도록 만든 디자인 시스템 프로젝트입니다.

#### 해결하려고 한 문제

- 디자인 토큰을 여러 곳에서 관리
- 플랫폼별 값 불일치
- API 명세 증가에 따른 관리 비용 증가

#### 해결

- 디자인 토큰 단일 관리(JSON)
- Web / Mobile 자동 생성
- Orval 기반 API 자동화 구조 도입
- generated → feature api → ui 구조 적용

#### 배운 점

도구 자체보다 어떤 계층에서 사용하고 관리할지 설계하는 것이 더 중요하다는 점을 배웠습니다.
`,
  },

  {
    keywords: ['storylex', '스토리렉스', '401', 'queue'],
    answer: `
### StoryLex

대규모 API 호출 환경에서 인증 안정성을 개선한 프로젝트입니다.

#### 핵심 개선

- Promise Queue 기반 토큰 갱신
- Refresh API 단일 호출 보장
- React Query / Zustand 역할 분리

#### 결과

동시 요청 상황에서도 중복 재발급 문제를 방지할 수 있었습니다.
`,
  },

  {
    keywords: ['composer', '컴포저'],
    answer: `
### React Starter Composer

프로젝트 초기 설정을 자동 생성하는 도구입니다.

#### 핵심 설계

- 파생 상태 활용
- Rule 기반 구성
- useMemo 기반 계산 구조

#### 배운 점

상태 저장보다 상태를 계산하는 구조가 유지보수에 유리하다는 점을 학습했습니다.
`,
  },

  {
    keywords: ['철학', '가치', '기준'],
    answer: `
### 개발 철학

제가 중요하게 생각하는 것은 안정성과 유지보수성입니다.

- 반복되는 작업 자동화
- 예외 상황 대응
- 팀이 이해하기 쉬운 구조 설계

기능 구현보다 장기적으로 관리 가능한 구조를 우선적으로 고민합니다.
`,
  },

  {
    keywords: ['기술', '스택'],
    answer: `
### 기술 스택

Frontend
- React
- React Native
- Next.js
- TypeScript

State
- Zustand
- React Query

API
- Axios
- Orval

Styling
- Tailwind CSS
- NativeWind
`
  }
];

function findResponse(question: string) {
  const lower = question.toLowerCase();

  const matched = KNOWLEDGE_BASE.find(item =>
    item.keywords.some(keyword =>
      lower.includes(keyword.toLowerCase())
    )
  );

  return (
    matched?.answer ??
    `
질문에 대한 정보가 등록되어 있지 않습니다.

추천 질문

• Rodia 프로젝트 설명
• StoryLex 아키텍처
• API 자동화 구조
• 상태관리 기준
• 개발 철학
`
  );
}

export const useChat = create<ChatStore>((set, get) => ({
  isExpanded: false,

  setIsExpanded: (expanded) =>
    set({ isExpanded: expanded }),

  isTyping: false,
  isStreaming: false,

  inputValue: '',

  setInputValue: (value) =>
    set({ inputValue: value }),

  messages: [
    {
      id: createId(),
      role: 'assistant',
      content:
        '안녕하세요. 포트폴리오 프로젝트와 기술적 의사결정에 대해 질문해 주세요.',
    },
  ],

  resetChat: () =>
    set({
      messages: [
        {
          id: createId(),
          role: 'assistant',
          content:
            '안녕하세요. 포트폴리오 프로젝트와 기술적 의사결정에 대해 질문해 주세요.',
        },
      ],
    }),

  handleSend: async (content) => {
    const { isTyping, isStreaming } = get();

    if (!content.trim()) return;
    if (isTyping || isStreaming) return;

    set(state => ({
      messages: [
        ...state.messages,
        {
          id: createId(),
          role: 'user',
          content,
        },
      ],
      inputValue: '',
      isTyping: true,
    }));

    try {
      await new Promise(resolve =>
        setTimeout(resolve, 600)
      );

      const answer = findResponse(content);

      const assistantId = createId();

      set(state => ({
        messages: [
          ...state.messages,
          {
            id: assistantId,
            role: 'assistant',
            content: '',
          },
        ],
        isTyping: false,
        isStreaming: true,
      }));

      let currentText = '';

      for (const char of answer) {
        await new Promise(resolve =>
          setTimeout(resolve, 8)
        );

        currentText += char;

        set(state => ({
          messages: state.messages.map(message =>
            message.id === assistantId
              ? { ...message, content: currentText }
              : message
          ),
        }));
      }

      set({
        isStreaming: false,
      });
    } catch {
      set(state => ({
        messages: [
          ...state.messages,
          {
            id: createId(),
            role: 'assistant',
            content:
              '응답 생성 중 문제가 발생했습니다.',
          },
        ],
        isTyping: false,
        isStreaming: false,
      }));
    }
  },
}));