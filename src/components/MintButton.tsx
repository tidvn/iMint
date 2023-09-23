import { Button, Text } from "react-native-paper";
import { Buffer } from "buffer";
import { Transaction } from "@solana/web3.js";
import axios from "axios";

export function MintButton(props: any) {
  const { getMetadata_uri, validate, setState,nextShare } = props;
  
  const handleMint = async () => {
    // next("f")
    // return
    setState("Starting...")
    if (!validate) {
      return
    }
    setState("Create Metadata...")
    const metadata_uri = await getMetadata_uri();

    setState("Create Transaction...")


    const publicKey = window.xnft.solana.publicKey.toBase58()
    const requestData = {
      network: 'devnet',
      metadata_uri: metadata_uri,
      receiver: publicKey,
    };
    const response = await axios.post('https://imint.tdung.com/api/transaction', requestData,);
    const encodedTransaction = response.data.encoded_transaction


    const recoveredTransaction = Transaction.from(
      Buffer.from(encodedTransaction, 'base64')
    );
    console.log(recoveredTransaction)
    setState("Wate for Sign...")
    window.xnft.solana
      .send(recoveredTransaction)
      .then((signature: Uint8Array) => {
        // let signatureBase64 = Buffer.from(signature).toString("base64")
        setState(`Mint done`);
        nextShare(signature.toString(),requestData.network)
      })
      .catch(() => {
        setState("error when create nft...")
      });

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
