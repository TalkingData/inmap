/**
 * Created by lu on 2016/12/5.
 */
var path = require('path');
var fileName = 'TDMap';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
var option = {
  entry: {
    tdmap: './tdmap/main.js',
    worker: './tdmap/worker/index.js'
  },
  output: {
    path: path.join(__dirname, './lib'),
    libraryTarget: 'umd',
    library: fileName,
    umdNamedDefine: true,
    filename: "[name].js"
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'autoprefixer-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
          fallback: 'style-loader'
        })
      },
    ]
  },

  plugins: [
    new ExtractTextPlugin("tdmap.style.css"),
  ]
};

module.exports = option;