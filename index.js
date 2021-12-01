const Plugin = require("@parcel/plugin")

exports.default = new Plugin.Namer({
  name({ bundle }) {
    console.log(bundle.type)
    return null
  },
})
