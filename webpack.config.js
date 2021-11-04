const webpack = require("webpack");
const path = require("path");

let config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./public/assets/bundle"),
    filename: "./bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"]
      }
    ]
  }
};

module.exports = config;
