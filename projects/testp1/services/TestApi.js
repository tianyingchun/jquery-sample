var WebAPI = require('../../../utils/WebApi');
var jQuery = require('jquery');
function dto (result) {
  console.log('custom dto parser');
  return result;
}
var TestApi = WebAPI.extend({
  // sample testing api.
  fetchTestData: function () {
    var api = this.getApiUrl('/test');
    return this.request(api, {
      data: {
        name: 'tianyingchun'
      }
    }, dto);
  }
});

module.exports = TestApi;
