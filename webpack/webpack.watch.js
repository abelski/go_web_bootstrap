const webpackMerge = require('webpack-merge');
const commonConfig = require('./configs/webpack.common');
const dir = require('./settings/filePaths');

module.exports = webpackMerge(commonConfig({
  env: 'development',
  isWatching: true,
  module: {
    rules: [{
      test: /\.vue$/,
      enforce: 'pre',
      loader: 'vue-loader',
      options: {
        preLoaders: {
          js: `eslint-loader?configFile=${dir.resolve(dir.src.eslint)}`,
        },
      },
    }, {
      test: /\.(vue|js)$/,
      enforce: 'pre',
      use: [{
        loader: 'eslint-loader',
        options: {
          configFile: dir.resolve(dir.src.eslint),
        },
      }],
    }],
  },
}));
