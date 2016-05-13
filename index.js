'use strict';

var gitlog = require('gitlog');

module.exports = {
  get: get
};

function get (options, done) {
  var postfix = getPostfix(options.postfix);
  var directory = options.directory;

  var breaking = 0;
  var feat = 0;
  var fix = 0;

  gitlog({
    fields: ['subject', 'body'],
    number: 9000 * 1000 * 1000,
    repo: directory
  }, parseGitHistory);

  function parseGitHistory (error, commits) {
    if (!error) {
      commits.reverse().forEach(parseCommit);
      done(null, breaking + '.' + feat + '.' + fix + postfix);
    } else {
      done(error);
    }
  }

  function parseCommit (commit) {
    return parseMessage(commit.body.trim());
  }

  function parseMessage (message) {
    if (isRelease(message)) {
      var release = parseReleaseCommit(message);
      breaking = release.major;
      feat = release.minor;
      fix = release.patch;
    } else if (isBreakingChange(message)) {
      breaking++;
      feat = 0;
      fix = 0;
    } else if (isFeature(message)) {
      feat++;
      fix = 0;
    } else if (isFix(message)) {
      fix++;
    }
  }

  function isRelease (message) {
    return message.startsWith('chore(release)');
  }

  function isFeature (message) {
    return message.startsWith('feat(');
  }

  function isFix (message) {
    return message.startsWith('fix(');
  }

  function isBreakingChange (message) {
    return message.search(/BREAKING CHANGE/) !== -1;
  }

  function parseReleaseCommit (message) {
    var parts = message.split(/[ \.-]/);
    return {
      major: parseInt(parts[1], 10),
      minor: parseInt(parts[2], 10),
      patch: parseInt(parts[3], 10),
      postfix: getPostfix(parts[4])
    };
  }

  function getPostfix (value) {
    return value ? '-' + value : '';
  }
}
