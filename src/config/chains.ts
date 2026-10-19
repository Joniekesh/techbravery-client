import { mainnet, polygon, optimism, arbitrum, base, bsc } from "wagmi/chains";

export const SUPPORTED_CHAINS = [
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  bsc,
] as const;

export type SupportedChainId = (typeof SUPPORTED_CHAINS)[number]["id"];

export const CHAIN_IDS = {
  ETHEREUM: mainnet.id,
  POLYGON: polygon.id,
  OPTIMISM: optimism.id,
  ARBITRUM: arbitrum.id,
  BASE: base.id,
  BSC: bsc.id,
} as const;
