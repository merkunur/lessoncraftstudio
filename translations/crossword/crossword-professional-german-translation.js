/**
 * KREUZWORTRÄTSEL - PROFESSIONELLE DEUTSCHE ÜBERSETZUNG
 * =====================================================
 * Vollständige deutsche Übersetzung für die Bilder-Kreuzworträtsel App
 * Version: 1.0.0
 * Erstellt: Dezember 2024
 *
 * ÜBERSETZUNGSPRINZIPIEN:
 * - Natürliches Deutsch - als wäre die App ursprünglich deutsch entwickelt
 * - Professionelle pädagogische Terminologie
 * - Konsistente Du-Form (moderne Software-Konvention)
 * - Klare und präzise Formulierungen
 * - Kulturell angepasste Ausdrücke
 *
 * Gesamtanzahl Übersetzungsschlüssel: 191
 * Sprache: Deutsch (de)
 */

const CROSSWORD_TRANSLATIONS_DE = {
  "de": {
    // ============= 1. SPRACHENNAMEN (11 Schlüssel) =============
    "language.english": "Englisch",
    "language.german": "Deutsch",
    "language.french": "Französisch",
    "language.spanish": "Spanisch",
    "language.portuguese": "Portugiesisch",
    "language.italian": "Italienisch",
    "language.dutch": "Niederländisch",
    "language.swedish": "Schwedisch",
    "language.danish": "Dänisch",
    "language.norwegian": "Norwegisch",
    "language.finnish": "Finnisch",

    // ============= 2. HAUPTBENUTZEROBERFLÄCHE (4 Schlüssel) =============
    "language": "Sprache",
    "selectLanguage": "Sprache wählen:",
    "pageSetup": "Seiteneinstellung",
    "backgroundTheme": "Hintergrund",

    // ============= 3. SEITENKOPF & TITEL (2 Schlüssel) =============
    "crossword.page.title": "Bilder-Kreuzworträtsel Generator",
    "crossword.title": "Kreuzworträtsel",

    // ============= 4. SEITENFORMAT-OPTIONEN (6 Schlüssel) =============
    "page.size.letter.portrait": "Letter Hochformat (8,5×11\")",
    "page.size.letter.landscape": "Letter Querformat (11×8,5\")",
    "page.size.a4.portrait": "A4 Hochformat (210×297mm)",
    "page.size.a4.landscape": "A4 Querformat (297×210mm)",
    "page.size.square": "Quadratisch (1200×1200)",
    "page.size.custom": "Benutzerdefiniert",

    // ============= 5. SEITENEINSTELLUNGS-BEREICH (7 Schlüssel) =============
    "crossword.page.size.label": "Seitenformat:",
    "crossword.width.label": "Breite (px):",
    "crossword.height.label": "Höhe (px):",
    "crossword.apply.size": "Format anwenden",
    "crossword.background.label": "Hintergrund:",
    "crossword.apply.color": "Farbe anwenden",
    "crossword.borders.backgrounds": "Rahmen & Hintergründe",

    // ============= 6. RAHMEN & HINTERGRUND-BEREICH (10 Schlüssel) =============
    "crossword.background.theme": "Hintergrundthema:",
    "crossword.available.backgrounds": "Verfügbare Hintergründe:",
    "crossword.background.message": "Wähle ein Thema für Hintergründe.",
    "crossword.background.opacity": "Hintergrund-Transparenz:",
    "crossword.border.title": "Rahmen",
    "crossword.border.theme": "Rahmenthema:",
    "crossword.available.borders": "Verfügbare Rahmen:",
    "crossword.border.message": "Wähle ein Thema für Rahmen.",
    "crossword.border.opacity": "Rahmen-Transparenz:",
    "common.none": "Keine",

    // ============= 7. TEXTWERKZEUGE-BEREICH (11 Schlüssel) =============
    "crossword.text.tools": "Textwerkzeuge",
    "crossword.text.add.new": "Neuen Text hinzufügen",
    "crossword.text.content.label": "Inhalt:",
    "crossword.text.placeholder": "Text eingeben...",
    "crossword.text.add.button": "Text zum Arbeitsblatt hinzufügen",
    "crossword.text.properties": "Eigenschaften des ausgewählten Texts",
    "crossword.text.color": "Farbe:",
    "crossword.text.size": "Größe:",
    "crossword.text.font": "Schriftart:",
    "crossword.text.outline.color": "Konturfarbe:",
    "crossword.text.outline.width": "Konturstärke (0-10):",
    "crossword.text.default": "Neuer Text",

    // ============= 8. SCHRIFTARTEN-OPTIONEN (7 Schlüssel) =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= 9. BILDERBIBLIOTHEK - KREUZWORTRÄTSEL-SPEZIFISCH (10 Schlüssel) =============
    "crossword.image.library": "Bilderbibliothek",
    "crossword.generate.theme": "Aus Thema generieren:",
    "crossword.select.individual": "-- Oder einzelne Bilder unten auswählen --",
    "crossword.browser.theme": "Bildauswahl-Thema:",
    "crossword.search.label": "Bilder suchen:",
    "crossword.search.placeholder": "z.B. Apfel, Auto",
    "crossword.available.images": "Verfügbare Bilder (Zum Hinzufügen klicken):",
    "crossword.loading.images": "Bilder werden geladen...",
    "crossword.selected.images": "Ausgewählte Bilder (Zum Entfernen klicken):",
    "crossword.select.minimum": "Wähle mindestens 8 Bilder oder nutze 'Aus Thema generieren'",
    "crossword.themes.all": "Alle Themen",

    // ============= 10. UPLOAD-BEREICH (4 Schlüssel) =============
    "crossword.upload.title": "Eigene Bilder hochladen",
    "crossword.upload.select": "Bilder zum Hochladen auswählen:",
    "crossword.uploaded.label": "Deine hochgeladenen Bilder (Klicken zum Hinzufügen/Entfernen):",
    "crossword.uploaded.placeholder": "Deine hochgeladenen Bilder erscheinen hier.",

    // ============= 11. AKTIONSSCHALTFLÄCHEN (11 Schlüssel) =============
    "crossword.generate": "Generieren",
    "crossword.generate.worksheet": "Arbeitsblatt erstellen",
    "crossword.generate.answer": "Lösungsblatt erstellen",
    "crossword.download": "Herunterladen",
    "crossword.download.worksheet.jpeg": "Arbeitsblatt (JPEG)",
    "crossword.download.answer.jpeg": "Lösungsblatt (JPEG)",
    "crossword.download.worksheet.pdf": "Arbeitsblatt (PDF)",
    "crossword.download.answer.pdf": "Lösungsblatt (PDF)",
    "common.grayscale": "Graustufen",
    "crossword.clear.all": "Alles löschen",
    "crossword.clear.confirm": "Möchtest du wirklich alle Inhalte löschen?",

    // ============= 12. WERKZEUGLEISTE & AUSRICHTUNG (15 Schlüssel) =============
    "toolbar.layers": "Ebenen",
    "toolbar.bring.forward": "Nach vorne",
    "toolbar.send.backward": "Nach hinten",
    "toolbar.align": "Ausrichten",
    "toolbar.align.selected": "Auswahl ausrichten:",
    "toolbar.align.left": "Linksbündig",
    "toolbar.center.h": "Horizontal zentrieren",
    "toolbar.align.right": "Rechtsbündig",
    "toolbar.align.top": "Oben ausrichten",
    "toolbar.center.v": "Vertikal zentrieren",
    "toolbar.align.bottom": "Unten ausrichten",
    "toolbar.align.to.page": "An Seite ausrichten:",
    "toolbar.center.page.h": "Horizontal auf Seite zentrieren",
    "toolbar.center.page.v": "Vertikal auf Seite zentrieren",
    "toolbar.delete": "Auswahl löschen",

    // ============= 13. ARBEITSBLATT-REGISTERKARTEN (2 Schlüssel) =============
    "crossword.tab.worksheet": "Arbeitsblatt",
    "crossword.tab.answer": "Lösungsblatt",

    // ============= 14. ERFOLGSMELDUNGEN (10 Schlüssel) =============
    "crossword.msg.worksheet.generated": "Arbeitsblatt erfolgreich erstellt!",
    "crossword.msg.answer.generated": "Lösungsblatt erstellt!",
    "crossword.msg.cleared": "Alle Einstellungen gelöscht.",
    "crossword.msg.jpeg.initiated": "JPEG-Download gestartet!",
    "crossword.msg.pdf.downloaded": "PDF heruntergeladen!",
    "crossword.msg.uploads.available": "{count} eigene(s) Bild(er) verfügbar.",
    "crossword.msg.using.theme": "Rätsel wird mit zufälligen Bildern aus dem Thema '{theme}' generiert.",
    "crossword.msg.individual.mode": "Zu individueller Bildauswahl gewechselt.",
    "crossword.msg.text.added": "Text zur Arbeitsfläche hinzugefügt.",
    "crossword.msg.theme.loaded": "Thema erfolgreich geladen.",

    // ============= 15. FEHLER- & WARNMELDUNGEN (25 Schlüssel) =============
    "crossword.msg.select.begin": "Wähle Bilder oder ein Thema zum Beginnen.",
    "crossword.msg.generate.first": "Bitte erstelle zuerst ein Arbeitsblatt.",
    "crossword.msg.theme.insufficient": "Thema '{theme}' benötigt mindestens {count} Bilder.",
    "crossword.msg.select.minimum.count": "Bitte wähle mindestens {count} Bilder aus der Bibliothek oder deinen Uploads.",
    "crossword.msg.generation.failed": "Konnte kein gültiges Kreuzworträtsel generieren. Versuche andere Bilder.",
    "crossword.msg.clear.theme": "Lösche 'Aus Thema generieren' um einzelne Bilder auszuwählen.",
    "crossword.msg.file.error": "Fehler beim Lesen der Datei: {filename}",
    "crossword.msg.canvas.empty": "Arbeitsfläche ist leer.",
    "crossword.msg.jpeg.error": "Fehler beim Vorbereiten der JPEG-Datei.",
    "crossword.msg.pdf.error": "Fehler beim Erstellen der PDF-Datei.",
    "crossword.msg.generate.content": "Bitte erstelle zuerst Inhalte.",
    "crossword.msg.no.images": "Keine Bilder gefunden{query}",
    "crossword.msg.theme.error": "Fehler beim Laden des Themas.",
    "crossword.msg.upload.error": "Fehler beim Hochladen der Bilder.",
    "crossword.msg.invalid.size": "Ungültiges Seitenformat.",
    "crossword.msg.invalid.dimensions": "Ungültige Dimensionen eingegeben.",
    "crossword.msg.min.images": "Mindestens 8 Bilder für Kreuzworträtsel erforderlich.",
    "crossword.msg.max.images": "Maximal 20 Bilder für Kreuzworträtsel erlaubt.",
    "crossword.msg.processing": "Verarbeitung läuft...",
    "crossword.msg.generation.timeout": "Zeitüberschreitung bei Rätselgenerierung. Versuche weniger Bilder.",
    "crossword.msg.no.solution": "Keine gültige Kreuzworträtsel-Lösung gefunden.",
    "crossword.msg.image.load.failed": "Bild konnte nicht geladen werden: {name}",
    "crossword.msg.theme.not.found": "Thema nicht gefunden: {theme}",
    "crossword.msg.network.error": "Netzwerkfehler. Bitte Verbindung prüfen.",
    "crossword.msg.unexpected.error": "Ein unerwarteter Fehler ist aufgetreten.",

    // ============= 16. LADE- & STATUSMELDUNGEN (8 Schlüssel) =============
    "crossword.msg.searching": "Suche läuft...",
    "crossword.msg.loading.theme": "Thema wird geladen...",
    "crossword.msg.loading.named.theme": "Lade Thema '{theme}'...",
    "crossword.msg.loading.uploads": "Lade {count} Bild(er)...",
    "crossword.msg.preparing.jpeg": "JPEG wird vorbereitet...",
    "crossword.msg.preparing.pdf": "PDF wird erstellt...",
    "crossword.msg.generating": "Kreuzworträtsel wird generiert...",
    "crossword.msg.processing.images": "Bilder werden verarbeitet...",

    // ============= 17. WASSERZEICHEN-TEXT (2 Schlüssel) =============
    "crossword.watermark.main": "KOSTENLOSE VERSION - LessonCraftStudio.com",
    "crossword.watermark.text": "KOSTENLOSE VERSION",

    // ============= 18. ASSET-LADEMELDUNGEN (4 Schlüssel) =============
    "crossword.asset.select": "Wähle ein Thema um {type} anzuzeigen.",
    "crossword.asset.loading": "Lade {theme} {type}...",
    "crossword.asset.none": "Keine {type} in diesem Thema.",
    "crossword.asset.failed": "Fehler beim Laden des {type}-Bildes.",

    // ============= 19. TOOLTIPS (14 Schlüssel) =============
    "tooltip.bring.forward": "Ausgewähltes Objekt nach vorne bewegen",
    "tooltip.send.backward": "Ausgewähltes Objekt nach hinten bewegen",
    "tooltip.align.left": "Ausgewählte Objekte links ausrichten",
    "tooltip.center.h": "Ausgewählte Objekte horizontal zentrieren",
    "tooltip.align.right": "Ausgewählte Objekte rechts ausrichten",
    "tooltip.align.top": "Ausgewählte Objekte oben ausrichten",
    "tooltip.center.v": "Ausgewählte Objekte vertikal zentrieren",
    "tooltip.align.bottom": "Ausgewählte Objekte unten ausrichten",
    "tooltip.center.page.h": "Horizontal auf der Seite zentrieren",
    "tooltip.center.page.v": "Vertikal auf der Seite zentrieren",
    "tooltip.delete": "Ausgewählte Objekte löschen",
    "tooltip.grayscale": "In Graustufen konvertieren",
    "tooltip.clear.all": "Alle Inhalte löschen",
    "tooltip.generate": "Kreuzworträtsel generieren",

    // ============= 20. KREUZWORTRÄTSEL-SPEZIFISCHE BEGRIFFE (8 Schlüssel) =============
    "crossword.term.across": "Waagerecht",
    "crossword.term.down": "Senkrecht",
    "crossword.term.clue": "Hinweis",
    "crossword.term.answer": "Antwort",
    "crossword.term.grid": "Raster",
    "crossword.term.puzzle": "Rätsel",
    "crossword.term.solution": "Lösung",
    "crossword.term.hint": "Tipp",

    // ============= 21. HILFEMELDUNGEN (6 Schlüssel) =============
    "crossword.help.theme.generate": "Wähle ein Thema um automatisch ein Kreuzworträtsel mit zufälligen Bildern zu erstellen",
    "crossword.help.individual.select": "Oder wähle manuell mindestens 8 Bilder für dein Kreuzworträtsel",
    "crossword.help.image.click.add": "Klicke auf Bilder um sie zur Auswahl hinzuzufügen",
    "crossword.help.image.click.remove": "Klicke auf ausgewählte Bilder um sie zu entfernen",
    "crossword.help.upload": "Lade eigene Bilder hoch für dein Kreuzworträtsel",
    "crossword.help.min.requirement": "Kreuzworträtsel benötigen mindestens 8 Bilder zur Generierung"
  }
};

/**
 * ÜBERSETZUNGSNOTIZEN UND ERKLÄRUNGEN
 * =====================================
 *
 * TERMINOLOGIE-ENTSCHEIDUNGEN:
 *
 * 1. "Crossword" → "Kreuzworträtsel"
 *    - Etablierter deutscher Begriff
 *    - Allgemein bekannt und verständlich
 *
 * 2. "Worksheet" → "Arbeitsblatt"
 *    - Standard im deutschen Bildungswesen
 *    - Von Lehrern täglich verwendet
 *
 * 3. "Answer Key" → "Lösungsblatt"
 *    - Gebräuchlicher als "Lösungsschlüssel"
 *    - Kurz und prägnant
 *
 * 4. "Clue" → "Hinweis"
 *    - Standard bei deutschen Kreuzworträtseln
 *    - Alternativ: "Frage" bei textbasierten Rätseln
 *
 * 5. "Generate" → "Generieren" / "Erstellen"
 *    - Kontextabhängige Verwendung
 *    - "Generieren" für automatische Prozesse
 *    - "Erstellen" für Endprodukte
 *
 * 6. "Upload" → "Hochladen"
 *    - Etablierter Begriff
 *    - Verständlicher als "Upload" für alle Altersgruppen
 *
 * 7. "Theme" → "Thema"
 *    - Direkte, verständliche Übersetzung
 *
 * 8. "Grid" → "Raster"
 *    - Technisch korrekt für Kreuzworträtsel-Gitter
 *
 * 9. "Across/Down" → "Waagerecht/Senkrecht"
 *    - Standard-Terminologie bei deutschen Kreuzworträtseln
 *    - Präziser als "horizontal/vertikal"
 *
 * 10. "Grayscale" → "Graustufen"
 *     - Etablierter Begriff in der Bildbearbeitung
 *
 * SPRACHLICHE BESONDERHEITEN:
 *
 * - Du-Form: Konsistent verwendet (moderne Software-Konvention)
 * - Imperativ: Direkt aber höflich ("Wähle", "Klicke")
 * - Fehler: Klar und hilfreich formuliert
 * - Technische Präzision bei Fachbegriffen
 *
 * KULTURELLE ANPASSUNGEN:
 *
 * - Papierformate: Sowohl US (Letter) als auch EU (A4)
 * - Dezimalzeichen: Komma statt Punkt (8,5 statt 8.5)
 * - Maßeinheiten: Beide Systeme unterstützt
 *
 * KONSISTENZ:
 *
 * - "Bild/Bilder" durchgehend für "image/images"
 * - "wird geladen..." für alle Ladevorgänge
 * - "Fehler beim..." für alle Fehlermeldungen
 * - Einheitliche Verwendung von Verben
 *
 * BESONDERHEITEN DER KREUZWORTRÄTSEL-APP:
 *
 * - Mindestens 8 Bilder erforderlich
 * - Visuelles Kreuzworträtsel mit Bildhinweisen
 * - Automatische Generierung aus Themen
 * - Pädagogischer Fokus für Schulen
 *
 * QUALITÄTSMERKMALE:
 *
 * - Natürlich klingend, nicht übersetzt
 * - Professionell für Bildungskontext
 * - Verständlich für alle Altersgruppen
 * - Technisch präzise wo nötig
 */

// Export für modulare Verwendung
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CROSSWORD_TRANSLATIONS_DE;
}

// Globale Verfügbarkeit im Browser
if (typeof window !== 'undefined') {
  window.CROSSWORD_TRANSLATIONS_DE = CROSSWORD_TRANSLATIONS_DE;
}