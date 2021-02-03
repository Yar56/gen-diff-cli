import _ from 'lodash';
import parser from './parser.js';

export default (path1, path2) => {
  const dataBefore = parser(path1);
  const dataAfter = parser(path2);
  const sharedKeys = [...new Set([...Object.keys(dataBefore), ...Object.keys(dataAfter)])].sort();
  const propertyAddSign = '+';
  const propertyRemoveSign = '-';

  const string = sharedKeys.reduce((acc, key) => {
    const key1 = _.has(dataBefore, key);
    const key2 = _.has(dataAfter, key);
    const value1 = _.get(dataBefore, key);
    const value2 = _.get(dataAfter, key);
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
  const result = `{\n${string}\n}`;
  return result;
};
