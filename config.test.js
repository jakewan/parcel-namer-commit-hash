const { Config } = require("./config")

test("template or templates is required", () => {
  const t = () => {
    new Config({})
  }
  expect(t).toThrow("template configuration required")
})
