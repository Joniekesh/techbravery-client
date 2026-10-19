import { ImageAsset } from "../image-asset";

export enum AppStatus {
  ACTIVE = "ACTIVE",
  DEVELOPMENT = "DEVELOPMENT",
  SCALING = "SCALING",
}

export const InvestmentStage = {
  PRE_SEED: "PRE_SEED",
  SEED: "SEED",
  SERIES_A: "SERIES_A",
  ANGEL: "ANGEL",
} as const;

export type InvestmentStage =
  (typeof InvestmentStage)[keyof typeof InvestmentStage];

export enum AppDevRoadmapStatus {
  PLANNED = "PLANNED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum AppDevRoadmapQuarter {
  Q1 = "Q1",
  Q2 = "Q2",
  Q3 = "Q3",
  Q4 = "Q4",
}

export interface ApplicationCountry {
  id: string;
  name: string;
  iso2?: string | null;
  iso3?: string | null;
  flag?: string | null;
}

export interface ApplicationHighlight {
  id: string;
  name: string;
  isActive: boolean;
  deletedAt?: string | null;
}

export interface ApplicationFeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
  value?: number | null;
}

export interface ApplicationFeature {
  id: string;
  title: string;
  description: string;
  appFeatureItems: ApplicationFeatureItem[];
}

export interface ApplicationRoadmap {
  id: string;
  title: string;
  status: AppDevRoadmapStatus;
  quarter: AppDevRoadmapQuarter;
  year?: string | null;
  isCompleted: boolean;
}

export interface ApplicationCTA {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ApplicationUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ApplicationInvestment {
  id: string;
  totalInvested: number;
  averageROI: number;
  status: string;
  createdAt: string;
}

export interface ApplicationImage {
  assetId: string;
  url: string;
  fileId?: string | null;
  name?: string | null;
}

export interface Application {
  id: string;
  userId?: string | null;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  thumbNail: ImageAsset;
  thumbnailFileId?: string | null;
  images: ImageAsset[];
  investmentStage: InvestmentStage;
  status: AppStatus;
  isLive: boolean;
  isInvestmentEnabled: boolean;
  amountRealized: number;
  valuation: number;
  projectedReturn: number;
  monthlyRevenue: number;

  activeInvestors: number;
  minInvestmentAmount: number;
  maxInvestmentAmount: number;
  investmentCap: number;

  activeUsers: number;
  monthlyVolume: number;
  numberOfTransactions: number;
  serverUptime: number;
  averageSpeed: number;

  countriesOfCoverage: ApplicationCountry[];
  keyHighlights: ApplicationHighlight[];
  roadMaps: ApplicationRoadmap[];
  appFeatures: ApplicationFeature[];
  appCallToAction?: ApplicationCTA | null;

  user?: ApplicationUser | null;
  investments?: ApplicationInvestment[];

  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface ApplicationListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export interface ApplicationListResponse {
  data: Application[];
  meta: ApplicationListMeta;
}

export interface ApplicationQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: AppStatus;
  investmentStage?: InvestmentStage;
  isLive?: boolean;
}

export interface ApplicationHighlightForm {
  name: string;
  isActive: boolean;
}

export interface ApplicationRoadmapForm {
  title: string;
  status: string;
  quarter: string;
  year?: number | null;
  isCompleted: boolean;
}

export interface ApplicationFeatureItemForm {
  title: string;
  description: string;
  icon: string | null;
  value: number | null;
}

export interface ApplicationFeatureForm {
  title: string;
  description: string;
  items: ApplicationFeatureItemForm[];
}

export interface ApplicationCTAForm {
  icon: string;
  title: string;
  description: string;
}

export interface ApplicationCallToActionForm {
  icon: string;
  title: string;
  description: string;
}

export interface CreateApplicationForm {
  title: string;
  slug: string;
  currencyId: string | null;

  shortDescription: string;
  longDescription: string;
  thumbNail: string;
  thumbnailAssetId: string | null;
  images: ApplicationImage[];
  investmentStage: InvestmentStage;
  status: AppStatus;
  isLive: boolean;
  isInvestmentEnabled: boolean;

  amountRealized: number;
  valuation: number;
  projectedReturn: number;
  monthlyRevenue: number;

  activeInvestors: number;

  minInvestmentAmount: number;
  maxInvestmentAmount: number;
  investmentCap: number;

  activeUsers: number;
  monthlyVolume: number;
  numberOfTransactions: number;
  serverUptime: number;
  averageSpeed: number;

  countryIds: string[];

  keyHighlights: ApplicationHighlightForm[];
  roadmaps: ApplicationRoadmapForm[];
  appFeatures: ApplicationFeatureForm[];

  appCallToAction?: ApplicationCallToActionForm;
}

export interface CreateApplicationPayload {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  // thumbNail: string;
  thumbNailAssetId: string;
  images?: string[];
  imageAssetIds?: string[];

  investmentStage?: string;
  status?: string;
  isLive?: boolean;

  amountRealized?: number;
  valuation?: number;
  projectedReturn?: number;
  monthlyRevenue?: number;

  activeInvestors?: number;
  minInvestmentAmount?: number;
  maxInvestmentAmount?: number;
  investmentCap?: number;

  activeUsers?: number;
  monthlyVolume?: number;
  numberOfTransactions?: number;
  serverUptime?: number;
  averageSpeed?: number;
  isInvestmentEnabled?: boolean;

  countryIds?: string[];
  currencyId?: string;

  keyHighlights?: {
    name: string;
    isActive?: boolean;
  }[];

  roadmaps?: {
    title: string;
    status?: string;
    quarter?: string;
    year?: number;
    isCompleted?: boolean;
  }[];

  appFeatures?: {
    title: string;
    description: string;
    items?: {
      title: string;
      description: string;
      icon?: string;
      value?: number;
    }[];
  }[];

  appCallToAction?: {
    icon: string;
    title: string;
    description: string;
  };
}

export interface UpdateApplicationPayload {
  title: string;
  slug: string;
  currencyId: string | null;
  shortDescription: string;
  longDescription: string;
  thumbnailAssetId: string;
  imageAssetIds: string[];
  investmentStage: string;
  status: string;
  isLive: boolean;
  isInvestmentEnabled: boolean;

  amountRealized: string | number;
  valuation: string | number;
  projectedReturn: string | number;
  monthlyRevenue: string | number;
  activeInvestors: number;
  minInvestmentAmount: string | number;
  maxInvestmentAmount: string | number;
  investmentCap: string | number;

  activeUsers: number;
  monthlyVolume: number;
  numberOfTransactions: number;
  serverUptime: number;
  averageSpeed: number;

  countryIds: string[];

  keyHighlights: Array<{
    name: string;
    isActive: boolean;
  }>;

  roadmaps: Array<{
    title: string;
    status: string;
    quarter: string;
    year?: number;
    isCompleted: boolean;
  }>;

  appFeatures: Array<{
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      icon?: string;
      value?: number | null;
    }>;
  }>;

  appCallToAction?: {
    icon: string;
    title: string;
    description: string;
  } | null;
}
