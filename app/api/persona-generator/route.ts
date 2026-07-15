import { NextResponse } from "next/server";

import { generateCustomerPersona } from "@/services/ai/ai-client";
import type { CustomerPersonaRequest } from "@/services/ai/types";

type CustomerPersonaRequestBody = Partial<CustomerPersonaRequest>;

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function POST(request: Request) {
  const body = (await request.json()) as CustomerPersonaRequestBody;
  const productName = body.productName?.trim();
  const productCategory = body.productCategory?.trim();
  const productPrice = body.productPrice?.trim();
  const targetMarket = body.targetMarket?.trim();

  if (!productName || !productCategory || !productPrice || !targetMarket) {
    return NextResponse.json({ error: "Please complete all fields." }, { status: 400 });
  }

  await delay(2200);

  const response = await generateCustomerPersona({
    productName,
    productCategory,
    productPrice,
    targetMarket
  });

  return NextResponse.json(response.output);
}
