import _ from 'lodash';

const setIndent = (depth) => '    '.repeat(depth);

const stringify = (value, depth = 0) => {
  if (!_.isObject(value)) {
    return value;
  }

  const isObj = (checkValue) => (_.isObject(checkValue)
    ? stringify(checkValue, depth + 1)
    : checkValue);

  const lines = Object.keys(value).map(
    (key) => `${setIndent(depth)}    ${key}: ${isObj(value[key])}`,
  );

  return ['{', ...lines, `${setIndent(depth)}}`].join('\n');
};

const stylish = (currentValue, depth = 0) => {
  const propAddSign = '+';
  const propDeleteSign = '-';
  const lines = currentValue.map((obj) => {
    if (obj.status === 'removed') {
      return `${setIndent(depth)}  ${propDeleteSign} ${obj.key}: ${stringify(
        obj.newValue,
        depth + 1,
      )}`;
    }
    if (obj.status === 'added') {
      return `${setIndent(depth)}  ${propAddSign} ${obj.key}: ${stringify(
        obj.oldValue,
        depth + 1,
      )}`;
    }
    if (obj.status === 'obj') {
      return `${setIndent(depth)}    ${obj.key}: ${stylish(
        obj.children,
        depth + 1,
      )}`;
    }
    if (obj.status === 'changed') {
      return `${setIndent(depth)}  ${propDeleteSign} ${obj.key}: ${stringify(
        obj.newValue,
        depth + 1,
      )}\n${setIndent(depth)}  ${propAddSign} ${obj.key}: ${stringify(
        obj.oldValue,
        depth + 1,
      )}`;
    }
    if (obj.status === 'unchanged') {
      return `${setIndent(depth)}    ${obj.key}: ${stringify(
        obj.oldValue,
        depth + 1,
      )}`;
    }
    return new Error('Error');
  });

  return ['{', ...lines, `${setIndent(depth)}}`].join('\n');
};
export default stylish;
