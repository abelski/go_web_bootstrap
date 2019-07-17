const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');

const dir = require('../settings/filePaths');
const lessLoaderSettings = require('../settings/lessLoader');


const outputPath = path.resolve(__dirname, './static');

module.exports = (options) => {
  const sourceMap = !(options.env === 'prod');
  const extractLess = new ExtractTextPlugin({
    filename: '[name]',
    allChunks: true,
  });

  return {
    optimization: {
      namedModules: true
    },
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
                minimize: options.env === 'prod',
              },
            }, {
              loader: 'webfonts-loader',
            }],
          }),
        }, {
          test: /\.less$/,
          exclude: /node_modules/,
          use: [
            'cache-loader',
            'style-loader',
            ...lessLoaderSettings(sourceMap, options.env === 'prod').use,
          ],
        }, {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          exclude: /\\icons/,
          use: [{
            loader: 'file-loader',
            options: {
              name: `${dir.static.fonts}[name].[ext]`,
            },
          }],
        }, {
          test: /\.(jpe?g|png|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: `${dir.static.images}[name].[ext]`,
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
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../app/assets/index.html'),
        filename: 'index.html',
        path: outputPath
      }),
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
    devServer: {
    contentBase: path.resolve(__dirname, './static/'),
      port: 8080,
      historyApiFallback: true,
      inline: true,
      hot: true,
      host: 'localhost'
  }
  };
};
