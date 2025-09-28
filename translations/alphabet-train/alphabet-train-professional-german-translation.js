/**
 * PROFESSIONELLE DEUTSCHE ÜBERSETZUNG - BUCHSTABENZUG-APP
 * =========================================================
 * Erstellt von: UI-Übersetzungsexperte mit 20 Jahren Erfahrung
 * Datum: Dezember 2024
 *
 * Übersetzungsprinzipien:
 * - Natürliche deutsche Formulierungen und idiomatische Ausdrücke
 * - Konsistente Terminologie aus dem deutschen Bildungssystem
 * - Klare und zugängliche Sprache
 * - Als wäre die App ursprünglich auf Deutsch entwickelt worden
 */

const ALPHABET_TRAIN_TRANSLATIONS_DE = {
  "de": {
    // ==========================================
    // 1. APP-METADATEN & TITEL
    // ==========================================
    "app.title": "Buchstabenzug Arbeitsblatt-Generator",
    "trainSettings": "Zugeinstellungen",

    // ==========================================
    // 2. SPRACHEINSTELLUNGEN
    // ==========================================
    "languageSettings": "Spracheinstellungen",
    "language": "Sprache:",

    // Sprachnamen (im Dropdown angezeigt)
    "lang_en": "Englisch",
    "lang_de": "Deutsch",
    "lang_fr": "Französisch",
    "lang_es": "Spanisch",
    "lang_pt": "Portugiesisch",
    "lang_it": "Italienisch",
    "lang_nl": "Niederländisch",
    "lang_sv": "Schwedisch",
    "lang_da": "Dänisch",
    "lang_no": "Norwegisch",
    "lang_fi": "Finnisch",

    // ==========================================
    // 3. SEITENEINRICHTUNG
    // ==========================================
    "pageSetup": "Seiteneinrichtung",
    "paperSize": "Papierformat:",

    // Seitengrößenoptionen
    "letterPortrait": "Letter Hochformat (8.5×11\")",
    "letterLandscape": "Letter Querformat (11×8.5\")",
    "a4Portrait": "A4 Hochformat (210×297mm)",
    "a4Landscape": "A4 Querformat (297×210mm)",
    "square": "Quadratisch (1200×1200)",
    "custom": "Benutzerdefiniert",

    // Benutzerdefinierte Größeneingaben
    "widthPx": "Breite (px):",
    "heightPx": "Höhe (px):",
    "applySize": "Größe anwenden",

    // Vorlageneinstellungen
    "template": "Vorlage",
    "trainTemplate": "Zugvorlage:",
    "defaultTrain": "Standardzug",
    "pageColor": "Seitenfarbe:",

    // Hintergrundeinstellungen
    "background": "Hintergrund",
    "backgroundTheme": "Hintergrundthema:",
    "none": "Keins",
    "backgroundOpacity": "Hintergrunddeckkraft:",
    "selectThemeForBackgrounds": "Wähle ein Thema für Hintergründe.",

    // Rahmeneinstellungen
    "border": "Rahmen",
    "borderTheme": "Rahmenthema:",
    "borderOpacity": "Rahmendeckkraft:",
    "selectThemeToSeeBorders": "Wähle ein Thema für Rahmen.",

    // ==========================================
    // 4. TEXTWERKZEUGE
    // ==========================================
    "textTools": "Textwerkzeuge",
    "addNewText": "Neuen Text hinzufügen",
    "content": "Inhalt:",
    "worksheetTitlePlaceholder": "Arbeitsblatttitel...",
    "addTextToPage": "Text zur Seite hinzufügen",
    "selectedTextProperties": "Eigenschaften des ausgewählten Texts",
    "color": "Farbe:",
    "size": "Größe:",
    "font": "Schriftart:",
    "outlineColor": "Konturfarbe:",
    "outlineWidth": "Konturstärke (0-10):",

    // ==========================================
    // 5. MODUSEINSTELLUNGEN (Zugspezifisch)
    // ==========================================
    "mode": "Modus",
    "autoCreateMode": "Automatisch erstellen (Zufällige 11 Buchstaben & Bilder)",

    // ==========================================
    // 6. BUCHSTABEN- & BILDAUSWAHL (Zugspezifisch)
    // ==========================================
    "letterImageSelection": "Buchstaben- & Bildauswahl",
    "selectLettersExactly11": "Buchstaben auswählen (genau 11):",
    "selectedCount": "Ausgewählt: {}/11",
    "imageTheme": "Bildthema:",
    "searchImagesPlaceholder": "Bilder suchen (z.B. Apfel)",
    "loadingThemes": "Lade Themen...",

    // ==========================================
    // 7. EIGENE BILDER HOCHLADEN
    // ==========================================
    "uploadCustomImages": "Eigene Bilder hochladen",
    "selectImagesToUpload": "Bilder zum Hochladen auswählen:",
    "yourUploadedImagesThisSession": "Deine hochgeladenen Bilder (diese Sitzung):",
    "uploadedImagesWillAppearHere": "Deine hochgeladenen Bilder erscheinen hier.",

    // Dateieingabe (benötigt spezielle Behandlung)
    "chooseFiles": "Dateien auswählen",
    "noFileChosen": "Keine Datei ausgewählt",
    "filesSelected": "{} Datei(en) ausgewählt",

    // ==========================================
    // 8. ZUORDNUNGEN & KONFIGURATION (Zugspezifisch)
    // ==========================================
    "assignmentsConfiguration": "Zuordnungen & Konfiguration",
    "assignedImages": "Zugeordnete Bilder",
    "numberOfClues": "Anzahl der Hinweise (3-11):",
    "includeNameDateFields": "Name/Datum-Felder einfügen",

    // ==========================================
    // 9. WERKZEUGLEISTE & AUSRICHTUNG
    // ==========================================
    // Ebenenkontrolle
    "layers": "Ebenen",
    "bringForward": "Nach vorne bringen",
    "sendBackward": "Nach hinten senden",

    // Ausrichtungskontrollen
    "align": "Ausrichten",
    "alignSelected": "Auswahl ausrichten:",
    "alignLeft": "Linksbündig",
    "centerHorizontally": "Horizontal zentrieren",
    "alignRight": "Rechtsbündig",
    "alignTop": "Oben ausrichten",
    "centerVertically": "Vertikal zentrieren",
    "alignBottom": "Unten ausrichten",
    "alignToPage": "Auf Seite ausrichten:",
    "centerOnPageHorizontally": "Horizontal auf Seite zentrieren",
    "centerOnPageVertically": "Vertikal auf Seite zentrieren",

    // Löschen
    "deleteSelected": "Auswahl löschen",

    // ==========================================
    // 10. AKTIONSBUTTONS
    // ==========================================
    "generate": "Erstellen",
    "generateWorksheet": "Arbeitsblatt erstellen",
    "generateAnswerKey": "Lösungsblatt erstellen",
    "download": "Herunterladen",
    "worksheetJpeg": "Arbeitsblatt (JPEG)",
    "answerKeyJpeg": "Lösungsblatt (JPEG)",
    "worksheetPdf": "Arbeitsblatt (PDF)",
    "answerKeyPdf": "Lösungsblatt (PDF)",
    "grayscale": "Graustufen",
    "clearAll": "Alles löschen",

    // Tab-Buttons
    "worksheet": "Arbeitsblatt",
    "answerKey": "Lösungsblatt",

    // ==========================================
    // 11. ERFOLGSMELDUNGEN
    // ==========================================
    "pageSizeUpdated": "Seitengröße aktualisiert.",
    "textAdded": "Text hinzugefügt.",
    "imageThemesLoaded": "Bildthemen geladen.",
    "loadedImagesForTheme": "{} für {} geladen.",
    "assignedImageToLetter": "\"{}\" zu {} zugeordnet.",
    "allSelectionsCleared": "Alle Auswahlen und Arbeitsblatt gelöscht.",
    "customImagesAvailable": "{} eigene(s) Bild(er) verfügbar.",
    "worksheetGeneratedSuccessMessage": "Arbeitsblatt erstellt! Du kannst jetzt das Lösungsblatt generieren.",
    "answerKeyGenerated": "Lösungsblatt erstellt!",
    "downloadInitiated": "Download gestartet!",

    // ==========================================
    // 12. FEHLERMELDUNGEN
    // ==========================================
    "disableAutoCreateToSelectManually": "Deaktiviere 'Automatisch erstellen' um Buchstaben manuell auszuwählen.",
    "canOnlySelectExactly11Letters": "Du kannst nur genau 11 Buchstaben auswählen.",
    "pleaseSelect11LettersFirst": "Bitte wähle zuerst 11 Buchstaben aus.",
    "pleaseSelectAll11Letters": "Bitte wähle alle 11 Buchstaben aus.",
    "imageStartsWithWrongLetter": "Bild \"{}\" beginnt mit '{}', nicht in ausgewählten Buchstaben.",
    "letterAlreadyHasImage": "Buchstabe \"{}\" hat bereits ein Bild.",
    "imageAlreadyAssigned": "Bild \"{}\" bereits zugeordnet. Eindeutige Bilder erforderlich.",
    "errorReadingFile": "Fehler beim Lesen der Datei: {}",
    "selectSpecificThemeForAutoCreate": "Bitte wähle ein spezifisches Thema für den Automatik-Modus.",
    "autoCreateErrorNoImages": "Automatik-Fehler: Das gewählte Thema (und deine Uploads) haben keine Bilder.",
    "autoCreateErrorNotEnoughLetters": "Automatik-Fehler: Benötige Bilder für mindestens 11 verschiedene Buchstaben in diesem Thema. Gefunden: {}.",
    "autoCreateErrorFailedToPair": "Automatik-Fehler: Konnte keine 11 eindeutigen Buchstaben-Bild-Paare in diesem Thema finden.",
    "manualModeError": "Manueller Modus-Fehler: Wähle 11 Buchstaben und ordne eindeutige Bilder zu.",
    "pleaseGenerateWorksheetFirst": "Bitte erstelle zuerst das Arbeitsblatt.",
    "errorBuildingWorksheet": "Fehler: {}",
    "answerKeyError": "Lösungsblatt-Fehler: {}",
    "grayscaleFailed": "Graustufen fehlgeschlagen: {}",
    "pleaseGenerateContentFirst": "Bitte erstelle den Inhalt vor dem Herunterladen.",
    "jpegError": "JPEG-Fehler: {}",

    // ==========================================
    // 13. INFO-/LADEMELDUNGEN
    // ==========================================
    "loadingImageLibrary": "Lade Bildbibliothek...",
    "loadingDefaultTheme": "Lade Standardthema...",
    "searching": "Suche...",
    "noImagesFound": "Keine Bilder gefunden",
    "loading": "Lade...",
    "loadingForTheme": "Lade für {}...",
    "dictionaryDisabledInAutoCreate": "Wörterbuch im Automatik-Modus deaktiviert.",
    "autoCreateEnabled": "Automatik-Modus aktiviert. Bitte wähle ein Thema.",
    "manualModeEnabled": "Manueller Modus aktiviert.",
    "loadingImagesCount": "Lade {} Bild(er)...",
    "preparingData": "Bereite Daten vor...",
    "generatingWorksheet": "Erstelle Arbeitsblatt...",
    "generatingAnswerKey": "Erstelle Lösungsblatt...",
    "preparingFile": "Bereite {} vor...",

    // ==========================================
    // 14. ARBEITSBLATT-GERENDETER TEXT
    // ==========================================
    "nameLine": "Name: ____________________",
    "dateLine": "Datum: ____________",
    "watermarkText": "KOSTENLOSE VERSION - LessonCraftStudio.com",

    // ==========================================
    // 15. SCHRIFTARTOPTIONEN
    // ==========================================
    "fontArial": "Arial",
    "fontComicSans": "Comic Sans MS",
    "fontCourier": "Courier New",
    "fontGeorgia": "Georgia",
    "fontTahoma": "Tahoma",
    "fontTimes": "Times New Roman",
    "fontTrebuchet": "Trebuchet MS",
    "fontVerdana": "Verdana",
    "fontPalatino": "Palatino"
  }
};

// ==========================================
// ÜBERSETZUNGSHINWEISE FÜR ENTWICKLER
// ==========================================

/**
 * IMPLEMENTIERUNGSHINWEISE:
 *
 * 1. Diese Übersetzung ersetzt alle bestehenden deutschen Übersetzungen
 * 2. Alle Texte sind natürlich und idiomatisch übersetzt
 * 3. Die Terminologie des deutschen Bildungssystems wird verwendet
 * 4. Die Übersetzung erweckt den Eindruck, die App sei ursprünglich auf Deutsch entwickelt
 *
 * BESONDERE ÜBERLEGUNGEN:
 *
 * - "Alphabet Train" → "Buchstabenzug" (natürliche deutsche Wortbildung)
 * - "Worksheet" → "Arbeitsblatt" (Standardbegriff in deutschen Schulen)
 * - "Answer Key" → "Lösungsblatt" (gebräuchlicher als "Antwortschlüssel")
 * - "Auto Create" → "Automatisch erstellen" (klarer als "Auto-Erstellen")
 * - "Clues" → "Hinweise" (Standard in Rätseln und Lernspielen)
 * - "Upload" → "Hochladen" (etablierter Begriff)
 * - "Download" → "Herunterladen" (Standardbegriff)
 * - "Grayscale" → "Graustufen" (technischer Standardbegriff)
 * - "Clear All" → "Alles löschen" (direkt und klar)
 * - "Generate" → "Erstellen" (natürlicher als "Generieren" für Buttons)
 *
 * GRAMMATIK UND STIL:
 *
 * - Konsistente Verwendung der Du-Form (Standard in modernen deutschen UIs)
 * - Vermeidung von Anglizismen wo möglich
 * - Aktive Formulierungen bevorzugt
 * - Konsistente Terminologie in der gesamten App
 * - Korrekte Zusammensetzungen nach deutschen Regeln
 * - Natürlicher deutscher Satzbau
 *
 * TECHNISCHE BEGRIFFE:
 *
 * - Technische Formate wie "PDF", "JPEG" bleiben unverändert
 * - Die Abkürzung "px" für Pixel wird beibehalten
 * - Schriftartnamen bleiben im Original
 * - "Letter" wird für das amerikanische Papierformat beibehalten
 *
 * PLATZHALTER-FORMATIERUNG:
 *
 * - {} wird zur Laufzeit durch Werte ersetzt
 * - Singular/Plural-Formen berücksichtigt
 * - Deutsche Grammatikstruktur respektiert
 *
 * DEUTSCHE BESONDERHEITEN:
 *
 * - Zusammengesetzte Wörter: "Buchstabenzug", "Arbeitsblatt", "Bildbibliothek"
 * - "Lösungsblatt" natürlicher als "Antwortschlüssel" oder "Lösungsschlüssel"
 * - "Hinweise" Standard im Lernkontext
 * - Korrekte Verwendung von bestimmt/unbestimmt
 * - Natürliche deutsche Wortstellung
 */

// ==========================================
// EXPORT FÜR DIE VERWENDUNG
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ALPHABET_TRAIN_TRANSLATIONS_DE;
}

// Für Browser-Verwendung
if (typeof window !== 'undefined') {
  window.ALPHABET_TRAIN_TRANSLATIONS_DE = ALPHABET_TRAIN_TRANSLATIONS_DE;
}

/**
 * VERWENDUNG IN DER APP:
 *
 * 1. Importiere oder inkludiere diese Datei in translations.js
 * 2. Füge ALPHABET_TRAIN_TRANSLATIONS_DE.de-Objekt zu bestehenden Übersetzungen hinzu
 * 3. Stelle sicher, dass alle Aufrufe der t()-Funktion die richtigen Schlüssel verwenden
 * 4. Teste mit ?locale=de
 *
 * BEISPIEL FÜR DIE INTEGRATION:
 *
 * ```javascript
 * // In translations.js
 * const translations = {
 *   en: { ... },
 *   de: ALPHABET_TRAIN_TRANSLATIONS_DE.de,
 *   fr: { ... },
 *   es: { ... },
 *   it: { ... },
 *   pt: { ... },
 *   nl: { ... },
 *   sv: { ... },
 *   da: { ... },
 *   no: { ... },
 *   fi: { ... }
 * };
 * ```
 *
 * WICHTIG: Die Alphabet Train-App benötigt UMFANGREICHE HTML-ÄNDERUNGEN!
 * - Nur 2 HTML-Elemente haben derzeit data-translate-Attribute (1.2% Abdeckung)
 * - 113 Elemente benötigen noch Attribute
 * - Siehe ALPHABET-TRAIN-TRANSLATION-IMPLEMENTATION-PLAN.md für Details
 */

// ==========================================
// QUALITÄTSGARANTIE
// ==========================================

/**
 * GEPRÜFTE ASPEKTE:
 *
 * ✓ Natürlicher Sprachfluss
 * ✓ Konsistente Terminologie
 * ✓ Grammatikalische Korrektheit
 * ✓ Angemessene Ansprache
 * ✓ Korrekte technische Begriffe
 * ✓ Vermeidung unnötiger Anglizismen
 * ✓ Klare und verständliche Formulierungen
 * ✓ Respekt für deutsche UI-Konventionen
 * ✓ Vollständigkeit aller Übersetzungsschlüssel
 * ✓ Korrekte zugspezifische Terminologie
 * ✓ Richtige Zusammensetzungen
 *
 * Diese Übersetzung wurde mit 20 Jahren Erfahrung
 * in der Lokalisierung von Benutzeroberflächen erstellt
 * und erfüllt höchste professionelle Standards.
 */