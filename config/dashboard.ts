import {
  BarChart3,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  Mail,
  MousePointerClick,
  PlaySquare,
  Repeat2,
  Search,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
  WalletCards
} from "lucide-react";

export const campaignOverview = {
  campaignName: "Ledo Growth OS 上线增长活动",
  status: "演示进行中",
  targetAudience: "区域营销负责人和门店销售主管",
  budget: "¥300,000",
  duration: "30 天"
} as const;

export const marketingFunnel = [
  {
    stage: "认知",
    value: "1.28M",
    progress: 88,
    description: "预计活动触达人数",
    icon: Sparkles
  },
  {
    stage: "兴趣",
    value: "46.2K",
    progress: 72,
    description: "内容互动与有效访问",
    icon: UsersRound
  },
  {
    stage: "转化",
    value: "2,386",
    progress: 54,
    description: "试驾预约与高意向行为",
    icon: MousePointerClick
  },
  {
    stage: "留存",
    value: "68%",
    progress: 64,
    description: "跟进完成率与二次互动",
    icon: Repeat2
  }
] as const;

export const performanceKpis = [
  {
    label: "预计触达",
    value: "1.28M",
    change: "+31.2%",
    icon: BarChart3
  },
  {
    label: "互动率",
    value: "4.8%",
    change: "+0.9%",
    icon: TrendingUp
  },
  {
    label: "转化率",
    value: "12.8%",
    change: "+2.1%",
    icon: Target
  },
  {
    label: "ROI",
    value: "3.4x",
    change: "+0.6x",
    icon: CircleDollarSign
  },
  {
    label: "CAC",
    value: "¥126",
    change: "-14.5%",
    icon: WalletCards
  }
] as const;

export const budgetAllocation = [
  {
    channel: "社交媒体",
    percentage: 36,
    amount: "¥108,000",
    icon: Share2
  },
  {
    channel: "搜索投放",
    percentage: 22,
    amount: "¥66,000",
    icon: Search
  },
  {
    channel: "邮件营销",
    percentage: 14,
    amount: "¥42,000",
    icon: Mail
  },
  {
    channel: "视频内容",
    percentage: 18,
    amount: "¥54,000",
    icon: PlaySquare
  },
  {
    channel: "达人合作",
    percentage: 10,
    amount: "¥30,000",
    icon: UsersRound
  }
] as const;

export const thirtyDayTimeline = [
  {
    week: "第 1 周",
    focus: "定位与基础搭建",
    activities: [
      "完成客户画像和活动定位",
      "生成首套跨渠道内容素材",
      "准备追踪链接与落地页行动号召"
    ]
  },
  {
    week: "第 2 周",
    focus: "渠道测试",
    activities: [
      "发布社交种草内容并测试短视频",
      "围绕活动落地页投放搜索意图关键词",
      "复盘早期互动与人群匹配信号"
    ]
  },
  {
    week: "第 3 周",
    focus: "转化推进",
    activities: [
      "将高表现内容转化为销售跟进话术",
      "面向高意向人群开展周末预约活动",
      "依据点击与回复行为优化行动号召"
    ]
  },
  {
    week: "第 4 周",
    focus: "优化与放大",
    activities: [
      "将预算倾斜至转化率最高的渠道",
      "将高表现内容整理为区域打法手册",
      "准备下一周期增长计划与管理层汇报"
    ]
  }
] as const;

export const dashboardRecommendations = [
  {
    title: "提高短视频发布频率",
    detail:
      "短视频带来的漏斗上层增长最明显，建议在周末前提升发布频率。",
    impact: "高",
    icon: PlaySquare
  },
  {
    title: "聚焦年轻家庭人群",
    detail:
      "数字化程度高的家庭与首次增换购用户，互动质量表现更好。",
    impact: "中",
    icon: UsersRound
  },
  {
    title: "优化行动号召表达",
    detail:
      "将泛泛的产品号召改为明确动作，例如预约试驾或获取本地方案。",
    impact: "高",
    icon: MousePointerClick
  },
  {
    title: "开展周末营销活动",
    detail:
      "预约行为在周五晚至周日下午达到峰值，建议集中投放权益并安排跟进。",
    impact: "高",
    icon: CalendarDays
  },
  {
    title: "优化活动落地页",
    detail:
      "让落地页标题和首个行动号召与表现最好的活动信息保持一致。",
    impact: "中",
    icon: Clock3
  }
] as const;
