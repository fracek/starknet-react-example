import React from "react";
import { Args, Contract } from "starknet";
import { useBlockHash } from "../providers/BlockHashProvider";
import { useStarknet } from "../providers/StarknetProvider";
import { useTransactions } from "../providers/TransactionsProvider";

export function useStarknetCall(
  contract: Contract | undefined,
  method: string | undefined,
  args?: any
): Args | undefined {
  const [value, setValue] = React.useState<Args | undefined>(undefined);
  const blockNumber = useBlockHash();

  const callContract = React.useCallback(async () => {
    if (contract && method) {
      contract.call(method, args).then((res) => setValue(res));
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
  submitting: boolean;
}

export function useStarknetInvoke(
  contract: Contract | undefined,
  method: string | undefined
): StarknetInvoke {
  const { addTransaction } = useTransactions();
  const { account } = useStarknet();
  const [invoke, setInvoke] = React.useState<InvokeFunc | undefined>(undefined);
  const [hash, setHash] = React.useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (account && contract && method) {
      const invokeFunc = (args?: any) => {
        setSubmitting(true);
        try {
          contract.invoke(method, args).then((transaction) => {
            const { transaction_hash } = transaction;
            setHash(transaction_hash);
            setSubmitting(false);
            addTransaction(transaction);
          });
        } catch (err) {
          setSubmitting(false);
          setHash(undefined);
        }
      };
      setInvoke(() => invokeFunc);
    } else {
      setInvoke(undefined);
    }
  }, [account, contract, method, addTransaction]);

  return { invoke, hash, submitting };
}
