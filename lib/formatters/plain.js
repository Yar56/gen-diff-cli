import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

export default (diff) => {
  const iter = (currentValue, path) => {
    const lines = currentValue.map((obj) => {
      const newPath = path ? `${path}.${obj.key}` : obj.key;
      if (obj.status === 'added') {
        return `Property '${newPath}' was added with value: ${stringify(
          obj.oldValue,
        )}`;
      }
      if (obj.status === 'removed') {
        return `Property '${newPath}' was removed`;
      }
      if (obj.status === 'changed') {
        return `Property '${newPath}' was updated. From ${stringify(
          obj.newValue,
        )} to ${stringify(obj.oldValue)}`;
      }
      if (obj.status === 'unchanged') {
        return [];
      }
      return iter(obj.children, newPath);
    });
    return lines.flat().join('\n');
  };
  return iter(diff, '');
};
