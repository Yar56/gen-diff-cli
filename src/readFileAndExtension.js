import path from 'path';
import fs from 'fs';

const readFileAndExtension = (filePath) => {
  const absoluteFilePath = path.resolve(process.cwd(), filePath);
  const dataFile = fs.readFileSync(absoluteFilePath, 'utf-8');
  const extension = path.extname(absoluteFilePath).slice(1);
  return [dataFile, extension];
};

export default readFileAndExtension;
