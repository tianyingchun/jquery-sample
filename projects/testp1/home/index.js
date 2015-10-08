require('../stylesheets/testp1.less');
var slide = require('./slide');
var draggable = require('../../../shared/jquery/components/draggable');

 $(function () {
    // binding plugin a, b , c, d
    alert('initialize....'+slide.getString());
    $('<div>dragging testing...</div>').draggable({
    }).appendTo(document.body);
 })
