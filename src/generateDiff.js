import _ from 'lodash';

const generateDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sharedKeys = _.sortBy(_.union(keys1, keys2));
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
    if (!_.isEqual(oldValue, newValue)) {
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
