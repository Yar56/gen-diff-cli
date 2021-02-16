import generateDiff from './generateDiff.js';
import parse from './utils/parser.js';
import stylish from './formatters/stylish.js';

const genDiff = (path1, path2) => {
  const data1 = parse(path1);
  const data2 = parse(path2);
  const diff = generateDiff(data1, data2);
  return stylish(diff);
};

export default genDiff;
