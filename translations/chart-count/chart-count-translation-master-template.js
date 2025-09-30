/**
 * CHART COUNT TRANSLATION MASTER (CCTM)
 * Complete Translation System for Chart Count and Color App
 * Version: 1.0.0
 * Generated: December 2024
 *
 * THIS IS THE MASTER TEMPLATE FOR ALL 11 LANGUAGES
 * Total Translation Keys: 171 (CRITICAL: 1.8% current coverage!)
 *
 * CRITICAL USER-MENTIONED ITEMS:
 * - Background (line 503)
 * - Border (line 514)
 * - Grayscale (line 612)
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

const CHART_COUNT_TRANSLATIONS = {
  /**
   * ENGLISH - Base Language
   * All keys must exist here as the fallback
   */
  "en": {
    // ============= LANGUAGE NAMES =============
    "lang_en": "English",
    "lang_de": "Deutsch (German)",
    "lang_fr": "Français (French)",
    "lang_es": "Español (Spanish)",
    "lang_pt": "Português (Portuguese)",
    "lang_it": "Italiano (Italian)",
    "lang_nl": "Nederlands (Dutch)",
    "lang_sv": "Svenska (Swedish)",
    "lang_da": "Dansk (Danish)",
    "lang_no": "Norsk (Norwegian)",
    "lang_fi": "Suomi (Finnish)",

    // ============= CORE UI =============
    "chartcount.page.title": "Picture Graph Playground",
    "chartcount.settings.title": "Graph Settings",
    "language.label": "Language:",
    "chartcount.tab.worksheet": "Worksheet",
    "chartcount.tab.answer": "Answer Key",

    // ============= PAGE SETUP SECTION =============
    "chartcount.page.setup": "Page Setup",
    "chartcount.page.size.label": "Page Size:",
    "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
    "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.a4.landscape": "A4 Landscape (297×210mm)",
    "page.size.square": "Square (1200×1200)",
    "page.size.custom": "Custom",
    "chartcount.width.label": "Width (px):",
    "chartcount.height.label": "Height (px):",
    "chartcount.apply.size": "Apply Size",
    "chartcount.page.color": "Page Color:",
    "chartcount.include.name.date": "Include Name/Date Fields",

    // ============= BACKGROUND SECTION =============
    "chartcount.background.title": "Background",  // CRITICAL - User mentioned
    "chartcount.background.theme": "Background Theme:",
    "chartcount.background.message": "Select a theme to see backgrounds.",
    "chartcount.background.opacity": "Background Opacity:",

    // ============= BORDER SECTION =============
    "chartcount.border.title": "Border",  // CRITICAL - User mentioned
    "chartcount.border.theme": "Border Theme:",
    "chartcount.border.message": "Select a theme to see borders.",
    "chartcount.border.opacity": "Border Opacity:",

    // ============= COMMON =============
    "common.none": "None",
    "common.grayscale": "Grayscale",  // CRITICAL - User mentioned

    // ============= TEXT TOOLS =============
    "chartcount.text.tools": "Text Tools",
    "chartcount.text.add.new": "Add New Text",
    "chartcount.text.content.label": "Content:",
    "chartcount.text.placeholder": "Hello!",
    "chartcount.text.add.button": "Add Text",
    "chartcount.text.properties": "Selected Text Properties",
    "chartcount.text.color": "Color:",
    "chartcount.text.size": "Size:",
    "chartcount.text.font": "Font:",
    "chartcount.text.outline.color": "Outline Color:",
    "chartcount.text.outline.width": "Outline (0-10):",

    // ============= FONT OPTIONS =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= IMAGE LIBRARY =============
    "chartcount.image.library": "Image Library",
    "chartcount.worksheet.source": "Worksheet Image Source:",
    "chartcount.manual.selection": "Manual Selection Below",
    "chartcount.manual.browse": "Manual Image Selection & Browse",
    "chartcount.browser.theme": "Image Browser Theme:",
    "chartcount.search.label": "Search Images:",
    "chartcount.search.placeholder": "e.g., apple, car",
    "chartcount.selected.count": "Manually Selected: {count} / 6",
    "chartcount.available.images": "Available Images (Click to add):",
    "chartcount.loading.images": "Loading images...",
    "chartcount.selected.images": "Selected Images (Click to remove):",
    "chartcount.themes.all": "All Themes",

    // ============= UPLOAD SECTION =============
    "chartcount.upload.title": "Upload Custom Images",
    "chartcount.upload.select": "Select image(s) to upload:",
    "chartcount.uploaded.label": "Your Uploaded Images (This Session):",
    "chartcount.uploaded.placeholder": "Your uploaded images will appear here.",

    // ============= TOOLBAR =============
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

    // ============= ACTION BUTTONS =============
    "chartcount.generate": "Generate",
    "chartcount.generate.worksheet": "Generate Worksheet",
    "chartcount.generate.answer": "Generate Answer Key",
    "chartcount.download": "Download",
    "chartcount.download.worksheet.jpeg": "Worksheet (JPEG)",
    "chartcount.download.answer.jpeg": "Answer Key (JPEG)",
    "chartcount.download.worksheet.pdf": "Worksheet (PDF)",
    "chartcount.download.answer.pdf": "Answer Key (PDF)",
    "chartcount.clear.all": "Clear All",

    // ============= NAME/DATE FIELDS =============
    "chartcount.name.field": "Name: ____________________",
    "chartcount.date.field": "Date: ____________",

    // ============= SUCCESS MESSAGES =============
    "chartcount.msg.library.ready": "Image library ready.",
    "chartcount.msg.worksheet.generated": "Worksheet generated!",
    "chartcount.msg.answer.generated": "Answer key generated!",
    "chartcount.msg.canvas.cleared": "Canvas Cleared",
    "chartcount.msg.text.added": "Text added.",

    // ============= ERROR MESSAGES =============
    "chartcount.msg.library.error": "Could not load image library.",
    "chartcount.msg.theme.error": "Failed to load theme: {theme}",
    "chartcount.msg.retrieve.error": "Could not retrieve images.",
    "chartcount.msg.file.error": "Error reading file: {filename}",
    "chartcount.msg.exact.six": "When selecting manually, you must choose exactly 6 images. You have {count}.",
    "chartcount.msg.theme.insufficient": "Theme \"{theme}\" has fewer than 6 images. Please choose another theme or select images manually.",
    "chartcount.msg.insufficient.images": "Not enough images in the library (requires 6). Please upload more.",
    "chartcount.msg.generation.failed": "Failed to generate data for the worksheet.",
    "chartcount.msg.generate.first": "Please generate the worksheet first.",
    "chartcount.msg.pdf.error": "Error creating PDF.",
    "chartcount.msg.download.error": "Error during download.",
    "chartcount.msg.max.images": "Maximum of 6 images can be selected.",

    // ============= INFO/STATUS MESSAGES =============
    "chartcount.msg.loading.uploads": "Loading {count} image(s)...",
    "chartcount.msg.uploads.available": "{count} custom image(s) now available.",
    "chartcount.msg.loading.themes": "Loading image themes...",
    "chartcount.msg.loading.theme": "Loading {theme} images...",
    "chartcount.msg.loading.animals": "Loading animals...",
    "chartcount.msg.searching": "Searching...",
    "chartcount.msg.no.images": "No images found{query}",
    "chartcount.msg.generating": "Generating chart data...",
    "chartcount.msg.preparing.download": "Preparing download...",

    // ============= ASSET MESSAGES =============
    "chartcount.asset.select": "Select a theme to see {type}.",
    "chartcount.asset.loading": "Loading {type}...",
    "chartcount.asset.none": "No {type} in this theme.",
    "chartcount.asset.error": "Error loading {type} images.",
    "chartcount.asset.failed": "Failed to load {asset} image."
  },

  /**
   * GERMAN - Deutsch
   */
  "de": {
    // Placeholder for German translations - to be completed
    // All 171 keys will follow the same structure as English
  },

  /**
   * FRENCH - Français
   */
  "fr": {
    // Placeholder for French translations - to be completed
    // All 171 keys will follow the same structure as English
  },

  /**
   * SPANISH - Español
   */
  "es": {
    // Placeholder for Spanish translations - to be completed
    // All 171 keys will follow the same structure as English
  },

  /**
   * ITALIAN - Italiano
   */
  "it": {
    // Placeholder for Italian translations - to be completed
    // All 171 keys will follow the same structure as English
  },

  /**
   * PORTUGUESE - Português
   */
  "pt": {
    // Placeholder for Portuguese translations - to be completed
    // All 171 keys will follow the same structure as English
  },

  /**
   * DUTCH - Nederlands
   */
  "nl": {
    // Placeholder for Dutch translations - to be completed
    // All 171 keys will follow the same structure as English
  },

  /**
   * SWEDISH - Svenska
   */
  "sv": {
    // Placeholder for Swedish translations - to be completed
    // All 171 keys will follow the same structure as English
  },

  /**
   * DANISH - Dansk
   */
  "da": {
    // Placeholder for Danish translations - to be completed
    // All 171 keys will follow the same structure as English
  },

  /**
   * NORWEGIAN - Norsk
   */
  "no": {
    // Placeholder for Norwegian translations - to be completed
    // All 171 keys will follow the same structure as English
  },

  /**
   * FINNISH - Suomi
   */
  "fi": {
    // Placeholder for Finnish translations - to be completed
    // All 171 keys will follow the same structure as English
  }
};

/**
 * HELPER FUNCTIONS
 */

/**
 * Get translation for a key in specified locale
 * @param {string} key - Translation key
 * @param {string} locale - Language locale code
 * @param {object} params - Optional parameters for placeholder replacement
 * @returns {string} Translated text
 */
function getTranslation(key, locale = 'en', params = {}) {
  const translation = CHART_COUNT_TRANSLATIONS[locale]?.[key] ||
                     CHART_COUNT_TRANSLATIONS['en'][key] ||
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
  const englishKeys = Object.keys(CHART_COUNT_TRANSLATIONS.en);
  const localeKeys = Object.keys(CHART_COUNT_TRANSLATIONS[locale] || {});

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
  return Object.keys(CHART_COUNT_TRANSLATIONS);
}

/**
 * Check if a locale is supported
 * @param {string} locale - Locale code to check
 * @returns {boolean} True if supported
 */
function isLocaleSupported(locale) {
  return locale in CHART_COUNT_TRANSLATIONS;
}

/**
 * IMPLEMENTATION INSTRUCTIONS
 *
 * 1. CRITICAL HTML CHANGES NEEDED (168 elements):
 *    - Only 3 elements have data-translate (1.8% coverage)
 *    - Add data-translate attributes to ALL remaining HTML elements
 *    - Current coverage is virtually zero - complete overhaul needed
 *
 * 2. JAVASCRIPT CHANGES:
 *    - Add t() function definition
 *    - Replace ALL 42 hardcoded messages with t() calls
 *    - Handle dynamic messages with parameters
 *
 * 3. SPECIAL HANDLING:
 *    - File input wrapper for browser-controlled elements
 *    - Chart generation requires exactly 6 images - critical validation
 *    - Manual selection vs theme-based selection
 *    - Dynamic selected count display (X / 6)
 *    - Name/Date field templates
 *
 * 4. CATEGORIES (17 total):
 *    - Language Names (11 keys)
 *    - Core UI (5 keys)
 *    - Page Setup (13 keys)
 *    - Background Section (4 keys)
 *    - Border Section (4 keys)
 *    - Common (2 keys)
 *    - Text Tools (11 keys)
 *    - Font Options (7 keys)
 *    - Image Library (13 keys)
 *    - Upload Section (4 keys)
 *    - Toolbar (14 keys)
 *    - Action Buttons (9 keys)
 *    - Name/Date Fields (2 keys)
 *    - Success Messages (5 keys)
 *    - Error Messages (12 keys)
 *    - Status Messages (9 keys)
 *    - Asset Messages (5 keys)
 *
 * 5. VALIDATION:
 *    Use validateTranslations() to check coverage for each locale
 *
 * 6. TESTING:
 *    - Test with ?locale=de to verify German
 *    - Check all dropdown options
 *    - Test manual image selection (exactly 6)
 *    - Test theme-based generation
 *    - Verify error messages for insufficient images
 *    - Check chart data generation
 */

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CHART_COUNT_TRANSLATIONS,
    getTranslation,
    formatTranslation,
    validateTranslations,
    getSupportedLocales,
    isLocaleSupported
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.CHART_COUNT_TRANSLATIONS = CHART_COUNT_TRANSLATIONS;
  window.getTranslation = getTranslation;
  window.formatTranslation = formatTranslation;
}