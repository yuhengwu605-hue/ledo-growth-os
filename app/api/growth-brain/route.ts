import { NextResponse } from "next/server";

import { AIServiceError, generateGrowthAdvice } from "@/services/ai/ai-client";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const response = await generateGrowthAdvice(body);

    return NextResponse.json(response.output);
  } catch (error) {
    if (error instanceof AIServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json(
      {
        summary: error instanceof Error ? error.message : "AI returned unstructured text.",
        actions: [],
        risk: "AI returned unstructured text. Please regenerate."
      },
      { status: 200 }
    );
  }
}
