module.exports = {
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-env'
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'] // 不配置的是时候，默认是 ['.js', '.json']
  }
}