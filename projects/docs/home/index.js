require('../stylesheets/doc.less');
require('../stylesheets/hljs.less');
var hljs = require('highlight.js');
// export global object.
window.hljs = hljs;

var { UI } = require('../../../shared/jquery/components/core');
var { signals } = require('../../../shared/jquery/utils');
var { DropdownDemo, ButtonDemo, LazyloadDemo } = require('../../../shared/jquery/components/demo');
var Layout = require('../../../shared/widgets/layout');

function showComponentDemo(eventType, componentName) {
  console.debug('component name is `%s`', componentName);
  // clear existed sample code.
  $(".right-main .doc-content").html('<i class="glyph-icon glyph-spinner2 glyph-spin"></i> 加载中...');
  // simulate loading effection.
  setTimeout(function () {
    switch(componentName) {
    case 'dropdown':
      DropdownDemo.render();
      break;
    case 'button':
      ButtonDemo.render();
      break;
    case 'lazyload':
      LazyloadDemo.render();
    }
  },200);
}

signals.get('routes').subscribe(function (events) {
  var { type, data } = events;
  showComponentDemo(type, data);
});


UI.ready(function () {

  Layout.render();

}, Layout.getInstanceName());
