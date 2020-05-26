const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");

require('dotenv').config();


const config = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    hashDigestLength: 15,
    filename: 'bundle.[hash].js',
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'sass-loader'],
      },
    ]
  },

  cache: true,
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[hash].css',
    }),
    new DotEnv()
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};


module.exports = config;