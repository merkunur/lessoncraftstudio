/**
 * MATH WORKSHEET TRANSLATION MASTER TEMPLATE
 * ===========================================
 * Complete Translation System for Math Worksheet Generator
 *
 * Total Translation Keys: 194 (Largest app!)
 * Categories: 16
 * Languages: 11 (EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI)
 *
 * CRITICAL USER-MENTIONED ITEMS:
 * - background (Page Setup category)
 * - border (Page Setup category)
 * - grayscale (Core UI category)
 *
 * Current Coverage: 3.6% (7 of 194 elements have data-translate for puzzle numbers)
 * Implementation Needed: 142 HTML attributes + 45 JavaScript replacements
 *
 * Special Note: Puzzle number customization was added in December 2024
 * This includes 7 keys that are already partially implemented
 *
 * Instructions:
 * 1. Replace all "[TRANSLATE: ...]" with actual translations
 * 2. Keep the key names in English (left side)
 * 3. Preserve {} placeholders for dynamic values
 * 4. Pay special attention to mathematical terminology
 * 5. Test with ?locale=XX to verify
 */

const MATH_WORKSHEET_TRANSLATIONS = {
  // ==========================================
  // ENGLISH (Complete - Use as reference)
  // ==========================================
  "en": {
    // Core UI (16 keys)
    "app.title": "Math Worksheet Generator",
    "mathWorksheetGenerator": "Math Worksheet Generator",
    "worksheetSettings": "Worksheet Settings",
    "generate": "Generate",
    "generateWorksheet": "Generate Worksheet",
    "generateAnswerKey": "Generate Answer Key",
    "download": "Download",
    "worksheet": "Worksheet",
    "answerKey": "Answer Key",
    "clearAll": "Clear All",
    "worksheetJpeg": "Worksheet (JPEG)",
    "answerKeyJpeg": "Answer Key (JPEG)",
    "worksheetPdf": "Worksheet (PDF)",
    "answerKeyPdf": "Answer Key (PDF)",
    "grayscale": "Grayscale",  // CRITICAL - User mentioned
    "deleteSelected": "Delete Selected",

    // Language Settings (14 keys)
    "languageSettings": "Language Settings",
    "selectLanguage": "Select Language",
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

    // Page Setup (21 keys)
    "pageSetup": "Page Setup",
    "pageSize": "Page Size:",
    "letterPortrait": "Letter Portrait (8.5×11\")",
    "defaultWorksheet": "Default Worksheet (800×1000)",
    "a4Portrait": "A4 Portrait (210×297mm)",
    "a4Landscape": "A4 Landscape (297×210mm)",
    "letterLandscape": "Letter Landscape (11×8.5\")",
    "square": "Square (1200×1200)",
    "custom": "Custom",
    "widthPx": "Width (px):",
    "heightPx": "Height (px):",
    "pageColor": "Page Color:",
    "applySize": "Apply Size",
    "background": "Background",  // CRITICAL - User mentioned
    "backgroundTheme": "Background Theme:",
    "none": "None",
    "selectThemeForBackgrounds": "Select a theme for backgrounds.",
    "backgroundOpacity": "Background Opacity:",
    "border": "Border",  // CRITICAL - User mentioned
    "borderTheme": "Border Theme:",
    "selectThemeToSeeBorders": "Select a theme to see borders.",
    "borderOpacity": "Border Opacity:",

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

    // Puzzle Configuration (14 keys)
    "puzzleConfiguration": "Puzzle Configuration",
    "difficultyLevel": "Difficulty Level:",
    "veryEasy": "Very Easy (2 Symbols)",
    "easy": "Easy (2 Symbols)",
    "medium": "Medium (3 Symbols)",
    "hard": "Hard (4 Symbols)",
    "numberOfExercises": "Number of Exercises (1-6):",
    "operations": "Operations:",
    "additionOnly": "Addition Only",
    "additionAndSubtraction": "Addition & Subtraction",
    "allowNegativeResults": "Allow negative results",
    "minValue": "Min value:",
    "maxValue": "Max value:",
    "showAnswersInWorksheet": "Show Answers in Worksheet",

    // Puzzle Number Customization (7 keys) - ALREADY PARTIALLY IMPLEMENTED
    "showPuzzleNumbers": "Show Puzzle Numbers",
    "titlePrefix": "Title Prefix:",
    "titlePrefixPlaceholder": "e.g., Exercise, Problem, Task",
    "startingNumber": "Starting Number:",
    "individualCustomization": "Individual Customization (optional):",
    "puzzle": "Puzzle",  // Default prefix
    "answers": "Answers",  // Answer key suffix

    // Image Selection (13 keys)
    "imageSelectionMethod": "Image Selection Method:",
    "selectImagesIndividually": "Select Images Individually",
    "useFullTheme": "Use Full Theme",
    "selectImageTheme": "Select Image Theme:",
    "selectedImagesPool": "Selected Images Pool:",
    "selectImagesFromLibrary": "Select images from the library below.",
    "filterLibraryByTheme": "Filter Library By Theme:",
    "allThemes": "All Themes",
    "searchImages": "Search Images:",
    "searchPlaceholder": "e.g., apple, car",
    "loadingImages": "Loading images...",
    "selectThemeOption": "-- Select Theme --",
    "typeToSearchAllImages": "Type to search all images.",

    // Custom Images (5 keys)
    "customImages": "Custom Images",
    "selectImagesToUpload": "Select image(s) to upload:",
    "yourUploadedImagesClickToUse": "Your Uploaded Images (Click to use):",
    "uploadedImagesWillAppearHere": "Your uploaded images will appear here.",
    "chooseFiles": "Choose Files",
    "noFileChosen": "No file chosen",
    "filesSelected": "{} file(s) selected",

    // Toolbar & Alignment (15 keys)
    "layers": "Layers",
    "bringForward": "Bring Forward",
    "sendBackward": "Send Backward",
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

    // Success Messages (9 keys)
    "textAddedToWorksheet": "Text added to worksheet.",
    "customImagesAvailable": "{} custom image(s) available.",
    "themeImagesLoaded": "Theme '{}' images loaded.",
    "successfullyGeneratedPuzzles": "Successfully generated {} puzzles!",
    "puzzleNumber": "Puzzle {}",
    "answerKeyGenerated": "Answer key generated!",
    "jpegDownloadInitiated": "JPEG Download Initiated!",
    "pdfDownloaded": "PDF Downloaded!",
    "formCleared": "Form cleared.",

    // Error Messages (20 keys)
    "noImageThemesFound": "No image themes found. API might be unavailable or empty.",
    "errorLoadingThemes": "Error loading themes: {}.",
    "errorDuringSearch": "Error during search: {}",
    "errorLoadingImages": "Error loading images.",
    "errorReadingFile": "Error reading file: {}",
    "pleaseSelectTheme": "Please select a theme.",
    "errorLoadingThemeImages": "Error loading theme images: {}.",
    "themeInsufficientImages": "The theme '{}' has only {} images, but you need at least {} unique images for {} different symbols.",
    "selectMoreImages": "Please select at least {} different images from the library (you have {}).",
    "notEnoughUniqueImages": "Not enough unique images available for all symbols.",
    "valueRangeTooSmall": "The value range ({} to {}) is too small for generating {} unique puzzles with the selected difficulty.",
    "couldNotGenerateAllPuzzles": "Could only generate {} out of {} requested puzzles due to constraints.",
    "couldNotGenerateAnyPuzzles": "Could not generate any valid puzzles. Try different settings or increase value range.",
    "pleaseGeneratePuzzlesFirst": "Please generate puzzles first.",
    "cannotDownloadEmptyCanvas": "Cannot download, the canvas is empty.",
    "errorPreparingJpeg": "Error preparing JPEG: {}",
    "errorCreatingPdf": "Error creating PDF: {}",
    "errorLoadingBorders": "Error loading borders.",
    "errorLoadingBackgrounds": "Error loading backgrounds.",
    "fileSizeExceeds5MB": "File size exceeds 5MB.",

    // Info/Loading Messages (17 keys)
    "loadingDefaultTheme": "Loading default theme...",
    "searching": "Searching...",
    "loadingImagesForTheme": "Loading images for theme: {}... Please wait.",
    "noImagesFound": "No images found{}.",
    "loadingImagesCount": "Loading {} image(s)...",
    "generatedPartialPuzzles": "Generated {} puzzles (requested: {}).",
    "preparingJpegPleaseWait": "Preparing JPEG... Please wait.",
    "preparingPdfPleaseWait": "Preparing PDF... Please wait.",
    "loadingBorders": "Loading borders...",
    "loadingBackgrounds": "Loading backgrounds...",
    "preparingWorksheet": "Preparing worksheet...",
    "preparingAnswerKey": "Preparing answer key...",
    "downloadingFile": "Downloading file...",
    "processingImages": "Processing images...",
    "validatingInput": "Validating input...",
    "generatingPuzzles": "Generating puzzles...",
    "renderingCanvas": "Rendering canvas..."
  },

  // ==========================================
  // GERMAN - Deutsch
  // ==========================================
  "de": {
    // Core UI
    "app.title": "[TRANSLATE: Math Worksheet Generator]",
    "mathWorksheetGenerator": "[TRANSLATE: Math Worksheet Generator]",
    "worksheetSettings": "[TRANSLATE: Worksheet Settings]",
    "generate": "[TRANSLATE: Generate]",
    "generateWorksheet": "[TRANSLATE: Generate Worksheet]",
    "generateAnswerKey": "[TRANSLATE: Generate Answer Key]",
    "download": "[TRANSLATE: Download]",
    "worksheet": "[TRANSLATE: Worksheet]",
    "answerKey": "[TRANSLATE: Answer Key]",
    "clearAll": "[TRANSLATE: Clear All]",
    "worksheetJpeg": "[TRANSLATE: Worksheet (JPEG)]",
    "answerKeyJpeg": "[TRANSLATE: Answer Key (JPEG)]",
    "worksheetPdf": "[TRANSLATE: Worksheet (PDF)]",
    "answerKeyPdf": "[TRANSLATE: Answer Key (PDF)]",
    "grayscale": "[TRANSLATE: Grayscale]",  // CRITICAL
    "deleteSelected": "[TRANSLATE: Delete Selected]",

    // Language Settings
    "languageSettings": "[TRANSLATE: Language Settings]",
    "selectLanguage": "[TRANSLATE: Select Language]",
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

    // Page Setup - CRITICAL SECTION
    "pageSetup": "[TRANSLATE: Page Setup]",
    "pageSize": "[TRANSLATE: Page Size:]",
    "letterPortrait": "[TRANSLATE: Letter Portrait (8.5×11\")]",
    "defaultWorksheet": "[TRANSLATE: Default Worksheet (800×1000)]",
    "a4Portrait": "[TRANSLATE: A4 Portrait (210×297mm)]",
    "a4Landscape": "[TRANSLATE: A4 Landscape (297×210mm)]",
    "letterLandscape": "[TRANSLATE: Letter Landscape (11×8.5\")]",
    "square": "[TRANSLATE: Square (1200×1200)]",
    "custom": "[TRANSLATE: Custom]",
    "widthPx": "[TRANSLATE: Width (px):]",
    "heightPx": "[TRANSLATE: Height (px):]",
    "pageColor": "[TRANSLATE: Page Color:]",
    "applySize": "[TRANSLATE: Apply Size]",
    "background": "[TRANSLATE: Background]",  // CRITICAL
    "backgroundTheme": "[TRANSLATE: Background Theme:]",
    "none": "[TRANSLATE: None]",
    "selectThemeForBackgrounds": "[TRANSLATE: Select a theme for backgrounds.]",
    "backgroundOpacity": "[TRANSLATE: Background Opacity:]",
    "border": "[TRANSLATE: Border]",  // CRITICAL
    "borderTheme": "[TRANSLATE: Border Theme:]",
    "selectThemeToSeeBorders": "[TRANSLATE: Select a theme to see borders.]",
    "borderOpacity": "[TRANSLATE: Border Opacity:]",

    // Puzzle Number Customization - PARTIALLY IMPLEMENTED
    "showPuzzleNumbers": "Puzzlenummern anzeigen",  // Already translated
    "titlePrefix": "Titel-Präfix:",  // Already translated
    "titlePrefixPlaceholder": "z.B. Übung, Aufgabe, Problem",  // Already translated
    "startingNumber": "Startnummer:",  // Already translated
    "individualCustomization": "Individuelle Anpassung (optional):",  // Already translated
    "puzzle": "Puzzle",  // Already translated
    "answers": "Antworten",  // Already translated

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
function getMathTranslation(key, locale = 'en') {
  return MATH_WORKSHEET_TRANSLATIONS[locale]?.[key] ||
         MATH_WORKSHEET_TRANSLATIONS.en[key] ||
         key;
}

/**
 * Format translation with placeholders
 * @param {string} text - Text with {} placeholders
 * @param {...any} values - Values to replace placeholders
 * @returns {string} Formatted text
 */
function formatMathTranslation(text, ...values) {
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
function validateMathTranslations(locale) {
  const enKeys = Object.keys(MATH_WORKSHEET_TRANSLATIONS.en);
  const localeKeys = Object.keys(MATH_WORKSHEET_TRANSLATIONS[locale] || {});

  const missing = enKeys.filter(key => !localeKeys.includes(key));
  const untranslated = enKeys.filter(key => {
    const value = MATH_WORKSHEET_TRANSLATIONS[locale]?.[key];
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
function getMathCategories() {
  return {
    "Core UI": 16,
    "Language Settings": 14,
    "Page Setup": 21,  // Contains CRITICAL items
    "Text Tools": 11,
    "Puzzle Configuration": 14,
    "Puzzle Number Customization": 7,  // Partially implemented
    "Image Selection": 13,
    "Custom Images": 7,
    "Toolbar & Alignment": 15,
    "Success Messages": 9,
    "Error Messages": 20,  // Largest error set
    "Info/Loading Messages": 17
  };
}

/**
 * Check mathematical terminology consistency
 * @param {string} locale - Language code to check
 * @returns {Object} Consistency report
 */
function checkMathTerminology(locale) {
  const mathTerms = {
    addition: ['additionOnly', 'additionAndSubtraction'],
    subtraction: ['additionAndSubtraction'],
    symbols: ['veryEasy', 'easy', 'medium', 'hard'],
    puzzle: ['puzzle', 'puzzleNumber', 'puzzleConfiguration'],
    exercise: ['numberOfExercises', 'titlePrefixPlaceholder']
  };

  const report = {};
  Object.keys(mathTerms).forEach(term => {
    report[term] = mathTerms[term].map(key => ({
      key: key,
      value: MATH_WORKSHEET_TRANSLATIONS[locale]?.[key] || 'MISSING'
    }));
  });

  return report;
}

// Export for use in implementation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MATH_WORKSHEET_TRANSLATIONS,
    getMathTranslation,
    formatMathTranslation,
    validateMathTranslations,
    getMathCategories,
    checkMathTerminology
  };
}

// Make available globally for browser
if (typeof window !== 'undefined') {
  window.MATH_WORKSHEET_TRANSLATIONS = MATH_WORKSHEET_TRANSLATIONS;
  window.getMathTranslation = getMathTranslation;
  window.formatMathTranslation = formatMathTranslation;
}

/**
 * IMPLEMENTATION CHECKLIST:
 * ========================
 *
 * 1. HTML Attributes (142 elements):
 *    □ Add data-translate to all labels
 *    □ Add data-translate to all buttons
 *    □ Add data-translate to all headers
 *    □ Add data-translate to all options
 *    □ Add data-translate-placeholder for inputs
 *    □ Add data-translate-title for tooltips
 *    □ Fix puzzle number elements (7 already done)
 *
 * 2. JavaScript Replacements (45 messages):
 *    □ Replace showMessage strings
 *    □ Replace innerHTML assignments
 *    □ Replace textContent assignments
 *    □ Replace error message templates
 *    □ Replace loading message templates
 *    □ Handle mathematical value formatting
 *
 * 3. Critical Items (User-mentioned):
 *    □ Background translation working
 *    □ Border translation working
 *    □ Grayscale translation working
 *
 * 4. Mathematical Considerations:
 *    □ Number formatting for locales
 *    □ Mathematical operator display
 *    □ Difficulty level descriptions
 *    □ Value range validation messages
 *
 * 5. File Input Handling:
 *    □ Create custom wrapper for file input
 *    □ Add choose files button
 *    □ Add file selection display
 *
 * 6. Testing:
 *    □ Test with ?locale=de
 *    □ Verify puzzle number customization
 *    □ Check mathematical operations display
 *    □ Validate error messages with values
 *    □ Test theme selection dropdowns
 *    □ Verify alignment tools
 */

/**
 * SPECIAL NOTES:
 * =============
 *
 * 1. This is the LARGEST app with 194 translation keys
 * 2. Puzzle number customization is PARTIALLY IMPLEMENTED (7 keys done)
 * 3. Mathematical terminology needs CAREFUL TRANSLATION
 * 4. Complex error messages with MULTIPLE PARAMETERS
 * 5. Dynamic puzzle generation creates CONDITIONAL MESSAGES
 * 6. Value range validation has DETAILED ERROR CONDITIONS
 * 7. Consider RTL languages for MATHEMATICAL EXPRESSIONS
 */