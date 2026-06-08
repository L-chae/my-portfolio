import type { KnowledgeSearchResult } from "@/lib/searchKnowledge";

const MAX_CONTEXT_LENGTH = 4200;

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
  let context = "";
  const included: string[] = [];

  for (const section of sections) {
    const next = formatSection(section);
    const candidate = context ? `${context}\n---\n${next}` : next;
    if (candidate.length > MAX_CONTEXT_LENGTH) break;

    context = candidate;
    included.push(section.id);
  }

  return { context, included };
}
