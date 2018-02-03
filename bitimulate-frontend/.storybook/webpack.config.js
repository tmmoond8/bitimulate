const config = require('../config/webpack.config.dev')
const path = require('path');

module.exports = {
  // resolve: config.resolve,
  module: {
    rules: config.module.rules
  }
} 