import _ from 'lodash';

const generateDiff = (data1, data2) => {
  const unionKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  const diff = unionKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, status: 'added', value: value1 };
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { key, status: 'removed', value: value2 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, status: 'isObj', children: generateDiff(value1, value2) };
    }

    if (value1 !== value2) {
      return {
        key,
        status: 'changed',
        removedValue: value2,
        addedValue: value1,
      };
    }
    return { key, status: 'unchanged', value: value1 };
  });
  return diff;
};

export default generateDiff;
