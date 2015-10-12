require('../stylesheets/testp1.less');

var core = require('../../../shared/jquery/components/core');
var Dropdown = require('../../../shared/jquery/components/dropdown');
var Popup = require('../../../shared/jquery/components/dialog');

$(function () {
  // run module2.
  var $dropdown = $(
    '<div class="dropdown" data-dropdown=\'{"menuAlwaysOpen": true,"my_position":"left+10 top+10"}\'>' +
    '  <div class="launcher-container">' +
    '    <button class="btn btn-primary dropdown-toggle">Select another</button>' +
    '  </div>' +
    '  <ul class="dropdown-content" class="list-unstyled">' +
    '    <li data-value="opt_2.1"><a href="javascript:void(0);">Option-2.1</a></li>' +
    '    <li data-value="opt_2.2"><a href="javascript:void(0);">Option-2.2</a></li>' +
    '    <li class="divider"></li>' +
    '    <li data-value="opt_2.3"><a href="javascript:void(0);">Option-2.3</a></li>' +
    '  </ul>' +
    '</div>' +
    '<hr />' +
    '<div class="dropdown" data-dropdown=\'{"menuAlwaysOpen": true, "launchOnMouseEnter": true,"my_position":"left+10 top+10"}\'>' +
    '  <div class="launcher-container">' +
    '    <button class="btn btn-primary dropdown-toggle">Select another</button>' +
    '  </div>' +
    '  <ul class="dropdown-content" class="list-unstyled">' +
    '    <li data-value="opt_2.1"><a href="javascript:void(0);">Option-2.1</a></li>' +
    '    <li data-value="opt_2.2"><a href="javascript:void(0);">Option-2.2</a></li>' +
    '    <li class="divider"></li>' +
    '    <li data-value="opt_2.3"><a href="javascript:void(0);">Option-2.3</a></li>' +
    '  </ul>' +
    '</div>'
  ).appendTo(document.body);
  $(
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>'+
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>'+
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>'+
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>'+
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>'+
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>'+
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>'+
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>'+
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>'+
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>'
    ).appendTo(document.body);

  var $popup2 = $('<div id="popup2" class="popup">'+
    '   <div class="popup-dialog">'+
    '       <div class="popup-hd">'+
    '           <span class="close"><i>X</i></span>'+
    '       </div>'+
    '       <div class="popup-bd">'+
    '           <div class="content">2222</div>'+
    '       </div>'+
    '   </div>'+
    '</div>'
  ).appendTo(document.body);

 var $popup1 = $('<div id="popup1" data-popup=\'{"modalClose": true, "domReadyShow": false}\' class="popup">'+
    '   <div class="popup-dialog">'+
    '       <div class="popup-hd">'+
    '           <span class="close"><i>X</i></span>'+
    '       </div>'+
    '       <div class="popup-bd">'+
    '           <div class="content">111</div>'+
    '       </div>'+
    '   </div>'+
    '</div>'
  ).appendTo(document.body);

  $.ui.run(['ui.dropdown', 'ui.popup']);

});
