import path from 'path';
import fs from 'fs';

const readFile = (filePath) => {
  const absoluteFilePath = path.resolve(process.cwd(), filePath);
  const dataFile = fs.readFileSync(absoluteFilePath, 'utf-8');

  return dataFile;
};

export default readFile;
