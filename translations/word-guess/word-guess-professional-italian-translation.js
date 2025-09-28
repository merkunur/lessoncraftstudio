// Word Guess App - Professional Italian Translation
// Total: 93 unique translation keys
// Approach: Natural, educational Italian as if originally developed in Italy
// App name: "Generatore di Indovinelli" (Riddle Generator - engaging educational term)

const WORD_GUESS_ITALIAN_TRANSLATIONS = {
  it: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Generatore di Indovinelli",
    "settings.title": "Impostazioni Indovinelli",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Impostazioni Lingua",
    "settings.pageSetup": "Impostazione Pagina",
    "settings.textTools": "Strumenti di Testo",
    "settings.exerciseConfig": "Configurazione Esercizio",
    "library.title": "Raccolta Immagini",
    "library.uploadTitle": "Carica le Tue Immagini",

    // ===== 3. LANGUAGE SECTION (12 items) =====
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

    // ===== 4. PAGE SETUP (16 items) =====
    "settings.pageSize": "Formato Pagina:",
    "pageSize.letterPortrait": "Letter Verticale (612×792)",
    "pageSize.letterLandscape": "Letter Orizzontale (792×612)",
    "pageSize.a4Portrait": "A4 Verticale (595×842)",
    "pageSize.a4Landscape": "A4 Orizzontale (842×595)",
    "pageSize.square": "Quadrato (1200×1200)",
    "pageSize.custom": "Personalizzato",
    "settings.width": "Larghezza (px):",
    "settings.height": "Altezza (px):",
    "settings.pageColor": "Colore Pagina:",
    "button.applySize": "Applica Dimensioni",
    "decoration.backgroundTheme": "Tema Sfondo:",
    "decoration.none": "Nessuno",
    "decoration.backgroundOpacity": "Opacità Sfondo:",
    "decoration.borderTheme": "Tema Cornice:",
    "decoration.borderOpacity": "Opacità Cornice:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Contenuto:",
    "text.placeholder": "Ciao!",
    "button.addText": "Aggiungi Testo",
    "text.color": "Colore:",
    "text.size": "Dimensione:",
    "text.font": "Carattere:",
    "text.outlineColor": "Colore Contorno:",
    "text.outlineWidth": "Spessore Contorno (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Numero di Indovinelli (1–10):",
    "config.difficulty": "Difficoltà (Quantità di Indizi)",
    "difficulty.noClues": "Senza indizi",
    "difficulty.easy": "Facile (1/2)",
    "difficulty.normal": "Normale (1/4)",
    "difficulty.tough": "Difficile (1/6)",
    "config.excludeLetters": "Escludi Lettere dagli Indizi:",
    "config.excludePlaceholder": "es: AEIOU",
    "config.letterCase": "Tipo di Carattere",
    "case.uppercase": "Maiuscolo",
    "case.lowercase": "Minuscolo",
    "config.includeNameDate": "Includi Nome e Data",
    "config.includeExerciseNumbers": "Numera gli Esercizi",

    // ===== 7. IMAGE LIBRARY (8 items) =====
    "library.selectTheme": "Seleziona Tema:",
    "library.search": "Cerca Immagini:",
    "library.searchPlaceholder": "es: mela, auto",
    "library.availableImages": "Immagini Disponibili:",
    "library.selectedImages": "Immagini Selezionate per gli Indovinelli:",
    "library.selectUpload": "Seleziona immagini da caricare:",
    "library.uploadedImages": "Le Tue Immagini Caricate (Questa Sessione):",
    "library.selectedCount": "Selezionate: {x} / {y}",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Livelli",
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
    "toolbar.delete": "Elimina Selezione",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Genera",
    "button.generateWorksheet": "Crea Scheda di Lavoro",
    "button.generateAnswer": "Crea Soluzioni",
    "button.download": "Scarica",
    "button.worksheetJpeg": "Scheda di Lavoro (JPEG)",
    "button.answerJpeg": "Soluzioni (JPEG)",
    "button.worksheetPdf": "Scheda di Lavoro (PDF)",
    "button.answerPdf": "Soluzioni (PDF)",
    "settings.grayscale": "Scala di Grigi",
    "button.clearAll": "Cancella Tutto",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Scheda di Lavoro",
    "tab.answerKey": "Soluzioni",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} immagine/i personalizzata/e disponibile/i.",
    "message.generatingWorksheet": "Creazione scheda di lavoro...",
    "message.worksheetGenerated": "Scheda di lavoro creata con successo!",
    "message.generatingAnswer": "Creazione soluzioni...",
    "message.answerGenerated": "Soluzioni create!",
    "message.assetAdded": "{type} aggiunto.",
    "message.formCleared": "Modulo cancellato.",
    "message.downloadStarted": "Download avviato!",
    "message.pdfDownloaded": "PDF scaricato!",
    "message.pdfSuccess": "PDF scaricato!",
    "message.jpegDownloaded": "Download JPEG avviato!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Impossibile caricare i temi.",
    "message.maxImages": "Puoi selezionare un massimo di {count} immagini.",
    "message.selectImages": "Per favore, seleziona alcune immagini o scegli un tema con immagini.",
    "message.generateFirst": "Per favore, crea prima una scheda di lavoro.",
    "message.cannotDownloadEmpty": "Impossibile scaricare il file vuoto: {fileName}.",
    "message.imageError": "Errore nella preparazione dell'immagine: {error}",
    "message.generateContent": "Per favore, genera prima il contenuto.",
    "message.pdfError": "Errore nella creazione del PDF.",
    "message.generateWorksheet": "Per favore, crea prima una scheda di lavoro.",
    "message.jpegError": "Errore nella preparazione del JPEG.",
    "message.pdfCreateError": "Errore nella creazione del PDF: {error}",
    "message.imagesError": "Errore nel caricamento delle immagini.",
    "message.borderError": "Errore nel caricamento delle cornici.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Tutti i Temi (usa traduzioni)",
    "message.loading": "Caricamento...",
    "message.typeToSearch": "Digita per cercare tra tutte le immagini.",
    "message.noImages": "Nessuna immagine trovata {query}.",
    "message.uploadedHere": "Le tue immagini caricate appaiono qui.",
    "message.preparing": "Preparazione {format}...",
    "message.preparingPdf": "Preparazione PDF...",
    "message.preparingJpeg": "Preparazione JPEG...",
    "decoration.allBorders": "Tutte le Cornici",
    "message.selectBorderTheme": "Seleziona un tema per vedere le cornici.",
    "message.loadingBorders": "Caricamento cornici {theme}...",
    "message.noBorders": "Nessuna cornice trovata.",
    "decoration.allBackgrounds": "Tutti gli Sfondi",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Nome: ________________",
    "form.dateField": "Data: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "VERSIONE GRATUITA - LessonCraftStudio.com",
    "watermark.freeShort": "VERSIONE GRATUITA"
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'it', params = {}) {
  const translation = WORD_GUESS_ITALIAN_TRANSLATIONS[locale]?.[key] || key;
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
    WORD_GUESS_ITALIAN_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}