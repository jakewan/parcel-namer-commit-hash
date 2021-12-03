const MyNamer = require("./index")
const CONFIG = Symbol.for("parcel-plugin-config")

test("replaces content hash", async () => {
  expect(
    await MyNamer[CONFIG].name({
      bundle: { hashReference: "foo" },
      config: { pattern: "some-bundle.{content-hash}.js" },
    }),
  ).toBe("some-bundle.foo.js")
})
