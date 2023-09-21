import { Screen } from "../components/Screen";
import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import FileDownloadDoneRoundedIcon from "@mui/icons-material/FileDownloadDoneRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { TextField, Box } from "@material-ui/core";
import Button from "@mui/material/Button";

export function Frame3() {
  const handleBack = () => {
    console.log("back to frame 2");
  };

  const handleMint = () => {
    console.log("Mint + switch to frame 4");
    console.log(nftData);
  };

  const [nftData, setNftData] = useState({
    name: '',
    description: '',
    tag: ''
  });

  return (
    <Screen>
      <div>
        <IconButton onClick={handleBack}>
          <ArrowBackIosRoundedIcon />
        </IconButton>
      </div>
      <Box className="main-container" sx={{m: 1}}>
        <TextField 
          required 
          label="Name" 
          variant="outlined" 
          fullWidth 
          margin="dense"

          value={nftData.name}
          onChange={e => setNftData({ ...nftData, name: e.target.value})}
        />
        <TextField
          required
          label="Description"
          multiline
          minRows={2}
          fullWidth
          margin="dense"
          variant="outlined"

          value={nftData.description}
          onChange={e => setNftData({ ...nftData, description: e.target.value})}
        />
        <TextField 
          label="Tag" 
          variant="outlined" 
          fullWidth 
          margin="dense" 

          value={nftData.tag}
          onChange={e => setNftData({ ...nftData, tag: e.target.value})}
        />
        <Button
          onClick={handleMint}
          variant="contained"
          endIcon={<FileDownloadDoneRoundedIcon />}
        >
          Mint
        </Button>
      </Box>
    </Screen>
  );
}
