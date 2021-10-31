import React from 'react';
import { Contract } from 'starknet';
import './App.css';
import { useCounterContract } from './lib/counter';
import { useStarknetCall, useStarknetInvoke } from './lib/hooks';
import { BlockNumberProvider, useBlockNumber } from './providers/BlockNumberProvider';
import { TransactionsProvider, useTransaction, useTransactions} from './providers/TransactionsProvider'


function IncrementCounter({ contract }: { contract?: Contract }) {
  const {invoke: incrementCounter, hash: transactionHash} = useStarknetInvoke(contract, 'incrementCounter')
  const transactionStatus = useTransaction(transactionHash)

  const [amount, setAmount] = React.useState('0x1')

  const updateAmount = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(evt.target.value)
  }, [setAmount])

  return (
    <div>
      <input onChange={updateAmount} value={amount} type="text" />
      <button onClick={() => incrementCounter && incrementCounter({ amount })} disabled={!incrementCounter}>Increment</button>
      <p>{transactionHash}</p>
      <p>{transactionStatus?.code}</p>
    </div>
  )
}

function App() {
  const blockNumber = useBlockNumber()
  const counterContract = useCounterContract()
  const counter = useStarknetCall(counterContract, 'counter')

  const {transactions} = useTransactions()

  return (
    <BlockNumberProvider>
      <div className="App">
        Current Block: {blockNumber}
      </div>
      <div className="App">
        Counter Address: {counterContract?.connectedTo}
      </div>
      <div className="App">
        Current Counter: {counter}
      </div>
      <div className="App">
        <IncrementCounter contract={counterContract} />
      </div>
      <div className="App">
        <p>Transactions:</p>
        <ul>
          {transactions.map((tx, idx) => (
            <li key={idx}>
              <a href={`https://voyager.online/tx/${tx.hash}`}>
                {tx.hash} {tx.code}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </BlockNumberProvider>
  );
}

function AppWithProviders() {
  return (
    <BlockNumberProvider>
      <TransactionsProvider>
        <App />
      </TransactionsProvider>
    </BlockNumberProvider>
  );
}
export default AppWithProviders;
