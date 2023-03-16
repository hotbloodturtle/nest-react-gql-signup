module.exports = {
  sixthree: {
    input: {
      target: "http://localhost:3000/api-json",
    },
    output: {
      mode: "tags-split",
      target: "./src/api/generated/hooks.ts",
      schemas: "./src/api/generated/models",
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
  },
};
