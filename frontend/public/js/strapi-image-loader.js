/**
 * Strapi Image Library Loader
 * Dynamic loader for worksheet generator apps that fetches themes and images from Strapi
 * Supports full multi-language translations and easy admin management
 */

class StrapiImageLoader {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || '';
    this.locale = options.locale || 'en';
    this.cache = new Map();
    this.cacheTimeout = options.cacheTimeout || 5 * 60 * 1000; // 5 minutes default
  }

  /**
   * Set the current locale for translations
   */
  setLocale(locale) {
    this.locale = locale;
    this.clearCache(); // Clear cache when locale changes
  }

  /**
   * Clear the cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get cached data or null if expired
   */
  getCached(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  /**
   * Set cache data
   */
  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Load all themes from Strapi
   * Returns array of themes with translated names
   */
  async loadThemes(nested = false) {
    const cacheKey = `themes_${this.locale}_${nested}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    try {
      // Try Strapi API first
      let response = await fetch(`${this.baseUrl}/api/themes-strapi?locale=${this.locale}&nested=${nested}`);
      
      if (!response.ok) {
        // Fallback to filesystem API
        response = await fetch(`${this.baseUrl}/api/themes/nested?locale=${this.locale}`);
      }

      if (!response.ok) {
        throw new Error(`Failed to load themes: ${response.status}`);
      }

      const themes = await response.json();
      
      // Transform for backward compatibility if needed
      const transformedThemes = themes.map(theme => ({
        id: theme.id,
        path: theme.path || theme.folderName,
        name: theme.name || theme.displayName,
        displayName: theme.name || theme.displayName,
        folderName: theme.path || theme.folderName,
        translations: theme.translations,
        sortOrder: theme.sortOrder || 0,
        children: theme.children || []
      }));

      this.setCache(cacheKey, transformedThemes);
      return transformedThemes;
    } catch (error) {
      console.error('Error loading themes:', error);
      throw error;
    }
  }

  /**
   * Load images for a specific theme
   * Returns array of images with translated names
   */
  async loadThemeImages(themePath, options = {}) {
    const { page = 1, pageSize = 50, search = '' } = options;
    const cacheKey = `images_${themePath}_${this.locale}_${page}_${pageSize}_${search}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    try {
      // Try Strapi API first
      let url = `${this.baseUrl}/api/images-strapi?theme=${encodeURIComponent(themePath)}&locale=${this.locale}&page=${page}&pageSize=${pageSize}`;
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      let response = await fetch(url);
      
      if (!response.ok) {
        // Fallback to filesystem API
        url = `${this.baseUrl}/api/images?theme=${encodeURIComponent(themePath)}&locale=${this.locale}`;
        if (search) {
          url = `${this.baseUrl}/api/images?search=${encodeURIComponent(search)}&locale=${this.locale}`;
        }
        response = await fetch(url);
      }

      if (!response.ok) {
        throw new Error(`Failed to load images: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle both array and object responses
      let images = Array.isArray(data) ? data : (data.images || []);
      
      // Transform for backward compatibility
      const transformedImages = images.map(img => ({
        id: img.id,
        name: img.name || img.displayName || img.word,
        word: img.word || img.name || img.displayName, // Backward compatibility
        fileName: img.fileName,
        path: img.path || img.url || img.src,
        url: img.url || img.path || img.src,
        thumbnail: img.thumbnail,
        translations: img.translations
      }));

      const result = {
        images: transformedImages,
        theme: data.theme,
        pagination: data.pagination
      };

      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error loading theme images:', error);
      throw error;
    }
  }

  /**
   * Search images across all themes
   */
  async searchImages(query, options = {}) {
    const { page = 1, pageSize = 50 } = options;
    const cacheKey = `search_${query}_${this.locale}_${page}_${pageSize}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    try {
      // Try Strapi API first
      let response = await fetch(
        `${this.baseUrl}/api/images-strapi?search=${encodeURIComponent(query)}&locale=${this.locale}&page=${page}&pageSize=${pageSize}`
      );
      
      if (!response.ok) {
        // Fallback to filesystem API
        response = await fetch(
          `${this.baseUrl}/api/images?search=${encodeURIComponent(query)}&locale=${this.locale}`
        );
      }

      if (!response.ok) {
        throw new Error(`Failed to search images: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle both array and object responses
      let images = Array.isArray(data) ? data : (data.results || data.images || []);
      
      // Transform for backward compatibility
      const transformedImages = images.map(img => ({
        id: img.id,
        name: img.name || img.displayName || img.word,
        word: img.word || img.name || img.displayName,
        fileName: img.fileName,
        path: img.path || img.url || img.src,
        url: img.url || img.path || img.src,
        thumbnail: img.thumbnail,
        theme: img.theme,
        translations: img.translations
      }));

      const result = {
        results: transformedImages,
        pagination: data.pagination
      };

      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error searching images:', error);
      throw error;
    }
  }

  /**
   * Get translated name for an item
   */
  getTranslatedName(item, locale = null) {
    locale = locale || this.locale;
    
    if (item.translations && typeof item.translations === 'object') {
      return item.translations[locale] || 
             item.translations['en'] || 
             item.displayName || 
             item.name || 
             item.fileName;
    }
    
    return item.displayName || item.name || item.fileName;
  }

  /**
   * Build image grid HTML (helper for worksheet apps)
   */
  buildImageGrid(images, options = {}) {
    const { 
      className = 'image-grid',
      itemClassName = 'image-item',
      showLabels = true,
      onClick = null
    } = options;

    const gridHtml = images.map(img => {
      const name = this.getTranslatedName(img);
      const imgPath = img.path || img.url;
      
      return `
        <div class="${itemClassName}" data-id="${img.id}" data-filename="${img.fileName}">
          <img src="${imgPath}" alt="${name}" title="${name}">
          ${showLabels ? `<span class="image-label">${name}</span>` : ''}
        </div>
      `;
    }).join('');

    return `<div class="${className}">${gridHtml}</div>`;
  }

  /**
   * Build theme selector HTML (helper for worksheet apps)
   */
  buildThemeSelector(themes, options = {}) {
    const {
      id = 'theme-selector',
      className = 'theme-selector',
      placeholder = 'Select a theme...',
      includeAll = true
    } = options;

    let optionsHtml = includeAll ? '<option value="">All Themes</option>' : '';
    
    themes.forEach(theme => {
      const name = this.getTranslatedName(theme);
      optionsHtml += `<option value="${theme.path || theme.folderName}">${name}</option>`;
      
      // Add nested themes if present
      if (theme.children && theme.children.length > 0) {
        theme.children.forEach(child => {
          const childName = this.getTranslatedName(child);
          optionsHtml += `<option value="${child.path || child.folderName}">-- ${childName}</option>`;
        });
      }
    });

    return `
      <select id="${id}" class="${className}">
        ${placeholder ? `<option value="" disabled selected>${placeholder}</option>` : ''}
        ${optionsHtml}
      </select>
    `;
  }
}

// Export for use in worksheet apps
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StrapiImageLoader;
}

// Make available globally for browser use
if (typeof window !== 'undefined') {
  window.StrapiImageLoader = StrapiImageLoader;
}