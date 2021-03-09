import path from 'path';

export default (absoluteFilePath) => path.extname(absoluteFilePath).slice(1);
