/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const packageJson = fs.readFileSync("./package.json");
const version = JSON.parse(packageJson).version || 0;
const wc = process.env.WC == "true" ? true : false;
module.exports = {
  outputDir: wc == false ? __dirname + "/dist" : __dirname + "/dist/distwc",
  configureWebpack: {
    devtool: "source-map", //for debugging
    entry: wc == false ? "./src/main.ts" : "./src/main-wc.ts",
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    plugins: generatePlugins(),
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "src"),
      },
    },
  },
  chainWebpack: (config) => {
    if (wc === true) {
      config.optimization.delete("splitChunks");
    }
  },
};
function generatePlugins() {
  const plugins = [];
  plugins.push(
    new webpack.DefinePlugin({
      "process.env.WC": JSON.stringify(process.env.WC),
      "process.env.VERSION": '"' + version + '"',
    })
  );
  plugins.push(
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: wc === false ? 8 : 1,
    })
  );
  plugins.push(
    new HtmlWebpackPlugin({
      title: "obusiness",
      filename: "./public/index.html",
    })
  );
  if (wc == true) {
    plugins.push(
      new HtmlWebpackPlugin({
        title: "obusiness WC",
        filename: "index.html",
        template: "./public/indexwc.html",
      })
    );
  }
  return plugins;
}
