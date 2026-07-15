import { CheckCircle2, FileText, Trophy, UsersRound } from "lucide-react";

export const adminStats = [
  {
    label: "全国销售",
    value: "1,248",
    unit: "人",
    change: "+42 本周",
    description: "已接入 Ledo Growth OS 的销售顾问",
    icon: UsersRound
  },
  {
    label: "今日AI生成",
    value: "3,842",
    unit: "条",
    change: "+18.6%",
    description: "内容、话术、活动方案与跟进建议",
    icon: FileText
  },
  {
    label: "今日成交",
    value: "318",
    unit: "单",
    change: "+8.4%",
    description: "来自线索跟进与试驾转化",
    icon: CheckCircle2
  },
  {
    label: "区域冠军",
    value: "华东",
    unit: "",
    change: "Score 96",
    description: "综合曝光、预约与成交表现领先",
    icon: Trophy
  }
] as const;

export const regionalRanking = [
  {
    region: "华东",
    sales: 368,
    aiGenerated: 1286,
    deals: 112,
    score: 96
  },
  {
    region: "华南",
    sales: 286,
    aiGenerated: 924,
    deals: 78,
    score: 89
  },
  {
    region: "西南",
    sales: 214,
    aiGenerated: 638,
    deals: 52,
    score: 82
  },
  {
    region: "华北",
    sales: 238,
    aiGenerated: 604,
    deals: 49,
    score: 79
  },
  {
    region: "华中",
    sales: 142,
    aiGenerated: 390,
    deals: 27,
    score: 73
  }
] as const;

export const adminHotContent = [
  {
    title: "周末家庭试驾日邀约",
    channel: "朋友圈",
    region: "华东",
    owner: "上海浦东门店",
    metric: "预约转化 8.2%",
    score: 96
  },
  {
    title: "乐道 L60 智能座舱 30 秒体验",
    channel: "抖音",
    region: "华南",
    owner: "深圳南山门店",
    metric: "完播率 41%",
    score: 92
  },
  {
    title: "通勤家庭选车清单",
    channel: "小红书",
    region: "华北",
    owner: "北京朝阳门店",
    metric: "收藏率 12%",
    score: 88
  },
  {
    title: "置换用户权益说明",
    channel: "视频号",
    region: "西南",
    owner: "成都高新门店",
    metric: "私信率 6.9%",
    score: 84
  }
] as const;

export const adminOverview = {
  title: "总部运营概览",
  summary:
    "今日全国销售活跃度稳定，AI 内容生成集中在家庭试驾、智能座舱和置换权益三个方向。华东区域在预约与成交转化上领先，适合作为本周优秀案例复用到其他区域。",
  updatedAt: "Today 10:20"
} as const;
