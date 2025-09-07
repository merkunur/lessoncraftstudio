'use strict';

/**
 * Custom routes for image-theme API
 * These routes provide optimized endpoints for the frontend apps
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/image-themes/translated',
      handler: 'image-theme.findWithTranslations',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
        description: 'Get all themes with translations for a specific locale'
      }
    },
    {
      method: 'GET',
      path: '/image-themes/folder/:folder',
      handler: 'image-theme.findByFolder',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
        description: 'Get theme by folder name with its images'
      }
    },
    {
      method: 'GET',
      path: '/image-themes/search',
      handler: 'image-theme.searchImages',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
        description: 'Search images across all themes'
      }
    }
  ]
};