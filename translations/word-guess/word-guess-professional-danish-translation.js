// Word Guess App - Professional Danish Translation
// Total: 93 unique translation keys
// Approach: Natural, educational Danish as if originally developed in Denmark
// App name: "Ordgåder Generator" (Word Riddles Generator - engaging educational term)

const WORD_GUESS_DANISH_TRANSLATIONS = {
  da: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Ordgåder Generator",
    "settings.title": "Ordgåder Indstillinger",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Sprogindstillinger",
    "settings.pageSetup": "Sideopsætning",
    "settings.textTools": "Tekstværktøjer",
    "settings.exerciseConfig": "Opgaveindstillinger",
    "library.title": "Billedsamling",
    "library.uploadTitle": "Upload Dine Egne Billeder",

    // ===== 3. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Sprog:",
    "lang.en": "English (Engelsk)",
    "lang.de": "Deutsch (Tysk)",
    "lang.fr": "Français (Fransk)",
    "lang.es": "Español (Spansk)",
    "lang.pt": "Português (Portugisisk)",
    "lang.it": "Italiano (Italiensk)",
    "lang.nl": "Nederlands (Hollandsk)",
    "lang.sv": "Svenska (Svensk)",
    "lang.da": "Dansk",
    "lang.no": "Norsk",
    "lang.fi": "Suomi (Finsk)",

    // ===== 4. PAGE SETUP (16 items) =====
    "settings.pageSize": "Sidestørrelse:",
    "pageSize.letterPortrait": "Letter Stående (612×792)",
    "pageSize.letterLandscape": "Letter Liggende (792×612)",
    "pageSize.a4Portrait": "A4 Stående (595×842)",
    "pageSize.a4Landscape": "A4 Liggende (842×595)",
    "pageSize.square": "Kvadratisk (1200×1200)",
    "pageSize.custom": "Tilpasset",
    "settings.width": "Bredde (px):",
    "settings.height": "Højde (px):",
    "settings.pageColor": "Sidefarve:",
    "button.applySize": "Anvend Størrelse",
    "decoration.backgroundTheme": "Baggrundstema:",
    "decoration.none": "Ingen",
    "decoration.backgroundOpacity": "Baggrunds Gennemsigtighed:",
    "decoration.borderTheme": "Rammetema:",
    "decoration.borderOpacity": "Ramme Gennemsigtighed:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Indhold:",
    "text.placeholder": "Hej!",
    "button.addText": "Tilføj Tekst",
    "text.color": "Farve:",
    "text.size": "Størrelse:",
    "text.font": "Skrifttype:",
    "text.outlineColor": "Konturfarve:",
    "text.outlineWidth": "Konturtykkelse (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Antal Gåder (1–10):",
    "config.difficulty": "Sværhedsgrad (Antal Ledetråde)",
    "difficulty.noClues": "Ingen ledetråde",
    "difficulty.easy": "Let (1/2)",
    "difficulty.normal": "Normal (1/4)",
    "difficulty.tough": "Svær (1/6)",
    "config.excludeLetters": "Udeluk Bogstaver fra Ledetråde:",
    "config.excludePlaceholder": "f.eks. AEIOUÆØÅ",
    "config.letterCase": "Bogstavtype",
    "case.uppercase": "Store bogstaver",
    "case.lowercase": "Små bogstaver",
    "config.includeNameDate": "Inkluder Navn & Dato",
    "config.includeExerciseNumbers": "Nummerer Opgaverne",

    // ===== 7. IMAGE LIBRARY (8 items) =====
    "library.selectTheme": "Vælg Tema:",
    "library.search": "Søg Billeder:",
    "library.searchPlaceholder": "f.eks. æble, bil",
    "library.availableImages": "Tilgængelige Billeder:",
    "library.selectedImages": "Valgte Billeder til Gåder:",
    "library.selectUpload": "Vælg billeder til upload:",
    "library.uploadedImages": "Dine Uploadede Billeder (Denne Session):",
    "library.selectedCount": "Valgt: {x} / {y}",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Lag",
    "toolbar.bringForward": "Flyt Fremad",
    "toolbar.sendBackward": "Flyt Bagud",
    "toolbar.align": "Juster",
    "toolbar.alignLeft": "Venstrejuster",
    "toolbar.centerH": "Centrer Vandret",
    "toolbar.alignRight": "Højrejuster",
    "toolbar.alignTop": "Juster Op",
    "toolbar.centerV": "Centrer Lodret",
    "toolbar.alignBottom": "Juster Ned",
    "toolbar.centerPageH": "Centrer på Siden Vandret",
    "toolbar.centerPageV": "Centrer på Siden Lodret",
    "toolbar.delete": "Slet Markering",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Generer",
    "button.generateWorksheet": "Lav Opgaveark",
    "button.generateAnswer": "Lav Facitliste",
    "button.download": "Download",
    "button.worksheetJpeg": "Opgaveark (JPEG)",
    "button.answerJpeg": "Facitliste (JPEG)",
    "button.worksheetPdf": "Opgaveark (PDF)",
    "button.answerPdf": "Facitliste (PDF)",
    "settings.grayscale": "Gråtoner",
    "button.clearAll": "Ryd Alt",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Opgaveark",
    "tab.answerKey": "Facitliste",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} brugerdefiner(et/ede) billed(er) tilgængelig(e).",
    "message.generatingWorksheet": "Laver opgaveark...",
    "message.worksheetGenerated": "Opgaveark lavet!",
    "message.generatingAnswer": "Laver facitliste...",
    "message.answerGenerated": "Facitliste lavet!",
    "message.assetAdded": "{type} tilføjet.",
    "message.formCleared": "Formular ryddet.",
    "message.downloadStarted": "Download startet!",
    "message.pdfDownloaded": "PDF downloadet!",
    "message.pdfSuccess": "PDF downloadet!",
    "message.jpegDownloaded": "JPEG-download startet!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Kunne ikke indlæse temaer.",
    "message.maxImages": "Du kan vælge maksimalt {count} billeder.",
    "message.selectImages": "Vælg venligst nogle billeder eller vælg et tema med billeder.",
    "message.generateFirst": "Lav et opgaveark først.",
    "message.cannotDownloadEmpty": "Kan ikke downloade tom fil: {fileName}.",
    "message.imageError": "Fejl ved forberedelse af billede: {error}",
    "message.generateContent": "Generer indholdet først.",
    "message.pdfError": "Fejl ved oprettelse af PDF.",
    "message.generateWorksheet": "Lav et opgaveark først.",
    "message.jpegError": "Fejl ved forberedelse af JPEG.",
    "message.pdfCreateError": "Fejl ved oprettelse af PDF: {error}",
    "message.imagesError": "Fejl ved indlæsning af billeder.",
    "message.borderError": "Fejl ved indlæsning af rammer.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Alle Temaer (bruger oversættelser)",
    "message.loading": "Indlæser...",
    "message.typeToSearch": "Skriv for at søge i alle billeder.",
    "message.noImages": "Ingen billeder fundet {query}.",
    "message.uploadedHere": "Dine uploadede billeder vises her.",
    "message.preparing": "Forbereder {format}...",
    "message.preparingPdf": "Forbereder PDF...",
    "message.preparingJpeg": "Forbereder JPEG...",
    "decoration.allBorders": "Alle Rammer",
    "message.selectBorderTheme": "Vælg et tema for at se rammer.",
    "message.loadingBorders": "Indlæser rammer fra {theme}...",
    "message.noBorders": "Ingen rammer fundet.",
    "decoration.allBackgrounds": "Alle Baggrunde",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Navn: ________________",
    "form.dateField": "Dato: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "GRATIS VERSION - LessonCraftStudio.com",
    "watermark.freeShort": "GRATIS VERSION"
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'da', params = {}) {
  const translation = WORD_GUESS_DANISH_TRANSLATIONS[locale]?.[key] || key;
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
    WORD_GUESS_DANISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}