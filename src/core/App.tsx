import { Form, Header } from "./components";
import { Box, Button } from "@material-ui/core";
import { ErrorMonitor } from "./lib";
import React from "react";
import ImageDogeUrl from "./assets/doge.jpg"; // includes domain and port
import "./App.css";

import(/* webpackPreload: true */ "lodash");

export const App = () => {
  const onClick = async () => {
    const { default: _ } = await import(
      /* webpackChunkName: "lodash" */ "lodash"
    );

    alert(_.join(["this", "actually", "worked"], " "));
  };

  return (
    <div className="root">
      <Header />
      <img style={{ height: "400px", width: "400px" }} src={ImageDogeUrl} />
      <Form />
      <Button variant="outlined" color="primary" onClick={() => onClick()}>
        Clicky
      </Button>

      <Box mt={1}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            ErrorMonitor.logException(new Error("some bug " + Math.random()));
          }}
        >
          Throw error
        </Button>
      </Box>
    </div>
  );
};
