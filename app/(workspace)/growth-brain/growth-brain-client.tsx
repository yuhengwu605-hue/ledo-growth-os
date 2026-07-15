"use client";

import { useMemo, useState } from "react";
import { LoaderCircle, RefreshCcw, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  growthBrainContext,
  growthBrainMetrics,
  growthBrainSignals,
  growthBrainTrend
} from "@/config/growth-brain";
import { cn } from "@/lib/utils";

type Advice = {
  summary: string;
  actions: string[];
  risk: string;
};

const initialAdvice: Advice = {
  summary: "",
  actions: [],
  risk: ""
};

const trendKeys = [
  { key: "exposure", label: "曝光", color: "text-primary" },
  { key: "engagement", label: "互动", color: "text-ai" },
  { key: "booking", label: "预约", color: "text-emerald-500" },
  { key: "deal", label: "成交", color: "text-amber-500" }
] as const;

export function GrowthBrainClient() {
  const [advice, setAdvice] = useState<Advice>(initialAdvice);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const maxTrendValue = useMemo(() => {
    return Math.max(
      ...growthBrainTrend.flatMap((item) => [
        item.exposure,
        item.engagement,
        item.booking,
        item.deal
      ])
    );
  }, []);

  const hasAdvice = advice.summary || advice.actions.length > 0 || advice.risk;

  async function generateAdvice() {
    setIsLoading(true);
    setError("");
    setAdvice(initialAdvice);

    try {
      const response = await fetch("/api/growth-brain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          context: growthBrainContext,
          metrics: growthBrainMetrics.map((metric) => ({
            label: metric.label,
            value: metric.value,
            change: metric.change,
            description: metric.description
          })),
          trend: growthBrainTrend,
          signals: growthBrainSignals
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Generate AI advice failed.");
      }

      setAdvice(data);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Generate AI advice failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-ai" />
            Mock Data · OpenAI Advice
          </div>
          <h1 className="text-2xl font-semibold tracking-normal md:text-[28px]">Growth Brain</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            展示曝光、互动、预约和成交的增长状态。基础数据使用 Mock Data，AI 建议由 OpenAI
            实时生成。
          </p>
        </div>

        <Button disabled={isLoading} onClick={generateAdvice} variant="ai">
          {isLoading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          Generate AI Advice
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {growthBrainMetrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background">
                <metric.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                {metric.change}
              </span>
            </div>
            <div className="mt-5">
              <div className="text-sm text-muted-foreground">{metric.label}</div>
              <div className="mt-1 text-3xl font-semibold tracking-normal">{metric.value}</div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{metric.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.8fr]">
        <div className="rounded-xl border bg-card p-5 shadow-soft">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <h2 className="text-[15px] font-semibold">趋势图</h2>
              <p className="mt-1 text-sm text-muted-foreground">近7天曝光、互动、预约、成交趋势</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              {trendKeys.map((item) => (
                <span key={item.key} className="flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full bg-current", item.color)} />
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 h-[300px] rounded-lg border bg-background/50 p-4">
            <div className="relative h-[230px]">
              <div className="absolute inset-x-0 top-1/4 border-t border-dashed" />
              <div className="absolute inset-x-0 top-1/2 border-t border-dashed" />
              <div className="absolute inset-x-0 top-3/4 border-t border-dashed" />
              {trendKeys.map((item) => (
                <TrendLine
                  key={item.key}
                  className={cn("absolute inset-0", item.color)}
                  max={maxTrendValue}
                  values={growthBrainTrend.map((trend) => trend[item.key])}
                />
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 pt-4 text-center text-xs text-muted-foreground">
              {growthBrainTrend.map((item) => (
                <span key={item.day}>{item.day}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ai text-ai-foreground">
              <growthBrainContext.icon className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold">当前增长上下文</h2>
              <p className="text-xs text-muted-foreground">
                {growthBrainContext.market} · {growthBrainContext.vehicleModel}
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            {growthBrainContext.summary}
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <ContextItem label="客户" value={growthBrainContext.customerSegment} />
            <ContextItem label="周期" value={growthBrainContext.period} />
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-xl border bg-card p-5 shadow-soft">
          <div className="mb-5">
            <h2 className="text-[15px] font-semibold">增长信号</h2>
            <p className="mt-1 text-sm text-muted-foreground">来自 Mock Data 的关键判断</p>
          </div>
          <div className="space-y-3">
            {growthBrainSignals.map((signal) => (
              <div key={signal.title} className="rounded-lg border bg-background/50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium">{signal.title}</div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{signal.detail}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{signal.score}</div>
                    <div className="text-[11px] text-muted-foreground">Score</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-soft">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-[15px] font-semibold">AI建议</h2>
              <p className="mt-1 text-sm text-muted-foreground">点击按钮后由 OpenAI 生成</p>
            </div>
            {hasAdvice ? (
              <Button disabled={isLoading} onClick={generateAdvice} size="sm" variant="secondary">
                <RefreshCcw className={cn("h-4 w-4", isLoading && "animate-spin")} />
                Regenerate
              </Button>
            ) : null}
          </div>

          {error ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {isLoading ? (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border bg-background/50 text-center">
              <LoaderCircle className="mb-4 h-6 w-6 animate-spin text-ai" />
              <div className="text-sm font-medium">正在生成增长建议</div>
              <div className="mt-1 text-xs text-muted-foreground">
                分析曝光、互动、预约与成交关系...
              </div>
            </div>
          ) : hasAdvice ? (
            <div className="space-y-4">
              <AdviceBlock title="总结" value={advice.summary} />
              <div className="rounded-lg border bg-background/50 p-4">
                <div className="mb-3 text-sm font-medium">建议动作</div>
                <div className="space-y-2">
                  {advice.actions.map((action) => (
                    <div
                      key={action}
                      className="rounded-md bg-card px-3 py-2 text-sm text-muted-foreground"
                    >
                      {action}
                    </div>
                  ))}
                </div>
              </div>
              <AdviceBlock title="风险提示" value={advice.risk} />
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border bg-background/50 text-center">
              <Sparkles className="mb-4 h-6 w-6 text-ai" />
              <div className="text-sm font-medium">等待 AI 建议</div>
              <div className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                点击 Generate AI Advice，将 Mock Data 发送给 OpenAI 生成增长建议。
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function TrendLine({
  values,
  max,
  className
}: {
  values: readonly number[];
  max: number;
  className?: string;
}) {
  if (values.length < 2 || max <= 0) {
    return null;
  }

  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 100 - (value / max) * 84 - 8;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
      <polyline
        fill="none"
        points={points}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function ContextItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background/50 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}

function AdviceBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background/50 p-4">
      <div className="mb-2 text-sm font-medium">{title}</div>
      <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{value}</p>
    </div>
  );
}
