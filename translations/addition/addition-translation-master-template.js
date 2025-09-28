/**
 * MASTER TRANSLATION TEMPLATE FOR IMAGE ADDITION APP
 * ====================================================
 * Complete translation structure for 11 languages
 * Based on comprehensive inventory of 142+ translatable elements
 *
 * CRITICAL NOTE: Addition.html has almost NO translation attributes!
 * Only 2 elements have data-translate attributes currently.
 * This requires a complete overhaul of the HTML.
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
 * - 106 unique translation keys
 * - Organized into 12 logical categories
 * - Support for dynamic placeholders using {}
 * - Canvas-rendered text translations included
 */

// Translation template structure
const ADDITION_TRANSLATIONS = {
  // Template for each language - Copy this structure for each locale
  "XX": {
    // ==========================================
    // 1. APP METADATA & TITLES
    // ==========================================
    "app.title": "[TRANSLATE: Image Addition Worksheet Generator]",
    "worksheetSettings": "[TRANSLATE: Worksheet Settings]",

    // ==========================================
    // 2. LANGUAGE SETTINGS
    // ==========================================
    "languageSettings": "[TRANSLATE: Language Settings]",
    "language": "[TRANSLATE: Language:]",

    // Language names (shown in dropdown)
    "lang_en": "[TRANSLATE: English]",
    "lang_de": "[TRANSLATE: Deutsch]",
    "lang_fr": "[TRANSLATE: Français]",
    "lang_es": "[TRANSLATE: Español]",
    "lang_pt": "[TRANSLATE: Português]",
    "lang_it": "[TRANSLATE: Italiano]",
    "lang_nl": "[TRANSLATE: Nederlands]",
    "lang_sv": "[TRANSLATE: Svenska]",
    "lang_da": "[TRANSLATE: Dansk]",
    "lang_no": "[TRANSLATE: Norsk]",
    "lang_fi": "[TRANSLATE: Suomi]",

    // ==========================================
    // 3. PAGE SETUP
    // ==========================================
    "pageSetup": "[TRANSLATE: Page Setup]",
    "pageSize": "[TRANSLATE: Page Size:]",

    // Page size options
    "letterPortrait": "[TRANSLATE: Letter Portrait (612×792)]",
    "letterLandscape": "[TRANSLATE: Letter Landscape (792×612)]",
    "a4Portrait": "[TRANSLATE: A4 Portrait (595×842)]",
    "a4Landscape": "[TRANSLATE: A4 Landscape (842×595)]",
    "square": "[TRANSLATE: Square (1200×1200)]",
    "custom": "[TRANSLATE: Custom]",

    // Custom size inputs
    "widthPx": "[TRANSLATE: Width (px):]",
    "heightPx": "[TRANSLATE: Height (px):]",
    "pageColor": "[TRANSLATE: Page Color:]",
    "applySize": "[TRANSLATE: Apply Size]",

    // Background settings
    "background": "[TRANSLATE: Background]",
    "backgroundTheme": "[TRANSLATE: Background Theme:]",
    "none": "[TRANSLATE: None]",
    "selectThemeForBackgrounds": "[TRANSLATE: Select a theme for backgrounds.]",
    "backgroundOpacity": "[TRANSLATE: Background Opacity:]",

    // Border settings
    "border": "[TRANSLATE: Border]",
    "borderTheme": "[TRANSLATE: Border Theme:]",
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
    // 5. EXERCISE CONFIGURATION (Addition-specific)
    // ==========================================
    "exerciseConfiguration": "[TRANSLATE: Exercise Configuration]",
    "numberOfExercises": "[TRANSLATE: Number of Exercises (1–10):]",
    "minItemsPerGroup": "[TRANSLATE: Min items per group (1-10):]",
    "maxItemsPerGroup": "[TRANSLATE: Max items per group (1-10):]",
    "includeNameDateFields": "[TRANSLATE: Include Name/Date Fields]",
    "showPlusBetweenGroups": "[TRANSLATE: Show '+' Between Image Groups]",
    "includeExerciseNumbers": "[TRANSLATE: Include Exercise Numbers]",
    "useChildFriendlyBox": "[TRANSLATE: Use child-friendly box for expressions]",

    // ==========================================
    // 6. IMAGE LIBRARY
    // ==========================================
    "imageLibrary": "[TRANSLATE: Image Library]",
    "selectTheme": "[TRANSLATE: Select Theme:]",
    "searchImages": "[TRANSLATE: Search Images:]",
    "searchPlaceholder": "[TRANSLATE: e.g., apple, car]",
    "selectedCount": "[TRANSLATE: Selected: {} / {}]",
    "availableImages": "[TRANSLATE: Available Images:]",
    "loadingImages": "[TRANSLATE: Loading images...]",
    "selectedImagesForProblems": "[TRANSLATE: Selected Images for Problems:]",

    // Theme options
    "allThemes": "[TRANSLATE: All Themes]",
    "selectThemeOrSearch": "[TRANSLATE: Select a theme or type to search all images.]",

    // ==========================================
    // 7. UPLOAD CUSTOM IMAGES
    // ==========================================
    "uploadCustomImages": "[TRANSLATE: Upload Custom Images]",
    "selectImagesToUpload": "[TRANSLATE: Select image(s) to upload:]",
    "yourUploadedImages": "[TRANSLATE: Your Uploaded Images (This Session):]",
    "yourUploadedImagesWillAppearHere": "[TRANSLATE: Your uploaded images will appear here.]",

    // File input (needs custom handling)
    "chooseFiles": "[TRANSLATE: Choose Files]",
    "noFileChosen": "[TRANSLATE: No file chosen]",
    "filesSelected": "[TRANSLATE: {} file(s) selected]",

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
    "generateWorksheet": "[TRANSLATE: Generate Worksheet]",
    "generateAnswerKey": "[TRANSLATE: Generate Answer Key]",
    "download": "[TRANSLATE: Download]",
    "worksheetJpeg": "[TRANSLATE: Worksheet (JPEG)]",
    "answerKeyJpeg": "[TRANSLATE: Answer Key (JPEG)]",
    "worksheetPdf": "[TRANSLATE: Worksheet (PDF)]",
    "answerKeyPdf": "[TRANSLATE: Answer Key (PDF)]",
    "grayscale": "[TRANSLATE: Grayscale]",
    "clearAll": "[TRANSLATE: Clear All]",

    // Tab buttons
    "worksheet": "[TRANSLATE: Worksheet]",
    "answerKey": "[TRANSLATE: Answer Key]",

    // ==========================================
    // 10. CANVAS-RENDERED TEXT (Special handling needed)
    // ==========================================
    "nameLabel": "[TRANSLATE: Name:]",
    "dateLabel": "[TRANSLATE: Date:]",
    "exerciseNumber": "[TRANSLATE: {})]", // e.g., "1)", "2)"
    "plusSign": "[TRANSLATE: +]",
    "equalsSign": "[TRANSLATE: =]",

    // ==========================================
    // 11. DYNAMIC MESSAGES - SUCCESS/INFO/ERROR
    // ==========================================
    // Success messages
    "textAddedToWorksheet": "[TRANSLATE: Text added to worksheet.]",
    "formCleared": "[TRANSLATE: Form cleared.]",
    "worksheetGeneratedSuccessfully": "[TRANSLATE: Worksheet generated successfully!]",
    "answerKeyGenerated": "[TRANSLATE: Answer key generated!]",
    "downloadInitiated": "[TRANSLATE: Download Initiated!]",
    "pdfDownloaded": "[TRANSLATE: PDF Downloaded!]",

    // Info messages
    "maxImagesSelected": "[TRANSLATE: Max {} image(s) selected.]",
    "noImagesFound": "[TRANSLATE: No images found]",
    "noBordersInTheme": "[TRANSLATE: No borders in this theme.]",
    "noImagesAvailable": "[TRANSLATE: No images available in the library. Try uploading some!]",
    "pleaseSelectImages": "[TRANSLATE: Please select some images first, either from the library or by uploading your own.]",

    // Error messages
    "couldNotLoadThemes": "[TRANSLATE: Could not load themes.]",
    "errorLoadingThemes": "[TRANSLATE: Error loading themes. Please refresh the page.]",
    "errorDuringSearch": "[TRANSLATE: Error during search.]",
    "errorLoadingImages": "[TRANSLATE: Error loading images.]",
    "errorLoadingBorders": "[TRANSLATE: Error loading borders.]",
    "errorLoadingBackgrounds": "[TRANSLATE: Error loading backgrounds.]",
    "pleaseGenerateWorksheetFirst": "[TRANSLATE: Please generate a worksheet first.]",
    "pleaseGenerateContentFirst": "[TRANSLATE: Please generate the content before downloading.]",
    "jpegError": "[TRANSLATE: JPEG Error: {}]",
    "pdfError": "[TRANSLATE: PDF Error: {}]",

    // ==========================================
    // 12. LOADING/PROGRESS MESSAGES
    // ==========================================
    "searching": "[TRANSLATE: Searching...]",
    "loadingImagesForTheme": "[TRANSLATE: Loading images for theme: {}... Please wait.]",
    "loadingBorders": "[TRANSLATE: Loading {} borders...]",
    "loadingBackgrounds": "[TRANSLATE: Loading {} backgrounds...]",
    "preparingFile": "[TRANSLATE: Preparing {}...]",

    // ==========================================
    // 13. FONT FAMILY OPTIONS
    // ==========================================
    "fontArial": "[TRANSLATE: Arial]",
    "fontComicSans": "[TRANSLATE: Comic Sans MS]",
    "fontCourier": "[TRANSLATE: Courier New]",
    "fontGeorgia": "[TRANSLATE: Georgia]",
    "fontTahoma": "[TRANSLATE: Tahoma]",
    "fontTimes": "[TRANSLATE: Times New Roman]",
    "fontTrebuchet": "[TRANSLATE: Trebuchet MS]",
    "fontVerdana": "[TRANSLATE: Verdana]",
    "fontPalatino": "[TRANSLATE: Palatino]"
  }
};

// ==========================================
// HELPER FUNCTIONS FOR IMPLEMENTATION
// ==========================================

/**
 * Implementation helpers specific to Addition app
 */
const additionTranslationHelpers = {
  /**
   * Initialize the translation function
   * MUST be added after currentLocale is set
   */
  initTranslationFunction: function() {
    return `
    // Define the global translation function t()
    function t(key) {
        if (typeof translations === 'undefined') {
            console.warn('Translations not loaded, returning key:', key);
            return key;
        }
        const translation = (translations[currentLocale] && translations[currentLocale][key]) ||
                          (translations.en && translations.en[key]) ||
                          key;
        return translation;
    }
    window.t = t;

    // Format translation with placeholders
    function formatTranslation(text, ...values) {
        let result = text;
        values.forEach((value) => {
            result = result.replace('{}', value);
        });
        return result;
    }
    window.formatTranslation = formatTranslation;
    `;
  },

  /**
   * Apply translations to ALL HTML elements
   * Addition app needs extensive attribute additions
   */
  applyHTMLTranslations: function() {
    return `
    // Apply translations to HTML elements
    function applyHTMLTranslations() {
        // Translate elements with data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (key) {
                element.textContent = t(key);
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (key) {
                element.placeholder = t(key);
            }
        });

        // Translate titles/tooltips
        document.querySelectorAll('[data-translate-title]').forEach(element => {
            const key = element.getAttribute('data-translate-title');
            if (key) {
                element.title = t(key);
            }
        });

        // Handle file input labels (special case)
        const fileInputLabel = document.querySelector('.file-input-label');
        if (fileInputLabel && !fileInputLabel.dataset.hasFiles) {
            fileInputLabel.textContent = t('noFileChosen');
        }
    }
    `;
  },

  /**
   * Canvas text translation helper
   * For Name:, Date:, and exercise numbers
   */
  getCanvasText: function(key, ...values) {
    return `
    // Get translated text for canvas rendering
    function getCanvasText(key, ...values) {
        const text = t(key);
        return formatTranslation(text, ...values);
    }
    `;
  },

  /**
   * Validate locale completeness
   */
  validateLocale: function(locale) {
    const template = ADDITION_TRANSLATIONS["XX"];
    const localeTranslations = ADDITION_TRANSLATIONS[locale] || {};
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
  }
};

// ==========================================
// REQUIRED HTML ATTRIBUTE ADDITIONS
// ==========================================
const REQUIRED_HTML_CHANGES = {
  "Missing data-translate attributes": [
    { line: 771, element: "<h2>", key: "worksheetSettings" },
    { line: 777, element: "<button>", key: "languageSettings", note: "Fix wrong key 'settings'" },
    { line: 797, element: "<button>", key: "pageSetup" },
    { line: 799, element: "<label>", key: "pageSize" },
    { line: 809, element: "<label>", key: "widthPx" },
    { line: 811, element: "<label>", key: "heightPx" },
    { line: 814, element: "<label>", key: "pageColor" },
    { line: 816, element: "<button>", key: "applySize" },
    { line: 818, element: "<h4>", key: "background" },
    { line: 819, element: "<label>", key: "backgroundTheme" },
    { line: 824, element: "<label>", key: "backgroundOpacity" },
    { line: 827, element: "<h4>", key: "border" },
    { line: 828, element: "<label>", key: "borderTheme" },
    { line: 835, element: "<label>", key: "borderOpacity" },
    { line: 841, element: "<button>", key: "textTools" },
    { line: 843, element: "<h4>", key: "addNewText" },
    { line: 844, element: "<label>", key: "content" },
    { line: 845, element: "<button>", key: "addText" },
    { line: 846, element: "<h4>", key: "selectedTextProperties" },
    { line: 847, element: "<label>", key: "color" },
    { line: 848, element: "<label>", key: "size" },
    { line: 849, element: "<label>", key: "font" },
    { line: 859, element: "<label>", key: "outlineColor" },
    { line: 860, element: "<label>", key: "outlineWidth" },
    { line: 866, element: "<button>", key: "exerciseConfiguration" },
    { line: 868, element: "<label>", key: "numberOfExercises" },
    { line: 870, element: "<label>", key: "minItemsPerGroup" },
    { line: 872, element: "<label>", key: "maxItemsPerGroup" },
    { line: 875, element: "<span>", key: "includeNameDateFields" },
    { line: 878, element: "<span>", key: "showPlusBetweenGroups" },
    { line: 881, element: "<span>", key: "includeExerciseNumbers" },
    { line: 884, element: "<span>", key: "useChildFriendlyBox" },
    { line: 890, element: "<button>", key: "imageLibrary" },
    { line: 892, element: "<label>", key: "selectTheme" },
    { line: 894, element: "<label>", key: "searchImages" },
    { line: 897, element: "<label>", key: "availableImages" },
    { line: 899, element: "<label>", key: "selectedImagesForProblems" },
    { line: 905, element: "<button>", key: "uploadCustomImages" },
    { line: 907, element: "<label>", key: "selectImagesToUpload" },
    { line: 909, element: "<label>", key: "yourUploadedImages" },
    { line: 930, element: "<button>", key: "bringForward" },
    { line: 931, element: "<button>", key: "sendBackward" },
    { line: 965, element: "<span>", key: "generate" },
    { line: 967, element: "<button>", key: "generateWorksheet" },
    { line: 968, element: "<button>", key: "generateAnswerKey" },
    { line: 972, element: "<span>", key: "download" },
    { line: 974, element: "<button>", key: "worksheetJpeg" },
    { line: 975, element: "<button>", key: "answerKeyJpeg" },
    { line: 976, element: "<button>", key: "worksheetPdf" },
    { line: 977, element: "<button>", key: "answerKeyPdf" },
    { line: 980, element: "<span>", key: "grayscale" },
    { line: 984, element: "<button>", key: "clearAll" },
    { line: 988, element: "<button>", key: "worksheet" },
    { line: 989, element: "<button>", key: "answerKey" }
  ],
  "Total missing attributes": 53
};

// ==========================================
// IMPLEMENTATION CHECKLIST
// ==========================================
const IMPLEMENTATION_CHECKLIST = {
  "1_add_attributes": {
    task: "Add ALL 53 missing data-translate attributes to HTML",
    priority: "CRITICAL",
    notes: "Addition.html has almost no translation attributes!"
  },
  "2_add_translation_functions": {
    task: "Add t() and formatTranslation() functions",
    location: "After currentLocale is set"
  },
  "3_replace_javascript_text": {
    task: "Replace 35+ hardcoded JavaScript strings with t() calls",
    examples: [
      "showMessage('Text added to worksheet.', 'success') → showMessage(t('textAddedToWorksheet'), 'success')",
      "innerHTML = '<p>Loading images...</p>' → innerHTML = `<p>${t('loadingImages')}</p>`"
    ]
  },
  "4_handle_canvas_text": {
    task: "Translate canvas-rendered text",
    items: ["Name:", "Date:", "1)", "2)", "+", "="],
    note: "Use getCanvasText() helper when rendering to canvas"
  },
  "5_handle_file_input": {
    task: "Create custom file input wrapper for translation",
    note: "Browser file input can't be directly translated"
  },
  "6_test_thoroughly": {
    task: "Test with each locale",
    checklist: [
      "All HTML elements show translated text",
      "All JavaScript messages translated",
      "Canvas text (Name/Date) translated",
      "File input shows translated labels",
      "No English text visible"
    ]
  }
};

// ==========================================
// CRITICAL DIFFERENCES FROM WORDSEARCH
// ==========================================
const ADDITION_SPECIFIC_NOTES = {
  "attribute_coverage": "Only 2 elements have data-translate (vs 83 in wordsearch)",
  "canvas_text": "Addition app renders text directly to canvas (Name:, Date:, numbers)",
  "exercise_config": "Has unique exercise configuration section",
  "math_symbols": "Includes mathematical symbols (+, =) that may not need translation",
  "selection_counter": "Dynamic selection counter needs special handling",
  "file_input": "No custom file input wrapper exists yet"
};

// ==========================================
// EXPORT STRUCTURE
// ==========================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ADDITION_TRANSLATIONS,
    additionTranslationHelpers,
    REQUIRED_HTML_CHANGES,
    IMPLEMENTATION_CHECKLIST,
    ADDITION_SPECIFIC_NOTES
  };
}

// ==========================================
// USAGE INSTRUCTIONS
// ==========================================
/*
CRITICAL: The Addition app needs EXTENSIVE work!

1. ADD ALL MISSING ATTRIBUTES (53 elements)
   - Almost every HTML element lacks data-translate
   - Use REQUIRED_HTML_CHANGES list as guide

2. ADD TRANSLATION FUNCTIONS
   - Copy initTranslationFunction() code
   - Add after currentLocale is set

3. REPLACE JAVASCRIPT TEXT (35+ locations)
   - All showMessage() calls
   - All innerHTML assignments
   - Dictionary messages

4. HANDLE CANVAS TEXT
   - Name: and Date: labels
   - Exercise numbers (1), 2), etc.)
   - Mathematical symbols

5. CREATE FILE INPUT WRAPPER
   - Browser file input needs custom handling
   - See wordsearch for example pattern

6. TEST COMPLETELY
   - This app has 106 unique keys to translate
   - Test canvas rendering in different languages
   - Verify selection counter updates properly

PRIORITY ORDER:
1. HTML attributes (foundation)
2. JavaScript messages (user feedback)
3. Canvas text (worksheet content)
4. File input (upload feature)

ESTIMATED IMPLEMENTATION TIME: 2-3 hours
(Much more extensive than wordsearch due to missing attributes)
*/