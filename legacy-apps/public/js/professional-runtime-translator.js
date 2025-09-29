/**
 * PROFESSIONAL RUNTIME TRANSLATION SYSTEM
 *
 * This system translates the UI without modifying any source files.
 * It intercepts text at runtime and applies translations transparently.
 *
 * @author Senior Web Architect
 * @version 2.0.0
 */

(function() {
    'use strict';

    class ProfessionalRuntimeTranslator {
        constructor() {
            this.currentLocale = window.currentLocale || 'en';
            this.translations = window.translations || {};
            this.textMappings = new Map();
            this.initialized = false;
            this.translatedElements = new WeakSet();
            this.originalMethods = {};

            // Initialize text mappings
            this.initializeTextMappings();

            // Start the system
            this.initialize();
        }

        /**
         * Initialize all text mappings based on our detection
         */
        initializeTextMappings() {
            // Critical texts that MUST translate
            const criticalMappings = {
                'Background': 'background_heading',
                'Border': 'border_heading',
                'Grayscale': 'grayscale',
                'Choose files': 'choose_files_button',
                'No file chosen': 'no_file_chosen_text',
                'Select Language': 'select_language_heading',
                'Page Setup': 'page_setup_heading',
                'Add New Text': 'add_new_text_heading',
                'Selected Text Properties': 'selected_text_properties',
                'Grid Size': 'grid_size_heading',
                'Puzzle Options': 'puzzle_options_heading',
                'Image Source for Puzzle': 'image_source_heading',
                'Individual Image Selection': 'individual_selection_heading',
                'Allow Diagonal Words': 'allow_diagonal_words',
                'Allow Reverse Words': 'allow_reverse_words',
                'Show Word/Image List': 'show_word_image_list',
                'Worksheet generated successfully!': 'worksheet_generated_successfully',
                'Answer key generated!': 'answer_key_generated',
                'Please generate a worksheet first.': 'please_generate_worksheet_first',
                'All settings cleared.': 'all_settings_cleared',
                'Please wait for themes to load...': 'please_wait_for_themes',
                'No images selected or available to generate the puzzle.': 'no_images_selected_or_available',
                'Failed to place any words. Try a larger grid or different words.': 'failed_to_place_words'
            };

            // Additional UI texts from our analysis
            const additionalMappings = {
                // Buttons
                'Worksheet': 'worksheet_tab',
                'Answer Key': 'answer_key_tab',
                'Clear All': 'clear_all',
                'Add Text': 'add_text',
                'Apply Size': 'apply_size',
                'Bring Forward': 'bring_forward',
                'Send Backward': 'send_backward',
                'New Worksheet': 'new_worksheet',
                'Word Search': 'word_search',
                'Image Library': 'image_library',
                'Upload Custom Images': 'upload_custom_images',
                'Page & Scene': 'page_scene',
                'Text Tools': 'text_tools',
                'Puzzle Settings': 'puzzle_settings',
                'Worksheet (PDF)': 'worksheet_pdf',
                'Worksheet (JPEG)': 'worksheet_jpeg',
                'Answer Key (PDF)': 'answer_key_pdf',
                'Answer Key (JPEG)': 'answer_key_jpeg',

                // Labels
                'Theme:': 'theme_label',
                'Page Size:': 'page_size_label',
                'Width (px):': 'width_px_label',
                'Height (px):': 'height_px_label',
                'Rows:': 'rows_label',
                'Columns:': 'columns_label',
                'Font:': 'font_label',
                'Size:': 'size_label',
                'Color:': 'color_label',
                'Content:': 'content_label',
                'Border Theme:': 'border_theme_label',
                'Background Theme:': 'background_theme_label',
                'Border Opacity:': 'border_opacity_label',
                'Background Opacity:': 'background_opacity_label',
                'Available Images (max 8):': 'available_images_max_8',
                'Selected Images:': 'selected_images_label',
                'Your Uploaded Images (This Session):': 'your_uploaded_images_this_session',
                'Filter by Theme:': 'filter_by_theme_label',
                'Search Images:': 'search_images_label',
                'Outline (0-10):': 'outline_label',
                'Outline Color:': 'outline_color_label',
                'Fallback Color:': 'fallback_color_label'
            };

            // Merge all mappings
            Object.entries({...criticalMappings, ...additionalMappings}).forEach(([text, key]) => {
                this.textMappings.set(text, key);
            });
        }

        /**
         * Initialize the runtime translation system
         */
        initialize() {
            if (this.initialized) return;

            console.log('[PRT] Initializing Professional Runtime Translator...');

            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.start());
            } else {
                this.start();
            }

            this.initialized = true;
        }

        /**
         * Start all translation mechanisms
         */
        start() {
            // 1. Translate existing DOM
            this.translateExistingDOM();

            // 2. Intercept future DOM modifications
            this.interceptDOMModifications();

            // 3. Intercept JavaScript string methods
            this.interceptStringMethods();

            // 4. Setup mutation observer
            this.setupMutationObserver();

            // 5. Intercept native dialogs
            this.interceptDialogs();

            // 6. Override showMessage if it exists
            this.overrideShowMessage();

            // 7. Handle file inputs
            this.handleFileInputs();

            console.log(`[PRT] ✅ Runtime Translator initialized for locale: ${this.currentLocale}`);
        }

        /**
         * Translate all existing DOM elements
         */
        translateExistingDOM() {
            // Translate all text nodes
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
                null,
                false
            );

            let node;
            while (node = walker.nextNode()) {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent.trim();
                    if (text) {
                        const translated = this.translateText(text);
                        if (translated !== text) {
                            node.textContent = translated;
                        }
                    }
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    this.translateElement(node);
                }
            }
        }

        /**
         * Translate a single element
         */
        translateElement(element) {
            // Skip if already translated
            if (this.translatedElements.has(element)) return;

            // Translate attributes
            ['placeholder', 'title', 'alt', 'value', 'aria-label'].forEach(attr => {
                if (element.hasAttribute(attr)) {
                    const text = element.getAttribute(attr);
                    const translated = this.translateText(text);
                    if (translated !== text) {
                        element.setAttribute(attr, translated);
                    }
                }
            });

            // Special handling for buttons with value
            if (element.tagName === 'INPUT' && (element.type === 'button' || element.type === 'submit')) {
                const text = element.value;
                const translated = this.translateText(text);
                if (translated !== text) {
                    element.value = translated;
                }
            }

            // Mark as translated
            this.translatedElements.add(element);
        }

        /**
         * Intercept DOM modification methods
         */
        interceptDOMModifications() {
            const self = this;

            // Intercept textContent
            const originalTextContent = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
            Object.defineProperty(Node.prototype, 'textContent', {
                get: originalTextContent.get,
                set: function(value) {
                    const translated = self.translateText(value);
                    return originalTextContent.set.call(this, translated);
                }
            });

            // Intercept innerText
            const originalInnerText = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerText');
            if (originalInnerText) {
                Object.defineProperty(HTMLElement.prototype, 'innerText', {
                    get: originalInnerText.get,
                    set: function(value) {
                        const translated = self.translateText(value);
                        return originalInnerText.set.call(this, translated);
                    }
                });
            }

            // Intercept innerHTML (careful with this one)
            const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
            Object.defineProperty(Element.prototype, 'innerHTML', {
                get: originalInnerHTML.get,
                set: function(value) {
                    // Only translate if it's plain text (no HTML tags)
                    if (value && typeof value === 'string' && !/<[^>]+>/.test(value)) {
                        value = self.translateText(value);
                    }
                    return originalInnerHTML.set.call(this, value);
                }
            });
        }

        /**
         * Intercept string methods for dynamic text
         */
        interceptStringMethods() {
            // This is more complex and may not be needed
            // for now, as most text goes through DOM methods
        }

        /**
         * Setup mutation observer to catch dynamic changes
         */
        setupMutationObserver() {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    // Handle added nodes
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.TEXT_NODE) {
                            const text = node.textContent.trim();
                            if (text) {
                                const translated = this.translateText(text);
                                if (translated !== text) {
                                    node.textContent = translated;
                                }
                            }
                        } else if (node.nodeType === Node.ELEMENT_NODE) {
                            // Translate the element and its children
                            this.translateElement(node);

                            // Translate all text nodes within
                            const walker = document.createTreeWalker(
                                node,
                                NodeFilter.SHOW_TEXT,
                                null,
                                false
                            );

                            let textNode;
                            while (textNode = walker.nextNode()) {
                                const text = textNode.textContent.trim();
                                if (text) {
                                    const translated = this.translateText(text);
                                    if (translated !== text) {
                                        textNode.textContent = translated;
                                    }
                                }
                            }
                        }
                    });

                    // Handle character data changes
                    if (mutation.type === 'characterData') {
                        const text = mutation.target.textContent.trim();
                        if (text) {
                            const translated = this.translateText(text);
                            if (translated !== text) {
                                mutation.target.textContent = translated;
                            }
                        }
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true,
                characterDataOldValue: true
            });
        }

        /**
         * Intercept native dialog methods
         */
        interceptDialogs() {
            const self = this;

            // Intercept alert
            const originalAlert = window.alert;
            window.alert = function(message) {
                const translated = self.translateText(message);
                return originalAlert.call(window, translated);
            };

            // Intercept confirm
            const originalConfirm = window.confirm;
            window.confirm = function(message) {
                const translated = self.translateText(message);
                return originalConfirm.call(window, translated);
            };
        }

        /**
         * Override showMessage function if it exists
         */
        overrideShowMessage() {
            const self = this;

            // Wait a bit for showMessage to be defined
            setTimeout(() => {
                if (typeof window.showMessage === 'function') {
                    const originalShowMessage = window.showMessage;
                    window.showMessage = function(message, type, duration) {
                        const translated = self.translateText(message);
                        return originalShowMessage.call(this, translated, type, duration);
                    };
                    console.log('[PRT] ✅ showMessage function intercepted');
                }
            }, 1000);
        }

        /**
         * Handle file input elements
         */
        handleFileInputs() {
            // Find all file inputs
            const fileInputs = document.querySelectorAll('input[type="file"]');
            fileInputs.forEach(input => {
                // Check if there's adjacent text that says "Choose files" or "No file chosen"
                const parent = input.parentElement;
                if (parent) {
                    const walker = document.createTreeWalker(
                        parent,
                        NodeFilter.SHOW_TEXT,
                        null,
                        false
                    );

                    let node;
                    while (node = walker.nextNode()) {
                        const text = node.textContent.trim();
                        if (text === 'Choose files' || text === 'No file chosen') {
                            const translated = this.translateText(text);
                            if (translated !== text) {
                                node.textContent = translated;
                            }
                        }
                    }
                }
            });
        }

        /**
         * Core translation function
         */
        translateText(text) {
            if (!text || typeof text !== 'string') return text;

            text = text.trim();
            if (!text) return text;

            // Check if we have a mapping for this text
            const key = this.textMappings.get(text);
            if (!key) return text;

            // Get translation
            const translation = this.getTranslation(key);
            return translation || text;
        }

        /**
         * Get translation for a key
         */
        getTranslation(key) {
            if (!this.translations[this.currentLocale]) return null;
            return this.translations[this.currentLocale][key] ||
                   this.translations['en']?.[key] ||
                   null;
        }

        /**
         * Update locale and retranslate
         */
        updateLocale(newLocale) {
            this.currentLocale = newLocale;
            this.translatedElements = new WeakSet();
            this.translateExistingDOM();
            console.log(`[PRT] ✅ Locale updated to: ${newLocale}`);
        }
    }

    // Initialize the system
    window.ProfessionalRuntimeTranslator = new ProfessionalRuntimeTranslator();

    // Listen for language changes
    document.addEventListener('languageChanged', (event) => {
        if (window.ProfessionalRuntimeTranslator) {
            window.ProfessionalRuntimeTranslator.updateLocale(event.detail?.locale || currentLocale);
        }
    });

    // Also listen for locale changes via UnifiedLanguageManager
    if (window.UnifiedLanguageManager) {
        const originalChangeLanguage = window.UnifiedLanguageManager.changeLanguage;
        window.UnifiedLanguageManager.changeLanguage = async function(locale) {
            const result = await originalChangeLanguage.call(this, locale);
            if (window.ProfessionalRuntimeTranslator) {
                window.ProfessionalRuntimeTranslator.updateLocale(locale);
            }
            return result;
        };
    }

})();