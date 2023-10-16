import React, { useState } from "react";

import "@aws-amplify/ui-react/styles.css";
import { getStoredDict } from "../../utils/get-stored-dict";
import FlashCardList from "../card/FlashCardList";
import { Button, Container, Grid } from "@mui/material";

const HomePage = ({ user }) => {
  const [storedDict, setStoredDict] = useState({});

  console.log(Boolean(Object.keys(storedDict).length));

  return (
    <Container>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item margin={2} xs={12} textAlign="center">
          <Button
            variant="contained"
            size="large"
            onClick={async () =>
              setStoredDict((await getStoredDict(user.username)) || {})
            }
          >
            GET STORED
          </Button>
        </Grid>
        <Grid item xs={6}>
          {Boolean(Object.keys(storedDict).length) && (
            <FlashCardList dict={storedDict} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
