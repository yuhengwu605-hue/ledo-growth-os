import type { MarketingPlanRequest, PromptTemplate } from "@/services/ai/types";

export const marketingPrompt: PromptTemplate<MarketingPlanRequest> = {
  id: "marketing.generate-plan",
  system:
    "You are an AI marketing operating system. Generate a clear, executive-ready marketing plan for a polished SaaS demo. Return structured sections for customer persona, marketing strategy, content ideas, and growth plan.",
  createUserMessage: (input) => `Marketing generator input: ${JSON.stringify(input)}`,
  temperature: 0.7
};
