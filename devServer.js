const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const open = require("open");
const configApp = require('./config');

const NODE_ENV = process.env.NODE_ENV || 'development';

let configServer = configApp(NODE_ENV)['_onlyDevelopment']['devServer'];

let PORT = process.env.PORT || configServer.port;

let url = `http://${configServer.host}:${PORT}`;

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());


let configDevServer = {
  publicPath: webpackConfig.output.publicPath,
  historyApiFallback: true,
  disableHostCheck: true,
  hot: false,
  compress: true,
  inline: false,
};

if (NODE_ENV === 'development') {
  webpackConfig.entry = [
    `webpack-dev-server/client?${url}`,
    'webpack/hot/only-dev-server',
    './App.js'
  ];

  configDevServer = Object.assign(configDevServer, {
    disableHostCheck: false,
    hot: true,
    compress: false
  });
}

new webpackDevServer(webpack(webpackConfig), configDevServer)
  .listen(PORT, configServer.host, (err, res) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Server listening on: ${url}`);
    open(url);
  });
