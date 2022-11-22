'use strict';

/**
 * sitewide controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sitewide.sitewide');
