/**
 * Missing Pieces Translation Master Template
 * Total Keys: 176
 * Languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI
 *
 * Current Coverage: 0% (NO TRANSLATIONS YET!)
 * Target Coverage: 100% (176 keys)
 *
 * Categories:
 * 1. Language Names (11 keys)
 * 2. Page Title & Headers (8 keys)
 * 3. Page Setup (19 keys)
 * 4. Text Tools (15 keys)
 * 5. Puzzle Configuration (9 keys)
 * 6. Shape Options (6 keys)
 * 7. Image Library (7 keys)
 * 8. Upload Section (4 keys)
 * 9. Font Options (7 keys)
 * 10. Toolbar Actions (20 keys)
 * 11. Action Buttons (13 keys)
 * 12. Tab Labels (2 keys)
 * 13. Theme Messages (9 keys)
 * 14. Text & Canvas Messages (2 keys)
 * 15. Puzzle Generation Messages (10 keys)
 * 16. Answer Key Messages (4 keys)
 * 17. Download & Export Messages (20 keys)
 * 18. Common Terms (3 keys)
 * 19. Placeholders (4 keys)
 * 20. Error Messages (4 keys)
 */

const MISSING_PIECES_TRANSLATIONS = {
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

    // ============= 2. Page Title & Headers (8 keys) =============
    "missingpieces.page.title": "Missing Pieces Worksheet Generator",
    "missingpieces.title": "Missing Pieces",
    "missingpieces.language.settings": "Language Settings",
    "missingpieces.page.setup": "Page Setup",
    "missingpieces.text.tools": "Text Tools",
    "missingpieces.puzzle.config": "Puzzle Configuration",
    "missingpieces.image.library": "Image Library",
    "missingpieces.upload.custom": "Upload Custom Images",

    // ============= 3. Page Setup (19 keys) =============
    "missingpieces.select.language": "Select Language",
    "missingpieces.language.label": "Language:",
    "missingpieces.page.size": "Page Size:",
    "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
    "page.size.default": "Default Worksheet (800x1000)",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.a4.landscape": "A4 Landscape (297×210mm)",
    "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
    "page.size.square": "Square (1200x1200)",
    "page.size.custom": "Custom",
    "missingpieces.width.label": "Width (px):",
    "missingpieces.height.label": "Height (px):",
    "missingpieces.page.color": "Page Color:",
    "missingpieces.apply.size": "Apply Size",
    "missingpieces.background.title": "Background",
    "missingpieces.background.theme": "Background Theme:",
    "missingpieces.background.message": "Select a theme for backgrounds.",
    "missingpieces.background.opacity": "Background Opacity:",
    "missingpieces.border.title": "Border",
    "missingpieces.border.theme": "Border Theme:",
    "missingpieces.border.message": "Select a theme to see borders.",
    "missingpieces.border.opacity": "Border Opacity:",

    // ============= 4. Text Tools (15 keys) =============
    "missingpieces.text.add.new": "Add New Text",
    "missingpieces.text.content": "Content:",
    "missingpieces.text.placeholder": "Hello!",
    "missingpieces.text.add.button": "Add Text",
    "missingpieces.text.properties": "Selected Text Properties",
    "missingpieces.text.color": "Color:",
    "missingpieces.text.size": "Size:",
    "missingpieces.text.font": "Font:",
    "missingpieces.text.outline.color": "Outline Color:",
    "missingpieces.text.outline.width": "Outline (0-10):",
    "missingpieces.text.default": "New Text",
    "missingpieces.msg.text.added": "Text added to worksheet.",
    "missingpieces.msg.text.updated": "Text properties updated.",
    "missingpieces.msg.text.deleted": "Text deleted.",
    "missingpieces.msg.form.cleared": "Form cleared.",

    // ============= 5. Puzzle Configuration (9 keys) =============
    "missingpieces.missing.count": "Missing Pieces (1–5):",
    "missingpieces.solution.options": "Solution Options (2–6):",
    "missingpieces.piece.shape": "Piece Shape:",
    "missingpieces.msg.select.image": "Please select an image for the puzzle first.",
    "missingpieces.msg.pieces.range": "Missing pieces must be 1-5.",
    "missingpieces.msg.options.range": "Solution options must be 2-6.",
    "missingpieces.msg.pieces.less": "Missing pieces count must be less than solution options.",
    "missingpieces.msg.distinct.pieces": "Could not find enough distinct pieces.",
    "missingpieces.msg.image.failed": "Failed to load selected image.",

    // ============= 6. Shape Options (6 keys) =============
    "shape.square": "Square",
    "shape.circle": "Circle",
    "shape.rect.portrait": "Rectangle (Portrait)",
    "shape.rect.landscape": "Rectangle (Landscape)",
    "shape.ellipse.portrait": "Ellipse (Portrait)",
    "shape.ellipse.landscape": "Ellipse (Landscape)",

    // ============= 7. Image Library (7 keys) =============
    "missingpieces.select.theme": "Select Theme:",
    "missingpieces.search.images": "Search Images:",
    "missingpieces.search.placeholder": "e.g., apple, car",
    "missingpieces.available.images": "Available Images:",
    "missingpieces.loading.images": "Loading images...",
    "missingpieces.selected.image": "Selected Image for Puzzle:",
    "missingpieces.msg.none.selected": "No items selected.",

    // ============= 8. Upload Section (4 keys) =============
    "missingpieces.upload.select": "Select image(s) to upload:",
    "missingpieces.uploaded.images": "Your Uploaded Images (This Session):",
    "missingpieces.uploaded.placeholder": "Your uploaded images will appear here.",
    "missingpieces.msg.images.loaded": "{count} image(s) loaded.",

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
    "missingpieces.generate": "Generate",
    "missingpieces.generate.worksheet": "Generate Worksheet",
    "missingpieces.generate.answer": "Generate Answer Key",
    "missingpieces.download": "Download",
    "missingpieces.download.worksheet.jpeg": "Worksheet (JPEG)",
    "missingpieces.download.answer.jpeg": "Answer Key (JPEG)",
    "missingpieces.download.worksheet.pdf": "Worksheet (PDF)",
    "missingpieces.download.answer.pdf": "Answer Key (PDF)",
    "common.grayscale": "Grayscale",
    "missingpieces.clear.all": "Clear All",
    "missingpieces.msg.generate.complete": "Puzzle generated successfully!",
    "missingpieces.msg.cleared": "All content cleared.",
    "missingpieces.msg.download.ready": "Download ready.",

    // ============= 12. Tab Labels (2 keys) =============
    "missingpieces.tab.worksheet": "Worksheet",
    "missingpieces.tab.answer": "Answer Key",

    // ============= 13. Theme Messages (9 keys) =============
    "missingpieces.themes.all": "All Themes",
    "missingpieces.msg.themes.error": "Could not load themes.",
    "missingpieces.msg.loading.default": "Loading default theme...",
    "missingpieces.msg.type.search": "Type to search all images.",
    "missingpieces.msg.searching": "Searching...",
    "missingpieces.msg.no.images": "No images found{query}",
    "missingpieces.msg.theme.loaded": "Theme loaded successfully.",
    "missingpieces.msg.search.error": "Error during search.",
    "missingpieces.msg.loading.theme": "Loading theme images...",

    // ============= 14. Puzzle Generation Messages (10 keys) =============
    "missingpieces.msg.generating": "Generating puzzle data...",
    "missingpieces.msg.generation.failed": "Puzzle generation failed. Please check your selections.",
    "missingpieces.msg.worksheet.success": "Worksheet generated successfully!",
    "missingpieces.msg.unexpected.error": "An unexpected error occurred during generation.",
    "missingpieces.msg.validation.error": "Please check puzzle configuration.",
    "missingpieces.msg.processing.image": "Processing image for puzzle...",
    "missingpieces.msg.creating.pieces": "Creating puzzle pieces...",
    "missingpieces.msg.arranging.solution": "Arranging solution options...",
    "missingpieces.msg.finalizing": "Finalizing puzzle layout...",
    "missingpieces.msg.ready": "Puzzle ready for printing.",

    // ============= 15. Answer Key Messages (4 keys) =============
    "missingpieces.msg.generate.first": "Please generate a worksheet first.",
    "missingpieces.msg.generating.answer": "Generating answer key...",
    "missingpieces.msg.answer.generated": "Answer key generated!",
    "missingpieces.msg.answer.error": "An error occurred during answer key generation.",

    // ============= 16. Download & Export Messages (20 keys) =============
    "missingpieces.msg.canvas.empty": "Canvas is empty. Generate content first.",
    "missingpieces.msg.preparing.jpeg": "Preparing high-quality JPEG... Please wait.",
    "missingpieces.msg.jpeg.success": "High-quality JPEG downloaded!",
    "missingpieces.msg.jpeg.error": "Error preparing JPEG: {error}",
    "missingpieces.watermark.main": "FREE VERSION - LessonCraftStudio.com",
    "missingpieces.watermark.text": "FREE VERSION",
    "missingpieces.msg.generate.content": "Please generate content first.",
    "missingpieces.msg.preparing.pdf": "Preparing PDF...",
    "missingpieces.msg.pdf.success": "PDF downloaded!",
    "missingpieces.msg.pdf.error": "Error creating PDF.",
    "missingpieces.msg.generate.worksheet.first": "Please generate a worksheet first.",
    "missingpieces.msg.preparing.jpeg.simple": "Preparing JPEG...",
    "missingpieces.msg.jpeg.initiated": "JPEG download initiated!",
    "missingpieces.msg.jpeg.error.simple": "Error preparing JPEG.",
    "missingpieces.msg.preparing.pdf.quality": "Preparing high-quality PDF... Please wait.",
    "missingpieces.msg.pdf.quality.success": "High-quality PDF Downloaded!",
    "missingpieces.msg.pdf.error.detailed": "Error creating PDF: {error}",
    "missingpieces.msg.export.progress": "Export progress: {percent}%",
    "missingpieces.msg.export.complete": "Export complete.",
    "missingpieces.msg.export.cancelled": "Export cancelled.",

    // ============= 17. Common Terms (3 keys) =============
    "common.none": "None",
    "common.loading": "Loading...",
    "common.error": "Error",

    // ============= 18. Placeholders (4 keys) =============
    "placeholder.search": "Search...",
    "placeholder.enter.text": "Enter text here",
    "placeholder.custom.width": "Width",
    "placeholder.custom.height": "Height",

    // ============= 19. Error Messages (4 keys) =============
    "error.invalid.dimensions": "Invalid dimensions. Please check width and height.",
    "error.no.image.selected": "Please select an image for the puzzle.",
    "error.no.theme.selected": "Please select a theme first.",
    "error.upload.failed": "Upload failed. Please try again.",
    "error.file.too.large": "File size too large. Maximum size is 5MB.",
    "error.invalid.file.type": "Invalid file type. Please upload image files only.",
    "error.canvas.creation": "Error creating canvas.",
    "error.export.failed": "Export failed. Please try again.",
    "error.network": "Network error. Please check your connection.",
    "error.puzzle.generation": "Could not generate puzzle. Please try different settings.",
    "error.invalid.configuration": "Invalid puzzle configuration.",
    "error.shape.not.supported": "Selected shape is not supported.",
    "error.pieces.overlap": "Pieces overlap. Please adjust configuration.",
    "error.solution.conflict": "Solution options conflict with missing pieces count.",
    "error.image.loading": "Error loading image.",
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
  const translation = MISSING_PIECES_TRANSLATIONS[locale]?.[key] ||
                     MISSING_PIECES_TRANSLATIONS['en'][key] ||
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
  const englishKeys = Object.keys(MISSING_PIECES_TRANSLATIONS.en);
  const localeKeys = Object.keys(MISSING_PIECES_TRANSLATIONS[locale] || {});

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

  console.log(`Missing Pieces translations initialized for locale: ${initialLocale}`);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MISSING_PIECES_TRANSLATIONS,
    getTranslation,
    formatTranslation,
    updateAllTranslations,
    validateTranslations,
    initializeTranslations
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.MISSING_PIECES_TRANSLATIONS = MISSING_PIECES_TRANSLATIONS;
  window.getTranslation = getTranslation;
  window.formatTranslation = formatTranslation;
  window.updateAllTranslations = updateAllTranslations;
  window.validateTranslations = validateTranslations;
  window.initializeTranslations = initializeTranslations;
}