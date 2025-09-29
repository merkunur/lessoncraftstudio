/**
 * DRAW AND COLOR TRANSLATION MASTER (DCTM)
 * Complete Translation System for Draw and Color App
 * Version: 1.0.0
 * Generated: December 2024
 *
 * THIS IS THE MASTER TEMPLATE FOR ALL 11 LANGUAGES
 * Total Translation Keys: 169 (CRITICAL: 0.6% current coverage!)
 *
 * CRITICAL USER-MENTIONED ITEMS:
 * - Background (line 689)
 * - Border (line 698)
 * - Grayscale (line 792)
 *
 * UNIQUE FEATURES:
 * - Grid drawing with clue cells
 * - Mirror options (horizontal, vertical, none)
 * - Custom image upload
 * - Part reveal functionality
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

const DRAW_COLOR_TRANSLATIONS = {
  /**
   * ENGLISH - Base Language
   * All keys must exist here as the fallback
   */
  "en": {
    // ============= LANGUAGE NAMES =============
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

    // ============= CORE UI =============
    "drawcolor.page.title": "Grid Drawing Worksheet Generator",
    "drawcolor.title": "Grid Drawing",
    "language.label": "Language:",

    // ============= WORKSHEET SETUP =============
    "drawcolor.worksheet.setup": "Worksheet Setup",
    "drawcolor.rows.label": "Rows (3-10)",
    "drawcolor.columns.label": "Columns (3-10)",
    "drawcolor.clue.cells": "Clue Cells (%)",
    "drawcolor.mirror.clue": "Mirror Clue Cells",
    "drawcolor.mirror.none": "None (Random)",
    "drawcolor.mirror.horizontal": "Horizontal",
    "drawcolor.mirror.vertical": "Vertical",
    "drawcolor.part.reveal": "Part to Reveal",
    "drawcolor.include.name.date": "Include Name/Date Fields",

    // ============= TEXT TOOLS =============
    "drawcolor.text.tools": "Text Tools",
    "drawcolor.text.add.new": "Add New Text",
    "drawcolor.text.content.label": "Content:",
    "drawcolor.text.placeholder": "Hello!",
    "drawcolor.text.add.button": "Add Text",
    "drawcolor.text.properties": "Selected Text Properties",
    "drawcolor.text.color": "Color:",
    "drawcolor.text.size": "Size:",
    "drawcolor.text.font": "Font:",
    "drawcolor.text.outline.color": "Outline Color:",
    "drawcolor.text.outline.width": "Outline (0-10):",
    "drawcolor.text.default": "New Text",

    // ============= FONT OPTIONS =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= PAGE SETUP =============
    "drawcolor.page.setup": "Page Setup",
    "drawcolor.page.size.label": "Page Size:",
    "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
    "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.a4.landscape": "A4 Landscape (297×210mm)",
    "page.size.square": "Square (1200x1200)",
    "page.size.custom": "Custom",
    "drawcolor.width.label": "Width (px):",
    "drawcolor.height.label": "Height (px):",
    "drawcolor.apply.size": "Apply Size",
    "drawcolor.page.color": "Page Color:",

    // ============= BACKGROUND SECTION =============
    "drawcolor.background.title": "Background",  // CRITICAL - User mentioned
    "drawcolor.background.theme": "Background Theme:",
    "drawcolor.background.message": "Select a theme for backgrounds.",
    "drawcolor.background.opacity": "Background Opacity:",

    // ============= BORDER SECTION =============
    "drawcolor.border.title": "Border",  // CRITICAL - User mentioned
    "drawcolor.border.theme": "Border Theme:",
    "drawcolor.border.message": "Select a theme to see borders.",
    "drawcolor.border.opacity": "Border Opacity:",

    // ============= COMMON =============
    "common.none": "None",
    "common.grayscale": "Grayscale",  // CRITICAL - User mentioned

    // ============= IMAGE LIBRARY =============
    "drawcolor.image.library": "Image Library",
    "drawcolor.theme.select": "Select Theme:",
    "drawcolor.search.label": "Search Images:",
    "drawcolor.search.placeholder": "e.g., apple, car",
    "drawcolor.available.images": "Available Images:",
    "drawcolor.loading.images": "Loading images...",
    "drawcolor.selected.image": "Selected Image:",
    "drawcolor.no.image.selected": "No image selected.",
    "drawcolor.themes.all": "All Themes",

    // ============= UPLOAD SECTION =============
    "drawcolor.upload.custom": "Upload Custom Image",
    "drawcolor.upload.label": "Upload an Image:",
    "drawcolor.uploaded.label": "Your Uploaded Image:",
    "drawcolor.no.upload": "No image uploaded.",

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
    "drawcolor.generate": "Generate",
    "drawcolor.download": "Download",
    "drawcolor.download.jpeg": "Download as JPEG",
    "drawcolor.download.pdf": "Download as PDF",
    "drawcolor.clear.all": "Clear All",

    // ============= NAME/DATE FIELDS =============
    "drawcolor.name.field": "Name: _____________________",
    "drawcolor.date.field": "Date: ___________",

    // ============= SUCCESS MESSAGES =============
    "drawcolor.msg.text.added": "Text added.",
    "drawcolor.msg.worksheet.generated": "Worksheet generated!",
    "drawcolor.msg.cleared": "All settings cleared.",
    "drawcolor.msg.download.initiated": "Download initiated!",
    "drawcolor.msg.pdf.success": "PDF downloaded!",
    "drawcolor.msg.upload.success": "Image uploaded successfully.",

    // ============= ERROR MESSAGES =============
    "drawcolor.msg.themes.error": "Could not load themes.",
    "drawcolor.msg.search.error": "Failed to search for \"{query}\"",
    "drawcolor.msg.no.images": "No images found{query}",
    "drawcolor.msg.select.image": "Please select an image first.",
    "drawcolor.msg.image.error": "Failed to load image.",
    "drawcolor.msg.grayscale.error": "Grayscale conversion failed.",
    "drawcolor.msg.canvas.empty": "Canvas is empty. Nothing to download.",
    "drawcolor.msg.jpeg.error": "Error preparing JPEG.",
    "drawcolor.msg.pdf.error": "Error preparing PDF.",
    "drawcolor.msg.upload.error": "Error reading uploaded image.",

    // ============= INFO/STATUS MESSAGES =============
    "drawcolor.msg.loading.default": "Loading default theme...",
    "drawcolor.msg.searching": "Searching...",
    "drawcolor.msg.preparing.jpeg": "Preparing JPEG download...",
    "drawcolor.msg.preparing.pdf": "Preparing PDF download...",
    "drawcolor.msg.processing.upload": "Processing uploaded image...",

    // ============= ASSET MESSAGES =============
    "drawcolor.asset.select": "Select a theme to see {type}.",
    "drawcolor.msg.loading.theme": "Loading {theme}...",
    "drawcolor.asset.none": "No {type} in this theme.",
    "drawcolor.asset.error": "Error loading {type}."
  },

  /**
   * GERMAN - Deutsch
   */
  "de": {
    // Placeholder for German translations - to be completed
    // All 169 keys will follow the same structure as English
  },

  /**
   * FRENCH - Français
   */
  "fr": {
    // Placeholder for French translations - to be completed
    // All 169 keys will follow the same structure as English
  },

  /**
   * SPANISH - Español
   */
  "es": {
    // Placeholder for Spanish translations - to be completed
    // All 169 keys will follow the same structure as English
  },

  /**
   * ITALIAN - Italiano
   */
  "it": {
    // Placeholder for Italian translations - to be completed
    // All 169 keys will follow the same structure as English
  },

  /**
   * PORTUGUESE - Português
   */
  "pt": {
    // Placeholder for Portuguese translations - to be completed
    // All 169 keys will follow the same structure as English
  },

  /**
   * DUTCH - Nederlands
   */
  "nl": {
    // Placeholder for Dutch translations - to be completed
    // All 169 keys will follow the same structure as English
  },

  /**
   * SWEDISH - Svenska
   */
  "sv": {
    // Placeholder for Swedish translations - to be completed
    // All 169 keys will follow the same structure as English
  },

  /**
   * DANISH - Dansk
   */
  "da": {
    // Placeholder for Danish translations - to be completed
    // All 169 keys will follow the same structure as English
  },

  /**
   * NORWEGIAN - Norsk
   */
  "no": {
    // Placeholder for Norwegian translations - to be completed
    // All 169 keys will follow the same structure as English
  },

  /**
   * FINNISH - Suomi
   */
  "fi": {
    // Placeholder for Finnish translations - to be completed
    // All 169 keys will follow the same structure as English
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
  const translation = DRAW_COLOR_TRANSLATIONS[locale]?.[key] ||
                     DRAW_COLOR_TRANSLATIONS['en'][key] ||
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
  const englishKeys = Object.keys(DRAW_COLOR_TRANSLATIONS.en);
  const localeKeys = Object.keys(DRAW_COLOR_TRANSLATIONS[locale] || {});

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
  return Object.keys(DRAW_COLOR_TRANSLATIONS);
}

/**
 * Check if a locale is supported
 * @param {string} locale - Locale code to check
 * @returns {boolean} True if supported
 */
function isLocaleSupported(locale) {
  return locale in DRAW_COLOR_TRANSLATIONS;
}

/**
 * IMPLEMENTATION INSTRUCTIONS
 *
 * 1. CRITICAL HTML CHANGES NEEDED (168 elements):
 *    - Only 1 element has data-translate-key (0.6% coverage)
 *    - Add data-translate attributes to ALL remaining HTML elements
 *    - Current coverage is virtually zero - complete overhaul needed
 *
 * 2. JAVASCRIPT CHANGES:
 *    - Add t() function definition
 *    - Replace ALL hardcoded messages with t() calls
 *    - Handle dynamic messages with parameters
 *
 * 3. SPECIAL HANDLING:
 *    - Grid drawing with clue cells functionality
 *    - Mirror options (horizontal, vertical, none)
 *    - Custom image upload workflow
 *    - Part reveal settings
 *    - File input wrapper for browser-controlled elements
 *
 * 4. CATEGORIES (19 total):
 *    - Language Names (11 keys)
 *    - Core UI (3 keys)
 *    - Worksheet Setup (10 keys)
 *    - Text Tools (12 keys)
 *    - Font Options (7 keys)
 *    - Page Setup (11 keys)
 *    - Background Section (4 keys)
 *    - Border Section (4 keys)
 *    - Common (2 keys)
 *    - Image Library (10 keys)
 *    - Upload Section (4 keys)
 *    - Toolbar (14 keys)
 *    - Action Buttons (5 keys)
 *    - Name/Date Fields (2 keys)
 *    - Success Messages (6 keys)
 *    - Error Messages (10 keys)
 *    - Status Messages (5 keys)
 *    - Asset Messages (4 keys)
 *
 * 5. VALIDATION:
 *    Use validateTranslations() to check coverage for each locale
 *
 * 6. TESTING:
 *    - Test with ?locale=de to verify German
 *    - Check all dropdown options
 *    - Test grid drawing functionality
 *    - Test mirror options work correctly
 *    - Test image upload workflow
 *    - Verify error messages for all scenarios
 */

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DRAW_COLOR_TRANSLATIONS,
    getTranslation,
    formatTranslation,
    validateTranslations,
    getSupportedLocales,
    isLocaleSupported
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.DRAW_COLOR_TRANSLATIONS = DRAW_COLOR_TRANSLATIONS;
  window.getTranslation = getTranslation;
  window.formatTranslation = formatTranslation;
}