const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = function (env, options) {
  const ENV = options.mode;
  return webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'source-map',
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true
      })
    ]
  });
};
