// require header.less
require('./header.less');
var { signals } = require('../../jquery/utils');
var { UI, createWidget, WidgetClass } = require('../../jquery/components/core');
var componentName = 'header';
var Header = WidgetClass.extend({

  componentName: componentName,

  initialize: function () {
    console.log('header widget initialize...');
    signals.get('header').broadcast('header initialize....');
  },
  destroy: function () {
    this._destroy();
    // do other resource destroy.
  }

});

createWidget(componentName, Header);

UI.ready(function (context) {

  // don some thing.

}, Header.getPluginInstanceName(componentName));


module.exports = Header;
