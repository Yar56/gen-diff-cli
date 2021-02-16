import _ from 'lodash';

const stylish = (diff) => {
  const stringify = (value, replacer = ' ', spacesCount = 1) => {
    const iter = (currentValue, depth) => {
      if (!_.isObject(currentValue)) {
        return currentValue.toString();
      }
      const addProp = '+';
      const removeProp = '-';

      const indentSize = depth * spacesCount;
      const currentIndent = replacer.repeat(indentSize);
      const bracketIndent = replacer.repeat(indentSize - spacesCount);
      const lines = currentValue.map(
        ({ key, children = [], value, nodeType }) => {
          if (children.length === 0) {
            if (nodeType === 'unchanged') {
              return `${currentIndent}  ${key}: ${iter(value, depth + 1)}`;
            }
            if (nodeType === 'added') {
              return `${currentIndent}${addProp} ${key}: ${value}`;
            }
            if (nodeType === 'removed') {
              return `${currentIndent}${removeProp} ${key}: ${value}`;
            }
            if (nodeType === 'changed') {
              return `${currentIndent}${removeProp} ${key}: ${value}\n${currentIndent}${addProp} ${key}: ${value}`;
            }
            // return `${currentIndent}${key}: ${iter(value, depth + 1)}`;
          }
          if (nodeType === 'changed') {
            const value1 = _.isObject(value) ? value : iter(value, depth + 1);
            return `${currentIndent}${removeProp} ${key}: ${value1}\n${currentIndent}${addProp} ${key}: ${value1}`;
          }
          if (nodeType === 'unchanged') {
            return `${currentIndent}${key}: ${iter(children, depth + 1)}`;
          }
          if (nodeType === 'added') {
            return `${currentIndent}${addProp} ${key}: ${iter(key, depth + 1)}`;
          }
          if (nodeType === 'removed') {
            return `${currentIndent}${removeProp} ${key}: ${iter(
              children,
              depth + 1
            )}`;
          }
        }
      );

      return ['{', ...lines, `${bracketIndent}}`].join('\n');
    };
    return iter(value, 1);
  };
  return stringify(diff);
};
export default stylish;
