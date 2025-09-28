/**
 * Missing Pieces Professional Italian Translation
 * Version: 1.0.0
 * Date: 2024-12-20
 *
 * Italian (it) - Complete Professional Translation
 * Total Keys: 176+
 *
 * Translation Philosophy:
 * - Natural Italian as if originally developed in Italy
 * - Uses informal "tu" form for modern educational software
 * - Educational terminology familiar to Italian teachers and parents
 * - Consistent shape and puzzle terminology throughout
 */

const MISSING_PIECES_ITALIAN_TRANSLATIONS = {
  it: {
    // ============= 1. Language Names (11 keys) =============
    "language.english": "Inglese",
    "language.german.full": "Tedesco (Deutsch)",
    "language.french.full": "Francese (Français)",
    "language.spanish.full": "Spagnolo (Español)",
    "language.portuguese.full": "Portoghese (Português)",
    "language.italian.full": "Italiano",
    "language.dutch.full": "Olandese (Nederlands)",
    "language.swedish.full": "Svedese (Svenska)",
    "language.danish.full": "Danese (Dansk)",
    "language.norwegian.full": "Norvegese (Norsk)",
    "language.finnish.full": "Finlandese (Suomi)",

    // ============= 2. Page Title & Headers (8 keys) =============
    "missingpieces.page.title": "Generatore di schede - Pezzi mancanti",
    "missingpieces.title": "Pezzi mancanti",
    "missingpieces.language.settings": "Impostazioni lingua",
    "missingpieces.page.setup": "Impostazione pagina",
    "missingpieces.text.tools": "Strumenti di testo",
    "missingpieces.puzzle.config": "Configurazione del puzzle",
    "missingpieces.image.library": "Libreria immagini",
    "missingpieces.upload.custom": "Carica le tue immagini",

    // ============= 3. Page Setup (19 keys) =============
    "missingpieces.select.language": "Seleziona lingua",
    "missingpieces.language.label": "Lingua:",
    "missingpieces.page.size": "Formato pagina:",
    "page.size.letter.portrait": "Letter Verticale (8,5×11\")",
    "page.size.default": "Scheda standard (800x1000)",
    "page.size.a4.portrait": "A4 Verticale (210×297mm)",
    "page.size.a4.landscape": "A4 Orizzontale (297×210mm)",
    "page.size.letter.landscape": "Letter Orizzontale (11×8,5\")",
    "page.size.square": "Quadrato (1200x1200)",
    "page.size.custom": "Personalizzato",
    "missingpieces.width.label": "Larghezza (px):",
    "missingpieces.height.label": "Altezza (px):",
    "missingpieces.page.color": "Colore pagina:",
    "missingpieces.apply.size": "Applica formato",
    "missingpieces.background.title": "Sfondo",
    "missingpieces.background.theme": "Tema sfondo:",
    "missingpieces.background.message": "Seleziona un tema per gli sfondi.",
    "missingpieces.background.opacity": "Opacità sfondo:",
    "missingpieces.border.title": "Cornice",
    "missingpieces.border.theme": "Tema cornice:",
    "missingpieces.border.message": "Seleziona un tema per le cornici.",
    "missingpieces.border.opacity": "Opacità cornice:",

    // ============= 4. Text Tools (15 keys) =============
    "missingpieces.text.add.new": "Aggiungi nuovo testo",
    "missingpieces.text.content": "Contenuto:",
    "missingpieces.text.placeholder": "Ciao!",
    "missingpieces.text.add.button": "Aggiungi testo",
    "missingpieces.text.properties": "Proprietà del testo selezionato",
    "missingpieces.text.color": "Colore:",
    "missingpieces.text.size": "Dimensione:",
    "missingpieces.text.font": "Carattere:",
    "missingpieces.text.outline.color": "Colore contorno:",
    "missingpieces.text.outline.width": "Spessore contorno (0-10):",
    "missingpieces.text.default": "Nuovo testo",
    "missingpieces.msg.text.added": "Testo aggiunto alla scheda.",
    "missingpieces.msg.text.updated": "Proprietà del testo aggiornate.",
    "missingpieces.msg.text.deleted": "Testo eliminato.",
    "missingpieces.msg.form.cleared": "Modulo cancellato.",

    // ============= 5. Puzzle Configuration (9 keys) =============
    "missingpieces.missing.count": "Pezzi mancanti (1–5):",
    "missingpieces.solution.options": "Opzioni di soluzione (2–6):",
    "missingpieces.piece.shape": "Forma dei pezzi:",
    "missingpieces.msg.select.image": "Seleziona prima un'immagine per il puzzle.",
    "missingpieces.msg.pieces.range": "I pezzi mancanti devono essere tra 1 e 5.",
    "missingpieces.msg.options.range": "Le opzioni di soluzione devono essere tra 2 e 6.",
    "missingpieces.msg.pieces.less": "Il numero di pezzi mancanti deve essere inferiore alle opzioni di soluzione.",
    "missingpieces.msg.distinct.pieces": "Impossibile trovare abbastanza pezzi distinti.",
    "missingpieces.msg.image.failed": "Impossibile caricare l'immagine selezionata.",

    // ============= 6. Shape Options (6 keys) =============
    "shape.square": "Quadrato",
    "shape.circle": "Cerchio",
    "shape.rect.portrait": "Rettangolo (Verticale)",
    "shape.rect.landscape": "Rettangolo (Orizzontale)",
    "shape.ellipse.portrait": "Ellisse (Verticale)",
    "shape.ellipse.landscape": "Ellisse (Orizzontale)",

    // ============= 7. Image Library (7 keys) =============
    "missingpieces.select.theme": "Seleziona tema:",
    "missingpieces.search.images": "Cerca immagini:",
    "missingpieces.search.placeholder": "es. mela, auto",
    "missingpieces.available.images": "Immagini disponibili:",
    "missingpieces.loading.images": "Caricamento immagini...",
    "missingpieces.selected.image": "Immagine selezionata per il puzzle:",
    "missingpieces.msg.none.selected": "Nessun elemento selezionato.",

    // ============= 8. Upload Section (4 keys) =============
    "missingpieces.upload.select": "Seleziona immagini da caricare:",
    "missingpieces.uploaded.images": "Le tue immagini caricate (questa sessione):",
    "missingpieces.uploaded.placeholder": "Le tue immagini caricate appariranno qui.",
    "missingpieces.msg.images.loaded": "{count} immagine/i caricata/e.",

    // ============= 9. Font Options (7 keys) =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= 10. Toolbar Actions (20 keys) =============
    "toolbar.layers": "Livelli",
    "toolbar.bring.forward": "Porta avanti",
    "toolbar.send.backward": "Porta indietro",
    "toolbar.align": "Allinea",
    "toolbar.align.selected": "Allinea selezione:",
    "toolbar.align.left": "Allinea a sinistra",
    "toolbar.center.h": "Centra orizzontalmente",
    "toolbar.align.right": "Allinea a destra",
    "toolbar.align.top": "Allinea in alto",
    "toolbar.center.v": "Centra verticalmente",
    "toolbar.align.bottom": "Allinea in basso",
    "toolbar.align.to.page": "Allinea alla pagina:",
    "toolbar.center.page.h": "Centra orizzontalmente sulla pagina",
    "toolbar.center.page.v": "Centra verticalmente sulla pagina",
    "toolbar.delete": "Elimina selezione",
    "toolbar.msg.aligned": "Oggetti allineati.",
    "toolbar.msg.layer.changed": "Ordine dei livelli modificato.",
    "toolbar.msg.deleted": "Oggetti selezionati eliminati.",
    "toolbar.msg.select.first": "Seleziona prima un oggetto.",
    "toolbar.msg.nothing.selected": "Nessun oggetto selezionato.",

    // ============= 11. Action Buttons (13 keys) =============
    "missingpieces.generate": "Genera",
    "missingpieces.generate.worksheet": "Genera scheda",
    "missingpieces.generate.answer": "Genera foglio soluzioni",
    "missingpieces.download": "Scarica",
    "missingpieces.download.worksheet.jpeg": "Scheda (JPEG)",
    "missingpieces.download.answer.jpeg": "Foglio soluzioni (JPEG)",
    "missingpieces.download.worksheet.pdf": "Scheda (PDF)",
    "missingpieces.download.answer.pdf": "Foglio soluzioni (PDF)",
    "common.grayscale": "Scala di grigi",
    "missingpieces.clear.all": "Cancella tutto",
    "missingpieces.msg.generate.complete": "Puzzle generato con successo!",
    "missingpieces.msg.cleared": "Tutto il contenuto è stato cancellato.",
    "missingpieces.msg.download.ready": "Download pronto.",

    // ============= 12. Tab Labels (2 keys) =============
    "missingpieces.tab.worksheet": "Scheda esercizi",
    "missingpieces.tab.answer": "Foglio soluzioni",

    // ============= 13. Theme Messages (9 keys) =============
    "missingpieces.themes.all": "Tutti i temi",
    "missingpieces.msg.themes.error": "Impossibile caricare i temi.",
    "missingpieces.msg.loading.default": "Caricamento tema predefinito...",
    "missingpieces.msg.type.search": "Digita per cercare in tutte le immagini.",
    "missingpieces.msg.searching": "Ricerca in corso...",
    "missingpieces.msg.no.images": "Nessuna immagine trovata{query}",
    "missingpieces.msg.theme.loaded": "Tema caricato con successo.",
    "missingpieces.msg.search.error": "Errore durante la ricerca.",
    "missingpieces.msg.loading.theme": "Caricamento immagini del tema...",

    // ============= 14. Puzzle Generation Messages (10 keys) =============
    "missingpieces.msg.generating": "Generazione dati del puzzle...",
    "missingpieces.msg.generation.failed": "Generazione del puzzle fallita. Controlla le tue selezioni.",
    "missingpieces.msg.worksheet.success": "Scheda generata con successo!",
    "missingpieces.msg.unexpected.error": "Si è verificato un errore inatteso durante la generazione.",
    "missingpieces.msg.validation.error": "Controlla la configurazione del puzzle.",
    "missingpieces.msg.processing.image": "Elaborazione immagine per il puzzle...",
    "missingpieces.msg.creating.pieces": "Creazione dei pezzi del puzzle...",
    "missingpieces.msg.arranging.solution": "Organizzazione delle opzioni di soluzione...",
    "missingpieces.msg.finalizing": "Finalizzazione del layout del puzzle...",
    "missingpieces.msg.ready": "Puzzle pronto per la stampa.",

    // ============= 15. Answer Key Messages (4 keys) =============
    "missingpieces.msg.generate.first": "Genera prima una scheda.",
    "missingpieces.msg.generating.answer": "Generazione foglio soluzioni...",
    "missingpieces.msg.answer.generated": "Foglio soluzioni generato!",
    "missingpieces.msg.answer.error": "Si è verificato un errore durante la generazione del foglio soluzioni.",

    // ============= 16. Download & Export Messages (20 keys) =============
    "missingpieces.msg.canvas.empty": "L'area di lavoro è vuota. Genera prima del contenuto.",
    "missingpieces.msg.preparing.jpeg": "Preparazione JPEG alta qualità... Attendere.",
    "missingpieces.msg.jpeg.success": "JPEG alta qualità scaricato!",
    "missingpieces.msg.jpeg.error": "Errore nella preparazione del JPEG: {error}",
    "missingpieces.watermark.main": "VERSIONE GRATUITA - LessonCraftStudio.com",
    "missingpieces.watermark.text": "VERSIONE GRATUITA",
    "missingpieces.msg.generate.content": "Genera prima del contenuto.",
    "missingpieces.msg.preparing.pdf": "Preparazione PDF...",
    "missingpieces.msg.pdf.success": "PDF scaricato!",
    "missingpieces.msg.pdf.error": "Errore nella creazione del PDF.",
    "missingpieces.msg.generate.worksheet.first": "Genera prima una scheda.",
    "missingpieces.msg.preparing.jpeg.simple": "Preparazione JPEG...",
    "missingpieces.msg.jpeg.initiated": "Download JPEG avviato!",
    "missingpieces.msg.jpeg.error.simple": "Errore nella preparazione del JPEG.",
    "missingpieces.msg.preparing.pdf.quality": "Preparazione PDF alta qualità... Attendere.",
    "missingpieces.msg.pdf.quality.success": "PDF alta qualità scaricato!",
    "missingpieces.msg.pdf.error.detailed": "Errore nella creazione del PDF: {error}",
    "missingpieces.msg.export.progress": "Progresso esportazione: {percent}%",
    "missingpieces.msg.export.complete": "Esportazione completata.",
    "missingpieces.msg.export.cancelled": "Esportazione annullata.",

    // ============= 17. Common Terms (3 keys) =============
    "common.none": "Nessuno",
    "common.loading": "Caricamento...",
    "common.error": "Errore",

    // ============= 18. Placeholders (4 keys) =============
    "placeholder.search": "Cerca...",
    "placeholder.enter.text": "Inserisci il testo qui",
    "placeholder.custom.width": "Larghezza",
    "placeholder.custom.height": "Altezza",

    // ============= 19. Error Messages (30+ keys) =============
    "error.invalid.dimensions": "Dimensioni non valide. Controlla larghezza e altezza.",
    "error.no.image.selected": "Seleziona un'immagine per il puzzle.",
    "error.no.theme.selected": "Seleziona prima un tema.",
    "error.upload.failed": "Caricamento fallito. Riprova.",
    "error.file.too.large": "File troppo grande. La dimensione massima è 5MB.",
    "error.invalid.file.type": "Tipo di file non valido. Carica solo immagini.",
    "error.canvas.creation": "Errore nella creazione dell'area di lavoro.",
    "error.export.failed": "Esportazione fallita. Riprova.",
    "error.network": "Errore di rete. Controlla la tua connessione.",
    "error.puzzle.generation": "Impossibile generare il puzzle. Prova con impostazioni diverse.",
    "error.invalid.configuration": "Configurazione del puzzle non valida.",
    "error.shape.not.supported": "La forma selezionata non è supportata.",
    "error.pieces.overlap": "I pezzi si sovrappongono. Regola la configurazione.",
    "error.solution.conflict": "Le opzioni di soluzione sono in conflitto con il numero di pezzi mancanti.",
    "error.image.loading": "Errore nel caricamento dell'immagine.",
    "error.theme.loading": "Errore nel caricamento del tema.",
    "error.border.loading": "Errore nel caricamento della cornice.",
    "error.background.loading": "Errore nel caricamento dello sfondo.",
    "error.text.empty": "Inserisci il contenuto del testo.",
    "error.object.selection": "Seleziona un oggetto da modificare.",
    "error.alignment": "Errore nell'allineamento degli oggetti.",
    "error.layer.operation": "Errore nel cambio dell'ordine dei livelli.",
    "error.delete.operation": "Errore nell'eliminazione degli oggetti.",
    "error.color.invalid": "Valore colore non valido.",
    "error.size.invalid": "Valore dimensione non valido.",
    "error.outline.invalid": "Spessore contorno non valido.",
    "error.opacity.invalid": "Valore opacità non valido.",
    "error.theme.not.found": "Tema non trovato.",
    "error.api.connection": "Impossibile connettersi al server.",
    "error.session.expired": "Sessione scaduta. Ricarica la pagina.",
    "error.browser.unsupported": "Il tuo browser non è supportato. Usa un browser moderno.",
    "error.feature.unavailable": "Questa funzione non è disponibile nella versione gratuita."
  }
};

// Helper functions for translation management
function getTranslation(key, locale = 'it', params = {}) {
  const translation = MISSING_PIECES_ITALIAN_TRANSLATIONS[locale]?.[key] ||
                     key;

  // Handle parameter interpolation
  let formattedText = translation;
  for (const [param, value] of Object.entries(params)) {
    formattedText = formattedText.replace(new RegExp(`\\{${param}\\}`, 'g'), value);
  }
  return formattedText;
}

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MISSING_PIECES_ITALIAN_TRANSLATIONS;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.MISSING_PIECES_ITALIAN_TRANSLATIONS = MISSING_PIECES_ITALIAN_TRANSLATIONS;
}