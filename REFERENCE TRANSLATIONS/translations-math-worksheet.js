/**
 * Math Worksheet Generator - Professional German Translation
 * Natural German UI for Educational Mathematics Software
 *
 * Translation Philosophy:
 * - Professional educational software terminology
 * - Natural German mathematical language
 * - Consistent with German school curriculum standards
 * - Clear, precise terminology for teachers and parents
 * - Child-appropriate where relevant, professional throughout
 */

const translations = {
  "en": {
    // Main Title & Headers
    "mathWorksheetGenerator": "Math Worksheet Generator",
    "worksheetSettings": "Worksheet Settings",

    // Language Settings
    "languageSettings": "Language Settings",
    "selectLanguage": "Select Language",
    "language": "Language:",
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

    // Page Setup
    "pageSetup": "Page Setup",
    "pageSize": "Page Size:",
    "letterPortrait": "Letter Portrait (8.5×11\")",
    "defaultWorksheet": "Default Worksheet (800×1000)",
    "a4Portrait": "A4 Portrait (210×297mm)",
    "a4Landscape": "A4 Landscape (297×210mm)",
    "letterLandscape": "Letter Landscape (11×8.5\")",
    "square": "Square (1200×1200)",
    "custom": "Custom",
    "widthPx": "Width (px):",
    "heightPx": "Height (px):",
    "pageColor": "Page Color:",
    "applySize": "Apply Size",

    // Background Settings
    "background": "Background",
    "backgroundTheme": "Background Theme:",
    "none": "None",
    "selectThemeForBackgrounds": "Select a theme for backgrounds.",
    "backgroundOpacity": "Background Opacity:",

    // Border Settings
    "border": "Border",
    "borderTheme": "Border Theme:",
    "selectThemeToSeeBorders": "Select a theme to see borders.",
    "borderOpacity": "Border Opacity:",

    // Text Tools
    "textTools": "Text Tools",
    "addNewText": "Add New Text",
    "content": "Content:",
    "helloPlaceholder": "Hello!",
    "addText": "Add Text",
    "selectedTextProperties": "Selected Text Properties",
    "color": "Color:",
    "size": "Size:",
    "font": "Font:",
    "outlineColor": "Outline Color:",
    "outlineWidth": "Outline (0-10):",

    // Puzzle Configuration
    "puzzleConfiguration": "Puzzle Configuration",
    "difficultyLevel": "Difficulty Level:",
    "veryEasy2Symbols": "Very Easy (2 Symbols)",
    "easy2Symbols": "Easy (2 Symbols)",
    "medium3Symbols": "Medium (3 Symbols)",
    "hard4Symbols": "Hard (4 Symbols)",
    "numberOfExercises": "Number of Exercises (1-6):",
    "operations": "Operations:",
    "additionOnly": "Addition Only",
    "additionAndSubtraction": "Addition & Subtraction",

    // Puzzle Numbers
    "showPuzzleNumbers": "Show Puzzle Numbers",
    "titlePrefix": "Title Prefix:",
    "titlePrefixPlaceholder": "e.g., Exercise, Problem, Task",
    "startingNumber": "Starting Number:",
    "individualCustomization": "Individual Customization (optional):",
    "puzzle": "Puzzle",
    "answers": "Answers",

    // Image Selection
    "imageSelectionMethod": "Image Selection Method:",
    "selectImagesIndividually": "Select Images Individually",
    "useFullTheme": "Use Full Theme",
    "selectImageTheme": "Select Image Theme:",
    "selectTheme": "Select Theme",
    "selectedImagesPool": "Selected Images Pool:",
    "selectImagesFromLibrary": "Select images from the library below.",
    "filterLibraryByTheme": "Filter Library By Theme:",
    "allThemes": "All Themes",
    "searchImages": "Search Images:",
    "searchPlaceholder": "e.g., apple, car",
    "loadingImages": "Loading images...",

    // Custom Images
    "customImages": "Custom Images",
    "selectImagesToUpload": "Select image(s) to upload:",
    "yourUploadedImagesClickToUse": "Your Uploaded Images (Click to use):",
    "uploadedImagesWillAppearHere": "Your uploaded images will appear here.",
    "chooseFiles": "Choose Files",
    "noFileChosen": "No file chosen",
    "filesSelected": "file(s) selected",

    // Advanced Options
    "allowNegativeResults": "Allow negative results",
    "minValue": "Min value:",
    "maxValue": "Max value:",
    "showAnswersInWorksheet": "Show Answers in Worksheet",

    // Toolbar
    "layers": "Layers",
    "bringForward": "Bring Forward",
    "sendBackward": "Send Backward",
    "align": "Align",
    "alignSelected": "Align Selected:",
    "alignLeft": "Align Left",
    "centerHorizontally": "Center Horizontally",
    "alignRight": "Align Right",
    "alignTop": "Align Top",
    "centerVertically": "Center Vertically",
    "alignBottom": "Align Bottom",
    "alignToPage": "Align to Page:",
    "centerOnPageHorizontally": "Center on Page Horizontally",
    "centerOnPageVertically": "Center on Page Vertically",
    "deleteSelected": "Delete Selected",

    // Action Buttons
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

    // Tabs
    "worksheet": "Worksheet",
    "answerKey": "Answer Key",

    // Success Messages
    "textAddedToWorksheet": "Text added to worksheet.",
    "customImagesAvailable": "{count} custom image(s) available.",
    "themeImagesLoaded": "Theme '{theme}' images loaded.",
    "successfullyGeneratedPuzzles": "Successfully generated {count} puzzles!",
    "puzzleNumber": "Puzzle {number}",
    "answerKeyGenerated": "Answer key generated!",
    "jpegDownloadInitiated": "JPEG Download Initiated!",
    "pdfDownloaded": "PDF Downloaded!",

    // Error Messages
    "noImageThemesFound": "No image themes found. API might be unavailable or empty.",
    "errorLoadingThemes": "Error loading themes.",
    "errorDuringSearch": "Error during search.",
    "errorLoadingImages": "Error loading images.",
    "errorReadingFile": "Error reading file: {filename}",
    "pleaseSelectTheme": "Please select a theme.",
    "errorLoadingThemeImages": "Error loading theme images.",
    "themeInsufficientImages": "The selected theme doesn't have enough unique images for the difficulty level.",
    "selectMoreImages": "Please select more images from the library.",
    "notEnoughUniqueImages": "Not enough unique images available for all symbols.",
    "valueRangeTooSmall": "Value range is too small for the selected settings.",
    "couldNotGenerateAllPuzzles": "Could not generate all requested puzzles. Generated {count} instead.",
    "couldNotGenerateAnyPuzzles": "Could not generate any valid puzzles. Try different settings or increase value range.",
    "pleaseGeneratePuzzlesFirst": "Please generate puzzles first.",
    "cannotDownloadEmptyCanvas": "Cannot download, the canvas is empty.",
    "errorPreparingJpeg": "Error preparing JPEG.",
    "errorCreatingPdf": "Error creating PDF.",
    "errorLoadingBorders": "Error loading borders.",
    "errorLoadingBackgrounds": "Error loading backgrounds.",

    // Info Messages
    "selectThemeOption": "-- Select Theme --",
    "loadingDefaultTheme": "Loading default theme...",
    "typeToSearchAllImages": "Type to search all images.",
    "searching": "Searching...",
    "loadingImagesForTheme": "Loading images for theme: {theme}... Please wait.",
    "noImagesFound": "No images found.",
    "noImagesFoundMatching": "No images found matching \"{query}\".",
    "loadingImagesCount": "Loading {count} image(s)...",
    "generatedPartialPuzzles": "Generated {count} of {requested} puzzles.",
    "preparingJpegPleaseWait": "Preparing JPEG... Please wait.",
    "preparingPdfPleaseWait": "Preparing PDF... Please wait.",
    "loadingBorders": "Loading borders...",
    "loadingBackgrounds": "Loading backgrounds...",
    "selectThemeForBackgrounds": "Select a theme for backgrounds.",
    "noBordersInTheme": "No borders in this theme.",
    "noBackgroundsInTheme": "No backgrounds in this theme.",

    // Watermark
    "freeVersionWatermark": "FREE VERSION - LessonCraftStudio.com",

    // Additional Messages
    "allSettingsCleared": "All settings cleared and canvases reset.",
    "errorDuringGeneration": "Error during generation. Please try again.",
    "pleaseGenerateContentFirst": "Please generate content first.",
    "pleaseGenerateWorksheetFirst": "Please generate a worksheet first.",
    "preparingJpeg": "Preparing JPEG...",
    "preparingPdf": "Preparing PDF..."
  },

  "de": {
    // Main Title & Headers - Educational terminology
    "mathWorksheetGenerator": "Mathe-Arbeitsblatt Generator",
    "worksheetSettings": "Arbeitsblatt-Einstellungen",

    // Language Settings - Native names
    "languageSettings": "Spracheinstellungen",
    "selectLanguage": "Sprache wählen",
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

    // Page Setup - German standard formats
    "pageSetup": "Seiteneinrichtung",
    "pageSize": "Papierformat:",
    "letterPortrait": "US Letter Hochformat (216×279mm)",
    "defaultWorksheet": "Standard-Arbeitsblatt (800×1000)",
    "a4Portrait": "DIN A4 Hochformat (210×297mm)",
    "a4Landscape": "DIN A4 Querformat (297×210mm)",
    "letterLandscape": "US Letter Querformat (279×216mm)",
    "square": "Quadratisch (1200×1200)",
    "custom": "Benutzerdefiniert",
    "widthPx": "Breite (px):",
    "heightPx": "Höhe (px):",
    "pageColor": "Seitenfarbe:",
    "applySize": "Format übernehmen",

    // Background Settings - Creative terminology
    "background": "Hintergrund",
    "backgroundTheme": "Hintergrundmotiv:",
    "none": "Ohne",
    "selectThemeForBackgrounds": "Wählen Sie ein Motiv für Hintergründe.",
    "backgroundOpacity": "Hintergrund-Deckkraft:",

    // Border Settings - Design terminology
    "border": "Rahmen",
    "borderTheme": "Rahmenmotiv:",
    "selectThemeToSeeBorders": "Wählen Sie ein Motiv für Rahmen.",
    "borderOpacity": "Rahmen-Deckkraft:",

    // Text Tools - Standard German UI
    "textTools": "Textwerkzeuge",
    "addNewText": "Text hinzufügen",
    "content": "Inhalt:",
    "helloPlaceholder": "Hallo!",
    "addText": "Text einfügen",
    "selectedTextProperties": "Texteigenschaften",
    "color": "Farbe:",
    "size": "Größe:",
    "font": "Schriftart:",
    "outlineColor": "Konturfarbe:",
    "outlineWidth": "Konturstärke (0-10):",

    // Puzzle Configuration - Educational math terms
    "puzzleConfiguration": "Aufgaben-Konfiguration",
    "difficultyLevel": "Schwierigkeitsstufe:",
    "veryEasy2Symbols": "Sehr leicht (2 Symbole)",
    "easy2Symbols": "Leicht (2 Symbole)",
    "medium3Symbols": "Mittel (3 Symbole)",
    "hard4Symbols": "Schwer (4 Symbole)",
    "numberOfExercises": "Anzahl der Aufgaben (1-6):",
    "operations": "Rechenarten:",
    "additionOnly": "Nur Addition",
    "additionAndSubtraction": "Addition & Subtraktion",

    // Puzzle Numbers - Natural German
    "showPuzzleNumbers": "Aufgabennummern anzeigen",
    "titlePrefix": "Titel-Präfix:",
    "titlePrefixPlaceholder": "z.B. Übung, Problem, Aufgabe",
    "startingNumber": "Startnummer:",
    "individualCustomization": "Individuelle Anpassung (optional):",
    "puzzle": "Aufgabe",
    "answers": "Lösungen",

    // Image Selection - Natural German
    "imageSelectionMethod": "Bildauswahl-Methode:",
    "selectImagesIndividually": "Bilder einzeln auswählen",
    "useFullTheme": "Komplettes Thema verwenden",
    "selectImageTheme": "Bildthema wählen:",
    "selectTheme": "Thema wählen",
    "selectedImagesPool": "Ausgewählte Bilder:",
    "selectImagesFromLibrary": "Wählen Sie Bilder aus der Sammlung unten.",
    "filterLibraryByTheme": "Sammlung nach Thema filtern:",
    "allThemes": "Alle Themen",
    "searchImages": "Bilder suchen:",
    "searchPlaceholder": "z.B. Apfel, Auto",
    "loadingImages": "Bilder werden geladen...",

    // Custom Images - Clear instructions
    "customImages": "Eigene Bilder",
    "selectImagesToUpload": "Bilder zum Hochladen auswählen:",
    "yourUploadedImagesClickToUse": "Ihre Bilder (zum Verwenden klicken):",
    "uploadedImagesWillAppearHere": "Ihre hochgeladenen Bilder erscheinen hier.",
    "chooseFiles": "Dateien auswählen",
    "noFileChosen": "Keine Datei ausgewählt",
    "filesSelected": "Datei(en) ausgewählt",

    // Advanced Options - Mathematical terms
    "allowNegativeResults": "Negative Ergebnisse erlauben",
    "minValue": "Minimalwert:",
    "maxValue": "Maximalwert:",
    "showAnswersInWorksheet": "Lösungen im Arbeitsblatt anzeigen",

    // Toolbar - Graphics terminology
    "layers": "Ebenen",
    "bringForward": "Nach vorne",
    "sendBackward": "Nach hinten",
    "align": "Ausrichten",
    "alignSelected": "Auswahl ausrichten:",
    "alignLeft": "Linksbündig",
    "centerHorizontally": "Horizontal zentrieren",
    "alignRight": "Rechtsbündig",
    "alignTop": "Oben ausrichten",
    "centerVertically": "Vertikal zentrieren",
    "alignBottom": "Unten ausrichten",
    "alignToPage": "An Seite ausrichten:",
    "centerOnPageHorizontally": "Auf Seite horizontal zentrieren",
    "centerOnPageVertically": "Auf Seite vertikal zentrieren",
    "deleteSelected": "Auswahl löschen",

    // Action Buttons - Natural German
    "generate": "Erstellen",
    "generateWorksheet": "Arbeitsblatt erstellen",
    "generateAnswerKey": "Lösungsblatt erstellen",
    "download": "Speichern",
    "worksheetJpeg": "Arbeitsblatt (JPEG)",
    "answerKeyJpeg": "Lösungsblatt (JPEG)",
    "worksheetPdf": "Arbeitsblatt (PDF)",
    "answerKeyPdf": "Lösungsblatt (PDF)",
    "grayscale": "Graustufen",
    "clearAll": "Alles löschen",

    // Tabs - Educational terms
    "worksheet": "Arbeitsblatt",
    "answerKey": "Lösungsblatt",

    // Success Messages - Natural feedback
    "textAddedToWorksheet": "Text wurde zum Arbeitsblatt hinzugefügt.",
    "customImagesAvailable": "{count} eigene Bild(er) verfügbar.",
    "themeImagesLoaded": "Thema '{theme}' Bilder geladen.",
    "successfullyGeneratedPuzzles": "Erfolgreich {count} Aufgaben erstellt!",
    "puzzleNumber": "Aufgabe {number}",
    "answerKeyGenerated": "Lösungsblatt wurde erstellt!",
    "jpegDownloadInitiated": "JPEG-Download gestartet!",
    "pdfDownloaded": "PDF wurde gespeichert!",

    // Error Messages - Clear, helpful
    "noImageThemesFound": "Keine Bildthemen gefunden. API könnte nicht verfügbar sein.",
    "errorLoadingThemes": "Fehler beim Laden der Themen.",
    "errorDuringSearch": "Fehler bei der Suche.",
    "errorLoadingImages": "Fehler beim Laden der Bilder.",
    "errorReadingFile": "Fehler beim Lesen der Datei: {filename}",
    "pleaseSelectTheme": "Bitte wählen Sie ein Thema.",
    "errorLoadingThemeImages": "Fehler beim Laden der Themenbilder.",
    "themeInsufficientImages": "Das gewählte Thema hat nicht genügend verschiedene Bilder für diese Schwierigkeitsstufe.",
    "selectMoreImages": "Bitte wählen Sie mehr Bilder aus der Sammlung.",
    "notEnoughUniqueImages": "Nicht genügend verschiedene Bilder für alle Symbole verfügbar.",
    "valueRangeTooSmall": "Der Wertebereich ist zu klein für die gewählten Einstellungen.",
    "couldNotGenerateAllPuzzles": "Konnte nicht alle gewünschten Aufgaben erstellen. {count} erstellt.",
    "couldNotGenerateAnyPuzzles": "Konnte keine gültigen Aufgaben erstellen. Versuchen Sie andere Einstellungen oder erweitern Sie den Wertebereich.",
    "pleaseGeneratePuzzlesFirst": "Bitte erstellen Sie zuerst Aufgaben.",
    "cannotDownloadEmptyCanvas": "Download nicht möglich, die Zeichenfläche ist leer.",
    "errorPreparingJpeg": "Fehler beim Erstellen der JPEG-Datei.",
    "errorCreatingPdf": "Fehler beim Erstellen der PDF-Datei.",
    "errorLoadingBorders": "Fehler beim Laden der Rahmen.",
    "errorLoadingBackgrounds": "Fehler beim Laden der Hintergründe.",

    // Info Messages - Professional status
    "selectThemeOption": "-- Thema wählen --",
    "loadingDefaultTheme": "Standard-Thema wird geladen...",
    "typeToSearchAllImages": "Geben Sie einen Suchbegriff ein.",
    "searching": "Suche läuft...",
    "loadingImagesForTheme": "Lade Bilder für Thema: {theme}... Bitte warten.",
    "noImagesFound": "Keine Bilder gefunden.",
    "noImagesFoundMatching": "Keine Bilder für \"{query}\" gefunden.",
    "loadingImagesCount": "Lade {count} Bild(er)...",
    "generatedPartialPuzzles": "{count} von {requested} Aufgaben erstellt.",
    "preparingJpegPleaseWait": "JPEG wird vorbereitet... Bitte warten.",
    "preparingPdfPleaseWait": "PDF wird vorbereitet... Bitte warten.",
    "loadingBorders": "Rahmen werden geladen...",
    "loadingBackgrounds": "Hintergründe werden geladen...",

    // Watermark
    "freeVersionWatermark": "KOSTENLOSE VERSION - LessonCraftStudio.com",

    // Additional Messages
    "allSettingsCleared": "Alle Einstellungen zurückgesetzt und Arbeitsflächen gelöscht.",
    "errorDuringGeneration": "Fehler bei der Erstellung. Bitte versuchen Sie es erneut.",
    "pleaseGenerateContentFirst": "Bitte erstellen Sie zuerst Inhalte.",
    "pleaseGenerateWorksheetFirst": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
    "preparingJpeg": "JPEG wird erstellt...",
    "preparingPdf": "PDF wird erstellt..."
  }
};

// Helper functions for dynamic translations
function t(key) {
  if (typeof translations === 'undefined') return key;
  const locale = window.currentLocale || 'en';
  const translation = (translations[locale] && translations[locale][key]) ||
                     (translations.en && translations.en[key]) ||
                     key;
  return translation;
}

// Format translation with placeholders
function formatTranslation(key, params = {}) {
  let text = t(key);
  Object.keys(params).forEach(param => {
    text = text.replace(`{${param}}`, params[param]);
  });
  return text;
}

// Apply translations to DOM
function applyTranslations() {
  const locale = window.currentLocale || 'en';
  if (typeof translations === 'undefined') {
    console.warn('Translations not loaded yet');
    return;
  }

  const trans = translations[locale] || translations.en;

  // Apply data-translate attributes
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (trans[key]) {
      if (element.tagName === 'OPTION') {
        element.textContent = trans[key];
      } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.value = trans[key];
      } else if (element.hasAttribute('title')) {
        element.title = trans[key];
        if (element.textContent) {
          element.textContent = trans[key];
        }
      } else {
        element.textContent = trans[key];
      }
    }
  });

  // Apply placeholder translations
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    if (trans[key]) {
      element.placeholder = trans[key];
    }
  });

  // Apply title translations
  document.querySelectorAll('[data-translate-title]').forEach(element => {
    const key = element.getAttribute('data-translate-title');
    if (trans[key]) {
      element.title = trans[key];
    }
  });
}

// Make globally available
if (typeof window !== 'undefined') {
  window.translations = translations;
  window.t = t;
  window.formatTranslation = formatTranslation;
  window.applyTranslations = applyTranslations;
}

console.log('✅ Math Worksheet translations loaded! Available languages:', Object.keys(translations));