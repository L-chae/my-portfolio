import {
  DEFAULT_SUGGESTIONS,
  SECTION_SUGGESTION_MAP,
  SUGGESTION_MAP,
} from "@/content/suggestions";
import { findPreparedAnswer } from "@/lib/preparedAnswers";
import { searchKnowledge } from "@/lib/searchKnowledge";
import {
  findEvidenceImageIds,
  findSuggestedActionsPayload,
} from "@/lib/evidenceImages";

type Failure = {
  section: string;
  message: string;
};

const failures: Failure[] = [];

function addFailure(section: string, message: string) {
  failures.push({ section, message });
}

function assertCondition(section: string, condition: boolean, message: string) {
  if (!condition) {
    addFailure(section, message);
  }
}

function includesAll(values: readonly string[], expected: readonly string[]) {
  return expected.every((item) => values.includes(item));
}

function includesAnyText(value: string, terms: readonly string[]) {
  const normalized = value.toLowerCase();
  return terms.some((term) => normalized.includes(term.toLowerCase()));
}

function countIncludedTerms(value: string, terms: readonly string[]) {
  const normalized = value.toLowerCase();
  return terms.filter((term) => normalized.includes(term.toLowerCase())).length;
}

function resultIdsFor(question: string) {
  return searchKnowledge(question, 3).map((result) => result.id);
}

function hasEvidenceAction(question: string) {
  const params = { question, rewrittenQuery: question, sections: [] };
  const imageIds = findEvidenceImageIds(params);
  const actions = findSuggestedActionsPayload(params)?.actions ?? [];

  return {
    imageIds,
    actions,
    hasAction: imageIds.length > 0 || actions.length > 0,
  };
}

function testSuggestions() {
  const section = "suggestions";
  const storyLexRequired = [
    "StoryLex는 어떤 프로젝트인가요?",
    "StoryLex에서 어떤 역할을 맡았나요?",
    "로그인 만료 상황을 왜 고려했나요?",
  ];
  const rodiaRequired = [
    "Rodia는 어떤 프로젝트인가요?",
    "Rodia에서 어떤 역할을 맡았나요?",
    "모바일 API 디버거는 왜 만들었나요?",
  ];
  const forbiddenDefaultQuestions = [
    "401 에러 큐(Queue) 로직 설명해줘",
    "StoryLex 401 에러 해결 과정 알려줘",
    "왜 Promise Queue가 필요했나요?",
    "single-flight refresh는 어떻게 구현했나요?",
    "originalRequest._retry는 왜 썼나요?",
    "Axios interceptor 구조를 설명해 주세요.",
    "Rodia 아키텍처를 더 자세히 설명해 줘",
    "Orval을 도입한 구체적인 이유는?",
    "생성 API도 공통 요청 규칙을 어떻게 적용했나요?",
    "mutator와 interceptor는 어떻게 다른가요?",
    "Zod safeParse는 왜 썼나요?",
    "requestId는 어떻게 만들었나요?",
  ];
  const visibleSuggestionGroups: Record<string, readonly string[]> = {
    DEFAULT_SUGGESTIONS,
    ...SECTION_SUGGESTION_MAP,
    ...SUGGESTION_MAP,
  };

  assertCondition(
    section,
    includesAll(SUGGESTION_MAP.storylex ?? [], storyLexRequired),
    `StoryLex 기본 추천 질문 누락: ${storyLexRequired.join(", ")}`,
  );

  assertCondition(
    section,
    includesAll(SUGGESTION_MAP.rodia ?? [], rodiaRequired),
    `Rodia 기본 추천 질문 누락: ${rodiaRequired.join(", ")}`,
  );

  Object.entries(visibleSuggestionGroups).forEach(([groupName, questions]) => {
    forbiddenDefaultQuestions.forEach((question) => {
      assertCondition(
        section,
        !questions.includes(question),
        `[${groupName}] 기본 추천 질문에 기술 질문이 노출됨: ${question}`,
      );
    });
  });
}

function testPreparedAnswers() {
  const section = "prepared answers";
  const requiredQuestions = [
    "StoryLex는 어떤 프로젝트인가요?",
    "StoryLex에서 어떤 역할을 맡았나요?",
    "로그인 만료 상황을 왜 고려했나요?",
    "AI 스토리는 직접 만든 AI 기능인가요?",
    "401 에러 큐 로직 설명해줘",
    "Rodia는 어떤 프로젝트인가요?",
    "Rodia에서 어떤 역할을 맡았나요?",
    "Rodia에서 가장 의미 있었던 문제 해결은 무엇인가요?",
    "모바일 API 디버거는 왜 만들었나요?",
    "mutator와 interceptor는 어떻게 다른가요?",
  ];
  const storyLexBasicForbiddenTerms = [
    "single-flight",
    "subscriber queue",
    "Axios interceptor",
    "originalRequest._retry",
    "Promise Queue",
  ];
  const rodiaBasicForbiddenTerms = [
    "mutator",
    "interceptor",
    "Orval 전처리",
    "Zod safeParse",
    "tokens.json",
    "requestId",
  ];

  requiredQuestions.forEach((question) => {
    assertCondition(
      section,
      Boolean(findPreparedAnswer(question)),
      `prepared answer 누락: ${question}`,
    );
  });

  [
    "StoryLex는 어떤 프로젝트인가요?",
    "StoryLex에서 어떤 역할을 맡았나요?",
  ].forEach((question) => {
    const answer = findPreparedAnswer(question) ?? "";
    assertCondition(
      section,
      !includesAnyText(answer, storyLexBasicForbiddenTerms),
      `StoryLex 기본 답변에 기술 용어 과노출: ${question}`,
    );
  });

  ["Rodia는 어떤 프로젝트인가요?", "Rodia에서 어떤 역할을 맡았나요?"].forEach(
    (question) => {
      const answer = findPreparedAnswer(question) ?? "";
      assertCondition(
        section,
        !includesAnyText(answer, rodiaBasicForbiddenTerms),
        `Rodia 기본 답변에 기술 용어 과노출: ${question}`,
      );
    },
  );

  const storyLexTechAnswer = findPreparedAnswer("401 에러 큐 로직 설명해줘") ?? "";
  assertCondition(
    section,
    countIncludedTerms(storyLexTechAnswer, ["토큰 재발급", "대기", "재시도"]) >=
      1,
    "StoryLex 기술 답변에 핵심어가 부족함: 토큰 재발급/대기/재시도",
  );

  const rodiaTechAnswer =
    findPreparedAnswer("mutator와 interceptor는 어떻게 다른가요?") ?? "";
  assertCondition(
    section,
    countIncludedTerms(rodiaTechAnswer, ["mutator", "interceptor", "공통", "요청"]) >=
      2,
    "Rodia 기술 답변에 핵심어가 부족함: mutator/interceptor/공통/요청",
  );
}

function testSearchIntent() {
  const section = "search intent";
  const basicChunkTerms = [
    "summary",
    "publicDescription",
    "contributionScope",
    "interviewAnswers",
  ];
  const storyLexBasicQuestions = [
    "StoryLex는 어떤 프로젝트인가요?",
    "StoryLex에서 어떤 역할을 맡았나요?",
  ];
  const rodiaBasicQuestions = [
    "Rodia는 어떤 프로젝트인가요?",
    "Rodia에서 어떤 역할을 맡았나요?",
  ];

  storyLexBasicQuestions.forEach((question) => {
    const ids = resultIdsFor(question);
    assertCondition(
      section,
      ids.some((id) => basicChunkTerms.some((term) => id.includes(term))),
      `StoryLex 기본 질문이 쉬운 context를 잡지 못함: ${question} / ${ids.join(", ")}`,
    );
    assertCondition(
      section,
      !ids.slice(0, 2).every((id) => id.includes("technicalDetail")),
      `StoryLex 기본 질문 상위 2개가 모두 technicalDetail임: ${question}`,
    );
    assertCondition(
      section,
      !ids[0]?.includes("authFlow.technicalDetail"),
      `StoryLex 기본 질문 최상위가 authFlow.technicalDetail임: ${question}`,
    );
  });

  ["401 에러 큐 로직 설명해줘", "single-flight refresh는 어떻게 구현했나요?"].forEach(
    (question) => {
      const ids = resultIdsFor(question);
      assertCondition(
        section,
        ids.some(
          (id) => id.includes("authFlow") && id.includes("technicalDetail"),
        ),
        `StoryLex 기술 질문이 authFlow.technicalDetail을 잡지 못함: ${question} / ${ids.join(", ")}`,
      );
    },
  );

  rodiaBasicQuestions.forEach((question) => {
    const ids = resultIdsFor(question);
    assertCondition(
      section,
      ids.some((id) => basicChunkTerms.some((term) => id.includes(term))),
      `Rodia 기본 질문이 쉬운 context를 잡지 못함: ${question} / ${ids.join(", ")}`,
    );
    assertCondition(
      section,
      !ids.slice(0, 2).every((id) => id.includes("technicalDetail")),
      `Rodia 기본 질문 상위 2개가 모두 technicalDetail임: ${question}`,
    );
    assertCondition(
      section,
      ![
        "customInstance.technicalDetail",
        "apiAutomation.technicalDetail",
        "designTokens.technicalDetail",
      ].some((term) => ids[0]?.includes(term)),
      `Rodia 기본 질문 최상위가 technicalDetail임: ${question}`,
    );
  });

  [
    {
      question: "mutator와 interceptor는 어떻게 다른가요?",
      expected: ["customInstance", "technicalDetail"],
    },
    {
      question: "Orval 전처리는 왜 필요했나요?",
      expected: ["apiAutomation", "technicalDetail"],
    },
    {
      question: "디자인 토큰은 어떻게 관리했나요?",
      expected: ["designTokens", "technicalDetail"],
    },
  ].forEach(({ question, expected }) => {
    const ids = resultIdsFor(question);
    assertCondition(
      section,
      ids.some((id) => expected.every((term) => id.includes(term))),
      `Rodia 기술 질문이 기대 context를 잡지 못함: ${question} / ${ids.join(", ")}`,
    );
  });
}

function testEvidenceActions() {
  const section = "evidence actions";
  const noActionQuestions = [
    "Rodia는 어떤 프로젝트인가요?",
    "Rodia에서 어떤 역할을 맡았나요?",
    "Rodia에서 가장 의미 있었던 문제 해결은 무엇인가요?",
    "Rodia 기술 스택은 무엇인가요?",
    "StoryLex는 어떤 프로젝트인가요?",
    "StoryLex에서 어떤 역할을 맡았나요?",
    "로그인 만료 상황을 왜 고려했나요?",
    "StoryLex 기술 스택은 무엇인가요?",
  ];
  const actionQuestions = [
    "Rodia API 디버깅 증거 보여줘",
    "Rodia cURL 재현 흐름 보여줘",
    "Rodia API Debug Logs 캡처 있어?",
    "Rodia 모바일 디버깅 GIF 보여줘",
    "Rodia API 로그 캡처 보여줘",
    "StoryLex 토큰 재발급 성공 캡처 보여줘",
    "StoryLex refresh 실패 증거 있어?",
    "StoryLex MSW 검증 흐름 보여줘",
    "StoryLex 401 재현 캡처 볼 수 있나요?",
    "StoryLex Network 확인 화면 있어?",
  ];

  noActionQuestions.forEach((question) => {
    const result = hasEvidenceAction(question);
    assertCondition(
      section,
      !result.hasAction,
      `기본 질문에 evidence action이 붙음: ${question} / ids=${result.imageIds.join(",")} actions=${result.actions.map((action) => action.id).join(",")}`,
    );
  });

  actionQuestions.forEach((question) => {
    const result = hasEvidenceAction(question);
    assertCondition(
      section,
      result.hasAction,
      `증거 질문에 evidence action이 없음: ${question}`,
    );
  });
}

const tests = [
  ["suggestions", testSuggestions],
  ["prepared answers", testPreparedAnswers],
  ["search intent", testSearchIntent],
  ["evidence actions", testEvidenceActions],
] as const;

for (const [name, test] of tests) {
  const beforeCount = failures.length;
  test();
  const failedCount = failures.length - beforeCount;

  console.log(
    failedCount === 0
      ? `[PASS] ${name}: passed`
      : `[FAIL] ${name}: ${failedCount} failure(s)`,
  );
}

if (failures.length > 0) {
  console.log(`\nChat knowledge quality test failed: ${failures.length} failures`);

  failures.forEach((failure, index) => {
    console.log(`${index + 1}. [${failure.section}] ${failure.message}`);
  });

  process.exitCode = 1;
} else {
  console.log("\nChat knowledge quality test passed");
}
