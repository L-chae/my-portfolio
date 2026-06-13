<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
코드 수정 범위를 최소화해서 데이터셋 품질만 안정화해주세요.

수정 대상:
- src/content/knowledge/preparedAnswers.ts

참고 대상:
- src/content/knowledge/rodia.ts
- src/content/knowledge/storylex.ts
- src/content/suggestions.ts
- src/content/projectsMock.ts

수정 금지:
- src/lib/searchKnowledge.ts
- src/lib/contextBuilder.ts
- src/lib/systemPrompt.ts
- src/lib/evidenceImages.ts
- src/lib/preparedAnswers.ts
- src/hooks/useChat.ts
- src/components/chat/*
- src/app/api/chat/route.ts
- UI 컴포넌트 전체

목표:
1. preparedAnswers.ts의 답변이 knowledge 데이터, 특히 rodia.ts/storylex.ts의 근거 범위를 벗어나지 않게 수정한다.
2. Rodia 답변에서 근거가 불명확한 Feature API, Mapper, React Query 훅 생성 표현은 제거하거나 rodia.ts에 있는 표현으로 대체한다.
3. Rodia API 관련 답변은 OpenAPI spec 전처리, Orval 생성, customInstance, apiClient, interceptor, 인앱 API 디버거 중심으로 맞춘다.
4. StoryLex 답변은 auth401, refresh 중복 방지, refresh 실패 처리, MSW 검증, 서버 상태/화면 상태 분리 기준으로 맞춘다.
5. 새로운 데이터 구조, 새 타입, 새 기능은 추가하지 않는다.
6. preparedAnswers key는 가능하면 유지하고, answer 내용만 수정한다.

수정 후 보고:
- 변경한 prepared answer key 목록
- 제거한 근거 부족 표현
- 대체한 표현
- lint 결과
- build 결과

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
