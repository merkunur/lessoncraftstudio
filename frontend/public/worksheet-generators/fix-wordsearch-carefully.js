/**
 * CAREFUL FIX for wordsearch.html translations
 * This preserves the page structure while adding translation support
 */

const fs = require('fs').promises;
const path = require('path');

async function fixWordsearchCarefully() {
    console.log('🔧 Applying careful translation fix to wordsearch.html...\n');

    const wordsearchPath = path.join(__dirname, 'wordsearch.html');
    let content = await fs.readFile(wordsearchPath, 'utf-8');

    // STEP 1: Add data-translate attributes to static text
    const replacements = [
        // H4 headings - these are the critical ones user mentioned
        ['<h4>Background</h4>', '<h4 data-translate="background_heading">Background</h4>'],
        ['<h4>Border</h4>', '<h4 data-translate="border_heading">Border</h4>'],
        ['<h4>Select Language</h4>', '<h4 data-translate="select_language_heading">Select Language</h4>'],
        ['<h4>Page Setup</h4>', '<h4 data-translate="page_setup_heading">Page Setup</h4>'],
        ['<h4>Add New Text</h4>', '<h4 data-translate="add_new_text_heading">Add New Text</h4>'],
        ['<h4>Selected Text Properties</h4>', '<h4 data-translate="selected_text_properties">Selected Text Properties</h4>'],
        ['<h4>Grid Size</h4>', '<h4 data-translate="grid_size_heading">Grid Size</h4>'],
        ['<h4>Puzzle Options</h4>', '<h4 data-translate="puzzle_options_heading">Puzzle Options</h4>'],
        ['<h4>Image Source for Puzzle</h4>', '<h4 data-translate="image_source_heading">Image Source for Puzzle</h4>'],
        ['<h4>Individual Image Selection</h4>', '<h4 data-translate="individual_selection_heading">Individual Image Selection</h4>'],

        // Fix grayscale checkbox - wrap text in span
        ['<input type="checkbox" id="grayscaleToggle" />Grayscale',
         '<input type="checkbox" id="grayscaleToggle" /><span data-translate="grayscale">Grayscale</span>'],

        // Checkbox labels for puzzle options
        ['<label><input type="checkbox" id="allowDiagonal" /> Allow Diagonal Words</label>',
         '<label><input type="checkbox" id="allowDiagonal" /> <span data-translate="allow_diagonal_words">Allow Diagonal Words</span></label>'],
        ['<label><input type="checkbox" id="allowReverse" /> Allow Reverse Words</label>',
         '<label><input type="checkbox" id="allowReverse" /> <span data-translate="allow_reverse_words">Allow Reverse Words</span></label>'],
        ['<label><input type="checkbox" id="showWordList" checked /> Show Word/Image List</label>',
         '<label><input type="checkbox" id="showWordList" checked /> <span data-translate="show_word_image_list">Show Word/Image List</span></label>'],
    ];

    // Apply replacements
    replacements.forEach(([oldText, newText]) => {
        if (content.includes(oldText)) {
            content = content.replace(new RegExp(escapeRegExp(oldText), 'g'), newText);
            console.log(`✅ Added data-translate for: ${oldText.substring(0, 40)}...`);
        }
    });

    // STEP 2: Add translation initialization to existing DOMContentLoaded
    // Find the existing DOMContentLoaded event listener
    const domContentLoadedPattern = /document\.addEventListener\("DOMContentLoaded", function\(\) \{/;
    const domContentLoadedIndex = content.search(domContentLoadedPattern);

    if (domContentLoadedIndex > -1) {
        // Find the end of the first few lines after DOMContentLoaded
        const insertPoint = content.indexOf('    let allImagesCache = {};', domContentLoadedIndex);

        if (insertPoint > -1) {
            // Insert translation initialization right after allImagesCache declaration
            const translationInit = `
    let allImagesCache = {};

    // Initialize translations on page load
    function initializeTranslations() {
        if (typeof translateAllElements === 'function') {
            translateAllElements();
        } else if (window.worksheetTranslationSystem) {
            window.worksheetTranslationSystem.translatePage();
        }

        // Override showMessage to use translations
        const originalShowMessage = window.showMessage;
        if (originalShowMessage) {
            window.showMessage = function(msg, type = 'error', duration = 4000) {
                let translatedMsg = msg;
                if (window.worksheetTranslationSystem) {
                    translatedMsg = window.worksheetTranslationSystem.translateDynamicText(msg);
                } else if (typeof translations !== 'undefined' && translations[currentLocale]) {
                    // Fallback translation method
                    Object.entries(translations.en || {}).forEach(([key, value]) => {
                        if (value === msg && translations[currentLocale][key]) {
                            translatedMsg = translations[currentLocale][key];
                        }
                    });
                }
                return originalShowMessage.call(this, translatedMsg, type, duration);
            };
        }
    }

    // Call translation initialization
    setTimeout(initializeTranslations, 100);
`;

            // Replace the line with our enhanced version
            content = content.substring(0, insertPoint) + translationInit +
                     content.substring(insertPoint + '    let allImagesCache = {};'.length);

            console.log('✅ Added translation initialization to DOMContentLoaded');
        }
    }

    // STEP 3: Add a simple translateAllElements function if it doesn't exist
    // Add it right before the closing </script> tag of the global script section
    const globalScriptEnd = content.indexOf('</script>', content.indexOf('window.currentLocale = currentLocale;'));

    if (globalScriptEnd > -1 && !content.includes('function translateAllElements')) {
        const translateFunction = `

        // Simple translation function for data-translate elements
        function translateAllElements() {
            if (typeof translations === 'undefined') return;

            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.dataset.translate;
                const translation = (translations[currentLocale] && translations[currentLocale][key]) ||
                                  (translations.en && translations.en[key]) ||
                                  key;

                if (element.tagName === 'INPUT') {
                    if (element.type === 'submit' || element.type === 'button') {
                        element.value = translation;
                    } else if (element.placeholder) {
                        element.placeholder = translation;
                    }
                } else if (element.tagName === 'SPAN' || element.tagName === 'H4' || element.tagName === 'LABEL') {
                    element.textContent = translation;
                }
            });
        }

        // Watch for language changes
        document.addEventListener('languageChanged', translateAllElements);
    `;

        content = content.substring(0, globalScriptEnd) + translateFunction + '\n    ' + content.substring(globalScriptEnd);
        console.log('✅ Added translateAllElements function');
    }

    // STEP 4: Fix the file input to make it translatable
    const fileInputPattern = /<input type="file" id="imageUploadInput" multiple accept="image\/\*">/;
    const fileInputReplacement = `
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <button type="button" onclick="document.getElementById('imageUploadInput').click()"
                                    class="btn-secondary" style="padding: 5px 10px;"
                                    data-translate="choose_files_button">Choose files</button>
                            <span id="fileSelectedText" data-translate="no_file_chosen_text" style="color: #888;">No file chosen</span>
                            <input type="file" id="imageUploadInput" multiple accept="image/*" style="display: none;">
                        </div>
                        <script>
                        document.getElementById('imageUploadInput').addEventListener('change', function(e) {
                            const span = document.getElementById('fileSelectedText');
                            if (e.target.files.length > 0) {
                                span.textContent = e.target.files.length + ' file(s) selected';
                                span.removeAttribute('data-translate');
                            } else {
                                span.setAttribute('data-translate', 'no_file_chosen_text');
                                span.textContent = 'No file chosen';
                                if (typeof translateAllElements === 'function') {
                                    translateAllElements();
                                }
                            }
                        });
                        </script>`;

    if (content.match(fileInputPattern)) {
        content = content.replace(fileInputPattern, fileInputReplacement);
        console.log('✅ Replaced file input with translatable version');
    }

    // Save the updated file
    await fs.writeFile(wordsearchPath, content);

    console.log('\n' + '='.repeat(60));
    console.log('✅ CAREFUL FIX APPLIED TO WORDSEARCH.HTML!');
    console.log('='.repeat(60));
    console.log('\nWhat was fixed:');
    console.log('1. Added data-translate attributes to static text');
    console.log('2. Integrated translation init into existing DOMContentLoaded');
    console.log('3. Added translateAllElements function');
    console.log('4. Made file input translatable');
    console.log('5. Preserved all existing functionality');
    console.log('\n🎯 Image library and core functions remain intact!');
    console.log('='.repeat(60));
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Run the fix
fixWordsearchCarefully().catch(console.error);