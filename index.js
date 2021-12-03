const Plugin = require("@parcel/plugin")

module.exports = new Plugin.Namer({
  async loadConfig({ config, options, logger }) {
    console.log("Inside loadConfig")
    console.log(config)
    console.log(options)
    console.log(logger)
  },
  async name({ bundle, bundleGraph, config, options, logger }) {
    console.log("Inside name")
    console.log(bundle)
    console.log(bundleGraph)
    console.log(config)
    console.log(options)
    console.log(logger)
    return "some-bundle.js"
  },
})
