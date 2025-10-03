/**
 * Universal Translation Application System
 * Automatically applies translations from translations.js to all UI elements
 */

// Translation function that gets text from translations.js
function t(key, defaultValue) {
    if (!window.translations || !window.currentLocale) {
        return defaultValue || key;
    }

    const locale = window.currentLocale || 'en';
    const localeTranslations = window.translations[locale];

    if (!localeTranslations) {
        return defaultValue || key;
    }

    return localeTranslations[key] || defaultValue || key;
}

// Apply translations to all UI elements
function applyTranslations() {
    const locale = window.currentLocale || 'en';

    console.log(`[applyTranslations] Applying ${locale} translations...`);

    if (!window.translations || !window.translations[locale]) {
        console.warn(`[applyTranslations] No translations found for locale: ${locale}`);
        return;
    }

    // First, apply data-translate attributes
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = window.translations[locale][key];
        if (translation) {
            if (element.tagName === 'INPUT' && element.type === 'button') {
                element.value = translation;
            } else {
                element.textContent = translation;
            }
        }
    });

    // Apply placeholder translations
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const translation = window.translations[locale][key];
        if (translation) {
            element.placeholder = translation;
        }
    });

    // Apply title translations
    document.querySelectorAll('[data-translate-title]').forEach(element => {
        const key = element.getAttribute('data-translate-title');
        const translation = window.translations[locale][key];
        if (translation) {
            element.title = translation;
        }
    });

    // Apply translations to all text nodes
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                // Skip script and style nodes
                if (node.parentNode && ['SCRIPT', 'STYLE'].includes(node.parentNode.tagName)) {
                    return NodeFilter.FILTER_REJECT;
                }
                // Skip empty text nodes
                if (!node.textContent.trim()) {
                    return NodeFilter.FILTER_SKIP;
                }
                // Skip if parent has data-translate attribute (already handled)
                if (node.parentNode && node.parentNode.hasAttribute &&
                    node.parentNode.hasAttribute('data-translate')) {
                    return NodeFilter.FILTER_SKIP;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    // Translation mappings
    const textMappings = {
        // Headers
        'Sudoku Settings': 'sudokuSettings',
        'Word Search Settings': 'wordSearchSettings',
        'Worksheet Settings': 'worksheetSettings',
        'Coloring Designer': 'coloringDesigner',
        'Coloring Settings': 'coloringSettings',
        'Math Puzzle Settings': 'mathPuzzleSettings',
        'Math Worksheet Settings': 'mathWorksheet',
        'Addition Settings': 'additionSettings',
        'Alphabet Train Settings': 'trainSettings',
        'Maker': 'maker',

        // Accordion sections
        'Page & Scene': 'pageAndScene',
        'Text Tools': 'textTools',
        'Puzzle Settings': 'puzzleSettings',
        'Image Library': 'imageLibrary',
        'Upload Custom Images': 'uploadCustomImages',
        'Sudoku for Kids': 'sudokuForKids',
        'Exercise Configuration': 'exerciseConfiguration',
        'Language Settings': 'languageSettings',
        'Assignments & Configuration': 'assignmentsConfiguration',

        // Labels
        'Language:': 'language',
        'Page Size:': 'pageSize',
        'Paper Size:': 'paperSize',
        'Width (px):': 'widthPx',
        'Height (px):': 'heightPx',
        'Width:': 'width',
        'Height:': 'height',
        'Background Theme:': 'backgroundTheme',
        'Border Theme:': 'borderTheme',
        'Background Opacity:': 'backgroundOpacity',
        'Border Opacity:': 'borderOpacity',
        'Fallback Color:': 'fallbackColor',
        'Page Color:': 'pageColor',
        'Grid Size:': 'gridSize',
        'Rows:': 'rows',
        'Columns:': 'columns',
        'Number of blank cells:': 'numberOfBlankCells',
        'Puzzle Complexity:': 'puzzleComplexity',
        'Grid Style:': 'gridStyle',
        'Image Size:': 'imageSize',
        'Content:': 'content',
        'Color:': 'color',
        'Size:': 'size',
        'Font:': 'font',
        'Outline Color:': 'outlineColor',
        'Outline Width:': 'outlineWidth',
        'Theme:': 'theme',
        'Template:': 'template',
        'Mode:': 'mode',
        'Difficulty:': 'difficulty',

        // Buttons
        'Apply Size': 'applySize',
        'Add Text': 'addText',
        'Generate': 'generate',
        'Generate Worksheet': 'generateWorksheet',
        'Generate Answer Key': 'generateAnswerKey',
        'Download': 'download',
        'Clear All': 'clearAll',
        'Worksheet': 'worksheet',
        'Answer Key': 'answerKey',

        // Select options
        'Easy': 'easy',
        'Medium': 'medium',
        'Hard': 'hard',
        'Very Easy': 'veryEasy',
        'None': 'none',
        'Custom': 'custom',
        'Small': 'small',
        'Large': 'large',
        'Solid Lines': 'solidLines',
        'Dotted Lines': 'dottedLines',
        'Rounded Corners': 'roundedCorners',

        // Messages and notifications
        'Loading images...': 'loadingImages',
        'Loading theme...': 'loadingTheme',
        'Your uploaded images will appear here.': 'yourUploadedImagesWillAppearHere',
        'Select a theme for backgrounds.': 'selectThemeForBackgrounds',
        'Select a theme for borders.': 'selectThemeToSeeBorders',
        'Choose files': 'chooseFiles',
        'No file chosen': 'noFileChosen',
        'Align Selected': 'alignSelected',
        'Align to Page': 'alignToPage',

        // CRITICAL BINGO MAPPINGS
        'Bingo Card Settings': 'bingoCardSettings',
        'Rows (3–5):': 'rowsRange',
        'Columns (3–5):': 'columnsRange',
        'Number of Cards (1–10):': 'numberOfCardsRange',
        'Card Cell Fill:': 'cardCellFill',
        'Chip Fill:': 'chipFill',
        'Use custom selection (below)': 'useCustomSelectionBelow',

        // File upload labels
        'Choose Files': 'chooseFilesBtn',
        'Select image(s) to upload:': 'selectImagesToUpload',
        'Select images to upload:': 'selectImagesToUpload',
        'Your Uploaded Images (This Session):': 'yourUploadedImages',

        // Image selection
        'Selected for custom call-outs:': 'selectedForCustomCallOuts',
        'Available Images (Click to select for custom call-outs):': 'availableImagesClickToSelectForCallouts',
        'Selected Custom Images:': 'selectedCustomImages',
        'All Themes': 'allThemes',
        'Select Theme:': 'selectTheme',
        'Search Images:': 'searchImages',

        // Tab labels
        'Cards + Chips': 'cardsAndChips',
        'Call-outs': 'callOuts',

        // Exercise settings
        'Number of Exercises (1–10):': 'numberOfExercises110',
        'Images per Exercise:': 'imagesPerExercise',
        'Image Mode:': 'imageMode',
        'Question Type:': 'questionType',
        'Worksheet Theme (if not picking images):': 'worksheetThemeIfNotPicking',
        'Select Theme for Dictionary:': 'selectThemeForDictionary',

        // Options
        'Identical Images': 'identicalImages',
        'Different Images': 'differentImages',
        'Circle the small one': 'circleTheSmallOne',
        'Circle the big one': 'circleTheBigOne',
        'Circle the medium one': 'circleTheMediumOne',
        'Number 1-2-3 (small to big)': 'numberSmallToBig',
        'Number 1-2-3 (big to small)': 'numberBigToSmall',

        // Page sizes
        'Default Worksheet (800x1000)': 'defaultWorksheet',
        'Square (1200×1200)': 'square1200',
        'Letter Portrait (8.5×11")': 'letterPortrait',
        'Letter Landscape (11×8.5")': 'letterLandscape',
        'A4 Portrait (210×297mm)': 'a4Portrait',
        'A4 Landscape (297×210mm)': 'a4Landscape',

        // Actions
        'Bring Forward': 'bringForward',
        'Send Backward': 'sendBackward',
        'Flip Horizontal': 'flipHorizontal',
        'Flip Vertical': 'flipVertical',
        'Select Tool': 'selectTool',
        'Drawing Tool': 'drawingTool',

        // Download options
        'Worksheet (JPEG)': 'worksheetJpeg',
        'Answer Key (JPEG)': 'answerKeyJpeg',
        'Worksheet (PDF)': 'worksheetPdf',
        'Answer Key (PDF)': 'answerKeyPdf',
        'Call-out (JPEG)': 'callOutJpeg',
        'Call-out (PDF)': 'callOutPdf',

        // Settings sections
        'Page Setup': 'pageSetup',
        'Configuration': 'configuration',
        'Optional Settings': 'optionalSettings',
        'Exercise Settings': 'exerciseSettings',
        'Classroom Helpers': 'classroomHelpers',
        'Design Options': 'designOptions',
        'Actions': 'actions',

        // Admin interface
        'Image Assets': 'imageAssets',
        'Image Themes (Local Management)': 'imageThemesLocalManagement',
        'Border Images': 'borderImages',
        'Border Themes (Local Management)': 'borderThemesLocalManagement',
        'Background Images': 'backgroundImages',
        'Background Themes (Local Management)': 'backgroundThemesLocalManagement',
        'Train Templates': 'trainTemplates',
        'Train Template Themes': 'trainTemplateThemes',
        'Worksheet Templates': 'worksheetTemplates',
        'Worksheet Template Themes': 'worksheetTemplateThemes',

        // Status messages
        'No images selected': 'noImagesSelected',
        'Select images from the library below': 'selectImagesFromLibraryBelow',
        'Available Images (Click to add)': 'availableImagesClickToAdd',
        'Selected Images (Click to remove)': 'selectedImagesClickToRemove',
        'Available Images:': 'availableImages',
        'Selected Images:': 'selectedImages',

        // Common buttons
        'Edit': 'edit',
        'Delete': 'delete',
        'Save': 'save',
        'Save Changes': 'saveChanges',
        'Cancel': 'cancel',
        'Refresh': 'refresh',
        'Export HTML': 'exportHtml',
        'Preview Full Page': 'previewFullPage',
        'Add PDF': 'addPdf',
        'Download as JPEG': 'downloadAsJpeg',
        'Download as PDF': 'downloadAsPdf',

        // EXACT STRINGS FROM SCREENSHOTS
        'Page Dimensions': 'pageDimensions',
        'Add "Name: ___"': 'addNameLine',
        'Add Handwriting Lines': 'addHandwritingLines',
        'Drawing Tools': 'drawingTools',
        'Available Images (Click to Add):': 'availableImagesClickToAdd',
        'Select a theme or type to search all images.': 'selectThemeOrTypeToSearchAll',
        'Your Uploaded Images (Click to Add):': 'yourUploadedImagesClickToAdd',

        // MORE CRITICAL MISSING STRINGS
        'Addition Only': 'additionOnly',
        'Image Selection Method:': 'imageSelectionMethod',
        'Select Images Individually': 'selectImagesIndividually',
        'Use Full Theme': 'useFullTheme',
        'Selected Images Pool:': 'selectedImagesPool',
        'Select images from the library.': 'selectImagesFromTheLibrary',
        'Filter Library By Theme:': 'filterLibraryByTheme',
        'Custom Images': 'customImages',
        'Your Uploaded Images (Click to use):': 'yourUploadedImagesClickToUse',
        'Allow negative results': 'allowNegativeResults',
        'Min value:': 'minValue',
        'Max value:': 'maxValue',
        'Show Answers in Worksheet': 'showAnswersInWorksheet',

        // Word Scramble and Settings
        'Word Scramble': 'wordScramble',
        'Settings': 'settings',
        'Select Language': 'selectLanguage',
        'Image names and themes will be displayed in the selected language.': 'imageNamesAndThemesWillBeDisplayed',
        'Select 1 to 4 images to be the hidden objects. The grid will be filled with these images plus others from the selected theme.': 'selectToBeHiddenObjects',
        'Image Theme:': 'imageTheme',
        'Selected:': 'selected',
        'Clear Selection': 'clearSelection',
        'Hidden Object Questions': 'hiddenObjectQuestions',
        'Select images from the library above.': 'selectImagesFromTheLibraryAbove',
        'Your Uploaded Images (This Session)': 'yourUploadedImagesThisSession',

        // Dynamic messages
        'Text added.': 'textAdded',
        'Could not load themes.': 'couldNotLoadThemes',
        'Error loading themes.': 'errorLoadingThemes',
        'Please generate a worksheet first.': 'pleaseGenerateWorksheetFirst',
        'Please generate content first.': 'pleaseGenerateContentFirst',
        'Preparing PDF...': 'preparingPdf',
        'Preparing JPEG...': 'preparingJpeg',
        'Preparing ZIP file...': 'preparingZipFile',
        'Download started!': 'downloadStarted',
        'Download Initiated!': 'downloadInitiated',
        'PDF Downloaded!': 'pdfDownloaded',
        'PDF downloaded!': 'pdfDownloaded',
        'JPEG download initiated!': 'jpegDownloadInitiated',
        'ZIP Download Initiated!': 'zipDownloadInitiated',
        'Answer Key Generated.': 'answerKeyGenerated',
        'Worksheet generated successfully!': 'worksheetGeneratedSuccessfully',
        'Bingo worksheet generated!': 'bingoWorksheetGenerated',
        'Form cleared.': 'formCleared',
        'Canvas is empty.': 'canvasIsEmpty',
        'Error creating PDF.': 'errorCreatingPdf',
        'Error preparing JPEG.': 'errorPreparingJpeg',

        // Admin panel buttons
        'View': 'view',
        'Edit': 'edit',
        'Delete': 'delete',
        'Cancel': 'cancel',
        'Save': 'save',
        'Save Changes': 'saveChanges',
        'Upload': 'upload',
        'Sync': 'sync',
        'Clear Cache': 'clearCache',
        'Batch Edit': 'batchEdit',
        'Execute': 'execute',

        // Admin panel tabs
        'Image Assets': 'imageAssets',
        'Borders': 'borders',
        'Backgrounds': 'backgrounds',
        'Train Templates': 'trainTemplates',
        'Worksheet Templates': 'worksheetTemplates',
        'All Files': 'allFiles',
        'Themes': 'themes',

        // MORE MISSING TRANSLATIONS FROM SCREENSHOTS
        'Background': 'background',
        'Border': 'border',
        'Ohne': 'ohneOption',
        'Puzzle Configuration': 'puzzleConfiguration',
        'Language Selection': 'languageSelection',
        'Page Setup': 'pageSetup',
        'Add New Text': 'addNewText',
        'Selected Text Properties': 'selectedTextProperties',
        'Worksheet Configuration': 'worksheetConfiguration',
        'Number of Exercises': 'numberOfExercises',
        'Number of Exercises (1-8):': 'numberOfExercisesRange',
        'Number of Exercises (1-10):': 'numberOfExercisesRange110',
        'Individual Images': 'individualImages',
        'Theme for Worksheet': 'themeForWorksheet',
        'Theme for Dictionary': 'themeForDictionary',
        'All Themes (for search)': 'allThemesForSearch',
        'Pick 1-5 images': 'pickImages',
        'selected': 'selected',
        '0 / 5 selected': '0 / 5 ausgewählt',
        'Relations': 'relations',
        'Symbol Display': 'symbolDisplay',
        'Illustrations': 'illustrations',
        'Normal Symbols (>, <, =)': 'normalSymbols',
        'show symbols for circling': 'showSymbolsForCircling',
        'Include Name/Date Fields': 'includeNameDateFields',
        'Include Exercise Numbers': 'includeExerciseNumbers',
        'Select image(s) to upload:': 'selectImagesToUpload',
        'Max number to subtract FROM (2-20):': 'maxNumberToSubtractFrom',
        'Use child-friendly box for expressions': 'useChildFriendlyBox',
        'Exercise Configuration': 'exerciseConfiguration',
        'Select a theme to see borders.': 'selectThemeToSeeBorders',
        'Outline (0-10):': 'outline010',
        'Bildergalerie': 'bildergalerie',
        'Eigene Bilder hochladen': 'eigenebilderhochladen',

        // MORE MISSING TRANSLATIONS FROM COMPREHENSIVE SEARCH
        'Select Theme': 'selectTheme',
        'Select Theme:': 'selectTheme',
        'Search Images': 'searchImages',
        'Search Images:': 'searchImages',
        'Available Images': 'availableImages',
        'Available Images:': 'availableImages',
        'Selected Images for Problems': 'selectedImagesForProblems',
        'Selected Images for Problems:': 'selectedImagesForProblems',
        'Your Uploaded Images (This Session)': 'yourUploadedImagesThisSession',
        'Your Uploaded Images (This Session):': 'yourUploadedImagesThisSession',
        'Selected for custom call-outs': 'selectedForCustomCallOuts',
        'Selected Custom Images': 'selectedCustomImages',
        'Selected Custom Images:': 'selectedCustomImages',
        'Click to select': 'clickToSelect',
        'Click to Add': 'clickToAdd',
        'Click to add': 'clickToAdd',
        'Click to remove': 'clickToRemove',
        'Selected': 'selectedCount',
        'Selected: 0 / 5': '0 / 5 ausgewählt',
        'Selected: 0 images': '0 Bilder ausgewählt',
        'Selected: 0/11': '0/11 ausgewählt',
        'Selected Images': 'selectedImages',
        'Selected Images:': 'selectedImages',
        'Selected Image for Puzzle': 'selectedImageForPuzzle',
        'Selected Image for Puzzle:': 'selectedImageForPuzzle',
        'Number of Puzzles': 'numberOfPuzzles',
        'Number of Puzzles (1-10):': 'numberOfPuzzlesRange',
        'Difficulty (Number of Clues)': 'difficultyNumberOfClues',
        'No clues': 'noClues',
        'Easy (1/2)': 'easyClues',
        'Normal (1/4)': 'normalClues',
        'Tough (1/6)': 'toughClues',
        'Letter Case': 'letterCase',
        'Uppercase': 'uppercase',
        'Lowercase': 'lowercase',
        'Letter Colors': 'letterColors',
        'Color Coded (Vowel/Consonant)': 'colorCoded',
        'All Black': 'allBlack',
        'Exclude Letters from Clues': 'excludeLettersFromClues',
        'Exclude Letters from Clues:': 'excludeLettersFromClues',
        'e.g. AEIOU': 'excludeLettersPlaceholder',
        'Include Puzzle Numbers': 'includePuzzleNumbers',
        'Select Theme for Dictionary': 'selectThemeForDictionary',
        'Select Theme for Dictionary:': 'selectThemeForDictionary',
        'Available Images (Click to select for custom call-outs)': 'availableImagesClickToSelect',
        '(for individual mode)': 'forIndividualMode',
        'Eigenschaften des ausgewählten Texts': 'eigenschaftenDesAusgewähltenTexts',
        'Neuen Text hinzufügen': 'neuentExtHinzufügen',
    };

    // Walk through all text nodes and translate
    const nodesToUpdate = [];
    let node;
    while (node = walker.nextNode()) {
        const text = node.textContent.trim();
        if (textMappings[text]) {
            nodesToUpdate.push({
                node: node,
                oldText: text,
                newText: t(textMappings[text])
            });
        }
    }

    // Apply updates
    nodesToUpdate.forEach(({node, oldText, newText}) => {
        if (newText && newText !== oldText) {
            // Preserve whitespace around the text
            node.textContent = node.textContent.replace(oldText, newText);
            console.log(`Translated: "${oldText}" → "${newText}"`);
        }
    });

    // Translate placeholders
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(element => {
        const placeholder = element.placeholder;
        const placeholderMappings = {
            'Title, Instructions...': 'titleInstructions',
            'Worksheet Title...': 'worksheetTitle',
            'e.g., apple, car': 'searchPlaceholder',
            'Search images...': 'searchImages',
            'Search images (e.g., apple)': 'searchImagesPlaceholder',
            'Hello!': 'helloPlaceholder',
            'Search...': 'searchDotDotDot',
            'Search blog posts...': 'searchBlogPosts',
            'Width': 'widthPx',
            'Height': 'heightPx',
            'Choose files': 'chooseFiles',
            'No file chosen': 'noFileChosen'
        };

        if (placeholderMappings[placeholder]) {
            const translatedText = t(placeholderMappings[placeholder]);
            if (translatedText && translatedText !== placeholderMappings[placeholder]) {
                element.placeholder = translatedText;
                console.log(`Translated placeholder: "${placeholder}" → "${translatedText}"`);
            }
        }
    });

    // Translate data-translate attributes
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translatedText = t(key);
        if (translatedText && translatedText !== key) {
            if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
                if (element.type === 'submit' || element.type === 'button') {
                    element.textContent = translatedText;
                } else {
                    element.value = translatedText;
                }
            } else {
                element.textContent = translatedText;
            }
        }
    });

    console.log(`[applyTranslations] Completed ${nodesToUpdate.length} translations for ${locale}`);
}

// Apply translations multiple times to catch dynamically loaded content
function applyTranslationsWithRetry() {
    // Initial application
    applyTranslations();

    // Apply again after short delays to catch dynamic content
    setTimeout(applyTranslations, 500);
    setTimeout(applyTranslations, 1000);
    setTimeout(applyTranslations, 2000);
}

// Auto-apply translations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTranslationsWithRetry);
} else {
    applyTranslationsWithRetry();
}

// Re-apply when accordions are clicked
document.addEventListener('click', (e) => {
    if (e.target && (e.target.classList.contains('accordion-button') || e.target.classList.contains('accordion-header'))) {
        setTimeout(applyTranslations, 100);
    }
});

// Re-apply on mutation events (for dynamic content)
const observer = new MutationObserver(() => {
    // Debounce to avoid too many calls
    if (observer.timeout) clearTimeout(observer.timeout);
    observer.timeout = setTimeout(applyTranslations, 300);
});

// Start observing after page loads
setTimeout(() => {
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: false,
        attributes: false
    });
}, 1000);

// Listen for custom events
document.addEventListener('translationsLoaded', applyTranslations);
document.addEventListener('localeChanged', applyTranslations);

// Wrap showMessage function to translate messages
if (window.showMessage) {
    const originalShowMessage = window.showMessage;
    window.showMessage = function(message, type, duration) {
        // Try to translate the message
        const messageKey = Object.keys(window.translations[window.currentLocale] || {}).find(key =>
            window.translations[window.currentLocale][key] === message
        );

        // If we find a translation key, use the translated version
        const translatedMessage = messageKey ? t(messageKey) : message;

        // Also check if message matches any English text that has a translation
        const englishToKey = {
            'Text added.': 'textAdded',
            'Could not load themes.': 'couldNotLoadThemes',
            'Error loading themes.': 'errorLoadingThemes',
            'Please generate a worksheet first.': 'pleaseGenerateWorksheetFirst',
            'Please generate content first.': 'pleaseGenerateContentFirst',
            'Preparing PDF...': 'preparingPdf',
            'Preparing JPEG...': 'preparingJpeg',
            'Preparing ZIP file...': 'preparingZipFile',
            'Download started!': 'downloadStarted',
            'Download Initiated!': 'downloadInitiated',
            'PDF Downloaded!': 'pdfDownloaded',
            'PDF downloaded!': 'pdfDownloaded',
            'JPEG download initiated!': 'jpegDownloadInitiated',
            'ZIP Download Initiated!': 'zipDownloadInitiated',
            'Answer Key Generated.': 'answerKeyGenerated',
            'Worksheet generated successfully!': 'worksheetGeneratedSuccessfully',
            'Bingo worksheet generated!': 'bingoWorksheetGenerated',
            'Form cleared.': 'formCleared',
            'Canvas is empty.': 'canvasIsEmpty',
            'Error creating PDF.': 'errorCreatingPdf',
            'Error preparing JPEG.': 'errorPreparingJpeg',
            'Background added.': 'backgroundAdded',
            'Border added.': 'borderAdded',
        };

        const finalMessage = englishToKey[message] ? t(englishToKey[message]) : translatedMessage;

        // Call original function with translated message
        originalShowMessage(finalMessage, type, duration);
    };
}

// Export for manual use
window.applyTranslations = applyTranslations;
window.t = t;

console.log('[apply-translations.js] Loaded for locale:', window.currentLocale);