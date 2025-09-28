// Treasure Hunt App - Professional Italian Translation
// Total: 80+ translation keys (75 unique)
// Approach: Natural, educational Italian as if originally developed in Italy
// App name: "Generatore di Caccia al Tesoro" (Treasure Hunt Generator - engaging educational term)

const TREASURE_HUNT_ITALIAN_TRANSLATIONS = {
  it: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Generatore di Caccia al Tesoro",
    "settings.title": "Impostazioni della Scheda",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Impostazioni Lingua",
    "settings.pageSetup": "Impostazioni Pagina",
    "settings.textTools": "Strumenti di Testo",
    "settings.puzzleSetup": "Configurazione del Gioco",
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

    // ===== 4. PAGE SETUP (17 items) =====
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
    "decoration.backgroundTheme": "Tema Sfondo:",
    "decoration.none": "Nessuno",
    "decoration.backgroundOpacity": "Opacità Sfondo:",
    "decoration.borderTheme": "Tema Cornice:",
    "decoration.borderOpacity": "Opacità Cornice:",
    "button.applySize": "Applica Dimensioni",
    "settings.grayscale": "Scala di grigi",

    // ===== 5. TEXT TOOLS (7 items) =====
    "text.content": "Contenuto:",
    "text.placeholder": "Ciao!",
    "button.addText": "Aggiungi Testo",
    "text.color": "Colore:",
    "text.size": "Dimensione:",
    "text.font": "Carattere:",
    "text.default": "Nuovo Testo",

    // ===== 6. PUZZLE SETUP (2 items) =====
    "puzzle.generateFromTheme": "Genera da un Tema (Sostituisce la Selezione Manuale):",
    "puzzle.selectTheme": "-- Seleziona un Tema per la Scheda --",

    // ===== 7. IMAGE LIBRARY (7 items) =====
    "library.selectTheme": "Seleziona Tema del Dizionario:",
    "library.search": "Cerca Immagini:",
    "library.searchPlaceholder": "es: mela, auto",
    "library.availableImages": "Immagini Disponibili (Clicca per aggiungere alla selezione manuale):",
    "library.selectUpload": "Seleziona immagini da caricare:",
    "library.uploadedImages": "Le Tue Immagini Caricate (Clicca per Selezionare):",
    "library.selectedCount": "Selezionate: {x} / 6",

    // ===== 8. TOOLBAR (6 items) =====
    "toolbar.layers": "Livelli",
    "toolbar.bringForward": "Porta Avanti",
    "toolbar.sendBackward": "Porta Indietro",
    "toolbar.delete": "Elimina Selezione",
    "toolbar.align": "Allinea",
    "toolbar.center": "Centra",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Genera",
    "button.generateWorksheet": "Genera Scheda",
    "button.generateAnswer": "Genera Soluzione",
    "button.download": "Scarica",
    "button.worksheetJpeg": "Scheda (JPEG)",
    "button.answerJpeg": "Soluzione (JPEG)",
    "button.worksheetPdf": "Scheda (PDF)",
    "button.answerPdf": "Soluzione (PDF)",
    "button.clearAll": "Cancella Tutto",
    "button.downloadJpeg": "Scarica JPEG",
    "button.downloadPdf": "Scarica PDF",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Scheda Attività",
    "tab.answerKey": "Soluzione",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.textAdded": "Testo aggiunto.",
    "message.formCleared": "Modulo cancellato.",
    "message.worksheetGenerated": "Scheda generata!",
    "message.answerGenerated": "Soluzione generata!",
    "message.downloadStarted": "Download avviato!",
    "message.pdfDownloaded": "PDF scaricato!",
    "message.pdfSuccess": "PDF scaricato!",
    "message.jpegDownloaded": "Download JPEG avviato!",
    "message.assetAdded": "{type} aggiunto.",
    "message.downloadInitiated": "Download avviato!",

    // ===== 12. ERROR MESSAGES (14 items) =====
    "message.themesLoadError": "Impossibile caricare i temi.",
    "message.maxImages": "Massimo 6 immagini selezionate.",
    "message.themeNoImages": 'Il tema "{theme}" non ha immagini.',
    "message.themeLoadError": "Errore nel caricamento delle immagini del tema.",
    "message.selectSixImages": "Seleziona esattamente 6 immagini manualmente, o scegli un tema per generare automaticamente.",
    "message.noPuzzleData": "Nessun dato del gioco generato.",
    "message.generateFirst": "Prima genera una scheda.",
    "message.canvasEmpty": "L'area di lavoro è vuota.",
    "message.jpegError": "Errore nella preparazione del JPEG.",
    "message.pdfError": "Errore nella creazione del PDF.",
    "message.pdfCreateError": "Errore nella creazione del PDF.",
    "message.generateContent": "Prima genera del contenuto.",
    "message.generateWorksheet": "Prima genera una scheda.",
    "message.jpegPrepError": "Errore nella preparazione del JPEG.",

    // ===== 13. INFO MESSAGES (11 items) =====
    "message.selectBorderTheme": "Seleziona un tema per vedere le cornici.",
    "message.selectBackgroundTheme": "Seleziona un tema per gli sfondi.",
    "message.loading": "Caricamento...",
    "message.typeToSearch": "Digita per cercare tra tutte le immagini.",
    "message.searchError": "Errore durante la ricerca.",
    "message.imagesError": "Errore nel caricamento delle immagini.",
    "message.noImages": "Nessuna immagine trovata.",
    "message.uploadedHere": "Le tue immagini caricate appariranno qui.",
    "message.preparingJpeg": "Preparazione JPEG...",
    "message.preparingPdf": "Preparazione PDF...",
    "themes.all": "Tutti i Temi (usa le traduzioni)",

    // ===== 14. WATERMARKS (2 items) =====
    "watermark.free": "VERSIONE GRATUITA - LessonCraftStudio.com",
    "watermark.freeShort": "VERSIONE GRATUITA"

    // ===== 15. TREASURE HUNT GAME TEXT (Already in treasureHuntTranslations) =====
    // NOTE: These are already implemented in the app's treasureHuntTranslations object:
    // - startAt: "Inizia da"
    // - move: "Muovi"
    // - north: "nord"
    // - south: "sud"
    // - east: "est"
    // - west: "ovest"
    // - square: "casella"
    // - squares: "caselle"
    // - whereIsTreasure: "Dov'è il tesoro?"
    // These remain in treasureHuntTranslations for backward compatibility
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'it', params = {}) {
  const translation = TREASURE_HUNT_ITALIAN_TRANSLATIONS[locale]?.[key] || key;
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
    TREASURE_HUNT_ITALIAN_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}