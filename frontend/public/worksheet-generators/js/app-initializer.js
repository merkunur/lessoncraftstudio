/**
 * Shared App Initializer for LessonCraftStudio Worksheet Generators
 * Handles common initialization tasks for all 33 worksheet apps
 *
 * @author LessonCraftStudio Team
 * @version 1.0.0
 */

class AppInitializer {
    constructor() {
        this.borderThemes = [];
        this.backgroundThemes = [];
        this.imageThemes = [];
        this.initialized = false;
        this.initCallbacks = [];
    }

    /**
     * Initialize the app with all common functionality
     * @param {Object} config - Configuration object
     */
    async init(config = {}) {
        if (this.initialized) return;

        console.log('AppInitializer starting...');

        // Wait for LocaleManager to be ready
        if (!window.LocaleManager) {
            console.error('LocaleManager not found! Include locale-manager.js first.');
            return;
        }

        const locale = LocaleManager.getLocale();
        console.log(`Initializing app with locale: ${locale}`);

        // Load all resources in parallel for performance
        const loadPromises = [];

        // Load border themes if element exists
        if (config.borderThemeSelect || document.getElementById('borderThemeSelect')) {
            loadPromises.push(this.loadBorderThemes(config.borderThemeSelect));
        }

        // Load background themes if element exists
        if (config.backgroundThemeSelect || document.getElementById('backgroundThemeSelect')) {
            loadPromises.push(this.loadBackgroundThemes(config.backgroundThemeSelect));
        }

        // Load image themes if element exists
        if (config.themeSelect || document.getElementById('themeSelect')) {
            loadPromises.push(this.loadImageThemes(config.themeSelect));
        }

        // Wait for all resources to load
        await Promise.all(loadPromises);

        this.initialized = true;
        console.log('AppInitializer completed successfully');

        // Call any registered callbacks
        this.initCallbacks.forEach(cb => cb());
    }

    /**
     * Load border themes from API
     * @param {HTMLElement|string} selectElement - The select element or its ID
     */
    async loadBorderThemes(selectElement) {
        const select = typeof selectElement === 'string'
            ? document.getElementById(selectElement)
            : selectElement || document.getElementById('borderThemeSelect');

        if (!select) {
            console.warn('Border theme select element not found');
            return;
        }

        try {
            const response = await LocaleManager.fetchWithLocale('/api/borders/themes');

            if (!response.ok) {
                throw new Error(`Failed to load border themes: ${response.status}`);
            }

            const themes = await response.json();
            console.log(`Loaded ${themes.length} border themes`);

            // Clear and populate select
            select.innerHTML = '';

            // Add default "None" option
            const noneOption = document.createElement('option');
            noneOption.value = 'none';
            noneOption.textContent = LocaleManager.translate('none') || 'None';
            select.appendChild(noneOption);

            // Add theme options
            themes.forEach(theme => {
                const option = document.createElement('option');
                option.value = theme.value;
                option.textContent = theme.displayName || theme.value;
                select.appendChild(option);
            });

            this.borderThemes = themes;
            console.log('Border themes loaded successfully');

        } catch (error) {
            console.error('Error loading border themes:', error);
            // Keep the select functional with just "None"
            select.innerHTML = '<option value="none">None</option>';
        }
    }

    /**
     * Load background themes from API
     * @param {HTMLElement|string} selectElement - The select element or its ID
     */
    async loadBackgroundThemes(selectElement) {
        const select = typeof selectElement === 'string'
            ? document.getElementById(selectElement)
            : selectElement || document.getElementById('backgroundThemeSelect');

        if (!select) {
            console.warn('Background theme select element not found');
            return;
        }

        try {
            const response = await LocaleManager.fetchWithLocale('/api/backgrounds/themes');

            if (!response.ok) {
                throw new Error(`Failed to load background themes: ${response.status}`);
            }

            const themes = await response.json();
            console.log(`Loaded ${themes.length} background themes`);

            // Clear and populate select
            select.innerHTML = '';

            // Add default "None" option
            const noneOption = document.createElement('option');
            noneOption.value = 'none';
            noneOption.textContent = LocaleManager.translate('none') || 'None';
            select.appendChild(noneOption);

            // Add theme options
            themes.forEach(theme => {
                const option = document.createElement('option');
                option.value = theme.value;
                option.textContent = theme.displayName || theme.value;
                select.appendChild(option);
            });

            this.backgroundThemes = themes;
            console.log('Background themes loaded successfully');

        } catch (error) {
            console.error('Error loading background themes:', error);
            // Keep the select functional with just "None"
            select.innerHTML = '<option value="none">None</option>';
        }
    }

    /**
     * Load image themes from API
     * @param {HTMLElement|string} selectElement - The select element or its ID
     */
    async loadImageThemes(selectElement) {
        const select = typeof selectElement === 'string'
            ? document.getElementById(selectElement)
            : selectElement || document.getElementById('themeSelect');

        if (!select) {
            console.warn('Theme select element not found');
            return;
        }

        try {
            const response = await LocaleManager.fetchWithLocale('/api/themes-translated');

            if (!response.ok) {
                throw new Error(`Failed to load image themes: ${response.status}`);
            }

            const themes = await response.json();
            console.log(`Loaded ${themes.length} image themes`);

            // Clear and populate select
            select.innerHTML = '';

            // Add "All Themes" option
            const allOption = document.createElement('option');
            allOption.value = 'all';
            allOption.textContent = LocaleManager.translate('allThemes') || 'All Themes';
            select.appendChild(allOption);

            // Add theme options
            themes.forEach(theme => {
                const option = document.createElement('option');
                option.value = theme.value;
                option.textContent = theme.displayName || theme.value;
                select.appendChild(option);
            });

            this.imageThemes = themes;
            console.log('Image themes loaded successfully');

            // Set default to "animals" if it exists
            if (themes.some(t => t.value === 'animals')) {
                select.value = 'animals';
            }

        } catch (error) {
            console.error('Error loading image themes:', error);
            // Keep the select functional with just "All"
            select.innerHTML = '<option value="all">All Themes</option>';
        }
    }

    /**
     * Load images for a specific theme
     * @param {string} theme - The theme to load
     * @param {string} search - Optional search query
     * @returns {Promise<Array>} Array of images
     */
    async loadImages(theme = 'all', search = '') {
        try {
            let url = '/api/images';
            const params = [];

            if (theme && theme !== 'all') {
                params.push(`theme=${encodeURIComponent(theme)}`);
            } else if (theme === 'all' && !search) {
                // Default to animals theme when "All" is selected with no search
                params.push('theme=animals');
            }

            if (search) {
                params.push(`search=${encodeURIComponent(search)}`);
            }

            if (params.length > 0) {
                url += '?' + params.join('&');
            }

            const response = await LocaleManager.fetchWithLocale(url);

            if (!response.ok) {
                throw new Error(`Failed to load images: ${response.status}`);
            }

            const data = await response.json();
            // Handle both {images: [...]} and direct array responses
            return data.images || data || [];

        } catch (error) {
            console.error('Error loading images:', error);
            return [];
        }
    }

    /**
     * Register a callback to be called after initialization
     * @param {Function} callback - The callback function
     */
    onReady(callback) {
        if (this.initialized) {
            callback();
        } else {
            this.initCallbacks.push(callback);
        }
    }
}

// Create singleton instance
const appInitializer = new AppInitializer();

// Export for use in other modules
window.AppInitializer = appInitializer;