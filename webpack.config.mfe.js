const webpack = require("webpack");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const { GitRevisionPlugin } = require("git-revision-webpack-plugin");

module.exports = (env, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "kujawa",
    projectName: "webpack-playground",
    orgPackagesAsExternal: false,
    webpackConfigEnv: env,
    argv,
  });

  const isDev = !!env.WEBPACK_SERVE;
  const isProd = !isDev;

  const gitCommitHash = new GitRevisionPlugin().commithash();

  return merge(defaultConfig, {
    mode: isProd ? "production" : "development",
    entry: {
      index: "./src/entry-microfrontend/Index.tsx",
    },
    devServer: {
      https: true,
    },
    devtool: isProd ? "hidden-source-map" : "eval-cheap-source-map",
    plugins: [
      new webpack.DefinePlugin({
        "process.env.GIT_COMMIT_HASH": JSON.stringify(gitCommitHash),
      }),
    ],
    module: {
      rules: [
        { test: /.(svg|png|jpe?g)$/, type: "asset/resource" },
        { test: /\.m?js/, resolve: { fullySpecified: false } },
      ],
    },
  });
};
