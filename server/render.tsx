import React from "react";
import { renderToPipeableStream } from "react-dom/server";

import App from "../client/src/app";

module.exports = function (url, res) {
  res.socket.on("error", (error) => console.log("Fatal", error));
  let didError = false;

  const stream = renderToPipeableStream(<App />, {
    /* becomes added to HTML document as script tag and needs
     * to be accessible in folder exposed via `express.static`.
     *
     * TODO use webpack build stats instead (incl. content hashes)
     */
    bootstrapScripts: [`index.js`],

    // streams all HTML that is not wrapped by <Suspense />
    onShellReady() {
      //
      res.statusCode = didError ? 500 : 200;
      res.setHeader("Content-type", "text/html");
      stream.pipe(res);
    },
    onError(error) {
      didError = true;
      console.error(error);
    },
  });

  // TODO needed?
  // have the server wait for data before giving up.
  // Abandon and switch to client rendering if enough time passes.
  // Try lowering this to see the client recover.
  setTimeout(() => stream.abort(), 10000);
};
