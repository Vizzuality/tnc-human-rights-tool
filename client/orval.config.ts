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
        query: {
          useQuery: true,
          useMutation: true,
          signal: true,
        },
        operations: {
          "get/projects": {
            query: {
              useQuery: true,
              useInfinite: true,
              signal: true,
            },
          },
        },
      },
    },
    input: {
      target: "../api/src/extensions/documentation/documentation/1.0.0/full_documentation.json",
      filters: {
        tags: [
          "Project",
          "Users-Permissions - Auth",
          "Contextual-risk",
          "Contextual-risk-category",
          "Pcb",
          "Pcb-category",
        ],
      },
    },
  },
};
