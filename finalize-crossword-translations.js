/**
 * CROSSWORD FINAL TRANSLATION COMPILER
 * Creates the complete translations-crossword.js file
 * Version: 1.0.0
 * Date: December 2024
 */

const fs = require('fs');
const path = require('path');

// Read the extracted translations
const EXTRACTED_FILE = path.join(__dirname, 'crossword-translations-extracted.json');
const OUTPUT_FILE = path.join(__dirname, 'frontend', 'public', 'worksheet-generators', 'js', 'translations-crossword.js');

// Read extracted data
const extractedData = JSON.parse(fs.readFileSync(EXTRACTED_FILE, 'utf8'));

// Create complete translations object
const allTranslations = extractedData;

// Collect ALL unique keys from ALL languages
const allKeys = new Set();
for (const [langCode, translations] of Object.entries(allTranslations)) {
    Object.keys(translations).forEach(key => allKeys.add(key));
}
const sortedKeys = Array.from(allKeys).sort();

console.log(`\nCollected ${sortedKeys.length} unique keys from all languages`);

// Ensure all languages have all keys (fill missing with English fallback)
for (const [langCode, translations] of Object.entries(allTranslations)) {
    // Add any missing keys with English fallback
    for (const key of sortedKeys) {
        if (!translations[key]) {
            translations[key] = allTranslations.en[key] || key;
            console.log(`Added missing key "${key}" to ${langCode} with English fallback`);
        }
    }
}

// Generate output file
const output = `/**
 * CROSSWORD COMPLETE TRANSLATIONS
 * Auto-generated from professional translation files
 * Version: 1.0.0
 * Generated: ${new Date().toISOString()}
 * Total Languages: ${Object.keys(allTranslations).length}
 * Keys per Language: ${sortedKeys.length} (standardized)
 * Pattern: Unified translation object for Crossword app
 */

// Crossword translations object with all languages
const translations = ${JSON.stringify(allTranslations, null, 2)};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.crosswordTranslations = translations;

    // Also make it available as 'translations' for compatibility
    if (!window.translations) {
        window.translations = translations;
    }
}

// Translation helper functions
function getTranslation(key, locale = 'en') {
    if (!translations[locale]) {
        console.warn(\`Locale \${locale} not found, falling back to English\`);
        locale = 'en';
    }
    return translations[locale][key] || translations.en[key] || key;
}

function formatTranslation(key, params, locale = 'en') {
    let text = getTranslation(key, locale);

    if (params && typeof params === 'object') {
        for (const [param, value] of Object.entries(params)) {
            text = text.replace(new RegExp(\`\\\\{\${param}\\\\}\`, 'g'), value);
        }
    }

    return text;
}

// Export helper functions
if (typeof window !== 'undefined') {
    window.getTranslation = getTranslation;
    window.formatTranslation = formatTranslation;
}
`;

// Write output file
fs.writeFileSync(OUTPUT_FILE, output);

// Generate summary
console.log('\n=== CROSSWORD TRANSLATION COMPILATION COMPLETE ===');
console.log('================================================');
console.log(`Output file: ${OUTPUT_FILE}`);
console.log(`Total languages: ${Object.keys(allTranslations).length}`);
console.log(`Keys per language: ${sortedKeys.length}`);

// Language summary
console.log('\nLanguage Summary:');
for (const [langCode, translations] of Object.entries(allTranslations)) {
    const keyCount = Object.keys(translations).length;
    const langName = {
        en: 'English',
        de: 'German',
        fr: 'French',
        es: 'Spanish',
        it: 'Italian',
        pt: 'Portuguese',
        nl: 'Dutch',
        sv: 'Swedish',
        da: 'Danish',
        no: 'Norwegian',
        fi: 'Finnish'
    }[langCode];
    console.log(`  ${langCode} (${langName}): ${keyCount} keys`);
}

console.log('\n✨ All crossword translations successfully compiled!');