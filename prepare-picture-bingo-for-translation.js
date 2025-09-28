/**
 * PREPARE PICTURE BINGO FOR TRANSLATION (PBTM)
 * Documentation of all changes needed for complete translation implementation
 * Generated: December 2024
 *
 * CRITICAL: This app has 0% translation coverage - EVERY element needs updating
 * Total Changes Required: 112 HTML elements + 29 JavaScript messages
 */

const PICTURE_BINGO_PREPARATION = {
  appFile: 'frontend/public/worksheet-generators/bingo.html',
  currentCoverage: '0%',
  targetCoverage: '100%',
  totalKeys: 141,
  existingTranslations: 0,

  /**
   * CRITICAL USER-MENTIONED ITEMS
   * These MUST be translated as top priority
   */
  criticalItems: [
    {
      line: 207,
      current: '<h4>Background</h4>',
      change: '<h4 data-translate="background">Background</h4>',
      priority: '🔴 CRITICAL - User specifically mentioned'
    },
    {
      line: 216,
      current: '<h4>Border</h4>',
      change: '<h4 data-translate="border">Border</h4>',
      priority: '🔴 CRITICAL - User specifically mentioned'
    },
    {
      line: 360,
      current: 'Grayscale',
      change: '<span data-translate="grayscale">Grayscale</span>',
      priority: '🔴 CRITICAL - User specifically mentioned'
    }
  ],

  /**
   * HTML CHANGES NEEDED - ALL 112 Elements
   */
  htmlChanges: {
    // Panel Headers
    headers: [
      { line: 164, add: 'data-translate="worksheetSettings"', text: "Worksheet Settings" },
      { line: 367, add: 'data-translate="cardsAndChips"', text: "Cards + Chips" },
      { line: 368, add: 'data-translate="callouts"', text: "Call-outs" }
    ],

    // Language Section
    languageSection: [
      { line: 168, add: 'data-translate="language"', text: "Language:" }
    ],

    // Accordion Headers (ALL need data-translate)
    accordionHeaders: [
      { line: 186, add: 'data-translate="pageSetup"', text: "Page Setup" },
      { line: 230, add: 'data-translate="textTools"', text: "Text Tools" },
      { line: 254, add: 'data-translate="bingoCardSettings"', text: "Bingo Card Settings" },
      { line: 279, add: 'data-translate="imageLibrary"', text: "Image Library" },
      { line: 294, add: 'data-translate="uploadCustomImages"', text: "Upload Custom Images" }
    ],

    // Page Setup Section (Lines 186-226)
    pageSetup: [
      { line: 188, add: 'data-translate="pageSize"', text: "Page Size:" },
      { line: 198, add: 'data-translate="widthPx"', text: "Width (px):" },
      { line: 200, add: 'data-translate="heightPx"', text: "Height (px):" },
      { line: 203, add: 'data-translate="pageColor"', text: "Page Color:" },
      { line: 205, add: 'data-translate="applySize"', text: "Apply Size" }
    ],

    // Background Section (Lines 207-214)
    backgroundSection: [
      { line: 207, add: 'data-translate="background"', text: "Background" }, // CRITICAL
      { line: 208, add: 'data-translate="backgroundTheme"', text: "Background Theme:" },
      { line: 210, add: 'data-translate="none"', text: "None" },
      { line: 212, add: 'data-translate="selectBackgroundTheme"', text: "Select a theme for backgrounds." },
      { line: 213, add: 'data-translate="backgroundOpacity"', text: "Background Opacity:" }
    ],

    // Border Section (Lines 216-225)
    borderSection: [
      { line: 216, add: 'data-translate="border"', text: "Border" }, // CRITICAL
      { line: 217, add: 'data-translate="borderTheme"', text: "Border Theme:" },
      { line: 219, add: 'data-translate="none"', text: "None" },
      { line: 222, add: 'data-translate="selectBorderTheme"', text: "Select a theme to see borders." },
      { line: 224, add: 'data-translate="borderOpacity"', text: "Border Opacity:" }
    ],

    // Text Tools Section (Lines 230-250)
    textTools: [
      { line: 232, add: 'data-translate="addNewText"', text: "Add New Text" },
      { line: 233, add: 'data-translate="content"', text: "Content:" },
      { line: 233, placeholder: 'data-translate="helloPlaceholder"', text: "Hello!" },
      { line: 234, add: 'data-translate="addText"', text: "Add Text" },
      { line: 235, add: 'data-translate="selectedTextProperties"', text: "Selected Text Properties" },
      { line: 236, add: 'data-translate="color"', text: "Color:" },
      { line: 237, add: 'data-translate="size"', text: "Size:" },
      { line: 238, add: 'data-translate="font"', text: "Font:" },
      { line: 248, add: 'data-translate="outlineColor"', text: "Outline Color:" },
      { line: 249, add: 'data-translate="outlineWidth"', text: "Outline (0-10):" }
    ],

    // Bingo Card Settings (Lines 254-275)
    bingoSettings: [
      { line: 256, add: 'data-translate="bingoRows"', text: "Rows (3–5):" },
      { line: 258, add: 'data-translate="bingoColumns"', text: "Columns (3–5):" },
      { line: 260, add: 'data-translate="numberOfCards"', text: "Number of Cards (1–10):" },
      { line: 262, add: 'data-translate="cardCellFill"', text: "Card Cell Fill:" },
      { line: 264, add: 'data-translate="image"', text: "Image" },
      { line: 265, add: 'data-translate="word"', text: "Word" },
      { line: 267, add: 'data-translate="chipFill"', text: "Chip Fill:" },
      { line: 269, add: 'data-translate="image"', text: "Image" },
      { line: 270, add: 'data-translate="word"', text: "Word" },
      { line: 273, add: 'data-translate="useCustomSelection"', text: "Use custom selection (below)" }
    ],

    // Image Library Section (Lines 279-290)
    imageLibrary: [
      { line: 281, add: 'data-translate="selectTheme"', text: "Select Theme:" },
      { line: 283, add: 'data-translate="searchImages"', text: "Search Images:" },
      { line: 284, placeholder: 'data-translate="searchPlaceholder"', text: "e.g., apple, car" },
      { line: 285, add: 'data-translate="selectedForCustomCallouts"', text: "Selected for custom call-outs: {count}" },
      { line: 286, add: 'data-translate="availableImagesCallouts"', text: "Available Images (Click to select for custom call-outs):" },
      { line: 287, add: 'data-translate="loadingImages"', text: "Loading images..." },
      { line: 288, add: 'data-translate="selectedCustomImages"', text: "Selected Custom Images:" }
    ],

    // Upload Section (Lines 294-302)
    uploadSection: [
      { line: 296, add: 'data-translate="selectImagesToUpload"', text: "Select image(s) to upload:" },
      { line: 298, add: 'data-translate="yourUploadedImages"', text: "Your Uploaded Images (This Session):" },
      { line: 300, add: 'data-translate="uploadedImagesWillAppear"', text: "Your uploaded images will appear here." }
    ],

    // Action Buttons (Lines 351-364)
    actionButtons: [
      { line: 351, add: 'data-translate="generate"', text: "Generate" },
      { line: 353, add: 'data-translate="download"', text: "Download" },
      { line: 355, add: 'data-translate="worksheetJpeg"', text: "Worksheet (JPEG)" },
      { line: 356, add: 'data-translate="calloutJpeg"', text: "Call-out (JPEG)" },
      { line: 357, add: 'data-translate="worksheetPdf"', text: "Worksheet (PDF)" },
      { line: 358, add: 'data-translate="calloutPdf"', text: "Call-out (PDF)" },
      { line: 360, add: 'data-translate="grayscale"', text: "Grayscale" }, // CRITICAL
      { line: 364, add: 'data-translate="clearAll"', text: "Clear All" }
    ],

    // Toolbar Elements (Lines 313-348)
    toolbarElements: [
      { line: 315, add: 'title data-translate="layers"', text: "Layers" },
      { line: 317, add: 'data-translate="bringForward"', text: "Bring Forward" },
      { line: 318, add: 'data-translate="sendBackward"', text: "Send Backward" },
      { line: 324, add: 'title data-translate="align"', text: "Align" },
      { line: 326, add: 'data-translate="alignSelected"', text: "Align Selected:" },
      { line: 338, add: 'data-translate="alignToPage"', text: "Align to Page:" },
      { line: 347, add: 'title data-translate="deleteSelected"', text: "Delete Selected" }
    ]
  },

  /**
   * JAVASCRIPT CHANGES - 29 Hardcoded Messages
   */
  javascriptChanges: {
    // Success Messages
    successMessages: [
      { line: 1444, current: '"Bingo worksheet generated!"', change: "t('bingoWorksheetGenerated')" },
      { line: 1510, current: "'Download Initiated!'", change: "t('downloadInitiated')" },
      { line: 1573, current: "'ZIP Download Initiated!'", change: "t('zipDownloadInitiated')" },
      { line: 1645, current: "'PDF Downloaded!'", change: "t('pdfDownloaded')" },
      { line: 1683, current: '"Form cleared."', change: "t('formCleared')" },
      { line: 1721, current: 'custom images available', change: "formatTranslation(t('customImagesAvailable'), {count: uploadedImages.length})" },
      { line: 1922, current: "'PDF downloaded!'", change: "t('pdfDownloaded')" },
      { line: 1956, current: "'JPEG download initiated!'", change: "t('jpegDownloadInitiated')" }
    ],

    // Error Messages
    errorMessages: [
      { line: 1101, current: 'Need images for call-out', change: "formatTranslation(t('needMoreImagesForCallout'), {required: requiredCount, selected: imagePool.length})" },
      { line: 1116, current: 'Not enough images in library', change: "formatTranslation(t('notEnoughImagesInLibrary'), {available: themeImages.length, required: requiredCount})" },
      { line: 1424, current: 'Could not generate cards', change: "formatTranslation(t('couldNotGenerateCards'), {count: cardCount})" },
      { line: 1507, current: '"Canvas is empty."', change: "t('canvasIsEmpty')" },
      { line: 1511, current: 'Error preparing JPEG', change: "formatTranslation(t('errorPreparingJpeg'), {error: error.message})" },
      { line: 1522, current: '"No card data available."', change: "t('noCardDataAvailable')" },
      { line: 1575, current: 'Error creating ZIP', change: "formatTranslation(t('errorCreatingZip'), {error: error.message})" },
      { line: 1593, current: '"No card data available."', change: "t('noCardDataAvailable')" },
      { line: 1648, current: 'Error creating PDF', change: "formatTranslation(t('errorCreatingPdf'), {error: error.message})" },
      { line: 1724, current: 'Error reading file', change: "formatTranslation(t('errorReadingFile'), {filename: file.name})" },
      { line: 1763, current: 'Generation failed', change: "formatTranslation(t('generationFailed'), {error: e.message})" },
      { line: 1897, current: "'Please generate content first.'", change: "t('pleaseGenerateContentFirst')" },
      { line: 1924, current: "'Error creating PDF.'", change: "t('errorCreatingPdf')" },
      { line: 1938, current: "'Please generate a worksheet first.'", change: "t('pleaseGenerateWorksheetFirst')" },
      { line: 1958, current: "'Error preparing JPEG.'", change: "t('errorPreparingJpeg')" }
    ],

    // Info/Status Messages
    infoMessages: [
      { line: 1503, current: '`Preparing ${filename}...`', change: "formatTranslation(t('preparingFile'), {filename})" },
      { line: 1516, current: "'Preparing ZIP file...'", change: "t('preparingZipFile')" },
      { line: 1582, current: '`Preparing ${filename}...`', change: "formatTranslation(t('preparingFile'), {filename})" },
      { line: 1709, current: 'Loading images', change: "formatTranslation(t('loadingImagesCount'), {count: filesToLoad})" },
      { line: 1899, current: "'Preparing PDF...'", change: "t('preparingPdf')" },
      { line: 1940, current: "'Preparing JPEG...'", change: "t('preparingJpeg')" }
    ],

    // Watermark Text
    watermarkText: [
      { line: 1838, current: "'FREE VERSION - LessonCraftStudio.com'", change: "t('watermarkText')" },
      { line: 1857, current: "'FREE VERSION'", change: "t('watermarkSmallText')" }
    ]
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

    bingoTerminology: {
      description: "Bingo-specific terms need careful translation",
      terms: [
        "Cards + Chips",
        "Call-outs",
        "Card Cell Fill",
        "Chip Fill"
      ]
    },

    customSelectionCounter: {
      description: "Dynamic counter for selected images",
      solution: "Use formatTranslation with count parameter",
      example: "formatTranslation(t('selectedForCustomCallouts'), {count: selectedCount})"
    },

    multiFileDownload: {
      description: "ZIP file generation for multiple cards",
      solution: "Translate ZIP-related messages",
      keys: ["zipDownloadInitiated", "preparingZipFile", "errorCreatingZip"]
    }
  },

  /**
   * VALIDATION STEPS
   */
  validationSteps: [
    "1. Verify all 112 HTML elements have data-translate attributes",
    "2. Confirm all 29 JavaScript messages use t() function",
    "3. Test with ?locale=de to verify German translations",
    "4. Check console for any untranslated text warnings",
    "5. Test bingo card generation with different settings",
    "6. Verify call-out list generation",
    "7. Test ZIP file download for multiple cards",
    "8. Check error scenarios to see translated error messages",
    "9. Verify watermark text appears translated",
    "10. Test custom image selection counter updates"
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
      "Translate bingo card settings"
    ],
    phase3: [
      "Add data-translate to all remaining HTML elements",
      "Replace hardcoded JavaScript messages with t() calls",
      "Update custom selection counter"
    ],
    phase4: [
      "Implement file input wrapper",
      "Update multi-file download messages",
      "Fix all dynamic counters and messages"
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
  module.exports = PICTURE_BINGO_PREPARATION;
}

// Log summary
console.log('PICTURE BINGO TRANSLATION PREPARATION SUMMARY');
console.log('==============================================');
console.log(`Current Coverage: ${PICTURE_BINGO_PREPARATION.currentCoverage}`);
console.log(`Target Coverage: ${PICTURE_BINGO_PREPARATION.targetCoverage}`);
console.log(`Total Keys: ${PICTURE_BINGO_PREPARATION.totalKeys}`);
console.log(`HTML Changes Needed: 112 elements`);
console.log(`JavaScript Changes Needed: 29 messages`);
console.log(`Critical Items: 3 (Background, Border, Grayscale)`);
console.log('');
console.log('CRITICAL: This app has ZERO translation infrastructure!');
console.log('Every single UI element needs data-translate attributes added.');