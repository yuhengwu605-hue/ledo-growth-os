"use client";

import { FormEvent, ReactNode, useState } from "react";
import {
  BarChart3,
  Clapperboard,
  FileText,
  Lightbulb,
  Megaphone,
  Newspaper,
  Send,
  Sparkles,
  Target,
  UsersRound
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DemoEmptyState, DemoLoadingState } from "@/components/ui/demo-state";
import type { MarketingPlanResult } from "@/services/ai/types";

type FormState = {
  productName: string;
  productDescription: string;
  targetAudience: string;
  budget: string;
  marketingGoal: string;
};

const initialForm: FormState = {
  productName: "Ledo Growth OS",
  productDescription:
    "面向汽车营销团队的 AI 营销操作系统，将用户信号转化为活动、内容和销售行动。",
  targetAudience: "区域营销负责人和门店销售主管",
  budget: "首个 30 天预算 ¥300,000",
  marketingGoal: "提升有效试驾预约量，并改善销售跟进质量"
};

export function MarketingGeneratorClient() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [result, setResult] = useState<MarketingPlanResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/marketing-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "营销方案生成失败，请稍后重试。");
      }

      setResult(data);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "营销方案生成失败，请稍后重试。"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground shadow-soft">
            <Megaphone className="h-3.5 w-3.5 text-ai" />
            演示功能 · 模拟 AI 响应
          </div>
          <h1 className="text-2xl font-semibold tracking-normal md:text-[28px]">
            营销方案生成器
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            基于产品信息、目标受众、预算和增长目标，生成可供管理层决策的营销方案。本演示使用统一 AI 服务层与真实感模拟结果。
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form className="rounded-xl border bg-card p-5 shadow-soft" onSubmit={handleSubmit}>
          <div className="mb-5">
            <h2 className="text-[15px] font-semibold">活动信息</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              简洁描述营销需求，系统将为你整理为完整方案。
            </p>
          </div>

          <div className="space-y-4">
            <Field label="产品名称">
              <input
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                onChange={(event) => updateField("productName", event.target.value)}
                required
                value={form.productName}
              />
            </Field>

            <Field label="产品描述">
              <textarea
                className="min-h-28 w-full resize-none rounded-lg border bg-background px-3 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                onChange={(event) => updateField("productDescription", event.target.value)}
                required
                value={form.productDescription}
              />
            </Field>

            <Field label="目标受众">
              <input
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                onChange={(event) => updateField("targetAudience", event.target.value)}
                required
                value={form.targetAudience}
              />
            </Field>

            <Field label="预算">
              <input
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                onChange={(event) => updateField("budget", event.target.value)}
                required
                value={form.budget}
              />
            </Field>

            <Field label="营销目标">
              <textarea
                className="min-h-24 w-full resize-none rounded-lg border bg-background px-3 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                onChange={(event) => updateField("marketingGoal", event.target.value)}
                required
                value={form.marketingGoal}
              />
            </Field>

            {error ? (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            ) : null}

            <Button className="h-11 w-full text-sm" disabled={isLoading} type="submit" variant="ai">
              {isLoading ? (
                <Sparkles className="h-4 w-4 animate-pulse" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              生成营销方案
            </Button>
          </div>
        </form>

        <div className="min-h-[680px] rounded-xl border bg-card p-5 shadow-soft">
          {isLoading ? (
            <DemoLoadingState
              description="正在分析客户画像、渠道策略、内容创意与 30 天增长计划。"
              title="正在生成营销方案"
            />
          ) : result ? (
            <MarketingPlanResultView result={result} />
          ) : (
            <DemoEmptyState
              description="填写产品简报后，点击“生成营销方案”即可查看完整演示结果。"
              icon={<FileText className="h-6 w-6" />}
              title="暂未生成方案"
            />
          )}
        </div>
      </section>
    </div>
  );
}

function MarketingPlanResultView({ result }: { result: MarketingPlanResult }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 border-b pb-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold">已生成营销方案</h2>
          <p className="mt-1 text-sm text-muted-foreground">结构化模拟 AI 输出</p>
        </div>
        <span className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
          可用于演示
        </span>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        <PlanCard icon={<UsersRound className="h-4 w-4" />} title="人口特征">
          <List items={result.customerPersona.demographics} />
        </PlanCard>
        <PlanCard icon={<Target className="h-4 w-4" />} title="核心痛点">
          <List items={result.customerPersona.painPoints} />
        </PlanCard>
        <PlanCard icon={<Lightbulb className="h-4 w-4" />} title="购买动机">
          <List items={result.customerPersona.motivations} />
        </PlanCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <PlanCard icon={<Megaphone className="h-4 w-4" />} title="营销策略">
          <div className="mb-4 rounded-lg border bg-card p-3">
            <div className="mb-1 text-xs font-medium text-muted-foreground">市场定位</div>
            <p className="text-sm leading-6">{result.marketingStrategy.positioning}</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <SubList title="推荐渠道" items={result.marketingStrategy.channels} />
            <SubList title="沟通信息" items={result.marketingStrategy.messaging} />
          </div>
        </PlanCard>

        <PlanCard icon={<BarChart3 className="h-4 w-4" />} title="增长计划">
          <SubList title="首个 30 天" items={result.growthPlan.first30Days} />
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SubList title="关键指标" items={result.growthPlan.kpis} />
            <SubList
              title="预算分配"
              items={result.growthPlan.suggestedBudgetAllocation}
            />
          </div>
        </PlanCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <PlanCard icon={<Send className="h-4 w-4" />} title="5 条社交内容">
          <List items={result.contentIdeas.socialMediaPosts} />
        </PlanCard>
        <PlanCard icon={<Newspaper className="h-4 w-4" />} title="3 个博客选题">
          <List items={result.contentIdeas.blogIdeas} />
        </PlanCard>
        <PlanCard icon={<Clapperboard className="h-4 w-4" />} title="3 个短视频创意">
          <List items={result.contentIdeas.shortVideoIdeas} />
        </PlanCard>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

function PlanCard({
  icon,
  title,
  children
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-xl border bg-background/50 p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-primary">
          {icon}
        </div>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {children}
    </article>
  );
}

function SubList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border bg-card p-3">
      <div className="mb-2 text-xs font-medium text-muted-foreground">{title}</div>
      <List items={items} />
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ai" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
