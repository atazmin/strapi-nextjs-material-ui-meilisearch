"use strict";

/**
 * installation service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::installation.installation",
  ({ strapi }) => ({
    async find(...args) {
      const { results, pagination } = await super.find(...args);

      results.forEach((result) => {
        result.contentType = "installation";
      });

      return { results, pagination };
    },
  })
);
