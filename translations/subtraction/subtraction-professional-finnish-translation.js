// Subtraction App - Professional Finnish Translation
// Total: 145 translation keys (140 unique)
// Approach: Natural, educational Finnish as if originally developed in Finland
// App name: "Vähennyslaskutehtävät" (Subtraction Exercises - standard educational term)

const SUBTRACTION_FINNISH_TRANSLATIONS = {
  fi: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Vähennyslaskutehtävien Luonti",
    "settings.title": "Tehtävämonisteen Asetukset",

    // ===== 2. ACCORDION HEADERS (7 items) =====
    "settings.language": "Kieliasetukset",
    "settings.pageSetup": "Sivun Asetukset",
    "settings.textTools": "Tekstityökalut",
    "settings.exerciseConfig": "Tehtävien Määritykset",
    "library.title": "Kuvakirjasto",
    "decoration.title": "Kehykset & Taustat",
    "problemSettings": "Laskutehtävien Asetukset",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "selectLanguage": "Valitse Kieli",
    "language": "Kieli:",
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

    // ===== 4. PAGE SETUP (24 items) =====
    "pageSize": "Sivukoko:",
    "pageSize.usLetterPortrait": "US Letter (Pysty)",
    "pageSize.usLetterLandscape": "US Letter (Vaaka)",
    "pageSize.a4Portrait": "A4 (Pysty)",
    "pageSize.a4Landscape": "A4 (Vaaka)",
    "pageSize.a3Portrait": "A3 (Pysty)",
    "pageSize.a3Landscape": "A3 (Vaaka)",
    "pageSize.tabloidPortrait": "Tabloid (Pysty)",
    "pageSize.tabloidLandscape": "Tabloid (Vaaka)",
    "pageSize.legalPortrait": "Legal (Pysty)",
    "pageSize.legalLandscape": "Legal (Vaaka)",
    "pageSize.custom": "Mukautettu",
    "widthPx": "Leveys (px):",
    "heightPx": "Korkeus (px):",
    "applySize": "Käytä Kokoa",
    "pageColor": "Sivun Väri:",
    "background": "Tausta",
    "backgroundTheme": "Taustateema:",
    "selectBackgroundTheme": "Valitse taustateema.",
    "backgroundOpacity": "Taustan Läpinäkyvyys:",
    "border": "Kehys",
    "borderTheme": "Kehysteema:",
    "selectBorderTheme": "Valitse kehysteema.",
    "borderOpacity": "Kehyksen Läpinäkyvyys:",

    // ===== 5. COMMON (2 items) =====
    "none": "Ei mitään",
    "grayscale": "Harmaasävy",

    // ===== 6. DOWNLOAD OPTIONS (7 items) =====
    "settings.downloadOptions": "Kuvan Latausasetukset",
    "settings.quality": "Laatu:",
    "quality.standard": "Vakio (100%)",
    "quality.high": "Korkea Resoluutio (200%)",
    "quality.ultra": "Ultra HD (300%)",
    "quality.max": "Maksimi (400%)",
    "settings.grayscale": "Harmaasävy",

    // ===== 7. TEXT TOOLS (12 items) =====
    "addNewText": "Lisää Uusi Teksti",
    "content": "Sisältö:",
    "enterTextHerePlaceholder": "Kirjoita teksti tähän...",
    "addTextToPage": "Lisää Teksti Sivulle",
    "selectedTextProperties": "Valitun Tekstin Ominaisuudet",
    "color": "Väri:",
    "size": "Koko:",
    "font": "Fontti:",
    "outlineColor": "Reunaviivan Väri:",
    "outlineWidth": "Reunaviiva (0-10):",
    "text.strokeColor": "Viivan Väri:",
    "text.strokeWidth": "Leveys:",

    // ===== 8. FONTS (7 items) =====
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ===== 9. EXERCISE CONFIGURATION (5 items) =====
    "config.exerciseCount": "Tehtävien Määrä:",
    "config.maxMinuend": "Suurin Vähennettävä:",
    "config.includeNameDate": "Lisää Nimi & Päivämäärä",
    "config.includeExerciseNumbers": "Lisää Tehtävänumerot",
    "config.useFriendlyBox": "Käytä Selkeää Asettelua",

    // ===== 10. IMAGE LIBRARY (13 items) =====
    "imageLibrary": "Kuvakirjasto",
    "imageTheme": "Kuvateema:",
    "searchImagesPlaceholder": "Etsi kuvia...",
    "selectThemeFromDropdown": "Valitse teema ylläolevasta valikosta.",
    "selectedImages": "Valitut Kuvat",
    "selectedCount": "Valittu: {count} / {max}",
    "selectedImagesWillAppear": "Valitsemasi kuvat näkyvät tässä.",
    "multipleChoice": "Monivalinta (vastauslomake kaikilla oikeilla vastauksilla)",
    "orderMatters": "Järjestys on Tärkeä (kiinteä kuvajärjestys)",
    "randomSelect": "Satunnainen Valinta",
    "clearSelection": "Tyhjennä Valinta",
    "themes.all": "Kaikki Teemat",
    "library.selectedCount": "Valittu: {x} / {y}",

    // ===== 11. UPLOAD SECTION (3 items) =====
    "selectImagesToUpload": "Valitse ladattavat kuvat:",
    "yourUploadedImages": "Lataamasi Kuvat (Tämä Istunto)",
    "uploadedImagesWillAppear": "Lataamasi kuvat näkyvät tässä.",

    // ===== 12. PROBLEM SETTINGS (6 items) =====
    "numberOfProblems": "Tehtävien Määrä (1-30):",
    "columns": "Sarakkeet (1-6):",
    "imageSize": "Kuvan Koko (px, 20-200):",
    "spacingBetweenImages": "Kuvien Väli (px, 0-50):",
    "verticalSpacing": "Tehtävien Pystyväli (px, 0-100):",
    "includeNameDateFields": "Lisää Nimi/Päivämäärä-kentät",

    // ===== 13. ACTION BUTTONS (14 items) =====
    "generate": "Luo",
    "generateWorksheet": "Luo Tehtävämoniste",
    "generateAnswerKey": "Luo Vastaukset",
    "download": "Lataa",
    "worksheetJpeg": "Tehtävämoniste (JPEG)",
    "answerKeyJpeg": "Vastaukset (JPEG)",
    "worksheetPdf": "Tehtävämoniste (PDF)",
    "answerKeyPdf": "Vastaukset (PDF)",
    "clearAll": "Tyhjennä Kaikki",
    "button.generate": "Luo Tehtävämoniste",
    "button.generateAnswer": "Luo Vastaukset",
    "button.downloadJpeg": "Lataa JPEG",
    "button.downloadPdf": "Lataa PDF",
    "button.clearAll": "Tyhjennä Kaikki",

    // ===== 14. TABS (2 items) =====
    "worksheet": "Tehtävämoniste",
    "answerKey": "Vastaukset",

    // ===== 15. TOOLBAR (15 items) =====
    "layers": "Tasot",
    "bringForward": "Tuo Eteen",
    "sendBackward": "Vie Taakse",
    "align": "Tasaa",
    "alignSelected": "Tasaa Valittu:",
    "alignToPage": "Tasaa Sivulle:",
    "deleteSelected": "Poista Valittu",
    "toolbar.alignLeft": "Tasaa Vasemmalle",
    "toolbar.centerH": "Keskitä Vaakasuunnassa",
    "toolbar.alignRight": "Tasaa Oikealle",
    "toolbar.alignTop": "Tasaa Ylös",
    "toolbar.centerV": "Keskitä Pystysuunnassa",
    "toolbar.alignBottom": "Tasaa Alas",
    "toolbar.centerPageH": "Keskitä Sivulle Vaakasuunnassa",
    "toolbar.centerPageV": "Keskitä Sivulle Pystysuunnassa",

    // ===== 16. SUCCESS MESSAGES (10 items) =====
    "textAdded": "Teksti lisätty.",
    "formCleared": "Lomake tyhjennetty.",
    "worksheetGeneratedSuccessfully": "Tehtävämoniste luotu!",
    "answerKeyGenerated": "Vastaukset luotu!",
    "downloadInitiated": "Lataus aloitettu!",
    "pdfDownloaded": "PDF ladattu!",
    "jpegDownloadInitiated": "JPEG-lataus aloitettu!",
    "message.pdfSuccess": "PDF ladattu!",
    "message.backgroundAdded": "Tausta lisätty.",
    "message.worksheetGenerated": "Tehtävämoniste luotu!",

    // ===== 17. ERROR MESSAGES (15 items) =====
    "couldNotLoadThemes": "Teemoja ei voitu ladata.",
    "errorLoadingThemes": "Virhe teemojen latauksessa.",
    "errorDuringSearch": "Virhe haussa.",
    "errorLoadingImages": "Virhe kuvien latauksessa.",
    "maxImagesSelected": "Enintään {count} kuvaa valittu.",
    "pleaseSelectImagesFirst": "Valitse ensin kuvia, joko kirjastosta tai lataamalla omia.",
    "pleaseGenerateWorksheetFirst": "Luo ensin tehtävämoniste.",
    "canvasIsEmpty": "Työskentelyalue on tyhjä. Ei mitään ladattavaa.",
    "errorPreparingJpeg": "Virhe JPEG:n valmistelussa: {error}",
    "pleaseGenerateContentFirst": "Luo ensin sisältöä.",
    "errorCreatingPdf": "Virhe PDF:n luonnissa.",
    "message.pdfError": "Virhe PDF:n luonnissa.",
    "message.jpegError": "Virhe JPEG:n valmistelussa.",
    "message.imageLoadFailed": "Kehys/taustakuvan lataus epäonnistui.",
    "message.pdfCreateError": "Virhe PDF:n luonnissa: {error}",

    // ===== 18. INFO MESSAGES (9 items) =====
    "loadingDefaultTheme": "Ladataan oletusteemaa...",
    "searching": "Etsitään...",
    "loadingImagesForTheme": "Ladataan kuvia teemalle...",
    "noImagesFound": "Kuvia ei löytynyt{query}.",
    "preparingFile": "Valmistellaan {filename}...",
    "preparingPdf": "Valmistellaan PDF:ää...",
    "preparingJpeg": "Valmistellaan JPEG:tä...",
    "message.loading": "Ladataan...",
    "message.preparingDownload": "Valmistellaan latausta...",

    // ===== 19. NAME/DATE FIELDS (2 items) =====
    "form.nameField": "Nimi: _________________________",
    "form.dateField": "Päivämäärä: ____________",

    // ===== 20. WATERMARKS (2 items) =====
    "watermark.free": "ILMAISVERSIO - LessonCraftStudio.com",
    "watermark.freeShort": "ILMAISVERSIO",

    // ===== 21. PREVIEW (1 item) =====
    "preview.title": "Esikatselu",

    // ===== 22. SUBTRACTION-SPECIFIC FEATURES =====
    // Note: Mathematical terms and visual concepts
    // - Yliviivatut kuvat visuaaliseen vähennyslaskuun
    // - Vähennettävä/Vähentäjä matemaattisina termeinä
    // - Selkeä asettelu "Friendly Box" sijaan
    // - Vastausviivat oppilaille
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'fi', params = {}) {
  const translation = SUBTRACTION_FINNISH_TRANSLATIONS[locale]?.[key] || key;
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
    SUBTRACTION_FINNISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}