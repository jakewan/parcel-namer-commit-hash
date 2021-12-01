import { Namer } from "@parcel/plugin"

export default new Namer({
  async loadConfig({ config }) {
    return "foo"
  },
  async name({ bundler }) {
    return "some-bundle.js"
  },
})
