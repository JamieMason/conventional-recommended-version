#!/usr/bin/env node

'use strict';

var program = require('commander');
var pkg = require('./package.json');
var crv = require('./index');

program
  .version(pkg.version)
  .option('-d, --directory [location]', 'path to local git repository', process.cwd())
  .option('-p, --postfix [name]', 'a postfix such as "rc1", "canary" or "beta1"', '')
  .parse(process.argv);

crv.get({
  directory: program.directory,
  postfix: program.postfix
}, onVersion);

function onVersion (error, version) {
  if (error) {
    throw error;
  }
  console.log(version);
}
