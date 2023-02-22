# conventional-recommended-version

Using a
[conventional-changelog](https://github.com/ajoslin/conventional-changelog)
commit history, determine the current version number of your project.

This is done by reading your local git commit history and searching for fixes,
features, and breaking changes.

## Installation

```
npm install conventional-recommended-version
```

## Usage

```js
import { getVersion } from 'conventional-recommended-version';

getVersion('/Users/you/projects/some-project').then(console.log);
// { major: 1, minor: 0, patch: 0 }
```

## Supported Conventions

conventional-recommended-version currently only supports the
[angular conventional-changelog convention](https://github.com/ajoslin/conventional-changelog/blob/master/conventions/angular.md)
as that's the one I use.

Patches are welcome.

## Badges

- [![NPM version](http://img.shields.io/npm/v/conventional-recommended-version.svg?style=flat-square)](https://www.npmjs.com/package/conventional-recommended-version)
- [![NPM downloads](http://img.shields.io/npm/dm/conventional-recommended-version.svg?style=flat-square)](https://www.npmjs.com/package/conventional-recommended-version)
- [![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
- [![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)
