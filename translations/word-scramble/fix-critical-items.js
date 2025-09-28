#!/usr/bin/env node

/**
 * Fix criticalItems references in Word Scramble translations after Pattern A conversion
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

function fixFile(lang) {
    const filePath = path.join(__dirname, lang.file);

    if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${lang.file}`);
        return false;
    }

    console.log(`📝 Fixing ${lang.name} (${lang.code})...`);

    let content = fs.readFileSync(filePath, 'utf8');

    // Remove criticalItems console.log references
    content = content.replace(/console\.log\("Critical items check:", criticalItems\);/g, '');

    // Remove any remaining criticalItems const declarations
    content = content.replace(/const criticalItems = \{[\s\S]*?\};/gm, '');

    // Clean up empty comment blocks after removal
    content = content.replace(/\/\/ Verify critical user-mentioned items\n\n\n/g, '');

    // Write the fixed file
    fs.writeFileSync(filePath, content, 'utf8');

    console.log(`✅ Fixed ${lang.name} translation`);

    return true;
}

// Main execution
console.log('🔧 FIXING WORD SCRAMBLE CRITICAL ITEMS REFERENCES');
console.log('=====================================');

let successCount = 0;
let failCount = 0;

languages.forEach(lang => {
    if (fixFile(lang)) {
        successCount++;
    } else {
        failCount++;
    }
});

console.log('\n=====================================');
console.log('📊 FIX RESULTS');
console.log('=====================================');
console.log(`✅ Successfully fixed: ${successCount} files`);
if (failCount > 0) {
    console.log(`❌ Failed: ${failCount} files`);
}

console.log('\n✅ All Word Scramble translations cleaned up!');