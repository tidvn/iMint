import { Button, Text } from "react-native";
import {Buffer} from 'buffer';
import { useReducer } from "react";

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
const handleMint=()=>{
  dispatch({ type: Status.MINTING });
          window.xnft.solana
            .signMessage(
              Buffer.from(`The time is: ${new Date().toLocaleTimeString()}`)
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
}
  return (
    <>
      <Button
        title={state.buttonLabel}
        color={state.status === Status.ERROR ? "red" : undefined}
        onPress={handleMint}
        disabled={state.status === Status.MINTING}
      />
      {state.status === Status.MINTED && <Text>{state.signature}</Text>}
    </>
  );
}
