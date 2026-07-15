export type AIProvider = "openai" | "mock";

export type AIRequest<TInput = unknown> = {
  templateId: string;
  input: TInput;
  model?: string;
  temperature?: number;
};

export type AIResponse<TOutput = unknown> = {
  output: TOutput;
  rawText: string;
  model: string;
  provider: AIProvider;
};

export type PromptTemplate<TInput = unknown> = {
  id: string;
  system: string;
  createUserMessage: (input: TInput) => string;
  temperature?: number;
};

export type PersonaRequest = {
  salesName: string;
  city: string;
  interests: string;
  age: string;
  salesExperience: string;
};

export type PersonaResult = {
  persona: string;
  contentDirection: string;
  recommendedPlatforms: string[];
  updateFrequency: string;
};

export type ContentRequest = {
  vehicleModel: string;
  customerType: string;
  platform: string;
  marketingGoal: string;
};

export type ContentResult = {
  moments: string;
  xiaohongshu: string;
  douyinScript: string;
  videoAccount: string;
};

export type GrowthAdviceResult = {
  summary: string;
  actions: string[];
  risk: string;
};

export type MarketingPlanRequest = {
  productName: string;
  productDescription: string;
  targetAudience: string;
  budget: string;
  marketingGoal: string;
};

export type MarketingPlanResult = {
  customerPersona: {
    demographics: string[];
    painPoints: string[];
    motivations: string[];
  };
  marketingStrategy: {
    positioning: string;
    channels: string[];
    messaging: string[];
  };
  contentIdeas: {
    socialMediaPosts: string[];
    blogIdeas: string[];
    shortVideoIdeas: string[];
  };
  growthPlan: {
    first30Days: string[];
    kpis: string[];
    suggestedBudgetAllocation: string[];
  };
};

export type CustomerPersonaRequest = {
  productName: string;
  productCategory: string;
  productPrice: string;
  targetMarket: string;
};

export type CustomerPersonaResult = {
  basicInformation: {
    name: string;
    age: string;
    occupation: string;
    income: string;
    education: string;
  };
  personality: {
    interests: string[];
    values: string[];
    lifestyle: string[];
  };
  painPoints: string[];
  buyingMotivation: {
    mainMotivations: string[];
    purchaseTriggers: string[];
  };
  preferredMarketingChannels: {
    socialMedia: string;
    searchEngine: string;
    email: string;
    shortVideo: string;
  };
  customerJourney: {
    awareness: string;
    consideration: string;
    purchase: string;
    loyalty: string;
  };
};

export type ContentGeneratorPlatform =
  "Xiaohongshu" | "Douyin" | "WeChat" | "LinkedIn" | "X (Twitter)";

export type ContentGeneratorRequest = {
  productName: string;
  productDescription: string;
  targetAudience: string;
  platform: ContentGeneratorPlatform;
};

export type ContentGeneratorResult = {
  socialPosts: string[];
  shortVideoIdeas: string[];
  blogTitles: string[];
  advertisingHeadlines: string[];
  ctaSuggestions: string[];
  recommendedHashtags: string[];
};
