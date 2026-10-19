import { IUserProfile } from "../profile";

export type InvestorType = "INDIVIDUAL" | "CORPORATE" | "INSTITUTIONAL";

export type IdentityDocumentType =
  | "PASSPORT"
  | "NATIONAL_ID"
  | "DRIVERS_LICENSE"
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

export type DocumentType =
  | "PROOF_OF_ADDRESS"
  | "PROOF_OF_FUNDS"
  | "TAX_DOCUMENT"
  | "BANK_STATEMENT"
  | "CORPORATE_DOCUMENT"
  | "OTHER";

export interface IInvestorOnboarding {
  annualIncome: string | number | null;
  city: string | null;
  completedAt: string | null;
  completedSteps: number[];
  countryId: string | null;
  createdAt: string;
  currentStep: number;
  dateOfBirth: string | null;
  employerName: string | null;
  investmentExperience: string | null;
  investorProfileId: string;
  investorType: string | null;
  isPoliticallyExposed: boolean | null;
  occupation: string | null;
  residentialAddress: string | null;
  reviewNote: string | null;
  reviewedAt: string | null;
  reviewedById: string | null;
  sourceOfFunds: string | null;
  startedAt: string | null;
  state: string | null;
  status: string;
  submittedAt: string | null;
  taxIdentificationNumber: string | null;
  updatedAt: string | null;
}

export interface InvestorOnboardingStepProps {
  onboarding: IInvestorOnboarding;
  profile: IUserProfile;
  onNext: () => void;
  onBack: () => void;
}

export interface PersonalInformation {
  dateOfBirth?: string;
  residentialAddress?: string;
  city?: string;
  state?: string;
  countryId?: string;
}

export interface IdentityVerification {
  documentType?: IdentityDocumentType | "";
  documentNumber?: string;
  issuingCountryId?: string;
  expiryDate?: string;
  frontDocument?: File | null;
  backDocument?: File | null;
  selfie?: File | null;
}

export interface InvestorClassification {
  investorType?: InvestorType;
  isPoliticallyExposed?: boolean;
}

export interface FinancialProfile {
  occupation?: string;
  employerName?: string;
  annualIncome?: string;
  netWorth?: string;
  liquidAssets?: string;
}

export interface SourceOfFundsData {
  sourceOfFunds?: SourceOfFunds | "";
  description?: string;
  institutionName?: string;
  accountReference?: string;
}

export interface InvestmentExperience {
  experienceLevel?: ExperienceLevel | "";
  yearsOfExperience?: string;
  products?: InvestmentProduct[];
  description?: string;
}

export interface RiskAssessment {
  riskTolerance?: RiskTolerance | "";
  investmentObjective?: InvestmentObjective | "";
  lossReaction?: LossReaction | "";
  investmentHorizon?: string;
  acceptableLossPercentage?: string;
  description?: string;
}

export interface TaxResidency {
  countryId?: string;
  taxIdentificationNumber?: string;
  hasAdditionalTaxResidencies?: boolean;
  additionalResidencies?: Array<{
    countryId: string;
    taxIdentificationNumber?: string;
  }>;
}

export interface OnboardingDocument {
  id: string;
  type: DocumentType;
  name: string;
  size?: number;
  status: "UPLOADING" | "UPLOADED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  rejectionReason?: string;
  file?: File;
}

export interface AgreementDeclaration {
  informationAccurate?: boolean;
  understandRisks?: boolean;
  authorizeVerification?: boolean;
}

export interface OnboardingAgreements {
  acceptedAgreementIds: string[];
  declarations: AgreementDeclaration;
}

export interface InvestorOnboardingState {
  currentStep: number;
  completedSteps: number[];

  personal: PersonalInformation;
  identity: IdentityVerification;
  classification: InvestorClassification;
  financial: FinancialProfile;
  funds: SourceOfFundsData;
  experience: InvestmentExperience;
  risk: RiskAssessment;
  tax: TaxResidency;

  documents: OnboardingDocument[];
  agreements: OnboardingAgreements;
}

export interface InvestorOnboardingResponse {
  status: string;
  currentStep: number;
  completedSteps: number[];
  requiredSteps: number[];
  progress: number;
  canSubmit: boolean;
  blockingIssues: string[];

  profile: {
    id: string;
    userId: string;
    investorType: string | null;
    status: string;
    onboardingCompletedAt: string | null;
    approvedAt: string | null;
    rejectionReason: string | null;
  };

  user: {
    id: string;
    firstName: string | null;
    middleName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    image: string | null;
    country: {
      id: string;
      name: string;
      iso2: string;
    } | null;
    nationality: {
      id: string;
      name: string;
      iso2: string;
    } | null;
  };

  onboarding: {
    id: string;
    investorProfileId: string;

    currentStep: number;
    completedSteps: number[];

    dateOfBirth: string | null;
    residentialAddress: string | null;
    city: string | null;
    state: string | null;
    countryId: string | null;

    investorType: string | null;

    taxIdentificationNumber: string | null;
    sourceOfFunds: string | null;
    isPoliticallyExposed: boolean | null;

    occupation: string | null;
    employerName: string | null;
    annualIncome: string | null;

    investmentExperience: string | null;
  };

  kyc: {
    id?: string;
    status: string;
    approvedAt?: string | null;
    rejectedAt?: string | null;
  };

  documents: Array<{
    id: string;
    type: string;
    status: string;
    name: string | null;
    size: number | null;
    fileName: string | null;
    documentUrl: string | null;
    rejectionReason: string | null;
    uploadedAt: string | null;
    verifiedAt: string | null;
    expiresAt: string | null;
  }>;

  agreements: Array<{
    id: string;
    agreementType: string;
    version: string;
    status: string;
    acceptedAt: string | null;
    documentUrl: string | null;
  }>;
}

export interface UpdateOnboardingPayload {
  currentStep?: number;
  completedSteps?: number[];

  dateOfBirth?: string | null;
  residentialAddress?: string | null;
  city?: string | null;
  state?: string | null;
  countryId?: string | null;

  investorType?: string | null;

  taxIdentificationNumber?: string | null;
  sourceOfFunds?: string | null;
  isPoliticallyExposed?: boolean | null;

  occupation?: string | null;
  employerName?: string | null;
  annualIncome?: string | null;

  investmentExperience?: string | null;
}

export interface SaveOnboardingStepPayload extends UpdateOnboardingPayload {
  step: number;
}

interface OnboardingFormData {
  dateOfBirth: string;
  residentialAddress: string;
  city: string;
  state: string;
  countryId: string;

  investorType: string;

  occupation: string;
  employerName: string;
  annualIncome: string;

  sourceOfFunds: string;
  investmentExperience: string;

  isPoliticallyExposed: boolean | null;

  taxIdentificationNumber: string;
}

export interface Country {
  id: string;
  name: string;
}

export interface PersonalInformationValue {
  dateOfBirth?: string;
  residentialAddress?: string;
  city?: string;
  state?: string;
  countryId?: string;
}

export interface IdentityFile {
  file?: File;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
}

export interface IdentityVerificationValue {
  documentType?: IdentityDocumentType | "";
  documentNumber?: string;
  issuingCountryId?: string;
  expiryDate?: string;
  frontDocument?: IdentityFile | null;
  backDocument?: IdentityFile | null;
  selfie?: IdentityFile | null;
}

export interface InvestorClassificationValue {
  investorType?: InvestorType;
  isPoliticallyExposed?: boolean | null;
}

export interface FinancialProfileValue {
  occupation?: string;
  employerName?: string;

  /**
   * Must match the backend representation.
   *
   * Your current backend converts annualIncome to Prisma.Decimal,
   * therefore this must ultimately contain a numeric value.
   */
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

export interface TaxResidencyValue {
  countryId?: string;
  taxIdentificationNumber?: string;
  hasAdditionalTaxResidencies?: boolean;
  additionalResidencies?: TaxResidency[];
}

export interface InvestorDocument {
  id: string;
  type: DocumentType;
  name: string;
  size: number;
  status?: "UPLOADING" | "UPLOADED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
  rejectionReason?: string;
  progress?: number;
  file?: File;
  documentUrl?: string | null;
}

export interface Agreement {
  id: string;
  title: string;
  description: string;
  version: string;
  required?: boolean;
  content?: string;
}

export interface AgreementsValue {
  acceptedAgreementIds?: string[];
  declarations?: {
    informationAccurate?: boolean;
    understandRisks?: boolean;
    authorizeVerification?: boolean;
  };
}
