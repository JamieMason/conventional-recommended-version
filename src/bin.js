#!/usr/bin/env node

import program from 'commander';
import pkg from '../package.json';
import crv from './index';

program
  .version(pkg.version)
  .option('-d, --directory [location]', 'path to local git repository', process.cwd())
  .option('-p, --postfix [name]', 'a postfix such as "rc1", "canary" or "beta1"', '')
  .parse(process.argv);

crv(
  {
    directory: program.directory,
    postfix: program.postfix
  },
  (err, version) => {
    if (err) {
      throw err;
    }
    console.log(version);
  }
);
