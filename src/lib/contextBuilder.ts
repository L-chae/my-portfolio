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
  ].join("\n");
}

function formatStoryLexGuardrails() {
  const policy = storylex.answerPolicy;

  return [
    "StoryLex answer policy:",
    `Tone: ${policy.defaultTone}`,
    `Technical terms only when asked: ${policy.technicalTermsOnlyWhenAsked}`,
    "Default focus: 영어 단어 반복 학습 서비스; 주요 프론트엔드 화면 구현; 로그인 만료 상황의 요청 흐름 정리",
    "Do not say: TypeScript로 타입 안정성을 확보했습니다.; AI 스토리 생성 모델을 직접 개발했습니다.; 모든 인증 문제를 완벽히 해결했습니다.; 전체 서비스를 혼자 개발했습니다.; 백엔드까지 담당했습니다.",
    "Style rules: 기본 답변은 쉬운 표현을 우선 사용; single-flight, subscriber queue, Axios interceptor는 구현 방식을 물을 때만 사용; 수치 없는 성과를 만들지 않음",
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
    "Do not say: 물류 시스템 전체를 구축했습니다.; 백엔드 API를 구현했습니다.; React Native를 능숙하게 다룹니다.; 디자인 시스템 전체를 구축했습니다.; 완전 차단, 100%, 0건 수정 같은 절대 표현",
    "Style rules: 기본 답변은 쉬운 표현을 우선 사용; Orval, mutator, interceptor, Zod는 구현 방식을 물을 때만 자세히 설명; 수치 근거 없는 성과를 만들지 않음",
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
  const includesCareer = sections.some((section) => section.sourceId === career.id);
  const includesStoryLex = sections.some(
    (section) => section.sourceId === storylex.id,
  );
  const includesRodia = sections.some((section) => section.sourceId === rodia.id);
  const projectGuardrails = [
    includesStoryLex ? formatStoryLexGuardrails() : "",
    includesRodia ? formatRodiaGuardrails() : "",
  ].filter(Boolean);
  let context = projectGuardrails.join("\n---\n");

  for (const section of sections) {
    const next = formatSection(section);
    const candidate = context ? `${context}\n---\n${next}` : next;
    if (candidate.length > MAX_CONTEXT_LENGTH) break;

    context = candidate;
    included.push(section.id);
  }

  if (includesCareer) {
    const guardrails = formatCareerGuardrails();
    const candidate = context ? `${context}\n---\n${guardrails}` : guardrails;

    if (candidate.length <= MAX_CONTEXT_LENGTH) {
      context = candidate;
    }
  }

  return { context, included };
}
