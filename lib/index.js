import generateDiff from './generateDiff.js';
import parse from './utils/parser.js';
import formatChoice from './formatters/index.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const dataBefore = parse(path1);
  const dataAfter = parse(path2);
  const diff = generateDiff(dataBefore, dataAfter);
  return formatChoice(diff, formatName);
};

export default genDiff;
