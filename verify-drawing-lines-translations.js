/**
 * DRAWING LINES TRANSLATION VERIFICATION SCRIPT
 * This script verifies complete translation implementation
 */

const fs = require('fs');
const path = require('path');

// Read the HTML file
const htmlFile = path.join(__dirname, 'frontend', 'public', 'worksheet-generators', 'drawing lines.html');
const htmlContent = fs.readFileSync(htmlFile, 'utf8');

// Read the translations file
const translationsFile = path.join(__dirname, 'frontend', 'public', 'worksheet-generators', 'js', 'translations-drawing-lines.js');
const translationsContent = fs.readFileSync(translationsFile, 'utf8');

// Count data-translate attributes
const dataTranslateCount = (htmlContent.match(/data-translate="/g) || []).length;
const dataPlaceholderCount = (htmlContent.match(/data-placeholder-translate="/g) || []).length;
const dataTitleCount = (htmlContent.match(/data-title-translate="/g) || []).length;

// Count t() function calls
const tFunctionCount = (htmlContent.match(/\bt\(['"]/g) || []).length;

// Find hardcoded English text (common patterns)
const hardcodedPatterns = [
    />Settings</,
    />Worksheet</,
    />Generate</,
    />Download</,
    />Page Setup</,
    />Text Tools</,
    />Template & Images</,
    />Image Library</,
    />Border</,
    />Background</,
    />Grayscale</,
    />Letter Portrait/,
    />Letter Landscape/,
    />A4 Portrait/,
    />A4 Landscape/,
    />Square/,
    />Custom</,
    />None</,
    />Loading/,
    />Searching/,
    /showMessage\(['"]/,  // Hardcoded messages
    />Lexend Deca</,
    />Baloo 2</,
    />Nunito</,
    />Quicksand</,
    />Fredoka</,
    />Arial</,
    />Verdana</,
    />curve 1</,
    />curve 2</,
    />diagonal 1</,
    />horizontal 1</,
    />vertical 1</,
    /Name:.*Date:/,
    /FREE VERSION/
];

console.log('=== DRAWING LINES TRANSLATION VERIFICATION ===\n');

console.log('📊 TRANSLATION COVERAGE STATISTICS:');
console.log(`- data-translate attributes: ${dataTranslateCount}`);
console.log(`- data-placeholder-translate: ${dataPlaceholderCount}`);
console.log(`- data-title-translate: ${dataTitleCount}`);
console.log(`- Total translation attributes: ${dataTranslateCount + dataPlaceholderCount + dataTitleCount}`);
console.log(`- t() function calls: ${tFunctionCount}`);
console.log('');

console.log('🔍 CHECKING FOR HARDCODED ENGLISH TEXT:');
let hardcodedFound = [];
hardcodedPatterns.forEach(pattern => {
    const matches = htmlContent.match(pattern);
    if (matches) {
        hardcodedFound.push({
            pattern: pattern.toString(),
            found: matches[0]
        });
    }
});

if (hardcodedFound.length > 0) {
    console.log('❌ Found hardcoded English text:');
    hardcodedFound.forEach(item => {
        console.log(`  - "${item.found}"`);
    });
} else {
    console.log('✅ No obvious hardcoded English text found');
}
console.log('');

// Check specific critical elements
console.log('🎯 CRITICAL ELEMENTS CHECK:');
const criticalChecks = [
    { name: 'Border header', pattern: /data-translate="border"/ },
    { name: 'Background header', pattern: /data-translate="background"/ },
    { name: 'Grayscale checkbox', pattern: /data-translate="grayscale"/ },
    { name: 'Font options', pattern: /data-translate="font_/ },
    { name: 'Page size options', pattern: /data-translate="(letterPortrait|a4Portrait|square)"/ },
    { name: 'Template names', pattern: /template_curve|template_diagonal/ },
    { name: 'Name/Date field', pattern: /nameDatePlaceholder/ },
    { name: 'Watermark text', pattern: /watermarkText/ }
];

criticalChecks.forEach(check => {
    const found = htmlContent.match(check.pattern);
    console.log(`${found ? '✅' : '❌'} ${check.name}: ${found ? 'Found' : 'MISSING'}`);
});
console.log('');

// Check for untranslated select options
console.log('🔍 CHECKING SELECT OPTIONS:');
const selectMatches = htmlContent.match(/<select[^>]*>[\s\S]*?<\/select>/g) || [];
selectMatches.forEach((select, index) => {
    const optionsWithoutTranslate = select.match(/<option[^>]*>(?!.*data-translate)[^<]+<\/option>/g) || [];
    if (optionsWithoutTranslate.length > 0) {
        console.log(`❌ Select #${index + 1} has untranslated options:`);
        optionsWithoutTranslate.forEach(opt => {
            const text = opt.match(/>([^<]+)</)[1];
            console.log(`   - "${text}"`);
        });
    }
});
console.log('');

// Check translation file completeness
console.log('📋 TRANSLATION FILE CHECK:');
const translationKeys = translationsContent.match(/"[a-zA-Z_]+"\s*:/g) || [];
const uniqueKeys = [...new Set(translationKeys.map(k => k.replace(/[":]/g, '').trim()))];
console.log(`- Total unique translation keys: ${uniqueKeys.length}`);
console.log(`- Expected keys (from master template): 162`);
console.log(`- Coverage: ${Math.round((uniqueKeys.length / 162) * 100)}%`);
console.log('');

// Final recommendations
console.log('📝 RECOMMENDATIONS:');
if (dataTranslateCount < 100) {
    console.log('⚠️ Translation attributes count is low. Many elements may be missing translations.');
}
if (tFunctionCount < 30) {
    console.log('⚠️ Low t() function usage. Check JavaScript messages for hardcoded text.');
}
if (hardcodedFound.length > 0) {
    console.log('⚠️ Found hardcoded English text that needs translation attributes.');
}

console.log('\n✅ Verification complete!');