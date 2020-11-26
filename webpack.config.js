const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ],
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    open: false,
    clientLogLevel: 'silent',
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js|tsx|ts)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_module/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              fix: false,
            },
          },
        ],
      },
      {
        test: /\.(s*)css$/i,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_module/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 0,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
};
