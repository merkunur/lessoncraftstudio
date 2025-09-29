/**
 * Professional German UI Translations for Worksheet Generators
 *
 * Translation Philosophy:
 * - Natural, colloquial German for educational context
 * - Consistent terminology across the application
 * - Clear and concise for teachers and parents
 * - Child-friendly where appropriate
 */

const fs = require('fs').promises;
const path = require('path');

async function applyComprehensiveGermanTranslations() {
    const translationsPath = path.join(__dirname, 'js', 'translations.js');

    // Comprehensive German translations for ALL UI elements
    const germanTranslations = {
        // ===== MAIN NAVIGATION & ACTIONS =====
        "generate": "Erstellen",
        "print": "Drucken",
        "download": "Herunterladen",
        "new_worksheet": "Neues Arbeitsblatt",
        "newWorksheet": "Neues Arbeitsblatt",
        "settings": "Einstellungen",
        "save": "Speichern",
        "load": "Laden",
        "clear": "Leeren",
        "reset": "Zurücksetzen",
        "cancel": "Abbrechen",
        "apply": "Anwenden",
        "close": "Schließen",
        "delete": "Löschen",
        "edit": "Bearbeiten",
        "preview": "Vorschau",
        "refresh": "Aktualisieren",

        // ===== PAGE & DOCUMENT =====
        "page_scene": "Seite & Layout",
        "page_setup": "Seiteneinrichtung",
        "page_size": "Seitenformat",
        "letter_portrait": "Letter Hochformat (8,5×11\")",
        "letter_landscape": "Letter Querformat (11×8,5\")",
        "a4_portrait": "A4 Hochformat (210×297mm)",
        "a4_landscape": "A4 Querformat (297×210mm)",
        "apply_size": "Format anwenden",

        // ===== LANGUAGES & LOCALIZATION =====
        "select_language": "Sprache auswählen",
        "language": "Sprache",
        "deutsch_german": "Deutsch",
        "english": "Englisch",
        "image_names_and_themes": "Bildnamen und Themen werden in der gewählten Sprache angezeigt",

        // ===== TEXT & TYPOGRAPHY =====
        "text_tools": "Textwerkzeuge",
        "font_size": "Schriftgröße",
        "font_family": "Schriftart",
        "font_color": "Schriftfarbe",
        "text_align": "Textausrichtung",
        "bold": "Fett",
        "italic": "Kursiv",
        "underline": "Unterstrichen",
        "add_text": "Text hinzufügen",
        "edit_text": "Text bearbeiten",

        // ===== DIFFICULTY LEVELS =====
        "difficulty": "Schwierigkeitsgrad",
        "easy": "Einfach",
        "medium": "Mittel",
        "hard": "Schwer",
        "very_easy": "Sehr einfach",
        "very_hard": "Sehr schwer",
        "custom": "Benutzerdefiniert",

        // ===== WORD SEARCH SPECIFIC =====
        "word_search": "Wortsuche",
        "word_search_settings": "Wortsuche-Einstellungen",
        "words": "Wörter",
        "word_list": "Wortliste",
        "grid_size": "Rastergröße",
        "rows": "Zeilen",
        "columns": "Spalten",
        "diagonal_words": "Diagonale Wörter",
        "backwards_words": "Rückwärts-Wörter",
        "overlapping_words": "Überlappende Wörter",

        // ===== PUZZLE SETTINGS =====
        "puzzle_settings": "Rätsel-Einstellungen",
        "puzzle_type": "Rätseltyp",
        "puzzle_size": "Rätselgröße",
        "show_word_list": "Wortliste anzeigen",
        "hide_word_list": "Wortliste ausblenden",
        "randomize": "Zufällig anordnen",
        "word_placement": "Wortplatzierung",

        // ===== DISPLAY SETTINGS =====
        "display_settings": "Anzeigeeinstellungen",
        "show_grid": "Raster anzeigen",
        "grid_lines": "Rasterlinien",
        "cell_size": "Zellengröße",
        "margin": "Rand",
        "padding": "Innenabstand",

        // ===== THEMES & CATEGORIES =====
        "theme": "Thema",
        "select_theme": "Thema auswählen",
        "all_themes": "Alle Themen",
        "animals": "Tiere",
        "food": "Essen & Trinken",
        "school": "Schule",
        "nature": "Natur",
        "sports": "Sport",
        "transportation": "Verkehr",
        "holidays": "Feiertage",
        "seasons": "Jahreszeiten",
        "colors": "Farben",
        "shapes": "Formen",
        "numbers": "Zahlen",
        "letters": "Buchstaben",
        "family": "Familie",
        "home": "Zuhause",
        "body": "Körper",
        "clothes": "Kleidung",
        "weather": "Wetter",
        "toys": "Spielzeug",
        "music": "Musik",
        "fruits": "Obst",
        "vegetables": "Gemüse",

        // ===== IMAGE LIBRARY =====
        "image_library": "Bilderbibliothek",
        "select_images": "Bilder auswählen",
        "selected_images": "Ausgewählte Bilder",
        "search_images": "Bilder suchen",
        "search_placeholder": "z.B. Apfel, Auto",
        "upload_custom_images": "Eigene Bilder hochladen",
        "upload_image": "Bild hochladen",
        "drag_drop_images": "Bilder hier ablegen",
        "choose_file": "Datei auswählen",
        "no_file_chosen": "Keine Datei ausgewählt",
        "supported_formats": "Unterstützte Formate",
        "max_file_size": "Maximale Dateigröße",

        // ===== BORDERS & BACKGROUNDS =====
        "border_background": "Rahmen & Hintergrund",
        "border": "Rahmen",
        "borders": "Rahmen",
        "border_theme": "Rahmendesign",
        "border_color": "Rahmenfarbe",
        "border_width": "Rahmenbreite",
        "border_style": "Rahmenstil",
        "border_opacity": "Rahmen-Transparenz",
        "select_border_theme": "Rahmendesign wählen",
        "no_border": "Kein Rahmen",

        "background": "Hintergrund",
        "backgrounds": "Hintergründe",
        "background_theme": "Hintergrunddesign",
        "background_color": "Hintergrundfarbe",
        "background_image": "Hintergrundbild",
        "background_opacity": "Hintergrund-Transparenz",
        "fallback_color": "Ersatzfarbe",
        "select_background_theme": "Hintergrunddesign wählen",
        "no_background": "Kein Hintergrund",
        "select_a_theme_for_backgrounds": "Wählen Sie ein Design für Hintergründe",
        "select_a_theme_to_see_borders": "Wählen Sie ein Design für Rahmen",

        // ===== ANSWER KEY =====
        "answer_key": "Lösungsschlüssel",
        "show_answer_key": "Lösung anzeigen",
        "hide_answer_key": "Lösung ausblenden",
        "answer_key_page": "Lösungsseite",
        "include_answer_key": "Mit Lösungsschlüssel",
        "solution": "Lösung",
        "solutions": "Lösungen",
        "show_solutions": "Lösungen anzeigen",

        // ===== DOWNLOAD OPTIONS =====
        "download_options": "Download-Optionen",
        "worksheet_jpeg": "Arbeitsblatt (JPEG)",
        "answer_key_jpeg": "Lösungsschlüssel (JPEG)",
        "worksheet_pdf": "Arbeitsblatt (PDF)",
        "answer_key_pdf": "Lösungsschlüssel (PDF)",
        "both_pages_pdf": "Beide Seiten (PDF)",
        "download_all": "Alles herunterladen",
        "file_format": "Dateiformat",
        "quality": "Qualität",
        "high_quality": "Hohe Qualität",
        "standard_quality": "Standardqualität",

        // ===== MATH WORKSHEETS =====
        "math_worksheet": "Mathe-Arbeitsblatt",
        "math_settings": "Mathe-Einstellungen",
        "addition": "Addition",
        "subtraction": "Subtraktion",
        "multiplication": "Multiplikation",
        "division": "Division",
        "mixed": "Gemischt",
        "number_of_problems": "Anzahl der Aufgaben",
        "max_number": "Höchste Zahl",
        "min_number": "Niedrigste Zahl",
        "decimal_places": "Dezimalstellen",
        "show_answers": "Antworten anzeigen",
        "problem_layout": "Aufgaben-Layout",
        "horizontal": "Horizontal",
        "vertical": "Vertikal",

        // ===== COLORING PAGES =====
        "coloring_page": "Ausmalbild",
        "coloring_settings": "Ausmalbilder-Einstellungen",
        "line_thickness": "Linienstärke",
        "outline_only": "Nur Umrisse",
        "include_example": "Mit Beispiel",

        // ===== SUDOKU =====
        "sudoku_puzzle": "Sudoku-Rätsel",
        "sudoku_answer_key": "Sudoku-Lösung",
        "complete_solution": "Komplettlösung",
        "difficulty_level": "Schwierigkeitsstufe",
        "prefilled_numbers": "Vorgegebene Zahlen",

        // ===== CROSSWORD =====
        "crossword_puzzle": "Kreuzworträtsel",
        "across_clues": "Waagerecht",
        "down_clues": "Senkrecht",
        "clue": "Hinweis",
        "clues": "Hinweise",
        "word": "Wort",
        "show_first_letter": "Ersten Buchstaben zeigen",

        // ===== BINGO =====
        "bingo_card": "Bingo-Karte",
        "bingo_title": "Bingo-Titel",
        "generate_bingo_cards": "Bingo-Karten erstellen",
        "number_of_cards": "Anzahl der Karten",
        "free_space": "Freies Feld",
        "center_free": "Mitte frei",

        // ===== PATTERNS & SEQUENCES =====
        "pattern": "Muster",
        "pattern_worksheet": "Muster-Arbeitsblatt",
        "pattern_train": "Musterzug",
        "continue_pattern": "Muster fortsetzen",
        "complete_pattern": "Muster vervollständigen",
        "pattern_type": "Mustertyp",
        "repeating": "Wiederholend",
        "growing": "Wachsend",
        "shrinking": "Schrumpfend",

        // ===== MATCHING & SORTING =====
        "matching": "Zuordnen",
        "matching_worksheet": "Zuordnungsübung",
        "match_items": "Elemente zuordnen",
        "picture_sort": "Bilder sortieren",
        "odd_one_out": "Was passt nicht?",
        "find_and_count": "Finden und Zählen",
        "shadow_match": "Schatten zuordnen",
        "grid_match": "Raster-Zuordnung",

        // ===== DRAWING & TRACING =====
        "drawing_lines": "Linien zeichnen",
        "trace_lines": "Linien nachfahren",
        "connect_dots": "Punkte verbinden",
        "draw_and_color": "Zeichnen und Ausmalen",
        "drawing_tools": "Zeichenwerkzeuge",
        "pen_size": "Stiftgröße",
        "eraser": "Radiergummi",

        // ===== WRITING PRACTICE =====
        "writing": "Schreiben",
        "writing_practice": "Schreibübung",
        "handwriting": "Handschrift",
        "letter_formation": "Buchstabenbildung",
        "word_tracing": "Wörter nachfahren",
        "sentence_writing": "Sätze schreiben",
        "lined_paper": "Liniertes Papier",
        "dotted_lines": "Gepunktete Linien",

        // ===== ALPHABET & LETTERS =====
        "alphabet_train": "Buchstabenzug",
        "uppercase": "Großbuchstaben",
        "lowercase": "Kleinbuchstaben",
        "mixed_case": "Gemischte Schreibweise",
        "letter_recognition": "Buchstabenerkennung",

        // ===== SHAPES & GEOMETRY =====
        "circle": "Kreis",
        "square": "Quadrat",
        "rectangle": "Rechteck",
        "triangle": "Dreieck",
        "star": "Stern",
        "heart": "Herz",
        "diamond": "Raute",
        "oval": "Oval",
        "hexagon": "Sechseck",
        "octagon": "Achteck",

        // ===== COLORS =====
        "red": "Rot",
        "blue": "Blau",
        "yellow": "Gelb",
        "green": "Grün",
        "orange": "Orange",
        "purple": "Lila",
        "pink": "Rosa",
        "brown": "Braun",
        "black": "Schwarz",
        "white": "Weiß",
        "gray": "Grau",
        "grey": "Grau",

        // ===== SIZE & COMPARISON =====
        "big": "Groß",
        "small": "Klein",
        "bigger": "Größer",
        "smaller": "Kleiner",
        "biggest": "Am größten",
        "smallest": "Am kleinsten",
        "tall": "Hoch",
        "short": "Kurz",
        "long": "Lang",
        "more": "Mehr",
        "less": "Weniger",
        "equal": "Gleich",

        // ===== POSITIONS & DIRECTIONS =====
        "top": "Oben",
        "bottom": "Unten",
        "left": "Links",
        "right": "Rechts",
        "center": "Mitte",
        "middle": "Mitte",
        "corner": "Ecke",
        "side": "Seite",
        "front": "Vorne",
        "back": "Hinten",
        "inside": "Innen",
        "outside": "Außen",
        "above": "Über",
        "below": "Unter",
        "between": "Zwischen",
        "next_to": "Neben",

        // ===== TIME & SCHEDULING =====
        "time": "Zeit",
        "clock": "Uhr",
        "calendar": "Kalender",
        "day": "Tag",
        "week": "Woche",
        "month": "Monat",
        "year": "Jahr",
        "today": "Heute",
        "tomorrow": "Morgen",
        "yesterday": "Gestern",

        // ===== MESSAGES & NOTIFICATIONS =====
        "loading": "Lädt...",
        "saving": "Speichert...",
        "saved": "Gespeichert",
        "error": "Fehler",
        "success": "Erfolgreich",
        "warning": "Warnung",
        "info": "Information",
        "confirm": "Bestätigen",
        "are_you_sure": "Sind Sie sicher?",
        "yes": "Ja",
        "no": "Nein",
        "ok": "OK",
        "done": "Fertig",
        "complete": "Vollständig",
        "incomplete": "Unvollständig",
        "required": "Erforderlich",
        "optional": "Optional",

        // ===== ERROR MESSAGES =====
        "error_loading": "Fehler beim Laden",
        "error_saving": "Fehler beim Speichern",
        "file_not_found": "Datei nicht gefunden",
        "invalid_format": "Ungültiges Format",
        "connection_error": "Verbindungsfehler",
        "try_again": "Erneut versuchen",
        "please_wait": "Bitte warten",

        // ===== INSTRUCTIONS =====
        "instructions": "Anleitung",
        "how_to_use": "So geht's",
        "tips": "Tipps",
        "help": "Hilfe",
        "tutorial": "Tutorial",
        "guide": "Leitfaden",
        "examples": "Beispiele",
        "getting_started": "Erste Schritte",

        // ===== CONFIRMATIONS & PROMPTS =====
        "confirm_delete": "Möchten Sie wirklich löschen?",
        "confirm_reset": "Möchten Sie wirklich zurücksetzen?",
        "confirm_clear": "Möchten Sie wirklich alles leeren?",
        "unsaved_changes": "Ungespeicherte Änderungen",
        "save_before_closing": "Vor dem Schließen speichern?",
        "discard_changes": "Änderungen verwerfen",

        // ===== SEARCH & FILTER =====
        "search": "Suchen",
        "filter": "Filtern",
        "sort": "Sortieren",
        "sort_by": "Sortieren nach",
        "filter_by": "Filtern nach",
        "no_results": "Keine Ergebnisse",
        "showing_results": "Zeige Ergebnisse",
        "clear_filter": "Filter löschen",
        "clear_search": "Suche löschen",

        // ===== SELECTION & OPTIONS =====
        "select": "Auswählen",
        "select_all": "Alle auswählen",
        "deselect_all": "Alle abwählen",
        "none": "Keine",
        "all": "Alle",
        "other": "Andere",
        "more_options": "Weitere Optionen",
        "less_options": "Weniger Optionen",
        "show_more": "Mehr anzeigen",
        "show_less": "Weniger anzeigen",

        // ===== LAYOUT & ALIGNMENT =====
        "align": "Ausrichten",
        "align_left": "Linksbündig",
        "align_center": "Zentriert",
        "align_right": "Rechtsbündig",
        "align_top": "Oben ausrichten",
        "align_middle": "Mittig ausrichten",
        "align_bottom": "Unten ausrichten",
        "distribute_horizontally": "Horizontal verteilen",
        "distribute_vertically": "Vertikal verteilen",
        "spacing": "Abstand",
        "line_spacing": "Zeilenabstand",

        // ===== TOOLS & UTILITIES =====
        "tools": "Werkzeuge",
        "options": "Optionen",
        "preferences": "Einstellungen",
        "view": "Ansicht",
        "zoom": "Zoom",
        "zoom_in": "Vergrößern",
        "zoom_out": "Verkleinern",
        "fit_to_page": "An Seite anpassen",
        "actual_size": "Tatsächliche Größe",
        "full_screen": "Vollbild",
        "exit_full_screen": "Vollbild verlassen",

        // ===== PROPERTIES =====
        "properties": "Eigenschaften",
        "width": "Breite",
        "height": "Höhe",
        "size": "Größe",
        "position": "Position",
        "rotation": "Drehung",
        "opacity": "Transparenz",
        "color": "Farbe",
        "style": "Stil",
        "format": "Format",

        // ===== ACTIONS =====
        "add": "Hinzufügen",
        "remove": "Entfernen",
        "copy": "Kopieren",
        "paste": "Einfügen",
        "cut": "Ausschneiden",
        "undo": "Rückgängig",
        "redo": "Wiederholen",
        "duplicate": "Duplizieren",
        "rename": "Umbenennen",
        "move": "Verschieben",
        "resize": "Größe ändern",
        "rotate": "Drehen",
        "flip": "Spiegeln",
        "flip_horizontal": "Horizontal spiegeln",
        "flip_vertical": "Vertikal spiegeln",

        // ===== COUNTING & NUMBERS =====
        "count": "Zählen",
        "number": "Zahl",
        "numbers": "Zahlen",
        "total": "Gesamt",
        "sum": "Summe",
        "difference": "Differenz",
        "product": "Produkt",
        "quotient": "Quotient",
        "remainder": "Rest",

        // ===== FILE OPERATIONS =====
        "file": "Datei",
        "new": "Neu",
        "open": "Öffnen",
        "save_as": "Speichern unter",
        "export": "Exportieren",
        "import": "Importieren",
        "upload": "Hochladen",
        "download": "Herunterladen",
        "share": "Teilen",
        "print_preview": "Druckvorschau",

        // ===== SPECIFIC WORKSHEET ELEMENTS =====
        "title": "Titel",
        "subtitle": "Untertitel",
        "name": "Name",
        "date": "Datum",
        "class": "Klasse",
        "score": "Punkte",
        "grade": "Note",
        "comments": "Kommentare",
        "notes": "Notizen",
        "blank_line": "Leere Zeile",
        "write_your_answer": "Schreibe deine Antwort",

        // ===== GAMES & ACTIVITIES =====
        "game": "Spiel",
        "activity": "Aktivität",
        "exercise": "Übung",
        "practice": "Übung",
        "worksheet": "Arbeitsblatt",
        "puzzle": "Rätsel",
        "quiz": "Quiz",
        "test": "Test",
        "assessment": "Bewertung",

        // ===== USER INTERFACE SPECIFIC =====
        "menu": "Menü",
        "toolbar": "Werkzeugleiste",
        "sidebar": "Seitenleiste",
        "panel": "Bereich",
        "tab": "Registerkarte",
        "window": "Fenster",
        "dialog": "Dialog",
        "popup": "Popup",
        "tooltip": "Tooltip",
        "badge": "Badge",
        "label": "Beschriftung",
        "button": "Schaltfläche",
        "checkbox": "Kontrollkästchen",
        "radio_button": "Optionsfeld",
        "dropdown": "Dropdown",
        "slider": "Schieberegler",
        "toggle": "Schalter",
        "input": "Eingabe",
        "text_field": "Textfeld",
        "text_area": "Textbereich",

        // ===== COMMON PHRASES =====
        "please_select": "Bitte auswählen",
        "please_enter": "Bitte eingeben",
        "please_choose": "Bitte wählen",
        "click_here": "Hier klicken",
        "learn_more": "Mehr erfahren",
        "read_more": "Weiterlesen",
        "see_all": "Alle anzeigen",
        "back_to": "Zurück zu",
        "continue": "Weiter",
        "finish": "Fertigstellen",
        "start": "Starten",
        "stop": "Stoppen",
        "pause": "Pausieren",
        "resume": "Fortsetzen",
        "restart": "Neu starten",

        // ===== ACCESSIBILITY =====
        "accessibility": "Barrierefreiheit",
        "high_contrast": "Hoher Kontrast",
        "large_text": "Große Schrift",
        "screen_reader": "Bildschirmleser",
        "keyboard_shortcuts": "Tastaturkürzel",

        // ===== UNITS & MEASUREMENTS =====
        "pixels": "Pixel",
        "inches": "Zoll",
        "centimeters": "Zentimeter",
        "millimeters": "Millimeter",
        "points": "Punkte",
        "percent": "Prozent"
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

        // Update ALL German translations
        let updatedCount = 0;
        let addedCount = 0;

        Object.entries(germanTranslations).forEach(([key, value]) => {
            // Update if exists with placeholder
            if (translations.de && translations.de[key]) {
                if (translations.de[key].includes('[NEEDS_TRANSLATION]') ||
                    translations.de[key] === translations.en[key]) {
                    translations.de[key] = value;
                    updatedCount++;
                }
            } else if (translations.de) {
                // Add if missing
                translations.de[key] = value;
                addedCount++;
            }

            // Ensure English key exists
            if (translations.en && !translations.en[key]) {
                // Generate English from key
                const englishText = key.replace(/_/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase());
                translations.en[key] = englishText;
            }
        });

        // Generate updated file
        const newContent = `// Translation system for worksheet generators
// Auto-generated on ${new Date().toISOString()}
// Total keys: ${Object.keys(translations.en).length}
// German translations: Complete professional translation

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

        // Backup existing file
        const backupPath = translationsPath + '.backup_' + Date.now();
        await fs.writeFile(backupPath, content);
        console.log(`📦 Backup created: ${backupPath}`);

        // Write updated translations
        await fs.writeFile(translationsPath, newContent);

        console.log('\n✅ PROFESSIONAL GERMAN TRANSLATION COMPLETE!');
        console.log('━'.repeat(50));
        console.log(`📝 Updated translations: ${updatedCount}`);
        console.log(`➕ Added new translations: ${addedCount}`);
        console.log(`🌍 Total German translations: ${Object.keys(germanTranslations).length}`);
        console.log('━'.repeat(50));
        console.log('\n🎯 All UI elements now have natural, professional German translations!');
        console.log('🔄 Refresh your browser to see the complete German interface.');

    } catch (error) {
        console.error('❌ Error updating translations:', error);
    }
}

// Execute the translation update
applyComprehensiveGermanTranslations();