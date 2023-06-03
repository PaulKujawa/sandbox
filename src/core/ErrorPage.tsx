import { useRouteError } from "react-router-dom";
import React from "react";

export const ErrorPage = () => {
  const error = useRouteError() as any;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{JSON.stringify(error)}</p>
    </div>
  );
};
