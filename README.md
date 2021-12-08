# parcel-namer-commit-hash

A [Parcel][] plugin for including the Git commit hash in bundle filenames.

Requirements:

- Node >= 15
- Git

## Add to Project

```shell
npm install --save-dev @tacoherd/parcel-namer-commit-hash
```

## Enable Plugin

Enable the plugin in your `.parcelrc` file, e.g.:

```json
{
  "namers": ["@tacoherd/parcel-namer-commit-hash", "..."]
}
```

## Plugin Configuration

There are currently two options to configure the plugin:

Specify a template to rename **all files** via `package.json#@tacoherd/parcel-namer-commit-hash.template`, e.g.:

```json
{
  "@tacoherd/parcel-namer-commit-hash": {
    "template": "bundle.{commit-hash}.{content-hash}.min.js"
  }
}
```

Specify templates by bundle type via `package.json#@tacoherd/parcel-namer-commit-hash.templates`, e.g.:

```json
{
  "@tacoherd/parcel-namer-commit-hash": {
    "templates": {
      "js": "bundle.{commit-hash}.{content-hash}.min.js"
    }
  }
}
```

## Templates

Templates are how you'd like files to be named. You can specify placeholders as `{placeholder-name}`. The following placeholders are available:

| Placeholder name | Description                                             |
| ---------------- | ------------------------------------------------------- |
| commit-hash      | The git commit hash upon which the bundle is based.     |
|                  | If the working directory is not clean, returns "dirty". |
| content-hash     | The content hash generated by Parcel.                   |

[parcel]: https://parceljs.org/
