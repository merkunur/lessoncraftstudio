'use strict';

/**
 * image-theme router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::image-theme.image-theme', {
  config: {
    find: {
      auth: false
    },
    findOne: {
      auth: false
    },
    create: {
      auth: false
    },
    update: {
      auth: false
    },
    delete: {
      auth: false
    }
  }
});