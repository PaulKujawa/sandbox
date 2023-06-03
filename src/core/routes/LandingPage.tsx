import { Box, Button } from "@mui/material";
import { ErrorMonitor } from "core/lib";
import React from "react";
import ImageDogeUrl from "./assets/doge.jpg"; // includes domain and port
import(/* webpackPreload: true */ "lodash");

export const LandingPage = () => {
  const onClick = async () => {
    const { default: _ } = await import(
      /* webpackChunkName: "lodash" */ "lodash"
    );

    alert(_.join(["this", "actually", "worked"], " "));
  };

  return (
    <div>
      landing page
      {/* <img style={{ height: "400px", width: "400px" }} src={ImageDogeUrl} /> */}
      <Button variant="outlined" color="primary" onClick={() => onClick()}>
        Clicky
      </Button>
      <Box mt={1}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            ErrorMonitor.addError(new Error("some bug " + Math.random()));
          }}
        >
          Throw error
        </Button>
      </Box>
    </div>
  );
};
