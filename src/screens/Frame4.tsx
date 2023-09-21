import { Screen } from "../components/Screen";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import { Typography } from "@mui/material";

export function Frame4() {
  const handleBack = () => {
    console.log("back to frame 3");
  };

  const handleShare = () => {
    console.log("share");
  };

  return (
    <Screen>
      <div>
        <IconButton onClick={handleBack}>
          <ArrowBackIosRoundedIcon />
        </IconButton>
      </div>
      <div className="main-container">
        <Typography variant="h5" sx={{m: 1}}>Mint sucessful</Typography>
        <Typography variant="h6" sx={{m: 2}}>Share your NFT on Twitter :)</Typography>
        <Button
          onClick={handleShare}
          variant="contained"
          endIcon={<IosShareRoundedIcon />}
        >
          Share
        </Button>
      </div>
    </Screen>
  );
}
