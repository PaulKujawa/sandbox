import { BrowserClient, Hub } from "@sentry/browser";
import {
  OPTIONS_BROWSER_SDK,
  OPTIONS_REACT_SDK,
  startSessionTracking,
} from "./internal";

export interface Params {
  dsn: string;
  release: string;
}

export const ErrorMonitorFactory = ({ dsn, release }: Params) => {
  const client = new BrowserClient({
    ...OPTIONS_BROWSER_SDK,
    ...OPTIONS_REACT_SDK,
    attachStacktrace: true, // also attaches them to `messages`.
    dsn,
    environment: "production",
    release,

    // integrations: [new BrowserTracing()],
    // tracesSampleRate: 1.0,
  });

  const hub = new Hub(client);
  hub.bindClient(client);

  if (OPTIONS_BROWSER_SDK.autoSessionTracking) startSessionTracking(hub);

  return {
    logException: (error: any) => {
      hub.run((currentHub) => {
        currentHub.captureException(error);
      });
    },
  };
};
