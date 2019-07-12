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
        images: dir.resolve(dir.dist.base, dir.dist.images),
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
