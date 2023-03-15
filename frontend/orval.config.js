module.exports = {
  sixthree: {
    input: {
      target: "http://localhost:3000/api",
    },
    output: {
      mode: "split",
      target: "./src/api/generated/hooks.ts",
      schemas: "./src/api/generated/types",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/api/mutator/custom-client.ts",
          name: "useCustomClient",
        },
        useDates: false,
        query: {
          useQuery: true,
          useInfinite: true,
        },
      },
    },
    // hooks: {
    //   afterAllFilesWrite: ["eslint --fix", "prettier --write"],
    // },
  },
};
