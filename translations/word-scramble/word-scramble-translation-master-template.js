/**
 * WORD SCRAMBLE TRANSLATION MASTER TEMPLATE
 * ==========================================
 * Complete Translation System for Word Scramble Generator
 *
 * Total Translation Keys: 178
 * Categories: 15
 * Languages: 11 (EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI)
 *
 * CRITICAL USER-MENTIONED ITEMS:
 * - background (Page Setup category)
 * - border (Page Setup category)
 * - grayscale (Core UI category)
 * - File input text (browser-controlled)
 *
 * Current Coverage: 2.8% (5 of 178 elements have data-translate)
 * Implementation Needed: 173 HTML attributes + 44 JavaScript replacements
 *
 * Instructions:
 * 1. Replace all "[TRANSLATE: ...]" with actual translations
 * 2. Keep the key names in English (left side)
 * 3. Preserve {} placeholders for dynamic values
 * 4. Test with ?locale=XX to verify
 */

const WORD_SCRAMBLE_TRANSLATIONS = {
  // ==========================================
  // ENGLISH (Complete - Use as reference)
  // ==========================================
  "en": {
    // Core UI (17 keys)
    "app.title": "Word Scramble Generator",
    "wordScrambleGenerator": "Word Scramble Generator",
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
    "randomSelect": "Random Select",
    "clearSelection": "Clear Selection",

    // Language Settings (14 keys) - Some already implemented
    "languageSettings": "Language Settings",
    "selectLanguage": "Select Language",  // Already has data-translate
    "language": "Language:",  // Already has data-translate
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

    // Page Setup (20 keys)
    "pageSetup": "Page Setup",
    "pageSize": "Page Size:",
    "letterPortrait": "Letter (Portrait)",
    "letterLandscape": "Letter (Landscape)",
    "a4Portrait": "A4 (Portrait)",
    "a4Landscape": "A4 (Landscape)",
    "legalPortrait": "Legal (Portrait)",
    "legalLandscape": "Legal (Landscape)",
    "custom": "Custom",
    "widthPx": "Width (px):",
    "heightPx": "Height (px):",
    "pageColor": "Page Color:",
    "applySize": "Apply Size",
    "background": "Background",  // CRITICAL - User mentioned
    "backgroundTheme": "Background Theme:",
    "none": "None",
    "selectBackgroundTheme": "Select a theme for backgrounds.",
    "backgroundOpacity": "Background Opacity:",
    "border": "Border",  // CRITICAL - User mentioned
    "borderTheme": "Border Theme:",
    "selectBorderTheme": "Select a theme to see borders.",
    "borderOpacity": "Border Opacity:",

    // Text Tools (11 keys)
    "textTools": "Text Tools",
    "addNewText": "Add New Text",
    "content": "Content:",
    "enterTextHerePlaceholder": "Enter text here...",
    "addTextToPage": "Add Text to Page",
    "selectedTextProperties": "Selected Text Properties",
    "color": "Color:",
    "size": "Size:",
    "font": "Font:",
    "outlineColor": "Outline Color:",
    "outlineWidth": "Outline (0-10):",

    // Image Selection (13 keys)
    "imageSelection": "Image Selection",
    "availableThemes": "Available Themes",
    "theme": "Theme:",
    "allThemes": "All Themes",  // Already has data-translate
    "searchImagesPlaceholder": "Search images...",
    "themeImages": "Theme Images",
    "selectedImages": "Selected Images",
    "selectedCount": "Selected: {} / {}",
    "selectedImagesWillAppear": "Your selected images will appear here.",
    "selectThemeFromDropdown": "Select a theme from dropdown above.",  // Already has data-translate
    "loading": "Loading...",
    "noImagesFound": "No images found{}.",
    "maxImagesSelected": "You can select a maximum of {} images.",

    // Puzzle Settings (12 keys)
    "problemSettings": "Problem Settings",
    "puzzleSettings": "Puzzle Settings",
    "numberOfPuzzles": "Number of Puzzles (1-12):",
    "difficulty": "Difficulty:",
    "noClues": "No Clues",
    "hard": "Hard",
    "medium": "Medium",
    "easy": "Easy",
    "letterCase": "Letter Case:",
    "upperCase": "Upper Case",
    "lowerCase": "Lower Case",
    "letterColoring": "Letter Coloring:",
    "colorCoded": "Color-coded (vowels/consonants)",
    "blackWhite": "Black & White",

    // Upload Custom Images (7 keys)
    "uploadCustomImages": "Upload Custom Images",
    "selectImagesToUpload": "Select images to upload:",
    "yourUploadedImages": "Your Uploaded Images (This Session)",
    "uploadedImagesAppearHere": "Your uploaded images appear here.",
    "chooseFiles": "Choose Files",
    "noFileChosen": "No file chosen",
    "filesSelected": "{} file(s) selected",
    "customImagesAvailable": "{} custom image(s) available.",

    // Problem Configuration (2 keys)
    "includeNameDateFields": "Include Name/Date fields",
    "includeExerciseNumbers": "Include Exercise Numbers",

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

    // Success Messages (8 keys)
    "worksheetGeneratedSuccessfully": "Worksheet generated successfully!",
    "answerKeyGenerated": "Answer key generated!",
    "formCleared": "Form cleared.",
    "downloadInitiated": "Download Initiated!",
    "pdfDownloaded": "PDF downloaded!",
    "jpegDownloadInitiated": "JPEG download initiated!",
    "pdfDownloaded2": "PDF Downloaded!",
    "textAddedToPage": "Text added to page.",

    // Error Messages (13 keys)
    "couldNotLoadThemes": "Could not load themes.",
    "errorLoadingImages": "Error loading images.",
    "pleaseSelectImagesOrTheme": "Please select some images or choose a theme with images.",
    "pleaseGenerateWorksheetFirst": "Please generate a worksheet first.",
    "failedToLoadImage": "Failed to load {} image.",
    "errorPreparingImage": "Error preparing image: {}",
    "pleaseGenerateContentFirst": "Please generate content first.",
    "errorCreatingPdf": "Error creating PDF: {}",
    "errorCreatingPdf2": "Error creating PDF.",
    "errorPreparingJpeg": "Error preparing JPEG.",
    "errorLoadingBorders": "Error loading borders.",
    "errorLoadingBackgrounds": "Error loading backgrounds.",
    "notEnoughImages": "Not enough images selected for puzzles.",

    // Info/Loading Messages (9 keys)
    "generatingWorksheet": "Generating worksheet...",
    "generatingAnswerKey": "Generating answer key...",
    "preparingCanvas": "Preparing {}...",
    "preparingPdf": "Preparing PDF...",
    "preparingJpeg": "Preparing JPEG...",
    "preparingCanvasPdf": "Preparing {} PDF...",
    "loadingThemes": "Loading themes...",
    "searchingImages": "Searching images...",
    "processingUpload": "Processing upload...",

    // Name/Date Placeholders (2 keys)
    "namePlaceholder": "Name: ________________",
    "datePlaceholder": "Date: ________",

    // Watermark Text (2 keys - Free Tier)
    "watermarkText": "FREE VERSION - LessonCraftStudio.com",
    "watermarkSmallText": "FREE VERSION"
  },

  // ==========================================
  // GERMAN - Deutsch
  // ==========================================
  "de": {
    // Core UI
    "app.title": "[TRANSLATE: Word Scramble Generator]",
    "wordScrambleGenerator": "[TRANSLATE: Word Scramble Generator]",
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
    "randomSelect": "[TRANSLATE: Random Select]",
    "clearSelection": "[TRANSLATE: Clear Selection]",

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
    "letterPortrait": "[TRANSLATE: Letter (Portrait)]",
    "letterLandscape": "[TRANSLATE: Letter (Landscape)]",
    "a4Portrait": "[TRANSLATE: A4 (Portrait)]",
    "a4Landscape": "[TRANSLATE: A4 (Landscape)]",
    "legalPortrait": "[TRANSLATE: Legal (Portrait)]",
    "legalLandscape": "[TRANSLATE: Legal (Landscape)]",
    "custom": "[TRANSLATE: Custom]",
    "widthPx": "[TRANSLATE: Width (px):]",
    "heightPx": "[TRANSLATE: Height (px):]",
    "pageColor": "[TRANSLATE: Page Color:]",
    "applySize": "[TRANSLATE: Apply Size]",
    "background": "[TRANSLATE: Background]",  // CRITICAL
    "backgroundTheme": "[TRANSLATE: Background Theme:]",
    "none": "[TRANSLATE: None]",
    "selectBackgroundTheme": "[TRANSLATE: Select a theme for backgrounds.]",
    "backgroundOpacity": "[TRANSLATE: Background Opacity:]",
    "border": "[TRANSLATE: Border]",  // CRITICAL
    "borderTheme": "[TRANSLATE: Border Theme:]",
    "selectBorderTheme": "[TRANSLATE: Select a theme to see borders.]",
    "borderOpacity": "[TRANSLATE: Border Opacity:]",

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
function getWordScrambleTranslation(key, locale = 'en') {
  return WORD_SCRAMBLE_TRANSLATIONS[locale]?.[key] ||
         WORD_SCRAMBLE_TRANSLATIONS.en[key] ||
         key;
}

/**
 * Format translation with placeholders
 * @param {string} text - Text with {} placeholders
 * @param {...any} values - Values to replace placeholders
 * @returns {string} Formatted text
 */
function formatWordScrambleTranslation(text, ...values) {
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
function validateWordScrambleTranslations(locale) {
  const enKeys = Object.keys(WORD_SCRAMBLE_TRANSLATIONS.en);
  const localeKeys = Object.keys(WORD_SCRAMBLE_TRANSLATIONS[locale] || {});

  const missing = enKeys.filter(key => !localeKeys.includes(key));
  const untranslated = enKeys.filter(key => {
    const value = WORD_SCRAMBLE_TRANSLATIONS[locale]?.[key];
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
function getWordScrambleCategories() {
  return {
    "Core UI": 17,
    "Language Settings": 14,
    "Page Setup": 22,  // Contains CRITICAL items
    "Text Tools": 11,
    "Image Selection": 13,
    "Puzzle Settings": 14,  // Word Scramble specific
    "Upload Custom Images": 8,
    "Problem Configuration": 2,
    "Toolbar & Alignment": 15,
    "Success Messages": 8,
    "Error Messages": 13,
    "Info/Loading Messages": 9,
    "Name/Date Placeholders": 2,
    "Watermark Text": 2  // Free tier specific
  };
}

/**
 * Check puzzle-specific terminology consistency
 * @param {string} locale - Language code to check
 * @returns {Object} Consistency report
 */
function checkPuzzleTerminology(locale) {
  const puzzleTerms = {
    difficulty: ['noClues', 'hard', 'medium', 'easy'],
    letterCase: ['upperCase', 'lowerCase'],
    letterColoring: ['colorCoded', 'blackWhite'],
    puzzle: ['numberOfPuzzles', 'puzzleSettings']
  };

  const report = {};
  Object.keys(puzzleTerms).forEach(term => {
    report[term] = puzzleTerms[term].map(key => ({
      key: key,
      value: WORD_SCRAMBLE_TRANSLATIONS[locale]?.[key] || 'MISSING'
    }));
  });

  return report;
}

// Export for use in implementation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WORD_SCRAMBLE_TRANSLATIONS,
    getWordScrambleTranslation,
    formatWordScrambleTranslation,
    validateWordScrambleTranslations,
    getWordScrambleCategories,
    checkPuzzleTerminology
  };
}

// Make available globally for browser
if (typeof window !== 'undefined') {
  window.WORD_SCRAMBLE_TRANSLATIONS = WORD_SCRAMBLE_TRANSLATIONS;
  window.getWordScrambleTranslation = getWordScrambleTranslation;
  window.formatWordScrambleTranslation = formatWordScrambleTranslation;
}

/**
 * IMPLEMENTATION CHECKLIST:
 * ========================
 *
 * 1. HTML Attributes (173 elements):
 *    □ Fix 5 existing data-translate attributes
 *    □ Add data-translate to 168 new elements
 *    □ Add data-translate to all labels
 *    □ Add data-translate to all buttons
 *    □ Add data-translate to all headers
 *    □ Add data-translate to all options
 *    □ Add data-translate-placeholder for inputs
 *    □ Add data-translate-title for tooltips
 *
 * 2. JavaScript Replacements (44 messages):
 *    □ Replace showMessage strings
 *    □ Replace innerHTML assignments
 *    □ Replace textContent assignments
 *    □ Replace placeholder assignments
 *    □ Replace dynamic option creation
 *    □ Replace watermark text
 *
 * 3. Critical Items (User-mentioned):
 *    □ Background translation working
 *    □ Border translation working
 *    □ Grayscale translation working
 *    □ File input custom wrapper
 *
 * 4. Puzzle-Specific Features:
 *    □ Difficulty levels translated
 *    □ Letter case options translated
 *    □ Color coding options translated
 *    □ Watermark text for free tier
 *
 * 5. File Input Handling:
 *    □ Create custom wrapper for file input
 *    □ Add choose files button
 *    □ Add file selection display
 *
 * 6. Testing:
 *    □ Test with ?locale=de
 *    □ No English text visible
 *    □ All dropdowns translated
 *    □ All messages translated
 *    □ Watermark shows in local language
 */

/**
 * SPECIAL NOTES:
 * =============
 *
 * 1. This app has POOR coverage (2.8%) - needs major work
 * 2. 5 elements already have data-translate (keep them!)
 * 3. Puzzle-specific terminology needs consistency
 * 4. Watermark text for free tier needs translation
 * 5. File input "Choose files" needs custom wrapper
 * 6. Background, Border, Grayscale are CRITICAL items
 * 7. Name/Date placeholders need proper formatting
 */