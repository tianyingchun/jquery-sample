var extend = require('../jquery/utils/extend');

/**
 * Design jquery wiget component system.
 * @author tianyingchun
 * @date {{date }}
 * @this {Widget}
 * @param {DOMNode|String} element the dom selector or dom object or jquery object
 * @param {Object} options the plugin configuration.
 */
function Widget(element, options) {
  this.$element = $(element).addClass(this.widgetName);
  this.options = $.extend({}, this.constructor.DEFAULTS, options);
  this._initialize.call(this, this.$element, this.options);
}

Widget.prototype = {
  constructor: Widget,

  //@private
  _initialize: function ($element, options) {
    if (!this.widgetName) {
      throw Error('you must provider `widgetName` property for your Widget!');
    }
    var _widgetDataName = this.getWidgetInstanceName();

    if (!$element.data(_widgetDataName)) {
      $element.data(_widgetDataName, this);
      console.log('component `' + this.widgetName + '`initialize()....', $element, options);
      // invoke child component initialize methods.
      this.initialize($element, options);
    }
  },
  // @public
  setOptions: function (options) {
    this.options = $.extend(this.options, options);
  },
  // @public
  // bind callback to specificed context.
  bind: function (fn, context /*, additionalArguments */ ) {
    var args = [fn, context || this].concat(Array.prototype.slice.call(arguments, 2));
    return $.proxy.apply($.proxy, args);
  },
  //@override.
  initialize: function ($element, options) {
    throw new Error('the initialize() should be implemented!');
  },
  _destroy: function () {
    this.$element.data(this.getWidgetInstanceName(), null);
    this.$element.data(this.widgetName, null);
  },
  //@override.
  destroy: function () {
    this._destroy();
    throw new Error('the destroy() should be implemented!');
  },
  //@public
  // get plugin data name that used to stored plugin component instance.
  getWidgetInstanceName: function () {
    return 'ui.widget.' + this.widgetName;
  }
};

Widget.extend = extend;

module.exports = Widget;
