jest.mock("simple-git")
const SimpleGit = require("simple-git")
const { Config } = require("./config")
const MyNamer = require("./index")
const CONFIG = Symbol.for("parcel-plugin-config")

;[
  {
    description: "replaces content hash and commit hash",
    template: "foo-{content-hash}-{commit-hash}",
    bundle: { type: "js", hashReference: "some-hash-ref" },
    gitStatusIsClean: true,
    expectedBundleName: "foo-some-hash-ref-some-commit-hash",
  },
  {
    description: 'return "dirty" if working directory not clean',
    template: "foo-{commit-hash}-{content-hash}",
    bundle: { type: "js", hashReference: "some-hash-ref" },
    gitStatusIsClean: false,
    expectedBundleName: "foo-dirty-some-hash-ref",
  },
  {
    description: "can replace duplicate placeholders",
    template: "foo-{content-hash}-{commit-hash}-{content-hash}-{commit-hash}",
    bundle: { type: "js", hashReference: "some-hash-ref" },
    gitStatusIsClean: true,
    expectedBundleName:
      "foo-some-hash-ref-some-commit-hash-some-hash-ref-some-commit-hash",
  },
].forEach((testCase) => {
  test(testCase.description, async () => {
    SimpleGit.mockImplementation(() => {
      return {
        status: async () => ({
          isClean: () => testCase.gitStatusIsClean,
        }),
        revparse: async () => "some-commit-hash",
      }
    })
    const bundleGraph = {
      getBundleGroupsContainingBundle: jest
        .fn()
        .mockReturnValue(["some-bundle-group"]),
      isEntryBundleGroup: jest.fn(),
      getBundlesInBundleGroup: jest.fn().mockReturnValue([]),
    }
    const config = new Config({
      "@tacoherd/parcel-namer-commit-hash": {
        template: testCase.template,
      },
    })
    const logger = {
      log: jest.fn(),
    }
    const namer = MyNamer[CONFIG]

    // Code under test
    const name = await namer.name({
      bundle: testCase.bundle,
      bundleGraph,
      config,
      logger,
    })

    // Verify
    expect(name).toBe(testCase.expectedBundleName)
  })
})
