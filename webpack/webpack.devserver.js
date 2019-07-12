const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./configs/webpack.common');
const { HOT_RELOAD_PORT } = require('./settings/env');

module.exports = webpackMerge(commonConfig({
  env: 'development', isDevserver: true,
}), {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    host: 'amway.se.local',
    port: HOT_RELOAD_PORT,
    publicPath: `https://localhost:${HOT_RELOAD_PORT}/_ui/responsive/`,
    hot: true,
    https: true,
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
    },
    proxy: [{
      context: [
        '/**',
        '!/_ui/responsive/common/js/**',
        '!/_ui/responsive/theme-blue/css/**',
        '!/_ui/responsive/**/*hot-update.json',
      ],
      target: 'https://amway.se.local:9002',
      secure: false,
    }],
  },
});
