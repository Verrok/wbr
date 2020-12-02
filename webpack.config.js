const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");

require('dotenv').config();


const config = (env, argv) => (
    {
      entry: "./src/index.js",
      output: {
        path: path.join(__dirname, "/dist"),
        filename: "[name].[hash].js"
      },
      devServer: {
        historyApiFallback: true,
        hot: true
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
            use: [process.env.MODE === "development" ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          }
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
        new DotEnv({
          path: argv.mode === "development" ? "./.env" : "./prod.env"
        })
      ],
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        // splitChunks: {
        //   chunks: "all"
        // }
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 0,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/
            }
          }
        }
      }
    }
);


module.exports = config;
