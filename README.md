# StarkNet.js + React

This repo shows how to connect your React app to StarkNet.

## Content

### Contracts

The `contracts` directory contains a simple Cairo contract:

 * `incrementCounter(amount)`: increment the counter by the given amount.
 * `counter()`: returns the current counter value.

The contract is deployed at [`0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1`](https://goerli.voyager.online/contract/0x036486801b8f42e950824cba55b2df8cccb0af2497992f807a7e1d9abd2c6ba1)
on StarkNet alpha 4.

### React

The `src/providers` directory contains two React providers:

 * `BlockNumberProvider`: returns the current StarkNet block number. 
    - `useBlockNumber`: returns the current block number. Returns `undefined` before
        loading the block number for the first time.
 * `TransactionsProvider`: contains a list of transactions sent to StarkNet.
    The state of this provider is reset between page reloads, for a production
    app you may want to store its state to local storage.
    - `useTransactions`: returns a list of all transactions.
    - `useTransaction(hash)`: returns the transaction with the given hash, or `undefined` if
        no transaction matches.

The `src/lib/hooks.ts` file contains the following hooks:

 * `useStarknetCall(contract, method, args)`: calls the specified method on the contract with the
    given arguments. Returns the raw call output (either a string, an array of strings, or `undefined`).
 * `useStarknetInvoke(contract, method)`: returns an `invoke(args)` function to invoke the specified
    method with the given arguments. Also returns an `hash` that is set to the hash of the most
    recent `invoke`.

The `src/lib/counter.ts` file shows how to load a Cairo contract using a React hook.

The `src/App.tsx` file shows how to use the hooks and providers to interact with the on-chain
counter contract.

## License

    Copyright 2021 Francesco Ceccon

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
