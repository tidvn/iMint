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
      <Box className="main-container" sx={{m: 1}}>
        <TextField
          required
          label="Describe"
          multiline
          rows={4}
          variant="outlined"
          onChange={(newText) => setText(newText.target.value)
          }
          margin="normal"
          fullWidth
        />

        <Button onClick={handleGenerate} variant="contained">
          Generate
        </Button>
      </Box>
    </Screen>
  );
}
