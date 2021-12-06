# parcel-namer-commit-hash

A [Parcel][] plugin for including the Git commit hash in bundle filenames. It is currently geared toward renaming JavaScript files.

## Add to Project

```shell
npm install --save-dev @tacoherd/parcel-namer-commit-hash
```

## Enable the Plugin

Enable the plugin in your `.parcelrc` file, e.g.:

```json
{
  "namers": ["@tacoherd/parcel-namer-commit-hash"]
}
```

Configure the plugin in `package.json#@tacoherd/parcel-namer-commit-hash.pattern`, e.g.:

```json
{
  "@tacoherd/parcel-namer-commit-hash": {
    "pattern": "bundle.{commit-hash}.{content-hash}.min.js"
  }
}
```

[parcel]: https://parceljs.org/
