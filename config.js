const pluginKey = '@tacoherd/parcel-namer-commit-hash'

class Config {
    constructor(packageData) {
        const pluginData = packageData[pluginKey] || {}
        this.pattern = pluginData.pattern
        if (!this.pattern) {
            throw new Error('parcel-namer-commit-hash requires a configured pattern')
        }
    }
}

module.exports = {
    Config
}
