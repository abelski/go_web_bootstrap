const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');


const outputPath = path.resolve(__dirname, './static');

module.exports = ({ env, isDevserver = false, isWatching = false }) => {
  const isDeveloping = isDevserver || isWatching;
  const isProd = env === 'production';
  const sourceMap = !isProd;

  return {
    entry: {
      app: [
        path.resolve(__dirname, '../src/main.js')
      ]
    },
    output: {
      path: outputPath,
      filename: '[name].js'
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
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../app/assets/index.html'),
        filename: 'index.html',
        path: outputPath
      }),
      new webpack.NamedModulesPlugin(),
      new DefinePlugin({
        ENV: JSON.stringify(options.env),
        'process.env': {
          ENV: JSON.stringify(options.env),
          NODE_ENV: JSON.stringify(options.env)
        }
      }),
      new ExtractTextPlugin({
        filename: 'style.css'
      }),
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
    ],
  };
};
