// Treasure Hunt App - Professional Norwegian Translation (Bokmål)
// Total: 80+ translation keys (75 unique)
// Approach: Natural, educational Norwegian as if originally developed in Norway
// App name: "Skattejaktgenerator" (Treasure Hunt Generator - engaging educational term)

const TREASURE_HUNT_NORWEGIAN_TRANSLATIONS = {
  no: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Skattejaktgenerator",
    "settings.title": "Innstillinger for Skattejakt",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Språkinnstillinger",
    "settings.pageSetup": "Sideoppsett",
    "settings.textTools": "Tekstverktøy",
    "settings.puzzleSetup": "Spillinnstillinger",
    "library.title": "Bildebibliotek",
    "library.uploadTitle": "Last opp Egne Bilder",

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

    // ===== 4. PAGE SETUP (17 items) =====
    "settings.pageSize": "Sidestørrelse:",
    "pageSize.letterPortrait": "Letter Stående (612×792)",
    "pageSize.letterLandscape": "Letter Liggende (792×612)",
    "pageSize.a4Portrait": "A4 Stående (595×842)",
    "pageSize.a4Landscape": "A4 Liggende (842×595)",
    "pageSize.square": "Kvadrat (1200×1200)",
    "pageSize.custom": "Egendefinert",
    "settings.width": "Bredde (px):",
    "settings.height": "Høyde (px):",
    "settings.pageColor": "Sidefarge:",
    "decoration.backgroundTheme": "Bakgrunnstema:",
    "decoration.none": "Ingen",
    "decoration.backgroundOpacity": "Bakgrunnsdekning:",
    "decoration.borderTheme": "Rammetema:",
    "decoration.borderOpacity": "Rammedekning:",
    "button.applySize": "Bruk Størrelse",
    "settings.grayscale": "Gråtoner",

    // ===== 5. TEXT TOOLS (7 items) =====
    "text.content": "Innhold:",
    "text.placeholder": "Hei!",
    "button.addText": "Legg til Tekst",
    "text.color": "Farge:",
    "text.size": "Størrelse:",
    "text.font": "Skrifttype:",
    "text.default": "Ny Tekst",

    // ===== 6. PUZZLE SETUP (2 items) =====
    "puzzle.generateFromTheme": "Generer fra Tema (Erstatter Manuelt Valg):",
    "puzzle.selectTheme": "-- Velg et Tema for Oppgavearket --",

    // ===== 7. IMAGE LIBRARY (7 items) =====
    "library.selectTheme": "Velg Ordboktema:",
    "library.search": "Søk Bilder:",
    "library.searchPlaceholder": "f.eks. eple, bil",
    "library.availableImages": "Tilgjengelige Bilder (Klikk for å legge til manuelt valg):",
    "library.selectUpload": "Velg bilder for opplasting:",
    "library.uploadedImages": "Dine Opplastede Bilder (Klikk for å Velge):",
    "library.selectedCount": "Valgt: {x} / 6",

    // ===== 8. TOOLBAR (6 items) =====
    "toolbar.layers": "Lag",
    "toolbar.bringForward": "Flytt Fremover",
    "toolbar.sendBackward": "Flytt Bakover",
    "toolbar.delete": "Slett Markerte",
    "toolbar.align": "Juster",
    "toolbar.center": "Sentrer",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Generer",
    "button.generateWorksheet": "Lag Oppgaveark",
    "button.generateAnswer": "Lag Fasit",
    "button.download": "Last ned",
    "button.worksheetJpeg": "Oppgaveark (JPEG)",
    "button.answerJpeg": "Fasit (JPEG)",
    "button.worksheetPdf": "Oppgaveark (PDF)",
    "button.answerPdf": "Fasit (PDF)",
    "button.clearAll": "Tøm Alt",
    "button.downloadJpeg": "Last ned JPEG",
    "button.downloadPdf": "Last ned PDF",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Oppgaveark",
    "tab.answerKey": "Fasit",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.textAdded": "Tekst lagt til.",
    "message.formCleared": "Skjema tømt.",
    "message.worksheetGenerated": "Oppgaveark laget!",
    "message.answerGenerated": "Fasit laget!",
    "message.downloadStarted": "Nedlasting startet!",
    "message.pdfDownloaded": "PDF lastet ned!",
    "message.pdfSuccess": "PDF lastet ned!",
    "message.jpegDownloaded": "JPEG-nedlasting startet!",
    "message.assetAdded": "{type} lagt til.",
    "message.downloadInitiated": "Nedlasting startet!",

    // ===== 12. ERROR MESSAGES (14 items) =====
    "message.themesLoadError": "Kunne ikke laste temaer.",
    "message.maxImages": "Maksimalt 6 bilder valgt.",
    "message.themeNoImages": 'Tema "{theme}" har ingen bilder.',
    "message.themeLoadError": "Feil ved lasting av temabilder.",
    "message.selectSixImages": "Vennligst velg nøyaktig 6 bilder manuelt, eller velg et tema for automatisk generering.",
    "message.noPuzzleData": "Ingen spilldata generert.",
    "message.generateFirst": "Vennligst lag et oppgaveark først.",
    "message.canvasEmpty": "Arbeidsområdet er tomt.",
    "message.jpegError": "Feil ved klargjøring av JPEG.",
    "message.pdfError": "Feil ved oppretting av PDF.",
    "message.pdfCreateError": "Feil ved oppretting av PDF.",
    "message.generateContent": "Vennligst generer innhold først.",
    "message.generateWorksheet": "Vennligst lag et oppgaveark først.",
    "message.jpegPrepError": "Feil ved klargjøring av JPEG.",

    // ===== 13. INFO MESSAGES (11 items) =====
    "message.selectBorderTheme": "Velg et tema for å se rammer.",
    "message.selectBackgroundTheme": "Velg et tema for bakgrunner.",
    "message.loading": "Laster...",
    "message.typeToSearch": "Skriv for å søke i alle bilder.",
    "message.searchError": "Feil under søking.",
    "message.imagesError": "Feil ved lasting av bilder.",
    "message.noImages": "Ingen bilder funnet.",
    "message.uploadedHere": "Dine opplastede bilder vises her.",
    "message.preparingJpeg": "Klargjør JPEG...",
    "message.preparingPdf": "Klargjør PDF...",
    "themes.all": "Alle Temaer (bruker oversettelser)",

    // ===== 14. WATERMARKS (2 items) =====
    "watermark.free": "GRATIS VERSJON - LessonCraftStudio.com",
    "watermark.freeShort": "GRATIS VERSJON"

    // ===== 15. TREASURE HUNT GAME TEXT (Already in treasureHuntTranslations) =====
    // NOTE: These are already implemented in the app's treasureHuntTranslations object:
    // - startAt: "Start ved"
    // - move: "Gå"
    // - north: "nord"
    // - south: "sør"
    // - east: "øst"
    // - west: "vest"
    // - square: "rute"
    // - squares: "ruter"
    // - whereIsTreasure: "Hvor er skatten?"
    // These remain in treasureHuntTranslations for backward compatibility
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'no', params = {}) {
  const translation = TREASURE_HUNT_NORWEGIAN_TRANSLATIONS[locale]?.[key] || key;
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
    TREASURE_HUNT_NORWEGIAN_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}