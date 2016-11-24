# conventional-recommended-version

[![Analytics](https://ga-beacon.appspot.com/UA-45466560-5/conventional-recommended-version?flat&useReferer)](https://github.com/igrigorik/ga-beacon)

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
