// Word Guess App - Professional Norwegian Translation (Bokmål)
// Total: 93 unique translation keys
// Approach: Natural, educational Norwegian as if originally developed in Norway
// App name: "Bildegåter Generator" (Picture Riddles Generator - engaging educational term)

const WORD_GUESS_NORWEGIAN_TRANSLATIONS = {
  no: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Bildegåter Generator",
    "settings.title": "Bildegåter Innstillinger",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Språkinnstillinger",
    "settings.pageSetup": "Sideoppsett",
    "settings.textTools": "Tekstverktøy",
    "settings.exerciseConfig": "Oppgaveinnstillinger",
    "library.title": "Bildesamling",
    "library.uploadTitle": "Last Opp Egne Bilder",

    // ===== 3. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Språk:",
    "lang.en": "English (Engelsk)",
    "lang.de": "Deutsch (Tysk)",
    "lang.fr": "Français (Fransk)",
    "lang.es": "Español (Spansk)",
    "lang.pt": "Português (Portugisisk)",
    "lang.it": "Italiano (Italiensk)",
    "lang.nl": "Nederlands (Nederlandsk)",
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
    "pageSize.custom": "Egendefinert",
    "settings.width": "Bredde (px):",
    "settings.height": "Høyde (px):",
    "settings.pageColor": "Sidefarge:",
    "button.applySize": "Bruk Størrelse",
    "decoration.backgroundTheme": "Bakgrunnstema:",
    "decoration.none": "Ingen",
    "decoration.backgroundOpacity": "Bakgrunn Gjennomsiktighet:",
    "decoration.borderTheme": "Rammetema:",
    "decoration.borderOpacity": "Ramme Gjennomsiktighet:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Innhold:",
    "text.placeholder": "Hei!",
    "button.addText": "Legg Til Tekst",
    "text.color": "Farge:",
    "text.size": "Størrelse:",
    "text.font": "Skrifttype:",
    "text.outlineColor": "Omrissfarge:",
    "text.outlineWidth": "Omrisstykkelse (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Antall Gåter (1–10):",
    "config.difficulty": "Vanskelighetsgrad (Antall Hint)",
    "difficulty.noClues": "Ingen hint",
    "difficulty.easy": "Lett (1/2)",
    "difficulty.normal": "Normal (1/4)",
    "difficulty.tough": "Vanskelig (1/6)",
    "config.excludeLetters": "Utelukk Bokstaver fra Hint:",
    "config.excludePlaceholder": "f.eks. AEIOUÆØÅ",
    "config.letterCase": "Bokstavtype",
    "case.uppercase": "Store bokstaver",
    "case.lowercase": "Små bokstaver",
    "config.includeNameDate": "Ta Med Navn & Dato",
    "config.includeExerciseNumbers": "Nummerer Oppgavene",

    // ===== 7. IMAGE LIBRARY (8 items) =====
    "library.selectTheme": "Velg Tema:",
    "library.search": "Søk Bilder:",
    "library.searchPlaceholder": "f.eks. eple, bil",
    "library.availableImages": "Tilgjengelige Bilder:",
    "library.selectedImages": "Valgte Bilder for Gåter:",
    "library.selectUpload": "Velg bilder for opplasting:",
    "library.uploadedImages": "Dine Opplastede Bilder (Denne Økten):",
    "library.selectedCount": "Valgt: {x} / {y}",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Lag",
    "toolbar.bringForward": "Flytt Fremover",
    "toolbar.sendBackward": "Flytt Bakover",
    "toolbar.align": "Juster",
    "toolbar.alignLeft": "Venstrejuster",
    "toolbar.centerH": "Sentrer Horisontalt",
    "toolbar.alignRight": "Høyrejuster",
    "toolbar.alignTop": "Juster Øverst",
    "toolbar.centerV": "Sentrer Vertikalt",
    "toolbar.alignBottom": "Juster Nederst",
    "toolbar.centerPageH": "Sentrer på Siden Horisontalt",
    "toolbar.centerPageV": "Sentrer på Siden Vertikalt",
    "toolbar.delete": "Slett Markering",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Generer",
    "button.generateWorksheet": "Lag Oppgaveark",
    "button.generateAnswer": "Lag Fasit",
    "button.download": "Last Ned",
    "button.worksheetJpeg": "Oppgaveark (JPEG)",
    "button.answerJpeg": "Fasit (JPEG)",
    "button.worksheetPdf": "Oppgaveark (PDF)",
    "button.answerPdf": "Fasit (PDF)",
    "settings.grayscale": "Gråtoner",
    "button.clearAll": "Tøm Alt",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Oppgaveark",
    "tab.answerKey": "Fasit",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} egendefinert(e) bilde(r) tilgjengelig(e).",
    "message.generatingWorksheet": "Lager oppgaveark...",
    "message.worksheetGenerated": "Oppgaveark laget!",
    "message.generatingAnswer": "Lager fasit...",
    "message.answerGenerated": "Fasit laget!",
    "message.assetAdded": "{type} lagt til.",
    "message.formCleared": "Skjema tømt.",
    "message.downloadStarted": "Nedlasting startet!",
    "message.pdfDownloaded": "PDF lastet ned!",
    "message.pdfSuccess": "PDF lastet ned!",
    "message.jpegDownloaded": "JPEG-nedlasting startet!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Kunne ikke laste inn temaer.",
    "message.maxImages": "Du kan velge maksimalt {count} bilder.",
    "message.selectImages": "Vennligst velg noen bilder eller velg et tema med bilder.",
    "message.generateFirst": "Lag et oppgaveark først.",
    "message.cannotDownloadEmpty": "Kan ikke laste ned tom fil: {fileName}.",
    "message.imageError": "Feil ved klargjøring av bilde: {error}",
    "message.generateContent": "Generer innholdet først.",
    "message.pdfError": "Feil ved opprettelse av PDF.",
    "message.generateWorksheet": "Lag et oppgaveark først.",
    "message.jpegError": "Feil ved klargjøring av JPEG.",
    "message.pdfCreateError": "Feil ved opprettelse av PDF: {error}",
    "message.imagesError": "Feil ved lasting av bilder.",
    "message.borderError": "Feil ved lasting av rammer.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Alle Temaer (bruker oversettelser)",
    "message.loading": "Laster inn...",
    "message.typeToSearch": "Skriv for å søke blant alle bilder.",
    "message.noImages": "Ingen bilder funnet {query}.",
    "message.uploadedHere": "Dine opplastede bilder vises her.",
    "message.preparing": "Klargjør {format}...",
    "message.preparingPdf": "Klargjør PDF...",
    "message.preparingJpeg": "Klargjør JPEG...",
    "decoration.allBorders": "Alle Rammer",
    "message.selectBorderTheme": "Velg et tema for å se rammer.",
    "message.loadingBorders": "Laster rammer fra {theme}...",
    "message.noBorders": "Ingen rammer funnet.",
    "decoration.allBackgrounds": "Alle Bakgrunner",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Navn: ________________",
    "form.dateField": "Dato: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "GRATIS VERSJON - LessonCraftStudio.com",
    "watermark.freeShort": "GRATIS VERSJON"
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'no', params = {}) {
  const translation = WORD_GUESS_NORWEGIAN_TRANSLATIONS[locale]?.[key] || key;
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
    WORD_GUESS_NORWEGIAN_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}