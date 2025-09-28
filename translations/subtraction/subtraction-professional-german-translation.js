// Subtraction App - Professional German Translation
// Total: 145 translation keys (140 unique)
// Approach: Natural, educational German as if originally developed in Germany
// App name: "Subtraktions-Arbeitsblätter" (Subtraction Worksheets - clear educational term)

const SUBTRACTION_GERMAN_TRANSLATIONS = {
  de: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Subtraktions-Arbeitsblatt Generator",
    "settings.title": "Arbeitsblatt-Einstellungen",

    // ===== 2. ACCORDION HEADERS (7 items) =====
    "settings.language": "Spracheinstellungen",
    "settings.pageSetup": "Seiteneinrichtung",
    "settings.textTools": "Textwerkzeuge",
    "settings.exerciseConfig": "Aufgabenkonfiguration",
    "library.title": "Bildbibliothek",
    "decoration.title": "Rahmen & Hintergründe",
    "problemSettings": "Aufgabeneinstellungen",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "selectLanguage": "Sprache auswählen",
    "language": "Sprache:",
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

    // ===== 4. PAGE SETUP (24 items) =====
    "pageSize": "Seitengröße:",
    "pageSize.usLetterPortrait": "US Letter (Hochformat)",
    "pageSize.usLetterLandscape": "US Letter (Querformat)",
    "pageSize.a4Portrait": "A4 (Hochformat)",
    "pageSize.a4Landscape": "A4 (Querformat)",
    "pageSize.a3Portrait": "A3 (Hochformat)",
    "pageSize.a3Landscape": "A3 (Querformat)",
    "pageSize.tabloidPortrait": "Tabloid (Hochformat)",
    "pageSize.tabloidLandscape": "Tabloid (Querformat)",
    "pageSize.legalPortrait": "Legal (Hochformat)",
    "pageSize.legalLandscape": "Legal (Querformat)",
    "pageSize.custom": "Benutzerdefiniert",
    "widthPx": "Breite (px):",
    "heightPx": "Höhe (px):",
    "applySize": "Größe anwenden",
    "pageColor": "Seitenfarbe:",
    "background": "Hintergrund",
    "backgroundTheme": "Hintergrundthema:",
    "selectBackgroundTheme": "Wählen Sie ein Thema für Hintergründe.",
    "backgroundOpacity": "Hintergrundtransparenz:",
    "border": "Rahmen",
    "borderTheme": "Rahmenthema:",
    "selectBorderTheme": "Wählen Sie ein Thema für Rahmen.",
    "borderOpacity": "Rahmentransparenz:",

    // ===== 5. COMMON (2 items) =====
    "none": "Keine",
    "grayscale": "Graustufen",

    // ===== 6. DOWNLOAD OPTIONS (7 items) =====
    "settings.downloadOptions": "Bild-Download-Optionen",
    "settings.quality": "Qualität:",
    "quality.standard": "Standard (100%)",
    "quality.high": "Hohe Auflösung (200%)",
    "quality.ultra": "Ultra HD (300%)",
    "quality.max": "Maximum (400%)",
    "settings.grayscale": "Graustufen",

    // ===== 7. TEXT TOOLS (12 items) =====
    "addNewText": "Neuen Text hinzufügen",
    "content": "Inhalt:",
    "enterTextHerePlaceholder": "Text hier eingeben...",
    "addTextToPage": "Text zur Seite hinzufügen",
    "selectedTextProperties": "Eigenschaften des ausgewählten Textes",
    "color": "Farbe:",
    "size": "Größe:",
    "font": "Schriftart:",
    "outlineColor": "Konturfarbe:",
    "outlineWidth": "Kontur (0-10):",
    "text.strokeColor": "Umrissfarbe:",
    "text.strokeWidth": "Breite:",

    // ===== 8. FONTS (7 items) =====
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ===== 9. EXERCISE CONFIGURATION (5 items) =====
    "config.exerciseCount": "Anzahl der Aufgaben:",
    "config.maxMinuend": "Maximaler Minuend:",
    "config.includeNameDate": "Name & Datum einschließen",
    "config.includeExerciseNumbers": "Aufgabennummern einschließen",
    "config.useFriendlyBox": "Übersichtliche Darstellung verwenden",

    // ===== 10. IMAGE LIBRARY (13 items) =====
    "imageLibrary": "Bildbibliothek",
    "imageTheme": "Bildthema:",
    "searchImagesPlaceholder": "Bilder suchen...",
    "selectThemeFromDropdown": "Wählen Sie oben ein Thema aus dem Dropdown.",
    "selectedImages": "Ausgewählte Bilder",
    "selectedCount": "Ausgewählt: {count} / {max}",
    "selectedImagesWillAppear": "Ihre ausgewählten Bilder erscheinen hier.",
    "multipleChoice": "Multiple Choice (Lösungsblatt mit allen richtigen Antworten)",
    "orderMatters": "Reihenfolge wichtig (feste Bildreihenfolge)",
    "randomSelect": "Zufällige Auswahl",
    "clearSelection": "Auswahl löschen",
    "themes.all": "Alle Themen",
    "library.selectedCount": "Ausgewählt: {x} / {y}",

    // ===== 11. UPLOAD SECTION (3 items) =====
    "selectImagesToUpload": "Bilder zum Hochladen auswählen:",
    "yourUploadedImages": "Ihre hochgeladenen Bilder (diese Sitzung)",
    "uploadedImagesWillAppear": "Ihre hochgeladenen Bilder erscheinen hier.",

    // ===== 12. PROBLEM SETTINGS (6 items) =====
    "numberOfProblems": "Anzahl der Aufgaben (1-30):",
    "columns": "Spalten (1-6):",
    "imageSize": "Bildgröße (px, 20-200):",
    "spacingBetweenImages": "Abstand zwischen Bildern (px, 0-50):",
    "verticalSpacing": "Vertikaler Abstand zwischen Aufgaben (px, 0-100):",
    "includeNameDateFields": "Name/Datum-Felder einschließen",

    // ===== 13. ACTION BUTTONS (14 items) =====
    "generate": "Erstellen",
    "generateWorksheet": "Arbeitsblatt erstellen",
    "generateAnswerKey": "Lösungsblatt erstellen",
    "download": "Herunterladen",
    "worksheetJpeg": "Arbeitsblatt (JPEG)",
    "answerKeyJpeg": "Lösungsblatt (JPEG)",
    "worksheetPdf": "Arbeitsblatt (PDF)",
    "answerKeyPdf": "Lösungsblatt (PDF)",
    "clearAll": "Alles löschen",
    "button.generate": "Arbeitsblatt erstellen",
    "button.generateAnswer": "Lösungsblatt erstellen",
    "button.downloadJpeg": "JPEG herunterladen",
    "button.downloadPdf": "PDF herunterladen",
    "button.clearAll": "Alles löschen",

    // ===== 14. TABS (2 items) =====
    "worksheet": "Arbeitsblatt",
    "answerKey": "Lösungsblatt",

    // ===== 15. TOOLBAR (15 items) =====
    "layers": "Ebenen",
    "bringForward": "Nach vorne",
    "sendBackward": "Nach hinten",
    "align": "Ausrichten",
    "alignSelected": "Ausgewähltes ausrichten:",
    "alignToPage": "An Seite ausrichten:",
    "deleteSelected": "Auswahl löschen",
    "toolbar.alignLeft": "Links ausrichten",
    "toolbar.centerH": "Horizontal zentrieren",
    "toolbar.alignRight": "Rechts ausrichten",
    "toolbar.alignTop": "Oben ausrichten",
    "toolbar.centerV": "Vertikal zentrieren",
    "toolbar.alignBottom": "Unten ausrichten",
    "toolbar.centerPageH": "Horizontal auf der Seite zentrieren",
    "toolbar.centerPageV": "Vertikal auf der Seite zentrieren",

    // ===== 16. SUCCESS MESSAGES (10 items) =====
    "textAdded": "Text hinzugefügt.",
    "formCleared": "Formular gelöscht.",
    "worksheetGeneratedSuccessfully": "Arbeitsblatt erfolgreich erstellt!",
    "answerKeyGenerated": "Lösungsblatt erstellt!",
    "downloadInitiated": "Download gestartet!",
    "pdfDownloaded": "PDF heruntergeladen!",
    "jpegDownloadInitiated": "JPEG-Download gestartet!",
    "message.pdfSuccess": "PDF heruntergeladen!",
    "message.backgroundAdded": "Hintergrund hinzugefügt.",
    "message.worksheetGenerated": "Arbeitsblatt erfolgreich erstellt!",

    // ===== 17. ERROR MESSAGES (15 items) =====
    "couldNotLoadThemes": "Themen konnten nicht geladen werden.",
    "errorLoadingThemes": "Fehler beim Laden der Themen.",
    "errorDuringSearch": "Fehler bei der Suche.",
    "errorLoadingImages": "Fehler beim Laden der Bilder.",
    "maxImagesSelected": "Maximal {count} Bild(er) ausgewählt.",
    "pleaseSelectImagesFirst": "Bitte wählen Sie zuerst einige Bilder aus, entweder aus der Bibliothek oder durch Hochladen eigener Bilder.",
    "pleaseGenerateWorksheetFirst": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
    "canvasIsEmpty": "Die Arbeitsfläche ist leer. Nichts zum Herunterladen.",
    "errorPreparingJpeg": "Fehler bei der JPEG-Vorbereitung: {error}",
    "pleaseGenerateContentFirst": "Bitte erstellen Sie zuerst Inhalte.",
    "errorCreatingPdf": "Fehler beim Erstellen der PDF.",
    "message.pdfError": "Fehler beim Erstellen der PDF.",
    "message.jpegError": "Fehler bei der JPEG-Vorbereitung.",
    "message.imageLoadFailed": "Rahmen-/Hintergrundbild konnte nicht geladen werden.",
    "message.pdfCreateError": "Fehler beim Erstellen der PDF: {error}",

    // ===== 18. INFO MESSAGES (9 items) =====
    "loadingDefaultTheme": "Standardthema wird geladen...",
    "searching": "Suche läuft...",
    "loadingImagesForTheme": "Bilder für Thema werden geladen...",
    "noImagesFound": "Keine Bilder gefunden{query}.",
    "preparingFile": "{filename} wird vorbereitet...",
    "preparingPdf": "PDF wird vorbereitet...",
    "preparingJpeg": "JPEG wird vorbereitet...",
    "message.loading": "Lädt...",
    "message.preparingDownload": "Download wird vorbereitet...",

    // ===== 19. NAME/DATE FIELDS (2 items) =====
    "form.nameField": "Name: _________________________",
    "form.dateField": "Datum: ____________",

    // ===== 20. WATERMARKS (2 items) =====
    "watermark.free": "KOSTENLOSE VERSION - LessonCraftStudio.com",
    "watermark.freeShort": "KOSTENLOSE VERSION",

    // ===== 21. PREVIEW (1 item) =====
    "preview.title": "Vorschau",

    // ===== 22. SUBTRACTION-SPECIFIC FEATURES =====
    // Note: Mathematical terms and visual concepts
    // - Durchgestrichene Bilder für visuelle Subtraktion
    // - Minuend/Subtrahend bleiben als mathematische Fachbegriffe
    // - Übersichtliche Darstellung statt "Friendly Box"
    // - Antwortlinien für Schülerantworten
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'de', params = {}) {
  const translation = SUBTRACTION_GERMAN_TRANSLATIONS[locale]?.[key] || key;
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
    SUBTRACTION_GERMAN_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}