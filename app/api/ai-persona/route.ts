import { NextResponse } from "next/server";

import { AIServiceError, generatePersona } from "@/services/ai/ai-client";
import type { PersonaRequest } from "@/services/ai/types";

type PersonaRequestBody = Partial<PersonaRequest>;

export async function POST(request: Request) {
  const body = (await request.json()) as PersonaRequestBody;
  const salesName = body.salesName?.trim();
  const city = body.city?.trim();
  const interests = body.interests?.trim();
  const age = body.age?.trim();
  const salesExperience = body.salesExperience?.trim();

  if (!salesName || !city || !interests || !age || !salesExperience) {
    return NextResponse.json({ error: "Please complete all fields." }, { status: 400 });
  }

  try {
    const response = await generatePersona({
      salesName,
      city,
      interests,
      age,
      salesExperience
    });

    return NextResponse.json(response.output);
  } catch (error) {
    if (error instanceof AIServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json(
      {
        persona: error instanceof Error ? error.message : "AI returned unstructured text.",
        contentDirection: "AI returned unstructured text. Please regenerate.",
        recommendedPlatforms: [],
        updateFrequency: "未识别"
      },
      { status: 200 }
    );
  }
}
