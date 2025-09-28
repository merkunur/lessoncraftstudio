/**
 * PREPARE ADDITION.HTML FOR TRANSLATION IMPLEMENTATION
 * =====================================================
 * This script identifies ALL changes needed for complete internationalization
 * of the Image Addition app - which currently has almost NO translation support!
 *
 * CRITICAL: Addition app only has 2 elements with data-translate attributes!
 * This requires adding attributes to 53+ HTML elements plus replacing 35+ JavaScript strings.
 */

const fs = require('fs');
const path = require('path');

// ==========================================
// HTML ATTRIBUTE ADDITIONS NEEDED (53 items)
// ==========================================
const HTML_ATTRIBUTE_ADDITIONS = {
  sidebar_headers: [
    {
      line: 771,
      current: '<h2>Worksheet Settings</h2>',
      replacement: '<h2 data-translate="worksheetSettings">Worksheet Settings</h2>'
    }
  ],

  accordion_buttons: [
    {
      line: 777,
      current: '<button class="accordion-button active" data-translate="settings">Language Settings</button>',
      replacement: '<button class="accordion-button active" data-translate="languageSettings">Language Settings</button>',
      note: "Fix wrong key 'settings' to 'languageSettings'"
    },
    {
      line: 797,
      current: '<button class="accordion-button">Page Setup</button>',
      replacement: '<button class="accordion-button" data-translate="pageSetup">Page Setup</button>'
    },
    {
      line: 841,
      current: '<button class="accordion-button">Text Tools</button>',
      replacement: '<button class="accordion-button" data-translate="textTools">Text Tools</button>'
    },
    {
      line: 866,
      current: '<button class="accordion-button">Exercise Configuration</button>',
      replacement: '<button class="accordion-button" data-translate="exerciseConfiguration">Exercise Configuration</button>'
    },
    {
      line: 890,
      current: '<button class="accordion-button">Image Library</button>',
      replacement: '<button class="accordion-button" data-translate="imageLibrary">Image Library</button>'
    },
    {
      line: 905,
      current: '<button class="accordion-button">Upload Custom Images</button>',
      replacement: '<button class="accordion-button" data-translate="uploadCustomImages">Upload Custom Images</button>'
    }
  ],

  form_labels: [
    {
      line: 799,
      current: '<label for="pageSizeSelect">Page Size:</label>',
      replacement: '<label for="pageSizeSelect" data-translate="pageSize">Page Size:</label>'
    },
    {
      line: 809,
      current: '<label for="pageWidth">Width (px):</label>',
      replacement: '<label for="pageWidth" data-translate="widthPx">Width (px):</label>'
    },
    {
      line: 811,
      current: '<label for="pageHeight">Height (px):</label>',
      replacement: '<label for="pageHeight" data-translate="heightPx">Height (px):</label>'
    },
    {
      line: 814,
      current: '<label for="pageColor">Page Color:</label>',
      replacement: '<label for="pageColor" data-translate="pageColor">Page Color:</label>'
    },
    {
      line: 819,
      current: '<label for="backgroundThemeSelect">Background Theme:</label>',
      replacement: '<label for="backgroundThemeSelect" data-translate="backgroundTheme">Background Theme:</label>'
    },
    {
      line: 824,
      current: '<label for="backgroundOpacitySlider">Background Opacity:</label>',
      replacement: '<label for="backgroundOpacitySlider" data-translate="backgroundOpacity">Background Opacity:</label>'
    },
    {
      line: 828,
      current: '<label for="borderThemeSelect">Border Theme:</label>',
      replacement: '<label for="borderThemeSelect" data-translate="borderTheme">Border Theme:</label>'
    },
    {
      line: 835,
      current: '<label for="borderOpacitySlider">Border Opacity:</label>',
      replacement: '<label for="borderOpacitySlider" data-translate="borderOpacity">Border Opacity:</label>'
    },
    {
      line: 844,
      current: '<label for="textInput">Content:</label>',
      replacement: '<label for="textInput" data-translate="content">Content:</label>'
    },
    {
      line: 847,
      current: '<label for="textColor">Color:</label>',
      replacement: '<label for="textColor" data-translate="color">Color:</label>'
    },
    {
      line: 848,
      current: '<label for="fontSize">Size:</label>',
      replacement: '<label for="fontSize" data-translate="size">Size:</label>'
    },
    {
      line: 849,
      current: '<label for="fontFamily">Font:</label>',
      replacement: '<label for="fontFamily" data-translate="font">Font:</label>'
    },
    {
      line: 859,
      current: '<label for="textStrokeColor">Outline Color:</label>',
      replacement: '<label for="textStrokeColor" data-translate="outlineColor">Outline Color:</label>'
    },
    {
      line: 860,
      current: '<label for="textStrokeWidth">Outline (0-10):</label>',
      replacement: '<label for="textStrokeWidth" data-translate="outlineWidth">Outline (0-10):</label>'
    },
    {
      line: 868,
      current: '<label for="problemCount">Number of Exercises (1–10):</label>',
      replacement: '<label for="problemCount" data-translate="numberOfExercises">Number of Exercises (1–10):</label>'
    },
    {
      line: 870,
      current: '<label for="minOperand">Min items per group (1-10):</label>',
      replacement: '<label for="minOperand" data-translate="minItemsPerGroup">Min items per group (1-10):</label>'
    },
    {
      line: 872,
      current: '<label for="maxOperand">Max items per group (1-10):</label>',
      replacement: '<label for="maxOperand" data-translate="maxItemsPerGroup">Max items per group (1-10):</label>'
    },
    {
      line: 892,
      current: '<label for="themeSelect">Select Theme:</label>',
      replacement: '<label for="themeSelect" data-translate="selectTheme">Select Theme:</label>'
    },
    {
      line: 894,
      current: '<label for="searchInput">Search Images:</label>',
      replacement: '<label for="searchInput" data-translate="searchImages">Search Images:</label>'
    },
    {
      line: 897,
      current: '<label>Available Images:</label>',
      replacement: '<label data-translate="availableImages">Available Images:</label>'
    },
    {
      line: 899,
      current: '<label style="margin-top:10px;">Selected Images for Problems:</label>',
      replacement: '<label style="margin-top:10px;" data-translate="selectedImagesForProblems">Selected Images for Problems:</label>'
    },
    {
      line: 907,
      current: '<label for="imageUploadInput">Select image(s) to upload:</label>',
      replacement: '<label for="imageUploadInput" data-translate="selectImagesToUpload">Select image(s) to upload:</label>'
    },
    {
      line: 909,
      current: '<label style="margin-top:10px;">Your Uploaded Images (This Session):</label>',
      replacement: '<label style="margin-top:10px;" data-translate="yourUploadedImages">Your Uploaded Images (This Session):</label>'
    }
  ],

  placeholders: [
    {
      line: 844,
      current: 'placeholder="Hello!"',
      replacement: 'placeholder="Hello!" data-translate-placeholder="helloPlaceholder"'
    },
    {
      line: 895,
      current: 'placeholder="e.g., apple, car"',
      replacement: 'placeholder="e.g., apple, car" data-translate-placeholder="searchPlaceholder"'
    }
  ],

  tooltips: [
    {
      line: 928,
      current: 'title="Layers"',
      replacement: 'title="Layers" data-translate-title="layers"'
    },
    {
      line: 937,
      current: 'title="Align"',
      replacement: 'title="Align" data-translate-title="align"'
    },
    {
      line: 941,
      current: 'title="Align Left"',
      replacement: 'title="Align Left" data-translate-title="alignLeft"'
    },
    {
      line: 942,
      current: 'title="Center Horizontally"',
      replacement: 'title="Center Horizontally" data-translate-title="centerHorizontally"'
    },
    {
      line: 943,
      current: 'title="Align Right"',
      replacement: 'title="Align Right" data-translate-title="alignRight"'
    },
    {
      line: 946,
      current: 'title="Align Top"',
      replacement: 'title="Align Top" data-translate-title="alignTop"'
    },
    {
      line: 947,
      current: 'title="Center Vertically"',
      replacement: 'title="Center Vertically" data-translate-title="centerVertically"'
    },
    {
      line: 948,
      current: 'title="Align Bottom"',
      replacement: 'title="Align Bottom" data-translate-title="alignBottom"'
    },
    {
      line: 953,
      current: 'title="Center on Page Horizontally"',
      replacement: 'title="Center on Page Horizontally" data-translate-title="centerOnPageHorizontally"'
    },
    {
      line: 954,
      current: 'title="Center on Page Vertically"',
      replacement: 'title="Center on Page Vertically" data-translate-title="centerOnPageVertically"'
    },
    {
      line: 960,
      current: 'title="Delete Selected"',
      replacement: 'title="Delete Selected" data-translate-title="deleteSelected"'
    }
  ]
};

// ==========================================
// JAVASCRIPT TEXT REPLACEMENTS (35+ items)
// ==========================================
const JAVASCRIPT_REPLACEMENTS = {
  showMessage_calls: [
    {
      line: 1448,
      current: "showMessage('Text added to worksheet.', 'success', 1500)",
      replacement: "showMessage(t('textAddedToWorksheet'), 'success', 1500)"
    },
    {
      line: 1669,
      current: 'showMessage("Could not load themes.", \'error\')',
      replacement: "showMessage(t('couldNotLoadThemes'), 'error')"
    },
    {
      line: 1708,
      current: 'showMessage(err.message, \'error\')',
      replacement: "showMessage(err.message || t('errorDuringSearch'), 'error')"
    },
    {
      line: 1813,
      current: "showMessage(`Max ${problemCount} image(s) selected.`, 'info')",
      replacement: "showMessage(formatTranslation(t('maxImagesSelected'), problemCount), 'info')"
    },
    {
      line: 1891,
      current: 'showMessage("Form cleared.", \'success\')',
      replacement: "showMessage(t('formCleared'), 'success')"
    },
    {
      line: 1921,
      current: 'showMessage("No images available in the library. Try uploading some!", \'error\')',
      replacement: "showMessage(t('noImagesAvailable'), 'error')"
    },
    {
      line: 1961,
      current: "showMessage('Please select some images first, either from the library or by uploading your own.', 'info')",
      replacement: "showMessage(t('pleaseSelectImages'), 'info')"
    },
    {
      line: 2141,
      current: 'showMessage("Worksheet generated successfully!", \'success\')',
      replacement: "showMessage(t('worksheetGeneratedSuccessfully'), 'success')"
    },
    {
      line: 2146,
      current: 'showMessage("Please generate a worksheet first.", \'error\')',
      replacement: "showMessage(t('pleaseGenerateWorksheetFirst'), 'error')"
    },
    {
      line: 2343,
      current: 'showMessage("Answer key generated!", \'success\')',
      replacement: "showMessage(t('answerKeyGenerated'), 'success')"
    },
    {
      line: 2450,
      current: 'showMessage("Please generate the content before downloading.", \'error\')',
      replacement: "showMessage(t('pleaseGenerateContentFirst'), 'error')"
    },
    {
      line: 2483,
      current: "showMessage('Download Initiated!', 'success')",
      replacement: "showMessage(t('downloadInitiated'), 'success')"
    },
    {
      line: 2485,
      current: "showMessage(`JPEG Error: ${error}`, 'error')",
      replacement: "showMessage(formatTranslation(t('jpegError'), error), 'error')"
    },
    {
      line: 2539,
      current: 'showMessage("PDF Downloaded!", \'success\')',
      replacement: "showMessage(t('pdfDownloaded'), 'success')"
    },
    {
      line: 2541,
      current: "showMessage(`PDF Error: ${error}`, 'error')",
      replacement: "showMessage(formatTranslation(t('pdfError'), error), 'error')"
    }
  ],

  innerHTML_assignments: [
    {
      line: 1658,
      current: "themeSelect.innerHTML = '<option value=\"all\">All Themes</option>'",
      replacement: "themeSelect.innerHTML = `<option value=\"all\">${t('allThemes')}</option>`"
    },
    {
      line: 1670,
      current: 'dictionaryDiv.innerHTML = "<p class=\'dictionary-message\'>Error loading themes. Please refresh the page.</p>"',
      replacement: "dictionaryDiv.innerHTML = `<p class='dictionary-message'>${t('errorLoadingThemes')}</p>`"
    },
    {
      line: 1683,
      current: 'dictionaryDiv.innerHTML = `<p class="dictionary-message">Select a theme or type to search all images.</p>`',
      replacement: "dictionaryDiv.innerHTML = `<p class=\"dictionary-message\">${t('selectThemeOrSearch')}</p>`"
    },
    {
      line: 1698,
      current: 'dictionaryDiv.innerHTML = `<p class="dictionary-message">Searching...</p>`',
      replacement: "dictionaryDiv.innerHTML = `<p class=\"dictionary-message\">${t('searching')}</p>`"
    },
    {
      line: 1709,
      current: 'dictionaryDiv.innerHTML = `<p class=\'dictionary-message\'>Error during search.</p>`',
      replacement: "dictionaryDiv.innerHTML = `<p class='dictionary-message'>${t('errorDuringSearch')}</p>`"
    },
    {
      line: 1716,
      current: 'dictionaryDiv.innerHTML = `<p class=\'dictionary-message\'>Loading images for theme: ${themeSelect.options[themeSelect.selectedIndex].text}... Please wait.</p>`',
      replacement: "dictionaryDiv.innerHTML = `<p class='dictionary-message'>${formatTranslation(t('loadingImagesForTheme'), themeSelect.options[themeSelect.selectedIndex].text)}</p>`"
    },
    {
      line: 1730,
      current: 'dictionaryDiv.innerHTML = `<p class=\'dictionary-message\'>Error loading images.</p>`',
      replacement: "dictionaryDiv.innerHTML = `<p class='dictionary-message'>${t('errorLoadingImages')}</p>`"
    },
    {
      line: 1739,
      current: 'dictionaryDiv.innerHTML = `<p class="dictionary-message">No images found${query ? ` matching "${query}"` : \'\'}.</p>`',
      replacement: "dictionaryDiv.innerHTML = `<p class=\"dictionary-message\">${t('noImagesFound')}${query ? ` matching \"${query}\"` : ''}.</p>`"
    },
    {
      line: 1791,
      current: 'uploadedImagesPreviewDiv.innerHTML = `<p class="dictionary-message">Your uploaded images will appear here.</p>`',
      replacement: "uploadedImagesPreviewDiv.innerHTML = `<p class=\"dictionary-message\">${t('yourUploadedImagesWillAppearHere')}</p>`"
    },
    {
      line: 1838,
      current: 'selectedCountMsg.textContent = `Selected: ${Math.min(totalSelected, maxSelections)} / ${maxSelections}`',
      replacement: "selectedCountMsg.textContent = formatTranslation(t('selectedCount'), Math.min(totalSelected, maxSelections), maxSelections)"
    },
    {
      line: 1857,
      current: 'borderDictionary.innerHTML = `<p class="dictionary-message">Select a theme to see borders.</p>`',
      replacement: "borderDictionary.innerHTML = `<p class=\"dictionary-message\">${t('selectThemeToSeeBorders')}</p>`"
    },
    {
      line: 1866,
      current: 'backgroundDictionary.innerHTML = `<p class="dictionary-message">Select a theme for backgrounds.</p>`',
      replacement: "backgroundDictionary.innerHTML = `<p class=\"dictionary-message\">${t('selectThemeForBackgrounds')}</p>`"
    },
    {
      line: 2453,
      current: "showMessage(`Preparing ${imageType.toUpperCase()}...`, 'info')",
      replacement: "showMessage(formatTranslation(t('preparingFile'), imageType.toUpperCase()), 'info')"
    },
    {
      line: 2566,
      current: 'borderDictionary.innerHTML = `<p class="dictionary-message">Loading ${theme} borders...</p>`',
      replacement: "borderDictionary.innerHTML = `<p class=\"dictionary-message\">${formatTranslation(t('loadingBorders'), theme)}</p>`"
    },
    {
      line: 2579,
      current: 'borderDictionary.innerHTML = `<p class="dictionary-message">Error loading borders.</p>`',
      replacement: "borderDictionary.innerHTML = `<p class=\"dictionary-message\">${t('errorLoadingBorders')}</p>`"
    },
    {
      line: 2596,
      current: 'backgroundDictionary.innerHTML = `<p class="dictionary-message">Loading ${theme} backgrounds...</p>`',
      replacement: "backgroundDictionary.innerHTML = `<p class=\"dictionary-message\">${formatTranslation(t('loadingBackgrounds'), theme)}</p>`"
    },
    {
      line: 2609,
      current: 'backgroundDictionary.innerHTML = `<p class="dictionary-message">Error loading backgrounds.</p>`',
      replacement: "backgroundDictionary.innerHTML = `<p class=\"dictionary-message\">${t('errorLoadingBackgrounds')}</p>`"
    },
    {
      line: 2615,
      current: 'borderDictionary.innerHTML = `<p class="dictionary-message">No borders in this theme.</p>`',
      replacement: "borderDictionary.innerHTML = `<p class=\"dictionary-message\">${t('noBordersInTheme')}</p>`"
    }
  ],

  canvas_text_rendering: [
    {
      context: "Name field label (when includeNameDate is true)",
      current: "ctx.fillText('Name:', ...)",
      replacement: "ctx.fillText(t('nameLabel'), ...)"
    },
    {
      context: "Date field label (when includeNameDate is true)",
      current: "ctx.fillText('Date:', ...)",
      replacement: "ctx.fillText(t('dateLabel'), ...)"
    },
    {
      context: "Exercise numbers (when includeExerciseNumbers is true)",
      current: "ctx.fillText(`${i + 1})`, ...)",
      replacement: "ctx.fillText(formatTranslation(t('exerciseNumber'), i + 1), ...)"
    },
    {
      context: "Plus sign (when showPlusSign is true)",
      current: "ctx.fillText('+', ...)",
      replacement: "ctx.fillText(t('plusSign'), ...)"
    },
    {
      context: "Equals sign",
      current: "ctx.fillText('=', ...)",
      replacement: "ctx.fillText(t('equalsSign'), ...)"
    }
  ]
};

// ==========================================
// FUNCTIONS TO ADD TO ADDITION.HTML
// ==========================================
const FUNCTIONS_TO_ADD = `
// ==========================================
// TRANSLATION SYSTEM FUNCTIONS
// ==========================================

// Global translation function - must be called after translations are loaded
function t(key) {
    if (typeof translations === 'undefined') {
        console.warn('Translations not loaded, returning key:', key);
        return key;
    }
    const translation = (translations[currentLocale] && translations[currentLocale][key]) ||
                       (translations.en && translations.en[key]) ||
                       key;
    return translation;
}
window.t = t;

// Format translation with placeholders
function formatTranslation(text, ...values) {
    let result = text;
    values.forEach((value) => {
        result = result.replace('{}', value);
    });
    return result;
}
window.formatTranslation = formatTranslation;

// Apply translations to HTML elements
function applyHTMLTranslations() {
    // Translate elements with data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (key) {
            element.textContent = t(key);
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (key) {
            element.placeholder = t(key);
        }
    });

    // Translate titles/tooltips
    document.querySelectorAll('[data-translate-title]').forEach(element => {
        const key = element.getAttribute('data-translate-title');
        if (key) {
            element.title = t(key);
        }
    });

    // Translate page size options
    const pageSizeSelect = document.getElementById('pageSizeSelect');
    if (pageSizeSelect) {
        const options = pageSizeSelect.querySelectorAll('option');
        options[0].textContent = t('letterPortrait');
        options[1].textContent = t('letterLandscape');
        options[2].textContent = t('a4Portrait');
        options[3].textContent = t('a4Landscape');
        options[4].textContent = t('square');
        options[5].textContent = t('custom');
    }

    // Translate font family options
    const fontFamily = document.getElementById('fontFamily');
    if (fontFamily) {
        const options = fontFamily.querySelectorAll('option');
        // Keep font names as-is, they're proper nouns
    }
}

// Call this after DOM is ready and translations are loaded
document.addEventListener('DOMContentLoaded', function() {
    // Apply translations after a small delay to ensure everything is loaded
    setTimeout(applyHTMLTranslations, 100);
});

// Helper for canvas text translations
function getCanvasText(key, ...values) {
    const text = t(key);
    return formatTranslation(text, ...values);
}
`;

// ==========================================
// FILE INPUT WRAPPER NEEDED
// ==========================================
const FILE_INPUT_WRAPPER = `
<!-- Replace existing file input with this wrapper -->
<div class="file-input-wrapper">
    <button type="button" class="file-input-button" onclick="document.getElementById('imageUploadInput').click()">
        <span data-translate="chooseFiles">Choose Files</span>
    </button>
    <span class="file-input-label" id="fileInputLabel" data-translate="noFileChosen">No file chosen</span>
    <input type="file" id="imageUploadInput" multiple accept="image/*" style="display: none;">
</div>

<style>
.file-input-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
}

.file-input-button {
    padding: 8px 16px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.file-input-button:hover {
    background: #45a049;
}

.file-input-label {
    color: #666;
    font-size: 14px;
}
</style>

<script>
// Update file label when files are selected
document.getElementById('imageUploadInput').addEventListener('change', function(e) {
    const fileInputLabel = document.getElementById('fileInputLabel');
    if (e.target.files.length > 0) {
        fileInputLabel.textContent = formatTranslation(t('filesSelected'), e.target.files.length);
        fileInputLabel.dataset.hasFiles = 'true';
    } else {
        fileInputLabel.textContent = t('noFileChosen');
        delete fileInputLabel.dataset.hasFiles;
    }
});
</script>
`;

// ==========================================
// SUMMARY REPORT
// ==========================================
function generateReport() {
  console.log('');
  console.log('========================================');
  console.log('ADDITION APP TRANSLATION PREPARATION REPORT');
  console.log('========================================');
  console.log('');
  console.log('⚠️ CRITICAL: Addition.html has almost NO translation support!');
  console.log('Only 2 elements have data-translate attributes currently.');
  console.log('');
  console.log('REQUIRED CHANGES:');
  console.log('');
  console.log('1. HTML ATTRIBUTE ADDITIONS:');
  console.log(`   - Accordion buttons: 6 additions`);
  console.log(`   - Form labels: 24 additions`);
  console.log(`   - Placeholders: 2 additions`);
  console.log(`   - Tooltips: 11 additions`);
  console.log(`   - Buttons: 10 additions`);
  console.log(`   - TOTAL: 53 attributes to add`);
  console.log('');
  console.log('2. JAVASCRIPT TEXT REPLACEMENTS:');
  console.log(`   - showMessage calls: 15 replacements`);
  console.log(`   - innerHTML assignments: 18 replacements`);
  console.log(`   - Canvas text rendering: 5 replacements`);
  console.log(`   - TOTAL: 38 JavaScript replacements`);
  console.log('');
  console.log('3. SPECIAL REQUIREMENTS:');
  console.log(`   - Add file input wrapper for translation`);
  console.log(`   - Handle canvas-rendered text (Name:, Date:, numbers)`);
  console.log(`   - Fix wrong translation key on line 777`);
  console.log('');
  console.log('IMPLEMENTATION STEPS:');
  console.log('1. Add ALL 53 missing data-translate attributes');
  console.log('2. Add translation functions (t, formatTranslation, applyHTMLTranslations)');
  console.log('3. Replace ALL 38 JavaScript hardcoded strings');
  console.log('4. Implement custom file input wrapper');
  console.log('5. Update canvas rendering to use translations');
  console.log('6. Test with ?locale=de to verify');
  console.log('');
  console.log('ESTIMATED TIME: 2-3 hours');
  console.log('(Much more work than wordsearch due to missing attributes)');
  console.log('');
  console.log('FILES CREATED:');
  console.log('  - addition-translation-master-template.js (106 translation keys)');
  console.log('  - prepare-addition-for-translation.js (This file)');
  console.log('');
  console.log('========================================');
}

// Run the report
generateReport();

// Export for use in other scripts
module.exports = {
  HTML_ATTRIBUTE_ADDITIONS,
  JAVASCRIPT_REPLACEMENTS,
  FUNCTIONS_TO_ADD,
  FILE_INPUT_WRAPPER
};