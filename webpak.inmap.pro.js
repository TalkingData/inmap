/**
 * Created by lu on 2016/12/5.
 */
const merge = require('webpack-merge');
var config = require('./webpak.inmap');
var webpack = require('webpack');
const path = require('path');
module.exports = merge(config, {
  output: {
    path: path.join(__dirname, './dist'),
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});