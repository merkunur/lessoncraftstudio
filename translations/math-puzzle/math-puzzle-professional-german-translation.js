/**
 * Rechenrätsel - Professionelle deutsche Übersetzung
 * Gesamtanzahl Schlüssel: 177 + zusätzliche Fehlermeldungen
 * Sprache: Deutsch (DE)
 *
 * Übersetzung mit Fokus auf natürliches Deutsch,
 * als ob die Anwendung ursprünglich in Deutschland entwickelt wurde.
 */

const MATH_PUZZLE_TRANSLATIONS_DE = {
  "de": {
    // ============= 1. Sprachbezeichnungen (11 Schlüssel) =============
    "language.english": "Englisch",
    "language.german.full": "Deutsch",
    "language.french.full": "Français (Französisch)",
    "language.spanish.full": "Español (Spanisch)",
    "language.portuguese.full": "Português (Portugiesisch)",
    "language.italian.full": "Italiano (Italienisch)",
    "language.dutch.full": "Nederlands (Niederländisch)",
    "language.swedish.full": "Svenska (Schwedisch)",
    "language.danish.full": "Dansk (Dänisch)",
    "language.norwegian.full": "Norsk (Norwegisch)",
    "language.finnish.full": "Suomi (Finnisch)",

    // ============= 2. Hauptbenutzeroberfläche (27 Schlüssel) =============
    "mathPuzzle": "Rechenrätsel",
    "pageSettings": "Seiteneinstellungen",
    "selectLanguage": "Sprache wählen",
    "language": "Sprache:",
    "pageSize": "Seitengröße:",
    "pageColor": "Seitenfarbe:",
    "backgroundTheme": "Hintergrundthema:",
    "backgroundOpacity": "Hintergrund-Transparenz:",
    "borderTheme": "Rahmenthema:",
    "borderOpacity": "Rahmen-Transparenz:",
    "content": "Inhalt:",
    "color": "Farbe:",
    "size": "Größe:",
    "font": "Schriftart:",
    "outlineColor": "Konturfarbe:",
    "outlineWidth": "Kontur (0-10):",
    "rowsRange": "Zeilen (2–4):",
    "columnsRange": "Spalten (2–4):",
    "operation": "Rechenart:",
    "selectTheme": "Thema wählen:",
    "searchImages": "Bilder suchen:",
    "availableImages": "Verfügbare Bilder:",
    "selectedImageForPuzzle": "Ausgewähltes Bild für das Rätsel:",
    "selectImagesToUpload": "Bild(er) zum Hochladen wählen:",
    "yourUploadedImages": "Ihre hochgeladenen Bilder (diese Sitzung):",
    "alignToPage": "An Seite ausrichten:",
    "alignSelected": "Ausgewählte ausrichten:",

    // ============= 3. Seiteneinstellungen (17 Schlüssel) =============
    "mathpuzzle.page.title": "Rechenrätsel-Arbeitsblatt-Generator",
    "page.size.letter.portrait": "Letter Hochformat (8,5×11″)",
    "page.size.letter.landscape": "Letter Querformat (11×8,5″)",
    "page.size.a4.portrait": "A4 Hochformat (210×297mm)",
    "page.size.a4.landscape": "A4 Querformat (297×210mm)",
    "page.size.default": "Standard-Arbeitsblatt (800×1000)",
    "page.size.square": "Quadrat (1200×1200)",
    "mathpuzzle.apply.size.color": "Größe & Farbe anwenden",
    "mathpuzzle.background.title": "Hintergrund",
    "mathpuzzle.background.message": "Wählen Sie ein Thema für Hintergründe.",
    "mathpuzzle.border.title": "Rahmen",
    "mathpuzzle.border.message": "Wählen Sie ein Thema für Rahmen.",
    "mathpuzzle.language.description": "Bildnamen und Themen werden in der gewählten Sprache angezeigt.",
    "mathpuzzle.page.setup": "Seiteneinstellungen",
    "mathpuzzle.background.opacity": "Hintergrund-Transparenz:",
    "mathpuzzle.border.opacity": "Rahmen-Transparenz:",
    "mathpuzzle.page.color": "Seitenfarbe:",

    // ============= 4. Textwerkzeuge (15 Schlüssel) =============
    "mathpuzzle.text.tools": "Textwerkzeuge",
    "mathpuzzle.text.add.new": "Neuen Text hinzufügen",
    "mathpuzzle.text.placeholder": "Hallo!",
    "mathpuzzle.text.add.button": "Text hinzufügen",
    "mathpuzzle.text.properties": "Eigenschaften des ausgewählten Texts",
    "mathpuzzle.text.content": "Inhalt:",
    "mathpuzzle.text.color": "Farbe:",
    "mathpuzzle.text.size": "Größe:",
    "mathpuzzle.text.font": "Schriftart:",
    "mathpuzzle.text.outline.color": "Konturfarbe:",
    "mathpuzzle.text.outline.width": "Kontur (0-10):",
    "mathpuzzle.text.default": "Neuer Text",
    "mathpuzzle.msg.text.added": "Text wurde hinzugefügt.",
    "mathpuzzle.msg.text.updated": "Texteigenschaften wurden aktualisiert.",
    "mathpuzzle.msg.text.deleted": "Text wurde gelöscht.",

    // ============= 5. Rätselkonfiguration (6 Schlüssel) =============
    "mathpuzzle.puzzle.config": "Rätselkonfiguration",
    "operation.addition": "Addition",
    "operation.subtraction": "Subtraktion",
    "operation.both": "Addition & Subtraktion",
    "mathpuzzle.rows.label": "Zeilen (2–4):",
    "mathpuzzle.columns.label": "Spalten (2–4):",

    // ============= 6. Bildbibliothek (7 Schlüssel) =============
    "mathpuzzle.image.library": "Bildbibliothek",
    "mathpuzzle.search.placeholder": "z.B. Katze, Apfel",
    "mathpuzzle.loading.images": "Lade Bilder...",
    "mathpuzzle.none.selected": "Nichts ausgewählt",
    "mathpuzzle.available.images": "Verfügbare Bilder:",
    "mathpuzzle.selected.image": "Ausgewähltes Bild für das Rätsel:",
    "mathpuzzle.select.theme": "Thema wählen:",

    // ============= 7. Upload-Bereich (4 Schlüssel) =============
    "mathpuzzle.upload.custom": "Eigene Bilder hochladen",
    "mathpuzzle.uploaded.placeholder": "Ihre hochgeladenen Bilder erscheinen hier.",
    "mathpuzzle.upload.select": "Bild(er) zum Hochladen wählen:",
    "mathpuzzle.uploaded.label": "Ihre hochgeladenen Bilder (diese Sitzung):",

    // ============= 8. Schriftoptionen (7 Schlüssel) =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= 9. Werkzeugleisten-Aktionen (20 Schlüssel) =============
    "toolbar.layers": "Ebenen",
    "toolbar.bring.forward": "Nach vorne bringen",
    "toolbar.send.backward": "Nach hinten senden",
    "toolbar.align": "Ausrichten",
    "toolbar.align.selected": "Ausgewählte ausrichten:",
    "toolbar.align.left": "Links ausrichten",
    "toolbar.center.h": "Horizontal zentrieren",
    "toolbar.align.right": "Rechts ausrichten",
    "toolbar.align.top": "Oben ausrichten",
    "toolbar.center.v": "Vertikal zentrieren",
    "toolbar.align.bottom": "Unten ausrichten",
    "toolbar.align.to.page": "An Seite ausrichten:",
    "toolbar.center.page.h": "Horizontal auf Seite zentrieren",
    "toolbar.center.page.v": "Vertikal auf Seite zentrieren",
    "toolbar.delete": "Ausgewählte löschen",
    "toolbar.msg.aligned": "Objekte wurden ausgerichtet.",
    "toolbar.msg.layer.changed": "Ebenenreihenfolge wurde geändert.",
    "toolbar.msg.deleted": "Ausgewählte Objekte wurden gelöscht.",
    "toolbar.msg.select.first": "Bitte wählen Sie zuerst ein Objekt aus.",
    "toolbar.msg.nothing.selected": "Keine Objekte ausgewählt.",

    // ============= 10. Aktionsschaltflächen (13 Schlüssel) =============
    "mathpuzzle.generate": "Erstellen",
    "mathpuzzle.generate.worksheet": "Arbeitsblatt erstellen",
    "mathpuzzle.generate.answer": "Lösungsblatt erstellen",
    "mathpuzzle.download": "Herunterladen",
    "mathpuzzle.download.worksheet.jpeg": "Arbeitsblatt (JPEG)",
    "mathpuzzle.download.answer.jpeg": "Lösungsblatt (JPEG)",
    "mathpuzzle.download.worksheet.pdf": "Arbeitsblatt (PDF)",
    "mathpuzzle.download.answer.pdf": "Lösungsblatt (PDF)",
    "common.grayscale": "Graustufen",
    "mathpuzzle.clear.all": "Alles löschen",
    "mathpuzzle.msg.generate.complete": "Rätsel wurde erfolgreich erstellt!",
    "mathpuzzle.msg.cleared": "Alle Inhalte wurden gelöscht.",
    "mathpuzzle.msg.download.ready": "Download bereit.",

    // ============= 11. Registerkarten (2 Schlüssel) =============
    "mathpuzzle.tab.worksheet": "Arbeitsblatt",
    "mathpuzzle.tab.answer": "Lösungsblatt",

    // ============= 12. Upload- & Thema-Nachrichten (13 Schlüssel) =============
    "mathpuzzle.msg.loading.uploads": "Lade {filesToLoad} Bild(er)...",
    "mathpuzzle.msg.uploads.available": "{count} eigene(s) Bild(er) verfügbar.",
    "mathpuzzle.msg.file.error": "Fehler beim Lesen der Datei: {fileName}",
    "mathpuzzle.msg.form.cleared": "Formular wurde geleert.",
    "mathpuzzle.themes.all": "Alle Themen",
    "mathpuzzle.msg.themes.error": "Fehler beim Laden der Themen.",
    "mathpuzzle.msg.loading.theme": "Lade Bilder für Thema...",
    "mathpuzzle.msg.loading.default": "Lade Standardthema...",
    "mathpuzzle.msg.type.search": "Tippen Sie, um alle Bilder zu durchsuchen.",
    "mathpuzzle.msg.searching": "Suche läuft...",
    "mathpuzzle.msg.search.error": "Fehler bei der Suche.",
    "mathpuzzle.msg.no.images": "Keine Bilder gefunden{query}",
    "mathpuzzle.msg.theme.loaded": "Thema wurde erfolgreich geladen.",

    // ============= 13. Asset-Ladenachrichten (10 Schlüssel) =============
    "mathpuzzle.msg.loading.backgrounds": "Lade Hintergründe...",
    "mathpuzzle.msg.backgrounds.error": "Fehler beim Laden der Hintergründe.",
    "mathpuzzle.msg.background.failed": "Hintergrundbild konnte nicht geladen werden.",
    "mathpuzzle.msg.loading.borders": "Lade Rahmen...",
    "mathpuzzle.msg.borders.error": "Fehler beim Laden der Rahmen.",
    "mathpuzzle.msg.no.items": "Keine Elemente in diesem Thema.",
    "mathpuzzle.msg.border.failed": "Rahmenbild konnte nicht geladen werden.",
    "mathpuzzle.asset.loaded": "{type} wurde erfolgreich geladen.",
    "mathpuzzle.asset.none": "Keine {type} verfügbar.",
    "mathpuzzle.asset.select": "Wählen Sie ein Thema, um {type} zu sehen.",

    // ============= 14. Generierungsnachrichten (8 Schlüssel) =============
    "mathpuzzle.msg.using.upload": "Kein Bibliotheksbild ausgewählt. Verwende „{imageName}" aus Ihren Uploads.",
    "mathpuzzle.msg.generating.data": "Erstelle Rätseldaten...",
    "mathpuzzle.msg.rendering.worksheet": "Erstelle Arbeitsblatt...",
    "mathpuzzle.msg.worksheet.success": "Arbeitsblatt wurde erfolgreich erstellt!",
    "mathpuzzle.msg.generate.first": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
    "mathpuzzle.msg.rendering.answer": "Erstelle Lösungsblatt...",
    "mathpuzzle.msg.answer.generated": "Lösungsblatt wurde erstellt!",
    "mathpuzzle.msg.generation.error": "Fehler beim Erstellen des Rätsels: {error}",

    // ============= 15. Download- & PDF-Nachrichten (14 Schlüssel) =============
    "mathpuzzle.msg.preparing.jpeg": "Bereite JPEG vor... Bitte warten.",
    "mathpuzzle.msg.jpeg.error": "Fehler beim Vorbereiten des JPEG: {error}",
    "mathpuzzle.watermark.main": "KOSTENLOSE VERSION - LessonCraftStudio.com",
    "mathpuzzle.watermark.text": "KOSTENLOSE VERSION",
    "mathpuzzle.msg.generate.content": "Bitte erstellen Sie zuerst Inhalte.",
    "mathpuzzle.msg.preparing.pdf": "Bereite PDF vor...",
    "mathpuzzle.msg.pdf.downloaded": "PDF wurde heruntergeladen!",
    "mathpuzzle.msg.pdf.error": "Fehler beim Erstellen der PDF.",
    "mathpuzzle.msg.generate.worksheet.first": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
    "mathpuzzle.msg.preparing.jpeg.simple": "Bereite JPEG vor...",
    "mathpuzzle.msg.jpeg.initiated": "JPEG-Download wurde gestartet!",
    "mathpuzzle.msg.jpeg.error.simple": "Fehler beim Vorbereiten des JPEG.",
    "mathpuzzle.msg.preparing.pdf.wait": "Bereite PDF vor... Bitte warten.",
    "mathpuzzle.msg.pdf.error.detailed": "Fehler beim Erstellen der PDF: {error}",

    // ============= 16. Allgemeine Begriffe (3 Schlüssel) =============
    "common.none": "Keine",
    "common.loading": "Lädt...",
    "common.error": "Fehler",

    // ============= 17. Fehlermeldungen (Zusätzlich) =============
    "error.invalid.dimensions": "Ungültige Dimensionen. Bitte überprüfen Sie Zeilen und Spalten.",
    "error.no.image.selected": "Bitte wählen Sie ein Bild für das Rätsel aus.",
    "error.no.theme.selected": "Bitte wählen Sie zuerst ein Thema aus.",
    "error.upload.failed": "Upload fehlgeschlagen. Bitte versuchen Sie es erneut.",
    "error.file.too.large": "Datei ist zu groß. Maximalgröße ist 5MB.",
    "error.invalid.file.type": "Ungültiger Dateityp. Bitte laden Sie nur Bilddateien hoch.",
    "error.canvas.creation": "Fehler beim Erstellen der Arbeitsfläche.",
    "error.export.failed": "Export fehlgeschlagen. Bitte versuchen Sie es erneut.",
    "error.network": "Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.",
    "error.puzzle.generation": "Rätsel konnte nicht erstellt werden. Bitte versuchen Sie andere Einstellungen.",
    "error.invalid.operation": "Ungültige Rechenart ausgewählt.",
    "error.grid.size": "Rastergröße muss zwischen 2 und 4 liegen.",
    "error.no.solution": "Keine Lösung für das Rätsel gefunden.",
    "error.text.empty": "Bitte geben Sie Textinhalt ein.",
    "error.object.selection": "Bitte wählen Sie ein zu bearbeitendes Objekt aus.",
    "error.alignment": "Fehler beim Ausrichten der Objekte.",
    "error.layer.operation": "Fehler beim Ändern der Ebenenreihenfolge.",
    "error.delete.operation": "Fehler beim Löschen der Objekte.",
    "error.color.invalid": "Ungültiger Farbwert.",
    "error.size.invalid": "Ungültiger Größenwert.",
    "error.outline.invalid": "Ungültige Konturbreite.",
    "error.opacity.invalid": "Ungültiger Transparenzwert.",
    "error.theme.not.found": "Thema nicht gefunden.",
    "error.api.connection": "Verbindung zum Server konnte nicht hergestellt werden.",
    "error.session.expired": "Sitzung abgelaufen. Bitte aktualisieren Sie die Seite.",
    "error.browser.unsupported": "Ihr Browser wird nicht unterstützt. Bitte verwenden Sie einen modernen Browser.",
    "error.feature.unavailable": "Diese Funktion ist in der kostenlosen Version nicht verfügbar."
  }
};

// ==========================================
// HILFSFUNKTIONEN FÜR DEUTSCHE ÜBERSETZUNG
// ==========================================

/**
 * Holt deutsche Übersetzung für einen Schlüssel
 * @param {string} key - Übersetzungsschlüssel
 * @param {object} params - Parameter für Interpolation
 * @returns {string} Übersetzer Text
 */
function getGermanMathPuzzleTranslation(key, params = {}) {
  const translation = MATH_PUZZLE_TRANSLATIONS_DE.de[key] || key;
  return formatGermanMathPuzzleTranslation(translation, params);
}

/**
 * Formatiert deutsche Übersetzung mit Parametern
 * @param {string} text - Text mit Platzhaltern
 * @param {object} params - Parameter, die Platzhalter ersetzen
 * @returns {string} Formatierter Text
 */
function formatGermanMathPuzzleTranslation(text, params) {
  let formattedText = text;
  for (const [key, value] of Object.entries(params)) {
    formattedText = formattedText.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return formattedText;
}

/**
 * Validiert deutsche Übersetzungen
 * @returns {object} Validierungsergebnis
 */
function validateGermanMathPuzzleTranslations() {
  const keys = Object.keys(MATH_PUZZLE_TRANSLATIONS_DE.de);
  const missingKeys = [];
  const emptyTranslations = [];

  // Prüfe auf leere Übersetzungen
  keys.forEach(key => {
    const value = MATH_PUZZLE_TRANSLATIONS_DE.de[key];
    if (!value || value.trim() === '') {
      emptyTranslations.push(key);
    }
  });

  return {
    totalKeys: keys.length,
    validKeys: keys.length - emptyTranslations.length,
    missingKeys,
    emptyTranslations,
    coverage: `${((keys.length - emptyTranslations.length) / keys.length * 100).toFixed(1)}%`,
    isComplete: emptyTranslations.length === 0
  };
}

// ==========================================
// MATHEMATISCHE BEGRIFFE FÜR DEUTSCHE VERSION
// ==========================================

/**
 * Deutsche Begriffe für mathematische Operationen
 * Verwendet im Bildungsbereich
 */
const GERMAN_MATH_OPERATIONS = {
  addition: "Addition",
  subtraction: "Subtraktion",
  multiplication: "Multiplikation",
  division: "Division",
  both: "Addition & Subtraktion",
  all: "Alle Rechenarten",
  plus: "Plus",
  minus: "Minus",
  times: "Mal",
  dividedBy: "Geteilt durch",
  equals: "Gleich",
  result: "Ergebnis",
  solution: "Lösung",
  calculate: "Rechnen",
  solve: "Lösen"
};

/**
 * Deutsche Begriffe für Rätselelemente
 */
const GERMAN_PUZZLE_TERMS = {
  puzzle: "Rätsel",
  mathPuzzle: "Rechenrätsel",
  worksheet: "Arbeitsblatt",
  answerKey: "Lösungsblatt",
  grid: "Raster",
  row: "Zeile",
  column: "Spalte",
  cell: "Feld",
  image: "Bild",
  number: "Zahl",
  question: "Aufgabe",
  answer: "Antwort"
};

// ==========================================
// EXPORT FÜR VERWENDUNG IN ANDEREN MODULEN
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MATH_PUZZLE_TRANSLATIONS_DE,
    getGermanMathPuzzleTranslation,
    formatGermanMathPuzzleTranslation,
    validateGermanMathPuzzleTranslations,
    GERMAN_MATH_OPERATIONS,
    GERMAN_PUZZLE_TERMS
  };
}

// Global im Browser verfügbar machen
if (typeof window !== 'undefined') {
  window.MATH_PUZZLE_TRANSLATIONS_DE = MATH_PUZZLE_TRANSLATIONS_DE;
  window.getGermanMathPuzzleTranslation = getGermanMathPuzzleTranslation;
  window.formatGermanMathPuzzleTranslation = formatGermanMathPuzzleTranslation;
  window.validateGermanMathPuzzleTranslations = validateGermanMathPuzzleTranslations;
  window.GERMAN_MATH_OPERATIONS = GERMAN_MATH_OPERATIONS;
  window.GERMAN_PUZZLE_TERMS = GERMAN_PUZZLE_TERMS;
}