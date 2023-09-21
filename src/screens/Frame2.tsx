import { Screen } from "../components/Screen";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ReplayIcon from "@mui/icons-material/Replay";
import IconButton from "@mui/material/IconButton";
import FileDownloadDoneRoundedIcon from "@mui/icons-material/FileDownloadDoneRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

export function Frame2() {
  const handleBack = () => {
    console.log("back to frame 1");
  };

  const handleReGenerate = () => {
    console.log("re-generate AI");
  }

  const handleMint = () => {
    console.log("Minttttt + switch to frame 3");
  }

  return (
    <Screen>
      <div>
        <IconButton onClick={handleBack}>
          <ArrowBackIosRoundedIcon />
        </IconButton>
      </div>
      <div className="main-container">
        <Stack direction="row" spacing={2}>
          <Button onClick={handleReGenerate} variant="outlined" startIcon={<ReplayIcon />}>
            Re-Generate
          </Button>
          <Button onClick={handleMint} variant="contained" endIcon={<FileDownloadDoneRoundedIcon />}>
            Next
          </Button>
        </Stack>
      </div>
    </Screen>
  );
}
