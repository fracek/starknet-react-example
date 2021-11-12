import React from "react";
import { Contract, Abi } from "starknet";

import COUNTER from "./abi/counter.json";

const ADDRESS =
  "0x065db863a8d72f7260bdd438f7be7d14cc4778b7e362f82fc3b6b9eb04cb90b5";

/**
 * Load the counter contract.
 *
 * This example uses a hook because the contract address could depend on the
 * chain or come from an external api.
 * @returns The `counter` contract or undefined.
 */
export function useCounterContract(): Contract | undefined {
  const [contract, setContract] = React.useState<Contract | undefined>(
    undefined
  );

  React.useEffect(() => {
    setContract(new Contract(COUNTER as Abi[], ADDRESS));
  }, []);

  return contract;
}
