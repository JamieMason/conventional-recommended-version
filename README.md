# conventional-recommended-version

[![NPM version](http://img.shields.io/npm/v/conventional-recommended-version.svg?style=flat-square)](https://www.npmjs.com/package/conventional-recommended-version)
[![NPM downloads](http://img.shields.io/npm/dm/conventional-recommended-version.svg?style=flat-square)](https://www.npmjs.com/package/conventional-recommended-version)
[![Dependency Status](http://img.shields.io/david/JamieMason/conventional-recommended-version.svg?style=flat-square)](https://david-dm.org/JamieMason/conventional-recommended-version)
[![Gitter Chat for conventional-recommended-version](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/JamieMason/conventional-recommended-version)
[![Donate via PayPal](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.me/foldleft)
[![Donate via Gratipay](https://img.shields.io/gratipay/user/JamieMason.svg)](https://gratipay.com/~JamieMason/)
[![Analytics](https://ga-beacon.appspot.com/UA-45466560-5/conventional-recommended-version?flat&useReferer)](https://github.com/igrigorik/ga-beacon)
[![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
[![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)

Using a [conventional-changelog](https://github.com/ajoslin/conventional-changelog) commit history, determine the current version number of your project.

This is done by reading your local git commit history and searching for fixes, features, and breaking changes.

## Examples

```
$ conventional-recommended-version
0.5.2
```

```
$ conventional-recommended-version --postfix canary
0.5.2-canary
```

## Installation

```
npm install -g conventional-recommended-version
```

## Options

```
$ conventional-recommended-version --help

  Usage: conventional-recommended-version [options]

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -d, --directory [location]  path to local git repository
    -p, --postfix [name]        a postfix such as "rc1", "canary" or "beta1"
```

## Supported Conventions

conventional-recommended-version currently only supports the [angular conventional-changelog convention](https://github.com/ajoslin/conventional-changelog/blob/master/conventions/angular.md) as that's the one I use.

Patches are welcome.
