const webpack = require("webpack");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const { GitRevisionPlugin } = require("git-revision-webpack-plugin");
const SentryCliPlugin = require("@sentry/webpack-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");

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
      }),

      new RemovePlugin({
        after: {
          test: [
            {
              folder: "./dist",
              method: (absoluteItemPath) => {
                return new RegExp(/\.js\.map$/, "m").test(absoluteItemPath);
              },
            },
          ],
        },
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
