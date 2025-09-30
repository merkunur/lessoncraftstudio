// Word Guess Translation Master Template
// Total: 90+ translation keys
// Languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI
// Current coverage: 0% (no data-translate attributes exist)

const WORD_GUESS_TRANSLATIONS = {
  en: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Image Clue Grid Worksheet",
    "settings.title": "Clue Grid Settings",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Language Settings",
    "settings.pageSetup": "Page Setup",
    "settings.textTools": "Text Tools",
    "settings.exerciseConfig": "Exercise Configuration",
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

    // ===== 4. PAGE SETUP (16 items) =====
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
    "button.applySize": "Apply Size",
    "decoration.backgroundTheme": "Background Theme:",
    "decoration.none": "None",
    "decoration.backgroundOpacity": "Background Opacity:",
    "decoration.borderTheme": "Border Theme:",
    "decoration.borderOpacity": "Border Opacity:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Content:",
    "text.placeholder": "Hello!",
    "button.addText": "Add Text",
    "text.color": "Color:",
    "text.size": "Size:",
    "text.font": "Font:",
    "text.outlineColor": "Outline Color:",
    "text.outlineWidth": "Outline (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Number of Puzzles (1–10):",
    "config.difficulty": "Difficulty (Number of Clues)",
    "difficulty.noClues": "No clues",
    "difficulty.easy": "Easy (1/2)",
    "difficulty.normal": "Normal (1/4)",
    "difficulty.tough": "Tough (1/6)",
    "config.excludeLetters": "Exclude Letters from Clues:",
    "config.excludePlaceholder": "e.g. AEIOU",
    "config.letterCase": "Letter Case",
    "case.uppercase": "Uppercase",
    "case.lowercase": "Lowercase",
    "config.includeNameDate": "Include Name & Date",
    "config.includeExerciseNumbers": "Include Exercise Numbers",

    // ===== 7. IMAGE LIBRARY (8 items) =====
    "library.selectTheme": "Select Theme:",
    "library.search": "Search Images:",
    "library.searchPlaceholder": "e.g., apple, car",
    "library.availableImages": "Available Images:",
    "library.selectedImages": "Selected Images for Puzzles:",
    "library.selectUpload": "Select image(s) to upload:",
    "library.uploadedImages": "Your Uploaded Images (This Session):",
    "library.selectedCount": "Selected: {x} / {y}",

    // ===== 8. TOOLBAR (16 items) =====
    "toolbar.layers": "Layers",
    "toolbar.bringForward": "Bring Forward",
    "toolbar.sendBackward": "Send Backward",
    "toolbar.align": "Align",
    "toolbar.alignLeft": "Align Left",
    "toolbar.centerH": "Center Horizontally",
    "toolbar.alignRight": "Align Right",
    "toolbar.alignTop": "Align Top",
    "toolbar.centerV": "Center Vertically",
    "toolbar.alignBottom": "Align Bottom",
    "toolbar.centerPageH": "Center on Page Horizontally",
    "toolbar.centerPageV": "Center on Page Vertically",
    "toolbar.delete": "Delete Selected",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Generate",
    "button.generateWorksheet": "Generate Worksheet",
    "button.generateAnswer": "Generate Answer Key",
    "button.download": "Download",
    "button.worksheetJpeg": "Worksheet (JPEG)",
    "button.answerJpeg": "Answer Key (JPEG)",
    "button.worksheetPdf": "Worksheet (PDF)",
    "button.answerPdf": "Answer Key (PDF)",
    "settings.grayscale": "Grayscale",
    "button.clearAll": "Clear All",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Worksheet",
    "tab.answerKey": "Answer Key",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} custom image(s) available.",
    "message.generatingWorksheet": "Generating worksheet...",
    "message.worksheetGenerated": "Worksheet regenerated successfully!",
    "message.generatingAnswer": "Generating answer key...",
    "message.answerGenerated": "Answer key generated!",
    "message.assetAdded": "{type} added.",
    "message.formCleared": "Form cleared.",
    "message.downloadStarted": "Download Initiated!",
    "message.pdfDownloaded": "PDF downloaded!",
    "message.pdfSuccess": "PDF Downloaded!",
    "message.jpegDownloaded": "JPEG download initiated!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Could not load themes.",
    "message.maxImages": "You can select a maximum of {count} images.",
    "message.selectImages": "Please select some images or choose a theme with images.",
    "message.generateFirst": "Please generate a worksheet first.",
    "message.cannotDownloadEmpty": "Cannot download empty {fileName}.",
    "message.imageError": "Error preparing image: {error}",
    "message.generateContent": "Please generate content first.",
    "message.pdfError": "Error creating PDF.",
    "message.generateWorksheet": "Please generate a worksheet first.",
    "message.jpegError": "Error preparing JPEG.",
    "message.pdfCreateError": "Error creating PDF: {error}",
    "message.imagesError": "Error loading images.",
    "message.borderError": "Error loading borders.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "All Themes (uses translations)",
    "message.loading": "Loading...",
    "message.typeToSearch": "Type to search all images.",
    "message.noImages": "No images found {query}.",
    "message.uploadedHere": "Your uploaded images appear here.",
    "message.preparing": "Preparing {format}...",
    "message.preparingPdf": "Preparing PDF...",
    "message.preparingJpeg": "Preparing JPEG...",
    "decoration.allBorders": "All Borders",
    "message.selectBorderTheme": "Select a theme to see borders.",
    "message.loadingBorders": "Loading {theme} borders...",
    "message.noBorders": "No borders found.",
    "decoration.allBackgrounds": "All Backgrounds",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Name: ________________",
    "form.dateField": "Date: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "FREE VERSION - LessonCraftStudio.com",
    "watermark.freeShort": "FREE VERSION"
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
  const translation = WORD_GUESS_TRANSLATIONS[locale]?.[key] ||
                     WORD_GUESS_TRANSLATIONS['en'][key] ||
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
  const totalKeys = Object.keys(WORD_GUESS_TRANSLATIONS.en).length;
  const translatedKeys = Object.keys(WORD_GUESS_TRANSLATIONS[locale] || {}).length;
  return {
    total: totalKeys,
    translated: translatedKeys,
    percentage: Math.round((translatedKeys / totalKeys) * 100)
  };
}

// Export for use in implementation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WORD_GUESS_TRANSLATIONS,
    getTranslation,
    formatTranslation,
    getTranslationCoverage
  };
}

// Summary
console.log('=== Word Guess Translation Template ===');
console.log('Total translation keys: 93 unique');
console.log('Categories: 15');
console.log('Languages supported: 11');
console.log('\nKey Statistics:');
console.log('- Page & Hero: 2');
console.log('- Accordion Headers: 6');
console.log('- Language Section: 12');
console.log('- Page Setup: 16');
console.log('- Text Tools: 8');
console.log('- Exercise Configuration: 13');
console.log('- Image Library: 8');
console.log('- Toolbar: 13');
console.log('- Action Buttons: 11');
console.log('- Tabs: 2');
console.log('- Messages: 35');
console.log('- Form Fields: 2');
console.log('- Watermarks: 2');
console.log('\nUnique Features:');
console.log('- Letter grid generation for word puzzles');
console.log('- Clue difficulty system (No clues, Easy 1/2, Normal 1/4, Tough 1/6)');
console.log('- Letter exclusion from clues (e.g., exclude vowels)');
console.log('- Letter case options (uppercase/lowercase)');
console.log('- Multi-column automatic layout');
console.log('- Exercise numbering option');
console.log('- Dynamic image selection counter');
console.log('- Name and date fields');
console.log('\nCurrent Status:');
console.log('- ZERO existing translation infrastructure (0% coverage)');
console.log('- All UI elements have hardcoded English text');
console.log('- JavaScript messages untranslated');
console.log('- Language selector present but non-functional');