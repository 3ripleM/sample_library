/* eslint-disable @typescript-eslint/ban-ts-comment */
import path from "path";
import baseConfig from "./webpack.config";
import { Configuration } from "webpack";
import webpackNodeExternals from "webpack-node-externals";

const base = baseConfig();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config = (env: any): Configuration => ({
  ...base,
  mode: "production",
  target: env.platform === "server" ? "node" : "web",
  externals: env.platform === "server" ? [webpackNodeExternals()] : [],
  output: {
    ...base.output,
    filename: env.platform === "server" ? "js/server.js" : "js/client.js",
  },
  entry:
    env.platform === "server"
      ? {
          server: path.resolve(__dirname, "./src/server/index.tsx"),
        }
      : {
          client: "./src/main.tsx",
        },
});

export default config;
