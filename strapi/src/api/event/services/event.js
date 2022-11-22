"use strict";

/**
 * event service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::event.event", ({ strapi }) => ({
  async find(...args) {
    const { results, pagination } = await super.find(...args);

    results.forEach((result) => {
      result.contentType = "event";
    });

    return { results, pagination };
  },
}));
