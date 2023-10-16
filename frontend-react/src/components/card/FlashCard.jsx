import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const FlashCard = ({ gerWord, hunWord }) => {
  const [flip, setFlip] = useState(false); // if flip true => hungarian

  return (
    <Card
      variation="elevated"
      sx={{
        height: "6rem",
        display: "flex",
        padding: "2rem",
        marginBottom: "2rem",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: flip
          ? "rgba(15, 150, 15, 0.281)"
          : "rgba(255, 0, 0, 0.281)",
      }}
      onClick={() => {
        setFlip((prevState) => !prevState);
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" sx={{ userSelect: "none" }}>
          {flip ? hunWord : gerWord}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FlashCard;
