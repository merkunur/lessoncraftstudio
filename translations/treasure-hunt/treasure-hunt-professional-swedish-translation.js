// Treasure Hunt App - Professional Swedish Translation
// Total: 80+ translation keys (75 unique)
// Approach: Natural, educational Swedish as if originally developed in Sweden
// App name: "Skattjaktsgenerator" (Treasure Hunt Generator - engaging educational term)

const TREASURE_HUNT_SWEDISH_TRANSLATIONS = {
  sv: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Skattjaktsgenerator",
    "settings.title": "Inställningar för Arbetsblad",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Språkinställningar",
    "settings.pageSetup": "Sidformat",
    "settings.textTools": "Textverktyg",
    "settings.puzzleSetup": "Spelinställningar",
    "library.title": "Bildbibliotek",
    "library.uploadTitle": "Ladda upp Egna Bilder",

    // ===== 3. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Språk:",
    "lang.en": "English (Engelska)",
    "lang.de": "Deutsch (Tyska)",
    "lang.fr": "Français (Franska)",
    "lang.es": "Español (Spanska)",
    "lang.pt": "Português (Portugisiska)",
    "lang.it": "Italiano (Italienska)",
    "lang.nl": "Nederlands (Nederländska)",
    "lang.sv": "Svenska",
    "lang.da": "Dansk (Danska)",
    "lang.no": "Norsk (Norska)",
    "lang.fi": "Suomi (Finska)",

    // ===== 4. PAGE SETUP (17 items) =====
    "settings.pageSize": "Sidstorlek:",
    "pageSize.letterPortrait": "Letter Stående (612×792)",
    "pageSize.letterLandscape": "Letter Liggande (792×612)",
    "pageSize.a4Portrait": "A4 Stående (595×842)",
    "pageSize.a4Landscape": "A4 Liggande (842×595)",
    "pageSize.square": "Kvadrat (1200×1200)",
    "pageSize.custom": "Anpassad",
    "settings.width": "Bredd (px):",
    "settings.height": "Höjd (px):",
    "settings.pageColor": "Sidfärg:",
    "decoration.backgroundTheme": "Bakgrundstema:",
    "decoration.none": "Ingen",
    "decoration.backgroundOpacity": "Bakgrundsopacitet:",
    "decoration.borderTheme": "Ramtema:",
    "decoration.borderOpacity": "Ramopacitet:",
    "button.applySize": "Tillämpa Storlek",
    "settings.grayscale": "Gråskala",

    // ===== 5. TEXT TOOLS (7 items) =====
    "text.content": "Innehåll:",
    "text.placeholder": "Hej!",
    "button.addText": "Lägg till Text",
    "text.color": "Färg:",
    "text.size": "Storlek:",
    "text.font": "Typsnitt:",
    "text.default": "Ny Text",

    // ===== 6. PUZZLE SETUP (2 items) =====
    "puzzle.generateFromTheme": "Skapa från Tema (Ersätter Manuellt Val):",
    "puzzle.selectTheme": "-- Välj ett Tema för Arbetsbladet --",

    // ===== 7. IMAGE LIBRARY (7 items) =====
    "library.selectTheme": "Välj Ordbokstema:",
    "library.search": "Sök Bilder:",
    "library.searchPlaceholder": "t.ex. äpple, bil",
    "library.availableImages": "Tillgängliga Bilder (Klicka för att lägga till i manuellt val):",
    "library.selectUpload": "Välj bilder att ladda upp:",
    "library.uploadedImages": "Dina Uppladdade Bilder (Klicka för att Välja):",
    "library.selectedCount": "Valda: {x} / 6",

    // ===== 8. TOOLBAR (6 items) =====
    "toolbar.layers": "Lager",
    "toolbar.bringForward": "Flytta Framåt",
    "toolbar.sendBackward": "Flytta Bakåt",
    "toolbar.delete": "Ta Bort Markering",
    "toolbar.align": "Justera",
    "toolbar.center": "Centrera",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Skapa",
    "button.generateWorksheet": "Skapa Arbetsblad",
    "button.generateAnswer": "Skapa Facit",
    "button.download": "Ladda ner",
    "button.worksheetJpeg": "Arbetsblad (JPEG)",
    "button.answerJpeg": "Facit (JPEG)",
    "button.worksheetPdf": "Arbetsblad (PDF)",
    "button.answerPdf": "Facit (PDF)",
    "button.clearAll": "Rensa Allt",
    "button.downloadJpeg": "Ladda ner JPEG",
    "button.downloadPdf": "Ladda ner PDF",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Arbetsblad",
    "tab.answerKey": "Facit",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.textAdded": "Text tillagd.",
    "message.formCleared": "Formulär rensat.",
    "message.worksheetGenerated": "Arbetsblad skapat!",
    "message.answerGenerated": "Facit skapat!",
    "message.downloadStarted": "Nedladdning startad!",
    "message.pdfDownloaded": "PDF nedladdad!",
    "message.pdfSuccess": "PDF nedladdad!",
    "message.jpegDownloaded": "JPEG-nedladdning startad!",
    "message.assetAdded": "{type} tillagd.",
    "message.downloadInitiated": "Nedladdning startad!",

    // ===== 12. ERROR MESSAGES (14 items) =====
    "message.themesLoadError": "Kunde inte ladda teman.",
    "message.maxImages": "Max 6 bilder valda.",
    "message.themeNoImages": 'Temat "{theme}" har inga bilder.',
    "message.themeLoadError": "Fel vid laddning av temabilder.",
    "message.selectSixImages": "Välj exakt 6 bilder manuellt, eller välj ett tema för att skapa automatiskt.",
    "message.noPuzzleData": "Ingen speldata skapad.",
    "message.generateFirst": "Skapa ett arbetsblad först.",
    "message.canvasEmpty": "Arbetsytan är tom.",
    "message.jpegError": "Fel vid förberedelse av JPEG.",
    "message.pdfError": "Fel vid skapande av PDF.",
    "message.pdfCreateError": "Fel vid skapande av PDF.",
    "message.generateContent": "Skapa innehåll först.",
    "message.generateWorksheet": "Skapa ett arbetsblad först.",
    "message.jpegPrepError": "Fel vid förberedelse av JPEG.",

    // ===== 13. INFO MESSAGES (11 items) =====
    "message.selectBorderTheme": "Välj ett tema för att se ramar.",
    "message.selectBackgroundTheme": "Välj ett tema för bakgrunder.",
    "message.loading": "Laddar...",
    "message.typeToSearch": "Skriv för att söka bland alla bilder.",
    "message.searchError": "Fel vid sökning.",
    "message.imagesError": "Fel vid laddning av bilder.",
    "message.noImages": "Inga bilder hittades.",
    "message.uploadedHere": "Dina uppladdade bilder visas här.",
    "message.preparingJpeg": "Förbereder JPEG...",
    "message.preparingPdf": "Förbereder PDF...",
    "themes.all": "Alla Teman (använder översättningar)",

    // ===== 14. WATERMARKS (2 items) =====
    "watermark.free": "GRATISVERSION - LessonCraftStudio.com",
    "watermark.freeShort": "GRATISVERSION"

    // ===== 15. TREASURE HUNT GAME TEXT (Already in treasureHuntTranslations) =====
    // NOTE: These are already implemented in the app's treasureHuntTranslations object:
    // - startAt: "Börja vid"
    // - move: "Gå"
    // - north: "norr"
    // - south: "söder"
    // - east: "öster"
    // - west: "väster"
    // - square: "ruta"
    // - squares: "rutor"
    // - whereIsTreasure: "Var är skatten?"
    // These remain in treasureHuntTranslations for backward compatibility
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'sv', params = {}) {
  const translation = TREASURE_HUNT_SWEDISH_TRANSLATIONS[locale]?.[key] || key;
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
    TREASURE_HUNT_SWEDISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}