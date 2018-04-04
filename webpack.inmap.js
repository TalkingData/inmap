/**
 * Created by lu on 2016/12/5.
 */
const path = require('path');
const webpack = require('webpack');
const version = require('./package.json').version;
const option = {
  entry: {
    inmap: './src/main.js',
    worker: './src/worker/index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    libraryTarget: 'umd',
    library: 'inMap',
    umdNamedDefine: true,
    filename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ]
  },
  externals: {
    BMap: {}
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(version)
    }),
  ]
};

module.exports = option;