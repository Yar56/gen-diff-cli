import path from 'path';
import fs from 'fs';
import getExtension from './getExtension.js';

const readFileAndExtension = (filePath) => {
  const absoluteFilePath = path.resolve(process.cwd(), filePath);
  const dataFile = fs.readFileSync(absoluteFilePath, 'utf-8');
  return [dataFile, getExtension(absoluteFilePath)];
};

export default readFileAndExtension;
