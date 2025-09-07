'use strict';

/**
 * Custom routes for image-asset API
 */

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/image-assets/bulk',
      handler: 'image-asset.bulkUpsert',
      config: {
        auth: false, // Will need auth in production
        policies: [],
        middlewares: [],
        description: 'Bulk create/update image assets'
      }
    },
    {
      method: 'GET',
      path: '/image-assets/theme/:theme',
      handler: 'image-asset.findByTheme',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
        description: 'Get images by theme with translations'
      }
    }
  ]
};