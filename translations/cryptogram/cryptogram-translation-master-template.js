/**
 * Image Cryptogram Translation Master Template
 * Total Keys: 194
 * Languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI
 *
 * Current Coverage: 3.1% (6 keys translated)
 * Target Coverage: 100% (194 keys)
 *
 * Categories:
 * 1. Language Names (11 keys)
 * 2. Core UI (6 keys - already translated)
 * 3. Puzzle Rules (7 keys)
 * 4. Image Assignment (9 keys)
 * 5. Upload Section (4 keys)
 * 6. Page Setup (19 keys)
 * 7. Text Tools (15 keys)
 * 8. Font Options (7 keys)
 * 9. Toolbar Actions (20 keys)
 * 10. Action Buttons (10 keys)
 * 11. Tab Labels (2 keys)
 * 12. Generation Messages (6 keys)
 * 13. Theme Loading Messages (6 keys)
 * 14. Auto-Assign Messages (6 keys)
 * 15. Search Messages (5 keys)
 * 16. Clear & Download Messages (15 keys)
 * 17. Asset Loading Messages (5 keys)
 * 18. Common Terms (3 keys)
 * 19. Placeholders (5 keys)
 * 20. Page Title (1 key)
 * 21. Error Messages (32 keys)
 */

const CRYPTOGRAM_TRANSLATIONS = {
  // English - Complete Reference
  en: {
    // ============= 1. Language Names (11 keys) =============
    "language.english": "English",
    "language.german.full": "Deutsch (German)",
    "language.french.full": "Français (French)",
    "language.spanish.full": "Español (Spanish)",
    "language.portuguese.full": "Português (Portuguese)",
    "language.italian.full": "Italiano (Italian)",
    "language.dutch.full": "Nederlands (Dutch)",
    "language.swedish.full": "Svenska (Swedish)",
    "language.danish.full": "Dansk (Danish)",
    "language.norwegian.full": "Norsk (Norwegian)",
    "language.finnish.full": "Suomi (Finnish)",

    // ============= 2. Core UI (6 keys - ALREADY TRANSLATED) =============
    "title": "Cryptogram Settings",
    "imageCryptogram": "Image Cryptogram",
    "selectLanguage": "Select Language",
    "language": "Language:",
    "pageSize": "Page Size:",
    "pageSetup": "Page Setup",

    // ============= 3. Puzzle Rules (7 keys) =============
    "cryptogram.puzzle.rules": "Puzzle Rules",
    "cryptogram.phrases.label": "Phrases (one per line):",
    "cryptogram.phrases.placeholder": "The quick brown fox...",
    "cryptogram.letters.reveal": "Letters to Reveal:",
    "cryptogram.max.lines": "Max Lines per Puzzle:",
    "cryptogram.auto.assign": "Auto-assign images",
    "cryptogram.language.description": "Image names and themes will be displayed in the selected language.",

    // ============= 4. Image Assignment (9 keys) =============
    "cryptogram.image.assignment": "Image Assignment",
    "cryptogram.image.theme": "Image Theme:",
    "cryptogram.select.letter": "Select a letter to assign an image:",
    "cryptogram.search.label": "Search Images:",
    "cryptogram.search.placeholder": "e.g., apple, car",
    "cryptogram.available.images": "Available Images (click to assign):",
    "cryptogram.select.letter.above": "Select a letter above.",
    "cryptogram.assigned.images": "Assigned Images:",
    "cryptogram.msg.type.search": "Type to search all images.",

    // ============= 5. Upload Section (4 keys) =============
    "cryptogram.upload.title": "Upload Custom Images",
    "cryptogram.upload.select": "Select image(s) to upload:",
    "cryptogram.uploaded.label": "Your Uploaded Images:",
    "cryptogram.uploaded.placeholder": "Your uploaded images will appear here.",

    // ============= 6. Page Setup (19 keys) =============
    "cryptogram.page.setup": "Page Setup",
    "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
    "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.a4.landscape": "A4 Landscape (297×210mm)",
    "page.size.square": "Square (1200×1200)",
    "page.size.custom": "Custom",
    "cryptogram.width.label": "Width (px):",
    "cryptogram.height.label": "Height (px):",
    "cryptogram.page.color": "Page Color:",
    "cryptogram.apply.size.color": "Apply Size & Color",
    "cryptogram.background.title": "Background",
    "cryptogram.background.theme": "Background Theme:",
    "cryptogram.background.message": "Select a theme for backgrounds.",
    "cryptogram.background.opacity": "Background Opacity:",
    "cryptogram.border.title": "Border",
    "cryptogram.border.theme": "Border Theme:",
    "cryptogram.border.message": "Select a theme to see borders.",
    "cryptogram.border.opacity": "Border Opacity:",

    // ============= 7. Text Tools (15 keys) =============
    "cryptogram.text.tools": "Text Tools",
    "cryptogram.text.add.new": "Add New Text",
    "cryptogram.text.content.label": "Content:",
    "cryptogram.text.placeholder": "Hello!",
    "cryptogram.text.add.button": "Add Text",
    "cryptogram.text.properties": "Selected Text Properties",
    "cryptogram.text.color": "Color:",
    "cryptogram.text.size": "Size:",
    "cryptogram.text.font": "Font:",
    "cryptogram.text.outline.color": "Outline Color:",
    "cryptogram.text.outline.width": "Outline (0-10):",
    "cryptogram.text.default": "New Text",
    "cryptogram.page.title": "Image Cryptogram Worksheet Generator",
    "cryptogram.msg.text.added": "Text added to canvas.",
    "cryptogram.msg.text.updated": "Text properties updated.",

    // ============= 8. Font Options (7 keys) =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= 9. Toolbar Actions (20 keys) =============
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
    "toolbar.msg.aligned": "Objects aligned.",
    "toolbar.msg.layer.changed": "Layer order changed.",
    "toolbar.msg.deleted": "Selected objects deleted.",
    "toolbar.msg.select.first": "Please select an object first.",
    "toolbar.msg.nothing.selected": "No objects selected.",

    // ============= 10. Action Buttons (10 keys) =============
    "cryptogram.generate": "Generate",
    "cryptogram.download": "Download",
    "cryptogram.download.worksheet.jpeg": "Worksheet (JPEG)",
    "cryptogram.download.answer.jpeg": "Answer Key (JPEG)",
    "cryptogram.download.worksheet.pdf": "Worksheet (PDF)",
    "cryptogram.download.answer.pdf": "Answer Key (PDF)",
    "common.grayscale": "Grayscale",
    "cryptogram.clear.all": "Clear All",
    "cryptogram.msg.generate.complete": "Cryptogram generated successfully!",
    "cryptogram.msg.cleared": "All content cleared.",

    // ============= 11. Tab Labels (2 keys) =============
    "cryptogram.tab.worksheet": "Worksheet",
    "cryptogram.tab.answer": "Answer Key",

    // ============= 12. Generation Messages (6 keys) =============
    "cryptogram.msg.generating": "Generating puzzle data...",
    "cryptogram.msg.worksheet.generated": "Worksheet generated successfully!",
    "cryptogram.msg.error": "Error: {error}",
    "cryptogram.msg.enter.phrase": "Please enter at least one phrase.",
    "cryptogram.msg.missing.images": "Missing images for letters: {letters}. Please assign or auto-assign.",
    "cryptogram.msg.generate.first": "Please generate content first.",

    // ============= 13. Theme Loading Messages (6 keys) =============
    "cryptogram.themes.all": "All Themes",
    "cryptogram.msg.themes.error": "Could not load themes.",
    "cryptogram.msg.loading.default": "Loading default theme...",
    "cryptogram.msg.loading.theme": "Loading {theme}...",
    "cryptogram.msg.theme.failed": "Failed to load theme \"{theme}\"",
    "cryptogram.msg.theme.loaded": "Theme loaded successfully.",

    // ============= 14. Auto-Assign Messages (6 keys) =============
    "cryptogram.msg.fetching.images": "Fetching all images for auto-assign...",
    "cryptogram.msg.fetch.failed": "Failed to fetch image list from server.",
    "cryptogram.msg.no.images.server": "Cannot auto-assign. No images found on server.",
    "cryptogram.msg.auto.assigned": "Images have been auto-assigned.",
    "cryptogram.msg.select.letter.first": "Please select a letter first.",
    "cryptogram.msg.auto.assigning": "Auto-assigning images to letters...",

    // ============= 15. Search Messages (5 keys) =============
    "cryptogram.msg.searching": "Searching...",
    "cryptogram.msg.search.failed": "Failed to search for \"{query}\"",
    "cryptogram.msg.no.images": "No images found{query}",
    "cryptogram.msg.uploads.available": "{count} custom image(s) available.",
    "cryptogram.msg.search.complete": "Search complete.",

    // ============= 16. Clear & Download Messages (15 keys) =============
    "cryptogram.msg.form.cleared": "Form cleared.",
    "cryptogram.msg.canvas.unavailable": "Canvas not available.",
    "cryptogram.msg.preparing.file": "Preparing {fileName}...",
    "cryptogram.msg.jpeg.initiated": "JPEG download initiated!",
    "cryptogram.msg.jpeg.error": "Error preparing JPEG: {error}",
    "cryptogram.watermark.main": "FREE VERSION - LessonCraftStudio.com",
    "cryptogram.watermark.text": "FREE VERSION",
    "cryptogram.msg.preparing.pdf": "Preparing PDF...",
    "cryptogram.msg.pdf.downloaded": "PDF downloaded!",
    "cryptogram.msg.pdf.error": "Error creating PDF.",
    "cryptogram.msg.generate.worksheet.first": "Please generate a worksheet first.",
    "cryptogram.msg.preparing.jpeg": "Preparing JPEG...",
    "cryptogram.msg.jpeg.error.simple": "Error preparing JPEG.",
    "cryptogram.msg.pdf.error.detailed": "Error creating PDF: {error}",
    "cryptogram.msg.download.ready": "Download ready.",

    // ============= 17. Asset Loading Messages (5 keys) =============
    "cryptogram.asset.select": "Select a theme to see {type}.",
    "cryptogram.asset.loading": "Loading {theme} {type}...",
    "cryptogram.asset.none": "No {type} in this theme.",
    "cryptogram.asset.error": "Error loading {type}.",
    "cryptogram.asset.loaded": "{type} loaded successfully.",

    // ============= 18. Common Terms (3 keys) =============
    "common.none": "None",
    "common.loading": "Loading...",
    "common.error": "Error",

    // ============= 19. Placeholders (5 keys) =============
    "placeholder.search": "Search...",
    "placeholder.enter.text": "Enter text here",
    "placeholder.custom.width": "Width",
    "placeholder.custom.height": "Height",
    "placeholder.reveal.count": "0",

    // ============= 20. Error Messages (32 keys) =============
    "error.invalid.dimensions": "Invalid dimensions. Please check width and height.",
    "error.no.theme.selected": "Please select a theme first.",
    "error.no.images.theme": "No images available in selected theme.",
    "error.upload.failed": "Upload failed. Please try again.",
    "error.file.too.large": "File size too large. Maximum size is 5MB.",
    "error.invalid.file.type": "Invalid file type. Please upload image files only.",
    "error.canvas.creation": "Error creating canvas.",
    "error.export.failed": "Export failed. Please try again.",
    "error.network": "Network error. Please check your connection.",
    "error.theme.empty": "Selected theme has no images.",
    "error.puzzle.generation": "Could not generate puzzle. Please try different phrases.",
    "error.insufficient.images": "Not enough images for all letters. Please add more images or reduce unique letters.",
    "error.no.intersections": "Could not find enough intersections for the words. Try different images.",
    "error.invalid.phrase": "Invalid phrase. Please enter valid text.",
    "error.letter.assignment": "Error assigning image to letter.",
    "error.image.loading": "Error loading image.",
    "error.border.loading": "Error loading border.",
    "error.background.loading": "Error loading background.",
    "error.text.empty": "Please enter text content.",
    "error.object.selection": "Please select an object to modify.",
    "error.alignment": "Error aligning objects.",
    "error.layer.operation": "Error changing layer order.",
    "error.delete.operation": "Error deleting objects.",
    "error.color.invalid": "Invalid color value.",
    "error.size.invalid": "Invalid size value.",
    "error.outline.invalid": "Invalid outline width.",
    "error.opacity.invalid": "Invalid opacity value.",
    "error.theme.not.found": "Theme not found.",
    "error.api.connection": "Could not connect to server.",
    "error.session.expired": "Session expired. Please refresh the page.",
    "error.browser.unsupported": "Your browser is not supported. Please use a modern browser.",
    "error.feature.unavailable": "This feature is not available in the free version."
  },

  // German - TO BE TRANSLATED
  de: {
    // Copy all keys from English and translate
    // Example:
    // "language.english": "Englisch",
    // "language.german.full": "Deutsch",
    // etc...
  },

  // French - TO BE TRANSLATED
  fr: {
    // Copy all keys from English and translate
  },

  // Spanish - TO BE TRANSLATED
  es: {
    // Copy all keys from English and translate
  },

  // Italian - TO BE TRANSLATED
  it: {
    // Copy all keys from English and translate
  },

  // Portuguese - TO BE TRANSLATED
  pt: {
    // Copy all keys from English and translate
  },

  // Dutch - TO BE TRANSLATED
  nl: {
    // Copy all keys from English and translate
  },

  // Swedish - TO BE TRANSLATED
  sv: {
    // Copy all keys from English and translate
  },

  // Danish - TO BE TRANSLATED
  da: {
    // Copy all keys from English and translate
  },

  // Norwegian - TO BE TRANSLATED
  no: {
    // Copy all keys from English and translate
  },

  // Finnish - TO BE TRANSLATED
  fi: {
    // Copy all keys from English and translate
  }
};

// ==========================================
// HELPER FUNCTIONS FOR TRANSLATION MANAGEMENT
// ==========================================

/**
 * Get translation for a key in specified locale
 * @param {string} key - Translation key
 * @param {string} locale - Language locale (default: 'en')
 * @param {object} params - Parameters for interpolation
 * @returns {string} Translated text
 */
function getTranslation(key, locale = 'en', params = {}) {
  const translation = CRYPTOGRAM_TRANSLATIONS[locale]?.[key] ||
                     CRYPTOGRAM_TRANSLATIONS['en'][key] ||
                     key;

  // Handle parameter interpolation
  return formatTranslation(translation, params);
}

/**
 * Format translation with parameters
 * @param {string} text - Text with placeholders
 * @param {object} params - Parameters to replace
 * @returns {string} Formatted text
 */
function formatTranslation(text, params) {
  let formattedText = text;
  for (const [key, value] of Object.entries(params)) {
    // Replace {key} with value
    formattedText = formattedText.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return formattedText;
}

/**
 * Update all translated elements on the page
 * @param {string} locale - Target locale
 */
function updateAllTranslations(locale) {
  // Update elements with data-translate
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

  // Update elements with data-translate-key
  document.querySelectorAll('[data-translate-key]').forEach(element => {
    const key = element.getAttribute('data-translate-key');
    const translation = getTranslation(key, locale);
    element.textContent = translation;
  });

  // Update placeholders with data-translate-placeholder
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    element.placeholder = getTranslation(key, locale);
  });

  // Update titles/tooltips with data-translate-title
  document.querySelectorAll('[data-translate-title]').forEach(element => {
    const key = element.getAttribute('data-translate-title');
    element.title = getTranslation(key, locale);
  });
}

/**
 * Validate that all keys exist for a locale
 * @param {string} locale - Locale to validate
 * @returns {object} Validation result
 */
function validateTranslations(locale) {
  const englishKeys = Object.keys(CRYPTOGRAM_TRANSLATIONS.en);
  const localeKeys = Object.keys(CRYPTOGRAM_TRANSLATIONS[locale] || {});

  const missing = englishKeys.filter(key => !localeKeys.includes(key));
  const extra = localeKeys.filter(key => !englishKeys.includes(key));

  return {
    valid: missing.length === 0 && extra.length === 0,
    missing,
    extra,
    coverage: `${((localeKeys.length / englishKeys.length) * 100).toFixed(1)}%`
  };
}

/**
 * Initialize translation system
 * @param {string} initialLocale - Initial locale to load
 */
function initializeTranslations(initialLocale = 'en') {
  // Set current locale
  window.currentLocale = initialLocale;

  // Update all translations
  updateAllTranslations(initialLocale);

  // Listen for language changes
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
      window.currentLocale = e.target.value;
      updateAllTranslations(e.target.value);
    });
  }

  console.log(`Cryptogram translations initialized for locale: ${initialLocale}`);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CRYPTOGRAM_TRANSLATIONS,
    getTranslation,
    formatTranslation,
    updateAllTranslations,
    validateTranslations,
    initializeTranslations
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.CRYPTOGRAM_TRANSLATIONS = CRYPTOGRAM_TRANSLATIONS;
  window.getTranslation = getTranslation;
  window.formatTranslation = formatTranslation;
  window.updateAllTranslations = updateAllTranslations;
  window.validateTranslations = validateTranslations;
  window.initializeTranslations = initializeTranslations;
}