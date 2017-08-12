const path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './public/assets/js/main.js',
  output: {
    filename: 'main.compile.js',
    path: path.resolve(__dirname, 'public/assets/js')
  },
  resolve:
   { extensions:
      [
        '.js',
        '.json',
        '.jsx',
        '.html',
        '.css',
        '.scss',
        '.yaml',
        '.yml' ],
     modules: [ 'node_modules' ],
     alias: {},
     unsafeCache: true },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties']
        }
      }
    ]
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.CommonsChunkPlugin({
        children: true,
        async: true,
    })
  ]
};
