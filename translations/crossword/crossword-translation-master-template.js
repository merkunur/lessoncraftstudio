/**
 * IMAGE CROSSWORD TRANSLATION MASTER TEMPLATE
 * ===========================================
 * Complete Translation System for Image Crossword App
 * Version: 1.0.0
 * Generated: December 2024
 *
 * THIS IS THE MASTER TEMPLATE FOR ALL 11 LANGUAGES
 * Total Translation Keys: 191
 * Current Coverage: 2.1% (4 elements have data-translate)
 * Target Coverage: 100%
 *
 * UNIQUE FEATURES OF IMAGE CROSSWORD:
 * - Automatic crossword puzzle generation
 * - Minimum 8 images required (PUZZLE_IMAGE_COUNT)
 * - Theme-based or individual image selection
 * - Visual crossword with image clues
 * - Answer key with word solutions
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

const CROSSWORD_TRANSLATIONS = {
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

    // ============= 2. CORE UI (Already Translated - 4 keys) =============
    "language": "Language",
    "selectLanguage": "Select Language:",
    "pageSetup": "Page Setup",
    "backgroundTheme": "Background",

    // ============= 3. PAGE HEADER & TITLE (2 keys) =============
    "crossword.page.title": "Image Crossword Generator",
    "crossword.title": "Crossword Puzzle",

    // ============= 4. PAGE SIZE OPTIONS (6 keys) =============
    "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
    "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.a4.landscape": "A4 Landscape (297×210mm)",
    "page.size.square": "Square (1200x1200)",
    "page.size.custom": "Custom",

    // ============= 5. PAGE SETUP SECTION (7 keys) =============
    "crossword.page.size.label": "Page Size:",
    "crossword.width.label": "Width (px):",
    "crossword.height.label": "Height (px):",
    "crossword.apply.size": "Apply Size",
    "crossword.background.label": "Background:",
    "crossword.apply.color": "Apply Color",
    "crossword.borders.backgrounds": "Borders & Backgrounds",

    // ============= 6. BORDER & BACKGROUND SECTION (10 keys) =============
    "crossword.background.theme": "Background Theme:",
    "crossword.available.backgrounds": "Available Backgrounds:",
    "crossword.background.message": "Select a theme for backgrounds.",
    "crossword.background.opacity": "Background Opacity:",
    "crossword.border.title": "Border",
    "crossword.border.theme": "Border Theme:",
    "crossword.available.borders": "Available Borders:",
    "crossword.border.message": "Select a theme to see borders.",
    "crossword.border.opacity": "Border Opacity:",
    "common.none": "None",

    // ============= 7. TEXT TOOLS SECTION (11 keys) =============
    "crossword.text.tools": "Text Tools",
    "crossword.text.add.new": "Add New Text",
    "crossword.text.content.label": "Content:",
    "crossword.text.placeholder": "Enter text...",
    "crossword.text.add.button": "Add Text to Worksheet",
    "crossword.text.properties": "Selected Text Properties",
    "crossword.text.color": "Color:",
    "crossword.text.size": "Size:",
    "crossword.text.font": "Font:",
    "crossword.text.outline.color": "Outline Color:",
    "crossword.text.outline.width": "Outline (0-10):",
    "crossword.text.default": "New Text",

    // ============= 8. FONT OPTIONS (7 keys) =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= 9. IMAGE LIBRARY - UNIQUE TO CROSSWORD (10 keys) =============
    "crossword.image.library": "Image Library",
    "crossword.generate.theme": "Generate from Theme:",
    "crossword.select.individual": "-- Or Select Individual Images Below --",
    "crossword.browser.theme": "Image Browser Theme:",
    "crossword.search.label": "Search Images:",
    "crossword.search.placeholder": "e.g., apple, car",
    "crossword.available.images": "Available Images (Click to add):",
    "crossword.loading.images": "Loading images...",
    "crossword.selected.images": "Selected Images (Click to remove):",
    "crossword.select.minimum": "Select at least 8 images or use 'Generate from Theme'",
    "crossword.themes.all": "All Themes",

    // ============= 10. UPLOAD SECTION (4 keys) =============
    "crossword.upload.title": "Upload Custom Images",
    "crossword.upload.select": "Select image(s) to upload:",
    "crossword.uploaded.label": "Your Uploaded Images (Click to add/remove):",
    "crossword.uploaded.placeholder": "Your uploaded images will appear here.",

    // ============= 11. ACTION BUTTONS (11 keys) =============
    "crossword.generate": "Generate",
    "crossword.generate.worksheet": "Generate Worksheet",
    "crossword.generate.answer": "Generate Answer Key",
    "crossword.download": "Download",
    "crossword.download.worksheet.jpeg": "Worksheet (JPEG)",
    "crossword.download.answer.jpeg": "Answer Key (JPEG)",
    "crossword.download.worksheet.pdf": "Worksheet (PDF)",
    "crossword.download.answer.pdf": "Answer Key (PDF)",
    "common.grayscale": "Grayscale",
    "crossword.clear.all": "Clear All",
    "crossword.clear.confirm": "Are you sure you want to clear all content?",

    // ============= 12. TOOLBAR & ALIGNMENT (15 keys) =============
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

    // ============= 13. CANVAS TABS (2 keys) =============
    "crossword.tab.worksheet": "Worksheet",
    "crossword.tab.answer": "Answer Key",

    // ============= 14. SUCCESS MESSAGES (10 keys) =============
    "crossword.msg.worksheet.generated": "Worksheet generated successfully!",
    "crossword.msg.answer.generated": "Answer key generated!",
    "crossword.msg.cleared": "All settings cleared.",
    "crossword.msg.jpeg.initiated": "JPEG download initiated!",
    "crossword.msg.pdf.downloaded": "PDF downloaded!",
    "crossword.msg.uploads.available": "{count} custom image(s) available.",
    "crossword.msg.using.theme": "Puzzle will generate using random images from the '{theme}' theme.",
    "crossword.msg.individual.mode": "Switched to individual image selection mode.",
    "crossword.msg.text.added": "Text added to canvas.",
    "crossword.msg.theme.loaded": "Theme loaded successfully.",

    // ============= 15. ERROR & WARNING MESSAGES (25 keys) =============
    "crossword.msg.select.begin": "Select images or a theme to begin.",
    "crossword.msg.generate.first": "Please generate a worksheet first.",
    "crossword.msg.theme.insufficient": "Theme '{theme}' needs at least {count} images.",
    "crossword.msg.select.minimum.count": "Please select at least {count} images from the library or your uploads.",
    "crossword.msg.generation.failed": "Failed to generate a valid crossword. Try different images.",
    "crossword.msg.clear.theme": "Clear 'Generate from Theme' to select individual images.",
    "crossword.msg.file.error": "Error reading file: {filename}",
    "crossword.msg.canvas.empty": "Canvas is empty.",
    "crossword.msg.jpeg.error": "Error preparing JPEG.",
    "crossword.msg.pdf.error": "Error creating PDF.",
    "crossword.msg.generate.content": "Please generate content first.",
    "crossword.msg.no.images": "No images found{query}",
    "crossword.msg.theme.error": "Error loading theme.",
    "crossword.msg.upload.error": "Error uploading images.",
    "crossword.msg.invalid.size": "Invalid page size.",
    "crossword.msg.invalid.dimensions": "Invalid dimensions entered.",
    "crossword.msg.min.images": "Minimum 8 images required for crossword.",
    "crossword.msg.max.images": "Maximum 20 images allowed for crossword.",
    "crossword.msg.processing": "Processing...",
    "crossword.msg.generation.timeout": "Crossword generation timed out. Try fewer images.",
    "crossword.msg.no.solution": "Could not find valid crossword solution.",
    "crossword.msg.image.load.failed": "Failed to load image: {name}",
    "crossword.msg.theme.not.found": "Theme not found: {theme}",
    "crossword.msg.network.error": "Network error. Please check connection.",
    "crossword.msg.unexpected.error": "An unexpected error occurred.",

    // ============= 16. LOADING & STATUS MESSAGES (8 keys) =============
    "crossword.msg.searching": "Searching...",
    "crossword.msg.loading.theme": "Loading theme...",
    "crossword.msg.loading.named.theme": "Loading theme '{theme}'...",
    "crossword.msg.loading.uploads": "Loading {count} image(s)...",
    "crossword.msg.preparing.jpeg": "Preparing JPEG...",
    "crossword.msg.preparing.pdf": "Preparing PDF...",
    "crossword.msg.generating": "Generating crossword...",
    "crossword.msg.processing.images": "Processing images...",

    // ============= 17. WATERMARK TEXT (2 keys) =============
    "crossword.watermark.main": "FREE VERSION - LessonCraftStudio.com",
    "crossword.watermark.text": "FREE VERSION",

    // ============= 18. ASSET LOADING MESSAGES (4 keys) =============
    "crossword.asset.select": "Select a theme to see {type}.",
    "crossword.asset.loading": "Loading {theme} {type}...",
    "crossword.asset.none": "No {type} in this theme.",
    "crossword.asset.failed": "Failed to load {type} image.",

    // ============= 19. TOOLTIPS (14 keys) =============
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
    "tooltip.generate": "Generate the crossword puzzle",

    // ============= 20. CROSSWORD-SPECIFIC TERMS (8 keys) =============
    "crossword.term.across": "Across",
    "crossword.term.down": "Down",
    "crossword.term.clue": "Clue",
    "crossword.term.answer": "Answer",
    "crossword.term.grid": "Grid",
    "crossword.term.puzzle": "Puzzle",
    "crossword.term.solution": "Solution",
    "crossword.term.hint": "Hint",

    // ============= 21. HELP MESSAGES (6 keys) =============
    "crossword.help.theme.generate": "Select a theme to automatically generate a crossword with random images",
    "crossword.help.individual.select": "Or manually select at least 8 images for your crossword",
    "crossword.help.image.click.add": "Click images to add them to your selection",
    "crossword.help.image.click.remove": "Click selected images to remove them",
    "crossword.help.upload": "Upload your own images to use in the crossword",
    "crossword.help.min.requirement": "Crosswords require a minimum of 8 images to generate"
  },

  /**
   * GERMAN - Deutsch
   * To be translated - DO NOT TRANSLATE YET
   */
  "de": {
    // All 191 keys to be added here with German translations
  },

  /**
   * FRENCH - Français
   * To be translated - DO NOT TRANSLATE YET
   */
  "fr": {
    // All 191 keys to be added here with French translations
  },

  /**
   * SPANISH - Español
   * To be translated - DO NOT TRANSLATE YET
   */
  "es": {
    // All 191 keys to be added here with Spanish translations
  },

  /**
   * ITALIAN - Italiano
   * To be translated - DO NOT TRANSLATE YET
   */
  "it": {
    // All 191 keys to be added here with Italian translations
  },

  /**
   * PORTUGUESE - Português
   * To be translated - DO NOT TRANSLATE YET
   */
  "pt": {
    // All 191 keys to be added here with Portuguese translations
  },

  /**
   * DUTCH - Nederlands
   * To be translated - DO NOT TRANSLATE YET
   */
  "nl": {
    // All 191 keys to be added here with Dutch translations
  },

  /**
   * SWEDISH - Svenska
   * To be translated - DO NOT TRANSLATE YET
   */
  "sv": {
    // All 191 keys to be added here with Swedish translations
  },

  /**
   * DANISH - Dansk
   * To be translated - DO NOT TRANSLATE YET
   */
  "da": {
    // All 191 keys to be added here with Danish translations
  },

  /**
   * NORWEGIAN - Norsk
   * To be translated - DO NOT TRANSLATE YET
   */
  "no": {
    // All 191 keys to be added here with Norwegian translations
  },

  /**
   * FINNISH - Suomi
   * To be translated - DO NOT TRANSLATE YET
   */
  "fi": {
    // All 191 keys to be added here with Finnish translations
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
  const translation = CROSSWORD_TRANSLATIONS[locale]?.[key] ||
                     CROSSWORD_TRANSLATIONS['en'][key] ||
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
  const englishKeys = Object.keys(CROSSWORD_TRANSLATIONS.en);
  const localeKeys = Object.keys(CROSSWORD_TRANSLATIONS[locale] || {});

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
  return Object.keys(CROSSWORD_TRANSLATIONS);
}

/**
 * Check if a locale is supported
 * @param {string} locale - Locale code to check
 * @returns {boolean} True if supported
 */
function isLocaleSupported(locale) {
  return locale in CROSSWORD_TRANSLATIONS;
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
 *    - 4 elements (2.1%) already have data-translate attributes
 *    - 187 elements (97.9%) need translation implementation
 *    - Minimal existing translation infrastructure
 *
 * 2. CRITICAL FIXES NEEDED:
 *    - Add data-translate to all 11 language options (lines 452-462)
 *    - Implement all 52 JavaScript messages
 *    - Add translations for all toolbar actions
 *    - Fix 13+ duplicate message instances
 *
 * 3. CROSSWORD SPECIFIC FEATURES:
 *    - Minimum 8 images required (PUZZLE_IMAGE_COUNT)
 *    - Theme-based OR individual selection
 *    - Automatic crossword generation algorithm
 *    - Visual clues with image display
 *    - Answer key with word solutions
 *    - Grid-based puzzle layout
 *
 * 4. CATEGORIES (21 total):
 *    1. Language Names (11 keys)
 *    2. Core UI - Already Translated (4 keys)
 *    3. Page Header & Title (2 keys)
 *    4. Page Size Options (6 keys)
 *    5. Page Setup Section (7 keys)
 *    6. Border & Background Section (10 keys)
 *    7. Text Tools Section (11 keys)
 *    8. Font Options (7 keys)
 *    9. Image Library - UNIQUE (10 keys)
 *    10. Upload Section (4 keys)
 *    11. Action Buttons (11 keys)
 *    12. Toolbar & Alignment (15 keys)
 *    13. Canvas Tabs (2 keys)
 *    14. Success Messages (10 keys)
 *    15. Error & Warning Messages (25 keys)
 *    16. Loading & Status Messages (8 keys)
 *    17. Watermark Text (2 keys)
 *    18. Asset Loading Messages (4 keys)
 *    19. Tooltips (14 keys)
 *    20. Crossword-Specific Terms (8 keys)
 *    21. Help Messages (6 keys)
 *
 * 5. DUPLICATE CONSOLIDATION:
 *    - "None" appears 3 times
 *    - Border/background messages appear 2x each
 *    - Multiple JPEG/PDF messages duplicated
 *    - "Your uploaded images will appear here." appears 2x
 *    - "-- Or Select Individual Images Below --" appears 2x
 *
 * 6. VALIDATION:
 *    Use validateTranslations() to check coverage for each locale
 *
 * 7. TESTING:
 *    - Test with ?locale=de to verify German
 *    - Test minimum 8 image requirement
 *    - Test theme-based generation
 *    - Test individual image selection
 *    - Verify crossword generation works
 *    - Check answer key generation
 *    - Test watermark text in free tier
 */

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CROSSWORD_TRANSLATIONS,
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
  window.CROSSWORD_TRANSLATIONS = CROSSWORD_TRANSLATIONS;
  window.getTranslation = getTranslation;
  window.formatTranslation = formatTranslation;
  window.updateAllTranslations = updateAllTranslations;
}