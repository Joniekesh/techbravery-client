import { QuoteComplexity, QuoteTimeline } from "@/types/quote";

interface EstimateQuoteParams {
  projectType?: string;
  platform?: string;
  features?: string[];
  complexity?: QuoteComplexity;
  timeline?: QuoteTimeline;
}

export interface QuoteEstimate {
  price: number;
  timelineWeeks: number;
}

const BASE_PRICE_MAP: Record<string, number> = {
  "web-app": 3500,
  "mobile-app": 5500,
  ecommerce: 4500,
  saas: 10000,
  fintech: 12000,
  blockchain: 15000,
  "ai-development": 12000,
  both: 8500,
  mvp: 3000,
  "ui-ux": 2000,
  "devops-infrastructure": 4000,
  "api-integration": 2500,
  cybersecurity: 5000,
};

const FEATURE_UNIT_COST_MAP: Record<string, number> = {
  "web-app": 400,
  "mobile-app": 500,
  ecommerce: 450,
  saas: 600,
  fintech: 800,
  blockchain: 1000,
  "ai-development": 900,
  both: 700,
  mvp: 300,
  "ui-ux": 200,
  "devops-infrastructure": 350,
  "api-integration": 250,
  cybersecurity: 500,
};

const PLATFORM_COST_MAP: Record<string, number> = {
  web: 0,
  ios: 2000,
  android: 2000,
  both: 3500,
};

const BASE_TIMELINE_MAP: Record<string, number> = {
  "web-app": 6,
  "mobile-app": 10,
  ecommerce: 8,
  saas: 14,
  fintech: 16,
  blockchain: 18,
  "ai-development": 16,
  both: 12,
  mvp: 4,
  "ui-ux": 3,
  "devops-infrastructure": 6,
  "api-integration": 4,
  cybersecurity: 6,
};

const PLATFORM_TIMELINE_MAP: Record<string, number> = {
  web: 0,
  ios: 4,
  android: 4,
  both: 6,
};

export function estimateQuote({
  projectType,
  platform,
  features = [],
  complexity = QuoteComplexity.LOW,
  timeline = QuoteTimeline.TWO_TO_THREE_MONTHS,
}: EstimateQuoteParams): QuoteEstimate {
  if (!projectType) {
    return {
      price: 0,
      timelineWeeks: 0,
    };
  }

  const normalizedPlatform = platform?.toLowerCase() ?? "web";

  // -------------------------
  // PRICE CALCULATION
  // -------------------------

  const basePrice = BASE_PRICE_MAP[projectType] ?? 3000;

  const featureUnitCost = FEATURE_UNIT_COST_MAP[projectType] ?? 300;

  const featureCost = features.length * featureUnitCost;

  const platformCost = PLATFORM_COST_MAP[normalizedPlatform] ?? 0;

  const complexityMultiplier =
    complexity === QuoteComplexity.HIGH
      ? 1.3
      : complexity === QuoteComplexity.MEDIUM
        ? 1.15
        : 1;

  const rushMultiplier = timeline === QuoteTimeline.ASAP ? 1.2 : 1;

  const subtotal = basePrice + featureCost + platformCost;

  const finalPrice = subtotal * complexityMultiplier * rushMultiplier;

  // -------------------------
  // TIMELINE CALCULATION
  // -------------------------

  const baseTimeline = BASE_TIMELINE_MAP[projectType] ?? 6;

  const platformTimeline = PLATFORM_TIMELINE_MAP[normalizedPlatform] ?? 0;

  const featureTimeline = features.length * 0.5;

  const complexityTimelineMultiplier =
    complexity === QuoteComplexity.HIGH
      ? 1.25
      : complexity === QuoteComplexity.MEDIUM
        ? 1.1
        : 1;

  const totalTimeline =
    (baseTimeline + platformTimeline + featureTimeline) *
    complexityTimelineMultiplier;

  return {
    price: Math.round(finalPrice),
    timelineWeeks: Math.round(totalTimeline),
  };
}
