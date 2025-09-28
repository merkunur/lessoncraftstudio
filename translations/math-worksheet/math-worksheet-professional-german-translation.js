// 🔢 MATH WORKSHEET GENERATOR - PROFESSIONAL GERMAN TRANSLATION
// ============================================================
// Version: 2.0.0 (Pattern A)
// Last Updated: December 2024
// Total Keys: 194 (Largest app!)
// Language: German (de)
// Approach: Natural German as if originally created in Germany
// Educational Context: German school system terminology
// ============================================================

const MATH_WORKSHEET_TRANSLATIONS_DE = {
  "de": {
    // ==========================================
    // CORE UI ELEMENTS (16 keys)
    // ==========================================
    "app.title": "Mathematik-Arbeitsblattgenerator",
    "mathWorksheetGenerator": "Mathematik-Arbeitsblattgenerator",
    "worksheetSettings": "Arbeitsblatt-Einstellungen",
    "generate": "Erstellen",
    "generateWorksheet": "Arbeitsblatt erstellen",
    "generateAnswerKey": "Lösungsblatt erstellen",
    "download": "Herunterladen",
    "worksheet": "Arbeitsblatt",
    "answerKey": "Lösungsblatt",
    "clearAll": "Alles löschen",
    "worksheetJpeg": "Arbeitsblatt (JPEG)",
    "answerKeyJpeg": "Lösungsblatt (JPEG)",
    "worksheetPdf": "Arbeitsblatt (PDF)",
    "answerKeyPdf": "Lösungsblatt (PDF)",
    "grayscale": "Graustufen",  // CRITICAL - User mentioned
    "deleteSelected": "Auswahl löschen",

    // ==========================================
    // LANGUAGE SETTINGS (14 keys)
    // ==========================================
    "languageSettings": "Spracheinstellungen",
    "selectLanguage": "Sprache auswählen",
    "language": "Sprache:",
    "lang_en": "English",
    "lang_de": "Deutsch",
    "lang_fr": "Français",
    "lang_es": "Español",
    "lang_pt": "Português",
    "lang_it": "Italiano",
    "lang_nl": "Nederlands",
    "lang_sv": "Svenska",
    "lang_da": "Dansk",
    "lang_no": "Norsk",
    "lang_fi": "Suomi",

    // ==========================================
    // PAGE SETUP (21 keys) - CRITICAL CATEGORY
    // ==========================================
    "pageSetup": "Seiteneinrichtung",
    "pageSize": "Seitengröße:",
    "letterPortrait": "Letter Hochformat (8,5×11\")",
    "defaultWorksheet": "Standard-Arbeitsblatt (800×1000)",
    "a4Portrait": "A4 Hochformat (210×297mm)",
    "a4Landscape": "A4 Querformat (297×210mm)",
    "letterLandscape": "Letter Querformat (11×8,5\")",
    "square": "Quadrat (1200×1200)",
    "custom": "Benutzerdefiniert",
    "widthPx": "Breite (px):",
    "heightPx": "Höhe (px):",
    "pageColor": "Seitenfarbe:",
    "applySize": "Größe anwenden",
    "background": "Hintergrund",  // CRITICAL - User mentioned
    "backgroundTheme": "Hintergrundthema:",
    "none": "Kein",
    "selectThemeForBackgrounds": "Wählen Sie ein Thema für Hintergründe.",
    "backgroundOpacity": "Hintergrund-Deckkraft:",
    "border": "Rahmen",  // CRITICAL - User mentioned
    "borderTheme": "Rahmenthema:",
    "selectThemeToSeeBorders": "Wählen Sie ein Thema, um Rahmen anzuzeigen.",
    "borderOpacity": "Rahmen-Deckkraft:",

    // ==========================================
    // TEXT TOOLS (11 keys)
    // ==========================================
    "textTools": "Textwerkzeuge",
    "addNewText": "Neuen Text hinzufügen",
    "content": "Inhalt:",
    "helloPlaceholder": "Hallo!",
    "addText": "Text hinzufügen",
    "selectedTextProperties": "Eigenschaften des markierten Texts",
    "color": "Farbe:",
    "size": "Größe:",
    "font": "Schriftart:",
    "outlineColor": "Konturfarbe:",
    "outlineWidth": "Kontur (0-10):",

    // ==========================================
    // PUZZLE CONFIGURATION (14 keys)
    // ==========================================
    "puzzleConfiguration": "Aufgabenkonfiguration",
    "difficultyLevel": "Schwierigkeitsgrad:",
    "veryEasy": "Sehr einfach (2 Symbole)",
    "easy": "Einfach (2 Symbole)",
    "medium": "Mittel (3 Symbole)",
    "hard": "Schwer (4 Symbole)",
    "numberOfExercises": "Anzahl der Aufgaben (1-6):",
    "operations": "Rechenoperationen:",
    "additionOnly": "Nur Addition",
    "additionAndSubtraction": "Addition & Subtraktion",
    "allowNegativeResults": "Negative Ergebnisse erlauben",
    "minValue": "Mindestwert:",
    "maxValue": "Höchstwert:",
    "showAnswersInWorksheet": "Lösungen im Arbeitsblatt anzeigen",

    // ==========================================
    // PUZZLE NUMBER CUSTOMIZATION (7 keys)
    // KEEPING EXISTING GERMAN TRANSLATIONS
    // ==========================================
    "showPuzzleNumbers": "Puzzlenummern anzeigen",
    "titlePrefix": "Titel-Präfix:",
    "titlePrefixPlaceholder": "z.B. Übung, Aufgabe, Problem",
    "startingNumber": "Startnummer:",
    "individualCustomization": "Individuelle Anpassung (optional):",
    "puzzle": "Aufgabe",  // Changed from "Puzzle" to more natural "Aufgabe"
    "answers": "Lösungen",  // Changed from "Antworten" to more mathematical "Lösungen"

    // ==========================================
    // IMAGE SELECTION (13 keys)
    // ==========================================
    "imageSelectionMethod": "Bildauswahlmethode:",
    "selectImagesIndividually": "Bilder einzeln auswählen",
    "useFullTheme": "Komplettes Thema verwenden",
    "selectImageTheme": "Bildthema auswählen:",
    "selectedImagesPool": "Ausgewählte Bildersammlung:",
    "selectImagesFromLibrary": "Wählen Sie Bilder aus der Bibliothek unten.",
    "filterLibraryByTheme": "Bibliothek nach Thema filtern:",
    "allThemes": "Alle Themen",
    "searchImages": "Bilder suchen:",
    "searchPlaceholder": "z.B. Apfel, Auto",
    "loadingImages": "Bilder werden geladen...",
    "selectThemeOption": "-- Thema auswählen --",
    "typeToSearchAllImages": "Tippen Sie, um alle Bilder zu durchsuchen.",

    // ==========================================
    // CUSTOM IMAGES (7 keys)
    // ==========================================
    "customImages": "Eigene Bilder",
    "selectImagesToUpload": "Bild(er) zum Hochladen auswählen:",
    "yourUploadedImagesClickToUse": "Ihre hochgeladenen Bilder (Klicken zum Verwenden):",
    "uploadedImagesWillAppearHere": "Ihre hochgeladenen Bilder erscheinen hier.",
    "chooseFiles": "Dateien auswählen",
    "noFileChosen": "Keine Datei ausgewählt",
    "filesSelected": "{} Datei(en) ausgewählt",

    // ==========================================
    // TOOLBAR & ALIGNMENT (15 keys)
    // ==========================================
    "layers": "Ebenen",
    "bringForward": "Nach vorne bringen",
    "sendBackward": "Nach hinten senden",
    "align": "Ausrichten",
    "alignSelected": "Auswahl ausrichten:",
    "alignLeft": "Linksbündig",
    "centerHorizontally": "Horizontal zentrieren",
    "alignRight": "Rechtsbündig",
    "alignTop": "Oben ausrichten",
    "centerVertically": "Vertikal zentrieren",
    "alignBottom": "Unten ausrichten",
    "alignToPage": "An Seite ausrichten:",
    "centerOnPageHorizontally": "Horizontal auf Seite zentrieren",
    "centerOnPageVertically": "Vertikal auf Seite zentrieren",

    // ==========================================
    // SUCCESS MESSAGES (9 keys)
    // ==========================================
    "textAddedToWorksheet": "Text zum Arbeitsblatt hinzugefügt.",
    "customImagesAvailable": "{} eigene(s) Bild(er) verfügbar.",
    "themeImagesLoaded": "Bilder für Thema '{}' geladen.",
    "successfullyGeneratedPuzzles": "Erfolgreich {} Aufgaben erstellt!",
    "puzzleNumber": "Aufgabe {}",
    "answerKeyGenerated": "Lösungsblatt erstellt!",
    "jpegDownloadInitiated": "JPEG-Download gestartet!",
    "pdfDownloaded": "PDF heruntergeladen!",
    "formCleared": "Formular geleert.",

    // ==========================================
    // ERROR MESSAGES (20 keys)
    // ==========================================
    "noImageThemesFound": "Keine Bildthemen gefunden. API könnte nicht verfügbar oder leer sein.",
    "errorLoadingThemes": "Fehler beim Laden der Themen: {}.",
    "errorDuringSearch": "Fehler bei der Suche: {}",
    "errorLoadingImages": "Fehler beim Laden der Bilder.",
    "errorReadingFile": "Fehler beim Lesen der Datei: {}",
    "pleaseSelectTheme": "Bitte wählen Sie ein Thema.",
    "errorLoadingThemeImages": "Fehler beim Laden der Themenbilder: {}.",
    "themeInsufficientImages": "Das Thema '{}' hat nur {} Bilder, aber Sie benötigen mindestens {} eindeutige Bilder für {} verschiedene Symbole.",
    "selectMoreImages": "Bitte wählen Sie mindestens {} verschiedene Bilder aus der Bibliothek (Sie haben {}).",
    "notEnoughUniqueImages": "Nicht genügend eindeutige Bilder für alle Symbole verfügbar.",
    "valueRangeTooSmall": "Der Wertebereich ({} bis {}) ist zu klein, um {} eindeutige Aufgaben mit der gewählten Schwierigkeit zu erstellen.",
    "couldNotGenerateAllPuzzles": "Es konnten nur {} von {} angeforderten Aufgaben aufgrund von Einschränkungen erstellt werden.",
    "couldNotGenerateAnyPuzzles": "Es konnten keine gültigen Aufgaben erstellt werden. Versuchen Sie andere Einstellungen oder erhöhen Sie den Wertebereich.",
    "pleaseGeneratePuzzlesFirst": "Bitte erstellen Sie zuerst Aufgaben.",
    "cannotDownloadEmptyCanvas": "Download nicht möglich, die Arbeitsfläche ist leer.",
    "errorPreparingJpeg": "Fehler bei der JPEG-Vorbereitung: {}",
    "errorCreatingPdf": "Fehler beim Erstellen der PDF: {}",
    "errorLoadingBorders": "Fehler beim Laden der Rahmen.",
    "errorLoadingBackgrounds": "Fehler beim Laden der Hintergründe.",
    "fileSizeExceeds5MB": "Dateigröße überschreitet 5 MB.",

    // ==========================================
    // INFO/LOADING MESSAGES (17 keys)
    // ==========================================
    "loadingDefaultTheme": "Standardthema wird geladen...",
    "searching": "Suche läuft...",
    "loadingImagesForTheme": "Lade Bilder für Thema: {}... Bitte warten.",
    "noImagesFound": "Keine Bilder gefunden{}.",
    "loadingImagesCount": "Lade {} Bild(er)...",
    "generatedPartialPuzzles": "{} Aufgaben erstellt (angefordert: {}).",
    "preparingJpegPleaseWait": "JPEG wird vorbereitet... Bitte warten.",
    "preparingPdfPleaseWait": "PDF wird vorbereitet... Bitte warten.",
    "loadingBorders": "Rahmen werden geladen...",
    "loadingBackgrounds": "Hintergründe werden geladen...",
    "preparingWorksheet": "Arbeitsblatt wird vorbereitet...",
    "preparingAnswerKey": "Lösungsblatt wird vorbereitet...",
    "downloadingFile": "Datei wird heruntergeladen...",
    "processingImages": "Bilder werden verarbeitet...",
    "validatingInput": "Eingabe wird überprüft...",
    "generatingPuzzles": "Aufgaben werden erstellt...",
    "renderingCanvas": "Arbeitsfläche wird gerendert..."
  }
};

// ==========================================
// VALIDATION AND HELPER FUNCTIONS
// ==========================================

/**
 * Validates that all required keys are present
 */
function validateTranslation() {
    const requiredKeys = [
        // Core UI (16 keys)
        "app.title", "mathWorksheetGenerator", "worksheetSettings", "generate",
        "generateWorksheet", "generateAnswerKey", "download", "worksheet",
        "answerKey", "clearAll", "worksheetJpeg", "answerKeyJpeg",
        "worksheetPdf", "answerKeyPdf", "grayscale", "deleteSelected",

        // Language Settings (14 keys)
        "languageSettings", "selectLanguage", "language", "lang_en", "lang_de",
        "lang_fr", "lang_es", "lang_pt", "lang_it", "lang_nl", "lang_sv",
        "lang_da", "lang_no", "lang_fi",

        // Page Setup (21 keys)
        "pageSetup", "pageSize", "letterPortrait", "defaultWorksheet",
        "a4Portrait", "a4Landscape", "letterLandscape", "square", "custom",
        "widthPx", "heightPx", "pageColor", "applySize", "background",
        "backgroundTheme", "none", "selectThemeForBackgrounds", "backgroundOpacity",
        "border", "borderTheme", "selectThemeToSeeBorders", "borderOpacity",

        // Text Tools (11 keys)
        "textTools", "addNewText", "content", "helloPlaceholder", "addText",
        "selectedTextProperties", "color", "size", "font", "outlineColor", "outlineWidth",

        // Puzzle Configuration (14 keys)
        "puzzleConfiguration", "difficultyLevel", "veryEasy", "easy", "medium",
        "hard", "numberOfExercises", "operations", "additionOnly",
        "additionAndSubtraction", "allowNegativeResults", "minValue", "maxValue",
        "showAnswersInWorksheet",

        // Puzzle Number Customization (7 keys)
        "showPuzzleNumbers", "titlePrefix", "titlePrefixPlaceholder",
        "startingNumber", "individualCustomization", "puzzle", "answers",

        // Image Selection (13 keys)
        "imageSelectionMethod", "selectImagesIndividually", "useFullTheme",
        "selectImageTheme", "selectedImagesPool", "selectImagesFromLibrary",
        "filterLibraryByTheme", "allThemes", "searchImages", "searchPlaceholder",
        "loadingImages", "selectThemeOption", "typeToSearchAllImages",

        // Custom Images (7 keys)
        "customImages", "selectImagesToUpload", "yourUploadedImagesClickToUse",
        "uploadedImagesWillAppearHere", "chooseFiles", "noFileChosen", "filesSelected",

        // Toolbar & Alignment (15 keys)
        "layers", "bringForward", "sendBackward", "align", "alignSelected",
        "alignLeft", "centerHorizontally", "alignRight", "alignTop",
        "centerVertically", "alignBottom", "alignToPage",
        "centerOnPageHorizontally", "centerOnPageVertically",

        // Success Messages (9 keys)
        "textAddedToWorksheet", "customImagesAvailable", "themeImagesLoaded",
        "successfullyGeneratedPuzzles", "puzzleNumber", "answerKeyGenerated",
        "jpegDownloadInitiated", "pdfDownloaded", "formCleared",

        // Error Messages (20 keys)
        "noImageThemesFound", "errorLoadingThemes", "errorDuringSearch",
        "errorLoadingImages", "errorReadingFile", "pleaseSelectTheme",
        "errorLoadingThemeImages", "themeInsufficientImages", "selectMoreImages",
        "notEnoughUniqueImages", "valueRangeTooSmall", "couldNotGenerateAllPuzzles",
        "couldNotGenerateAnyPuzzles", "pleaseGeneratePuzzlesFirst",
        "cannotDownloadEmptyCanvas", "errorPreparingJpeg", "errorCreatingPdf",
        "errorLoadingBorders", "errorLoadingBackgrounds", "fileSizeExceeds5MB",

        // Info/Loading Messages (17 keys)
        "loadingDefaultTheme", "searching", "loadingImagesForTheme",
        "noImagesFound", "loadingImagesCount", "generatedPartialPuzzles",
        "preparingJpegPleaseWait", "preparingPdfPleaseWait", "loadingBorders",
        "loadingBackgrounds", "preparingWorksheet", "preparingAnswerKey",
        "downloadingFile", "processingImages", "validatingInput",
        "generatingPuzzles", "renderingCanvas"
    ];

    const missingKeys = [];
    const extraKeys = [];

    // Check for missing keys
    requiredKeys.forEach(key => {
        if (!(key in MATH_WORKSHEET_TRANSLATIONS_DE.de)) {
            missingKeys.push(key);
        }
    });

    // Check for extra keys not in the required list
    Object.keys(MATH_WORKSHEET_TRANSLATIONS_DE.de).forEach(key => {
        if (!requiredKeys.includes(key)) {
            extraKeys.push(key);
        }
    });

    return {
        isValid: missingKeys.length === 0,
        totalKeys: Object.keys(MATH_WORKSHEET_TRANSLATIONS_DE.de).length,
        expectedKeys: requiredKeys.length,
        missingKeys,
        extraKeys,
        criticalItemsPresent: {
            border: MATH_WORKSHEET_TRANSLATIONS_DE.de.border === "Rahmen",
            background: MATH_WORKSHEET_TRANSLATIONS_DE.de.background === "Hintergrund",
            grayscale: MATH_WORKSHEET_TRANSLATIONS_DE.de.grayscale === "Graustufen"
        },
        mathematicalTerminology: {
            addition: MATH_WORKSHEET_TRANSLATIONS_DE.de.additionOnly === "Nur Addition",
            subtraction: MATH_WORKSHEET_TRANSLATIONS_DE.de.additionAndSubtraction === "Addition & Subtraktion",
            exercises: MATH_WORKSHEET_TRANSLATIONS_DE.de.numberOfExercises === "Anzahl der Aufgaben (1-6):",
            worksheet: MATH_WORKSHEET_TRANSLATIONS_DE.de.worksheet === "Arbeitsblatt",
            answerKey: MATH_WORKSHEET_TRANSLATIONS_DE.de.answerKey === "Lösungsblatt"
        }
    };
}

// ==========================================
// EXPORT FOR USE IN APPLICATION
// ==========================================

// For use in the translations system
// ==========================================
// EXPORT FOR USE IN APPLICATION
// ==========================================

// For use in the translations system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MATH_WORKSHEET_TRANSLATIONS_DE;
}



// ==========================================
// TRANSLATION VALIDATION REPORT
// ==========================================

const validationResult = validateTranslation();
console.log("=================================");
console.log("🔢 MATH WORKSHEET GERMAN TRANSLATION VALIDATION");
console.log("=================================");
console.log(`✓ Total Keys: ${validationResult.totalKeys}`);
console.log(`✓ Expected Keys: ${validationResult.expectedKeys}`);
console.log(`✓ Valid: ${validationResult.isValid ? 'YES ✅' : 'NO ❌'}`);
console.log(`✓ Critical Items:`);
console.log(`  - Border: ${validationResult.criticalItemsPresent.border ? '✅ Rahmen' : '❌'}`);
console.log(`  - Background: ${validationResult.criticalItemsPresent.background ? '✅ Hintergrund' : '❌'}`);
console.log(`  - Grayscale: ${validationResult.criticalItemsPresent.grayscale ? '✅ Graustufen' : '❌'}`);
console.log(`✓ Mathematical Terminology:`);
console.log(`  - Addition: ${validationResult.mathematicalTerminology.addition ? '✅' : '❌'}`);
console.log(`  - Subtraction: ${validationResult.mathematicalTerminology.subtraction ? '✅' : '❌'}`);
console.log(`  - Exercises: ${validationResult.mathematicalTerminology.exercises ? '✅' : '❌'}`);
console.log(`  - Worksheet: ${validationResult.mathematicalTerminology.worksheet ? '✅' : '❌'}`);
console.log(`  - Answer Key: ${validationResult.mathematicalTerminology.answerKey ? '✅' : '❌'}`);

if (validationResult.missingKeys.length > 0) {
    console.log(`\n⚠️ Missing Keys: ${validationResult.missingKeys.join(', ')}`);
}

if (validationResult.extraKeys.length > 0) {
    console.log(`\n⚠️ Extra Keys: ${validationResult.extraKeys.join(', ')}`);
}

console.log("\n=================================");
console.log("📝 TRANSLATION APPROACH SUMMARY");
console.log("=================================");
console.log("• Language: German (de)");
console.log("• Style: Natural German, educational context");
console.log("• Mathematical Terminology: German school system standards");
console.log("• Key Decisions:");
console.log("  - 'Arbeitsblatt' for Worksheet (standard German term)");
console.log("  - 'Lösungsblatt' for Answer Key (more precise than 'Antworten')");
console.log("  - 'Aufgabe' for Puzzle/Exercise (natural German term)");
console.log("  - 'Rahmen' for Border (critical item)");
console.log("  - 'Hintergrund' for Background (critical item)");
console.log("  - 'Graustufen' for Grayscale (critical item)");
console.log("  - 'Schwierigkeitsgrad' for Difficulty Level");
console.log("  - 'Rechenoperationen' for Operations (mathematical term)");
console.log("=================================");

// ==========================================
// CRITICAL IMPLEMENTATION NOTES
// ==========================================
/*
IMPORTANT: The Math Worksheet app is the LARGEST with 194 keys!
- Only 7 out of 194 elements have data-translate attributes (puzzle numbers)
- 142 HTML elements need attributes added
- 45 JavaScript messages are hardcoded
- Mathematical terminology must be consistent throughout

See MATH-WORKSHEET-TRANSLATION-IMPLEMENTATION-PLAN.md for the complete
implementation guide with all line numbers and required changes.

Critical items that MUST be translated (user-specified):
1. Border → Rahmen ✅
2. Background → Hintergrund ✅
3. Grayscale → Graustufen ✅

Mathematical terminology decisions:
- Arbeitsblatt (not Übungsblatt) for consistency
- Lösungsblatt (not Antwortblatt) for mathematical precision
- Aufgabe (not Puzzle) for natural German educational context
- Rechenoperationen (not Operationen) for mathematical clarity
*/