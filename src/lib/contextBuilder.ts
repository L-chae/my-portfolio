import type { KnowledgeSearchResult } from "@/lib/searchKnowledge";
import { career } from "@/content/knowledge/career";

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
  const includesCareer = sections.some((section) => section.sourceId === career.id);

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
