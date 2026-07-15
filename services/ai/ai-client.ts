import { createPromptMessages, type PromptTemplateId } from "./prompt-manager";
import { createMockContentGenerator } from "./mock-content-generator";
import { createMockCustomerPersona } from "./mock-customer-persona";
import { createMockMarketingPlan } from "./mock-marketing-plan";
import {
  extractOutputText,
  parseContentResult,
  parseGrowthAdvice,
  parsePersonaResult
} from "./response-parser";
import type {
  AIRequest,
  AIResponse,
  ContentGeneratorRequest,
  ContentGeneratorResult,
  ContentRequest,
  ContentResult,
  CustomerPersonaRequest,
  CustomerPersonaResult,
  GrowthAdviceResult,
  MarketingPlanRequest,
  MarketingPlanResult,
  PersonaRequest,
  PersonaResult
} from "./types";

const defaultModel = "gpt-4.1-mini";
const openAIResponsesEndpoint = "https://api.openai.com/v1/responses";

type OpenAIErrorPayload = {
  error?: {
    message?: string;
  };
};

export class AIServiceError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "AIServiceError";
    this.status = status;
  }
}

function getAIConfig() {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL ?? defaultModel;

  if (!apiKey) {
    throw new AIServiceError(
      "OPENAI_API_KEY is missing. Add it to frontend/.env.local before generating.",
      500
    );
  }

  return {
    apiKey,
    model
  };
}

export async function generateAIResponse<TInput, TOutput>(
  request: AIRequest<TInput>,
  parseOutput: (text: string) => TOutput
): Promise<AIResponse<TOutput>> {
  const config = getAIConfig();
  const { template, messages } = createPromptMessages<TInput>(
    request.templateId as PromptTemplateId,
    request.input
  );
  const model = request.model ?? config.model;

  const response = await fetch(openAIResponsesEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      input: messages,
      temperature: request.temperature ?? template.temperature ?? 0.7
    })
  });

  const data = (await response.json()) as OpenAIErrorPayload;

  if (!response.ok) {
    throw new AIServiceError(data.error?.message ?? "OpenAI API request failed.", response.status);
  }

  const rawText = extractOutputText(data);

  return {
    output: parseOutput(rawText),
    rawText,
    model,
    provider: "openai"
  };
}

export async function generatePersona(input: PersonaRequest): Promise<AIResponse<PersonaResult>> {
  return generateAIResponse<PersonaRequest, PersonaResult>(
    {
      templateId: "persona.generate",
      input
    },
    parsePersonaResult
  );
}

export async function generateContent(input: ContentRequest): Promise<AIResponse<ContentResult>> {
  return generateAIResponse<ContentRequest, ContentResult>(
    {
      templateId: "content.generate",
      input
    },
    parseContentResult
  );
}

export async function generateGrowthAdvice<TInput>(
  input: TInput
): Promise<AIResponse<GrowthAdviceResult>> {
  return generateAIResponse<TInput, GrowthAdviceResult>(
    {
      templateId: "growth.generate-advice",
      input
    },
    parseGrowthAdvice
  );
}

export async function generateMarketingPlan(
  input: MarketingPlanRequest
): Promise<AIResponse<MarketingPlanResult>> {
  const { messages } = createPromptMessages<MarketingPlanRequest>("marketing.generate-plan", input);
  const rawText = JSON.stringify({ messages, input });

  return {
    output: createMockMarketingPlan(input),
    rawText,
    model: "mock-marketing-generator-v1",
    provider: "mock"
  };
}

export async function generateCustomerPersona(
  input: CustomerPersonaRequest
): Promise<AIResponse<CustomerPersonaResult>> {
  const { messages } = createPromptMessages<CustomerPersonaRequest>(
    "customer-persona.generate",
    input
  );
  const rawText = JSON.stringify({ messages, input });

  return {
    output: createMockCustomerPersona(input),
    rawText,
    model: "mock-persona-generator-v1",
    provider: "mock"
  };
}

export async function generateContentPack(
  input: ContentGeneratorRequest
): Promise<AIResponse<ContentGeneratorResult>> {
  const { messages } = createPromptMessages<ContentGeneratorRequest>(
    "content-generator.generate",
    input
  );
  const rawText = JSON.stringify({ messages, input });

  return {
    output: createMockContentGenerator(input),
    rawText,
    model: "mock-content-generator-v1",
    provider: "mock"
  };
}
