import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

import { mainnet, polygon, optimism, arbitrum, base, bsc } from "wagmi/chains";

import { http } from "wagmi";

import { createRoot } from "react-dom/client";
import { WagmiProvider } from "wagmi";

import { QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";

import { PersistGate } from "redux-persist/integration/react";

import App from "./App.tsx";

import "./index.css";
import "./lib/i18n";
import "@rainbow-me/rainbowkit/styles.css";

import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { queryClient } from "./services/queryClient.ts";

export const config = getDefaultConfig({
  appName: "Techbravery LTD",

  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,

  chains: [mainnet, polygon, optimism, arbitrum, base, bsc],

  // transports: {
  //   [mainnet.id]: http(import.meta.env.VITE_ETH_RPC_URL),

  //   [polygon.id]: http(import.meta.env.VITE_POLYGON_RPC_URL),

  //   [optimism.id]: http(import.meta.env.VITE_OPTIMISM_RPC_URL),

  //   [arbitrum.id]: http(import.meta.env.VITE_ARBITRUM_RPC_URL),

  //   [base.id]: http(import.meta.env.VITE_BASE_RPC_URL),

  //   [bsc.id]: http(import.meta.env.VITE_BSC_RPC_URL),
  // },
});

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <WagmiProvider config={config}>
      <RainbowKitProvider modalSize="compact">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider
              defaultTheme="light"
              storageKey="techbravery-ui-theme"
            >
              <TooltipProvider>
                <App />
              </TooltipProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </RainbowKitProvider>
    </WagmiProvider>
  </QueryClientProvider>,
);
