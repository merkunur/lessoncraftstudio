// Treasure Hunt App - Professional Danish Translation
// Total: 80+ translation keys (75 unique)
// Approach: Natural, educational Danish as if originally developed in Denmark
// App name: "Skattejagt-generator" (Treasure Hunt Generator - engaging educational term)

const TREASURE_HUNT_DANISH_TRANSLATIONS = {
  da: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Skattejagt-generator",
    "settings.title": "Skattejagt Indstillinger",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Sprogindstillinger",
    "settings.pageSetup": "Sideopsætning",
    "settings.textTools": "Tekstværktøjer",
    "settings.puzzleSetup": "Spilindstillinger",
    "library.title": "Billedbibliotek",
    "library.uploadTitle": "Upload Egne Billeder",

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

    // ===== 4. PAGE SETUP (17 items) =====
    "settings.pageSize": "Sidestørrelse:",
    "pageSize.letterPortrait": "Letter Stående (612×792)",
    "pageSize.letterLandscape": "Letter Liggende (792×612)",
    "pageSize.a4Portrait": "A4 Stående (595×842)",
    "pageSize.a4Landscape": "A4 Liggende (842×595)",
    "pageSize.square": "Kvadrat (1200×1200)",
    "pageSize.custom": "Brugerdefineret",
    "settings.width": "Bredde (px):",
    "settings.height": "Højde (px):",
    "settings.pageColor": "Sidefarve:",
    "decoration.backgroundTheme": "Baggrundstema:",
    "decoration.none": "Ingen",
    "decoration.backgroundOpacity": "Baggrundsgennemsigtighed:",
    "decoration.borderTheme": "Rammetema:",
    "decoration.borderOpacity": "Rammegennemsigtighed:",
    "button.applySize": "Anvend Størrelse",
    "settings.grayscale": "Gråtoner",

    // ===== 5. TEXT TOOLS (7 items) =====
    "text.content": "Indhold:",
    "text.placeholder": "Hej!",
    "button.addText": "Tilføj Tekst",
    "text.color": "Farve:",
    "text.size": "Størrelse:",
    "text.font": "Skrifttype:",
    "text.default": "Ny Tekst",

    // ===== 6. PUZZLE SETUP (2 items) =====
    "puzzle.generateFromTheme": "Generer fra Tema (Erstatter Manuel Valg):",
    "puzzle.selectTheme": "-- Vælg et Tema til Opgavearket --",

    // ===== 7. IMAGE LIBRARY (7 items) =====
    "library.selectTheme": "Vælg Ordbogstema:",
    "library.search": "Søg Billeder:",
    "library.searchPlaceholder": "f.eks. æble, bil",
    "library.availableImages": "Tilgængelige Billeder (Klik for at tilføje til manuelt valg):",
    "library.selectUpload": "Vælg billeder til upload:",
    "library.uploadedImages": "Dine Uploadede Billeder (Klik for at Vælge):",
    "library.selectedCount": "Valgt: {x} / 6",

    // ===== 8. TOOLBAR (6 items) =====
    "toolbar.layers": "Lag",
    "toolbar.bringForward": "Flyt Fremad",
    "toolbar.sendBackward": "Flyt Bagud",
    "toolbar.delete": "Slet Markerede",
    "toolbar.align": "Juster",
    "toolbar.center": "Centrer",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Generer",
    "button.generateWorksheet": "Generer Opgaveark",
    "button.generateAnswer": "Generer Facitliste",
    "button.download": "Download",
    "button.worksheetJpeg": "Opgaveark (JPEG)",
    "button.answerJpeg": "Facitliste (JPEG)",
    "button.worksheetPdf": "Opgaveark (PDF)",
    "button.answerPdf": "Facitliste (PDF)",
    "button.clearAll": "Ryd Alt",
    "button.downloadJpeg": "Download JPEG",
    "button.downloadPdf": "Download PDF",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Opgaveark",
    "tab.answerKey": "Facitliste",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.textAdded": "Tekst tilføjet.",
    "message.formCleared": "Formular ryddet.",
    "message.worksheetGenerated": "Opgaveark genereret!",
    "message.answerGenerated": "Facitliste genereret!",
    "message.downloadStarted": "Download startet!",
    "message.pdfDownloaded": "PDF downloadet!",
    "message.pdfSuccess": "PDF downloadet!",
    "message.jpegDownloaded": "JPEG download startet!",
    "message.assetAdded": "{type} tilføjet.",
    "message.downloadInitiated": "Download startet!",

    // ===== 12. ERROR MESSAGES (14 items) =====
    "message.themesLoadError": "Kunne ikke indlæse temaer.",
    "message.maxImages": "Maksimalt 6 billeder valgt.",
    "message.themeNoImages": 'Tema "{theme}" har ingen billeder.',
    "message.themeLoadError": "Fejl ved indlæsning af tema-billeder.",
    "message.selectSixImages": "Vælg venligst præcis 6 billeder manuelt, eller vælg et tema til automatisk generering.",
    "message.noPuzzleData": "Ingen spildata genereret.",
    "message.generateFirst": "Generer venligst et opgaveark først.",
    "message.canvasEmpty": "Arbejdsområdet er tomt.",
    "message.jpegError": "Fejl ved forberedelse af JPEG.",
    "message.pdfError": "Fejl ved oprettelse af PDF.",
    "message.pdfCreateError": "Fejl ved oprettelse af PDF.",
    "message.generateContent": "Generer venligst indhold først.",
    "message.generateWorksheet": "Generer venligst et opgaveark først.",
    "message.jpegPrepError": "Fejl ved forberedelse af JPEG.",

    // ===== 13. INFO MESSAGES (11 items) =====
    "message.selectBorderTheme": "Vælg et tema for at se rammer.",
    "message.selectBackgroundTheme": "Vælg et tema til baggrunde.",
    "message.loading": "Indlæser...",
    "message.typeToSearch": "Skriv for at søge i alle billeder.",
    "message.searchError": "Fejl under søgning.",
    "message.imagesError": "Fejl ved indlæsning af billeder.",
    "message.noImages": "Ingen billeder fundet.",
    "message.uploadedHere": "Dine uploadede billeder vises her.",
    "message.preparingJpeg": "Forbereder JPEG...",
    "message.preparingPdf": "Forbereder PDF...",
    "themes.all": "Alle Temaer (bruger oversættelser)",

    // ===== 14. WATERMARKS (2 items) =====
    "watermark.free": "GRATIS VERSION - LessonCraftStudio.com",
    "watermark.freeShort": "GRATIS VERSION"

    // ===== 15. TREASURE HUNT GAME TEXT (Already in treasureHuntTranslations) =====
    // NOTE: These are already implemented in the app's treasureHuntTranslations object:
    // - startAt: "Start ved"
    // - move: "Gå"
    // - north: "nord"
    // - south: "syd"
    // - east: "øst"
    // - west: "vest"
    // - square: "felt"
    // - squares: "felter"
    // - whereIsTreasure: "Hvor er skatten?"
    // These remain in treasureHuntTranslations for backward compatibility
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'da', params = {}) {
  const translation = TREASURE_HUNT_DANISH_TRANSLATIONS[locale]?.[key] || key;
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
    TREASURE_HUNT_DANISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}