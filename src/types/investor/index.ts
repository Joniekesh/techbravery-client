export const InvestorType = {
  INDIVIDUAL: "INDIVIDUAL",
  CORPORATE: "CORPORATE",
  INSTITUTION: "INSTITUTION",
} as const;

export type InvestorType = (typeof InvestorType)[keyof typeof InvestorType];

export const IndividualInvestmentType = {
  MYSELF: "MYSELF",
  SOMEONE_ELSE: "SOMEONE_ELSE",
  JOINT_INVESTMENT: "JOINT_INVESTMENT",
} as const;

export type IndividualInvestmentType =
  (typeof IndividualInvestmentType)[keyof typeof IndividualInvestmentType];

export const DocumentType = {
  PROOF_OF_ADDRESS: "PROOF_OF_ADDRESS",
  SOURCE_OF_FUNDS: "SOURCE_OF_FUNDS",
  TAX_DOCUMENT: "TAX_DOCUMENT",
  BANK_STATEMENT: "BANK_STATEMENT",
  CORPORATE_REGISTRATION: "CORPORATE_REGISTRATION",
  OTHER: "OTHER",
} as const;

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];

export const InvestorOnboardingReviewStatus = {
  DRAFT: "DRAFT",
  IN_PROGRESS: "IN_PROGRESS",
  SUBMITTED: "SUBMITTED",
  MORE_INFORMATION_REQUIRED: "MORE_INFORMATION_REQUIRED",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export type InvestorOnboardingReviewStatus =
  (typeof InvestorOnboardingReviewStatus)[keyof typeof InvestorOnboardingReviewStatus];

export type RiskTolerance =
  | "CONSERVATIVE"
  | "MODERATELY_CONSERVATIVE"
  | "MODERATE"
  | "MODERATELY_AGGRESSIVE"
  | "AGGRESSIVE";

export type InvestmentObjective =
  | "CAPITAL_PRESERVATION"
  | "INCOME"
  | "CAPITAL_GROWTH"
  | "DIVERSIFICATION"
  | "LONG_TERM_WEALTH";

export type LossReaction =
  | "SELL_IMMEDIATELY"
  | "REDUCE_EXPOSURE"
  | "HOLD"
  | "INVEST_MORE"
  | "UNSURE";

export type ExperienceLevel =
  | "NONE"
  | "BEGINNER"
  | "INTERMEDIATE"
  | "EXPERIENCED"
  | "PROFESSIONAL";

export type InvestmentProduct =
  | "STOCKS"
  | "BONDS"
  | "FUNDS"
  | "REAL_ESTATE"
  | "PRIVATE_COMPANIES"
  | "CRYPTO"
  | "STARTUPS"
  | "OTHER";

export type SourceOfFunds =
  | "EMPLOYMENT"
  | "BUSINESS"
  | "INVESTMENTS"
  | "SAVINGS"
  | "PROPERTY"
  | "INHERITANCE"
  | "GIFT"
  | "LOAN"
  | "OTHER";

export const RELATIONSHIPS = [
  "Spouse",
  "Parent",
  "Child",
  "Sibling",
  "Relative",
  "Friend",
  "Business partner",
  "Other",
];

export const ENTITY_TYPES = [
  { value: "PRIVATE_LIMITED_COMPANY", label: "Private Limited Company" },
  { value: "PUBLIC_LIMITED_COMPANY", label: "Public Limited Company" },
  {
    value: "LIMITED_LIABILITY_PARTNERSHIP",
    label: "Limited Liability Partnership",
  },
  { value: "PARTNERSHIP", label: "Partnership" },
  { value: "SOLE_PROPRIETORSHIP", label: "Sole Proprietorship" },
  { value: "TRUST", label: "Trust" },
  { value: "COOPERATIVE", label: "Cooperative" },
  { value: "NON_PROFIT", label: "Non-Profit Organization" },
  { value: "GOVERNMENT_ENTITY", label: "Government Entity" },
  { value: "OTHER", label: "Other" },
];

export const INSTITUTION_TYPES = [
  { value: "FINANCIAL_INSTITUTION", label: "Financial Institution" },
  { value: "INVESTMENT_FIRM", label: "Investment Firm" },
  {
    value: "CORPORATION",
    label: "Corporation",
  },
  { value: "GOVERNMENT_ENTITY", label: "Government Entity" },
  { value: "FAMILY_OFFICE", label: "Family Office" },
  { value: "OTHER", label: "Other" },
];

export interface ClassificationForm {
  investmentType: InvestorType | "";
  individualInvestmentType: IndividualInvestmentType;

  investmentAmount: string;
  minInvestmentAmount: string;
  maxInvestmentAmount: string;

  beneficiaryFirstName: string;
  beneficiaryMiddleName: string;
  beneficiaryLastName: string;
  beneficiaryEmail: string;
  beneficiaryPhoneNumber: string;
  beneficiaryDateOfBirth: string;
  beneficiaryRelationship: string;
  beneficiaryAddress: string;

  jointInvestorFirstName: string;
  jointInvestorMiddleName: string;
  jointInvestorLastName: string;
  jointInvestorEmail: string;
  jointInvestorPhoneNumber: string;
  jointInvestorDateOfBirth: string;
  jointInvestorRelationship: string;
  jointInvestorAddress: string;

  isPoliticallyExposed: boolean | null;

  corporateLegalName: string;
  corporateRegistrationNumber: string;
  corporateEntityType: string;
  corporateCountryOfRegistration: string;
  corporateDateOfIncorporation: string;
  corporateTaxIdentificationNumber: string;
  corporateWebsite: string;
  corporateBusinessActivity: string;
  corporateRegisteredAddress: string;

  institutionalLegalName: string;
  institutionalType: string;
  institutionalRegistrationNumber: string;
  institutionalCountryOfRegistration: string;
  institutionalDateOfEstablishment: string;
  institutionalTaxIdentificationNumber: string;
  institutionalRegulatoryBody: string;
  institutionalLicenseNumber: string;
  institutionalWebsite: string;
  institutionalBusinessActivity: string;
  institutionalRegisteredAddress: string;
}

export interface TaxResidency {
  countryId: string;
  taxIdentificationNumber?: string;
}

export interface TaxResidencyValue {
  countryId?: string;
  taxIdentificationNumber?: string;
  hasAdditionalTaxResidencies?: boolean;
  additionalResidencies?: TaxResidency[];
}

export interface InvestorDocument {
  id: string;
  assetId: string;
  type: DocumentType;
  name: string;
  size: number;
  mimeType?: string;
  status: string;
  url?: string;
}

export interface Agreement {
  id: string;
  title: string;
  description: string;
  version: string;
  required?: boolean;
}

export interface AgreementsValue {
  acceptedAgreementIds?: string[];
  declarations?: {
    informationAccurate?: boolean;
    understandRisks?: boolean;
    authorizeVerification?: boolean;
  };
}

export interface PersonalInformationValue {
  dateOfBirth?: string;
  residentialAddress?: string;
  city?: string;
  state?: string;
  countryId?: string;
}

export interface IdentityFile {
  name: string;
  size: number;
  type: string;
}

export interface IdentityVerificationValue {
  documentType?: "PASSPORT" | "NATIONAL_ID" | "DRIVERS_LICENSE" | "OTHER" | "";

  documentNumber?: string;
  issuingCountryId?: string;
  expiryDate?: string;
  frontDocument?: IdentityFile | null;
  backDocument?: IdentityFile | null;
  selfie?: IdentityFile | null;
}

export interface InvestorClassificationValue {
  investorType?: InvestorType;
  isPoliticallyExposed?: boolean;
}

export interface FinancialProfileValue {
  occupation?: string;
  employerName?: string;
  annualIncome?: string;
  netWorth?: string;
  liquidAssets?: string;
}

export interface SourceOfFundsValue {
  sourceOfFunds?: SourceOfFunds | "";
  description?: string;
  institutionName?: string;
  accountReference?: string;
}

export interface InvestmentExperienceValue {
  experienceLevel?: ExperienceLevel | "";
  yearsOfExperience?: string;
  products?: InvestmentProduct[];
  description?: string;
}

export interface RiskAssessmentValue {
  riskTolerance?: RiskTolerance | "";
  investmentObjective?: InvestmentObjective | "";
  lossReaction?: LossReaction | "";
  investmentHorizon?: string;
  acceptableLossPercentage?: string;
  description?: string;
}

export interface InvestmentOnboardingData {
  personal?: PersonalInformationValue;
  identity?: IdentityVerificationValue;
  classification?: ClassificationForm;
  financial?: FinancialProfileValue;
  funds?: SourceOfFundsValue;
  experience?: InvestmentExperienceValue;
  risk?: RiskAssessmentValue;
  tax?: TaxResidencyValue;
  status?: InvestorOnboardingReviewStatus;
  reference?: string;
  documents?: InvestorDocument[];
  agreements?: AgreementsValue;
}

export interface InvestmentOnboardingInvestment {
  id: string;
  status: string;
  onboardingStatus: string;
  currentStep: string;
  completedSteps: string[];
  investorDocuments: any[];
  onboardingData?: InvestmentOnboardingData | null;
  moreInfoRequested?: boolean;
  moreInfoMessage?: string | null;
}

export interface InvestorClassificationStepProps {
  value?: ClassificationForm;
  onChange?: (value: ClassificationForm) => void;

  minInvestmentAmount: string | number;
  maxInvestmentAmount: string | number;
}
