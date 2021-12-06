const { Namer } = require("@parcel/plugin")
const { Config } = require("./config")
const SimpleGit = require("simple-git")

const commitHashPlaceholder = "{commit-hash}"
const contentHashPlaceholder = "{content-hash}"

module.exports = new Namer({
  async loadConfig({ config }) {
    return new Config(await config.getPackage())
  },
  async name({ bundle, config, logger }) {
    const pattern = config.patterns[bundle.type] || config.pattern
    if (!pattern) {
      throw new Error("Could not discern pattern")
    }
    let result = pattern.replaceAll(
      commitHashPlaceholder,
      await this.getCommitHash(),
    )
    return result.replaceAll(contentHashPlaceholder, bundle.hashReference)
  },
  async getCommitHash() {
    const git = SimpleGit()
    const status = await git.status()
    if (!status.isClean()) {
      throw new Error("Working directory is not clean")
    }
    return await git.revparse(["--short", "HEAD"])
  },
})
