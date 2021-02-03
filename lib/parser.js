// здесь сделать фабрику по выбору метода парсинга
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export default (pathFile) => {
  const data = fs.readFileSync(pathFile);
  const extension = path.extname(pathFile);

  if (extension === '.json') {
    return JSON.parse(data);
  }
  if (extension === '.yml') {
    return yaml.load(data);
  }
  return null;
};
