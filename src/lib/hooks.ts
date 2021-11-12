import React from "react";
import { Contract } from "starknet";
import { useBlockNumber } from "../providers/BlockNumberProvider";
import { useStarknet } from "../providers/StarknetProvider";
import { useTransactions } from "../providers/TransactionsProvider";

export function useStarknetCall(
  contract: Contract | undefined,
  method: string | undefined,
  args?: any
): string | string[] | undefined {
  const [value, setValue] = React.useState<string | string[] | undefined>(
    undefined
  );
  const blockNumber = useBlockNumber();

  const callContract = React.useCallback(async () => {
    if (contract && method) {
      contract.call(method, args).then(({ count }) => setValue(count));
    }
  }, [contract, method, args]);

  React.useEffect(() => {
    callContract();
  }, [callContract, blockNumber]);

  return value;
}

type InvokeFunc = (args?: any) => void;

interface StarknetInvoke {
  invoke?: InvokeFunc;
  hash?: string;
}

export function useStarknetInvoke(
  contract: Contract | undefined,
  method: string | undefined
): StarknetInvoke {
  const { addTransaction } = useTransactions();
  const { account } = useStarknet()
  const [invoke, setInvoke] = React.useState<InvokeFunc | undefined>(undefined);
  const [hash, setHash] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (account && contract && method) {
      const invokeFunc = (args?: any) => {
        contract.invoke(method, args).then((transaction) => {
          const { transaction_hash } = transaction;
          setHash(transaction_hash);
          addTransaction(transaction);
        });
      };
      setInvoke(() => invokeFunc);
    } else {
      setInvoke(undefined);
    }
  }, [contract, method, addTransaction]);

  return { invoke, hash };
}
