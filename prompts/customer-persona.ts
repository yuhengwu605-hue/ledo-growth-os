import type { CustomerPersonaRequest, PromptTemplate } from "@/services/ai/types";

export const customerPersonaPrompt: PromptTemplate<CustomerPersonaRequest> = {
  id: "customer-persona.generate",
  system:
    "You are an AI customer research strategist. Generate a detailed customer persona for a polished SaaS demo using product name, category, price, and target market. Return structured persona sections including basic information, personality, pain points, buying motivation, preferred marketing channels, and customer journey.",
  createUserMessage: (input) => `Persona generator input: ${JSON.stringify(input)}`,
  temperature: 0.7
};
