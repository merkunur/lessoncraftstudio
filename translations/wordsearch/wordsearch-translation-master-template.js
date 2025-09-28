/**
 * MASTER TRANSLATION TEMPLATE FOR WORDSEARCH APP
 * ================================================
 * Complete translation structure for 11 languages
 * Based on comprehensive inventory of 156+ translatable elements
 *
 * LANGUAGES SUPPORTED:
 * - en: English
 * - de: German (Deutsch)
 * - fr: French (Français)
 * - es: Spanish (Español)
 * - it: Italian (Italiano)
 * - pt: Portuguese (Português)
 * - nl: Dutch (Nederlands)
 * - sv: Swedish (Svenska)
 * - da: Danish (Dansk)
 * - no: Norwegian (Norsk)
 * - fi: Finnish (Suomi)
 *
 * STRUCTURE:
 * - Categories for logical organization
 * - All keys from wordsearch inventory
 * - Placeholders for dynamic values using {}
 * - Helper functions for implementation
 */

// Translation template structure
const WORDSEARCH_TRANSLATIONS = {
  // Template for each language - Copy this structure for each locale
  "XX": {
    // ==========================================
    // 1. APP METADATA & TITLES
    // ==========================================
    "app.title": "[TRANSLATE: Word Search Generator]",
    "worksheetGenerator": "[TRANSLATE: Worksheet Generator]",

    // ==========================================
    // 2. LANGUAGE SETTINGS
    // ==========================================
    "languageSettings": "[TRANSLATE: Language Settings]",
    "selectLanguage": "[TRANSLATE: Select Language:]",
    "imageNamesAndThemesNote": "[TRANSLATE: Image names and themes will be displayed in the selected language.]",

    // Language names (shown in dropdown)
    "lang_en": "[TRANSLATE: English (US)]",
    "lang_de": "[TRANSLATE: German (Deutsch)]",
    "lang_fr": "[TRANSLATE: French (Français)]",
    "lang_es": "[TRANSLATE: Spanish (Español)]",
    "lang_it": "[TRANSLATE: Italian (Italiano)]",
    "lang_pt": "[TRANSLATE: Portuguese (Português)]",
    "lang_nl": "[TRANSLATE: Dutch (Nederlands)]",
    "lang_sv": "[TRANSLATE: Swedish (Svenska)]",
    "lang_da": "[TRANSLATE: Danish (Dansk)]",
    "lang_no": "[TRANSLATE: Norwegian (Norsk)]",
    "lang_fi": "[TRANSLATE: Finnish (Suomi)]",

    // ==========================================
    // 3. PAGE & SCENE SETTINGS
    // ==========================================
    "pageAndScene": "[TRANSLATE: Page & Scene]",
    "pageSetup": "[TRANSLATE: Page Setup]",
    "pageSize": "[TRANSLATE: Page Size:]",

    // Page size options
    "letterPortrait": "[TRANSLATE: Letter Portrait (8.5×11\")]",
    "letterLandscape": "[TRANSLATE: Letter Landscape (11×8.5\")]",
    "a4Portrait": "[TRANSLATE: A4 Portrait (210×297mm)]",
    "a4Landscape": "[TRANSLATE: A4 Landscape (297×210mm)]",
    "custom": "[TRANSLATE: Custom]",

    // Custom size inputs
    "widthPx": "[TRANSLATE: Width (px):]",
    "heightPx": "[TRANSLATE: Height (px):]",
    "applySize": "[TRANSLATE: Apply Size]",

    // Background settings
    "background": "[TRANSLATE: Background]",
    "fallbackColor": "[TRANSLATE: Fallback Color:]",
    "backgroundTheme": "[TRANSLATE: Background Theme:]",
    "noneUseFallbackColor": "[TRANSLATE: None (Use Fallback Color)]",
    "selectThemeForBackgrounds": "[TRANSLATE: Select a theme for backgrounds.]",
    "backgroundOpacity": "[TRANSLATE: Background Opacity:]",

    // Border settings
    "border": "[TRANSLATE: Border]",
    "borderTheme": "[TRANSLATE: Border Theme:]",
    "none": "[TRANSLATE: None]",
    "selectThemeToSeeBorders": "[TRANSLATE: Select a theme to see borders.]",
    "borderOpacity": "[TRANSLATE: Border Opacity:]",

    // ==========================================
    // 4. TEXT TOOLS
    // ==========================================
    "textTools": "[TRANSLATE: Text Tools]",
    "addNewText": "[TRANSLATE: Add New Text]",
    "content": "[TRANSLATE: Content:]",
    "helloPlaceholder": "[TRANSLATE: Hello!]",
    "addText": "[TRANSLATE: Add Text]",
    "selectedTextProperties": "[TRANSLATE: Selected Text Properties]",
    "color": "[TRANSLATE: Color:]",
    "size": "[TRANSLATE: Size:]",
    "font": "[TRANSLATE: Font:]",
    "outlineColor": "[TRANSLATE: Outline Color:]",
    "outlineWidth": "[TRANSLATE: Outline (0-10):]",

    // ==========================================
    // 5. PUZZLE SETTINGS
    // ==========================================
    "puzzleSettings": "[TRANSLATE: Puzzle Settings]",
    "gridSize": "[TRANSLATE: Grid Size]",
    "rows": "[TRANSLATE: Rows:]",
    "columns": "[TRANSLATE: Columns:]",
    "puzzleOptions": "[TRANSLATE: Puzzle Options]",
    "allowDiagonal": "[TRANSLATE: Allow Diagonal Words]",
    "allowReverseWords": "[TRANSLATE: Allow Reverse Words]",
    "showWordList": "[TRANSLATE: Show Word/Image List]",
    "classicMode": "[TRANSLATE: Classic Mode (Text Only)]",

    // ==========================================
    // 6. IMAGE LIBRARY
    // ==========================================
    "imageLibrary": "[TRANSLATE: Image Library]",
    "imageSourceForPuzzle": "[TRANSLATE: Image Source for Puzzle]",
    "theme": "[TRANSLATE: Theme:]",
    "useRandomTheme": "[TRANSLATE: -- Use Random Theme --]",
    "individualImageSelection": "[TRANSLATE: Individual Image Selection]",
    "filterByTheme": "[TRANSLATE: Filter by Theme:]",
    "searchImages": "[TRANSLATE: Search Images:]",
    "searchPlaceholder": "[TRANSLATE: e.g., apple, car]",
    "availableImages": "[TRANSLATE: Available Images (max 8):]",
    "loadingImages": "[TRANSLATE: Loading images...]",
    "selectedImages": "[TRANSLATE: Selected Images:]",

    // Theme options (dynamic)
    "allThemes": "[TRANSLATE: All Themes]",
    "allThemesRandomly": "[TRANSLATE: All Themes (Randomly)]",
    "allThemesForSearch": "[TRANSLATE: All Themes (for search)]",

    // ==========================================
    // 7. UPLOAD CUSTOM IMAGES
    // ==========================================
    "uploadCustomImages": "[TRANSLATE: Upload Custom Images]",
    "selectImagesToUpload": "[TRANSLATE: Select image(s) to upload:]",
    "chooseFiles": "[TRANSLATE: Choose files]",
    "noFileChosen": "[TRANSLATE: No file chosen]",
    "uploadedImages": "[TRANSLATE: Your Uploaded Images (This Session):]",
    "yourUploadedImagesWillAppearHere": "[TRANSLATE: Your uploaded images will appear here.]",

    // ==========================================
    // 8. TOOLBAR & ALIGNMENT
    // ==========================================
    // Layer controls
    "layers": "[TRANSLATE: Layers]",
    "bringForward": "[TRANSLATE: Bring Forward]",
    "sendBackward": "[TRANSLATE: Send Backward]",

    // Alignment controls
    "align": "[TRANSLATE: Align]",
    "alignSelected": "[TRANSLATE: Align Selected:]",
    "alignLeft": "[TRANSLATE: Align Left]",
    "centerHorizontally": "[TRANSLATE: Center Horizontally]",
    "alignRight": "[TRANSLATE: Align Right]",
    "alignTop": "[TRANSLATE: Align Top]",
    "centerVertically": "[TRANSLATE: Center Vertically]",
    "alignBottom": "[TRANSLATE: Align Bottom]",
    "alignToPage": "[TRANSLATE: Align to Page:]",
    "centerOnPageHorizontally": "[TRANSLATE: Center on Page Horizontally]",
    "centerOnPageVertically": "[TRANSLATE: Center on Page Vertically]",

    // Delete
    "deleteSelected": "[TRANSLATE: Delete Selected]",

    // ==========================================
    // 9. ACTION BUTTONS
    // ==========================================
    "generate": "[TRANSLATE: Generate]",
    "newWorksheet": "[TRANSLATE: New Worksheet]",
    "answerKey": "[TRANSLATE: Answer Key]",
    "download": "[TRANSLATE: Download]",
    "worksheetJpeg": "[TRANSLATE: Worksheet (JPEG)]",
    "answerKeyJpeg": "[TRANSLATE: Answer Key (JPEG)]",
    "worksheetPdf": "[TRANSLATE: Worksheet (PDF)]",
    "answerKeyPdf": "[TRANSLATE: Answer Key (PDF)]",
    "grayscale": "[TRANSLATE: Grayscale]",
    "clearAll": "[TRANSLATE: Clear All]",

    // Tab buttons
    "worksheet": "[TRANSLATE: Worksheet]",

    // ==========================================
    // 10. DYNAMIC MESSAGES - SUCCESS/INFO
    // ==========================================
    "allSettingsCleared": "[TRANSLATE: All settings cleared.]",
    "puzzleWillGenerateUsing": "[TRANSLATE: Puzzle will generate using the '{}' theme.]",
    "customImagesAvailable": "[TRANSLATE: {} custom image(s) available.]",
    "jpegDownloadInitiated": "[TRANSLATE: JPEG download initiated!]",
    "pdfDownloaded": "[TRANSLATE: PDF downloaded!]",

    // ==========================================
    // 11. DYNAMIC MESSAGES - LOADING/PROGRESS
    // ==========================================
    "searching": "[TRANSLATE: Searching...]",
    "loadingTheme": "[TRANSLATE: Loading theme...]",
    "loadingImagesCount": "[TRANSLATE: Loading {} image(s)...]",
    "loadingThemeBorders": "[TRANSLATE: Loading {} borders...]",
    "loadingThemeBackgrounds": "[TRANSLATE: Loading {} backgrounds...]",
    "preparingJpeg": "[TRANSLATE: Preparing JPEG...]",
    "preparingPdf": "[TRANSLATE: Preparing PDF...]",

    // ==========================================
    // 12. DYNAMIC MESSAGES - ERRORS/WARNINGS
    // ==========================================
    "noImagesFound": "[TRANSLATE: No images found]",
    "maxImagesSelected": "[TRANSLATE: You can select a maximum of {} images.]",
    "errorReadingFile": "[TRANSLATE: Error reading file: {}]",
    "noBordersInTheme": "[TRANSLATE: No borders in this theme.]",
    "noBackgroundsInTheme": "[TRANSLATE: No backgrounds in this theme.]",
    "pleaseGenerateContentFirst": "[TRANSLATE: Please generate content first.]",
    "errorPreparingJpeg": "[TRANSLATE: Error preparing JPEG.]",
    "errorCreatingPdf": "[TRANSLATE: Error creating PDF.]",

    // ==========================================
    // 13. WATERMARK TEXT
    // ==========================================
    "watermarkText": "[TRANSLATE: FREE VERSION - LessonCraftStudio.com]",
    "watermarkSmall": "[TRANSLATE: FREE VERSION]",

    // ==========================================
    // 14. DEFAULT TEXT VALUES
    // ==========================================
    "defaultNewText": "[TRANSLATE: New Text]",
    "puzzle": "[TRANSLATE: Puzzle]",
    "exercise": "[TRANSLATE: Exercise]",

    // ==========================================
    // 15. FONT FAMILY OPTIONS
    // ==========================================
    "fontArial": "[TRANSLATE: Arial]",
    "fontComicSans": "[TRANSLATE: Comic Sans MS]",
    "fontCourier": "[TRANSLATE: Courier New]",
    "fontGeorgia": "[TRANSLATE: Georgia]",
    "fontTahoma": "[TRANSLATE: Tahoma]",
    "fontTimes": "[TRANSLATE: Times New Roman]",
    "fontTrebuchet": "[TRANSLATE: Trebuchet MS]",
    "fontVerdana": "[TRANSLATE: Verdana]",
    "fontPalatino": "[TRANSLATE: Palatino]",

    // ==========================================
    // 16. FILE INPUT MULTIPLE SELECTION
    // ==========================================
    "filesSelected": "[TRANSLATE: {} file(s) selected]"
  }
};

// ==========================================
// HELPER FUNCTIONS FOR IMPLEMENTATION
// ==========================================

/**
 * Global translation function
 * Must be defined in the app after currentLocale is set
 */
const translationHelpers = {
  /**
   * Initialize the translation function
   * Add this immediately after setting currentLocale
   */
  initTranslationFunction: function() {
    return `
    // Define the global translation function t()
    function t(key) {
        if (typeof translations === 'undefined') return key;
        const translation = (translations[currentLocale] && translations[currentLocale][key]) ||
                          (translations.en && translations.en[key]) ||
                          key;
        return translation;
    }
    window.t = t;
    `;
  },

  /**
   * Format a translation with placeholders
   * @param {string} text - Translation text with {} placeholders
   * @param {...any} values - Values to replace placeholders
   */
  formatTranslation: function(text, ...values) {
    let result = text;
    values.forEach((value) => {
      result = result.replace('{}', value);
    });
    return result;
  },

  /**
   * Check if all required keys are present for a locale
   * @param {string} locale - Locale to check
   * @returns {Object} Report with missing keys
   */
  validateLocale: function(locale) {
    const template = WORDSEARCH_TRANSLATIONS["XX"];
    const localeTranslations = WORDSEARCH_TRANSLATIONS[locale] || {};
    const missing = [];
    const untranslated = [];

    for (const key in template) {
      if (!localeTranslations[key]) {
        missing.push(key);
      } else if (localeTranslations[key].includes('[TRANSLATE:')) {
        untranslated.push(key);
      }
    }

    return {
      locale: locale,
      totalKeys: Object.keys(template).length,
      translated: Object.keys(template).length - missing.length - untranslated.length,
      missing: missing,
      untranslated: untranslated,
      coverage: ((Object.keys(template).length - missing.length - untranslated.length) / Object.keys(template).length * 100).toFixed(1) + '%'
    };
  },

  /**
   * Generate implementation code for data-translate attributes
   */
  generateDataTranslateImplementation: function() {
    return `
    // Apply translations to all elements with data-translate attribute
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (key && typeof t !== 'undefined') {
                element.textContent = t(key);
            }
        });

        // Handle placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (key && typeof t !== 'undefined') {
                element.placeholder = t(key);
            }
        });

        // Handle titles/tooltips
        document.querySelectorAll('[data-translate-title]').forEach(element => {
            const key = element.getAttribute('data-translate-title');
            if (key && typeof t !== 'undefined') {
                element.title = t(key);
            }
        });
    });
    `;
  }
};

// ==========================================
// IMPLEMENTATION CHECKLIST
// ==========================================
const IMPLEMENTATION_CHECKLIST = {
  "1_remove_existing": {
    task: "Remove all existing translation code from wordsearch.html",
    checks: [
      "Remove any existing t() function definitions",
      "Remove any translation objects",
      "Keep data-translate attributes but remove inline translations"
    ]
  },
  "2_add_translation_file": {
    task: "Add this translation structure to translations.js",
    checks: [
      "Copy the WORDSEARCH_TRANSLATIONS structure",
      "Replace 'XX' with actual locale codes",
      "Remove [TRANSLATE: ] prefixes after translation"
    ]
  },
  "3_add_t_function": {
    task: "Add the t() function to wordsearch.html",
    checks: [
      "Add after currentLocale is set",
      "Make it globally available with window.t = t",
      "Test in console with t('generate')"
    ]
  },
  "4_update_dynamic_text": {
    task: "Update all dynamic JavaScript text to use t()",
    checks: [
      "Replace all showMessage() string literals",
      "Update dropdown option creation",
      "Fix default values and placeholders",
      "Update innerHTML assignments"
    ]
  },
  "5_test_thoroughly": {
    task: "Test with each locale",
    checks: [
      "No English text visible when using non-English locale",
      "All dropdowns show translated options",
      "Error messages appear in selected language",
      "Watermarks are translated"
    ]
  }
};

// ==========================================
// COMMON PITFALLS TO AVOID
// ==========================================
const COMMON_PITFALLS = {
  "missing_t_function": "Always define the t() function or translations won't work",
  "hardcoded_options": "Dynamic dropdowns often have hardcoded 'None' or 'All' options",
  "default_values": "Input default values like 'Puzzle' are often hardcoded",
  "template_literals": "Search for ${} in JavaScript - these need t() function too",
  "watermarks": "Don't forget to translate watermark text",
  "file_input": "Browser file input needs custom wrapper for translation",
  "answer_key_duplicate": "The 'answerKey' key is used in two places - handle both"
};

// ==========================================
// EXPORT STRUCTURE
// ==========================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WORDSEARCH_TRANSLATIONS,
    translationHelpers,
    IMPLEMENTATION_CHECKLIST,
    COMMON_PITFALLS
  };
}

// ==========================================
// USAGE INSTRUCTIONS
// ==========================================
/*
1. Copy this template structure
2. For each language, replace [TRANSLATE: text] with actual translations
3. Use the XX template as reference for adding new languages
4. Test with validateLocale() function to ensure completeness
5. Follow the IMPLEMENTATION_CHECKLIST for integration

CRITICAL KEYS THAT ARE OFTEN MISSED:
- "none" (dropdown option)
- "custom" (page size option)
- "allThemesForSearch" (dynamic theme option)
- "filesSelected" (multiple file selection)
- Default text values for inputs

DYNAMIC VALUE PLACEHOLDERS:
Use {} in translations where values are inserted at runtime:
- "maxImagesSelected": "You can select a maximum of {} images."
- "customImagesAvailable": "{} custom image(s) available."

Then use formatTranslation() helper or replace {} in code.
*/