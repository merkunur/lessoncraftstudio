/**
 * Fix Final Missing Translations
 * Adds translations for Background, Border, Choose files, No file chosen, Grayscale, and dynamic messages
 */

const fs = require('fs').promises;
const path = require('path');

async function fixFinalTranslations() {
    console.log('🔧 Fixing final missing translations...\n');

    const finalTranslations = {
        // Missing UI elements
        "background_heading": {
            en: "Background",
            de: "Hintergrund"
        },
        "border_heading": {
            en: "Border",
            de: "Rahmen"
        },
        "choose_files_button": {
            en: "Choose files",
            de: "Dateien auswählen"
        },
        "no_file_chosen_text": {
            en: "No file chosen",
            de: "Keine Datei ausgewählt"
        },
        "grayscale": {
            en: "Grayscale",
            de: "Graustufen"
        },
        "grayscale_option": {
            en: "Grayscale",
            de: "Graustufen"
        },

        // Dynamic messages that appear at bottom of sidebar
        "worksheet_generated_successfully": {
            en: "Worksheet generated successfully!",
            de: "Arbeitsblatt erfolgreich erstellt!"
        },
        "answer_key_generated": {
            en: "Answer key generated!",
            de: "Lösungsschlüssel erstellt!"
        },
        "please_generate_worksheet_first": {
            en: "Please generate a worksheet first.",
            de: "Bitte erstellen Sie zuerst ein Arbeitsblatt."
        },
        "all_settings_cleared": {
            en: "All settings cleared.",
            de: "Alle Einstellungen zurückgesetzt."
        },
        "loading_theme": {
            en: "Loading theme '{0}'...",
            de: "Lade Thema '{0}'..."
        },
        "theme_needs_more_images": {
            en: "Theme '{0}' needs at least {1} images.",
            de: "Thema '{0}' benötigt mindestens {1} Bilder."
        },
        "please_wait_for_themes": {
            en: "Please wait for themes to load...",
            de: "Bitte warten Sie, bis die Themen geladen sind..."
        },
        "no_images_selected_or_available": {
            en: "No images selected or available to generate the puzzle.",
            de: "Keine Bilder ausgewählt oder verfügbar für das Rätsel."
        },
        "failed_to_place_words": {
            en: "Failed to place any words. Try a larger grid or different words.",
            de: "Konnte keine Wörter platzieren. Versuchen Sie ein größeres Raster oder andere Wörter."
        },
        "max_images_selected": {
            en: "You can select a maximum of {0} images.",
            de: "Sie können maximal {0} Bilder auswählen."
        },
        "puzzle_will_generate_with_theme": {
            en: "Puzzle will generate using the '{0}' theme.",
            de: "Rätsel wird mit dem Thema '{0}' erstellt."
        },
        "custom_images_available": {
            en: "{0} custom image(s) available.",
            de: "{0} eigene(s) Bild(er) verfügbar."
        },
        "error_reading_file": {
            en: "Error reading file: {0}",
            de: "Fehler beim Lesen der Datei: {0}"
        },
        "please_generate_content_first": {
            en: "Please generate content first.",
            de: "Bitte erstellen Sie zuerst Inhalte."
        },
        "preparing_jpeg": {
            en: "Preparing JPEG...",
            de: "JPEG wird vorbereitet..."
        },
        "jpeg_download_initiated": {
            en: "JPEG download initiated!",
            de: "JPEG-Download gestartet!"
        },
        "error_preparing_jpeg": {
            en: "Error preparing JPEG.",
            de: "Fehler beim Vorbereiten des JPEG."
        },
        "preparing_pdf": {
            en: "Preparing PDF...",
            de: "PDF wird vorbereitet..."
        },
        "pdf_downloaded": {
            en: "PDF downloaded!",
            de: "PDF heruntergeladen!"
        },
        "error_creating_pdf": {
            en: "Error creating PDF.",
            de: "Fehler beim Erstellen des PDF."
        },
        "borders_and_backgrounds_loaded": {
            en: "Borders and backgrounds loaded successfully",
            de: "Rahmen und Hintergründe erfolgreich geladen"
        },
        "error_loading_themes": {
            en: "Error loading themes:",
            de: "Fehler beim Laden der Themen:"
        },

        // Additional file upload related
        "select_image_files": {
            en: "Select image file(s)",
            de: "Bilddatei(en) auswählen"
        },
        "uploading_files": {
            en: "Uploading files...",
            de: "Dateien werden hochgeladen..."
        },
        "upload_successful": {
            en: "Upload successful!",
            de: "Upload erfolgreich!"
        },
        "file_too_large": {
            en: "File too large. Max size is {0}MB.",
            de: "Datei zu groß. Maximale Größe ist {0}MB."
        },
        "invalid_file_type": {
            en: "Invalid file type. Please upload images only.",
            de: "Ungültiger Dateityp. Bitte nur Bilder hochladen."
        }
    };

    try {
        // Load existing translations
        const translationsPath = path.join(__dirname, 'js', 'translations.js');
        let content = await fs.readFile(translationsPath, 'utf-8');

        const match = content.match(/const translations = ({[\s\S]*});/);
        if (!match) {
            console.error('Could not parse translations file');
            return;
        }

        const translations = eval('(' + match[1] + ')');

        // Add/Update translations
        let addedEn = 0;
        let addedDe = 0;

        Object.entries(finalTranslations).forEach(([key, values]) => {
            // Add English
            if (!translations.en[key]) {
                translations.en[key] = values.en;
                console.log(`➕ EN: ${key} = "${values.en}"`);
                addedEn++;
            }

            // Add/Update German
            if (!translations.de[key] ||
                translations.de[key].includes('[NEEDS_TRANSLATION]') ||
                translations.de[key].includes('[TRANSLATE]')) {
                translations.de[key] = values.de;
                console.log(`✅ DE: ${key} = "${values.de}"`);
                addedDe++;
            }
        });

        // Generate updated file
        const newContent = `// Translation system for worksheet generators
// Auto-generated on ${new Date().toISOString()}
// Total keys: ${Object.keys(translations.en).length}
// Final missing translations added

const translations = ${JSON.stringify(translations, null, 2)};

// Helper function to get translation
function getTranslation(key, locale = 'en') {
    const localeTranslations = translations[locale] || translations['en'];
    return localeTranslations[key] || key;
}

// Helper function to translate element
function translateElement(element, key, locale = 'en') {
    const translation = getTranslation(key, locale);
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
    } else if (element.tagName === 'OPTION' || element.tagName === 'SELECT') {
        element.value = translation;
    } else {
        element.textContent = translation;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}
`;

        await fs.writeFile(translationsPath, newContent);

        console.log('\n' + '='.repeat(60));
        console.log('✅ FINAL TRANSLATIONS ADDED!');
        console.log('='.repeat(60));
        console.log(`📝 Added ${addedEn} English keys`);
        console.log(`🌍 Added ${addedDe} German translations`);
        console.log('='.repeat(60));

        // Now update translation-system.js mappings
        await updateFinalMappings();

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

async function updateFinalMappings() {
    const systemPath = path.join(__dirname, 'js', 'translation-system.js');

    try {
        let content = await fs.readFile(systemPath, 'utf-8');

        // Additional mappings for final missing texts
        const additionalMappings = `
            // Final missing UI text mappings
            'Background': 'background_heading',
            'Border': 'border_heading',
            'Choose files': 'choose_files_button',
            'No file chosen': 'no_file_chosen_text',
            'Grayscale': 'grayscale',
            'Worksheet generated successfully!': 'worksheet_generated_successfully',
            'Answer key generated!': 'answer_key_generated',
            'Please generate a worksheet first.': 'please_generate_worksheet_first',
            'All settings cleared.': 'all_settings_cleared',
            'Please wait for themes to load...': 'please_wait_for_themes',
            'No images selected or available to generate the puzzle.': 'no_images_selected_or_available',
            'Failed to place any words. Try a larger grid or different words.': 'failed_to_place_words',
            'Please generate content first.': 'please_generate_content_first',
            'Preparing JPEG...': 'preparing_jpeg',
            'JPEG download initiated!': 'jpeg_download_initiated',
            'Error preparing JPEG.': 'error_preparing_jpeg',
            'Preparing PDF...': 'preparing_pdf',
            'PDF downloaded!': 'pdf_downloaded',
            'Error creating PDF.': 'error_creating_pdf',`;

        // Find a good insertion point
        const insertPoint = content.indexOf('// Messages');
        if (insertPoint > -1) {
            content = content.slice(0, insertPoint - 13) + additionalMappings + '\n\n            ' + content.slice(insertPoint);

            await fs.writeFile(systemPath, content);
            console.log('✅ Translation system mappings updated!');
        }

    } catch (error) {
        console.error('Error updating mappings:', error);
    }
}

// Also update showMessage function in wordsearch to use translations
async function updateShowMessageFunction() {
    const wordsearchPath = path.join(__dirname, 'wordsearch.html');

    try {
        let content = await fs.readFile(wordsearchPath, 'utf-8');

        // Add translation support to showMessage function
        const showMessagePattern = /function showMessage\(msg, type = 'error', duration = 4000\) {/;
        const newShowMessage = `function showMessage(msg, type = 'error', duration = 4000) {
        // Translate the message if a translation exists
        if (window.worksheetTranslationSystem) {
            msg = window.worksheetTranslationSystem.translateDynamicText(msg);
        }`;

        content = content.replace(showMessagePattern, newShowMessage);

        await fs.writeFile(wordsearchPath, content);
        console.log('✅ showMessage function updated for translation support!');

    } catch (error) {
        console.error('Error updating showMessage:', error);
    }
}

// Run all fixes
fixFinalTranslations();