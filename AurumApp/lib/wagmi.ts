import { http, createConfig } from "wagmi";
import { baseSepolia, polygonZkEvmCardona, rootstockTestnet, sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [sepolia, rootstockTestnet, polygonZkEvmCardona, baseSepolia],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [sepolia.id]: http(),
    [rootstockTestnet.id]: http(),
    [polygonZkEvmCardona.id]: http(),
    [baseSepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
