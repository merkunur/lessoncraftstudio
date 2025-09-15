/**
 * UNIFIED LANGUAGE MANAGER
 *
 * Handles language switching for ALL worksheet generator apps
 * Automatically updates borders, backgrounds, themes, and UI translations
 *
 * @author LessonCraftStudio Team
 * @version 1.0.0
 */

class UnifiedLanguageManager {
    constructor() {
        this.currentLocale = 'en';
        this.supportedLocales = {
            'en': 'English',
            'de': 'Deutsch',
            'fr': 'Français',
            'es': 'Español',
            'pt': 'Português',
            'it': 'Italiano',
            'nl': 'Nederlands',
            'sv': 'Svenska',
            'da': 'Dansk',
            'no': 'Norsk',
            'fi': 'Suomi'
        };

        this.callbacks = [];
        this.initialized = false;
    }

    /**
     * Initialize the language manager
     */
    init() {
        if (this.initialized) return;

        // Get initial locale from URL
        const urlParams = new URLSearchParams(window.location.search);
        this.currentLocale = urlParams.get('locale') || 'en';

        // Find or create language selector
        this.setupLanguageSelector();

        // Listen for language changes
        this.attachEventListeners();

        this.initialized = true;
        console.log(`[UnifiedLanguageManager] Initialized with locale: ${this.currentLocale}`);
    }

    /**
     * Get current locale
     */
    getLocale() {
        return this.currentLocale;
    }

    /**
     * Set up the language selector
     */
    setupLanguageSelector() {
        // Try to find existing language selector
        let selector = document.getElementById('languageSelect');

        if (!selector) {
            // Try alternative IDs
            selector = document.getElementById('language-select') ||
                      document.getElementById('localeSelect') ||
                      document.getElementById('locale-select');
        }

        if (!selector) {
            console.log('[UnifiedLanguageManager] No language selector found, creating one...');
            this.createLanguageSelector();
        } else {
            // Update existing selector
            this.languageSelector = selector;
            this.updateSelectorOptions();
            this.languageSelector.value = this.currentLocale;
        }
    }

    /**
     * Create a language selector if none exists
     */
    createLanguageSelector() {
        // Find a suitable container
        let container = document.querySelector('.language-controls, .controls, .panel-content, .sidebar');

        if (!container) {
            // Create a floating language selector
            container = document.createElement('div');
            container.style.cssText = `
                position: fixed;
                top: 10px;
                left: 10px;
                background: white;
                padding: 10px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 10000;
            `;
            document.body.appendChild(container);
        }

        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <label for="languageSelect" style="margin-right: 10px;">Language:</label>
            <select id="languageSelect" style="padding: 5px; min-width: 150px;">
                ${Object.entries(this.supportedLocales).map(([code, name]) =>
                    `<option value="${code}">${name}</option>`
                ).join('')}
            </select>
        `;

        container.appendChild(wrapper);
        this.languageSelector = document.getElementById('languageSelect');
        this.languageSelector.value = this.currentLocale;
    }

    /**
     * Update selector options to ensure all languages are available
     */
    updateSelectorOptions() {
        if (!this.languageSelector) return;

        // Check if all languages are present
        const existingOptions = Array.from(this.languageSelector.options).map(opt => opt.value);

        Object.entries(this.supportedLocales).forEach(([code, name]) => {
            if (!existingOptions.includes(code)) {
                const option = document.createElement('option');
                option.value = code;
                option.textContent = name;
                this.languageSelector.appendChild(option);
            }
        });
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Listen to language selector changes
        if (this.languageSelector) {
            this.languageSelector.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }

        // Also listen for custom language change events
        document.addEventListener('languageChange', (e) => {
            if (e.detail && e.detail.locale) {
                this.changeLanguage(e.detail.locale);
            }
        });
    }

    /**
     * Change the current language
     */
    async changeLanguage(newLocale) {
        if (newLocale === this.currentLocale) return;

        console.log(`[UnifiedLanguageManager] Changing language from ${this.currentLocale} to ${newLocale}`);

        const oldLocale = this.currentLocale;
        this.currentLocale = newLocale;

        // Update URL without reloading
        const url = new URL(window.location);
        url.searchParams.set('locale', newLocale);
        window.history.replaceState({}, '', url);

        // Update selector if it exists
        if (this.languageSelector) {
            this.languageSelector.value = newLocale;
        }

        // Update global variable if it exists
        if (typeof window.currentLocale !== 'undefined') {
            window.currentLocale = newLocale;
        }

        // Reload all dynamic content
        await this.reloadAllContent();

        // Call all registered callbacks
        this.callbacks.forEach(callback => {
            try {
                callback(newLocale, oldLocale);
            } catch (error) {
                console.error('[UnifiedLanguageManager] Callback error:', error);
            }
        });

        // Dispatch custom event
        const event = new CustomEvent('localeChanged', {
            detail: { newLocale, oldLocale }
        });
        document.dispatchEvent(event);
    }

    /**
     * Reload all content that depends on locale
     */
    async reloadAllContent() {
        const promises = [];

        // 1. Reload borders and backgrounds using BulletproofLoader
        if (window.BulletproofLoader) {
            console.log('[UnifiedLanguageManager] Reloading borders and backgrounds...');

            // Store current selections
            const borderSelect = document.getElementById('borderThemeSelect');
            const bgSelect = document.getElementById('backgroundThemeSelect');
            const currentBorder = borderSelect ? borderSelect.value : 'none';
            const currentBg = bgSelect ? bgSelect.value : 'none';

            // Reinitialize BulletproofLoader with new locale
            promises.push(
                window.BulletproofLoader.init({
                    borderSelect: borderSelect,
                    backgroundSelect: bgSelect
                }).then(() => {
                    // Restore selections if they still exist
                    if (borderSelect && Array.from(borderSelect.options).some(opt => opt.value === currentBorder)) {
                        borderSelect.value = currentBorder;
                    }
                    if (bgSelect && Array.from(bgSelect.options).some(opt => opt.value === currentBg)) {
                        bgSelect.value = currentBg;
                    }
                    console.log('[UnifiedLanguageManager] Borders and backgrounds reloaded');
                })
            );
        }

        // 2. Reload image themes
        const themeSelect = document.getElementById('themeSelect') ||
                          document.getElementById('worksheetThemeSelect');
        if (themeSelect) {
            console.log('[UnifiedLanguageManager] Reloading image themes...');
            promises.push(this.reloadImageThemes(themeSelect));
        }

        // 3. Apply UI translations
        if (typeof applyTranslations === 'function') {
            console.log('[UnifiedLanguageManager] Applying UI translations...');
            applyTranslations();
        }

        // 4. Reload any cached content
        if (typeof window.allImagesCache !== 'undefined') {
            console.log('[UnifiedLanguageManager] Clearing image cache...');
            window.allImagesCache = {};
        }

        // Wait for all reloads to complete
        await Promise.all(promises);
        console.log('[UnifiedLanguageManager] All content reloaded successfully');
    }

    /**
     * Reload image themes with translations
     */
    async reloadImageThemes(themeSelect) {
        try {
            const currentTheme = themeSelect.value;

            const response = await fetch(`/api/themes-translated?locale=${this.currentLocale}`);
            if (!response.ok) {
                throw new Error('Failed to load themes');
            }

            const themes = await response.json();

            // Clear and repopulate
            themeSelect.innerHTML = '';

            // Add "All Themes" option
            const allOption = document.createElement('option');
            allOption.value = 'all';
            allOption.textContent = this.translate('allThemes', 'All Themes');
            themeSelect.appendChild(allOption);

            // Add theme options
            themes.forEach(theme => {
                const option = document.createElement('option');
                option.value = theme.value;
                option.textContent = theme.displayName || theme.value;
                themeSelect.appendChild(option);
            });

            // Restore selection if it still exists
            if (Array.from(themeSelect.options).some(opt => opt.value === currentTheme)) {
                themeSelect.value = currentTheme;
            } else {
                themeSelect.value = 'all';
            }

            // Trigger change event to reload images
            const event = new Event('change', { bubbles: true });
            themeSelect.dispatchEvent(event);

        } catch (error) {
            console.error('[UnifiedLanguageManager] Error reloading themes:', error);
        }
    }

    /**
     * Register a callback for language changes
     */
    onLanguageChange(callback) {
        this.callbacks.push(callback);
    }

    /**
     * Translate a key using the global translations object
     */
    translate(key, fallback = '') {
        if (typeof window.translations !== 'undefined' &&
            window.translations[this.currentLocale] &&
            window.translations[this.currentLocale][key]) {
            return window.translations[this.currentLocale][key];
        }
        return fallback || key;
    }

    /**
     * Get all supported locales
     */
    getSupportedLocales() {
        return this.supportedLocales;
    }
}

// Create singleton instance
window.UnifiedLanguageManager = new UnifiedLanguageManager();

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.UnifiedLanguageManager.init();
    });
} else {
    window.UnifiedLanguageManager.init();
}

// Make locale globally available
window.getUnifiedLocale = () => window.UnifiedLanguageManager.getLocale();

console.log('📚 UnifiedLanguageManager loaded - handles all language switching automatically');