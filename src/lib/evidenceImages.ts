import * as knowledge from "@/content/knowledge";
import { rodia } from "@/content/knowledge/rodia";
import { storylex } from "@/content/knowledge/storylex";
import type { EvidenceImage, KnowledgeSection } from "@/types/knowledge";
import type { KnowledgeSearchResult } from "@/lib/searchKnowledge";

type KnowledgeMap = Record<string, KnowledgeSection>;

export interface SuggestedAction {
  id: string;
  label: string;
  prompt: string;
}

export interface SuggestedActionsPayload {
  title: string;
  description: string;
  actions: SuggestedAction[];
}

export interface EvidenceImageGroup {
  title: string;
  description: string;
  imageIds: string[];
}

const STORYLEX_AUTH_EVIDENCE_IDS = [
  "storylex-auth-refresh-success",
  "storylex-auth-refresh-failure",
] as const;

const RODIA_API_DEBUG_EVIDENCE_ID = "rodia-api-debug-curl" as const;

const STORYLEX_VISUAL_EVIDENCE_TERMS = [
  "증거",
  "캡처",
  "캡쳐",
  "스크린샷",
  "화면",
  "이미지",
  "gif",
  "network",
  "네트워크",
  "devtools",
  "검증",
  "재현",
  "확인",
  "proof",
];

const STORYLEX_DIRECT_VIEW_TERMS = [
  "보여",
  "볼수",
  "열어",
  "띄워",
  "보고싶",
  "보고싶어",
];

const STORYLEX_AUTH_TOPIC_TERMS = [
  "storylex",
  "스토리렉스",
  "스토리랙스",
  "401",
  "refresh",
  "로그인만료",
  "토큰재발급",
  "msw",
  "network",
  "네트워크",
];

const STORYLEX_STRONG_EVIDENCE_TERMS = [
  "msw",
  "network",
  "네트워크",
  "토큰재발급성공",
  "토큰재발급실패",
  "refresh성공",
  "refresh실패",
  "로그인만료재현",
];

const RODIA_EVIDENCE_TOPIC_TERMS = [
  "rodia",
  "로디아",
  "모바일api디버거",
  "apidebuglogs",
  "api debug logs",
  "api로그",
  "curl",
  "모바일디버깅",
  "인앱api디버거",
];

const RODIA_API_DEBUG_TOPIC_TERMS = [
  "인앱api디버거",
  "인앱디버거",
  "api디버거",
  "api디버깅",
  "apidebuglogs",
  "api debug logs",
  "debuglogs",
  "디버그로그",
  "curl",
  "모바일통신",
  "모바일api",
  "모바일디버깅",
  "통신이슈",
  "통신문제",
  "요청재현",
  "api로그",
  "네트워크",
  "network",
];

const SUCCESS_TERMS = ["성공", "복구", "200", "재시도성공", "refresh성공"];

const FAILURE_TERMS = [
  "실패",
  "400",
  "토큰삭제",
  "localstorage",
  "로그인복귀",
  "세션정리",
  "refresh실패",
  "로그인",
  "삭제",
  "정리",
];

const CONCEPT_TERMS = [
  "queue",
  "큐",
  "로직",
  "원리",
  "왜",
  "설명",
  "구조",
  "동작방식",
  "뭐야",
  "무엇",
  "필요",
];

const TROUBLESHOOTING_TERMS = [
  "해결과정",
  "문제해결",
  "해결했",
  "해결",
  "트러블슈팅",
  "처리",
  "대응",
];

const EVIDENCE_AVAILABILITY_TERMS = [
  "검증",
  "증거",
  "캡처있",
  "캡쳐있",
  "스크린샷있",
  "확인",
];

const STORYLEX_AUTH_SUGGESTED_ACTIONS = {
  success: {
    id: "storylex-auth-refresh-success-capture",
    label: "refresh 성공 흐름 보기",
    prompt: "StoryLex 401 refresh 성공 캡처 보여줘",
  },
  failure: {
    id: "storylex-auth-refresh-failure-capture",
    label: "refresh 실패 흐름 보기",
    prompt: "StoryLex 401 refresh 실패 캡처 보여줘",
  },
  proof: {
    id: "storylex-auth-refresh-proof-captures",
    label: "Network 검증 흐름 보기",
    prompt: "StoryLex 401 검증 캡처 보여줘",
  },
} satisfies Record<string, SuggestedAction>;

const RODIA_API_DEBUG_SUGGESTED_ACTION = {
  id: "rodia-api-debug-curl-capture",
  label: "API Debug Logs 흐름 보기",
  prompt: "Rodia API Debug Logs 캡처 보여줘",
} satisfies SuggestedAction;

const STORYLEX_AUTH_ACTION_META = {
  title: "관련 검증 자료",
  description:
    "이 답변의 인증 흐름은 DevTools Network 캡처로 확인할 수 있습니다.",
} as const;

const STORYLEX_MSW_ACTION_META = {
  title: "MSW 검증 자료",
  description:
    "MSW로 재현한 refresh 성공/실패 흐름을 캡처로 확인할 수 있습니다.",
} as const;

const RODIA_API_DEBUG_ACTION_META = {
  title: "API Debug Logs 자료",
  description:
    "모바일에서는 Network 탭을 바로 공유하기 어렵기 때문에, 앱 내부 로그와 cURL 재현 흐름을 캡처로 확인할 수 있습니다.",
} as const;

const STORYLEX_AUTH_EVIDENCE_GROUPS = {
  combined: {
    title: "검증 캡처 해석",
    description:
      "아래 캡처는 StoryLex의 401 인증 동시성 문제를 MSW와 DevTools Network로 재현한 결과입니다. 성공 흐름에서는 만료된 access token으로 인해 me, summary, today 요청이 401을 반환한 뒤 refresh가 1회만 호출되고, 기존 요청들이 새 토큰으로 재시도되어 200으로 복구됩니다. 실패 흐름에서는 refresh 실패 후 추가 재시도 없이 token과 userInfo가 정리되고 로그인 화면으로 복귀합니다.",
    imageIds: [
      "storylex-auth-refresh-success",
      "storylex-auth-refresh-failure",
    ],
  },
  success: {
    title: "refresh 성공 흐름 캡처",
    description:
      "이 캡처는 만료된 access token으로 인해 여러 요청이 401을 반환한 뒤, refresh 요청이 1회만 성공하고 기존 요청들이 새 access token으로 재시도되어 200으로 복구되는 흐름을 보여줍니다.",
    imageIds: ["storylex-auth-refresh-success"],
  },
  failure: {
    title: "refresh 실패 흐름 캡처",
    description:
      "이 캡처는 여러 요청이 401을 반환한 뒤 refresh가 실패했을 때, 추가 재시도를 반복하지 않고 token과 userInfo를 정리한 뒤 로그인 화면으로 복귀하는 흐름을 보여줍니다.",
    imageIds: ["storylex-auth-refresh-failure"],
  },
} satisfies Record<string, EvidenceImageGroup>;

const RODIA_API_DEBUG_EVIDENCE_GROUP = {
  title: "API Debug Logs 흐름",
  description:
    "이 자료는 React Native 앱 내부에서 API 요청 실패 로그를 확인하고, cURL로 같은 요청을 재현 가능한 형태로 공유하는 흐름을 보여줍니다.",
  imageIds: [RODIA_API_DEBUG_EVIDENCE_ID],
} satisfies EvidenceImageGroup;

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function isEvidenceImage(value: unknown): value is EvidenceImage {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Partial<EvidenceImage>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.src === "string" &&
    typeof candidate.alt === "string"
  );
}

function createEvidenceImageRegistry() {
  return Object.values(knowledge as KnowledgeMap).reduce<
    Record<string, EvidenceImage>
  >((registry, section) => {
    Object.entries(section.evidenceImages ?? {}).forEach(([id, image]) => {
      if (image.id === id && isEvidenceImage(image)) {
        registry[id] = image;
      }
    });

    return registry;
  }, {});
}

export const evidenceImagesById = createEvidenceImageRegistry();

export function getEvidenceImagesByIds(ids: readonly string[] = []) {
  return ids
    .map((id) => evidenceImagesById[id])
    .filter((image): image is EvidenceImage => Boolean(image));
}

export function getEvidenceImageGroupByIds(ids: readonly string[] = []) {
  const validIds = new Set(
    getEvidenceImagesByIds(ids).map((image) => image.id),
  );

  const hasSuccess = validIds.has("storylex-auth-refresh-success");
  const hasFailure = validIds.has("storylex-auth-refresh-failure");
  const hasRodiaApiDebug = validIds.has(RODIA_API_DEBUG_EVIDENCE_ID);

  if (hasRodiaApiDebug) {
    return RODIA_API_DEBUG_EVIDENCE_GROUP;
  }

  if (hasSuccess && hasFailure) {
    return STORYLEX_AUTH_EVIDENCE_GROUPS.combined;
  }

  if (hasSuccess) {
    return STORYLEX_AUTH_EVIDENCE_GROUPS.success;
  }

  if (hasFailure) {
    return STORYLEX_AUTH_EVIDENCE_GROUPS.failure;
  }

  return null;
}

function hasAnyTerm(text: string, terms: readonly string[]) {
  return terms.some((term) => text.includes(normalize(term)));
}

function hasDirectImageIntent(text: string) {
  return (
    hasEvidenceIntent(text) && hasAnyTerm(text, STORYLEX_DIRECT_VIEW_TERMS)
  );
}

function hasEvidenceIntent(text: string) {
  return hasAnyTerm(text, STORYLEX_VISUAL_EVIDENCE_TERMS);
}

function hasStoryLexEvidenceTopic(text: string) {
  return hasAnyTerm(text, STORYLEX_AUTH_TOPIC_TERMS);
}

function hasStoryLexEvidenceIntent(text: string) {
  return (
    hasEvidenceIntent(text) || hasAnyTerm(text, STORYLEX_STRONG_EVIDENCE_TERMS)
  );
}

function hasRodiaEvidenceTopic(text: string) {
  return hasAnyTerm(text, RODIA_EVIDENCE_TOPIC_TERMS);
}

function hasRodiaEvidenceIntent(text: string) {
  return (
    hasEvidenceIntent(text) || hasAnyTerm(text, RODIA_API_DEBUG_TOPIC_TERMS)
  );
}

function isStoryLexQuestion(
  text: string,
  sections: readonly Pick<KnowledgeSearchResult, "sourceId">[],
) {
  return (
    text.includes("storylex") ||
    text.includes("스토리렉스") ||
    text.includes("스토리랙스") ||
    sections.some((section) => section.sourceId === "storylex")
  );
}

function isRodiaQuestion(
  text: string,
  sections: readonly Pick<KnowledgeSearchResult, "sourceId">[],
) {
  return (
    text.includes("rodia") ||
    text.includes("로디아") ||
    sections.some((section) => section.sourceId === "rodia")
  );
}

function hasRodiaApiDebugIntent(text: string) {
  return hasAnyTerm(text, RODIA_API_DEBUG_TOPIC_TERMS);
}

function getStringArrayProperty(value: unknown, key: string) {
  if (typeof value !== "object" || value === null || !(key in value)) {
    return [];
  }

  const candidate = (value as Record<string, unknown>)[key];

  if (!Array.isArray(candidate)) {
    return [];
  }

  return candidate.filter((item): item is string => typeof item === "string");
}

function getRodiaFollowUpEvidenceIds(text: string) {
  const matchedQuestion = rodia.followUpQuestions.find((item) => {
    const normalizedQuestion = normalize(item.question);
    return text.includes(normalizedQuestion) || normalizedQuestion.includes(text);
  });

  return getStringArrayProperty(matchedQuestion, "evidenceImageIds");
}

function getStoryLexFollowUpEvidenceIds(text: string) {
  const matchedQuestion = storylex.followUpQuestions.find((item) => {
    const normalizedQuestion = normalize(item.question);
    return text.includes(normalizedQuestion) || normalizedQuestion.includes(text);
  });

  return matchedQuestion?.evidenceImageIds ?? [];
}

function filterExistingEvidenceIds(ids: readonly string[]) {
  return ids.filter((id) => Boolean(evidenceImagesById[id]));
}

export function findEvidenceImageIds(params: {
  question: string;
  rewrittenQuery: string;
  sections: readonly Pick<KnowledgeSearchResult, "sourceId">[];
}) {
  const text = normalize(`${params.question} ${params.rewrittenQuery}`);

  if (isRodiaQuestion(text, params.sections) && hasRodiaEvidenceTopic(text)) {
    if (!hasRodiaEvidenceIntent(text)) {
      return [];
    }

    if (!hasDirectImageIntent(text)) {
      return [];
    }

    const followUpEvidenceIds = getRodiaFollowUpEvidenceIds(text);

    if (followUpEvidenceIds.length > 0) {
      return filterExistingEvidenceIds(followUpEvidenceIds);
    }

    if (hasRodiaApiDebugIntent(text)) {
      return filterExistingEvidenceIds([RODIA_API_DEBUG_EVIDENCE_ID]);
    }

    return [];
  }

  if (
    !isStoryLexQuestion(text, params.sections) ||
    !hasStoryLexEvidenceTopic(text)
  ) {
    return [];
  }

  if (!hasStoryLexEvidenceIntent(text)) {
    return [];
  }

  if (!hasDirectImageIntent(text)) {
    return [];
  }

  const followUpEvidenceIds = getStoryLexFollowUpEvidenceIds(text);

  if (followUpEvidenceIds.length > 0) {
    return filterExistingEvidenceIds(followUpEvidenceIds);
  }

  if (hasAnyTerm(text, SUCCESS_TERMS) && !hasAnyTerm(text, FAILURE_TERMS)) {
    return filterExistingEvidenceIds(["storylex-auth-refresh-success"]);
  }

  if (hasAnyTerm(text, FAILURE_TERMS) && !hasAnyTerm(text, SUCCESS_TERMS)) {
    return filterExistingEvidenceIds(["storylex-auth-refresh-failure"]);
  }

  return filterExistingEvidenceIds(STORYLEX_AUTH_EVIDENCE_IDS);
}

export function findSuggestedActions(params: {
  question: string;
  rewrittenQuery: string;
  sections: readonly Pick<KnowledgeSearchResult, "sourceId">[];
}) {
  return findSuggestedActionsPayload(params)?.actions ?? [];
}

export function findSuggestedActionsPayload(params: {
  question: string;
  rewrittenQuery: string;
  sections: readonly Pick<KnowledgeSearchResult, "sourceId">[];
}): SuggestedActionsPayload | null {
  const text = normalize(`${params.question} ${params.rewrittenQuery}`);

  if (
    isRodiaQuestion(text, params.sections) &&
    hasRodiaEvidenceTopic(text) &&
    hasRodiaEvidenceIntent(text) &&
    !hasDirectImageIntent(text) &&
    hasRodiaApiDebugIntent(text)
  ) {
    return {
      ...RODIA_API_DEBUG_ACTION_META,
      actions: [RODIA_API_DEBUG_SUGGESTED_ACTION],
    };
  }

  if (
    !isStoryLexQuestion(text, params.sections) ||
    !hasStoryLexEvidenceTopic(text) ||
    !hasStoryLexEvidenceIntent(text) ||
    hasDirectImageIntent(text)
  ) {
    return null;
  }

  if (!hasAnyTerm(text, STORYLEX_AUTH_TOPIC_TERMS)) {
    return null;
  }

  if (hasAnyTerm(text, CONCEPT_TERMS)) {
    return null;
  }

  if (hasAnyTerm(text, SUCCESS_TERMS) && !hasAnyTerm(text, FAILURE_TERMS)) {
    return {
      ...STORYLEX_AUTH_ACTION_META,
      actions: [STORYLEX_AUTH_SUGGESTED_ACTIONS.success],
    };
  }

  if (hasAnyTerm(text, FAILURE_TERMS) && !hasAnyTerm(text, SUCCESS_TERMS)) {
    return {
      ...STORYLEX_AUTH_ACTION_META,
      actions: [STORYLEX_AUTH_SUGGESTED_ACTIONS.failure],
    };
  }

  if (hasAnyTerm(text, ["msw", "검증", "재현", "proof"])) {
    return {
      ...(hasAnyTerm(text, ["msw"])
        ? STORYLEX_MSW_ACTION_META
        : STORYLEX_AUTH_ACTION_META),
      actions: [STORYLEX_AUTH_SUGGESTED_ACTIONS.proof],
    };
  }

  if (
    !hasAnyTerm(text, TROUBLESHOOTING_TERMS) &&
    !hasAnyTerm(text, EVIDENCE_AVAILABILITY_TERMS)
  ) {
    return null;
  }

  return {
    ...STORYLEX_AUTH_ACTION_META,
    actions: [
      STORYLEX_AUTH_SUGGESTED_ACTIONS.success,
      STORYLEX_AUTH_SUGGESTED_ACTIONS.failure,
    ],
  };
}
