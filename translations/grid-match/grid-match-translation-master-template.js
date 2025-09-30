/**
 * GRID MATCH TRANSLATION MASTER TEMPLATE
 * ======================================
 * Complete Translation System for Grid Match App
 * Version: 1.0.0
 * Generated: December 2024
 *
 * THIS IS THE MASTER TEMPLATE FOR ALL 11 LANGUAGES
 * Total Translation Keys: 189
 * Current Coverage: 9.0% (17 elements have data-translate)
 * Target Coverage: 100%
 *
 * UNIQUE FEATURES OF GRID MATCH:
 * - Grid-based matching game (2-4 rows/columns)
 * - Clue cells configuration (1-5)
 * - Image matching functionality
 * - Custom answer key generation
 *
 * Languages Supported:
 * - English (en)
 * - German (de)
 * - French (fr)
 * - Spanish (es)
 * - Italian (it)
 * - Portuguese (pt)
 * - Dutch (nl)
 * - Swedish (sv)
 * - Danish (da)
 * - Norwegian (no)
 * - Finnish (fi)
 */

const GRID_MATCH_TRANSLATIONS = {
  /**
   * ENGLISH - Base Language
   * All keys must exist here as the fallback
   */
  "en": {
    // ============= 1. LANGUAGE NAMES (11 keys) =============
    "language.english": "English",
    "language.german": "Deutsch",
    "language.french": "Français",
    "language.spanish": "Español",
    "language.portuguese": "Português",
    "language.italian": "Italiano",
    "language.dutch": "Nederlands",
    "language.swedish": "Svenska",
    "language.danish": "Dansk",
    "language.norwegian": "Norsk",
    "language.finnish": "Suomi",

    // ============= 2. CORE UI (Already Translated - 17 keys) =============
    "gridMatch": "Grid Match",
    "pageSetup": "Page Setup",
    "textTools": "Text Tools",
    "gridOptions": "Grid Options",
    "imageLibrary": "Image Library",
    "uploadCustomImages": "Upload Custom Images",
    "language": "Language",
    "selectLanguage": "Select Language:",
    "page": "Page",
    "pageSize": "Page Size:",
    "background": "Background",
    "fallbackColor": "Fallback Color:",
    "backgroundTheme": "Background Theme:",
    "noneUseFallback": "None (Use Fallback Color)",
    "border": "Border",
    "borderTheme": "Border Theme:",
    "addNewText": "Add New Text",

    // ============= 3. PAGE HEADER & TITLE (2 keys) =============
    "gridmatch.page.title": "Grid-Match Worksheet Generator",
    "gridmatch.title": "Grid Match",

    // ============= 4. PAGE SIZE OPTIONS (5 keys) =============
    "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
    "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.a4.landscape": "A4 Landscape (297×210mm)",
    "page.size.custom": "Custom",

    // ============= 5. PAGE SETUP SECTION (8 keys) =============
    "gridmatch.width.label": "Width (px):",
    "gridmatch.height.label": "Height (px):",
    "gridmatch.apply.size": "Apply Size",
    "gridmatch.background.message": "Select a theme for backgrounds.",
    "gridmatch.background.opacity": "Background Opacity:",
    "gridmatch.available.borders": "Available Borders:",
    "gridmatch.border.message": "Select a theme to see borders.",
    "gridmatch.border.opacity": "Border Opacity:",

    // ============= 6. TEXT TOOLS SECTION (10 keys) =============
    "gridmatch.text.content": "Content:",
    "gridmatch.text.placeholder": "Hello!",
    "gridmatch.text.add.button": "Add Text to Worksheet",
    "gridmatch.text.properties": "Selected Text Properties",
    "gridmatch.text.color": "Color:",
    "gridmatch.text.size": "Size:",
    "gridmatch.text.font": "Font:",
    "gridmatch.text.outline.color": "Outline Color:",
    "gridmatch.text.outline.width": "Outline (0-10):",
    "gridmatch.text.default": "New Text",

    // ============= 7. FONT OPTIONS (7 keys) =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= 8. GRID OPTIONS - UNIQUE TO THIS APP (3 keys) =============
    "gridmatch.rows.label": "Rows (2–4):",
    "gridmatch.columns.label": "Columns (2–4):",
    "gridmatch.clue.cells": "Number of Clue Cells (1-5):",

    // ============= 9. IMAGE LIBRARY (7 keys) =============
    "gridmatch.select.theme": "Select Theme:",
    "gridmatch.search.label": "Search Images:",
    "gridmatch.search.placeholder": "e.g., apple, car",
    "gridmatch.available.images": "Available Images:",
    "gridmatch.loading.images": "Loading images...",
    "gridmatch.selected.image": "Selected Image:",
    "gridmatch.themes.all": "All Themes",

    // ============= 10. UPLOAD SECTION (3 keys) =============
    "gridmatch.upload.select": "Select image(s) to upload:",
    "gridmatch.uploaded.label": "Your Uploaded Images (Click to use):",
    "gridmatch.uploaded.placeholder": "Your uploaded images will appear here.",

    // ============= 11. TOOLBAR & ALIGNMENT (15 keys) =============
    "toolbar.layers": "Layers",
    "toolbar.bring.forward": "Bring Forward",
    "toolbar.send.backward": "Send Backward",
    "toolbar.align": "Align",
    "toolbar.align.selected": "Align Selected:",
    "toolbar.align.left": "Align Left",
    "toolbar.center.h": "Center Horizontally",
    "toolbar.align.right": "Align Right",
    "toolbar.align.top": "Align Top",
    "toolbar.center.v": "Center Vertically",
    "toolbar.align.bottom": "Align Bottom",
    "toolbar.align.to.page": "Align to Page:",
    "toolbar.center.page.h": "Center on Page Horizontally",
    "toolbar.center.page.v": "Center on Page Vertically",
    "toolbar.delete": "Delete Selected",

    // ============= 12. ACTION BUTTONS (11 keys) =============
    "gridmatch.generate": "Generate",
    "gridmatch.generate.worksheet": "Generate Worksheet",
    "gridmatch.generate.answer": "Generate Answer Key",
    "gridmatch.download": "Download",
    "gridmatch.download.worksheet.jpeg": "Worksheet (JPEG)",
    "gridmatch.download.answer.jpeg": "Answer Key (JPEG)",
    "gridmatch.download.worksheet.pdf": "Worksheet (PDF)",
    "gridmatch.download.answer.pdf": "Answer Key (PDF)",
    "common.grayscale": "Grayscale",
    "gridmatch.clear.all": "Clear All",
    "common.none": "None",

    // ============= 13. CANVAS TABS (2 keys) =============
    "gridmatch.tab.worksheet": "Worksheet",
    "gridmatch.tab.answer": "Answer Key",

    // ============= 14. SUCCESS MESSAGES (12 keys) =============
    "worksheetGenerated": "Worksheet generated!",
    "answerKeyGenerated": "Answer key generated!",
    "pdfDownloaded": "PDF downloaded!",
    "jpegDownloadInitiated": "JPEG download initiated!",
    "formCleared": "Form cleared.",
    "gridmatch.msg.text.added": "Text added to canvas.",
    "gridmatch.msg.cleared": "All worksheets cleared.",
    "gridmatch.msg.uploads.available": "{count} custom image(s) available. Click to use.",
    "gridmatch.msg.image.selected": "Image selected: {name}",
    "gridmatch.msg.grid.created": "Grid created successfully.",
    "gridmatch.msg.download.ready": "Download ready.",
    "gridmatch.msg.theme.loaded": "Theme loaded successfully.",

    // ============= 15. ERROR MESSAGES (24 keys) =============
    "selectImageFirst": "Please select an image.",
    "gridSizeError": "Rows and columns must be 2 or greater.",
    "errorRenderingWorksheet": "Error rendering worksheet.",
    "errorLoadingImage": "Failed to load the selected image.",
    "generateWorksheetFirst": "Generate a worksheet first.",
    "errorRenderingAnswerKey": "Error rendering answer key.",
    "canvasNotAvailable": "Canvas not available.",
    "generateContentFirst": "Please generate content first.",
    "errorCreatingPDF": "Error creating PDF.",
    "errorPreparingJPEG": "Error preparing JPEG.",
    "errorLoadingThemes": "Could not load themes.",
    "gridmatch.msg.no.text": "No text entered.",
    "gridmatch.msg.no.borders": "No borders in this theme.",
    "gridmatch.msg.border.error": "Error loading borders for theme '{theme}'.",
    "gridmatch.msg.border.loading.error": "Error loading borders.",
    "gridmatch.msg.no.backgrounds": "No backgrounds in this theme.",
    "gridmatch.msg.background.error": "Error loading backgrounds for theme '{theme}'.",
    "gridmatch.msg.background.loading.error": "Error loading backgrounds.",
    "gridmatch.msg.no.images": "No images found{query}",
    "gridmatch.msg.file.error": "Error reading file: {filename}",
    "gridmatch.msg.invalid.grid": "Invalid grid configuration.",
    "gridmatch.msg.max.clue.cells": "Maximum 5 clue cells allowed.",
    "gridmatch.msg.min.grid.size": "Minimum grid size is 2x2.",
    "gridmatch.msg.max.grid.size": "Maximum grid size is 4x4.",

    // ============= 16. LOADING & STATUS MESSAGES (7 keys) =============
    "preparingPDF": "Preparing PDF...",
    "preparingJPEG": "Preparing JPEG...",
    "gridmatch.msg.loading": "Loading...",
    "gridmatch.msg.loading.default": "Loading default theme...",
    "gridmatch.msg.searching": "Searching...",
    "gridmatch.msg.loading.uploads": "Loading {count} image(s)...",
    "gridmatch.msg.processing": "Processing...",

    // ============= 17. FILENAME PATTERN (1 key) =============
    "gridmatch.filename.jpeg": "{name}-grid-match.jpg",

    // ============= 18. TOOLTIPS (14 keys) =============
    "tooltip.bring.forward": "Move selected object forward",
    "tooltip.send.backward": "Move selected object backward",
    "tooltip.align.left": "Align selected objects to the left",
    "tooltip.center.h": "Center selected objects horizontally",
    "tooltip.align.right": "Align selected objects to the right",
    "tooltip.align.top": "Align selected objects to the top",
    "tooltip.center.v": "Center selected objects vertically",
    "tooltip.align.bottom": "Align selected objects to the bottom",
    "tooltip.center.page.h": "Center on page horizontally",
    "tooltip.center.page.v": "Center on page vertically",
    "tooltip.delete": "Delete selected objects",
    "tooltip.grayscale": "Convert to grayscale",
    "tooltip.clear.all": "Clear all content",
    "tooltip.generate": "Generate the worksheet",

    // ============= 19. GRID-SPECIFIC TERMS (6 keys) =============
    "gridmatch.term.grid": "Grid",
    "gridmatch.term.cell": "Cell",
    "gridmatch.term.clue": "Clue",
    "gridmatch.term.answer": "Answer",
    "gridmatch.term.match": "Match",
    "gridmatch.term.pattern": "Pattern",

    // ============= 20. CONFIRMATION MESSAGES (3 keys) =============
    "gridmatch.confirm.clear": "Are you sure you want to clear all content?",
    "gridmatch.confirm.delete": "Are you sure you want to delete the selected items?",
    "gridmatch.confirm.overwrite": "This will overwrite existing content. Continue?",

    // ============= 21. HELP MESSAGES (4 keys) =============
    "gridmatch.help.grid.size": "Select the number of rows and columns for your grid",
    "gridmatch.help.clue.cells": "Choose how many cells will show the clue images",
    "gridmatch.help.image.select": "Click an image to use it in your worksheet",
    "gridmatch.help.upload": "Upload your own images to use in the worksheet"
  },

  /**
   * GERMAN - Deutsch
   * To be translated - DO NOT TRANSLATE YET
   */
  "de": {
    // All 189 keys to be added here with German translations
  },

  /**
   * FRENCH - Français
   * To be translated - DO NOT TRANSLATE YET
   */
  "fr": {
    // All 189 keys to be added here with French translations
  },

  /**
   * SPANISH - Español
   * To be translated - DO NOT TRANSLATE YET
   */
  "es": {
    // All 189 keys to be added here with Spanish translations
  },

  /**
   * ITALIAN - Italiano
   * To be translated - DO NOT TRANSLATE YET
   */
  "it": {
    // All 189 keys to be added here with Italian translations
  },

  /**
   * PORTUGUESE - Português
   * To be translated - DO NOT TRANSLATE YET
   */
  "pt": {
    // All 189 keys to be added here with Portuguese translations
  },

  /**
   * DUTCH - Nederlands
   * To be translated - DO NOT TRANSLATE YET
   */
  "nl": {
    // All 189 keys to be added here with Dutch translations
  },

  /**
   * SWEDISH - Svenska
   * To be translated - DO NOT TRANSLATE YET
   */
  "sv": {
    // All 189 keys to be added here with Swedish translations
  },

  /**
   * DANISH - Dansk
   * To be translated - DO NOT TRANSLATE YET
   */
  "da": {
    // All 189 keys to be added here with Danish translations
  },

  /**
   * NORWEGIAN - Norsk
   * To be translated - DO NOT TRANSLATE YET
   */
  "no": {
    // All 189 keys to be added here with Norwegian translations
  },

  /**
   * FINNISH - Suomi
   * To be translated - DO NOT TRANSLATE YET
   */
  "fi": {
    // All 189 keys to be added here with Finnish translations
  }
};

/**
 * HELPER FUNCTIONS FOR IMPLEMENTATION
 * ====================================
 */

/**
 * Get translation for a key in specified locale
 * @param {string} key - Translation key
 * @param {string} locale - Language locale code
 * @param {object} params - Optional parameters for placeholder replacement
 * @returns {string} Translated text
 */
function getTranslation(key, locale = 'en', params = {}) {
  const translation = GRID_MATCH_TRANSLATIONS[locale]?.[key] ||
                     GRID_MATCH_TRANSLATIONS['en'][key] ||
                     key;

  return formatTranslation(translation, params);
}

/**
 * Format translation with placeholder replacement
 * @param {string} text - Text with placeholders
 * @param {object} params - Parameters to replace
 * @returns {string} Formatted text
 */
function formatTranslation(text, params) {
  let formatted = text;
  for (const [key, value] of Object.entries(params)) {
    formatted = formatted.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return formatted;
}

/**
 * Validate translations for a locale
 * @param {string} locale - Locale to validate
 * @returns {object} Validation results
 */
function validateTranslations(locale) {
  const englishKeys = Object.keys(GRID_MATCH_TRANSLATIONS.en);
  const localeKeys = Object.keys(GRID_MATCH_TRANSLATIONS[locale] || {});

  const missing = englishKeys.filter(key => !localeKeys.includes(key));
  const extra = localeKeys.filter(key => !englishKeys.includes(key));

  return {
    locale,
    totalKeys: englishKeys.length,
    translatedKeys: localeKeys.length,
    missingKeys: missing,
    extraKeys: extra,
    coverage: ((localeKeys.length / englishKeys.length) * 100).toFixed(1) + '%',
    isComplete: missing.length === 0
  };
}

/**
 * Get all supported locales
 * @returns {array} Array of locale codes
 */
function getSupportedLocales() {
  return Object.keys(GRID_MATCH_TRANSLATIONS);
}

/**
 * Check if a locale is supported
 * @param {string} locale - Locale code to check
 * @returns {boolean} True if supported
 */
function isLocaleSupported(locale) {
  return locale in GRID_MATCH_TRANSLATIONS;
}

/**
 * Update all data-translate elements on the page
 */
function updateAllTranslations(locale = 'en') {
  // Update elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    const translation = getTranslation(key, locale);

    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      if (element.hasAttribute('placeholder')) {
        element.placeholder = translation;
      }
    } else if (element.tagName === 'OPTION') {
      element.textContent = translation;
    } else {
      element.textContent = translation;
    }
  });

  // Handle elements with data-translate-placeholder
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    element.placeholder = getTranslation(key, locale);
  });

  // Handle elements with data-translate-title (tooltips)
  document.querySelectorAll('[data-translate-title]').forEach(element => {
    const key = element.getAttribute('data-translate-title');
    element.title = getTranslation(key, locale);
  });
}

/**
 * IMPLEMENTATION INSTRUCTIONS
 * ===========================
 *
 * 1. CURRENT STATE:
 *    - 17 elements (9.0%) already have data-translate attributes
 *    - 172 elements (91.0%) need translation implementation
 *    - Some elements use data-translate-key instead of data-translate
 *
 * 2. CRITICAL FIXES NEEDED:
 *    - Add data-translate to all 11 language options (lines 587-597)
 *    - Implement all 48 JavaScript messages
 *    - Add translations for all toolbar actions
 *    - Fix duplicate keys (e.g., "None" appears 3 times)
 *
 * 3. GRID MATCH SPECIFIC FEATURES:
 *    - Grid configuration (2-4 rows/columns)
 *    - Clue cells (1-5) - unique matching feature
 *    - Grid-specific error messages
 *    - Answer key generation with grid layout
 *
 * 4. CATEGORIES (21 total):
 *    1. Language Names (11 keys)
 *    2. Core UI - Already Translated (17 keys)
 *    3. Page Header & Title (2 keys)
 *    4. Page Size Options (5 keys)
 *    5. Page Setup Section (8 keys)
 *    6. Text Tools Section (10 keys)
 *    7. Font Options (7 keys)
 *    8. Grid Options - UNIQUE (3 keys)
 *    9. Image Library (7 keys)
 *    10. Upload Section (3 keys)
 *    11. Toolbar & Alignment (15 keys)
 *    12. Action Buttons (11 keys)
 *    13. Canvas Tabs (2 keys)
 *    14. Success Messages (12 keys)
 *    15. Error Messages (24 keys)
 *    16. Loading & Status Messages (7 keys)
 *    17. Filename Pattern (1 key)
 *    18. Tooltips (14 keys)
 *    19. Grid-Specific Terms (6 keys)
 *    20. Confirmation Messages (3 keys)
 *    21. Help Messages (4 keys)
 *
 * 5. VALIDATION:
 *    Use validateTranslations() to check coverage for each locale
 *
 * 6. TESTING:
 *    - Test with ?locale=de to verify German
 *    - Test grid configuration (2x2 to 4x4)
 *    - Test clue cells (1-5)
 *    - Test image selection and matching
 *    - Verify all error messages for grid limits
 */

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GRID_MATCH_TRANSLATIONS,
    getTranslation,
    formatTranslation,
    validateTranslations,
    getSupportedLocales,
    isLocaleSupported,
    updateAllTranslations
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.GRID_MATCH_TRANSLATIONS = GRID_MATCH_TRANSLATIONS;
  window.getTranslation = getTranslation;
  window.formatTranslation = formatTranslation;
  window.updateAllTranslations = updateAllTranslations;
}