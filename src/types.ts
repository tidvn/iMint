import { Wallet } from "@coral-xyz/anchor/dist/cjs/provider";
import { Connection, PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";

// Only properties necessary to create Wallet have been included. Others exist
export interface SolanaXnftInjection {
  connection: Connection;
  publicKey: PublicKey;
  signTransaction<T extends Transaction | VersionedTransaction>(tx: T): Promise<T>;
  signAllTransactions<T extends Transaction | VersionedTransaction>(txs: T[]): Promise<T[]>;
}
export type RootStackParamList = {
  FileScreen: {};
  GenerateScreen: {};
  ResultsScreen: { prompt: string, style: string };
  MintScreen: { imageUrl: string };
  ShareScreen: { imageUrl: string,signature:string,network:string };
};
export enum Status {
  IDLE,
  CREATE_METADATA,
  CREATE_TRANSACTION,
  MINTING,
  MINTED,
  ERROR,
}
export type State = {
  status: Status;
  buttonLabel: string;
  signature?: string;
};

export type Action =
  | { type: Status.CREATE_METADATA }
  | { type: Status.CREATE_TRANSACTION }
  | { type: Status.MINTING }
  | { type: Status.MINTED; signature: string }
  | { type: Status.ERROR };
export class XnftWallet implements Wallet {
  #xnftInjection: SolanaXnftInjection;

  constructor(xnftObj: SolanaXnftInjection) {
    this.#xnftInjection = xnftObj;
  }

  get publicKey() {
    return this.#xnftInjection.publicKey;
  }

  signTransaction<T extends Transaction | VersionedTransaction>(tx: T): Promise<T> {
    return this.#xnftInjection.signTransaction(tx);
  }

  signAllTransactions<T extends Transaction | VersionedTransaction>(txs: T[]): Promise<T[]> {
    return this.#xnftInjection.signAllTransactions(txs);
  }
}