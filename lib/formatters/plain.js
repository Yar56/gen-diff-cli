import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

export default (diff) => {
  const iter = (currentValue, path) => {
    const lines = currentValue.map(({
      key,
      status,
      children = [],
      oldValue,
      newValue,
    }) => {
      const newPath = path ? `${path}.${key}` : key;
      if (status === 'added') {
        return `Property '${newPath}' was added with value: ${stringify(
          oldValue,
        )}`;
      }
      if (status === 'removed') {
        return `Property '${newPath}' was removed`;
      }
      if (status === 'changed') {
        return `Property '${newPath}' was updated. From ${stringify(
          newValue,
        )} to ${stringify(oldValue)}`;
      }
      if (status === 'unchanged') {
        return [];
      }
      return iter(children, newPath);
    });
    return lines.flat().join('\n');
  };
  return iter(diff, '');
};
