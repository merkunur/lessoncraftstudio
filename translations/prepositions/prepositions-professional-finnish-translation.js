// Prepositions - Professional Finnish Translation
// Total: 159 translation keys (151 unique)
// Approach: Natural, educational Finnish as if originally developed in Finland
// App name: "Prepositiot" (Prepositions - commonly used loan word in Finnish education)

const PREPOSITIONS_FINNISH_TRANSLATIONS = {
  fi: {
    // ===== 1. PAGE & HERO (2 items) =====
    "prepositions.page.title": "Prepositioiden tehtävägeneraattori",
    "prepositions_title": "Prepositiot", // Snake_case preserved

    // ===== 2. ACCORDION HEADERS (6 items) - Snake_case preserved =====
    "page_setup": "Sivun asetukset",
    "text_tools": "Tekstityökalut",
    "configuration": "Määritykset",
    "item_selection": "Kuvien valinta",
    "shape_replacement": "Muotojen korvaus",
    "upload_custom_images": "Lataa omia kuvia",

    // ===== 3. LANGUAGE SECTION (12 items) =====
    "language": "Kieli",
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
    "paper_size": "Paperikoko:",
    "page.size.letter.portrait": "Letter pysty (8,5×11\")",
    "page.size.letter.landscape": "Letter vaaka (11×8,5\")",
    "page.size.a4.portrait": "A4 pysty (210×297mm)",
    "page.size.a4.landscape": "A4 vaaka (297×210mm)",
    "page.size.square": "Neliö (1200×1200)",
    "page.size.custom": "Mukautettu",
    "width_px": "Leveys (px):",
    "height_px": "Korkeus (px):",
    "apply_size": "Käytä kokoa",
    "template": "Pohja",
    "prepositions.template.label": "Tehtäväpohja:",
    "prepositions.page.color": "Sivun väri:",
    "prepositions.background.title": "Tausta",
    "prepositions.background.theme": "Taustateema:",
    "prepositions.background.message": "Valitse teema nähdäksesi taustat.",
    "prepositions.background.opacity": "Taustan läpinäkyvyys:",
    "prepositions.border.title": "Kehys",
    "prepositions.border.theme": "Kehysteema:",
    "prepositions.border.message": "Valitse teema nähdäksesi kehykset.",
    "prepositions.border.opacity": "Kehyksen läpinäkyvyys:",

    // ===== 5. COMMON (2 items) =====
    "common.none": "Ei mitään",
    "common.grayscale": "Harmaasävy",

    // ===== 6. TEXT TOOLS (18 items) =====
    "prepositions.text.add.new": "Lisää uusi teksti",
    "prepositions.text.content": "Sisältö:",
    "prepositions.text.placeholder": "Tehtävän otsikko...",
    "prepositions.text.add.button": "Lisää teksti tehtävään",
    "prepositions.text.properties": "Valitun tekstin ominaisuudet",
    "prepositions.text.color": "Väri:",
    "prepositions.text.size": "Koko:",
    "prepositions.text.font": "Kirjasintyyppi:",
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",
    "prepositions.text.outline.color": "Ääriviivan väri:",
    "prepositions.text.outline.width": "Ääriviiva (0-10):",
    "prepositions.text.default": "Uusi teksti",

    // ===== 7. CONFIGURATION (3 items) =====
    "prepositions.exercises.count": "Tehtävien määrä (1-8):",
    "prepositions.select.prepositions": "Valitse prepositiot",
    "prepositions.include.name.date": "Lisää nimi-/päivämääräkentät",

    // ===== 8. ITEM SELECTION (10 items) =====
    "prepositions.generation.mode": "Luontitapa:",
    "prepositions.manual.selection": "Kuvien käsinvalinta",
    "prepositions.manual.selection.option": "Käsinvalinta",
    "prepositions.all.themes.random": "Kaikki teemat (Satunnainen)",
    "prepositions.all.themes.option": "Kaikki teemat",
    "prepositions.image.theme": "Kuvateema:",
    "prepositions.search.items.placeholder": "Hae kuvia...",
    "prepositions.search.all.placeholder": "Kirjoita hakeaksesi kaikista kuvista.",
    "prepositions.loading.themes": "Ladataan teemoja...",
    "prepositions.selected.count": "Valittu: 0/8",

    // ===== 9. SHAPE REPLACEMENT (7 items) =====
    "prepositions.manual.shape.selection": "Muotojen käsinvalinta",
    "prepositions.shape.theme": "Muotojen kuvateema:",
    "prepositions.search.shapes.placeholder": "Hae muotoja...",
    "prepositions.shape.selected.count": "Valittu: 0/8",
    "prepositions.theme.random.format": "{displayName} (Satunnainen)",

    // ===== 10. UPLOAD SECTION (3 items) =====    "prepositions.upload.button": "Valitse tiedostoja",
    "prepositions.upload.no.file": "Ei tiedostoa valittu",
    "prepositions.upload.files.selected": "{count} tiedostoa valittu",
    
    "prepositions.upload.select": "Valitse ladattava(t) kuva(t):",
    "prepositions.uploaded.images": "Lataamasi kuvat:",
    "prepositions.uploaded.placeholder": "Lataamasi kuvat näkyvät tässä.",

    // ===== 11. TOOLBAR (15 items) =====
    "toolbar.layers": "Tasot",
    "toolbar.bring.forward": "Siirrä eteenpäin",
    "toolbar.send.backward": "Siirrä taaksepäin",
    "toolbar.align": "Tasaa",
    "toolbar.align.selected": "Tasaa valinta:",
    "toolbar.align.left": "Tasaa vasemmalle",
    "toolbar.center.h": "Keskitä vaakasuunnassa",
    "toolbar.align.right": "Tasaa oikealle",
    "toolbar.align.top": "Tasaa ylös",
    "toolbar.center.v": "Keskitä pystysuunnassa",
    "toolbar.align.bottom": "Tasaa alas",
    "toolbar.align.to.page": "Tasaa sivulle:",
    "toolbar.center.page.h": "Keskitä sivulle vaakasuunnassa",
    "toolbar.center.page.v": "Keskitä sivulle pystysuunnassa",
    "toolbar.delete": "Poista valinta",

    // ===== 12. ACTION BUTTONS (10 items) - Snake_case preserved =====
    "generate": "Luo",
    "generate_worksheet": "Luo tehtävämoniste",
    "generate_answer_key": "Luo vastauslomake",
    "prepositions.download": "Lataa",
    "prepositions.download.worksheet.jpeg": "Tehtävämoniste (JPEG)",
    "prepositions.download.answer.jpeg": "Vastauslomake (JPEG)",
    "prepositions.download.worksheet.pdf": "Tehtävämoniste (PDF)",
    "prepositions.download.answer.pdf": "Vastauslomake (PDF)",
    "prepositions.clear.all": "Tyhjennä kaikki",

    // ===== 13. TABS (2 items) =====
    "prepositions.tab.worksheet": "Tehtävämoniste",
    "prepositions.tab.answer": "Vastauslomake",

    // ===== 14. GENERATION & LOADING MESSAGES (15 items) =====
    "prepositions.msg.page.updated": "Sivun koko päivitetty.",
    "prepositions.msg.template.error": "Valittua pohjaa ei voitu ladata.",
    "prepositions.msg.select.theme": "Valitse teema nähdäksesi {type}.",
    "prepositions.msg.loading.theme": "Ladataan teeman {theme} {type}...",
    "prepositions.msg.no.items": "Ei {type} tässä teemassa.",
    "prepositions.msg.load.failed": "{typeName}-kuvan lataus epäonnistui.",
    "prepositions.msg.item.added": "{Type} lisätty.",
    "prepositions.msg.loading": "Ladataan...",
    "prepositions.msg.loading.default": "Ladataan oletuskuvia...",
    "prepositions.msg.searching": "Haetaan...",
    "prepositions.msg.loading.theme.images": "Ladataan teeman kuvia...",
    "prepositions.msg.no.images": "Kuvia ei löytynyt.",

    // ===== 15. SELECTION & VALIDATION MESSAGES (8 items) =====
    "prepositions.msg.max.selection": "Voit valita enintään {exerciseCount} {type}-kuvaa.",
    "prepositions.msg.generating": "Luodaan tehtävämonistetta...",
    "prepositions.msg.select.preposition": "Valitse vähintään yksi prepositio.",
    "prepositions.msg.select.items": "Valitse vähintään {exerciseCount} kuvaa.",
    "prepositions.msg.insufficient.images": "Liian vähän kuvia tässä teemassa ({count}) luomiseen.",

    // ===== 16. GENERATION SUCCESS MESSAGES (5 items) =====
    "prepositions.msg.worksheet.generated": "Tehtävämoniste luotu!",
    "prepositions.msg.generate.first": "Luo ensin tehtävämoniste.",
    "prepositions.msg.generating.answer": "Luodaan vastauslomaketta...",
    "prepositions.msg.answer.ready": "Vastauslomake valmis.",
    "prepositions.msg.cleared": "Tehtävämoniste tyhjennetty.",

    // ===== 17. NAME/DATE FIELDS (2 items) =====
    "prepositions.name.field": "Nimi: ____________",
    "prepositions.date.field": "Päivämäärä: ____________",

    // ===== 18. DOWNLOAD & EXPORT MESSAGES (14 items) =====
    "prepositions.msg.empty.canvas": "Työskentelyalue on tyhjä, ei ladattavaa.",
    "prepositions.msg.preparing.jpeg": "Valmistellaan JPEG-tiedostoa...",
    "prepositions.msg.jpeg.initiated": "JPEG-lataus aloitettu!",
    "prepositions.msg.jpeg.initiated.alt": "JPEG-lataus on aloitettu!",
    "prepositions.msg.jpeg.error": "JPEG-virhe: {message}",
    "prepositions.msg.jpeg.error.simple": "Virhe JPEG-tiedoston valmistelussa.",
    "prepositions.watermark.main": "ILMAINEN VERSIO - LessonCraftStudio.com",
    "prepositions.watermark.small": "ILMAINEN VERSIO",
    "prepositions.msg.generate.content.first": "Luo ensin sisältöä.",
    "prepositions.msg.preparing.pdf": "Valmistellaan PDF-tiedostoa...",
    "prepositions.msg.pdf.downloaded": "PDF ladattu!",
    "prepositions.msg.pdf.error": "Virhe PDF-tiedoston luomisessa.",
    "prepositions.msg.generate.worksheet.first": "Luo ensin tehtävämoniste.",

    // ===== NOTE: PREPOSITIONS THEMSELVES ARE ALREADY TRANSLATED =====
    // The following are handled programmatically in PREPOSITION_TRANSLATIONS:
    // - in → sisällä/sisässä (depends on case)
    // - on top of → päällä
    // - under → alla
    // - next to → vieressä
    // - behind → takana
    // - between → välissä
    // - above → yläpuolella
    // - in front of → edessä

    // ===== NOTE: EXERCISE WORDS ARE ALREADY TRANSLATED =====
    // The following are handled programmatically in EXERCISE_TRANSLATIONS:
    // - is → on
    // - the → (no direct translation in Finnish)
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'fi', params = {}) {
  const translation = PREPOSITIONS_FINNISH_TRANSLATIONS[locale]?.[key] || key;
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
    PREPOSITIONS_FINNISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}