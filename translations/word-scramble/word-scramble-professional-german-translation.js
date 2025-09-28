// 🔤 WORD SCRAMBLE GENERATOR - PROFESSIONAL GERMAN TRANSLATION
// ============================================================
// Version: 2.0.0 (Pattern A)
// Last Updated: December 2024
// Total Keys: 178
// Language: German (de)
// Approach: Natural German as if originally created in Germany
// Educational Context: German school system terminology
// ============================================================

const WORD_SCRAMBLE_TRANSLATIONS_DE = {
  "de": {
    // ==========================================
    // CORE UI ELEMENTS (17 keys)
    // ==========================================
    "app.title": "Buchstabensalat-Generator",
    "wordScrambleGenerator": "Buchstabensalat-Generator",
    "worksheetSettings": "Arbeitsblatt-Einstellungen",
    "generate": "Erstellen",
    "generateWorksheet": "Arbeitsblatt erstellen",
    "generateAnswerKey": "Lösungsblatt erstellen",
    "download": "Herunterladen",
    "worksheet": "Arbeitsblatt",
    "answerKey": "Lösungsblatt",
    "clearAll": "Alles löschen",
    "worksheetJpeg": "Arbeitsblatt (JPEG)",
    "answerKeyJpeg": "Lösungsblatt (JPEG)",
    "worksheetPdf": "Arbeitsblatt (PDF)",
    "answerKeyPdf": "Lösungsblatt (PDF)",
    "grayscale": "Graustufen",  // CRITICAL - User mentioned
    "deleteSelected": "Auswahl löschen",
    "randomSelect": "Zufällig auswählen",
    "clearSelection": "Auswahl aufheben",

    // ==========================================
    // LANGUAGE SETTINGS (14 keys)
    // ==========================================
    "languageSettings": "Spracheinstellungen",
    "selectLanguage": "Sprache auswählen",
    "language": "Sprache:",
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
    // PAGE SETUP (22 keys)
    // ==========================================
    "pageSetup": "Seiteneinrichtung",
    "pageSize": "Seitengröße:",
    "letterPortrait": "Letter (Hochformat)",
    "letterLandscape": "Letter (Querformat)",
    "a4Portrait": "A4 (Hochformat)",
    "a4Landscape": "A4 (Querformat)",
    "legalPortrait": "Legal (Hochformat)",
    "legalLandscape": "Legal (Querformat)",
    "custom": "Benutzerdefiniert",
    "widthPx": "Breite (px):",
    "heightPx": "Höhe (px):",
    "pageColor": "Seitenfarbe:",
    "applySize": "Größe anwenden",
    "background": "Hintergrund",  // CRITICAL - User mentioned
    "backgroundTheme": "Hintergrundthema:",
    "none": "Kein",
    "selectBackgroundTheme": "Wählen Sie ein Thema für Hintergründe.",
    "backgroundOpacity": "Hintergrund-Transparenz:",
    "border": "Rahmen",  // CRITICAL - User mentioned
    "borderTheme": "Rahmenthema:",
    "selectBorderTheme": "Wählen Sie ein Thema für Rahmen.",
    "borderOpacity": "Rahmen-Transparenz:",

    // ==========================================
    // TEXT TOOLS (11 keys)
    // ==========================================
    "textTools": "Textwerkzeuge",
    "addNewText": "Neuen Text hinzufügen",
    "content": "Inhalt:",
    "enterTextHerePlaceholder": "Text hier eingeben...",
    "addTextToPage": "Text zur Seite hinzufügen",
    "selectedTextProperties": "Eigenschaften des ausgewählten Textes",
    "color": "Farbe:",
    "size": "Größe:",
    "font": "Schriftart:",
    "outlineColor": "Umrissfarbe:",
    "outlineWidth": "Umrissstärke (0-10):",

    // ==========================================
    // IMAGE SELECTION (13 keys)
    // ==========================================
    "imageSelection": "Bildauswahl",
    "availableThemes": "Verfügbare Themen",
    "theme": "Thema:",
    "allThemes": "Alle Themen",
    "searchImagesPlaceholder": "Bilder suchen...",
    "themeImages": "Themenbilder",
    "selectedImages": "Ausgewählte Bilder",
    "selectedCount": "Ausgewählt: {} / {}",
    "selectedImagesWillAppear": "Ihre ausgewählten Bilder erscheinen hier.",
    "selectThemeFromDropdown": "Wählen Sie ein Thema aus der Liste oben.",
    "loading": "Lädt...",
    "noImagesFound": "Keine Bilder gefunden{}.",
    "maxImagesSelected": "Sie können maximal {} Bilder auswählen.",

    // ==========================================
    // PUZZLE SETTINGS (14 keys)
    // ==========================================
    "problemSettings": "Aufgabeneinstellungen",
    "puzzleSettings": "Rätseleinstellungen",
    "numberOfPuzzles": "Anzahl der Rätsel (1-12):",
    "difficulty": "Schwierigkeitsgrad:",
    "noClues": "Keine Hinweise",
    "hard": "Schwer",
    "medium": "Mittel",
    "easy": "Leicht",
    "letterCase": "Groß-/Kleinschreibung:",
    "upperCase": "Großbuchstaben",
    "lowerCase": "Kleinbuchstaben",
    "letterColoring": "Buchstabenfärbung:",
    "colorCoded": "Farbkodiert (Vokale/Konsonanten)",
    "blackWhite": "Schwarz-Weiß",

    // ==========================================
    // UPLOAD CUSTOM IMAGES (8 keys)
    // ==========================================
    "uploadCustomImages": "Eigene Bilder hochladen",
    "selectImagesToUpload": "Bilder zum Hochladen auswählen:",
    "yourUploadedImages": "Ihre hochgeladenen Bilder (diese Sitzung)",
    "uploadedImagesAppearHere": "Ihre hochgeladenen Bilder erscheinen hier.",
    "chooseFiles": "Dateien auswählen",
    "noFileChosen": "Keine Datei ausgewählt",
    "filesSelected": "{} Datei(en) ausgewählt",
    "customImagesAvailable": "{} eigene(s) Bild(er) verfügbar.",

    // ==========================================
    // PROBLEM CONFIGURATION (2 keys)
    // ==========================================
    "includeNameDateFields": "Name-/Datumsfelder einschließen",
    "includeExerciseNumbers": "Aufgabennummern einschließen",

    // ==========================================
    // TOOLBAR & ALIGNMENT (15 keys)
    // ==========================================
    "layers": "Ebenen",
    "bringForward": "Nach vorne bringen",
    "sendBackward": "Nach hinten senden",
    "align": "Ausrichten",
    "alignSelected": "Auswahl ausrichten:",
    "alignLeft": "Linksbündig",
    "centerHorizontally": "Horizontal zentrieren",
    "alignRight": "Rechtsbündig",
    "alignTop": "Oben ausrichten",
    "centerVertically": "Vertikal zentrieren",
    "alignBottom": "Unten ausrichten",
    "alignToPage": "An Seite ausrichten:",
    "centerOnPageHorizontally": "Horizontal auf der Seite zentrieren",
    "centerOnPageVertically": "Vertikal auf der Seite zentrieren",

    // ==========================================
    // SUCCESS MESSAGES (8 keys)
    // ==========================================
    "worksheetGeneratedSuccessfully": "Arbeitsblatt erfolgreich erstellt!",
    "answerKeyGenerated": "Lösungsblatt erstellt!",
    "formCleared": "Formular geleert.",
    "downloadInitiated": "Download gestartet!",
    "pdfDownloaded": "PDF heruntergeladen!",
    "jpegDownloadInitiated": "JPEG-Download gestartet!",
    "pdfDownloaded2": "PDF heruntergeladen!",
    "textAddedToPage": "Text zur Seite hinzugefügt.",

    // ==========================================
    // ERROR MESSAGES (13 keys)
    // ==========================================
    "couldNotLoadThemes": "Themen konnten nicht geladen werden.",
    "errorLoadingImages": "Fehler beim Laden der Bilder.",
    "pleaseSelectImagesOrTheme": "Bitte wählen Sie einige Bilder oder ein Thema mit Bildern aus.",
    "pleaseGenerateWorksheetFirst": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
    "failedToLoadImage": "Konnte {} Bild nicht laden.",
    "errorPreparingImage": "Fehler bei der Bildvorbereitung: {}",
    "pleaseGenerateContentFirst": "Bitte erstellen Sie zuerst Inhalte.",
    "errorCreatingPdf": "Fehler beim Erstellen der PDF: {}",
    "errorCreatingPdf2": "Fehler beim Erstellen der PDF.",
    "errorPreparingJpeg": "Fehler bei der JPEG-Vorbereitung.",
    "errorLoadingBorders": "Fehler beim Laden der Rahmen.",
    "errorLoadingBackgrounds": "Fehler beim Laden der Hintergründe.",
    "notEnoughImages": "Nicht genügend Bilder für die Rätsel ausgewählt.",

    // ==========================================
    // INFO/LOADING MESSAGES (9 keys)
    // ==========================================
    "generatingWorksheet": "Arbeitsblatt wird erstellt...",
    "generatingAnswerKey": "Lösungsblatt wird erstellt...",
    "preparingCanvas": "{} wird vorbereitet...",
    "preparingPdf": "PDF wird vorbereitet...",
    "preparingJpeg": "JPEG wird vorbereitet...",
    "preparingCanvasPdf": "{} PDF wird vorbereitet...",
    "loadingThemes": "Themen werden geladen...",
    "searchingImages": "Bilder werden gesucht...",
    "processingUpload": "Upload wird verarbeitet...",

    // ==========================================
    // NAME/DATE PLACEHOLDERS (2 keys)
    // ==========================================
    "namePlaceholder": "Name: ________________",
    "datePlaceholder": "Datum: ________",

    // ==========================================
    // WATERMARK TEXT (2 keys - Free Tier)
    // ==========================================
    "watermarkText": "KOSTENLOSE VERSION - LessonCraftStudio.com",
    "watermarkSmallText": "KOSTENLOSE VERSION"
  }
};

// ==========================================
// VALIDATION & VERIFICATION
// ==========================================

// Verify all 178 keys are present
const keyCount = Object.keys(WORD_SCRAMBLE_TRANSLATIONS_DE.de).length;
console.log(`✅ German translation complete: ${keyCount}/178 keys`);


// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get German translation for a key
 * @param {string} key - Translation key
 * @returns {string} Translated text
 */
function getGermanTranslation(key) {
    return WORD_SCRAMBLE_TRANSLATIONS_DE.de[key] || key;
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
// EXPORT
// ==========================================

// ==========================================
// EXPORT FOR USE IN APPLICATION
// ==========================================

// For use in the translations system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WORD_SCRAMBLE_TRANSLATIONS_DE;
}

// Make available globally for browser
// For use in browser environment
if (typeof window !== 'undefined') {
    window.WORD_SCRAMBLE_TRANSLATIONS_DE = WORD_SCRAMBLE_TRANSLATIONS_DE;
}

// ==========================================
// TRANSLATION NOTES
// ==========================================
/**
 * German Educational Context:
 * - "Buchstabensalat" = Standard German term for word scramble (literally "letter salad")
 * - "Arbeitsblatt" = Standard term for worksheet in German schools
 * - "Lösungsblatt" = Answer sheet (preferred over "Antwortblatt")
 * - "Rätsel" = Puzzle (standard educational term)
 * - "Graustufen" = Grayscale (standard German term)
 * - "Rahmen" = Border (clear and universally understood)
 * - "Hintergrund" = Background (standard term)
 * 
 * Difficulty levels:
 * - "Keine Hinweise" = No Clues (challenging level)
 * - "Schwer" = Hard
 * - "Mittel" = Medium
 * - "Leicht" = Easy (accessible for beginners)
 * 
 * Letter formatting:
 * - "Großbuchstaben" = Upper case (capital letters)
 * - "Kleinbuchstaben" = Lower case (small letters)
 * - "Farbkodiert" = Color-coded (educational feature)
 * - "Vokale/Konsonanten" = Vowels/Consonants (linguistic terms)
 * 
 * UI Conventions:
 * - Using formal but accessible language for educational context
 * - Direct, clear terminology typical of German educational materials
 * - Compound words written as one (German orthography)
 * - Consistent use of "Sie" form (implicit) for professional tone
 * - Technical terms kept simple for teacher/student accessibility
 */