'use strict';

/**
 * worksheet-app service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::worksheet-app.worksheet-app');