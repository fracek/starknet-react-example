import React from "react";
import { getStarknet } from "@argent/get-starknet";
import { StarknetState } from "./model";

interface StarknetManagerState {
  account?: string;
}

interface SetAccount {
  type: "set_account";
  account: string;
}

type Action = SetAccount;

function reducer(
  state: StarknetManagerState,
  action: Action
): StarknetManagerState {
  switch (action.type) {
    case "set_account": {
      return { ...state, account: action.account };
    }
    default: {
      return state;
    }
  }
}

export function useStarknetManager(): StarknetState {
  const starknet = getStarknet({ showModal: false });
  const [state, dispatch] = React.useReducer(reducer, {});

  const { account } = state;

  const connectBrowserWallet = React.useCallback(async () => {
    const [account] = await starknet.enable();
    dispatch({ type: "set_account", account });
  }, [starknet]);

  return { account, connectBrowserWallet };
}
