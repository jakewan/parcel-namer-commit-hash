const pluginKey = "@tacoherd/parcel-namer-commit-hash"

class Config {
  constructor(packageData) {
    const pluginData = packageData[pluginKey] || {}
    if (!pluginData.pattern && !pluginData.patterns) {
        throw new Error('pattern configuration required')
    }
    this.pattern = pluginData.pattern
    this.patterns = pluginData.patterns || {}
  }
}

module.exports = {
  Config,
}
