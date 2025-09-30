/**
 * COLORING APP TRANSLATION MASTER TEMPLATE
 * =========================================
 * Complete Translation System for Coloring Page Designer
 *
 * Total Translation Keys: 123
 * Categories: 14
 * Languages: 11 (EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI)
 *
 * CRITICAL USER-MENTIONED ITEMS:
 * - background (Borders & Backgrounds category)
 * - border (Borders & Backgrounds category)
 * - grayscale (Core UI category)
 *
 * Current Coverage: 2.4% (3 of 123 elements have data-translate)
 * Implementation Needed: 90 HTML attributes + 30 JavaScript replacements
 *
 * Instructions:
 * 1. Replace all "[TRANSLATE: ...]" with actual translations
 * 2. Keep the key names in English (left side)
 * 3. Preserve {} placeholders for dynamic values
 * 4. Test with ?locale=XX to verify
 */

const COLORING_TRANSLATIONS = {
  // ==========================================
  // ENGLISH (Complete - Use as reference)
  // ==========================================
  "en": {
    // Core UI (14 keys)
    "app.title": "Coloring Page Designer",
    "coloringPageDesigner": "Coloring Page Designer",
    "coloringDesigner": "Coloring Designer",
    "download": "Download",
    "downloadAsJpeg": "Download as JPEG",
    "downloadAsPdf": "Download as PDF",
    "grayscale": "Grayscale",  // CRITICAL - User mentioned
    "clearAll": "Clear All",
    "clearCanvasConfirmation": "Are you sure you want to permanently clear the canvas?",
    "cancel": "Cancel",
    "yesClear": "Yes, Clear",
    "opacity": "Opacity",
    "deleteSelected": "Delete Selected",
    "lockObject": "Lock Object",

    // Language Settings (13 keys - same as other apps)
    "settings": "Language Settings",
    "language": "Language:",
    "lang_en": "English",
    "lang_de": "Deutsch",
    "lang_fr": "Français",
    "lang_es": "Español",
    "lang_pt": "Português",
    "lang_it": "Italiano",
    "lang_nl": "Nederlands",
    "lang_sv": "Svenska",
    "lang_da": "Dansk",
    "lang_no": "Norsk",
    "lang_fi": "Suomi",

    // Page Setup (13 keys)
    "pageSetup": "Page Setup",
    "pageDimensions": "Page Dimensions",
    "pageSize": "Page Size:",
    "letterPortrait": "Letter Portrait (8.5×11\")",
    "letterLandscape": "Letter Landscape (11×8.5\")",
    "a4Portrait": "A4 Portrait (210×297mm)",
    "a4Landscape": "A4 Landscape (297×210mm)",
    "square": "Square (1200×1200)",
    "custom": "Custom",
    "widthPx": "Width (px):",
    "heightPx": "Height (px):",
    "applySize": "Apply Size",
    "pageColor": "Page Color:",

    // Borders & Backgrounds (5 keys) - CRITICAL CATEGORY
    "border": "Border",  // CRITICAL - User mentioned
    "borderTheme": "Border Theme:",
    "none": "None",
    "selectThemeToSeeBorders": "Select a theme to see borders.",
    "background": "Background",  // CRITICAL - User mentioned

    // Classroom Helpers (3 keys)
    "classroomHelpers": "Classroom Helpers",
    "addNameField": "Add \"Name: ___\"",
    "addHandwritingLines": "Add Handwriting Lines",

    // Drawing Tools (5 keys)
    "drawingTools": "Drawing Tools",
    "selectTool": "Select Tool",
    "drawingTool": "Drawing Tool",
    "brushColor": "Brush Color:",
    "brushSize": "Brush Size:",

    // Text Tools (11 keys)
    "textTools": "Text Tools",
    "addNewText": "Add New Text",
    "content": "Content:",
    "helloPlaceholder": "Hello!",
    "addText": "Add Text",
    "selectedTextProperties": "Selected Text Properties",
    "color": "Color:",
    "size": "Size:",
    "font": "Font:",
    "outlineColor": "Outline Color:",
    "outlineWidth": "Outline (0-10):",

    // Image Library (8 keys)
    "imageLibrary": "Image Library",
    "selectTheme": "Select Theme:",
    "searchImages": "Search Images:",
    "searchPlaceholder": "e.g., apple, car",
    "availableImagesClickToAdd": "Available Images (Click to Add):",
    "loadingImages": "Loading images...",
    "allThemes": "All Themes",
    "selectThemeOrTypeToSearch": "Select a theme or type to search all images.",

    // Upload (5 keys)
    "uploadCustomImages": "Upload Custom Images",
    "selectImagesToUpload": "Select image(s) to upload:",
    "yourUploadedImagesClickToAdd": "Your Uploaded Images (Click to Add):",
    "uploadedImagesWillAppearHere": "Your uploaded images will appear here.",
    "chooseFiles": "Choose Files",
    "noFileChosen": "No file chosen",
    "filesSelected": "{} file(s) selected",

    // Toolbar & Alignment (15 keys)
    "layers": "Layers",
    "bringForward": "Bring Forward",
    "sendBackward": "Send Backward",
    "flip": "Flip",
    "flipHorizontal": "Flip Horizontal",
    "flipVertical": "Flip Vertical",
    "align": "Align",
    "alignSelected": "Align Selected:",
    "alignLeft": "Align Left",
    "centerHorizontally": "Center Horizontally",
    "alignRight": "Align Right",
    "alignTop": "Align Top",
    "centerVertically": "Center Vertically",
    "alignBottom": "Align Bottom",
    "alignToPage": "Align to Page:",
    "centerOnPageHorizontally": "Center on Page Horizontally",
    "centerOnPageVertically": "Center on Page Vertically",

    // Success Messages (6 keys)
    "canvasCleared": "Canvas cleared.",
    "objectLocked": "Object Locked.",
    "objectUnlocked": "Object Unlocked.",
    "jpegDownloadInitiated": "JPEG download initiated!",
    "pdfDownloaded": "PDF downloaded!",
    "jpegDownloadInitiated2": "JPEG Download Initiated!",
    "pdfDownloaded2": "PDF Downloaded!",

    // Error Messages (11 keys)
    "canvasTooNarrowForLines": "Canvas too narrow for lines.",
    "errorLoadingThemes": "Error loading themes.",
    "errorLoadingImages": "Error loading images.",
    "fileSizeExceeds5MB": "File size exceeds 5MB.",
    "errorLoadingBorders": "Error loading borders.",
    "errorPreparingJpeg": "Error preparing JPEG: {}",
    "pleaseGenerateContentFirst": "Please generate content first.",
    "errorCreatingPdf": "Error creating PDF: {}",
    "pleaseGenerateWorksheetFirst": "Please generate a worksheet first.",
    "errorPreparingJpeg2": "Error preparing JPEG.",
    "errorCreatingPdf2": "Error creating PDF.",

    // Info/Loading Messages (11 keys)
    "loading": "Loading...",
    "searching": "Searching...",
    "noImagesFound": "No images found{}.",
    "preparingJpegPleaseWait": "Preparing JPEG... Please wait.",
    "preparingPdf": "Preparing PDF...",
    "preparingJpeg": "Preparing JPEG...",
    "preparingPdfPleaseWait": "Preparing PDF... Please wait.",

    // Dynamic UI Elements (2 keys)
    "nameLine": "Name: ____________________",
    "newText": "New Text"
  },

  // ==========================================
  // GERMAN - Deutsch
  // ==========================================
  "de": {
    // Core UI
    "app.title": "[TRANSLATE: Coloring Page Designer]",
    "coloringPageDesigner": "[TRANSLATE: Coloring Page Designer]",
    "coloringDesigner": "[TRANSLATE: Coloring Designer]",
    "download": "[TRANSLATE: Download]",
    "downloadAsJpeg": "[TRANSLATE: Download as JPEG]",
    "downloadAsPdf": "[TRANSLATE: Download as PDF]",
    "grayscale": "[TRANSLATE: Grayscale]",  // CRITICAL
    "clearAll": "[TRANSLATE: Clear All]",
    "clearCanvasConfirmation": "[TRANSLATE: Are you sure you want to permanently clear the canvas?]",
    "cancel": "[TRANSLATE: Cancel]",
    "yesClear": "[TRANSLATE: Yes, Clear]",
    "opacity": "[TRANSLATE: Opacity]",
    "deleteSelected": "[TRANSLATE: Delete Selected]",
    "lockObject": "[TRANSLATE: Lock Object]",

    // Language Settings
    "settings": "[TRANSLATE: Language Settings]",
    "language": "[TRANSLATE: Language:]",
    "lang_en": "English",
    "lang_de": "Deutsch",
    "lang_fr": "Français",
    "lang_es": "Español",
    "lang_pt": "Português",
    "lang_it": "Italiano",
    "lang_nl": "Nederlands",
    "lang_sv": "Svenska",
    "lang_da": "Dansk",
    "lang_no": "Norsk",
    "lang_fi": "Suomi",

    // Page Setup
    "pageSetup": "[TRANSLATE: Page Setup]",
    "pageDimensions": "[TRANSLATE: Page Dimensions]",
    "pageSize": "[TRANSLATE: Page Size:]",
    "letterPortrait": "[TRANSLATE: Letter Portrait (8.5×11\")]",
    "letterLandscape": "[TRANSLATE: Letter Landscape (11×8.5\")]",
    "a4Portrait": "[TRANSLATE: A4 Portrait (210×297mm)]",
    "a4Landscape": "[TRANSLATE: A4 Landscape (297×210mm)]",
    "square": "[TRANSLATE: Square (1200×1200)]",
    "custom": "[TRANSLATE: Custom]",
    "widthPx": "[TRANSLATE: Width (px):]",
    "heightPx": "[TRANSLATE: Height (px):]",
    "applySize": "[TRANSLATE: Apply Size]",
    "pageColor": "[TRANSLATE: Page Color:]",

    // Borders & Backgrounds - CRITICAL
    "border": "[TRANSLATE: Border]",  // CRITICAL
    "borderTheme": "[TRANSLATE: Border Theme:]",
    "none": "[TRANSLATE: None]",
    "selectThemeToSeeBorders": "[TRANSLATE: Select a theme to see borders.]",
    "background": "[TRANSLATE: Background]",  // CRITICAL

    // Continue with all other categories...
    // [Rest of German translations follow same pattern]
  },

  // ==========================================
  // FRENCH - Français
  // ==========================================
  "fr": {
    // [All keys with [TRANSLATE: ...] placeholders]
  },

  // ==========================================
  // SPANISH - Español
  // ==========================================
  "es": {
    // [All keys with [TRANSLATE: ...] placeholders]
  },

  // ==========================================
  // ITALIAN - Italiano
  // ==========================================
  "it": {
    // [All keys with [TRANSLATE: ...] placeholders]
  },

  // ==========================================
  // PORTUGUESE - Português
  // ==========================================
  "pt": {
    // [All keys with [TRANSLATE: ...] placeholders]
  },

  // ==========================================
  // DUTCH - Nederlands
  // ==========================================
  "nl": {
    // [All keys with [TRANSLATE: ...] placeholders]
  },

  // ==========================================
  // SWEDISH - Svenska
  // ==========================================
  "sv": {
    // [All keys with [TRANSLATE: ...] placeholders]
  },

  // ==========================================
  // DANISH - Dansk
  // ==========================================
  "da": {
    // [All keys with [TRANSLATE: ...] placeholders]
  },

  // ==========================================
  // NORWEGIAN - Norsk
  // ==========================================
  "no": {
    // [All keys with [TRANSLATE: ...] placeholders]
  },

  // ==========================================
  // FINNISH - Suomi
  // ==========================================
  "fi": {
    // [All keys with [TRANSLATE: ...] placeholders]
  }
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get translation for a key
 * @param {string} key - Translation key
 * @param {string} locale - Language code
 * @returns {string} Translated text or key if not found
 */
function getColoringTranslation(key, locale = 'en') {
  return COLORING_TRANSLATIONS[locale]?.[key] || COLORING_TRANSLATIONS.en[key] || key;
}

/**
 * Format translation with placeholders
 * @param {string} text - Text with {} placeholders
 * @param {...any} values - Values to replace placeholders
 * @returns {string} Formatted text
 */
function formatColoringTranslation(text, ...values) {
  let result = text;
  values.forEach((value) => {
    result = result.replace('{}', value);
  });
  return result;
}

/**
 * Validate translations for a locale
 * @param {string} locale - Language code to validate
 * @returns {Object} Validation results
 */
function validateColoringTranslations(locale) {
  const enKeys = Object.keys(COLORING_TRANSLATIONS.en);
  const localeKeys = Object.keys(COLORING_TRANSLATIONS[locale] || {});

  const missing = enKeys.filter(key => !localeKeys.includes(key));
  const untranslated = enKeys.filter(key => {
    const value = COLORING_TRANSLATIONS[locale]?.[key];
    return value?.includes('[TRANSLATE:');
  });

  return {
    total: enKeys.length,
    translated: enKeys.length - missing.length - untranslated.length,
    missing: missing,
    untranslated: untranslated,
    coverage: ((enKeys.length - missing.length - untranslated.length) / enKeys.length * 100).toFixed(1)
  };
}

/**
 * Get all categories with their key counts
 * @returns {Object} Category statistics
 */
function getColoringCategories() {
  return {
    "Core UI": 14,
    "Language Settings": 13,
    "Page Setup": 13,
    "Borders & Backgrounds": 5,  // Contains CRITICAL items
    "Classroom Helpers": 3,
    "Drawing Tools": 5,
    "Text Tools": 11,
    "Image Library": 8,
    "Upload": 7,
    "Toolbar & Alignment": 17,
    "Success Messages": 7,
    "Error Messages": 11,
    "Info/Loading Messages": 7,
    "Dynamic UI Elements": 2
  };
}

// Export for use in implementation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    COLORING_TRANSLATIONS,
    getColoringTranslation,
    formatColoringTranslation,
    validateColoringTranslations,
    getColoringCategories
  };
}

// Make available globally for browser
if (typeof window !== 'undefined') {
  window.COLORING_TRANSLATIONS = COLORING_TRANSLATIONS;
  window.getColoringTranslation = getColoringTranslation;
  window.formatColoringTranslation = formatColoringTranslation;
}

/**
 * IMPLEMENTATION CHECKLIST:
 * ========================
 *
 * 1. HTML Attributes (90 elements):
 *    □ Add data-translate to all labels
 *    □ Add data-translate to all buttons
 *    □ Add data-translate to all headers
 *    □ Add data-translate to all options
 *    □ Add data-translate-placeholder for inputs
 *    □ Add data-translate-title for tooltips
 *
 * 2. JavaScript Replacements (30 messages):
 *    □ Replace showMessage strings
 *    □ Replace innerHTML assignments
 *    □ Replace textContent assignments
 *    □ Replace placeholder assignments
 *    □ Replace dynamic option creation
 *
 * 3. Critical Items (User-mentioned):
 *    □ Border translation working
 *    □ Background translation working
 *    □ Grayscale translation working
 *
 * 4. File Input Handling:
 *    □ Create custom wrapper for file input
 *    □ Add choose files button
 *    □ Add file selection display
 *
 * 5. Testing:
 *    □ Test with ?locale=de
 *    □ No English text visible
 *    □ All dropdowns translated
 *    □ All messages translated
 *    □ All tooltips translated
 */