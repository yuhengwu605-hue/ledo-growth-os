"use client";

import { FormEvent, useMemo, useState } from "react";
import { Check, Clipboard, Download, LoaderCircle, RefreshCcw, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContentResult = {
  moments: string;
  xiaohongshu: string;
  douyinScript: string;
  videoAccount: string;
};

type ContentPayload = {
  vehicleModel: string;
  customerType: string;
  platform: string;
  marketingGoal: string;
};

const initialResult: ContentResult = {
  moments: "",
  xiaohongshu: "",
  douyinScript: "",
  videoAccount: ""
};

const contentSections = [
  { key: "moments", title: "朋友圈", tone: "私域触达" },
  { key: "xiaohongshu", title: "小红书", tone: "种草转化" },
  { key: "douyinScript", title: "抖音脚本", tone: "短视频表达" },
  { key: "videoAccount", title: "视频号文案", tone: "品牌信任" }
] as const;

export function ContentFactoryClient() {
  const [vehicleModel, setVehicleModel] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [platform, setPlatform] = useState("");
  const [marketingGoal, setMarketingGoal] = useState("");
  const [lastPayload, setLastPayload] = useState<ContentPayload | null>(null);
  const [result, setResult] = useState<ContentResult>(initialResult);
  const [copiedKey, setCopiedKey] = useState<keyof ContentResult | "all" | "">("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hasResult = Object.values(result).some(Boolean);

  const exportText = useMemo(() => {
    return [
      "# Ledo AI Content Factory",
      "",
      `车型：${lastPayload?.vehicleModel ?? vehicleModel}`,
      `客户类型：${lastPayload?.customerType ?? customerType}`,
      `平台：${lastPayload?.platform ?? platform}`,
      `营销目标：${lastPayload?.marketingGoal ?? marketingGoal}`,
      "",
      "## 朋友圈",
      result.moments,
      "",
      "## 小红书",
      result.xiaohongshu,
      "",
      "## 抖音脚本",
      result.douyinScript,
      "",
      "## 视频号文案",
      result.videoAccount
    ].join("\n");
  }, [customerType, lastPayload, marketingGoal, platform, result, vehicleModel]);

  async function generateContent(payload: ContentPayload) {
    setIsLoading(true);
    setError("");
    setCopiedKey("");
    setResult(initialResult);

    try {
      const response = await fetch("/api/ai-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Generate content failed.");
      }

      setLastPayload(payload);
      setResult(data);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Generate content failed.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void generateContent({
      vehicleModel,
      customerType,
      platform,
      marketingGoal
    });
  }

  function handleRegenerate() {
    if (!lastPayload) {
      return;
    }

    void generateContent(lastPayload);
  }

  async function copyText(key: keyof ContentResult | "all") {
    const text = key === "all" ? exportText : result[key];

    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(""), 1600);
  }

  function exportContent() {
    const blob = new Blob([exportText], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ledo-content-factory.md";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[360px_1fr]">
      <section className="rounded-xl border bg-card p-5 shadow-soft">
        <div className="mb-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-ai" />
            Enterprise Content Workflow
          </div>
          <h1 className="text-2xl font-semibold tracking-normal md:text-[28px]">
            AI Content Factory
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            输入车型、客户类型、平台和营销目标，生成多渠道可执行内容。
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field label="车型">
            <input
              value={vehicleModel}
              onChange={(event) => setVehicleModel(event.target.value)}
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
              placeholder="例如：乐道 L60"
              required
            />
          </Field>

          <Field label="客户类型">
            <input
              value={customerType}
              onChange={(event) => setCustomerType(event.target.value)}
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
              placeholder="例如：家庭升级型用户"
              required
            />
          </Field>

          <Field label="平台">
            <select
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
              required
            >
              <option value="">选择平台</option>
              <option value="朋友圈">朋友圈</option>
              <option value="小红书">小红书</option>
              <option value="抖音">抖音</option>
              <option value="视频号">视频号</option>
              <option value="全平台">全平台</option>
            </select>
          </Field>

          <Field label="营销目标">
            <textarea
              value={marketingGoal}
              onChange={(event) => setMarketingGoal(event.target.value)}
              className="min-h-28 w-full resize-none rounded-lg border bg-background px-3 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
              placeholder="例如：提升周末试驾预约，突出家庭空间、舒适体验和补能便利"
              required
            />
          </Field>

          {error ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          <Button className="w-full" disabled={isLoading} type="submit" variant="ai">
            {isLoading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Generate
          </Button>
        </form>
      </section>

      <section className="rounded-xl border bg-card p-5 shadow-soft">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-[15px] font-semibold">生成内容</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              朋友圈、小红书、抖音脚本和视频号文案
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              disabled={!hasResult || isLoading}
              onClick={() => void copyText("all")}
              variant="secondary"
            >
              {copiedKey === "all" ? (
                <Check className="h-4 w-4" />
              ) : (
                <Clipboard className="h-4 w-4" />
              )}
              Copy
            </Button>
            <Button
              disabled={!lastPayload || isLoading}
              onClick={handleRegenerate}
              variant="secondary"
            >
              <RefreshCcw className={cn("h-4 w-4", isLoading && "animate-spin")} />
              Regenerate
            </Button>
            <Button disabled={!hasResult || isLoading} onClick={exportContent} variant="secondary">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-[520px] flex-col items-center justify-center rounded-xl border bg-background/50 text-center">
            <LoaderCircle className="mb-4 h-6 w-6 animate-spin text-ai" />
            <div className="text-sm font-medium">正在生成企业级内容包</div>
            <div className="mt-1 text-xs text-muted-foreground">
              正在匹配车型卖点、客户意图和平台语气...
            </div>
          </div>
        ) : hasResult ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {contentSections.map((section) => {
              const value = result[section.key];

              return (
                <article key={section.key} className="rounded-xl border bg-background/50 p-4">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold">{section.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{section.tone}</p>
                    </div>
                    <Button
                      aria-label={`Copy ${section.title}`}
                      disabled={!value}
                      onClick={() => void copyText(section.key)}
                      size="sm"
                      variant="ghost"
                    >
                      {copiedKey === section.key ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Clipboard className="h-4 w-4" />
                      )}
                      Copy
                    </Button>
                  </div>
                  <p className="min-h-40 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                    {value}
                  </p>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-[520px] flex-col items-center justify-center rounded-xl border bg-background/50 text-center">
            <Sparkles className="mb-4 h-6 w-6 text-ai" />
            <div className="text-sm font-medium">等待生成</div>
            <div className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
              填写左侧输入并点击 Generate，多渠道内容会显示在这里。
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
