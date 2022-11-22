"use strict";

/**
 * video service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::video.video", ({ strapi }) => ({
  async find(...args) {
    const { results, pagination } = await super.find(...args);

    results.forEach((result) => {
      result.contentType = "video";
    });

    return { results, pagination };
  },
}));
