import { searchKnowledge } from "@/lib/searchKnowledge";

interface TestCase {
  category: string;
  intent: string; // 이 테스트가 검증하려는 알고리즘의 기능
  query: string;
}

const testCases: TestCase[] = [
  // ==========================================
  // 1. 대소문자 및 기본 영문 매칭 (Case Insensitivity)
  // ==========================================
  { category: "English", intent: "대소문자 섞임", query: "zUsTaNd" },
  { category: "English", intent: "띄어쓰기가 포함된 영문 복합어", query: "Feature API" },

  // ==========================================
  // 2. 특수문자 제거 및 정제 (Sanitization)
  // ==========================================
  { category: "Special-Char", intent: "문장 부호가 붙은 단일 키워드", query: "오버엔지니어링!!?" },
  { category: "Special-Char", intent: "괄호 및 기호 포함", query: "[상태관리]는 어떻게?" },
  { category: "Special-Char", intent: "숫자와 기호의 조합", query: "401에러..." },

  // ==========================================
  // 3. 띄어쓰기 무시 매칭 (noSpaceQuery)
  // ==========================================
  { category: "Spacing", intent: "동의어 사전에 있는 단어의 띄어쓰기", query: "상태 관리를 어떻게?" },
  { category: "Spacing", intent: "프로젝트명 띄어쓰기 오류", query: "Story Lex" },
  { category: "Spacing", intent: "극단적인 띄어쓰기 파편화", query: "아 키 텍 처" },

  // ==========================================
  // 4. 한국어 조사 제거 (간이 형태소 분석)
  // ==========================================
  { category: "Korean-Postposition", intent: "목적격 조사 (을/를)", query: "프론트엔드를 선택한 이유" },
  { category: "Korean-Postposition", intent: "주격/부사격 조사 (가/에서)", query: "스토리렉스에서 겪은 문제" },
  { category: "Korean-Postposition", intent: "복합 조사 (으로는)", query: "상태관리로는 뭘 썼어?" },

  // ==========================================
  // 5. 동의어 및 문맥 매칭 (Synonym & Semantic)
  // ==========================================
  { category: "Synonym", intent: "동의어(인증) -> 관련 키워드(401, 토큰) 도출", query: "인증 에러 해결법" },
  { category: "Synonym", intent: "동의어(협업) -> 관련 키워드(소통) 도출", query: "팀원들과 협업할 때 원칙" },
  { category: "Synonym", intent: "추상적 질문 -> 구체적 강점 도출", query: "본인만의 강점이 뭔가요?" },

  // ==========================================
  // 6. 실전 복합 문장 (Real User Prompts)
  // ==========================================
  { category: "Real-World", intent: "기술 스택 교차 검증", query: "StoryLex에서 React Query와 Zustand를 나눈 이유?" },
  { category: "Real-World", intent: "서술형 질문 (가중치 중첩 테스트)", query: "기획자나 디자이너랑 소통할 때 어떻게 설명해?" },
  { category: "Real-World", intent: "단답형 질문", query: "가장 큰 실패 경험" },

  // ==========================================
  // 7. 노이즈 및 예외 처리 (Edge Cases & Rejection)
  // ==========================================
  { category: "Rejection", intent: "아예 관련 없는 도메인 질문 (임계점 방어)", query: "오늘 점심 메뉴 추천해 줘" },
  { category: "Rejection", intent: "인사말 (임계점 방어)", query: "안녕하세요 반가워요" },
  { category: "Rejection", intent: "너무 짧은 의미 없는 단어", query: "그" },
  { category: "Rejection", intent: "데이터에 없는 다른 기술스택 질문", query: "Vue.js나 Angular 써봤어?" }
];

console.log("==================================================");
console.log("🚀 Search Logic Comprehensive Test Started...");
console.log("==================================================\n");

let passedRejectionTests = 0;
const totalRejectionTests = testCases.filter(t => t.category === "Rejection").length;

testCases.forEach(({ category, intent, query }, index) => {
  console.log(`[Test ${String(index + 1).padStart(2, '0')}] [${category}] ${intent}`);
  console.log(` 💬 Query : "${query}"`);

  // Top 3까지 추출하여 가중치 랭킹 확인
  const results = searchKnowledge(query, 3); 

  if (results.length === 0) {
    if (category === "Rejection") {
      console.log(" ✅  [PASS] 의도대로 차단됨 (결과 없음)\n");
      passedRejectionTests++;
    } else {
      console.log(" ❌  [FAIL] 매칭된 결과 없음 (개선 필요)\n");
    }
    return;
  }

  if (category === "Rejection") {
    console.log(" ⚠️  [WARNING] 차단되어야 할 질문인데 데이터가 튀어나옴! (가중치 조절 필요)");
  }

  // searchKnowledge 내부의 객체 구조를 텍스트화하여 출력
  results.forEach((res, rank) => {
    // 임시로 결과 객체에서 가장 첫 번째 문자열 값을 제목으로 간주하여 출력
    const contentPreview = Object.values(res)
      .find(val => typeof val === "string") as string || "제목/내용 없음";
    
    // 점수를 함께 출력하기 위해, searchKnowledge에서 score를 반환한다고 가정 시 사용할 코드.
    // 현재 코드베이스는 section만 반환하므로 미리보기만 출력.
    console.log(`  ${rank + 1}위 📄 : ${contentPreview.substring(0, 45).replace(/\n/g, " ")}...`);
  });
  console.log("");
});

console.log("==================================================");
console.log("🏁 Test Summary");
console.log(`- Total Tests Executed: ${testCases.length}`);
console.log(`- Rejection Tests (방어율): ${passedRejectionTests} / ${totalRejectionTests}`);
console.log("==================================================");