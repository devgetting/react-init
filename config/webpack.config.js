const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT_DIR = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT_DIR, "src");
const DIST_DIR = path.join(ROOT_DIR, "dist");

const entry = path.join(SRC_DIR, "index.tsx");
const configFile = path.join(ROOT_DIR, "tsconfig.json");
const htmlTemplate = path.join(SRC_DIR, "index.dev.html");

module.exports = {
  entry,
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [SRC_DIR, "node_modules"],
    plugins: [new TsconfigPathsPlugin({ configFile })],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: htmlTemplate,
      filename: path.join(DIST_DIR, "index.html"),
    }),
  ],
  devServer: {
    port: 3001,
    historyApiFallback: true,
    host: "localhost",
  },
};
