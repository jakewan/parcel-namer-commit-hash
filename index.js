const Plugin = require("@parcel/plugin")

module.exports = new Plugin.Namer({
  async loadConfig({ config }) {
    console.log("Inside loadConfig")
  },
  async name({ bundler }) {
    console.log("Inside name")
    return "some-bundle.js"
  },
})
