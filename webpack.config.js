const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


module.exports = {
  'mode': 'production',
  'entry': './src/index.js',
  'output': {
    'path': path.resolve(__dirname, 'dist'),
    'filename': '[name].[chunkhash:8].js',
  },
  "optimization": {
    minimize: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: 'async',
      minSize: 1000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
  },
  'devtool': 'cheap-module-source-map',
  'plugins': [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Async Project',
      template: './src/index.html',
      inject: 'head',
    }),
    new CopyWebpackPlugin([{
      from: './src/assets',
      to: path.resolve(__dirname, 'dist/assets'),
    }]),
  ],
  'module': {
    'rules': [{
      'enforce': 'pre',
      'test': /\.(js|jsx)$/,
      'exclude': /node_modules/,
      'use': 'eslint-loader',
    }],
  },
};
