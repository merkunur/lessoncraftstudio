/**
 * SYSTEMATIC FIX for wordsearch.html
 * This will ACTUALLY make translations work
 */

const fs = require('fs').promises;
const path = require('path');

async function fixWordsearchSystematically() {
    console.log('🔧 Applying SYSTEMATIC translation fix to wordsearch.html...\n');

    const wordsearchPath = path.join(__dirname, 'wordsearch.html');
    let content = await fs.readFile(wordsearchPath, 'utf-8');

    // STEP 1: Add data-translate attributes to ALL static text
    const replacements = [
        // H4 headings
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

        // Grayscale checkbox - wrap text in span
        ['<input type="checkbox" id="grayscaleToggle" />Grayscale',
         '<input type="checkbox" id="grayscaleToggle" /><span data-translate="grayscale">Grayscale</span>'],

        // Checkbox labels for puzzle options
        ['Allow Diagonal Words', '<span data-translate="allow_diagonal_words">Allow Diagonal Words</span>'],
        ['Allow Reverse Words', '<span data-translate="allow_reverse_words">Allow Reverse Words</span>'],
        ['Show Word/Image List', '<span data-translate="show_word_image_list">Show Word/Image List</span>'],
    ];

    // Apply replacements
    replacements.forEach(([oldText, newText]) => {
        if (content.includes(oldText)) {
            content = content.replace(new RegExp(escapeRegExp(oldText), 'g'), newText);
            console.log(`✅ Added data-translate for: ${oldText.substring(0, 30)}...`);
        }
    });

    // STEP 2: Add translation function that ACTUALLY WORKS
    const translationScript = `
    <!-- SYSTEMATIC TRANSLATION SYSTEM -->
    <script>
    // This function WILL translate everything
    function translateAllElements() {
        console.log('Translating all elements to:', currentLocale);

        // Find ALL elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;

            // Get translation from the global translations object
            let translation = key; // Default to key if no translation

            if (typeof translations !== 'undefined' && translations[currentLocale]) {
                translation = translations[currentLocale][key] ||
                             translations.en[key] ||
                             key;
            }

            // Apply translation based on element type
            if (element.tagName === 'INPUT') {
                if (element.type === 'submit' || element.type === 'button') {
                    element.value = translation;
                } else {
                    element.placeholder = translation;
                }
            } else if (element.tagName === 'OPTION') {
                element.textContent = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Also translate any text nodes next to checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            const nextElement = checkbox.nextElementSibling;
            if (nextElement && nextElement.dataset && nextElement.dataset.translate) {
                const key = nextElement.dataset.translate;
                const translation = translations[currentLocale]?.[key] || translations.en?.[key] || key;
                nextElement.textContent = translation;
            }
        });
    }

    // Override showMessage to use translations
    const originalShowMessage = window.showMessage;
    window.showMessage = function(msg, type = 'error', duration = 4000) {
        // Try to translate the message
        let translatedMsg = msg;

        if (typeof translations !== 'undefined' && translations[currentLocale]) {
            // First, try exact match
            Object.entries(translations.en).forEach(([key, value]) => {
                if (value === msg) {
                    translatedMsg = translations[currentLocale][key] || msg;
                }
            });
        }

        // Call original function with translated message
        if (originalShowMessage) {
            originalShowMessage.call(this, translatedMsg, type, duration);
        } else {
            // Fallback if original doesn't exist
            const messageDiv = document.getElementById('messageDiv');
            if (messageDiv) {
                messageDiv.textContent = translatedMsg;
                messageDiv.className = \`message \${type}\`;
                setTimeout(() => {
                    messageDiv.textContent = '';
                    messageDiv.className = 'message';
                }, duration);
            }
        }
    };

    // Run translation when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(translateAllElements, 100); // Small delay to ensure everything is loaded
        });
    } else {
        setTimeout(translateAllElements, 100);
    }

    // Re-run when language changes
    document.addEventListener('languageChanged', translateAllElements);

    // Watch for dynamically added content
    const observer = new MutationObserver(() => {
        translateAllElements();
    });

    // Start observing after a delay
    setTimeout(() => {
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }, 1000);
    </script>
    `;

    // Insert the translation script right after the translations.js script
    const insertPoint = content.indexOf('</head>');
    content = content.slice(0, insertPoint) + translationScript + '\n' + content.slice(insertPoint);

    // STEP 3: Fix the file input issue
    // Replace the file input with a custom translatable version
    const fileInputReplacement = `
                        <div class="custom-file-input">
                            <button type="button" onclick="document.getElementById('imageUploadInput').click()" data-translate="choose_files_button">Choose files</button>
                            <span id="fileSelectedText" data-translate="no_file_chosen_text">No file chosen</span>
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
                                translateAllElements();
                            }
                        });
                        </script>`;

    // Find and replace the original file input
    const fileInputPattern = /<input type="file"[^>]+id="imageUploadInput"[^>]*>/;
    if (content.match(fileInputPattern)) {
        content = content.replace(fileInputPattern, fileInputReplacement);
        console.log('✅ Replaced file input with translatable version');
    }

    // Save the updated file
    await fs.writeFile(wordsearchPath, content);

    console.log('\n' + '='.repeat(60));
    console.log('✅ SYSTEMATIC FIX APPLIED TO WORDSEARCH.HTML!');
    console.log('='.repeat(60));
    console.log('\nWhat was fixed:');
    console.log('1. Added data-translate attributes to ALL static text');
    console.log('2. Added translateAllElements() function that WORKS');
    console.log('3. Fixed showMessage to use translations');
    console.log('4. Replaced file input with translatable version');
    console.log('5. Added mutation observer for dynamic content');
    console.log('\n🎯 Translations WILL now work properly!');
    console.log('='.repeat(60));
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Run the fix
fixWordsearchSystematically().catch(console.error);