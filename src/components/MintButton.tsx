import { Button, Text } from "react-native-paper";
import { Buffer } from "buffer";
import { useReducer } from "react";
import {Transaction, VersionedTransaction } from "@solana/web3.js";
import axios from "axios";


// import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';

// const umi = createUmi('https://api.mainnet-beta.solana.com');


enum Status {
  IDLE,
  MINTING,
  MINTED,
  ERROR,
}

type State = {
  status: Status;
  buttonLabel: string;
  signature?: string;
};

type Action =
  | { type: Status.MINTING }
  | { type: Status.MINTED; signature: string }
  | { type: Status.ERROR };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case Status.MINTING:
      return {
        status: Status.MINTING,
        buttonLabel: "Minting...",
      };
    case Status.MINTED:
      return {
        status: Status.MINTED,
        buttonLabel: "Mint another ",
        signature: action.signature,
      };
    case Status.ERROR:
      return {
        status: Status.ERROR,
        buttonLabel: "Error - Try again?",
      };
    default:
      return state;
  }
}

export function MintButton(props:any) {
  const { getMetadata_uri} = props;
  
  const [state, dispatch] = useReducer(reducer, {
    status: Status.IDLE,
    buttonLabel: "Mint This",
  });
  const handleMint = async () => {
      const metadata_uri = await getMetadata_uri();
    console.log(metadata_uri)
    // dispatch({ type: Status.MINTING });
    dispatch({ type: Status.MINTED,signature:'signature' });
    

            const publicKey= window.xnft.solana.publicKey.toBase58()
            const requestData = {
              network: 'mainnet-beta',
              metadata_uri:metadata_uri,
              receiver: publicKey,
            };
          const response = await axios.post('https://imint.tdung.com/api/transaction', requestData,);
          const encodedTransaction= response.data.encoded_transaction


          const recoveredTransaction = Transaction.from(
            Buffer.from(encodedTransaction, 'base64')
          );
         
           window.xnft.solana
              .send(
                recoveredTransaction
              )
              .then((signature: Uint8Array) => {
                dispatch({
                  type: Status.MINTED,
                  signature: Buffer.from(signature).toString("base64"),
                });
              })
              .catch(() => {
                dispatch({ type: Status.ERROR });
              });

  };
  return (
    <>
    <Button icon="check"
     buttonColor={state.status === Status.ERROR ? "red" : undefined}
      mode="contained" 
      disabled={state.status === Status.MINTED}
      onPress={handleMint}>
        {state.buttonLabel}
      </Button>
      
      {state.status === Status.MINTED && <Text>{state.signature}</Text>}
    </>
  );
}
