import { CheckCircle2, Gauge, Sparkles } from "lucide-react";

import {
  budgetAllocation,
  campaignOverview,
  dashboardRecommendations,
  marketingFunnel,
  performanceKpis,
  thirtyDayTimeline
} from "@/config/dashboard";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-ai" />
            Final Showcase · Mock Data
          </div>
          <h1 className="text-2xl font-semibold tracking-normal md:text-[28px]">
            AI Marketing Dashboard
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Executive overview for the AI Marketing Operating System. This page combines campaign
            strategy, funnel health, KPIs, budget, timeline, and AI recommendations into one demo
            dashboard.
          </p>
        </div>

        <div className="rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground shadow-soft">
          Demo only · No external API
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1.4fr]">
        <div className="rounded-xl border bg-card p-5 shadow-soft">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-[15px] font-semibold">Campaign Overview</h2>
              <p className="mt-1 text-sm text-muted-foreground">Current executive campaign brief</p>
            </div>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              {campaignOverview.status}
            </span>
          </div>

          <div className="space-y-3">
            <OverviewRow label="Campaign Name" value={campaignOverview.campaignName} />
            <OverviewRow label="Target Audience" value={campaignOverview.targetAudience} />
            <OverviewRow label="Budget" value={campaignOverview.budget} />
            <OverviewRow label="Duration" value={campaignOverview.duration} />
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-soft">
          <div className="mb-5">
            <h2 className="text-[15px] font-semibold">Marketing Funnel</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Four-stage campaign health from awareness to retention
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {marketingFunnel.map((stage) => (
              <div key={stage.stage} className="rounded-xl border bg-background/50 p-4">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-primary">
                    <stage.icon className="h-4 w-4" />
                  </div>
                  <span className="text-lg font-semibold">{stage.value}</span>
                </div>
                <div className="text-sm font-medium">{stage.stage}</div>
                <p className="mt-1 min-h-10 text-xs leading-5 text-muted-foreground">
                  {stage.description}
                </p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-ai"
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
                <div className="mt-2 text-right text-[11px] text-muted-foreground">
                  {stage.progress}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {performanceKpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background">
                <kpi.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                {kpi.change}
              </span>
            </div>
            <div className="mt-5 text-sm text-muted-foreground">{kpi.label}</div>
            <div className="mt-1 text-3xl font-semibold tracking-normal">{kpi.value}</div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-xl border bg-card p-5 shadow-soft">
          <div className="mb-5">
            <h2 className="text-[15px] font-semibold">Budget Allocation</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Suggested distribution across acquisition channels
            </p>
          </div>

          <div className="space-y-3">
            {budgetAllocation.map((item) => (
              <div key={item.channel} className="rounded-lg border bg-background/50 p-4">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-primary">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{item.channel}</div>
                      <div className="text-xs text-muted-foreground">{item.amount}</div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">{item.percentage}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-soft">
          <div className="mb-5">
            <h2 className="text-[15px] font-semibold">30-Day Timeline</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Weekly execution plan for the campaign cycle
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {thirtyDayTimeline.map((week) => (
              <div key={week.week} className="rounded-xl border bg-background/50 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">{week.week}</div>
                    <div className="text-xs text-muted-foreground">{week.focus}</div>
                  </div>
                  <Gauge className="h-4 w-4 text-ai" />
                </div>
                <ul className="space-y-2">
                  {week.activities.map((activity) => (
                    <li
                      key={activity}
                      className="flex gap-2 text-sm leading-6 text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-5 shadow-soft">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-[15px] font-semibold">AI Recommendations</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Mock recommendations based on the combined demo workflow
            </p>
          </div>
          <Sparkles className="h-4 w-4 text-ai" />
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {dashboardRecommendations.map((recommendation) => (
            <article key={recommendation.title} className="rounded-xl border bg-background/50 p-4">
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-primary">
                <recommendation.icon className="h-4 w-4" />
              </div>
              <div className="text-sm font-semibold">{recommendation.title}</div>
              <p className="mt-2 min-h-24 text-sm leading-6 text-muted-foreground">
                {recommendation.detail}
              </p>
              <span className="mt-4 inline-flex rounded-full border bg-card px-2 py-1 text-[11px] text-muted-foreground">
                {recommendation.impact} impact
              </span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function OverviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background/50 p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium leading-6">{value}</div>
    </div>
  );
}
