import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonBefore = getFixturePath('before.json');
const jsonAfter = getFixturePath('after.json');
const ymlBefore = getFixturePath('before.yml');
const ymlAfter = getFixturePath('after.yml');

const plainCorrectResult = readFile('plainResult.txt');
const stylishCorrectResult = readFile('stylishResult.txt');
const jsonCorrectResult = readFile('jsonResult.txt');

describe('correct difference of the nested files', () => {
  test.each([
    [jsonBefore, jsonAfter, stylishCorrectResult],
    [ymlBefore, ymlAfter, stylishCorrectResult],
    [jsonBefore, ymlAfter, stylishCorrectResult],
  ])('stylish', (before, after, result) => {
    expect(genDiff(before, after)).toBe(result);
  });

  test.each([
    [jsonBefore, jsonAfter, plainCorrectResult],
    [ymlBefore, ymlAfter, plainCorrectResult],
    [jsonBefore, ymlAfter, plainCorrectResult],
  ])('plain', (before, after, result) => {
    expect(genDiff(before, after, 'plain')).toBe(result);
  });

  test.each([
    [jsonBefore, jsonAfter, jsonCorrectResult],
    [ymlBefore, ymlAfter, jsonCorrectResult],
    [jsonBefore, ymlAfter, jsonCorrectResult],
  ])('json', (before, after, result) => {
    expect(genDiff(before, after, 'json')).toBe(result);
  });
});
