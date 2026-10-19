import { makeRequest } from "@/utils/makeRequest";
import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "../queryClient";
import { InvestmentInterest } from "@/types/investment";
import { Invoice } from "@/types/invoice";

export interface InvestorOnboardingDocument {
  id?: string;
  assetId: string;
  documentType: string;
  status: string;
  asset: {
    fileName: string;
    size: number;
    mimeType: string;
    url: string;
  };
}

export interface InvestorOnboardingRecord {
  id: string;
  investmentInterestId: string;
  investmentInterest: InvestmentInterest;
  status: string;
  currentStep?: string | null;
  completedSteps?: string[];
  onboardingData?: Record<string, unknown>;
  documents?: InvestorOnboardingDocument[];
  invoice?: Invoice;
  submittedAt?: string | null;
  approvedAt?: string | null;
  rejectedAt?: string | null;
  reference?: string | null;
  rejectionReason?: string | null;
  moreInfoRequested?: boolean;
  moreInfoMessage?: string | null;
  [key: string]: unknown;
}

interface SaveInvestorOnboardingStepInput {
  step: string;
  data: Record<string, unknown>;
  completed?: boolean;
}

/**
 * Start or retrieve onboarding for an investment interest.
 * POST /investor-onboarding/interest/:interestId/start
 */
export const startInvestorOnboarding = async (
  interestId: string,
): Promise<InvestorOnboardingRecord> => {
  const response = await makeRequest.post(
    `/investor-onboarding/interest/${interestId}/start`,
  );

  return response.data?.onboarding ?? response.data;
};

/**
 * Fetch all onboardings belonging to the authenticated user.
 * GET /investor-onboarding/me
 */
export const getMyInvestorOnboardings = async (): Promise<
  InvestorOnboardingRecord[]
> => {
  const response = await makeRequest.get("/investor-onboarding/me");

  return response.data?.onboardings ?? response.data;
};

/**
 * Fetch one onboarding by its onboarding ID.
 * GET /investor-onboarding/:onboardingId
 */
export const getInvestorOnboarding = async (
  onboardingId: string,
): Promise<InvestorOnboardingRecord> => {
  const response = await makeRequest.get(
    `/investor-onboarding/${onboardingId}`,
  );

  return response.data?.onboarding ?? response.data;
};

/**
 * Save a step for an existing onboarding.
 * PUT /investor-onboarding/:onboardingId/steps
 */
export const saveInvestorOnboardingStep = async (
  onboardingId: string,
  step: string,
  data: Record<string, unknown>,
  completed = true,
): Promise<InvestorOnboardingRecord> => {
  const response = await makeRequest.put(
    `/investor-onboarding/${onboardingId}/steps`,
    {
      step,
      data,
      completed,
    },
  );

  return response.data?.onboarding ?? response.data;
};

/**
 * Submit an onboarding for review.
 * POST /investor-onboarding/:onboardingId/submit
 */
export const submitInvestorOnboarding = async (
  onboardingId: string,
): Promise<InvestorOnboardingRecord> => {
  const response = await makeRequest.post(
    `/investor-onboarding/${onboardingId}/submit`,
  );

  return response.data?.onboarding ?? response.data;
};

/**
 * Query: fetch one onboarding.
 */
export const useInvestorOnboarding = (onboardingId: string, userId: string) =>
  useQuery<InvestorOnboardingRecord>({
    queryKey: ["investor-onboarding", onboardingId],
    enabled: Boolean(onboardingId && userId),
    queryFn: () => getInvestorOnboarding(onboardingId),
  });

/**
 * Query: fetch the current user's onboardings.
 */
export const useMyInvestorOnboardings = (userId: string) =>
  useQuery<InvestorOnboardingRecord[]>({
    queryKey: ["investor-onboardings", "me", userId],
    enabled: Boolean(userId),
    queryFn: getMyInvestorOnboardings,
  });

export const useStartInvestorOnboarding = (userId: string) =>
  useMutation({
    mutationFn: (interestId: string) => startInvestorOnboarding(interestId),

    onSuccess: (onboarding) => {
      queryClient.setQueryData(
        ["investor-onboarding", onboarding.id],
        onboarding,
      );

      void queryClient.invalidateQueries({
        queryKey: ["investor-onboardings", "me", userId],
      });
    },
  });

/**
 * Mutation: save an onboarding step.
 */
export const useSaveInvestorOnboardingStep = (
  onboardingId: string,
  userId: string,
) =>
  useMutation({
    mutationFn: ({
      step,
      data,
      completed = true,
    }: SaveInvestorOnboardingStepInput) =>
      saveInvestorOnboardingStep(onboardingId, step, data, completed),

    onSuccess: (updated) => {
      queryClient.setQueryData(["investor-onboarding", onboardingId], updated);

      void queryClient.invalidateQueries({
        queryKey: ["investor-onboardings", "me", userId],
      });
    },
  });

export const useSubmitInvestorOnboarding = (
  onboardingId: string,
  userId: string,
) =>
  useMutation({
    mutationFn: () => submitInvestorOnboarding(onboardingId),

    onSuccess: (updated) => {
      queryClient.setQueryData(["investor-onboarding", onboardingId], updated);

      void queryClient.invalidateQueries({
        queryKey: ["investor-onboardings", "me", userId],
      });
    },
  });

export const useAdminOnboardings = (status?: string) =>
  useQuery({
    queryKey: ["admin-onboardings", status],
    queryFn: async () => {
      const response = await makeRequest.get(
        "/investor-onboarding/admin/list/all",
        {
          params: status ? { status } : undefined,
        },
      );

      return response.data;
    },
  });

export const useAdminOnboarding = (id: string) =>
  useQuery({
    queryKey: ["admin-onboardings", id],
    queryFn: async () => {
      const response = await makeRequest.get(
        `/investor-onboarding/admin/${id}`,
      );

      return response.data;
    },
  });
