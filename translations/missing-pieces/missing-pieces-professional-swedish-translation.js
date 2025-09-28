/**
 * Missing Pieces Swedish Translation
 * Professional UI Translation with Natural Language
 * Covers: Sweden & Finland (Swedish-speaking regions)
 * Total Keys: 176+ (100% coverage)
 *
 * Translation Philosophy:
 * - Natural Swedish that sounds native, not translated
 * - Using "du" form (informal, standard in Swedish software)
 * - Clear educational terminology familiar to Swedish teachers
 * - Consistent terminology throughout
 * - Works for both Sweden and Finland's Swedish speakers
 */

const MISSING_PIECES_SWEDISH = {
  sv: {
    // ============= 1. Language Names (11 keys) =============
    "language.english": "Engelska",
    "language.german.full": "Tyska",
    "language.french.full": "Franska",
    "language.spanish.full": "Spanska",
    "language.portuguese.full": "Portugisiska",
    "language.italian.full": "Italienska",
    "language.dutch.full": "Nederländska",
    "language.swedish.full": "Svenska",
    "language.danish.full": "Danska",
    "language.norwegian.full": "Norska",
    "language.finnish.full": "Finska",

    // ============= 2. Page Title & Headers (8 keys) =============
    "missingpieces.page.title": "Saknade Bitar Arbetsblad Generator",
    "missingpieces.title": "Saknade Bitar",
    "missingpieces.language.settings": "Språkinställningar",
    "missingpieces.page.setup": "Sidkonfiguration",
    "missingpieces.text.tools": "Textverktyg",
    "missingpieces.puzzle.config": "Pusselkonfiguration",
    "missingpieces.image.library": "Bildbibliotek",
    "missingpieces.upload.custom": "Ladda upp Egna Bilder",

    // ============= 3. Page Setup (19 keys) =============
    "missingpieces.select.language": "Välj Språk",
    "missingpieces.language.label": "Språk:",
    "missingpieces.page.size": "Sidstorlek:",
    "page.size.letter.portrait": "Letter Stående (8,5×11\")",
    "page.size.default": "Standard Arbetsblad (800x1000)",
    "page.size.a4.portrait": "A4 Stående (210×297mm)",
    "page.size.a4.landscape": "A4 Liggande (297×210mm)",
    "page.size.letter.landscape": "Letter Liggande (11×8,5\")",
    "page.size.square": "Kvadrat (1200x1200)",
    "page.size.custom": "Anpassad",
    "missingpieces.width.label": "Bredd (px):",
    "missingpieces.height.label": "Höjd (px):",
    "missingpieces.page.color": "Sidfärg:",
    "missingpieces.apply.size": "Tillämpa Storlek",
    "missingpieces.background.title": "Bakgrund",
    "missingpieces.background.theme": "Bakgrundstema:",
    "missingpieces.background.message": "Välj ett tema för bakgrunder.",
    "missingpieces.background.opacity": "Bakgrundsopacitet:",
    "missingpieces.border.title": "Ram",
    "missingpieces.border.theme": "Ramtema:",
    "missingpieces.border.message": "Välj ett tema för ramar.",
    "missingpieces.border.opacity": "Ramopacitet:",

    // ============= 4. Text Tools (15 keys) =============
    "missingpieces.text.add.new": "Lägg till Ny Text",
    "missingpieces.text.content": "Innehåll:",
    "missingpieces.text.placeholder": "Hej!",
    "missingpieces.text.add.button": "Lägg till Text",
    "missingpieces.text.properties": "Egenskaper för Markerad Text",
    "missingpieces.text.color": "Färg:",
    "missingpieces.text.size": "Storlek:",
    "missingpieces.text.font": "Typsnitt:",
    "missingpieces.text.outline.color": "Konturfärg:",
    "missingpieces.text.outline.width": "Kontur (0-10):",
    "missingpieces.text.default": "Ny Text",
    "missingpieces.msg.text.added": "Text tillagd till arbetsbladet.",
    "missingpieces.msg.text.updated": "Textegenskaper uppdaterade.",
    "missingpieces.msg.text.deleted": "Text borttagen.",
    "missingpieces.msg.form.cleared": "Formulär rensat.",

    // ============= 5. Puzzle Configuration (9 keys) =============
    "missingpieces.missing.count": "Saknade Bitar (1-5):",
    "missingpieces.solution.options": "Lösningsalternativ (2-6):",
    "missingpieces.piece.shape": "Bitarnas Form:",
    "missingpieces.msg.select.image": "Välj först en bild för pusslet.",
    "missingpieces.msg.pieces.range": "Saknade bitar måste vara mellan 1 och 5.",
    "missingpieces.msg.options.range": "Lösningsalternativ måste vara mellan 2 och 6.",
    "missingpieces.msg.pieces.less": "Antal saknade bitar måste vara mindre än lösningsalternativen.",
    "missingpieces.msg.distinct.pieces": "Kunde inte hitta tillräckligt många olika bitar.",
    "missingpieces.msg.image.failed": "Misslyckades med att ladda den valda bilden.",

    // ============= 6. Shape Options (6 keys) =============
    "shape.square": "Kvadrat",
    "shape.circle": "Cirkel",
    "shape.rect.portrait": "Rektangel (Stående)",
    "shape.rect.landscape": "Rektangel (Liggande)",
    "shape.ellipse.portrait": "Ellips (Stående)",
    "shape.ellipse.landscape": "Ellips (Liggande)",

    // ============= 7. Image Library (7 keys) =============
    "missingpieces.select.theme": "Välj Tema:",
    "missingpieces.search.images": "Sök Bilder:",
    "missingpieces.search.placeholder": "t.ex. äpple, bil",
    "missingpieces.available.images": "Tillgängliga Bilder:",
    "missingpieces.loading.images": "Laddar bilder...",
    "missingpieces.selected.image": "Vald Bild för Pussel:",
    "missingpieces.msg.none.selected": "Inga objekt valda.",

    // ============= 8. Upload Section (4 keys) =============
    "missingpieces.upload.select": "Välj bild(er) att ladda upp:",
    "missingpieces.uploaded.images": "Dina Uppladdade Bilder (Denna Session):",
    "missingpieces.uploaded.placeholder": "Dina uppladdade bilder visas här.",
    "missingpieces.msg.images.loaded": "{count} bild(er) laddade.",

    // ============= 9. Font Options (7 keys) =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= 10. Toolbar Actions (20 keys) =============
    "toolbar.layers": "Lager",
    "toolbar.bring.forward": "Flytta Framåt",
    "toolbar.send.backward": "Flytta Bakåt",
    "toolbar.align": "Justera",
    "toolbar.align.selected": "Justera Markerade:",
    "toolbar.align.left": "Vänsterjustera",
    "toolbar.center.h": "Centrera Horisontellt",
    "toolbar.align.right": "Högerjustera",
    "toolbar.align.top": "Justera Uppåt",
    "toolbar.center.v": "Centrera Vertikalt",
    "toolbar.align.bottom": "Justera Nedåt",
    "toolbar.align.to.page": "Justera mot Sida:",
    "toolbar.center.page.h": "Centrera Horisontellt på Sidan",
    "toolbar.center.page.v": "Centrera Vertikalt på Sidan",
    "toolbar.delete": "Ta Bort Markerade",
    "toolbar.msg.aligned": "Objekt justerade.",
    "toolbar.msg.layer.changed": "Lagerordning ändrad.",
    "toolbar.msg.deleted": "Markerade objekt borttagna.",
    "toolbar.msg.select.first": "Välj först ett objekt.",
    "toolbar.msg.nothing.selected": "Inga objekt valda.",

    // ============= 11. Action Buttons (13 keys) =============
    "missingpieces.generate": "Generera",
    "missingpieces.generate.worksheet": "Generera Arbetsblad",
    "missingpieces.generate.answer": "Generera Facit",
    "missingpieces.download": "Ladda ner",
    "missingpieces.download.worksheet.jpeg": "Arbetsblad (JPEG)",
    "missingpieces.download.answer.jpeg": "Facit (JPEG)",
    "missingpieces.download.worksheet.pdf": "Arbetsblad (PDF)",
    "missingpieces.download.answer.pdf": "Facit (PDF)",
    "common.grayscale": "Gråskala",
    "missingpieces.clear.all": "Rensa Allt",
    "missingpieces.msg.generate.complete": "Pussel genererat framgångsrikt!",
    "missingpieces.msg.cleared": "Allt innehåll rensat.",
    "missingpieces.msg.download.ready": "Nedladdning klar.",

    // ============= 12. Tab Labels (2 keys) =============
    "missingpieces.tab.worksheet": "Arbetsblad",
    "missingpieces.tab.answer": "Facit",

    // ============= 13. Theme Messages (9 keys) =============
    "missingpieces.themes.all": "Alla Teman",
    "missingpieces.msg.themes.error": "Kunde inte ladda teman.",
    "missingpieces.msg.loading.default": "Laddar standardtema...",
    "missingpieces.msg.type.search": "Skriv för att söka bland alla bilder.",
    "missingpieces.msg.searching": "Söker...",
    "missingpieces.msg.no.images": "Inga bilder hittades{query}",
    "missingpieces.msg.theme.loaded": "Tema laddat framgångsrikt.",
    "missingpieces.msg.search.error": "Fel vid sökning.",
    "missingpieces.msg.loading.theme": "Laddar temabilder...",

    // ============= 14. Puzzle Generation Messages (10 keys) =============
    "missingpieces.msg.generating": "Genererar pusseldata...",
    "missingpieces.msg.generation.failed": "Pusselgenereringen misslyckades. Kontrollera dina val.",
    "missingpieces.msg.worksheet.success": "Arbetsblad genererat framgångsrikt!",
    "missingpieces.msg.unexpected.error": "Ett oväntat fel uppstod under genereringen.",
    "missingpieces.msg.validation.error": "Kontrollera pusselkonfigurationen.",
    "missingpieces.msg.processing.image": "Bearbetar bild för pussel...",
    "missingpieces.msg.creating.pieces": "Skapar pusselbitar...",
    "missingpieces.msg.arranging.solution": "Arrangerar lösningsalternativ...",
    "missingpieces.msg.finalizing": "Slutför pussellayout...",
    "missingpieces.msg.ready": "Pussel redo för utskrift.",

    // ============= 15. Answer Key Messages (4 keys) =============
    "missingpieces.msg.generate.first": "Generera först ett arbetsblad.",
    "missingpieces.msg.generating.answer": "Genererar facit...",
    "missingpieces.msg.answer.generated": "Facit genererat!",
    "missingpieces.msg.answer.error": "Ett fel uppstod vid generering av facit.",

    // ============= 16. Download & Export Messages (20 keys) =============
    "missingpieces.msg.canvas.empty": "Arbetsytan är tom. Generera innehåll först.",
    "missingpieces.msg.preparing.jpeg": "Förbereder högkvalitets-JPEG... Vänta.",
    "missingpieces.msg.jpeg.success": "Högkvalitets-JPEG nedladdad!",
    "missingpieces.msg.jpeg.error": "Fel vid förberedelse av JPEG: {error}",
    "missingpieces.watermark.main": "GRATIS VERSION - LessonCraftStudio.com",
    "missingpieces.watermark.text": "GRATIS VERSION",
    "missingpieces.msg.generate.content": "Generera innehåll först.",
    "missingpieces.msg.preparing.pdf": "Förbereder PDF...",
    "missingpieces.msg.pdf.success": "PDF nedladdad!",
    "missingpieces.msg.pdf.error": "Fel vid skapande av PDF.",
    "missingpieces.msg.generate.worksheet.first": "Generera först ett arbetsblad.",
    "missingpieces.msg.preparing.jpeg.simple": "Förbereder JPEG...",
    "missingpieces.msg.jpeg.initiated": "JPEG-nedladdning påbörjad!",
    "missingpieces.msg.jpeg.error.simple": "Fel vid förberedelse av JPEG.",
    "missingpieces.msg.preparing.pdf.quality": "Förbereder högkvalitets-PDF... Vänta.",
    "missingpieces.msg.pdf.quality.success": "Högkvalitets-PDF Nedladdad!",
    "missingpieces.msg.pdf.error.detailed": "Fel vid skapande av PDF: {error}",
    "missingpieces.msg.export.progress": "Exportförlopp: {percent}%",
    "missingpieces.msg.export.complete": "Export slutförd.",
    "missingpieces.msg.export.cancelled": "Export avbruten.",

    // ============= 17. Common Terms (3 keys) =============
    "common.none": "Ingen",
    "common.loading": "Laddar...",
    "common.error": "Fel",

    // ============= 18. Placeholders (4 keys) =============
    "placeholder.search": "Sök...",
    "placeholder.enter.text": "Skriv text här",
    "placeholder.custom.width": "Bredd",
    "placeholder.custom.height": "Höjd",

    // ============= 19. Error Messages (30+ keys) =============
    "error.invalid.dimensions": "Ogiltiga dimensioner. Kontrollera bredd och höjd.",
    "error.no.image.selected": "Välj en bild för pusslet.",
    "error.no.theme.selected": "Välj först ett tema.",
    "error.upload.failed": "Uppladdning misslyckades. Försök igen.",
    "error.file.too.large": "Filen är för stor. Maxstorlek är 5MB.",
    "error.invalid.file.type": "Ogiltig filtyp. Ladda bara upp bildfiler.",
    "error.canvas.creation": "Fel vid skapande av arbetsyta.",
    "error.export.failed": "Export misslyckades. Försök igen.",
    "error.network": "Nätverksfel. Kontrollera din anslutning.",
    "error.puzzle.generation": "Kunde inte generera pussel. Prova andra inställningar.",
    "error.invalid.configuration": "Ogiltig pusselkonfiguration.",
    "error.shape.not.supported": "Den valda formen stöds inte.",
    "error.pieces.overlap": "Bitar överlappar. Justera konfigurationen.",
    "error.solution.conflict": "Lösningsalternativ konflikterar med antal saknade bitar.",
    "error.image.loading": "Fel vid laddning av bild.",
    "error.theme.loading": "Fel vid laddning av tema.",
    "error.border.loading": "Fel vid laddning av ram.",
    "error.background.loading": "Fel vid laddning av bakgrund.",
    "error.text.empty": "Ange textinnehåll.",
    "error.object.selection": "Välj ett objekt att modifiera.",
    "error.alignment": "Fel vid justering av objekt.",
    "error.layer.operation": "Fel vid ändring av lagerordning.",
    "error.delete.operation": "Fel vid borttagning av objekt.",
    "error.color.invalid": "Ogiltigt färgvärde.",
    "error.size.invalid": "Ogiltigt storleksvärde.",
    "error.outline.invalid": "Ogiltig konturbredd.",
    "error.opacity.invalid": "Ogiltigt opacitetsvärde.",
    "error.theme.not.found": "Tema hittades inte.",
    "error.api.connection": "Kunde inte ansluta till servern.",
    "error.session.expired": "Sessionen har gått ut. Uppdatera sidan.",
    "error.browser.unsupported": "Din webbläsare stöds inte. Använd en modern webbläsare.",
    "error.feature.unavailable": "Denna funktion är inte tillgänglig i gratisversionen."
  }
};

// ==========================================
// HELPER FUNCTIONS FOR SWEDISH
// ==========================================

/**
 * Get Swedish translation for a key
 * @param {string} key - Translation key
 * @param {object} params - Parameters for interpolation
 * @returns {string} Translated text in Swedish
 */
function getSwedishTranslation(key, params = {}) {
  const translation = MISSING_PIECES_SWEDISH.sv[key] || key;
  return formatSwedishTranslation(translation, params);
}

/**
 * Format Swedish translation with parameters
 * @param {string} text - Text with placeholders
 * @param {object} params - Parameters to replace
 * @returns {string} Formatted text
 */
function formatSwedishTranslation(text, params) {
  let formattedText = text;
  for (const [key, value] of Object.entries(params)) {
    formattedText = formattedText.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return formattedText;
}

/**
 * Validate Swedish translations completeness
 * @returns {object} Validation result
 */
function validateSwedishTranslations() {
  const requiredKeys = 176; // Based on master template
  const actualKeys = Object.keys(MISSING_PIECES_SWEDISH.sv).length;

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
    MISSING_PIECES_SWEDISH,
    getSwedishTranslation,
    formatSwedishTranslation,
    validateSwedishTranslations
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.MISSING_PIECES_SWEDISH = MISSING_PIECES_SWEDISH;
  window.getSwedishTranslation = getSwedishTranslation;
  window.formatSwedishTranslation = formatSwedishTranslation;
  window.validateSwedishTranslations = validateSwedishTranslations;
}

// Validation check
console.log('Swedish Translation Validation:', validateSwedishTranslations());