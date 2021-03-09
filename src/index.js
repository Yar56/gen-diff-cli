import generateDiff from './generateDiff.js';
import formatChoice from './formatters/index.js';
import readFileAndExtension from './readFile.js';
import parse from './parse.js';

const genDiff = (path1, path2, formatName = 'stylish') => {
  const [fileData1, ext1] = readFileAndExtension(path1);
  const [fileData2, ext2] = readFileAndExtension(path2);
  const dataBefore = parse(fileData1, ext1);
  const dataAfter = parse(fileData2, ext2);
  const diff = generateDiff(dataBefore, dataAfter);
  return formatChoice(diff, formatName);
};

export default genDiff;
