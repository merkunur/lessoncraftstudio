/**
 * WorksheetBase - Core functionality for all worksheet generator apps
 * Provides 100% dynamic image loading with performance optimizations
 */

class WorksheetBase {
  constructor(config) {
    this.config = {
      appId: config.appId || 'default',
      appName: config.appName || 'Worksheet',
      hasMainLibrary: config.hasMainLibrary !== false,
      hasBorders: config.hasBorders !== false,
      hasBackgrounds: config.hasBackgrounds !== false,
      hasTemplates: config.hasTemplates || false,
      templateType: config.templateType || null,
      specialCollections: config.specialCollections || [],
      itemsPerPage: config.itemsPerPage || 50,
      ...config
    };

    // State management
    this.state = {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      isLoading: false,
      currentTheme: 'all',
      currentLocale: this.detectLocale(),
      searchQuery: '',
      images: [],
      borders: [],
      backgrounds: [],
      templates: []
    };

    // Cache management
    this.cache = new Map();
    this.cacheTimestamps = new Map();
    this.cacheTTL = 5 * 60 * 1000; // 5 minutes

    // Performance optimizations
    this.lazyLoadObserver = null;
    this.searchDebounceTimer = null;
    this.searchDebounceDelay = 300;

    // DOM elements (to be set by subclass)
    this.elements = {};

    // Initialize lazy loading
    this.initializeLazyLoading();
  }

  /**
   * Initialize the worksheet application
   */
  async initialize() {
    try {
      console.log(`Initializing ${this.config.appName} with dynamic content system`);

      // Load all required libraries in parallel
      const promises = [];

      if (this.config.hasMainLibrary) {
        promises.push(this.loadMainLibrary());
        promises.push(this.loadThemes());
      }

      if (this.config.hasBorders) {
        promises.push(this.loadBorderThemes());
      }

      if (this.config.hasBackgrounds) {
        promises.push(this.loadBackgroundThemes());
      }

      if (this.config.hasTemplates) {
        promises.push(this.loadTemplates());
      }

      if (this.config.specialCollections.length > 0) {
        promises.push(this.loadSpecialCollections());
      }

      await Promise.all(promises);

      // Set up event listeners
      this.setupEventListeners();

      console.log(`${this.config.appName} initialized successfully`);
    } catch (error) {
      console.error(`Failed to initialize ${this.config.appName}:`, error);
      this.showError('Failed to initialize application. Please refresh the page.');
    }
  }

  /**
   * Detect user's locale
   */
  detectLocale() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLocale = urlParams.get('locale');
    if (urlLocale) return urlLocale;

    const pathMatch = window.location.pathname.match(/^\/([a-z]{2})\//);
    if (pathMatch) return pathMatch[1];

    return navigator.language.substring(0, 2) || 'en';
  }

  /**
   * Initialize lazy loading with Intersection Observer
   */
  initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
      this.lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              this.lazyLoadObserver.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px'
      });
    }
  }

  /**
   * Load main image library with pagination
   */
  async loadMainLibrary(page = 1) {
    const cacheKey = `images_${this.state.currentTheme}_${this.state.currentLocale}_${page}_${this.state.searchQuery}`;

    // Check cache first
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      this.renderImageLibrary(cached);
      return cached;
    }

    this.state.isLoading = true;
    this.showLoading('image-library');

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: this.config.itemsPerPage.toString(),
        locale: this.state.currentLocale
      });

      if (this.state.currentTheme && this.state.currentTheme !== 'all') {
        params.append('theme', this.state.currentTheme);
      }

      if (this.state.searchQuery) {
        params.append('search', this.state.searchQuery);
      }

      if (this.config.appId) {
        params.append('app', this.config.appId);
      }

      const response = await this.fetchWithRetry(`/api/images/v2?${params}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      // Update state
      this.state.images = data.data;
      this.state.currentPage = data.meta.page;
      this.state.totalPages = data.meta.page_count;
      this.state.totalItems = data.meta.total_count;

      // Cache the result
      this.setCache(cacheKey, data);

      // Render the library
      this.renderImageLibrary(data);

      return data;
    } catch (error) {
      console.error('Failed to load image library:', error);
      this.showError('Failed to load images. Please try again.');
      return null;
    } finally {
      this.state.isLoading = false;
    }
  }

  /**
   * Load available themes
   */
  async loadThemes() {
    const cacheKey = `themes_${this.state.currentLocale}`;
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      this.renderThemeSelector(cached);
      return cached;
    }

    try {
      const response = await this.fetchWithRetry(`/api/themes?locale=${this.state.currentLocale}`);
      const themes = await response.json();

      this.setCache(cacheKey, themes);
      this.renderThemeSelector(themes);

      return themes;
    } catch (error) {
      console.error('Failed to load themes:', error);
      return [];
    }
  }

  /**
   * Load border themes
   */
  async loadBorderThemes() {
    try {
      const response = await this.fetchWithRetry(`/api/borders/themes?locale=${this.state.currentLocale}`);
      const themes = await response.json();
      this.renderBorderThemeSelector(themes);
      return themes;
    } catch (error) {
      console.error('Failed to load border themes:', error);
      return [];
    }
  }

  /**
   * Load background themes
   */
  async loadBackgroundThemes() {
    try {
      const response = await this.fetchWithRetry(`/api/backgrounds/themes?locale=${this.state.currentLocale}`);
      const themes = await response.json();
      this.renderBackgroundThemeSelector(themes);
      return themes;
    } catch (error) {
      console.error('Failed to load background themes:', error);
      return [];
    }
  }

  /**
   * Load templates based on type
   */
  async loadTemplates() {
    if (!this.config.templateType) return [];

    try {
      const endpoint = this.config.templateType === 'train'
        ? '/api/train-templates'
        : '/api/templates';

      const response = await this.fetchWithRetry(`${endpoint}?locale=${this.state.currentLocale}`);
      const templates = await response.json();

      this.state.templates = templates;
      this.renderTemplateSelector(templates);

      return templates;
    } catch (error) {
      console.error('Failed to load templates:', error);
      return [];
    }
  }

  /**
   * Load special collections for specific apps
   */
  async loadSpecialCollections() {
    const promises = this.config.specialCollections.map(async (collection) => {
      try {
        const response = await this.fetchWithRetry(
          `/api/collections/${collection}?app=${this.config.appId}&locale=${this.state.currentLocale}`
        );
        return await response.json();
      } catch (error) {
        console.error(`Failed to load special collection ${collection}:`, error);
        return null;
      }
    });

    return Promise.all(promises);
  }

  /**
   * Render image library with virtual scrolling
   */
  renderImageLibrary(data) {
    const container = this.elements.imageLibrary;
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    if (!data.data || data.data.length === 0) {
      container.innerHTML = '<p class="no-results">No images found</p>';
      return;
    }

    // Create image grid
    const grid = document.createElement('div');
    grid.className = 'image-grid';

    data.data.forEach(image => {
      const item = this.createImageThumbnail(image);
      grid.appendChild(item);
    });

    container.appendChild(grid);

    // Render pagination if needed
    if (data.meta.page_count > 1) {
      const pagination = this.createPaginationControls(data.meta, data.links);
      container.appendChild(pagination);
    }
  }

  /**
   * Create image thumbnail element
   */
  createImageThumbnail(image) {
    const div = document.createElement('div');
    div.className = 'image-thumbnail';
    div.dataset.imageId = image.id;

    const img = document.createElement('img');

    // Use lazy loading
    if (this.lazyLoadObserver) {
      img.dataset.src = image.thumbnail || image.path;
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150"%3E%3Crect width="150" height="150" fill="%23f0f0f0"/%3E%3C/svg%3E';
      this.lazyLoadObserver.observe(img);
    } else {
      img.src = image.thumbnail || image.path;
    }

    img.alt = image.name;
    img.loading = 'lazy';

    const label = document.createElement('span');
    label.className = 'image-label';
    label.textContent = image.name;

    div.appendChild(img);
    div.appendChild(label);

    div.onclick = () => this.onImageSelect(image);

    return div;
  }

  /**
   * Create pagination controls
   */
  createPaginationControls(meta, links) {
    const container = document.createElement('div');
    container.className = 'pagination-controls';

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Previous';
    prevBtn.disabled = !links.prev;
    prevBtn.onclick = () => links.prev && this.loadMainLibrary(meta.page - 1);
    container.appendChild(prevBtn);

    // Page info
    const pageInfo = document.createElement('span');
    pageInfo.className = 'page-info';
    pageInfo.textContent = `Page ${meta.page} of ${meta.page_count} (${meta.total_count} items)`;
    container.appendChild(pageInfo);

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next →';
    nextBtn.disabled = !links.next;
    nextBtn.onclick = () => links.next && this.loadMainLibrary(meta.page + 1);
    container.appendChild(nextBtn);

    return container;
  }

  /**
   * Fetch with retry logic and exponential backoff
   */
  async fetchWithRetry(url, options = {}, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(url, options);

        if (response.ok || i === maxRetries - 1) {
          return response;
        }

        // Wait with exponential backoff
        const delay = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));

      } catch (error) {
        if (i === maxRetries - 1) throw error;

        // Wait before retry
        const delay = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  /**
   * Cache management
   */
  getFromCache(key) {
    if (!this.cache.has(key)) return null;

    const timestamp = this.cacheTimestamps.get(key);
    if (Date.now() - timestamp > this.cacheTTL) {
      this.cache.delete(key);
      this.cacheTimestamps.delete(key);
      return null;
    }

    return this.cache.get(key);
  }

  setCache(key, value) {
    this.cache.set(key, value);
    this.cacheTimestamps.set(key, Date.now());
  }

  /**
   * Setup event listeners (to be extended by subclasses)
   */
  setupEventListeners() {
    // Theme selector
    if (this.elements.themeSelector) {
      this.elements.themeSelector.addEventListener('change', (e) => {
        this.state.currentTheme = e.target.value;
        this.state.currentPage = 1;
        this.loadMainLibrary(1);
      });
    }

    // Search input with debounce
    if (this.elements.searchInput) {
      this.elements.searchInput.addEventListener('input', (e) => {
        clearTimeout(this.searchDebounceTimer);
        this.searchDebounceTimer = setTimeout(() => {
          this.state.searchQuery = e.target.value;
          this.state.currentPage = 1;
          this.loadMainLibrary(1);
        }, this.searchDebounceDelay);
      });
    }
  }

  /**
   * UI Helper methods
   */
  showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = '<div class="loading">Loading...</div>';
    }
  }

  showError(message) {
    console.error(message);
    // Implement app-specific error display
  }

  /**
   * Placeholder methods to be implemented by subclasses
   */
  onImageSelect(image) {
    console.log('Image selected:', image);
    // Override in subclass
  }

  renderThemeSelector(themes) {
    // Override in subclass
  }

  renderBorderThemeSelector(themes) {
    // Override in subclass
  }

  renderBackgroundThemeSelector(themes) {
    // Override in subclass
  }

  renderTemplateSelector(templates) {
    // Override in subclass
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WorksheetBase;
}