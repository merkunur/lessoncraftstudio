// Writing App - Professional Italian Translation
// Total: 103 unique translation keys
// Approach: Natural, educational Italian as if originally developed in Italy
// App name: "Generatore di Schede di Scrittura" (Writing Worksheets Generator - standard educational term)

const WRITING_ITALIAN_TRANSLATIONS = {
  it: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Generatore di Schede di Scrittura",
    "settings.title": "Scheda di Scrittura",

    // ===== 2. LANGUAGE SECTION (12 items) =====
    "settings.languageLabel": "Lingua:",
    "lang.en": "English (Inglese)",
    "lang.de": "Deutsch (Tedesco)",
    "lang.fr": "Français (Francese)",
    "lang.es": "Español (Spagnolo)",
    "lang.pt": "Português (Portoghese)",
    "lang.it": "Italiano",
    "lang.nl": "Nederlands (Olandese)",
    "lang.sv": "Svenska (Svedese)",
    "lang.da": "Dansk (Danese)",
    "lang.no": "Norsk (Norvegese)",
    "lang.fi": "Suomi (Finlandese)",

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Impostazione Pagina",
    "library.title": "Raccolta Immagini",
    "library.uploadTitle": "Carica le Tue Immagini",
    "settings.textTools": "Strumenti di Testo",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Formato Pagina:",
    "pageSize.letterPortrait": "Letter Verticale (8,5×11\")",
    "pageSize.letterLandscape": "Letter Orizzontale (11×8,5\")",
    "pageSize.a4Portrait": "A4 Verticale (210×297mm)",
    "pageSize.a4Landscape": "A4 Orizzontale (297×210mm)",
    "pageSize.custom": "Personalizzato",
    "settings.width": "Larghezza (px):",
    "settings.height": "Altezza (px):",
    "decoration.backgroundTheme": "Tema Sfondo:",
    "decoration.none": "Nessuno",
    "decoration.backgroundOpacity": "Opacità Sfondo:",
    "decoration.borderTheme": "Tema Cornice:",
    "decoration.borderOpacity": "Opacità Cornice:",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Riga {number}",
    "row.type": "Tipo di Riga:",
    "rowType.trace": "Ricalco",
    "rowType.fadingTrace": "Ricalco Sfumato",
    "rowType.guidedCopy": "Copia Guidata",
    "rowType.fill": "Completamento",
    "row.fontStyle": "Stile di Scrittura:",
    "fontStyle.printRegular": "Stampatello",
    "fontStyle.printRegularArrow": "Stampatello con Frecce",
    "fontStyle.printTracing": "Stampatello da Ricalcare",
    "fontStyle.printTracingArrow": "Stampatello da Ricalcare con Frecce",
    "fontStyle.cursive": "Corsivo",
    "row.content": "Contenuto:",
    "content.empty": "Vuoto",
    "content.beginningLetter": "Lettera Iniziale",
    "content.wholeFileName": "Nome Completo del File",
    "content.customText": "Testo Personalizzato",
    "content.preWriting": "Pregrafismo",
    "row.customTextPlaceholder": "Inserisci il testo da ricalcare...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Tipo di Carattere:",
    "case.uppercase": "Maiuscolo",
    "case.lowercase": "Minuscolo",
    "case.titleCase": "Iniziale Maiuscola",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Tipo di Tracciato:",
    "stroke.vertical": "Linea Verticale",
    "stroke.horizontal": "Linea Orizzontale",
    "stroke.circle": "Cerchio",
    "stroke.zigzag": "Linea a Zigzag",

    // ===== 8. IMAGE LIBRARY (11 items) =====
    "library.imageMode": "Modalità Immagine:",
    "imageMode.exercise": "Immagine di Esercizio",
    "imageMode.custom": "Immagini Personalizzate",
    "library.pickExercise": "Scegli un'immagine di esercizio (opzionale):",
    "library.searchPlaceholder": "Cerca immagini...",
    "library.selectedStatus": "Selezionato: {word}",
    "library.selectUpload": "Seleziona immagine/i da caricare:",
    "library.uploadedImages": "Le Tue Immagini Caricate:",
    "button.unselectImage": "Deseleziona Immagine",
    "button.clearSelection": "Cancella Selezione",
    "button.addSelectedImage": "Aggiungi Immagine Selezionata",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Aggiungi Nuovo Testo",
    "text.content": "Contenuto:",
    "text.placeholder": "Nuovo Testo",
    "text.selectedProperties": "Proprietà del Testo Selezionato",
    "text.color": "Colore:",
    "text.size": "Dimensione:",
    "text.font": "Carattere:",
    "text.outlineColor": "Colore Contorno:",
    "text.outlineWidth": "Contorno (0-10):",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Porta Avanti",
    "toolbar.sendBackward": "Porta Indietro",
    "toolbar.align": "Allinea",
    "toolbar.alignLeft": "Allinea a Sinistra",
    "toolbar.centerH": "Centra Orizzontalmente",
    "toolbar.alignRight": "Allinea a Destra",
    "toolbar.alignTop": "Allinea in Alto",
    "toolbar.centerV": "Centra Verticalmente",
    "toolbar.alignBottom": "Allinea in Basso",
    "toolbar.centerPageH": "Centra sulla Pagina Orizzontalmente",
    "toolbar.centerPageV": "Centra sulla Pagina Verticalmente",
    "toolbar.cropOverflow": "Ritaglia Eccedenza",
    "toolbar.lock": "Blocca",
    "toolbar.delete": "Elimina",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Elimina Riga",
    "button.addRow": "Aggiungi Riga",
    "button.addText": "Aggiungi Testo alla Scheda",
    "button.deleteSelectedText": "Elimina Testo Selezionato",
    "button.download": "Scarica",
    "button.downloadPdf": "Scarica come PDF",
    "button.downloadJpeg": "Scarica come JPEG",
    "settings.grayscale": "Scala di Grigi",
    "button.clearAll": "Cancella Tutto",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Riga ritagliata con successo.",
    "message.worksheetCleared": "Scheda cancellata.",
    "message.pdfDownloaded": "PDF scaricato!",
    "message.jpegDownloaded": "Download JPEG avviato!",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Il ritaglio non è supportato per questo tipo di riga.",
    "message.noContentToCrop": "Questa riga non ha contenuto da ritagliare.",
    "message.noOverflow": "Nessuna eccedenza da ritagliare.",
    "message.generateContent": "Per favore, genera prima il contenuto.",
    "message.pdfError": "Errore nella creazione del PDF.",
    "message.generateWorksheet": "Per favore, genera prima una scheda.",
    "message.jpegError": "Errore nella preparazione del JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (9 items) =====
    "message.selectBackgroundTheme": "Seleziona un tema per gli sfondi.",
    "message.selectBorderTheme": "Seleziona un tema per le cornici.",
    "message.noImages": "Nessuna immagine trovata. Seleziona un tema o prova un'altra ricerca.",
    "message.themeLoadError": "Errore nel caricamento dei temi {type}:",
    "message.selectTheme": "Seleziona un tema.",
    "message.loading": "Caricamento...",
    "message.loadError": "Errore nel caricamento di {type}.",
    "message.preparingPdf": "Preparazione PDF...",
    "message.preparingJpeg": "Preparazione JPEG...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Sei sicuro di voler cancellare la scheda? Questa azione non può essere annullata.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "VERSIONE GRATUITA - LessonCraftStudio.com",
    "watermark.freeShort": "VERSIONE GRATUITA"
  }
};

// Helper functions
function getTranslation(key, locale = 'it', params = {}) {
  const translation = WRITING_ITALIAN_TRANSLATIONS[locale]?.[key] || key;
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
    WRITING_ITALIAN_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}