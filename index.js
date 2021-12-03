const { Namer } = require("@parcel/plugin")
const { Config } = require("./config")
const commitHashPlaceholder = "{commit-hash}"
const contentHashPlaceholder = "{content-hash}"

module.exports = new Namer({
  async loadConfig({ config }) {
    return new Config(await config.getPackage())
  },
  async name({ bundle, config }) {
    let result = config.pattern.replaceAll(commitHashPlaceholder, "some-hash")
    return result.replaceAll(contentHashPlaceholder, bundle.hashReference)
  },
})
