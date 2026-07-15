import { NextResponse } from "next/server";

import { generateMarketingPlan } from "@/services/ai/ai-client";
import type { MarketingPlanRequest } from "@/services/ai/types";

type MarketingPlanRequestBody = Partial<MarketingPlanRequest>;

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function POST(request: Request) {
  const body = (await request.json()) as MarketingPlanRequestBody;
  const productName = body.productName?.trim();
  const productDescription = body.productDescription?.trim();
  const targetAudience = body.targetAudience?.trim();
  const budget = body.budget?.trim();
  const marketingGoal = body.marketingGoal?.trim();

  if (!productName || !productDescription || !targetAudience || !budget || !marketingGoal) {
    return NextResponse.json({ error: "Please complete all fields." }, { status: 400 });
  }

  await delay(2200);

  const response = await generateMarketingPlan({
    productName,
    productDescription,
    targetAudience,
    budget,
    marketingGoal
  });

  return NextResponse.json(response.output);
}
