'use strict';

/**
 * image-theme controller
 * Custom controller for efficient image theme operations with caching
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::image-theme.image-theme', ({ strapi }) => ({
  
  /**
   * Get all themes with translations for a specific locale
   * Optimized with minimal fields and caching headers
   */
  async findWithTranslations(ctx) {
    const { locale = 'en', nested = false } = ctx.query;
    
    try {
      // Build query with optimization
      const queryOptions = {
        fields: ['folderName', 'displayName', 'translations', 'sortOrder'],
        populate: {
          thumbnail: {
            fields: ['url', 'formats']
          }
        },
        sort: [{ sortOrder: 'asc' }, { folderName: 'asc' }],
        limit: 500 // Max themes we expect
      };

      // Add parent theme info if nested view requested
      if (nested) {
        queryOptions.populate.parentTheme = {
          fields: ['folderName', 'displayName']
        };
      }

      const themes = await strapi.entityService.findMany('api::image-theme.image-theme', queryOptions);

      // Transform data for frontend consumption
      const transformedThemes = themes.map(theme => {
        // Get translated name
        let translatedName = theme.displayName || theme.folderName;
        if (theme.translations && typeof theme.translations === 'object') {
          translatedName = theme.translations[locale] || 
                          theme.translations['en'] || 
                          translatedName;
        }

        const result = {
          id: theme.id,
          path: theme.folderName,
          name: translatedName,
          sortOrder: theme.sortOrder || 0
        };

        // Add thumbnail if available
        if (theme.thumbnail?.url) {
          result.thumbnail = theme.thumbnail.formats?.thumbnail?.url || theme.thumbnail.url;
        }

        // Add parent info if requested
        if (nested && theme.parentTheme) {
          result.parentPath = theme.parentTheme.folderName;
          result.parentName = theme.parentTheme.displayName;
        }

        return result;
      });

      // Set cache headers for better performance
      ctx.set('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
      
      return ctx.send(transformedThemes);
    } catch (error) {
      strapi.log.error('Error fetching themes with translations:', error);
      return ctx.badRequest('Error fetching themes: ' + error.message);
    }
  },

  /**
   * Get theme by folder name with all its images
   * Supports pagination for large image sets
   */
  async findByFolder(ctx) {
    const { folder } = ctx.params;
    const { 
      locale = 'en', 
      page = 1, 
      pageSize = 50,
      search = ''
    } = ctx.query;
    
    try {
      // Find theme by folder name
      const themes = await strapi.entityService.findMany('api::image-theme.image-theme', {
        filters: { folderName: folder },
        fields: ['id', 'folderName', 'displayName', 'translations'],
        limit: 1
      });

      if (!themes || themes.length === 0) {
        return ctx.notFound('Theme not found');
      }

      const theme = themes[0];

      // Build filters for images
      const imageFilters = {
        themes: {
          id: theme.id
        }
      };

      // Add search filter if provided
      if (search) {
        imageFilters.$or = [
          { fileName: { $containsi: search } },
          { displayName: { $containsi: search } }
        ];
      }

      // Calculate pagination
      const start = (parseInt(page) - 1) * parseInt(pageSize);

      // Get images for this theme
      const [images, total] = await Promise.all([
        strapi.entityService.findMany('api::image-asset.image-asset', {
          filters: imageFilters,
          fields: ['fileName', 'displayName', 'translations'],
          populate: {
            file: {
              fields: ['url', 'formats', 'ext', 'size']
            }
          },
          start,
          limit: parseInt(pageSize),
          sort: { fileName: 'asc' }
        }),
        strapi.entityService.count('api::image-asset.image-asset', {
          filters: imageFilters
        })
      ]);

      // Transform images with translations
      const transformedImages = images.map(img => {
        // Get translated name
        let translatedName = img.displayName || img.fileName;
        if (img.translations && typeof img.translations === 'object') {
          translatedName = img.translations[locale] || 
                          img.translations['en'] || 
                          translatedName;
        }

        return {
          id: img.id,
          fileName: img.fileName,
          name: translatedName,
          word: translatedName, // For backward compatibility
          path: img.file?.url || `/images/${folder}/${img.fileName}`,
          thumbnail: img.file?.formats?.thumbnail?.url,
          size: img.file?.size,
          ext: img.file?.ext
        };
      });

      // Get translated theme name
      let translatedThemeName = theme.displayName || theme.folderName;
      if (theme.translations && typeof theme.translations === 'object') {
        translatedThemeName = theme.translations[locale] || 
                             theme.translations['en'] || 
                             translatedThemeName;
      }

      // Build response
      const response = {
        theme: {
          id: theme.id,
          path: theme.folderName,
          name: translatedThemeName
        },
        images: transformedImages,
        pagination: {
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          total,
          pageCount: Math.ceil(total / parseInt(pageSize))
        }
      };

      // Set cache headers
      ctx.set('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes

      return ctx.send(response);
    } catch (error) {
      strapi.log.error('Error fetching theme images:', error);
      return ctx.badRequest('Error fetching theme images: ' + error.message);
    }
  },

  /**
   * Search images across all themes
   */
  async searchImages(ctx) {
    const { 
      q = '', 
      locale = 'en',
      page = 1,
      pageSize = 50
    } = ctx.query;

    if (!q || q.length < 2) {
      return ctx.badRequest('Search query must be at least 2 characters');
    }

    try {
      const start = (parseInt(page) - 1) * parseInt(pageSize);

      // Search in fileName, displayName, and potentially in translations
      const filters = {
        $or: [
          { fileName: { $containsi: q } },
          { displayName: { $containsi: q } }
        ]
      };

      const [images, total] = await Promise.all([
        strapi.entityService.findMany('api::image-asset.image-asset', {
          filters,
          fields: ['fileName', 'displayName', 'translations'],
          populate: {
            file: {
              fields: ['url', 'formats']
            },
            themes: {
              fields: ['folderName', 'displayName']
            }
          },
          start,
          limit: parseInt(pageSize),
          sort: { fileName: 'asc' }
        }),
        strapi.entityService.count('api::image-asset.image-asset', { filters })
      ]);

      // Transform results
      const results = images.map(img => {
        let translatedName = img.displayName || img.fileName;
        if (img.translations && typeof img.translations === 'object') {
          translatedName = img.translations[locale] || 
                          img.translations['en'] || 
                          translatedName;
        }

        // Get theme path (use first theme if multiple)
        const themePath = img.themes?.[0]?.folderName || 'general';

        return {
          id: img.id,
          name: translatedName,
          word: translatedName, // Backward compatibility
          path: img.file?.url || `/images/${themePath}/${img.fileName}`,
          thumbnail: img.file?.formats?.thumbnail?.url,
          theme: themePath
        };
      });

      // Set cache headers (shorter for search)
      ctx.set('Cache-Control', 'public, max-age=60'); // Cache for 1 minute

      return ctx.send({
        results,
        pagination: {
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          total,
          pageCount: Math.ceil(total / parseInt(pageSize))
        }
      });
    } catch (error) {
      strapi.log.error('Error searching images:', error);
      return ctx.badRequest('Error searching images: ' + error.message);
    }
  }
}));