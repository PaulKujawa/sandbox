const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const SentryCliPlugin = require("@sentry/webpack-plugin");
const webpack = require("webpack");
const { GitRevisionPlugin } = require("git-revision-webpack-plugin");

module.exports = (env = {}, argv) => {
  const isDev = !!env.WEBPACK_SERVE;
  const isProd = !isDev;

  // webpack plugin to get the latest git commit and version tag
  const gitCommitHash = new GitRevisionPlugin().commithash();

  return {
    mode: isProd ? "production" : "development",
    entry: {
      index: "./src/entry-standalone/Index.tsx",
    },
    output: {
      // where to put any output file - the dist folder for the webserver and nginx.
      path: path.resolve(__dirname, "dist"),
      // also used for bundles created via dynamic imports.
      filename: "[name].[contenthash].js",
      // clear output folder before re-run
      clean: true,

      // publicPath: '/'
    },
    resolve: {
      // so file extensions can be left out in imports
      // No (babel) loader is registered for js files, but Babel-loader places imports of core-js Js files
      extensions: [".js", ".ts", ".tsx"],

      plugins: [
        // ts-loader does not support TS compilerOption `paths` out of the box.
        new TsconfigPathsPlugin({ configFile: "./tsconfig.json" }),
      ],
    },
    // see https://webpack.js.org/configuration/devtool/#production for further optimisation
    devtool: isProd ? "hidden-source-map" : "eval-cheap-source-map",
    devServer: {
      // which folder to serve from on localhost:8080.
      // dist files are only put into memory and not reflected on the file system.

      // TODO If your page expects to find the bundle files on a different path,
      // you can change this with the publicPath option in the dev server's configuration.
      static: "./dist",

      // open the default browser after initial build.
      open: true,

      // see https://webpack.js.org/guides/hot-module-replacement & https://github.com/gaearon/react-hot-loader
      hot: false,
    },
    module: {
      rules: [
        // HTML is not referenced in JS files but as template by `HtmlWebpackPlugin`.
        { test: /\.html$/, use: ["html-loader"] },

        // style-loader takes care of HMR too
        { test: /\.css$/, use: ["style-loader", "css-loader"] },

        // excluding node_modules improves speed but means libraries do not become neither transpiled nor polyfilled.
        // the Babel docs have an example for how to include specific libraries when needed.
        {
          test: /\.tsx?$/,
          use: ["babel-loader", "ts-loader"],
          exclude: /node_modules/,
        },

        { test: /\.(gif|jpg)$/, type: "asset/resource" },
      ],
    },
    plugins: [
      // generate index.html that references output files dynamically.
      // A custom HTML template is needed for React's root div to be placed.
      new HtmlWebpackPlugin({
        template: "./src/entry-standalone/index.html",
        favicon: "./src/entry-standalone/favicon.ico",
      }),

      // replace variables in code with provided values at compilation time
      new webpack.DefinePlugin({
        "process.env.GIT_COMMIT_HASH": JSON.stringify(gitCommitHash),
      }),

      // push releases incl. sourcemaps and git commits to Sentry
      new SentryCliPlugin({
        authToken:
          "288686163f564ca9878973e779b09c095188f0f3ec724c8abc17ac0732810652",
        dryRun: isDev,
        ignore: ["node_modules"],
        include: "./dist",
        org: "paul-kujawa",
        project: "webpack-playground",
        release: gitCommitHash,
        setCommits: { auto: true, ignoreMissing: true },
        // urlPrefix: `~/` matches `/foo.js` (default) and `~/js/` matches `/js/foo.js`. Also works for CDNs
      }),

      // visual representation of bundles and chunks.
      ...(env.analyse ? [new BundleAnalyzerPlugin()] : []),
    ],

    optimization: {
      minimize: false,
      // the entry bundle contains the runtime and manifest, that can differ between deployments. This can cause unnecessary
      // changes in content-hashing and hence cache busting. This boilterplate can be extracted into a separate bundle.
      // runtimeChunk: 'single',

      // splitChunks: { ... }
    },
  };
};
