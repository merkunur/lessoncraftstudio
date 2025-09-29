// Script to add apply-translations.js to all worksheet generator HTML files
const fs = require('fs');
const path = require('path');

const worksheetGeneratorsPath = __dirname;
const applyTranslationsScript = '    <script src="js/apply-translations.js"></script>';

// Get all HTML files in the directory
const htmlFiles = fs.readdirSync(worksheetGeneratorsPath)
    .filter(file => file.endsWith('.html') && !file.includes('test') && !file.includes('debug') && !file.includes('admin') && !file.includes('content-manager'));

let updatedCount = 0;
let alreadyHasCount = 0;

htmlFiles.forEach(file => {
    const filePath = path.join(worksheetGeneratorsPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if apply-translations.js is already included
    if (content.includes('apply-translations.js')) {
        console.log(`✓ ${file} already has apply-translations.js`);
        alreadyHasCount++;
        return;
    }

    // Check if translations.js is included
    if (!content.includes('translations.js')) {
        console.log(`⚠ ${file} doesn't have translations.js, skipping`);
        return;
    }

    // Add apply-translations.js right after translations.js
    const translationsLine = content.match(/.*<script src="js\/translations\.js"><\/script>.*/);
    if (translationsLine) {
        const newContent = content.replace(
            translationsLine[0],
            translationsLine[0] + '\n' + applyTranslationsScript
        );

        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✅ Updated ${file}`);
        updatedCount++;
    } else {
        console.log(`⚠ Couldn't find translations.js line in ${file}`);
    }
});

console.log(`\n📊 Summary:`);
console.log(`   Updated: ${updatedCount} files`);
console.log(`   Already has: ${alreadyHasCount} files`);
console.log(`   Total processed: ${htmlFiles.length} files`);
console.log(`\n✅ Done! Translations will now be automatically applied when pages load with ?locale=de`);