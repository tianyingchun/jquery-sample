// require header.less
require('./header.less');
var { UI, createWidget, WidgetClass } = require('../../jquery/components/core');
var { template } = require('../../jquery/utils');
var componentName = 'header';
var Header = WidgetClass.extend({

  componentName: componentName,

  initialize: function () {
    console.log('header widget initialize...');
    this.broadcast('initialize', 'header initialize....');
  },
  destroy: function () {
    this._destroy();
    // do other resource destroy.
  },
  render: function () {

    var header = 'template';


    this.broadcast('rendered', 'header rendered....');

  }
});

createWidget(componentName, Header);

UI.ready(function (context) {
  new Header().render();
}, Header.getInstanceName(componentName));


module.exports = Header;
