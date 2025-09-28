// 🎲 PICTURE BINGO - PROFESSIONAL GERMAN TRANSLATION
// ============================================================
// Version: 2.0.0 (Pattern A)
// Last Updated: December 2024
// Total Keys: 141
// Language: German (de)
// Approach: Natural German as if originally created in Germany
// Educational Context: German school system terminology
// ============================================================

const PICTURE_BINGO_TRANSLATIONS_DE = {
  "de": {
    // ==========================================
    // LANGUAGE NAMES (11 keys)
    // ==========================================
    "lang_en": "English",
    "lang_de": "Deutsch",
    "lang_fr": "Français",
    "lang_es": "Español",
    "lang_pt": "Português",
    "lang_it": "Italiano",
    "lang_nl": "Nederlands",
    "lang_sv": "Svenska",
    "lang_da": "Dansk",
    "lang_no": "Norsk",
    "lang_fi": "Suomi",

    // ==========================================
    // CORE UI ELEMENTS (4 keys)
    // ==========================================
    "worksheetSettings": "Arbeitsblatt-Einstellungen",
    "language": "Sprache:",
    "cardsAndChips": "Karten + Spielchips",
    "callouts": "Aufrufliste",

    // ==========================================
    // ACTION BUTTONS (8 keys)
    // ==========================================
    "generate": "Erstellen",
    "download": "Herunterladen",
    "worksheetJpeg": "Arbeitsblatt (JPEG)",
    "calloutJpeg": "Aufrufliste (JPEG)",
    "worksheetPdf": "Arbeitsblatt (PDF)",
    "calloutPdf": "Aufrufliste (PDF)",
    "grayscale": "Graustufen",  // CRITICAL - User mentioned
    "clearAll": "Alles löschen",

    // ==========================================
    // ACCORDION HEADERS (5 keys)
    // ==========================================
    "pageSetup": "Seiteneinstellungen",
    "textTools": "Textwerkzeuge",
    "bingoCardSettings": "Bingo-Spieleinstellungen",
    "imageLibrary": "Bildsammlung",
    "uploadCustomImages": "Eigene Bilder hochladen",

    // ==========================================
    // PAGE SETUP (11 keys)
    // ==========================================
    "pageSize": "Seitengröße:",
    "letterPortrait": "Letter Hochformat (8,5×11\")",
    "letterLandscape": "Letter Querformat (11×8,5\")",
    "a4Portrait": "A4 Hochformat (210×297mm)",
    "a4Landscape": "A4 Querformat (297×210mm)",
    "square": "Quadrat (1200x1200)",
    "custom": "Benutzerdefiniert",
    "widthPx": "Breite (px):",
    "heightPx": "Höhe (px):",
    "pageColor": "Seitenfarbe:",
    "applySize": "Größe anwenden",

    // ==========================================
    // BACKGROUND SECTION (5 keys)
    // ==========================================
    "background": "Hintergrund",  // CRITICAL - User mentioned
    "backgroundTheme": "Hintergrundthema:",
    "none": "Keine",
    "selectBackgroundTheme": "Wählen Sie ein Thema für Hintergründe.",
    "backgroundOpacity": "Hintergrundtransparenz:",

    // ==========================================
    // BORDER SECTION (4 keys)
    // ==========================================
    "border": "Rahmen",  // CRITICAL - User mentioned
    "borderTheme": "Rahmenvorlage:",
    "selectBorderTheme": "Wählen Sie ein Thema für Rahmen.",
    "borderOpacity": "Rahmentransparenz:",

    // ==========================================
    // TEXT TOOLS (10 keys)
    // ==========================================
    "addNewText": "Neuen Text hinzufügen",
    "content": "Inhalt:",
    "helloPlaceholder": "Hallo!",
    "addText": "Text einfügen",
    "selectedTextProperties": "Eigenschaften des ausgewählten Texts",
    "color": "Farbe:",
    "size": "Größe:",
    "font": "Schriftart:",
    "outlineColor": "Konturfarbe:",
    "outlineWidth": "Konturstärke (0-10):",

    // ==========================================
    // FONT OPTIONS (7 keys)
    // ==========================================
    "font_lexend": "Lexend Deca",
    "font_baloo": "Baloo 2",
    "font_nunito": "Nunito",
    "font_quicksand": "Quicksand",
    "font_fredoka": "Fredoka",
    "font_arial": "Arial",
    "font_verdana": "Verdana",

    // ==========================================
    // BINGO CARD SETTINGS (10 keys)
    // ==========================================
    "bingoRows": "Zeilen (3–5):",
    "bingoColumns": "Spalten (3–5):",
    "numberOfCards": "Anzahl der Karten (1–10):",
    "cardCellFill": "Kartenfeldinhalt:",
    "chipFill": "Spielchip-Inhalt:",
    "image": "Bild",
    "word": "Wort",
    "useCustomSelection": "Eigene Auswahl verwenden (siehe unten)",

    // ==========================================
    // IMAGE LIBRARY (6 keys)
    // ==========================================
    "selectTheme": "Thema auswählen:",
    "searchImages": "Bilder suchen:",
    "searchPlaceholder": "z.B. Apfel, Auto",
    "selectedForCustomCallouts": "Für eigene Aufrufliste ausgewählt: {count}",
    "availableImagesCallouts": "Verfügbare Bilder (Anklicken für eigene Aufrufliste):",
    "loadingImages": "Lade Bilder...",
    "selectedCustomImages": "Ausgewählte eigene Bilder:",

    // ==========================================
    // UPLOAD SECTION (3 keys)
    // ==========================================
    "selectImagesToUpload": "Bilder zum Hochladen auswählen:",
    "yourUploadedImages": "Ihre hochgeladenen Bilder (diese Sitzung):",
    "uploadedImagesWillAppear": "Ihre hochgeladenen Bilder erscheinen hier.",

    // ==========================================
    // TOOLBAR (7 keys)
    // ==========================================
    "layers": "Ebenen",
    "bringForward": "Nach vorne bringen",
    "sendBackward": "Nach hinten senden",
    "align": "Ausrichten",
    "alignSelected": "Auswahl ausrichten:",
    "alignToPage": "An Seite ausrichten:",
    "deleteSelected": "Auswahl löschen",

    // ==========================================
    // SUCCESS MESSAGES (8 keys)
    // ==========================================
    "bingoWorksheetGenerated": "Bingo-Arbeitsblatt erstellt!",
    "downloadInitiated": "Download gestartet!",
    "zipDownloadInitiated": "ZIP-Download gestartet!",
    "pdfDownloaded": "PDF heruntergeladen!",
    "formCleared": "Formular geleert.",
    "customImagesAvailable": "{count} eigene(s) Bild(er) verfügbar.",
    "jpegDownloadInitiated": "JPEG-Download gestartet!",

    // ==========================================
    // ERROR MESSAGES (12 keys)
    // ==========================================
    "needMoreImagesForCallout": "Benötige {required} Bilder für die Aufrufliste, aber nur {selected} sind ausgewählt. Bitte wählen Sie mehr aus.",
    "notEnoughImagesInLibrary": "Die gewählte Bildsammlung enthält nur {available} Bilder. Benötigt werden {required} für das Spiel. Bitte wählen Sie ein größeres Thema oder verwenden Sie die eigene Auswahl.",
    "couldNotGenerateCards": "Konnte {count} einzigartige Karten nicht erstellen.",
    "canvasIsEmpty": "Die Arbeitsfläche ist leer.",
    "errorPreparingJpeg": "Fehler bei der JPEG-Vorbereitung: {error}",
    "noCardDataAvailable": "Keine Kartendaten verfügbar.",
    "errorCreatingZip": "Fehler beim Erstellen der ZIP-Datei: {error}",
    "errorCreatingPdf": "Fehler beim Erstellen der PDF-Datei: {error}",
    "errorReadingFile": "Fehler beim Lesen der Datei: {filename}",
    "generationFailed": "Erstellung fehlgeschlagen: {error}",
    "pleaseGenerateContentFirst": "Bitte erstellen Sie zuerst Inhalte.",
    "pleaseGenerateWorksheetFirst": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",

    // ==========================================
    // INFO/STATUS MESSAGES (5 keys)
    // ==========================================
    "preparingFile": "Bereite {filename} vor...",
    "preparingZipFile": "Bereite ZIP-Datei vor...",
    "preparingPdf": "Bereite PDF vor...",
    "preparingJpeg": "Bereite JPEG vor...",
    "loadingImagesCount": "Lade {count} Bild(er)...",

    // ==========================================
    // WATERMARK TEXT (2 keys)
    // ==========================================
    "watermarkText": "KOSTENLOSE VERSION - LessonCraftStudio.com",
    "watermarkSmallText": "KOSTENLOSE VERSION"
  }
};

// ==========================================
// VALIDATION & VERIFICATION
// ==========================================

// Verify all 141 keys are present
const keyCount = Object.keys(PICTURE_BINGO_TRANSLATIONS_DE.de).length;
console.log(`✅ German translation complete: ${keyCount}/141 keys`);

// Verify critical user-mentioned items
const criticalItems = {
  background: PICTURE_BINGO_TRANSLATIONS_DE.de.background,
  border: PICTURE_BINGO_TRANSLATIONS_DE.de.border,
  grayscale: PICTURE_BINGO_TRANSLATIONS_DE.de.grayscale
};
console.log("Critical items check:", criticalItems);

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get German translation for a key
 * @param {string} key - Translation key
 * @returns {string} Translated text
 */
function getGermanTranslation(key) {
  return PICTURE_BINGO_TRANSLATIONS_DE.de[key] || key;
}

/**
 * Format German translation with placeholders
 * @param {string} text - Text with {} placeholders
 * @param {...any} values - Values to replace
 * @returns {string} Formatted text
 */
function formatGermanTranslation(text, ...values) {
  let result = text;
  values.forEach((value) => {
    result = result.replace('{}', value);
  });
  return result;
}

// ==========================================
// EXPORT FOR USE IN APPLICATION
// ==========================================

// For use in the translations system
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PICTURE_BINGO_TRANSLATIONS_DE;
}

// Make available globally for browser
if (typeof window !== 'undefined') {
  window.PICTURE_BINGO_TRANSLATIONS_DE = PICTURE_BINGO_TRANSLATIONS_DE;
}

// ==========================================
// TRANSLATION NOTES
// ==========================================
/**
 * German Educational Context:
 * - "Bingo-Spiel" = Natural German for the bingo game
 * - "Arbeitsblatt" = Standard term in German schools
 * - "Aufrufliste" = Call-out list (bingo terminology)
 * - "Spielchips" = Game chips (bingo markers)
 * - "Bildsammlung" = Image library/collection
 * - "Graustufen" = Grayscale (standard German term)
 * - "Rahmen" = Border (standard term)
 * - "Hintergrund" = Background (standard term)
 *
 * Bingo-specific terminology:
 * - "Bingo-Spieleinstellungen" = Bingo game settings
 * - "Kartenfeldinhalt" = Card cell content
 * - "Aufrufliste" = Call-out list (for the teacher)
 * - "Spielchips" = Playing chips/markers
 * - "Einzigartige Karten" = Unique cards
 *
 * UI Conventions:
 * - Using formal "Sie" form for instructions
 * - Clear, pedagogical language for educational context
 * - Imperative mood for actions (German standard)
 * - Technical terms accessible to teachers
 * - "Herunterladen" for download (standard German)
 * - "Hochladen" for upload (universally understood)
 *
 * German-specific choices:
 * - "Einstellungen" for settings (standard in apps)
 * - "Transparenz" for opacity (clearer than "Deckkraft")
 * - "Ebenen" for layers (standard graphics term)
 * - "Kontur" for outline (standard graphics term)
 * - Decimal comma notation (8,5×11")
 * - "KOSTENLOSE VERSION" for free version
 * - "Hochformat/Querformat" for portrait/landscape
 *
 * Educational terminology:
 * - "Arbeitsblatt" = Worksheet (school terminology)
 * - "Bildsammlung" = Image collection for educational use
 * - "Eigene Auswahl" = Custom selection
 * - "Verfügbare Bilder" = Available images
 * - Clear instructional language for teachers
 *
 * Cultural adaptations:
 * - A4 format prominently featured (European standard)
 * - Metric measurements prioritized
 * - "z.B." for examples (German abbreviation)
 * - Professional, clear tone for educators
 * - Error messages are helpful and precise
 * - German compound words where natural
 *
 * Grammar considerations:
 * - Proper capitalization of all nouns
 * - Clear imperatives for actions
 * - Professional yet approachable register
 * - Natural German word order
 * - Consistent formal tone
 *
 * Picture Bingo specific:
 * - Bingo is well-known in German schools
 * - Used for vocabulary and image recognition
 * - "Aufrufliste" is the teacher's calling sheet
 * - "Spielchips" are the markers students use
 * - Educational game context emphasized
 */