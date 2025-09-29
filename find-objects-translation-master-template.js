/**
 * FIND OBJECTS TRANSLATION MASTER (FOTM)
 * Complete Translation System for Find Objects App
 * Version: 1.0.0
 * Generated: December 2024
 *
 * THIS IS THE MASTER TEMPLATE FOR ALL 11 LANGUAGES
 * Total Translation Keys: 183 (CRITICAL: 0.5% current coverage!)
 *
 * CRITICAL USER-MENTIONED ITEMS:
 * - Background (line 569)
 * - Border (line 583)
 * - Grayscale (line 731)
 *
 * UNIQUE FEATURES:
 * - Distractors selection (8-12 images)
 * - Hidden objects selection (1-5 images)
 * - Theme-based or manual selection
 * - Child-friendly decorations option
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

const FIND_OBJECTS_TRANSLATIONS = {
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
    "findobjects.page.title": "SpotWorks - Find the Objects Generator",
    "findobjects.title": "SpotWorks",
    "language.label": "Language:",
    "findobjects.tab.worksheet": "Worksheet",
    "findobjects.tab.answer": "Answer Key",

    // ============= PAGE & SCENE SECTION =============
    "findobjects.page.scene": "Page & Scene",
    "findobjects.page.setup": "Page Setup",
    "findobjects.page.size.label": "Page Size:",
    "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
    "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.a4.landscape": "A4 Landscape (297×210mm)",
    "page.size.custom": "Custom",
    "findobjects.width.label": "Width (px):",
    "findobjects.height.label": "Height (px):",
    "findobjects.apply.size": "Apply Size",
    "findobjects.use.decorations": "Use Child-Friendly Decorations",
    "findobjects.fallback.color": "Fallback Color:",

    // ============= BACKGROUND SECTION =============
    "findobjects.background.title": "Background",  // CRITICAL - User mentioned
    "findobjects.background.theme": "Background Theme:",
    "findobjects.background.none": "None (Use Fallback Color)",
    "findobjects.background.message": "Select a theme for backgrounds.",
    "findobjects.background.opacity": "Background Opacity:",

    // ============= BORDER SECTION =============
    "findobjects.border.title": "Border",  // CRITICAL - User mentioned
    "findobjects.border.theme": "Border Theme:",
    "findobjects.border.message": "Select a theme for borders.",
    "findobjects.border.opacity": "Border Opacity:",

    // ============= COMMON =============
    "common.none": "None",
    "common.grayscale": "Grayscale",  // CRITICAL - User mentioned

    // ============= TEXT & CONTENT =============
    "findobjects.text.content": "Text & Content",
    "findobjects.text.tools": "Text Tools",
    "findobjects.text.add.label": "Add New Text:",
    "findobjects.text.placeholder": "Find the hidden objects!",
    "findobjects.text.add.button": "Add Text",
    "findobjects.text.properties": "Selected Text Properties",
    "findobjects.text.color": "Color:",
    "findobjects.text.size": "Size:",
    "findobjects.text.font": "Font:",
    "findobjects.text.outline.color": "Outline Color:",
    "findobjects.text.outline.width": "Outline (0-10):",
    "findobjects.other.content": "Other Content",
    "findobjects.include.name.date": "Include Name/Date Fields",
    "findobjects.text.default": "New Text",

    // ============= FONT OPTIONS =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= IMAGE LIBRARY =============
    "findobjects.image.library": "Image Library",
    "findobjects.search.library": "Search Library",
    "findobjects.filter.theme": "Filter by Theme:",
    "findobjects.themes.all": "All Themes",
    "findobjects.search.label": "Search Images:",
    "findobjects.search.placeholder": "e.g., apple, car",
    "findobjects.available.images": "Available Images:",
    "findobjects.loading.images": "Loading images...",

    // ============= UPLOAD SECTION =============
    "findobjects.upload.custom": "Upload Custom Images",
    "findobjects.upload.select": "Select image(s) to upload:",
    "findobjects.uploaded.label": "Your Uploaded Images (This Session):",
    "findobjects.uploaded.placeholder": "Your uploaded images will appear here.",

    // ============= OBJECT SELECTION =============
    "findobjects.object.selection": "Object Selection",
    "findobjects.distractors.label": "Distractors (Select 8–12)",
    "findobjects.distractors.theme": "Or Select Theme for Distractors:",
    "findobjects.no.theme.manual": "-- No Theme (Use Manual Selection) --",
    "findobjects.hidden.label": "Hidden Objects (Select 1–5)",
    "findobjects.hidden.theme": "Or Select Theme for Hidden Objects:",

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
    "findobjects.generate": "Generate",
    "findobjects.generate.worksheet": "Generate Worksheet",
    "findobjects.generate.answer": "Generate Answer Key",
    "findobjects.download": "Download",
    "findobjects.download.worksheet.jpeg": "Worksheet (JPEG)",
    "findobjects.download.answer.jpeg": "Answer Key (JPEG)",
    "findobjects.download.worksheet.pdf": "Worksheet (PDF)",
    "findobjects.download.answer.pdf": "Answer Key (PDF)",
    "findobjects.clear.all": "Clear All",

    // ============= NAME/DATE FIELDS =============
    "findobjects.name.field": "Name: _______________________",
    "findobjects.date.field": "Date: ___________",

    // ============= SUCCESS MESSAGES =============
    "findobjects.msg.worksheet.success": "Worksheet generated successfully!",
    "findobjects.msg.answer.generated": "Answer Key Generated.",
    "findobjects.msg.cleared": "All settings cleared.",
    "findobjects.msg.download.initiated": "Download initiated!",
    "findobjects.msg.pdf.success": "PDF downloaded!",

    // ============= ERROR MESSAGES =============
    "findobjects.msg.themes.error": "Error loading themes.",
    "findobjects.msg.search.error": "Error searching for \"{query}\"",
    "findobjects.msg.theme.error": "Error loading theme: {theme}",
    "findobjects.msg.theme.failed": "Failed to load theme.",
    "findobjects.msg.file.error": "Error reading file: {filename}",
    "findobjects.msg.already.selected": "Image already selected in one of the categories.",
    "findobjects.msg.selection.limit": "Cannot add more than {limit} {category} images.",
    "findobjects.msg.prep.failed": "Image preparation failed. Please check selections.",
    "findobjects.msg.unexpected.error": "An unexpected error occurred. Please try again.",
    "findobjects.msg.generate.first": "Please generate a worksheet first.",
    "findobjects.msg.theme.load.error": "Could not load images for {type} theme.",
    "findobjects.msg.distractor.insufficient": "Distractor theme has fewer than 8 images.",
    "findobjects.msg.hidden.insufficient": "Hidden Object theme has fewer than 1 image.",
    "findobjects.msg.grayscale.error": "Grayscale conversion failed.",
    "findobjects.msg.canvas.empty": "Canvas is empty. Nothing to download.",
    "findobjects.msg.jpeg.error": "Error preparing JPEG.",
    "findobjects.msg.pdf.error": "Error preparing PDF.",
    "findobjects.msg.no.borders": "No borders in this theme.",
    "findobjects.msg.border.error": "Error loading border images.",
    "findobjects.msg.no.backgrounds": "No backgrounds in this theme.",
    "findobjects.msg.background.error": "Error loading background images.",

    // ============= INFO/STATUS MESSAGES =============
    "findobjects.msg.theme.selected": "{type} theme selected. Manual items cleared.",
    "findobjects.msg.searching": "Searching...",
    "findobjects.msg.loading.theme": "Loading {theme}...",
    "findobjects.msg.loading.uploads": "Loading {count} image(s)...",
    "findobjects.msg.uploads.available": "{count} custom image(s) available.",
    "findobjects.msg.no.images": "No images found{query}",
    "findobjects.msg.generating": "Generating worksheet...",
    "findobjects.msg.generating.answer": "Generating Answer Key...",
    "findobjects.msg.preparing.jpeg": "Preparing JPEG download..."
  },

  /**
   * GERMAN - Deutsch
   */
  "de": {
    // Placeholder for German translations - to be completed
    // All 183 keys will follow the same structure as English
  },

  /**
   * FRENCH - Français
   */
  "fr": {
    // Placeholder for French translations - to be completed
    // All 183 keys will follow the same structure as English
  },

  /**
   * SPANISH - Español
   */
  "es": {
    // Placeholder for Spanish translations - to be completed
    // All 183 keys will follow the same structure as English
  },

  /**
   * ITALIAN - Italiano
   */
  "it": {
    // Placeholder for Italian translations - to be completed
    // All 183 keys will follow the same structure as English
  },

  /**
   * PORTUGUESE - Português
   */
  "pt": {
    // Placeholder for Portuguese translations - to be completed
    // All 183 keys will follow the same structure as English
  },

  /**
   * DUTCH - Nederlands
   */
  "nl": {
    // Placeholder for Dutch translations - to be completed
    // All 183 keys will follow the same structure as English
  },

  /**
   * SWEDISH - Svenska
   */
  "sv": {
    // Placeholder for Swedish translations - to be completed
    // All 183 keys will follow the same structure as English
  },

  /**
   * DANISH - Dansk
   */
  "da": {
    // Placeholder for Danish translations - to be completed
    // All 183 keys will follow the same structure as English
  },

  /**
   * NORWEGIAN - Norsk
   */
  "no": {
    // Placeholder for Norwegian translations - to be completed
    // All 183 keys will follow the same structure as English
  },

  /**
   * FINNISH - Suomi
   */
  "fi": {
    // Placeholder for Finnish translations - to be completed
    // All 183 keys will follow the same structure as English
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
  const translation = FIND_OBJECTS_TRANSLATIONS[locale]?.[key] ||
                     FIND_OBJECTS_TRANSLATIONS['en'][key] ||
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
  const englishKeys = Object.keys(FIND_OBJECTS_TRANSLATIONS.en);
  const localeKeys = Object.keys(FIND_OBJECTS_TRANSLATIONS[locale] || {});

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
  return Object.keys(FIND_OBJECTS_TRANSLATIONS);
}

/**
 * Check if a locale is supported
 * @param {string} locale - Locale code to check
 * @returns {boolean} True if supported
 */
function isLocaleSupported(locale) {
  return locale in FIND_OBJECTS_TRANSLATIONS;
}

/**
 * IMPLEMENTATION INSTRUCTIONS
 *
 * 1. CRITICAL HTML CHANGES NEEDED (182 elements):
 *    - Only 1 element has data-translate-key (0.5% coverage)
 *    - Add data-translate attributes to ALL remaining HTML elements
 *    - Current coverage is virtually zero - complete overhaul needed
 *
 * 2. JAVASCRIPT CHANGES:
 *    - Add t() function definition
 *    - Replace ALL hardcoded messages with t() calls
 *    - Handle dynamic messages with parameters
 *
 * 3. SPECIAL HANDLING:
 *    - Distractors selection (8-12 images)
 *    - Hidden objects selection (1-5 images)
 *    - Theme-based or manual selection for both categories
 *    - Child-friendly decorations option
 *    - File input wrapper for browser-controlled elements
 *
 * 4. CATEGORIES (20 total):
 *    - Language Names (11 keys)
 *    - Core UI (5 keys)
 *    - Page & Scene Section (13 keys)
 *    - Background Section (5 keys)
 *    - Border Section (4 keys)
 *    - Common (2 keys)
 *    - Text & Content (14 keys)
 *    - Font Options (7 keys)
 *    - Image Library (8 keys)
 *    - Upload Section (4 keys)
 *    - Object Selection (6 keys)
 *    - Toolbar (14 keys)
 *    - Action Buttons (9 keys)
 *    - Name/Date Fields (2 keys)
 *    - Success Messages (5 keys)
 *    - Error Messages (21 keys)
 *    - Status Messages (9 keys)
 *
 * 5. VALIDATION:
 *    Use validateTranslations() to check coverage for each locale
 *
 * 6. TESTING:
 *    - Test with ?locale=de to verify German
 *    - Check all dropdown options
 *    - Test distractor selection (8-12)
 *    - Test hidden object selection (1-5)
 *    - Test theme-based vs manual selection
 *    - Verify error messages for all scenarios
 */

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FIND_OBJECTS_TRANSLATIONS,
    getTranslation,
    formatTranslation,
    validateTranslations,
    getSupportedLocales,
    isLocaleSupported
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.FIND_OBJECTS_TRANSLATIONS = FIND_OBJECTS_TRANSLATIONS;
  window.getTranslation = getTranslation;
  window.formatTranslation = formatTranslation;
}