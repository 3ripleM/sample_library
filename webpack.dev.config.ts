/* eslint-disable @typescript-eslint/ban-ts-comment */
import path from "path";
import HtmlWebPackPlugin from "html-webpack-plugin";
import "webpack-dev-server";
import baseconfig from "./webpack.config";
import { Configuration } from "webpack";

const base = baseconfig();

const config = (): Configuration => ({
  ...base,
  mode: "development",
  devtool: "inline-source-map",

  entry: {
    client: "./src/main.tsx",
  },

  output: {
    ...base.output,
    filename: "js/client.js",
  },

  devServer: {
    liveReload: true,
    hot: true,
    client: {
      progress: true,
    },
  },

  target: "web",

  plugins: [
    ...(base.plugins || []),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "./index.html"),
      filename: "./index.html",
    }),
  ],
});

export default config;
