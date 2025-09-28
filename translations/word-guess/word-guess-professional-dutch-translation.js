// Word Guess App - Professional Dutch Translation
// Total: 93 unique translation keys
// Approach: Natural, educational Dutch as if originally developed in the Netherlands
// App name: "Woordpuzzel Generator" (Word Puzzle Generator - engaging educational term)

const WORD_GUESS_DUTCH_TRANSLATIONS = {
  nl: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Woordpuzzel Generator",
    "settings.title": "Woordpuzzel Instellingen",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Taalinstellingen",
    "settings.pageSetup": "Pagina-instelling",
    "settings.textTools": "Tekstgereedschappen",
    "settings.exerciseConfig": "Oefening Configuratie",
    "library.title": "Afbeeldingen Collectie",
    "library.uploadTitle": "Upload Je Eigen Afbeeldingen",

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

    // ===== 4. PAGE SETUP (16 items) =====
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
    "button.applySize": "Formaat Toepassen",
    "decoration.backgroundTheme": "Achtergrondthema:",
    "decoration.none": "Geen",
    "decoration.backgroundOpacity": "Achtergrond Transparantie:",
    "decoration.borderTheme": "Kaderthema:",
    "decoration.borderOpacity": "Kader Transparantie:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Inhoud:",
    "text.placeholder": "Hallo!",
    "button.addText": "Tekst Toevoegen",
    "text.color": "Kleur:",
    "text.size": "Grootte:",
    "text.font": "Lettertype:",
    "text.outlineColor": "Omlijning Kleur:",
    "text.outlineWidth": "Omlijning Dikte (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Aantal Puzzels (1–10):",
    "config.difficulty": "Moeilijkheidsgraad (Aantal Hints)",
    "difficulty.noClues": "Geen hints",
    "difficulty.easy": "Makkelijk (1/2)",
    "difficulty.normal": "Normaal (1/4)",
    "difficulty.tough": "Moeilijk (1/6)",
    "config.excludeLetters": "Letters Uitsluiten van Hints:",
    "config.excludePlaceholder": "bijv. AEIOU",
    "config.letterCase": "Lettertype",
    "case.uppercase": "Hoofdletters",
    "case.lowercase": "Kleine letters",
    "config.includeNameDate": "Naam en Datum Toevoegen",
    "config.includeExerciseNumbers": "Oefeningen Nummeren",

    // ===== 7. IMAGE LIBRARY (8 items) =====
    "library.selectTheme": "Selecteer Thema:",
    "library.search": "Zoek Afbeeldingen:",
    "library.searchPlaceholder": "bijv. appel, auto",
    "library.availableImages": "Beschikbare Afbeeldingen:",
    "library.selectedImages": "Geselecteerde Afbeeldingen voor Puzzels:",
    "library.selectUpload": "Selecteer afbeeldingen om te uploaden:",
    "library.uploadedImages": "Jouw Geüploade Afbeeldingen (Deze Sessie):",
    "library.selectedCount": "Geselecteerd: {x} / {y}",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Lagen",
    "toolbar.bringForward": "Naar Voren",
    "toolbar.sendBackward": "Naar Achteren",
    "toolbar.align": "Uitlijnen",
    "toolbar.alignLeft": "Links Uitlijnen",
    "toolbar.centerH": "Horizontaal Centreren",
    "toolbar.alignRight": "Rechts Uitlijnen",
    "toolbar.alignTop": "Boven Uitlijnen",
    "toolbar.centerV": "Verticaal Centreren",
    "toolbar.alignBottom": "Onder Uitlijnen",
    "toolbar.centerPageH": "Op Pagina Horizontaal Centreren",
    "toolbar.centerPageV": "Op Pagina Verticaal Centreren",
    "toolbar.delete": "Selectie Verwijderen",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Genereren",
    "button.generateWorksheet": "Werkblad Maken",
    "button.generateAnswer": "Antwoordblad Maken",
    "button.download": "Downloaden",
    "button.worksheetJpeg": "Werkblad (JPEG)",
    "button.answerJpeg": "Antwoordblad (JPEG)",
    "button.worksheetPdf": "Werkblad (PDF)",
    "button.answerPdf": "Antwoordblad (PDF)",
    "settings.grayscale": "Grijswaarden",
    "button.clearAll": "Alles Wissen",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Werkblad",
    "tab.answerKey": "Antwoordblad",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} eigen afbeelding(en) beschikbaar.",
    "message.generatingWorksheet": "Werkblad wordt aangemaakt...",
    "message.worksheetGenerated": "Werkblad succesvol aangemaakt!",
    "message.generatingAnswer": "Antwoordblad wordt aangemaakt...",
    "message.answerGenerated": "Antwoordblad gemaakt!",
    "message.assetAdded": "{type} toegevoegd.",
    "message.formCleared": "Formulier gewist.",
    "message.downloadStarted": "Download gestart!",
    "message.pdfDownloaded": "PDF gedownload!",
    "message.pdfSuccess": "PDF gedownload!",
    "message.jpegDownloaded": "JPEG download gestart!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Kon thema's niet laden.",
    "message.maxImages": "Je kunt maximaal {count} afbeeldingen selecteren.",
    "message.selectImages": "Selecteer alstublieft enkele afbeeldingen of kies een thema met afbeeldingen.",
    "message.generateFirst": "Maak eerst een werkblad aan.",
    "message.cannotDownloadEmpty": "Kan leeg bestand niet downloaden: {fileName}.",
    "message.imageError": "Fout bij voorbereiden afbeelding: {error}",
    "message.generateContent": "Genereer eerst de inhoud.",
    "message.pdfError": "Fout bij maken PDF.",
    "message.generateWorksheet": "Maak eerst een werkblad aan.",
    "message.jpegError": "Fout bij voorbereiden JPEG.",
    "message.pdfCreateError": "Fout bij maken PDF: {error}",
    "message.imagesError": "Fout bij laden afbeeldingen.",
    "message.borderError": "Fout bij laden kaders.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Alle Thema's (gebruikt vertalingen)",
    "message.loading": "Laden...",
    "message.typeToSearch": "Typ om te zoeken in alle afbeeldingen.",
    "message.noImages": "Geen afbeeldingen gevonden {query}.",
    "message.uploadedHere": "Jouw geüploade afbeeldingen verschijnen hier.",
    "message.preparing": "Voorbereiden {format}...",
    "message.preparingPdf": "PDF voorbereiden...",
    "message.preparingJpeg": "JPEG voorbereiden...",
    "decoration.allBorders": "Alle Kaders",
    "message.selectBorderTheme": "Selecteer een thema om kaders te zien.",
    "message.loadingBorders": "Kaders laden van {theme}...",
    "message.noBorders": "Geen kaders gevonden.",
    "decoration.allBackgrounds": "Alle Achtergronden",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Naam: ________________",
    "form.dateField": "Datum: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "GRATIS VERSIE - LessonCraftStudio.com",
    "watermark.freeShort": "GRATIS VERSIE"
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'nl', params = {}) {
  const translation = WORD_GUESS_DUTCH_TRANSLATIONS[locale]?.[key] || key;
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
    WORD_GUESS_DUTCH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}