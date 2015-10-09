require('../stylesheets/testp1.less');
var slide = require('./slide');
var draggable = require('../../../shared/jquery/components/draggable');
var dropdown =  require('../../../shared/jquery/components/dropdown');
$(function () {
  // binding plugin a, b , c, d
  alert('initialize....'+slide.getString());

  // run api.
  var $test = $('<div>dragging testing...</div>').appendTo(document.body);
  draggable.run($test, {});

  // run module2.
  var $dropdown = $(
    '<div id="demo_drop2">'+
    '  <div id="launcher2_container">'+
    '    <button id="launcher2">Select another</button>'+
    '  </div>'+
    '  <p>other data.</p>'+
    '  <p>other data.</p>'+
    '  <ul id="menu2" class="list-unstyled">'+
    '    <li data-value="opt_2.1"><a href="javascript:void(0);">Option-2.1</a></li>'+
    '    <li data-value="opt_2.2"><a href="javascript:void(0);">Option-2.2</a></li>'+
    '    <hr>'+
    '    <li data-value="opt_2.3"><a href="javascript:void(0);">Option-2.3</a></li>'+
    '  </ul>'+
    '</div>'+
    '<p>other data.</p>'+
    '<p>other data.</p>'
  ).appendTo(document.body);

  dropdown.run({
      launcherSelector: '#launcher2',
      launcherContainerSelector: '#launcher2_container',
      containerClass: 'container2',
      menuSelector: '#menu2',
      menuAlwaysOpen: true,
      // my_position: 'left+10 top+10',
      // at_position: 'left+20 bottom',

      // launchOnMouseEnter:true,
      onSelect: function(event, data) {
          console.log('index: ' + data.index + ' (value: ' + data.value + ')');
      }
  }, $dropdown);

});
