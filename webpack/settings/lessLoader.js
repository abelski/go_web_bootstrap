const dir = require('./filePaths');

module.exports = (sourceMap, isProd) => ({
  fallback: 'style-loader',
  publicPath: '../../',
  use: [{
    loader: 'css-loader',
    options: {
      sourceMap,
      minimize: isProd,
      alias: {
        images: dir.resolve(dir.static.base, dir.static.images),
      },
      importLoaders: 2,
    },
  }, {
    loader: 'less-loader',
    options: {
      sourceMap,
    },
  }],
});
