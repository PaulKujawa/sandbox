import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import {
  QueryClientProvider,
  ReactQueryClient,
  ReactQueryDevtools,
} from "./lib";
import { LandingPage, Layout, PostPage, PostsPage } from "./routes";

// decided not to add ReactRouter Loader API yet, despite their collab with ReactQuery,
// due to boilerplate code, weak TS support, and added SSR complexity.
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "posts",
        element: <PostsPage />,
      },
      {
        path: "posts/:postId",
        element: <PostPage />,
      },
    ],
  },
]);

export const App = () => {
  return (
    <QueryClientProvider client={ReactQueryClient}>
      <CssBaseline />
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
