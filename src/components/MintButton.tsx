import { Button, Text } from "react-native-paper";
import { Buffer } from "buffer";
import { useReducer } from "react";
import {
  createGenericFileFromBrowserFile,
  generateSigner,
  percentAmount,
} from "@metaplex-foundation/umi";
import {
  createNft,
  createV1,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
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

export function MintButton() {
  const [state, dispatch] = useReducer(reducer, {
    status: Status.IDLE,
    buttonLabel: "Mint This",
  });
  const handleMint = async () => {
    // dispatch({ type: Status.MINTING });
    //         window.xnft.solana
    //           .signMessage(
    //             Buffer.from(`The time is: ${new Date().toLocaleTimeString()}`)
    //           )
    //           .then((signature: Uint8Array) => {
    //             dispatch({
    //               type: Status.MINTED,
    //               signature: Buffer.from(signature).toString("base64"),
    //             });
    //           })
    //           .catch(() => {
    //             dispatch({ type: Status.ERROR });
    //           });

    // Upload image and JSON data.

    const uri = "https://assets.meegos.io/bde8b57e5a53f2f1.json";

    // Create and mint NFT.
    // const mint = generateSigner(umi);
    // const sellerFeeBasisPoints = percentAmount(5.5, 2);
    // await createNft(umi, {
    //   mint,
    //   name:"Test",
    //   uri,
    //   sellerFeeBasisPoints,
    // }).sendAndConfirm(umi);

    // // Return the mint address.
    // return mint.publicKey;
  };
  return (
    <>
      <Button
        icon="plus"
        mode="contained"
        buttonColor={state.status === Status.ERROR ? "red" : undefined}
        onPress={handleMint}
        disabled={state.status === Status.MINTING}
      >
        {state.buttonLabel}
      </Button>
      {state.status === Status.MINTED && <Text>{state.signature}</Text>}
    </>
  );
}
