import { Namer } from "@parcel/plugin"

export default new Namer({
  name({ bundle }) {
    console.log(bundle.type)
    return null
  },
})
