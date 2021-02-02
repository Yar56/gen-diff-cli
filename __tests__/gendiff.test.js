import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import { beforeAll, test, expect } from '@jest/globals';
import genDiff from '../lib/index.js';

let jsonBefore;
let jsonAfter;
let correctResult;
let wrongResult;

beforeAll(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
  jsonBefore = getFixturePath('flatFile1.json');
  jsonAfter = getFixturePath('flatFile2.json');
  correctResult = readFile('correctResultFlat.txt');
  wrongResult = readFile('wrongResultFlat.txt');
});

test('correct difference flat json', () => {
  expect(genDiff(jsonBefore, jsonAfter)).toBe(correctResult);
});
test('wrong difference flat json', () => {
  expect(genDiff(jsonBefore, jsonAfter)).not.toBe(wrongResult);
});
