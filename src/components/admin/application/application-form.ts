import {
  AppStatus,
  InvestmentStage,
  type CreateApplicationForm,
} from "@/types/application";

export const defaultApplicationForm: CreateApplicationForm = {
  title: "",
  slug: "",

  shortDescription: "",
  longDescription: "",
  currencyId: null,

  thumbNail: "",
  thumbnailAssetId: null,

  images: [],

  investmentStage: InvestmentStage.SEED,
  status: AppStatus.DEVELOPMENT,

  isLive: false,
  isInvestmentEnabled: false,

  amountRealized: 0,
  valuation: 0,
  projectedReturn: 0,
  monthlyRevenue: 0,

  activeInvestors: 0,

  minInvestmentAmount: 0,
  maxInvestmentAmount: 0,
  investmentCap: 0,

  activeUsers: 0,
  monthlyVolume: 0,
  numberOfTransactions: 0,
  serverUptime: 0,
  averageSpeed: 0,

  countryIds: [],

  keyHighlights: [],

  roadmaps: [],

  appFeatures: [],

  appCallToAction: undefined,
};
