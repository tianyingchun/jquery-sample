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
  '            <a href="/docs">The Component Sample</a>' +
  '            <span class="badge badge-warning"></span>' +
  '        </h1>' +
  '      </header>' +
  '    </div>' +
  '    <div class="page-body container">' +
  '     <div class="row">' +
  '       <div id="left-dock" class="nav-left-dock col-sm-2">' +
  '         dock menus' +
  '       </div>' +
  '       <div class="right-main col-sm-10">' +
  '       right main' +
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
  '        <span>布局相关</span>' +
  '        <span class="menu-title-en">Layout</span>' +
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
  '        <a class="nav-link" href="/popup">' +
  '          <span>' +
  '            <span>弹窗</span>' +
  '            <span class="menu-title-en">popup</span>' +
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
  },

  resetLeftDockSize: function () {
    var height = $(window).height();
    $("#left-dock").css('height', (height-50)+'px');
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
  console.log($wrapper);

  new Layout($wrapper).render();
};

module.exports = Layout;
