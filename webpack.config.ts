import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";

const config = () => {
  // Default to the server configuration
  const base: webpack.Configuration = {
    mode: "development",
    entry: {},
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
    },
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          loader: "file-loader",
        },
      ],
    },
  };

  return base;
};

export default config;
