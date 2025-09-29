/**
 * Centralized Locale Management System for LessonCraftStudio
 * This module ensures consistent locale handling across all 33 worksheet generator apps
 *
 * @author LessonCraftStudio Team
 * @version 1.0.0
 */

class LocaleManager {
    constructor() {
        this._locale = null;
        this._initialized = false;
        this._callbacks = [];
    }

    /**
     * Initialize the locale manager
     * This should be called once when the page loads
     */
    init() {
        if (this._initialized) return this._locale;

        // Priority 1: URL parameter (most explicit)
        const urlParams = new URLSearchParams(window.location.search);
        const urlLocale = urlParams.get('locale');

        // Priority 2: Session storage (persists across page loads)
        const sessionLocale = sessionStorage.getItem('lcs_locale');

        // Priority 3: Browser language
        const browserLocale = navigator.language ? navigator.language.split('-')[0] : null;

        // Set locale with fallback chain
        this._locale = urlLocale || sessionLocale || browserLocale || 'en';

        // Validate locale against supported languages
        const supportedLocales = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
        if (!supportedLocales.includes(this._locale)) {
            this._locale = 'en';
        }

        // Store in session for consistency
        sessionStorage.setItem('lcs_locale', this._locale);

        this._initialized = true;

        // Notify all callbacks
        this._callbacks.forEach(cb => cb(this._locale));

        console.log(`LocaleManager initialized with locale: ${this._locale}`);
        return this._locale;
    }

    /**
     * Get the current locale
     * @returns {string} The current locale code
     */
    getLocale() {
        if (!this._initialized) {
            this.init();
        }
        return this._locale;
    }

    /**
     * Set a new locale
     * @param {string} locale - The locale code to set
     */
    setLocale(locale) {
        this._locale = locale;
        sessionStorage.setItem('lcs_locale', locale);

        // Notify all callbacks
        this._callbacks.forEach(cb => cb(locale));

        // Optionally reload the page with new locale
        if (window.location.search.includes('locale=')) {
            const url = new URL(window.location);
            url.searchParams.set('locale', locale);
            window.location.href = url.toString();
        }
    }

    /**
     * Register a callback for locale changes
     * @param {Function} callback - Function to call when locale changes
     */
    onLocaleChange(callback) {
        this._callbacks.push(callback);
    }

    /**
     * Make an API call with locale automatically included
     * @param {string} endpoint - The API endpoint
     * @param {Object} params - Additional parameters
     * @returns {Promise} The fetch promise
     */
    async fetchWithLocale(endpoint, params = {}) {
        const locale = this.getLocale();
        const separator = endpoint.includes('?') ? '&' : '?';
        const url = `${endpoint}${separator}locale=${locale}`;

        console.log(`Fetching with locale: ${url}`);
        return fetch(url, params);
    }

    /**
     * Get translated text from the translations object if available
     * @param {string} key - The translation key
     * @returns {string} The translated text or the key if not found
     */
    translate(key) {
        if (typeof translations !== 'undefined' && translations[this.getLocale()]) {
            return translations[this.getLocale()][key] || translations['en'][key] || key;
        }
        return key;
    }
}

// Create singleton instance
const localeManager = new LocaleManager();

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => localeManager.init());
} else {
    localeManager.init();
}

// Export for use in other modules
window.LocaleManager = localeManager;