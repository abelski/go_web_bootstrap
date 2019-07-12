const prodConfig = require('./configs/webpack.prod');
const devConfig = require('./configs/webpack.dev');

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = prodConfig({ env: 'production' });
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = devConfig({ env: 'development' });
}
