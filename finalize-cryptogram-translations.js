#!/usr/bin/env node
/**
 * Cryptogram Translation Finalizer
 * Combines all language translations with English fallbacks
 * Collects ALL unique keys from ALL languages (not just English)
 */

const fs = require('fs');
const path = require('path');

// Read the extracted translations
const extractedData = JSON.parse(fs.readFileSync('cryptogram-translations-extracted.json', 'utf-8'));

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

// Generate the final JavaScript file
const outputPath = 'frontend/public/worksheet-generators/js/translations-cryptogram.js';

let output = `/**
 * Cryptogram App - Complete Translations
 * Auto-generated - DO NOT EDIT MANUALLY
 * Generated: ${new Date().toISOString()}
 * Languages: ${Object.keys(allTranslations).length}
 * Keys per Language: ${sortedKeys.length} (standardized)
 */

const translations = ${JSON.stringify(allTranslations, null, 2)};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}
`;

// Write the output file
fs.writeFileSync(outputPath, output, 'utf-8');

console.log(`\n✅ Successfully generated: ${outputPath}`);
console.log(`Total languages: ${Object.keys(allTranslations).length}`);
console.log(`Keys per language: ${sortedKeys.length}`);