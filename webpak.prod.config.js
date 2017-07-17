/**
 * Created by lu on 2016/12/5.
 */
const merge = require('webpack-merge');
var config = require('./webpak.base.config');
var webpack = require('webpack');
const path = require('path');
module.exports = merge(config, {
  
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        
      }
    })
  ]
});