#!/usr/bin/env node

/**
 * Convert Word Scramble translations from Pattern B to Pattern A
 * Pattern B: const spanishTranslation = { ... }
 * Pattern A: const WORD_SCRAMBLE_TRANSLATIONS_ES = { "es": { ... } }
 */

const fs = require('fs');
const path = require('path');

// Language mappings
const languages = [
    { code: 'es', name: 'spanish', file: 'word-scramble-professional-spanish-translation.js' },
    { code: 'de', name: 'german', file: 'word-scramble-professional-german-translation.js' },
    { code: 'fr', name: 'french', file: 'word-scramble-professional-french-translation.js' },
    { code: 'it', name: 'italian', file: 'word-scramble-professional-italian-translation.js' },
    { code: 'pt', name: 'portuguese', file: 'word-scramble-professional-portuguese-translation.js' },
    { code: 'nl', name: 'dutch', file: 'word-scramble-professional-dutch-translation.js' },
    { code: 'sv', name: 'swedish', file: 'word-scramble-professional-swedish-translation.js' },
    { code: 'da', name: 'danish', file: 'word-scramble-professional-danish-translation.js' },
    { code: 'no', name: 'norwegian', file: 'word-scramble-professional-norwegian-translation.js' },
    { code: 'fi', name: 'finnish', file: 'word-scramble-professional-finnish-translation.js' }
];

function convertFile(lang) {
    const filePath = path.join(__dirname, lang.file);

    if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${lang.file}`);
        return false;
    }

    console.log(`\n📝 Converting ${lang.name} (${lang.code})...`);

    let content = fs.readFileSync(filePath, 'utf8');

    // Extract the translation object keys and values
    const oldConstName = `${lang.name}Translation`;
    const upperCode = lang.code.toUpperCase();
    const newConstName = `WORD_SCRAMBLE_TRANSLATIONS_${upperCode}`;

    // Step 1: Change const declaration and add language wrapper
    content = content.replace(
        new RegExp(`const ${oldConstName} = \\{`, 'g'),
        `const ${newConstName} = {\n  "${lang.code}": {`
    );

    // Step 2: Find where the translation object ends and add closing bracket
    // Look for the closing bracket before validation functions or helper functions
    const firstCloseBracket = content.indexOf('};');
    if (firstCloseBracket !== -1) {
        content = content.substring(0, firstCloseBracket) + '  }\n};' + content.substring(firstCloseBracket + 2);
    }

    // Step 3: Remove the criticalItems validation section if it exists
    content = content.replace(
        /\/\/ Critical items check[\s\S]*?console\.log\("Critical items check:", criticalItems\);/g,
        ''
    );
    content = content.replace(
        /const criticalItems = \{[\s\S]*?\};\s*$/gm,
        ''
    );

    // Step 4: Update references in keyCount
    content = content.replace(
        new RegExp(`const keyCount = Object\\.keys\\(${oldConstName}\\)\\.length;`, 'g'),
        `const keyCount = Object.keys(${newConstName}.${lang.code}).length;`
    );

    // Step 5: Update references in helper functions
    const capitalizedLang = lang.name.charAt(0).toUpperCase() + lang.name.slice(1);

    // Fix get translation function
    content = content.replace(
        new RegExp(`function get${capitalizedLang}Translation\\(key\\) \\{[\\s\\S]*?return ${oldConstName}\\[key\\]`, 'g'),
        `function get${capitalizedLang}Translation(key) {\n    return ${newConstName}.${lang.code}[key]`
    );

    content = content.replace(
        new RegExp(`return ${oldConstName}\\[key\\] \\|\\| key;`, 'g'),
        `return ${newConstName}.${lang.code}[key] || key;`
    );

    // Step 6: Update any bracket notation references
    content = content.replace(
        new RegExp(`${oldConstName}\\["([^"]+)"\\]`, 'g'),
        `${newConstName}.${lang.code}["$1"]`
    );

    content = content.replace(
        new RegExp(`${oldConstName}\\[key\\]`, 'g'),
        `${newConstName}.${lang.code}[key]`
    );

    // Step 7: Fix module exports - standardize to Pattern A
    // Remove complex exports with helper functions
    content = content.replace(
        /if \(typeof module !== 'undefined' && module\.exports\) \{[\s\S]*?module\.exports = \{[\s\S]*?\};\s*\}/g,
        `// ==========================================
// EXPORT FOR USE IN APPLICATION
// ==========================================

// For use in the translations system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ${newConstName};
}`
    );

    // Step 8: Fix window exports
    content = content.replace(
        /if \(typeof window !== 'undefined'\) \{[\s\S]*?\}/g,
        `// For use in browser environment
if (typeof window !== 'undefined') {
    window.${newConstName} = ${newConstName};
}`
    );

    // Step 9: Clean up any remaining old references
    content = content.replace(
        new RegExp(`window\\.${lang.name}WordScrambleTranslation = ${oldConstName};`, 'g'),
        ''
    );

    content = content.replace(
        new RegExp(`window\\.get${capitalizedLang}Translation = get${capitalizedLang}Translation;`, 'g'),
        ''
    );

    content = content.replace(
        new RegExp(`window\\.format${capitalizedLang}Translation = format${capitalizedLang}Translation;`, 'g'),
        ''
    );

    // Step 10: Update header comment to reflect Pattern A
    content = content.replace(
        /Version: 1\.0\.0/,
        'Version: 2.0.0 (Pattern A)'
    );

    // Write the converted file
    fs.writeFileSync(filePath, content, 'utf8');

    // Count keys to verify
    const keyMatches = content.match(/"[^"]+"\s*:/g);
    const keyCount = keyMatches ? keyMatches.length - 1 : 0; // -1 for language code key

    console.log(`✅ Converted to Pattern A: ${newConstName}`);
    console.log(`   Total keys: ${keyCount}`);

    return true;
}

// Main execution
console.log('🎯 WORD SCRAMBLE PATTERN A CONVERSION');
console.log('=====================================');
console.log('Converting from Pattern B to Pattern A...');

let successCount = 0;
let failCount = 0;

languages.forEach(lang => {
    if (convertFile(lang)) {
        successCount++;
    } else {
        failCount++;
    }
});

console.log('\n=====================================');
console.log('📊 CONVERSION RESULTS');
console.log('=====================================');
console.log(`✅ Successfully converted: ${successCount} files`);
if (failCount > 0) {
    console.log(`❌ Failed: ${failCount} files`);
}

console.log('\n🎯 Pattern A Structure:');
console.log('const WORD_SCRAMBLE_TRANSLATIONS_ES = {');
console.log('  "es": {');
console.log('    "key": "value"');
console.log('  }');
console.log('}');

console.log('\n✅ All Word Scramble translations now use Pattern A!');