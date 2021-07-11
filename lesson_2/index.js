// 1
const isEqual = (firstObj, secondObj) => {
  const firstObjKeys = Object.keys(firstObj);
  const secondObjKeys = Object.keys(secondObj);

  if (firstObjKeys.length !== secondObjKeys.length) {
    return false;
  }

  return firstObjKeys.every((key) => (firstObj[key] === secondObj[key]));
};

//2
const isEmpty = (obj) => {
  const objValues = Object.values(obj);

  if (
      objValues.length === 0 ||
      objValues.every((objValue) => (!objValue && objValue !== 0 && objValue !== false))
    ) {
    return true;
  }

  return false;
};

// 3
const makePairs = (obj) => Object.keys(obj).map((ObjKey) => [ObjKey, obj[ObjKey]]);
