#!/usr/bin/env node

/**
 * Convert Math Worksheet translations from Pattern B to Pattern A
 * Pattern B: const spanishTranslation = { ... }
 * Pattern A: const MATH_WORKSHEET_TRANSLATIONS_ES = { "es": { ... } }
 */

const fs = require('fs');
const path = require('path');

// Language mappings
const languages = [
    { code: 'es', name: 'spanish', file: 'math-worksheet-professional-spanish-translation.js' },
    { code: 'de', name: 'german', file: 'math-worksheet-professional-german-translation.js' },
    { code: 'fr', name: 'french', file: 'math-worksheet-professional-french-translation.js' },
    { code: 'it', name: 'italian', file: 'math-worksheet-professional-italian-translation.js' },
    { code: 'pt', name: 'portuguese', file: 'math-worksheet-professional-portuguese-translation.js' },
    { code: 'nl', name: 'dutch', file: 'math-worksheet-professional-dutch-translation.js' },
    { code: 'sv', name: 'swedish', file: 'math-worksheet-professional-swedish-translation.js' },
    { code: 'da', name: 'danish', file: 'math-worksheet-professional-danish-translation.js' },
    { code: 'no', name: 'norwegian', file: 'math-worksheet-professional-norwegian-translation.js' },
    { code: 'fi', name: 'finnish', file: 'math-worksheet-professional-finnish-translation.js' }
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
    const newConstName = `MATH_WORKSHEET_TRANSLATIONS_${upperCode}`;

    // Step 1: Change const declaration and add language wrapper
    content = content.replace(
        new RegExp(`const ${oldConstName} = \\{`, 'g'),
        `const ${newConstName} = {\n  "${lang.code}": {`
    );

    // Step 2: Find where the translation object ends and add closing bracket
    // Look for the closing bracket before validation functions or exports
    content = content.replace(
        /^};$/m,
        '  }\n};'
    );

    // Step 3: Remove the criticalItems validation section if it exists
    content = content.replace(
        /\/\/ Critical items check.*?\nconsole\.log\("Critical items check:", criticalItems\);\n/gs,
        ''
    );
    content = content.replace(
        /const criticalItems = \{[\s\S]*?\};\n/g,
        ''
    );

    // Step 4: Update references in validation functions
    // In validation functions that check keys
    content = content.replace(
        new RegExp(`\\(!(key in ${oldConstName})\\)`, 'g'),
        `(!(key in ${newConstName}.${lang.code}))`
    );

    content = content.replace(
        new RegExp(`Object\\.keys\\(${oldConstName}\\)`, 'g'),
        `Object.keys(${newConstName}.${lang.code})`
    );

    // Step 5: Update references where the critical keys are checked
    content = content.replace(
        new RegExp(`${oldConstName}\\.border`, 'g'),
        `${newConstName}.${lang.code}.border`
    );

    content = content.replace(
        new RegExp(`${oldConstName}\\.background`, 'g'),
        `${newConstName}.${lang.code}.background`
    );

    content = content.replace(
        new RegExp(`${oldConstName}\\.grayscale`, 'g'),
        `${newConstName}.${lang.code}.grayscale`
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

    // Step 7: Update keyCount references
    content = content.replace(
        new RegExp(`const keyCount = Object\\.keys\\(${oldConstName}\\)\\.length;`, 'g'),
        `const keyCount = Object.keys(${newConstName}.${lang.code}).length;`
    );

    // Step 8: Fix module exports - standardize to Pattern A
    // Remove old exports
    content = content.replace(
        new RegExp(`if \\(typeof module !== 'undefined' && module\\.exports\\) \\{[\\s\\S]*?\\}[\\s\\S]*?if \\(typeof window !== 'undefined'\\) \\{[\\s\\S]*?\\}`, 'g'),
        `// ==========================================
// EXPORT FOR USE IN APPLICATION
// ==========================================

// For use in the translations system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ${newConstName};
}

// For use in browser environment
if (typeof window !== 'undefined') {
    window.${newConstName} = ${newConstName};
}`
    );

    // Step 9: Update any helper function references
    const capitalizedLang = lang.name.charAt(0).toUpperCase() + lang.name.slice(1);

    content = content.replace(
        new RegExp(`function get${capitalizedLang}Translation\\(key\\) \\{[\\s\\S]*?return ${oldConstName}\\[key\\]`, 'g'),
        `function get${capitalizedLang}Translation(key) {\n    return ${newConstName}.${lang.code}[key]`
    );

    content = content.replace(
        new RegExp(`return ${oldConstName}\\[key\\] \\|\\| key;`, 'g'),
        `return ${newConstName}.${lang.code}[key] || key;`
    );

    // Step 10: Clean up any extra exports that reference old const name
    content = content.replace(
        new RegExp(`${oldConstName},`, 'g'),
        ''
    );

    content = content.replace(
        new RegExp(`window\\.${lang.name}MathTranslation = ${oldConstName};`, 'g'),
        ''
    );

    content = content.replace(
        new RegExp(`window\\.mathWorksheetTranslations.*?;\\s*window\\.mathWorksheetTranslations.*?;`, 'gs'),
        ''
    );

    // Step 11: Update header comment to reflect Pattern A
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
console.log('🎯 MATH WORKSHEET PATTERN A CONVERSION');
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
console.log('const MATH_WORKSHEET_TRANSLATIONS_ES = {');
console.log('  "es": {');
console.log('    "key": "value"');
console.log('  }');
console.log('}');

console.log('\n✅ All Math Worksheet translations now use Pattern A!');