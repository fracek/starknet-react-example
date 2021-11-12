export interface StarknetState {
  account?: string;
  connectBrowserWallet: () => void;
}

export const STARKNET_STATE_INITIAL_STATE: StarknetState = {
  account: undefined,
  connectBrowserWallet: () => undefined,
};
