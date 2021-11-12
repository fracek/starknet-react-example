import React from "react";
import { AddTransactionResponse } from "starknet";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useBlockNumber } from "../BlockNumberProvider";
import { useStarknet } from "../StarknetProvider";

import { TransactionsContext } from "./context";
import { StoredTransaction } from "./model";
import { transactionsReducer } from "./reducer";

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export function TransactionsProvider({
  children,
}: TransactionsProviderProps): JSX.Element {
  const { library } = useStarknet()
  const blockNumber = useBlockNumber();
  const [transactions, dispatch] = React.useReducer(transactionsReducer, []);

  const addTransaction = React.useCallback(
    (payload: AddTransactionResponse) => {
      dispatch({
        type: "ADD_TRANSACTION",
        payload,
      });
    },
    [dispatch]
  );

  useDeepCompareEffect(() => {
    const updateTransactions = async () => {
      if (!blockNumber) {
        return;
      }

      const checkTransaction = async (tx: StoredTransaction) => {
        console.log(`checking tx status ${tx.hash}`);
        if (tx.code === "REJECTED" || tx.code === "ACCEPTED_ONCHAIN") {
          return tx;
        }

        if (tx.lastChecked >= blockNumber) {
          return tx;
        }

        try {
          const newStatus = await library.getTransactionStatus(tx.hash);
          console.log(`new status ${newStatus.tx_status}`);
          const newTransaction: StoredTransaction = {
            ...tx,
            code: newStatus.tx_status,
            lastChecked: blockNumber,
          };
          return newTransaction;
        } catch (error) {
          console.error(`failed to check transaction status: ${tx.hash}`);
        }

        return tx;
      };

      const newTransactions: StoredTransaction[] = [];
      for (const tx of transactions) {
        const newTransaction = await checkTransaction(tx);
        newTransactions.push(newTransaction);
      }

      dispatch({
        type: "UPDATE_TRANSACTIONS",
        payload: newTransactions,
      });
    };

    updateTransactions();
  }, [blockNumber, transactions]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction }}
      children={children}
    />
  );
}
