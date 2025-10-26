// Word Scramble - Professional German Translation
// Translated as if originally created in German for educational software
// Focus: Natural, professional language for teachers and educators

const wordScrambleTranslations = {
    "de": {
        // === MAIN TITLE & CORE UI ===
        "wordScrambleTitle": "Buchstabensalat-Generator",
        "wordScrambleWorksheetGenerator": "Arbeitsblattgenerator • Buchstabensalat",

        // === TOP ACTION BUTTONS ===
        "generate": "Erstellen",
        "generateWorksheet": "Arbeitsblatt erstellen",
        "generateAnswerKey": "Lösungsblatt erstellen",
        "download": "Speichern",
        "worksheetJpeg": "Arbeitsblatt (JPEG)",
        "answerKeyJpeg": "Lösungsblatt (JPEG)",
        "worksheetPdf": "Arbeitsblatt (PDF)",
        "answerKeyPdf": "Lösungsblatt (PDF)",
        "grayscale": "Graustufen",
        "clearAll": "Alles zurücksetzen",

        // === TAB LABELS ===
        "worksheet": "Arbeitsblatt",
        "answerKey": "Lösungsblatt",

        // === MAIN SECTION HEADER ===
        "worksheetSettings": "Einstellungen",

        // === ACCORDION HEADERS ===
        "languageSettings": "Spracheinstellungen",
        "pageSetup": "Seitenformat",
        "textTools": "Textgestaltung",
        "imageSelection": "Bildauswahl",
        "uploadCustomImages": "Eigene Bilder hochladen",
        "problemSettings": "Aufgabeneinstellungen",

        // === LANGUAGE SETTINGS ===
        "selectLanguage": "Sprache auswählen",
        "language": "Sprache:",

        // === PAGE SETUP SECTION ===
        "pageSize": "Papierformat:",
        "letterPortrait": "Letter Hochformat",
        "letterLandscape": "Letter Querformat",
        "a4Portrait": "DIN A4 Hochformat",
        "a4Landscape": "DIN A4 Querformat",
        "legalPortrait": "Legal Hochformat",
        "legalLandscape": "Legal Querformat",
        "custom": "Benutzerdefiniert",
        "widthPx": "Breite (px):",
        "heightPx": "Höhe (px):",
        "pageColor": "Hintergrundfarbe:",
        "applySize": "Format anwenden",

        // === BACKGROUND SECTION ===
        "background": "Hintergrund",
        "backgroundTheme": "Hintergrundmotiv:",
        "selectBackgroundTheme": "Wählen Sie ein Motiv für den Hintergrund.",
        "backgroundOpacity": "Transparenz:",

        // === BORDER SECTION ===
        "border": "Rahmen",
        "borderTheme": "Rahmenmotiv:",
        "selectBorderTheme": "Wählen Sie ein Motiv für den Rahmen.",
        "borderOpacity": "Transparenz:",
        "none": "Ohne",

        // === TEXT TOOLS SECTION ===
        "addNewText": "Text hinzufügen",
        "content": "Inhalt:",
        "enterTextHerePlaceholder": "Text hier eingeben...",
        "addTextToPage": "Text zum Blatt hinzufügen",
        "selectedTextProperties": "Texteigenschaften",
        "color": "Farbe:",
        "size": "Schriftgröße:",
        "font": "Schriftart:",
        "outlineColor": "Konturfarbe:",
        "outlineWidth": "Konturstärke (0-10):",

        // === IMAGE SELECTION SECTION ===
        "availableThemes": "Verfügbare Themen",
        "theme": "Thema:",
        "allThemes": "Alle Themen",
        "searchImagesPlaceholder": "Bilder suchen...",
        "themeImages": "Themenbilder",
        "selectThemeFromDropdown": "Wählen Sie oben ein Thema aus dem Menü.",
        "selectedImages": "Ausgewählte Bilder",
        "selectedCount": "Ausgewählt: {count} / {max}",
        "selectedImagesWillAppear": "Ihre ausgewählten Bilder erscheinen hier.",
        "randomSelect": "Zufällig auswählen",
        "clearSelection": "Auswahl löschen",

        // === PUZZLE SETTINGS ===
        "puzzleSettings": "Rätseleinstellungen",
        "numberOfPuzzles": "Anzahl der Rätsel (1-12):",

        // Difficulty levels - Natural German terms for educational context
        "noClues": "Keine Hinweise",
        "hard": "Schwer",
        "medium": "Mittel",
        "easy": "Leicht",

        // Letter case options
        "upperCase": "Großbuchstaben",
        "lowerCase": "Kleinbuchstaben",

        // Color coding options
        "colorCoded": "Farbcodiert (Vokale/Konsonanten)",
        "blackWhite": "Schwarz-Weiß",

        // === UPLOAD CUSTOM IMAGES SECTION ===
        "selectImagesToUpload": "Bilder zum Hochladen auswählen:",
        "yourUploadedImages": "Ihre hochgeladenen Bilder (diese Sitzung)",
        "uploadedImagesAppearHere": "Ihre hochgeladenen Bilder erscheinen hier.",

        // === PROBLEM SETTINGS SECTION ===
        "includeNameDateFields": "Name/Datum-Felder einfügen",
        "includeExerciseNumbers": "Aufgabennummern anzeigen",

        // === TOOLBAR ===
        "layers": "Ebenen",
        "bringForward": "Nach vorne",
        "sendBackward": "Nach hinten",
        "align": "Ausrichten",
        "alignSelected": "Auswahl ausrichten:",
        "alignToPage": "Am Blatt ausrichten:",
        "deleteSelected": "Auswahl löschen",

        // === SUCCESS MESSAGES ===
        "worksheetGeneratedSuccessfully": "Arbeitsblatt wurde erfolgreich erstellt!",
        "answerKeyGenerated": "Lösungsblatt wurde erstellt!",
        "formCleared": "Formular wurde zurückgesetzt.",
        "downloadInitiated": "Download wurde gestartet!",
        "pdfDownloaded": "PDF wurde gespeichert!",
        "jpegDownloadInitiated": "JPEG-Download wurde gestartet!",
        "customImagesAvailable": "{count} eigene(s) Bild(er) verfügbar.",

        // === ERROR MESSAGES ===
        "couldNotLoadThemes": "Themen konnten nicht geladen werden.",
        "errorLoadingImages": "Fehler beim Laden der Bilder.",
        "maxImagesSelected": "Sie können maximal {count} Bilder auswählen.",
        "pleaseSelectImagesOrTheme": "Bitte wählen Sie Bilder aus oder wählen Sie ein Thema mit Bildern.",
        "pleaseGenerateWorksheetFirst": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
        "failedToLoadImage": "{type}-Bild konnte nicht geladen werden.",
        "errorPreparingImage": "Fehler beim Vorbereiten des Bildes: {error}",
        "pleaseGenerateContentFirst": "Bitte erstellen Sie zuerst Inhalte.",
        "errorCreatingPdf": "Fehler beim Erstellen der PDF-Datei.",
        "errorPreparingJpeg": "Fehler beim Vorbereiten der JPEG-Datei.",

        // === INFO/STATUS MESSAGES ===
        "loading": "Wird geladen...",
        "noImagesFound": "Keine Bilder gefunden{query}.",
        "generatingWorksheet": "Arbeitsblatt wird erstellt...",
        "generatingAnswerKey": "Lösungsblatt wird erstellt...",
        "preparingCanvas": "{canvas} wird vorbereitet...",
        "preparingPdf": "PDF wird vorbereitet...",
        "preparingJpeg": "JPEG wird vorbereitet...",
        "preparingCanvasPdf": "{canvas}-PDF wird vorbereitet...",

        // === NAME/DATE PLACEHOLDERS ===
        "namePlaceholder": "Name: ________________",
        "datePlaceholder": "Datum: ________",

        // === WATERMARK TEXT (FREE VERSION) ===
        "watermarkText": "KOSTENLOSE VERSION - LessonCraftStudio.com",
        "watermarkSmallText": "KOSTENLOSE VERSION",

        // === FILE INPUT (Custom handling needed) ===
        "chooseFiles": "Dateien auswählen",
        "noFileChosen": "Keine Datei ausgewählt",

        // === ADDITIONAL UI ELEMENTS ===
        "difficulty": "Schwierigkeit:",
        "letterCase": "Buchstaben:",
        "letterColoring": "Farbgebung:",

        // === PUZZLE-SPECIFIC TERMS ===
        "scrambledLetters": "Durcheinandergebrachte Buchstaben",
        "correctWord": "Lösungswort",
        "exercise": "Aufgabe",
        "solution": "Lösung",

        // === PROFESSIONAL EDUCATIONAL TERMS ===
        "learningObjective": "Lernziel",
        "competenceLevel": "Kompetenzstufe",
        "differentiatedInstruction": "Differenzierte Förderung"
    },

    // English reference (for completeness)
    "en": {
        "wordScrambleTitle": "Word Scramble Generator",
        "wordScrambleWorksheetGenerator": "Word Scramble Worksheet Generator",
        "worksheetSettings": "Worksheet Settings",
        "languageSettings": "Language Settings",
        "pageSetup": "Page Setup",
        "textTools": "Text Tools",
        "imageSelection": "Image Selection",
        "uploadCustomImages": "Upload Custom Images",
        "problemSettings": "Problem Settings",
        "selectLanguage": "Select Language",
        "language": "Language:",
        "pageSize": "Page Size:",
        "letterPortrait": "Letter (Portrait)",
        "letterLandscape": "Letter (Landscape)",
        "a4Portrait": "A4 (Portrait)",
        "a4Landscape": "A4 (Landscape)",
        "legalPortrait": "Legal (Portrait)",
        "legalLandscape": "Legal (Landscape)",
        "custom": "Custom",
        "widthPx": "Width (px):",
        "heightPx": "Height (px):",
        "pageColor": "Page Color:",
        "applySize": "Apply Size",
        "background": "Background",
        "backgroundTheme": "Background Theme:",
        "selectBackgroundTheme": "Select a theme for backgrounds.",
        "backgroundOpacity": "Background Opacity:",
        "border": "Border",
        "borderTheme": "Border Theme:",
        "selectBorderTheme": "Select a theme to see borders.",
        "borderOpacity": "Border Opacity:",
        "none": "None",
        "addNewText": "Add New Text",
        "content": "Content:",
        "enterTextHerePlaceholder": "Enter text here...",
        "addTextToPage": "Add Text to Page",
        "selectedTextProperties": "Selected Text Properties",
        "color": "Color:",
        "size": "Size:",
        "font": "Font:",
        "outlineColor": "Outline Color:",
        "outlineWidth": "Outline (0-10):",
        "availableThemes": "Available Themes",
        "theme": "Theme:",
        "allThemes": "All Themes",
        "searchImagesPlaceholder": "Search images...",
        "themeImages": "Theme Images",
        "selectThemeFromDropdown": "Select a theme from dropdown above.",
        "selectedImages": "Selected Images",
        "selectedCount": "Selected: {count} / {max}",
        "selectedImagesWillAppear": "Your selected images will appear here.",
        "randomSelect": "Random Select",
        "clearSelection": "Clear Selection",
        "puzzleSettings": "Puzzle Settings",
        "numberOfPuzzles": "Number of Puzzles (1-12):",
        "noClues": "No Clues",
        "hard": "Hard",
        "medium": "Medium",
        "easy": "Easy",
        "upperCase": "Upper Case",
        "lowerCase": "Lower Case",
        "colorCoded": "Color-coded (vowels/consonants)",
        "blackWhite": "Black & White",
        "selectImagesToUpload": "Select images to upload:",
        "yourUploadedImages": "Your Uploaded Images (This Session)",
        "uploadedImagesAppearHere": "Your uploaded images appear here.",
        "includeNameDateFields": "Include Name/Date fields",
        "includeExerciseNumbers": "Include Exercise Numbers",
        "layers": "Layers",
        "bringForward": "Bring Forward",
        "sendBackward": "Send Backward",
        "align": "Align",
        "alignSelected": "Align Selected:",
        "alignToPage": "Align to Page:",
        "deleteSelected": "Delete Selected",
        "generate": "Generate",
        "generateWorksheet": "Generate Worksheet",
        "generateAnswerKey": "Generate Answer Key",
        "download": "Download",
        "worksheetJpeg": "Worksheet (JPEG)",
        "answerKeyJpeg": "Answer Key (JPEG)",
        "worksheetPdf": "Worksheet (PDF)",
        "answerKeyPdf": "Answer Key (PDF)",
        "grayscale": "Grayscale",
        "clearAll": "Clear All",
        "worksheet": "Worksheet",
        "answerKey": "Answer Key",
        "worksheetGeneratedSuccessfully": "Worksheet generated successfully!",
        "answerKeyGenerated": "Answer key generated!",
        "formCleared": "Form cleared.",
        "downloadInitiated": "Download Initiated!",
        "pdfDownloaded": "PDF downloaded!",
        "jpegDownloadInitiated": "JPEG download initiated!",
        "customImagesAvailable": "{count} custom image(s) available.",
        "couldNotLoadThemes": "Could not load themes.",
        "errorLoadingImages": "Error loading images.",
        "maxImagesSelected": "You can select a maximum of {count} images.",
        "pleaseSelectImagesOrTheme": "Please select some images or choose a theme with images.",
        "pleaseGenerateWorksheetFirst": "Please generate a worksheet first.",
        "failedToLoadImage": "Failed to load {type} image.",
        "errorPreparingImage": "Error preparing image: {error}",
        "pleaseGenerateContentFirst": "Please generate content first.",
        "errorCreatingPdf": "Error creating PDF.",
        "errorPreparingJpeg": "Error preparing JPEG.",
        "loading": "Loading...",
        "noImagesFound": "No images found{query}.",
        "generatingWorksheet": "Generating worksheet...",
        "generatingAnswerKey": "Generating answer key...",
        "preparingCanvas": "Preparing {canvas}...",
        "preparingPdf": "Preparing PDF...",
        "preparingJpeg": "Preparing JPEG...",
        "preparingCanvasPdf": "Preparing {canvas} PDF...",
        "namePlaceholder": "Name: ________________",
        "datePlaceholder": "Date: ________",
        "watermarkText": "FREE VERSION - LessonCraftStudio.com",
        "watermarkSmallText": "FREE VERSION",
        "chooseFiles": "Choose Files",
        "noFileChosen": "No file chosen",
        "difficulty": "Difficulty:",
        "letterCase": "Letter Case:",
        "letterColoring": "Letter Coloring:"
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = wordScrambleTranslations;
}

// Note: Translations have been added directly to translations.js
// This file is kept for reference and backup