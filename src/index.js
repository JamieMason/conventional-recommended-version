import * as logservable from 'logservable';

const getPostfix = postfix => (postfix ? `-${postfix}` : '');
const isBreakingChange = ({ body }) => body.search(/BREAKING CHANGE/) !== -1;
const isFeature = ({ subject }) => subject.startsWith('feat(');
const isFix = ({ subject }) => subject.startsWith('fix(');
const isRelease = ({ subject }) => subject.startsWith('chore(release)');

const snapToRelease = (version, { body, subject }) => {
  const [_, major, minor, patch] = subject.split(/[ .-]/);
  return {
    major: parseInt(major, 10),
    minor: parseInt(minor, 10),
    patch: parseInt(patch, 10)
  };
};

const addBreakingChange = version => ({
  major: version.major + 1,
  minor: 0,
  patch: 0
});

const addFeature = version => ({
  major: version.major,
  minor: version.minor + 1,
  patch: version.patch
});

const addFix = version => ({
  major: version.major,
  minor: version.minor,
  patch: version.patch + 1
});

const getNextVersion = (version, commit) => {
  if (isRelease(commit)) {
    return snapToRelease(version, commit);
  } else if (isBreakingChange(commit)) {
    return addBreakingChange(version);
  } else if (isFeature(commit)) {
    return addFeature(version);
  } else if (isFix(commit)) {
    return addFix(version);
  }
  return version;
};

export default ({ directory, postfix }, done) => {
  const commit$ = logservable.commits(directory, ['body', 'subject'], true);
  const version$ = commit$.fold(getNextVersion, { major: 0, minor: 0, patch: 0 });
  const nextVersion$ = version$.last();

  nextVersion$.addListener({
    next({ major, minor, patch }) {
      const nextVersion = `${major}.${minor}.${patch}${getPostfix(postfix)}`;
      done(null, nextVersion);
    },
    error(err) {
      done(err);
    }
  });
};
