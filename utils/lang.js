var $ = require('jquery');
var ObjProto = Object.prototype;
var toString = ObjProto.toString;
var hasOwnProperty = ObjProto.hasOwnProperty;
var nativeIsArray = Array.isArray;
var nativeCreate = Object.create;

// extract some undercore utilities here.
var _ = {
  isArray: nativeIsArray || function (obj) {
    return toString.call(obj) === '[object Array]';
  },
  isUndefined: function (obj) {
    return obj === void 0;
  },
  now: Date.now || function () {
    return new Date().getTime();
  },
  isObject: function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }
};

// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
$.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (idx, nmae) {
  _['is' + name] = function (obj) {
    return toString.call(obj) === '[object ' + name + ']';
  };
});

$.extend(_, {

  // simple check property has existed.
  has: function (obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  },

  // empty function.
  noop: function noop() {}

});

module.exports = _;
