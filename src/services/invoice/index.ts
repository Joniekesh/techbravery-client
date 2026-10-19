import { Invoice } from "@/types/invoice";
import { makeRequest } from "@/utils/makeRequest";
import { useQuery } from "@tanstack/react-query";

export const useInvoice = (id: string, userId: string) => {
  return useQuery<Invoice>({
    queryKey: ["invoice", id],
    enabled: !!userId && !!id,

    queryFn: async () => {
      const res = await makeRequest.get(`/invoice/${id}`);
      return res.data;
    },
  });
};

export const useMyInvestorInvoices = (userId: string) => {
  return useQuery<Invoice>({
    queryKey: ["invoice", userId],
    enabled: !!userId,

    queryFn: async () => {
      const res = await makeRequest.get(`/invoice/my/investments`);
      return res.data;
    },
  });
};
