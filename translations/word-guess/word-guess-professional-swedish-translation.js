// Word Guess App - Professional Swedish Translation
// Total: 93 unique translation keys
// Approach: Natural, educational Swedish as if originally developed in Sweden
// App name: "Bildgåtor Generator" (Picture Riddles Generator - engaging educational term)

const WORD_GUESS_SWEDISH_TRANSLATIONS = {
  sv: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Bildgåtor Generator",
    "settings.title": "Bildgåtor Inställningar",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Språkinställningar",
    "settings.pageSetup": "Sidformat",
    "settings.textTools": "Textverktyg",
    "settings.exerciseConfig": "Övningsinställningar",
    "library.title": "Bildsamling",
    "library.uploadTitle": "Ladda Upp Egna Bilder",

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

    // ===== 4. PAGE SETUP (16 items) =====
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
    "button.applySize": "Tillämpa Storlek",
    "decoration.backgroundTheme": "Bakgrundstema:",
    "decoration.none": "Ingen",
    "decoration.backgroundOpacity": "Bakgrundens Genomskinlighet:",
    "decoration.borderTheme": "Ramtema:",
    "decoration.borderOpacity": "Ramens Genomskinlighet:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Innehåll:",
    "text.placeholder": "Hej!",
    "button.addText": "Lägg Till Text",
    "text.color": "Färg:",
    "text.size": "Storlek:",
    "text.font": "Typsnitt:",
    "text.outlineColor": "Konturfärg:",
    "text.outlineWidth": "Konturtjocklek (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Antal Gåtor (1–10):",
    "config.difficulty": "Svårighetsgrad (Antal Ledtrådar)",
    "difficulty.noClues": "Inga ledtrådar",
    "difficulty.easy": "Lätt (1/2)",
    "difficulty.normal": "Normal (1/4)",
    "difficulty.tough": "Svår (1/6)",
    "config.excludeLetters": "Uteslut Bokstäver från Ledtrådar:",
    "config.excludePlaceholder": "t.ex. AEIOUÅÄÖ",
    "config.letterCase": "Bokstavstyp",
    "case.uppercase": "Versaler",
    "case.lowercase": "Gemener",
    "config.includeNameDate": "Inkludera Namn & Datum",
    "config.includeExerciseNumbers": "Numrera Övningarna",

    // ===== 7. IMAGE LIBRARY (8 items) =====
    "library.selectTheme": "Välj Tema:",
    "library.search": "Sök Bilder:",
    "library.searchPlaceholder": "t.ex. äpple, bil",
    "library.availableImages": "Tillgängliga Bilder:",
    "library.selectedImages": "Valda Bilder för Gåtor:",
    "library.selectUpload": "Välj bilder att ladda upp:",
    "library.uploadedImages": "Dina Uppladdade Bilder (Denna Session):",
    "library.selectedCount": "Valda: {x} / {y}",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Lager",
    "toolbar.bringForward": "Flytta Framåt",
    "toolbar.sendBackward": "Flytta Bakåt",
    "toolbar.align": "Justera",
    "toolbar.alignLeft": "Vänsterjustera",
    "toolbar.centerH": "Centrera Horisontellt",
    "toolbar.alignRight": "Högerjustera",
    "toolbar.alignTop": "Justera Uppåt",
    "toolbar.centerV": "Centrera Vertikalt",
    "toolbar.alignBottom": "Justera Nedåt",
    "toolbar.centerPageH": "Centrera på Sidan Horisontellt",
    "toolbar.centerPageV": "Centrera på Sidan Vertikalt",
    "toolbar.delete": "Ta Bort Markering",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Generera",
    "button.generateWorksheet": "Skapa Arbetsblad",
    "button.generateAnswer": "Skapa Facit",
    "button.download": "Ladda Ner",
    "button.worksheetJpeg": "Arbetsblad (JPEG)",
    "button.answerJpeg": "Facit (JPEG)",
    "button.worksheetPdf": "Arbetsblad (PDF)",
    "button.answerPdf": "Facit (PDF)",
    "settings.grayscale": "Gråskala",
    "button.clearAll": "Rensa Allt",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Arbetsblad",
    "tab.answerKey": "Facit",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} egen/egna bild(er) tillgänglig(a).",
    "message.generatingWorksheet": "Skapar arbetsblad...",
    "message.worksheetGenerated": "Arbetsblad skapat!",
    "message.generatingAnswer": "Skapar facit...",
    "message.answerGenerated": "Facit skapat!",
    "message.assetAdded": "{type} tillagd.",
    "message.formCleared": "Formulär rensat.",
    "message.downloadStarted": "Nedladdning startad!",
    "message.pdfDownloaded": "PDF nedladdad!",
    "message.pdfSuccess": "PDF nedladdad!",
    "message.jpegDownloaded": "JPEG-nedladdning startad!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Kunde inte ladda teman.",
    "message.maxImages": "Du kan välja max {count} bilder.",
    "message.selectImages": "Välj några bilder eller välj ett tema med bilder.",
    "message.generateFirst": "Skapa ett arbetsblad först.",
    "message.cannotDownloadEmpty": "Kan inte ladda ner tom fil: {fileName}.",
    "message.imageError": "Fel vid förberedelse av bild: {error}",
    "message.generateContent": "Generera innehållet först.",
    "message.pdfError": "Fel vid skapande av PDF.",
    "message.generateWorksheet": "Skapa ett arbetsblad först.",
    "message.jpegError": "Fel vid förberedelse av JPEG.",
    "message.pdfCreateError": "Fel vid skapande av PDF: {error}",
    "message.imagesError": "Fel vid laddning av bilder.",
    "message.borderError": "Fel vid laddning av ramar.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Alla Teman (använder översättningar)",
    "message.loading": "Laddar...",
    "message.typeToSearch": "Skriv för att söka bland alla bilder.",
    "message.noImages": "Inga bilder hittades {query}.",
    "message.uploadedHere": "Dina uppladdade bilder visas här.",
    "message.preparing": "Förbereder {format}...",
    "message.preparingPdf": "Förbereder PDF...",
    "message.preparingJpeg": "Förbereder JPEG...",
    "decoration.allBorders": "Alla Ramar",
    "message.selectBorderTheme": "Välj ett tema för att se ramar.",
    "message.loadingBorders": "Laddar ramar från {theme}...",
    "message.noBorders": "Inga ramar hittades.",
    "decoration.allBackgrounds": "Alla Bakgrunder",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Namn: ________________",
    "form.dateField": "Datum: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "GRATISVERSION - LessonCraftStudio.com",
    "watermark.freeShort": "GRATISVERSION"
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'sv', params = {}) {
  const translation = WORD_GUESS_SWEDISH_TRANSLATIONS[locale]?.[key] || key;
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
    WORD_GUESS_SWEDISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}