#!/usr/bin/env node

/**
 * AUTOMATED TRANSLATION FIXER
 * This script automatically fixes all hardcoded English text in worksheet generator apps
 * and ensures proper translation support across all 33 apps
 */

const fs = require('fs');
const path = require('path');

// Common hardcoded strings that appear across multiple apps
const COMMON_STRINGS_TO_FIX = {
  // Placeholders and messages
  'Select a theme for backgrounds.': 'selectThemeForBackgrounds',
  'Select a theme for borders.': 'selectThemeForBorders',
  'Select a theme to see borders.': 'selectThemeToSeeBorders',
  'Your uploaded images will appear here.': 'yourUploadedImagesWillAppearHere',
  'No file chosen': 'noFileChosen',

  // Dropdown options
  'None': 'none',
  'Grayscale': 'grayscale',

  // Common labels that are often hardcoded
  'Background Theme:': 'backgroundTheme',
  'Border Theme:': 'borderTheme',
  'Background Opacity:': 'backgroundOpacity',
  'Border Opacity:': 'borderOpacity',

  // Button text
  'Generate': 'generate',
  'Download': 'download',
  'Clear All': 'clearAll',
  'Generate Worksheet': 'generateWorksheet',
  'Generate Answer Key': 'generateAnswerKey'
};

// Patterns to fix in JavaScript innerHTML assignments
const JS_PATTERNS_TO_FIX = [
  {
    // Fix: innerHTML = '<p>Select a theme for backgrounds.</p>'
    pattern: /innerHTML\s*=\s*['"`]<p[^>]*>Select a theme for backgrounds\.<\/p>['"`]/g,
    replacement: (locale) => `innerHTML = \`<p class="dictionary-message">\${translations[currentLocale]?.selectThemeForBackgrounds || 'Select a theme for backgrounds.'}</p>\``
  },
  {
    // Fix: innerHTML = '<option value="none">None</option>'
    pattern: /innerHTML\s*=\s*['"`]<option value="none">None<\/option>['"`]/g,
    replacement: (locale) => `innerHTML = \`<option value="none">\${translations[currentLocale]?.none || 'None'}</option>\``
  },
  {
    // Fix hardcoded "None" in option rebuilding
    pattern: /'<option value="none">None<\/option>'/g,
    replacement: () => '`<option value="none">${noneText}</option>`'
  }
];

// Function to process HTML files
function processHTMLFile(filePath) {
  console.log(`Processing HTML: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Add data-translate attributes to static HTML elements
  for (const [english, translationKey] of Object.entries(COMMON_STRINGS_TO_FIX)) {
    // Find elements without data-translate that contain the English text
    const regex = new RegExp(`>\\s*${english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*<`, 'g');
    if (content.match(regex)) {
      // Check if it already has data-translate
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(english) && !lines[i].includes('data-translate')) {
          // Add data-translate attribute
          lines[i] = lines[i].replace(
            /(<[^>]+)(>.*${english})/,
            `$1 data-translate="${translationKey}"$2`
          );
          modified = true;
        }
      }
      content = lines.join('\n');
    }
  }

  // Fix JavaScript innerHTML assignments
  for (const fixPattern of JS_PATTERNS_TO_FIX) {
    if (content.match(fixPattern.pattern)) {
      content = content.replace(fixPattern.pattern, fixPattern.replacement());
      modified = true;
    }
  }

  // Fix specific problematic patterns in alphabet train
  if (filePath.includes('alphabet train.html')) {
    // Fix the 4 specific places where text is hardcoded
    content = content.replace(
      /backgroundDictionary\.innerHTML = '<p class="dictionary-message">Select a theme for backgrounds\.<\/p>';/g,
      `const selectBgText = translations[currentLocale]?.selectThemeForBackgrounds || 'Select a theme for backgrounds.';\n      backgroundDictionary.innerHTML = \`<p class="dictionary-message">\${selectBgText}</p>\`;`
    );

    content = content.replace(
      /borderThemeSelect\.innerHTML = '<option value="none">None<\/option>';/g,
      `const noneTextBorder = translations[currentLocale]?.none || 'None';\n            borderThemeSelect.innerHTML = \`<option value="none">\${noneTextBorder}</option>\`;`
    );

    content = content.replace(
      /backgroundThemeSelect\.innerHTML = '<option value="none">None<\/option>';/g,
      `const noneTextBg = translations[currentLocale]?.none || 'None';\n            backgroundThemeSelect.innerHTML = \`<option value="none">\${noneTextBg}</option>\`;`
    );

    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed translations in ${path.basename(filePath)}`);
    return true;
  }

  return false;
}

// Function to ensure all common strings are in translations.js for all languages
function updateTranslationsJS() {
  const translationsPath = path.join(__dirname, 'js', 'translations.js');
  let content = fs.readFileSync(translationsPath, 'utf8');

  const languages = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
  const requiredKeys = Object.values(COMMON_STRINGS_TO_FIX);

  console.log('Checking translations.js for missing keys...');

  // For each language, check if all required keys exist
  for (const lang of languages) {
    if (lang === 'en') continue; // English is the default

    const langRegex = new RegExp(`${lang}:\\s*{([^}]+)}`, 's');
    const match = content.match(langRegex);

    if (match) {
      const langContent = match[1];
      for (const key of requiredKeys) {
        if (!langContent.includes(`${key}:`)) {
          console.log(`⚠️  Missing ${key} in ${lang} translations`);
        }
      }
    }
  }
}

// Main execution
function main() {
  const worksheetDir = __dirname;

  // Get all HTML files
  const htmlFiles = fs.readdirSync(worksheetDir)
    .filter(file => file.endsWith('.html') && !file.includes('backup'))
    .map(file => path.join(worksheetDir, file));

  console.log(`Found ${htmlFiles.length} HTML files to process`);

  let fixedCount = 0;

  // Process each HTML file
  for (const htmlFile of htmlFiles) {
    if (processHTMLFile(htmlFile)) {
      fixedCount++;
    }
  }

  // Check translations.js
  updateTranslationsJS();

  console.log(`\n✅ Fixed translations in ${fixedCount} files`);
  console.log('\n📋 Next steps:');
  console.log('1. Review the changes made to HTML files');
  console.log('2. Add missing translation keys to translations.js');
  console.log('3. Test with different locales');
}

// Run the script
main();