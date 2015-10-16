require('../stylesheets/testp1.less');

var {
  Dropdown, Popup
} = require('../../../shared/jquery/components');
var dialog = Popup.dialog;

var Header = require('../../../shared/widgets/header');
var {
  signals
} = require('../../../shared/jquery/utils');
var TestApi = require('../services/TestApi');

$(function () {

  var $popup2 = $('<div id="popup2" class="popup">' +
    '   <div class="popup-dialog">' +
    '       <div class="popup-hd">' +
    '           <span class="close"><i>X</i></span>' +
    '       </div>' +
    '       <div class="popup-bd">' +
    '           <div class="content">2222</div>' +
    '       </div>' +
    '   </div>' +
    '</div>'
  ).appendTo(document.body);

  var $popup1 = $('<div id="popup1" data-popup=\'{"modalClose": true, "domReadyShow": false}\' class="popup">' +
    '   <div class="popup-dialog">' +
    '       <div class="popup-hd">' +
    '           <span class="close"><i>X</i></span>' +
    '       </div>' +
    '       <div class="popup-bd">' +
    '           <div class="content">111</div>' +
    '       </div>' +
    '   </div>' +
    '</div>'
  ).appendTo(document.body);
  $(
    '<div class="testing">testing....</div><button data-button class="btn testingpopup"> Testing Popup </button>' +
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>' +
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>' +
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>' +
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>' +
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>' +
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>' +
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>' +
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>' +
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>' +
    '<p>sssss</p><p>sssss</p><p>sssss</p><p>sssss</p>'
  ).appendTo(document.body);
  $.ui.run(['ui.dropdown', 'ui.popup']);


  $('.testingpopup').on('click', function () {
    var $button = $(this);
    $button.button('loading');
    var instanceConfirm = dialog.confirm({
      onConfirm: function (data) {
        console.log('confirm', data);
        // this.close();
        $button.button('reset');
      },
      onCancel: function (data) {
        console.log('cancel', data);
        this.close();
        $button.button('reset');
      }
    });
  })

  var api = new TestApi();

  setTimeout(function () {
    api.fetchTestData().then(function (result) {
      console.log('fetchTestData', result);
    }).fail(function (err) {
      console.log('fetchTestData err', err);

    })

  }, 2000)
  signals.get('header').subscribe(function (message) {
    console.log('signals: message: ', message);
  })
});
