import _ from 'lodash';

const getIndent = (depth) => ' '.repeat(4).repeat(depth);

const stringify = (value, depth = 0) => {
  if (!_.isObject(value)) {
    return value;
  }

  const isObj = (key) => (_.isObject(key) ? stringify(key, depth + 1) : key);

  const lines = Object.keys(value).map(
    (key) => `${getIndent(depth)}    ${key}: ${isObj(value[key])}`,
  );

  return ['{', ...lines, `${getIndent(depth)}}`].join('\n');
};

const stylish = (currentValue, depth = 0) => {
  const propAddSign = '+';
  const propDeleteSign = '-';
  const lines = currentValue.map(({
    key,
    status,
    children = [],
    oldValue,
    newValue,
  }) => {
    const getString = (strKey, value, strDepth, sign = ' ') => `${getIndent(strDepth)}  ${sign} ${strKey}: ${stringify(value, strDepth + 1)}`;
    if (status === 'removed') {
      return getString(key, oldValue, depth, propDeleteSign);
    }
    if (status === 'added') {
      return getString(key, newValue, depth, propAddSign);
    }
    if (status === 'changed') {
      return `${getString(key, oldValue, depth, propDeleteSign)}\n${getString(key, newValue, depth, propAddSign)}`;
    }
    if (status === 'unchanged') {
      return getString(key, oldValue, depth);
    }
    return `${getIndent(depth)}    ${key}: ${stylish(children, depth + 1)}`;
  });

  return ['{', ...lines, `${getIndent(depth)}}`].join('\n');
};
export default stylish;
