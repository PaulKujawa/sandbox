const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");
const { GitRevisionPlugin } = require("git-revision-webpack-plugin");

module.exports = (env = {}, argv) => {
  const isDev = true;
  const isProd = !isDev;

  // webpack plugin to get the latest git commit and version tag
  const gitCommitHash = new GitRevisionPlugin().commithash();

  return {
    mode: isProd ? "production" : "development",
    entry: {
      index: "./src/index.tsx",
    },
    output: {
      // where to put any output file - the dist folder for the webserver and nginx.
      path: path.resolve(__dirname, "..", "build"),
      // also used for bundles created via dynamic imports.
      filename: "[name].js",
      // clear output folder before re-run
      clean: true,
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
    // full sourcemaps should be generated on production for monitoring software like Datadog or Sentry.
    // But as industry security practise not shown to actual users. So after upload, remove them e.g. via the RemovePlugin.
    devtool: isProd ? "hidden-source-map" : "eval-cheap-source-map",
    module: {
      rules: [
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
      // replace variables in code with provided values at compilation time
      new webpack.DefinePlugin({
        "process.env.GIT_COMMIT_HASH": JSON.stringify(gitCommitHash),
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
