import type { ContentResult, GrowthAdviceResult, PersonaResult } from "./types";

type OpenAIResponsePayload = {
  output_text?: string;
  output?: Array<{ content?: Array<{ text?: string }> }>;
};

export function extractOutputText(data: unknown): string {
  if (typeof data !== "object" || data === null) {
    return "";
  }

  const response = data as OpenAIResponsePayload;

  if (typeof response.output_text === "string") {
    return response.output_text;
  }

  return (
    response.output
      ?.flatMap((item) => item.content ?? [])
      .map((content) => content.text)
      .filter(Boolean)
      .join("\n") ?? ""
  );
}

export function parseJsonObject<TOutput>(text: string): Partial<TOutput> {
  const jsonMatch = text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("AI response did not include JSON.");
  }

  return JSON.parse(jsonMatch[0]) as Partial<TOutput>;
}

export function parsePersonaResult(text: string): PersonaResult {
  const parsed = parseJsonObject<PersonaResult>(text);

  return {
    persona: parsed.persona ?? "",
    contentDirection: parsed.contentDirection ?? "",
    recommendedPlatforms: Array.isArray(parsed.recommendedPlatforms)
      ? parsed.recommendedPlatforms
      : [],
    updateFrequency: parsed.updateFrequency ?? ""
  };
}

export function parseContentResult(text: string): ContentResult {
  const parsed = parseJsonObject<ContentResult>(text);

  return {
    moments: parsed.moments ?? "",
    xiaohongshu: parsed.xiaohongshu ?? "",
    douyinScript: parsed.douyinScript ?? "",
    videoAccount: parsed.videoAccount ?? ""
  };
}

export function parseGrowthAdvice(text: string): GrowthAdviceResult {
  const parsed = parseJsonObject<GrowthAdviceResult>(text);

  return {
    summary: parsed.summary ?? "",
    actions: Array.isArray(parsed.actions) ? parsed.actions : [],
    risk: parsed.risk ?? ""
  };
}
