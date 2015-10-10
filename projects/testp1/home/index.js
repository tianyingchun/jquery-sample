require('../stylesheets/testp1.less');

var core = require('../../../shared/jquery/components/core');
var Dropdown = require('../../../shared/jquery/components/dropdown');
// var dialog = require('../../../shared/jquery/components/dialog');

$(function () {
  // run module2.
  var $dropdown = $(
    '<div class="dropdown" data-dropdown=\'{"menuAlwaysOpen": true,"my_position":"left+10 top+10"}\'>' +
    '  <div class="launcher-container">' +
    '    <button class="dropdown-toggle">Select another</button>' +
    '  </div>' +
    '  <ul class="dropdown-content" class="list-unstyled">' +
    '    <li data-value="opt_2.1"><a href="javascript:void(0);">Option-2.1</a></li>' +
    '    <li data-value="opt_2.2"><a href="javascript:void(0);">Option-2.2</a></li>' +
    '    <li class="divider"></li>' +
    '    <li data-value="opt_2.3"><a href="javascript:void(0);">Option-2.3</a></li>' +
    '  </ul>' +
    '</div>' +
    '<hr />' +
    '<div class="dropdown" data-dropdown=\'{"launchOnMouseEnter": true,"my_position":"left+10 top+10"}\'>' +
    '  <div class="launcher-container">' +
    '    <button class="dropdown-toggle">Select another</button>' +
    '  </div>' +
    '  <ul class="dropdown-content" class="list-unstyled">' +
    '    <li data-value="opt_2.1"><a href="javascript:void(0);">Option-2.1</a></li>' +
    '    <li data-value="opt_2.2"><a href="javascript:void(0);">Option-2.2</a></li>' +
    '    <li class="divider"></li>' +
    '    <li data-value="opt_2.3"><a href="javascript:void(0);">Option-2.3</a></li>' +
    '  </ul>' +
    '</div>'
  ).appendTo(document.body);

  $.ui.run('ui.dropdown');


  var dropdown = $($dropdown.filter('.dropdown')[0]).data('ui.dropdown');
  dropdown.setOptions({
    onSelect: function (evt, data) {
      console.log(data);
    }
  });

  console.log(window.dropdown = $(dropdown).data('ui.dropdown'));
});
