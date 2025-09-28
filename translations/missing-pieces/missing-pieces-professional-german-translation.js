/**
 * Missing Pieces Professional German Translation
 * Version: 1.0.0
 * Date: 2024-12-20
 *
 * German (de) - Complete Professional Translation
 * Total Keys: 176+
 *
 * Translation Philosophy:
 * - Natural German as if originally developed in Germany
 * - Uses formal "Sie" form for professional educational software
 * - Educational terminology familiar to German teachers and parents
 * - Consistent shape and puzzle terminology throughout
 */

const MISSING_PIECES_GERMAN_TRANSLATIONS = {
  de: {
    // ============= 1. Language Names (11 keys) =============
    "language.english": "Englisch",
    "language.german.full": "Deutsch",
    "language.french.full": "Französisch (Français)",
    "language.spanish.full": "Spanisch (Español)",
    "language.portuguese.full": "Portugiesisch (Português)",
    "language.italian.full": "Italienisch (Italiano)",
    "language.dutch.full": "Niederländisch (Nederlands)",
    "language.swedish.full": "Schwedisch (Svenska)",
    "language.danish.full": "Dänisch (Dansk)",
    "language.norwegian.full": "Norwegisch (Norsk)",
    "language.finnish.full": "Finnisch (Suomi)",

    // ============= 2. Page Title & Headers (8 keys) =============
    "missingpieces.page.title": "Fehlende Teile - Arbeitsblatt-Generator",
    "missingpieces.title": "Fehlende Teile",
    "missingpieces.language.settings": "Spracheinstellungen",
    "missingpieces.page.setup": "Seiteneinrichtung",
    "missingpieces.text.tools": "Textwerkzeuge",
    "missingpieces.puzzle.config": "Puzzle-Konfiguration",
    "missingpieces.image.library": "Bildbibliothek",
    "missingpieces.upload.custom": "Eigene Bilder hochladen",

    // ============= 3. Page Setup (19 keys) =============
    "missingpieces.select.language": "Sprache auswählen",
    "missingpieces.language.label": "Sprache:",
    "missingpieces.page.size": "Seitengröße:",
    "page.size.letter.portrait": "Letter Hochformat (8,5×11\")",
    "page.size.default": "Standard-Arbeitsblatt (800x1000)",
    "page.size.a4.portrait": "A4 Hochformat (210×297mm)",
    "page.size.a4.landscape": "A4 Querformat (297×210mm)",
    "page.size.letter.landscape": "Letter Querformat (11×8,5\")",
    "page.size.square": "Quadrat (1200x1200)",
    "page.size.custom": "Benutzerdefiniert",
    "missingpieces.width.label": "Breite (px):",
    "missingpieces.height.label": "Höhe (px):",
    "missingpieces.page.color": "Seitenfarbe:",
    "missingpieces.apply.size": "Größe anwenden",
    "missingpieces.background.title": "Hintergrund",
    "missingpieces.background.theme": "Hintergrundthema:",
    "missingpieces.background.message": "Wählen Sie ein Thema für Hintergründe.",
    "missingpieces.background.opacity": "Hintergrund-Transparenz:",
    "missingpieces.border.title": "Rahmen",
    "missingpieces.border.theme": "Rahmenthema:",
    "missingpieces.border.message": "Wählen Sie ein Thema für Rahmen.",
    "missingpieces.border.opacity": "Rahmen-Transparenz:",

    // ============= 4. Text Tools (15 keys) =============
    "missingpieces.text.add.new": "Neuen Text hinzufügen",
    "missingpieces.text.content": "Inhalt:",
    "missingpieces.text.placeholder": "Hallo!",
    "missingpieces.text.add.button": "Text hinzufügen",
    "missingpieces.text.properties": "Eigenschaften des ausgewählten Texts",
    "missingpieces.text.color": "Farbe:",
    "missingpieces.text.size": "Größe:",
    "missingpieces.text.font": "Schriftart:",
    "missingpieces.text.outline.color": "Konturfarbe:",
    "missingpieces.text.outline.width": "Konturstärke (0-10):",
    "missingpieces.text.default": "Neuer Text",
    "missingpieces.msg.text.added": "Text zum Arbeitsblatt hinzugefügt.",
    "missingpieces.msg.text.updated": "Texteigenschaften aktualisiert.",
    "missingpieces.msg.text.deleted": "Text gelöscht.",
    "missingpieces.msg.form.cleared": "Formular geleert.",

    // ============= 5. Puzzle Configuration (9 keys) =============
    "missingpieces.missing.count": "Fehlende Teile (1–5):",
    "missingpieces.solution.options": "Lösungsoptionen (2–6):",
    "missingpieces.piece.shape": "Teilform:",
    "missingpieces.msg.select.image": "Bitte wählen Sie zuerst ein Bild für das Puzzle.",
    "missingpieces.msg.pieces.range": "Fehlende Teile müssen zwischen 1 und 5 liegen.",
    "missingpieces.msg.options.range": "Lösungsoptionen müssen zwischen 2 und 6 liegen.",
    "missingpieces.msg.pieces.less": "Die Anzahl fehlender Teile muss kleiner als die Lösungsoptionen sein.",
    "missingpieces.msg.distinct.pieces": "Es konnten nicht genügend unterschiedliche Teile gefunden werden.",
    "missingpieces.msg.image.failed": "Das ausgewählte Bild konnte nicht geladen werden.",

    // ============= 6. Shape Options (6 keys) =============
    "shape.square": "Quadrat",
    "shape.circle": "Kreis",
    "shape.rect.portrait": "Rechteck (Hochformat)",
    "shape.rect.landscape": "Rechteck (Querformat)",
    "shape.ellipse.portrait": "Ellipse (Hochformat)",
    "shape.ellipse.landscape": "Ellipse (Querformat)",

    // ============= 7. Image Library (7 keys) =============
    "missingpieces.select.theme": "Thema auswählen:",
    "missingpieces.search.images": "Bilder suchen:",
    "missingpieces.search.placeholder": "z.B. Apfel, Auto",
    "missingpieces.available.images": "Verfügbare Bilder:",
    "missingpieces.loading.images": "Bilder werden geladen...",
    "missingpieces.selected.image": "Ausgewähltes Bild für Puzzle:",
    "missingpieces.msg.none.selected": "Keine Elemente ausgewählt.",

    // ============= 8. Upload Section (4 keys) =============
    "missingpieces.upload.select": "Bild(er) zum Hochladen auswählen:",
    "missingpieces.uploaded.images": "Ihre hochgeladenen Bilder (diese Sitzung):",
    "missingpieces.uploaded.placeholder": "Ihre hochgeladenen Bilder erscheinen hier.",
    "missingpieces.msg.images.loaded": "{count} Bild(er) geladen.",

    // ============= 9. Font Options (7 keys) =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= 10. Toolbar Actions (20 keys) =============
    "toolbar.layers": "Ebenen",
    "toolbar.bring.forward": "Nach vorne",
    "toolbar.send.backward": "Nach hinten",
    "toolbar.align": "Ausrichten",
    "toolbar.align.selected": "Auswahl ausrichten:",
    "toolbar.align.left": "Links ausrichten",
    "toolbar.center.h": "Horizontal zentrieren",
    "toolbar.align.right": "Rechts ausrichten",
    "toolbar.align.top": "Oben ausrichten",
    "toolbar.center.v": "Vertikal zentrieren",
    "toolbar.align.bottom": "Unten ausrichten",
    "toolbar.align.to.page": "An Seite ausrichten:",
    "toolbar.center.page.h": "Auf Seite horizontal zentrieren",
    "toolbar.center.page.v": "Auf Seite vertikal zentrieren",
    "toolbar.delete": "Auswahl löschen",
    "toolbar.msg.aligned": "Objekte ausgerichtet.",
    "toolbar.msg.layer.changed": "Ebenenreihenfolge geändert.",
    "toolbar.msg.deleted": "Ausgewählte Objekte gelöscht.",
    "toolbar.msg.select.first": "Bitte wählen Sie zuerst ein Objekt aus.",
    "toolbar.msg.nothing.selected": "Keine Objekte ausgewählt.",

    // ============= 11. Action Buttons (13 keys) =============
    "missingpieces.generate": "Erstellen",
    "missingpieces.generate.worksheet": "Arbeitsblatt erstellen",
    "missingpieces.generate.answer": "Lösungsblatt erstellen",
    "missingpieces.download": "Herunterladen",
    "missingpieces.download.worksheet.jpeg": "Arbeitsblatt (JPEG)",
    "missingpieces.download.answer.jpeg": "Lösungsblatt (JPEG)",
    "missingpieces.download.worksheet.pdf": "Arbeitsblatt (PDF)",
    "missingpieces.download.answer.pdf": "Lösungsblatt (PDF)",
    "common.grayscale": "Graustufen",
    "missingpieces.clear.all": "Alles löschen",
    "missingpieces.msg.generate.complete": "Puzzle erfolgreich erstellt!",
    "missingpieces.msg.cleared": "Alle Inhalte gelöscht.",
    "missingpieces.msg.download.ready": "Download bereit.",

    // ============= 12. Tab Labels (2 keys) =============
    "missingpieces.tab.worksheet": "Arbeitsblatt",
    "missingpieces.tab.answer": "Lösungsblatt",

    // ============= 13. Theme Messages (9 keys) =============
    "missingpieces.themes.all": "Alle Themen",
    "missingpieces.msg.themes.error": "Themen konnten nicht geladen werden.",
    "missingpieces.msg.loading.default": "Standard-Thema wird geladen...",
    "missingpieces.msg.type.search": "Tippen Sie, um alle Bilder zu durchsuchen.",
    "missingpieces.msg.searching": "Suche läuft...",
    "missingpieces.msg.no.images": "Keine Bilder gefunden{query}",
    "missingpieces.msg.theme.loaded": "Thema erfolgreich geladen.",
    "missingpieces.msg.search.error": "Fehler bei der Suche.",
    "missingpieces.msg.loading.theme": "Themenbilder werden geladen...",

    // ============= 14. Puzzle Generation Messages (10 keys) =============
    "missingpieces.msg.generating": "Puzzledaten werden erstellt...",
    "missingpieces.msg.generation.failed": "Puzzle-Erstellung fehlgeschlagen. Bitte überprüfen Sie Ihre Auswahl.",
    "missingpieces.msg.worksheet.success": "Arbeitsblatt erfolgreich erstellt!",
    "missingpieces.msg.unexpected.error": "Ein unerwarteter Fehler ist bei der Erstellung aufgetreten.",
    "missingpieces.msg.validation.error": "Bitte überprüfen Sie die Puzzle-Konfiguration.",
    "missingpieces.msg.processing.image": "Bild wird für Puzzle verarbeitet...",
    "missingpieces.msg.creating.pieces": "Puzzleteile werden erstellt...",
    "missingpieces.msg.arranging.solution": "Lösungsoptionen werden angeordnet...",
    "missingpieces.msg.finalizing": "Puzzle-Layout wird finalisiert...",
    "missingpieces.msg.ready": "Puzzle ist bereit zum Drucken.",

    // ============= 15. Answer Key Messages (4 keys) =============
    "missingpieces.msg.generate.first": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
    "missingpieces.msg.generating.answer": "Lösungsblatt wird erstellt...",
    "missingpieces.msg.answer.generated": "Lösungsblatt erstellt!",
    "missingpieces.msg.answer.error": "Ein Fehler ist bei der Erstellung des Lösungsblatts aufgetreten.",

    // ============= 16. Download & Export Messages (20 keys) =============
    "missingpieces.msg.canvas.empty": "Arbeitsfläche ist leer. Erstellen Sie zuerst Inhalte.",
    "missingpieces.msg.preparing.jpeg": "Hochwertige JPEG-Datei wird vorbereitet... Bitte warten.",
    "missingpieces.msg.jpeg.success": "Hochwertige JPEG-Datei heruntergeladen!",
    "missingpieces.msg.jpeg.error": "Fehler bei der JPEG-Vorbereitung: {error}",
    "missingpieces.watermark.main": "KOSTENLOSE VERSION - LessonCraftStudio.com",
    "missingpieces.watermark.text": "KOSTENLOSE VERSION",
    "missingpieces.msg.generate.content": "Bitte erstellen Sie zuerst Inhalte.",
    "missingpieces.msg.preparing.pdf": "PDF wird vorbereitet...",
    "missingpieces.msg.pdf.success": "PDF heruntergeladen!",
    "missingpieces.msg.pdf.error": "Fehler beim Erstellen der PDF-Datei.",
    "missingpieces.msg.generate.worksheet.first": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
    "missingpieces.msg.preparing.jpeg.simple": "JPEG wird vorbereitet...",
    "missingpieces.msg.jpeg.initiated": "JPEG-Download gestartet!",
    "missingpieces.msg.jpeg.error.simple": "Fehler bei der JPEG-Vorbereitung.",
    "missingpieces.msg.preparing.pdf.quality": "Hochwertige PDF-Datei wird vorbereitet... Bitte warten.",
    "missingpieces.msg.pdf.quality.success": "Hochwertige PDF-Datei heruntergeladen!",
    "missingpieces.msg.pdf.error.detailed": "Fehler beim Erstellen der PDF-Datei: {error}",
    "missingpieces.msg.export.progress": "Export-Fortschritt: {percent}%",
    "missingpieces.msg.export.complete": "Export abgeschlossen.",
    "missingpieces.msg.export.cancelled": "Export abgebrochen.",

    // ============= 17. Common Terms (3 keys) =============
    "common.none": "Keine",
    "common.loading": "Lädt...",
    "common.error": "Fehler",

    // ============= 18. Placeholders (4 keys) =============
    "placeholder.search": "Suchen...",
    "placeholder.enter.text": "Text hier eingeben",
    "placeholder.custom.width": "Breite",
    "placeholder.custom.height": "Höhe",

    // ============= 19. Error Messages (30+ keys) =============
    "error.invalid.dimensions": "Ungültige Abmessungen. Bitte überprüfen Sie Breite und Höhe.",
    "error.no.image.selected": "Bitte wählen Sie ein Bild für das Puzzle aus.",
    "error.no.theme.selected": "Bitte wählen Sie zuerst ein Thema aus.",
    "error.upload.failed": "Hochladen fehlgeschlagen. Bitte versuchen Sie es erneut.",
    "error.file.too.large": "Dateigröße zu groß. Maximale Größe ist 5MB.",
    "error.invalid.file.type": "Ungültiger Dateityp. Bitte laden Sie nur Bilddateien hoch.",
    "error.canvas.creation": "Fehler beim Erstellen der Arbeitsfläche.",
    "error.export.failed": "Export fehlgeschlagen. Bitte versuchen Sie es erneut.",
    "error.network": "Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.",
    "error.puzzle.generation": "Puzzle konnte nicht erstellt werden. Bitte versuchen Sie andere Einstellungen.",
    "error.invalid.configuration": "Ungültige Puzzle-Konfiguration.",
    "error.shape.not.supported": "Die ausgewählte Form wird nicht unterstützt.",
    "error.pieces.overlap": "Teile überlappen sich. Bitte passen Sie die Konfiguration an.",
    "error.solution.conflict": "Lösungsoptionen stehen im Konflikt mit der Anzahl fehlender Teile.",
    "error.image.loading": "Fehler beim Laden des Bildes.",
    "error.theme.loading": "Fehler beim Laden des Themas.",
    "error.border.loading": "Fehler beim Laden des Rahmens.",
    "error.background.loading": "Fehler beim Laden des Hintergrunds.",
    "error.text.empty": "Bitte geben Sie Textinhalt ein.",
    "error.object.selection": "Bitte wählen Sie ein zu bearbeitendes Objekt aus.",
    "error.alignment": "Fehler beim Ausrichten der Objekte.",
    "error.layer.operation": "Fehler beim Ändern der Ebenenreihenfolge.",
    "error.delete.operation": "Fehler beim Löschen der Objekte.",
    "error.color.invalid": "Ungültiger Farbwert.",
    "error.size.invalid": "Ungültiger Größenwert.",
    "error.outline.invalid": "Ungültige Konturstärke.",
    "error.opacity.invalid": "Ungültiger Transparenzwert.",
    "error.theme.not.found": "Thema nicht gefunden.",
    "error.api.connection": "Keine Verbindung zum Server möglich.",
    "error.session.expired": "Sitzung abgelaufen. Bitte laden Sie die Seite neu.",
    "error.browser.unsupported": "Ihr Browser wird nicht unterstützt. Bitte verwenden Sie einen modernen Browser.",
    "error.feature.unavailable": "Diese Funktion ist in der kostenlosen Version nicht verfügbar."
  }
};

// Helper functions for translation management
function getTranslation(key, locale = 'de', params = {}) {
  const translation = MISSING_PIECES_GERMAN_TRANSLATIONS[locale]?.[key] ||
                     key;

  // Handle parameter interpolation
  let formattedText = translation;
  for (const [param, value] of Object.entries(params)) {
    formattedText = formattedText.replace(new RegExp(`\\{${param}\\}`, 'g'), value);
  }
  return formattedText;
}

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MISSING_PIECES_GERMAN_TRANSLATIONS;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.MISSING_PIECES_GERMAN_TRANSLATIONS = MISSING_PIECES_GERMAN_TRANSLATIONS;
}