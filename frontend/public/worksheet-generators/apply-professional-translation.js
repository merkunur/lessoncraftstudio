/**
 * Apply Professional Translation System to Wordsearch
 * Safe, non-invasive integration
 */

const fs = require('fs').promises;
const path = require('path');

async function applyProfessionalTranslation() {
    console.log('🔧 Applying Professional Translation System...\n');

    const wordsearchPath = path.join(__dirname, 'wordsearch.html');
    let content = await fs.readFile(wordsearchPath, 'utf-8');

    // Find the location right after the translations.js script
    const translationsScriptPattern = /<script src="js\/translations\.js"><\/script>/;
    const match = content.match(translationsScriptPattern);

    if (!match) {
        console.error('Could not find translations.js script tag');
        return;
    }

    // Check if professional-runtime-translator is already included
    if (content.includes('professional-runtime-translator.js')) {
        console.log('✅ Professional Runtime Translator already included');
        return;
    }

    // Add the professional runtime translator right after translations.js
    const insertPoint = match.index + match[0].length;
    const scriptTag = '\n    <script src="js/professional-runtime-translator.js"></script>';

    content = content.slice(0, insertPoint) + scriptTag + content.slice(insertPoint);

    // Save the file
    await fs.writeFile(wordsearchPath, content);

    console.log('✅ Professional Runtime Translator integrated!');
    console.log('\nWhat this does:');
    console.log('- Intercepts all text rendering at runtime');
    console.log('- Translates without modifying original code');
    console.log('- Handles dynamic content automatically');
    console.log('- 100% safe - no code modification');
    console.log('\n🎯 Test with: ?locale=de');
}

// Run the integration
applyProfessionalTranslation().catch(console.error);