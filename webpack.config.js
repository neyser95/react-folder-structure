const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'webpack-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'babel-preset-env', 'es2015']
            },
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
  ,
  devServer: {
    contentBase: path.resolve(__dirname, '.'),
    port: 3000,
    open: true,
    hot: true,
  }
}