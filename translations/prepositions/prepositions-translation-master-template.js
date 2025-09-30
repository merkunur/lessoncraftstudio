// Prepositions Translation Master Template
// Total: 159 translation keys (151 unique after consolidation)
// Languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI
// NOTE: Prepositions themselves are already programmatically translated in PREPOSITION_TRANSLATIONS

const PREPOSITIONS_TRANSLATIONS = {
  en: {
    // ===== 1. PAGE & HERO (2 items) =====
    "prepositions.page.title": "Prepositions Worksheet Generator",
    "prepositions_title": "Prepositions", // Already has data-translate (using snake_case)

    // ===== 2. ACCORDION HEADERS (6 items) - Some already have snake_case keys =====
    "page_setup": "Page Setup", // Already has data-translate
    "text_tools": "Text Tools", // Already has data-translate
    "configuration": "Configuration", // Already has data-translate
    "item_selection": "Item Selection", // Already has data-translate
    "shape_replacement": "Shape Replacement", // Already has data-translate
    "upload_custom_images": "Upload Custom Images", // Already has data-translate

    // ===== 3. LANGUAGE SECTION (12 items) =====
    "language": "Language", // Already has data-translate
    "language.english": "English",
    "language.german": "Deutsch",
    "language.french": "Français",
    "language.spanish": "Español",
    "language.portuguese": "Português",
    "language.italian": "Italiano",
    "language.dutch": "Nederlands",
    "language.swedish": "Svenska",
    "language.danish": "Dansk",
    "language.norwegian": "Norsk",
    "language.finnish": "Suomi",

    // ===== 4. PAGE SETUP (22 items) =====
    "paper_size": "Paper Size:", // Already has data-translate
    "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
    "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.a4.landscape": "A4 Landscape (297×210mm)",
    "page.size.square": "Square (1200×1200)",
    "page.size.custom": "Custom",
    "width_px": "Width (px):", // Already has data-translate
    "height_px": "Height (px):", // Already has data-translate
    "apply_size": "Apply Size", // Already has data-translate
    "template": "Template", // Already has data-translate
    "prepositions.template.label": "Worksheet Template:",
    "prepositions.page.color": "Page Color:",
    "prepositions.background.title": "Background",
    "prepositions.background.theme": "Background Theme:",
    "prepositions.background.message": "Select a theme for backgrounds.",
    "prepositions.background.opacity": "Background Opacity:",
    "prepositions.border.title": "Border",
    "prepositions.border.theme": "Border Theme:",
    "prepositions.border.message": "Select a theme to see borders.",
    "prepositions.border.opacity": "Border Opacity:",

    // ===== 5. COMMON (2 items) =====
    "common.none": "None",
    "common.grayscale": "Grayscale",

    // ===== 6. TEXT TOOLS (18 items) =====
    "prepositions.text.add.new": "Add New Text",
    "prepositions.text.content": "Content:",
    "prepositions.text.placeholder": "Worksheet Title...",
    "prepositions.text.add.button": "Add Text to Worksheet",
    "prepositions.text.properties": "Selected Text Properties",
    "prepositions.text.color": "Color:",
    "prepositions.text.size": "Size:",
    "prepositions.text.font": "Font:",
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",
    "prepositions.text.outline.color": "Outline Color:",
    "prepositions.text.outline.width": "Outline (0-10):",
    "prepositions.text.default": "New Text",

    // ===== 7. CONFIGURATION (3 items) =====
    "prepositions.exercises.count": "Number of Exercises (1-8):",
    "prepositions.select.prepositions": "Select Prepositions",
    "prepositions.include.name.date": "Include Name/Date Fields",

    // ===== 8. ITEM SELECTION (8 items) =====
    "prepositions.generation.mode": "Generation Mode:",
    "prepositions.manual.selection": "Manual Image Selection",
    "prepositions.manual.selection.option": "Manual Selection",
    "prepositions.all.themes.random": "All Themes (Random)",
    "prepositions.all.themes.option": "All Themes",
    "prepositions.image.theme": "Image Theme:",
    "prepositions.search.items.placeholder": "Search item images...",
    "prepositions.search.all.placeholder": "Type to search all images.",
    "prepositions.loading.themes": "Loading themes...",
    "prepositions.selected.count": "Selected: 0/8",

    // ===== 9. SHAPE REPLACEMENT (7 items) =====
    "prepositions.manual.shape.selection": "Manual Shape Selection",
    "prepositions.shape.theme": "Shape Image Theme:",
    "prepositions.search.shapes.placeholder": "Search shape images...",
    "prepositions.shape.selected.count": "Selected: 0/8",
    "prepositions.theme.random.format": "{displayName} (Random)",

    // ===== 10. UPLOAD SECTION (3 items) =====
    "prepositions.upload.select": "Select image(s) to upload:",
    "prepositions.uploaded.images": "Your Uploaded Images:",
    "prepositions.uploaded.placeholder": "Your uploaded images will appear here.",

    // ===== 11. TOOLBAR (15 items) =====
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

    // ===== 12. ACTION BUTTONS (10 items) - Some already have snake_case keys =====
    "generate": "Generate", // Already has data-translate
    "generate_worksheet": "Generate Worksheet", // Already has data-translate
    "generate_answer_key": "Generate Answer Key", // Already has data-translate
    "prepositions.download": "Download",
    "prepositions.download.worksheet.jpeg": "Worksheet (JPEG)",
    "prepositions.download.answer.jpeg": "Answer Key (JPEG)",
    "prepositions.download.worksheet.pdf": "Worksheet (PDF)",
    "prepositions.download.answer.pdf": "Answer Key (PDF)",
    "prepositions.clear.all": "Clear All",

    // ===== 13. TABS (2 items) =====
    "prepositions.tab.worksheet": "Worksheet",
    "prepositions.tab.answer": "Answer Key",

    // ===== 14. GENERATION & LOADING MESSAGES (15 items) =====
    "prepositions.msg.page.updated": "Page size updated.",
    "prepositions.msg.template.error": "Could not load the selected template.",
    "prepositions.msg.select.theme": "Select a theme to see {type}s.",
    "prepositions.msg.loading.theme": "Loading {theme} {type}s...",
    "prepositions.msg.no.items": "No {type}s in this theme.",
    "prepositions.msg.load.failed": "Failed to load {typeName} image.",
    "prepositions.msg.item.added": "{Type} added.",
    "prepositions.msg.loading": "Loading...",
    "prepositions.msg.loading.default": "Loading default images...",
    "prepositions.msg.searching": "Searching...",
    "prepositions.msg.loading.theme.images": "Loading theme images...",
    "prepositions.msg.no.images": "No images found.",

    // ===== 15. SELECTION & VALIDATION MESSAGES (8 items) =====
    "prepositions.msg.max.selection": "You can only select up to {exerciseCount} {type} images.",
    "prepositions.msg.generating": "Generating worksheet...",
    "prepositions.msg.select.preposition": "Please select at least one preposition.",
    "prepositions.msg.select.items": "Please select at least {exerciseCount} item images.",
    "prepositions.msg.insufficient.images": "Not enough images in this theme ({count}) to generate.",

    // ===== 16. GENERATION SUCCESS MESSAGES (5 items) =====
    "prepositions.msg.worksheet.generated": "Worksheet generated!",
    "prepositions.msg.generate.first": "Please generate a worksheet first.",
    "prepositions.msg.generating.answer": "Generating answer key...",
    "prepositions.msg.answer.ready": "Answer key ready.",
    "prepositions.msg.cleared": "Worksheet cleared.",

    // ===== 17. NAME/DATE FIELDS (2 items) =====
    "prepositions.name.field": "Name: ____________",
    "prepositions.date.field": "Date: ____________",

    // ===== 18. DOWNLOAD & EXPORT MESSAGES (14 items) =====
    "prepositions.msg.empty.canvas": "Canvas is empty, nothing to download.",
    "prepositions.msg.preparing.jpeg": "Preparing JPEG...",
    "prepositions.msg.jpeg.initiated": "JPEG Download Initiated!",
    "prepositions.msg.jpeg.initiated.alt": "JPEG download initiated!",
    "prepositions.msg.jpeg.error": "JPEG Error: {message}",
    "prepositions.msg.jpeg.error.simple": "Error preparing JPEG.",
    "prepositions.watermark.main": "FREE VERSION - LessonCraftStudio.com",
    "prepositions.watermark.small": "FREE VERSION",
    "prepositions.msg.generate.content.first": "Please generate content first.",
    "prepositions.msg.preparing.pdf": "Preparing PDF...",
    "prepositions.msg.pdf.downloaded": "PDF downloaded!",
    "prepositions.msg.pdf.error": "Error creating PDF.",
    "prepositions.msg.generate.worksheet.first": "Please generate a worksheet first.",

    // ===== 19. PREPOSITIONS (Already programmatically handled) =====
    // NOTE: These are in PREPOSITION_TRANSLATIONS object for all languages:
    // "in", "on top of", "under", "next to", "behind", "between", "above", "in front of"

    // ===== 20. EXERCISE WORDS (Already programmatically handled) =====
    // NOTE: These are in EXERCISE_TRANSLATIONS object for all languages:
    // "is", "the"

    // ===== 21. DEFAULT SHAPES (May need translation in future) =====
    // circle, cube, cylinder, heart, hexagon, square, star, triangle
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
  const translation = PREPOSITIONS_TRANSLATIONS[locale]?.[key] ||
                     PREPOSITIONS_TRANSLATIONS['en'][key] ||
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
  const totalKeys = Object.keys(PREPOSITIONS_TRANSLATIONS.en).length;
  const translatedKeys = Object.keys(PREPOSITIONS_TRANSLATIONS[locale] || {}).length;
  return {
    total: totalKeys,
    translated: translatedKeys,
    percentage: Math.round((translatedKeys / totalKeys) * 100)
  };
}

// Export for use in implementation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PREPOSITIONS_TRANSLATIONS,
    getTranslation,
    formatTranslation,
    getTranslationCoverage
  };
}

// Summary
console.log('=== Prepositions Translation Template ===');
console.log('Total translation keys: 151 unique (159 total with 8 duplicates consolidated)');
console.log('Categories: 21');
console.log('Languages supported: 11');
console.log('\nKey Statistics:');
console.log('- Page & Hero: 2');
console.log('- Accordion Headers: 6 (already translated with snake_case)');
console.log('- Language Section: 12');
console.log('- Page Setup: 22');
console.log('- Common: 2');
console.log('- Text Tools: 18');
console.log('- Configuration: 3');
console.log('- Item Selection: 10');
console.log('- Shape Replacement: 7');
console.log('- Upload Section: 3');
console.log('- Toolbar: 15');
console.log('- Action Buttons: 10 (3 already translated)');
console.log('- Tabs: 2');
console.log('- Messages: 39');
console.log('\nUnique Features:');
console.log('- 8 Prepositions (already programmatically translated)');
console.log('- Exercise words "is" and "the" (already programmatically translated)');
console.log('- Visual positioning based on prepositions');
console.log('- Two generation modes (manual/random)');
console.log('- Shape replacement capability');
console.log('- Template support');
console.log('- Watermark system for free tier');