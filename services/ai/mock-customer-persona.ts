import type { CustomerPersonaRequest, CustomerPersonaResult } from "./types";

export function createMockCustomerPersona(input: CustomerPersonaRequest): CustomerPersonaResult {
  const targetMarket = input.targetMarket || "一线及新一线城市市场";
  const category = input.productCategory || "高端科技产品";

  return {
    basicInformation: {
      name: "陈思远",
      age: "34 岁",
      occupation: "区域营销经理",
      income: "家庭年收入 42 万 - 56 万元",
      education: "本科，商科或传播学背景"
    },
    personality: {
      interests: ["效率工具与 AI 工作流", "智能出行、数码产品与生活升级", "数据驱动的决策与实用商业方法"],
      values: ["效率提升但不放弃质量把控", "可信赖且有明确证据的品牌", "专业影响力、团队信任与可衡量成果"],
      lifestyle: [
        `在节奏快速的${targetMarket}环境中工作`,
        "兼顾策略规划与日常执行压力",
        "通勤及晚间复盘时阅读精炼的商业内容"
      ]
    },
    painPoints: [
      "活动创意很多，却缺少明确的优先级结构",
      "难以将产品功能转化为针对不同受众的信息",
      "在增加活动预算前，面临证明 ROI 的压力",
      "销售团队需要可直接使用的内容，而非通用策略材料",
      "现有工具无法连接用户洞察、内容生产和增长行动"
    ],
    buyingMotivation: {
      mainMotivations: [
        `希望为${category}中的${input.productName}找到可信的市场定位方式`,
        "减少人工规划时间，同时提升活动质量",
        "为管理层清晰呈现目标客户逻辑和渠道匹配度"
      ],
      purchaseTriggers: [
        "临近新品发布或区域活动截止时间",
        "从认知到有效咨询的转化表现不佳",
        `预算负责人要求说明${input.productPrice}定价如何被市场价值支撑`
      ]
    },
    preferredMarketingChannels: {
      socialMedia: "职业社交内容、小红书式深度解读，以及包含实用案例的社群内容",
      searchEngine: "围绕最佳解决方案、价格对比、品类教育与落地案例的搜索需求",
      email: "简洁的管理层摘要、行业洞察、发布进展和清晰的下一步行动",
      shortVideo: "30-60 秒的流程前后对比、客户场景和成果证明"
    },
    customerJourney: {
      awareness: "通过同行推荐、社会化证明内容或简洁的问题解决视频发现产品。",
      consideration: "评估产品能否适配现有工作流、预算约束与管理层预期。",
      purchase: "在看到清晰计划、可信预期成果和低门槛下一步后完成转化。",
      loyalty: "当产品持续提供新洞察、可复用资产和可量化团队价值时保持长期使用。"
    }
  };
}
