const path = require('path');
const nodeExternals = require('webpack-node-externals');

const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const serverConfig = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()], 
  entry: './src/server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist/server'),
  }
}

module.exports = merge(baseConfig, serverConfig)