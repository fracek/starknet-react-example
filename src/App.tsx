import React from "react";
import "./App.css";
import { useCounterContract } from "./lib/counter";
import { useStarknetCall } from "./lib/hooks";
import {
  BlockNumberProvider,
  useBlockNumber,
} from "./providers/BlockNumberProvider";
import { StarknetProvider } from "./providers/StarknetProvider";
import {
  TransactionsProvider,
  useTransactions,
} from "./providers/TransactionsProvider";
import { ConnectedOnly } from "./components/ConnectedOnly";
import { IncrementCounter } from "./components/IncrementCounter";
import { VoyagerLink } from "./components/VoyagerLink";

function App() {
  const blockNumber = useBlockNumber();
  const counterContract = useCounterContract();
  const counter = useStarknetCall(counterContract, "counter");
  const lastCaller = useStarknetCall(counterContract, "lastCaller");

  const { transactions } = useTransactions();

  return (
    <div className="container">
      <div className="row">
        Current Block:{" "}
        {blockNumber && <VoyagerLink.Block block={blockNumber} />}
      </div>
      <div className="row">
        Counter Address:{" "}
        {counterContract?.connectedTo && (
          <VoyagerLink.Contract contract={counterContract?.connectedTo} />
        )}
      </div>
      <div className="row">Current Counter: {counter?.count}</div>
      <div className="row">Last Caller: {lastCaller?.address}</div>
      <div className="row">
        <ConnectedOnly>
          <IncrementCounter contract={counterContract} />
        </ConnectedOnly>
      </div>
      <div className="row">
        <p>Transactions:</p>
        <ul>
          {transactions.map((tx, idx) => (
            <li key={idx}>
              <VoyagerLink.Transaction transactionHash={tx.hash} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AppWithProviders() {
  return (
    <StarknetProvider>
      <BlockNumberProvider>
        <TransactionsProvider>
          <App />
        </TransactionsProvider>
      </BlockNumberProvider>
    </StarknetProvider>
  );
}
export default AppWithProviders;
