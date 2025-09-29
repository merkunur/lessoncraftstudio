/**
 * Format Translation Fix for Math Worksheet
 * This file provides the missing formatTranslation function
 * Include this in math worksheet.html: <script src="js/format-translation-fix.js"></script>
 */

// Define formatTranslation function that's missing from Math Worksheet
function formatTranslation(key, replacements) {
    // Use the global t() function to get translation
    let translation = typeof t !== 'undefined' ? t(key) : key;

    // Replace placeholders with actual values
    if (replacements) {
        Object.keys(replacements).forEach(placeholder => {
            const regex = new RegExp(`{${placeholder}}`, 'g');
            translation = translation.replace(regex, replacements[placeholder]);
        });
    }

    return translation;
}

// Make it available globally
window.formatTranslation = formatTranslation;

console.log('✅ formatTranslation function loaded from format-translation-fix.js');

// Test if the function works
if (typeof t !== 'undefined') {
    console.log('✅ Translation system detected, formatTranslation ready to use');
} else {
    console.log('⚠️ Translation system (t function) not yet loaded');
}