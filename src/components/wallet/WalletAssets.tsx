import { AlertCircle, Loader2, RefreshCw, Wallet } from "lucide-react";

import { useAccount, useChainId, useSwitchChain } from "wagmi";

import { Button } from "@/components/ui/button";

import { SUPPORTED_CHAINS } from "@/config/chains";

import { WalletAssetCard } from "./WalletAssetCard";
import { useChainTokenAssets } from "@/services";

function ChainAssets({ chainId }: { chainId: number }) {
  const currentChainId = useChainId();

  const { assets, isLoading, isFetching, error, refetch } =
    useChainTokenAssets(chainId);

  const { switchChain } = useSwitchChain();

  const chain = SUPPORTED_CHAINS.find((item) => item.id === chainId);

  if (!chain) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin" />

          <span>Loading {chain.name} assets...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{chain.name}</h2>

          <p className="text-sm text-muted-foreground">Network assets</p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          Unable to load some assets on {chain.name}.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {assets
          //   .filter((a) => a.balance > 0n)
          .map((asset) => (
            <WalletAssetCard
              key={`${asset.chainId}-${asset.symbol}-${asset.address ?? "native"}`}
              asset={asset}
              isCurrentChain={currentChainId === asset.chainId}
              onSwitchNetwork={() =>
                switchChain({
                  chainId: asset.chainId,
                })
              }
            />
          ))}
      </div>
    </section>
  );
}

export function WalletAssets() {
  const { address, isConnected } = useAccount();

  if (!isConnected || !address) {
    return (
      <div className="rounded-2xl border bg-card p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Wallet className="h-7 w-7 text-primary" />
        </div>

        <h2 className="mt-4 text-xl font-semibold">Connect your wallet</h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Connect your wallet to view your cryptocurrency balances across
          supported networks.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold">Wallet Assets</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View your assets across all supported blockchain networks.
        </p>
      </div>

      {SUPPORTED_CHAINS.map((chain) => (
        <ChainAssets key={chain.id} chainId={chain.id} />
      ))}
    </div>
  );
}
