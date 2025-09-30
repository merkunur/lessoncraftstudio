/**
 * More Less Translation Master Template
 * Total Keys: 178
 * Languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI
 *
 * Current Coverage: 0% (NO TRANSLATIONS YET!)
 * Target Coverage: 100% (178 keys)
 *
 * Categories:
 * 1. Language Names (11 keys)
 * 2. Page Title & Headers (7 keys)
 * 3. Page Setup (18 keys)
 * 4. Text Tools (15 keys)
 * 5. Worksheet Configuration (22 keys)
 * 6. Comparison Symbols (3 keys)
 * 7. Display Options (6 keys)
 * 8. Upload Section (3 keys)
 * 9. Font Options (7 keys)
 * 10. Toolbar Actions (20 keys)
 * 11. Action Buttons (13 keys)
 * 12. Tab Labels (2 keys)
 * 13. Theme Messages (8 keys)
 * 14. Border & Background Messages (5 keys)
 * 15. Generation & Validation Messages (11 keys)
 * 16. Answer Key Messages (2 keys)
 * 17. Download & Export Messages (6 keys)
 * 18. Text & Upload Messages (4 keys)
 * 19. Common Terms (3 keys)
 * 20. Name/Date Fields (2 keys)
 * 21. Placeholders (4 keys)
 * 22. Error Messages (6 keys)
 */

const MORE_LESS_TRANSLATIONS = {
  // English - Complete Reference
  en: {
    // ============= 1. Language Names (11 keys) =============
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

    // ============= 2. Page Title & Headers (7 keys) =============
    "moreless.page.title": "Compare Numbers Worksheet",
    "moreless.title": "Comparison Worksheet Maker",
    "moreless.language.selection": "Language Selection",
    "moreless.page.setup": "Page Setup",
    "moreless.text.tools": "Text Tools",
    "moreless.worksheet.config": "Worksheet Configuration",
    "moreless.upload.custom": "Upload Custom Images",

    // ============= 3. Page Setup (18 keys) =============
    "moreless.language.label": "Language:",
    "moreless.page.size": "Page Size:",
    "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
    "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.a4.landscape": "A4 Landscape (297×210mm)",
    "page.size.square": "Square (1200x1200)",
    "page.size.custom": "Custom",
    "moreless.width.label": "Width (px):",
    "moreless.height.label": "Height (px):",
    "moreless.page.color": "Page Color:",
    "moreless.apply.size": "Apply Size",
    "moreless.background.title": "Background",
    "moreless.background.theme": "Background Theme:",
    "moreless.background.message": "Select a theme for backgrounds.",
    "moreless.background.opacity": "Background Opacity:",
    "moreless.border.title": "Border",
    "moreless.border.theme": "Border Theme:",
    "moreless.border.message": "Select a theme to see borders.",
    "moreless.border.opacity": "Border Opacity:",

    // ============= 4. Text Tools (15 keys) =============
    "moreless.text.add.new": "Add New Text",
    "moreless.text.content": "Content:",
    "moreless.text.placeholder": "Hello!",
    "moreless.text.add.button": "Add Text",
    "moreless.text.properties": "Selected Text Properties",
    "moreless.text.color": "Color:",
    "moreless.text.size": "Size:",
    "moreless.text.font": "Font:",
    "moreless.text.outline.color": "Outline Color:",
    "moreless.text.outline.width": "Outline (0-10):",
    "moreless.text.default": "New Text",
    "moreless.msg.text.added": "Text added.",
    "moreless.msg.text.updated": "Text properties updated.",
    "moreless.msg.text.deleted": "Text deleted.",
    "moreless.msg.cleared": "All settings cleared.",

    // ============= 5. Worksheet Configuration (22 keys) =============
    "moreless.exercises.count": "Number of Exercises (1–8):",
    "moreless.mode.individual": "Individual Images",
    "moreless.mode.theme": "Theme for Worksheet",
    "moreless.theme.dictionary": "Theme for Dictionary",
    "moreless.pick.images": "Pick 1–5 images",
    "moreless.loading.themes": "Loading themes...",
    "moreless.selected.count": "0 / 5 selected",
    "moreless.theme.worksheet": "Theme for Worksheet",
    "moreless.theme.random": "Images will be randomly selected from this theme.",
    "moreless.relations": "Relations",
    "moreless.symbol.display": "Symbol Display",
    "moreless.display.illustrations": "Illustrations",
    "moreless.display.normal": "Normal Symbols (>, <, =)",
    "moreless.show.symbols": "show symbols for circling",
    "moreless.include.name.date": "Include Name/Date Fields",
    "moreless.include.numbers": "Include Exercise Numbers",
    "moreless.msg.select.worksheet.theme": "Please select a theme for the worksheet.",
    "moreless.msg.theme.empty": "Theme \"{theme}\" has no images.",
    "moreless.msg.pick.images": "Please pick 1–5 images.",
    "moreless.msg.select.relation": "Select at least one relation type.",
    "moreless.msg.valid.exercises": "Enter a valid number of exercises (1-8).",
    "moreless.msg.generation.failed": "Could not generate worksheet rows.",

    // ============= 6. Comparison Symbols (3 keys) =============
    "symbol.greater": ">",
    "symbol.less": "<",
    "symbol.equal": "=",

    // ============= 7. Display Options (6 keys) =============
    "moreless.comparison.greater": "Greater Than",
    "moreless.comparison.less": "Less Than",
    "moreless.comparison.equal": "Equal To",
    "moreless.symbol.mode.illustrations": "Use Illustrations",
    "moreless.symbol.mode.normal": "Use Normal Symbols",
    "moreless.symbol.mode.circling": "Show Symbols for Circling",

    // ============= 8. Upload Section (3 keys) =============
    "moreless.upload.select": "Select image(s) to upload:",
    "moreless.uploaded.images": "Your Uploaded Images (This Session):",
    "moreless.uploaded.placeholder": "Your uploaded images will appear here.",

    // ============= 9. Font Options (7 keys) =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= 10. Toolbar Actions (20 keys) =============
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

    // ============= 11. Action Buttons (13 keys) =============
    "moreless.generate": "Generate",
    "moreless.generate.worksheet": "Generate Worksheet",
    "moreless.generate.answer": "Generate Answer Key",
    "moreless.download": "Download",
    "moreless.download.worksheet.jpeg": "Worksheet (JPEG)",
    "moreless.download.answer.jpeg": "Answer Key (JPEG)",
    "moreless.download.worksheet.pdf": "Worksheet (PDF)",
    "moreless.download.answer.pdf": "Answer Key (PDF)",
    "common.grayscale": "Grayscale",
    "moreless.clear.all": "Clear All",
    "moreless.msg.generate.complete": "Worksheet generated successfully!",
    "moreless.msg.download.ready": "Download ready.",
    "moreless.msg.generation.error": "Error generating worksheet.",

    // ============= 12. Tab Labels (2 keys) =============
    "moreless.tab.worksheet": "Worksheet",
    "moreless.tab.answer": "Answer Key",

    // ============= 13. Theme Messages (8 keys) =============
    "moreless.themes.all": "All Themes",
    "moreless.msg.themes.error": "Could not load themes: {error}",
    "moreless.msg.loading": "Loading...",
    "moreless.msg.fetch.failed": "failed to fetch images",
    "moreless.msg.no.images": "No images found.",
    "moreless.msg.max.images": "Max {max} images allowed.",
    "moreless.msg.theme.loaded": "Theme loaded successfully.",
    "moreless.msg.search.error": "Error during search.",

    // ============= 14. Border & Background Messages (5 keys) =============
    "moreless.msg.loading.borders": "Loading borders...",
    "moreless.msg.borders.error": "Error loading borders.",
    "moreless.msg.select.theme": "Select a theme.",
    "moreless.msg.loading.backgrounds": "Loading backgrounds...",
    "moreless.msg.backgrounds.error": "Error loading backgrounds.",

    // ============= 15. Generation & Validation Messages (11 keys) =============
    "moreless.msg.worksheet.updated": "Worksheet updated!",
    "moreless.msg.error": "Error: {error}",
    "moreless.msg.validation.failed": "Please check your configuration.",
    "moreless.msg.processing": "Processing worksheet...",
    "moreless.msg.creating.exercises": "Creating exercises...",
    "moreless.msg.arranging.layout": "Arranging layout...",
    "moreless.msg.finalizing": "Finalizing worksheet...",
    "moreless.msg.ready": "Worksheet ready for printing.",
    "moreless.msg.exercise.creation": "Creating exercise {num} of {total}...",
    "moreless.msg.image.selection": "Selecting images for exercises...",
    "moreless.msg.symbol.placement": "Placing comparison symbols...",

    // ============= 16. Answer Key Messages (2 keys) =============
    "moreless.msg.generate.first": "Please generate a worksheet first.",
    "moreless.msg.answer.updated": "Answer key updated!",

    // ============= 17. Download & Export Messages (6 keys) =============
    "moreless.msg.preparing.jpeg": "Preparing JPEG...",
    "moreless.msg.jpeg.initiated": "JPEG Download Initiated!",
    "moreless.msg.jpeg.error": "JPEG Error: {error}",
    "moreless.msg.preparing.pdf": "Preparing PDF...",
    "moreless.msg.pdf.downloaded": "PDF Downloaded!",
    "moreless.msg.pdf.error": "PDF Error: {error}",

    // ============= 18. Text & Upload Messages (4 keys) =============
    "moreless.msg.uploads.available": "{count} custom image(s) available.",
    "moreless.msg.upload.success": "Upload successful.",
    "moreless.msg.upload.failed": "Upload failed.",
    "moreless.msg.file.error": "Error reading file.",

    // ============= 19. Common Terms (3 keys) =============
    "common.none": "None",
    "common.loading": "Loading...",
    "common.error": "Error",

    // ============= 20. Name/Date Fields (2 keys) =============
    "moreless.name.field": "Name: ____________________",
    "moreless.date.field": "Date: ____________________",

    // ============= 21. Placeholders (4 keys) =============
    "placeholder.search": "Search...",
    "placeholder.enter.text": "Enter text here",
    "placeholder.custom.width": "Width",
    "placeholder.custom.height": "Height",

    // ============= 22. Error Messages (6 keys) =============
    "error.invalid.dimensions": "Invalid dimensions. Please check width and height.",
    "error.no.theme.selected": "Please select a theme first.",
    "error.no.images.selected": "Please select images for the worksheet.",
    "error.upload.failed": "Upload failed. Please try again.",
    "error.file.too.large": "File size too large. Maximum size is 5MB.",
    "error.invalid.file.type": "Invalid file type. Please upload image files only.",
    "error.canvas.creation": "Error creating canvas.",
    "error.export.failed": "Export failed. Please try again.",
    "error.network": "Network error. Please check your connection.",
    "error.comparison.generation": "Could not generate comparison exercises.",
    "error.invalid.configuration": "Invalid worksheet configuration.",
    "error.exercise.count": "Exercise count must be between 1 and 8.",
    "error.image.count": "Please select between 1 and 5 images.",
    "error.no.relation": "Please select at least one comparison relation.",
    "error.image.loading": "Error loading images.",
    "error.theme.loading": "Error loading theme.",
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
    // "language.german": "Deutsch",
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
  const translation = MORE_LESS_TRANSLATIONS[locale]?.[key] ||
                     MORE_LESS_TRANSLATIONS['en'][key] ||
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
  const englishKeys = Object.keys(MORE_LESS_TRANSLATIONS.en);
  const localeKeys = Object.keys(MORE_LESS_TRANSLATIONS[locale] || {});

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

  console.log(`More Less translations initialized for locale: ${initialLocale}`);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MORE_LESS_TRANSLATIONS,
    getTranslation,
    formatTranslation,
    updateAllTranslations,
    validateTranslations,
    initializeTranslations
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.MORE_LESS_TRANSLATIONS = MORE_LESS_TRANSLATIONS;
  window.getTranslation = getTranslation;
  window.formatTranslation = formatTranslation;
  window.updateAllTranslations = updateAllTranslations;
  window.validateTranslations = validateTranslations;
  window.initializeTranslations = initializeTranslations;
}