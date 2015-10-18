require('../stylesheets/doc.less');

var { UI } = require('../../../shared/jquery/components/core');
var { Dropdown, Popup } = require('../../../shared/jquery/components');
var { signals } = require('../../../shared/jquery/utils');
// var Header = require('../../../shared/widgets/header');
var Layout = require('../../../shared/widgets/layout');
var dialog = Popup.dialog;

function showComponentDemo(eventType, componentName) {
  console.debug('component name is `%s`', componentName);
  switch(componentName) {
    case '':
    break;
  }
}

signals.get('routes').subscribe(function (events) {
  var { type, data } = events;
  showComponentDemo(type, data);
});



UI.ready(function () {

  Layout.render();

}, Layout.getInstanceName());
