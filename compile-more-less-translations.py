"""
MORE LESS TRANSLATION COMPILER
Based on CRITICAL-TRANSLATION-IMPLEMENTATION-GUIDE-DO-NOT-LOSE.md

This script compiles all 11 professional translation files from translations/more-less/
into a single translations-more-less.js file for the more less app.
"""

import re
import os

# Map of language codes to their translation file names
translation_files = {
    'de': 'translations/more-less/more-less-professional-german-translation.js',
    'fr': 'translations/more-less/more-less-professional-french-translation.js',
    'es': 'translations/more-less/more-less-professional-spanish-translation.js',
    'it': 'translations/more-less/more-less-professional-italian-translation.js',
    'pt': 'translations/more-less/more-less-professional-portuguese-translation.js',
    'nl': 'translations/more-less/more-less-professional-dutch-translation.js',
    'sv': 'translations/more-less/more-less-professional-swedish-translation.js',
    'da': 'translations/more-less/more-less-professional-danish-translation.js',
    'no': 'translations/more-less/more-less-professional-norwegian-translation.js',
    'fi': 'translations/more-less/more-less-professional-finnish-translation.js',
}

def extract_translations_from_file(filepath, lang_code):
    """Extract all translation key-value pairs from a professional translation file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    translations = {}

    # Find the language object - pattern: 'de: {' or '"de": {' (both with and without quotes)
    pattern = rf'(?:"{lang_code}"|{lang_code}):\s*{{(.*?)^\s*}}'
    match = re.search(pattern, content, re.MULTILINE | re.DOTALL)

    if match:
        lang_content = match.group(1)

        # Extract all key-value pairs
        lines = lang_content.split('\n')
        for line in lines:
            # Skip comments
            if line.strip().startswith('//'):
                continue

            # Match: "key": "value",
            key_match = re.search(r'"([^"]+)":\s*"((?:[^"\\]|\\.)*)"', line)
            if key_match:
                key = key_match.group(1)
                value = key_match.group(2)
                translations[key] = value

    return translations

def get_english_translations():
    """Get English translations - base translations for all keys."""
    en_translations = {
        # Common keys that all apps need
        "chooseFiles": "Choose Files",
        "common.grayscale": "Grayscale",
        "common.none": "None",
        "filesSelected": "{count} file(s) selected",
        "noFileChosen": "No file chosen",

        # Language names
        "language.danish": "Danish",
        "language.dutch": "Dutch",
        "language.english": "English",
        "language.finnish": "Finnish",
        "language.french": "French",
        "language.german": "German",
        "language.italian": "Italian",
        "language.norwegian": "Norwegian",
        "language.portuguese": "Portuguese",
        "language.spanish": "Spanish",
        "language.swedish": "Swedish",

        # Font options
        "font.arial": "Arial",
        "font.baloo": "Baloo 2",
        "font.fredoka": "Fredoka",
        "font.lexend": "Lexend Deca",
        "font.nunito": "Nunito",
        "font.quicksand": "Quicksand",
        "font.verdana": "Verdana",

        # Page sizes
        "page.size.a4.landscape": "A4 Landscape (297×210mm)",
        "page.size.a4.portrait": "A4 Portrait (210×297mm)",
        "page.size.custom": "Custom",
        "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
        "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
        "page.size.square": "Square (1200x1200)",

        # More Less specific - will be replaced by keys from German file as template
        "moreless.apply.size": "Apply Size",
        "moreless.background.message": "Select a theme for backgrounds.",
        "moreless.background.opacity": "Background Opacity:",
        "moreless.background.theme": "Background Theme:",
        "moreless.background.title": "Background",
        "moreless.border.message": "Select a theme for borders.",
        "moreless.border.opacity": "Border Opacity:",
        "moreless.border.theme": "Border Theme:",
        "moreless.border.title": "Border",
        "moreless.clear.all": "Clear All",
        "moreless.download": "Download",
        "moreless.download.answer.jpeg": "Answer Key (JPEG)",
        "moreless.download.answer.pdf": "Answer Key (PDF)",
        "moreless.download.worksheet.jpeg": "Worksheet (JPEG)",
        "moreless.download.worksheet.pdf": "Worksheet (PDF)",
        "moreless.exercises.count": "Number of Exercises (1–8):",
        "moreless.generate": "Generate",
        "moreless.generate.answer": "Generate Answer Key",
        "moreless.generate.worksheet": "Generate Worksheet",
        "moreless.height.label": "Height (px):",
        "moreless.language.label": "Language:",
        "moreless.language.selection": "Language Selection",
        "moreless.mode.groups": "Groups",
        "moreless.mode.individual": "Individual Items",
        "moreless.mode.label": "Exercise Mode:",
        "moreless.msg.answer.generated": "Answer key generated!",
        "moreless.msg.canvas.empty": "Canvas is empty. Generate content first.",
        "moreless.msg.cleared": "All settings cleared.",
        "moreless.msg.generate.first": "Please generate a worksheet first.",
        "moreless.msg.generating": "Generating worksheet data...",
        "moreless.msg.generating.answer": "Generating answer key...",
        "moreless.msg.generation.error": "Generation error: {error}",
        "moreless.msg.image.failed": "Failed to load image.",
        "moreless.msg.images.loaded": "{count} image(s) loaded.",
        "moreless.msg.jpeg.error": "Error preparing JPEG: {error}",
        "moreless.msg.jpeg.simple": "Error preparing JPEG.",
        "moreless.msg.jpeg.success": "High-resolution JPEG downloaded!",
        "moreless.msg.no.images": "No images available.",
        "moreless.msg.pdf.downloaded": "PDF downloaded!",
        "moreless.msg.pdf.error": "Error creating PDF.",
        "moreless.msg.pdf.error.detailed": "Error creating PDF: {error}",
        "moreless.msg.preparing.jpeg": "Preparing high-resolution JPEG... Please wait.",
        "moreless.msg.preparing.pdf": "Preparing PDF document...",
        "moreless.msg.search.error": "Error searching images.",
        "moreless.msg.select.images": "Please select images first.",
        "moreless.msg.text.added": "Text added.",
        "moreless.msg.text.deleted": "Text deleted.",
        "moreless.msg.text.updated": "Text properties updated.",
        "moreless.msg.theme.loaded": "Theme loaded successfully.",
        "moreless.msg.themes.error": "Could not load themes.",
        "moreless.msg.worksheet.success": "Worksheet generated successfully!",
        "moreless.page.color": "Page Color:",
        "moreless.page.setup": "Page Setup",
        "moreless.page.size": "Page Size:",
        "moreless.page.title": "More Less - Worksheet Generator",
        "moreless.range.label": "Number Range:",
        "moreless.range.1to5": "1 to 5",
        "moreless.range.1to10": "1 to 10",
        "moreless.range.1to20": "1 to 20",
        "moreless.range.1to50": "1 to 50",
        "moreless.range.1to100": "1 to 100",
        "moreless.show.numbers": "Show Numbers",
        "moreless.tab.answer": "Answer Key",
        "moreless.tab.worksheet": "Worksheet",
        "moreless.text.add.button": "Add Text",
        "moreless.text.add.new": "Add New Text",
        "moreless.text.color": "Color:",
        "moreless.text.content": "Content:",
        "moreless.text.default": "New Text",
        "moreless.text.font": "Font:",
        "moreless.text.outline.color": "Outline Color:",
        "moreless.text.outline.width": "Outline Width (0-10):",
        "moreless.text.placeholder": "Hello!",
        "moreless.text.properties": "Selected Text Properties",
        "moreless.text.size": "Size:",
        "moreless.text.tools": "Text Tools",
        "moreless.themes.all": "All Themes",
        "moreless.title": "More Less",
        "moreless.upload.custom": "Upload Custom Images",
        "moreless.upload.select": "Select image(s) to upload:",
        "moreless.uploaded.images": "Your Uploaded Images (This Session):",
        "moreless.uploaded.placeholder": "Your uploaded images will appear here.",
        "moreless.width.label": "Width (px):",
        "moreless.worksheet.config": "Worksheet Configuration",
    }

    return en_translations

# Get all translations
all_translations = {}

# Get English
print("Creating English translations...")
all_translations['en'] = get_english_translations()
print(f"  en: {len(all_translations['en'])} keys")

# Get all other languages
for lang_code, filepath in translation_files.items():
    if os.path.exists(filepath):
        print(f"Extracting {lang_code} from {filepath}...")
        all_translations[lang_code] = extract_translations_from_file(filepath, lang_code)
        # Add file upload keys
        all_translations[lang_code]['chooseFiles'] = {
            'de': 'Dateien auswählen',
            'fr': 'Choisir des fichiers',
            'es': 'Elegir archivos',
            'it': 'Scegli file',
            'pt': 'Escolher arquivos',
            'nl': 'Bestanden kiezen',
            'sv': 'Välj filer',
            'da': 'Vælg filer',
            'no': 'Velg filer',
            'fi': 'Valitse tiedostot'
        }.get(lang_code, 'Choose Files')

        all_translations[lang_code]['noFileChosen'] = {
            'de': 'Keine Datei ausgewählt',
            'fr': 'Aucun fichier sélectionné',
            'es': 'Ningún archivo seleccionado',
            'it': 'Nessun file scelto',
            'pt': 'Nenhum arquivo escolhido',
            'nl': 'Geen bestand gekozen',
            'sv': 'Ingen fil vald',
            'da': 'Ingen fil valgt',
            'no': 'Ingen fil valgt',
            'fi': 'Ei tiedostoa valittu'
        }.get(lang_code, 'No file chosen')

        all_translations[lang_code]['filesSelected'] = {
            'de': '{count} Datei(en) ausgewählt',
            'fr': '{count} fichier(s) sélectionné(s)',
            'es': '{count} archivo(s) seleccionado(s)',
            'it': '{count} file selezionato/i',
            'pt': '{count} arquivo(s) selecionado(s)',
            'nl': '{count} bestand(en) geselecteerd',
            'sv': '{count} fil(er) valda',
            'da': '{count} fil(er) valgt',
            'no': '{count} fil(er) valgt',
            'fi': '{count} tiedosto(a) valittu'
        }.get(lang_code, '{count} file(s) selected')

        print(f"  {lang_code}: {len(all_translations[lang_code])} keys")
    else:
        print(f"  WARNING: File not found: {filepath}")
        all_translations[lang_code] = {}

# Build the output file
output = '''/**
 * More Less - Complete Professional Translations
 * Total Languages: 11 (en, de, fr, es, it, pt, nl, sv, da, no, fi)
 * Total Keys: 178+ per language
 *
 * This file contains all translations for the More Less worksheet generator.
 * Compiled from individual translation files in translations/more-less/
 */

// Define translation function if not already defined
if (typeof t === 'undefined') {
    window.t = function(key) {
        if (typeof translations === 'undefined') {
            console.warn('Translations not loaded, returning key:', key);
            return key;
        }
        const translation = (translations[window.currentLocale] && translations[window.currentLocale][key]) ||
                           (translations.en && translations.en[key]) ||
                           key;
        return translation;
    };
}

const translations = {
'''

languages = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi']

for i, lang in enumerate(languages):
    output += f'  "{lang}": {{\n'

    if lang in all_translations and all_translations[lang]:
        sorted_keys = sorted(all_translations[lang].keys())
        for j, key in enumerate(sorted_keys):
            value = all_translations[lang][key]
            # Escape the value properly
            value_escaped = value.replace('\\', '\\\\').replace('"', '\\"')
            comma = ',' if j < len(sorted_keys) - 1 else ''
            output += f'    "{key}": "{value_escaped}"{comma}\n'

    comma = ',' if i < len(languages) - 1 else ''
    output += f'  }}{comma}\n'

output += '};\n'

# Write the file
with open('frontend/public/worksheet-generators/js/translations-more-less.js', 'w', encoding='utf-8') as f:
    f.write(output)

print("\n=== Compilation Complete ===")
print(f"Created translations-more-less.js with {len(languages)} languages")
print("\nKeys per language:")
for lang in languages:
    if lang in all_translations:
        print(f"  {lang}: {len(all_translations[lang])} keys")

print("\nSample translations for 'moreless.title' key:")
for lang in ['en', 'de', 'fr']:
    if lang in all_translations and 'moreless.title' in all_translations[lang]:
        print(f"  {lang}: {all_translations[lang]['moreless.title']}")