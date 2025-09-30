#!/usr/bin/env python3
"""
Crossword Translation Compiler
Extracts and compiles all professional crossword translations
"""

import os
import re
import json

# Language configuration
LANGUAGES = [
    ('de', 'crossword-professional-german-translation.js'),
    ('fr', 'crossword-professional-french-translation.js'),
    ('es', 'crossword-professional-spanish-translation.js'),
    ('it', 'crossword-professional-italian-translation.js'),
    ('pt', 'crossword-professional-portuguese-translation.js'),
    ('nl', 'crossword-professional-dutch-translation.js'),
    ('sv', 'crossword-professional-swedish-translation.js'),
    ('da', 'crossword-professional-danish-translation.js'),
    ('no', 'crossword-professional-norwegian-translation.js'),
    ('fi', 'crossword-professional-finnish-translation.js')
]

# Base directory
BASE_DIR = r'C:\Users\rkgen\lessoncraftstudio\translations\crossword'

def extract_translations_from_file(filepath, lang_code):
    """Extract translations from a JS file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find the language object - Pattern A structure
        pattern = rf'CROSSWORD_TRANSLATIONS_{lang_code.upper()}\s*=\s*\{{\s*"{lang_code}"\s*:\s*\{{(.*?)\n\s*\}}\s*\}}'
        match = re.search(pattern, content, re.DOTALL)

        if not match:
            print(f"Could not find translations for {lang_code}")
            return None

        # Extract the translations content
        translations_str = match.group(1)

        # Parse all key-value pairs
        translations = {}
        # Match all key-value pairs, handling multiline values
        key_value_pattern = r'"([^"]+)"\s*:\s*"([^"]*(?:\\.[^"]*)*)"'

        for match in re.finditer(key_value_pattern, translations_str):
            key = match.group(1)
            value = match.group(2)
            # Unescape the value
            value = value.replace('\\"', '"').replace('\\\\', '\\')
            translations[key] = value

        return translations
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return None

def get_english_translations():
    """Define English master translations"""
    return {
        # ============= 1. LANGUAGE NAMES (11 keys) =============
        "language.english": "English",
        "language.german": "Deutsch",
        "language.french": "Français",
        "language.spanish": "Español",
        "language.portuguese": "Português",
        "language.italian": "Italiano",
        "language.dutch": "Nederlands",
        "language.swedish": "Svenska",
        "language.danish": "Dansk",
        "language.norwegian": "Norsk",
        "language.finnish": "Suomi",

        # ============= 2. MAIN UI (4 keys) =============
        "language": "Language",
        "selectLanguage": "Select Language:",
        "pageSetup": "Page Setup",
        "backgroundTheme": "Background",

        # ============= 3. PAGE HEADER & TITLE (2 keys) =============
        "crossword.page.title": "Image Crossword Generator",
        "crossword.title": "Image Crossword",

        # ============= 4. PAGE SIZE OPTIONS (6 keys) =============
        "page.size.letter.portrait": "Letter Portrait (8.5×11\")",
        "page.size.letter.landscape": "Letter Landscape (11×8.5\")",
        "page.size.a4.portrait": "A4 Portrait (210×297mm)",
        "page.size.a4.landscape": "A4 Landscape (297×210mm)",
        "page.size.square": "Square (1200×1200)",
        "page.size.custom": "Custom",

        # ============= 5. PAGE SETUP SECTION (7 keys) =============
        "crossword.page.size.label": "Page Size:",
        "crossword.width.label": "Width (px):",
        "crossword.height.label": "Height (px):",
        "crossword.apply.size": "Apply Size",
        "crossword.background.label": "Background:",
        "crossword.apply.color": "Apply Color",
        "crossword.borders.backgrounds": "Borders & Backgrounds",

        # ============= 6. BORDERS & BACKGROUNDS (10 keys) =============
        "crossword.background.theme": "Background Theme:",
        "crossword.available.backgrounds": "Available Backgrounds:",
        "crossword.background.message": "Select a theme for backgrounds.",
        "crossword.background.opacity": "Background Opacity:",
        "crossword.border.title": "Border",
        "crossword.border.theme": "Border Theme:",
        "crossword.available.borders": "Available Borders:",
        "crossword.border.message": "Select a theme for borders.",
        "crossword.border.opacity": "Border Opacity:",
        "common.none": "None",

        # ============= 7. TEXT TOOLS SECTION (11 keys) =============
        "crossword.text.tools": "Text Tools",
        "crossword.text.add.new": "Add New Text",
        "crossword.text.content.label": "Content:",
        "crossword.text.placeholder": "Enter text...",
        "crossword.text.add.button": "Add Text to Worksheet",
        "crossword.text.properties": "Selected Text Properties",
        "crossword.text.color": "Color:",
        "crossword.text.size": "Size:",
        "crossword.text.font": "Font:",
        "crossword.text.outline.color": "Outline Color:",
        "crossword.text.outline.width": "Outline Width (0-10):",
        "crossword.text.default": "New Text",

        # ============= 8. FONT OPTIONS (7 keys) =============
        "font.lexend": "Lexend Deca",
        "font.baloo": "Baloo 2",
        "font.nunito": "Nunito",
        "font.quicksand": "Quicksand",
        "font.fredoka": "Fredoka",
        "font.arial": "Arial",
        "font.verdana": "Verdana",

        # ============= 9. IMAGE LIBRARY - CROSSWORD SPECIFIC (10 keys) =============
        "crossword.image.library": "Image Library",
        "crossword.generate.theme": "Generate from Theme:",
        "crossword.select.individual": "-- Or Select Individual Images Below --",
        "crossword.browser.theme": "Image Browser Theme:",
        "crossword.search.label": "Search Images:",
        "crossword.search.placeholder": "e.g., apple, car",
        "crossword.available.images": "Available Images:",
        "crossword.loading.images": "Loading images...",
        "crossword.selected.images": "Selected Images:",
        "crossword.click.select": "Click images to add them to the crossword",

        # ============= 10. GRID OPTIONS - CROSSWORD SPECIFIC (10 keys) =============
        "crossword.grid.options": "Grid Options",
        "crossword.grid.size": "Grid Size:",
        "crossword.grid.small": "Small (10×10)",
        "crossword.grid.medium": "Medium (15×15)",
        "crossword.grid.large": "Large (20×20)",
        "crossword.cell.size.label": "Cell Size (px):",
        "crossword.numbered.cells": "Show Numbered Cells",
        "crossword.word.direction": "Word Direction:",
        "crossword.across.down": "Across & Down",
        "crossword.show.grid": "Show Grid Lines",

        # ============= 11. PUZZLE GENERATION (8 keys) =============
        "crossword.puzzle.settings": "Puzzle Settings",
        "crossword.difficulty": "Difficulty:",
        "crossword.difficulty.easy": "Easy",
        "crossword.difficulty.medium": "Medium",
        "crossword.difficulty.hard": "Hard",
        "crossword.include.wordlist": "Include Word List",
        "crossword.shuffle.clues": "Shuffle Clues",
        "crossword.auto.generate": "Auto-Generate Layout",

        # ============= 12. CLUES SECTION (7 keys) =============
        "crossword.clues.title": "Clues",
        "crossword.across.clues": "Across",
        "crossword.down.clues": "Down",
        "crossword.add.clue": "Add Clue",
        "crossword.edit.clue": "Edit Clue",
        "crossword.delete.clue": "Delete Clue",
        "crossword.clue.placeholder": "Enter clue text...",

        # ============= 13. UPLOAD SECTION (3 keys) =============
        "crossword.upload.custom": "Upload Custom Images",
        "crossword.upload.select": "Select image(s) to upload:",
        "crossword.uploaded.images": "Your uploaded images will appear here.",

        # ============= 14. TOOLBAR & ALIGNMENT (15 keys) =============
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
        "toolbar.delete": "Delete Selected",

        # ============= 15. ACTION BUTTONS (11 keys) =============
        "crossword.generate": "Generate",
        "crossword.generate.puzzle": "Generate Puzzle",
        "crossword.generate.answer": "Generate Answer Key",
        "crossword.download": "Download",
        "crossword.download.puzzle.jpeg": "Puzzle (JPEG)",
        "crossword.download.answer.jpeg": "Answer Key (JPEG)",
        "crossword.download.puzzle.pdf": "Puzzle (PDF)",
        "crossword.download.answer.pdf": "Answer Key (PDF)",
        "common.grayscale": "Grayscale",
        "crossword.clear.all": "Clear All",
        "crossword.print": "Print",

        # ============= 16. CANVAS TABS (3 keys) =============
        "crossword.tab.puzzle": "Puzzle",
        "crossword.tab.answer": "Answer Key",
        "crossword.tab.clues": "Clues",

        # ============= 17. SUCCESS MESSAGES (15 keys) =============
        "puzzleGenerated": "Puzzle generated successfully!",
        "answerKeyGenerated": "Answer key generated!",
        "pdfDownloaded": "PDF downloaded!",
        "jpegDownloadInitiated": "JPEG download initiated!",
        "puzzleCleared": "Puzzle cleared.",
        "crossword.msg.text.added": "Text added to canvas.",
        "crossword.msg.image.selected": "Image selected: {name}",
        "crossword.msg.grid.created": "Grid created successfully.",
        "crossword.msg.clue.added": "Clue added.",
        "crossword.msg.clue.updated": "Clue updated.",
        "crossword.msg.clue.deleted": "Clue deleted.",
        "crossword.msg.layout.generated": "Layout generated successfully.",
        "crossword.msg.download.ready": "Download ready.",
        "crossword.msg.theme.loaded": "Theme loaded successfully.",
        "crossword.msg.uploads.complete": "{count} image(s) uploaded.",

        # ============= 18. ERROR MESSAGES (20 keys) =============
        "selectImagesFirst": "Please select images first.",
        "gridSizeError": "Invalid grid size.",
        "errorGeneratingPuzzle": "Error generating puzzle.",
        "errorLoadingImages": "Could not load images.",
        "generatePuzzleFirst": "Generate a puzzle first.",
        "errorRenderingAnswerKey": "Error rendering answer key.",
        "canvasNotAvailable": "Canvas not available.",
        "generateContentFirst": "Please generate content first.",
        "errorCreatingPDF": "Error creating PDF.",
        "errorPreparingJPEG": "Error preparing JPEG.",
        "errorLoadingThemes": "Could not load themes.",
        "crossword.msg.no.images": "No images selected.",
        "crossword.msg.invalid.grid": "Invalid grid configuration.",
        "crossword.msg.word.too.long": "Word too long for grid.",
        "crossword.msg.no.solution": "No solution found. Try different settings.",
        "crossword.msg.file.error": "Error reading file: {filename}",
        "crossword.msg.upload.error": "Upload failed: {error}",
        "crossword.msg.theme.error": "Error loading theme: {theme}",
        "crossword.msg.max.images": "Maximum {max} images allowed.",
        "crossword.msg.min.images": "Minimum {min} images required.",

        # ============= 19. LOADING & STATUS (7 keys) =============
        "preparingPDF": "Preparing PDF...",
        "preparingJPEG": "Preparing JPEG...",
        "crossword.msg.loading": "Loading...",
        "crossword.msg.generating": "Generating puzzle...",
        "crossword.msg.processing": "Processing...",
        "crossword.msg.saving": "Saving...",
        "crossword.msg.searching": "Searching...",

        # ============= 20. TOOLTIPS (14 keys) =============
        "tooltip.bring.forward": "Bring selected object forward",
        "tooltip.send.backward": "Send selected object backward",
        "tooltip.align.left": "Align selected objects to the left",
        "tooltip.center.h": "Center selected objects horizontally",
        "tooltip.align.right": "Align selected objects to the right",
        "tooltip.align.top": "Align selected objects to the top",
        "tooltip.center.v": "Center selected objects vertically",
        "tooltip.align.bottom": "Align selected objects to the bottom",
        "tooltip.center.page.h": "Center horizontally on the page",
        "tooltip.center.page.v": "Center vertically on the page",
        "tooltip.delete": "Delete selected objects",
        "tooltip.grayscale": "Convert to grayscale",
        "tooltip.clear.all": "Clear all content",
        "tooltip.generate": "Generate crossword puzzle",

        # ============= 21. CONFIRMATION MESSAGES (3 keys) =============
        "crossword.confirm.clear": "Are you sure you want to clear the puzzle?",
        "crossword.confirm.delete": "Delete selected items?",
        "crossword.confirm.overwrite": "This will overwrite existing content. Continue?",

        # ============= 22. HELP MESSAGES (4 keys) =============
        "crossword.help.select.images": "Select images to create word-image pairs",
        "crossword.help.grid.size": "Choose grid size based on number of words",
        "crossword.help.generate": "Click Generate to create the puzzle layout",
        "crossword.help.customize": "Customize appearance and add clues as needed"
    }

def main():
    """Main function to extract and compile all translations"""

    # Start with English
    all_translations = {
        "en": get_english_translations()
    }

    # Extract all other languages
    for lang_code, filename in LANGUAGES:
        filepath = os.path.join(BASE_DIR, filename)
        print(f"Processing {lang_code} from {filename}...")

        translations = extract_translations_from_file(filepath, lang_code)
        if translations:
            all_translations[lang_code] = translations
            print(f"  [OK] Extracted {len(translations)} keys")
        else:
            print(f"  [FAIL] Failed to extract translations")

    # Save to JSON for verification
    output_json = r'C:\Users\rkgen\lessoncraftstudio\crossword-translations-extracted.json'
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(all_translations, f, ensure_ascii=False, indent=2)

    print(f"\nSaved JSON to {output_json}")

    # Print summary
    print("\n=== SUMMARY ===")
    print(f"Total languages: {len(all_translations)}")
    for lang_code, translations in all_translations.items():
        print(f"  {lang_code}: {len(translations)} keys")

if __name__ == "__main__":
    main()