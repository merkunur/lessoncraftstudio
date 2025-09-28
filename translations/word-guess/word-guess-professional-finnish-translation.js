// Word Guess App - Professional Finnish Translation
// Total: 93 unique translation keys
// Approach: Natural, educational Finnish as if originally developed in Finland
// App name: "Sana-arvoitusten Luoja" (Word Riddles Creator - engaging educational term)

const WORD_GUESS_FINNISH_TRANSLATIONS = {
  fi: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Sana-arvoitusten Luoja",
    "settings.title": "Sana-arvoitusten Asetukset",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Kieliasetukset",
    "settings.pageSetup": "Sivun Asetukset",
    "settings.textTools": "Tekstityökalut",
    "settings.exerciseConfig": "Tehtävän Asetukset",
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

    // ===== 4. PAGE SETUP (16 items) =====
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
    "button.applySize": "Käytä Kokoa",
    "decoration.backgroundTheme": "Taustateema:",
    "decoration.none": "Ei mitään",
    "decoration.backgroundOpacity": "Taustan Läpinäkyvyys:",
    "decoration.borderTheme": "Reunusteema:",
    "decoration.borderOpacity": "Reunuksen Läpinäkyvyys:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Sisältö:",
    "text.placeholder": "Hei!",
    "button.addText": "Lisää Teksti",
    "text.color": "Väri:",
    "text.size": "Koko:",
    "text.font": "Fontti:",
    "text.outlineColor": "Ääriviivan Väri:",
    "text.outlineWidth": "Ääriviivan Paksuus (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Arvoitusten Määrä (1–10):",
    "config.difficulty": "Vaikeustaso (Vihjeiden Määrä)",
    "difficulty.noClues": "Ei vihjeitä",
    "difficulty.easy": "Helppo (1/2)",
    "difficulty.normal": "Normaali (1/4)",
    "difficulty.tough": "Vaikea (1/6)",
    "config.excludeLetters": "Jätä Kirjaimet Pois Vihjeistä:",
    "config.excludePlaceholder": "esim. AEIOUÄÖY",
    "config.letterCase": "Kirjaintyyppi",
    "case.uppercase": "Isot kirjaimet",
    "case.lowercase": "Pienet kirjaimet",
    "config.includeNameDate": "Lisää Nimi & Päivämäärä",
    "config.includeExerciseNumbers": "Numeroi Tehtävät",

    // ===== 7. IMAGE LIBRARY (8 items) =====
    "library.selectTheme": "Valitse Teema:",
    "library.search": "Hae Kuvia:",
    "library.searchPlaceholder": "esim. omena, auto",
    "library.availableImages": "Saatavilla Olevat Kuvat:",
    "library.selectedImages": "Valitut Kuvat Arvoituksiin:",
    "library.selectUpload": "Valitse ladattavat kuvat:",
    "library.uploadedImages": "Lataamasi Kuvat (Tämä Istunto):",
    "library.selectedCount": "Valittu: {x} / {y}",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Tasot",
    "toolbar.bringForward": "Siirrä Eteenpäin",
    "toolbar.sendBackward": "Siirrä Taaksepäin",
    "toolbar.align": "Tasaa",
    "toolbar.alignLeft": "Tasaa Vasemmalle",
    "toolbar.centerH": "Keskitä Vaakasuunnassa",
    "toolbar.alignRight": "Tasaa Oikealle",
    "toolbar.alignTop": "Tasaa Ylös",
    "toolbar.centerV": "Keskitä Pystysuunnassa",
    "toolbar.alignBottom": "Tasaa Alas",
    "toolbar.centerPageH": "Keskitä Sivulle Vaakasuunnassa",
    "toolbar.centerPageV": "Keskitä Sivulle Pystysuunnassa",
    "toolbar.delete": "Poista Valinta",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Luo",
    "button.generateWorksheet": "Luo Tehtävämoniste",
    "button.generateAnswer": "Luo Vastaukset",
    "button.download": "Lataa",
    "button.worksheetJpeg": "Tehtävämoniste (JPEG)",
    "button.answerJpeg": "Vastaukset (JPEG)",
    "button.worksheetPdf": "Tehtävämoniste (PDF)",
    "button.answerPdf": "Vastaukset (PDF)",
    "settings.grayscale": "Harmaasävy",
    "button.clearAll": "Tyhjennä Kaikki",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Tehtävämoniste",
    "tab.answerKey": "Vastaukset",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} omaa kuvaa käytettävissä.",
    "message.generatingWorksheet": "Luodaan tehtävämonistetta...",
    "message.worksheetGenerated": "Tehtävämoniste luotu!",
    "message.generatingAnswer": "Luodaan vastauksia...",
    "message.answerGenerated": "Vastaukset luotu!",
    "message.assetAdded": "{type} lisätty.",
    "message.formCleared": "Lomake tyhjennetty.",
    "message.downloadStarted": "Lataus aloitettu!",
    "message.pdfDownloaded": "PDF ladattu!",
    "message.pdfSuccess": "PDF ladattu!",
    "message.jpegDownloaded": "JPEG-lataus aloitettu!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Teemoja ei voitu ladata.",
    "message.maxImages": "Voit valita enintään {count} kuvaa.",
    "message.selectImages": "Valitse kuvia tai valitse teema, jossa on kuvia.",
    "message.generateFirst": "Luo ensin tehtävämoniste.",
    "message.cannotDownloadEmpty": "Tyhjää tiedostoa ei voi ladata: {fileName}.",
    "message.imageError": "Virhe kuvan valmistelussa: {error}",
    "message.generateContent": "Luo sisältö ensin.",
    "message.pdfError": "Virhe PDF:n luomisessa.",
    "message.generateWorksheet": "Luo ensin tehtävämoniste.",
    "message.jpegError": "Virhe JPEG:n valmistelussa.",
    "message.pdfCreateError": "Virhe PDF:n luomisessa: {error}",
    "message.imagesError": "Virhe kuvien lataamisessa.",
    "message.borderError": "Virhe reunusten lataamisessa.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Kaikki Teemat (käyttää käännöksiä)",
    "message.loading": "Ladataan...",
    "message.typeToSearch": "Kirjoita hakeaksesi kaikista kuvista.",
    "message.noImages": "Kuvia ei löytynyt {query}.",
    "message.uploadedHere": "Lataamasi kuvat näkyvät täällä.",
    "message.preparing": "Valmistellaan {format}...",
    "message.preparingPdf": "Valmistellaan PDF:ää...",
    "message.preparingJpeg": "Valmistellaan JPEG:tä...",
    "decoration.allBorders": "Kaikki Reunukset",
    "message.selectBorderTheme": "Valitse teema nähdäksesi reunukset.",
    "message.loadingBorders": "Ladataan reunuksia teemasta {theme}...",
    "message.noBorders": "Reunuksia ei löytynyt.",
    "decoration.allBackgrounds": "Kaikki Taustat",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Nimi: ________________",
    "form.dateField": "Päivämäärä: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "ILMAISVERSIO - LessonCraftStudio.com",
    "watermark.freeShort": "ILMAISVERSIO"
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'fi', params = {}) {
  const translation = WORD_GUESS_FINNISH_TRANSLATIONS[locale]?.[key] || key;
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
    WORD_GUESS_FINNISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}