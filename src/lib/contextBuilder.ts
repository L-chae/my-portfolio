function valueToText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  if (Array.isArray(value)) {
    // 줄바꿈과 '-' 대신 쉼표나 세미콜론으로 한 줄 압축
    return value.map(valueToText).filter(Boolean).join("; ");
  }

  if (typeof value === "object" && value !== null) {
    return Object.entries(value as Record<string, unknown>)
      .filter(([key, val]) => key !== "keywords" && key !== "id" && val != null) // 메타데이터/null/undefined 제외
      .map(([key, val]) => {
        const parsedVal = valueToText(val);
        // 들여쓰기와 [] 제거, 한 줄로 연결
        return parsedVal ? `${key}: ${parsedVal}` : "";
      })
      .filter(Boolean)
      .join("\n"); // \n\n 대신 단일 줄바꿈 사용
  }

  return "";
}

export function buildContextPrompt(sections: unknown[]): string {
  // 구분자도 공백을 최소화하여 토큰 절약
  return sections.map(valueToText).filter(Boolean).join("\n---\n");
}
