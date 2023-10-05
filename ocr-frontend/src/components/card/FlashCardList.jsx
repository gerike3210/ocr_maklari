import { useState } from "react";
import FlashCard from "./FlashCard";
import { Box, Button, Container } from "@mui/material";

const FlashCardList = ({ dict }) => {
  const [wordIdx, setWordIdx] = useState(0);
  const currentKey = Object.keys(dict)[wordIdx];

  const positiveHandler = () => {
    if (wordIdx === Object.keys(dict).length - 1) {
      setWordIdx(0);
    } else {
      setWordIdx((prevState) => prevState + 1);
    }
  };

  const negativeHandler = () => {
    if (wordIdx === 0) {
      setWordIdx(Object.keys(dict).length - 1);
    } else {
      setWordIdx((prevState) => prevState - 1);
    }
  };

  const randomHandler = () => {
    let randomNum = 0;
    while (true) {
      randomNum = Math.floor(
        Math.random() * (Object.keys(dict).length - 1 + 1) + 0
      );
      if (randomNum !== wordIdx) {
        break;
      }
    }
    setWordIdx(randomNum);
  };

  return (
    <Container>
      <FlashCard gerWord={currentKey} hunWord={dict[currentKey]} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          variant="outlined"
          sx={{ width: "100%" }}
          onClick={negativeHandler}
        >
          -
        </Button>
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={positiveHandler}
        >
          +
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "100%" }}
          onClick={randomHandler}
        >
          Rnd
        </Button>
      </Box>
    </Container>
  );
};

export default FlashCardList;
