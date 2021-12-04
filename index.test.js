jest.mock("simple-git")
const SimpleGit = require("simple-git")
const MyNamer = require("./index")
const CONFIG = Symbol.for("parcel-plugin-config")

test("replaces content hash", async () => {
  SimpleGit.mockImplementation(() => {
    return {
      status: async () => ({
        isClean: () => true,
      }),
      revparse: async () => "some-commit-hash",
    }
  })
  const namer = MyNamer[CONFIG]
  const name = await namer.name({
    bundle: { hashReference: "some-hash-ref" },
    config: { pattern: "foo-{content-hash}" },
  })
  expect(name).toBe("foo-some-hash-ref")
})

test("replaces commit hash", async () => {
  SimpleGit.mockImplementation(() => {
    return {
      status: async () => ({
        isClean: () => true,
      }),
      revparse: async () => "some-commit-hash",
    }
  })
  const namer = MyNamer[CONFIG]
  const name = await namer.name({
    bundle: {},
    config: { pattern: "foo-{commit-hash}" },
  })
  expect(name).toBe("foo-some-commit-hash")
})
