const { resolve } = require('path');

const srcAssetsPath = 'scr/assets/';
const vueFolder = `src/`;

module.exports = {
  src: {
    base: './src/',

    fontIcons: `${srcAssetsPath}icons/`,
    fonts: `${srcAssetsPath}fonts/`,
    styles: `${srcAssetsPath}less/`,
    vueFolder: vueFolder,
    vue: `${vueFolder}index.js`,

    eslint: '.eslintrc',
  },
  static: {
    base: './static/',
    js: 'static/js/',
    css: 'static/css/',
    fonts: 'static/fonts/',
    images: 'static/images/',
  },
  resolve: (...args) => resolve(__dirname, '..', '..', ...args),
};
