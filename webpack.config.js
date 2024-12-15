const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

var path = require("path");

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  entry: path.resolve(__dirname, "index.js"),
  output: {
    path: path.resolve(__dirname, "output"),
    filename: "main.js",
  },

  mode: "production",
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        semi: ["warn", "always"],
        quotes: ["warn", "double"],
      },
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
};
