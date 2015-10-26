var path = require('path');
var express = require('express');
var cors = require('cors');
var favicon = require('serve-favicon');
var compression = require('compression');
var getRenderParams = require('./buildConfig');
var app = express();
var router = require('./router');
var NODE_ENV = app.get('env') || 'production';
var port = process.env.PORT || 40000;
// compress all requests
app.use(compression());
app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

// Use this middleware to serve up static files built into the dist directory
app.use("/public", cors(), express.static(path.join(__dirname, '../public')));
app.use("/shared", cors(), express.static(path.join(__dirname, '../shared')));

// For testing mock service.
app.use('/api', cors(), router);

app.use("/", function(req, res) {
    // Resolve current server rendering params.
  var configParams = getRenderParams(req, NODE_ENV);

  var project = configParams.project;
  var jsBundles = configParams.jsBundles;
  var cssBundles = configParams.cssBundles;

  if (!project)  {
    console.log('router match failed in build.config.js, 404 not found!');
    // should give 404.
    res.status(404).send('Not found');
    return;
  }
  var stylesHtml = cssBundles.map(function (cssLink) {
    return ('<link name="'+cssLink.name+'" rel="stylesheet" type="text/css" href="'+cssLink.href+'">');
  }).join('');

  var scriptsHtml = jsBundles.map(function (jsLink) {
    return ('<script src="' + jsLink + '"></script>');
  }).join('');

  var html = '<!DOCTYPE html>' +
    ' <html>' +
    '  <head>' +
    '  <meta charset="utf-8">' +
    '  <meta name="renderer" content="webkit">' +
    '  <meta http-equiv="Cache-Control" content="no-siteapp">' +
    '  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">' +
    stylesHtml +
    '</head>' +
    '  <body>' +
    '    <div id="doc-view"></div>' +
    scriptsHtml +
    '  </body>' +
    '</html>';

  res.send(html);
});

var server = app.listen(port, function () {
  console.log('===Express server listening on port %d ===', server.address().port);
});
