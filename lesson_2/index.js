const isEqual = (firstObj, secondObj) => {
  const firstObjKeys = Object.keys(firstObj);
  const secondObjKeys = Object.keys(secondObj);

  if (firstObjKeys.length !== secondObjKeys.length) {
    return false;
  }
  
  for (let key of firstObjKeys) {
    if (firstObj[key] !== secondObj[key]) {
      return false;
    }
  }

  return true;
};

// 2
const isEmpty = (obj) => {
  const objValues = Object.values(obj);

  if (
      objValues.length === 0 ||
      objValues.every((i) => (!i && i !== 0 && i !== false))
    ) {
    return true;
  }

  return false;
};

// 3
const makePairs = (obj) => {
  return Object.entries(obj);
};
