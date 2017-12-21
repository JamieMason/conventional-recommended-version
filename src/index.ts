import { commits } from 'logservable';
import { ICommit } from 'logservable/dist/typings';
import { CommitAssertion, Handler, IOptions, IVersion, VersionMap } from './typings';

const isBreakingChange: CommitAssertion = ({ body = '' }) => body.search(/BREAKING CHANGE/) !== -1;
const isFeature: CommitAssertion = ({ subject = '' }) => subject.startsWith('feat(');
const isFix: CommitAssertion = ({ subject = '' }) => subject.startsWith('fix(');
const isRelease: CommitAssertion = ({ subject = '' }) => subject.startsWith('chore(release)');

const toSemver = ({ major, minor, patch }: IVersion, postfix: string = ''): string =>
  `${major}.${minor}.${patch}${postfix ? `-${postfix}` : ''}`;

const snapToRelease = (version: IVersion, { subject = '' }: ICommit) => {
  const values = subject.split(/[ .-]/);
  return {
    major: parseInt(values[1], 10),
    minor: parseInt(values[2], 10),
    patch: parseInt(values[3], 10)
  };
};

const addBreakingChange: VersionMap = (version) => ({
  major: version.major + 1,
  minor: 0,
  patch: 0
});

const addFeature: VersionMap = (version) => ({
  major: version.major,
  minor: version.minor + 1,
  patch: version.patch
});

const addFix: VersionMap = (version) => ({
  major: version.major,
  minor: version.minor,
  patch: version.patch + 1
});

const getNextVersion = (version: IVersion, commit: ICommit): IVersion => {
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

export default ({ directory, postfix }: IOptions, done: Handler) => {
  const commit$ = commits(directory, ['body', 'subject'], true);
  const initialVersion = { major: 0, minor: 0, patch: 0 };
  const version$ = commit$.reduce(getNextVersion, initialVersion);

  version$.last().subscribe({
    next(version: IVersion) {
      done(null, toSemver(version, postfix));
    },
    error(err: Error) {
      done(err);
    }
  });
};
