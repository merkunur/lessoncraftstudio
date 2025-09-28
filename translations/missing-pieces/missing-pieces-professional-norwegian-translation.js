/**
 * Missing Pieces Norwegian Translation (Bokmål)
 * Professional UI Translation with Natural Language
 * Covers: Norway (primary), Norwegian speakers worldwide
 * Total Keys: 176+ (100% coverage)
 *
 * Translation Philosophy:
 * - Natural Norwegian that sounds native, not translated
 * - Using "du" form (informal, standard in Norwegian software)
 * - Clear educational terminology familiar to Norwegian teachers
 * - Consistent terminology throughout
 * - Clean and modern Norwegian style
 */

const MISSING_PIECES_NORWEGIAN = {
  no: {
    // ============= 1. Language Names (11 keys) =============
    "language.english": "Engelsk",
    "language.german.full": "Tysk",
    "language.french.full": "Fransk",
    "language.spanish.full": "Spansk",
    "language.portuguese.full": "Portugisisk",
    "language.italian.full": "Italiensk",
    "language.dutch.full": "Nederlandsk",
    "language.swedish.full": "Svensk",
    "language.danish.full": "Dansk",
    "language.norwegian.full": "Norsk",
    "language.finnish.full": "Finsk",

    // ============= 2. Page Title & Headers (8 keys) =============
    "missingpieces.page.title": "Manglende Brikker Arbeidsark Generator",
    "missingpieces.title": "Manglende Brikker",
    "missingpieces.language.settings": "Språkinnstillinger",
    "missingpieces.page.setup": "Sideoppsett",
    "missingpieces.text.tools": "Tekstverktøy",
    "missingpieces.puzzle.config": "Puslespillkonfigurasjon",
    "missingpieces.image.library": "Bildebibliotek",
    "missingpieces.upload.custom": "Last Opp Egne Bilder",

    // ============= 3. Page Setup (19 keys) =============
    "missingpieces.select.language": "Velg Språk",
    "missingpieces.language.label": "Språk:",
    "missingpieces.page.size": "Sidestørrelse:",
    "page.size.letter.portrait": "Letter Stående (8,5×11\")",
    "page.size.default": "Standard Arbeidsark (800x1000)",
    "page.size.a4.portrait": "A4 Stående (210×297mm)",
    "page.size.a4.landscape": "A4 Liggende (297×210mm)",
    "page.size.letter.landscape": "Letter Liggende (11×8,5\")",
    "page.size.square": "Kvadrat (1200x1200)",
    "page.size.custom": "Tilpasset",
    "missingpieces.width.label": "Bredde (px):",
    "missingpieces.height.label": "Høyde (px):",
    "missingpieces.page.color": "Sidefarge:",
    "missingpieces.apply.size": "Bruk Størrelse",
    "missingpieces.background.title": "Bakgrunn",
    "missingpieces.background.theme": "Bakgrunnstema:",
    "missingpieces.background.message": "Velg et tema for bakgrunner.",
    "missingpieces.background.opacity": "Bakgrunnssynlighet:",
    "missingpieces.border.title": "Ramme",
    "missingpieces.border.theme": "Rammetema:",
    "missingpieces.border.message": "Velg et tema for å se rammer.",
    "missingpieces.border.opacity": "Rammesynlighet:",

    // ============= 4. Text Tools (15 keys) =============
    "missingpieces.text.add.new": "Legg til Ny Tekst",
    "missingpieces.text.content": "Innhold:",
    "missingpieces.text.placeholder": "Hei!",
    "missingpieces.text.add.button": "Legg til Tekst",
    "missingpieces.text.properties": "Egenskaper for Valgt Tekst",
    "missingpieces.text.color": "Farge:",
    "missingpieces.text.size": "Størrelse:",
    "missingpieces.text.font": "Skrifttype:",
    "missingpieces.text.outline.color": "Konturfarge:",
    "missingpieces.text.outline.width": "Kontur (0-10):",
    "missingpieces.text.default": "Ny Tekst",
    "missingpieces.msg.text.added": "Tekst lagt til arbeidsarket.",
    "missingpieces.msg.text.updated": "Tekstegenskaper oppdatert.",
    "missingpieces.msg.text.deleted": "Tekst slettet.",
    "missingpieces.msg.form.cleared": "Skjema tømt.",

    // ============= 5. Puzzle Configuration (9 keys) =============
    "missingpieces.missing.count": "Manglende Brikker (1-5):",
    "missingpieces.solution.options": "Løsningsalternativer (2-6):",
    "missingpieces.piece.shape": "Brikkenes Form:",
    "missingpieces.msg.select.image": "Velg først et bilde for puslespillet.",
    "missingpieces.msg.pieces.range": "Manglende brikker må være mellom 1 og 5.",
    "missingpieces.msg.options.range": "Løsningsalternativer må være mellom 2 og 6.",
    "missingpieces.msg.pieces.less": "Antall manglende brikker må være mindre enn løsningsalternativer.",
    "missingpieces.msg.distinct.pieces": "Kunne ikke finne nok forskjellige brikker.",
    "missingpieces.msg.image.failed": "Kunne ikke laste det valgte bildet.",

    // ============= 6. Shape Options (6 keys) =============
    "shape.square": "Kvadrat",
    "shape.circle": "Sirkel",
    "shape.rect.portrait": "Rektangel (Stående)",
    "shape.rect.landscape": "Rektangel (Liggende)",
    "shape.ellipse.portrait": "Ellipse (Stående)",
    "shape.ellipse.landscape": "Ellipse (Liggende)",

    // ============= 7. Image Library (7 keys) =============
    "missingpieces.select.theme": "Velg Tema:",
    "missingpieces.search.images": "Søk Bilder:",
    "missingpieces.search.placeholder": "f.eks. eple, bil",
    "missingpieces.available.images": "Tilgjengelige Bilder:",
    "missingpieces.loading.images": "Laster bilder...",
    "missingpieces.selected.image": "Valgt Bilde for Puslespill:",
    "missingpieces.msg.none.selected": "Ingen elementer valgt.",

    // ============= 8. Upload Section (4 keys) =============
    "missingpieces.upload.select": "Velg bilde(r) for opplasting:",
    "missingpieces.uploaded.images": "Dine Opplastede Bilder (Denne Økten):",
    "missingpieces.uploaded.placeholder": "Dine opplastede bilder vises her.",
    "missingpieces.msg.images.loaded": "{count} bilde(r) lastet.",

    // ============= 9. Font Options (7 keys) =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= 10. Toolbar Actions (20 keys) =============
    "toolbar.layers": "Lag",
    "toolbar.bring.forward": "Flytt Frem",
    "toolbar.send.backward": "Send Tilbake",
    "toolbar.align": "Juster",
    "toolbar.align.selected": "Juster Valgte:",
    "toolbar.align.left": "Venstrejuster",
    "toolbar.center.h": "Sentrer Horisontalt",
    "toolbar.align.right": "Høyrejuster",
    "toolbar.align.top": "Juster Øverst",
    "toolbar.center.v": "Sentrer Vertikalt",
    "toolbar.align.bottom": "Juster Nederst",
    "toolbar.align.to.page": "Juster til Side:",
    "toolbar.center.page.h": "Sentrer Horisontalt på Siden",
    "toolbar.center.page.v": "Sentrer Vertikalt på Siden",
    "toolbar.delete": "Slett Valgte",
    "toolbar.msg.aligned": "Objekter justert.",
    "toolbar.msg.layer.changed": "Lagrekkefølge endret.",
    "toolbar.msg.deleted": "Valgte objekter slettet.",
    "toolbar.msg.select.first": "Velg først et objekt.",
    "toolbar.msg.nothing.selected": "Ingen objekter valgt.",

    // ============= 11. Action Buttons (13 keys) =============
    "missingpieces.generate": "Generer",
    "missingpieces.generate.worksheet": "Generer Arbeidsark",
    "missingpieces.generate.answer": "Generer Fasit",
    "missingpieces.download": "Last ned",
    "missingpieces.download.worksheet.jpeg": "Arbeidsark (JPEG)",
    "missingpieces.download.answer.jpeg": "Fasit (JPEG)",
    "missingpieces.download.worksheet.pdf": "Arbeidsark (PDF)",
    "missingpieces.download.answer.pdf": "Fasit (PDF)",
    "common.grayscale": "Gråtoner",
    "missingpieces.clear.all": "Tøm Alt",
    "missingpieces.msg.generate.complete": "Puslespill generert vellykket!",
    "missingpieces.msg.cleared": "Alt innhold tømt.",
    "missingpieces.msg.download.ready": "Nedlasting klar.",

    // ============= 12. Tab Labels (2 keys) =============
    "missingpieces.tab.worksheet": "Arbeidsark",
    "missingpieces.tab.answer": "Fasit",

    // ============= 13. Theme Messages (9 keys) =============
    "missingpieces.themes.all": "Alle Temaer",
    "missingpieces.msg.themes.error": "Kunne ikke laste temaer.",
    "missingpieces.msg.loading.default": "Laster standardtema...",
    "missingpieces.msg.type.search": "Skriv for å søke i alle bilder.",
    "missingpieces.msg.searching": "Søker...",
    "missingpieces.msg.no.images": "Ingen bilder funnet{query}",
    "missingpieces.msg.theme.loaded": "Tema lastet vellykket.",
    "missingpieces.msg.search.error": "Feil under søking.",
    "missingpieces.msg.loading.theme": "Laster temabilder...",

    // ============= 14. Puzzle Generation Messages (10 keys) =============
    "missingpieces.msg.generating": "Genererer puslespilldata...",
    "missingpieces.msg.generation.failed": "Puslespillgenerering mislyktes. Sjekk dine valg.",
    "missingpieces.msg.worksheet.success": "Arbeidsark generert vellykket!",
    "missingpieces.msg.unexpected.error": "Det oppsto en uventet feil under generering.",
    "missingpieces.msg.validation.error": "Sjekk puslespillkonfigurasjonen.",
    "missingpieces.msg.processing.image": "Behandler bilde for puslespill...",
    "missingpieces.msg.creating.pieces": "Lager puslespillbrikker...",
    "missingpieces.msg.arranging.solution": "Arrangerer løsningsalternativer...",
    "missingpieces.msg.finalizing": "Ferdigstiller puslespilloppsett...",
    "missingpieces.msg.ready": "Puslespill klart for utskrift.",

    // ============= 15. Answer Key Messages (4 keys) =============
    "missingpieces.msg.generate.first": "Generer først et arbeidsark.",
    "missingpieces.msg.generating.answer": "Genererer fasit...",
    "missingpieces.msg.answer.generated": "Fasit generert!",
    "missingpieces.msg.answer.error": "Det oppsto en feil under generering av fasit.",

    // ============= 16. Download & Export Messages (20 keys) =============
    "missingpieces.msg.canvas.empty": "Arbeidsområdet er tomt. Generer innhold først.",
    "missingpieces.msg.preparing.jpeg": "Forbereder høykvalitets-JPEG... Vennligst vent.",
    "missingpieces.msg.jpeg.success": "Høykvalitets-JPEG lastet ned!",
    "missingpieces.msg.jpeg.error": "Feil ved forberedelse av JPEG: {error}",
    "missingpieces.watermark.main": "GRATIS VERSJON - LessonCraftStudio.com",
    "missingpieces.watermark.text": "GRATIS VERSJON",
    "missingpieces.msg.generate.content": "Generer innhold først.",
    "missingpieces.msg.preparing.pdf": "Forbereder PDF...",
    "missingpieces.msg.pdf.success": "PDF lastet ned!",
    "missingpieces.msg.pdf.error": "Feil ved opprettelse av PDF.",
    "missingpieces.msg.generate.worksheet.first": "Generer først et arbeidsark.",
    "missingpieces.msg.preparing.jpeg.simple": "Forbereder JPEG...",
    "missingpieces.msg.jpeg.initiated": "JPEG-nedlasting startet!",
    "missingpieces.msg.jpeg.error.simple": "Feil ved forberedelse av JPEG.",
    "missingpieces.msg.preparing.pdf.quality": "Forbereder høykvalitets-PDF... Vennligst vent.",
    "missingpieces.msg.pdf.quality.success": "Høykvalitets-PDF Lastet Ned!",
    "missingpieces.msg.pdf.error.detailed": "Feil ved opprettelse av PDF: {error}",
    "missingpieces.msg.export.progress": "Eksportfremdrift: {percent}%",
    "missingpieces.msg.export.complete": "Eksport fullført.",
    "missingpieces.msg.export.cancelled": "Eksport avbrutt.",

    // ============= 17. Common Terms (3 keys) =============
    "common.none": "Ingen",
    "common.loading": "Laster...",
    "common.error": "Feil",

    // ============= 18. Placeholders (4 keys) =============
    "placeholder.search": "Søk...",
    "placeholder.enter.text": "Skriv inn tekst her",
    "placeholder.custom.width": "Bredde",
    "placeholder.custom.height": "Høyde",

    // ============= 19. Error Messages (30+ keys) =============
    "error.invalid.dimensions": "Ugyldige dimensjoner. Sjekk bredde og høyde.",
    "error.no.image.selected": "Velg et bilde for puslespillet.",
    "error.no.theme.selected": "Velg først et tema.",
    "error.upload.failed": "Opplasting mislyktes. Prøv igjen.",
    "error.file.too.large": "Filen er for stor. Maksimum er 5MB.",
    "error.invalid.file.type": "Ugyldig filtype. Last kun opp bildefiler.",
    "error.canvas.creation": "Feil ved opprettelse av arbeidsområde.",
    "error.export.failed": "Eksport mislyktes. Prøv igjen.",
    "error.network": "Nettverksfeil. Sjekk tilkoblingen din.",
    "error.puzzle.generation": "Kunne ikke generere puslespill. Prøv andre innstillinger.",
    "error.invalid.configuration": "Ugyldig puslespillkonfigurasjon.",
    "error.shape.not.supported": "Den valgte formen støttes ikke.",
    "error.pieces.overlap": "Brikker overlapper. Juster konfigurasjonen.",
    "error.solution.conflict": "Løsningsalternativer konflikter med antall manglende brikker.",
    "error.image.loading": "Feil ved lasting av bilde.",
    "error.theme.loading": "Feil ved lasting av tema.",
    "error.border.loading": "Feil ved lasting av ramme.",
    "error.background.loading": "Feil ved lasting av bakgrunn.",
    "error.text.empty": "Skriv inn tekstinnhold.",
    "error.object.selection": "Velg et objekt å endre.",
    "error.alignment": "Feil ved justering av objekter.",
    "error.layer.operation": "Feil ved endring av lagrekkefølge.",
    "error.delete.operation": "Feil ved sletting av objekter.",
    "error.color.invalid": "Ugyldig fargeverdi.",
    "error.size.invalid": "Ugyldig størrelsesverdi.",
    "error.outline.invalid": "Ugyldig konturbredde.",
    "error.opacity.invalid": "Ugyldig synlighetsverdi.",
    "error.theme.not.found": "Tema ikke funnet.",
    "error.api.connection": "Kunne ikke koble til serveren.",
    "error.session.expired": "Økt utløpt. Oppdater siden.",
    "error.browser.unsupported": "Nettleseren din støttes ikke. Bruk en moderne nettleser.",
    "error.feature.unavailable": "Denne funksjonen er ikke tilgjengelig i gratisversjonen."
  }
};

// ==========================================
// HELPER FUNCTIONS FOR NORWEGIAN
// ==========================================

/**
 * Get Norwegian translation for a key
 * @param {string} key - Translation key
 * @param {object} params - Parameters for interpolation
 * @returns {string} Translated text in Norwegian
 */
function getNorwegianTranslation(key, params = {}) {
  const translation = MISSING_PIECES_NORWEGIAN.no[key] || key;
  return formatNorwegianTranslation(translation, params);
}

/**
 * Format Norwegian translation with parameters
 * @param {string} text - Text with placeholders
 * @param {object} params - Parameters to replace
 * @returns {string} Formatted text
 */
function formatNorwegianTranslation(text, params) {
  let formattedText = text;
  for (const [key, value] of Object.entries(params)) {
    formattedText = formattedText.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return formattedText;
}

/**
 * Validate Norwegian translations completeness
 * @returns {object} Validation result
 */
function validateNorwegianTranslations() {
  const requiredKeys = 176; // Based on master template
  const actualKeys = Object.keys(MISSING_PIECES_NORWEGIAN.no).length;

  return {
    complete: actualKeys >= requiredKeys,
    coverage: `${((actualKeys / requiredKeys) * 100).toFixed(1)}%`,
    missingKeys: requiredKeys - actualKeys,
    actualKeys: actualKeys,
    requiredKeys: requiredKeys
  };
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MISSING_PIECES_NORWEGIAN,
    getNorwegianTranslation,
    formatNorwegianTranslation,
    validateNorwegianTranslations
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.MISSING_PIECES_NORWEGIAN = MISSING_PIECES_NORWEGIAN;
  window.getNorwegianTranslation = getNorwegianTranslation;
  window.formatNorwegianTranslation = formatNorwegianTranslation;
  window.validateNorwegianTranslations = validateNorwegianTranslations;
}

// Validation check
console.log('Norwegian Translation Validation:', validateNorwegianTranslations());