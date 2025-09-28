/**
 * Missing Pieces Dutch Translation
 * Professional UI Translation with Natural Language
 * Covers: Netherlands & Belgium (Flemish) - neutral version
 * Total Keys: 176+ (100% coverage)
 *
 * Translation Philosophy:
 * - Natural Dutch that sounds native, not translated
 * - Using "je/jij" form (informal, standard in modern educational software)
 * - Neutral Dutch that works for both NL and BE markets
 * - Clear educational terminology familiar to teachers
 * - Consistent terminology throughout
 */

const MISSING_PIECES_DUTCH = {
  nl: {
    // ============= 1. Language Names (11 keys) =============
    "language.english": "Engels",
    "language.german.full": "Duits",
    "language.french.full": "Frans",
    "language.spanish.full": "Spaans",
    "language.portuguese.full": "Portugees",
    "language.italian.full": "Italiaans",
    "language.dutch.full": "Nederlands",
    "language.swedish.full": "Zweeds",
    "language.danish.full": "Deens",
    "language.norwegian.full": "Noors",
    "language.finnish.full": "Fins",

    // ============= 2. Page Title & Headers (8 keys) =============
    "missingpieces.page.title": "Ontbrekende Stukken Werkblad Generator",
    "missingpieces.title": "Ontbrekende Stukken",
    "missingpieces.language.settings": "Taalinstellingen",
    "missingpieces.page.setup": "Pagina-instellingen",
    "missingpieces.text.tools": "Tekstgereedschappen",
    "missingpieces.puzzle.config": "Puzzelconfiguratie",
    "missingpieces.image.library": "Afbeeldingenbibliotheek",
    "missingpieces.upload.custom": "Eigen Afbeeldingen Uploaden",

    // ============= 3. Page Setup (19 keys) =============
    "missingpieces.select.language": "Taal Selecteren",
    "missingpieces.language.label": "Taal:",
    "missingpieces.page.size": "Paginaformaat:",
    "page.size.letter.portrait": "Letter Staand (8,5×11\")",
    "page.size.default": "Standaard Werkblad (800x1000)",
    "page.size.a4.portrait": "A4 Staand (210×297mm)",
    "page.size.a4.landscape": "A4 Liggend (297×210mm)",
    "page.size.letter.landscape": "Letter Liggend (11×8,5\")",
    "page.size.square": "Vierkant (1200x1200)",
    "page.size.custom": "Aangepast",
    "missingpieces.width.label": "Breedte (px):",
    "missingpieces.height.label": "Hoogte (px):",
    "missingpieces.page.color": "Paginakleur:",
    "missingpieces.apply.size": "Formaat Toepassen",
    "missingpieces.background.title": "Achtergrond",
    "missingpieces.background.theme": "Achtergrondthema:",
    "missingpieces.background.message": "Selecteer een thema voor achtergronden.",
    "missingpieces.background.opacity": "Achtergrond Transparantie:",
    "missingpieces.border.title": "Kader",
    "missingpieces.border.theme": "Kaderthema:",
    "missingpieces.border.message": "Selecteer een thema voor kaders.",
    "missingpieces.border.opacity": "Kader Transparantie:",

    // ============= 4. Text Tools (15 keys) =============
    "missingpieces.text.add.new": "Nieuwe Tekst Toevoegen",
    "missingpieces.text.content": "Inhoud:",
    "missingpieces.text.placeholder": "Hallo!",
    "missingpieces.text.add.button": "Tekst Toevoegen",
    "missingpieces.text.properties": "Eigenschappen van Geselecteerde Tekst",
    "missingpieces.text.color": "Kleur:",
    "missingpieces.text.size": "Grootte:",
    "missingpieces.text.font": "Lettertype:",
    "missingpieces.text.outline.color": "Omlijning Kleur:",
    "missingpieces.text.outline.width": "Omlijning (0-10):",
    "missingpieces.text.default": "Nieuwe Tekst",
    "missingpieces.msg.text.added": "Tekst toegevoegd aan werkblad.",
    "missingpieces.msg.text.updated": "Teksteigenschappen bijgewerkt.",
    "missingpieces.msg.text.deleted": "Tekst verwijderd.",
    "missingpieces.msg.form.cleared": "Formulier gewist.",

    // ============= 5. Puzzle Configuration (9 keys) =============
    "missingpieces.missing.count": "Ontbrekende Stukken (1-5):",
    "missingpieces.solution.options": "Oplossingsopties (2-6):",
    "missingpieces.piece.shape": "Vorm van de Stukken:",
    "missingpieces.msg.select.image": "Selecteer eerst een afbeelding voor de puzzel.",
    "missingpieces.msg.pieces.range": "Ontbrekende stukken moeten tussen 1 en 5 zijn.",
    "missingpieces.msg.options.range": "Oplossingsopties moeten tussen 2 en 6 zijn.",
    "missingpieces.msg.pieces.less": "Het aantal ontbrekende stukken moet kleiner zijn dan de oplossingsopties.",
    "missingpieces.msg.distinct.pieces": "Kon niet genoeg verschillende stukken vinden.",
    "missingpieces.msg.image.failed": "Kon de geselecteerde afbeelding niet laden.",

    // ============= 6. Shape Options (6 keys) =============
    "shape.square": "Vierkant",
    "shape.circle": "Cirkel",
    "shape.rect.portrait": "Rechthoek (Staand)",
    "shape.rect.landscape": "Rechthoek (Liggend)",
    "shape.ellipse.portrait": "Ellips (Staand)",
    "shape.ellipse.landscape": "Ellips (Liggend)",

    // ============= 7. Image Library (7 keys) =============
    "missingpieces.select.theme": "Thema Selecteren:",
    "missingpieces.search.images": "Afbeeldingen Zoeken:",
    "missingpieces.search.placeholder": "bijv. appel, auto",
    "missingpieces.available.images": "Beschikbare Afbeeldingen:",
    "missingpieces.loading.images": "Afbeeldingen laden...",
    "missingpieces.selected.image": "Geselecteerde Afbeelding voor Puzzel:",
    "missingpieces.msg.none.selected": "Geen items geselecteerd.",

    // ============= 8. Upload Section (4 keys) =============
    "missingpieces.upload.select": "Selecteer afbeelding(en) om te uploaden:",
    "missingpieces.uploaded.images": "Je Geüploade Afbeeldingen (Deze Sessie):",
    "missingpieces.uploaded.placeholder": "Je geüploade afbeeldingen verschijnen hier.",
    "missingpieces.msg.images.loaded": "{count} afbeelding(en) geladen.",

    // ============= 9. Font Options (7 keys) =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= 10. Toolbar Actions (20 keys) =============
    "toolbar.layers": "Lagen",
    "toolbar.bring.forward": "Naar Voren Brengen",
    "toolbar.send.backward": "Naar Achteren Sturen",
    "toolbar.align": "Uitlijnen",
    "toolbar.align.selected": "Geselecteerde Uitlijnen:",
    "toolbar.align.left": "Links Uitlijnen",
    "toolbar.center.h": "Horizontaal Centreren",
    "toolbar.align.right": "Rechts Uitlijnen",
    "toolbar.align.top": "Boven Uitlijnen",
    "toolbar.center.v": "Verticaal Centreren",
    "toolbar.align.bottom": "Onder Uitlijnen",
    "toolbar.align.to.page": "Uitlijnen op Pagina:",
    "toolbar.center.page.h": "Horizontaal Centreren op Pagina",
    "toolbar.center.page.v": "Verticaal Centreren op Pagina",
    "toolbar.delete": "Geselecteerde Verwijderen",
    "toolbar.msg.aligned": "Objecten uitgelijnd.",
    "toolbar.msg.layer.changed": "Laagvolgorde gewijzigd.",
    "toolbar.msg.deleted": "Geselecteerde objecten verwijderd.",
    "toolbar.msg.select.first": "Selecteer eerst een object.",
    "toolbar.msg.nothing.selected": "Geen objecten geselecteerd.",

    // ============= 11. Action Buttons (13 keys) =============
    "missingpieces.generate": "Genereren",
    "missingpieces.generate.worksheet": "Werkblad Genereren",
    "missingpieces.generate.answer": "Antwoordblad Genereren",
    "missingpieces.download": "Downloaden",
    "missingpieces.download.worksheet.jpeg": "Werkblad (JPEG)",
    "missingpieces.download.answer.jpeg": "Antwoordblad (JPEG)",
    "missingpieces.download.worksheet.pdf": "Werkblad (PDF)",
    "missingpieces.download.answer.pdf": "Antwoordblad (PDF)",
    "common.grayscale": "Grijstinten",
    "missingpieces.clear.all": "Alles Wissen",
    "missingpieces.msg.generate.complete": "Puzzel succesvol gegenereerd!",
    "missingpieces.msg.cleared": "Alle inhoud gewist.",
    "missingpieces.msg.download.ready": "Download gereed.",

    // ============= 12. Tab Labels (2 keys) =============
    "missingpieces.tab.worksheet": "Werkblad",
    "missingpieces.tab.answer": "Antwoordblad",

    // ============= 13. Theme Messages (9 keys) =============
    "missingpieces.themes.all": "Alle Thema's",
    "missingpieces.msg.themes.error": "Kon thema's niet laden.",
    "missingpieces.msg.loading.default": "Standaardthema laden...",
    "missingpieces.msg.type.search": "Typ om alle afbeeldingen te zoeken.",
    "missingpieces.msg.searching": "Zoeken...",
    "missingpieces.msg.no.images": "Geen afbeeldingen gevonden{query}",
    "missingpieces.msg.theme.loaded": "Thema succesvol geladen.",
    "missingpieces.msg.search.error": "Fout tijdens zoeken.",
    "missingpieces.msg.loading.theme": "Thema-afbeeldingen laden...",

    // ============= 14. Puzzle Generation Messages (10 keys) =============
    "missingpieces.msg.generating": "Puzzelgegevens genereren...",
    "missingpieces.msg.generation.failed": "Puzzel genereren mislukt. Controleer je selecties.",
    "missingpieces.msg.worksheet.success": "Werkblad succesvol gegenereerd!",
    "missingpieces.msg.unexpected.error": "Er is een onverwachte fout opgetreden tijdens het genereren.",
    "missingpieces.msg.validation.error": "Controleer de puzzelconfiguratie.",
    "missingpieces.msg.processing.image": "Afbeelding verwerken voor puzzel...",
    "missingpieces.msg.creating.pieces": "Puzzelstukken maken...",
    "missingpieces.msg.arranging.solution": "Oplossingsopties rangschikken...",
    "missingpieces.msg.finalizing": "Puzzelindeling voltooien...",
    "missingpieces.msg.ready": "Puzzel klaar om af te drukken.",

    // ============= 15. Answer Key Messages (4 keys) =============
    "missingpieces.msg.generate.first": "Genereer eerst een werkblad.",
    "missingpieces.msg.generating.answer": "Antwoordblad genereren...",
    "missingpieces.msg.answer.generated": "Antwoordblad gegenereerd!",
    "missingpieces.msg.answer.error": "Er is een fout opgetreden tijdens het genereren van het antwoordblad.",

    // ============= 16. Download & Export Messages (20 keys) =============
    "missingpieces.msg.canvas.empty": "Het werkblad is leeg. Genereer eerst inhoud.",
    "missingpieces.msg.preparing.jpeg": "JPEG van hoge kwaliteit voorbereiden... Even geduld.",
    "missingpieces.msg.jpeg.success": "JPEG van hoge kwaliteit gedownload!",
    "missingpieces.msg.jpeg.error": "Fout bij voorbereiden JPEG: {error}",
    "missingpieces.watermark.main": "GRATIS VERSIE - LessonCraftStudio.com",
    "missingpieces.watermark.text": "GRATIS VERSIE",
    "missingpieces.msg.generate.content": "Genereer eerst inhoud.",
    "missingpieces.msg.preparing.pdf": "PDF voorbereiden...",
    "missingpieces.msg.pdf.success": "PDF gedownload!",
    "missingpieces.msg.pdf.error": "Fout bij maken van PDF.",
    "missingpieces.msg.generate.worksheet.first": "Genereer eerst een werkblad.",
    "missingpieces.msg.preparing.jpeg.simple": "JPEG voorbereiden...",
    "missingpieces.msg.jpeg.initiated": "JPEG download gestart!",
    "missingpieces.msg.jpeg.error.simple": "Fout bij voorbereiden JPEG.",
    "missingpieces.msg.preparing.pdf.quality": "PDF van hoge kwaliteit voorbereiden... Even geduld.",
    "missingpieces.msg.pdf.quality.success": "PDF van hoge kwaliteit gedownload!",
    "missingpieces.msg.pdf.error.detailed": "Fout bij maken van PDF: {error}",
    "missingpieces.msg.export.progress": "Exportvoortgang: {percent}%",
    "missingpieces.msg.export.complete": "Export voltooid.",
    "missingpieces.msg.export.cancelled": "Export geannuleerd.",

    // ============= 17. Common Terms (3 keys) =============
    "common.none": "Geen",
    "common.loading": "Laden...",
    "common.error": "Fout",

    // ============= 18. Placeholders (4 keys) =============
    "placeholder.search": "Zoeken...",
    "placeholder.enter.text": "Voer hier tekst in",
    "placeholder.custom.width": "Breedte",
    "placeholder.custom.height": "Hoogte",

    // ============= 19. Error Messages (30+ keys) =============
    "error.invalid.dimensions": "Ongeldige afmetingen. Controleer breedte en hoogte.",
    "error.no.image.selected": "Selecteer een afbeelding voor de puzzel.",
    "error.no.theme.selected": "Selecteer eerst een thema.",
    "error.upload.failed": "Upload mislukt. Probeer het opnieuw.",
    "error.file.too.large": "Bestand is te groot. Maximum is 5MB.",
    "error.invalid.file.type": "Ongeldig bestandstype. Upload alleen afbeeldingsbestanden.",
    "error.canvas.creation": "Fout bij maken van werkblad.",
    "error.export.failed": "Export mislukt. Probeer het opnieuw.",
    "error.network": "Netwerkfout. Controleer je verbinding.",
    "error.puzzle.generation": "Kon puzzel niet genereren. Probeer andere instellingen.",
    "error.invalid.configuration": "Ongeldige puzzelconfiguratie.",
    "error.shape.not.supported": "De geselecteerde vorm wordt niet ondersteund.",
    "error.pieces.overlap": "Stukken overlappen elkaar. Pas de configuratie aan.",
    "error.solution.conflict": "Oplossingsopties conflicteren met aantal ontbrekende stukken.",
    "error.image.loading": "Fout bij laden van afbeelding.",
    "error.theme.loading": "Fout bij laden van thema.",
    "error.border.loading": "Fout bij laden van kader.",
    "error.background.loading": "Fout bij laden van achtergrond.",
    "error.text.empty": "Voer tekstinhoud in.",
    "error.object.selection": "Selecteer een object om te wijzigen.",
    "error.alignment": "Fout bij uitlijnen van objecten.",
    "error.layer.operation": "Fout bij wijzigen van laagvolgorde.",
    "error.delete.operation": "Fout bij verwijderen van objecten.",
    "error.color.invalid": "Ongeldige kleurwaarde.",
    "error.size.invalid": "Ongeldige groottewaarde.",
    "error.outline.invalid": "Ongeldige omlijningsbreedte.",
    "error.opacity.invalid": "Ongeldige transparantiewaarde.",
    "error.theme.not.found": "Thema niet gevonden.",
    "error.api.connection": "Kon geen verbinding maken met server.",
    "error.session.expired": "Sessie verlopen. Vernieuw de pagina.",
    "error.browser.unsupported": "Je browser wordt niet ondersteund. Gebruik een moderne browser.",
    "error.feature.unavailable": "Deze functie is niet beschikbaar in de gratis versie."
  }
};

// ==========================================
// HELPER FUNCTIONS FOR DUTCH
// ==========================================

/**
 * Get Dutch translation for a key
 * @param {string} key - Translation key
 * @param {object} params - Parameters for interpolation
 * @returns {string} Translated text in Dutch
 */
function getDutchTranslation(key, params = {}) {
  const translation = MISSING_PIECES_DUTCH.nl[key] || key;
  return formatDutchTranslation(translation, params);
}

/**
 * Format Dutch translation with parameters
 * @param {string} text - Text with placeholders
 * @param {object} params - Parameters to replace
 * @returns {string} Formatted text
 */
function formatDutchTranslation(text, params) {
  let formattedText = text;
  for (const [key, value] of Object.entries(params)) {
    formattedText = formattedText.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return formattedText;
}

/**
 * Validate Dutch translations completeness
 * @returns {object} Validation result
 */
function validateDutchTranslations() {
  const requiredKeys = 176; // Based on master template
  const actualKeys = Object.keys(MISSING_PIECES_DUTCH.nl).length;

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
    MISSING_PIECES_DUTCH,
    getDutchTranslation,
    formatDutchTranslation,
    validateDutchTranslations
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.MISSING_PIECES_DUTCH = MISSING_PIECES_DUTCH;
  window.getDutchTranslation = getDutchTranslation;
  window.formatDutchTranslation = formatDutchTranslation;
  window.validateDutchTranslations = validateDutchTranslations;
}

// Validation check
console.log('Dutch Translation Validation:', validateDutchTranslations());