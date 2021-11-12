import React from "react";
import { useStarknet } from "../StarknetProvider";
import { BlockNumberContext } from "./context";

interface BlockNumberProviderProps {
  children: React.ReactNode;
  interval?: number;
}

export function BlockNumberProvider({
  interval,
  children,
}: BlockNumberProviderProps): JSX.Element {
  const { library } = useStarknet();
  const [blockNumber, setBlockNumber] = React.useState<number | undefined>(
    undefined
  );

  const fetchBlockNumber = React.useCallback(() => {
    library.getBlock().then((block) => {
      setBlockNumber(block.block_id);
    });
  }, [library]);

  React.useEffect(() => {
    fetchBlockNumber();
    const intervalId = setInterval(() => {
      fetchBlockNumber();
    }, interval ?? 5000);
    return () => clearInterval(intervalId);
  }, [interval, fetchBlockNumber]);

  return (
    <BlockNumberContext.Provider value={blockNumber} children={children} />
  );
}
