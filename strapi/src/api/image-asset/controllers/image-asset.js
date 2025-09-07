'use strict';

/**
 * image-asset controller
 * Custom controller for image asset operations
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::image-asset.image-asset', ({ strapi }) => ({
  
  /**
   * Bulk create/update image assets
   * Used by migration script to efficiently import images
   */
  async bulkUpsert(ctx) {
    const { images } = ctx.request.body;
    
    if (!images || !Array.isArray(images)) {
      return ctx.badRequest('Images array is required');
    }

    const results = {
      created: 0,
      updated: 0,
      errors: []
    };

    try {
      for (const imageData of images) {
        try {
          // Check if image already exists
          const existing = await strapi.entityService.findMany('api::image-asset.image-asset', {
            filters: { fileName: imageData.fileName },
            limit: 1
          });

          if (existing && existing.length > 0) {
            // Update existing
            await strapi.entityService.update('api::image-asset.image-asset', existing[0].id, {
              data: imageData
            });
            results.updated++;
          } else {
            // Create new
            await strapi.entityService.create('api::image-asset.image-asset', {
              data: imageData
            });
            results.created++;
          }
        } catch (error) {
          results.errors.push({
            fileName: imageData.fileName,
            error: error.message
          });
        }
      }

      return ctx.send(results);
    } catch (error) {
      strapi.log.error('Bulk upsert error:', error);
      return ctx.badRequest('Bulk operation failed: ' + error.message);
    }
  },

  /**
   * Get images by theme with translation support
   */
  async findByTheme(ctx) {
    const { theme } = ctx.params;
    const { locale = 'en' } = ctx.query;

    try {
      // First find the theme
      const themes = await strapi.entityService.findMany('api::image-theme.image-theme', {
        filters: { folderName: theme },
        fields: ['id'],
        limit: 1
      });

      if (!themes || themes.length === 0) {
        return ctx.notFound('Theme not found');
      }

      // Get all images for this theme
      const images = await strapi.entityService.findMany('api::image-asset.image-asset', {
        filters: {
          themes: {
            id: themes[0].id
          }
        },
        fields: ['fileName', 'displayName', 'translations'],
        populate: {
          file: {
            fields: ['url', 'formats']
          }
        },
        sort: { fileName: 'asc' },
        limit: 1000 // Max images per theme
      });

      // Transform with translations
      const transformedImages = images.map(img => {
        let translatedName = img.displayName || img.fileName;
        if (img.translations && typeof img.translations === 'object') {
          translatedName = img.translations[locale] || 
                          img.translations['en'] || 
                          translatedName;
        }

        return {
          word: translatedName,
          name: translatedName,
          path: img.file?.url || `/images/${theme}/${img.fileName}`
        };
      });

      // Set cache headers
      ctx.set('Cache-Control', 'public, max-age=300');

      return ctx.send(transformedImages);
    } catch (error) {
      strapi.log.error('Error fetching images by theme:', error);
      return ctx.badRequest('Error fetching images: ' + error.message);
    }
  }
}));