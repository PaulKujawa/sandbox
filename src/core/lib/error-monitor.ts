import { ErrorMonitorFactory } from "./ext-sentry-integration";

export const ErrorMonitor = ErrorMonitorFactory({
  dsn: "https://0e3056564fc74650a1c62e1d00b532a7@o273281.ingest.sentry.io/6375291",
  release: process.env.GIT_COMMIT_HASH!,
});
