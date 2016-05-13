// 3rd party modules
var gitlog = require('gitlog');

// public
module.exports = {
  getMessages: getMessages
};

// implementation
function getMessages (directory, done) {
  gitlog({
    fields: ['authorDate', 'body'],
    number: Number.MAX_SAFE_INTEGER,
    repo: directory
  }, onMessages);

  function onMessages (error, commits) {
    if (!error) {
      done(null, organise(commits));
    } else {
      done(error);
    }
  }
}

function organise (commits) {
  return commits
    .sort(sortByAuthorDate)
    .map(getBody);
}

function sortByAuthorDate (a, b) {
  return applySort(a.authorDate, b.authorDate);
}

function applySort (a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

function getBody (commit) {
  return commit.body.trim();
}
