// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

// module.exports = {
//   plugins: [
//     // your custom plugins
//   ],
//   module: {
//     rules: [
//       // add your custom rules.
//     ],
//   },
// };

// const Dotenv           = require('dotenv-webpack');
// const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

// module.exports = (baseConfig, env) => {
//   const config = genDefaultConfig(baseConfig, env);

//   config.plugins.push(new Dotenv());

//   return config;
// };

const config = require('../config/webpack.config.dev')
const path = require('path');

module.exports = {
  // resolve: config.resolve,
  module: {
    rules: config.module.rules
  }
} 