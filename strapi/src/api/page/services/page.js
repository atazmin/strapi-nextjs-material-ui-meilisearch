"use strict";

/**
 * page service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::page.page", ({ strapi }) => ({
  async find(...args) {
    const { results, pagination } = await super.find(...args);

    results.forEach((result) => {
      result.contentType = "page";
    });

    return { results, pagination };
  },
}));
