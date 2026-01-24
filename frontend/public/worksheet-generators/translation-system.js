/**
 * Complete Translation System for Worksheet Generators
 *
 * This system provides:
 * 1. Comprehensive text detection from all sources
 * 2. Safe JavaScript-aware translation application
 * 3. Dynamic runtime translation without page reload
 * 4. Validation and completeness checking
 */

class WorksheetTranslationSystem {
    constructor() {
        this.currentLocale = 'en';
        this.translations = {};
        this.elementCache = new Map();
        this.dynamicTextHandlers = new Map();
        this.initialized = false;

        // Common UI text patterns found in worksheet generators
        this.uiTextMappings = {
            // Headers and Titles
            'Word Search Settings': 'word_search_settings',
            'Wortsuch-Einstellungen': 'word_search_settings',
            'Puzzle Settings': 'puzzle_settings',
            'Display Settings': 'display_settings',
            'Image Library': 'image_library',
            'Border & Background': 'border_background',
            'Worksheet Settings': 'worksheet_settings',
            'Math Settings': 'math_settings',
            'Game Settings': 'game_settings',
            'Word Search': 'word_search',
            'Page & Scene': 'page_scene',
            'Page Setup': 'page_setup',
            'Text Tools': 'text_tools',
            'Select Language': 'select_language',
            'Upload Custom Images': 'upload_custom_images',

            // Buttons
            'Generate': 'generate',
            'Download': 'download',
            'Print': 'print',
            'Clear': 'clear',
            'Reset': 'reset',
            'New Worksheet': 'new_worksheet',
            'Answer Key': 'answer_key',
            'Save': 'save',
            'Load': 'load',
            'Apply': 'apply',
            'Cancel': 'cancel',
            'Close': 'close',
            'Add': 'add',
            'Remove': 'remove',
            'Delete': 'delete',
            'Edit': 'edit',
            'Copy': 'copy',
            'Paste': 'paste',
            'Undo': 'undo',
            'Redo': 'redo',

            // Labels and accordion content
            'Rows': 'rows',
            'Columns': 'columns',
            'Rows:': 'rows_label',
            'Columns:': 'columns_label',
            'Language:': 'language_label',
            'Page Size:': 'page_size_label',
            'Width (px):': 'width_px',
            'Height (px):': 'height_px',
            'Fallback Color:': 'fallback_color',
            'Background Theme:': 'background_theme_label',
            'Border Theme:': 'border_theme_label',
            'Background Opacity:': 'background_opacity_label',
            'Border Opacity:': 'border_opacity_label',
            'Content:': 'content_label',
            'Color:': 'color_label',
            'Size:': 'size_label',
            'Font:': 'font_label',
            'Outline Color:': 'outline_color_label',
            'Outline (0-10):': 'outline_0_10',
            'Theme:': 'theme_label',
            'Filter by Theme:': 'filter_by_theme',
            'Search Images:': 'search_images_label',
            'Select image(s) to upload:': 'select_images_to_upload',
            'Grid Size': 'grid_size',
            'Font Size': 'font_size',
            'Theme': 'theme',
            'Select Theme': 'select_theme',
            'Difficulty': 'difficulty',
            'Language': 'language',
            'Words': 'words',
            'Images': 'images',
            'Selected Images': 'selected_images',
            'Search Images': 'search_images',
            'Number of Problems': 'number_of_problems',
            'Maximum Number': 'maximum_number',
            'Minimum Number': 'minimum_number',
            'Operation': 'operation',
            'Style': 'style',
            'Color': 'color',
            'Size': 'size',
            'Width': 'width',
            'Height': 'height',
            'Opacity': 'opacity',
            'Scale': 'scale',
            'Rotation': 'rotation',
            'Position': 'position',

            // Options
            'Easy': 'easy',
            'Medium': 'medium',
            'Hard': 'hard',
            'Custom': 'custom',
            'None': 'none',
            'Keine': 'none',
            'Random': 'random',
            'All': 'all',
            'Selected': 'selected',
            'Letter Portrait (8.5×11")': 'letter_portrait_8_5x11',
            'Letter Landscape (11×8.5")': 'letter_landscape_11x8_5',
            'A4 Portrait (210×297mm)': 'a4_portrait_210x297mm',
            'A4 Landscape (297×210mm)': 'a4_landscape_297x210mm',
            'None (Use Fallback Color)': 'none_use_fallback_color',
            '-- Use Random Theme --': 'use_random_theme',
            'All Themes (Randomly)': 'all_themes_randomly',
            'All Themes (for search)': 'all_themes_for_search',
            'e.g., apple, car': 'search_placeholder',
            'Hello!': 'hello_placeholder',
            'Add Text': 'add_text_button',
            'Upload Images': 'upload_images_button',
            'Max. 50 images': 'max_50_images',
            'JPG, PNG, GIF, WEBP': 'supported_formats',
            'Apply Size': 'apply_size',
            'Fallback Color': 'fallback_color',
            'Background Theme': 'background_theme',
            'Border Theme': 'border_theme',
            'Background Opacity': 'background_opacity',
            'Border Opacity': 'border_opacity',
            'Page Size': 'page_size',
            'Puzzle-Einstellungen': 'puzzle_settings',
            'Bilderbibliothek': 'image_library',
            'Deutsch (German)': 'deutsch_german',
            'Français (French)': 'francais_french',
            'Español (Spanish)': 'espanol_spanish',
            'Português (Portuguese)': 'portugues_portuguese',
            'Italiano (Italian)': 'italiano_italian',
            'Nederlands (Dutch)': 'nederlands_dutch',
            'Svenska (Swedish)': 'svenska_swedish',
            'Dansk (Danish)': 'dansk_danish',
            'Norsk (Norwegian)': 'norsk_norwegian',
            'Suomi (Finnish)': 'suomi_finnish',
            'Image names and themes will be displayed in the selected language.': 'image_names_and_themes_will_be_displayed',
            'Select a theme for backgrounds.': 'select_a_theme_for_backgrounds',
            'Select a theme to see borders.': 'select_a_theme_to_see_borders',

            
            // Missing UI text mappings (detected by UI Text Detector)
            'Puzzle Options': 'puzzle_options',
            'Allow Diagonal Words': 'allow_diagonal_words',
            'Allow Reverse Words': 'allow_reverse_words',
            'Show Word/Image List': 'show_word_image_list',
            'Grid Size': 'grid_size',
            'Image Source for Puzzle': 'image_source_for_puzzle',
            'Individual Image Selection': 'individual_image_selection',
            'Available Images (max 8):': 'available_images_max_8',
            'Selected Images:': 'selected_images_label',
            'Your Uploaded Images (This Session):': 'your_uploaded_images_this_session',
            'Your uploaded images will appear here.': 'your_uploaded_images_will_appear_here',
            'Choose files': 'choose_files',
            'No file chosen': 'no_file_chosen',
            'Upload Images': 'upload_images',
            'Clear All': 'clear_all',
            'Worksheet': 'worksheet_tab',
            'Answer Key': 'answer_key_tab_name',

            // Final missing UI text mappings
            'Background': 'background_heading',
            'Border': 'border_heading',
            'Choose files': 'choose_files_button',
            'No file chosen': 'no_file_chosen_text',
            'Grayscale': 'grayscale',
            'Worksheet generated successfully!': 'worksheet_generated_successfully',
            'Answer key generated!': 'answer_key_generated',
            'Please generate a worksheet first.': 'please_generate_worksheet_first',
            'All settings cleared.': 'all_settings_cleared',
            'Please wait for themes to load...': 'please_wait_for_themes',
            'No images selected or available to generate the puzzle.': 'no_images_selected_or_available',
            'Failed to place any words. Try a larger grid or different words.': 'failed_to_place_words',
            'Please generate content first.': 'please_generate_content_first',
            'Preparing JPEG...': 'preparing_jpeg',
            'JPEG download initiated!': 'jpeg_download_initiated',
            'Error preparing JPEG.': 'error_preparing_jpeg',
            'Preparing PDF...': 'preparing_pdf',
            'PDF downloaded!': 'pdf_downloaded',
            'Error creating PDF.': 'error_creating_pdf',

            // Final missing UI text mappings
            'Background': 'background_heading',
            'Border': 'border_heading',
            'Choose files': 'choose_files_button',
            'No file chosen': 'no_file_chosen_text',
            'Grayscale': 'grayscale',
            'Worksheet generated successfully!': 'worksheet_generated_successfully',
            'Answer key generated!': 'answer_key_generated',
            'Please generate a worksheet first.': 'please_generate_worksheet_first',
            'All settings cleared.': 'all_settings_cleared',
            'Please wait for themes to load...': 'please_wait_for_themes',
            'No images selected or available to generate the puzzle.': 'no_images_selected_or_available',
            'Failed to place any words. Try a larger grid or different words.': 'failed_to_place_words',
            'Please generate content first.': 'please_generate_content_first',
            'Preparing JPEG...': 'preparing_jpeg',
            'JPEG download initiated!': 'jpeg_download_initiated',
            'Error preparing JPEG.': 'error_preparing_jpeg',
            'Preparing PDF...': 'preparing_pdf',
            'PDF downloaded!': 'pdf_downloaded',
            'Error creating PDF.': 'error_creating_pdf',

            // Messages
            'Please select at least': 'please_select_at_least',
            'Please generate a worksheet first': 'please_generate_worksheet_first',
            'Loading...': 'loading',
            'Error loading': 'error_loading',
            'Success': 'success',
            'Failed to': 'failed_to',
            'Are you sure': 'are_you_sure',
            'Click to select': 'click_to_select',
            'Drag to reorder': 'drag_to_reorder',

            // Download options
            'Worksheet (JPEG)': 'worksheet_jpeg',
            'Answer Key (JPEG)': 'answer_key_jpeg',
            'Worksheet (PDF)': 'worksheet_pdf',
            'Answer Key (PDF)': 'answer_key_pdf',
            'Both Pages (PDF)': 'both_pages_pdf',

            // Math operations
            'Addition': 'addition',
            'Subtraction': 'subtraction',
            'Multiplication': 'multiplication',
            'Division': 'division',
            'Mixed': 'mixed',

            // Themes
            'Animals': 'animals',
            'Food': 'food',
            'School': 'school',
            'Nature': 'nature',
            'Sports': 'sports',
            'Transportation': 'transportation',
            'Holidays': 'holidays',
            'Seasons': 'seasons',
            'Colors': 'colors',
            'Shapes': 'shapes',
            'Numbers': 'numbers',
            'Letters': 'letters'
        };
    }

    /**
     * Initialize the translation system
     */
    async init() {
        if (this.initialized) return;

        // Get current locale
        const urlParams = new URLSearchParams(window.location.search);
        this.currentLocale = urlParams.get('locale') || window.currentLocale || 'en';

        // Load translations
        await this.loadTranslations();

        // Apply initial translations
        this.applyTranslations();

        // Set up mutation observer for dynamic content
        this.setupMutationObserver();

        // Set up event delegation for dynamic elements
        this.setupEventDelegation();

        this.initialized = true;
        console.log(`[TranslationSystem] Initialized with locale: ${this.currentLocale}`);
    }

    /**
     * Load translations from translations.js or API
     */
    async loadTranslations() {
        try {
            // Try to use existing translations object
            if (typeof translations !== 'undefined') {
                this.translations = translations;
            } else {
                // Load from file
                const response = await fetch('/worksheet-generators/js/translations.js');
                const text = await response.text();

                // Extract translations object from file
                const match = text.match(/const translations = ({[\s\S]*});/);
                if (match) {
                    this.translations = eval('(' + match[1] + ')');
                }
            }

            // Ensure we have translations for current locale
            if (!this.translations[this.currentLocale]) {
                console.warn(`No translations for locale: ${this.currentLocale}`);
                this.translations[this.currentLocale] = {};
            }
        } catch (error) {
            console.error('Failed to load translations:', error);
            this.translations = { en: {} };
        }
    }

    /**
     * Apply translations to the entire document
     */
    applyTranslations() {
        const startTime = performance.now();

        // Translate static HTML elements
        this.translateHTMLElements();

        // Translate attributes
        this.translateAttributes();

        // Register dynamic text handlers
        this.registerDynamicHandlers();

        const endTime = performance.now();
        console.log(`[TranslationSystem] Applied translations in ${(endTime - startTime).toFixed(2)}ms`);
    }

    /**
     * Translate HTML elements with text content
     */
    translateHTMLElements() {
        // Get all elements that might contain translatable text
        const selectors = [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'button', 'label', 'span', 'p', 'div',
            'option', 'a', 'li', 'td', 'th'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                // Skip if element has children (to avoid replacing nested HTML)
                if (element.children.length > 0 && selector !== 'button' && selector !== 'label') {
                    return;
                }

                const text = element.textContent.trim();
                if (text && this.uiTextMappings[text]) {
                    const key = this.uiTextMappings[text];
                    const translation = this.getTranslation(key);
                    if (translation && translation !== text) {
                        // Preserve any HTML inside buttons/labels
                        if (element.children.length > 0) {
                            const textNode = Array.from(element.childNodes).find(
                                node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
                            );
                            if (textNode) {
                                textNode.textContent = translation;
                            }
                        } else {
                            element.textContent = translation;
                        }

                        // Cache for future updates
                        this.elementCache.set(element, key);
                    }
                }
            });
        });
    }

    /**
     * Translate attributes (title, alt, placeholder, etc.)
     */
    translateAttributes() {
        const attributes = ['title', 'alt', 'placeholder', 'data-tooltip', 'aria-label'];

        attributes.forEach(attr => {
            document.querySelectorAll(`[${attr}]`).forEach(element => {
                const value = element.getAttribute(attr);
                if (value && this.uiTextMappings[value]) {
                    const key = this.uiTextMappings[value];
                    const translation = this.getTranslation(key);
                    if (translation && translation !== value) {
                        element.setAttribute(attr, translation);
                    }
                }
            });
        });
    }

    /**
     * Register handlers for dynamically generated text
     */
    registerDynamicHandlers() {
        // Override showMessage if it exists
        if (typeof window.showMessage === 'function') {
            const originalShowMessage = window.showMessage;
            window.showMessage = (message, type) => {
                const translatedMessage = this.translateDynamicText(message);
                originalShowMessage(translatedMessage, type);
            };
        }

        // Override alert
        const originalAlert = window.alert;
        window.alert = (message) => {
            const translatedMessage = this.translateDynamicText(message);
            originalAlert(translatedMessage);
        };

        // Override confirm
        const originalConfirm = window.confirm;
        window.confirm = (message) => {
            const translatedMessage = this.translateDynamicText(message);
            return originalConfirm(translatedMessage);
        };
    }

    /**
     * Translate dynamic text at runtime
     */
    translateDynamicText(text) {
        if (!text) return text;

        // Check if it's a known UI text
        if (this.uiTextMappings[text]) {
            return this.getTranslation(this.uiTextMappings[text]) || text;
        }

        // Try to find partial matches and replace them
        let translatedText = text;
        Object.entries(this.uiTextMappings).forEach(([original, key]) => {
            if (text.includes(original)) {
                const translation = this.getTranslation(key) || original;
                translatedText = translatedText.replace(original, translation);
            }
        });

        return translatedText;
    }

    /**
     * Get translation for a key
     */
    getTranslation(key) {
        const localeTranslations = this.translations[this.currentLocale] || {};
        return localeTranslations[key] ||
               (this.translations.en && this.translations.en[key]) ||
               null;
    }

    /**
     * Set up mutation observer to handle dynamically added content
     */
    setupMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.translateElement(node);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Translate a single element and its children
     */
    translateElement(element) {
        // Translate the element itself
        const text = element.textContent?.trim();
        if (text && this.uiTextMappings[text]) {
            const key = this.uiTextMappings[text];
            const translation = this.getTranslation(key);
            if (translation && translation !== text) {
                element.textContent = translation;
            }
        }

        // Translate attributes
        ['title', 'alt', 'placeholder'].forEach(attr => {
            const value = element.getAttribute(attr);
            if (value && this.uiTextMappings[value]) {
                const key = this.uiTextMappings[value];
                const translation = this.getTranslation(key);
                if (translation) {
                    element.setAttribute(attr, translation);
                }
            }
        });

        // Recursively translate children
        element.querySelectorAll('*').forEach(child => {
            this.translateElement(child);
        });
    }

    /**
     * Set up event delegation for dynamic content
     */
    setupEventDelegation() {
        // Listen for language changes
        document.addEventListener('languageChanged', async (e) => {
            this.currentLocale = e.detail.locale;
            await this.loadTranslations();
            this.applyTranslations();
        });
    }

    /**
     * Change language dynamically
     */
    async changeLanguage(locale) {
        this.currentLocale = locale;
        await this.loadTranslations();
        this.applyTranslations();

        // Dispatch event for other systems
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { locale }
        }));
    }

    /**
     * Add new translations at runtime
     */
    addTranslations(key, translations) {
        Object.entries(translations).forEach(([locale, text]) => {
            if (!this.translations[locale]) {
                this.translations[locale] = {};
            }
            this.translations[locale][key] = text;
        });

        // Also add to mapping if English text is provided
        if (translations.en) {
            this.uiTextMappings[translations.en] = key;
        }
    }

    /**
     * Get missing translations report
     */
    getMissingTranslations() {
        const missing = [];
        const englishKeys = Object.keys(this.translations.en || {});
        const locales = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

        locales.forEach(locale => {
            if (!this.translations[locale]) {
                this.translations[locale] = {};
            }

            englishKeys.forEach(key => {
                if (!this.translations[locale][key]) {
                    missing.push({
                        locale,
                        key,
                        englishText: this.translations.en[key]
                    });
                }
            });
        });

        return missing;
    }

    /**
     * Validate translation completeness
     */
    validateCompleteness() {
        const report = {
            totalKeys: Object.keys(this.translations.en || {}).length,
            coverage: {},
            missing: {}
        };

        const locales = Object.keys(this.translations);
        locales.forEach(locale => {
            if (locale === 'en') return;

            const localeKeys = Object.keys(this.translations[locale] || {});
            report.coverage[locale] = (localeKeys.length / report.totalKeys * 100).toFixed(2) + '%';

            const missing = [];
            Object.keys(this.translations.en || {}).forEach(key => {
                if (!this.translations[locale] || !this.translations[locale][key]) {
                    missing.push(key);
                }
            });

            if (missing.length > 0) {
                report.missing[locale] = missing;
            }
        });

        return report;
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.worksheetTranslationSystem = new WorksheetTranslationSystem();
        window.worksheetTranslationSystem.init();
    });
} else {
    window.worksheetTranslationSystem = new WorksheetTranslationSystem();
    window.worksheetTranslationSystem.init();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorksheetTranslationSystem;
}