const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { ProvidePlugin, DefinePlugin, EnvironmentPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: process.env.CI ? "production" : "development",
  devtool: `${process.env.CI ? "" : "inline-"}source-map`,
  entry: "./index.js",
  performance: {
    maxAssetSize: 1e9,
    maxEntrypointSize: 1e9,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      ["process.env"]: `(${JSON.stringify({
        USER: "root",
        HOME: "/root",
        TEMP: "/tmp",
      })})`,
    }),
    new ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: require.resolve("./src/process"),
    }),
    new CopyPlugin({
      patterns: [
        { from: "README.md", to: "README.md" },
        {
          from: "package.json",
          to: "package.json",
          transform(content) {
            const packageJson = JSON.parse(content.toString("utf8"));
            delete packageJson.scripts;
            delete packageJson.devDependencies;
            return Buffer.from(JSON.stringify(packageJson, null, 2));
          },
        },
      ],
    }),
  ],
  output: {
    library: {
      commonjs: "cash-money",
      amd: "cash-money",
      root: "CASH_MONEY",
    },
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
    filename: "index.js",
    path: path.resolve(process.cwd(), "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "last 2 Chrome versions" }]],
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      fs: require.resolve("memfs"),
      tty: require.resolve("tty-browserify"),
      url: require.resolve("url"),
      util: require.resolve("util"),
      path: require.resolve("path-browserify"),
      assert: require.resolve("assert"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer"),
      constants: require.resolve("constants-browserify"),
      readline: require.resolve("readline-browserify"),
      child_process: false,
    },
    alias: {
      os: require.resolve("./src/os"),
      process: require.resolve("./src/process"),
    },
  },
  ignoreWarnings: [
    {
      // AFAIK this is never hit in Cash
      module: /vorpal\/dist\/vorpal\.js$/,
      message: /request of a dependency is an expression/,
    },
  ],
};
