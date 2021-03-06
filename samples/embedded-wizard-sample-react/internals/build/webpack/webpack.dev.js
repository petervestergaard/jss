const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const pkg = require('../../../package.json');
const env = require('../env.dev');

module.exports = baseConfig.map((c) => {
  const config = c;
  config.devtool = 'source-map';
  config.output.path = path.resolve(process.cwd(), pkg.config.buildArtifactsPathDev);
  config.output.publicPath = path.join('/', pkg.config.buildArtifactsPathDev, '/').replace(/\\/g, '/'); // path.join uses '\' on Windows
  config.resolve.alias.dataprovideralias = path.resolve(process.cwd(), 'src/dataProvider/DataProvider.dev');

  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __BUNDLE_OUTPUT_PATH__: JSON.stringify(config.output.publicPath),
      __INITIAL_ROUTE__: JSON.stringify('/EmbeddedWizard/Wizard'),
      __SC_API_HOST__: JSON.stringify(env.SC_API_HOST),
    }),
    new webpack.NamedModulesPlugin(),
  ];

  if (config.name === 'client') {
    config.entry.client.unshift('webpack-dev-server/client?http://localhost:3001');
  }

  config.plugins = config.plugins ? config.plugins.concat(plugins) : plugins;

  return config;
});
