'use strict';

var webpack = require('webpack');

module.exports = function () {
  var config = require('./webpack.base.config')();

  // plugins for production
  config.plugins = config.plugins.concat([
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      // for isomophic server ignore import stylesheet.
      // if (process.env.BROWSER) {
      //   require("./style.css");
      // }
      'process.env.BROWSER': JSON.stringify(true),
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        // maybe we need to compatible with ie8
        screw_ie8: false,
        dead_code: true,
        warnings: false,
        drop_console: true
      }
    })
  ]);

  return config;
};
