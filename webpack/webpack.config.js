const prodConfig = require('./config/webpack.prod');
const devConfig = require('./config/webpack.dev');

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
