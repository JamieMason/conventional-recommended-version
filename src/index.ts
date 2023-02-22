import type { Giterator } from 'giterator';
import { giterator } from 'giterator';

export interface Semver {
  major: number;
  minor: number;
  patch: number;
}

export async function conventionalRecommendedVersion(
  directory: string,
): Promise<Semver> {
  const commitsAscending: Giterator.Commit[] = [];

  let initialVersion: Semver = { major: 0, minor: 0, patch: 0 };

  for await (const commit of giterator(directory, {
    pageSize: 20,
    skipMerges: true,
    tokenNames: ['body', 'subject', 'refNames'],
  })) {
    commitsAscending.unshift(commit);
    if (commit.refNames?.includes('tag:')) {
      const semverTag = getSemverTag(commit);
      if (semverTag) {
        initialVersion = parseSemver(semverTag);
        break;
      }
    }
  }

  return commitsAscending.reduce(getNextVersion, initialVersion);
}

function getSemverTag(commit: Giterator.Commit): string | undefined {
  return `${commit.refNames}`
    .split(',')
    .filter((str) => str.includes('tag: '))
    .map((str) => str.replace('tag: ', ''))
    .filter(isSemver)[0];
}

function isSemver(version: unknown): version is string {
  const ints = '[0-9]+';
  const dot = '\\.';
  const semver = new RegExp(`^${ints}${dot}${ints}${dot}${ints}`);
  return typeof version === 'string' && version.search(semver) !== -1;
}

function parseSemver(str: string): Semver {
  const [major, minor, patch] = str.split('.');
  if (major && minor && patch) {
    return {
      major: Number(major),
      minor: Number(minor),
      patch: Number(patch),
    };
  }
  throw new Error(`"${str}" is not semver`);
}

function getNextVersion(version: Semver, commit: Giterator.Commit): Semver {
  if (isBreakingChange(commit)) {
    return addBreakingChange(version);
  } else if (isFeature(commit)) {
    return addFeature(version);
  } else if (isFix(commit)) {
    return addFix(version);
  }
  return version;
}

function isBreakingChange({ body = '' }) {
  return body.search(/BREAKING CHANGE/) !== -1;
}

function addBreakingChange(version: Semver): Semver {
  return {
    major: version.major + 1,
    minor: 0,
    patch: 0,
  };
}

function isFeature({ subject = '' }) {
  return subject.startsWith('feat(');
}

function addFeature(version: Semver): Semver {
  return {
    major: version.major,
    minor: version.minor + 1,
    patch: version.patch,
  };
}

function isFix({ subject = '' }) {
  return subject.startsWith('fix(');
}

function addFix(version: Semver): Semver {
  return {
    major: version.major,
    minor: version.minor,
    patch: version.patch + 1,
  };
}
