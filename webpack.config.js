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
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
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
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },

  cache: true,
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/favicon.ico"
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