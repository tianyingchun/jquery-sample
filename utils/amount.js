module.exports = {
  numAdd: function (num1, num2) { //为防止精度问题，以下四个函数是js计算加减乘除
    var baseNum, baseNum1, baseNum2;
    try {
      baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
      baseNum1 = 0;
    }
    try {
      baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
      baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
  },
  numSub: function (num1, num2) { //减法
    var baseNum, baseNum1, baseNum2;
    var precision;
    try {
      baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
      baseNum1 = 0;
    }
    try {
      baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
      baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
  },
  numMulti: function (num1, num2) { //乘法
    var baseNum = 0;
    try {
      baseNum += num1.toString().split(".")[1].length;
    } catch (e) {}
    try {
      baseNum += num2.toString().split(".")[1].length;
    } catch (e) {}
    return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
  },
  numDiv: function (num1, num2) { //除法
    var baseNum1 = 0,
      baseNum2 = 0;
    var baseNum3, baseNum4;
    try {
      baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
      baseNum1 = 0;
    }
    try {
      baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
      baseNum2 = 0;
    }
    baseNum3 = Number(num1.toString().replace(".", ""));
    baseNum4 = Number(num2.toString().replace(".", ""));

    return this.numMulti((baseNum3 / baseNum4), Math.pow(10, baseNum2 - baseNum1));
  },
  amtToArr: function (number, formatBit) {
    var amtArr = new Array();
    if (number && !isNaN(number)) {
      amtArr = number.toFixed(formatBit).split('.');
      amtArr[0] = amtArr[0] + ".";
    } else {
      amtArr[0] = "0.";
      amtArr[1] = "00";
    }
    return amtArr;
  },
  formatAmount: function (number) {
    var amtArr = new Array();
    if (isNaN(number)) {
      amtArr[0] = "0.";
      amtArr[1] = "00";
      return amtArr;
    }
    number = parseFloat((number + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
    var l = number.split(".")[0].split("").reverse(),
      r = number.split(".")[1],
      i, t = "";
    for (i = 0; i < l.length; i++) {
      t += l[i] + (((i + 1) % 3 == 0 && (i + 1) != l.length) ? "," : "");
    }
    amtArr = (t.split("").reverse().join("") + "." + r).split(".");
    if (amtArr.length > 0) {
      amtArr[0] = amtArr[0] + ".";
    }
    return amtArr;
  }
};
