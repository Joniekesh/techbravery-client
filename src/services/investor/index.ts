import { makeRequest } from "@/utils/makeRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import {
  InvestorOnboardingResponse,
  SaveOnboardingStepPayload,
  UpdateOnboardingPayload,
} from "@/types/onboarding";

export const investorOnboardingKeys = {
  all: ["investor-onboarding"] as const,
  detail: (userId: string) => [...investorOnboardingKeys.all, userId] as const,
};

export const useInvestorOnboarding = (userId: string) => {
  return useQuery({
    queryKey: investorOnboardingKeys.detail(userId),
    queryFn: async () => {
      const response = await makeRequest.get("/investor/onboarding");

      return response.data as InvestorOnboardingResponse;
    },
    enabled: Boolean(userId),
  });
};

export const useUpdateInvestorOnboarding = () => {
  return useMutation({
    mutationFn: async (payload: UpdateOnboardingPayload) => {
      const response = await makeRequest.put("/investor/onboarding", {
        data: payload,
      });

      return response.data as InvestorOnboardingResponse;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(
        investorOnboardingKeys.detail(data.profile.userId),
        data,
      );
    },
  });
};

export const useSaveInvestorOnboardingStep = () => {
  return useMutation({
    mutationFn: async (payload: SaveOnboardingStepPayload) => {
      const response = await makeRequest.post("/investor/onboarding/step", {
        data: payload,
      });

      return response.data as InvestorOnboardingResponse;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(
        investorOnboardingKeys.detail(data.profile.userId),
        data,
      );
    },
  });
};

export const useSubmitInvestorOnboarding = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await makeRequest("/investor/onboarding/submit");

      return response.data as InvestorOnboardingResponse;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(
        investorOnboardingKeys.detail(data.profile.userId),
        data,
      );
    },
  });
};
