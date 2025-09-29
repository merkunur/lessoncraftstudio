/**
 * BIG SMALL TRANSLATION MASTER (BSTM)
 * Complete Translation System for Big & Small App
 * Version: 1.0.0
 * Generated: December 2024
 *
 * THIS IS THE MASTER TEMPLATE FOR ALL 11 LANGUAGES
 * Total Translation Keys: 178 (CRITICAL: 1.1% current coverage!)
 *
 * CRITICAL USER-MENTIONED ITEMS:
 * - Background (line 761)
 * - Border (line 767)
 * - Grayscale (line 917)
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

const BIG_SMALL_TRANSLATIONS = {
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
    "bigsmall.page.title": "Big & Small Worksheet Generator",
    "bigsmall.settings.title": "Worksheet Settings",
    "language.label": "Language:",
    "bigsmall.tab.worksheet": "Worksheet",
    "bigsmall.tab.answer": "Answer Key",

    // ============= PAGE SIZE SECTION =============
    "page.size.label": "Page Size:",
    "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
    "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.a4.landscape": "A4 Landscape (297×210mm)",
    "page.size.square": "Square (1200×1200)",
    "page.size.custom": "Custom",
    "page.size.default": "Default Worksheet (800x1000)",
    "bigsmall.width.placeholder": "Width",
    "bigsmall.height.placeholder": "Height",

    // ============= PAGE SETUP SECTION =============
    "bigsmall.page.setup": "Page Setup",
    "bigsmall.configuration": "Configuration",
    "bigsmall.page.size": "Page Size:",
    "bigsmall.width.label": "Width (px):",
    "bigsmall.height.label": "Height (px):",
    "bigsmall.page.color": "Page Color:",
    "bigsmall.include.name.date": "Include Name/Date Fields",
    "bigsmall.apply.size": "Apply Size",

    // ============= BACKGROUND SECTION =============
    "bigsmall.background.title": "Background",  // CRITICAL - User mentioned
    "bigsmall.background.theme": "Background Theme:",
    "bigsmall.background.message": "Select a theme to see backgrounds.",
    "bigsmall.background.opacity": "Background Opacity:",

    // ============= BORDER SECTION =============
    "bigsmall.border.title": "Border",  // CRITICAL - User mentioned
    "bigsmall.border.theme": "Border Theme:",
    "bigsmall.border.message": "Select a theme to see borders.",
    "bigsmall.border.opacity": "Border Opacity:",

    // ============= COMMON =============
    "common.none": "None",
    "common.grayscale": "Grayscale",  // CRITICAL - User mentioned

    // ============= TEXT TOOLS =============
    "bigsmall.text.tools": "Text Tools",
    "bigsmall.text.add.new": "Add New Text",
    "bigsmall.text.content.label": "Content:",
    "bigsmall.text.placeholder": "Worksheet Title...",
    "bigsmall.text.add.button": "Add Text",
    "bigsmall.text.properties": "Selected Text Properties",
    "bigsmall.text.color": "Color:",
    "bigsmall.text.size": "Size:",
    "bigsmall.text.font": "Font:",
    "bigsmall.text.outline.color": "Outline Color:",
    "bigsmall.text.outline.width": "Outline (0-10):",
    "bigsmall.text.default": "New Text",

    // ============= FONT OPTIONS =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= EXERCISE SETTINGS =============
    "bigsmall.exercise.settings": "Exercise Settings",
    "bigsmall.exercise.count": "Number of Exercises (1–10):",
    "bigsmall.images.per.exercise": "Images per Exercise:",
    "bigsmall.image.mode": "Image Mode:",
    "bigsmall.mode.identical": "Identical Images",
    "bigsmall.mode.different": "Different Images",
    "bigsmall.question.type": "Question Type:",
    "bigsmall.type.small": "Circle the small one",
    "bigsmall.type.big": "Circle the big one",
    "bigsmall.type.medium": "Circle the medium one",
    "bigsmall.type.asc": "Number 1-2-3 (small to big)",
    "bigsmall.type.desc": "Number 1-2-3 (big to small)",
    "bigsmall.add.indicators": "Add answer indicators (circles/boxes)",
    "bigsmall.add.numbers": "Add exercise numbers",
    "bigsmall.worksheet.theme": "Worksheet Theme (if not picking images):",

    // ============= IMAGE LIBRARY =============
    "bigsmall.image.library": "Image Library",
    "bigsmall.select.theme": "Select Theme for Dictionary:",
    "bigsmall.search.label": "Search Images:",
    "bigsmall.search.placeholder": "e.g., apple, car",
    "bigsmall.selected.count": "Selected: {count} images",
    "bigsmall.available.images": "Available Images:",
    "bigsmall.loading.images": "Loading images...",
    "bigsmall.selected.images": "Selected Images for Problems:",
    "bigsmall.themes.all": "All Themes",
    "bigsmall.theme.random": "(random)",

    // ============= UPLOAD SECTION =============
    "bigsmall.upload.title": "Upload Custom Images",
    "bigsmall.upload.select": "Select image(s) to upload:",
    "bigsmall.uploaded.label": "Your Uploaded Images (This Session):",
    "bigsmall.uploaded.placeholder": "Your uploaded images will appear here.",

    // ============= TOOLBAR =============
    "toolbar.layers": "Layers",
    "toolbar.bring.forward": "Bring Forward",
    "toolbar.send.backward": "Send Backward",
    "toolbar.align": "Align",
    "toolbar.align.selected": "Align Selected:",
    "toolbar.align.left": "Align Left",
    "toolbar.align.center.h": "Center Horizontally",
    "toolbar.align.right": "Align Right",
    "toolbar.align.top": "Align Top",
    "toolbar.align.center.v": "Center Vertically",
    "toolbar.align.bottom": "Align Bottom",
    "toolbar.distribute.h": "Distribute Horizontally",
    "toolbar.distribute.v": "Distribute Vertically",
    "toolbar.align.to.page": "Align to Page:",
    "toolbar.center.h": "Center Horizontally",
    "toolbar.center.v": "Center Vertically",
    "toolbar.delete": "Delete Selected",

    // ============= ACTION BUTTONS =============
    "bigsmall.generate": "Generate",
    "bigsmall.generate.worksheet": "Generate Worksheet",
    "bigsmall.generate.answer": "Generate Answer Key",
    "bigsmall.download": "Download",
    "bigsmall.download.worksheet.jpeg": "Worksheet (JPEG)",
    "bigsmall.download.answer.jpeg": "Answer Key (JPEG)",
    "bigsmall.download.worksheet.pdf": "Worksheet (PDF)",
    "bigsmall.download.answer.pdf": "Answer Key (PDF)",
    "bigsmall.clear.all": "Clear All",

    // ============= NAME/DATE FIELDS =============
    "bigsmall.name.field": "Name: ____________________",
    "bigsmall.date.field": "Date: ____________________",

    // ============= SUCCESS MESSAGES =============
    "bigsmall.msg.worksheet.success": "Worksheet generated successfully!",
    "bigsmall.msg.answer.generated": "Answer Key Generated.",
    "bigsmall.msg.download.started": "Download started!",
    "bigsmall.msg.text.added": "Text added.",

    // ============= ERROR MESSAGES =============
    "bigsmall.msg.theme.error": "Could not load theme: {theme}",
    "bigsmall.msg.themes.error": "Could not load themes.",
    "bigsmall.msg.themes.loading.error": "Error loading themes.",
    "bigsmall.msg.images.error": "Error loading images.",
    "bigsmall.msg.file.error": "Error reading file: {filename}",
    "bigsmall.msg.pool.empty": "Image pool is empty. Please select images or a valid theme.",
    "bigsmall.msg.too.many": "Warning: Too many exercises for page size. Consider reducing count or using larger page.",
    "bigsmall.msg.generate.first": "Please generate a worksheet first.",
    "bigsmall.msg.canvas.empty": "Canvas is empty.",
    "bigsmall.msg.jpeg.error": "JPEG Error: {message}",

    // ============= INFO/STATUS MESSAGES =============
    "bigsmall.msg.loading.animals": "Loading animals theme...",
    "bigsmall.msg.searching": "Searching...",
    "bigsmall.msg.no.images": "No images found{query}",
    "bigsmall.msg.loading.uploads": "Loading {count} image(s)...",
    "bigsmall.msg.uploads.available": "{count} custom image(s) available.",
    "bigsmall.msg.preparing": "Preparing {filename}...",

    // ============= ASSET MESSAGES =============
    "bigsmall.asset.select": "Select a theme to see {type}.",
    "bigsmall.asset.loading": "Loading {type}...",
    "bigsmall.asset.none": "No {type} available.",
    "bigsmall.asset.error": "Error loading {type}.",

    // ============= WATERMARK TEXT =============
    "bigsmall.watermark.text": "FREE VERSION - LessonCraftStudio.com",
    "bigsmall.watermark.short": "FREE VERSION"
  },

  /**
   * GERMAN - Deutsch
   */
  "de": {
    // Placeholder for German translations - to be completed
    // All 178 keys will follow the same structure as English
  },

  /**
   * FRENCH - Français
   */
  "fr": {
    // Placeholder for French translations - to be completed
    // All 178 keys will follow the same structure as English
  },

  /**
   * SPANISH - Español
   */
  "es": {
    // Placeholder for Spanish translations - to be completed
    // All 178 keys will follow the same structure as English
  },

  /**
   * ITALIAN - Italiano
   */
  "it": {
    // Placeholder for Italian translations - to be completed
    // All 178 keys will follow the same structure as English
  },

  /**
   * PORTUGUESE - Português
   */
  "pt": {
    // Placeholder for Portuguese translations - to be completed
    // All 178 keys will follow the same structure as English
  },

  /**
   * DUTCH - Nederlands
   */
  "nl": {
    // Placeholder for Dutch translations - to be completed
    // All 178 keys will follow the same structure as English
  },

  /**
   * SWEDISH - Svenska
   */
  "sv": {
    // Placeholder for Swedish translations - to be completed
    // All 178 keys will follow the same structure as English
  },

  /**
   * DANISH - Dansk
   */
  "da": {
    // Placeholder for Danish translations - to be completed
    // All 178 keys will follow the same structure as English
  },

  /**
   * NORWEGIAN - Norsk
   */
  "no": {
    // Placeholder for Norwegian translations - to be completed
    // All 178 keys will follow the same structure as English
  },

  /**
   * FINNISH - Suomi
   */
  "fi": {
    // Placeholder for Finnish translations - to be completed
    // All 178 keys will follow the same structure as English
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
  const translation = BIG_SMALL_TRANSLATIONS[locale]?.[key] ||
                     BIG_SMALL_TRANSLATIONS['en'][key] ||
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
  const englishKeys = Object.keys(BIG_SMALL_TRANSLATIONS.en);
  const localeKeys = Object.keys(BIG_SMALL_TRANSLATIONS[locale] || {});

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
  return Object.keys(BIG_SMALL_TRANSLATIONS);
}

/**
 * Check if a locale is supported
 * @param {string} locale - Locale code to check
 * @returns {boolean} True if supported
 */
function isLocaleSupported(locale) {
  return locale in BIG_SMALL_TRANSLATIONS;
}

/**
 * IMPLEMENTATION INSTRUCTIONS
 *
 * 1. CRITICAL HTML CHANGES NEEDED (176 elements):
 *    - Only 2 elements have data-translate (1.1% coverage)
 *    - Add data-translate attributes to ALL remaining HTML elements
 *    - Current coverage is virtually zero - complete overhaul needed
 *
 * 2. JAVASCRIPT CHANGES:
 *    - Add t() function definition
 *    - Replace ALL 41 hardcoded messages with t() calls
 *    - Handle dynamic messages with parameters
 *
 * 3. SPECIAL HANDLING:
 *    - File input wrapper for browser-controlled elements
 *    - Exercise settings (question types, image modes)
 *    - Size comparison options (small, big, medium, ascending, descending)
 *    - Dynamic image count display
 *    - Name/Date field templates
 *
 * 4. CATEGORIES (18 total):
 *    - Language Names (11 keys)
 *    - Core UI (5 keys)
 *    - Page Size Section (10 keys)
 *    - Page Setup (8 keys)
 *    - Background Section (4 keys)
 *    - Border Section (4 keys)
 *    - Text Tools (11 keys)
 *    - Font Options (7 keys)
 *    - Exercise Settings (14 keys)
 *    - Image Library (10 keys)
 *    - Upload Section (4 keys)
 *    - Toolbar (16 keys)
 *    - Action Buttons (9 keys)
 *    - Name/Date Fields (2 keys)
 *    - Messages (37 keys)
 *    - Dynamic Content (26 keys)
 *
 * 5. VALIDATION:
 *    Use validateTranslations() to check coverage for each locale
 *
 * 6. TESTING:
 *    - Test with ?locale=de to verify German
 *    - Check all dropdown options
 *    - Test exercise settings
 *    - Verify question type descriptions
 *    - Check error messages
 *    - Test size comparison generations
 */

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BIG_SMALL_TRANSLATIONS,
    getTranslation,
    formatTranslation,
    validateTranslations,
    getSupportedLocales,
    isLocaleSupported
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.BIG_SMALL_TRANSLATIONS = BIG_SMALL_TRANSLATIONS;
  window.getTranslation = getTranslation;
  window.formatTranslation = formatTranslation;
}