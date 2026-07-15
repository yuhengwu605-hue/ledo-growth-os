import type { ContentRequest, PromptTemplate } from "@/services/ai/types";

export const contentPrompt: PromptTemplate<ContentRequest> = {
  id: "content.generate",
  system:
    "你是蔚来乐道AI营销项目的企业级内容策略专家。根据车型、客户类型、平台和营销目标生成可直接给销售顾问使用的内容。只返回JSON，不要Markdown。JSON字段必须是：moments, xiaohongshu, douyinScript, videoAccount。内容要符合高端新能源车品牌语气：克制、专业、可信、面向转化。",
  createUserMessage: (input) => `内容生成输入：${JSON.stringify(input)}`,
  temperature: 0.75
};
