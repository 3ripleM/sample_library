/* eslint-disable @typescript-eslint/ban-ts-comment */
import path from "path";
import baseConfig from "./webpack.config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config = (env: any) => {
  const base = baseConfig();
  base.mode = "production";

  // Server-specific configuration
  if (env.platform === "server") {
    base.target = "node";

    //@ts-ignore
    base.output.filename = "js/server.js";
    //@ts-ignore
    base.entry["server"] = path.resolve(__dirname, "./src/server/index.tsx");
  }

  // Client-specific configurations
  if (env.platform === "web") {
    base.target = "web";

    //@ts-ignore
    base.entry["client"] = "./src/main.tsx";
    //@ts-ignore
    base.output.filename = "js/client.js";
  }

  return base;
};

export default config;
