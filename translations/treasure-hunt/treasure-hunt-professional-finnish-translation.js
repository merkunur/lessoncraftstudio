// Treasure Hunt App - Professional Finnish Translation
// Total: 80+ translation keys (75 unique)
// Approach: Natural, educational Finnish as if originally developed in Finland
// App name: "Aarteenetsintägeneraattori" (Treasure Hunt Generator - engaging educational term)

const TREASURE_HUNT_FINNISH_TRANSLATIONS = {
  fi: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Aarteenetsintägeneraattori",
    "settings.title": "Aarteenetsinnän Asetukset",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Kieliasetukset",
    "settings.pageSetup": "Sivun Asetukset",
    "settings.textTools": "Tekstityökalut",
    "settings.puzzleSetup": "Pelin Asetukset",
    "library.title": "Kuvakirjasto",
    "library.uploadTitle": "Lataa Omia Kuvia",

    // ===== 3. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Kieli:",
    "lang.en": "English (Englanti)",
    "lang.de": "Deutsch (Saksa)",
    "lang.fr": "Français (Ranska)",
    "lang.es": "Español (Espanja)",
    "lang.pt": "Português (Portugali)",
    "lang.it": "Italiano (Italia)",
    "lang.nl": "Nederlands (Hollanti)",
    "lang.sv": "Svenska (Ruotsi)",
    "lang.da": "Dansk (Tanska)",
    "lang.no": "Norsk (Norja)",
    "lang.fi": "Suomi",

    // ===== 4. PAGE SETUP (17 items) =====
    "settings.pageSize": "Sivukoko:",
    "pageSize.letterPortrait": "Letter Pysty (612×792)",
    "pageSize.letterLandscape": "Letter Vaaka (792×612)",
    "pageSize.a4Portrait": "A4 Pysty (595×842)",
    "pageSize.a4Landscape": "A4 Vaaka (842×595)",
    "pageSize.square": "Neliö (1200×1200)",
    "pageSize.custom": "Mukautettu",
    "settings.width": "Leveys (px):",
    "settings.height": "Korkeus (px):",
    "settings.pageColor": "Sivun Väri:",
    "decoration.backgroundTheme": "Taustateema:",
    "decoration.none": "Ei mitään",
    "decoration.backgroundOpacity": "Taustan Läpinäkyvyys:",
    "decoration.borderTheme": "Reunusteema:",
    "decoration.borderOpacity": "Reunuksen Läpinäkyvyys:",
    "button.applySize": "Käytä Kokoa",
    "settings.grayscale": "Harmaasävy",

    // ===== 5. TEXT TOOLS (7 items) =====
    "text.content": "Sisältö:",
    "text.placeholder": "Hei!",
    "button.addText": "Lisää Teksti",
    "text.color": "Väri:",
    "text.size": "Koko:",
    "text.font": "Fontti:",
    "text.default": "Uusi Teksti",

    // ===== 6. PUZZLE SETUP (2 items) =====
    "puzzle.generateFromTheme": "Luo Teemasta (Korvaa Manuaalisen Valinnan):",
    "puzzle.selectTheme": "-- Valitse Tehtävän Teema --",

    // ===== 7. IMAGE LIBRARY (7 items) =====
    "library.selectTheme": "Valitse Sanaston Teema:",
    "library.search": "Hae Kuvia:",
    "library.searchPlaceholder": "esim. omena, auto",
    "library.availableImages": "Saatavilla Olevat Kuvat (Klikkaa lisätäksesi valintaan):",
    "library.selectUpload": "Valitse ladattavat kuvat:",
    "library.uploadedImages": "Lataamasi Kuvat (Klikkaa Valitaksesi):",
    "library.selectedCount": "Valittu: {x} / 6",

    // ===== 8. TOOLBAR (6 items) =====
    "toolbar.layers": "Tasot",
    "toolbar.bringForward": "Tuo Eteen",
    "toolbar.sendBackward": "Vie Taakse",
    "toolbar.delete": "Poista Valitut",
    "toolbar.align": "Kohdista",
    "toolbar.center": "Keskitä",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Luo",
    "button.generateWorksheet": "Luo Tehtävämoniste",
    "button.generateAnswer": "Luo Vastaukset",
    "button.download": "Lataa",
    "button.worksheetJpeg": "Tehtävämoniste (JPEG)",
    "button.answerJpeg": "Vastaukset (JPEG)",
    "button.worksheetPdf": "Tehtävämoniste (PDF)",
    "button.answerPdf": "Vastaukset (PDF)",
    "button.clearAll": "Tyhjennä Kaikki",
    "button.downloadJpeg": "Lataa JPEG",
    "button.downloadPdf": "Lataa PDF",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Tehtävämoniste",
    "tab.answerKey": "Vastaukset",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.textAdded": "Teksti lisätty.",
    "message.formCleared": "Lomake tyhjennetty.",
    "message.worksheetGenerated": "Tehtävämoniste luotu!",
    "message.answerGenerated": "Vastaukset luotu!",
    "message.downloadStarted": "Lataus aloitettu!",
    "message.pdfDownloaded": "PDF ladattu!",
    "message.pdfSuccess": "PDF ladattu!",
    "message.jpegDownloaded": "JPEG-lataus aloitettu!",
    "message.assetAdded": "{type} lisätty.",
    "message.downloadInitiated": "Lataus aloitettu!",

    // ===== 12. ERROR MESSAGES (14 items) =====
    "message.themesLoadError": "Teemojen lataus epäonnistui.",
    "message.maxImages": "Enintään 6 kuvaa valittu.",
    "message.themeNoImages": 'Teemassa "{theme}" ei ole kuvia.',
    "message.themeLoadError": "Virhe ladattaessa teeman kuvia.",
    "message.selectSixImages": "Valitse tasan 6 kuvaa manuaalisesti tai valitse teema automaattista luontia varten.",
    "message.noPuzzleData": "Pelidataa ei luotu.",
    "message.generateFirst": "Luo ensin tehtävämoniste.",
    "message.canvasEmpty": "Työalue on tyhjä.",
    "message.jpegError": "Virhe JPEG-tiedoston valmistelussa.",
    "message.pdfError": "Virhe PDF-tiedoston luonnissa.",
    "message.pdfCreateError": "Virhe PDF-tiedoston luonnissa.",
    "message.generateContent": "Luo ensin sisältö.",
    "message.generateWorksheet": "Luo ensin tehtävämoniste.",
    "message.jpegPrepError": "Virhe JPEG-tiedoston valmistelussa.",

    // ===== 13. INFO MESSAGES (11 items) =====
    "message.selectBorderTheme": "Valitse teema nähdäksesi reunukset.",
    "message.selectBackgroundTheme": "Valitse teema taustoja varten.",
    "message.loading": "Ladataan...",
    "message.typeToSearch": "Kirjoita hakeaksesi kaikista kuvista.",
    "message.searchError": "Virhe haussa.",
    "message.imagesError": "Virhe kuvien latauksessa.",
    "message.noImages": "Kuvia ei löytynyt.",
    "message.uploadedHere": "Lataamasi kuvat näkyvät täällä.",
    "message.preparingJpeg": "Valmistellaan JPEG-tiedostoa...",
    "message.preparingPdf": "Valmistellaan PDF-tiedostoa...",
    "themes.all": "Kaikki Teemat (käyttää käännöksiä)",

    // ===== 14. WATERMARKS (2 items) =====
    "watermark.free": "ILMAINEN VERSIO - LessonCraftStudio.com",
    "watermark.freeShort": "ILMAINEN VERSIO"

    // ===== 15. TREASURE HUNT GAME TEXT (Already in treasureHuntTranslations) =====
    // NOTE: These are already implemented in the app's treasureHuntTranslations object:
    // - startAt: "Aloita kohdasta"
    // - move: "Liiku"
    // - north: "pohjoiseen"
    // - south: "etelään"
    // - east: "itään"
    // - west: "länteen"
    // - square: "ruutu"
    // - squares: "ruutua"
    // - whereIsTreasure: "Missä aarre on?"
    // These remain in treasureHuntTranslations for backward compatibility
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'fi', params = {}) {
  const translation = TREASURE_HUNT_FINNISH_TRANSLATIONS[locale]?.[key] || key;
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
    TREASURE_HUNT_FINNISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}