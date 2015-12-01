'use strict';

var gitlog = require('gitlog');

module.exports = {
    get: get
};

function get(options, done) {

    var postfix = options.postfix ? '-' + options.postfix : '';
    var directory = options.directory;

    var breaking = 0;
    var feat = 0;
    var fix = 0;

    gitlog({
        fields: ['subject', 'body'],
        number: 9000 * 1000 * 1000,
        repo: directory
    }, parseGitHistory);

    function parseGitHistory(error, commits) {
        if (!error) {
            commits.reverse().forEach(parseCommit);
            done(null, breaking + '.' + feat + '.' + fix + postfix);
        } else {
            done(error);
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
            feat = 0;
            fix = 0;
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
}
