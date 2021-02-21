import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { beforeAll, test, expect } from '@jest/globals';
import genDiff from '../lib/index.js';

let jsonBefore;
let jsonAfter;
let ymlBefore;
let ymlAfter;
let correctResult;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

beforeAll(() => {
  jsonBefore = getFixturePath('before.json');
  jsonAfter = getFixturePath('after.json');
  ymlBefore = getFixturePath('before.yml');
  ymlAfter = getFixturePath('after.yml');

  correctResult = readFile('resultStylish.txt');
});

test('correct difference of the nested files', () => {
  expect(genDiff(jsonBefore, jsonAfter)).toBe(correctResult);
  expect(genDiff(ymlBefore, ymlAfter)).toBe(correctResult);
  expect(genDiff(jsonBefore, ymlAfter)).toBe(correctResult);
});
