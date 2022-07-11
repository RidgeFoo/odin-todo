const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    // port: 3000,
    // open: true,
    // hot: true,
    // compress: true,
    // historyApiFallback: true,
  },
};

module.exports = merge(common, devConfig);
