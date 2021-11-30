import { AddTransactionResponse } from "starknet";
import { StoredTransactionsState, StoredTransaction } from "./model";

interface AddTransaction {
  type: "ADD_TRANSACTION";
  payload: AddTransactionResponse;
}

interface UpdateTransactions {
  type: "UPDATE_TRANSACTIONS";
  payload: StoredTransaction[];
}

type Action = AddTransaction | UpdateTransactions;

export function transactionsReducer(
  state: StoredTransactionsState,
  action: Action
): StoredTransactionsState {
  switch (action.type) {
    case "ADD_TRANSACTION": {
      const storedTx = {
        hash: action.payload.transaction_hash,
        code: action.payload.code,
        address: action.payload.address,
        lastChecked: '',
      };
      return [storedTx, ...state];
    }
    case "UPDATE_TRANSACTIONS": {
      return action.payload;
    }
  }
}
