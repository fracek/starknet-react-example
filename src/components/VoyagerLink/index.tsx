import React from "react";

import style from "./index.module.css";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

function Link({ href, children }: LinkProps) {
  return (
    <a className={style.link} href={href}>
      {children}
    </a>
  );
}

interface ContractLinkProps {
  contract: string;
}

function ContractLink({ contract }: ContractLinkProps): JSX.Element {
  const href = `https://goerli.voyager.online/contract/${contract}`;
  return <Link href={href}>{contract}</Link>;
}

interface TransactionLinkProps {
  transactionHash: string;
}

function TransactionLink({
  transactionHash,
}: TransactionLinkProps): JSX.Element {
  const href = `https://goerli.voyager.online/tx/${transactionHash}`;
  return <Link href={href}>{transactionHash}</Link>;
}

interface BlockLinkProps {
  block: string;
}

function BlockLink({ block }: BlockLinkProps): JSX.Element {
  const href = `https://goerli.voyager.online/block/${block}`;
  return <Link href={href}>{block}</Link>;
}

export const VoyagerLink = {
  Contract: ContractLink,
  Transaction: TransactionLink,
  Block: BlockLink,
};
