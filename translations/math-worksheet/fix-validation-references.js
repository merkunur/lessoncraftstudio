#!/usr/bin/env node

/**
 * Fix validation references in Math Worksheet translations after Pattern A conversion
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

function fixFile(lang) {
    const filePath = path.join(__dirname, lang.file);

    if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${lang.file}`);
        return false;
    }

    console.log(`📝 Fixing ${lang.name} (${lang.code})...`);

    let content = fs.readFileSync(filePath, 'utf8');
    const oldConstName = `${lang.name}Translation`;
    const upperCode = lang.code.toUpperCase();
    const newConstName = `MATH_WORKSHEET_TRANSLATIONS_${upperCode}`;

    // Fix 1: Remove duplicate exports
    content = content.replace(/\/\/ For use in browser environment[\s\S]*?window\.mathWorksheetTranslations.*?;[\s\S]*?\}/g, '');

    // Fix 2: Remove references to old const in validation functions
    content = content.replace(
        new RegExp(`if \\(!\\(key in ${oldConstName}\\)\\)`, 'g'),
        `if (!(key in ${newConstName}.${lang.code}))`
    );

    // Fix 3: Remove criticalItems references
    content = content.replace(/console\.log\("Critical items check:", criticalItems\);/g, '');

    // Fix 4: Fix mathematical terminology references
    content = content.replace(
        new RegExp(`${oldConstName}\\.additionOnly`, 'g'),
        `${newConstName}.${lang.code}.additionOnly`
    );
    content = content.replace(
        new RegExp(`${oldConstName}\\.additionAndSubtraction`, 'g'),
        `${newConstName}.${lang.code}.additionAndSubtraction`
    );
    content = content.replace(
        new RegExp(`${oldConstName}\\.numberOfExercises`, 'g'),
        `${newConstName}.${lang.code}.numberOfExercises`
    );
    content = content.replace(
        new RegExp(`${oldConstName}\\.worksheet`, 'g'),
        `${newConstName}.${lang.code}.worksheet`
    );
    content = content.replace(
        new RegExp(`${oldConstName}\\.answerKey`, 'g'),
        `${newConstName}.${lang.code}.answerKey`
    );

    // Fix 5: Clean up duplicate export sections
    content = content.replace(/\/\/ ==========================================\n\/\/ EXPORT FOR USE IN APPLICATION\n\/\/ ==========================================\n\n\/\/ For use in the translations system\n\/\/ ==========================================\n\/\/ EXPORT FOR USE IN APPLICATION\n\/\/ ==========================================/, '// ==========================================\n// EXPORT FOR USE IN APPLICATION\n// ==========================================');

    // Fix 6: Remove window assignments with old translations
    content = content.replace(/};\s*window\.mathWorksheetTranslations.*?= .*?;/g, '}');

    // Fix 7: Clean up any lingering old const references
    content = content.replace(
        new RegExp(`${oldConstName}`, 'g'),
        `${newConstName}.${lang.code}`
    );

    // Write the fixed file
    fs.writeFileSync(filePath, content, 'utf8');

    console.log(`✅ Fixed ${lang.name} translation`);

    return true;
}

// Main execution
console.log('🔧 FIXING MATH WORKSHEET VALIDATION REFERENCES');
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

console.log('\n✅ All Math Worksheet translations cleaned up!');