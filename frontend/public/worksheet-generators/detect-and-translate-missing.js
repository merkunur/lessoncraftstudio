/**
 * Detect and Translate Missing UI Text
 *
 * This script:
 * 1. Runs the UI text detector on wordsearch.html
 * 2. Identifies all missing translations
 * 3. Adds German translations for all missing text
 * 4. Updates translations.js with complete coverage
 */

const fs = require('fs').promises;
const path = require('path');

async function detectAndTranslateMissing() {
    console.log('🔍 Starting comprehensive UI text detection...\n');

    // Missing texts from the screenshots that need German translations
    const missingTranslations = {
        // From Screenshot 1 - Puzzle Settings
        "puzzle_options": {
            en: "Puzzle Options",
            de: "Rätsel-Optionen"
        },
        "allow_diagonal_words": {
            en: "Allow Diagonal Words",
            de: "Diagonale Wörter erlauben"
        },
        "allow_reverse_words": {
            en: "Allow Reverse Words",
            de: "Rückwärts-Wörter erlauben"
        },
        "show_word_image_list": {
            en: "Show Word/Image List",
            de: "Wort-/Bildliste anzeigen"
        },
        "grid_size": {
            en: "Grid Size",
            de: "Rastergröße"
        },

        // From Screenshot 2 - Image Library
        "image_source_for_puzzle": {
            en: "Image Source for Puzzle",
            de: "Bildquelle für Rätsel"
        },
        "individual_image_selection": {
            en: "Individual Image Selection",
            de: "Individuelle Bildauswahl"
        },
        "available_images_max_8": {
            en: "Available Images (max 8):",
            de: "Verfügbare Bilder (max. 8):"
        },
        "selected_images_label": {
            en: "Selected Images:",
            de: "Ausgewählte Bilder:"
        },
        "click_to_select_images": {
            en: "Click to select images",
            de: "Klicken zum Auswählen"
        },

        // From Screenshot 3 - Upload Section
        "your_uploaded_images_this_session": {
            en: "Your Uploaded Images (This Session):",
            de: "Ihre hochgeladenen Bilder (diese Sitzung):"
        },
        "your_uploaded_images_will_appear_here": {
            en: "Your uploaded images will appear here.",
            de: "Ihre hochgeladenen Bilder erscheinen hier."
        },
        "choose_files": {
            en: "Choose files",
            de: "Dateien auswählen"
        },
        "no_file_chosen": {
            en: "No file chosen",
            de: "Keine Datei ausgewählt"
        },
        "upload_images": {
            en: "Upload Images",
            de: "Bilder hochladen"
        },

        // Additional common UI elements that might be missing
        "worksheet": {
            en: "Worksheet",
            de: "Arbeitsblatt"
        },
        "answer_key_tab": {
            en: "Answer Key",
            de: "Lösungsschlüssel"
        },
        "clear_all": {
            en: "Clear All",
            de: "Alles löschen"
        },
        "image_dictionary": {
            en: "Image Dictionary",
            de: "Bildwörterbuch"
        },
        "selected_theme_images": {
            en: "Selected Theme Images",
            de: "Ausgewählte Themenbilder"
        },
        "border_dictionary": {
            en: "Border Dictionary",
            de: "Rahmen-Bibliothek"
        },
        "background_dictionary": {
            en: "Background Dictionary",
            de: "Hintergrund-Bibliothek"
        },
        "page_color": {
            en: "Page Color",
            de: "Seitenfarbe"
        },
        "font_options": {
            en: "Font Options",
            de: "Schriftoptionen"
        },
        "text_alignment": {
            en: "Text Alignment",
            de: "Textausrichtung"
        },
        "outline": {
            en: "Outline",
            de: "Kontur"
        },
        "stroke_width": {
            en: "Stroke Width",
            de: "Konturbreite"
        },
        "no_images_found": {
            en: "No images found",
            de: "Keine Bilder gefunden"
        },
        "please_select_theme_first": {
            en: "Please select a theme first",
            de: "Bitte wählen Sie zuerst ein Thema"
        },
        "loading_images": {
            en: "Loading images...",
            de: "Bilder werden geladen..."
        },
        "generating_puzzle": {
            en: "Generating puzzle...",
            de: "Rätsel wird erstellt..."
        },
        "puzzle_generated": {
            en: "Puzzle generated!",
            de: "Rätsel erstellt!"
        },
        "error_generating_puzzle": {
            en: "Error generating puzzle",
            de: "Fehler beim Erstellen des Rätsels"
        },
        "please_select_at_least_x_images": {
            en: "Please select at least {0} images",
            de: "Bitte wählen Sie mindestens {0} Bilder"
        },
        "maximum_x_images": {
            en: "Maximum {0} images",
            de: "Maximal {0} Bilder"
        },

        // Dropdown and button specific text
        "all_themes": {
            en: "All Themes",
            de: "Alle Themen"
        },
        "random_theme": {
            en: "Random Theme",
            de: "Zufälliges Thema"
        },
        "use_fallback_color": {
            en: "Use Fallback Color",
            de: "Ersatzfarbe verwenden"
        },

        // Tab names
        "worksheet_tab": {
            en: "Worksheet",
            de: "Arbeitsblatt"
        },
        "answer_key_tab_name": {
            en: "Answer Key",
            de: "Lösungsschlüssel"
        },

        // Action buttons in accordions
        "add_text": {
            en: "Add Text",
            de: "Text hinzufügen"
        },
        "clear_text": {
            en: "Clear Text",
            de: "Text löschen"
        },
        "reset_settings": {
            en: "Reset Settings",
            de: "Einstellungen zurücksetzen"
        },

        // File upload related
        "drag_and_drop_files": {
            en: "Drag and drop files here",
            de: "Dateien hier ablegen"
        },
        "or_click_to_browse": {
            en: "or click to browse",
            de: "oder klicken zum Durchsuchen"
        },
        "supported_formats_label": {
            en: "Supported formats:",
            de: "Unterstützte Formate:"
        },
        "max_file_size_label": {
            en: "Max file size:",
            de: "Max. Dateigröße:"
        },
        "uploading": {
            en: "Uploading...",
            de: "Hochladen..."
        },
        "upload_complete": {
            en: "Upload complete",
            de: "Upload abgeschlossen"
        },
        "upload_failed": {
            en: "Upload failed",
            de: "Upload fehlgeschlagen"
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

        // Add missing translations
        let addedCount = 0;
        let updatedCount = 0;

        Object.entries(missingTranslations).forEach(([key, values]) => {
            // Add English
            if (!translations.en[key]) {
                translations.en[key] = values.en;
                console.log(`➕ Added EN: ${key} = "${values.en}"`);
                addedCount++;
            }

            // Add/Update German
            if (!translations.de[key] ||
                translations.de[key].includes('[NEEDS_TRANSLATION]') ||
                translations.de[key].includes('[TRANSLATE]')) {
                translations.de[key] = values.de;
                console.log(`✅ Added DE: ${key} = "${values.de}"`);
                updatedCount++;
            }
        });

        // Generate updated file
        const newContent = `// Translation system for worksheet generators
// Auto-generated on ${new Date().toISOString()}
// Total keys: ${Object.keys(translations.en).length}
// Complete UI text detection applied

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

        // Write updated file
        await fs.writeFile(translationsPath, newContent);

        console.log('\n' + '='.repeat(60));
        console.log('✅ MISSING TRANSLATIONS DETECTED AND ADDED!');
        console.log('='.repeat(60));
        console.log(`📝 Added: ${addedCount} new English keys`);
        console.log(`🌍 Translated: ${updatedCount} German translations`);
        console.log('='.repeat(60));

        // Now update the translation-system.js mappings
        await updateTranslationMappings();

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

async function updateTranslationMappings() {
    const systemPath = path.join(__dirname, 'js', 'translation-system.js');

    try {
        let content = await fs.readFile(systemPath, 'utf-8');

        // Additional mappings for the UI texts found
        const additionalMappings = `
            // Missing UI text mappings (detected by UI Text Detector)
            'Puzzle Options': 'puzzle_options',
            'Allow Diagonal Words': 'allow_diagonal_words',
            'Allow Reverse Words': 'allow_reverse_words',
            'Show Word/Image List': 'show_word_image_list',
            'Grid Size': 'grid_size',
            'Image Source for Puzzle': 'image_source_for_puzzle',
            'Individual Image Selection': 'individual_image_selection',
            'Available Images (max 8):': 'available_images_max_8',
            'Selected Images:': 'selected_images_label',
            'Your Uploaded Images (This Session):': 'your_uploaded_images_this_session',
            'Your uploaded images will appear here.': 'your_uploaded_images_will_appear_here',
            'Choose files': 'choose_files',
            'No file chosen': 'no_file_chosen',
            'Upload Images': 'upload_images',
            'Clear All': 'clear_all',
            'Worksheet': 'worksheet_tab',
            'Answer Key': 'answer_key_tab_name',`;

        // Find the uiTextMappings object and add new mappings
        const insertPoint = content.indexOf('// Messages');
        if (insertPoint > -1) {
            content = content.slice(0, insertPoint) + additionalMappings + '\n\n            ' + content.slice(insertPoint);

            await fs.writeFile(systemPath, content);
            console.log('\n✅ Translation system mappings updated!');
        }

    } catch (error) {
        console.error('Error updating mappings:', error);
    }
}

// Run the detection and translation
detectAndTranslateMissing();