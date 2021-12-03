const { Namer } = require("@parcel/plugin")
const { Config } = require("./config")
const git = require("simple-git")

const commitHashPlaceholder = "{commit-hash}"
const contentHashPlaceholder = "{content-hash}"

module.exports = new Namer({
  async loadConfig({ config }) {
    return new Config(await config.getPackage())
  },
  async name({ bundle, config }) {
    let result = config.pattern.replaceAll(
      commitHashPlaceholder,
      this.getCommitHash(),
    )
    return result.replaceAll(contentHashPlaceholder, bundle.hashReference)
  },
  getCommitHash() {
    console.log(__dirname)
    console.log(git)
    // nodegit.Repository.open(path.resolve(__dirname, "../.git"))
    return "some-hash"
  },
})
