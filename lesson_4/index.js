function createNestedObjectFromString(str) {
  return str.split('.').reduceRight((obj, next) => ({[next]: obj}), null);
}

function createDebounceFunction(callbackFunc, delay) {
  let timerId;

  return function() {
    clearTimeout(timerId);
    timerId = setTimeout(callbackFunc, delay);
  };
}

Function.prototype.myBind = function (thisArg, ...args) {
  let targetFunc = this;

  return function (...boundFuncArgs) {
    targetFunc.apply(thisArg, [...args, ...boundFuncArgs]);
  };
};
