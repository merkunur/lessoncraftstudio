// Pattern Worksheet - Professional Danish Translation
// Total: 192 translation keys (185 unique)
// Approach: Natural, educational Danish as if originally developed in Denmark
// App name: "Mønsterark" (Pattern Worksheet)

const PATTERN_WORKSHEET_DANISH_TRANSLATIONS = {
  da: {
    // ===== 1. PAGE & HERO (2 items) =====
    "pattern.worksheet.page.title": "Mønsterark Generator",
    "pattern.worksheet.settings": "Mønsterindstillinger",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "pattern.worksheet.language.settings": "Sprogindstillinger",
    "pattern.worksheet.page.setup": "Sideopsætning",
    "pattern.worksheet.text.tools": "Tekstværktøjer",
    "pattern.worksheet.pattern.settings": "Mønsterkonfiguration",
    "pattern.worksheet.image.library": "Billedbibliotek",
    "pattern.worksheet.upload.custom": "Upload Egne Billeder",

    // ===== 3. LANGUAGE SECTION (12 items) =====
    "pattern.worksheet.language.label": "Sprog:",
    "language.english": "English",
    "language.german": "Deutsch",
    "language.french": "Français",
    "language.spanish": "Español",
    "language.portuguese": "Português",
    "language.italian": "Italiano",
    "language.dutch": "Nederlands",
    "language.swedish": "Svenska",
    "language.danish": "Dansk",
    "language.norwegian": "Norsk",
    "language.finnish": "Suomi",

    // ===== 4. PAGE SETUP (19 items) =====
    "pattern.worksheet.page.size": "Sidestørrelse:",
    "page.size.letter.portrait": "Letter Stående (8,5×11\")",
    "page.size.letter.landscape": "Letter Liggende (11×8,5\")",
    "page.size.a4.portrait": "A4 Stående (210×297mm)",
    "page.size.a4.landscape": "A4 Liggende (297×210mm)",
    "page.size.square": "Kvadrat (1200x1200)",
    "page.size.custom": "Tilpasset",
    "pattern.worksheet.width.label": "Bredde (px):",
    "pattern.worksheet.height.label": "Højde (px):",
    "pattern.worksheet.page.color": "Sidefarve:",
    "pattern.worksheet.apply.size": "Anvend Størrelse",
    "pattern.worksheet.background.title": "Baggrund",
    "pattern.worksheet.background.theme": "Baggrundstema:",
    "pattern.worksheet.background.message": "Vælg et tema.",
    "pattern.worksheet.background.opacity": "Baggrunds Gennemsigtighed:",
    "pattern.worksheet.border.title": "Ramme",
    "pattern.worksheet.border.theme": "Rammetema:",
    "pattern.worksheet.border.message": "Vælg et tema.",
    "pattern.worksheet.border.opacity": "Ramme Gennemsigtighed:",

    // ===== 5. COMMON (2 items) =====
    "common.none": "Ingen",
    "common.grayscale": "Gråtoner",

    // ===== 6. TEXT TOOLS (18 items) =====
    "pattern.worksheet.text.add.new": "Tilføj Ny Tekst",
    "pattern.worksheet.text.content": "Indhold:",
    "pattern.worksheet.text.placeholder": "Hej!",
    "pattern.worksheet.text.add.button": "Tilføj Tekst",
    "pattern.worksheet.text.properties": "Egenskaber for Markeret Tekst",
    "pattern.worksheet.text.color": "Farve:",
    "pattern.worksheet.text.size": "Størrelse:",
    "pattern.worksheet.text.font": "Skrifttype:",
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",
    "pattern.worksheet.text.outline.color": "Konturfarve:",
    "pattern.worksheet.text.outline.width": "Kontur (0-10):",
    "pattern.worksheet.text.default": "Ny Tekst",

    // ===== 7. PATTERN CONFIGURATION (35 items) =====
    "pattern.worksheet.global.settings": "Globale Indstillinger",
    "pattern.worksheet.exercises.count": "Antal Opgaver (1-8):",
    "pattern.worksheet.overall.theme": "Overordnet Arkstema:",
    "pattern.worksheet.theme.none": "Ingen (brug individuelle indstillinger)",
    "pattern.worksheet.use.overall": "Brug Overordnet Arkstema",
    "pattern.worksheet.include.numbers": "Vis Opgavenumre",
    "pattern.worksheet.random.start": "Start med tilfældigt element",
    "pattern.worksheet.individual.settings": "Individuelle Opgaveindstillinger",
    "pattern.worksheet.configure.puzzle": "Konfigurer Opgave:",
    "pattern.worksheet.pattern.type": "Mønstertype:",
    "pattern.worksheet.pattern.ab": "AB (2 billeder)",
    "pattern.worksheet.pattern.aab": "AAB (2 billeder)",
    "pattern.worksheet.pattern.abb": "ABB (2 billeder)",
    "pattern.worksheet.pattern.abc": "ABC (3 billeder)",
    "pattern.worksheet.pattern.aabb": "AABB (2 billeder)",
    "pattern.worksheet.pattern.abbc": "ABBC (3 billeder)",
    "pattern.worksheet.pattern.aabc": "AABC (3 billeder)",
    "pattern.worksheet.pattern.abcc": "ABCC (3 billeder)",
    "pattern.worksheet.pattern.abcd": "ABCD (4 billeder)",
    "pattern.worksheet.question.type": "Spørgsmålstype:",
    "pattern.worksheet.blank.box": "Tomt Felt",
    "pattern.worksheet.choose.options": "Vælg blandt Muligheder",
    "pattern.worksheet.random.blank": "Tilfældig placering af tomt felt",
    "pattern.worksheet.images.selected": "Billeder til Valgt Opgave",
    "pattern.worksheet.image.theme": "Billedtema:",
    "pattern.worksheet.assigned.images": "Tildelte Billeder:",
    "pattern.worksheet.msg.puzzle.settings": "Indstillinger for Opgave {number}",
    "pattern.worksheet.msg.all.images": "Alle Billeder (søgning påkrævet)",
    "pattern.worksheet.msg.click.below": "Klik på et billede nedenfor",
    "pattern.worksheet.msg.element": "Element {elementSymbol}",
    "pattern.worksheet.puzzle.number": "{puzzleNumber}.",
    "pattern.worksheet.question.mark": "?",

    // ===== 8. IMAGE LIBRARY (4 items) =====
    "pattern.worksheet.search.images": "Søg Billeder:",
    "pattern.worksheet.search.placeholder": "f.eks. æble, bil",
    "pattern.worksheet.available.images": "Tilgængelige Billeder (klik for at tildele):",
    "pattern.worksheet.select.theme": "Vælg et tema for at se billeder.",

    // ===== 9. UPLOAD SECTION (3 items) =====
    "pattern.worksheet.upload.select": "Vælg billede(r) til upload:",
    "pattern.worksheet.uploaded.images": "Dine Uploadede Billeder:",
    "pattern.worksheet.uploaded.placeholder": "Dine uploadede billeder vises her.",

    // ===== 10. TOOLBAR (15 items) =====
    "toolbar.layers": "Lag",
    "toolbar.bring.forward": "Flyt Fremad",
    "toolbar.send.backward": "Flyt Bagud",
    "toolbar.align": "Juster",
    "toolbar.align.selected": "Juster Markering:",
    "toolbar.align.left": "Venstrejuster",
    "toolbar.center.h": "Centrer Vandret",
    "toolbar.align.right": "Højrejuster",
    "toolbar.align.top": "Juster Øverst",
    "toolbar.center.v": "Centrer Lodret",
    "toolbar.align.bottom": "Juster Nederst",
    "toolbar.align.to.page": "Juster til Side:",
    "toolbar.center.page.h": "Centrer på Siden Vandret",
    "toolbar.center.page.v": "Centrer på Siden Lodret",
    "toolbar.delete": "Slet Markering",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "pattern.worksheet.generate": "Opret",
    "pattern.worksheet.generate.worksheet": "Opret Opgaveark",
    "pattern.worksheet.generate.answer": "Opret Facit",
    "pattern.worksheet.download": "Download",
    "pattern.worksheet.download.worksheet.jpeg": "Opgaveark (JPEG)",
    "pattern.worksheet.download.answer.jpeg": "Facit (JPEG)",
    "pattern.worksheet.download.worksheet.pdf": "Opgaveark (PDF)",
    "pattern.worksheet.download.answer.pdf": "Facit (PDF)",
    "pattern.worksheet.clear.all": "Ryd Alt",

    // ===== 12. TABS (2 items) =====
    "pattern.worksheet.tab.worksheet": "Opgaveark",
    "pattern.worksheet.tab.answer": "Facit",

    // ===== 13. LOADING & SEARCH MESSAGES (5 items) =====
    "pattern.worksheet.msg.cleared": "Alle indstillinger er ryddet.",
    "pattern.worksheet.msg.loading": "Indlæser billeder...",
    "pattern.worksheet.msg.loading.error": "Fejl ved indlæsning af billeder.",
    "pattern.worksheet.msg.no.images": "Ingen billeder fundet{query}.",
    "pattern.worksheet.msg.loading.simple": "Indlæser...",

    // ===== 14. PATTERN CONFIGURATION MESSAGES (8 items) =====
    "pattern.worksheet.msg.already.assigned": "Dette billede er allerede tildelt denne opgave.",
    "pattern.worksheet.msg.slots.full": "Alle billedpladser til dette mønster er optaget. Klik først på et tildelt billede for at fjerne det.",
    "pattern.worksheet.msg.building": "Opretter opgavedata...",
    "pattern.worksheet.msg.build.failed": "Kunne ikke oprette data. Kontroller indstillingerne.",
    "pattern.worksheet.msg.rendering": "Opretter opgaveark...",
    "pattern.worksheet.msg.generated": "Opgavearket er oprettet!",
    "pattern.worksheet.msg.select.theme.required": "Vælg et overordnet tema eller fravælg 'Brug Overordnet Arkstema'.",
    "pattern.worksheet.msg.incomplete.puzzle": "Opgave {number} er ufuldstændig og vil blive genereret tilfældigt.",

    // ===== 15. ANSWER KEY MESSAGES (4 items) =====
    "pattern.worksheet.msg.generate.first": "Opret et opgaveark først.",
    "pattern.worksheet.msg.rendering.answer": "Opretter facit...",
    "pattern.worksheet.msg.answer.generated": "Facit oprettet!",

    // ===== 16. DOWNLOAD & EXPORT MESSAGES (17 items) =====
    "pattern.worksheet.msg.empty.page": "Kan ikke downloade, den valgte side er tom.",
    "pattern.worksheet.msg.preparing": "Forbereder {format}...",
    "pattern.worksheet.msg.download.initiated": "Download startet!",
    "pattern.worksheet.msg.file.error": "Fejl ved oprettelse af fil: {message}",
    "pattern.worksheet.watermark.main": "GRATIS VERSION - LessonCraftStudio.com",
    "pattern.worksheet.watermark.small": "GRATIS VERSION",
    "pattern.worksheet.msg.generate.content.first": "Opret indhold først.",
    "pattern.worksheet.msg.preparing.pdf": "Forbereder PDF...",
    "pattern.worksheet.msg.pdf.downloaded": "PDF downloadet!",
    "pattern.worksheet.msg.pdf.downloaded.alt": "PDF downloadet!",
    "pattern.worksheet.msg.pdf.error": "Fejl ved oprettelse af PDF.",
    "pattern.worksheet.msg.pdf.error.detailed": "Fejl ved oprettelse af PDF: {message}",
    "pattern.worksheet.msg.generate.worksheet.first": "Opret et opgaveark først.",
    "pattern.worksheet.msg.preparing.jpeg": "Forbereder JPEG...",
    "pattern.worksheet.msg.jpeg.initiated": "JPEG-download startet!",
    "pattern.worksheet.msg.jpeg.error": "Fejl ved forberedelse af JPEG.",

    // ===== 17. ASSET MANAGEMENT MESSAGES (4 items) =====
    "pattern.worksheet.msg.select.asset.theme": "Vælg et tema for at se {type}er.",
    "pattern.worksheet.msg.error.loading": "Fejl ved indlæsning.",
    "pattern.worksheet.msg.asset.failed": "Kunne ikke indlæse billedressource."
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'da', params = {}) {
  const translation = PATTERN_WORKSHEET_DANISH_TRANSLATIONS[locale]?.[key] || key;
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
    PATTERN_WORKSHEET_DANISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}