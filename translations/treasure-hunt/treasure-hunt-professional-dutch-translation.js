// Treasure Hunt App - Professional Dutch Translation
// Total: 80+ translation keys (75 unique)
// Approach: Natural, educational Dutch as if originally developed in the Netherlands
// App name: "Speurtocht Generator" (Treasure Hunt Generator - engaging educational term)

const TREASURE_HUNT_DUTCH_TRANSLATIONS = {
  nl: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Speurtocht Generator",
    "settings.title": "Werkblad Instellingen",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Taalinstellingen",
    "settings.pageSetup": "Pagina-instellingen",
    "settings.textTools": "Tekstgereedschappen",
    "settings.puzzleSetup": "Spelinstellingen",
    "library.title": "Afbeeldingen Bibliotheek",
    "library.uploadTitle": "Eigen Afbeeldingen Uploaden",

    // ===== 3. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Taal:",
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

    // ===== 4. PAGE SETUP (17 items) =====
    "settings.pageSize": "Paginaformaat:",
    "pageSize.letterPortrait": "Letter Staand (612×792)",
    "pageSize.letterLandscape": "Letter Liggend (792×612)",
    "pageSize.a4Portrait": "A4 Staand (595×842)",
    "pageSize.a4Landscape": "A4 Liggend (842×595)",
    "pageSize.square": "Vierkant (1200×1200)",
    "pageSize.custom": "Aangepast",
    "settings.width": "Breedte (px):",
    "settings.height": "Hoogte (px):",
    "settings.pageColor": "Paginakleur:",
    "decoration.backgroundTheme": "Achtergrondthema:",
    "decoration.none": "Geen",
    "decoration.backgroundOpacity": "Achtergronddekking:",
    "decoration.borderTheme": "Kaderthema:",
    "decoration.borderOpacity": "Kaderdekking:",
    "button.applySize": "Formaat Toepassen",
    "settings.grayscale": "Grijstinten",

    // ===== 5. TEXT TOOLS (7 items) =====
    "text.content": "Inhoud:",
    "text.placeholder": "Hallo!",
    "button.addText": "Tekst Toevoegen",
    "text.color": "Kleur:",
    "text.size": "Grootte:",
    "text.font": "Lettertype:",
    "text.default": "Nieuwe Tekst",

    // ===== 6. PUZZLE SETUP (2 items) =====
    "puzzle.generateFromTheme": "Genereren vanuit Thema (Vervangt Handmatige Selectie):",
    "puzzle.selectTheme": "-- Selecteer een Thema voor het Werkblad --",

    // ===== 7. IMAGE LIBRARY (7 items) =====
    "library.selectTheme": "Selecteer Woordenboekthema:",
    "library.search": "Zoek Afbeeldingen:",
    "library.searchPlaceholder": "bijv: appel, auto",
    "library.availableImages": "Beschikbare Afbeeldingen (Klik om toe te voegen aan handmatige selectie):",
    "library.selectUpload": "Selecteer afbeeldingen om te uploaden:",
    "library.uploadedImages": "Je Geüploade Afbeeldingen (Klik om te Selecteren):",
    "library.selectedCount": "Geselecteerd: {x} / 6",

    // ===== 8. TOOLBAR (6 items) =====
    "toolbar.layers": "Lagen",
    "toolbar.bringForward": "Naar Voren",
    "toolbar.sendBackward": "Naar Achteren",
    "toolbar.delete": "Selectie Verwijderen",
    "toolbar.align": "Uitlijnen",
    "toolbar.center": "Centreren",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Genereren",
    "button.generateWorksheet": "Werkblad Genereren",
    "button.generateAnswer": "Antwoordblad Genereren",
    "button.download": "Downloaden",
    "button.worksheetJpeg": "Werkblad (JPEG)",
    "button.answerJpeg": "Antwoordblad (JPEG)",
    "button.worksheetPdf": "Werkblad (PDF)",
    "button.answerPdf": "Antwoordblad (PDF)",
    "button.clearAll": "Alles Wissen",
    "button.downloadJpeg": "JPEG Downloaden",
    "button.downloadPdf": "PDF Downloaden",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Werkblad",
    "tab.answerKey": "Antwoordblad",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.textAdded": "Tekst toegevoegd.",
    "message.formCleared": "Formulier gewist.",
    "message.worksheetGenerated": "Werkblad gegenereerd!",
    "message.answerGenerated": "Antwoordblad gegenereerd!",
    "message.downloadStarted": "Download gestart!",
    "message.pdfDownloaded": "PDF gedownload!",
    "message.pdfSuccess": "PDF gedownload!",
    "message.jpegDownloaded": "JPEG download gestart!",
    "message.assetAdded": "{type} toegevoegd.",
    "message.downloadInitiated": "Download gestart!",

    // ===== 12. ERROR MESSAGES (14 items) =====
    "message.themesLoadError": "Kan thema's niet laden.",
    "message.maxImages": "Maximaal 6 afbeeldingen geselecteerd.",
    "message.themeNoImages": 'Thema "{theme}" heeft geen afbeeldingen.',
    "message.themeLoadError": "Fout bij het laden van thema-afbeeldingen.",
    "message.selectSixImages": "Selecteer precies 6 afbeeldingen handmatig, of kies een thema om automatisch te genereren.",
    "message.noPuzzleData": "Geen spelgegevens gegenereerd.",
    "message.generateFirst": "Genereer eerst een werkblad.",
    "message.canvasEmpty": "Het werkgebied is leeg.",
    "message.jpegError": "Fout bij het voorbereiden van JPEG.",
    "message.pdfError": "Fout bij het maken van PDF.",
    "message.pdfCreateError": "Fout bij het maken van PDF.",
    "message.generateContent": "Genereer eerst inhoud.",
    "message.generateWorksheet": "Genereer eerst een werkblad.",
    "message.jpegPrepError": "Fout bij het voorbereiden van JPEG.",

    // ===== 13. INFO MESSAGES (11 items) =====
    "message.selectBorderTheme": "Selecteer een thema om kaders te zien.",
    "message.selectBackgroundTheme": "Selecteer een thema voor achtergronden.",
    "message.loading": "Laden...",
    "message.typeToSearch": "Typ om in alle afbeeldingen te zoeken.",
    "message.searchError": "Fout tijdens het zoeken.",
    "message.imagesError": "Fout bij het laden van afbeeldingen.",
    "message.noImages": "Geen afbeeldingen gevonden.",
    "message.uploadedHere": "Je geüploade afbeeldingen verschijnen hier.",
    "message.preparingJpeg": "JPEG voorbereiden...",
    "message.preparingPdf": "PDF voorbereiden...",
    "themes.all": "Alle Thema's (gebruikt vertalingen)",

    // ===== 14. WATERMARKS (2 items) =====
    "watermark.free": "GRATIS VERSIE - LessonCraftStudio.com",
    "watermark.freeShort": "GRATIS VERSIE"

    // ===== 15. TREASURE HUNT GAME TEXT (Already in treasureHuntTranslations) =====
    // NOTE: These are already implemented in the app's treasureHuntTranslations object:
    // - startAt: "Begin bij"
    // - move: "Ga"
    // - north: "noord"
    // - south: "zuid"
    // - east: "oost"
    // - west: "west"
    // - square: "vakje"
    // - squares: "vakjes"
    // - whereIsTreasure: "Waar is de schat?"
    // These remain in treasureHuntTranslations for backward compatibility
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'nl', params = {}) {
  const translation = TREASURE_HUNT_DUTCH_TRANSLATIONS[locale]?.[key] || key;
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
    TREASURE_HUNT_DUTCH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}