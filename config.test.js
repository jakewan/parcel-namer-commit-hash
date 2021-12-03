const { Config } = require("./config")

test("pattern is required", () => {
  const t = () => {
    new Config({})
  }
  expect(t).toThrow("parcel-namer-commit-hash requires a configured pattern")
})
