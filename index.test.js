jest.mock("simple-git")
const SimpleGit = require("simple-git")
const { Config } = require("./config")
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
  // Code under test
  const name = await namer.name({
    bundle: { type: "js", hashReference: "some-hash-ref" },
    config: new Config({
      "@tacoherd/parcel-namer-commit-hash": {
        template: "foo-{content-hash}",
      },
    }),
    logger: {
      log: jest.fn(),
    },
  })
  // Verify
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
  // Code under test
  const name = await namer.name({
    bundle: { type: "js" },
    config: new Config({
      "@tacoherd/parcel-namer-commit-hash": {
        template: "foo-{commit-hash}",
      },
    }),
    logger: {
      log: jest.fn(),
    },
  })
  // Verify
  expect(name).toBe("foo-some-commit-hash")
})
