"use client";

import { FormEvent, ReactNode, useState } from "react";
import {
  BriefcaseBusiness,
  DollarSign,
  GraduationCap,
  Heart,
  Mail,
  PlaySquare,
  Search,
  Send,
  Share2,
  ShoppingBag,
  Sparkles,
  Target,
  UserRound,
  UsersRound
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DemoEmptyState, DemoLoadingState } from "@/components/ui/demo-state";
import type { CustomerPersonaResult } from "@/services/ai/types";

type FormState = {
  productName: string;
  productCategory: string;
  productPrice: string;
  targetMarket: string;
};

const initialForm: FormState = {
  productName: "Ledo Growth OS",
  productCategory: "AI 营销 SaaS",
  productPrice: "企业版年费 ¥300,000",
  targetMarket: "中国汽车行业区域营销团队"
};

export function PersonaGeneratorClient() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [result, setResult] = useState<CustomerPersonaResult | null>(null);
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
      const response = await fetch("/api/persona-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "客户画像生成失败，请稍后重试。");
      }

      setResult(data);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "客户画像生成失败，请稍后重试。");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground shadow-soft">
            <UsersRound className="h-3.5 w-3.5 text-ai" />
            演示功能 · 模拟 AI 响应
          </div>
          <h1 className="text-2xl font-semibold tracking-normal md:text-[28px]">
            客户画像生成器
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            根据产品类别、价格和目标市场，生成详细的目标客户画像。本演示使用统一 AI 架构与模拟输出。
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form className="rounded-xl border bg-card p-5 shadow-soft" onSubmit={handleSubmit}>
          <div className="mb-5">
            <h2 className="text-[15px] font-semibold">画像信息</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              描述产品与目标市场，系统将推演对应的购买者画像。
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

            <Field label="产品类别">
              <input
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                onChange={(event) => updateField("productCategory", event.target.value)}
                required
                value={form.productCategory}
              />
            </Field>

            <Field label="产品价格">
              <input
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                onChange={(event) => updateField("productPrice", event.target.value)}
                required
                value={form.productPrice}
              />
            </Field>

            <Field label="目标市场">
              <textarea
                className="min-h-28 w-full resize-none rounded-lg border bg-background px-3 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                onChange={(event) => updateField("targetMarket", event.target.value)}
                required
                value={form.targetMarket}
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
              生成客户画像
            </Button>
          </div>
        </form>

        <div className="min-h-[680px] rounded-xl border bg-card p-5 shadow-soft">
          {isLoading ? (
            <DemoLoadingState
              description="正在分析人口特征、购买动机、渠道偏好和客户旅程。"
              title="正在生成客户画像"
            />
          ) : result ? (
            <PersonaResultView result={result} />
          ) : (
            <DemoEmptyState
              description="填写产品背景后，点击“生成客户画像”即可查看详细的客户分析结果。"
              icon={<UsersRound className="h-6 w-6" />}
              title="暂未生成客户画像"
            />
          )}
        </div>
      </section>
    </div>
  );
}

function PersonaResultView({ result }: { result: CustomerPersonaResult }) {
  const basicInfo = [
    { label: "姓名", value: result.basicInformation.name, icon: UserRound },
    { label: "年龄", value: result.basicInformation.age, icon: Sparkles },
    { label: "职业", value: result.basicInformation.occupation, icon: BriefcaseBusiness },
    { label: "收入", value: result.basicInformation.income, icon: DollarSign },
    { label: "教育背景", value: result.basicInformation.education, icon: GraduationCap }
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 border-b pb-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold">已生成客户画像</h2>
          <p className="mt-1 text-sm text-muted-foreground">结构化模拟 AI 输出</p>
        </div>
        <span className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
          可用于演示
        </span>
      </div>

      <section className="grid gap-4 lg:grid-cols-5">
        {basicInfo.map((item) => (
          <article key={item.label} className="rounded-xl border bg-background/50 p-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-primary">
              <item.icon className="h-4 w-4" />
            </div>
            <div className="text-xs text-muted-foreground">{item.label}</div>
            <div className="mt-1 text-sm font-medium leading-6">{item.value}</div>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <PlanCard icon={<Heart className="h-4 w-4" />} title="兴趣偏好">
          <List items={result.personality.interests} />
        </PlanCard>
        <PlanCard icon={<Target className="h-4 w-4" />} title="价值观">
          <List items={result.personality.values} />
        </PlanCard>
        <PlanCard icon={<ShoppingBag className="h-4 w-4" />} title="生活方式">
          <List items={result.personality.lifestyle} />
        </PlanCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <PlanCard icon={<Sparkles className="h-4 w-4" />} title="五大核心痛点">
          <List items={result.painPoints} />
        </PlanCard>

        <PlanCard icon={<ShoppingBag className="h-4 w-4" />} title="购买动机">
          <div className="grid gap-3 md:grid-cols-2">
            <SubList title="主要动机" items={result.buyingMotivation.mainMotivations} />
            <SubList title="购买触发点" items={result.buyingMotivation.purchaseTriggers} />
          </div>
        </PlanCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        <ChannelCard
          icon={<Share2 className="h-4 w-4" />}
          title="社交媒体"
          value={result.preferredMarketingChannels.socialMedia}
        />
        <ChannelCard
          icon={<Search className="h-4 w-4" />}
          title="搜索引擎"
          value={result.preferredMarketingChannels.searchEngine}
        />
        <ChannelCard
          icon={<Mail className="h-4 w-4" />}
          title="邮件营销"
          value={result.preferredMarketingChannels.email}
        />
        <ChannelCard
          icon={<PlaySquare className="h-4 w-4" />}
          title="短视频"
          value={result.preferredMarketingChannels.shortVideo}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        <JourneyCard title="认知" value={result.customerJourney.awareness} />
        <JourneyCard title="考虑" value={result.customerJourney.consideration} />
        <JourneyCard title="购买" value={result.customerJourney.purchase} />
        <JourneyCard title="忠诚" value={result.customerJourney.loyalty} />
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

function ChannelCard({ icon, title, value }: { icon: ReactNode; title: string; value: string }) {
  return (
    <article className="rounded-xl border bg-background/50 p-4">
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-primary">
        {icon}
      </div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{value}</p>
    </article>
  );
}

function JourneyCard({ title, value }: { title: string; value: string }) {
  return (
    <article className="rounded-xl border bg-background/50 p-4">
      <div className="mb-2 text-sm font-semibold">{title}</div>
      <p className="text-sm leading-6 text-muted-foreground">{value}</p>
    </article>
  );
}
