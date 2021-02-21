import path from 'path';
import yaml from 'js-yaml';
import readFile from './readFile.js';

export default (pathFile) => {
  const data = readFile(pathFile);
  const extension = path.extname(pathFile);

  if (extension === '.json') {
    return JSON.parse(data);
  }
  if (extension === '.yml') {
    return yaml.load(data);
  }
  return null;
};
