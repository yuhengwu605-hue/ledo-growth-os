import type { ContentGeneratorRequest, ContentGeneratorResult } from "./types";

export function createMockContentGenerator(input: ContentGeneratorRequest): ContentGeneratorResult {
  const product = input.productName || "该产品";
  const audience = input.targetAudience || "增长型营销团队";
  const platform = input.platform || "领英";

  return {
    socialPosts: [
      `${product} 帮助${audience}在几分钟内将零散的活动想法梳理为结构化内容计划，让每一次增长行动都有明确起点。`,
      `优秀的营销系统不只是生成文案，更能连接产品价值、用户意图与下一步业务动作。这正是 ${product} 的价值。`,
      `对${audience}而言，速度只有在不牺牲质量时才有意义。${product} 可将简报转化为平台内容，同时保持信息聚焦可信。`,
      `在${platform}发布内容时，从一个明确痛点、一条有力证据和一个清晰行动开始。${product} 可从一份产品简报中生成这三部分。`,
      `营销正在成为可复制的运营能力。${product} 帮助团队稳定地规划、生成和优化内容，同时保留策略判断。`
    ],
    shortVideoIdeas: [
      `前后对比：展示一份凌乱的活动简报，再展示 ${product} 如何生成社交内容、标题、行动号召与话题标签。`,
      `观点讲解：为什么${audience}需要 AI 营销操作系统，而不只是另一个空白写作工具。`,
      `录屏演示：输入产品、受众和平台，在 30 秒内展示完整内容素材包。`
    ],
    blogTitles: [
      `${product} 如何将产品信息转化为可直接投放的营销内容`,
      `为什么${audience}需要结构化的 AI 内容工作流`,
      `从简报到分发：AI 营销内容的实战指南`,
      `高效营销团队的全新内容运营模式`,
      `如何做到平台化内容生产而不稀释品牌表达`
    ],
    advertisingHeadlines: [
      "一份产品简报，生成完整内容计划",
      "几分钟生成可直接投放的营销内容",
      "面向增长团队的 AI 内容规划",
      "从用户洞察到可发布的内容创意",
      "让每次活动从清晰结构开始",
      "扩大内容产能，不降低质量标准",
      "为追求清晰与效率的团队打造",
      "你的 AI 营销内容操作系统",
      "在一个工作流中完成规划、生成与优化",
      "更好的简报，更好的内容，更快的执行"
    ],
    ctaSuggestions: ["生成内容计划", "从产品简报开始", "创建活动创意", "生成首个内容素材包", "让策略变成内容"],
    recommendedHashtags: [
      "#AI营销",
      "#营销运营",
      "#增长营销",
      "#内容策略",
      "#SaaS",
      "#AI工作流",
      "#活动策划",
      "#内容运营",
      "#需求增长",
      "#产品营销",
      "#市场进入策略",
      "#营销自动化",
      "#B2B营销",
      "#创意运营",
      "#增长操作系统"
    ]
  };
}
