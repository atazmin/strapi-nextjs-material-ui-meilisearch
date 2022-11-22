"use strict";

/**
 * artist service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::artist.artist", ({ strapi }) => ({
  async find(...args) {
    console.log("artist service - find - args: ", args);
    const { results, pagination } = await super.find(...args);

    results.forEach((result) => {
      result.contentType = "artist";
    });

    return { results, pagination };
  },
}));
