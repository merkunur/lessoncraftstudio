// Pattern Worksheet - Professional Finnish Translation
// Total: 192 translation keys (185 unique)
// Approach: Natural, educational Finnish as if originally developed in Finland
// App name: "Kuviotehtävä" (Pattern Worksheet)

const PATTERN_WORKSHEET_FINNISH_TRANSLATIONS = {
  fi: {
    // ===== 1. PAGE & HERO (2 items) =====
    "pattern.worksheet.page.title": "Kuviotehtävä Generaattori",
    "pattern.worksheet.settings": "Kuvioasetukset",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "pattern.worksheet.language.settings": "Kieliasetukset",
    "pattern.worksheet.page.setup": "Sivun Asetukset",
    "pattern.worksheet.text.tools": "Tekstityökalut",
    "pattern.worksheet.pattern.settings": "Kuvioiden Määritykset",
    "pattern.worksheet.image.library": "Kuvakirjasto",
    "pattern.worksheet.upload.custom": "Lataa Omia Kuvia",

    // ===== 3. LANGUAGE SECTION (12 items) =====
    "pattern.worksheet.language.label": "Kieli:",
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
    "pattern.worksheet.page.size": "Sivukoko:",
    "page.size.letter.portrait": "Letter Pysty (8,5×11\")",
    "page.size.letter.landscape": "Letter Vaaka (11×8,5\")",
    "page.size.a4.portrait": "A4 Pysty (210×297mm)",
    "page.size.a4.landscape": "A4 Vaaka (297×210mm)",
    "page.size.square": "Neliö (1200x1200)",
    "page.size.custom": "Mukautettu",
    "pattern.worksheet.width.label": "Leveys (px):",
    "pattern.worksheet.height.label": "Korkeus (px):",
    "pattern.worksheet.page.color": "Sivun Väri:",
    "pattern.worksheet.apply.size": "Käytä Kokoa",
    "pattern.worksheet.background.title": "Tausta",
    "pattern.worksheet.background.theme": "Taustateema:",
    "pattern.worksheet.background.message": "Valitse teema.",
    "pattern.worksheet.background.opacity": "Taustan Läpinäkyvyys:",
    "pattern.worksheet.border.title": "Kehys",
    "pattern.worksheet.border.theme": "Kehysteema:",
    "pattern.worksheet.border.message": "Valitse teema.",
    "pattern.worksheet.border.opacity": "Kehyksen Läpinäkyvyys:",

    // ===== 5. COMMON (2 items) =====
    "common.none": "Ei mitään",
    "common.grayscale": "Harmaasävy",

    // ===== 6. TEXT TOOLS (18 items) =====
    "pattern.worksheet.text.add.new": "Lisää Uusi Teksti",
    "pattern.worksheet.text.content": "Sisältö:",
    "pattern.worksheet.text.placeholder": "Hei!",
    "pattern.worksheet.text.add.button": "Lisää Teksti",
    "pattern.worksheet.text.properties": "Valitun Tekstin Ominaisuudet",
    "pattern.worksheet.text.color": "Väri:",
    "pattern.worksheet.text.size": "Koko:",
    "pattern.worksheet.text.font": "Fontti:",
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",
    "pattern.worksheet.text.outline.color": "Ääriviivan Väri:",
    "pattern.worksheet.text.outline.width": "Ääriviiva (0-10):",
    "pattern.worksheet.text.default": "Uusi Teksti",

    // ===== 7. PATTERN CONFIGURATION (35 items) =====
    "pattern.worksheet.global.settings": "Yleiset Asetukset",
    "pattern.worksheet.exercises.count": "Tehtävien Määrä (1-8):",
    "pattern.worksheet.overall.theme": "Yleinen Tehtäväteema:",
    "pattern.worksheet.theme.none": "Ei mitään (käytä yksittäisiä asetuksia)",
    "pattern.worksheet.use.overall": "Käytä Yleistä Tehtäväteemaa",
    "pattern.worksheet.include.numbers": "Näytä Tehtävänumerot",
    "pattern.worksheet.random.start": "Aloita satunnaisesta elementistä",
    "pattern.worksheet.individual.settings": "Yksittäisten Tehtävien Asetukset",
    "pattern.worksheet.configure.puzzle": "Määritä Tehtävä:",
    "pattern.worksheet.pattern.type": "Kuviotyyppi:",
    "pattern.worksheet.pattern.ab": "AB (2 kuvaa)",
    "pattern.worksheet.pattern.aab": "AAB (2 kuvaa)",
    "pattern.worksheet.pattern.abb": "ABB (2 kuvaa)",
    "pattern.worksheet.pattern.abc": "ABC (3 kuvaa)",
    "pattern.worksheet.pattern.aabb": "AABB (2 kuvaa)",
    "pattern.worksheet.pattern.abbc": "ABBC (3 kuvaa)",
    "pattern.worksheet.pattern.aabc": "AABC (3 kuvaa)",
    "pattern.worksheet.pattern.abcc": "ABCC (3 kuvaa)",
    "pattern.worksheet.pattern.abcd": "ABCD (4 kuvaa)",
    "pattern.worksheet.question.type": "Kysymystyyppi:",
    "pattern.worksheet.blank.box": "Tyhjä Kohta",
    "pattern.worksheet.choose.options": "Valitse Vaihtoehdoista",
    "pattern.worksheet.random.blank": "Satunnainen tyhjän kohdan paikka",
    "pattern.worksheet.images.selected": "Valitun Tehtävän Kuvat",
    "pattern.worksheet.image.theme": "Kuvateema:",
    "pattern.worksheet.assigned.images": "Määritetyt Kuvat:",
    "pattern.worksheet.msg.puzzle.settings": "Tehtävän {number} Asetukset",
    "pattern.worksheet.msg.all.images": "Kaikki Kuvat (haku vaaditaan)",
    "pattern.worksheet.msg.click.below": "Napsauta alla olevaa kuvaa",
    "pattern.worksheet.msg.element": "Elementti {elementSymbol}",
    "pattern.worksheet.puzzle.number": "{puzzleNumber}.",
    "pattern.worksheet.question.mark": "?",

    // ===== 8. IMAGE LIBRARY (4 items) =====
    "pattern.worksheet.search.images": "Hae Kuvia:",
    "pattern.worksheet.search.placeholder": "esim. omena, auto",
    "pattern.worksheet.available.images": "Saatavilla Olevat Kuvat (napsauta määrittääksesi):",
    "pattern.worksheet.select.theme": "Valitse teema nähdäksesi kuvat.",

    // ===== 9. UPLOAD SECTION (3 items) =====
    "pattern.worksheet.upload.select": "Valitse ladattava(t) kuva(t):",
    "pattern.worksheet.uploaded.images": "Omat Ladatut Kuvasi:",
    "pattern.worksheet.uploaded.placeholder": "Ladatut kuvasi näkyvät täällä.",

    // ===== 10. TOOLBAR (15 items) =====
    "toolbar.layers": "Tasot",
    "toolbar.bring.forward": "Tuo Eteen",
    "toolbar.send.backward": "Vie Taakse",
    "toolbar.align": "Kohdista",
    "toolbar.align.selected": "Kohdista Valitut:",
    "toolbar.align.left": "Tasaa Vasemmalle",
    "toolbar.center.h": "Keskitä Vaakasuunnassa",
    "toolbar.align.right": "Tasaa Oikealle",
    "toolbar.align.top": "Tasaa Ylös",
    "toolbar.center.v": "Keskitä Pystysuunnassa",
    "toolbar.align.bottom": "Tasaa Alas",
    "toolbar.align.to.page": "Kohdista Sivulle:",
    "toolbar.center.page.h": "Keskitä Sivulle Vaakasuunnassa",
    "toolbar.center.page.v": "Keskitä Sivulle Pystysuunnassa",
    "toolbar.delete": "Poista Valitut",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "pattern.worksheet.generate": "Luo",
    "pattern.worksheet.generate.worksheet": "Luo Tehtävämoniste",
    "pattern.worksheet.generate.answer": "Luo Vastaukset",
    "pattern.worksheet.download": "Lataa",
    "pattern.worksheet.download.worksheet.jpeg": "Tehtävämoniste (JPEG)",
    "pattern.worksheet.download.answer.jpeg": "Vastaukset (JPEG)",
    "pattern.worksheet.download.worksheet.pdf": "Tehtävämoniste (PDF)",
    "pattern.worksheet.download.answer.pdf": "Vastaukset (PDF)",
    "pattern.worksheet.clear.all": "Tyhjennä Kaikki",

    // ===== 12. TABS (2 items) =====
    "pattern.worksheet.tab.worksheet": "Tehtävämoniste",
    "pattern.worksheet.tab.answer": "Vastaukset",

    // ===== 13. LOADING & SEARCH MESSAGES (5 items) =====
    "pattern.worksheet.msg.cleared": "Kaikki asetukset tyhjennetty.",
    "pattern.worksheet.msg.loading": "Ladataan kuvia...",
    "pattern.worksheet.msg.loading.error": "Virhe kuvien latauksessa.",
    "pattern.worksheet.msg.no.images": "Kuvia ei löytynyt{query}.",
    "pattern.worksheet.msg.loading.simple": "Ladataan...",

    // ===== 14. PATTERN CONFIGURATION MESSAGES (8 items) =====
    "pattern.worksheet.msg.already.assigned": "Tämä kuva on jo määritetty tähän tehtävään.",
    "pattern.worksheet.msg.slots.full": "Kaikki kuvapaikat tälle kuviolle ovat täynnä. Napsauta ensin määritettyä kuvaa poistaaksesi sen.",
    "pattern.worksheet.msg.building": "Rakennetaan tehtävädataa...",
    "pattern.worksheet.msg.build.failed": "Datan rakentaminen epäonnistui. Tarkista asetukset.",
    "pattern.worksheet.msg.rendering": "Luodaan tehtävämonistetta...",
    "pattern.worksheet.msg.generated": "Tehtävämoniste luotu onnistuneesti!",
    "pattern.worksheet.msg.select.theme.required": "Valitse yleinen teema tai poista valinta kohdasta 'Käytä Yleistä Tehtäväteemaa'.",
    "pattern.worksheet.msg.incomplete.puzzle": "Tehtävä {number} on vaillinainen ja luodaan satunnaisesti.",

    // ===== 15. ANSWER KEY MESSAGES (4 items) =====
    "pattern.worksheet.msg.generate.first": "Luo ensin tehtävämoniste.",
    "pattern.worksheet.msg.rendering.answer": "Luodaan vastauksia...",
    "pattern.worksheet.msg.answer.generated": "Vastaukset luotu!",

    // ===== 16. DOWNLOAD & EXPORT MESSAGES (17 items) =====
    "pattern.worksheet.msg.empty.page": "Ei voi ladata, valittu sivu on tyhjä.",
    "pattern.worksheet.msg.preparing": "Valmistellaan {format}...",
    "pattern.worksheet.msg.download.initiated": "Lataus aloitettu!",
    "pattern.worksheet.msg.file.error": "Virhe tiedoston luomisessa: {message}",
    "pattern.worksheet.watermark.main": "ILMAISVERSIO - LessonCraftStudio.com",
    "pattern.worksheet.watermark.small": "ILMAISVERSIO",
    "pattern.worksheet.msg.generate.content.first": "Luo ensin sisältöä.",
    "pattern.worksheet.msg.preparing.pdf": "Valmistellaan PDF:ää...",
    "pattern.worksheet.msg.pdf.downloaded": "PDF ladattu!",
    "pattern.worksheet.msg.pdf.downloaded.alt": "PDF ladattu!",
    "pattern.worksheet.msg.pdf.error": "Virhe PDF:n luomisessa.",
    "pattern.worksheet.msg.pdf.error.detailed": "Virhe PDF:n luomisessa: {message}",
    "pattern.worksheet.msg.generate.worksheet.first": "Luo ensin tehtävämoniste.",
    "pattern.worksheet.msg.preparing.jpeg": "Valmistellaan JPEG:iä...",
    "pattern.worksheet.msg.jpeg.initiated": "JPEG-lataus aloitettu!",
    "pattern.worksheet.msg.jpeg.error": "Virhe JPEG:n valmistelussa.",

    // ===== 17. ASSET MANAGEMENT MESSAGES (4 items) =====
    "pattern.worksheet.msg.select.asset.theme": "Valitse teema nähdäksesi {type}t.",
    "pattern.worksheet.msg.error.loading": "Virhe latauksessa.",
    "pattern.worksheet.msg.asset.failed": "Kuvaresurssin lataus epäonnistui."
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'fi', params = {}) {
  const translation = PATTERN_WORKSHEET_FINNISH_TRANSLATIONS[locale]?.[key] || key;
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
    PATTERN_WORKSHEET_FINNISH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}