var LocationBar = require('location-bar');
var { UI, createWidget, WidgetClass } = require('../../jquery/components/core');
var { signals } = require('../../jquery/utils');
var componentName = 'layout';
var locationBar = new LocationBar();

locationBar.onChange(function (path) {
  // console.log("the current url is", path);
  signals.get('routes').broadcast({type:'routeChanged', data: path});
});

var tpl =
  '<div class="wrapper" id="wrapper">' +
  '  <div class="doc-page">' +
  '    <div class="layout-topnav">' +
  '      <header class="topbar topbar-inverse">' +
  '        <h1 class="topbar-brand">' +
  '            <a href="/docs">The Jquery Components</a>' +
  '            <span class="badge badge-warning"></span>' +
  '        </h1>' +
  '      </header>' +
  '    </div>' +
  '    <div class="page-body container">' +
  '     <div class="row">' +
  '       <div id="left-dock" class="nav-left-dock col-sm-2">' +
  '         dock menus' +
  '       </div>' +
  '       <div id="right-main" class="right-main col-sm-10">' +
  '         <div class="doc-content"></div>' +
  '       </div>' +
  '     </div>'
'    </div>'
'  </div>' +
'</div>';

var leftDock =
  '<ul class="menu menu-root menu-inline">' +
  '  <li class="menu-submenu-inline menu-submenu-open menu-submenu">' +
  '    <div class="menu-submenu-title">' +
  '      <span>' +
  '        <span>前期UI组件</span>' +
  '        <span class="menu-title-en">Draft</span>' +
  '      </span>' +
  '    </div>' +
  '    <ul class="menu menu-inline menu-sub">' +
  '      <li class="menu-item" style="padding-left:24px;">' +
  '        <a class="nav-link" href="/dropdown">' +
  '          <span>' +
  '            <span>下拉框</span>' +
  '            <span class="menu-title-en">Dropdown</span>' +
  '          </span>' +
  '        </a>' +
  '      </li>' +
  '      <li class="menu-item" style="padding-left:24px;">' +
  '        <a class="nav-link" href="/button">' +
  '          <span>' +
  '            <span>按钮</span>' +
  '            <span class="menu-title-en">Button</span>' +
  '          </span>' +
  '        </a>' +
  '      </li>' +
  '      <li class="menu-item" style="padding-left:24px;">' +
  '        <a class="nav-link" href="/lazyload">' +
  '          <span>' +
  '            <span>图片懒加载</span>' +
  '            <span class="menu-title-en">Lazyload</span>' +
  '          </span>' +
  '        </a>' +
  '      </li>' +
  '      <li class="menu-item" style="padding-left:24px;">' +
  '        <a class="nav-link" href="/popup">' +
  '          <span>' +
  '            <span>弹窗</span>' +
  '            <span class="menu-title-en">popup</span>' +
  '          </span>' +
  '        </a>' +
  '      </li>' +
  '      <li class="menu-item" style="padding-left:24px;">' +
  '        <a class="nav-link" href="/validate">' +
  '          <span>' +
  '            <span>表单验证</span>' +
  '            <span class="menu-title-en">validate</span>' +
  '          </span>' +
  '        </a>' +
  '      </li>' +
  '      <li class="menu-item" style="padding-left:24px;">' +
  '        <a class="nav-link" href="/otp">' +
  '          <span>' +
  '            <span>OTP发短信组件</span>' +
  '            <span class="menu-title-en">OTP</span>' +
  '          </span>' +
  '        </a>' +
  '      </li>' +
  '      <li class="menu-item" style="padding-left:24px;">' +
  '        <a class="nav-link" href="/pagination">' +
  '          <span>' +
  '            <span>分页组件</span>' +
  '            <span class="menu-title-en">Pagination</span>' +
  '          </span>' +
  '        </a>' +
  '      </li>' +
  '      <li class="menu-item" style="padding-left:24px;">' +
  '        <a class="nav-link" href="/timeline">' +
  '          <span>' +
  '            <span>时间轴</span>' +
  '            <span class="menu-title-en">Timeline</span>' +
  '          </span>' +
  '        </a>' +
  '      </li>' +
  '      <li class="menu-item" style="padding-left:24px;">' +
  '        <a class="nav-link" href="/slider">' +
  '          <span>' +
  '            <span>图片轮播</span>' +
  '            <span class="menu-title-en">slider</span>' +
  '          </span>' +
  '        </a>' +
  '      </li>' +
  '      <li class="menu-item" style="padding-left:24px;">' +
  '        <a class="nav-link" href="/collapse">' +
  '          <span>' +
  '            <span>折叠面板</span>' +
  '            <span class="menu-title-en">collapse</span>' +
  '          </span>' +
  '        </a>' +
  '      </li>' +
  '      <li class="menu-item" style="padding-left:24px;">' +
  '        <a class="nav-link" href="/tabs">' +
  '          <span>' +
  '            <span>栏目切换</span>' +
  '            <span class="menu-title-en">tabs</span>' +
  '          </span>' +
  '        </a>' +
  '      </li>' +
  '    </ul>' +
  '  </li>' +
  '</ul>';

var Layout = WidgetClass.extend({

  componentName: componentName,

  initialize: function () {
    this.broadcast({
      type: 'initialize',
      data: 'layout initialize....'
    });

    // listening routes hash change events.
    signals.get('routes').subscribe(this.bind(this.initMenuItemLocation));
  },

  destroy: function () {
    this._destroy();
    // do other resource destroy.
    this.$element.off('clcik');
  },

  bindEvents: function () {
    var self = this;
    this.$element.on('click', '.menu a', function (e) {
      e.preventDefault();
      $(this).parent('li').addClass('menu-item-selected').siblings('li').removeClass('menu-item-selected');
      self.routeChange.call(self, $(this));
    });
    $(window).on('resize', this.bind(this.resetLeftDockSize));
  },

  initMenuItemLocation: function (event) {
    var path = '/' + event.data;
    this.$element.find('.menu a').each(function() {
      var $this = $(this);
      if ($this.is('.nav-link') && $this.attr('href') === path) {
        $this.parent('li').addClass('menu-item-selected');
        return false;
      }
    });
    this.resetLeftDockSize();
  },

  resetLeftDockSize: function () {
    var wHeight = $(window).height()-50;
    var dHeight = $('.doc-content').height();
    var height = wHeight > dHeight ? wHeight : dHeight;
    $("#left-dock").css('height', (height)+'px');
  },

  routeChange: function ($link) {
    var href = $link.attr("href");
    locationBar.update(href, {trigger: true});
  },

  render: function () {
    $('#left-dock').html(leftDock);

    this.broadcast({
      type: 'rendered',
      data: 'layout rendered....'
    });

    // start location bar.
    locationBar.start({
      pushState: true,
      root: "/docs/"
    });

    this.bindEvents();
    this.resetLeftDockSize();
  }
});

createWidget(componentName, Layout);

Layout.render = function () {
  var $wrapper = $('#wrapper');

  if (!$wrapper.size()) {
    $wrapper = $(tpl).appendTo($('#doc-view'));
  }

  new Layout($wrapper).render();
};

module.exports = Layout;
