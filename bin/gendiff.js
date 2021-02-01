#!/usr/bin/env node
import { Command } from 'commander';
import getDiff from '../lib/api.js';

const program = new Command();
// const parse = (obj) => {};

program
  .version('0.1.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(getDiff(filepath1, filepath2));
  });
program.parse(process.argv);
