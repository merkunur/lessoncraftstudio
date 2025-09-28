/**
 * Missing Pieces Danish Translation
 * Professional UI Translation with Natural Language
 * Covers: Denmark & Southern Schleswig
 * Total Keys: 176+ (100% coverage)
 *
 * Translation Philosophy:
 * - Natural Danish that sounds native, not translated
 * - Using "du" form (informal, standard in Danish software)
 * - Clear educational terminology familiar to Danish teachers
 * - Consistent terminology throughout
 * - Clean and concise Danish style
 */

const MISSING_PIECES_DANISH = {
  da: {
    // ============= 1. Language Names (11 keys) =============
    "language.english": "Engelsk",
    "language.german.full": "Tysk",
    "language.french.full": "Fransk",
    "language.spanish.full": "Spansk",
    "language.portuguese.full": "Portugisisk",
    "language.italian.full": "Italiensk",
    "language.dutch.full": "Hollandsk",
    "language.swedish.full": "Svensk",
    "language.danish.full": "Dansk",
    "language.norwegian.full": "Norsk",
    "language.finnish.full": "Finsk",

    // ============= 2. Page Title & Headers (8 keys) =============
    "missingpieces.page.title": "Manglende Brikker Arbejdsark Generator",
    "missingpieces.title": "Manglende Brikker",
    "missingpieces.language.settings": "Sprogindstillinger",
    "missingpieces.page.setup": "Sideopsætning",
    "missingpieces.text.tools": "Tekstværktøjer",
    "missingpieces.puzzle.config": "Puslespilsindstillinger",
    "missingpieces.image.library": "Billedbibliotek",
    "missingpieces.upload.custom": "Upload Egne Billeder",

    // ============= 3. Page Setup (19 keys) =============
    "missingpieces.select.language": "Vælg Sprog",
    "missingpieces.language.label": "Sprog:",
    "missingpieces.page.size": "Sidestørrelse:",
    "page.size.letter.portrait": "Letter Stående (8,5×11\")",
    "page.size.default": "Standard Arbejdsark (800x1000)",
    "page.size.a4.portrait": "A4 Stående (210×297mm)",
    "page.size.a4.landscape": "A4 Liggende (297×210mm)",
    "page.size.letter.landscape": "Letter Liggende (11×8,5\")",
    "page.size.square": "Kvadrat (1200x1200)",
    "page.size.custom": "Tilpasset",
    "missingpieces.width.label": "Bredde (px):",
    "missingpieces.height.label": "Højde (px):",
    "missingpieces.page.color": "Sidefarve:",
    "missingpieces.apply.size": "Anvend Størrelse",
    "missingpieces.background.title": "Baggrund",
    "missingpieces.background.theme": "Baggrundstema:",
    "missingpieces.background.message": "Vælg et tema til baggrunde.",
    "missingpieces.background.opacity": "Baggrundsgennemsigtighed:",
    "missingpieces.border.title": "Ramme",
    "missingpieces.border.theme": "Rammetema:",
    "missingpieces.border.message": "Vælg et tema for at se rammer.",
    "missingpieces.border.opacity": "Rammegennemsigtighed:",

    // ============= 4. Text Tools (15 keys) =============
    "missingpieces.text.add.new": "Tilføj Ny Tekst",
    "missingpieces.text.content": "Indhold:",
    "missingpieces.text.placeholder": "Hej!",
    "missingpieces.text.add.button": "Tilføj Tekst",
    "missingpieces.text.properties": "Egenskaber for Valgt Tekst",
    "missingpieces.text.color": "Farve:",
    "missingpieces.text.size": "Størrelse:",
    "missingpieces.text.font": "Skrifttype:",
    "missingpieces.text.outline.color": "Konturfarve:",
    "missingpieces.text.outline.width": "Kontur (0-10):",
    "missingpieces.text.default": "Ny Tekst",
    "missingpieces.msg.text.added": "Tekst tilføjet til arbejdsarket.",
    "missingpieces.msg.text.updated": "Tekstegenskaber opdateret.",
    "missingpieces.msg.text.deleted": "Tekst slettet.",
    "missingpieces.msg.form.cleared": "Formular ryddet.",

    // ============= 5. Puzzle Configuration (9 keys) =============
    "missingpieces.missing.count": "Manglende Brikker (1-5):",
    "missingpieces.solution.options": "Løsningsmuligheder (2-6):",
    "missingpieces.piece.shape": "Brikkernes Form:",
    "missingpieces.msg.select.image": "Vælg først et billede til puslespillet.",
    "missingpieces.msg.pieces.range": "Manglende brikker skal være mellem 1 og 5.",
    "missingpieces.msg.options.range": "Løsningsmuligheder skal være mellem 2 og 6.",
    "missingpieces.msg.pieces.less": "Antal manglende brikker skal være mindre end løsningsmuligheder.",
    "missingpieces.msg.distinct.pieces": "Kunne ikke finde nok forskellige brikker.",
    "missingpieces.msg.image.failed": "Kunne ikke indlæse det valgte billede.",

    // ============= 6. Shape Options (6 keys) =============
    "shape.square": "Kvadrat",
    "shape.circle": "Cirkel",
    "shape.rect.portrait": "Rektangel (Stående)",
    "shape.rect.landscape": "Rektangel (Liggende)",
    "shape.ellipse.portrait": "Ellipse (Stående)",
    "shape.ellipse.landscape": "Ellipse (Liggende)",

    // ============= 7. Image Library (7 keys) =============
    "missingpieces.select.theme": "Vælg Tema:",
    "missingpieces.search.images": "Søg Billeder:",
    "missingpieces.search.placeholder": "f.eks. æble, bil",
    "missingpieces.available.images": "Tilgængelige Billeder:",
    "missingpieces.loading.images": "Indlæser billeder...",
    "missingpieces.selected.image": "Valgt Billede til Puslespil:",
    "missingpieces.msg.none.selected": "Ingen elementer valgt.",

    // ============= 8. Upload Section (4 keys) =============
    "missingpieces.upload.select": "Vælg billede(r) til upload:",
    "missingpieces.uploaded.images": "Dine Uploadede Billeder (Denne Session):",
    "missingpieces.uploaded.placeholder": "Dine uploadede billeder vises her.",
    "missingpieces.msg.images.loaded": "{count} billede(r) indlæst.",

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
    "toolbar.bring.forward": "Flyt Frem",
    "toolbar.send.backward": "Send Tilbage",
    "toolbar.align": "Juster",
    "toolbar.align.selected": "Juster Valgte:",
    "toolbar.align.left": "Venstrejuster",
    "toolbar.center.h": "Centrer Vandret",
    "toolbar.align.right": "Højrejuster",
    "toolbar.align.top": "Juster Øverst",
    "toolbar.center.v": "Centrer Lodret",
    "toolbar.align.bottom": "Juster Nederst",
    "toolbar.align.to.page": "Juster til Side:",
    "toolbar.center.page.h": "Centrer Vandret på Siden",
    "toolbar.center.page.v": "Centrer Lodret på Siden",
    "toolbar.delete": "Slet Valgte",
    "toolbar.msg.aligned": "Objekter justeret.",
    "toolbar.msg.layer.changed": "Lagrækkefølge ændret.",
    "toolbar.msg.deleted": "Valgte objekter slettet.",
    "toolbar.msg.select.first": "Vælg først et objekt.",
    "toolbar.msg.nothing.selected": "Ingen objekter valgt.",

    // ============= 11. Action Buttons (13 keys) =============
    "missingpieces.generate": "Generer",
    "missingpieces.generate.worksheet": "Generer Arbejdsark",
    "missingpieces.generate.answer": "Generer Facitliste",
    "missingpieces.download": "Download",
    "missingpieces.download.worksheet.jpeg": "Arbejdsark (JPEG)",
    "missingpieces.download.answer.jpeg": "Facitliste (JPEG)",
    "missingpieces.download.worksheet.pdf": "Arbejdsark (PDF)",
    "missingpieces.download.answer.pdf": "Facitliste (PDF)",
    "common.grayscale": "Gråtoner",
    "missingpieces.clear.all": "Ryd Alt",
    "missingpieces.msg.generate.complete": "Puslespil genereret succesfuldt!",
    "missingpieces.msg.cleared": "Alt indhold ryddet.",
    "missingpieces.msg.download.ready": "Download klar.",

    // ============= 12. Tab Labels (2 keys) =============
    "missingpieces.tab.worksheet": "Arbejdsark",
    "missingpieces.tab.answer": "Facitliste",

    // ============= 13. Theme Messages (9 keys) =============
    "missingpieces.themes.all": "Alle Temaer",
    "missingpieces.msg.themes.error": "Kunne ikke indlæse temaer.",
    "missingpieces.msg.loading.default": "Indlæser standardtema...",
    "missingpieces.msg.type.search": "Skriv for at søge i alle billeder.",
    "missingpieces.msg.searching": "Søger...",
    "missingpieces.msg.no.images": "Ingen billeder fundet{query}",
    "missingpieces.msg.theme.loaded": "Tema indlæst succesfuldt.",
    "missingpieces.msg.search.error": "Fejl under søgning.",
    "missingpieces.msg.loading.theme": "Indlæser temabilleder...",

    // ============= 14. Puzzle Generation Messages (10 keys) =============
    "missingpieces.msg.generating": "Genererer puslespilsdata...",
    "missingpieces.msg.generation.failed": "Puslespilsgenerering fejlede. Tjek dine valg.",
    "missingpieces.msg.worksheet.success": "Arbejdsark genereret succesfuldt!",
    "missingpieces.msg.unexpected.error": "Der opstod en uventet fejl under generering.",
    "missingpieces.msg.validation.error": "Tjek puslespilsindstillingerne.",
    "missingpieces.msg.processing.image": "Behandler billede til puslespil...",
    "missingpieces.msg.creating.pieces": "Opretter puslespilsbrikker...",
    "missingpieces.msg.arranging.solution": "Arrangerer løsningsmuligheder...",
    "missingpieces.msg.finalizing": "Færdiggør puslespilslayout...",
    "missingpieces.msg.ready": "Puslespil klar til print.",

    // ============= 15. Answer Key Messages (4 keys) =============
    "missingpieces.msg.generate.first": "Generer først et arbejdsark.",
    "missingpieces.msg.generating.answer": "Genererer facitliste...",
    "missingpieces.msg.answer.generated": "Facitliste genereret!",
    "missingpieces.msg.answer.error": "Der opstod en fejl under generering af facitliste.",

    // ============= 16. Download & Export Messages (20 keys) =============
    "missingpieces.msg.canvas.empty": "Arbejdsområdet er tomt. Generer indhold først.",
    "missingpieces.msg.preparing.jpeg": "Forbereder høj kvalitets JPEG... Vent venligst.",
    "missingpieces.msg.jpeg.success": "Høj kvalitets JPEG downloadet!",
    "missingpieces.msg.jpeg.error": "Fejl ved forberedelse af JPEG: {error}",
    "missingpieces.watermark.main": "GRATIS VERSION - LessonCraftStudio.com",
    "missingpieces.watermark.text": "GRATIS VERSION",
    "missingpieces.msg.generate.content": "Generer indhold først.",
    "missingpieces.msg.preparing.pdf": "Forbereder PDF...",
    "missingpieces.msg.pdf.success": "PDF downloadet!",
    "missingpieces.msg.pdf.error": "Fejl ved oprettelse af PDF.",
    "missingpieces.msg.generate.worksheet.first": "Generer først et arbejdsark.",
    "missingpieces.msg.preparing.jpeg.simple": "Forbereder JPEG...",
    "missingpieces.msg.jpeg.initiated": "JPEG download startet!",
    "missingpieces.msg.jpeg.error.simple": "Fejl ved forberedelse af JPEG.",
    "missingpieces.msg.preparing.pdf.quality": "Forbereder høj kvalitets PDF... Vent venligst.",
    "missingpieces.msg.pdf.quality.success": "Høj kvalitets PDF Downloadet!",
    "missingpieces.msg.pdf.error.detailed": "Fejl ved oprettelse af PDF: {error}",
    "missingpieces.msg.export.progress": "Eksportfremskridt: {percent}%",
    "missingpieces.msg.export.complete": "Eksport fuldført.",
    "missingpieces.msg.export.cancelled": "Eksport annulleret.",

    // ============= 17. Common Terms (3 keys) =============
    "common.none": "Ingen",
    "common.loading": "Indlæser...",
    "common.error": "Fejl",

    // ============= 18. Placeholders (4 keys) =============
    "placeholder.search": "Søg...",
    "placeholder.enter.text": "Indtast tekst her",
    "placeholder.custom.width": "Bredde",
    "placeholder.custom.height": "Højde",

    // ============= 19. Error Messages (30+ keys) =============
    "error.invalid.dimensions": "Ugyldige dimensioner. Tjek bredde og højde.",
    "error.no.image.selected": "Vælg et billede til puslespillet.",
    "error.no.theme.selected": "Vælg først et tema.",
    "error.upload.failed": "Upload fejlede. Prøv igen.",
    "error.file.too.large": "Filen er for stor. Maksimum er 5MB.",
    "error.invalid.file.type": "Ugyldig filtype. Upload kun billedfiler.",
    "error.canvas.creation": "Fejl ved oprettelse af arbejdsområde.",
    "error.export.failed": "Eksport fejlede. Prøv igen.",
    "error.network": "Netværksfejl. Tjek din forbindelse.",
    "error.puzzle.generation": "Kunne ikke generere puslespil. Prøv andre indstillinger.",
    "error.invalid.configuration": "Ugyldig puslespilskonfiguration.",
    "error.shape.not.supported": "Den valgte form understøttes ikke.",
    "error.pieces.overlap": "Brikker overlapper. Juster konfigurationen.",
    "error.solution.conflict": "Løsningsmuligheder konflikter med antal manglende brikker.",
    "error.image.loading": "Fejl ved indlæsning af billede.",
    "error.theme.loading": "Fejl ved indlæsning af tema.",
    "error.border.loading": "Fejl ved indlæsning af ramme.",
    "error.background.loading": "Fejl ved indlæsning af baggrund.",
    "error.text.empty": "Indtast tekstindhold.",
    "error.object.selection": "Vælg et objekt at ændre.",
    "error.alignment": "Fejl ved justering af objekter.",
    "error.layer.operation": "Fejl ved ændring af lagrækkefølge.",
    "error.delete.operation": "Fejl ved sletning af objekter.",
    "error.color.invalid": "Ugyldig farveværdi.",
    "error.size.invalid": "Ugyldig størrelsesværdi.",
    "error.outline.invalid": "Ugyldig konturbredde.",
    "error.opacity.invalid": "Ugyldig gennemsigtighedsværdi.",
    "error.theme.not.found": "Tema ikke fundet.",
    "error.api.connection": "Kunne ikke oprette forbindelse til serveren.",
    "error.session.expired": "Session udløbet. Opdater siden.",
    "error.browser.unsupported": "Din browser understøttes ikke. Brug en moderne browser.",
    "error.feature.unavailable": "Denne funktion er ikke tilgængelig i gratisversionen."
  }
};

// ==========================================
// HELPER FUNCTIONS FOR DANISH
// ==========================================

/**
 * Get Danish translation for a key
 * @param {string} key - Translation key
 * @param {object} params - Parameters for interpolation
 * @returns {string} Translated text in Danish
 */
function getDanishTranslation(key, params = {}) {
  const translation = MISSING_PIECES_DANISH.da[key] || key;
  return formatDanishTranslation(translation, params);
}

/**
 * Format Danish translation with parameters
 * @param {string} text - Text with placeholders
 * @param {object} params - Parameters to replace
 * @returns {string} Formatted text
 */
function formatDanishTranslation(text, params) {
  let formattedText = text;
  for (const [key, value] of Object.entries(params)) {
    formattedText = formattedText.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return formattedText;
}

/**
 * Validate Danish translations completeness
 * @returns {object} Validation result
 */
function validateDanishTranslations() {
  const requiredKeys = 176; // Based on master template
  const actualKeys = Object.keys(MISSING_PIECES_DANISH.da).length;

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
    MISSING_PIECES_DANISH,
    getDanishTranslation,
    formatDanishTranslation,
    validateDanishTranslations
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.MISSING_PIECES_DANISH = MISSING_PIECES_DANISH;
  window.getDanishTranslation = getDanishTranslation;
  window.formatDanishTranslation = formatDanishTranslation;
  window.validateDanishTranslations = validateDanishTranslations;
}

// Validation check
console.log('Danish Translation Validation:', validateDanishTranslations());