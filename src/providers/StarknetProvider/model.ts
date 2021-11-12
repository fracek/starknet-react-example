import { defaultProvider, ProviderInterface } from "starknet";

export interface StarknetState {
  account?: string;
  connectBrowserWallet: () => void;
  library: ProviderInterface;
}

export const STARKNET_STATE_INITIAL_STATE: StarknetState = {
  account: undefined,
  connectBrowserWallet: () => undefined,
  library: defaultProvider,
};
