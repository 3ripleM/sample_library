/* eslint-disable @typescript-eslint/ban-ts-comment */
import path from "path";
import HtmlWebPackPlugin from "html-webpack-plugin";
import "webpack-dev-server";
import baseconfig from "./webpack.config";

const config = () => {
  const base = baseconfig();
  base.output = {};

  base.mode = "development";
  base.devtool = "inline-source-map";

  base.entry = {
    client: "./src/main.tsx",
  };

  base.output = {
    ...base.output,
    filename: "js/client.js",
  };

  base.devServer = {
    liveReload: true,
    hot: true,
    client: {
      progress: true,
    },
  };

  base.target = "web";
  base.plugins = [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "./index.html"),
      filename: "./index.html",
    }),
  ];

  return base;
};

export default config;
