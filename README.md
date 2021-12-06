# parcel-namer-commit-hash

A [Parcel][] plugin for including the Git commit hash in bundle filenames.

## Add to Project

```shell
npm install --save-dev @tacoherd/parcel-namer-commit-hash
```

## Enable Plugin

Enable the plugin in your `.parcelrc` file, e.g.:

```json
{
  "namers": ["@tacoherd/parcel-namer-commit-hash"]
}
```

## Plugin Configuration

There are currently two options to configure the plugin:

Specify a pattern to rename **all files** via `package.json#@tacoherd/parcel-namer-commit-hash.pattern`, e.g.:

```json
{
  "@tacoherd/parcel-namer-commit-hash": {
    "pattern": "bundle.{commit-hash}.{content-hash}.min.js"
  }
}
```

Specify patterns by bundle type via `package.json#@tacoherd/parcel-namer-commit-hash.patterns`, e.g.:

```json
{
  "@tacoherd/parcel-namer-commit-hash": {
    "patterns": {
      "js": "bundle.{commit-hash}.{content-hash}.min.js"
    }
  }
}
```

## Patterns

TODO

[parcel]: https://parceljs.org/
