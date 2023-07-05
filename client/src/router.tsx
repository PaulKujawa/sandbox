import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./error";
import LandingPage from "./landing/page";
import Layout from "./layout";

export const NavElements = [
  { id: "0-0", pathname: "/", label: "Home" },
  { id: "0-1", pathname: "/posts", label: "Fetch" },
  { id: "0-2", pathname: "/media-center", label: "Media Center" },
] as const;

// decided not to add ReactRouter Loader API yet, despite their collab with ReactQuery,
// due to boilerplate code, weak TS support, and added SSR complexity.
// export const Router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "",
//         element: <LandingPage />,
//       },
//       {
//         path: "posts",
//         lazy: async () => {
//           const { default: Component } = await import(
//             "./posts/page"
//             /* webpackChunkName: "posts-page" */
//             /* webpackPrefetch: true */
//           );
//           return { Component };
//         },
//       },
//       {
//         path: "media-center",
//         lazy: async () => {
//           const { default: Component } = await import(
//             "./media-center/page"
//             /* webpackChunkName: "media-center" */
//             /* webpackPrefetch: true */
//           );
//           return { Component };
//         },
//       },
//     ],
//   },
// ]);
