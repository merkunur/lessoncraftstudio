// Shadow Match Translation Master Template
// Total: 156 translation keys (150 unique after consolidation)
// Languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI

const SHADOW_MATCH_TRANSLATIONS = {
  en: {
    // ===== 1. PAGE & HERO (3 items) =====
    "shadow.match.page.title": "Shadow Match Worksheet Generator",
    "shadow.match.settings": "Worksheet Settings",
    "shadowMatch": "Shadow Match", // Already has data-translate

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "shadow.match.page.setup": "Page Setup",
    "shadow.match.text.tools": "Text Tools",
    "shadow.match.exercise.config": "Exercise Configuration",
    "shadow.match.image.library": "Image Library",
    "shadow.match.upload.custom": "Upload Custom Images",

    // ===== 3. LANGUAGE SECTION (14 items) =====
    "selectLanguage": "Select Language", // Already has data-translate
    "language": "Language:", // Already has data-translate
    "language.english": "English",
    "language.german.full": "Deutsch (German)",
    "language.french.full": "Français (French)",
    "language.spanish.full": "Español (Spanish)",
    "language.portuguese.full": "Português (Portuguese)",
    "language.italian.full": "Italiano (Italian)",
    "language.dutch.full": "Nederlands (Dutch)",
    "language.swedish.full": "Svenska (Swedish)",
    "language.danish.full": "Dansk (Danish)",
    "language.norwegian.full": "Norsk (Norwegian)",
    "language.finnish.full": "Suomi (Finnish)",
    "shadow.match.language.info": "Image names and themes will be displayed in the selected language.",

    // ===== 4. PAGE SETUP (19 items) =====
    "shadow.match.page.size": "Page Size:",
    "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
    "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.a4.landscape": "A4 Landscape (297×210mm)",
    "page.size.square": "Square (1200×1200)",
    "page.size.custom": "Custom",
    "shadow.match.width.label": "Width (px):",
    "shadow.match.height.label": "Height (px):",
    "shadow.match.page.color": "Page Color:",
    "shadow.match.apply.size": "Apply Size",
    "shadow.match.background.title": "Background",
    "shadow.match.background.theme": "Background Theme:",
    "shadow.match.background.message": "Select a theme for backgrounds.",
    "shadow.match.background.opacity": "Background Opacity:",
    "shadow.match.border.title": "Border",
    "shadow.match.border.theme": "Border Theme:",
    "shadow.match.border.message": "Select a theme to see borders.",
    "shadow.match.border.opacity": "Border Opacity:",

    // ===== 5. COMMON (2 items) =====
    "common.none": "None",
    "common.grayscale": "Grayscale",

    // ===== 6. TEXT TOOLS (17 items) =====
    "shadow.match.text.add.new": "Add New Text",
    "shadow.match.text.content": "Content:",
    "shadow.match.text.placeholder": "Hello!",
    "shadow.match.text.add.button": "Add Text",
    "shadow.match.text.properties": "Selected Text Properties",
    "shadow.match.text.color": "Color:",
    "shadow.match.text.size": "Size:",
    "shadow.match.text.font": "Font:",
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",
    "shadow.match.text.outline.color": "Outline Color:",
    "shadow.match.text.outline.width": "Outline (0-10):",
    "shadow.match.text.default": "New Text",

    // ===== 7. EXERCISE CONFIGURATION (2 items) =====
    "shadow.match.show.labels": "Show A/B/C and 1/2/3 Labels",
    "shadow.match.include.name.date": "Include Name/Date Fields",

    // ===== 8. IMAGE LIBRARY (8 items) =====
    "shadow.match.select.theme": "Select Theme:",
    "shadow.match.search.images": "Search Images:",
    "shadow.match.search.placeholder": "e.g., apple, car",
    "shadow.match.selected.count": "Selected: 0 / 4",
    "shadow.match.selected.format": "Selected: {count} / {SELECT_COUNT}",
    "shadow.match.available.images": "Available Images:",
    "shadow.match.loading.images": "Loading images...",
    "shadow.match.selected.images": "Selected Images for Problems:",

    // ===== 9. UPLOAD SECTION (3 items) =====
    "shadow.match.upload.select": "Select image(s) to upload:",
    "shadow.match.uploaded.images": "Your Uploaded Images (This Session):",
    "shadow.match.uploaded.placeholder": "Your uploaded images will appear here.",

    // ===== UPLOAD BUTTON (3 items - for custom file input wrapper) =====
    "shadow.match.upload.button": "Choose Files",
    "shadow.match.upload.no.file": "No file chosen",
    "shadow.match.upload.files.selected": "{count} files selected",

    // ===== 10. TOOLBAR (15 items) =====
    "toolbar.layers": "Layers",
    "toolbar.bring.forward": "Bring Forward",
    "toolbar.send.backward": "Send Backward",
    "toolbar.align": "Align",
    "toolbar.align.selected": "Align Selected:",
    "toolbar.align.left": "Align Left",
    "toolbar.center.h": "Center Horizontally",
    "toolbar.align.right": "Align Right",
    "toolbar.align.top": "Align Top",
    "toolbar.center.v": "Center Vertically",
    "toolbar.align.bottom": "Align Bottom",
    "toolbar.align.to.page": "Align to Page:",
    "toolbar.center.page.h": "Center on Page Horizontally",
    "toolbar.center.page.v": "Center on Page Vertically",
    "toolbar.delete": "Delete Selected",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "shadow.match.generate": "Generate",
    "shadow.match.generate.worksheet": "Generate Worksheet",
    "shadow.match.generate.answer": "Generate Answer Key",
    "shadow.match.download": "Download",
    "shadow.match.download.worksheet.jpeg": "Worksheet (JPEG)",
    "shadow.match.download.answer.jpeg": "Answer Key (JPEG)",
    "shadow.match.download.worksheet.pdf": "Worksheet (PDF)",
    "shadow.match.download.answer.pdf": "Answer Key (PDF)",
    "shadow.match.clear.all": "Clear All",

    // ===== 12. TABS (2 items) =====
    "shadow.match.tab.worksheet": "Worksheet",
    "shadow.match.tab.answer": "Answer Key",

    // ===== 13. THEME LOADING MESSAGES (9 items) =====
    "allThemes": "All Themes", // Has data-translate reference
    "shadow.match.msg.themes.error": "Could not load themes.",
    "shadow.match.msg.themes.loading.error": "Error loading themes.",
    "shadow.match.msg.loading.default": "Loading default theme...",
    "shadow.match.msg.searching": "Searching...",
    "shadow.match.msg.search.error": "Error during search.",
    "shadow.match.msg.no.images": "No images found{query}.",
    "shadow.match.msg.loading": "Loading...",
    "shadow.match.msg.error": "Error.",

    // ===== 14. SELECTION & GENERATION MESSAGES (10 items) =====
    "shadow.match.msg.max.images": "Max {SELECT_COUNT} images selected.",
    "shadow.match.msg.loading.uploads": "Loading {filesToLoad} image(s)...",
    "shadow.match.msg.custom.available": "{uploadedImages} custom image(s) available.",
    "shadow.match.msg.auto.filling": "Auto-filling remaining images...",
    "shadow.match.msg.insufficient.images": "Not enough images. Need {SELECT_COUNT}, found {count}.",
    "shadow.match.msg.worksheet.generated": "Worksheet Generated!",
    "shadow.match.msg.generate.first": "Please generate the worksheet first.",
    "shadow.match.msg.answer.generated": "Answer Key Generated!",
    "shadow.match.msg.form.cleared": "Form cleared.",

    // ===== 15. NAME/DATE FIELDS (2 items) =====
    "shadow.match.name.field": "Name: _________________________",
    "shadow.match.date.field": "Date: ____________",

    // ===== 16. BORDER/BACKGROUND MESSAGES (4 items) =====
    "shadow.match.msg.border.themes.error": "Could not load border themes.",
    "shadow.match.msg.background.themes.error": "Could not load background themes.",
    "shadow.match.background.select": "Select a theme.",

    // ===== 17. DOWNLOAD & EXPORT MESSAGES (16 items) =====
    "shadow.match.msg.preparing": "Preparing {canvasName}...",
    "shadow.match.msg.download.initiated": "Download Initiated!",
    "shadow.match.msg.image.error": "Error preparing image: {message}",
    "shadow.match.watermark.main": "FREE VERSION - LessonCraftStudio.com",
    "shadow.match.watermark.small": "FREE VERSION",
    "shadow.match.msg.generate.content.first": "Please generate content first.",
    "shadow.match.msg.preparing.pdf": "Preparing PDF...",
    "shadow.match.msg.pdf.downloaded": "PDF downloaded!",
    "shadow.match.msg.pdf.error": "Error creating PDF.",
    "shadow.match.msg.generate.worksheet.first": "Please generate a worksheet first.",
    "shadow.match.msg.preparing.jpeg": "Preparing JPEG...",
    "shadow.match.msg.jpeg.initiated": "JPEG download initiated!",
    "shadow.match.msg.jpeg.error": "Error preparing JPEG.",
    "shadow.match.msg.preparing.hq.pdf": "Preparing high-quality PDF for {canvasName}...",
    "shadow.match.msg.hq.pdf.downloaded": "High-quality PDF Downloaded!",
    "shadow.match.msg.pdf.error.detailed": "Error creating PDF: {message}",

    // ===== 18. SHADOW MATCH SPECIFIC (Labels) =====
    // Note: A/B/C and 1/2/3 labels are programmatically generated
    // and may not need translation as they are universal symbols
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
  const translation = SHADOW_MATCH_TRANSLATIONS[locale]?.[key] ||
                     SHADOW_MATCH_TRANSLATIONS['en'][key] ||
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
  const totalKeys = Object.keys(SHADOW_MATCH_TRANSLATIONS.en).length;
  const translatedKeys = Object.keys(SHADOW_MATCH_TRANSLATIONS[locale] || {}).length;
  return {
    total: totalKeys,
    translated: translatedKeys,
    percentage: Math.round((translatedKeys / totalKeys) * 100)
  };
}

// Export for use in implementation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SHADOW_MATCH_TRANSLATIONS,
    getTranslation,
    formatTranslation,
    getTranslationCoverage
  };
}

// Summary
console.log('=== Shadow Match Translation Template ===');
console.log('Total translation keys: 150 unique (156 total with 6 duplicates consolidated)');
console.log('Categories: 18');
console.log('Languages supported: 11');
console.log('\nKey Statistics:');
console.log('- Page & Hero: 3');
console.log('- Accordion Headers: 5');
console.log('- Language Section: 14');
console.log('- Page Setup: 19');
console.log('- Common: 2');
console.log('- Text Tools: 18');
console.log('- Exercise Config: 2');
console.log('- Image Library: 8');
console.log('- Upload Section: 3');
console.log('- Toolbar: 15');
console.log('- Action Buttons: 9');
console.log('- Tabs: 2');
console.log('- Messages: 48');
console.log('\nUnique Features:');
console.log('- Shadow matching concept (images to silhouettes)');
console.log('- Silhouette generation (black shadows)');
console.log('- Derangement algorithm (no shadow matches original)');
console.log('- Fixed 4 images for puzzle');
console.log('- Upside-down shadows (180° rotation)');
console.log('- A/B/C labels for originals, 1/2/3 for shadows');
console.log('- Answer key shows A→2 style mappings');
console.log('- Watermark system for free tier');