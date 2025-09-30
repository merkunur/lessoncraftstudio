/**
 * MASTER TRANSLATION TEMPLATE FOR ALPHABET TRAIN APP
 * ====================================================
 * Complete translation structure for 11 languages
 * Based on comprehensive inventory of 165+ translatable elements
 *
 * CRITICAL NOTE: Alphabet Train has almost NO translation attributes!
 * Only 2 elements have data-translate attributes currently (1.2% coverage).
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
 * - 120+ unique translation keys
 * - Organized into 14 logical categories
 * - Support for dynamic placeholders using {}
 * - Train-specific terminology included
 */

// Translation template structure
const ALPHABET_TRAIN_TRANSLATIONS = {
  // Template for each language - Copy this structure for each locale
  "XX": {
    // ==========================================
    // 1. APP METADATA & TITLES
    // ==========================================
    "app.title": "[TRANSLATE: Alphabet Train Worksheet App]",
    "trainSettings": "[TRANSLATE: Train Settings]",

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
    "paperSize": "[TRANSLATE: Paper Size:]",

    // Page size options
    "letterPortrait": "[TRANSLATE: Letter Portrait (8.5×11\")]",
    "letterLandscape": "[TRANSLATE: Letter Landscape (11×8.5\")]",
    "a4Portrait": "[TRANSLATE: A4 Portrait (210×297mm)]",
    "a4Landscape": "[TRANSLATE: A4 Landscape (297×210mm)]",
    "square": "[TRANSLATE: Square (1200x1200)]",
    "custom": "[TRANSLATE: Custom]",

    // Custom size inputs
    "widthPx": "[TRANSLATE: Width (px):]",
    "heightPx": "[TRANSLATE: Height (px):]",
    "applySize": "[TRANSLATE: Apply Size]",

    // Template settings
    "template": "[TRANSLATE: Template]",
    "trainTemplate": "[TRANSLATE: Train Template:]",
    "defaultTrain": "[TRANSLATE: Default Train]",
    "pageColor": "[TRANSLATE: Page Color:]",

    // Background settings
    "background": "[TRANSLATE: Background]",
    "backgroundTheme": "[TRANSLATE: Background Theme:]",
    "none": "[TRANSLATE: None]",
    "backgroundOpacity": "[TRANSLATE: Background Opacity:]",
    "selectThemeForBackgrounds": "[TRANSLATE: Select a theme for backgrounds.]",

    // Border settings
    "border": "[TRANSLATE: Border]",
    "borderTheme": "[TRANSLATE: Border Theme:]",
    "borderOpacity": "[TRANSLATE: Border Opacity:]",
    "selectThemeToSeeBorders": "[TRANSLATE: Select a theme to see borders.]",

    // ==========================================
    // 4. TEXT TOOLS
    // ==========================================
    "textTools": "[TRANSLATE: Text Tools]",
    "addNewText": "[TRANSLATE: Add New Text]",
    "content": "[TRANSLATE: Content:]",
    "worksheetTitlePlaceholder": "[TRANSLATE: Worksheet Title...]",
    "addTextToPage": "[TRANSLATE: Add Text to Page]",
    "selectedTextProperties": "[TRANSLATE: Selected Text Properties]",
    "color": "[TRANSLATE: Color:]",
    "size": "[TRANSLATE: Size:]",
    "font": "[TRANSLATE: Font:]",
    "outlineColor": "[TRANSLATE: Outline Color:]",
    "outlineWidth": "[TRANSLATE: Outline (0-10):]",

    // ==========================================
    // 5. MODE SETTINGS (Train-specific)
    // ==========================================
    "mode": "[TRANSLATE: Mode]",
    "autoCreateMode": "[TRANSLATE: Auto Create (Random 11 Letters & Images)]",

    // ==========================================
    // 6. LETTER & IMAGE SELECTION (Train-specific)
    // ==========================================
    "letterImageSelection": "[TRANSLATE: Letter & Image Selection]",
    "selectLettersExactly11": "[TRANSLATE: Select Letters (exactly 11):]",
    "selectedCount": "[TRANSLATE: Selected: {}/11]",
    "imageTheme": "[TRANSLATE: Image Theme:]",
    "searchImagesPlaceholder": "[TRANSLATE: Search images (e.g., apple)]",
    "loadingThemes": "[TRANSLATE: Loading themes...]",

    // ==========================================
    // 7. UPLOAD CUSTOM IMAGES
    // ==========================================
    "uploadCustomImages": "[TRANSLATE: Upload Custom Images]",
    "selectImagesToUpload": "[TRANSLATE: Select image(s) to upload:]",
    "yourUploadedImagesThisSession": "[TRANSLATE: Your Uploaded Images (This Session):]",
    "uploadedImagesWillAppearHere": "[TRANSLATE: Your uploaded images will appear here.]",

    // File input (needs custom handling)
    "chooseFiles": "[TRANSLATE: Choose Files]",
    "noFileChosen": "[TRANSLATE: No file chosen]",
    "filesSelected": "[TRANSLATE: {} file(s) selected]",

    // ==========================================
    // 8. ASSIGNMENTS & CONFIGURATION (Train-specific)
    // ==========================================
    "assignmentsConfiguration": "[TRANSLATE: Assignments & Configuration]",
    "assignedImages": "[TRANSLATE: Assigned Images]",
    "numberOfClues": "[TRANSLATE: Number of Clues (3-11):]",
    "includeNameDateFields": "[TRANSLATE: Include Name/Date Fields]",

    // ==========================================
    // 9. TOOLBAR & ALIGNMENT
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
    // 10. ACTION BUTTONS
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
    // 11. SUCCESS MESSAGES
    // ==========================================
    "pageSizeUpdated": "[TRANSLATE: Page size updated.]",
    "textAdded": "[TRANSLATE: Text added.]",
    "imageThemesLoaded": "[TRANSLATE: Image themes loaded.]",
    "loadedImagesForTheme": "[TRANSLATE: Loaded {} for {}.]",
    "assignedImageToLetter": "[TRANSLATE: Assigned \"{}\" to {}.]",
    "allSelectionsCleared": "[TRANSLATE: All selections and worksheet cleared.]",
    "customImagesAvailable": "[TRANSLATE: {} custom image(s) available.]",
    "worksheetGeneratedSuccessMessage": "[TRANSLATE: Worksheet generated! You can now generate the answer key.]",
    "answerKeyGenerated": "[TRANSLATE: Answer key generated!]",
    "downloadInitiated": "[TRANSLATE: Download Initiated!]",

    // ==========================================
    // 12. ERROR MESSAGES
    // ==========================================
    "disableAutoCreateToSelectManually": "[TRANSLATE: Disable 'Auto Create' to select letters manually.]",
    "canOnlySelectExactly11Letters": "[TRANSLATE: You can only select exactly 11 letters.]",
    "pleaseSelect11LettersFirst": "[TRANSLATE: Please select 11 letters first.]",
    "pleaseSelectAll11Letters": "[TRANSLATE: Please select all 11 letters.]",
    "imageStartsWithWrongLetter": "[TRANSLATE: Image \"{}\" starts with '{}', not in selected letters.]",
    "letterAlreadyHasImage": "[TRANSLATE: Letter \"{}\" already has image.]",
    "imageAlreadyAssigned": "[TRANSLATE: Image \"{}\" already assigned. Unique images required.]",
    "errorReadingFile": "[TRANSLATE: Error reading file: {}]",
    "selectSpecificThemeForAutoCreate": "[TRANSLATE: Please select a specific theme for Auto-Create mode.]",
    "autoCreateErrorNoImages": "[TRANSLATE: Auto-Create Error: The selected theme (and your uploads) have no images.]",
    "autoCreateErrorNotEnoughLetters": "[TRANSLATE: Auto-Create Error: Need images for at least 11 unique letters in this theme. Found {}.]",
    "autoCreateErrorFailedToPair": "[TRANSLATE: Auto-Create Error: Failed to find 11 unique letter-image pairs in this theme.]",
    "manualModeError": "[TRANSLATE: Manual Mode Error: Select 11 letters and assign unique images.]",
    "pleaseGenerateWorksheetFirst": "[TRANSLATE: Please generate the worksheet first.]",
    "errorBuildingWorksheet": "[TRANSLATE: Error: {}]",
    "answerKeyError": "[TRANSLATE: Answer Key Error: {}]",
    "grayscaleFailed": "[TRANSLATE: Grayscale failed: {}]",
    "pleaseGenerateContentFirst": "[TRANSLATE: Please generate the content before downloading.]",
    "jpegError": "[TRANSLATE: JPEG Error: {}]",

    // ==========================================
    // 13. INFO/LOADING MESSAGES
    // ==========================================
    "loadingImageLibrary": "[TRANSLATE: Loading image library...]",
    "loadingDefaultTheme": "[TRANSLATE: Loading default theme...]",
    "searching": "[TRANSLATE: Searching...]",
    "noImagesFound": "[TRANSLATE: No images found]",
    "loading": "[TRANSLATE: Loading...]",
    "loadingForTheme": "[TRANSLATE: Loading for {}...]",
    "dictionaryDisabledInAutoCreate": "[TRANSLATE: Dictionary disabled in Auto Create.]",
    "autoCreateEnabled": "[TRANSLATE: Auto-Create enabled. Please select a theme.]",
    "manualModeEnabled": "[TRANSLATE: Manual Mode enabled.]",
    "loadingImagesCount": "[TRANSLATE: Loading {} image(s)...]",
    "preparingData": "[TRANSLATE: Preparing data...]",
    "generatingWorksheet": "[TRANSLATE: Generating worksheet...]",
    "generatingAnswerKey": "[TRANSLATE: Generating answer key...]",
    "preparingFile": "[TRANSLATE: Preparing {}...]",

    // ==========================================
    // 14. WORKSHEET RENDERED TEXT
    // ==========================================
    "nameLine": "[TRANSLATE: Name: ____________________]",
    "dateLine": "[TRANSLATE: Date: ____________]",
    "watermarkText": "[TRANSLATE: FREE VERSION - LessonCraftStudio.com]",

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
    "fontPalatino": "[TRANSLATE: Palatino]"
  }
};

// ==========================================
// HELPER FUNCTIONS FOR IMPLEMENTATION
// ==========================================

/**
 * Implementation helpers specific to Alphabet Train app
 */
const alphabetTrainTranslationHelpers = {
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
   * Alphabet Train needs extensive attribute additions
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

        // Handle dynamic letter count
        const letterCount = document.getElementById('letterCount');
        if (letterCount && letterCount.dataset.count) {
            letterCount.textContent = formatTranslation(t('selectedCount'), letterCount.dataset.count);
        }

        // Handle file input labels (special case)
        const fileInputLabel = document.querySelector('.file-input-label');
        if (fileInputLabel && !fileInputLabel.dataset.hasFiles) {
            fileInputLabel.textContent = t('noFileChosen');
        }
    }
    `;
  },

  /**
   * Update letter count display with translation
   */
  updateLetterCount: function() {
    return `
    // Update letter count with translation
    function updateLetterCountDisplay(count) {
        const letterCountEl = document.getElementById('letterCount');
        if (letterCountEl) {
            letterCountEl.dataset.count = count;
            letterCountEl.textContent = formatTranslation(t('selectedCount'), count);
        }
    }
    `;
  },

  /**
   * Validate locale completeness
   */
  validateLocale: function(locale) {
    const template = ALPHABET_TRAIN_TRANSLATIONS["XX"];
    const localeTranslations = ALPHABET_TRAIN_TRANSLATIONS[locale] || {};
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
    // Main header
    { line: 720, element: "<h2>", key: "trainSettings" },

    // Fix wrong key
    { line: 725, element: "<button>", key: "languageSettings", note: "Fix 'settings' to 'languageSettings'" },

    // Accordion buttons
    { line: 744, element: "<button>", key: "pageSetup" },
    { line: 797, element: "<button>", key: "textTools" },
    { line: 821, element: "<button>", key: "mode" },
    { line: 832, element: "<button>", key: "letterImageSelection" },
    { line: 852, element: "<button>", key: "uploadCustomImages" },
    { line: 864, element: "<button>", key: "assignmentsConfiguration" },

    // Form labels - Page Setup
    { line: 746, element: "<label>", key: "paperSize" },
    { line: 756, element: "<label>", key: "widthPx" },
    { line: 758, element: "<label>", key: "heightPx" },
    { line: 761, element: "<button>", key: "applySize" },
    { line: 763, element: "<h4>", key: "template" },
    { line: 764, element: "<label>", key: "trainTemplate" },
    { line: 769, element: "<label>", key: "pageColor" },
    { line: 772, element: "<h4>", key: "background", note: "CRITICAL - User mentioned" },
    { line: 773, element: "<label>", key: "backgroundTheme" },
    { line: 777, element: "<label>", key: "backgroundOpacity" },
    { line: 783, element: "<h4>", key: "border", note: "CRITICAL - User mentioned" },
    { line: 784, element: "<label>", key: "borderTheme" },
    { line: 788, element: "<label>", key: "borderOpacity" },

    // Text Tools
    { line: 799, element: "<h4>", key: "addNewText" },
    { line: 800, element: "<label>", key: "content" },
    { line: 801, element: "<button>", key: "addTextToPage" },
    { line: 802, element: "<h4>", key: "selectedTextProperties" },
    { line: 803, element: "<label>", key: "color" },
    { line: 804, element: "<label>", key: "size" },
    { line: 805, element: "<label>", key: "font" },
    { line: 815, element: "<label>", key: "outlineColor" },
    { line: 816, element: "<label>", key: "outlineWidth" },

    // Mode
    { line: 825, element: "<span>", key: "autoCreateMode" },

    // Letter & Image Selection
    { line: 835, element: "<p>", key: "selectLettersExactly11" },
    { line: 841, element: "<label>", key: "imageTheme" },
    { line: 854, element: "<label>", key: "selectImagesToUpload" },
    { line: 856, element: "<label>", key: "yourUploadedImagesThisSession" },

    // Assignments & Configuration
    { line: 867, element: "<h4>", key: "assignedImages" },
    { line: 872, element: "<label>", key: "numberOfClues" },
    { line: 876, element: "<span>", key: "includeNameDateFields" },

    // Toolbar buttons
    { line: 896, element: "<button>", key: "bringForward" },
    { line: 897, element: "<button>", key: "sendBackward" },
    { line: 905, element: "<p>", key: "alignSelected" },
    { line: 917, element: "<p>", key: "alignToPage" },

    // Action buttons
    { line: 931, element: "<span>", key: "generate" },
    { line: 933, element: "<button>", key: "generateWorksheet" },
    { line: 934, element: "<button>", key: "generateAnswerKey" },
    { line: 938, element: "<span>", key: "download" },
    { line: 940, element: "<button>", key: "worksheetJpeg" },
    { line: 941, element: "<button>", key: "answerKeyJpeg" },
    { line: 942, element: "<button>", key: "worksheetPdf" },
    { line: 943, element: "<button>", key: "answerKeyPdf" },
    { line: 946, element: "<span>", key: "grayscale", note: "CRITICAL - User mentioned" },
    { line: 950, element: "<button>", key: "clearAll" },
    { line: 954, element: "<button>", key: "worksheet" },
    { line: 955, element: "<button>", key: "answerKey" }
  ],
  "Total missing attributes": 113
};

// ==========================================
// CRITICAL DIFFERENCES FROM OTHER APPS
// ==========================================
const ALPHABET_TRAIN_SPECIFIC_NOTES = {
  "attribute_coverage": "Only 2 elements have data-translate (1.2% coverage!)",
  "train_terminology": "Uses train-specific terms (train template, assigned images)",
  "auto_create_mode": "Has unique Auto Create mode for random letter/image generation",
  "letter_selection": "Requires exactly 11 letters to be selected",
  "dynamic_counter": "Letter count (0/11) needs dynamic updating",
  "clue_configuration": "Number of clues (3-11) is configurable",
  "browser_controlled": "File input shows browser-controlled text",
  "worksheet_types": "Generates both worksheet and answer key with train cars"
};

// ==========================================
// IMPLEMENTATION CHECKLIST
// ==========================================
const IMPLEMENTATION_CHECKLIST = {
  "1_add_attributes": {
    task: "Add ALL 113 missing data-translate attributes to HTML",
    priority: "CRITICAL",
    notes: "Alphabet Train has almost no translation attributes!"
  },
  "2_add_translation_functions": {
    task: "Add t() and formatTranslation() functions",
    location: "After currentLocale is set"
  },
  "3_replace_javascript_text": {
    task: "Replace 52 hardcoded JavaScript strings with t() calls",
    examples: [
      "showMessage('Text added.', 'success') → showMessage(t('textAdded'), 'success')",
      "showMessage(`Assigned \"${word}\" to ${letter}.`) → showMessage(formatTranslation(t('assignedImageToLetter'), word, letter))"
    ]
  },
  "4_handle_dynamic_elements": {
    task: "Handle dynamic elements",
    items: [
      "Letter count (Selected: X/11)",
      "Name/Date fields on worksheet",
      "Watermark text"
    ]
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
      "Letter counter updates correctly",
      "Auto Create mode messages work",
      "File input shows translated labels",
      "No English text visible"
    ]
  }
};

// ==========================================
// EXPORT STRUCTURE
// ==========================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ALPHABET_TRAIN_TRANSLATIONS,
    alphabetTrainTranslationHelpers,
    REQUIRED_HTML_CHANGES,
    ALPHABET_TRAIN_SPECIFIC_NOTES,
    IMPLEMENTATION_CHECKLIST
  };
}

// ==========================================
// USAGE INSTRUCTIONS
// ==========================================
/*
CRITICAL: The Alphabet Train app needs EXTENSIVE work!

1. ADD ALL MISSING ATTRIBUTES (113 elements - 98.8% missing!)
   - Almost every HTML element lacks data-translate
   - Use REQUIRED_HTML_CHANGES list as guide
   - Pay special attention to user-mentioned items (Background, Border, Grayscale)

2. ADD TRANSLATION FUNCTIONS
   - Copy initTranslationFunction() code
   - Add after currentLocale is set
   - Include updateLetterCount() helper

3. REPLACE JAVASCRIPT TEXT (52 locations)
   - All showMessage() calls
   - Dictionary placeholder messages
   - Dynamic status messages

4. HANDLE DYNAMIC ELEMENTS
   - Letter selection counter (0/11)
   - Name/Date fields on worksheet
   - Watermark text

5. CREATE FILE INPUT WRAPPER
   - Browser file input needs custom handling
   - See wordsearch/addition examples

6. TEST COMPLETELY
   - This app has 120+ unique keys to translate
   - Test Auto Create mode
   - Test Manual mode
   - Verify letter counter updates
   - Check train-specific features

PRIORITY ORDER:
1. User-mentioned items (Background, Border, Grayscale)
2. HTML attributes (foundation)
3. JavaScript messages (user feedback)
4. Dynamic elements (counters, fields)
5. File input (upload feature)

ESTIMATED IMPLEMENTATION TIME: 3-4 hours
(Most extensive work needed - only 1.2% coverage currently!)

TRAIN-SPECIFIC CONSIDERATIONS:
- Auto Create mode has unique messages
- Letter selection must be exactly 11
- Train template is a special feature
- Answer key generation is train-specific
*/