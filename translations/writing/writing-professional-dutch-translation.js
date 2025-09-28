// Writing App - Professional Dutch Translation
// Total: 103 unique translation keys
// Approach: Natural, educational Dutch as if originally developed in the Netherlands
// App name: "Schrijfoefeningen Generator" (Writing Exercises Generator - standard educational term)

const WRITING_DUTCH_TRANSLATIONS = {
  nl: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Schrijfoefeningen Generator",
    "settings.title": "Schrijfwerkblad",

    // ===== 2. LANGUAGE SECTION (12 items) =====
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

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Pagina-instellingen",
    "library.title": "Afbeeldingen Bibliotheek",
    "library.uploadTitle": "Eigen Afbeeldingen Uploaden",
    "settings.textTools": "Tekstgereedschappen",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Paginaformaat:",
    "pageSize.letterPortrait": "Letter Staand (8,5×11\")",
    "pageSize.letterLandscape": "Letter Liggend (11×8,5\")",
    "pageSize.a4Portrait": "A4 Staand (210×297mm)",
    "pageSize.a4Landscape": "A4 Liggend (297×210mm)",
    "pageSize.custom": "Aangepast",
    "settings.width": "Breedte (px):",
    "settings.height": "Hoogte (px):",
    "decoration.backgroundTheme": "Achtergrondthema:",
    "decoration.none": "Geen",
    "decoration.backgroundOpacity": "Achtergrond Transparantie:",
    "decoration.borderTheme": "Randthema:",
    "decoration.borderOpacity": "Rand Transparantie:",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Regel {number}",
    "row.type": "Regeltype:",
    "rowType.trace": "Overtrekken",
    "rowType.fadingTrace": "Vervagende Overtrek",
    "rowType.guidedCopy": "Begeleid Overschrijven",
    "rowType.fill": "Invullen",
    "row.fontStyle": "Schrijfstijl:",
    "fontStyle.printRegular": "Blokletters",
    "fontStyle.printRegularArrow": "Blokletters met Pijlen",
    "fontStyle.printTracing": "Blokletters om Over te Trekken",
    "fontStyle.printTracingArrow": "Blokletters om Over te Trekken met Pijlen",
    "fontStyle.cursive": "Schoonschrift",
    "row.content": "Inhoud:",
    "content.empty": "Leeg",
    "content.beginningLetter": "Beginletter",
    "content.wholeFileName": "Volledige Bestandsnaam",
    "content.customText": "Eigen Tekst",
    "content.preWriting": "Voorbereidend Schrijven",
    "row.customTextPlaceholder": "Voer tekst in om over te trekken...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Lettertype:",
    "case.uppercase": "Hoofdletters",
    "case.lowercase": "Kleine Letters",
    "case.titleCase": "Beginhoofdletter",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Haaltype:",
    "stroke.vertical": "Verticale Lijn",
    "stroke.horizontal": "Horizontale Lijn",
    "stroke.circle": "Cirkel",
    "stroke.zigzag": "Zigzaglijn",

    // ===== 8. IMAGE LIBRARY (11 items) =====
    "library.imageMode": "Afbeeldingsmodus:",
    "imageMode.exercise": "Oefenafbeelding",
    "imageMode.custom": "Eigen Afbeeldingen",
    "library.pickExercise": "Kies een oefenafbeelding (optioneel):",
    "library.searchPlaceholder": "Zoek afbeeldingen...",
    "library.selectedStatus": "Geselecteerd: {word}",
    "library.selectUpload": "Selecteer afbeelding(en) om te uploaden:",
    "library.uploadedImages": "Uw Geüploade Afbeeldingen:",
    "button.unselectImage": "Deselecteer Afbeelding",
    "button.clearSelection": "Selectie Wissen",
    "button.addSelectedImage": "Geselecteerde Afbeelding Toevoegen",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Nieuwe Tekst Toevoegen",
    "text.content": "Inhoud:",
    "text.placeholder": "Nieuwe Tekst",
    "text.selectedProperties": "Eigenschappen Geselecteerde Tekst",
    "text.color": "Kleur:",
    "text.size": "Grootte:",
    "text.font": "Lettertype:",
    "text.outlineColor": "Omlijning Kleur:",
    "text.outlineWidth": "Omlijning (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Naar Voren",
    "toolbar.sendBackward": "Naar Achteren",
    "toolbar.align": "Uitlijnen",
    "toolbar.alignLeft": "Links Uitlijnen",
    "toolbar.centerH": "Horizontaal Centreren",
    "toolbar.alignRight": "Rechts Uitlijnen",
    "toolbar.alignTop": "Boven Uitlijnen",
    "toolbar.centerV": "Verticaal Centreren",
    "toolbar.alignBottom": "Onder Uitlijnen",
    "toolbar.centerPageH": "Horizontaal Centreren op Pagina",
    "toolbar.centerPageV": "Verticaal Centreren op Pagina",
    "toolbar.cropOverflow": "Overloop Bijsnijden",
    "toolbar.lock": "Vergrendelen",
    "toolbar.delete": "Verwijderen",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Regel Verwijderen",
    "button.addRow": "Regel Toevoegen",
    "button.addText": "Tekst aan Werkblad Toevoegen",
    "button.deleteSelectedText": "Geselecteerde Tekst Verwijderen",
    "button.download": "Downloaden",
    "button.downloadPdf": "Downloaden als PDF",
    "button.downloadJpeg": "Downloaden als JPEG",
    "settings.grayscale": "Grijswaarden",
    "button.clearAll": "Alles Wissen",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Regel succesvol bijgesneden.",
    "message.worksheetCleared": "Werkblad gewist.",
    "message.pdfDownloaded": "PDF gedownload!",
    "message.jpegDownloaded": "JPEG download gestart!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Bijsnijden wordt niet ondersteund voor dit regeltype.",
    "message.noContentToCrop": "Deze regel heeft geen inhoud om bij te snijden.",
    "message.noOverflow": "Geen overloop om bij te snijden.",
    "message.generateContent": "Genereer eerst de inhoud.",
    "message.pdfError": "Fout bij het maken van de PDF.",
    "message.generateWorksheet": "Genereer eerst een werkblad.",
    "message.jpegError": "Fout bij het voorbereiden van de JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (9 items) =====
    "message.selectBackgroundTheme": "Selecteer een thema voor achtergronden.",
    "message.selectBorderTheme": "Selecteer een thema voor randen.",
    "message.noImages": "Geen afbeeldingen gevonden. Selecteer een thema of probeer een andere zoekopdracht.",
    "message.themeLoadError": "Fout bij het laden van {type} thema's:",
    "message.selectTheme": "Selecteer een thema.",
    "message.loading": "Bezig met laden...",
    "message.loadError": "Fout bij het laden van {type}.",
    "message.preparingPdf": "PDF voorbereiden...",
    "message.preparingJpeg": "JPEG voorbereiden...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Weet u zeker dat u het werkblad wilt wissen? Dit kan niet ongedaan worden gemaakt.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "GRATIS VERSIE - LessonCraftStudio.com",
    "watermark.freeShort": "GRATIS VERSIE"
  }
};

// Helper functions
function getTranslation(key, locale = 'nl', params = {}) {
  const translation = WRITING_DUTCH_TRANSLATIONS[locale]?.[key] || key;
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
    WRITING_DUTCH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}