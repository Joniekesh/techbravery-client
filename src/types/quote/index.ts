export interface IProjectType {
  id: string;
  value: string;
  label: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProjectCoreFeature {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStackItem {
  id: string;
  value: string;
  label: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProjectItem {
  id: string;
  projectType: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  features: {
    id: string;
    name: string;
    isActive: boolean;
    projectFeatureId: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface IPlatform {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBudgetRange {
  id: string;
  label: string;
  minAmount: number;
  maxAmount: number;
  currency: string;
  position: number;
  isActive: boolean;
  quotes: IQuote[];
  createdAt: string;
  updatedAt: string;
}

export interface IProjectFeature {
  features: IProjectItem[];
  stacks: IStackItem[];
  types: IProjectType[];
  coreFeatures: IProjectCoreFeature[];
  platforms: IPlatform[];
  budgetRanges: IBudgetRange[];
}

export enum QuoteComplexity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum QuoteTimeline {
  ASAP = "ASAP",
  TWO_TO_THREE_MONTHS = "TWO_TO_THREE_MONTHS",
  THREE_TO_SIX_MONTHS = "THREE_TO_SIX_MONTHS",
  SIX_PLUS_MONTHS = "SIX_PLUS_MONTHS",
}

export enum QuoteBudgetRange {
  FIVE_TO_15K = "FIVE_TO_15K",
  FITEEN_TO_30K = "FITEEN_TO_30K",
  THIRTY_TO_50K = "THIRTY_TO_50K",
  FIFTYK_PLUS = "FIFTYK_PLUS",
}

export enum QuoteStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
  EXPIRED = "EXPIRED",
}

export interface QuoteUser {
  email: string;
  firstName: string;
  lastName: string;
  role: "CLIENT" | "ADMIN" | "STAFF" | "INVESTOR" | string;
}

export interface IQuote {
  id: string;
  quoteCode: string;
  fullName: string;
  projectName: string;
  email: string;
  phone: string | null;
  company: string | null;
  description: string;
  actualCost: number;
  estimatedCost: number;
  discountPercent: number;
  additionalNotes: string | null;
  targetUsers: string[];
  photos: string[];
  complexity: "LOW" | "MEDIUM" | "HIGH" | string;
  timeline:
    | "ONE_TO_TWO_WEEKS"
    | "TWO_TO_THREE_MONTHS"
    | "THREE_TO_SIX_MONTHS"
    | string;
  budgetRange: IBudgetRange;
  status:
    | "PENDING"
    | "REVIEWING"
    | "RESPONDED"
    | "ACCEPTED"
    | "REJECTED"
    | "EXPIRED"
    | string;
  acceptedTerms: boolean;
  acceptedTermsAt: string | null;
  respondedAt: string | null;
  responseNotes: string | null;
  expiresAt: string | null;
  deletedAt: string | null;
  ipAddress: string | null;
  country: string | null;
  assignedToId: string | null;
  projectTypeId: string;
  projectType: IProjectType;
  platformId: IProjectType;
  features: IProjectItem[];
  techStacks: IProjectItem[];
  userId: string;
  user: QuoteUser;
  createdAt: string;
  updatedAt: string;
}
