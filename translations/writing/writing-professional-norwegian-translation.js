// Writing App - Professional Norwegian Translation (Bokmål)
// Total: 103 unique translation keys
// Approach: Natural, educational Norwegian as if originally developed in Norway
// App name: "Skrivetrening Generator" (Writing Training Generator - standard educational term)

const WRITING_NORWEGIAN_TRANSLATIONS = {
  no: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Skrivetrening Generator",
    "settings.title": "Skriveoppgaver",

    // ===== 2. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Språk:",
    "lang.en": "English (Engelsk)",
    "lang.de": "Deutsch (Tysk)",
    "lang.fr": "Français (Fransk)",
    "lang.es": "Español (Spansk)",
    "lang.pt": "Português (Portugisisk)",
    "lang.it": "Italiano (Italiensk)",
    "lang.nl": "Nederlands (Nederlandsk)",
    "lang.sv": "Svenska (Svensk)",
    "lang.da": "Dansk",
    "lang.no": "Norsk",
    "lang.fi": "Suomi (Finsk)",

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Sideoppsett",
    "library.title": "Bildebibliotek",
    "library.uploadTitle": "Last Opp Egne Bilder",
    "settings.textTools": "Tekstverktøy",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Sidestørrelse:",
    "pageSize.letterPortrait": "Letter Stående (8,5×11\")",
    "pageSize.letterLandscape": "Letter Liggende (11×8,5\")",
    "pageSize.a4Portrait": "A4 Stående (210×297mm)",
    "pageSize.a4Landscape": "A4 Liggende (297×210mm)",
    "pageSize.custom": "Tilpasset",
    "settings.width": "Bredde (px):",
    "settings.height": "Høyde (px):",
    "decoration.backgroundTheme": "Bakgrunnstema:",
    "decoration.none": "Ingen",
    "decoration.backgroundOpacity": "Bakgrunnens Gjennomsiktighet:",
    "decoration.borderTheme": "Rammetema:",
    "decoration.borderOpacity": "Rammens Gjennomsiktighet:",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Linje {number}",
    "row.type": "Linjetype:",
    "rowType.trace": "Følge Etter",
    "rowType.fadingTrace": "Gradvis Etterfølging",
    "rowType.guidedCopy": "Veiledet Avskrift",
    "rowType.fill": "Fylle Inn",
    "row.fontStyle": "Skriftstil:",
    "fontStyle.printRegular": "Blokkbokstaver",
    "fontStyle.printRegularArrow": "Blokkbokstaver med Piler",
    "fontStyle.printTracing": "Blokkbokstaver for Etterfølging",
    "fontStyle.printTracingArrow": "Blokkbokstaver for Etterfølging med Piler",
    "fontStyle.cursive": "Løkkeskrift",
    "row.content": "Innhold:",
    "content.empty": "Tom",
    "content.beginningLetter": "Begynnelsesbokstav",
    "content.wholeFileName": "Hele Filnavnet",
    "content.customText": "Egen Tekst",
    "content.preWriting": "Førskriving",
    "row.customTextPlaceholder": "Skriv inn tekst for etterfølging...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Bokstavtype:",
    "case.uppercase": "Store Bokstaver",
    "case.lowercase": "Små Bokstaver",
    "case.titleCase": "Stor Forbokstav",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Strektype:",
    "stroke.vertical": "Loddrett Linje",
    "stroke.horizontal": "Vannrett Linje",
    "stroke.circle": "Sirkel",
    "stroke.zigzag": "Sikksakklinje",

    // ===== 8. IMAGE LIBRARY (11 items) =====
    "library.imageMode": "Bildemodus:",
    "imageMode.exercise": "Øvingsbilde",
    "imageMode.custom": "Egne Bilder",
    "library.pickExercise": "Velg et øvingsbilde (valgfritt):",
    "library.searchPlaceholder": "Søk bilder...",
    "library.selectedStatus": "Valgt: {word}",
    "library.selectUpload": "Velg bilde(r) for opplasting:",
    "library.uploadedImages": "Dine Opplastede Bilder:",
    "button.unselectImage": "Fjern Valg av Bilde",
    "button.clearSelection": "Tøm Valg",
    "button.addSelectedImage": "Legg Til Valgt Bilde",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Legg Til Ny Tekst",
    "text.content": "Innhold:",
    "text.placeholder": "Ny Tekst",
    "text.selectedProperties": "Egenskaper for Valgt Tekst",
    "text.color": "Farge:",
    "text.size": "Størrelse:",
    "text.font": "Skrifttype:",
    "text.outlineColor": "Omrissfarge:",
    "text.outlineWidth": "Omriss (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Flytt Fremover",
    "toolbar.sendBackward": "Flytt Bakover",
    "toolbar.align": "Juster",
    "toolbar.alignLeft": "Venstrejuster",
    "toolbar.centerH": "Sentrer Horisontalt",
    "toolbar.alignRight": "Høyrejuster",
    "toolbar.alignTop": "Juster Øverst",
    "toolbar.centerV": "Sentrer Vertikalt",
    "toolbar.alignBottom": "Juster Nederst",
    "toolbar.centerPageH": "Sentrer på Siden Horisontalt",
    "toolbar.centerPageV": "Sentrer på Siden Vertikalt",
    "toolbar.cropOverflow": "Beskjær Overflødig",
    "toolbar.lock": "Lås",
    "toolbar.delete": "Slett",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Slett Linje",
    "button.addRow": "Legg Til Linje",
    "button.addText": "Legg Til Tekst på Arbeidsarket",
    "button.deleteSelectedText": "Slett Valgt Tekst",
    "button.download": "Last Ned",
    "button.downloadPdf": "Last Ned som PDF",
    "button.downloadJpeg": "Last Ned som JPEG",
    "settings.grayscale": "Gråtoner",
    "button.clearAll": "Tøm Alt",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Linjen er beskåret.",
    "message.worksheetCleared": "Arbeidsarket er tømt.",
    "message.pdfDownloaded": "PDF lastet ned!",
    "message.jpegDownloaded": "JPEG-nedlasting startet!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Beskjæring støttes ikke for denne linjetypen.",
    "message.noContentToCrop": "Denne linjen har ikke innhold å beskjære.",
    "message.noOverflow": "Ingenting overflødig å beskjære.",
    "message.generateContent": "Vennligst generer innhold først.",
    "message.pdfError": "Feil ved opprettelse av PDF.",
    "message.generateWorksheet": "Vennligst generer et arbeidsark først.",
    "message.jpegError": "Feil ved klargjøring av JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (9 items) =====
    "message.selectBackgroundTheme": "Velg et tema for bakgrunner.",
    "message.selectBorderTheme": "Velg et tema for rammer.",
    "message.noImages": "Ingen bilder funnet. Velg et tema eller prøv et annet søk.",
    "message.themeLoadError": "Feil ved lasting av {type}-temaer:",
    "message.selectTheme": "Velg et tema.",
    "message.loading": "Laster...",
    "message.loadError": "Feil ved lasting av {type}.",
    "message.preparingPdf": "Klargjør PDF...",
    "message.preparingJpeg": "Klargjør JPEG...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Er du sikker på at du vil tømme arbeidsarket? Dette kan ikke angres.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "GRATIS VERSJON - LessonCraftStudio.com",
    "watermark.freeShort": "GRATIS VERSJON"
  }
};

// Helper functions
function getTranslation(key, locale = 'no', params = {}) {
  const translation = WRITING_NORWEGIAN_TRANSLATIONS[locale]?.[key] || key;
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
    WRITING_NORWEGIAN_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}