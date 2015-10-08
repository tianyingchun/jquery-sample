module.exports = {
  /**
   * [getMaskedString description]
   * @param  {string} str 需转换字符串
   * @param  {number} startLen 开头保留字符串长度
   * @param  {number} tailLen 末尾保留字符串长度
   * @param  {string} maskSign 替换符号
   * @return {strign}
   */
  getMaskedString: function (str, startLen, tailLen, maskSign) {
    var argsLen = arguments.length;
    switch (argsLen) {
      case 0:
        str = "";
        startLen = 0;
        tailLen = 0;
        break;
      case 1:
        startLen = 0;
        tailLen = 0;
        break;
      case 2:
        tailLen = 0;
        break;
    }
    if (!str) {
      return "";
    } else {
      str = str.toString();
    }
    var len = str.length;
    var sum = startLen + tailLen;
    if (sum >= len) {
      return str;
    }
    return str.substr(0, startLen) + (str.substr(startLen, len - sum)).replace(/./gi, maskSign || '*') + str.substr(len - tailLen);
  },
  /**
   * Clear white Space, for idcard, bankcard,phone number directive
   */
  cleanWhitespace: function (str) {
    return str && str.replace(/\s*/g, "") || "";
  }
};
