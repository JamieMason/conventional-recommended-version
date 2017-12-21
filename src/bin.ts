#!/usr/bin/env node

import crv from './index';

const program = require('commander');
const pkg = require('../package.json');

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
