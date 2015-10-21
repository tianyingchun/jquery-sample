var $ = require('jquery');
var { lang, path, extend } = require('../shared/jquery/utils');

function WebAPI () {
  // maybe something here.
}

function dataParser (result) {
  console.debug('request success data parser: ', result);
  return result;
}
function parseError(err) {
  console.debug('request err data parser: ', err);
  return err;
}
$.extend(WebAPI.prototype, {

  /**
   * Encaosulate jquery ajax request provider, makesure all request return an promise().
   * @example(
   *   ....
   * )
   * @param  {String} url      the api request with http prefix
   * @param  {Object} settings the jquery ajax setting follow: http://api.jquery.com/jQuery.ajax/
   * @param  {Function} yourDto your bisuness customized dto
   * @return {Promise.then(cb).fail(cb)}
   */
  request: function (url, settings, yourDto) {
    if (!settings.dataType) settings.dataType = 'json';

    if ((settings.method || 'GET').toUpperCase() != 'GET') {
      settings.processData = false;
    }
    var deferred = $.Deferred();

    $.ajax(url, settings)
     .done(this.bind(function (result) {
       result = dataParser.call(this, result);
       result = $.isFunction(yourDto) ? yourDto.call(this, result) : result;
       deferred.resolve(result);
     }))
     .fail(this.bind(function (err) {
       deferred.reject(parseError(err));
     }))
     .always(function () {
       //nothing.
     });

    return deferred.promise();
  },
   // @public
  // bind callback to specificed context.
  bind: function (fn, context /*, additionalArguments */ ) {
    var args = [fn, context || this].concat(Array.prototype.slice.call(arguments, 2));
    return $.proxy.apply($.proxy, args);
  },

  getApiUrl: function (yourPath, query) {
    return path.getUrl(yourPath, query);
  },

  getProject2RootUrl: function (yourPath, query) {
    return this.getApiUrl(path.normalizePath('/workspace', yourPath), query);
  },

  getProject3RootUrl: function (yourPath, query) {
    return this.getApiUrl(path.normalizePath('/document', yourPath), query);
  }
});

// extend static method `extend`
$.extend(WebAPI, {
  extend: extend
});

module.exports = WebAPI;
