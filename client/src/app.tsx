import { Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import React, { StrictMode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";
import { Router } from "router";
import { QueryClientProvider, ReactQueryClient, ReactQueryDevtools } from "lib";

export default () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <StrictMode>
      <QueryClientProvider client={ReactQueryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <CssBaseline />

        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            // TODO handle logging error via ErrorMonitor Proxy
            <div>
              There was an error!{" "}
              <Button onClick={resetErrorBoundary}>Try again</Button>
              <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
            </div>
          )}
        >
          <RouterProvider router={Router} />
        </ErrorBoundary>
      </QueryClientProvider>
    </StrictMode>
  );
};
