/*global require, module, __dirname */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './src/ts/boot.ts',
    vendor: [
      'angular',
      'angular-route',
      'angular-aria',
      'marked'
      //'reflect-metadata'
    ]
  },
  stats: {
    colors: true,
    reasons: true
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'md-tutorial.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      minify: false
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ],
  module: {
    preLoaders: [{
      test: /\.ts$/,
      loader: 'tslint'
    }],
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.png/, loader: 'url' },
      { test: /\.svg/, loader: 'url' },
      { test: /\.eot/, loader: 'url' },
      { test: /\.woff/, loader: 'url' },
      { test: /\.woff2/, loader: 'url' },
      { test: /\.ttf/, loader: 'url' }
    ]
  },
  devServer: {
    inline: true,
    colors: true
  }
};