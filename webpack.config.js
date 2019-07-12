/* Modules imports */
const webpack = require('webpack');
const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SvgStorePlugin = require('webpack-svgstore-plugin');
const glob = require('glob');
const HappyPack = require('happypack');

/* Settings imports */
const dir = require('../settings/filePaths');
const lessLoaderSettings = require('../settings/lessLoader');


const mainSyles = [dir.resolve(dir.src.base, dir.src.styles, 'style.less')];

module.exports = ({ env, isDevserver = false, isWatching = false }) => {
  const isDeveloping = isDevserver || isWatching;
  const isProd = env === 'production';
  const sourceMap = !isProd;
  const extractLess = new ExtractTextPlugin({
    filename: '[name]',
    allChunks: true,
  });

  return {
    stats: {
      children: false,
      moduleTrace: false,
    },
    devtool: isDeveloping ? 'cheap-module-inline-source-map' : 'source-map',
    entry: Object.assign({}, {
        [`${dir.dist.js}polyfills.bundle.js`]: [
          'babel-polyfill',
          'picturefill',
          'intl',
          'intl/locale-data/jsonp/en.js',
          'intl/locale-data/jsonp/ru.js',
          'intl/locale-data/jsonp/kk.js',
          ...(isDevserver ? mainSyles : []),
        ],
        [`${dir.dist.js}amweia.main.bundle.js`]: dir.resolve(dir.src.base, dir.src.vue),
        [`${dir.dist.js}amweia.acc.bundle.js`]: [
          dir.resolve(dir.src.base, dir.src.global),
          ...glob.sync(dir.resolve(dir.src.base, dir.src.acc)),
          ...glob.sync(dir.resolve(dir.src.base, dir.src.ybaseAcc)),
        ],
        [`${dir.dist.js}amweia.sso.js`]: [dir.resolve(dir.src.base, dir.src.sso)],
        [`${dir.dist.css}style.css`]: [
          ...(!isDevserver ? mainSyles : []),
          dir.resolve(dir.src.base, dir.src.webfont),
        ],
      },
      isDevserver ? {} : {
        [`${dir.dist.css}checkout-payment-new-credit-card.css`]: dir.resolve(
          dir.src.base,
          dir.src.styles,
          'page.checkout-payment-new-card.less',
        ),
      },
      isDeveloping ? {} : {
        [`${dir.dist.css}productcockpit.css`]: dir.resolve(dir.src.base, dir.src.productcockpit),
        [`${dir.dist.fck}lynx-styles.css`]: dir.resolve(dir.src.base, dir.src.fck),
      },
    ),
    output: {
      path: dir.resolve(dir.dist.base),
      publicPath: '/_ui/responsive/',
      filename: '[name]',
      sourceMapFilename: `${dir.dist.js}[name].map`,
      chunkFilename: `${dir.dist.js}chunk.[name].[chunkhash:8].js`,
      jsonpFunction: 'amwJSONPFunction',
    },
    resolve: {
      // if you edit aliases, please update jsconfig.json
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        styles: dir.resolve(dir.src.base, dir.src.styles),
        App: dir.resolve(dir.src.base, dir.src.vueFolder),
        ProjectRoot: dir.resolve('./'),
      },
      modules: [
        resolve('client'),
        'node_modules',
      ],
      extensions: ['.js', '.vue', '.json', '.less'],
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          enforce: 'pre',
          use: 'happypack/loader?id=vue',
        }, {
          test: /\.js$/,
          exclude: [
            /node_modules/,
            /\.spec.js$/,
            /\.min.js$/,
          ],
          use: 'happypack/loader?id=js',
        }, {
          test: /webfont\.json$/,
          exclude: /node_modules/,
          use: extractLess.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                sourceMap,
                url: false,
                minimize: isProd,
              },
            }, {
              loader: 'webfonts-loader',
            }],
          }),
        }, {
          test: /\.less$/,
          exclude: /node_modules/,
          use: isDevserver ? [
            'cache-loader',
            'style-loader',
            ...lessLoaderSettings(sourceMap, isProd).use,
          ] : extractLess.extract(lessLoaderSettings(sourceMap, isProd)),
        }, {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          exclude: /\\icons/,
          use: [{
            loader: 'file-loader',
            options: {
              name: `${dir.dist.fonts}[name].[ext]`,
            },
          }],
        }, {
          test: /\.(jpe?g|png|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: `${dir.dist.images}[name].[ext]`,
            },
          }],
        }, {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
      }),
      new webpack.IgnorePlugin(/jquery-mousewheel$/),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|ru|kk/),
      extractLess,
      new SvgStorePlugin({
        prefix: 'icon-',
      }),
      new webpack.WatchIgnorePlugin([
        /productShareIcon/,
      ]),
      new HappyPack({
        id: 'js',
        loaders: ['babel-loader'],
      }),
      new HappyPack({
        id: 'vue',
        loaders: [{
          loader: 'vue-loader',
          options: {
            cssSourceMap: sourceMap,
            cssModules: {
              localIdentName: '[name]---[local]---[hash:base64:5]',
              camelCase: true,
            },
          },
        }],
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: `${dir.dist.js}amweia.main.bundle.js`,
        chunks: [
          `${dir.dist.js}amweia.acc.bundle.js`,
        ],
        minChunks: 2,
      }),
    ],
  };
};
