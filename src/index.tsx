import { Form, Header } from "@app/components";
import { Button } from "@material-ui/core";
import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";
import React from "react";
import ReactDOM from "react-dom";
import ImageDogeUrl from "./assets/doge.jpg"; // includes domain and port
import "./index.css";

import(/* webpackPreload: true */ "lodash");

Sentry.init({
  dsn: "https://c3f4c102aa6a4bb0bdbc76608666902f@o273281.ingest.sentry.io/6233724",
  release: process.env.GIT_COMMIT_HASH,

  // integrations: [new BrowserTracing()],
  // tracesSampleRate: 1.0,
});

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
      <button
        onClick={() => {
          throw new Error("some error 1");
        }}
      >
        Throw error
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
