import { ImageAsset } from "../image-asset";
import { IInvestment } from "../profile";

export interface InvestmentApplication {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  longDescription?: string;
  thumbNail?: ImageAsset | null;
  images?: string[];
  investmentStage?: string;
  status?: string;
  isLive?: boolean;
  isInvestmentEnabled?: boolean;
  minInvestmentAmount?: string;
  maxInvestmentAmount?: string;
  investmentCap?: string;
  valuation?: string;
  projectedReturn?: string;
  monthlyRevenue?: string;
  currency?: {
    id: string;
    iso: string;
    iso2: string;
  };
}

export interface InvestmentInterest {
  id: string;
  reference: string;
  status: string;
  submittedAt?: string;
  application: InvestmentApplication;
  investments: IInvestment[];
}
