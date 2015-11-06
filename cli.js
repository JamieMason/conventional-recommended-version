#!/usr/bin/env node

'use strict';

var program = require('commander');
var gitlog = require('gitlog');
var pkg = require('./package.json');
var breaking = 0;
var feat = 0;
var fix = 0;

program
    .version(pkg.version)
    .option('-d, --directory [location]', 'path to local git repository', process.cwd())
    .option('-p, --postfix [name]', 'a postfix such as "rc1", "canary" or "beta1"', '')
    .parse(process.argv);

if (program.postfix) {
    program.postfix = '-' + program.postfix;
}

gitlog({
    fields: ['subject', 'body'],
    number: 9000 * 1000 * 1000,
    repo: program.directory
}, parseGitHistory);

function parseGitHistory(error, commits) {
    if (!error) {
        commits.reverse().forEach(parseCommit);
        console.log(breaking + '.' + feat + '.' + fix + program.postfix);
    } else {
        throw error;
    }
}

function parseCommit(commit) {
    parseBreakingChange(commit);
    parseFeature(commit);
    parseFix(commit);
}

function parseBreakingChange(commit) {
    if (isBreakingChange(commit)) {
        breaking++;
    }
}

function parseFeature(commit) {
    if (isFeature(commit)) {
        feat++;
        fix = 0;
    }
}

function parseFix(commit) {
    if (isFix(commit)) {
        fix++;
    }
}

function isFeature(commit) {
    return commit.body.search(/^feat\(/) !== -1;
}

function isFix(commit) {
    return commit.body.search(/^fix\(/) !== -1;
}

function isBreakingChange(commit) {
    return commit.body.search(/BREAKING CHANGE/) !== -1;
}
