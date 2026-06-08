import {
  DEFAULT_SUGGESTIONS,
  SECTION_SUGGESTION_MAP,
  SUGGESTION_MAP,
} from "@/content/suggestions";
import { preparedAnswers } from "@/content/knowledge/preparedAnswers";

const suggestionGroups: Record<string, readonly string[]> = {
  DEFAULT_SUGGESTIONS,
  ...SECTION_SUGGESTION_MAP,
  ...SUGGESTION_MAP,
};

const missing = Object.entries(suggestionGroups).flatMap(
  ([groupName, questions]) =>
    questions
      .filter((question) => preparedAnswers[question] == null)
      .map((question) => ({ groupName, question })),
);

const totalSuggestions = new Set(Object.values(suggestionGroups).flat()).size;

console.log("Prepared suggestion coverage");
console.log(`- Unique suggestions: ${totalSuggestions}`);
console.log(`- Missing prepared answers: ${missing.length}`);

if (missing.length > 0) {
  console.log("\nMissing keys:");

  missing.forEach(({ groupName, question }) => {
    console.log(`- [${groupName}] ${question}`);
  });

  process.exitCode = 1;
}
