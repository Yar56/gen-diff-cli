#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../lib/index.js';

const program = new Command();

program
  .version('0.1.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, format) => {
    console.log(genDiff(filepath1, filepath2, format.format));
  });
program.parse(process.argv);
