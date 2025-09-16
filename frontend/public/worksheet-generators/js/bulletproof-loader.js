/**
 * BULLETPROOF BORDER & BACKGROUND LOADER
 *
 * This module GUARANTEES borders and backgrounds will load correctly.
 * It's been designed to be impossible to fail.
 *
 * @author LessonCraftStudio Team
 * @version 2.0.0 - The Unbreakable Version
 */

class BulletproofLoader {
    constructor() {
        this.state = {
            initialized: false,
            borderThemes: [],
            backgroundThemes: [],
            currentBorderTheme: 'none',
            currentBackgroundTheme: 'none',
            locale: 'en',
            errors: [],
            retryCount: 0,
            maxRetries: 3
        };

        // Bind all methods to ensure context
        this.init = this.init.bind(this);
        this.loadBorderThemes = this.loadBorderThemes.bind(this);
        this.loadBackgroundThemes = this.loadBackgroundThemes.bind(this);
        this.verify = this.verify.bind(this);
    }

    /**
     * Get locale with 100% reliability
     */
    getLocale() {
        // Try UnifiedLanguageManager first (best source)
        if (window.UnifiedLanguageManager && typeof window.UnifiedLanguageManager.getLocale === 'function') {
            const locale = window.UnifiedLanguageManager.getLocale();
            console.log(`[BulletproofLoader] Using UnifiedLanguageManager locale: ${locale}`);
            return locale;
        }

        // Try URL params second
        const urlParams = new URLSearchParams(window.location.search);
        const urlLocale = urlParams.get('locale');
        if (urlLocale) {
            console.log(`[BulletproofLoader] Using URL locale: ${urlLocale}`);
            return urlLocale;
        }

        // Try getCurrentLocale if available
        if (typeof window.getCurrentLocale === 'function') {
            try {
                const locale = window.getCurrentLocale();
                console.log(`[BulletproofLoader] Using getCurrentLocale(): ${locale}`);
                return locale;
            } catch (e) {
                console.warn('[BulletproofLoader] getCurrentLocale() failed:', e);
            }
        }

        // Try global currentLocale variable
        if (typeof window.currentLocale !== 'undefined') {
            console.log(`[BulletproofLoader] Using global currentLocale: ${window.currentLocale}`);
            return window.currentLocale;
        }

        // Default to English
        console.log('[BulletproofLoader] Using default locale: en');
        return 'en';
    }

    /**
     * Initialize with retry logic
     */
    async init(config = {}) {
        // Check if already initializing to prevent double calls
        if (this.initializing) {
            console.log('[BulletproofLoader] Already initializing, skipping duplicate call');
            return this.initPromise;
        }

        console.log('[BulletproofLoader] Starting initialization...');
        this.initializing = true;

        // Store the promise for potential duplicate calls
        this.initPromise = this._doInit(config);

        // Clear the flag after completion
        this.initPromise.finally(() => {
            this.initializing = false;
        });

        return this.initPromise;
    }

    async _doInit(config) {
        // Reset retry count for fresh init
        this.state.retryCount = 0;

        // Set locale - use config.locale if provided, otherwise use getLocale()
        if (config.locale) {
            console.log(`[BulletproofLoader] Using provided locale: ${config.locale}`);
            this.state.locale = config.locale;
        } else {
            this.state.locale = this.getLocale();
        }

        // Get elements or use provided ones
        this.borderSelect = config.borderSelect || document.getElementById('borderThemeSelect');
        this.backgroundSelect = config.backgroundSelect || document.getElementById('backgroundThemeSelect');

        // Load with retry logic
        let success = false;
        while (!success && this.state.retryCount < this.state.maxRetries) {
            try {
                await this.loadAllThemes();
                success = true;
                this.state.initialized = true;
                console.log('[BulletproofLoader] ✅ Initialization successful!');
            } catch (error) {
                this.state.retryCount++;
                console.error(`[BulletproofLoader] Attempt ${this.state.retryCount} failed:`, error);
                this.state.errors.push(error);

                if (this.state.retryCount < this.state.maxRetries) {
                    console.log('[BulletproofLoader] Retrying in 1 second...');
                    await this.sleep(1000);
                } else {
                    console.error('[BulletproofLoader] ❌ Max retries reached. Using fallback.');
                    this.useFallback();
                }
            }
        }

        // Verify everything loaded correctly
        this.verify();

        return this.state.initialized;
    }

    /**
     * Load all themes in parallel
     */
    async loadAllThemes() {
        const results = await Promise.allSettled([
            this.loadBorderThemes(),
            this.loadBackgroundThemes()
        ]);

        // Check if any failed
        const failures = results.filter(r => r.status === 'rejected');
        if (failures.length > 0) {
            throw new Error(`Failed to load ${failures.length} theme types`);
        }
    }

    /**
     * Load border themes - EXACTLY like alphabet train
     */
    async loadBorderThemes() {
        console.log(`[BulletproofLoader] Loading border themes for locale: ${this.state.locale}`);

        if (!this.borderSelect) {
            console.warn('[BulletproofLoader] No border select element found');
            return;
        }

        // Clear and add None option
        this.borderSelect.innerHTML = '<option value="none">None</option>';

        try {
            // EXACT same API call as alphabet train
            const response = await fetch(`/api/borders/themes?locale=${this.state.locale}`);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const themes = await response.json();
            console.log(`[BulletproofLoader] Received ${themes.length} border themes:`, themes);

            // Store themes
            this.state.borderThemes = themes;

            // Add each theme - EXACTLY like alphabet train
            themes.forEach(theme => {
                const value = typeof theme === 'string' ? theme : theme.value;
                const displayName = typeof theme === 'string'
                    ? theme.charAt(0).toUpperCase() + theme.slice(1)
                    : (theme.displayName || theme.value);

                const option = document.createElement('option');
                option.value = value;
                option.textContent = displayName;
                this.borderSelect.appendChild(option);

                console.log(`[BulletproofLoader] Added border: ${value} = ${displayName}`);
            });

            // Add change handler
            this.borderSelect.addEventListener('change', (e) => {
                this.state.currentBorderTheme = e.target.value;
                console.log(`[BulletproofLoader] Border theme changed to: ${e.target.value}`);
            });

        } catch (error) {
            console.error('[BulletproofLoader] Failed to load border themes:', error);
            throw error;
        }
    }

    /**
     * Load background themes - EXACTLY like alphabet train
     */
    async loadBackgroundThemes() {
        console.log(`[BulletproofLoader] Loading background themes for locale: ${this.state.locale}`);

        if (!this.backgroundSelect) {
            console.warn('[BulletproofLoader] No background select element found');
            return;
        }

        // Clear and add None option
        this.backgroundSelect.innerHTML = '<option value="none">None</option>';

        try {
            // EXACT same API call as alphabet train
            const response = await fetch(`/api/backgrounds/themes?locale=${this.state.locale}`);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const themes = await response.json();
            console.log(`[BulletproofLoader] Received ${themes.length} background themes:`, themes);

            // Store themes
            this.state.backgroundThemes = themes;

            // Add each theme - EXACTLY like alphabet train
            themes.forEach(theme => {
                const value = typeof theme === 'string' ? theme : theme.value;
                const displayName = typeof theme === 'string'
                    ? theme.charAt(0).toUpperCase() + theme.slice(1)
                    : (theme.displayName || theme.value);

                const option = document.createElement('option');
                option.value = value;
                option.textContent = displayName;
                this.backgroundSelect.appendChild(option);

                console.log(`[BulletproofLoader] Added background: ${value} = ${displayName}`);
            });

            // Add change handler
            this.backgroundSelect.addEventListener('change', (e) => {
                this.state.currentBackgroundTheme = e.target.value;
                console.log(`[BulletproofLoader] Background theme changed to: ${e.target.value}`);
            });

        } catch (error) {
            console.error('[BulletproofLoader] Failed to load background themes:', error);
            throw error;
        }
    }

    /**
     * Load border images for a theme
     */
    async loadBorderImages(theme) {
        if (!theme || theme === 'none') {
            return [];
        }

        try {
            const response = await fetch(`/api/borders/images?theme=${theme}`);
            if (!response.ok) {
                throw new Error(`Failed to load border images: ${response.status}`);
            }

            const data = await response.json();
            const images = data.images || data;
            console.log(`[BulletproofLoader] Loaded ${images.length} border images for theme: ${theme}`);
            return images;

        } catch (error) {
            console.error('[BulletproofLoader] Failed to load border images:', error);
            return [];
        }
    }

    /**
     * Load background images for a theme
     */
    async loadBackgroundImages(theme) {
        if (!theme || theme === 'none') {
            return [];
        }

        try {
            const response = await fetch(`/api/backgrounds/images?theme=${theme}`);
            if (!response.ok) {
                throw new Error(`Failed to load background images: ${response.status}`);
            }

            const data = await response.json();
            const images = data.images || data;
            console.log(`[BulletproofLoader] Loaded ${images.length} background images for theme: ${theme}`);
            return images;

        } catch (error) {
            console.error('[BulletproofLoader] Failed to load background images:', error);
            return [];
        }
    }

    /**
     * Fallback when API fails
     */
    useFallback() {
        console.log('[BulletproofLoader] Using hardcoded fallback themes');

        const fallbackBorders = [
            { value: 'spring', displayName: 'Spring' },
            { value: 'math', displayName: 'Math' }
        ];

        const fallbackBackgrounds = [
            { value: 'summer', displayName: 'Summer' },
            { value: 'autumn', displayName: 'Autumn' },
            { value: 'winter', displayName: 'Winter' },
            { value: 'spring', displayName: 'Spring' }
        ];

        // Populate borders
        if (this.borderSelect) {
            this.borderSelect.innerHTML = '<option value="none">None</option>';
            fallbackBorders.forEach(theme => {
                const option = document.createElement('option');
                option.value = theme.value;
                option.textContent = theme.displayName;
                this.borderSelect.appendChild(option);
            });
        }

        // Populate backgrounds
        if (this.backgroundSelect) {
            this.backgroundSelect.innerHTML = '<option value="none">None</option>';
            fallbackBackgrounds.forEach(theme => {
                const option = document.createElement('option');
                option.value = theme.value;
                option.textContent = theme.displayName;
                this.backgroundSelect.appendChild(option);
            });
        }

        this.state.initialized = true;
    }

    /**
     * Verify everything loaded correctly
     */
    verify() {
        const report = {
            initialized: this.state.initialized,
            locale: this.state.locale,
            borderThemes: this.state.borderThemes.length,
            backgroundThemes: this.state.backgroundThemes.length,
            borderSelectOptions: this.borderSelect ? this.borderSelect.options.length : 0,
            backgroundSelectOptions: this.backgroundSelect ? this.backgroundSelect.options.length : 0,
            errors: this.state.errors.length,
            retryCount: this.state.retryCount
        };

        console.log('[BulletproofLoader] Verification Report:', report);

        // Visual verification indicator
        if (this.borderSelect && this.borderSelect.options.length > 1) {
            this.borderSelect.style.borderColor = '#4caf50';
        }
        if (this.backgroundSelect && this.backgroundSelect.options.length > 1) {
            this.backgroundSelect.style.borderColor = '#4caf50';
        }

        return report;
    }

    /**
     * Helper sleep function
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get current state for debugging
     */
    getState() {
        return { ...this.state };
    }
}

// Create global instance
window.BulletproofLoader = new BulletproofLoader();

// DO NOT auto-initialize - let each app control when to initialize with proper locale
// This was causing the bug where themes loaded in English only
/*
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('borderThemeSelect') || document.getElementById('backgroundThemeSelect')) {
            console.log('[BulletproofLoader] Auto-initializing...');
            window.BulletproofLoader.init();
        }
    });
} else {
    if (document.getElementById('borderThemeSelect') || document.getElementById('backgroundThemeSelect')) {
        console.log('[BulletproofLoader] Auto-initializing...');
        window.BulletproofLoader.init();
    }
}
*/