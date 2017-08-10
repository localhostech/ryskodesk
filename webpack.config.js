const path = require('path');

module.exports = {
  entry: './public/assets/js/main.js',
  output: {
    filename: 'main.compile.js',
    path: path.resolve(__dirname, 'public/assets/js')
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
