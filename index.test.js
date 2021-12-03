const MyNamer = require("./index")
const CONFIG = Symbol.for("parcel-plugin-config")

test("names bundle correctly", async () => {
  expect(await MyNamer[CONFIG].name({ bundle: {} })).toBe("some-bundle.js")
})
