/**
 * Add proper German translations for common UI elements
 */

const fs = require('fs').promises;
const path = require('path');

async function addGermanTranslations() {
    const translationsPath = path.join(__dirname, 'js', 'translations.js');

    // Common UI translations needed for testing
    const germanTranslations = {
        // Core UI elements
        "download": "Herunterladen",
        "preview": "Vorschau",
        "save": "Speichern",
        "clear": "Löschen",
        "language": "Sprache:",
        "search": "Suchen...",
        "edit": "Bearbeiten",
        "delete": "Löschen",
        "none": "Keine",
        "all": "Alle",
        "custom": "Benutzerdefiniert",
        "options": "Optionen",
        "view": "Ansicht",
        "upload": "Hochladen",
        "theme": "Thema:",

        // Grid and layout
        "rows": "Zeilen:",
        "columns": "Spalten:",
        "size": "Größe:",
        "width": "Breite",
        "height": "Höhe",
        "align": "Ausrichten",
        "flip": "Spiegeln",

        // Messages
        "loading": "Laden...",
        "error": "Fehler:",
        "instructions": "Anleitung:",
        "color": "Farbe:",
        "circle": "Kreis",
        "square": "Quadrat",

        // Borders and backgrounds
        "border": "Rahmen",
        "borders": "Rahmen",
        "background": "Hintergrund",
        "backgrounds": "Hintergründe",

        // Common UI text from wordsearch
        "word_search_settings": "Wortsuch-Einstellungen",
        "puzzle_settings": "Puzzle-Einstellungen",
        "display_settings": "Anzeigeeinstellungen",
        "image_library": "Bilderbibliothek",
        "border_background": "Rahmen & Hintergrund",
        "worksheet_settings": "Arbeitsblatt-Einstellungen",
        "answer_key": "Lösungsschlüssel",
        "new_worksheet": "Neues Arbeitsblatt",
        "worksheet_jpeg": "Arbeitsblatt (JPEG)",
        "answer_key_jpeg": "Lösungsschlüssel (JPEG)",
        "worksheet_pdf": "Arbeitsblatt (PDF)",
        "answer_key_pdf": "Lösungsschlüssel (PDF)",
        "both_pages_pdf": "Beide Seiten (PDF)"
    };

    try {
        // Read existing translations
        let content = await fs.readFile(translationsPath, 'utf-8');

        // Parse translations object
        const match = content.match(/const translations = ({[\s\S]*});/);
        if (!match) {
            console.error('Could not parse translations file');
            return;
        }

        // Evaluate to get object
        const translations = eval('(' + match[1] + ')');

        // Update German translations
        Object.entries(germanTranslations).forEach(([key, value]) => {
            if (translations.de && translations.de[key]) {
                // Replace placeholder translations
                if (translations.de[key].includes('[NEEDS_TRANSLATION]')) {
                    translations.de[key] = value;
                    console.log(`✅ Updated: ${key} = ${value}`);
                }
            }
        });

        // Also ensure these keys exist in English if they don't
        const englishDefaults = {
            "word_search_settings": "Word Search Settings",
            "puzzle_settings": "Puzzle Settings",
            "display_settings": "Display Settings",
            "image_library": "Image Library",
            "border_background": "Border & Background",
            "worksheet_settings": "Worksheet Settings",
            "answer_key": "Answer Key",
            "new_worksheet": "New Worksheet",
            "worksheet_jpeg": "Worksheet (JPEG)",
            "answer_key_jpeg": "Answer Key (JPEG)",
            "worksheet_pdf": "Worksheet (PDF)",
            "answer_key_pdf": "Answer Key (PDF)",
            "both_pages_pdf": "Both Pages (PDF)"
        };

        Object.entries(englishDefaults).forEach(([key, value]) => {
            if (!translations.en[key]) {
                translations.en[key] = value;
                console.log(`✅ Added English: ${key} = ${value}`);
            }
            // Add German if missing
            if (!translations.de[key] && germanTranslations[key]) {
                translations.de[key] = germanTranslations[key];
                console.log(`✅ Added German: ${key} = ${germanTranslations[key]}`);
            }
        });

        // Generate new content
        let newContent = `// Translation system for worksheet generators
// Auto-generated on ${new Date().toISOString()}
// Total keys: ${Object.keys(translations.en).length}

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

        // Write back
        await fs.writeFile(translationsPath, newContent);
        console.log('\n✅ German translations updated successfully!');
        console.log(`📝 Updated ${Object.keys(germanTranslations).length} translations`);

    } catch (error) {
        console.error('Error updating translations:', error);
    }
}

// Run the update
addGermanTranslations();