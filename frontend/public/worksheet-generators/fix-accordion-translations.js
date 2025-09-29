/**
 * Fix Accordion Menu Translations
 * Adds German translations for all accordion menu content including labels, placeholders, and options
 */

const fs = require('fs').promises;
const path = require('path');

async function fixAccordionTranslations() {
    const translationsPath = path.join(__dirname, 'js', 'translations.js');

    // Complete accordion content translations
    const accordionTranslations = {
        // Accordion headers (ensure they exist)
        "word_search": "Wortsuche",
        "page_scene": "Seite & Layout",
        "text_tools": "Textwerkzeuge",
        "puzzle_settings": "Rätsel-Einstellungen",
        "image_library": "Bilderbibliothek",
        "upload_custom_images": "Eigene Bilder hochladen",

        // Language selection
        "language_label": "Sprache:",
        "english": "Englisch",
        "deutsch_german": "Deutsch",
        "francais_french": "Französisch",
        "espanol_spanish": "Spanisch",
        "portugues_portuguese": "Portugiesisch",
        "italiano_italian": "Italienisch",
        "nederlands_dutch": "Niederländisch",
        "svenska_swedish": "Schwedisch",
        "dansk_danish": "Dänisch",
        "norsk_norwegian": "Norwegisch",
        "suomi_finnish": "Finnisch",

        // Page setup labels
        "page_size_label": "Seitenformat:",
        "letter_portrait_8_5x11": "Letter Hochformat (8,5×11\")",
        "letter_landscape_11x8_5": "Letter Querformat (11×8,5\")",
        "a4_portrait_210x297mm": "A4 Hochformat (210×297mm)",
        "a4_landscape_297x210mm": "A4 Querformat (297×210mm)",
        "custom": "Benutzerdefiniert",
        "width_px": "Breite (px):",
        "height_px": "Höhe (px):",
        "apply_size": "Format anwenden",

        // Background settings
        "fallback_color": "Ersatzfarbe:",
        "background_theme_label": "Hintergrunddesign:",
        "none_use_fallback_color": "Keine (Ersatzfarbe verwenden)",
        "background_opacity_label": "Hintergrund-Transparenz:",
        "select_a_theme_for_backgrounds": "Wählen Sie ein Design für Hintergründe.",

        // Border settings
        "border_theme_label": "Rahmendesign:",
        "none": "Keine",
        "border_opacity_label": "Rahmen-Transparenz:",
        "select_a_theme_to_see_borders": "Wählen Sie ein Design für Rahmen.",

        // Text tools labels
        "content_label": "Inhalt:",
        "hello_placeholder": "Hallo!",
        "add_text_button": "Text hinzufügen",
        "color_label": "Farbe:",
        "size_label": "Größe:",
        "font_label": "Schriftart:",
        "outline_color_label": "Konturfarbe:",
        "outline_0_10": "Kontur (0-10):",

        // Puzzle settings labels
        "rows_label": "Zeilen:",
        "columns_label": "Spalten:",

        // Image library labels
        "theme_label": "Thema:",
        "use_random_theme": "-- Zufälliges Thema verwenden --",
        "filter_by_theme": "Nach Thema filtern:",
        "search_images_label": "Bilder suchen:",
        "search_placeholder": "z.B. Apfel, Auto",
        "all_themes_randomly": "Alle Themen (zufällig)",
        "all_themes_for_search": "Alle Themen (für Suche)",
        "selected_images": "Ausgewählte Bilder",
        "click_to_select_image": "Klicken zum Auswählen",

        // Upload section
        "select_images_to_upload": "Bild(er) zum Hochladen auswählen:",
        "upload_images_button": "Bilder hochladen",
        "max_50_images": "Max. 50 Bilder",
        "supported_formats": "JPG, PNG, GIF, WEBP",

        // Additional UI text found in accordion
        "image_names_and_themes_will_be_displayed": "Bildnamen und Themen werden in der gewählten Sprache angezeigt.",
        "page_setup": "Seiteneinrichtung",
        "background": "Hintergrund",
        "border": "Rahmen",

        // Font options (keep in English as they're proper names, but add if needed)
        "lexend_deca": "Lexend Deca",
        "baloo_2": "Baloo 2",
        "nunito": "Nunito",
        "quicksand": "Quicksand",
        "fredoka": "Fredoka",
        "arial": "Arial",
        "verdana": "Verdana",

        // Common words that appear in options
        "all": "Alle",
        "selected": "Ausgewählt",
        "random": "Zufällig",
        "default": "Standard",

        // Make sure these key accordion translations exist
        "puzzle_einstellungen": "Rätsel-Einstellungen",
        "bilderbibliothek": "Bilderbibliothek",
        "word_search_menu": "Wortsuche",
        "page_and_scene": "Seite & Layout",
        "text_werkzeuge": "Textwerkzeuge",
        "eigene_bilder_hochladen": "Eigene Bilder hochladen"
    };

    try {
        // Read existing translations
        let content = await fs.readFile(translationsPath, 'utf-8');
        const match = content.match(/const translations = ({[\s\S]*});/);

        if (!match) {
            console.error('Could not parse translations file');
            return;
        }

        // Parse translations
        const translations = eval('(' + match[1] + ')');

        // Update German translations
        let updatedCount = 0;
        let addedCount = 0;

        Object.entries(accordionTranslations).forEach(([key, value]) => {
            // Check if key exists in German
            if (translations.de) {
                if (translations.de[key]) {
                    // Update if it contains placeholder or is the same as English
                    if (translations.de[key].includes('[NEEDS_TRANSLATION]') ||
                        (translations.en[key] && translations.de[key] === translations.en[key])) {
                        translations.de[key] = value;
                        updatedCount++;
                        console.log(`✅ Updated: ${key} = ${value}`);
                    }
                } else {
                    // Add if missing
                    translations.de[key] = value;
                    addedCount++;
                    console.log(`➕ Added: ${key} = ${value}`);
                }
            }

            // Also ensure English version exists for new keys
            if (!translations.en[key]) {
                // Generate English from key or use specific mapping
                let englishText = key.replace(/_/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase());

                // Override with specific English text where needed
                const englishMappings = {
                    "language_label": "Language:",
                    "page_size_label": "Page Size:",
                    "width_px": "Width (px):",
                    "height_px": "Height (px):",
                    "fallback_color": "Fallback Color:",
                    "background_theme_label": "Background Theme:",
                    "border_theme_label": "Border Theme:",
                    "background_opacity_label": "Background Opacity:",
                    "border_opacity_label": "Border Opacity:",
                    "content_label": "Content:",
                    "hello_placeholder": "Hello!",
                    "color_label": "Color:",
                    "size_label": "Size:",
                    "font_label": "Font:",
                    "outline_color_label": "Outline Color:",
                    "outline_0_10": "Outline (0-10):",
                    "rows_label": "Rows:",
                    "columns_label": "Columns:",
                    "theme_label": "Theme:",
                    "filter_by_theme": "Filter by Theme:",
                    "search_images_label": "Search Images:",
                    "search_placeholder": "e.g., apple, car",
                    "use_random_theme": "-- Use Random Theme --",
                    "all_themes_randomly": "All Themes (Randomly)",
                    "all_themes_for_search": "All Themes (for search)",
                    "none_use_fallback_color": "None (Use Fallback Color)",
                    "select_images_to_upload": "Select image(s) to upload:",
                    "upload_images_button": "Upload Images",
                    "add_text_button": "Add Text",
                    "letter_portrait_8_5x11": "Letter Portrait (8.5×11\")",
                    "letter_landscape_11x8_5": "Letter Landscape (11×8.5\")",
                    "a4_portrait_210x297mm": "A4 Portrait (210×297mm)",
                    "a4_landscape_297x210mm": "A4 Landscape (297×210mm)",
                    "max_50_images": "Max. 50 images",
                    "supported_formats": "JPG, PNG, GIF, WEBP",
                    "image_names_and_themes_will_be_displayed": "Image names and themes will be displayed in the selected language.",
                    "select_a_theme_for_backgrounds": "Select a theme for backgrounds.",
                    "select_a_theme_to_see_borders": "Select a theme to see borders.",
                    "click_to_select_image": "Click to select image",
                    "deutsch_german": "Deutsch (German)",
                    "francais_french": "Français (French)",
                    "espanol_spanish": "Español (Spanish)",
                    "portugues_portuguese": "Português (Portuguese)",
                    "italiano_italian": "Italiano (Italian)",
                    "nederlands_dutch": "Nederlands (Dutch)",
                    "svenska_swedish": "Svenska (Swedish)",
                    "dansk_danish": "Dansk (Danish)",
                    "norsk_norwegian": "Norsk (Norwegian)",
                    "suomi_finnish": "Suomi (Finnish)"
                };

                if (englishMappings[key]) {
                    translations.en[key] = englishMappings[key];
                    console.log(`📝 Added English: ${key} = ${englishMappings[key]}`);
                }
            }
        });

        // Generate updated file
        const newContent = `// Translation system for worksheet generators
// Auto-generated on ${new Date().toISOString()}
// Total keys: ${Object.keys(translations.en).length}
// German translations: Complete with accordion content

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

        // Write updated translations
        await fs.writeFile(translationsPath, newContent);

        console.log('\n✅ ACCORDION TRANSLATIONS FIXED!');
        console.log('━'.repeat(50));
        console.log(`📝 Updated: ${updatedCount} translations`);
        console.log(`➕ Added: ${addedCount} new translations`);
        console.log('━'.repeat(50));
        console.log('\n🎯 All accordion menu content now has German translations!');

    } catch (error) {
        console.error('❌ Error updating translations:', error);
    }
}

// Execute
fixAccordionTranslations();