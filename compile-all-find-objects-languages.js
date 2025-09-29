/**
 * COMPLETE COMPILATION SCRIPT FOR ALL 11 LANGUAGES
 * This script compiles all professional translations into translations-find-objects.js
 */

const fs = require('fs');
const path = require('path');

// Read all professional translation files
const translationFiles = {
    de: 'translations/find-objects/find-objects-professional-german-translation.js',
    fr: 'translations/find-objects/find-objects-professional-french-translation.js',
    es: 'translations/find-objects/find-objects-professional-spanish-translation.js',
    it: 'translations/find-objects/find-objects-professional-italian-translation.js',
    pt: 'translations/find-objects/find-objects-professional-portuguese-translation.js',
    nl: 'translations/find-objects/find-objects-professional-dutch-translation.js',
    sv: 'translations/find-objects/find-objects-professional-swedish-translation.js',
    da: 'translations/find-objects/find-objects-professional-danish-translation.js',
    no: 'translations/find-objects/find-objects-professional-norwegian-translation.js',
    fi: 'translations/find-objects/find-objects-professional-finnish-translation.js'
};

// English translations (base)
const englishTranslations = {
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
    "findobjects.page.title": "SpotWorks - Find the Objects Generator",
    "findobjects.title": "SpotWorks",
    "language.label": "Language:",
    "findobjects.tab.worksheet": "Worksheet",
    "findobjects.tab.answer": "Answer Key",
    "findobjects.page.scene": "Page & Scene",
    "findobjects.page.setup": "Page Setup",
    "findobjects.page.size.label": "Page Size:",
    "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
    "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.a4.landscape": "A4 Landscape (297×210mm)",
    "page.size.custom": "Custom",
    "findobjects.width.label": "Width (px):",
    "findobjects.height.label": "Height (px):",
    "findobjects.apply.size": "Apply Size",
    "findobjects.use.decorations": "Use Child-Friendly Decorations",
    "findobjects.fallback.color": "Fallback Color:",
    "findobjects.background.title": "Background",
    "findobjects.background.theme": "Background Theme:",
    "findobjects.background.none": "None (Use Fallback Color)",
    "findobjects.background.message": "Select a theme for backgrounds.",
    "findobjects.background.opacity": "Background Opacity:",
    "findobjects.border.title": "Border",
    "findobjects.border.theme": "Border Theme:",
    "findobjects.border.message": "Select a theme for borders.",
    "findobjects.border.opacity": "Border Opacity:",
    "common.none": "None",
    "common.grayscale": "Grayscale",
    "findobjects.text.content": "Text & Content",
    "findobjects.text.tools": "Text Tools",
    "findobjects.text.add.label": "Add New Text:",
    "findobjects.text.placeholder": "Find the hidden objects!",
    "findobjects.add.text": "Add Text",
    "findobjects.text.properties": "Selected Text Properties",
    "findobjects.text.color.label": "Color:",
    "findobjects.text.size.label": "Size:",
    "findobjects.text.font.label": "Font:",
    "findobjects.text.outline.color.label": "Outline Color:",
    "findobjects.text.outline.width.label": "Outline (0-10):",
    "findobjects.other.content.label": "Other Content",
    "findobjects.include.name.date.label": "Include Name/Date Fields",
    "findobjects.text.default": "New Text",
    "findobjects.update.text": "Update Text",
    "findobjects.delete.text": "Delete Text",
    "findobjects.font.family": "Font Family:",
    "findobjects.font.size": "Font Size:",
    "findobjects.font.weight": "Font Weight:",
    "findobjects.font.normal": "Normal",
    "findobjects.font.bold": "Bold",
    "findobjects.text.bg": "Text Background:",
    "findobjects.align.horizontal": "Horizontal Alignment:",
    "findobjects.align.left": "Left",
    "findobjects.align.center": "Center",
    "findobjects.align.right": "Right",
    "findobjects.align.selected": "Align Selected:",
    "findobjects.image.library": "Image Library",
    "findobjects.search.library": "Search Library",
    "findobjects.filter.theme": "Filter by Theme:",
    "findobjects.all.themes": "All Themes",
    "findobjects.search.label": "Search Images:",
    "findobjects.search.placeholder": "e.g., apple, car",
    "findobjects.available.images.label": "Available Images",
    "findobjects.upload.custom": "Upload Custom Images",
    "findobjects.upload.select": "Select image(s) to upload:",
    "findobjects.upload.session": "Your Uploaded Images (This Session):",
    "findobjects.upload.placeholder": "Your uploaded images will appear here.",
    "findobjects.choose.files": "Choose files",
    "findobjects.no.file.chosen": "No file chosen",
    "findobjects.object.selection": "Object Selection",
    "findobjects.distractors.label": "Distractors (Select 8–12)",
    "findobjects.distractors.theme.label": "Or Select Theme for Distractors:",
    "findobjects.no.theme.manual": "-- No Theme (Use Manual Selection) --",
    "findobjects.no.theme.manual.full": "No Theme (Use Manual Selection)",
    "findobjects.hidden.label": "Hidden Objects (Select 1–5)",
    "findobjects.hidden.theme.label": "Or Select Theme for Hidden Objects:",
    "findobjects.selected.distractors": "Selected Distractors:",
    "findobjects.selected.hidden": "Selected Hidden Objects:",
    "findobjects.generate": "Generate",
    "findobjects.clear.all": "Clear All",
    "findobjects.name.field": "Name: _______________________",
    "findobjects.date.field": "Date: ___________",
    // All message keys
    "findobjects.msg.worksheet.success": "Worksheet generated successfully!",
    "findobjects.msg.answer.generated": "Answer Key Generated.",
    "findobjects.msg.cleared": "All settings cleared.",
    "findobjects.msg.download.initiated": "Download initiated!",
    "findobjects.msg.pdf.downloaded": "PDF downloaded!",
    "findobjects.msg.pdf.error": "Error creating PDF.",
    "findobjects.msg.preparing.pdf": "Preparing PDF...",
    "findobjects.msg.min.distractors": "Please select at least 8 distractors.",
    "findobjects.msg.hidden.empty": "Hidden object theme is empty.",
    "findobjects.msg.themes.error": "Error loading themes.",
    "findobjects.msg.search.error": "Error searching for \"{query}\"",
    "findobjects.msg.theme.error": "Error loading theme: {theme}",
    "findobjects.msg.theme.failed": "Failed to load theme.",
    "findobjects.msg.file.error": "Error reading file: {filename}",
    "findobjects.msg.already.selected": "Image already selected in one of the categories.",
    "findobjects.msg.selection.limit": "Cannot add more than {limit} {category} images.",
    "findobjects.msg.prep.failed": "Image preparation failed. Please check selections.",
    "findobjects.msg.unexpected.error": "An unexpected error occurred. Please try again.",
    "findobjects.msg.generate.first": "Please generate a worksheet first.",
    "findobjects.msg.theme.load.error": "Could not load images for {type} theme.",
    "findobjects.msg.distractor.insufficient": "Distractor theme has fewer than 8 images.",
    "findobjects.msg.hidden.insufficient": "Hidden Object theme has fewer than 1 image.",
    "findobjects.msg.grayscale.error": "Grayscale conversion failed.",
    "findobjects.msg.canvas.empty": "Canvas is empty. Nothing to download.",
    "findobjects.msg.jpeg.error": "Error preparing JPEG.",
    "findobjects.msg.preparing.jpeg": "Preparing JPEG download...",
    "findobjects.msg.no.borders": "No borders in this theme.",
    "findobjects.msg.border.error": "Error loading border images.",
    "findobjects.msg.no.backgrounds": "No backgrounds in this theme.",
    "findobjects.msg.background.error": "Error loading background images.",
    "findobjects.msg.theme.selected": "{type} theme selected. Manual items cleared.",
    "findobjects.msg.searching": "Searching...",
    "findobjects.msg.loading.theme": "Loading {theme}...",
    "findobjects.msg.loading.uploads": "Loading {count} image(s)...",
    "findobjects.msg.uploads.available": "{count} custom image(s) available.",
    "findobjects.msg.no.images": "No images found{query}",
    "findobjects.msg.generating": "Generating worksheet...",
    "findobjects.msg.generating.answer": "Generating Answer Key..."
};

// Initialize compiledTranslations with English
const compiledTranslations = { en: englishTranslations };

// Process each language file
Object.entries(translationFiles).forEach(([lang, filePath]) => {
    console.log(`Processing ${lang.toUpperCase()} from ${filePath}...`);

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // Extract translations object from file content
        // The files have format: const FIND_OBJECTS_TRANSLATIONS_XX = { "xx": { ... } }
        const match = fileContent.match(/const FIND_OBJECTS_TRANSLATIONS_\w+ = (\{[\s\S]*?\}\s*\})/);

        if (match) {
            const translationsObj = eval(`(${match[1]})`);
            const langData = translationsObj[lang];

            if (langData) {
                // Merge with English keys to ensure completeness
                compiledTranslations[lang] = { ...englishTranslations, ...langData };
                console.log(`✅ ${lang.toUpperCase()}: ${Object.keys(compiledTranslations[lang]).length} keys`);
            } else {
                console.error(`❌ No translations found for ${lang}`);
                // Use English as fallback
                compiledTranslations[lang] = englishTranslations;
            }
        } else {
            console.error(`❌ Could not parse ${filePath}`);
            // Use English as fallback
            compiledTranslations[lang] = englishTranslations;
        }
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        // Use English as fallback
        compiledTranslations[lang] = englishTranslations;
    }
});

// Generate the output file content
const outputContent = `/**
 * FIND OBJECTS COMPLETE TRANSLATIONS
 * Compiled from professional translation files
 * Version: 3.0.0
 * Generated: ${new Date().toISOString()}
 * Total Languages: 11
 * Total Keys per Language: ${Object.keys(englishTranslations).length}
 */

const translations = ${JSON.stringify(compiledTranslations, null, 2)};

// Make available globally
window.translations = translations;
window.FIND_OBJECTS_TRANSLATIONS = translations;

/**
 * Get translation for a key
 * @param {string} key - Translation key
 * @param {object} params - Optional parameters for placeholder replacement
 * @returns {string} Translated text
 */
function t(key, params = {}) {
  const currentLocale = window.currentLocale || 'en';
  const translation = translations[currentLocale]?.[key] ||
                     translations['en'][key] ||
                     key;

  return formatTranslation(translation, params);
}

// Make t function available globally
window.t = t;

/**
 * Format translation with placeholder replacement
 * @param {string} text - Text with placeholders
 * @param {object} params - Parameters to replace
 * @returns {string} Formatted text
 */
function formatTranslation(text, params) {
  let formatted = text;

  // Handle object with named parameters
  if (typeof params === 'object' && params !== null) {
    for (const [key, value] of Object.entries(params)) {
      formatted = formatted.replace(new RegExp(\`\\{$\{key}\\}\`, 'g'), value);
    }
  }

  return formatted;
}

// Make formatTranslation available globally
window.formatTranslation = formatTranslation;

/**
 * Validate translations for current locale
 * @returns {object} Validation results
 */
function validateFindObjectsTranslations() {
  const currentLocale = window.currentLocale || 'en';
  const englishKeys = Object.keys(translations.en);
  const localeKeys = Object.keys(translations[currentLocale] || {});

  const missing = englishKeys.filter(key => !localeKeys.includes(key));

  return {
    locale: currentLocale,
    totalKeys: englishKeys.length,
    translatedKeys: localeKeys.length,
    missingKeys: missing,
    coverage: ((localeKeys.length / englishKeys.length) * 100).toFixed(1) + '%',
    isComplete: missing.length === 0
  };
}

// Make validation available globally
window.validateFindObjectsTranslations = validateFindObjectsTranslations;

// Log successful loading
console.log('Find Objects translations loaded:', {
  languages: Object.keys(translations),
  keysPerLanguage: Object.keys(translations.en).length
});
`;

// Write the compiled translations file
const outputPath = 'frontend/public/worksheet-generators/js/translations-find-objects.js';
fs.writeFileSync(outputPath, outputContent, 'utf8');

console.log('\n✅ COMPILATION COMPLETE!');
console.log(`Output file: ${outputPath}`);
console.log(`Total languages: ${Object.keys(compiledTranslations).length}`);
console.log(`Keys per language: ${Object.keys(englishTranslations).length}`);

// Summary
console.log('\nLANGUAGE SUMMARY:');
Object.entries(compiledTranslations).forEach(([lang, translations]) => {
    const keyCount = Object.keys(translations).length;
    const coverage = (keyCount / Object.keys(englishTranslations).length * 100).toFixed(1);
    console.log(`${lang.toUpperCase()}: ${keyCount} keys (${coverage}% coverage)`);
});