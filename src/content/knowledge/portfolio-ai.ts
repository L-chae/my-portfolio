// src/content/knowledge/portfolio-ai.ts
// 프로젝트: 포트폴리오 AI 챗봇
// 기준: 기술 능숙도 주장보다 "어떤 문제에 어떤 범위로 사용했는지"를 기록

export const portfolioAi = {
  id: 'portfolio-ai',

  summary: `
포트폴리오 사이트에 AI 챗봇을 탑재해 방문자가 프로젝트, 경험, 의사결정 이유를 직접 질문할 수 있도록 구성했습니다.
RAG를 구현한 것은 아니며, 정리된 포트폴리오 데이터를 정적 context로 주입하는 방식으로 답변 범위를 제한했습니다.
이 프로젝트에서 핵심은 AI 모델 자체보다, 챗봇이 참고할 데이터를 구조화하고 과장 없이 답변하도록 기준을 설계하는 일이었습니다.
  `.trim(),

  keywords: [
    'portfolio',
    'portfolio-ai',
    'AI 챗봇',
    '포트폴리오 챗봇',
    '대화형 포트폴리오',
    'Static Context Injection',
    '정적 context 주입',
    '프롬프트 설계',
    'context 설계',
    'knowledge 데이터',
    'prepared answer',
    'guardrail',
    '답변 범위 제한',
    'AI SDK',
    'Anthropic API',
    'Claude 계열 모델',
    'Zustand',
    'streaming response',
    'contextBuilder',
    'searchKnowledge',
    'Next.js',
    'TypeScript',
    'React',
  ],

  uiText: {
    title: '포트폴리오 AI 챗봇',
    subtitle: '정적 포트폴리오를 대화형 탐색 경험으로 확장한 프로젝트',
    description:
      '방문자가 프로젝트와 경험을 직접 질문할 수 있도록, 정리된 포트폴리오 데이터를 기반으로 답변하는 AI 챗봇을 구현했습니다.',
    role: '기획 · 프론트엔드 구현 · 데이터 구조화',
    emphasis: 'AI 모델 개발이 아니라, 포트폴리오 데이터 구조화와 답변 기준 설계에 초점을 둔 프로젝트입니다.',
  },

  motivation: `
일반적인 포트폴리오는 방문자가 정해진 순서대로 글을 읽어야 하기 때문에, 궁금한 내용을 바로 확인하기 어렵다고 느꼈습니다.
그래서 인사담당자나 실무자가 프로젝트의 의사결정 이유, 문제 해결 과정, 경험의 범위를 직접 질문할 수 있는 대화형 구조를 만들고자 했습니다.
  `.trim(),

  problem: {
    title: '정적 포트폴리오의 정보 탐색 한계',

    description:
      '프로젝트 설명을 일방적으로 나열하는 방식만으로는 방문자가 궁금한 내용을 빠르게 찾기 어렵다고 판단했습니다.',

    points: [
      '방문자가 모든 섹션을 직접 읽어야 함',
      '의사결정 이유나 실패 경험처럼 세부 맥락을 드러내기 어려움',
      '프로젝트별 경험과 기술 사용 범위를 질문 형태로 확인하기 어려움',
      '기술 스택 목록만으로는 실제 사용 범위가 과장되어 보일 수 있음',
    ],
  },

  decision: {
    title: 'RAG 대신 내부 knowledge 검색과 정적 context 주입 방식 선택',

    approach: '내부 knowledge 검색 + 정적 context 주입',

    description:
      '포트폴리오 데이터 규모가 크지 않기 때문에, 벡터 DB 기반 RAG를 바로 도입하기보다 내부 knowledge 데이터에서 질문과 관련된 section을 찾고 이를 prompt context로 구성하는 방식을 선택했습니다.',

    reasons: [
      '포트폴리오 데이터가 벡터 DB를 도입할 만큼 크지 않음',
      '초기 구현 복잡도를 줄일 수 있음',
      '데이터를 직접 관리하고 검수하기 쉬움',
      '챗봇이 답변할 수 있는 범위를 명확하게 제한하기 쉬움',
    ],

    notImplemented: [
      '벡터 DB 기반 RAG는 구현하지 않음',
      '문서 임베딩 검색 시스템은 구현하지 않음',
      'AI 모델을 직접 학습시키거나 튜닝하지 않음',
    ],
  },

  implementationScope: {
    implemented: [
      '포트폴리오 knowledge 데이터를 주제별 파일로 분리',
      '프로젝트와 경험 데이터를 챗봇 context로 활용',
      '특정 질문에 대한 prepared answer 우선 응답',
      '명시된 근거를 벗어난 답변을 제한하는 guardrail 작성',
      'AI SDK와 Anthropic API를 활용한 답변 생성',
      'streamText 응답을 ReadableStream으로 받아 점진적으로 표시',
      '질문 직후 로딩 상태와 답변 생성 상태 표시',
      'API 실패 시 사용자에게 실패 상태 안내',
      '중복 요청을 줄이기 위한 입력 상태 제어',
      '완료된 답변을 markdown 형태로 렌더링',
      'assistant 답변 위치 기준 스크롤과 짧은 streaming 답변 자동 follow 처리',
    ],

    partiallyImplementedOrLimited: [
      '대화형 탐색 경험을 제공하지만, 모든 답변은 준비된 포트폴리오 데이터 범위 안에서만 다룸',
      'AI 응답을 사용하지만, 모델을 직접 개발하거나 학습시키지는 않음',
      '검색과 context 구성은 프로젝트 내부 데이터 기준으로 동작함',
    ],

    notImplemented: [
      'AI 모델 개발',
      '모델 파인튜닝',
      '벡터 DB 기반 RAG',
      '대규모 문서 검색 시스템',
      '사용자 장기 기억 기반 개인화',
      '실시간 외부 웹 검색 기반 답변',
    ],
  },

  technologies: [
    {
      name: 'Next.js',
      category: 'frontend',
      usageScope: '포트폴리오 사이트와 챗봇 API 라우팅 구조를 구성하는 데 사용',
      evidence: 'src/app 페이지 구조와 src/app/api/chat/route.ts API route에서 사용',
      confidence: 'project-used',
      doNotClaim: [
        '대규모 Next.js 서비스를 운영했다고 말하지 않기',
        '실무 서비스 운영 경험처럼 표현하지 않기',
      ],
    },
    {
      name: 'React',
      category: 'frontend',
      usageScope: '챗봇 UI, 메시지 목록, 입력창, 로딩 상태 같은 화면 구성에 사용',
      evidence: 'src/components/chat/* 컴포넌트에서 메시지 목록, 입력창, streaming 상태 렌더링에 사용',
      confidence: 'project-used',
      doNotClaim: [
        'React를 전문적으로 능숙하게 다룬다고 단정하지 않기',
        '복잡한 상태 관리 시스템을 구축했다고 과장하지 않기',
      ],
    },
    {
      name: 'TypeScript',
      category: 'language',
      usageScope: 'knowledge 데이터와 챗봇 관련 구조를 타입 안정성 있게 관리하는 데 사용',
      evidence: 'src/content/knowledge/*, src/hooks/useChat.ts, src/lib/searchKnowledge.ts, src/lib/contextBuilder.ts 작성에 사용',
      confidence: 'project-used',
      doNotClaim: [
        '고급 타입 시스템을 깊게 설계했다고 말하지 않기',
        '대규모 타입 아키텍처를 구축했다고 말하지 않기',
      ],
    },
    {
      name: 'Markdown Rendering',
      category: 'ui',
      usageScope: '챗봇 답변을 읽기 쉬운 형식으로 표시하는 데 사용',
      evidence: 'src/components/chat/MessageMarkdown.tsx에서 react-markdown과 remark-gfm으로 완료된 assistant 답변을 렌더링',
      confidence: 'project-used',
      doNotClaim: [
        '문서 시스템을 구축했다고 과장하지 않기',
      ],
    },
    {
      name: 'AI SDK / Anthropic API',
      category: 'ai-assisted',
      usageScope: '검색된 포트폴리오 context를 바탕으로 assistant 답변을 생성하는 데 사용',
      evidence: 'src/app/api/chat/route.ts에서 @ai-sdk/anthropic의 anthropic 모델과 ai의 streamText 사용',
      confidence: 'project-used',
      doNotClaim: [
        'AI 모델을 직접 개발했다고 말하지 않기',
        '모델을 학습시켰다고 말하지 않기',
        'LLM을 파인튜닝했다고 말하지 않기',
        'AI 엔지니어링 프로젝트라고 과장하지 않기',
      ],
    },
    {
      name: 'Static Context Injection',
      category: 'ai-context',
      usageScope: '내부 knowledge 데이터에서 질문과 관련된 section을 찾고, 그 결과를 prompt context로 구성해 답변 범위를 제한하는 데 사용',
      evidence: 'src/lib/searchKnowledge.ts로 관련 section을 찾고, src/lib/contextBuilder.ts에서 context 문자열로 변환해 API route에서 사용자 질문에 붙임',
      confidence: 'project-used',
      doNotClaim: [
        'RAG를 구현했다고 말하지 않기',
        '벡터 검색 시스템을 구축했다고 말하지 않기',
      ],
    },
    {
      name: 'Prompt / Guardrail 설계',
      category: 'ai-context',
      usageScope: '챗봇이 포트폴리오 범위 안에서만 답변하도록 기준을 작성하는 데 사용',
      evidence: 'src/lib/systemPrompt.ts에서 Context 기반 답변, 추측 금지, 범위 밖 질문 제한 기준을 정의',
      confidence: 'project-used',
      doNotClaim: [
        '보안 수준의 AI 안전 시스템을 구축했다고 말하지 않기',
        '환각을 완전히 제거했다고 말하지 않기',
      ],
    },
    {
      name: 'Prepared Answer',
      category: 'answer-control',
      usageScope: '일부 자주 묻는 질문에는 모델 생성 전에 정해진 답변을 우선 반환하는 데 사용',
      evidence:
        'src/content/knowledge/preparedAnswers.ts, src/lib/preparedAnswers.ts, src/app/api/chat/route.ts의 findPreparedAnswer 분기에서 사용',
      confidence: 'project-used',
      doNotClaim: [
        '모든 질문을 정적 답변으로 처리한다고 말하지 않기',
        '질문 의도를 완전히 이해하는 분류기를 만들었다고 말하지 않기',
      ],
    },
    {
      name: 'searchKnowledge',
      category: 'retrieval-logic',
      usageScope: '포트폴리오 내부 knowledge 데이터 중 질문과 관련된 section을 찾는 데 사용',
      evidence: 'src/lib/searchKnowledge.ts에서 knowledge 데이터를 chunk로 만들고 query token 기반 점수로 결과를 반환',
      confidence: 'project-used',
      doNotClaim: [
        '벡터 검색이나 임베딩 검색을 구현했다고 말하지 않기',
        '대규모 검색 시스템을 구축했다고 말하지 않기',
      ],
    },
    {
      name: 'contextBuilder',
      category: 'prompt-context',
      usageScope: '검색된 section을 LLM에 전달할 prompt context 문자열로 정리하는 데 사용',
      evidence: 'src/lib/contextBuilder.ts의 buildContextPrompt가 Title, Source, Summary, Explanation, Key facts를 구성',
      confidence: 'project-used',
      doNotClaim: [
        '복잡한 RAG pipeline을 구축했다고 말하지 않기',
        '외부 문서 검색 시스템을 만들었다고 말하지 않기',
      ],
    },
    {
      name: 'Zustand',
      category: 'state-management',
      usageScope: '챗봇 열림 상태, 메시지, 입력 중/streaming 상태, topic hint를 관리하는 데 사용',
      evidence: 'src/hooks/useChat.ts에서 create로 chat store를 만들고 isTyping, isStreaming, messages, currentTopicHint를 관리',
      confidence: 'project-used',
      doNotClaim: [
        '복잡한 전역 상태 아키텍처를 구축했다고 말하지 않기',
        '대규모 상태 관리 경험으로 과장하지 않기',
      ],
    },
    {
      name: 'Streaming Response',
      category: 'ux',
      usageScope: 'assistant 답변을 한 번에 붙이지 않고 생성되는 동안 점진적으로 표시하는 데 사용',
      evidence: 'src/app/api/chat/route.ts의 streamText, src/hooks/useChat.ts의 res.body.getReader, src/components/chat/StreamingAssistantContent.tsx의 점진 표시',
      confidence: 'project-used',
      doNotClaim: [
        '실시간 멀티모달 스트리밍을 구현했다고 말하지 않기',
        '복잡한 스트리밍 인프라를 운영했다고 말하지 않기',
      ],
    },
  ],

  dataStructure: {
    initial: 'Q&A를 단순 나열하는 방식이라 관리와 검수가 어려웠음',
    improved: '주제별 knowledge 파일로 분리하고, 프로젝트 / 경험 / 정체성 데이터를 나누어 관리',
    current: '문제, 결정, 결과, 사용 기술, 금지 표현을 분리해 챗봇이 근거 기반으로 답변하기 쉽게 구성',
    reason:
      '기술 스택만 나열하면 능숙도를 과장할 수 있기 때문에, 각 프로젝트 안에 기술 사용 범위와 근거를 함께 기록하는 방향으로 정리했습니다.',
  },

  ux: {
    strategy:
      '챗봇을 단순 문의 버튼이 아니라 포트폴리오 탐색의 주요 인터페이스로 배치했습니다.',

    loading: '질문 직후 typing 상태와 답변 생성 중 streaming 상태를 보여주도록 구성',

    errorHandling: 'API 장애나 답변 실패 시 무한 로딩이 아니라 실패 상태를 안내',

    duplicateRequestPrevention: 'isTyping 또는 isStreaming 중에는 전송을 막고 입력창을 disabled/readOnly로 제어',

    answerRendering: '답변 완료 후 markdown 형태로 렌더링해 긴 답변도 읽기 쉽게 표시',

    guardrail: '포트폴리오에 없는 내용은 추측하지 않고, 답변 가능한 범위를 제한',

    streaming: 'streaming 중에는 텍스트를 점진적으로 표시하고, 완료 후 markdown 렌더링으로 전환',

    scrollHandling:
      'assistant 답변 시작 위치로 이동하고, 짧은 streaming 답변은 하단 follow를 유지하되 사용자가 스크롤하면 따라가기를 줄임',
  },

  interviewAnswerGuides: {
    projectOverview: {
      question: '포트폴리오 AI 프로젝트는 어떤 프로젝트인가요?',
      answer:
        '정적인 포트폴리오를 방문자가 직접 질문하며 탐색할 수 있게 만든 AI 챗봇 프로젝트입니다. 핵심은 AI 모델 개발이 아니라, 포트폴리오 데이터를 구조화하고 답변 범위를 제한하는 것입니다.',
      searchTerms: ['포트폴리오 AI 프로젝트', '대화형 포트폴리오', 'AI 챗봇'],
      doNotClaim: ['AI 모델을 직접 개발했다', '대규모 AI 시스템을 구축했다'],
    },

    rag: {
      question: 'RAG를 구현했나요?',
      answer:
        '아니요. 벡터 DB 기반 RAG나 문서 임베딩 검색 시스템은 구현하지 않았습니다. 주제별 knowledge 데이터를 검색해 정적 context로 넣는 방식입니다.',
      searchTerms: ['RAG', '벡터 DB', '임베딩 검색', '정적 context 주입'],
      doNotClaim: ['RAG를 구현했다', '벡터 DB를 구축했다'],
    },

    aiModel: {
      question: 'AI 모델을 직접 개발했나요?',
      answer:
        '아니요. AI 모델을 직접 개발하거나 학습시킨 것이 아니라, 기존 LLM API를 활용했습니다. 이 프로젝트의 초점은 모델 개발보다 데이터 구조화와 답변 기준 설계입니다.',
      searchTerms: ['AI 모델 직접 개발', '모델 학습', 'LLM API'],
      doNotClaim: ['AI 모델을 직접 개발했다', 'AI 모델을 학습시켰다', 'LLM을 파인튜닝했다'],
    },

    claude: {
      question: 'Claude를 사용했나요?',
      answer:
        '네. API route에서 AI SDK와 Anthropic Claude 계열 모델을 사용해 답변을 생성합니다. 다만 모델 숙련도를 주장하기보다, 포트폴리오 프로젝트 안에서 LLM API 호출과 context 전달 흐름을 경험했다고 설명하는 것이 정확합니다.',
      searchTerms: ['Claude 계열 모델', 'Anthropic API', 'AI SDK'],
      doNotClaim: ['Claude를 능숙하게 다룬다', 'AI 엔지니어링을 전문적으로 수행했다'],
    },

    hardestPart: {
      question: '이 프로젝트에서 가장 어려웠던 점은 무엇인가요?',
      answer:
        'API를 연결하는 것보다 챗봇이 참고할 데이터를 정리하고, 어떤 질문에 어디까지 답할 수 있는지 기준을 세우는 작업이 더 어려웠습니다.',
      searchTerms: ['어려웠던 점', 'retrospective', '데이터 정리', '답변 기준'],
      doNotClaim: ['환각을 완전히 제거했다'],
    },

    technologyStack: {
      question: '기술 스택은 무엇인가요?',
      answer:
        'Next.js, React, TypeScript, AI SDK / Anthropic API, Zustand, react-markdown, 내부 searchKnowledge/contextBuilder 구조를 사용했습니다. 각 기술은 포트폴리오 화면, 챗봇 UI, API route, 상태 제어, context 구성처럼 확인 가능한 범위에서 사용했습니다.',
      searchTerms: ['기술 스택', 'Next.js', 'React', 'TypeScript', 'Zustand', 'AI SDK'],
      doNotClaim: ['기술 스택만 보고 능숙하다고 말한다'],
    },

    nextjs: {
      question: 'Next.js는 어디에 사용했나요?',
      answer:
        'Next.js는 포트폴리오의 app route 기반 페이지 구성과 /api/chat API route를 만드는 데 사용했습니다. 대규모 서비스 운영 경험처럼 표현하지 않습니다.',
      searchTerms: ['Next.js', 'API route', 'app route', '페이지 구성'],
      doNotClaim: ['대규모 Next.js 서비스를 운영했다'],
    },

    promptGuardrail: {
      question: '프롬프트 설계는 어느 정도 했나요?',
      answer:
        'system prompt에서 포트폴리오 context 안의 사실만 사용하고, 없는 수치나 성과를 추측하지 않도록 기준을 정리했습니다. 보안 수준의 AI safety 시스템이 아니라, 포트폴리오 답변 범위를 제한하는 guardrail에 가깝습니다.',
      searchTerms: ['프롬프트 설계', 'guardrail', 'system prompt', '답변 범위 제한'],
      doNotClaim: ['보안 수준의 AI 안전 시스템을 구축했다', '환각을 완전히 제거했다'],
    },

    hallucinationGuardrail: {
      question: '챗봇 환각을 어떻게 막았나요?',
      answer:
        '환각을 완전히 제거했다고 말하지 않습니다. system prompt, prepared answer, searchKnowledge, contextBuilder를 통해 포트폴리오 데이터 범위 안에서 답변하도록 제한했습니다.',
      searchTerms: ['챗봇 환각', '환각 방지', '근거 기반 답변', 'contextBuilder'],
      doNotClaim: ['챗봇 환각을 완전히 제거했다'],
    },
  },

  retrospective: {
    hardestPart:
      'AI API를 연결하는 것보다, 챗봇이 참고할 데이터를 정리하고 답변 기준을 만드는 작업이 더 어려웠습니다.',

    lesson:
      'AI를 활용한 기능에서도 모델 자체보다 데이터의 품질, 구조, 답변 기준이 중요하다는 점을 배웠습니다.',

    keyInsight: `
처음에는 AI API를 연결하는 일이 가장 어려울 것이라고 생각했습니다.
하지만 실제로는 챗봇이 참고할 포트폴리오 데이터를 정리하고, 어떤 질문에 어디까지 답변할 수 있는지 기준을 세우는 작업이 더 중요했습니다.
이 과정을 통해 AI 기능을 만들 때도 데이터 구조와 답변 범위를 명확히 설계해야 한다는 점을 배웠습니다.
    `.trim(),

    futureImprovements: [
      '데이터가 충분히 많아질 경우 RAG 도입 검토',
      '대화 이력을 활용한 후속 질문 맥락 개선',
      'prepared answer와 knowledge 검색 결과의 매칭 품질 개선',
      '질문 유형별 답변 톤 세분화',
    ],
  },

  chatbotAnswerGuide: {
    tone:
      '비전공자, 인사팀, 실무자가 모두 이해할 수 있도록 설명합니다. AI 기술을 과장하지 않고, 포트폴리오 데이터를 구조화하고 대화형 탐색 경험을 만든 프로젝트로 설명합니다.',

    shortAnswer:
      '포트폴리오 AI 프로젝트는 방문자가 제 프로젝트와 경험을 직접 질문할 수 있도록 만든 대화형 포트폴리오입니다. RAG를 구현한 것은 아니고, 정리된 포트폴리오 데이터를 context로 넣어 답변 범위를 제한하는 방식으로 구성했습니다.',

    detailedAnswer: `
포트폴리오 AI 프로젝트는 정적인 포트폴리오를 대화형으로 탐색할 수 있게 만든 프로젝트입니다.
방문자가 프로젝트 설명을 일방적으로 읽는 대신, 궁금한 점을 직접 질문하고 답변을 받을 수 있도록 챗봇을 구성했습니다.

구현 방식은 RAG가 아니라 정적 context 주입 방식입니다.
포트폴리오 데이터 규모가 크지 않기 때문에 벡터 DB를 도입하기보다, 프로젝트와 경험 데이터를 주제별로 정리해 챗봇 context로 전달하는 방식을 선택했습니다.

이 프로젝트에서 가장 중요했던 부분은 AI 모델 자체가 아니라 데이터 정리였습니다.
챗봇이 과장해서 답하지 않도록 사용 기술, 경험 범위, 금지 표현을 나누어 관리했고, 모르는 내용은 추측하지 않도록 답변 기준을 정리했습니다.
    `.trim(),

    misconceptionAnswers: {
      didYouBuildRag:
        '아니요. 이 프로젝트에서는 벡터 DB 기반 RAG를 구현하지 않았습니다. 포트폴리오 데이터 규모가 크지 않다고 판단해, 정리된 knowledge 데이터를 context로 주입하는 방식을 사용했습니다.',

      didYouTrainAiModel:
        '아니요. AI 모델을 직접 개발하거나 학습시킨 것은 아닙니다. 기존 LLM API를 활용해 포트폴리오 데이터 범위 안에서 답변하도록 구성한 프로젝트입니다.',

      areYouAiEngineer:
        'AI 엔지니어링 프로젝트라기보다는, 프론트엔드 포트폴리오에 AI 응답 기능을 붙이고 데이터를 구조화한 프로젝트에 가깝습니다.',

      areYouExpert:
        '전문가라고 표현하기보다는, 포트폴리오 프로젝트 안에서 AI API 연동, context 구성, 답변 기준 설계를 직접 경험했다고 설명하는 것이 정확합니다.',
    },
  },

  avoidStatements: [
    'RAG를 구현했다',
    '벡터 DB를 구축했다',
    'AI 모델을 직접 개발했다',
    'AI 모델을 학습시켰다',
    'AI 엔지니어링을 전문적으로 수행했다',
    '챗봇 환각을 완전히 제거했다',
    '대규모 AI 시스템을 구축했다',
    'Claude를 능숙하게 다룬다',
    'LLM을 파인튜닝했다',
    '프로덕션 수준의 AI 서비스를 운영했다',
    '기술 스택 목록만 보고 능숙하다고 말한다',
  ],
} as const;
