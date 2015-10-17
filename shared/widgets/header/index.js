// require header.less
require('./header.less');
var { UI, createWidget, WidgetClass } = require('../../jquery/components/core');
var componentName = 'header';
var Header = WidgetClass.extend({

  componentName: componentName,

  initialize: function () {
    console.log('header widget initialize...');
    this.broadcast('header initialize....');
  },
  destroy: function () {
    this._destroy();
    // do other resource destroy.
  }

});

createWidget(componentName, Header);

UI.ready(function (context) {

  // don some thing.

}, Header.getInstanceName(componentName));


module.exports = Header;
