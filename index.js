const { Namer } = require("@parcel/plugin")
const { Config } = require("./config")
const SimpleGit = require("simple-git")

const commitHashPlaceholder = /{commit-hash}/g
const contentHashPlaceholder = /{content-hash}/g

module.exports = new Namer({
  async loadConfig({ config }) {
    return new Config(await config.getPackage())
  },
  async name({ bundle, bundleGraph, config, logger }) {
    const shouldReturnDistEntry = () => {
      const bundleGroup = bundleGraph.getBundleGroupsContainingBundle(bundle)[0]
      const isEntry = bundleGraph.isEntryBundleGroup(bundleGroup)
      const bundleGroupBundles =
        bundleGraph.getBundlesInBundleGroup(bundleGroup)
      const mainBundle = bundleGroupBundles.find((b) =>
        b.getEntryAssets().some((a) => a.id === bundleGroup.entryAssetId),
      )
      return isEntry && bundle.id === mainBundle.id && bundle.target?.distEntry
    }

    if (shouldReturnDistEntry()) {
      return bundle.target.distEntry
    }

    const template = config.templates[bundle.type] || config.template
    if (typeof template !== "string") {
      // Allow the next namer to try
      return null
    }
    const result = template.replace(
      commitHashPlaceholder,
      await this.getCommitHash(logger),
    )
    return result.replace(contentHashPlaceholder, bundle.hashReference)
  },
  async getCommitHash(logger) {
    const git = SimpleGit()
    const status = await git.status()
    if (!status.isClean()) {
      logger.log({ message: 'Returning "dirty" for commit hash' })
      return "dirty"
    }
    return await git.revparse(["--short", "HEAD"])
  },
})
