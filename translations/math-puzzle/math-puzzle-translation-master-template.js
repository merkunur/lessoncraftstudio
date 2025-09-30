/**
 * Math Puzzle Translation Master Template
 * Total Keys: 177
 * Languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI
 *
 * Current Coverage: 15.3% (27 keys translated) - HIGHEST COVERAGE SO FAR!
 * Target Coverage: 100% (177 keys)
 *
 * Categories:
 * 1. Language Names (11 keys)
 * 2. Core UI (27 keys - already translated)
 * 3. Page Setup (17 keys)
 * 4. Text Tools (15 keys)
 * 5. Puzzle Configuration (6 keys)
 * 6. Image Library (7 keys)
 * 7. Upload Section (4 keys)
 * 8. Font Options (7 keys)
 * 9. Toolbar Actions (20 keys)
 * 10. Action Buttons (13 keys)
 * 11. Tab Labels (2 keys)
 * 12. Upload & Theme Messages (13 keys)
 * 13. Asset Loading Messages (10 keys)
 * 14. Generation Messages (8 keys)
 * 15. Download & PDF Messages (14 keys)
 * 16. Common Terms (3 keys)
 * 17. Page Title (1 key)
 */

const MATH_PUZZLE_TRANSLATIONS = {
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

    // ============= 2. Core UI (27 keys - ALREADY TRANSLATED) =============
    "mathPuzzle": "Math Puzzle",
    "pageSettings": "Page Setup",
    "selectLanguage": "Select Language",
    "language": "Language:",
    "pageSize": "Page Size:",
    "pageColor": "Page Color:",
    "backgroundTheme": "Background Theme:",
    "backgroundOpacity": "Background Opacity:",
    "borderTheme": "Border Theme:",
    "borderOpacity": "Border Opacity:",
    "content": "Content:",
    "color": "Color:",
    "size": "Size:",
    "font": "Font:",
    "outlineColor": "Outline Color:",
    "outlineWidth": "Outline (0-10):",
    "rowsRange": "Rows (2–4):",
    "columnsRange": "Columns (2–4):",
    "operation": "Operation:",
    "selectTheme": "Select Theme:",
    "searchImages": "Search Images:",
    "availableImages": "Available Images:",
    "selectedImageForPuzzle": "Selected Image for Puzzle:",
    "selectImagesToUpload": "Select image(s) to upload:",
    "yourUploadedImages": "Your Uploaded Images (This Session):",
    "alignToPage": "Align to Page:",
    "alignSelected": "Align Selected:",

    // ============= 3. Page Setup (17 keys) =============
    "mathpuzzle.page.title": "Grid-Match Puzzle Worksheet Generator",
    "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
    "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.a4.landscape": "A4 Landscape (297×210mm)",
    "page.size.default": "Default Worksheet (800x1000)",
    "page.size.square": "Square (1200x1200)",
    "mathpuzzle.apply.size.color": "Apply Size & Color",
    "mathpuzzle.background.title": "Background",
    "mathpuzzle.background.message": "Select a theme for backgrounds.",
    "mathpuzzle.border.title": "Border",
    "mathpuzzle.border.message": "Select a theme to see borders.",
    "mathpuzzle.language.description": "Image names and themes will be displayed in the selected language.",
    "mathpuzzle.page.setup": "Page Setup",
    "mathpuzzle.background.opacity": "Background Opacity:",
    "mathpuzzle.border.opacity": "Border Opacity:",
    "mathpuzzle.page.color": "Page Color:",

    // ============= 4. Text Tools (15 keys) =============
    "mathpuzzle.text.tools": "Text Tools",
    "mathpuzzle.text.add.new": "Add New Text",
    "mathpuzzle.text.placeholder": "Hello!",
    "mathpuzzle.text.add.button": "Add Text",
    "mathpuzzle.text.properties": "Selected Text Properties",
    "mathpuzzle.text.content": "Content:",
    "mathpuzzle.text.color": "Color:",
    "mathpuzzle.text.size": "Size:",
    "mathpuzzle.text.font": "Font:",
    "mathpuzzle.text.outline.color": "Outline Color:",
    "mathpuzzle.text.outline.width": "Outline (0-10):",
    "mathpuzzle.text.default": "New Text",
    "mathpuzzle.msg.text.added": "Text added to canvas.",
    "mathpuzzle.msg.text.updated": "Text properties updated.",
    "mathpuzzle.msg.text.deleted": "Text deleted.",

    // ============= 5. Puzzle Configuration (6 keys) =============
    "mathpuzzle.puzzle.config": "Puzzle Configuration",
    "operation.addition": "Addition",
    "operation.subtraction": "Subtraction",
    "operation.both": "Addition & Subtraction",
    "mathpuzzle.rows.label": "Rows (2–4):",
    "mathpuzzle.columns.label": "Columns (2–4):",

    // ============= 6. Image Library (7 keys) =============
    "mathpuzzle.image.library": "Image Library",
    "mathpuzzle.search.placeholder": "e.g., cat, apple",
    "mathpuzzle.loading.images": "Loading images...",
    "mathpuzzle.none.selected": "None Selected",
    "mathpuzzle.available.images": "Available Images:",
    "mathpuzzle.selected.image": "Selected Image for Puzzle:",
    "mathpuzzle.select.theme": "Select Theme:",

    // ============= 7. Upload Section (4 keys) =============
    "mathpuzzle.upload.custom": "Upload Custom Images",
    "mathpuzzle.uploaded.placeholder": "Your uploaded images will appear here.",
    "mathpuzzle.upload.select": "Select image(s) to upload:",
    "mathpuzzle.uploaded.label": "Your Uploaded Images (This Session):",

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

    // ============= 10. Action Buttons (13 keys) =============
    "mathpuzzle.generate": "Generate",
    "mathpuzzle.generate.worksheet": "Generate Worksheet",
    "mathpuzzle.generate.answer": "Generate Answer Key",
    "mathpuzzle.download": "Download",
    "mathpuzzle.download.worksheet.jpeg": "Worksheet (JPEG)",
    "mathpuzzle.download.answer.jpeg": "Answer Key (JPEG)",
    "mathpuzzle.download.worksheet.pdf": "Worksheet (PDF)",
    "mathpuzzle.download.answer.pdf": "Answer Key (PDF)",
    "common.grayscale": "Grayscale",
    "mathpuzzle.clear.all": "Clear All",
    "mathpuzzle.msg.generate.complete": "Puzzle generated successfully!",
    "mathpuzzle.msg.cleared": "All content cleared.",
    "mathpuzzle.msg.download.ready": "Download ready.",

    // ============= 11. Tab Labels (2 keys) =============
    "mathpuzzle.tab.worksheet": "Worksheet",
    "mathpuzzle.tab.answer": "Answer Key",

    // ============= 12. Upload & Theme Messages (13 keys) =============
    "mathpuzzle.msg.loading.uploads": "Loading {filesToLoad} image(s)...",
    "mathpuzzle.msg.uploads.available": "{count} custom image(s) available.",
    "mathpuzzle.msg.file.error": "Error reading file: {fileName}",
    "mathpuzzle.msg.form.cleared": "Form cleared.",
    "mathpuzzle.themes.all": "All Themes",
    "mathpuzzle.msg.themes.error": "Error loading themes.",
    "mathpuzzle.msg.loading.theme": "Loading images for theme...",
    "mathpuzzle.msg.loading.default": "Loading default theme...",
    "mathpuzzle.msg.type.search": "Type to search all images.",
    "mathpuzzle.msg.searching": "Searching...",
    "mathpuzzle.msg.search.error": "Error during search.",
    "mathpuzzle.msg.no.images": "No images found{query}",
    "mathpuzzle.msg.theme.loaded": "Theme loaded successfully.",

    // ============= 13. Asset Loading Messages (10 keys) =============
    "mathpuzzle.msg.loading.backgrounds": "Loading backgrounds...",
    "mathpuzzle.msg.backgrounds.error": "Error loading backgrounds.",
    "mathpuzzle.msg.background.failed": "Failed to load background image.",
    "mathpuzzle.msg.loading.borders": "Loading borders...",
    "mathpuzzle.msg.borders.error": "Error loading borders.",
    "mathpuzzle.msg.no.items": "No items in this theme.",
    "mathpuzzle.msg.border.failed": "Failed to load border image.",
    "mathpuzzle.asset.loaded": "{type} loaded successfully.",
    "mathpuzzle.asset.none": "No {type} available.",
    "mathpuzzle.asset.select": "Select a theme to see {type}.",

    // ============= 14. Generation Messages (8 keys) =============
    "mathpuzzle.msg.using.upload": "No library image was selected. Using \"{imageName}\" from your uploads.",
    "mathpuzzle.msg.generating.data": "Generating puzzle data...",
    "mathpuzzle.msg.rendering.worksheet": "Rendering worksheet...",
    "mathpuzzle.msg.worksheet.success": "Worksheet generated successfully!",
    "mathpuzzle.msg.generate.first": "Please generate a worksheet first.",
    "mathpuzzle.msg.rendering.answer": "Rendering answer key...",
    "mathpuzzle.msg.answer.generated": "Answer key generated!",
    "mathpuzzle.msg.generation.error": "Error generating puzzle: {error}",

    // ============= 15. Download & PDF Messages (14 keys) =============
    "mathpuzzle.msg.preparing.jpeg": "Preparing JPEG... Please wait.",
    "mathpuzzle.msg.jpeg.error": "Error preparing JPEG: {error}",
    "mathpuzzle.watermark.main": "FREE VERSION - LessonCraftStudio.com",
    "mathpuzzle.watermark.text": "FREE VERSION",
    "mathpuzzle.msg.generate.content": "Please generate content first.",
    "mathpuzzle.msg.preparing.pdf": "Preparing PDF...",
    "mathpuzzle.msg.pdf.downloaded": "PDF downloaded!",
    "mathpuzzle.msg.pdf.error": "Error creating PDF.",
    "mathpuzzle.msg.generate.worksheet.first": "Please generate a worksheet first.",
    "mathpuzzle.msg.preparing.jpeg.simple": "Preparing JPEG...",
    "mathpuzzle.msg.jpeg.initiated": "JPEG download initiated!",
    "mathpuzzle.msg.jpeg.error.simple": "Error preparing JPEG.",
    "mathpuzzle.msg.preparing.pdf.wait": "Preparing PDF... Please wait.",
    "mathpuzzle.msg.pdf.error.detailed": "Error creating PDF: {error}",

    // ============= 16. Common Terms (3 keys) =============
    "common.none": "None",
    "common.loading": "Loading...",
    "common.error": "Error",

    // ============= 17. Error Messages (Additional) =============
    "error.invalid.dimensions": "Invalid dimensions. Please check rows and columns.",
    "error.no.image.selected": "Please select an image for the puzzle.",
    "error.no.theme.selected": "Please select a theme first.",
    "error.upload.failed": "Upload failed. Please try again.",
    "error.file.too.large": "File size too large. Maximum size is 5MB.",
    "error.invalid.file.type": "Invalid file type. Please upload image files only.",
    "error.canvas.creation": "Error creating canvas.",
    "error.export.failed": "Export failed. Please try again.",
    "error.network": "Network error. Please check your connection.",
    "error.puzzle.generation": "Could not generate puzzle. Please try different settings.",
    "error.invalid.operation": "Invalid operation selected.",
    "error.grid.size": "Grid size must be between 2 and 4.",
    "error.no.solution": "Could not find solution for puzzle.",
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
  const translation = MATH_PUZZLE_TRANSLATIONS[locale]?.[key] ||
                     MATH_PUZZLE_TRANSLATIONS['en'][key] ||
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
  const englishKeys = Object.keys(MATH_PUZZLE_TRANSLATIONS.en);
  const localeKeys = Object.keys(MATH_PUZZLE_TRANSLATIONS[locale] || {});

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

  console.log(`Math Puzzle translations initialized for locale: ${initialLocale}`);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MATH_PUZZLE_TRANSLATIONS,
    getTranslation,
    formatTranslation,
    updateAllTranslations,
    validateTranslations,
    initializeTranslations
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.MATH_PUZZLE_TRANSLATIONS = MATH_PUZZLE_TRANSLATIONS;
  window.getTranslation = getTranslation;
  window.formatTranslation = formatTranslation;
  window.updateAllTranslations = updateAllTranslations;
  window.validateTranslations = validateTranslations;
  window.initializeTranslations = initializeTranslations;
}