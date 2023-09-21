import { Screen } from "../components/Screen";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export function HomeScreen() {
  const [text, setText] = useState("");

  const handleGenerate = () => {
    console.log(text);
    console.log("switch to frame 2");

    // TODO: SWITCH SCENE, CALL API
  };

  return (
    <Screen>
      <Box className="main-container" sx={{m: 5}}>
        <TextField
          required
          label="Describe"
          multiline
          rows={4}
          variant="filled"
          onChange={(newText: React.ChangeEvent<HTMLInputElement>) =>
            setText(newText.target.value)
          }
          fullWidth
          sx={{m: 3}}
        />

        <Button onClick={handleGenerate} variant="contained">
          Generate
        </Button>
      </Box>
    </Screen>
  );
}
