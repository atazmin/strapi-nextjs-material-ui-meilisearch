'use strict';

/**
 * sitewide router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::sitewide.sitewide');
