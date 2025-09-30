// Writing (English Writing Practice) Translation Master Template
// Total: 100+ translation keys
// Languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI
// Current coverage: 0% (no data-translate attributes exist)
// CRITICAL: This app has NO language selector - must be added

const WRITING_TRANSLATIONS = {
  en: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Writing Worksheet Generator",
    "settings.title": "Writing Worksheet",

    // ===== 2. LANGUAGE SECTION (12 items) =====
    // NOTE: MUST ADD LANGUAGE SELECTOR TO APP
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

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Page Setup",
    "library.title": "Image Library",
    "library.uploadTitle": "Upload Custom Images",
    "settings.textTools": "Text Tools",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Page Size:",
    "pageSize.letterPortrait": "Letter Portrait (8.5×11\")",
    "pageSize.letterLandscape": "Letter Landscape (11×8.5\")",
    "pageSize.a4Portrait": "A4 Portrait (210×297mm)",
    "pageSize.a4Landscape": "A4 Landscape (297×210mm)",
    "pageSize.custom": "Custom",
    "settings.width": "Width (px):",
    "settings.height": "Height (px):",
    "decoration.backgroundTheme": "Background Theme:",
    "decoration.none": "None",
    "decoration.backgroundOpacity": "Background Opacity:",
    "decoration.borderTheme": "Border Theme:",
    "decoration.borderOpacity": "Border Opacity:",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Row {number}",
    "row.type": "Row Type:",
    "rowType.trace": "Trace",
    "rowType.fadingTrace": "Fading Trace",
    "rowType.guidedCopy": "Guided Copy",
    "rowType.fill": "Fill",
    "row.fontStyle": "Font Style:",
    "fontStyle.printRegular": "Print Regular",
    "fontStyle.printRegularArrow": "Print Regular Arrow",
    "fontStyle.printTracing": "Print Tracing",
    "fontStyle.printTracingArrow": "Print Tracing Arrow",
    "fontStyle.cursive": "Cursive",
    "row.content": "Content:",
    "content.empty": "Empty",
    "content.beginningLetter": "Beginning Letter",
    "content.wholeFileName": "Whole File Name",
    "content.customText": "Custom Text",
    "content.preWriting": "Pre-writing",
    "row.customTextPlaceholder": "Enter custom trace text here...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Case:",
    "case.uppercase": "Upper-case",
    "case.lowercase": "Lower-case",
    "case.titleCase": "Title Case",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Stroke Type:",
    "stroke.vertical": "Vertical Line",
    "stroke.horizontal": "Horizontal Line",
    "stroke.circle": "Circle",
    "stroke.zigzag": "Zig-Zag Line",

    // ===== 8. IMAGE LIBRARY (10 items) =====
    "library.imageMode": "Image Mode:",
    "imageMode.exercise": "Exercise Image",
    "imageMode.custom": "Custom Images",
    "library.pickExercise": "Pick an exercise image (optional):",
    "library.searchPlaceholder": "Search images...",
    "library.selectedStatus": "Selected: {word}",
    "library.selectUpload": "Select image(s) to upload:",
    "library.uploadedImages": "Your Uploaded Images:",
    "button.unselectImage": "Unselect Image",
    "button.clearSelection": "Clear Selection",
    "button.addSelectedImage": "Add Selected Image",

    // ===== 9. TEXT TOOLS (10 items) =====
    "text.addNewTitle": "Add New Text",
    "text.content": "Content:",
    "text.placeholder": "New Text",
    "text.selectedProperties": "Selected Text Properties",
    "text.color": "Color:",
    "text.size": "Size:",
    "text.font": "Font:",
    "text.outlineColor": "Outline Color:",
    "text.outlineWidth": "Outline (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
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
    "toolbar.cropOverflow": "Crop Overflow",
    "toolbar.lock": "Lock",
    "toolbar.delete": "Delete",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Delete Row",
    "button.addRow": "Add Row",
    "button.addText": "Add Text to Worksheet",
    "button.deleteSelectedText": "Delete Selected Text",
    "button.download": "Download",
    "button.downloadPdf": "Download as PDF",
    "button.downloadJpeg": "Download as JPEG",
    "settings.grayscale": "Grayscale",
    "button.clearAll": "Clear All",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Row cropped successfully.",
    "message.worksheetCleared": "Worksheet cleared.",
    "message.pdfDownloaded": "PDF downloaded!",
    "message.jpegDownloaded": "JPEG download initiated!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Cropping is not supported for this row type.",
    "message.noContentToCrop": "This row has no content to crop.",
    "message.noOverflow": "No overflow to crop.",
    "message.generateContent": "Please generate content first.",
    "message.pdfError": "Error creating PDF.",
    "message.generateWorksheet": "Please generate a worksheet first.",
    "message.jpegError": "Error preparing JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (9 items) =====
    "message.selectBackgroundTheme": "Select a theme for backgrounds.",
    "message.selectBorderTheme": "Select a theme to see borders.",
    "message.noImages": "No images found. Select a theme or try a different search.",
    "message.themeLoadError": "Error loading {type} themes:",
    "message.selectTheme": "Select a theme.",
    "message.loading": "Loading...",
    "message.loadError": "Error loading {type}.",
    "message.preparingPdf": "Preparing PDF...",
    "message.preparingJpeg": "Preparing JPEG...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Are you sure you want to clear the worksheet? This cannot be undone.",

    // ===== 16. WATERMARKS (2 items) =====
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
  const translation = WRITING_TRANSLATIONS[locale]?.[key] ||
                     WRITING_TRANSLATIONS['en'][key] ||
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
  const totalKeys = Object.keys(WRITING_TRANSLATIONS.en).length;
  const translatedKeys = Object.keys(WRITING_TRANSLATIONS[locale] || {}).length;
  return {
    total: totalKeys,
    translated: translatedKeys,
    percentage: Math.round((translatedKeys / totalKeys) * 100)
  };
}

// Export for use in implementation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WRITING_TRANSLATIONS,
    getTranslation,
    formatTranslation,
    getTranslationCoverage
  };
}

// Summary
console.log('=== Writing Translation Template ===');
console.log('Total translation keys: 103 unique');
console.log('Categories: 16');
console.log('Languages supported: 11');
console.log('\nKey Statistics:');
console.log('- Page & Hero: 2');
console.log('- Language Section: 12 (MUST BE ADDED)');
console.log('- Accordion Headers: 4');
console.log('- Page Setup: 14');
console.log('- Writing Row Config: 19');
console.log('- Case Options: 4');
console.log('- Stroke Types: 5');
console.log('- Image Library: 11');
console.log('- Text Tools: 9');
console.log('- Toolbar: 14');
console.log('- Action Buttons: 10');
console.log('- Messages: 22');
console.log('- Watermarks: 2');
console.log('\nUnique Features:');
console.log('- Writing row types (Trace, Fading Trace, Guided Copy, Fill)');
console.log('- Font styles for writing practice (Print Regular/Tracing with arrows, Cursive)');
console.log('- Content options (Empty, Beginning Letter, Whole File Name, Custom Text, Pre-writing)');
console.log('- Case options (Uppercase, Lowercase, Title Case)');
console.log('- Pre-writing stroke types (Vertical, Horizontal, Circle, Zig-Zag)');
console.log('- Dynamic row management (add/delete rows)');
console.log('- Custom text input for practice');
console.log('- Row overflow cropping');
console.log('- SVG to Canvas conversion for high-quality downloads');
console.log('\nCritical Issues:');
console.log('- NO LANGUAGE SELECTOR EXISTS (must be added)');
console.log('- ZERO existing translation infrastructure (0% coverage)');
console.log('- All UI elements have hardcoded English text');
console.log('- JavaScript messages untranslated');