/**
 * Created by lu on 2016/12/5.
 */
var path = require('path');
var fileName = 'inMap';
var option = {
  entry: {
    inmap: './src/main.js',
    worker: './src/worker/index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
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
      },
      {
        test: /\.(less|css)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ]
  },
  plugins: [
  ]
};

module.exports = option;