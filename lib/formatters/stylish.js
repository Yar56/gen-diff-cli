import _ from 'lodash';
import util from 'util';

const strin = (obj, depth = 1) => {
  if (!_.isObject(obj)) {
    return _.isBoolean(obj) ? _.toString(obj) : `${obj}`;
  }

  const replacer = ' ';
  const spacesCount = 2;
  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  const lines = Object
    .entries(obj)
    .map(([key, val]) => `${currentIndent}${key}: ${strin(val, depth + 2)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (diff) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return _.isBoolean(currentValue) ? _.toString(currentValue) : `${currentValue}`;
    }
    const propAddSign = '+';
    const propDeleteSign = '-';
    const spacesCount = 2;
    const indentSize = depth * spacesCount;
    const currentIndent = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - spacesCount);
    const lines = currentValue.map(({key, status, children = [], propValue }) => {
      if (status === 'removed') {
        return `${currentIndent}${propDeleteSign} ${key}: ${_.isObject(propValue) ? strin(propValue, depth + 3) : propValue}`;
      }
      if (status === 'added') {
        return `${currentIndent}${propAddSign} ${key}: ${_.isObject(propValue) ? strin(propValue, depth + 3) : propValue}`;
      }
      if (status === 'obj') {
        return `${currentIndent}  ${key}: ${iter(children, depth + 2)}`;
      }
      if (status === 'changed') {
        const objToStr = (obj) => {
          if (_.isObject(obj)) {
            return strin(obj, depth + 2);
          }
          return obj;
        };
        return `${currentIndent}${propDeleteSign} ${key}: ${objToStr(propValue.value2)}\n${currentIndent}${propAddSign} ${key}: ${objToStr(propValue.value1)}`;
      }
      return `${currentIndent}  ${key}: ${propValue}`;
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(diff, 1);
// console.log(util.inspect(diff, {showHidden: false, colors: true, depth: null}))
};
export default stylish;
