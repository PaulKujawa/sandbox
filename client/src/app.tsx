// import { Button } from "@mui/material";
// import CssBaseline from "@mui/material/CssBaseline";
// import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import React, { StrictMode } from "react";
// import { ErrorBoundary } from "react-error-boundary";
// import { RouterProvider } from "react-router-dom";
// import { Router } from "./router";
// import {
//   QueryClientProvider,
//   ReactQueryClient,
//   ReactQueryDevtools,
// } from "./lib";

import Layout from "./layout";
// import LandingPage from "./landing/page";
// import { useQuery } from "@tanstack/react-query";
// import { PostsQuery } from "./posts/repositories";

export default function App() {
  // const { reset } = useQueryErrorResetBoundary();
  // const { data } = useQuery(PostsQuery());
  // const posts = data!; // react-query lacks full suspense TS support

  return <Layout />;
}

/* 
  <QueryClientProvider client={ReactQueryClient}>
    <ReactQueryDevtools initialIsOpen={false} />

    {posts.map((post) => (
     <span>{post.title},</span>
    ))}

    <CssBaseline />

    <ErrorBoundary
    onReset={reset}
    fallbackRender={({ error, resetErrorBoundary }) => (
    <div>
    There was an error!!!{" "}
    <Button onClick={resetErrorBoundary}>Try again</Button>
    <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
    </div>
    )}
    >
      <RouterProvider router={Router} />
      <Layout>
      <LandingPage />
      </Layout>
    </ErrorBoundary>
  </QueryClientProvider>

*/
