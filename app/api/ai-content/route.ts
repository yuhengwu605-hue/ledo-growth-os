import { NextResponse } from "next/server";

import { AIServiceError, generateContent } from "@/services/ai/ai-client";
import type { ContentRequest } from "@/services/ai/types";

type ContentRequestBody = Partial<ContentRequest>;

export async function POST(request: Request) {
  const body = (await request.json()) as ContentRequestBody;
  const vehicleModel = body.vehicleModel?.trim();
  const customerType = body.customerType?.trim();
  const platform = body.platform?.trim();
  const marketingGoal = body.marketingGoal?.trim();

  if (!vehicleModel || !customerType || !platform || !marketingGoal) {
    return NextResponse.json({ error: "Please complete all fields." }, { status: 400 });
  }

  try {
    const response = await generateContent({
      vehicleModel,
      customerType,
      platform,
      marketingGoal
    });

    return NextResponse.json(response.output);
  } catch (error) {
    if (error instanceof AIServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json(
      {
        moments: error instanceof Error ? error.message : "AI returned unstructured text.",
        xiaohongshu: "AI returned unstructured text. Please regenerate.",
        douyinScript: "AI returned unstructured text. Please regenerate.",
        videoAccount: "AI returned unstructured text. Please regenerate."
      },
      { status: 200 }
    );
  }
}
