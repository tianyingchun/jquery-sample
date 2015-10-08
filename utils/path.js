var jQuery = require('jquery');

var path = {
  /**
   * Normallize url path, note only can handler url path e.g. /workspace/list
   * Dont handle protocol port (http://)
   * @param  {...paths} paths provider path serialized paramter.
   * @return {String}
   */
  normalizePath: function () {
    var result = [];

    jQuery.each(arguments, function (index, path) {
      result.push(path ? path.replace(/^\/+|\/+$/ig, '') : '');
    })
    var path = '/' + result.join('/');

    return path.replace(/^\/+/ig, '/');
  }
}
