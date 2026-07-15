import { CalendarCheck, CheckCircle2, Eye, MessageCircle, TrendingUp } from "lucide-react";

export const growthBrainMetrics = [
  {
    label: "曝光",
    value: "126.8万",
    change: "+31.2%",
    description: "全平台内容曝光",
    icon: Eye
  },
  {
    label: "互动",
    value: "42,680",
    change: "+18.7%",
    description: "点赞、收藏、评论与私信",
    icon: MessageCircle
  },
  {
    label: "预约",
    value: "2,386",
    change: "+16.9%",
    description: "有效试驾预约",
    icon: CalendarCheck
  },
  {
    label: "成交",
    value: "318",
    change: "+8.4%",
    description: "本周期锁单成交",
    icon: CheckCircle2
  }
] as const;

export const growthBrainTrend = [
  { day: "Mon", exposure: 82, engagement: 28, booking: 12, deal: 4 },
  { day: "Tue", exposure: 88, engagement: 31, booking: 14, deal: 5 },
  { day: "Wed", exposure: 94, engagement: 35, booking: 17, deal: 6 },
  { day: "Thu", exposure: 91, engagement: 33, booking: 16, deal: 5 },
  { day: "Fri", exposure: 108, engagement: 42, booking: 21, deal: 8 },
  { day: "Sat", exposure: 124, engagement: 51, booking: 28, deal: 11 },
  { day: "Sun", exposure: 132, engagement: 56, booking: 31, deal: 13 }
] as const;

export const growthBrainSignals = [
  {
    title: "家庭用户内容拉动预约",
    detail: "围绕空间、舒适和周末出行的内容贡献了 38% 的新增试驾预约。",
    score: 94
  },
  {
    title: "互动增长快于成交增长",
    detail: "互动量环比提升明显，但成交提升较慢，说明销售跟进链路仍有优化空间。",
    score: 86
  },
  {
    title: "周末转化窗口明显",
    detail: "周六、周日预约和成交同步抬升，适合提前 48 小时集中触达。",
    score: 91
  }
] as const;

export const growthBrainContext = {
  market: "上海",
  vehicleModel: "乐道 L60",
  customerSegment: "家庭升级型用户",
  period: "近7天",
  summary:
    "曝光、互动、预约持续增长，但成交增速低于预约增速。当前最值得优化的是从预约到成交的销售跟进动作。",
  icon: TrendingUp
} as const;
