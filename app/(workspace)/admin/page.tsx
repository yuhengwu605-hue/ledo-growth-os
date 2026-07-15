import { ArrowUpRight, Building2, Sparkles } from "lucide-react";

import { adminHotContent, adminOverview, adminStats, regionalRanking } from "@/config/admin";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground shadow-soft">
            <Building2 className="h-3.5 w-3.5 text-primary" />
            HQ Admin · Mock Data
          </div>
          <h1 className="text-2xl font-semibold tracking-normal md:text-[28px]">
            {adminOverview.title}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            {adminOverview.summary}
          </p>
        </div>

        <div className="rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground shadow-soft">
          Last updated · {adminOverview.updatedAt}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                {stat.change}
              </span>
            </div>
            <div className="mt-5">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-normal">{stat.value}</span>
                {stat.unit ? (
                  <span className="text-sm text-muted-foreground">{stat.unit}</span>
                ) : null}
              </div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{stat.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl border bg-card p-5 shadow-soft">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-[15px] font-semibold">区域排行</h2>
              <p className="mt-1 text-sm text-muted-foreground">全国区域销售、AI 生成与成交表现</p>
            </div>
            <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
              全国
            </span>
          </div>

          <div className="hidden overflow-hidden rounded-lg border md:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-muted/50 text-xs text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">排名</th>
                  <th className="px-4 py-3 font-medium">区域</th>
                  <th className="px-4 py-3 font-medium">销售</th>
                  <th className="px-4 py-3 font-medium">AI生成</th>
                  <th className="px-4 py-3 font-medium">成交</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                </tr>
              </thead>
              <tbody>
                {regionalRanking.map((region, index) => (
                  <tr key={region.region} className="border-t">
                    <td className="px-4 py-4 text-muted-foreground">#{index + 1}</td>
                    <td className="px-4 py-4 font-medium">{region.region}</td>
                    <td className="px-4 py-4 text-muted-foreground">{region.sales}</td>
                    <td className="px-4 py-4 text-muted-foreground">{region.aiGenerated}</td>
                    <td className="px-4 py-4 text-muted-foreground">{region.deals}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                        {region.score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {regionalRanking.map((region, index) => (
              <div key={region.region} className="rounded-lg border bg-background/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    #{index + 1} {region.region}
                  </div>
                  <span className="rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                    {region.score}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                  <MiniMetric label="销售" value={String(region.sales)} />
                  <MiniMetric label="AI生成" value={String(region.aiGenerated)} />
                  <MiniMetric label="成交" value={String(region.deals)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-[15px] font-semibold">热门内容</h2>
              <p className="mt-1 text-sm text-muted-foreground">总部可复用的高表现内容</p>
            </div>
            <Sparkles className="h-4 w-4 text-ai" />
          </div>

          <div className="space-y-3">
            {adminHotContent.map((content, index) => (
              <article key={content.title} className="rounded-lg border bg-background/50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium">{content.title}</span>
                      <span className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground">
                        {content.channel}
                      </span>
                    </div>
                    <div className="mt-2 text-xs leading-5 text-muted-foreground">
                      {content.region} · {content.owner} · {content.metric}
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn("h-full rounded-full", index === 0 ? "bg-ai" : "bg-primary")}
                    style={{ width: `${content.score}%` }}
                  />
                </div>
                <div className="mt-2 text-right text-[11px] text-muted-foreground">
                  Score {content.score}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}
