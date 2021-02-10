const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const clientConfig = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist/client'),
  }
}

module.exports = merge(baseConfig, clientConfig);