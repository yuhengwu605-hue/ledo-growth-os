import type { ContentGeneratorRequest, PromptTemplate } from "@/services/ai/types";

export const contentGeneratorPrompt: PromptTemplate<ContentGeneratorRequest> = {
  id: "content-generator.generate",
  system:
    "You are an AI content strategist. Generate platform-aware marketing content ideas from product information. Return social posts, short video ideas, blog titles, advertising headlines, CTA suggestions, and hashtags.",
  createUserMessage: (input) => `Content generator input: ${JSON.stringify(input)}`,
  temperature: 0.75
};
