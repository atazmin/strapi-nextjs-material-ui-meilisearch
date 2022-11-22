'use strict';

/**
 * sitewide service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sitewide.sitewide');
