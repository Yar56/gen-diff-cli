import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { beforeAll, test, expect } from '@jest/globals';
import genDiff from '../lib/index.js';

let jsonBefore;
let jsonAfter;
let ymlBefore;
let ymlAfter;
let stylishCorrectResult;
let plainCorrectResult;
let jsonCorrectResult;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

beforeAll(() => {
  jsonBefore = getFixturePath('before.json');
  jsonAfter = getFixturePath('after.json');
  ymlBefore = getFixturePath('before.yml');
  ymlAfter = getFixturePath('after.yml');

  stylishCorrectResult = readFile('stylishResult.txt');
  plainCorrectResult = readFile('plainResult.txt');
  jsonCorrectResult = readFile('jsonResult.txt');
});

test('correct difference of the nested files (stylish)', () => {
  expect(genDiff(jsonBefore, jsonAfter)).toBe(stylishCorrectResult);
  expect(genDiff(ymlBefore, ymlAfter)).toBe(stylishCorrectResult);
  expect(genDiff(jsonBefore, ymlAfter)).toBe(stylishCorrectResult);
});
test('correct difference of the nested files (plain)', () => {
  expect(genDiff(jsonBefore, jsonAfter, 'plain')).toBe(plainCorrectResult);
  expect(genDiff(jsonBefore, ymlAfter, 'plain')).toBe(plainCorrectResult);
});
test('correct difference of the nested files (json)', () => {
  expect(genDiff(jsonBefore, jsonAfter, 'json')).toBe(jsonCorrectResult);
  expect(genDiff(jsonBefore, ymlAfter, 'json')).toBe(jsonCorrectResult);
});
