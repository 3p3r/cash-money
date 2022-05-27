const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './index.js',
  performance: {
    maxAssetSize: 1e9,
    maxEntrypointSize: 1e9,
  }
  ,
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'package.json',
          to: 'package.json',
          transform(content) {
            const packageJson = JSON.parse(content.toString('utf8'));
            delete packageJson.scripts;
            delete packageJson.devDependencies;
            return Buffer.from(JSON.stringify(packageJson, null, 2));
          },
        },
      ],
    }),
  ],
  output: {
    libraryTarget: 'umd',
    filename: 'index.js',
    path: path.resolve(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'last 2 Chrome versions' }]],
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      os: require.resolve('os-browserify'),
      fs: require.resolve('memfs'),
      tty: require.resolve('tty-browserify'),
      url: require.resolve('url'),
      util: require.resolve('util'),
      path: require.resolve('path-browserify'),
      assert: require.resolve('assert'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
      process: require.resolve('process'),
      constants: require.resolve('constants-browserify'),
      readline: require.resolve('readline-browserify'),
      child_process: false,
    },
  },
};
