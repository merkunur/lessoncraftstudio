// Writing App - Professional Finnish Translation
// Total: 103 unique translation keys
// Approach: Natural, educational Finnish as if originally developed in Finland
// App name: "Kirjoitusharjoitusten Luoja" (Writing Exercises Creator - standard educational term)

const WRITING_FINNISH_TRANSLATIONS = {
  fi: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Kirjoitusharjoitusten Luoja",
    "settings.title": "Kirjoitustehtävä",

    // ===== 2. LANGUAGE SECTION (12 items) =====
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

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Sivun Asetukset",
    "library.title": "Kuvakirjasto",
    "library.uploadTitle": "Lataa Omia Kuvia",
    "settings.textTools": "Tekstityökalut",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Sivun Koko:",
    "pageSize.letterPortrait": "Letter Pysty (8,5×11\")",
    "pageSize.letterLandscape": "Letter Vaaka (11×8,5\")",
    "pageSize.a4Portrait": "A4 Pysty (210×297mm)",
    "pageSize.a4Landscape": "A4 Vaaka (297×210mm)",
    "pageSize.custom": "Mukautettu",
    "settings.width": "Leveys (px):",
    "settings.height": "Korkeus (px):",
    "decoration.backgroundTheme": "Taustateema:",
    "decoration.none": "Ei mitään",
    "decoration.backgroundOpacity": "Taustan Läpinäkyvyys:",
    "decoration.borderTheme": "Reunusteema:",
    "decoration.borderOpacity": "Reunuksen Läpinäkyvyys:",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Rivi {number}",
    "row.type": "Rivityyppi:",
    "rowType.trace": "Jäljentäminen",
    "rowType.fadingTrace": "Häivytetty Jäljentäminen",
    "rowType.guidedCopy": "Ohjattu Kopiointi",
    "rowType.fill": "Täyttäminen",
    "row.fontStyle": "Kirjoitustyyli:",
    "fontStyle.printRegular": "Tekstaus",
    "fontStyle.printRegularArrow": "Tekstaus Nuolilla",
    "fontStyle.printTracing": "Jäljennystekstaus",
    "fontStyle.printTracingArrow": "Jäljennystekstaus Nuolilla",
    "fontStyle.cursive": "Kaunokirjoitus",
    "row.content": "Sisältö:",
    "content.empty": "Tyhjä",
    "content.beginningLetter": "Alkukirjain",
    "content.wholeFileName": "Koko Tiedostonimi",
    "content.customText": "Oma Teksti",
    "content.preWriting": "Kirjoitusvalmiudet",
    "row.customTextPlaceholder": "Kirjoita jäljennettävä teksti...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Kirjaintyyppi:",
    "case.uppercase": "Isot Kirjaimet",
    "case.lowercase": "Pienet Kirjaimet",
    "case.titleCase": "Iso Alkukirjain",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Viivatyyppi:",
    "stroke.vertical": "Pystyviiva",
    "stroke.horizontal": "Vaakaviiva",
    "stroke.circle": "Ympyrä",
    "stroke.zigzag": "Siksak-viiva",

    // ===== 8. IMAGE LIBRARY (11 items) =====
    "library.imageMode": "Kuvatila:",
    "imageMode.exercise": "Harjoituskuva",
    "imageMode.custom": "Omat Kuvat",
    "library.pickExercise": "Valitse harjoituskuva (valinnainen):",
    "library.searchPlaceholder": "Hae kuvia...",
    "library.selectedStatus": "Valittu: {word}",
    "library.selectUpload": "Valitse ladattava(t) kuva(t):",
    "library.uploadedImages": "Ladatut Kuvat:",
    "button.unselectImage": "Poista Kuvan Valinta",
    "button.clearSelection": "Tyhjennä Valinta",
    "button.addSelectedImage": "Lisää Valittu Kuva",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Lisää Uusi Teksti",
    "text.content": "Sisältö:",
    "text.placeholder": "Uusi Teksti",
    "text.selectedProperties": "Valitun Tekstin Ominaisuudet",
    "text.color": "Väri:",
    "text.size": "Koko:",
    "text.font": "Kirjasintyyppi:",
    "text.outlineColor": "Ääriviivan Väri:",
    "text.outlineWidth": "Ääriviiva (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Tuo Eteen",
    "toolbar.sendBackward": "Vie Taakse",
    "toolbar.align": "Tasaa",
    "toolbar.alignLeft": "Tasaa Vasemmalle",
    "toolbar.centerH": "Keskitä Vaakasuunnassa",
    "toolbar.alignRight": "Tasaa Oikealle",
    "toolbar.alignTop": "Tasaa Ylös",
    "toolbar.centerV": "Keskitä Pystysuunnassa",
    "toolbar.alignBottom": "Tasaa Alas",
    "toolbar.centerPageH": "Keskitä Sivulle Vaakasuunnassa",
    "toolbar.centerPageV": "Keskitä Sivulle Pystysuunnassa",
    "toolbar.cropOverflow": "Rajaa Ylimääräinen",
    "toolbar.lock": "Lukitse",
    "toolbar.delete": "Poista",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Poista Rivi",
    "button.addRow": "Lisää Rivi",
    "button.addText": "Lisää Teksti Tehtävälle",
    "button.deleteSelectedText": "Poista Valittu Teksti",
    "button.download": "Lataa",
    "button.downloadPdf": "Lataa PDF-muodossa",
    "button.downloadJpeg": "Lataa JPEG-muodossa",
    "settings.grayscale": "Harmaasävy",
    "button.clearAll": "Tyhjennä Kaikki",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Rivi rajattu onnistuneesti.",
    "message.worksheetCleared": "Tehtävä tyhjennetty.",
    "message.pdfDownloaded": "PDF ladattu!",
    "message.jpegDownloaded": "JPEG-lataus aloitettu!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Rajaaminen ei ole tuettu tälle rivityypille.",
    "message.noContentToCrop": "Tällä rivillä ei ole rajattavaa sisältöä.",
    "message.noOverflow": "Ei ylimääräistä rajattavaa.",
    "message.generateContent": "Luo ensin sisältö.",
    "message.pdfError": "Virhe PDF:n luomisessa.",
    "message.generateWorksheet": "Luo ensin tehtävä.",
    "message.jpegError": "Virhe JPEG:n valmistelussa.",

    // ===== 14. INFO/LOADING MESSAGES (9 items) =====
    "message.selectBackgroundTheme": "Valitse taustateema.",
    "message.selectBorderTheme": "Valitse reunusteema.",
    "message.noImages": "Kuvia ei löytynyt. Valitse teema tai kokeile toista hakua.",
    "message.themeLoadError": "Virhe ladattaessa {type}-teemoja:",
    "message.selectTheme": "Valitse teema.",
    "message.loading": "Ladataan...",
    "message.loadError": "Virhe ladattaessa {type}.",
    "message.preparingPdf": "Valmistellaan PDF:ää...",
    "message.preparingJpeg": "Valmistellaan JPEG:iä...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Haluatko varmasti tyhjentää tehtävän? Tätä ei voi perua.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "ILMAISVERSIO - LessonCraftStudio.com",
    "watermark.freeShort": "ILMAISVERSIO"
  }
};

// Helper functions
function getTranslation(key, locale = 'fi', params = {}) {
  const translation = WRITING_FINNISH_TRANSLATIONS[locale]?.[key] || key;
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
    WRITING_FINNISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}