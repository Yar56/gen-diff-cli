import path from 'path';
import yaml from 'js-yaml';
import readFile from './readFile.js';

export default (pathFile) => {
  const fileData = readFile(pathFile);
  const extension = path.extname(pathFile);

  switch (extension) {
    case '.json':
      return JSON.parse(fileData);
    case '.yml':
      return yaml.load(fileData);
    default:
      throw new Error(`Wrong file path: ${pathFile}`);
  }
};
