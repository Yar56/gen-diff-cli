import _ from 'lodash';

const generateDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  // console.log(keys);
  const iter = (key, value1, value2) => {
    const keyValue1 = _.get(value1, key);
    const keyValue2 = _.get(value2, key);
    const property1 = _.has(value1, key);
    const property2 = _.has(value2, key);

    if (property1 && property2) {
      if (!_.isObject(keyValue1) && !_.isObject(keyValue2)) {
        const nodeType = keyValue1 !== keyValue2 ? 'changed' : 'unchanged';
        const value =
          nodeType === 'unchanged' ? keyValue1 : [keyValue2, keyValue1];
        return { key, value, nodeType };
      }
      if (_.isObject(keyValue1) && !_.isObject(keyValue2)) {
        const value = _.pick(keyValue1, _.keys(keyValue1));
        return { key, values: [value, keyValue2], nodeType: 'changed' };
      }
      if (!_.isObject(keyValue1) && _.isObject(keyValue2)) {
        const value = _.pick(keyValue2, _.keys(keyValue2));
        return { key, values: [value, keyValue1], nodeType: 'changed' };
      }
      const children = generateDiff(keyValue1, keyValue2);
      const value =
        _.isObject(keyValue1) && _.isObject(keyValue2) ? null : keyValue1;
      return { key, children, value, nodeType: 'unchanged' };
    }
    if (!property1 && property2) {
      if (!_.isObject(keyValue1) && !_.isObject(keyValue2)) {
        return { key, value: keyValue2, nodeType: 'removed' };
      }

      const value = _.pick(keyValue2, _.keys(keyValue2));
      // const value = generateDiff(keyValue1, keyValue2)
      return { key, value, nodeType: 'removed' };
    }
    if (property1 && !property2) {
      if (!_.isObject(keyValue1) && !_.isObject(keyValue2)) {
        return { key, value: keyValue1, nodeType: 'added' };
      }
      const value = _.pick(keyValue1, _.keys(keyValue1));
      return { key, value, nodeType: 'added' };
    }
  };
  const res = keys.map((key) => iter(key, data1, data2));
  // console.log(res);
  return res;
};

export default generateDiff;
