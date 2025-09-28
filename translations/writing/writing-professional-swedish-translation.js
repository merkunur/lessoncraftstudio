// Writing App - Professional Swedish Translation
// Total: 103 unique translation keys
// Approach: Natural, educational Swedish as if originally developed in Sweden
// App name: "Skrivövningar Generator" (Writing Exercises Generator - standard educational term)

const WRITING_SWEDISH_TRANSLATIONS = {
  sv: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Skrivövningar Generator",
    "settings.title": "Skrivarbetsblad",

    // ===== 2. LANGUAGE SECTION (12 items) =====
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

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Sidinställningar",
    "library.title": "Bildbibliotek",
    "library.uploadTitle": "Ladda upp Egna Bilder",
    "settings.textTools": "Textverktyg",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Sidstorlek:",
    "pageSize.letterPortrait": "Letter Stående (8,5×11\")",
    "pageSize.letterLandscape": "Letter Liggande (11×8,5\")",
    "pageSize.a4Portrait": "A4 Stående (210×297mm)",
    "pageSize.a4Landscape": "A4 Liggande (297×210mm)",
    "pageSize.custom": "Anpassad",
    "settings.width": "Bredd (px):",
    "settings.height": "Höjd (px):",
    "decoration.backgroundTheme": "Bakgrundstema:",
    "decoration.none": "Ingen",
    "decoration.backgroundOpacity": "Bakgrundens Genomskinlighet:",
    "decoration.borderTheme": "Ramtema:",
    "decoration.borderOpacity": "Ramens Genomskinlighet:",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Rad {number}",
    "row.type": "Radtyp:",
    "rowType.trace": "Skriva Över",
    "rowType.fadingTrace": "Gradvis Överskrivning",
    "rowType.guidedCopy": "Guidad Avskrivning",
    "rowType.fill": "Fylla I",
    "row.fontStyle": "Skrivstil:",
    "fontStyle.printRegular": "Textning",
    "fontStyle.printRegularArrow": "Textning med Pilar",
    "fontStyle.printTracing": "Textning för Överskrivning",
    "fontStyle.printTracingArrow": "Textning för Överskrivning med Pilar",
    "fontStyle.cursive": "Skrivstil",
    "row.content": "Innehåll:",
    "content.empty": "Tom",
    "content.beginningLetter": "Begynnelsebokstav",
    "content.wholeFileName": "Hela Filnamnet",
    "content.customText": "Egen Text",
    "content.preWriting": "Förberedande Skrivning",
    "row.customTextPlaceholder": "Skriv in text att skriva över...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Bokstavstyp:",
    "case.uppercase": "Versaler",
    "case.lowercase": "Gemener",
    "case.titleCase": "Inledande Versal",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Strecktyp:",
    "stroke.vertical": "Lodrät Linje",
    "stroke.horizontal": "Vågrät Linje",
    "stroke.circle": "Cirkel",
    "stroke.zigzag": "Sicksacklinje",

    // ===== 8. IMAGE LIBRARY (11 items) =====
    "library.imageMode": "Bildläge:",
    "imageMode.exercise": "Övningsbild",
    "imageMode.custom": "Egna Bilder",
    "library.pickExercise": "Välj en övningsbild (valfritt):",
    "library.searchPlaceholder": "Sök bilder...",
    "library.selectedStatus": "Vald: {word}",
    "library.selectUpload": "Välj bild(er) att ladda upp:",
    "library.uploadedImages": "Dina Uppladdade Bilder:",
    "button.unselectImage": "Avmarkera Bild",
    "button.clearSelection": "Rensa Val",
    "button.addSelectedImage": "Lägg Till Vald Bild",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Lägg Till Ny Text",
    "text.content": "Innehåll:",
    "text.placeholder": "Ny Text",
    "text.selectedProperties": "Egenskaper för Markerad Text",
    "text.color": "Färg:",
    "text.size": "Storlek:",
    "text.font": "Typsnitt:",
    "text.outlineColor": "Konturfärg:",
    "text.outlineWidth": "Kontur (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Flytta Framåt",
    "toolbar.sendBackward": "Flytta Bakåt",
    "toolbar.align": "Justera",
    "toolbar.alignLeft": "Vänsterjustera",
    "toolbar.centerH": "Centrera Horisontellt",
    "toolbar.alignRight": "Högerjustera",
    "toolbar.alignTop": "Justera Upptill",
    "toolbar.centerV": "Centrera Vertikalt",
    "toolbar.alignBottom": "Justera Nedtill",
    "toolbar.centerPageH": "Centrera på Sidan Horisontellt",
    "toolbar.centerPageV": "Centrera på Sidan Vertikalt",
    "toolbar.cropOverflow": "Beskär Överflöd",
    "toolbar.lock": "Lås",
    "toolbar.delete": "Ta Bort",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Ta Bort Rad",
    "button.addRow": "Lägg Till Rad",
    "button.addText": "Lägg Till Text på Arbetsbladet",
    "button.deleteSelectedText": "Ta Bort Markerad Text",
    "button.download": "Ladda Ner",
    "button.downloadPdf": "Ladda Ner som PDF",
    "button.downloadJpeg": "Ladda Ner som JPEG",
    "settings.grayscale": "Gråskala",
    "button.clearAll": "Rensa Allt",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Raden har beskurits.",
    "message.worksheetCleared": "Arbetsbladet har rensats.",
    "message.pdfDownloaded": "PDF nedladdad!",
    "message.jpegDownloaded": "JPEG-nedladdning påbörjad!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Beskärning stöds inte för denna radtyp.",
    "message.noContentToCrop": "Denna rad har inget innehåll att beskära.",
    "message.noOverflow": "Inget överflöd att beskära.",
    "message.generateContent": "Vänligen generera innehåll först.",
    "message.pdfError": "Fel vid skapande av PDF.",
    "message.generateWorksheet": "Vänligen generera ett arbetsblad först.",
    "message.jpegError": "Fel vid förberedelse av JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (9 items) =====
    "message.selectBackgroundTheme": "Välj ett tema för bakgrunder.",
    "message.selectBorderTheme": "Välj ett tema för ramar.",
    "message.noImages": "Inga bilder hittades. Välj ett tema eller prova en annan sökning.",
    "message.themeLoadError": "Fel vid laddning av {type}-teman:",
    "message.selectTheme": "Välj ett tema.",
    "message.loading": "Laddar...",
    "message.loadError": "Fel vid laddning av {type}.",
    "message.preparingPdf": "Förbereder PDF...",
    "message.preparingJpeg": "Förbereder JPEG...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Är du säker på att du vill rensa arbetsbladet? Detta kan inte ångras.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "GRATISVERSION - LessonCraftStudio.com",
    "watermark.freeShort": "GRATISVERSION"
  }
};

// Helper functions
function getTranslation(key, locale = 'sv', params = {}) {
  const translation = WRITING_SWEDISH_TRANSLATIONS[locale]?.[key] || key;
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
    WRITING_SWEDISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}