import { ErrorMonitorFactory } from "./sentry-factory";

export const ErrorMonitor = ErrorMonitorFactory({
  dsn: "https://96411070a6ac4a41971f81c7270d4c34@o273281.ingest.sentry.io/6378781",
  release: process.env.GIT_COMMIT_HASH!,
});
