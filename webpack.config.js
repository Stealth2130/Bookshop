const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var path = require("path");

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  entry: path.resolve(__dirname, "index.js"),
  output: {
    path: path.resolve(__dirname, "output"),
    filename: "main.js",
  },

  mode: "development",
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
