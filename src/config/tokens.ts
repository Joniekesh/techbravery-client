import type { Address } from "viem";
import { arbitrum, base, bsc, mainnet, optimism, polygon } from "wagmi/chains";

export type TokenDefinition = {
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
  type: "native" | "erc20";
};

export type ChainTokenConfig = {
  native: TokenDefinition;
  tokens: TokenDefinition[];
};

/**
 * Trusted token registry.
 *
 * IMPORTANT:
 * Only add contract addresses that you have independently verified.
 */
export const TOKEN_REGISTRY: Record<number, ChainTokenConfig> = {
  [mainnet.id]: {
    native: {
      address: "0x0000000000000000000000000000000000000000",
      symbol: "ETH",
      name: "Ether",
      decimals: 18,
      type: "native",
    },

    tokens: [
      {
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        symbol: "USDT",
        name: "Tether USD",
        decimals: 6,
        type: "erc20",
      },
      {
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        type: "erc20",
      },
    ],
  },

  [polygon.id]: {
    native: {
      address: "0x0000000000000000000000000000000000000000",
      symbol: "POL",
      name: "POL",
      decimals: 18,
      type: "native",
    },

    tokens: [
      {
        address: "0xc2132D05D31c914a87C6611C10748AaCbC532A2F",
        symbol: "USDT",
        name: "Tether USD",
        decimals: 6,
        type: "erc20",
      },
      {
        address: "0x3c499c542cef5E3811e1192ce70d8cC03d5c3359",
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        type: "erc20",
      },
    ],
  },

  [optimism.id]: {
    native: {
      address: "0x0000000000000000000000000000000000000000",
      symbol: "ETH",
      name: "Ether",
      decimals: 18,
      type: "native",
    },

    tokens: [
      {
        address: "0x94b008aAaFfA6C7f5E6fF2fB1d7f5d5dD5A9B7C1",
        symbol: "USDT",
        name: "Tether USD",
        decimals: 6,
        type: "erc20",
      },
      {
        address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        type: "erc20",
      },
    ],
  },

  [arbitrum.id]: {
    native: {
      address: "0x0000000000000000000000000000000000000000",
      symbol: "ETH",
      name: "Ether",
      decimals: 18,
      type: "native",
    },

    tokens: [
      {
        address: "0xFd086bC7CD5C481dcc9C85ebe478A1C0b69FCbb9",
        symbol: "USDT",
        name: "Tether USD",
        decimals: 6,
        type: "erc20",
      },
      {
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        type: "erc20",
      },
    ],
  },

  [base.id]: {
    native: {
      address: "0x0000000000000000000000000000000000000000",
      symbol: "ETH",
      name: "Ether",
      decimals: 18,
      type: "native",
    },

    tokens: [
      {
        address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        type: "erc20",
      },
      {
        address: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
        symbol: "USDT",
        name: "Tether USD",
        decimals: 6,
        type: "erc20",
      },
    ],
  },

  [bsc.id]: {
    native: {
      address: "0x0000000000000000000000000000000000000000",
      symbol: "BNB",
      name: "BNB",
      decimals: 18,
      type: "native",
    },

    tokens: [
      {
        address: "0x55d398326f99059fF775485246999027B3197955",
        symbol: "USDT",
        name: "Tether USD",
        decimals: 18,
        type: "erc20",
      },
      {
        address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        symbol: "USDC",
        name: "USD Coin",
        decimals: 18,
        type: "erc20",
      },
    ],
  },
};
