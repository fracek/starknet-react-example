import React from "react";
import { Contract, Abi } from "starknet";
import { useStarknet } from "../providers/StarknetProvider";

import COUNTER from "./abi/counter.json";

const ADDRESS =
  "0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1";

/**
 * Load the counter contract.
 *
 * This example uses a hook because the contract address could depend on the
 * chain or come from an external api.
 * @returns The `counter` contract or undefined.
 */
export function useCounterContract(): Contract | undefined {
  const { library } = useStarknet();
  const [contract, setContract] = React.useState<Contract | undefined>(
    undefined
  );

  React.useEffect(() => {
    setContract(new Contract(COUNTER as Abi[], ADDRESS, library));
  }, [library]);

  return contract;
}
