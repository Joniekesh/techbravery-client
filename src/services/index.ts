import { applicationsApi } from "./application/applications.api";
import { queryClient } from "./queryClient";
import { useAccount, useBalance, useReadContracts } from "wagmi";
import { erc20Abi, formatUnits, type Address } from "viem";
import { SUPPORTED_CHAINS } from "@/config/chains";
import { TOKEN_REGISTRY, type TokenDefinition } from "@/config/tokens";

import { IUserProfile } from "@/types/profile";
import { ProjectWithQuoteAndUser } from "@/types/project";
import { IQuote } from "@/types/quote";
import { IService } from "@/types/service";
import { makeRequest, publicRequest } from "@/utils/makeRequest";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProfile = (userId: string) => {
  return useQuery<IUserProfile>({
    queryKey: ["profile", userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await makeRequest.get("/user/me");
      return res.data;
    },
  });
};

export const useFetchQuotes = () => {
  return useQuery<IQuote[]>({
    queryKey: ["quotes"],
    queryFn: async () => {
      const res = await makeRequest.get("/quote/all");
      return res.data;
    },
  });
};

export const useFetchClients = () => {
  return useQuery<IUserProfile[]>({
    queryKey: ["client-all"],

    queryFn: async () => {
      const res = await makeRequest.get("/client");

      return res.data;
    },
  });
};

export const useFetchProjects = () => {
  return useQuery<ProjectWithQuoteAndUser[]>({
    queryKey: ["project-all"],
    queryFn: async () => {
      const res = await makeRequest.get("/project");
      return res.data;
    },
  });
};

export const useFetchMileStoneTemplates = () => {
  return useQuery({
    queryKey: ["all-milestone-template"],

    queryFn: async () => {
      const res = await makeRequest.get("/milestone-template");
      return res.data;
    },
  });
};

export const useServices = () => {
  return useQuery<IService[]>({
    queryKey: ["services"],

    queryFn: async () => {
      const res = await publicRequest.get("/service");

      return res.data;
    },
  });
};

export const useService = (id: string) => {
  return useQuery<IService>({
    queryKey: ["services", id],
    enabled: !!id,

    queryFn: async () => {
      const res = await publicRequest.get(`/service/${id}`);

      return res.data;
    },
  });
};

export const useMyProjects = (userId: string) => {
  return useQuery<ProjectWithQuoteAndUser[]>({
    queryKey: ["my-projects", userId],
    enabled: !!userId,

    queryFn: async () => {
      const res = await makeRequest.get("/project/me");

      return res.data;
    },
  });
};

export const useMileStoneTemplates = () => {
  return useQuery({
    queryKey: ["all-milestone-template"],

    queryFn: async () => {
      const res = await makeRequest.get("/milestone-template");

      return res.data;
    },
  });
};

export type WalletAsset = {
  chainId: number;
  chainName: string;
  chainSymbol: string;

  symbol: string;
  name: string;

  balance: bigint;
  formattedBalance: string;

  decimals: number;

  address?: Address;

  type: "native" | "erc20";
};

function trimBalance(value: string): string {
  if (!value.includes(".")) {
    return value;
  }

  return value.replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.0+$/, "");
}

function formatTokenBalance(balance: bigint, decimals: number): string {
  const formatted = formatUnits(balance, decimals);

  return trimBalance(formatted);
}

export function useChainTokenAssets(chainId: number) {
  const { address, isConnected } = useAccount();

  const chain = SUPPORTED_CHAINS.find((item) => item.id === chainId);

  const registry = TOKEN_REGISTRY[chainId];

  const nativeBalance = useBalance({
    address,
    chainId,
    query: {
      enabled: isConnected && !!address && !!registry,
    },
  });

  const tokenContracts =
    registry?.tokens.map((token) => ({
      address: token.address,
      abi: erc20Abi,
      functionName: "balanceOf" as const,
      args: [address as Address],
      chainId,
    })) ?? [];

  const tokenBalances = useReadContracts({
    contracts: tokenContracts,

    query: {
      enabled: isConnected && !!address && !!registry,
    },
  });

  const assets: WalletAsset[] = [];

  /**
   * Native asset
   */
  if (registry && chain && nativeBalance.data) {
    assets.push({
      chainId,
      chainName: chain.name,
      chainSymbol: registry.native.symbol,
      symbol: registry.native.symbol,
      name: registry.native.name,
      balance: nativeBalance.data.value,
      formattedBalance: formatTokenBalance(
        nativeBalance.data.value,
        nativeBalance.data.decimals,
      ),
      decimals: nativeBalance.data.decimals,
      type: "native",
    });
  }

  /**
   * ERC-20 assets
   */
  if (registry && chain && tokenBalances.data) {
    registry.tokens.forEach((token: TokenDefinition, index) => {
      const result = tokenBalances.data[index];

      if (result?.status !== "success") {
        return;
      }

      const balance = result.result as bigint;

      assets.push({
        chainId,
        chainName: chain.name,
        chainSymbol: registry.native.symbol,
        symbol: token.symbol,
        name: token.name,
        balance,
        formattedBalance: formatTokenBalance(balance, token.decimals),
        decimals: token.decimals,
        address: token.address,
        type: "erc20",
      });
    });
  }

  return {
    assets,
    isLoading: nativeBalance.isLoading || tokenBalances.isLoading,
    isFetching: nativeBalance.isFetching || tokenBalances.isFetching,
    error: nativeBalance.error ?? tokenBalances.error,
    refetch: async () => {
      await Promise.all([nativeBalance.refetch(), tokenBalances.refetch()]);
    },
  };
}

// APPLICATION

import type {
  Application,
  ApplicationQuery,
  CreateApplicationPayload,
  UpdateApplicationPayload,
} from "@/types/application";

export function useApplications(params?: ApplicationQuery) {
  return useQuery({
    queryKey: ["applications", params],
    queryFn: () => applicationsApi.getAll(params),
    placeholderData: (previous) => previous,
  });
}

export function useAdminApplications(params?: ApplicationQuery) {
  return useQuery({
    queryKey: ["admin-applications", params],
    queryFn: () => applicationsApi.getAllAdmin(params),
    placeholderData: (previous) => previous,
  });
}

export function useAdminApplication(id: string) {
  return useQuery<Application>({
    queryKey: ["admin-applications", id],
    queryFn: () => applicationsApi.getById(id),
    enabled: Boolean(id),
    placeholderData: (previous) => previous,
  });
}

export function useApplication(id: string) {
  return useQuery<Application>({
    queryKey: ["applications", id],
    queryFn: () => applicationsApi.getById(id),
    enabled: Boolean(id),
  });
}

export function useApplicationStats() {
  return useQuery({
    queryKey: ["applications", "stats"],
    queryFn: applicationsApi.getStats,
  });
}

export function useDeleteApplication() {
  return useMutation({
    mutationFn: (id: string) => applicationsApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-applications"],
      });
    },
  });
}

export function useRestoreApplication() {
  return useMutation({
    mutationFn: (id: string) => applicationsApi.restore(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin-applications"],
      });
    },
  });
}

export function useUpdateApplicationStatus() {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      applicationsApi.updateStatus(id, status),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["applications", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-applications", variables.id],
      });
    },
  });
}

export function usePublishApplication() {
  return useMutation({
    mutationFn: ({ id, isLive }: { id: string; isLive: boolean }) =>
      applicationsApi.updatePublishing(id, isLive),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["applications", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["applications", "stats"],
      });
    },
  });
}

export function useCreateApplication() {
  return useMutation({
    mutationFn: (payload: CreateApplicationPayload) =>
      applicationsApi.createApplication(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });
}

export function useUpdateApplication() {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateApplicationPayload;
    }) => applicationsApi.updateApplication(id, payload),

    onSuccess: async (updatedApplication, variables) => {
      const { id } = variables;

      // Immediately update the cached application details.
      queryClient.setQueryData(["admin-applications", id], updatedApplication);

      queryClient.setQueryData(["applications", id], updatedApplication);

      // Refresh application lists and statistics.
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["applications"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["admin-applications"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["applications", "stats"],
        }),
      ]);
    },
  });
}
