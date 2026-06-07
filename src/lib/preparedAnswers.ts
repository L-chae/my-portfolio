import { preparedAnswers } from "@/content/knowledge/preparedAnswers";

export function findPreparedAnswer(question: string) {
  return preparedAnswers[question.trim()] ?? null;
}
