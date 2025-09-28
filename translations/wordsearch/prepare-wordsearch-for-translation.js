/**
 * PREPARE WORDSEARCH.HTML FOR TRANSLATION IMPLEMENTATION
 * =======================================================
 * This script identifies all hardcoded text that needs to be replaced
 * with translation function calls for complete internationalization.
 *
 * RUN THIS SCRIPT TO SEE ALL CHANGES NEEDED
 */

const fs = require('fs');
const path = require('path');

// All hardcoded text replacements needed in wordsearch.html
const REQUIRED_REPLACEMENTS = {
  // ==========================================
  // DYNAMIC MESSAGE REPLACEMENTS
  // ==========================================
  javascript_messages: [
    {
      line: 1358,
      current: 'showMessage("Worksheet generated successfully!", "success")',
      replacement: 'showMessage(t("worksheetGeneratedSuccessfully"), "success")'
    },
    {
      line: 1366,
      current: 'showMessage("Please generate a worksheet first.", "error")',
      replacement: 'showMessage(t("pleaseGenerateWorksheetFirst"), "error")'
    },
    {
      line: 1426,
      current: 'showMessage("Answer key generated!", "success")',
      replacement: 'showMessage(t("answerKeyGenerated"), "success")'
    },
    {
      line: 1441,
      current: 'showMessage(`Loading theme \'${themeName}\'...`, \'info\', 2000)',
      replacement: 'showMessage(formatTranslation(t("loadingTheme"), themeName), "info", 2000)'
    },
    {
      line: 1455,
      current: 'showMessage(`Theme \'${themeName}\' needs at least ${MIN_THEME_IMAGES} images.`, \'error\')',
      replacement: 'showMessage(formatTranslation(t("themeNeedsMinImages"), themeName, MIN_THEME_IMAGES), "error")'
    },
    {
      line: 1465,
      current: 'showMessage(\'Please wait for themes to load...\', \'error\')',
      replacement: 'showMessage(t("pleaseWaitForThemes"), "error")'
    },
    {
      line: 1473,
      current: 'showMessage(\'No images selected or available to generate the puzzle.\', \'error\')',
      replacement: 'showMessage(t("noImagesSelectedOrAvailable"), "error")'
    },
    {
      line: 1488,
      current: 'showMessage(\'Failed to place any words. Try a larger grid or different words.\', \'error\')',
      replacement: 'showMessage(t("failedToPlaceWords"), "error")'
    },
    {
      line: 1916,
      current: 'showMessage(\'All settings cleared.\', \'success\')',
      replacement: 'showMessage(t("allSettingsCleared"), "success")'
    }
  ],

  // ==========================================
  // DROPDOWN OPTION REPLACEMENTS
  // ==========================================
  dropdown_options: [
    {
      line: 1999,
      current: 'worksheetThemeSelectEl.innerHTML = `<option value="random_auto">-- Use Random Theme --</option>`',
      replacement: 'worksheetThemeSelectEl.innerHTML = `<option value="random_auto">${t("useRandomTheme")}</option>`'
    },
    {
      line: 2000,
      current: 'themeSelectEl.innerHTML = `<option value="all">All Themes (for search)</option>`',
      replacement: 'themeSelectEl.innerHTML = `<option value="all">${t("allThemesForSearch")}</option>`'
    }
  ],

  // ==========================================
  // DICTIONARY MESSAGE REPLACEMENTS
  // ==========================================
  dictionary_messages: [
    {
      line: 1898,
      current: 'borderDictionary.innerHTML = \'<p class="dictionary-message">Select a theme to see borders.</p>\'',
      replacement: 'borderDictionary.innerHTML = `<p class="dictionary-message">${t("selectThemeToSeeBorders")}</p>`'
    },
    {
      line: 1900,
      current: 'backgroundDictionary.innerHTML = \'<p class="dictionary-message">Select a theme for backgrounds.</p>\'',
      replacement: 'backgroundDictionary.innerHTML = `<p class="dictionary-message">${t("selectThemeForBackgrounds")}</p>`'
    }
  ],

  // ==========================================
  // MORE DYNAMIC TEXT IN FUNCTIONS
  // ==========================================
  function_text: [
    {
      line: 2117,
      current: 'showMessage(`You can select a maximum of ${MAX_WORDS} images.`, \'error\')',
      replacement: 'showMessage(formatTranslation(t("maxImagesSelected"), MAX_WORDS), "error")'
    },
    {
      line: 2134,
      current: 'showMessage(`Puzzle will generate using the \'${worksheetThemeSelect.options[worksheetThemeSelect.selectedIndex].text}\' theme.`, \'info\')',
      replacement: 'showMessage(formatTranslation(t("puzzleWillGenerateUsing"), worksheetThemeSelect.options[worksheetThemeSelect.selectedIndex].text), "info")'
    },
    {
      line: 2177,
      current: 'uploadedImagesPreviewDiv.innerHTML = `<p class=\'dictionary-message\'>Loading ${filesToLoad} image(s)...</p>`',
      replacement: 'uploadedImagesPreviewDiv.innerHTML = `<p class="dictionary-message">${formatTranslation(t("loadingImagesCount"), filesToLoad)}</p>`'
    },
    {
      line: 2190,
      current: 'showMessage(`${uploadedImages.length} custom image(s) available.`, \'success\')',
      replacement: 'showMessage(formatTranslation(t("customImagesAvailable"), uploadedImages.length), "success")'
    },
    {
      line: 2195,
      current: 'showMessage(`Error reading file: ${file.name}`, \'error\')',
      replacement: 'showMessage(formatTranslation(t("errorReadingFile"), file.name), "error")'
    }
  ],

  // ==========================================
  // WATERMARK TEXT REPLACEMENTS
  // ==========================================
  watermark_text: [
    {
      context: "Main watermark text in downloadImageFile function",
      current: 'text: "FREE VERSION - LessonCraftStudio.com"',
      replacement: 'text: t("watermarkText")'
    },
    {
      context: "Small watermark text",
      current: '"FREE VERSION"',
      replacement: 't("watermarkSmall")'
    }
  ],

  // ==========================================
  // DEFAULT VALUES
  // ==========================================
  default_values: [
    {
      context: "Default text for new text objects",
      current: '"New Text"',
      replacement: 't("defaultNewText")',
      note: "Search for fabric.IText or fabric.Text creation"
    }
  ],

  // ==========================================
  // LOADING/ERROR MESSAGES IN RENDERDICTONARY
  // ==========================================
  render_dictionary: [
    {
      context: "Searching message",
      current: 'dictionaryDiv.innerHTML = \'<p class="dictionary-message">Searching...</p>\'',
      replacement: 'dictionaryDiv.innerHTML = `<p class="dictionary-message">${t("searching")}</p>`'
    },
    {
      context: "Loading theme message",
      current: 'dictionaryDiv.innerHTML = \'<p class="dictionary-message">Loading theme...</p>\'',
      replacement: 'dictionaryDiv.innerHTML = `<p class="dictionary-message">${t("loadingTheme")}</p>`'
    },
    {
      context: "No images found",
      current: '"No images found"',
      replacement: 't("noImagesFound")'
    }
  ],

  // ==========================================
  // DOWNLOAD FUNCTION MESSAGES
  // ==========================================
  download_messages: [
    {
      context: "downloadImageFile function",
      current: 'showMessage("Please generate content first.", "error")',
      replacement: 'showMessage(t("pleaseGenerateContentFirst"), "error")'
    },
    {
      context: "downloadImageFile function",
      current: 'showMessage("Preparing JPEG...", "info")',
      replacement: 'showMessage(t("preparingJpeg"), "info")'
    },
    {
      context: "downloadImageFile function",
      current: 'showMessage("JPEG download initiated!", "success")',
      replacement: 'showMessage(t("jpegDownloadInitiated"), "success")'
    },
    {
      context: "downloadImageFile function",
      current: 'showMessage("Error preparing JPEG.", "error")',
      replacement: 'showMessage(t("errorPreparingJpeg"), "error")'
    },
    {
      context: "downloadPDF function",
      current: 'showMessage("Preparing PDF...", "info")',
      replacement: 'showMessage(t("preparingPdf"), "info")'
    },
    {
      context: "downloadPDF function",
      current: 'showMessage("PDF downloaded!", "success")',
      replacement: 'showMessage(t("pdfDownloaded"), "success")'
    },
    {
      context: "downloadPDF function",
      current: 'showMessage("Error creating PDF.", "error")',
      replacement: 'showMessage(t("errorCreatingPdf"), "error")'
    }
  ],

  // ==========================================
  // FILE INPUT UPDATE
  // ==========================================
  file_input: [
    {
      context: "Update file selection text",
      current: 'fileInputLabel.textContent = files.length + " file(s) selected"',
      replacement: 'fileInputLabel.textContent = formatTranslation(t("filesSelected"), files.length)'
    }
  ]
};

// ==========================================
// FUNCTIONS TO ADD TO WORDSEARCH.HTML
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
}

// Call this after DOM is ready and translations are loaded
document.addEventListener('DOMContentLoaded', function() {
    // Apply translations after a small delay to ensure everything is loaded
    setTimeout(applyHTMLTranslations, 100);
});
`;

// ==========================================
// SUMMARY REPORT
// ==========================================
function generateReport() {
  console.log('');
  console.log('========================================');
  console.log('WORDSEARCH TRANSLATION PREPARATION REPORT');
  console.log('========================================');
  console.log('');
  console.log('TOTAL REPLACEMENTS NEEDED:');

  let total = 0;
  for (const category in REQUIRED_REPLACEMENTS) {
    const count = REQUIRED_REPLACEMENTS[category].length;
    total += count;
    console.log(`  - ${category}: ${count} replacements`);
  }

  console.log('');
  console.log(`TOTAL: ${total} text replacements required`);
  console.log('');
  console.log('NEXT STEPS:');
  console.log('1. Add translation functions to wordsearch.html (provided above)');
  console.log('2. Replace all hardcoded text with t() function calls');
  console.log('3. Ensure all data-translate attributes use keys from master template');
  console.log('4. Add formatTranslation() calls for dynamic messages with placeholders');
  console.log('5. Test with ?locale=de to verify all text is translatable');
  console.log('');
  console.log('FILES CREATED:');
  console.log('  - wordsearch-translation-master-template.js (Complete translation structure)');
  console.log('  - prepare-wordsearch-for-translation.js (This file - implementation guide)');
  console.log('');
  console.log('========================================');
}

// Run the report
generateReport();

// Export for use in other scripts
module.exports = {
  REQUIRED_REPLACEMENTS,
  FUNCTIONS_TO_ADD
};