import { NextResponse } from "next/server";

import { generateContentPack } from "@/services/ai/ai-client";
import type { ContentGeneratorPlatform, ContentGeneratorRequest } from "@/services/ai/types";

type ContentGeneratorRequestBody = Partial<ContentGeneratorRequest>;

const platformOptions: ContentGeneratorPlatform[] = [
  "Xiaohongshu",
  "Douyin",
  "WeChat",
  "LinkedIn",
  "X (Twitter)"
];

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function isPlatform(value: string): value is ContentGeneratorPlatform {
  return platformOptions.includes(value as ContentGeneratorPlatform);
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContentGeneratorRequestBody;
  const productName = body.productName?.trim();
  const productDescription = body.productDescription?.trim();
  const targetAudience = body.targetAudience?.trim();
  const platform = body.platform?.trim();

  if (!productName || !productDescription || !targetAudience || !platform) {
    return NextResponse.json({ error: "Please complete all fields." }, { status: 400 });
  }

  if (!isPlatform(platform)) {
    return NextResponse.json({ error: "Please select a supported platform." }, { status: 400 });
  }

  await delay(2100);

  const response = await generateContentPack({
    productName,
    productDescription,
    targetAudience,
    platform
  });

  return NextResponse.json(response.output);
}
