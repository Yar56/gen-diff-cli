import fs from 'fs';
import _ from 'lodash';

export default (path1, path2) => {
  const fileBefore = fs.readFileSync(path1);
  const fileAfter = fs.readFileSync(path2);
  const objBefore = JSON.parse(fileBefore);
  const objAfter = JSON.parse(fileAfter);
  const sharedKeys = [...new Set([...Object.keys(objBefore), ...Object.keys(objAfter)])].sort();
  const propertyAddSign = '+';
  const propertyRemoveSign = '-';

  const string = sharedKeys.reduce((acc, key) => {
    const key1 = _.has(objBefore, key);
    const key2 = _.has(objAfter, key);
    const value1 = _.get(objBefore, key);
    const value2 = _.get(objAfter, key);
    let str = acc;
    if (key1 && !key2) {
      str += `  ${propertyRemoveSign} ${key}: ${value1}\n`;
    }
    if (key2 && value1 === value2) {
      str += `  ${' '} ${key}: ${value1}\n`;
    }
    if ((key1 && key2) && value1 !== value2) {
      str += `  ${propertyRemoveSign} ${key}: ${value1}\n`;
      str += `  ${propertyAddSign} ${key}: ${value2}\n`;
    }
    if (key2 && !key1) {
      str += `  ${propertyAddSign} ${key}: ${value2}`;
    }
    return str;
  }, '');
  const result = `{\n${string} \n}`;
  return result;
};
