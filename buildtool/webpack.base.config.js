'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function baseConfig() {
  return {
    entry: {
      // nothing.
    },
    module: {
      loaders: [
        // Extract css files
        // Use the autoprefixer-loader
        { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader") },
        // extract less files using stylus loader
        { test: /\.styl$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!stylus-loader") },
        // Optionally extract less files using less loader
        { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader") },

        // inline base64 URLs for <=5k images, direct URLs for the rest, >-5k leave asset file to dist dir.
        { test: /\.(png|jpg)$/, loader: "url-loader", query:{ limit: 5000, context:'${projectName}/stylesheets', name:'${projectName}/[path][name].[ext]' } }
      ]
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(), //Note. don't know if there are some problem maybe.
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      }),
      new ExtractTextPlugin("${projectName}/[name]/bundle.css${version}", { allChunks: true })
    ],
    output: {
      path: path.join(__dirname, 'public'),
      // workspace/member/v1000/bundle.js --with version.
      // workspace/member/bundle.js
      filename: '${projectName}/[name]/bundle.js${version}'
      // publicPath: 'http://cdn.xx.com/public/' will set dynamicly via buildtool.
    },
    externals: {
      // require("jquery") is external and available
      // on the global var jQuery
      "jquery": "jQuery"
    },

    stats: {
      // Configure the console output, https://github.com/webpack/grunt-webpack
      // colors: false,
      // modules: true,
      // reasons: true
    },
    resolve: {
      extensions: ['', '.js']
    }
  };
};
