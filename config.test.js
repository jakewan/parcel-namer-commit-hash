const { Config } = require("./config")

test("pattern or patterns is required", () => {
  const t = () => {
    new Config({})
  }
  expect(t).toThrow("pattern configuration required")
})
