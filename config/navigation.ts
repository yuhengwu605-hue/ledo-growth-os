import {
  Brain,
  FileText,
  Factory,
  LayoutDashboard,
  Megaphone,
  ScanFace,
  Settings,
  ShieldCheck,
  UsersRound
} from "lucide-react";

export const navigationItems = [
  {
    title: "营销仪表盘",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "增长大脑",
    href: "/growth-brain",
    icon: Brain
  },
  {
    title: "AI 销售人设",
    href: "/ai-persona",
    icon: UsersRound
  },
  {
    title: "内容工厂",
    href: "/content-factory",
    icon: Factory
  },
  {
    title: "营销方案生成器",
    href: "/marketing-generator",
    icon: Megaphone
  },
  {
    title: "客户画像生成器",
    href: "/persona-generator",
    icon: ScanFace
  },
  {
    title: "内容生成器",
    href: "/content-generator",
    icon: FileText
  },
  {
    title: "总部后台",
    href: "/admin",
    icon: ShieldCheck
  },
  {
    title: "设置",
    href: "/settings",
    icon: Settings
  }
] as const;

export const workspaceStats = [
  {
    label: "版本",
    value: "1.0"
  },
  {
    label: "模式",
    value: "演示"
  },
  {
    label: "主题",
    value: "深色"
  }
] as const;
