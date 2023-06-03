const ErrorMonitorProxy = () => {
  // would create some Datadog BrowserSdk instance.

  return {
    addError: (error: any) => console.debug("Error logged", error),
  };
};

export const ErrorMonitor = ErrorMonitorProxy();
