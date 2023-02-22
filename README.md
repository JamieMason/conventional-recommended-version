# conventional-recommended-version

[![NPM version](http://img.shields.io/npm/v/conventional-recommended-version.svg?style=flat-square)](https://www.npmjs.com/package/conventional-recommended-version)
[![NPM downloads](http://img.shields.io/npm/dm/conventional-recommended-version.svg?style=flat-square)](https://www.npmjs.com/package/conventional-recommended-version)
[![Dependency Status](http://img.shields.io/david/JamieMason/conventional-recommended-version.svg?style=flat-square)](https://david-dm.org/JamieMason/conventional-recommended-version)
[![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
[![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)

Using a
[conventional-changelog](https://github.com/ajoslin/conventional-changelog)
commit history, determine the current version number of your project.

This is done by reading your local git commit history and searching for fixes,
features, and breaking changes.

## 🌩 Installation

```
npm install -g conventional-recommended-version
```

## 👀 Examples

```
$ conventional-recommended-version
0.5.2
```

```
$ conventional-recommended-version --postfix canary
0.5.2-canary
```

## ⚖️ Configuration

```
$ conventional-recommended-version --help

  Usage: conventional-recommended-version [options]

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -d, --directory [location]  path to local git repository
    -p, --postfix [name]        a postfix such as "rc1", "canary" or "beta1"
```

## 📝 Supported Conventions

conventional-recommended-version currently only supports the
[angular conventional-changelog convention](https://github.com/ajoslin/conventional-changelog/blob/master/conventions/angular.md)
as that's the one I use.

Patches are welcome.

## 🙋🏾‍♀️ Getting Help

- Get help with issues by creating a
  [Bug Report](https://github.com/JamieMason/conventional-recommended-version/issues/new?template=bug_report.md).
- Discuss ideas by opening a
  [Feature Request](https://github.com/JamieMason/conventional-recommended-version/issues/new?template=feature_request.md).
