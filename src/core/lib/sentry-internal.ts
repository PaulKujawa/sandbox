import {
  BrowserOptions,
  defaultIntegrations,
  Hub,
  SDK_VERSION,
} from "@sentry/browser";
import { addInstrumentationHandler } from "@sentry/utils";

/*
 * DANGER!
 * CONTENT OF THIS FILE IS TAKEN FROM SENTRY SDKS DUE TO THEIR INSUFFICIENT MICRO-FRONTEND SUPPORT.
 */

// https://github.com/getsentry/sentry-javascript/blob/af7081c9e9be240578cf608048734572ce709ac0/packages/browser/src/sdk.ts#L78
export const OPTIONS_BROWSER_SDK: BrowserOptions = {
  autoSessionTracking: true,
  defaultIntegrations,
  sendClientReports: true,
};

// https://github.com/getsentry/sentry-javascript/blob/af7081c9e9be240578cf608048734572ce709ac0/packages/react/src/sdk.ts#L6
export const OPTIONS_REACT_SDK: BrowserOptions = {
  _metadata: {
    sdk: {
      name: "sentry.javascript.react",
      packages: [{ name: "npm:@sentry/react", version: SDK_VERSION }],
      version: SDK_VERSION,
    },
  },
};

// https://github.com/getsentry/sentry-javascript/blob/af7081c9e9be240578cf608048734572ce709ac0/packages/browser/src/sdk.ts#L206
export const startSessionTracking = (hub: Hub) => {
  if (!hub.captureSession) return;

  const startSessionOnHub = () => {
    hub.startSession({ ignoreDuration: true });
    hub.captureSession();
  };

  startSessionOnHub();

  addInstrumentationHandler("history", ({ from, to }) => {
    if (!(from === undefined || from === to)) {
      startSessionOnHub();
    }
  });
};
