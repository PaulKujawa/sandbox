// JSON format is recommended. JS is only used here for the capability of adding comments.
module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        // transpiling and polyfilling; when not configured, it would target ES5.
        // when run via Webpack, the TS-loader actually runs first, transpiling beforehand already.
        // when run via Jest, only Babel is involved, handling everything.
        "@babel/env",
        {
          targets:
            "last 2 chrome major versions, last 2 edge major versions, last 2 firefox major versions, safari 13.1",

          // useBuiltIns and CoreJs are responsible for polyfilling.
          // CoreJS version needs to match the minor version installed via NPM.
          useBuiltIns: "usage",
          corejs: { version: "3.20", proposals: true },
        },
      ],

      // When run via Webpack, TS-loader would had converted TSX to JS.
      // when run via Jest, transpiling needs happen via Babel. Hence it needs transpiler for React & TS.
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins: ["@babel/plugin-transform-runtime"],
  };
};
