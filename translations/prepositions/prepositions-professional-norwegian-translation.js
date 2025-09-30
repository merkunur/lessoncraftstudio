// Prepositions - Professional Norwegian Translation (Bokmål)
// Total: 159 translation keys (151 unique)
// Approach: Natural, educational Norwegian as if originally developed in Norway
// App name: "Preposisjoner" (Prepositions - standard Norwegian grammar term)

const PREPOSITIONS_NORWEGIAN_TRANSLATIONS = {
  no: {
    // ===== 1. PAGE & HERO (2 items) =====
    "prepositions.page.title": "Preposisjoner Oppgavearkgenerator",
    "prepositions_title": "Preposisjoner", // Snake_case preserved

    // ===== 2. ACCORDION HEADERS (6 items) - Snake_case preserved =====
    "page_setup": "Sideoppsett",
    "text_tools": "Tekstverktøy",
    "configuration": "Konfigurasjon",
    "item_selection": "Velg bilder",
    "shape_replacement": "Erstatt former",
    "upload_custom_images": "Last opp egne bilder",

    // ===== 3. LANGUAGE SECTION (12 items) =====
    "language": "Språk",
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

    // ===== 4. PAGE SETUP (22 items) =====
    "paper_size": "Papirstørrelse:",
    "page.size.letter.portrait": "Letter Stående (8,5×11\")",
    "page.size.letter.landscape": "Letter Liggende (11×8,5\")",
    "page.size.a4.portrait": "A4 Stående (210×297mm)",
    "page.size.a4.landscape": "A4 Liggende (297×210mm)",
    "page.size.square": "Kvadrat (1200×1200)",
    "page.size.custom": "Tilpasset",
    "width_px": "Bredde (px):",
    "height_px": "Høyde (px):",
    "apply_size": "Bruk størrelse",
    "template": "Mal",
    "prepositions.template.label": "Oppgavearkmal:",
    "prepositions.page.color": "Sidefarge:",
    "prepositions.background.title": "Bakgrunn",
    "prepositions.background.theme": "Bakgrunnstema:",
    "prepositions.background.message": "Velg et tema for å se bakgrunner.",
    "prepositions.background.opacity": "Bakgrunns-gjennomsiktighet:",
    "prepositions.border.title": "Ramme",
    "prepositions.border.theme": "Rammetema:",
    "prepositions.border.message": "Velg et tema for å se rammer.",
    "prepositions.border.opacity": "Ramme-gjennomsiktighet:",

    // ===== 5. COMMON (2 items) =====
    "common.none": "Ingen",
    "common.grayscale": "Gråtoner",

    // ===== 6. TEXT TOOLS (18 items) =====
    "prepositions.text.add.new": "Legg til ny tekst",
    "prepositions.text.content": "Innhold:",
    "prepositions.text.placeholder": "Oppgavearktittel...",
    "prepositions.text.add.button": "Legg til tekst på oppgavearket",
    "prepositions.text.properties": "Egenskaper for valgt tekst",
    "prepositions.text.color": "Farge:",
    "prepositions.text.size": "Størrelse:",
    "prepositions.text.font": "Skrifttype:",
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",
    "prepositions.text.outline.color": "Omrissfarge:",
    "prepositions.text.outline.width": "Omriss (0-10):",
    "prepositions.text.default": "Ny tekst",

    // ===== 7. CONFIGURATION (3 items) =====
    "prepositions.exercises.count": "Antall oppgaver (1-8):",
    "prepositions.select.prepositions": "Velg preposisjoner",
    "prepositions.include.name.date": "Inkluder navn-/datofelter",

    // ===== 8. ITEM SELECTION (10 items) =====
    "prepositions.generation.mode": "Genereringsmodus:",
    "prepositions.manual.selection": "Manuelt bildevalg",
    "prepositions.manual.selection.option": "Manuelt valg",
    "prepositions.all.themes.random": "Alle temaer (Tilfeldig)",
    "prepositions.all.themes.option": "Alle temaer",
    "prepositions.image.theme": "Bildetema:",
    "prepositions.search.items.placeholder": "Søk etter bilder...",
    "prepositions.search.all.placeholder": "Skriv for å søke i alle bilder.",
    "prepositions.loading.themes": "Laster temaer...",
    "prepositions.selected.count": "Valgte: 0/8",

    // ===== 9. SHAPE REPLACEMENT (7 items) =====
    "prepositions.manual.shape.selection": "Manuelt formvalg",
    "prepositions.shape.theme": "Bildetema for former:",
    "prepositions.search.shapes.placeholder": "Søk etter former...",
    "prepositions.shape.selected.count": "Valgte: 0/8",
    "prepositions.theme.random.format": "{displayName} (Tilfeldig)",

    // ===== 10. UPLOAD SECTION (3 items) =====    "prepositions.upload.button": "Velg filer",
    "prepositions.upload.no.file": "Ingen fil valgt",
    "prepositions.upload.files.selected": "{count} filer valgt",
    
    "prepositions.upload.select": "Velg bilde(r) for opplasting:",
    "prepositions.uploaded.images": "Dine opplastede bilder:",
    "prepositions.uploaded.placeholder": "Dine opplastede bilder vises her.",

    // ===== 11. TOOLBAR (15 items) =====
    "toolbar.layers": "Lag",
    "toolbar.bring.forward": "Flytt fremover",
    "toolbar.send.backward": "Flytt bakover",
    "toolbar.align": "Juster",
    "toolbar.align.selected": "Juster markering:",
    "toolbar.align.left": "Venstrejuster",
    "toolbar.center.h": "Sentrer horisontalt",
    "toolbar.align.right": "Høyrejuster",
    "toolbar.align.top": "Juster øverst",
    "toolbar.center.v": "Sentrer vertikalt",
    "toolbar.align.bottom": "Juster nederst",
    "toolbar.align.to.page": "Juster til siden:",
    "toolbar.center.page.h": "Sentrer horisontalt på siden",
    "toolbar.center.page.v": "Sentrer vertikalt på siden",
    "toolbar.delete": "Slett markering",

    // ===== 12. ACTION BUTTONS (10 items) - Snake_case preserved =====
    "generate": "Generer",
    "generate_worksheet": "Lag oppgaveark",
    "generate_answer_key": "Lag fasit",
    "prepositions.download": "Last ned",
    "prepositions.download.worksheet.jpeg": "Oppgaveark (JPEG)",
    "prepositions.download.answer.jpeg": "Fasit (JPEG)",
    "prepositions.download.worksheet.pdf": "Oppgaveark (PDF)",
    "prepositions.download.answer.pdf": "Fasit (PDF)",
    "prepositions.clear.all": "Tøm alt",

    // ===== 13. TABS (2 items) =====
    "prepositions.tab.worksheet": "Oppgaveark",
    "prepositions.tab.answer": "Fasit",

    // ===== 14. GENERATION & LOADING MESSAGES (15 items) =====
    "prepositions.msg.page.updated": "Sidestørrelse oppdatert.",
    "prepositions.msg.template.error": "Kunne ikke laste den valgte malen.",
    "prepositions.msg.select.theme": "Velg et tema for å se {type}.",
    "prepositions.msg.loading.theme": "Laster {type} fra tema {theme}...",
    "prepositions.msg.no.items": "Ingen {type} i dette temaet.",
    "prepositions.msg.load.failed": "Kunne ikke laste {typeName}-bilde.",
    "prepositions.msg.item.added": "{Type} lagt til.",
    "prepositions.msg.loading": "Laster...",
    "prepositions.msg.loading.default": "Laster standardbilder...",
    "prepositions.msg.searching": "Søker...",
    "prepositions.msg.loading.theme.images": "Laster temabilder...",
    "prepositions.msg.no.images": "Ingen bilder funnet.",

    // ===== 15. SELECTION & VALIDATION MESSAGES (8 items) =====
    "prepositions.msg.max.selection": "Du kan bare velge opptil {exerciseCount} {type}-bilder.",
    "prepositions.msg.generating": "Lager oppgaveark...",
    "prepositions.msg.select.preposition": "Vennligst velg minst én preposisjon.",
    "prepositions.msg.select.items": "Vennligst velg minst {exerciseCount} bilder.",
    "prepositions.msg.insufficient.images": "For få bilder i dette temaet ({count}) for å generere.",

    // ===== 16. GENERATION SUCCESS MESSAGES (5 items) =====
    "prepositions.msg.worksheet.generated": "Oppgaveark laget!",
    "prepositions.msg.generate.first": "Vennligst lag et oppgaveark først.",
    "prepositions.msg.generating.answer": "Lager fasit...",
    "prepositions.msg.answer.ready": "Fasit klart.",
    "prepositions.msg.cleared": "Oppgaveark tømt.",

    // ===== 17. NAME/DATE FIELDS (2 items) =====
    "prepositions.name.field": "Navn: ____________",
    "prepositions.date.field": "Dato: ____________",

    // ===== 18. DOWNLOAD & EXPORT MESSAGES (14 items) =====
    "prepositions.msg.empty.canvas": "Arbeidsområdet er tomt, ingenting å laste ned.",
    "prepositions.msg.preparing.jpeg": "Forbereder JPEG...",
    "prepositions.msg.jpeg.initiated": "JPEG-nedlasting startet!",
    "prepositions.msg.jpeg.initiated.alt": "JPEG-nedlastingen har startet!",
    "prepositions.msg.jpeg.error": "JPEG-feil: {message}",
    "prepositions.msg.jpeg.error.simple": "Feil ved forberedelse av JPEG.",
    "prepositions.watermark.main": "GRATIS VERSJON - LessonCraftStudio.com",
    "prepositions.watermark.small": "GRATIS VERSJON",
    "prepositions.msg.generate.content.first": "Vennligst lag innhold først.",
    "prepositions.msg.preparing.pdf": "Forbereder PDF...",
    "prepositions.msg.pdf.downloaded": "PDF lastet ned!",
    "prepositions.msg.pdf.error": "Feil ved opprettelse av PDF.",
    "prepositions.msg.generate.worksheet.first": "Vennligst lag et oppgaveark først.",

    // ===== NOTE: PREPOSITIONS THEMSELVES ARE ALREADY TRANSLATED =====
    // The following are handled programmatically in PREPOSITION_TRANSLATIONS:
    // - in → i
    // - on top of → oppå
    // - under → under
    // - next to → ved siden av
    // - behind → bak
    // - between → mellom
    // - above → over
    // - in front of → foran

    // ===== NOTE: EXERCISE WORDS ARE ALREADY TRANSLATED =====
    // The following are handled programmatically in EXERCISE_TRANSLATIONS:
    // - is → er
    // - the → den (context-dependent)
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'no', params = {}) {
  const translation = PREPOSITIONS_NORWEGIAN_TRANSLATIONS[locale]?.[key] || key;
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
    PREPOSITIONS_NORWEGIAN_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}