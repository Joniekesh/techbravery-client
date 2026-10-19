import { ArrowUpRight, Copy, ExternalLink, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WalletAsset } from "@/services";

type Props = {
  asset: WalletAsset;
  onSwitchNetwork: () => void;
  isCurrentChain: boolean;
};

const EXPLORERS: Record<number, string> = {
  1: "https://etherscan.io",
  10: "https://optimistic.etherscan.io",
  56: "https://bscscan.com",
  137: "https://polygonscan.com",
  42161: "https://arbiscan.io",
  8453: "https://basescan.org",
};

export function WalletAssetCard({
  asset,
  onSwitchNetwork,
  isCurrentChain,
}: Props) {
  const explorer = EXPLORERS[asset.chainId];

  const shortAddress = asset.address
    ? `${asset.address.slice(0, 6)}...${asset.address.slice(-4)}`
    : null;

  const copyAddress = async () => {
    if (!asset.address) return;

    await navigator.clipboard.writeText(asset.address);
  };

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
            {asset.symbol.slice(0, 1)}
          </div>

          <div>
            <h3 className="font-semibold">{asset.symbol}</h3>

            <p className="text-sm text-muted-foreground">{asset.name}</p>
          </div>
        </div>

        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
          {asset.chainName}
        </span>
      </div>

      <div className="mt-6">
        <p className="text-2xl font-bold tracking-tight">
          {asset.formattedBalance}
        </p>

        <p className="mt-1 text-sm text-muted-foreground">{asset.symbol}</p>
      </div>

      {asset.address && (
        <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
          <span className="font-mono text-xs text-muted-foreground">
            {shortAddress}
          </span>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={copyAddress}
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      <div className="mt-5 flex gap-2">
        {!isCurrentChain && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onSwitchNetwork}
          >
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Switch Network
          </Button>
        )}

        {isCurrentChain && (
          <div className="flex flex-1 items-center justify-center rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary">
            Current Network
          </div>
        )}

        {explorer && asset.address && (
          <Button variant="outline" size="sm" asChild>
            <a
              href={`${explorer}/token/${asset.address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
