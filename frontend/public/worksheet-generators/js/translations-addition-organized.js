/**
 * Image Addition Worksheet Generator - Translation System
 *
 * ADDING NEW LANGUAGES:
 * 1. Copy the entire English ('en') object
 * 2. Add a new language code (e.g., 'ja' for Japanese)
 * 3. Translate all values, keeping the keys exactly the same
 * 4. Test with ?locale=XX parameter (e.g., ?locale=ja)
 *
 * TRANSLATION CATEGORIES:
 * - Languages: Language names in native script
 * - Core UI: Main interface elements
 * - Settings: Configuration options
 * - Exercise Config: Worksheet generation settings
 * - Image Library: Image selection interface
 * - Buttons: Action buttons
 * - Tabs: Navigation tabs
 * - Tools: Alignment and manipulation tools
 * - Page Sizes: Paper format options
 * - Text Tools: Text editing options
 * - Upload: File upload interface
 * - Messages: User feedback messages
 *
 * IMPORTANT NOTES:
 * - Keep all keys in English for consistency
 * - Use {} for dynamic values (will be replaced at runtime)
 * - Test all translations with actual UI to ensure proper fit
 * - Native file inputs use custom wrapper for translation support
 */

const translations = {
  // ============================================
  // ENGLISH - Primary Reference Language
  // ============================================
  "en": {
    // Language Names (displayed in dropdown)
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

    // Core UI Elements
    "imageAdditionWorksheetGenerator": "Image Addition Worksheet Generator",
    "worksheetSettings": "Worksheet Settings",
    "exerciseConfiguration": "Exercise Configuration",
    "imageLibrary": "Image Library",
    "languageSettings": "Language Settings",
    "pageSetup": "Page Setup",
    "textTools": "Text Tools",
    "uploadCustomImages": "Upload Custom Images",

    // Settings Section
    "language": "Language:",
    "pageSize": "Page Size:",
    "pageColor": "Page Color:",
    "background": "Background",
    "border": "Border",
    "backgroundTheme": "Background Theme:",
    "borderTheme": "Border Theme:",
    "none": "None",
    "backgroundOpacity": "Background Opacity:",
    "borderOpacity": "Border Opacity:",

    // Exercise Configuration
    "numberOfExercises": "Number of Exercises (1-10):",
    "minItemsPerGroup": "Min items per group (1-10):",
    "maxItemsPerGroup": "Max items per group (1-10):",
    "includeNameDateFields": "Include Name/Date Fields",
    "showPlusBetweenGroups": "Show '+' Between Image Groups",
    "includeExerciseNumbers": "Include Exercise Numbers",
    "useChildFriendlyBox": "Use child-friendly box for expressions",

    // Image Library Section
    "selectTheme": "Select Theme:",
    "searchImages": "Search Images:",
    "availableImages": "Available Images:",
    "loadingImages": "Loading images...",
    "loadingImagesCount": "Loading {} images...",
    "selectedImagesForProblems": "Selected Images for Problems:",
    "yourUploadedImagesWillAppearHere": "Your uploaded images will appear here.",

    // Action Buttons
    "generate": "Generate",
    "generateWorksheet": "Generate Worksheet",
    "generateAnswerKey": "Generate Answer Key",
    "download": "Download",
    "downloadWorksheetJpeg": "Download Worksheet (JPEG)",
    "downloadAnswerKeyJpeg": "Download Answer Key (JPEG)",
    "downloadWorksheetPdf": "Download Worksheet (PDF)",
    "downloadAnswerKeyPdf": "Download Answer Key (PDF)",
    "clearAll": "Clear All",

    // Navigation Tabs
    "worksheet": "Worksheet",
    "answerKey": "Answer Key",

    // Alignment & Manipulation Tools
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

    // Settings Panel
    "settings": "Settings",
    "grayscaleImages": "Grayscale Images",

    // Page Size Options
    "letterPortrait": "US Letter Portrait (612×792)",
    "letterLandscape": "US Letter Landscape (792×612)",
    "a4Portrait": "A4 Portrait (595×842)",
    "a4Landscape": "A4 Landscape (842×595)",
    "square": "Square (1200×1200)",
    "custom": "Custom",
    "customSize": "Custom Size",
    "widthPx": "Width (px):",
    "heightPx": "Height (px):",
    "applySize": "Apply Size",

    // Text Tools
    "addNewText": "Add New Text",
    "content": "Content:",
    "helloPlaceholder": "Hello!",
    "addText": "Add Text",
    "selectedTextProperties": "Selected Text Properties",
    "color": "Color:",
    "size": "Size:",
    "font": "Font:",
    "outlineColor": "Outline Color:",
    "outlineWidth": "Outline Width (0-10):",

    // Upload Section
    "selectImagesToUpload": "Select image(s) to upload:",
    "yourUploadedImages": "Your uploaded images (this session):",
    "chooseFiles": "Choose Files",
    "noFileChosen": "No file chosen",
    "filesSelected": "file(s) selected",

    // Image Library UI
    "allThemes": "All Themes",
    "searchPlaceholder": "e.g., apple, car",
    "selectedCount": "Selected: {} / {}",
    "selectThemeForBackgrounds": "Select a theme for backgrounds.",
    "selectThemeToSeeBorders": "Select a theme to see borders.",

    // User Messages
    "worksheetGenerated": "Worksheet generated!",
    "answerSheetGenerated": "Answer sheet generated!",
    "textAddedToWorksheet": "Text added to worksheet.",
    "pleaseGenerateWorksheetFirst": "Please generate a worksheet first.",
    "errorLoadingImages": "Error loading images.",
    "downloadStarted": "Download started!",
    "formCleared": "Form cleared.",
    "pleaseSelectAtLeastOneImage": "Please select at least one image to create a worksheet",
    "maxImagesSelected": "Max {} image(s) selected.",
    "noImagesInLibrary": "No images available in the library. Try uploading some!",
    "preparingJpeg": "Preparing JPEG...",
    "jpegDownloadInitiated": "JPEG Download Initiated!",
    "pdfDownloaded": "PDF downloaded!",
    "couldNotLoadThemes": "Could not load themes.",
    "freeVersionWatermark": "FREE VERSION - LessonCraftStudio.com"
  },

  // ============================================
  // GERMAN - Deutsch
  // ============================================
  "de": {
    // Language Names
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

    // Core UI Elements
    "imageAdditionWorksheetGenerator": "Arbeitsblatt-Generator: Addition mit Bildern",
    "worksheetSettings": "Arbeitsblatt-Einstellungen",
    "exerciseConfiguration": "Aufgaben-Konfiguration",
    "imageLibrary": "Bilderbibliothek",
    "languageSettings": "Spracheinstellungen",
    "pageSetup": "Seiteneinrichtung",
    "textTools": "Textwerkzeuge",
    "uploadCustomImages": "Eigene Bilder hochladen",

    // Settings Section
    "language": "Sprache:",
    "pageSize": "Seitenformat:",
    "pageColor": "Seitenfarbe:",
    "background": "Hintergrund",
    "border": "Rahmen",
    "backgroundTheme": "Hintergrund-Design:",
    "borderTheme": "Rahmen-Design:",
    "none": "Ohne",
    "backgroundOpacity": "Hintergrund-Transparenz:",
    "borderOpacity": "Rahmen-Transparenz:",

    // Exercise Configuration
    "numberOfExercises": "Anzahl der Aufgaben (1–10):",
    "minItemsPerGroup": "Min. Elemente pro Gruppe (1-10):",
    "maxItemsPerGroup": "Max. Elemente pro Gruppe (1-10):",
    "includeNameDateFields": "Name/Datum-Felder einfügen",
    "showPlusBetweenGroups": "'+' zwischen Bildgruppen anzeigen",
    "includeExerciseNumbers": "Aufgabennummern anzeigen",
    "useChildFriendlyBox": "Kinderfreundliche Box für Ausdrücke verwenden",

    // Image Library Section
    "selectTheme": "Design auswählen:",
    "searchImages": "Bilder suchen:",
    "availableImages": "Verfügbare Bilder:",
    "loadingImages": "Bilder werden geladen...",
    "loadingImagesCount": "{} Bilder werden geladen...",
    "selectedImagesForProblems": "Ausgewählte Bilder für Aufgaben:",
    "yourUploadedImagesWillAppearHere": "Ihre hochgeladenen Bilder erscheinen hier.",

    // Action Buttons
    "generate": "Erstellen",
    "generateWorksheet": "Arbeitsblatt erstellen",
    "generateAnswerKey": "Lösungsblatt erstellen",
    "download": "Speichern",
    "downloadWorksheetJpeg": "Arbeitsblatt speichern (JPEG)",
    "downloadAnswerKeyJpeg": "Lösungsblatt speichern (JPEG)",
    "downloadWorksheetPdf": "Arbeitsblatt speichern (PDF)",
    "downloadAnswerKeyPdf": "Lösungsblatt speichern (PDF)",
    "clearAll": "Alles löschen",

    // Navigation Tabs
    "worksheet": "Arbeitsblatt",
    "answerKey": "Lösungsblatt",

    // Alignment & Manipulation Tools
    "layers": "Ebenen",
    "bringForward": "Nach vorne",
    "sendBackward": "Nach hinten",
    "align": "Ausrichten",
    "alignSelected": "Ausgewählte ausrichten:",
    "alignLeft": "Links ausrichten",
    "centerHorizontally": "Horizontal zentrieren",
    "alignRight": "Rechts ausrichten",
    "alignTop": "Oben ausrichten",
    "centerVertically": "Vertikal zentrieren",
    "alignBottom": "Unten ausrichten",
    "alignToPage": "An Seite ausrichten:",
    "centerOnPageHorizontally": "Auf Seite horizontal zentrieren",
    "centerOnPageVertically": "Auf Seite vertikal zentrieren",
    "deleteSelected": "Auswahl löschen",

    // Settings Panel
    "settings": "Einstellungen",
    "grayscaleImages": "Bilder in Graustufen",

    // Page Size Options
    "letterPortrait": "US Letter Hochformat (612×792)",
    "letterLandscape": "US Letter Querformat (792×612)",
    "a4Portrait": "DIN A4 Hochformat (595×842)",
    "a4Landscape": "DIN A4 Querformat (842×595)",
    "square": "Quadratisch (1200×1200)",
    "custom": "Benutzerdefiniert",
    "customSize": "Benutzerdefiniert",
    "widthPx": "Breite (px):",
    "heightPx": "Höhe (px):",
    "applySize": "Format übernehmen",

    // Text Tools
    "addNewText": "Neuen Text hinzufügen",
    "content": "Inhalt:",
    "helloPlaceholder": "Hallo!",
    "addText": "Text hinzufügen",
    "selectedTextProperties": "Eigenschaften des ausgewählten Texts",
    "color": "Farbe:",
    "size": "Größe:",
    "font": "Schriftart:",
    "outlineColor": "Konturfarbe:",
    "outlineWidth": "Konturstärke (0-10):",

    // Upload Section
    "selectImagesToUpload": "Bild(er) zum Hochladen auswählen:",
    "yourUploadedImages": "Ihre hochgeladenen Bilder (diese Sitzung):",
    "chooseFiles": "Dateien wählen",
    "noFileChosen": "Keine Datei ausgewählt",
    "filesSelected": "Datei(en) ausgewählt",

    // Image Library UI
    "allThemes": "Alle Designs",
    "searchPlaceholder": "z.B. Apfel, Auto",
    "selectedCount": "Ausgewählt: {} / {}",
    "selectThemeForBackgrounds": "Wählen Sie ein Design für Hintergründe.",
    "selectThemeToSeeBorders": "Wählen Sie ein Design für Rahmen.",

    // User Messages
    "worksheetGenerated": "Arbeitsblatt erstellt!",
    "answerSheetGenerated": "Lösungsblatt erstellt!",
    "textAddedToWorksheet": "Text zum Arbeitsblatt hinzugefügt.",
    "pleaseGenerateWorksheetFirst": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
    "errorLoadingImages": "Fehler beim Laden der Bilder.",
    "downloadStarted": "Download gestartet!",
    "formCleared": "Formular gelöscht.",
    "pleaseSelectAtLeastOneImage": "Bitte wählen Sie mindestens ein Bild aus, um ein Arbeitsblatt zu erstellen",
    "maxImagesSelected": "Maximal {} Bild(er) ausgewählt.",
    "noImagesInLibrary": "Keine Bilder in der Bibliothek. Versuchen Sie, einige hochzuladen!",
    "preparingJpeg": "JPEG wird vorbereitet...",
    "jpegDownloadInitiated": "JPEG-Download gestartet!",
    "pdfDownloaded": "PDF heruntergeladen!",
    "couldNotLoadThemes": "Designs konnten nicht geladen werden.",
    "freeVersionWatermark": "KOSTENLOSE VERSION - LessonCraftStudio.com"
  },

  // ============================================
  // TEMPLATE FOR NEW LANGUAGES
  // Copy this section and translate all values
  // ============================================
  /*
  "XX": {  // Replace XX with language code (e.g., 'fr', 'es', 'ja')
    // Language Names
    "lang_en": "English",
    "lang_de": "Deutsch",
    "lang_fr": "Français",
    // ... add all language names ...

    // Core UI Elements
    "imageAdditionWorksheetGenerator": "TRANSLATE HERE",
    "worksheetSettings": "TRANSLATE HERE",
    // ... translate all keys ...
  }
  */
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get translation for a specific key
 * Falls back to English if key not found in current language
 */
function getTranslation(key, locale = 'en') {
  const lang = translations[locale] || translations['en'];
  return lang[key] || translations['en'][key] || `[Missing: ${key}]`;
}

/**
 * Replace placeholders in translated text
 * Example: "Selected: {} / {}" with values [5, 10] => "Selected: 5 / 10"
 */
function formatTranslation(key, values = [], locale = 'en') {
  let text = getTranslation(key, locale);
  values.forEach(value => {
    text = text.replace('{}', value);
  });
  return text;
}

/**
 * Get all available language codes
 */
function getAvailableLanguages() {
  return Object.keys(translations);
}

/**
 * Check if a language is supported
 */
function isLanguageSupported(locale) {
  return translations.hasOwnProperty(locale);
}

// ============================================
// EXPORT FOR USE
// ============================================

// Make globally available
if (typeof window !== 'undefined') {
  window.translations = translations;
  window.getTranslation = getTranslation;
  window.formatTranslation = formatTranslation;
  window.getAvailableLanguages = getAvailableLanguages;
  window.isLanguageSupported = isLanguageSupported;
}

// For Node.js/module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    translations,
    getTranslation,
    formatTranslation,
    getAvailableLanguages,
    isLanguageSupported
  };
}

console.log('✅ Organized translation system loaded!');
console.log('📚 Available languages:', getAvailableLanguages().join(', '));
console.log('📝 Total translation keys:', Object.keys(translations.en).length);