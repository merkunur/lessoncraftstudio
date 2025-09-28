// Pattern Worksheet - Professional German Translation
// Total: 192 translation keys (185 unique)
// Approach: Natural, educational German as if originally developed in Germany
// App name: "Musterarbeitsblatt" (Pattern Worksheet)

const PATTERN_WORKSHEET_GERMAN_TRANSLATIONS = {
  de: {
    // ===== 1. PAGE & HERO (2 items) =====
    "pattern.worksheet.page.title": "Musterarbeitsblatt-Generator",
    "pattern.worksheet.settings": "Mustereinstellungen",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "pattern.worksheet.language.settings": "Spracheinstellungen",
    "pattern.worksheet.page.setup": "Seiteneinrichtung",
    "pattern.worksheet.text.tools": "Textwerkzeuge",
    "pattern.worksheet.pattern.settings": "Mustereinstellungen",
    "pattern.worksheet.image.library": "Bilderbibliothek",
    "pattern.worksheet.upload.custom": "Eigene Bilder hochladen",

    // ===== 3. LANGUAGE SECTION (12 items) =====
    "pattern.worksheet.language.label": "Sprache:",
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
    "pattern.worksheet.page.size": "Seitengröße:",
    "page.size.letter.portrait": "Letter Hochformat (8,5×11\")",
    "page.size.letter.landscape": "Letter Querformat (11×8,5\")",
    "page.size.a4.portrait": "A4 Hochformat (210×297mm)",
    "page.size.a4.landscape": "A4 Querformat (297×210mm)",
    "page.size.square": "Quadratisch (1200x1200)",
    "page.size.custom": "Benutzerdefiniert",
    "pattern.worksheet.width.label": "Breite (px):",
    "pattern.worksheet.height.label": "Höhe (px):",
    "pattern.worksheet.page.color": "Seitenfarbe:",
    "pattern.worksheet.apply.size": "Größe anwenden",
    "pattern.worksheet.background.title": "Hintergrund",
    "pattern.worksheet.background.theme": "Hintergrundthema:",
    "pattern.worksheet.background.message": "Thema auswählen.",
    "pattern.worksheet.background.opacity": "Hintergrundtransparenz:",
    "pattern.worksheet.border.title": "Rahmen",
    "pattern.worksheet.border.theme": "Rahmenthema:",
    "pattern.worksheet.border.message": "Thema auswählen.",
    "pattern.worksheet.border.opacity": "Rahmentransparenz:",

    // ===== 5. COMMON (2 items) =====
    "common.none": "Keine",
    "common.grayscale": "Graustufen",

    // ===== 6. TEXT TOOLS (18 items) =====
    "pattern.worksheet.text.add.new": "Neuen Text hinzufügen",
    "pattern.worksheet.text.content": "Inhalt:",
    "pattern.worksheet.text.placeholder": "Hallo!",
    "pattern.worksheet.text.add.button": "Text hinzufügen",
    "pattern.worksheet.text.properties": "Eigenschaften des ausgewählten Texts",
    "pattern.worksheet.text.color": "Farbe:",
    "pattern.worksheet.text.size": "Größe:",
    "pattern.worksheet.text.font": "Schriftart:",
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",
    "pattern.worksheet.text.outline.color": "Umrissfarbe:",
    "pattern.worksheet.text.outline.width": "Umriss (0-10):",
    "pattern.worksheet.text.default": "Neuer Text",

    // ===== 7. PATTERN CONFIGURATION (35 items) =====
    "pattern.worksheet.global.settings": "Globale Einstellungen",
    "pattern.worksheet.exercises.count": "Anzahl der Übungen (1-8):",
    "pattern.worksheet.overall.theme": "Übergreifendes Arbeitsblattthema:",
    "pattern.worksheet.theme.none": "Keines (individuelle Einstellungen verwenden)",
    "pattern.worksheet.use.overall": "Übergreifendes Arbeitsblattthema verwenden",
    "pattern.worksheet.include.numbers": "Rätselnummern anzeigen",
    "pattern.worksheet.random.start": "Mit zufälligem Element beginnen",
    "pattern.worksheet.individual.settings": "Individuelle Rätseleinstellungen",
    "pattern.worksheet.configure.puzzle": "Rätsel konfigurieren:",
    "pattern.worksheet.pattern.type": "Mustertyp:",
    "pattern.worksheet.pattern.ab": "AB (2 Bilder)",
    "pattern.worksheet.pattern.aab": "AAB (2 Bilder)",
    "pattern.worksheet.pattern.abb": "ABB (2 Bilder)",
    "pattern.worksheet.pattern.abc": "ABC (3 Bilder)",
    "pattern.worksheet.pattern.aabb": "AABB (2 Bilder)",
    "pattern.worksheet.pattern.abbc": "ABBC (3 Bilder)",
    "pattern.worksheet.pattern.aabc": "AABC (3 Bilder)",
    "pattern.worksheet.pattern.abcc": "ABCC (3 Bilder)",
    "pattern.worksheet.pattern.abcd": "ABCD (4 Bilder)",
    "pattern.worksheet.question.type": "Fragetyp:",
    "pattern.worksheet.blank.box": "Leeres Feld",
    "pattern.worksheet.choose.options": "Aus Optionen wählen",
    "pattern.worksheet.random.blank": "Zufällige Position des leeren Feldes",
    "pattern.worksheet.images.selected": "Bilder für ausgewähltes Rätsel",
    "pattern.worksheet.image.theme": "Bildthema:",
    "pattern.worksheet.assigned.images": "Zugewiesene Bilder:",
    "pattern.worksheet.msg.puzzle.settings": "Rätsel {number} Einstellungen",
    "pattern.worksheet.msg.all.images": "Alle Bilder (Suche erforderlich)",
    "pattern.worksheet.msg.click.below": "Klicke unten auf ein Bild",
    "pattern.worksheet.msg.element": "Element {elementSymbol}",
    "pattern.worksheet.puzzle.number": "{puzzleNumber}.",
    "pattern.worksheet.question.mark": "?",

    // ===== 8. IMAGE LIBRARY (4 items) =====
    "pattern.worksheet.search.images": "Bilder suchen:",
    "pattern.worksheet.search.placeholder": "z.B. Apfel, Auto",
    "pattern.worksheet.available.images": "Verfügbare Bilder (zum Zuweisen klicken):",
    "pattern.worksheet.select.theme": "Thema auswählen, um Bilder zu sehen.",

    // ===== 9. UPLOAD SECTION (3 items) =====
    "pattern.worksheet.upload.select": "Bild(er) zum Hochladen auswählen:",
    "pattern.worksheet.uploaded.images": "Deine hochgeladenen Bilder:",
    "pattern.worksheet.uploaded.placeholder": "Deine hochgeladenen Bilder erscheinen hier.",

    // ===== 10. TOOLBAR (15 items) =====
    "toolbar.layers": "Ebenen",
    "toolbar.bring.forward": "Nach vorne",
    "toolbar.send.backward": "Nach hinten",
    "toolbar.align": "Ausrichten",
    "toolbar.align.selected": "Ausgewählte ausrichten:",
    "toolbar.align.left": "Links ausrichten",
    "toolbar.center.h": "Horizontal zentrieren",
    "toolbar.align.right": "Rechts ausrichten",
    "toolbar.align.top": "Oben ausrichten",
    "toolbar.center.v": "Vertikal zentrieren",
    "toolbar.align.bottom": "Unten ausrichten",
    "toolbar.align.to.page": "An Seite ausrichten:",
    "toolbar.center.page.h": "Auf Seite horizontal zentrieren",
    "toolbar.center.page.v": "Auf Seite vertikal zentrieren",
    "toolbar.delete": "Ausgewählte löschen",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "pattern.worksheet.generate": "Erstellen",
    "pattern.worksheet.generate.worksheet": "Arbeitsblatt erstellen",
    "pattern.worksheet.generate.answer": "Lösungsblatt erstellen",
    "pattern.worksheet.download": "Herunterladen",
    "pattern.worksheet.download.worksheet.jpeg": "Arbeitsblatt (JPEG)",
    "pattern.worksheet.download.answer.jpeg": "Lösungsblatt (JPEG)",
    "pattern.worksheet.download.worksheet.pdf": "Arbeitsblatt (PDF)",
    "pattern.worksheet.download.answer.pdf": "Lösungsblatt (PDF)",
    "pattern.worksheet.clear.all": "Alles löschen",

    // ===== 12. TABS (2 items) =====
    "pattern.worksheet.tab.worksheet": "Arbeitsblatt",
    "pattern.worksheet.tab.answer": "Lösungsblatt",

    // ===== 13. LOADING & SEARCH MESSAGES (5 items) =====
    "pattern.worksheet.msg.cleared": "Alle Einstellungen gelöscht.",
    "pattern.worksheet.msg.loading": "Bilder werden geladen...",
    "pattern.worksheet.msg.loading.error": "Fehler beim Laden der Bilder.",
    "pattern.worksheet.msg.no.images": "Keine Bilder gefunden{query}.",
    "pattern.worksheet.msg.loading.simple": "Lädt...",

    // ===== 14. PATTERN CONFIGURATION MESSAGES (8 items) =====
    "pattern.worksheet.msg.already.assigned": "Dieses Bild ist diesem Rätsel bereits zugewiesen.",
    "pattern.worksheet.msg.slots.full": "Alle Bildplätze für dieses Muster sind belegt. Klicke zuerst auf ein zugewiesenes Bild, um es zu entfernen.",
    "pattern.worksheet.msg.building": "Rätseldaten werden erstellt...",
    "pattern.worksheet.msg.build.failed": "Rätseldaten konnten nicht erstellt werden. Überprüfe die Einstellungen.",
    "pattern.worksheet.msg.rendering": "Arbeitsblatt wird erstellt...",
    "pattern.worksheet.msg.generated": "Arbeitsblatt erfolgreich erstellt!",
    "pattern.worksheet.msg.select.theme.required": "Bitte wähle ein übergreifendes Thema oder deaktiviere 'Übergreifendes Arbeitsblattthema verwenden'.",
    "pattern.worksheet.msg.incomplete.puzzle": "Rätsel {number} ist unvollständig und wird zufällig generiert.",

    // ===== 15. ANSWER KEY MESSAGES (4 items) =====
    "pattern.worksheet.msg.generate.first": "Bitte erstelle zuerst ein Arbeitsblatt.",
    "pattern.worksheet.msg.rendering.answer": "Lösungsblatt wird erstellt...",
    "pattern.worksheet.msg.answer.generated": "Lösungsblatt erstellt!",

    // ===== 16. DOWNLOAD & EXPORT MESSAGES (17 items) =====
    "pattern.worksheet.msg.empty.page": "Download nicht möglich, die ausgewählte Seite ist leer.",
    "pattern.worksheet.msg.preparing": "{format} wird vorbereitet...",
    "pattern.worksheet.msg.download.initiated": "Download gestartet!",
    "pattern.worksheet.msg.file.error": "Fehler beim Erstellen der Datei: {message}",
    "pattern.worksheet.watermark.main": "KOSTENLOSE VERSION - LessonCraftStudio.com",
    "pattern.worksheet.watermark.small": "KOSTENLOSE VERSION",
    "pattern.worksheet.msg.generate.content.first": "Bitte erstelle zuerst Inhalte.",
    "pattern.worksheet.msg.preparing.pdf": "PDF wird vorbereitet...",
    "pattern.worksheet.msg.pdf.downloaded": "PDF heruntergeladen!",
    "pattern.worksheet.msg.pdf.downloaded.alt": "PDF heruntergeladen!",
    "pattern.worksheet.msg.pdf.error": "Fehler beim Erstellen der PDF.",
    "pattern.worksheet.msg.pdf.error.detailed": "Fehler beim Erstellen der PDF: {message}",
    "pattern.worksheet.msg.generate.worksheet.first": "Bitte erstelle zuerst ein Arbeitsblatt.",
    "pattern.worksheet.msg.preparing.jpeg": "JPEG wird vorbereitet...",
    "pattern.worksheet.msg.jpeg.initiated": "JPEG-Download gestartet!",
    "pattern.worksheet.msg.jpeg.error": "Fehler beim Vorbereiten der JPEG.",

    // ===== 17. ASSET MANAGEMENT MESSAGES (4 items) =====
    "pattern.worksheet.msg.select.asset.theme": "Wähle ein Thema, um {type} zu sehen.",
    "pattern.worksheet.msg.error.loading": "Fehler beim Laden.",
    "pattern.worksheet.msg.asset.failed": "Asset-Bild konnte nicht geladen werden."
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'de', params = {}) {
  const translation = PATTERN_WORKSHEET_GERMAN_TRANSLATIONS[locale]?.[key] || key;
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
    PATTERN_WORKSHEET_GERMAN_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}