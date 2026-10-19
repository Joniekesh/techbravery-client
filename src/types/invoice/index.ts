import { Currency } from "../currency";
import { InvestmentOnboardingData } from "../investor";

export type InvoiceStatus = "PENDING" | "PAID" | "OVERDUE" | "CANCELLED";

export type MilestonePhaseStatus =
  | "FIRST"
  | "SECOND"
  | "THIRD"
  | "FOURTH"
  | "FINAL";

export interface MilestonePhase {
  id: string;
  title: string;
  description: string;
  percent: number;
  progress: number;
  status: MilestonePhaseStatus;
  estimatedCost: number;
  actualCost: number | null;
  projectMilestoneId: string;
  invoiceId: string;
  paymentId: string | null;
  startDate: string | null;
  dueDate: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  amount: string;
  currencyId: string;
  currency: Currency;
  status: InvoiceStatus;
  projectId?: string;
  onboardingId?: string;
  onboarding?: InvestmentOnboardingData;
  project?: {
    quote: {
      projectName: string;
    };
  };
  milestonePhase?: MilestonePhase;
  paymentId: string | null;
  payment: unknown | null;
  dueDate: string;
  paidAt: string | null;
  createdAt: string;
  deletedAt: string | null;
}
