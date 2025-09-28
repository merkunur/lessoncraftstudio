// Treasure Hunt App - Professional German Translation
// Total: 80+ translation keys (75 unique)
// Approach: Natural, educational German as if originally developed in Germany
// App name: "Schatzsuche-Generator" (Treasure Hunt Generator - engaging educational term)

const TREASURE_HUNT_GERMAN_TRANSLATIONS = {
  de: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Schatzsuche-Generator",
    "settings.title": "Einstellungen für Arbeitsblatt",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Spracheinstellungen",
    "settings.pageSetup": "Seiteneinstellungen",
    "settings.textTools": "Textwerkzeuge",
    "settings.puzzleSetup": "Rätsel-Einrichtung",
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

    // ===== 4. PAGE SETUP (17 items) =====
    "settings.pageSize": "Seitengröße:",
    "pageSize.letterPortrait": "Letter Hochformat (612×792)",
    "pageSize.letterLandscape": "Letter Querformat (792×612)",
    "pageSize.a4Portrait": "A4 Hochformat (595×842)",
    "pageSize.a4Landscape": "A4 Querformat (842×595)",
    "pageSize.square": "Quadrat (1200×1200)",
    "pageSize.custom": "Benutzerdefiniert",
    "settings.width": "Breite (px):",
    "settings.height": "Höhe (px):",
    "settings.pageColor": "Seitenfarbe:",
    "decoration.backgroundTheme": "Hintergrundthema:",
    "decoration.none": "Kein",
    "decoration.backgroundOpacity": "Hintergrunddeckkraft:",
    "decoration.borderTheme": "Rahmenthema:",
    "decoration.borderOpacity": "Rahmendeckkraft:",
    "button.applySize": "Größe Anwenden",
    "settings.grayscale": "Graustufen",

    // ===== 5. TEXT TOOLS (7 items) =====
    "text.content": "Inhalt:",
    "text.placeholder": "Hallo!",
    "button.addText": "Text Hinzufügen",
    "text.color": "Farbe:",
    "text.size": "Größe:",
    "text.font": "Schriftart:",
    "text.default": "Neuer Text",

    // ===== 6. PUZZLE SETUP (2 items) =====
    "puzzle.generateFromTheme": "Aus Thema Generieren (Überschreibt Manuelle Auswahl):",
    "puzzle.selectTheme": "-- Thema für Arbeitsblatt Auswählen --",

    // ===== 7. IMAGE LIBRARY (7 items) =====
    "library.selectTheme": "Wörterbuchthema Auswählen:",
    "library.search": "Bilder Suchen:",
    "library.searchPlaceholder": "z.B. Apfel, Auto",
    "library.availableImages": "Verfügbare Bilder (Klicken zum manuellen Hinzufügen):",
    "library.selectUpload": "Bilder zum Hochladen auswählen:",
    "library.uploadedImages": "Deine Hochgeladenen Bilder (Klicken zum Auswählen):",
    "library.selectedCount": "Ausgewählt: {x} / 6",

    // ===== 8. TOOLBAR (6 items) =====
    "toolbar.layers": "Ebenen",
    "toolbar.bringForward": "Nach Vorne Bringen",
    "toolbar.sendBackward": "Nach Hinten Senden",
    "toolbar.delete": "Auswahl Löschen",
    "toolbar.align": "Ausrichten",
    "toolbar.center": "Zentrieren",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Generieren",
    "button.generateWorksheet": "Arbeitsblatt Generieren",
    "button.generateAnswer": "Lösungsbogen Generieren",
    "button.download": "Herunterladen",
    "button.worksheetJpeg": "Arbeitsblatt (JPEG)",
    "button.answerJpeg": "Lösungsbogen (JPEG)",
    "button.worksheetPdf": "Arbeitsblatt (PDF)",
    "button.answerPdf": "Lösungsbogen (PDF)",
    "button.clearAll": "Alles Löschen",
    "button.downloadJpeg": "JPEG Herunterladen",
    "button.downloadPdf": "PDF Herunterladen",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Arbeitsblatt",
    "tab.answerKey": "Lösungsbogen",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.textAdded": "Text hinzugefügt.",
    "message.formCleared": "Formular geleert.",
    "message.worksheetGenerated": "Arbeitsblatt generiert!",
    "message.answerGenerated": "Lösungsbogen generiert!",
    "message.downloadStarted": "Download gestartet!",
    "message.pdfDownloaded": "PDF heruntergeladen!",
    "message.pdfSuccess": "PDF heruntergeladen!",
    "message.jpegDownloaded": "JPEG-Download gestartet!",
    "message.assetAdded": "{type} hinzugefügt.",
    "message.downloadInitiated": "Download gestartet!",

    // ===== 12. ERROR MESSAGES (14 items) =====
    "message.themesLoadError": "Themen konnten nicht geladen werden.",
    "message.maxImages": "Maximum 6 Bilder ausgewählt.",
    "message.themeNoImages": 'Thema "{theme}" hat keine Bilder.',
    "message.themeLoadError": "Fehler beim Laden der Themenbilder.",
    "message.selectSixImages": "Bitte wähle genau 6 Bilder manuell aus, oder wähle ein Thema zum Generieren.",
    "message.noPuzzleData": "Keine Rätseldaten generiert.",
    "message.generateFirst": "Bitte zuerst ein Arbeitsblatt generieren.",
    "message.canvasEmpty": "Arbeitsfläche ist leer.",
    "message.jpegError": "Fehler bei der JPEG-Vorbereitung.",
    "message.pdfError": "Fehler beim Erstellen des PDFs.",
    "message.pdfCreateError": "Fehler beim Erstellen des PDFs.",
    "message.generateContent": "Bitte zuerst Inhalt generieren.",
    "message.generateWorksheet": "Bitte zuerst ein Arbeitsblatt generieren.",
    "message.jpegPrepError": "Fehler bei der JPEG-Vorbereitung.",

    // ===== 13. INFO MESSAGES (11 items) =====
    "message.selectBorderTheme": "Wähle ein Thema für Rahmen.",
    "message.selectBackgroundTheme": "Wähle ein Thema für Hintergründe.",
    "message.loading": "Laden...",
    "message.typeToSearch": "Tippe, um alle Bilder zu durchsuchen.",
    "message.searchError": "Fehler bei der Suche.",
    "message.imagesError": "Fehler beim Laden der Bilder.",
    "message.noImages": "Keine Bilder gefunden.",
    "message.uploadedHere": "Deine hochgeladenen Bilder erscheinen hier.",
    "message.preparingJpeg": "JPEG wird vorbereitet...",
    "message.preparingPdf": "PDF wird vorbereitet...",
    "themes.all": "Alle Themen (verwendet Übersetzungen)",

    // ===== 14. WATERMARKS (2 items) =====
    "watermark.free": "KOSTENLOSE VERSION - LessonCraftStudio.com",
    "watermark.freeShort": "KOSTENLOSE VERSION"

    // ===== 15. TREASURE HUNT GAME TEXT (Already in treasureHuntTranslations) =====
    // NOTE: These are already implemented in the app's treasureHuntTranslations object:
    // - startAt: "Beginne bei"
    // - move: "Gehe"
    // - north: "Norden"
    // - south: "Süden"
    // - east: "Osten"
    // - west: "Westen"
    // - square: "Feld"
    // - squares: "Felder"
    // - whereIsTreasure: "Wo ist der Schatz?"
    // These remain in treasureHuntTranslations for backward compatibility
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'de', params = {}) {
  const translation = TREASURE_HUNT_GERMAN_TRANSLATIONS[locale]?.[key] || key;
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
    TREASURE_HUNT_GERMAN_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}