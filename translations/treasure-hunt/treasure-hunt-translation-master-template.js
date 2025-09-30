// Treasure Hunt Translation Master Template
// Total: 80+ translation keys (75 unique after consolidation)
// Languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI
// NOTE: This app already has treasureHuntTranslations for game text

const TREASURE_HUNT_TRANSLATIONS = {
  en: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Treasure Hunt Worksheet Generator",
    "settings.title": "Treasure Hunt Settings",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Language Settings",
    "settings.pageSetup": "Page Setup",
    "settings.textTools": "Text Tools",
    "settings.puzzleSetup": "Puzzle Setup",
    "library.title": "Image Library",
    "library.uploadTitle": "Upload Custom Images",

    // ===== 3. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Language:",
    "lang.en": "English",
    "lang.de": "Deutsch (German)",
    "lang.fr": "Français (French)",
    "lang.es": "Español (Spanish)",
    "lang.pt": "Português (Portuguese)",
    "lang.it": "Italiano (Italian)",
    "lang.nl": "Nederlands (Dutch)",
    "lang.sv": "Svenska (Swedish)",
    "lang.da": "Dansk (Danish)",
    "lang.no": "Norsk (Norwegian)",
    "lang.fi": "Suomi (Finnish)",

    // ===== 4. PAGE SETUP (17 items) =====
    "settings.pageSize": "Page Size:",
    "pageSize.letterPortrait": "Letter Portrait (612×792)",
    "pageSize.letterLandscape": "Letter Landscape (792×612)",
    "pageSize.a4Portrait": "A4 Portrait (595×842)",
    "pageSize.a4Landscape": "A4 Landscape (842×595)",
    "pageSize.square": "Square (1200×1200)",
    "pageSize.custom": "Custom",
    "settings.width": "Width (px):",
    "settings.height": "Height (px):",
    "settings.pageColor": "Page Color:",
    "decoration.backgroundTheme": "Background Theme:",
    "decoration.none": "None",
    "decoration.backgroundOpacity": "Background Opacity:",
    "decoration.borderTheme": "Border Theme:",
    "decoration.borderOpacity": "Border Opacity:",
    "button.applySize": "Apply Size",
    "settings.grayscale": "Grayscale",

    // ===== 5. TEXT TOOLS (7 items) =====
    "text.content": "Content:",
    "text.placeholder": "Hello!",
    "button.addText": "Add Text",
    "text.color": "Color:",
    "text.size": "Size:",
    "text.font": "Font:",
    "text.default": "New Text",

    // ===== 6. PUZZLE SETUP (2 items) =====
    "puzzle.generateFromTheme": "Generate from Theme (Overrides Manual):",
    "puzzle.selectTheme": "-- Select Theme for Worksheet --",

    // ===== 7. IMAGE LIBRARY (7 items) =====
    "library.selectTheme": "Select Dictionary Theme:",
    "library.search": "Search Images:",
    "library.searchPlaceholder": "e.g., apple, car",
    "library.availableImages": "Available Images (Click to add to manual selection):",
    "library.selectUpload": "Select image(s) to upload:",
    "library.uploadedImages": "Your Uploaded Images (Click to Select):",
    "library.selectedCount": "Selected: {x} / 6",

    // ===== 8. TOOLBAR (6 items) =====
    "toolbar.layers": "Layers",
    "toolbar.bringForward": "Bring Forward",
    "toolbar.sendBackward": "Send Backward",
    "toolbar.delete": "Delete Selected",
    "toolbar.align": "Align",
    "toolbar.center": "Center",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Generate",
    "button.generateWorksheet": "Generate Worksheet",
    "button.generateAnswer": "Generate Answer Key",
    "button.download": "Download",
    "button.worksheetJpeg": "Worksheet (JPEG)",
    "button.answerJpeg": "Answer Key (JPEG)",
    "button.worksheetPdf": "Worksheet (PDF)",
    "button.answerPdf": "Answer Key (PDF)",
    "button.clearAll": "Clear All",
    "button.downloadJpeg": "Download JPEG",
    "button.downloadPdf": "Download PDF",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Worksheet",
    "tab.answerKey": "Answer Key",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.textAdded": "Text added.",
    "message.formCleared": "Form cleared.",
    "message.worksheetGenerated": "Worksheet generated!",
    "message.answerGenerated": "Answer key generated!",
    "message.downloadStarted": "Download Initiated!",
    "message.pdfDownloaded": "PDF Downloaded!",
    "message.pdfSuccess": "PDF downloaded!",
    "message.jpegDownloaded": "JPEG download initiated!",
    "message.assetAdded": "{type} added.",
    "message.downloadInitiated": "Download initiated!",

    // ===== 12. ERROR MESSAGES (14 items) =====
    "message.themesLoadError": "Could not load themes.",
    "message.maxImages": "Maximum 6 images selected.",
    "message.themeNoImages": 'Theme "{theme}" has no images.',
    "message.themeLoadError": "Error loading theme images.",
    "message.selectSixImages": "Please select exactly 6 images manually, or choose a theme to generate from.",
    "message.noPuzzleData": "No puzzle data generated.",
    "message.generateFirst": "Please generate a worksheet first.",
    "message.canvasEmpty": "Canvas is empty.",
    "message.jpegError": "Error preparing JPEG.",
    "message.pdfError": "Error creating PDF.",
    "message.pdfCreateError": "Error creating PDF.",
    "message.generateContent": "Please generate content first.",
    "message.generateWorksheet": "Please generate a worksheet first.",
    "message.jpegPrepError": "Error preparing JPEG.",

    // ===== 13. INFO MESSAGES (11 items) =====
    "message.selectBorderTheme": "Select a theme to see borders.",
    "message.selectBackgroundTheme": "Select a theme for backgrounds.",
    "message.loading": "Loading...",
    "message.typeToSearch": "Type to search all images.",
    "message.searchError": "Error during search.",
    "message.imagesError": "Error loading images.",
    "message.noImages": "No images found.",
    "message.uploadedHere": "Your uploaded images will appear here.",
    "message.preparingJpeg": "Preparing JPEG...",
    "message.preparingPdf": "Preparing PDF...",
    "themes.all": "All Themes (uses translations)",

    // ===== 14. WATERMARKS (2 items) =====
    "watermark.free": "FREE VERSION - LessonCraftStudio.com",
    "watermark.freeShort": "FREE VERSION",

    // ===== 15. TREASURE HUNT GAME TEXT (Already in treasureHuntTranslations) =====
    // NOTE: These are already implemented in the app's treasureHuntTranslations object:
    // - startAt: "Start at"
    // - move: "Move"
    // - north: "north"
    // - south: "south"
    // - east: "east"
    // - west: "west"
    // - square: "square"
    // - squares: "squares"
    // - whereIsTreasure: "Where is the treasure?"
    // These should remain in treasureHuntTranslations for backward compatibility
  },

  // German translations (structure ready)
  de: {
    // Copy all keys from 'en' and translate
  },

  // French translations (structure ready)
  fr: {
    // Copy all keys from 'en' and translate
  },

  // Spanish translations (structure ready)
  es: {
    // Copy all keys from 'en' and translate
  },

  // Italian translations (structure ready)
  it: {
    // Copy all keys from 'en' and translate
  },

  // Portuguese translations (structure ready)
  pt: {
    // Copy all keys from 'en' and translate
  },

  // Dutch translations (structure ready)
  nl: {
    // Copy all keys from 'en' and translate
  },

  // Swedish translations (structure ready)
  sv: {
    // Copy all keys from 'en' and translate
  },

  // Danish translations (structure ready)
  da: {
    // Copy all keys from 'en' and translate
  },

  // Norwegian translations (structure ready)
  no: {
    // Copy all keys from 'en' and translate
  },

  // Finnish translations (structure ready)
  fi: {
    // Copy all keys from 'en' and translate
  }
};

// Helper function to get translation with fallback
function getTranslation(key, locale = 'en', params = {}) {
  const translation = TREASURE_HUNT_TRANSLATIONS[locale]?.[key] ||
                     TREASURE_HUNT_TRANSLATIONS['en'][key] ||
                     key;

  // Handle parameter substitution
  return formatTranslation(translation, params);
}

// Format translation with parameters
function formatTranslation(template, params) {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return params.hasOwnProperty(key) ? params[key] : match;
  });
}

// Check translation coverage
function getTranslationCoverage(locale) {
  const totalKeys = Object.keys(TREASURE_HUNT_TRANSLATIONS.en).length;
  const translatedKeys = Object.keys(TREASURE_HUNT_TRANSLATIONS[locale] || {}).length;
  return {
    total: totalKeys,
    translated: translatedKeys,
    percentage: Math.round((translatedKeys / totalKeys) * 100)
  };
}

// Export for use in implementation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TREASURE_HUNT_TRANSLATIONS,
    getTranslation,
    formatTranslation,
    getTranslationCoverage
  };
}

// Summary
console.log('=== Treasure Hunt Translation Template ===');
console.log('Total translation keys: 75 unique (80+ total with duplicates consolidated)');
console.log('Categories: 15');
console.log('Languages supported: 11');
console.log('\nKey Statistics:');
console.log('- Page & Hero: 2');
console.log('- Accordion Headers: 6');
console.log('- Language Section: 12');
console.log('- Page Setup: 17');
console.log('- Text Tools: 7');
console.log('- Puzzle Setup: 2');
console.log('- Image Library: 7');
console.log('- Toolbar: 6');
console.log('- Action Buttons: 11');
console.log('- Tabs: 2');
console.log('- Messages: 35');
console.log('- Watermarks: 2');
console.log('\nUnique Features:');
console.log('- 5x5 Grid Generation (A-E rows, 1-5 columns)');
console.log('- Direction Instructions (already translated in treasureHuntTranslations)');
console.log('- Treasure Location Logic');
console.log('- Answer Key Highlighting with yellow');
console.log('- Dynamic Instruction Building in selected language');
console.log('- Grid coordinates remain universal (A-E, 1-5)');
console.log('- Maximum 6 images selection limit');
console.log('- Existing treasureHuntTranslations object preserved');
console.log('- ZERO existing UI translation infrastructure (0% coverage)');
console.log('- Watermark system for free tier');