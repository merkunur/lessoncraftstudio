"""
MISSING PIECES TRANSLATION COMPILER
Based on CRITICAL-TRANSLATION-IMPLEMENTATION-GUIDE-DO-NOT-LOSE.md

This script compiles all 11 professional translation files from translations/missing-pieces/
into a single translations-missing-pieces.js file for the missing pieces app.
"""

import re
import os

# Map of language codes to their translation file names
translation_files = {
    'de': 'translations/missing-pieces/missing-pieces-professional-german-translation.js',
    'fr': 'translations/missing-pieces/missing-pieces-professional-french-translation.js',
    'es': 'translations/missing-pieces/missing-pieces-professional-spanish-translation.js',
    'it': 'translations/missing-pieces/missing-pieces-professional-italian-translation.js',
    'pt': 'translations/missing-pieces/missing-pieces-professional-portuguese-translation.js',
    'nl': 'translations/missing-pieces/missing-pieces-professional-dutch-translation.js',
    'sv': 'translations/missing-pieces/missing-pieces-professional-swedish-translation.js',
    'da': 'translations/missing-pieces/missing-pieces-professional-danish-translation.js',
    'no': 'translations/missing-pieces/missing-pieces-professional-norwegian-translation.js',
    'fi': 'translations/missing-pieces/missing-pieces-professional-finnish-translation.js',
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
    """Get English translations from main translations.js file."""
    # For missing pieces, we'll extract English from the German file as a base
    # and translate keys to English manually

    # Common English translations that should be in all apps
    en_translations = {
        # Language names
        "language.english": "English",
        "language.german.full": "German (Deutsch)",
        "language.french.full": "French (Français)",
        "language.spanish.full": "Spanish (Español)",
        "language.portuguese.full": "Portuguese (Português)",
        "language.italian.full": "Italian (Italiano)",
        "language.dutch.full": "Dutch (Nederlands)",
        "language.swedish.full": "Swedish (Svenska)",
        "language.danish.full": "Danish (Dansk)",
        "language.norwegian.full": "Norwegian (Norsk)",
        "language.finnish.full": "Finnish (Suomi)",

        # Common UI elements
        "common.none": "None",
        "common.grayscale": "Grayscale",
        "chooseFiles": "Choose Files",
        "noFileChosen": "No file chosen",
        "filesSelected": "{count} file(s) selected",

        # Page setup
        "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
        "page.size.default": "Default Worksheet (800x1000)",
        "page.size.a4.portrait": "A4 Portrait (210×297mm)",
        "page.size.a4.landscape": "A4 Landscape (297×210mm)",
        "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
        "page.size.square": "Square (1200x1200)",
        "page.size.custom": "Custom",

        # Shape options
        "shape.square": "Square",
        "shape.circle": "Circle",
        "shape.rect.portrait": "Rectangle (Portrait)",
        "shape.rect.landscape": "Rectangle (Landscape)",
        "shape.ellipse.portrait": "Ellipse (Portrait)",
        "shape.ellipse.landscape": "Ellipse (Landscape)",

        # Font options
        "font.lexend": "Lexend Deca",
        "font.baloo": "Baloo 2",
        "font.nunito": "Nunito",
        "font.quicksand": "Quicksand",
        "font.fredoka": "Fredoka",
        "font.arial": "Arial",
        "font.verdana": "Verdana",

        # Missing pieces specific - page title and headers
        "missingpieces.page.title": "Missing Pieces - Worksheet Generator",
        "missingpieces.title": "Missing Pieces",
        "missingpieces.language.settings": "Language Settings",
        "missingpieces.page.setup": "Page Setup",
        "missingpieces.text.tools": "Text Tools",
        "missingpieces.puzzle.config": "Puzzle Configuration",
        "missingpieces.image.library": "Image Library",
        "missingpieces.upload.custom": "Upload Custom Images",

        # Page setup
        "missingpieces.select.language": "Select Language",
        "missingpieces.language.label": "Language:",
        "missingpieces.page.size": "Page Size:",
        "missingpieces.width.label": "Width (px):",
        "missingpieces.height.label": "Height (px):",
        "missingpieces.page.color": "Page Color:",
        "missingpieces.apply.size": "Apply Size",
        "missingpieces.background.title": "Background",
        "missingpieces.background.theme": "Background Theme:",
        "missingpieces.background.message": "Select a theme for backgrounds.",
        "missingpieces.background.opacity": "Background Opacity:",
        "missingpieces.border.title": "Border",
        "missingpieces.border.theme": "Border Theme:",
        "missingpieces.border.message": "Select a theme for borders.",
        "missingpieces.border.opacity": "Border Opacity:",

        # Text tools
        "missingpieces.text.add.new": "Add New Text",
        "missingpieces.text.content": "Content:",
        "missingpieces.text.placeholder": "Hello!",
        "missingpieces.text.add.button": "Add Text",
        "missingpieces.text.properties": "Selected Text Properties",
        "missingpieces.text.color": "Color:",
        "missingpieces.text.size": "Size:",
        "missingpieces.text.font": "Font:",
        "missingpieces.text.outline.color": "Outline Color:",
        "missingpieces.text.outline.width": "Outline Width (0-10):",
        "missingpieces.text.default": "New Text",
        "missingpieces.msg.text.added": "Text added to worksheet.",
        "missingpieces.msg.text.updated": "Text properties updated.",
        "missingpieces.msg.text.deleted": "Text deleted.",
        "missingpieces.msg.form.cleared": "Form cleared.",

        # Puzzle configuration
        "missingpieces.missing.count": "Missing Pieces (1–5):",
        "missingpieces.solution.options": "Solution Options (2–6):",
        "missingpieces.piece.shape": "Piece Shape:",
        "missingpieces.msg.select.image": "Please select an image for the puzzle first.",
        "missingpieces.msg.pieces.range": "Missing pieces must be between 1 and 5.",
        "missingpieces.msg.options.range": "Solution options must be between 2 and 6.",
        "missingpieces.msg.pieces.less": "Missing pieces count must be less than solution options.",
        "missingpieces.msg.distinct.pieces": "Could not find enough distinct pieces.",
        "missingpieces.msg.image.failed": "Failed to load the selected image.",

        # Image library
        "missingpieces.select.theme": "Select Theme:",
        "missingpieces.search.images": "Search Images:",
        "missingpieces.search.placeholder": "e.g. apple, car",
        "missingpieces.available.images": "Available Images:",
        "missingpieces.loading.images": "Loading images...",
        "missingpieces.selected.image": "Selected Image for Puzzle:",
        "missingpieces.msg.none.selected": "No items selected.",

        # Upload section
        "missingpieces.upload.select": "Select image(s) to upload:",
        "missingpieces.uploaded.images": "Your Uploaded Images (This Session):",
        "missingpieces.uploaded.placeholder": "Your uploaded images will appear here.",
        "missingpieces.msg.images.loaded": "{count} image(s) loaded.",

        # Toolbar actions
        "toolbar.layers": "Layers",
        "toolbar.bring.forward": "Bring Forward",
        "toolbar.send.backward": "Send Backward",
        "toolbar.align": "Align",
        "toolbar.align.selected": "Align Selected:",
        "toolbar.align.left": "Align Left",
        "toolbar.center.h": "Center Horizontally",
        "toolbar.align.right": "Align Right",
        "toolbar.align.top": "Align Top",
        "toolbar.center.v": "Center Vertically",
        "toolbar.align.bottom": "Align Bottom",
        "toolbar.align.to.page": "Align to Page:",
        "toolbar.center.page.h": "Center on Page Horizontally",
        "toolbar.center.page.v": "Center on Page Vertically",
        "toolbar.delete": "Delete Selection",
        "toolbar.msg.aligned": "Objects aligned.",
        "toolbar.msg.layer.changed": "Layer order changed.",
        "toolbar.msg.deleted": "Selected objects deleted.",
        "toolbar.msg.select.first": "Please select an object first.",
        "toolbar.msg.nothing.selected": "No objects selected.",

        # Action buttons
        "missingpieces.generate": "Generate",
        "missingpieces.generate.worksheet": "Generate Worksheet",
        "missingpieces.generate.answer": "Generate Answer Key",
        "missingpieces.download": "Download",
        "missingpieces.download.worksheet.jpeg": "Worksheet (JPEG)",
        "missingpieces.download.answer.jpeg": "Answer Key (JPEG)",
        "missingpieces.download.worksheet.pdf": "Worksheet (PDF)",
        "missingpieces.download.answer.pdf": "Answer Key (PDF)",
        "missingpieces.clear.all": "Clear All",
        "missingpieces.msg.generate.complete": "Puzzle generated successfully!",
        "missingpieces.msg.cleared": "All content cleared.",
        "missingpieces.msg.download.ready": "Download ready.",

        # Tab labels
        "missingpieces.tab.worksheet": "Worksheet",
        "missingpieces.tab.answer": "Answer Key",

        # Theme messages
        "missingpieces.themes.all": "All Themes",
        "missingpieces.msg.themes.error": "Could not load themes.",
        "missingpieces.msg.loading.default": "Loading default theme...",
        "missingpieces.msg.type.search": "Type to search all images.",
        "missingpieces.msg.searching": "Searching...",
        "missingpieces.msg.no.images": "No images found{query}",
        "missingpieces.msg.theme.loaded": "Theme loaded successfully.",
        "missingpieces.msg.search.error": "Error searching.",
        "missingpieces.msg.loading.theme": "Loading theme images...",

        # Puzzle generation messages
        "missingpieces.msg.generating": "Generating puzzle data...",
        "missingpieces.msg.generation.failed": "Puzzle generation failed. Please check your selections.",
        "missingpieces.msg.worksheet.success": "Worksheet generated successfully!",
        "missingpieces.msg.unexpected.error": "An unexpected error occurred during generation.",
        "missingpieces.msg.validation.error": "Please check the puzzle configuration.",
        "missingpieces.msg.processing.image": "Processing image for puzzle...",
        "missingpieces.msg.creating.pieces": "Creating puzzle pieces...",
        "missingpieces.msg.arranging.solution": "Arranging solution options...",
        "missingpieces.msg.finalizing": "Finalizing puzzle layout...",
        "missingpieces.msg.ready": "Puzzle ready to print.",

        # Answer key messages
        "missingpieces.msg.generate.first": "Please generate a worksheet first.",
        "missingpieces.msg.generating.answer": "Generating answer key...",
        "missingpieces.msg.answer.generated": "Answer key generated!",
        "missingpieces.msg.answer.error": "An error occurred generating the answer key.",

        # Download & export messages
        "missingpieces.msg.canvas.empty": "Canvas is empty. Please generate content first.",
        "missingpieces.msg.preparing.jpeg": "Preparing high-resolution JPEG... Please wait.",
        "missingpieces.msg.jpeg.success": "High-resolution JPEG downloaded!",
        "missingpieces.msg.jpeg.error": "Error preparing JPEG: {error}",
        "missingpieces.msg.jpeg.simple": "Error preparing JPEG.",
        "missingpieces.msg.preparing.pdf": "Preparing PDF document...",
        "missingpieces.msg.pdf.downloaded": "PDF downloaded!",
        "missingpieces.msg.pdf.error": "Error creating PDF.",
        "missingpieces.msg.pdf.error.detailed": "Error creating PDF: {error}",
        "missingpieces.msg.pdf.wait": "Please wait while PDF is being prepared...",
        "missingpieces.msg.preparing.download": "Preparing download...",
        "missingpieces.msg.grayscale.applied": "Grayscale filter applied.",
        "missingpieces.msg.grayscale.removed": "Grayscale filter removed.",

        # Background/Border loading messages
        "missingpieces.msg.loading.backgrounds": "Loading background themes...",
        "missingpieces.msg.backgrounds.error": "Could not load background themes.",
        "missingpieces.msg.loading.borders": "Loading border themes...",
        "missingpieces.msg.borders.error": "Could not load border themes.",

        # File upload messages
        "missingpieces.msg.uploads.available": "Your uploads are now available.",
        "missingpieces.msg.file.error": "Error uploading file(s).",
        "missingpieces.msg.using.upload": "Using uploaded image.",
        "missingpieces.msg.loading.uploads": "Loading uploaded images...",
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
        print(f"  {lang_code}: {len(all_translations[lang_code])} keys")
    else:
        print(f"  WARNING: File not found: {filepath}")
        all_translations[lang_code] = {}

# Build the output file
output = '''/**
 * Missing Pieces - Complete Professional Translations
 * Total Languages: 11 (en, de, fr, es, it, pt, nl, sv, da, no, fi)
 * Total Keys: 176+ per language
 *
 * This file contains all translations for the Missing Pieces worksheet generator.
 * Compiled from individual translation files in translations/missing-pieces/
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
with open('frontend/public/worksheet-generators/js/translations-missing-pieces.js', 'w', encoding='utf-8') as f:
    f.write(output)

print("\n=== Compilation Complete ===")
print(f"Created translations-missing-pieces.js with {len(languages)} languages")
print("\nKeys per language:")
for lang in languages:
    if lang in all_translations:
        print(f"  {lang}: {len(all_translations[lang])} keys")

print("\nSample translations for 'missingpieces.title' key:")
for lang in ['en', 'de', 'fr']:
    if lang in all_translations and 'missingpieces.title' in all_translations[lang]:
        print(f"  {lang}: {all_translations[lang]['missingpieces.title']}")