import { Screen } from "../components/Screen";
import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import FileDownloadDoneRoundedIcon from "@mui/icons-material/FileDownloadDoneRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { TextField } from "@material-ui/core";
import Button from "@mui/material/Button";

export function Frame3() {
  const handleBack = () => {
    console.log("back to frame 2");
  };

  const handleMint = () => {
    console.log("Mint + switch to frame 4");
  };

  return (
    <Screen>
      <div>
        <IconButton onClick={handleBack}>
          <ArrowBackIosRoundedIcon />
        </IconButton>
      </div>
      <div className="main-container">
          <TextField required label="Name" variant="outlined" fullWidth />
          <TextField
            required
            label="Description"
            multiline
            rows={2}
            fullWidth
            variant="outlined"
          />
          <TextField label="Tag" variant="outlined" fullWidth/>
        <Button onClick={handleMint} variant="contained" endIcon={<FileDownloadDoneRoundedIcon />}>
            Mint
          </Button>
      </div>
    </Screen>
  );
}
