import { contentPrompt } from "@/prompts/content";
import { contentGeneratorPrompt } from "@/prompts/content-generator";
import { customerPersonaPrompt } from "@/prompts/customer-persona";
import { growthPrompt } from "@/prompts/growth";
import { marketingPrompt } from "@/prompts/marketing";
import { personaPrompt } from "@/prompts/persona";

import type { PromptTemplate } from "./types";

const promptTemplates = {
  [personaPrompt.id]: personaPrompt,
  [contentPrompt.id]: contentPrompt,
  [contentGeneratorPrompt.id]: contentGeneratorPrompt,
  [customerPersonaPrompt.id]: customerPersonaPrompt,
  [growthPrompt.id]: growthPrompt,
  [marketingPrompt.id]: marketingPrompt
} as const;

export type PromptTemplateId = keyof typeof promptTemplates;

export function getPromptTemplate<TInput>(templateId: PromptTemplateId): PromptTemplate<TInput> {
  return promptTemplates[templateId] as PromptTemplate<TInput>;
}

export function createPromptMessages<TInput>(templateId: PromptTemplateId, input: TInput) {
  const template = getPromptTemplate<TInput>(templateId);

  return {
    template,
    messages: [
      {
        role: "system" as const,
        content: template.system
      },
      {
        role: "user" as const,
        content: template.createUserMessage(input)
      }
    ]
  };
}
