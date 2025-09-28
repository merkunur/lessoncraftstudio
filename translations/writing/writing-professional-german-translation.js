// Writing App - Professional German Translation
// Total: 103 unique translation keys
// Approach: Natural, educational German as if originally developed in Germany
// App name: "Schreibübungs-Generator" (Writing Practice Generator - standard educational term)

const WRITING_GERMAN_TRANSLATIONS = {
  de: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Schreibübungs-Generator",
    "settings.title": "Schreibübungsblatt",

    // ===== 2. LANGUAGE SECTION (12 items) =====
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

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Seiteneinrichtung",
    "library.title": "Bilderbibliothek",
    "library.uploadTitle": "Eigene Bilder Hochladen",
    "settings.textTools": "Textwerkzeuge",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Seitengröße:",
    "pageSize.letterPortrait": "Letter Hochformat (8,5×11\")",
    "pageSize.letterLandscape": "Letter Querformat (11×8,5\")",
    "pageSize.a4Portrait": "A4 Hochformat (210×297mm)",
    "pageSize.a4Landscape": "A4 Querformat (297×210mm)",
    "pageSize.custom": "Benutzerdefiniert",
    "settings.width": "Breite (px):",
    "settings.height": "Höhe (px):",
    "decoration.backgroundTheme": "Hintergrundthema:",
    "decoration.none": "Keines",
    "decoration.backgroundOpacity": "Hintergrunddeckkraft:",
    "decoration.borderTheme": "Rahmenthema:",
    "decoration.borderOpacity": "Rahmendeckkraft:",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Zeile {number}",
    "row.type": "Zeilentyp:",
    "rowType.trace": "Nachspuren",
    "rowType.fadingTrace": "Verblassendes Nachspuren",
    "rowType.guidedCopy": "Geführtes Abschreiben",
    "rowType.fill": "Ausfüllen",
    "row.fontStyle": "Schriftstil:",
    "fontStyle.printRegular": "Druckschrift",
    "fontStyle.printRegularArrow": "Druckschrift mit Pfeilen",
    "fontStyle.printTracing": "Druckschrift zum Nachspuren",
    "fontStyle.printTracingArrow": "Druckschrift zum Nachspuren mit Pfeilen",
    "fontStyle.cursive": "Schreibschrift",
    "row.content": "Inhalt:",
    "content.empty": "Leer",
    "content.beginningLetter": "Anfangsbuchstabe",
    "content.wholeFileName": "Vollständiger Dateiname",
    "content.customText": "Eigener Text",
    "content.preWriting": "Schwungübungen",
    "row.customTextPlaceholder": "Eigenen Text zum Nachspuren eingeben...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Groß-/Kleinschreibung:",
    "case.uppercase": "Großbuchstaben",
    "case.lowercase": "Kleinbuchstaben",
    "case.titleCase": "Anfangsbuchstabe groß",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Strichtyp:",
    "stroke.vertical": "Senkrechte Linie",
    "stroke.horizontal": "Waagerechte Linie",
    "stroke.circle": "Kreis",
    "stroke.zigzag": "Zickzack-Linie",

    // ===== 8. IMAGE LIBRARY (11 items) =====
    "library.imageMode": "Bildmodus:",
    "imageMode.exercise": "Übungsbild",
    "imageMode.custom": "Eigene Bilder",
    "library.pickExercise": "Übungsbild auswählen (optional):",
    "library.searchPlaceholder": "Bilder suchen...",
    "library.selectedStatus": "Ausgewählt: {word}",
    "library.selectUpload": "Bild(er) zum Hochladen auswählen:",
    "library.uploadedImages": "Ihre hochgeladenen Bilder:",
    "button.unselectImage": "Auswahl aufheben",
    "button.clearSelection": "Auswahl löschen",
    "button.addSelectedImage": "Ausgewähltes Bild hinzufügen",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Neuen Text hinzufügen",
    "text.content": "Inhalt:",
    "text.placeholder": "Neuer Text",
    "text.selectedProperties": "Eigenschaften des ausgewählten Textes",
    "text.color": "Farbe:",
    "text.size": "Größe:",
    "text.font": "Schriftart:",
    "text.outlineColor": "Umrissfarbe:",
    "text.outlineWidth": "Umriss (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
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
    "toolbar.cropOverflow": "Überlauf abschneiden",
    "toolbar.lock": "Sperren",
    "toolbar.delete": "Löschen",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Zeile löschen",
    "button.addRow": "Zeile hinzufügen",
    "button.addText": "Text zum Arbeitsblatt hinzufügen",
    "button.deleteSelectedText": "Ausgewählten Text löschen",
    "button.download": "Herunterladen",
    "button.downloadPdf": "Als PDF herunterladen",
    "button.downloadJpeg": "Als JPEG herunterladen",
    "settings.grayscale": "Graustufen",
    "button.clearAll": "Alles löschen",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Zeile erfolgreich zugeschnitten.",
    "message.worksheetCleared": "Arbeitsblatt gelöscht.",
    "message.pdfDownloaded": "PDF heruntergeladen!",
    "message.jpegDownloaded": "JPEG-Download gestartet!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Zuschneiden wird für diesen Zeilentyp nicht unterstützt.",
    "message.noContentToCrop": "Diese Zeile hat keinen Inhalt zum Zuschneiden.",
    "message.noOverflow": "Kein Überlauf zum Abschneiden vorhanden.",
    "message.generateContent": "Bitte erst Inhalt generieren.",
    "message.pdfError": "Fehler beim Erstellen der PDF.",
    "message.generateWorksheet": "Bitte erst ein Arbeitsblatt generieren.",
    "message.jpegError": "Fehler beim Vorbereiten des JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (9 items) =====
    "message.selectBackgroundTheme": "Wählen Sie ein Thema für Hintergründe.",
    "message.selectBorderTheme": "Wählen Sie ein Thema für Rahmen.",
    "message.noImages": "Keine Bilder gefunden. Wählen Sie ein Thema oder versuchen Sie eine andere Suche.",
    "message.themeLoadError": "Fehler beim Laden der {type}-Themen:",
    "message.selectTheme": "Wählen Sie ein Thema.",
    "message.loading": "Lädt...",
    "message.loadError": "Fehler beim Laden von {type}.",
    "message.preparingPdf": "PDF wird vorbereitet...",
    "message.preparingJpeg": "JPEG wird vorbereitet...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Möchten Sie das Arbeitsblatt wirklich löschen? Dies kann nicht rückgängig gemacht werden.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "KOSTENLOSE VERSION - LessonCraftStudio.com",
    "watermark.freeShort": "KOSTENLOSE VERSION"
  }
};

// Helper functions
function getTranslation(key, locale = 'de', params = {}) {
  const translation = WRITING_GERMAN_TRANSLATIONS[locale]?.[key] || key;
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
    WRITING_GERMAN_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}