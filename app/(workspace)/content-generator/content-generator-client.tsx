"use client";

import { FormEvent, ReactNode, useState } from "react";
import {
  Clapperboard,
  FileText,
  Hash,
  Lightbulb,
  Megaphone,
  MousePointerClick,
  Newspaper,
  Send,
  Sparkles
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DemoEmptyState, DemoLoadingState } from "@/components/ui/demo-state";
import type { ContentGeneratorPlatform, ContentGeneratorResult } from "@/services/ai/types";

type FormState = {
  productName: string;
  productDescription: string;
  targetAudience: string;
  platform: ContentGeneratorPlatform | "";
};

const platformOptions: ContentGeneratorPlatform[] = [
  "Xiaohongshu",
  "Douyin",
  "WeChat",
  "LinkedIn",
  "X (Twitter)"
];

const initialForm: FormState = {
  productName: "Ledo Growth OS",
  productDescription:
    "将产品信息和用户信号转化为增长团队全平台内容素材包的 AI 营销操作系统。",
  targetAudience: "区域营销负责人和销售赋能团队",
  platform: "LinkedIn"
};

export function ContentGeneratorClient() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [result, setResult] = useState<ContentGeneratorResult | null>(null);
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
      const response = await fetch("/api/content-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "内容生成失败，请稍后重试。");
      }

      setResult(data);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "内容生成失败，请稍后重试。");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground shadow-soft">
            <FileText className="h-3.5 w-3.5 text-ai" />
            演示功能 · 模拟 AI 响应
          </div>
          <h1 className="text-2xl font-semibold tracking-normal md:text-[28px]">
            内容生成器
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            根据产品信息生成匹配平台风格的营销内容。本演示使用统一 AI 服务层与真实感模拟结果。
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form className="rounded-xl border bg-card p-5 shadow-soft" onSubmit={handleSubmit}>
          <div className="mb-5">
            <h2 className="text-[15px] font-semibold">内容信息</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              填写产品背景，并选择主投放平台。
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

            <Field label="投放平台">
              <select
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
                onChange={(event) => updateField("platform", event.target.value)}
                required
                value={form.platform}
              >
                {platformOptions.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
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
              生成内容
            </Button>
          </div>
        </form>

        <div className="min-h-[680px] rounded-xl border bg-card p-5 shadow-soft">
          {isLoading ? (
            <DemoLoadingState
              description="正在规划社交内容、短视频、博客选题、广告标题、行动号召和话题标签。"
              title="正在生成内容素材包"
            />
          ) : result ? (
            <ContentResultView result={result} />
          ) : (
            <DemoEmptyState
              description="填写产品背景后，点击“生成内容”即可查看完整的内容素材包。"
              icon={<Sparkles className="h-6 w-6" />}
              title="暂未生成内容"
            />
          )}
        </div>
      </section>
    </div>
  );
}

function ContentResultView({ result }: { result: ContentGeneratorResult }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 border-b pb-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold">已生成内容素材包</h2>
          <p className="mt-1 text-sm text-muted-foreground">结构化模拟 AI 输出</p>
        </div>
        <span className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
          可用于演示
        </span>
      </div>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <PlanCard icon={<Megaphone className="h-4 w-4" />} title="社交内容">
          <NumberedList items={result.socialPosts} />
        </PlanCard>
        <PlanCard icon={<Clapperboard className="h-4 w-4" />} title="短视频创意">
          <NumberedList items={result.shortVideoIdeas} />
        </PlanCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <PlanCard icon={<Newspaper className="h-4 w-4" />} title="博客标题">
          <NumberedList items={result.blogTitles} />
        </PlanCard>
        <PlanCard icon={<Lightbulb className="h-4 w-4" />} title="广告标题">
          <CompactList items={result.advertisingHeadlines} />
        </PlanCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <PlanCard icon={<MousePointerClick className="h-4 w-4" />} title="行动号召建议">
          <CompactList items={result.ctaSuggestions} />
        </PlanCard>
        <PlanCard icon={<Hash className="h-4 w-4" />} title="推荐话题标签">
          <div className="flex flex-wrap gap-2">
            {result.recommendedHashtags.map((hashtag) => (
              <span
                key={hashtag}
                className="rounded-full border bg-card px-3 py-1 text-sm text-muted-foreground"
              >
                {hashtag}
              </span>
            ))}
          </div>
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

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={item} className="grid grid-cols-[28px_1fr] gap-2 text-sm leading-6">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border bg-card text-xs text-muted-foreground">
            {index + 1}
          </span>
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ol>
  );
}

function CompactList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-lg border bg-card px-3 py-2 text-sm text-muted-foreground"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
