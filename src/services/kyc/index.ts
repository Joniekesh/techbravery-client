import { useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/utils/makeRequest";
import type {
  AdminKycResponse,
  KycRecord,
  SaveKycDraftPayload,
} from "@/types/kyc";

export const useMyKyc = (userId: string) => {
  return useQuery<KycRecord | null>({
    queryKey: ["my-kyc", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const response = await makeRequest.get("/kyc/me");

      return response.data?.kyc ?? null;
    },
    staleTime: 30_000,
  });
};

export const useMyKycQueryClient = () => {
  return useQueryClient();
};

export async function saveKycDraft(
  payload: SaveKycDraftPayload,
): Promise<KycRecord> {
  const response = await makeRequest.put("/kyc/me/draft", payload);

  return response.data.kyc;
}

export const useAdminKycs = (params?: string) => {
  return useQuery<AdminKycResponse>({
    queryKey: ["admin-kyc", params],
    queryFn: async () => {
      const response = await makeRequest.get<AdminKycResponse>(
        `/kyc/admin${params ? `?${params}` : ""}`,
      );

      return response.data;
    },
    staleTime: 30_000,
  });
};

export const useAdminKyc = (id: string) => {
  return useQuery<KycRecord | null>({
    queryKey: ["admin-kyc", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const response = await makeRequest.get(`/kyc/admin/${id}`);

      return response.data ?? null;
    },
    staleTime: 30_000,
  });
};
