function createNestedObjectFromString(str) {
  return str.split('.').reduceRight((obj, next) => ({[next]: obj}), null);
}

function createDebounceFunction(callbackFunc, delay) {
  let timerId;

  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => callbackFunc.apply(this, args), delay);
  };
}

Function.prototype.myBind = function (thisArg, ...args) {
  const targetFunc = this;

  return function (...boundFuncArgs) {
    targetFunc.apply(thisArg, [...args, ...boundFuncArgs]);
  };
};

