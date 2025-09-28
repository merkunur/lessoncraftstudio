// Word Guess App - Professional German Translation
// Total: 93 unique translation keys
// Approach: Natural, educational German as if originally developed in Germany
// App name: "Bilderrätsel-Generator" (Image Puzzle Generator - engaging educational term)

const WORD_GUESS_GERMAN_TRANSLATIONS = {
  de: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Bilderrätsel-Generator",
    "settings.title": "Bilderrätsel-Einstellungen",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Spracheinstellungen",
    "settings.pageSetup": "Seiteneinrichtung",
    "settings.textTools": "Textwerkzeuge",
    "settings.exerciseConfig": "Übungskonfiguration",
    "library.title": "Bilderbibliothek",
    "library.uploadTitle": "Eigene Bilder Hochladen",

    // ===== 3. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Sprache:",
    "lang.en": "English (Englisch)",
    "lang.de": "Deutsch",
    "lang.fr": "Français (Französisch)",
    "lang.es": "Español (Spanisch)",
    "lang.pt": "Português (Portugiesisch)",
    "lang.it": "Italiano (Italienisch)",
    "lang.nl": "Nederlands (Niederländisch)",
    "lang.sv": "Svenska (Schwedisch)",
    "lang.da": "Dansk (Dänisch)",
    "lang.no": "Norsk (Norwegisch)",
    "lang.fi": "Suomi (Finnisch)",

    // ===== 4. PAGE SETUP (16 items) =====
    "settings.pageSize": "Seitengröße:",
    "pageSize.letterPortrait": "Letter Hochformat (612×792)",
    "pageSize.letterLandscape": "Letter Querformat (792×612)",
    "pageSize.a4Portrait": "A4 Hochformat (595×842)",
    "pageSize.a4Landscape": "A4 Querformat (842×595)",
    "pageSize.square": "Quadratisch (1200×1200)",
    "pageSize.custom": "Benutzerdefiniert",
    "settings.width": "Breite (px):",
    "settings.height": "Höhe (px):",
    "settings.pageColor": "Seitenfarbe:",
    "button.applySize": "Größe Anwenden",
    "decoration.backgroundTheme": "Hintergrundthema:",
    "decoration.none": "Keines",
    "decoration.backgroundOpacity": "Hintergrunddeckkraft:",
    "decoration.borderTheme": "Rahmenthema:",
    "decoration.borderOpacity": "Rahmendeckkraft:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Inhalt:",
    "text.placeholder": "Hallo!",
    "button.addText": "Text Hinzufügen",
    "text.color": "Farbe:",
    "text.size": "Größe:",
    "text.font": "Schriftart:",
    "text.outlineColor": "Umrissfarbe:",
    "text.outlineWidth": "Umrissstärke (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Anzahl der Rätsel (1–10):",
    "config.difficulty": "Schwierigkeit (Anzahl der Hinweise)",
    "difficulty.noClues": "Keine Hinweise",
    "difficulty.easy": "Einfach (1/2)",
    "difficulty.normal": "Normal (1/4)",
    "difficulty.tough": "Schwer (1/6)",
    "config.excludeLetters": "Buchstaben von Hinweisen ausschließen:",
    "config.excludePlaceholder": "z.B. AEIOU",
    "config.letterCase": "Groß-/Kleinschreibung",
    "case.uppercase": "Großbuchstaben",
    "case.lowercase": "Kleinbuchstaben",
    "config.includeNameDate": "Name & Datum einfügen",
    "config.includeExerciseNumbers": "Aufgabennummern anzeigen",

    // ===== 7. IMAGE LIBRARY (8 items) =====
    "library.selectTheme": "Thema wählen:",
    "library.search": "Bilder suchen:",
    "library.searchPlaceholder": "z.B. Apfel, Auto",
    "library.availableImages": "Verfügbare Bilder:",
    "library.selectedImages": "Ausgewählte Bilder für Rätsel:",
    "library.selectUpload": "Bilder zum Hochladen auswählen:",
    "library.uploadedImages": "Ihre hochgeladenen Bilder (diese Sitzung):",
    "library.selectedCount": "Ausgewählt: {x} / {y}",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Ebenen",
    "toolbar.bringForward": "Nach vorne",
    "toolbar.sendBackward": "Nach hinten",
    "toolbar.align": "Ausrichten",
    "toolbar.alignLeft": "Links ausrichten",
    "toolbar.centerH": "Horizontal zentrieren",
    "toolbar.alignRight": "Rechts ausrichten",
    "toolbar.alignTop": "Oben ausrichten",
    "toolbar.centerV": "Vertikal zentrieren",
    "toolbar.alignBottom": "Unten ausrichten",
    "toolbar.centerPageH": "Auf Seite horizontal zentrieren",
    "toolbar.centerPageV": "Auf Seite vertikal zentrieren",
    "toolbar.delete": "Auswahl löschen",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Erstellen",
    "button.generateWorksheet": "Arbeitsblatt Erstellen",
    "button.generateAnswer": "Lösungsblatt Erstellen",
    "button.download": "Herunterladen",
    "button.worksheetJpeg": "Arbeitsblatt (JPEG)",
    "button.answerJpeg": "Lösungsblatt (JPEG)",
    "button.worksheetPdf": "Arbeitsblatt (PDF)",
    "button.answerPdf": "Lösungsblatt (PDF)",
    "settings.grayscale": "Graustufen",
    "button.clearAll": "Alles Löschen",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Arbeitsblatt",
    "tab.answerKey": "Lösungsblatt",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} eigene Bilder verfügbar.",
    "message.generatingWorksheet": "Arbeitsblatt wird erstellt...",
    "message.worksheetGenerated": "Arbeitsblatt erfolgreich erstellt!",
    "message.generatingAnswer": "Lösungsblatt wird erstellt...",
    "message.answerGenerated": "Lösungsblatt erstellt!",
    "message.assetAdded": "{type} hinzugefügt.",
    "message.formCleared": "Formular gelöscht.",
    "message.downloadStarted": "Download gestartet!",
    "message.pdfDownloaded": "PDF heruntergeladen!",
    "message.pdfSuccess": "PDF heruntergeladen!",
    "message.jpegDownloaded": "JPEG-Download gestartet!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Themen konnten nicht geladen werden.",
    "message.maxImages": "Sie können maximal {count} Bilder auswählen.",
    "message.selectImages": "Bitte wählen Sie einige Bilder aus oder wählen Sie ein Thema mit Bildern.",
    "message.generateFirst": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
    "message.cannotDownloadEmpty": "Leere Datei kann nicht heruntergeladen werden: {fileName}.",
    "message.imageError": "Fehler bei der Bildvorbereitung: {error}",
    "message.generateContent": "Bitte erstellen Sie zuerst Inhalte.",
    "message.pdfError": "Fehler beim Erstellen der PDF-Datei.",
    "message.generateWorksheet": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
    "message.jpegError": "Fehler bei der JPEG-Vorbereitung.",
    "message.pdfCreateError": "Fehler beim Erstellen der PDF-Datei: {error}",
    "message.imagesError": "Fehler beim Laden der Bilder.",
    "message.borderError": "Fehler beim Laden der Rahmen.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Alle Themen (verwendet Übersetzungen)",
    "message.loading": "Lädt...",
    "message.typeToSearch": "Tippen Sie, um alle Bilder zu durchsuchen.",
    "message.noImages": "Keine Bilder gefunden {query}.",
    "message.uploadedHere": "Ihre hochgeladenen Bilder erscheinen hier.",
    "message.preparing": "{format} wird vorbereitet...",
    "message.preparingPdf": "PDF wird vorbereitet...",
    "message.preparingJpeg": "JPEG wird vorbereitet...",
    "decoration.allBorders": "Alle Rahmen",
    "message.selectBorderTheme": "Wählen Sie ein Thema, um Rahmen anzuzeigen.",
    "message.loadingBorders": "{theme} Rahmen werden geladen...",
    "message.noBorders": "Keine Rahmen gefunden.",
    "decoration.allBackgrounds": "Alle Hintergründe",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Name: ________________",
    "form.dateField": "Datum: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "KOSTENLOSE VERSION - LessonCraftStudio.com",
    "watermark.freeShort": "KOSTENLOSE VERSION"
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'de', params = {}) {
  const translation = WORD_GUESS_GERMAN_TRANSLATIONS[locale]?.[key] || key;
  return formatTranslation(translation, params);
}

function formatTranslation(template, params) {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return params.hasOwnProperty(key) ? params[key] : match;
  });
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WORD_GUESS_GERMAN_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}