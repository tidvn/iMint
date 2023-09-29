import { Button } from "react-native-paper";
import { Buffer } from "buffer";
import { Transaction } from "@solana/web3.js";
import { createTransaction } from "../function";
import {network} from '../../config.json';

export function MintButton(props: any) {
  const { getMetadata_uri, validate, setState, nextShare } = props;

  const handleMint = async () => {
    try {
      setState("Starting...")
      if (!validate) {
        throw new Error("Input error")
      }
      setState("Create Metadata...")
      const metadata_uri = await getMetadata_uri();

      setState("Create Transaction...")


      const publicKey = window.xnft.solana.publicKey.toBase58()
      const encodedTransaction = await createTransaction(network, metadata_uri, publicKey)


      setState("Wate for Sign...")

      const recoveredTransaction = Transaction.from(
        Buffer.from(encodedTransaction, 'base64')
      );

      window.xnft.solana.send(recoveredTransaction)
        .then((signature: Uint8Array) => {
          setState(`Mint done`);
          nextShare(signature.toString(), network)
        })
    } catch {
      setState("error, please try again ...")
    }
  };
  return (
    <>
      <Button icon="check"
        mode="contained"
        onPress={handleMint}>
        Start Mint
      </Button>
    </>
  );
}
