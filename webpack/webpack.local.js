const webpack = require('webpack');

const commonConfig = require('./configs/webpack.common');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonConfig({
  env: 'development', isDevserver: true,
}), {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        HOT_RELOAD: 'true',
      },
    }),
  ],
});
