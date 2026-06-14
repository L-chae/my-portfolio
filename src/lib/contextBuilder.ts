import type { KnowledgeSearchResult } from "@/lib/searchKnowledge";
import { career } from "@/content/knowledge/career";
import { rodia } from "@/content/knowledge/rodia";
import { storylex } from "@/content/knowledge/storylex";

const MAX_CONTEXT_LENGTH = 4200;

function formatCareerGuardrails() {
  const hivelab = career.hivelab;

  return [
    "Career answer guardrails:",
    `Role/period/title: ${hivelab.role}, ${hivelab.period.label}, ${hivelab.title}`,
    `Answer direction: ${hivelab.chatbotAnswerGuide.tone}`,
    `Do not say: ${hivelab.avoidStatements.join("; ")}`,
    `Do not disclose: ${hivelab.publicDisclosure.doNotMention.join("; ")}`,
    "Clarification: HiveLab is a designer work experience, not frontend developer production work.",
    "Clarification: Explain it as AI data quality management, design data organization, and markup preparation experience.",
  ].join("\n");
}

function formatStoryLexGuardrails() {
  const policy = storylex.answerPolicy;

  return [
    "StoryLex answer policy:",
    `Tone: ${policy.defaultTone}`,
    `Technical terms only when asked: ${policy.technicalTermsOnlyWhenAsked}`,
    "Default focus: 영어 단어 반복 학습 서비스; 주요 프론트엔드 화면 구현; 로그인 만료 상황의 요청 흐름 정리",
    "AI story scope: AI 스토리는 AI 모델을 직접 개발하거나 학습시킨 경험으로 설명하지 않음. 오답 단어를 문맥 속에서 다시 접하게 하는 학습 기능으로 설명.",
    "AI story ownership: 별도 팀, 외부 모델 제공사, 백엔드 팀 담당 여부는 Context에 명확히 없으면 말하지 않음.",
    "Frontend scope: 화면과 API 통신 흐름을 연결한 범위로 제한. 스토리 생성 모델 자체 구현으로 말하지 않음.",
    "Tech stack clarification: StoryLex는 React, JavaScript JSX, React Query, Zustand, Axios, MSW, Recharts, Vite 사용 경험으로 설명. StoryLex에서 TypeScript를 사용했다고 말하지 않음.",
    "Do not say: TypeScript로 타입 안정성을 확보했습니다.; AI 스토리 생성 모델을 직접 개발했습니다.; 스토리 생성 모델은 별도 팀에서 담당했습니다.; 모든 인증 문제를 완벽히 해결했습니다.; 전체 서비스를 혼자 개발했습니다.; 백엔드까지 담당했습니다.",
    "Style rules: 기본 답변은 쉬운 표현을 우선 사용; single-flight, subscriber queue, Axios interceptor는 구현 방식을 물을 때만 사용; 수치 없는 성과를 만들지 않음; '~하죠', '~했어요', '좋은 질문입니다' 같은 캐주얼한 표현을 사용하지 않음",
  ].join("\n");
}

function formatRodiaGuardrails() {
  const policy = rodia.answerPolicy;

  return [
    "Rodia answer policy:",
    `Tone: ${policy.defaultTone}`,
    `Technical terms only when asked: ${policy.technicalTermsOnlyWhenAsked}`,
    `Allowed numbers only: ${policy.allowedNumbers.join("; ")}`,
    "Default focus: 화물 운송 중개 플랫폼; React Native 앱 화면 구현; API 명세 변경 대응; 모바일 API 디버깅 흐름; 역할별 UI 정책 분리; 디자인 토큰 검증 흐름",
    "Token clarification: Rodia에서 디자인, JSON, CSS, Zod, 스키마와 함께 말하는 토큰은 인증 토큰이 아니라 디자인 토큰.",
    "API clarification: Rodia API 공통 요청 흐름을 설명할 때 StoryLex의 refresh token 재발급 흐름을 섞지 않음.",
    "Common request scope: API 기본 설정, 에러 처리, 로그 수집, cURL 재현 흐름 중심으로 설명. Rodia에서 로그인 만료 시 토큰 재발급을 구현했다고 말하지 않음.",
    "Tech stack clarification: Rodia는 React Native, Expo, TypeScript, OpenAPI/Orval, Axios, Zod, pnpm Workspaces/Monorepo 사용 경험으로 설명. Rodia를 Next.js 풀스택 프로젝트로 말하지 않음.",
    "Design token scope: Web/App 스타일 기준을 일관되게 맞추기 위한 관리 흐름으로 설명. 디자인 시스템 전체 구축이나 모든 앱 자동 반영처럼 단정하지 않음.",
    "Do not say: 물류 시스템 전체를 구축했습니다.; 백엔드 API를 구현했습니다.; React Native를 능숙하게 다룹니다.; 디자인 시스템 전체를 구축했습니다.; 로그인 만료 시 토큰 재발급을 공통 요청 규칙으로 처리했습니다.; 완전 차단, 100%, 0건 수정 같은 절대 표현",
    "Style rules: 기본 답변은 쉬운 표현을 우선 사용; Orval, mutator, interceptor, Zod는 구현 방식을 물을 때만 자세히 설명; 수치 근거 없는 성과를 만들지 않음; '~하죠', '~했어요', '좋은 질문입니다' 같은 캐주얼한 표현을 사용하지 않음",
  ].join("\n");
}

function formatSection(section: KnowledgeSearchResult) {
  return [
    `Title: ${section.title}`,
    `Source: ${section.sourceId}`,
    `Summary: ${section.summary}`,
    `Explanation: ${section.explanation}`,
    section.tags.length > 0 ? `Key facts: ${section.tags.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildContextPrompt(sections: readonly KnowledgeSearchResult[]) {
  const included: string[] = [];

  const includesCareer = sections.some(
    (section) => section.sourceId === career.id,
  );
  const includesStoryLex = sections.some(
    (section) => section.sourceId === storylex.id,
  );
  const includesRodia = sections.some(
    (section) => section.sourceId === rodia.id,
  );

  const guardrails = [
    includesStoryLex ? formatStoryLexGuardrails() : "",
    includesRodia ? formatRodiaGuardrails() : "",
    includesCareer ? formatCareerGuardrails() : "",
  ].filter(Boolean);

  let context = guardrails.join("\n---\n");

  for (const section of sections) {
    const next = formatSection(section);
    const candidate = context ? `${context}\n---\n${next}` : next;

    if (candidate.length > MAX_CONTEXT_LENGTH) break;

    context = candidate;
    included.push(section.id);
  }

  return { context, included };
}
