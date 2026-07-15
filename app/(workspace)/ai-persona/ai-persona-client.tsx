"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

type PersonaResult = {
  persona: string;
  contentDirection: string;
  recommendedPlatforms: string[];
  updateFrequency: string;
};

const initialResult: PersonaResult = {
  persona: "",
  contentDirection: "",
  recommendedPlatforms: [],
  updateFrequency: ""
};

export function AiPersonaClient() {
  const [salesName, setSalesName] = useState("");
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState("");
  const [age, setAge] = useState("");
  const [salesExperience, setSalesExperience] = useState("");
  const [result, setResult] = useState<PersonaResult>(initialResult);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setResult(initialResult);

    try {
      const response = await fetch("/api/ai-persona", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          salesName,
          city,
          interests,
          age,
          salesExperience
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Generate persona failed.");
      }

      setResult(data);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Generate persona failed.");
    } finally {
      setIsLoading(false);
    }
  }

  const hasResult =
    result.persona ||
    result.contentDirection ||
    result.recommendedPlatforms.length > 0 ||
    result.updateFrequency;

  return (
    <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-xl border bg-card p-5 shadow-soft">
        <div className="mb-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-ai" />
            OpenAI Powered
          </div>
          <h1 className="text-2xl font-semibold tracking-normal md:text-[28px]">AI Persona</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            输入销售顾问信息，生成适合个人社媒获客的人设、内容方向、推荐平台和更新频率。
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">销售姓名</span>
              <input
                value={salesName}
                onChange={(event) => setSalesName(event.target.value)}
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                placeholder="例如：陈佳宁"
                required
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">城市</span>
              <input
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                placeholder="例如：上海"
                required
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">年龄</span>
              <input
                value={age}
                onChange={(event) => setAge(event.target.value)}
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                placeholder="例如：29"
                inputMode="numeric"
                required
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">销售经验</span>
              <input
                value={salesExperience}
                onChange={(event) => setSalesExperience(event.target.value)}
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                placeholder="例如：3年新能源销售"
                required
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium">兴趣</span>
            <textarea
              value={interests}
              onChange={(event) => setInterests(event.target.value)}
              className="min-h-28 w-full resize-none rounded-lg border bg-background px-3 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
              placeholder="例如：露营、亲子出行、智能座舱、城市通勤、短视频表达"
              required
            />
          </label>

          {error ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          <Button className="w-full sm:w-auto" disabled={isLoading} type="submit" variant="ai">
            {isLoading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Generate Persona
          </Button>
        </form>
      </section>

      <section className="rounded-xl border bg-card p-5 shadow-soft">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-[15px] font-semibold">输出结果</h2>
            <p className="mt-1 text-sm text-muted-foreground">由 OpenAI API 实时生成</p>
          </div>
          <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
            {hasResult ? "Ready" : "Empty"}
          </span>
        </div>

        {isLoading ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border bg-background/50 text-center">
            <LoaderCircle className="mb-4 h-6 w-6 animate-spin text-ai" />
            <div className="text-sm font-medium">正在生成销售人设</div>
            <div className="mt-1 text-xs text-muted-foreground">分析城市、兴趣与销售经验...</div>
          </div>
        ) : hasResult ? (
          <div className="space-y-4">
            <ResultBlock title="人设" value={result.persona} />
            <ResultBlock title="内容方向" value={result.contentDirection} />
            <div className="rounded-lg border bg-background/50 p-4">
              <div className="mb-3 text-sm font-medium">推荐平台</div>
              <div className="flex flex-wrap gap-2">
                {result.recommendedPlatforms.map((platform) => (
                  <span
                    key={platform}
                    className="rounded-full border bg-card px-3 py-1 text-sm text-muted-foreground"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
            <ResultBlock title="推荐更新频率" value={result.updateFrequency} />
          </div>
        ) : (
          <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border bg-background/50 text-center">
            <Sparkles className="mb-4 h-6 w-6 text-ai" />
            <div className="text-sm font-medium">等待生成</div>
            <div className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
              填写左侧信息后点击 Generate Persona，结果会显示在这里。
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function ResultBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border bg-background/50 p-4">
      <div className="mb-2 text-sm font-medium">{title}</div>
      <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{value}</p>
    </div>
  );
}
