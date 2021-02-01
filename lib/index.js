import fs from 'fs';
import _ from 'lodash';

const getDiff = (path1, path2) => {
  const fileBefore = fs.readFileSync(path1);
  const fileAfter = fs.readFileSync(path2);
  const objBefore = JSON.parse(fileBefore);
  const objAfter = JSON.parse(fileAfter);
  const sharedKeys = [...Object.keys(objBefore), ...Object.keys(objAfter)];
  const propertyAddSign = '+';
  const propertyRemoveSign = '-';

  return sharedKeys.reduce((acc, key) => {
    const key1 = _.has(objBefore, key);
    const key2 = _.has(objAfter, key);
    const value1 = _.get(objBefore, key);
    const value2 = _.get(objAfter, key);

    if (key1 && !key2) {
      acc[`${propertyRemoveSign} ${key}`] = value1;
    }
    if (key2 && value1 === value2) {
      acc[`${''.padStart(1)} ${key}`] = value1;
    }
    if ((key1 && key2) && value1 !== value2) {
      acc[`${propertyRemoveSign} ${key}`] = value1;
      acc[`${propertyAddSign} ${key}`] = value2;
    }
    if (key2 && !key1) {
      acc[`${propertyAddSign} ${key}`] = value2;
    }
    return acc;
  }, {});
};

export default getDiff;
