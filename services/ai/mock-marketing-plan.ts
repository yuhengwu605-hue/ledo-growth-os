import type { MarketingPlanRequest, MarketingPlanResult } from "./types";

export function createMockMarketingPlan(input: MarketingPlanRequest): MarketingPlanResult {
  const audience = input.targetAudience || "增长型营销团队";
  const budget = input.budget || "演示预算";

  return {
    customerPersona: {
      demographics: [
        `${audience}，主要分布在一线与快速成长城市`,
        "28-45 岁、数字化工具使用程度高的核心决策者",
        "负责获客、转化、本地活动与销售赋能的团队成员"
      ],
      painPoints: [
        "增长团队数据分散，缺少将洞察快速转化为行动的时间",
        "销售团队需要更个性化的内容，但难以持续产出足够高质量的版本",
        "营销负责人希望在大规模投入前快速验证沟通信息"
      ],
      motivations: [
        "在不增加人工运营成本的前提下提升有效线索",
        "让品牌策略与一线销售执行保持一致",
        `通过可衡量的短期信号，让${budget}的投入更容易被证明`
      ]
    },
    marketingStrategy: {
      positioning: `${input.productName} 应定位为务实的 AI 增长副驾：将产品价值、用户意图和活动目标转化为可直接执行的营销行动。`,
      channels: ["私域运营：社群、销售直联与社区活动", "社交种草：小红书与抖音的用户教育和信任建立", "自有内容：落地页、产品解读与活动复盘", "销售赋能：短话术、异议处理与线索专属信息"],
      messaging: [
        `从结果出发：${input.marketingGoal}`,
        `用具体使用场景连接产品故事：${input.productDescription}`,
        "保持克制、高级且有证据支撑的表达",
        "每一条内容都以明确的下一步结束：预约、回复、到店或转发"
      ]
    },
    contentIdeas: {
      socialMediaPosts: [
        `用前后对比展示 ${input.productName} 如何将模糊的增长目标转化为具体活动方案`,
        `围绕${audience}制作场景化轮播：痛点、AI 洞察、行动与预期指标`,
        "展示 AI 如何在一分钟内生成多平台内容的幕后流程",
        "对比私域与社交种草渠道中表现更好的本地市场洞察",
        "从创始人视角讨论：AI 营销系统应支持团队判断，而非替代判断"
      ],
      blogIdeas: [
        `${input.productName} 如何帮助营销团队从洞察走向执行`,
        "首个 30 天中 AI 辅助活动规划的运营方法",
        "为什么本地化内容策略比通用 AI 文案更重要"
      ],
      shortVideoIdeas: [
        "30 秒录屏：输入产品、受众、预算和目标，生成完整营销方案",
        "销售经理场景：将一个营销目标转化为五条可发送的内容创意",
        "增长复盘场景：用 AI 建议决定下周活动重点"
      ]
    },
    growthPlan: {
      first30Days: ["第 1-7 天：验证核心受众、明确定位并发布首批信任内容", "第 8-14 天：运行两组渠道测试，分别验证私域与社交种草", "第 15-21 天：将高表现信息转化为销售话术与再营销内容", "第 22-30 天：复盘线索质量、有效行动成本并准备下一轮活动"],
      kpis: ["有效线索量", "内容互动率", "单次有效行动成本", "演示或预约转化率", "销售跟进完成率"],
      suggestedBudgetAllocation: ["40% 社交种草与内容分发", "25% 私域激活与社群运营", "20% 本地活动或转化型素材", "15% 创意测试、效果衡量与快速迭代"]
    }
  };
}
