var Mock = require('mockjs');
var debug = require('debug')('app:OtpCtrl');
var OtpCtrl = {
  index: function (req, res, next) {
    setTimeout(function () {
      res.send({
        success: 'welcome to node mock !'
      });
    }, 2000);
  },
  list: function (req, res, next) {
    var data = Mock.mock({
      'list|1-10': [{
        'id|+1': 1
      }]
    });
    res.send(data);
  },
  sendOtp: function (req, res, next) {
    res.send({
      code: '000000'
    });
  }
};

module.exports = OtpCtrl;
