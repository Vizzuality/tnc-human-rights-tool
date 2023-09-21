module.exports = {
  hrt: {
    output: {
      mode: "tags",
      client: "react-query",
      target: "./src/types/generated/strapi.ts",
      mock: false,
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: "./src/services/api/index.ts",
          name: "API",
        },
        queryOptions: {
          useQuery: true,
          useMutation: true,
          options: {
            staleTime: 10000,
          },
          signal: true,
        },
        operations: {
          "get/projects": {
            queryOptions: {
              useQuery: true,
              useInfinite: true,
              signal: true,
              options: {
                staleTime: 10000,
              },
            },
          },
        },
      },
    },
    input: {
      target: "../api/src/extensions/documentation/documentation/1.0.0/full_documentation.json",
      filters: {
        tags: ["Project", "Users-Permissions - Auth", "Contextual-risk", "Contextual-risk-category", "Pcb", "Pcb-category"],
      },
    },
  },
};
