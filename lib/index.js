import fs from 'fs';

const getDiff = (path1, path2) => {
  // const res = path.resolve(process.cwd(), path1);
  // console.log(res);
  const file1 = fs.readFileSync(path1);
  const file2 = fs.readFileSync(path2);
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  console.log([keys1, keys2]);
  return [obj1, obj2];
};

export default getDiff;
