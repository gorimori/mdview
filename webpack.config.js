const path = require('path');

/** @typedef {import('webpack').Configuration} Configuration */
/** @type Configuration */
module.exports = {
  name: 'modern',
  mode: 'development',
  entry: {
    main: path.resolve('src', 'ts', 'entry_points', 'main.tsx')
  },
  output: {
    path: path.resolve('public', 'common', 'js'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      name: path.join('shared', 'main'),
      chunks: 'all'
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  }
};
