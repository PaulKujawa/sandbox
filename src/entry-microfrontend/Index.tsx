import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { App } from "../core/App";
import { ErrorMonitor } from "../core/lib";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary: (err) => {
    ErrorMonitor.logException(err);
    return <div />;
  },
  domElementGetter: () =>
    document.querySelector(".shelf-root-config_body > section")!,
});

export const { bootstrap, mount, unmount } = lifecycles;
