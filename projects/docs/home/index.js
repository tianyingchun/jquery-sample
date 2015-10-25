require('../stylesheets/doc.less');
require('../stylesheets/hljs.less');
var hljs = require('highlight.js');
var { platform } = require('../../../shared/jquery/utils');
// export global object.
window.hljs = hljs;

var { UI } = require('../../../shared/jquery/components/core');
var { signals } = require('../../../shared/jquery/utils');
var { DropdownDemo, ButtonDemo, LazyloadDemo, PopupDemo, ValidateDemo, OtpDemo, PaginationDemo, TimelineDemo, SliderDemo, CollapseDemo, TabsDemo } = require('../../../shared/jquery/components/demo');
var Layout = require('../../../shared/widgets/layout');

function showComponentDemo(eventType, componentName) {
  var $layout = $('.wrapper.layout');
  var layoutInstance = $layout.getInstance();
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
        break;
      case 'popup':
        PopupDemo.render();
        break;
      case 'validate':
        ValidateDemo.render();
        break;
      case 'otp':
        OtpDemo.render();
        break;
      case 'pagination':
        PaginationDemo.render();
        break;
      case 'timeline':
        TimelineDemo.render();
        break;
      case 'slider':
        SliderDemo.render();
        break;
      case 'collapse':
        CollapseDemo.render();
        break;
      case 'tabs':
        TabsDemo.render();
        break;
    }

    var { msie, version } = platform;
    if (!msie || parseInt(version) >= 9) {
      // hightlight.
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    }

    layoutInstance.resetLeftDockSize();
  },200);
}

signals.get('routes').subscribe(function (events) {
  var { type, data } = events;
  showComponentDemo(type, data);
});


UI.ready(function () {

  Layout.render();

}, Layout.getInstanceName());
