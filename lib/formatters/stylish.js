import _ from 'lodash';

const getIndent = (depth) => '    '.repeat(depth);

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

// const stylish = (currentValue, depth = 0) => {
//   const propAddSign = '+';
//   const propDeleteSign = '-';
//   const lines = currentValue.map((obj) => {
//     if (obj.nodeType === 'added') {
//       return `${getIndent(depth)}  ${propAddSign} ${obj.key}: ${stringify(
//         obj.valueAfter,
//         depth + 1
//       )}`;
//     }
//     if (obj.nodeType === 'removed') {
//       return `${getIndent(depth)}  ${propDeleteSign} ${obj.key}: ${stringify(
//         obj.valueBefore,
//         depth + 1
//       )}`;
//     }
//     if (obj.nodeType === 'obj') {
//       return `${getIndent(depth)}    ${obj.key}: ${stylish(
//         obj.children,
//         depth + 1
//       )}`;
//     }
//     if (obj.nodeType === 'unchanged') {
//       return `${getIndent(depth)}    ${obj.key}: ${stringify(
//         obj.valueBefore,
//         depth + 1
//       )}`;
//     }
//     if (obj.nodeType === 'changed') {
//       return `${getIndent(depth)}  ${propDeleteSign} ${obj.key}: ${stringify(
//         obj.valueAfter,
//         depth + 1
//       )}\n${getIndent(depth)}  ${propAddSign} ${obj.key}: ${stringify(
//         obj.valueBefore,
//         depth + 1
//       )}`;
//     }
//   });

//   return ['{', ...lines, `${getIndent(depth)}}`].join('\n');
// };
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
    if (status === 'removed') {
      return `${getIndent(depth)}  ${propDeleteSign} ${key}: ${stringify(
        oldValue,
        depth + 1,
      )}`;
    }
    if (status === 'added') {
      return `${getIndent(depth)}  ${propAddSign} ${key}: ${stringify(
        newValue,
        depth + 1,
      )}`;
    }
    if (status === 'changed') {
      return `${getIndent(depth)}  ${propDeleteSign} ${key}: ${stringify(
        oldValue,
        depth + 1,
      )}\n${getIndent(depth)}  ${propAddSign} ${key}: ${stringify(
        newValue,
        depth + 1,
      )}`;
    }
    if (status === 'unchanged') {
      return `${getIndent(depth)}    ${key}: ${stringify(
        oldValue,
        depth + 1,
      )}`;
    }
    return `${getIndent(depth)}    ${key}: ${stylish(children, depth + 1)}`;
  });

  return ['{', ...lines, `${getIndent(depth)}}`].join('\n');
};
export default stylish;
