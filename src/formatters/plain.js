import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
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
      switch (status) {
        case 'added':
          return `Property '${newPath}' was added with value: ${stringify(newValue)}`;
        case 'removed':
          return `Property '${newPath}' was removed`;
        case 'changed':
          return `Property '${newPath}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
        case 'unchanged':
          return [];
        default:
          return iter(children, newPath);
      }
      // if (status === 'added') {
      //   return `Property '${newPath}' was added with value: ${stringify(
      //     newValue,
      //   )}`;
      // }
      // if (status === 'removed') {
      //   return `Property '${newPath}' was removed`;
      // }
      // if (status === 'changed') {
      //   return `Property '${newPath}' was updated. From ${stringify(
      //     oldValue,
      //   )} to ${stringify(newValue)}`;
      // }
      // if (status === 'unchanged') {
      //   return [];
      // }
      // return iter(children, newPath);
    });
    return lines.flat().join('\n');
  };
  return iter(diff, '');
};
