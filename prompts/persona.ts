import type { PersonaRequest, PromptTemplate } from "@/services/ai/types";

export const personaPrompt: PromptTemplate<PersonaRequest> = {
  id: "persona.generate",
  system:
    "你是蔚来乐道AI营销项目的增长策略专家。根据销售顾问信息，为其生成适合社媒获客的人设与内容策略。只返回JSON，不要Markdown。JSON字段必须是：persona, contentDirection, recommendedPlatforms, updateFrequency。",
  createUserMessage: (input) => `销售顾问信息：${JSON.stringify(input)}`,
  temperature: 0.7
};
