import React from "react";
import { useStarknet } from "../../providers/StarknetProvider";

import styles from "./index.module.css";

interface ConnectedOnlyProps {
  children: React.ReactNode;
}

export function ConnectedOnly({ children }: ConnectedOnlyProps): JSX.Element {
  const { account, connectBrowserWallet } = useStarknet();

  if (!account) {
    return (
      <div>
        <p>Please connect wallet</p>
        <button
          className={styles.connect}
          onClick={() => connectBrowserWallet()}
        >
          Connect Wallet
        </button>
      </div>
    );
  }
  return <React.Fragment>{children}</React.Fragment>;
}
