import { InvestmentOnboardingInvestment } from "@/types/investor";
import { makeRequest } from "@/utils/makeRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../queryClient";

export const getInvestment = async (investmentId: string) => {
  const response = await makeRequest.get(`/investment/${investmentId}`);

  console.log("Function Investment", response);

  return response.data;
};

// export const saveInvestmentStep = async (
//   investmentId: string,
//   step: string,
//   data: Record<string, unknown>,
//   completed = true,
// ) => {
//   const response = await makeRequest.put(`/investment/${investmentId}/steps`, {
//     step,
//     data,
//     completed,
//   });

//   return response.data?.investment ?? response.data;
// };

export const submitInvestment = async (investmentId: string) => {
  const response = await makeRequest.post(`/investment/${investmentId}/submit`);

  return response.data?.investment ?? response.data;
};

export const useInvestment = (id: string, userId: string) =>
  useQuery<InvestmentOnboardingInvestment>({
    queryKey: ["investment", id],
    enabled: Boolean(id && userId),
    queryFn: () => getInvestment(id),
  });

// export const useSaveInvestmentStep = (id: string) => {
//   return useMutation({
//     mutationFn: ({
//       step,
//       data,
//       completed = true,
//     }: {
//       step: string;
//       data: Record<string, unknown>;
//       completed?: boolean;
//     }) => saveInvestmentStep(id, step, data, completed),

//     onSuccess: (updated) => {
//       queryClient.setQueryData(["investment", id], updated);
//     },
//   });
// };
