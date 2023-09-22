/**
 * project router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

const isOwner = {
  name: "global::isOwner",
  config: { contentType: "project" },
};

module.exports = createCoreRouter("api::project.project", {
  config: {
    create: {
      policies: [isOwner],
    },
    update: {
      policies: [isOwner],
    },
    delete: {
      policies: [isOwner],
    },
    find: {
      policies: [isOwner],
    },
    findOne: {
      policies: [isOwner],
    },
  },
});
