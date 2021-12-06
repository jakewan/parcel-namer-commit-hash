const pluginKey = "@tacoherd/parcel-namer-commit-hash"

class Config {
  constructor(packageData) {
    const pluginData = packageData[pluginKey] || {}
    if (!pluginData.template && !pluginData.templates) {
        throw new Error('template configuration required')
    }
    this.template = pluginData.template
    this.templates = pluginData.templates || {}
  }
}

module.exports = {
  Config,
}
