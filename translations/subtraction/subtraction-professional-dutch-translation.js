// Subtraction App - Professional Dutch Translation
// Total: 145 translation keys (140 unique)
// Approach: Natural, educational Dutch as if originally developed in Netherlands
// App name: "Aftrekwerkbladen" (Subtraction Worksheets - standard educational term)

const SUBTRACTION_DUTCH_TRANSLATIONS = {
  nl: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Aftrekwerkbladen Generator",
    "settings.title": "Werkblad Instellingen",

    // ===== 2. ACCORDION HEADERS (7 items) =====
    "settings.language": "Taalinstellingen",
    "settings.pageSetup": "Pagina-instelling",
    "settings.textTools": "Tekstgereedschappen",
    "settings.exerciseConfig": "Oefening Configuratie",
    "library.title": "Afbeeldingen Bibliotheek",
    "decoration.title": "Randen & Achtergronden",
    "problemSettings": "Opgave Instellingen",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "selectLanguage": "Selecteer Taal",
    "language": "Taal:",
    "lang.en": "English (Engels)",
    "lang.de": "Deutsch (Duits)",
    "lang.fr": "Français (Frans)",
    "lang.es": "Español (Spaans)",
    "lang.pt": "Português (Portugees)",
    "lang.it": "Italiano (Italiaans)",
    "lang.nl": "Nederlands",
    "lang.sv": "Svenska (Zweeds)",
    "lang.da": "Dansk (Deens)",
    "lang.no": "Norsk (Noors)",
    "lang.fi": "Suomi (Fins)",

    // ===== 4. PAGE SETUP (24 items) =====
    "pageSize": "Paginaformaat:",
    "pageSize.usLetterPortrait": "US Letter (Staand)",
    "pageSize.usLetterLandscape": "US Letter (Liggend)",
    "pageSize.a4Portrait": "A4 (Staand)",
    "pageSize.a4Landscape": "A4 (Liggend)",
    "pageSize.a3Portrait": "A3 (Staand)",
    "pageSize.a3Landscape": "A3 (Liggend)",
    "pageSize.tabloidPortrait": "Tabloid (Staand)",
    "pageSize.tabloidLandscape": "Tabloid (Liggend)",
    "pageSize.legalPortrait": "Legal (Staand)",
    "pageSize.legalLandscape": "Legal (Liggend)",
    "pageSize.custom": "Aangepast",
    "widthPx": "Breedte (px):",
    "heightPx": "Hoogte (px):",
    "applySize": "Formaat Toepassen",
    "pageColor": "Paginakleur:",
    "background": "Achtergrond",
    "backgroundTheme": "Achtergrondthema:",
    "selectBackgroundTheme": "Selecteer een thema voor achtergronden.",
    "backgroundOpacity": "Achtergrond Transparantie:",
    "border": "Rand",
    "borderTheme": "Randthema:",
    "selectBorderTheme": "Selecteer een thema voor randen.",
    "borderOpacity": "Rand Transparantie:",

    // ===== 5. COMMON (2 items) =====
    "none": "Geen",
    "grayscale": "Grijstinten",

    // ===== 6. DOWNLOAD OPTIONS (7 items) =====
    "settings.downloadOptions": "Afbeelding Download Opties",
    "settings.quality": "Kwaliteit:",
    "quality.standard": "Standaard (100%)",
    "quality.high": "Hoge Resolutie (200%)",
    "quality.ultra": "Ultra HD (300%)",
    "quality.max": "Maximaal (400%)",
    "settings.grayscale": "Grijstinten",

    // ===== 7. TEXT TOOLS (12 items) =====
    "addNewText": "Nieuwe Tekst Toevoegen",
    "content": "Inhoud:",
    "enterTextHerePlaceholder": "Voer hier tekst in...",
    "addTextToPage": "Tekst aan Pagina Toevoegen",
    "selectedTextProperties": "Eigenschappen Geselecteerde Tekst",
    "color": "Kleur:",
    "size": "Grootte:",
    "font": "Lettertype:",
    "outlineColor": "Omlijning Kleur:",
    "outlineWidth": "Omlijning (0-10):",
    "text.strokeColor": "Lijnkleur:",
    "text.strokeWidth": "Breedte:",

    // ===== 8. FONTS (7 items) =====
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ===== 9. EXERCISE CONFIGURATION (5 items) =====
    "config.exerciseCount": "Aantal Oefeningen:",
    "config.maxMinuend": "Maximaal Aftrektal:",
    "config.includeNameDate": "Naam & Datum Toevoegen",
    "config.includeExerciseNumbers": "Opgavenummers Toevoegen",
    "config.useFriendlyBox": "Gebruik Overzichtelijke Weergave",

    // ===== 10. IMAGE LIBRARY (13 items) =====
    "imageLibrary": "Afbeeldingen Bibliotheek",
    "imageTheme": "Afbeeldingsthema:",
    "searchImagesPlaceholder": "Zoek afbeeldingen...",
    "selectThemeFromDropdown": "Selecteer een thema uit het menu hierboven.",
    "selectedImages": "Geselecteerde Afbeeldingen",
    "selectedCount": "Geselecteerd: {count} / {max}",
    "selectedImagesWillAppear": "Je geselecteerde afbeeldingen verschijnen hier.",
    "multipleChoice": "Meerkeuze (antwoordblad met alle juiste antwoorden)",
    "orderMatters": "Volgorde is Belangrijk (vaste afbeeldingsvolgorde)",
    "randomSelect": "Willekeurige Selectie",
    "clearSelection": "Selectie Wissen",
    "themes.all": "Alle Thema's",
    "library.selectedCount": "Geselecteerd: {x} / {y}",

    // ===== 11. UPLOAD SECTION (3 items) =====
    "selectImagesToUpload": "Selecteer afbeeldingen om te uploaden:",
    "yourUploadedImages": "Je Geüploade Afbeeldingen (Deze Sessie)",
    "uploadedImagesWillAppear": "Je geüploade afbeeldingen verschijnen hier.",

    // ===== 12. PROBLEM SETTINGS (6 items) =====
    "numberOfProblems": "Aantal Opgaven (1-30):",
    "columns": "Kolommen (1-6):",
    "imageSize": "Afbeeldingsgrootte (px, 20-200):",
    "spacingBetweenImages": "Ruimte Tussen Afbeeldingen (px, 0-50):",
    "verticalSpacing": "Verticale Ruimte Tussen Opgaven (px, 0-100):",
    "includeNameDateFields": "Naam/Datum velden toevoegen",

    // ===== 13. ACTION BUTTONS (14 items) =====
    "generate": "Genereren",
    "generateWorksheet": "Werkblad Genereren",
    "generateAnswerKey": "Antwoordblad Genereren",
    "download": "Downloaden",
    "worksheetJpeg": "Werkblad (JPEG)",
    "answerKeyJpeg": "Antwoordblad (JPEG)",
    "worksheetPdf": "Werkblad (PDF)",
    "answerKeyPdf": "Antwoordblad (PDF)",
    "clearAll": "Alles Wissen",
    "button.generate": "Werkblad Genereren",
    "button.generateAnswer": "Antwoordblad Genereren",
    "button.downloadJpeg": "JPEG Downloaden",
    "button.downloadPdf": "PDF Downloaden",
    "button.clearAll": "Alles Wissen",

    // ===== 14. TABS (2 items) =====
    "worksheet": "Werkblad",
    "answerKey": "Antwoordblad",

    // ===== 15. TOOLBAR (15 items) =====
    "layers": "Lagen",
    "bringForward": "Naar Voren",
    "sendBackward": "Naar Achteren",
    "align": "Uitlijnen",
    "alignSelected": "Selectie Uitlijnen:",
    "alignToPage": "Op Pagina Uitlijnen:",
    "deleteSelected": "Selectie Verwijderen",
    "toolbar.alignLeft": "Links Uitlijnen",
    "toolbar.centerH": "Horizontaal Centreren",
    "toolbar.alignRight": "Rechts Uitlijnen",
    "toolbar.alignTop": "Boven Uitlijnen",
    "toolbar.centerV": "Verticaal Centreren",
    "toolbar.alignBottom": "Onder Uitlijnen",
    "toolbar.centerPageH": "Horizontaal Centreren op Pagina",
    "toolbar.centerPageV": "Verticaal Centreren op Pagina",

    // ===== 16. SUCCESS MESSAGES (10 items) =====
    "textAdded": "Tekst toegevoegd.",
    "formCleared": "Formulier gewist.",
    "worksheetGeneratedSuccessfully": "Werkblad succesvol gegenereerd!",
    "answerKeyGenerated": "Antwoordblad gegenereerd!",
    "downloadInitiated": "Download gestart!",
    "pdfDownloaded": "PDF gedownload!",
    "jpegDownloadInitiated": "JPEG download gestart!",
    "message.pdfSuccess": "PDF gedownload!",
    "message.backgroundAdded": "Achtergrond toegevoegd.",
    "message.worksheetGenerated": "Werkblad succesvol gegenereerd!",

    // ===== 17. ERROR MESSAGES (15 items) =====
    "couldNotLoadThemes": "Kan thema's niet laden.",
    "errorLoadingThemes": "Fout bij het laden van thema's.",
    "errorDuringSearch": "Fout tijdens zoeken.",
    "errorLoadingImages": "Fout bij het laden van afbeeldingen.",
    "maxImagesSelected": "Maximaal {count} afbeelding(en) geselecteerd.",
    "pleaseSelectImagesFirst": "Selecteer eerst enkele afbeeldingen, uit de bibliotheek of door je eigen afbeeldingen te uploaden.",
    "pleaseGenerateWorksheetFirst": "Genereer eerst een werkblad.",
    "canvasIsEmpty": "Canvas is leeg. Niets om te downloaden.",
    "errorPreparingJpeg": "Fout bij voorbereiden JPEG: {error}",
    "pleaseGenerateContentFirst": "Genereer eerst inhoud.",
    "errorCreatingPdf": "Fout bij maken van PDF.",
    "message.pdfError": "Fout bij maken van PDF.",
    "message.jpegError": "Fout bij voorbereiden JPEG.",
    "message.imageLoadFailed": "Kan rand/achtergrond afbeelding niet laden.",
    "message.pdfCreateError": "Fout bij maken van PDF: {error}",

    // ===== 18. INFO MESSAGES (9 items) =====
    "loadingDefaultTheme": "Standaard thema laden...",
    "searching": "Zoeken...",
    "loadingImagesForTheme": "Afbeeldingen laden voor thema...",
    "noImagesFound": "Geen afbeeldingen gevonden{query}.",
    "preparingFile": "{filename} voorbereiden...",
    "preparingPdf": "PDF voorbereiden...",
    "preparingJpeg": "JPEG voorbereiden...",
    "message.loading": "Laden...",
    "message.preparingDownload": "Download voorbereiden...",

    // ===== 19. NAME/DATE FIELDS (2 items) =====
    "form.nameField": "Naam: _________________________",
    "form.dateField": "Datum: ____________",

    // ===== 20. WATERMARKS (2 items) =====
    "watermark.free": "GRATIS VERSIE - LessonCraftStudio.com",
    "watermark.freeShort": "GRATIS VERSIE",

    // ===== 21. PREVIEW (1 item) =====
    "preview.title": "Voorbeeld",

    // ===== 22. SUBTRACTION-SPECIFIC FEATURES =====
    // Note: Mathematical terms and visual concepts
    // - Doorgestreepte afbeeldingen voor visueel aftrekken
    // - Aftrektal/Aftrekker als wiskundige termen
    // - Overzichtelijke weergave voor duidelijkheid
    // - Antwoordlijnen voor leerlingen
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'nl', params = {}) {
  const translation = SUBTRACTION_DUTCH_TRANSLATIONS[locale]?.[key] || key;
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
    SUBTRACTION_DUTCH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}