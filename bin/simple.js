var path = require('path');
var express = require('express');
var cors = require('cors');
var favicon = require('serve-favicon');
var compression = require('compression');

var app = express();
var NODE_ENV = app.get('env') || 'production';
var port = process.env.PORT || 40000;
// compress all requests
app.use(compression());
app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

// Use this middleware to serve up static files built into the dist directory
app.use("/public", cors(), express.static(path.join(__dirname, '../public')));
app.use("/shared", cors(), express.static(path.join(__dirname, '../shared')));

var server = app.listen(port, function () {
  console.log('===Express server listening on port %d ===', server.address().port);
});
