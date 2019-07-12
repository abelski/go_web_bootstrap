const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = function (options) {
  const ENV = options.env;
  return webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new webpack.HotModuleReplacementPlugin()
    ]
  });
};
