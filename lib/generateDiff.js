import _ from 'lodash';

// const generateDiff = (data1, data2) => {
//   const sharedKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
//   // console.log(keys);

//   const diff = sharedKeys.map((key) => {
//     const valueBefore = data1[key];
//     const valueAfter = data2[key];
//     const propertyBefore = _.has(data1, key);
//     const propertyAfter = _.has(data2, key);

//     if (!propertyBefore) {
//       return { key, valueAfter, nodeType: 'added' };
//     }
//     if (!propertyAfter) {
//       return { key, valueBefore, nodeType: 'removed' };
//     }
//     if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
//       const children = generateDiff(valueBefore, valueAfter);
//       return { key, children, nodeType: 'obj' };
//     }
//     if (valueBefore !== valueAfter) {
//       return {
//         key,
//         status: 'changed',
//         valueBefore,
//         valueAfter
//       };
//     }
//     if (valueBefore === valueAfter) {
//       return { key, status: 'unchanged', valueBefore };
//     }
//     throw new Error('Error');
//   });
//   return diff;
// };
const generateDiff = (data1, data2) => {
  const sharedKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  const diff = sharedKeys.map((key) => {
    const oldValue = data1[key];
    const newValue = data2[key];
    if (!_.has(data1, key)) {
      return { key, status: 'added', newValue };
    }
    if (!_.has(data2, key)) {
      return { key, status: 'removed', oldValue };
    }
    if (_.isObject(oldValue) && _.isObject(newValue)) {
      const children = generateDiff(oldValue, newValue);
      return { key, status: 'obj', children };
    }
    if (oldValue !== newValue) {
      return {
        key,
        status: 'changed',
        newValue,
        oldValue,
      };
    }
    return { key, status: 'unchanged', oldValue };
  });
  return diff;
};
export default generateDiff;
