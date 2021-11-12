import React from "react";
import { Contract } from "starknet";
import { useStarknetInvoke } from "../../lib/hooks";
import { useStarknet } from "../../providers/StarknetProvider";
import { useTransaction } from "../../providers/TransactionsProvider";
import { VoyagerLink } from "../VoyagerLink";

import styles from "./index.module.css";

export function IncrementCounter({ contract }: { contract?: Contract }) {
  const { account } = useStarknet();
  const {
    invoke: incrementCounter,
    hash,
    submitting,
  } = useStarknetInvoke(contract, "incrementCounter");
  const transactionStatus = useTransaction(hash);

  const [amount, setAmount] = React.useState("0x1");

  const updateAmount = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(evt.target.value);
    },
    [setAmount]
  );

  if (!account) return null;

  return (
    <div className={styles.counter}>
      <div className="row">
        Account:
        <VoyagerLink.Contract contract={account} />
      </div>
      <div className="row">
        <input onChange={updateAmount} value={amount} type="text" />
        <button
          onClick={() => incrementCounter && incrementCounter({ amount })}
          disabled={!incrementCounter || submitting}
        >
          Increment
        </button>
      </div>
      {transactionStatus && hash && (
        <div className="row">
          <h2>Latest Transaction</h2>
          <p>Status: {transactionStatus?.code}</p>
          <p>
            Hash: <VoyagerLink.Transaction transactionHash={hash} />
          </p>
        </div>
      )}
    </div>
  );
}
