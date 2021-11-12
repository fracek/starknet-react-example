import React from "react";

export const BlockNumberContext = React.createContext<number | undefined>(
  undefined
);

export function useBlockNumber() {
  return React.useContext(BlockNumberContext);
}
