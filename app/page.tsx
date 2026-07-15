import Link from "next/link";
import { BarChart3, FileText, Megaphone, ScanFace, Sparkles } from "lucide-react";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";

const featureCards = [
  {
    title: "营销方案生成器",
    description:
      "根据产品、受众、预算和目标，快速生成可执行的营销方案。",
    href: "/marketing-generator",
    icon: Megaphone
  },
  {
    title: "客户画像生成器",
    description:
      "生成包含动机、渠道偏好和决策旅程的详细客户画像。",
    href: "/persona-generator",
    icon: ScanFace
  },
  {
    title: "内容生成器",
    description: "从一份简报生成社交内容、短视频创意、标题、行动号召和话题标签。",
    href: "/content-generator",
    icon: FileText
  },
  {
    title: "营销仪表盘",
    description:
      "查看活动概览、营销漏斗、预算、时间计划、关键指标和 AI 建议。",
    href: "/dashboard",
    icon: BarChart3
  }
] as const;

export default function Home() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-background text-foreground">
        <section className="mx-auto flex min-h-[calc(100vh-56px)] max-w-7xl flex-col justify-center px-4 py-12 md:px-6">
          <div className="max-w-4xl animate-fade-in">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground shadow-soft">
              <Sparkles className="h-3.5 w-3.5 text-ai" />
              AI 营销操作系统演示版 · 版本 1.0
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal md:text-6xl">
              让营销策略快速落地为可执行的增长行动。
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              面向营销团队的 AI 操作系统演示版，覆盖营销方案、客户画像、内容素材包与管理层活动看板。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-11 px-5" variant="ai">
                <Link href="/marketing-generator">开始演示</Link>
              </Button>
              <Button asChild className="h-11 px-5" variant="secondary">
                <Link href="/dashboard">查看仪表盘</Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="card-hover rounded-xl border bg-card p-5 shadow-soft"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border bg-background text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold">{feature.title}</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <footer className="border-t px-4 py-4 text-xs text-muted-foreground md:px-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>AI 营销操作系统演示版</span>
            <div className="flex items-center gap-3">
              <span>版本 1.0</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
              <span>演示项目</span>
            </div>
          </div>
        </footer>
      </main>
    </ThemeProvider>
  );
}
