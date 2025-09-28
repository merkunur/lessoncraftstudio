// Writing App - Professional Danish Translation
// Total: 103 unique translation keys
// Approach: Natural, educational Danish as if originally developed in Denmark
// App name: "Skriveøvelser Generator" (Writing Exercises Generator - standard educational term)

const WRITING_DANISH_TRANSLATIONS = {
  da: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Skriveøvelser Generator",
    "settings.title": "Skrivearbejdsark",

    // ===== 2. LANGUAGE SECTION (12 items) =====
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

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Sideopsætning",
    "library.title": "Billedbibliotek",
    "library.uploadTitle": "Upload Egne Billeder",
    "settings.textTools": "Tekstværktøjer",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Sidestørrelse:",
    "pageSize.letterPortrait": "Letter Stående (8,5×11\")",
    "pageSize.letterLandscape": "Letter Liggende (11×8,5\")",
    "pageSize.a4Portrait": "A4 Stående (210×297mm)",
    "pageSize.a4Landscape": "A4 Liggende (297×210mm)",
    "pageSize.custom": "Tilpasset",
    "settings.width": "Bredde (px):",
    "settings.height": "Højde (px):",
    "decoration.backgroundTheme": "Baggrundstema:",
    "decoration.none": "Ingen",
    "decoration.backgroundOpacity": "Baggrunds Gennemsigtighed:",
    "decoration.borderTheme": "Rammetema:",
    "decoration.borderOpacity": "Rammens Gennemsigtighed:",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Række {number}",
    "row.type": "Rækketype:",
    "rowType.trace": "Efterskrive",
    "rowType.fadingTrace": "Gradvis Efterskrivning",
    "rowType.guidedCopy": "Guidet Afskrivning",
    "rowType.fill": "Udfylde",
    "row.fontStyle": "Skrifttype:",
    "fontStyle.printRegular": "Trykte Bogstaver",
    "fontStyle.printRegularArrow": "Trykte Bogstaver med Pile",
    "fontStyle.printTracing": "Trykte Bogstaver til Efterskrivning",
    "fontStyle.printTracingArrow": "Trykte Bogstaver til Efterskrivning med Pile",
    "fontStyle.cursive": "Håndskrift",
    "row.content": "Indhold:",
    "content.empty": "Tom",
    "content.beginningLetter": "Begyndelsesbogstav",
    "content.wholeFileName": "Hele Filnavnet",
    "content.customText": "Egen Tekst",
    "content.preWriting": "Forberedende Skrivning",
    "row.customTextPlaceholder": "Indtast tekst til efterskrivning...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Bogstavtype:",
    "case.uppercase": "Store Bogstaver",
    "case.lowercase": "Små Bogstaver",
    "case.titleCase": "Stort Begyndelsesbogstav",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Stregtype:",
    "stroke.vertical": "Lodret Linje",
    "stroke.horizontal": "Vandret Linje",
    "stroke.circle": "Cirkel",
    "stroke.zigzag": "Zigzaglinje",

    // ===== 8. IMAGE LIBRARY (11 items) =====
    "library.imageMode": "Billedtilstand:",
    "imageMode.exercise": "Øvelsesbillede",
    "imageMode.custom": "Egne Billeder",
    "library.pickExercise": "Vælg et øvelsesbillede (valgfrit):",
    "library.searchPlaceholder": "Søg billeder...",
    "library.selectedStatus": "Valgt: {word}",
    "library.selectUpload": "Vælg billede(r) til upload:",
    "library.uploadedImages": "Dine Uploadede Billeder:",
    "button.unselectImage": "Fravælg Billede",
    "button.clearSelection": "Ryd Valg",
    "button.addSelectedImage": "Tilføj Valgt Billede",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Tilføj Ny Tekst",
    "text.content": "Indhold:",
    "text.placeholder": "Ny Tekst",
    "text.selectedProperties": "Egenskaber for Valgt Tekst",
    "text.color": "Farve:",
    "text.size": "Størrelse:",
    "text.font": "Skrifttype:",
    "text.outlineColor": "Konturfarve:",
    "text.outlineWidth": "Kontur (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Flyt Fremad",
    "toolbar.sendBackward": "Flyt Bagud",
    "toolbar.align": "Juster",
    "toolbar.alignLeft": "Venstrejuster",
    "toolbar.centerH": "Centrer Vandret",
    "toolbar.alignRight": "Højrejuster",
    "toolbar.alignTop": "Juster Øverst",
    "toolbar.centerV": "Centrer Lodret",
    "toolbar.alignBottom": "Juster Nederst",
    "toolbar.centerPageH": "Centrer på Siden Vandret",
    "toolbar.centerPageV": "Centrer på Siden Lodret",
    "toolbar.cropOverflow": "Beskær Overløb",
    "toolbar.lock": "Lås",
    "toolbar.delete": "Slet",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Slet Række",
    "button.addRow": "Tilføj Række",
    "button.addText": "Tilføj Tekst til Arbejdsark",
    "button.deleteSelectedText": "Slet Valgt Tekst",
    "button.download": "Download",
    "button.downloadPdf": "Download som PDF",
    "button.downloadJpeg": "Download som JPEG",
    "settings.grayscale": "Gråtoner",
    "button.clearAll": "Ryd Alt",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Rækken er blevet beskåret.",
    "message.worksheetCleared": "Arbejdsarket er ryddet.",
    "message.pdfDownloaded": "PDF downloadet!",
    "message.jpegDownloaded": "JPEG-download startet!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Beskæring understøttes ikke for denne rækketype.",
    "message.noContentToCrop": "Denne række har intet indhold at beskære.",
    "message.noOverflow": "Intet overløb at beskære.",
    "message.generateContent": "Generer venligst indhold først.",
    "message.pdfError": "Fejl ved oprettelse af PDF.",
    "message.generateWorksheet": "Generer venligst et arbejdsark først.",
    "message.jpegError": "Fejl ved forberedelse af JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (9 items) =====
    "message.selectBackgroundTheme": "Vælg et tema til baggrunde.",
    "message.selectBorderTheme": "Vælg et tema til rammer.",
    "message.noImages": "Ingen billeder fundet. Vælg et tema eller prøv en anden søgning.",
    "message.themeLoadError": "Fejl ved indlæsning af {type}-temaer:",
    "message.selectTheme": "Vælg et tema.",
    "message.loading": "Indlæser...",
    "message.loadError": "Fejl ved indlæsning af {type}.",
    "message.preparingPdf": "Forbereder PDF...",
    "message.preparingJpeg": "Forbereder JPEG...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Er du sikker på, at du vil rydde arbejdsarket? Dette kan ikke fortrydes.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "GRATIS VERSION - LessonCraftStudio.com",
    "watermark.freeShort": "GRATIS VERSION"
  }
};

// Helper functions
function getTranslation(key, locale = 'da', params = {}) {
  const translation = WRITING_DANISH_TRANSLATIONS[locale]?.[key] || key;
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
    WRITING_DANISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}