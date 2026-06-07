import { searchKnowledge } from "@/lib/searchKnowledge";
import { SUGGESTION_MAP } from "@/content/suggestions";

function getTopicHint(query: string) {
  const results = searchKnowledge(query, 1);
  return results[0]?.sourceId ?? null;
}
const testScenarios = [
  { query: "Rodia 디자인 시스템 설명해줘", expectedKey: "rodia" },
  { query: "StoryLex 401 에러 해결", expectedKey: "storylex" },
  { query: "개발자로서 핵심 가치", expectedKey: "identity" },
  { query: "HiveLab에서는 어떤 일을 했어?", expectedKey: "career" },
  { query: "AI 도구는 어떻게 검증해서 써?", expectedKey: "ai-engineering" },
  { query: "버그 생기면 어떻게 해결해?", expectedKey: "problem-solving" },
  { query: "오늘 점심 뭐 먹지?", expectedKey: null } // Rejection 테스트
];

console.log("🚀 채팅 맥락 유지 및 후속 질문 갱신 테스트 시작\n");

testScenarios.forEach(({ query, expectedKey }, index) => {
  const matchedKey = getTopicHint(query);
  const suggestions = matchedKey ? SUGGESTION_MAP[matchedKey] : ["기본 질문 1", "기본 질문 2"];

  console.log(`[Scenario ${index + 1}] 질문: "${query}"`);
  console.log(` - 매칭된 키: ${matchedKey} (기대값: ${expectedKey})`);
  console.log(` - 추천 항목 수: ${suggestions.length}개`);
  
  if (matchedKey === expectedKey) {
    console.log(` ✅ [PASS] 키 매칭 성공`);
  } else {
    console.log(` ❌ [FAIL] 키 매칭 실패`);
  }
  
  if (suggestions.length > 0) {
    console.log(` - 샘플 추천: ${suggestions[0]}`);
  }
  console.log("--------------------------------------------------");
});
