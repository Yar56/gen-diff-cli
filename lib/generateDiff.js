import _ from 'lodash';

const generateDiff = (data1, data2) => {
  const sharedKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  // console.log(keys);

  const diff = sharedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, status: 'added', propValue: value1 };
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { key, status: 'removed', propValue: value2 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      const children = generateDiff(value1, value2);
      return { key, status: 'obj', children };
    }
    if (value1 !== value2) {
      return { key, status: 'changed', propValue: {value2, value1} };
    }
    return { key, status: 'unchanged', propValue: value1 };
  });
  return diff;
};

export default generateDiff;