"use strict";

/**
 * homepage service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::homepage.homepage", ({ strapi }) => ({
  async find(params) {
    const entity = await super.find(params);
    entity.contentType = "homepage";
    return entity;
  },
}));
