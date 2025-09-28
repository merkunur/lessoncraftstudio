/**
 * PREPARE DRAWING LINES FOR TRANSLATION (DLTM)
 * Documentation of all changes needed for complete translation implementation
 * Generated: December 2024
 *
 * CRITICAL: This app has 0% translation coverage - EVERY element needs updating
 * Total Changes Required: 126 HTML elements + 36 JavaScript messages
 */

const DRAWING_LINES_PREPARATION = {
  appFile: 'frontend/public/worksheet-generators/drawing lines.html',
  currentCoverage: '0%',
  targetCoverage: '100%',
  totalKeys: 162,
  existingTranslations: 0,

  /**
   * CRITICAL USER-MENTIONED ITEMS
   * These MUST be translated as top priority
   */
  criticalItems: [
    {
      line: 401,
      current: '<h4>Background</h4>',
      change: '<h4 data-translate="background">Background</h4>',
      priority: '🔴 CRITICAL - User specifically mentioned'
    },
    {
      line: 390,
      current: '<h4>Border</h4>',
      change: '<h4 data-translate="border">Border</h4>',
      priority: '🔴 CRITICAL - User specifically mentioned'
    },
    {
      line: 532,
      current: 'Grayscale',
      change: '<span data-translate="grayscale">Grayscale</span>',
      priority: '🔴 CRITICAL - User specifically mentioned'
    }
  ],

  /**
   * HTML CHANGES NEEDED - ALL 126 Elements
   */
  htmlChanges: {
    // Panel Headers
    headers: [
      { line: 343, add: 'data-translate="settings"', text: "Settings" },
      { line: 540, add: 'data-translate="worksheet"', text: "Worksheet" }
    ],

    // Language Section
    languageSection: [
      { line: 347, add: 'data-translate="language"', text: "Language:" }
    ],

    // Accordion Headers (ALL need data-translate)
    accordionHeaders: [
      { line: 365, add: 'data-translate="pageSetup"', text: "Page Setup" },
      { line: 415, add: 'data-translate="textTools"', text: "Text Tools" },
      { line: 439, add: 'data-translate="templateAndImages"', text: "Template & Images" },
      { line: 454, add: 'data-translate="imageLibrary"', text: "Image Library" },
      { line: 467, add: 'data-translate="uploadCustomImages"', text: "Upload Custom Images" }
    ],

    // Page Setup Section (Lines 365-411)
    pageSetup: [
      { line: 367, add: 'data-translate="pageSize"', text: "Page Size:" },
      { line: 377, add: 'data-translate="widthPx"', text: "Width (px):" },
      { line: 379, add: 'data-translate="heightPx"', text: "Height (px):" },
      { line: 382, add: 'data-translate="pageColor"', text: "Page Color:" },
      { line: 384, add: 'data-translate="applySize"', text: "Apply Size" },
      { line: 385, add: 'data-translate="options"', text: "Options" },
      { line: 387, add: 'data-translate="includeNameDateFields"', text: "Include Name/Date Fields" }
    ],

    // Border Section (Lines 390-399)
    borderSection: [
      { line: 390, add: 'data-translate="border"', text: "Border" }, // CRITICAL
      { line: 391, add: 'data-translate="borderTheme"', text: "Border Theme:" },
      { line: 393, add: 'data-translate="none"', text: "None" },
      { line: 395, add: 'data-translate="borderOpacity"', text: "Border Opacity:" },
      { line: 398, add: 'data-translate="selectBorderTheme"', text: "Select a theme to see borders." }
    ],

    // Background Section (Lines 401-410)
    backgroundSection: [
      { line: 401, add: 'data-translate="background"', text: "Background" }, // CRITICAL
      { line: 402, add: 'data-translate="backgroundTheme"', text: "Background Theme:" },
      { line: 404, add: 'data-translate="none"', text: "None" },
      { line: 406, add: 'data-translate="backgroundOpacity"', text: "Background Opacity:" },
      { line: 409, add: 'data-translate="selectBackgroundTheme"', text: "Select a theme to see backgrounds." }
    ],

    // Text Tools Section (Lines 415-435)
    textTools: [
      { line: 417, add: 'data-translate="addNewText"', text: "Add New Text" },
      { line: 418, add: 'data-translate="content"', text: "Content:" },
      { line: 418, placeholder: 'data-translate="helloPlaceholder"', text: "Hello!" },
      { line: 419, add: 'data-translate="addText"', text: "Add Text" },
      { line: 420, add: 'data-translate="selectedTextProperties"', text: "Selected Text Properties" },
      { line: 421, add: 'data-translate="color"', text: "Color:" },
      { line: 422, add: 'data-translate="size"', text: "Size:" },
      { line: 423, add: 'data-translate="font"', text: "Font:" },
      { line: 433, add: 'data-translate="outlineColor"', text: "Outline Color:" },
      { line: 434, add: 'data-translate="outlineWidth"', text: "Outline (0-10):" }
    ],

    // Template & Images Section (Lines 439-450)
    templateImages: [
      { line: 441, add: 'data-translate="selectDrawingTemplate"', text: "1. Select Drawing Template" },
      { line: 445, add: 'data-translate="assignImagePairs"', text: "2. Assign Image Pairs" },
      { line: 447, add: 'data-translate="autoFillImages"', text: "Auto-fill images from selected theme" }
    ],

    // Image Library Section (Lines 454-463)
    imageLibrary: [
      { line: 456, add: 'data-translate="imageTheme"', text: "Image Theme:" },
      { line: 458, add: 'data-translate="searchImages"', text: "Search Images:" },
      { line: 459, placeholder: 'data-translate="searchPlaceholder"', text: "e.g., apple, car" },
      { line: 461, add: 'data-translate="loadingThemes"', text: "Loading themes..." }
    ],

    // Upload Section (Lines 467-474)
    uploadSection: [
      { line: 469, add: 'data-translate="selectImagesToUpload"', text: "Select image(s) to upload:" },
      { line: 471, add: 'data-translate="yourUploadedImages"', text: "Your Uploaded Images (This Session):" },
      { line: 473, add: 'data-translate="uploadedImagesWillAppear"', text: "Your uploaded images will appear here." }
    ],

    // Action Buttons (Lines 525-536)
    actionButtons: [
      { line: 525, add: 'data-translate="generate"', text: "Generate" },
      { line: 527, add: 'data-translate="download"', text: "Download" },
      { line: 529, add: 'data-translate="downloadAsJpeg"', text: "Download as JPEG" },
      { line: 530, add: 'data-translate="downloadAsPdf"', text: "Download as PDF" },
      { line: 532, add: 'data-translate="grayscale"', text: "Grayscale" }, // CRITICAL
      { line: 536, add: 'data-translate="clearAll"', text: "Clear All" }
    ],

    // Toolbar Elements (Lines 489-521)
    toolbarElements: [
      { line: 489, add: 'title data-translate="layers"', text: "Layers" },
      { line: 491, add: 'data-translate="bringForward"', text: "Bring Forward" },
      { line: 492, add: 'data-translate="sendBackward"', text: "Send Backward" },
      { line: 498, add: 'title data-translate="align"', text: "Align" },
      { line: 500, add: 'data-translate="alignSelected"', text: "Align Selected:" },
      { line: 512, add: 'data-translate="alignToPage"', text: "Align to Page:" },
      { line: 521, add: 'title data-translate="deleteSelected"', text: "Delete Selected" }
    ]
  },

  /**
   * JAVASCRIPT CHANGES - 36 Hardcoded Messages
   */
  javascriptChanges: {
    // Error Messages
    errorMessages: [
      { line: 925, current: '"Could not load image themes."', change: "t('couldNotLoadThemes')" },
      { line: 926, current: 'Error loading themes.', change: "t('errorLoadingThemes')" },
      { line: 957, current: 'Error loading images.', change: "t('errorLoadingImages')" },
      { line: 1006, current: "'Could not load border images.'", change: "t('couldNotLoadBorderImages')" },
      { line: 1073, current: "'Could not load background images.'", change: "t('couldNotLoadBackgroundImages')" },
      { line: 1104, current: 'Error reading file', change: "formatTranslation(t('errorReadingFile'), {filename: file.name})" },
      { line: 1259, current: 'Please select a slot first', change: "t('pleaseSelectSlotFirst')" },
      { line: 1274, current: "'Please select a drawing template.'", change: "t('pleaseSelectDrawingTemplate')" },
      { line: 1297, current: "'Cannot auto-fill.'", change: "t('cannotAutoFill')" },
      { line: 1305, current: "'Please fill all image pairs.'", change: "t('pleaseFillAllImagePairs')" },
      { line: 1330, current: "'An error occurred during generation.'", change: "t('errorDuringGeneration')" },
      { line: 1463, current: 'Failed to load overlay image', change: "formatTranslation(t('failedToLoadOverlayImage'), {type: propName === 'isBorder' ? t('border') : t('background')})" },
      { line: 1935, current: "'Grayscale conversion failed.'", change: "t('grayscaleConversionFailed')" },
      { line: 1972, current: "'Please generate a worksheet first.'", change: "t('pleaseGenerateWorksheetFirst')" },
      { line: 1982, current: 'Error preparing JPEG', change: "formatTranslation(t('errorPreparingJpeg'), {error: error.message})" }
    ],

    // Status/Info Messages
    infoMessages: [
      { line: 948, current: 'Loading...', change: "t('loading')" },
      { line: 988, current: 'Select a theme to see borders.', change: "t('selectBorderTheme')" },
      { line: 995, current: '`Loading ${theme} borders...`', change: "formatTranslation(t('loadingBorders'), {theme})" },
      { line: 1005, current: 'Error loading borders.', change: "t('errorLoadingBorders')" },
      { line: 1038, current: 'Select a theme to see backgrounds.', change: "t('selectBackgroundTheme')" },
      { line: 1047, current: '`Loading ${theme} backgrounds...`', change: "formatTranslation(t('loadingBackgrounds'), {theme})" },
      { line: 1055, current: 'No backgrounds in this theme.', change: "t('noBackgroundsInTheme')" },
      { line: 1072, current: 'Error loading backgrounds.', change: "t('errorLoadingBackgrounds')" },
      { line: 1085, current: 'Loading images', change: "formatTranslation(t('loadingImages'), {count: filesToLoad})" },
      { line: 1099, current: 'custom images available', change: "formatTranslation(t('customImagesAvailable'), {count: loadedCount})" },
      { line: 1119, current: 'No borders in this theme.', change: "t('noBordersInTheme')" },
      { line: 1194, current: 'Loading default theme...', change: "t('loadingDefaultTheme')" },
      { line: 1198, current: 'Searching...', change: "t('searching')" },
      { line: 1223, current: 'No images found', change: "query ? formatTranslation(t('noImagesFoundWithQuery'), {query}) : t('noImagesFound')" },
      { line: 1244, current: 'Your uploaded images will appear here.', change: "t('uploadedImagesWillAppear')" },
      { line: 1281, current: "'Auto-filling from all themes...'", change: "t('autoFillingFromAllThemes')" },
      { line: 1973, current: "'Preparing JPEG... Please wait.'", change: "t('preparingJpeg')" }
    ],

    // Success Messages
    successMessages: [
      { line: 1325, current: "'Worksheet generated!'", change: "t('worksheetGenerated')" },
      { line: 1497, current: 'overlay added', change: "formatTranslation(t('overlayAdded'), {type: propName === 'isBorder' ? t('border') : t('background')})" },
      { line: 1551, current: "'Text added to worksheet.'", change: "t('textAddedToWorksheet')" },
      { line: 1851, current: "'Form cleared.'", change: "t('formCleared')" },
      { line: 1981, current: "'JPEG Download Initiated!'", change: "t('jpegDownloadInitiated')" }
    ],

    // Name/Date Field
    nameDateField: [
      { line: 1342, current: '"Name: _________________________ Date: ____________"', change: "t('nameDatePlaceholder')" }
    ],

    // Watermark Text
    watermarkText: [
      { line: 1996, current: "'FREE VERSION - LessonCraftStudio.com'", change: "t('watermarkText')" },
      { line: 2015, current: "'FREE VERSION'", change: "t('watermarkSmallText')" }
    ]
  },

  /**
   * DRAWING TEMPLATE TRANSLATIONS
   * Special handling for template names
   */
  drawingTemplates: {
    location: "Lines 700-800 approximately",
    templates: [
      "curve 1", "curve 2", "curve 3", "curve 4",
      "diagonal 1", "diagonal 2",
      "horizontal 1",
      "vertical 1"
    ],
    solution: "Replace hardcoded template names with translation keys",
    example: `
// Instead of:
templateName = 'curve 1';

// Use:
templateName = t('template_curve1');`
  },

  /**
   * ADD T() FUNCTION DEFINITION
   */
  addTranslationFunction: {
    location: "After currentLocale is set (around line 300)",
    code: `
// Define the global translation function t()
function t(key) {
    if (typeof translations === 'undefined') return key;
    const translation = (translations[currentLocale] && translations[currentLocale][key]) ||
                       (translations.en && translations.en[key]) ||
                       key;
    return translation;
}
window.t = t;

// Helper function for formatted translations
function formatTranslation(text, params) {
    let formatted = text;
    for (const [key, value] of Object.entries(params)) {
        formatted = formatted.replace(new RegExp(\`\\\\{\${key}\\\\}\`, 'g'), value);
    }
    return formatted;
}
window.formatTranslation = formatTranslation;`
  },

  /**
   * SPECIAL HANDLING REQUIRED
   */
  specialHandling: {
    fileInput: {
      description: "Browser-controlled file input needs custom wrapper",
      solution: "Create custom button and text span for translatable UI"
    },

    drawingTemplates: {
      description: "Template names are hardcoded in JavaScript",
      solution: "Use translation keys for template names",
      keys: [
        "template_curve1", "template_curve2", "template_curve3", "template_curve4",
        "template_diagonal1", "template_diagonal2",
        "template_horizontal1", "template_vertical1"
      ]
    },

    imagePairSlots: {
      description: "Dynamic slot assignment interface",
      solution: "Translate slot labels dynamically",
      keys: ["leftSlot", "rightSlot", "slot"]
    },

    templateInfo: {
      description: "Template info display with parameters",
      solution: "Use formatTranslation for template info",
      example: "formatTranslation(t('templateInfo'), {name, pairs, orientation})"
    }
  },

  /**
   * VALIDATION STEPS
   */
  validationSteps: [
    "1. Verify all 126 HTML elements have data-translate attributes",
    "2. Confirm all 36 JavaScript messages use t() function",
    "3. Test with ?locale=de to verify German translations",
    "4. Check console for any untranslated text warnings",
    "5. Test drawing template selection and display",
    "6. Verify image pair assignment shows translated labels",
    "7. Test auto-fill feature messages",
    "8. Check error scenarios to see translated error messages",
    "9. Verify watermark text appears translated",
    "10. Test all toolbar tooltips are translated"
  ],

  /**
   * IMPLEMENTATION PRIORITY
   */
  implementationPriority: {
    phase1: [
      "Add t() and formatTranslation functions",
      "Add data-translate to critical items (Background, Border, Grayscale)",
      "Update main UI elements (headers, buttons)"
    ],
    phase2: [
      "Add data-translate to accordion headers",
      "Update page setup section",
      "Translate border and background sections"
    ],
    phase3: [
      "Add data-translate to all remaining HTML elements",
      "Replace hardcoded JavaScript messages with t() calls",
      "Update drawing template names"
    ],
    phase4: [
      "Implement file input wrapper",
      "Update image pair slot labels",
      "Fix template info display"
    ],
    phase5: [
      "Comprehensive testing",
      "Validation with all locales",
      "Performance optimization"
    ]
  }
};

// Export for use in implementation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DRAWING_LINES_PREPARATION;
}

// Log summary
console.log('DRAWING LINES TRANSLATION PREPARATION SUMMARY');
console.log('==============================================');
console.log(`Current Coverage: ${DRAWING_LINES_PREPARATION.currentCoverage}`);
console.log(`Target Coverage: ${DRAWING_LINES_PREPARATION.targetCoverage}`);
console.log(`Total Keys: ${DRAWING_LINES_PREPARATION.totalKeys}`);
console.log(`HTML Changes Needed: 126 elements`);
console.log(`JavaScript Changes Needed: 36 messages`);
console.log(`Critical Items: 3 (Background, Border, Grayscale)`);
console.log('');
console.log('CRITICAL: This app has ZERO translation infrastructure!');
console.log('Every single UI element needs data-translate attributes added.');