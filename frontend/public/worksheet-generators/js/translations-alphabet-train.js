/**
 * Alphabet Train Worksheet Generator - German Translation
 * Professional, natural German UI translation as if originally designed for German market
 *
 * Translation Philosophy:
 * - Using child-friendly, educational German terminology
 * - Natural German educational context (DIN formats, German pedagogical terms)
 * - Professional yet approachable language for teachers and parents
 * - Consistent with German educational software standards
 */

const translations = {
  "en": {
    // Main Title & Headers
    "alphabetTrainGenerator": "Alphabet Train Worksheet Generator",
    "trainSettings": "Train Settings",

    // Navigation & Sections
    "languageSettings": "Language Settings",
    "pageSetup": "Page Setup",
    "textTools": "Text Tools",
    "mode": "Mode",
    "letterImageSelection": "Letter & Image Selection",
    "uploadCustomImages": "Upload Custom Images",
    "assignmentsConfiguration": "Assignments & Configuration",

    // Language Options
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
    "paperSize": "Paper Size:",
    "letterPortrait": "Letter Portrait (8.5×11\")",
    "letterLandscape": "Letter Landscape (11×8.5\")",
    "a4Portrait": "A4 Portrait (210×297mm)",
    "a4Landscape": "A4 Landscape (297×210mm)",
    "square": "Square (1200×1200)",
    "custom": "Custom",
    "widthPx": "Width (px):",
    "heightPx": "Height (px):",
    "applySize": "Apply Size",

    // Template Settings
    "template": "Template",
    "trainTemplate": "Train Template:",
    "defaultTrain": "Default Train",
    "pageColor": "Page Color:",

    // Background Settings
    "background": "Background",
    "backgroundTheme": "Background Theme:",
    "none": "None",
    "backgroundOpacity": "Background Opacity:",
    "selectThemeForBackgrounds": "Select a theme for backgrounds.",

    // Border Settings
    "border": "Border",
    "borderTheme": "Border Theme:",
    "borderOpacity": "Border Opacity:",
    "selectThemeToSeeBorders": "Select a theme to see borders.",

    // Text Tools
    "addNewText": "Add New Text",
    "content": "Content:",
    "worksheetTitlePlaceholder": "Worksheet Title...",
    "addTextToPage": "Add Text to Page",
    "selectedTextProperties": "Selected Text Properties",
    "color": "Color:",
    "size": "Size:",
    "font": "Font:",
    "outlineColor": "Outline Color:",
    "outlineWidth": "Outline (0-10):",

    // Mode Settings
    "autoCreate": "Auto Create (Random 11 Letters & Images)",

    // Letter & Image Selection
    "selectLettersExactly11": "Select Letters (exactly 11):",
    "selectedCount": "Selected: {}/{}",
    "imageTheme": "Image Theme:",
    "searchImagesPlaceholder": "Search images (e.g., apple)",
    "loadingThemes": "Loading themes...",
    "loadingImagesCount": "Loading images...",

    // Upload Section
    "selectImagesToUpload": "Select image(s) to upload:",
    "yourUploadedImagesThisSession": "Your Uploaded Images (This Session):",
    "yourUploadedImagesWillAppearHere": "Your uploaded images will appear here.",
    "chooseFiles": "Choose Files",
    "noFileChosen": "No file chosen",
    "filesSelected": "file(s) selected",

    // Assignments & Configuration
    "assignedImages": "Assigned Images",
    "numberOfClues": "Number of Clues (3-11):",
    "includeNameDateFields": "Include Name/Date Fields",

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

    // Messages
    "worksheetGeneratedSuccessfully": "Worksheet generated successfully!",
    "answerKeyGeneratedSuccessfully": "Answer Key generated successfully!",
    "pleaseSelectExactly11Letters": "Please select exactly 11 letters",
    "pleaseAssignImagesToAllLetters": "Please assign images to all selected letters",
    "imageAddedSuccessfully": "Image added successfully",
    "textAddedToWorksheet": "Text added to worksheet",
    "allContentCleared": "All content cleared",
    "errorLoadingImages": "Error loading images",
    "downloadStarted": "Download started!",
    "preparingDownload": "Preparing download...",
    "freeVersionWatermark": "FREE VERSION - LessonCraftStudio.com",
    "pageSizeUpdated": "Page size updated.",
    "disableAutoCreateFirst": "Disable 'Auto Create' to select letters manually.",
    "onlySelect11Letters": "You can only select exactly 11 letters.",
    "loadingImageLibrary": "Loading image library...",
    "imageThemesLoaded": "Image themes loaded.",
    "dictionaryDisabledInAutoCreate": "Dictionary disabled in Auto Create.",
    "pleaseSelectLettersFirst": "Please select 11 letters first.",
    "pleaseSelectAll11Letters": "Please select all 11 letters.",
    "autoCreateEnabled": "Auto-Create enabled. Please select a theme.",
    "manualModeEnabled": "Manual Mode enabled.",
    "allSelectionsCleared": "All selections and worksheet cleared.",
    "selectSpecificThemeForAutoCreate": "Please select a specific theme for Auto-Create mode.",
    "autoCreateErrorNoImages": "Auto-Create Error: The selected theme (and your uploads) have no images.",
    "autoCreateErrorNot11Unique": "Auto-Create Error: Failed to find 11 unique letter-image pairs in this theme.",
    "manualModeError": "Manual Mode Error: Select 11 letters and assign unique images.",
    "preparingData": "Preparing data...",
    "pleaseGenerateWorksheetFirst": "Please generate the worksheet first.",
    "generatingAnswerKey": "Generating answer key...",
    "pleaseGenerateBeforeDownload": "Please generate the content before downloading.",
    "downloadInitiated": "Download Initiated!",
    "pleaseGenerateContentFirst": "Please generate content first.",
    "preparingPdf": "Preparing PDF...",
    "pdfDownloaded": "PDF downloaded!",
    "errorCreatingPdf": "Error creating PDF.",
    "preparingJpeg": "Preparing JPEG...",
    "jpegDownloadInitiated": "JPEG download initiated!",
    "errorPreparingJpeg": "Error preparing JPEG.",
    "borderAdded": "Border added.",
    "backgroundAdded": "Background added.",
    "couldNotLoadTemplate": "Could not load the selected template.",
    "generatingWorksheet": "Generating worksheet...",
    "customImagesAvailable": "{} custom image(s) available."
  },

  "de": {
    // Main Title & Headers - Natural German educational terminology
    "alphabetTrainGenerator": "ABC-Zug Arbeitsblatt-Generator",
    "trainSettings": "Zug-Einstellungen",

    // Navigation & Sections - Professional educational terms
    "languageSettings": "Spracheinstellungen",
    "pageSetup": "Seiteneinrichtung",
    "textTools": "Textwerkzeuge",
    "mode": "Arbeitsmodus",
    "letterImageSelection": "Buchstaben & Bilder auswählen",
    "uploadCustomImages": "Eigene Bilder hochladen",
    "assignmentsConfiguration": "Zuordnung & Einstellungen",

    // Language Options - Native names
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
    "paperSize": "Papierformat:",
    "letterPortrait": "US Letter Hochformat (216×279mm)",
    "letterLandscape": "US Letter Querformat (279×216mm)",
    "a4Portrait": "DIN A4 Hochformat (210×297mm)",
    "a4Landscape": "DIN A4 Querformat (297×210mm)",
    "square": "Quadratisch (1200×1200)",
    "custom": "Benutzerdefiniert",
    "widthPx": "Breite (px):",
    "heightPx": "Höhe (px):",
    "applySize": "Format übernehmen",

    // Template Settings - Natural German terms
    "template": "Vorlage",
    "trainTemplate": "Zug-Vorlage:",
    "defaultTrain": "Standard-Zug",
    "pageColor": "Seitenfarbe:",

    // Background Settings - Clear, professional terms
    "background": "Hintergrund",
    "backgroundTheme": "Hintergrundmotiv:",
    "none": "Ohne",
    "backgroundOpacity": "Transparenz:",
    "selectThemeForBackgrounds": "Wählen Sie ein Motiv für den Hintergrund.",

    // Border Settings - Educational context
    "border": "Rahmen",
    "borderTheme": "Rahmenmotiv:",
    "borderOpacity": "Transparenz:",
    "selectThemeToSeeBorders": "Wählen Sie ein Motiv für den Rahmen.",

    // Text Tools - Natural German UI terms
    "addNewText": "Text hinzufügen",
    "content": "Inhalt:",
    "worksheetTitlePlaceholder": "Titel des Arbeitsblatts...",
    "addTextToPage": "Text zur Seite hinzufügen",
    "selectedTextProperties": "Texteigenschaften",
    "color": "Farbe:",
    "size": "Größe:",
    "font": "Schriftart:",
    "outlineColor": "Konturfarbe:",
    "outlineWidth": "Konturstärke (0-10):",

    // Mode Settings - Child-friendly German
    "autoCreate": "Automatisch erstellen (11 zufällige Buchstaben & Bilder)",

    // Letter & Image Selection - Educational terminology
    "selectLettersExactly11": "Buchstaben wählen (genau 11):",
    "selectedCount": "Ausgewählt: {}/{}",
    "imageTheme": "Bildthema:",
    "searchImagesPlaceholder": "Bilder suchen (z.B. Apfel)",
    "loadingThemes": "Themen werden geladen...",
    "loadingImagesCount": "Bilder werden geladen...",

    // Upload Section - Clear instructions
    "selectImagesToUpload": "Bilder zum Hochladen auswählen:",
    "yourUploadedImagesThisSession": "Ihre hochgeladenen Bilder (aktuelle Sitzung):",
    "yourUploadedImagesWillAppearHere": "Ihre hochgeladenen Bilder erscheinen hier.",
    "chooseFiles": "Dateien auswählen",
    "noFileChosen": "Keine Datei ausgewählt",
    "filesSelected": "Datei(en) ausgewählt",

    // Assignments & Configuration - Professional educational terms
    "assignedImages": "Zugeordnete Bilder",
    "numberOfClues": "Anzahl der Hinweise (3-11):",
    "includeNameDateFields": "Name und Datum einfügen",

    // Action Buttons - Natural German software terms
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

    // Tabs - Simple, clear terms
    "worksheet": "Arbeitsblatt",
    "answerKey": "Lösungsblatt",

    // Toolbar - Professional graphics software terms
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

    // Messages - Natural, friendly German feedback
    "worksheetGeneratedSuccessfully": "Arbeitsblatt wurde erfolgreich erstellt!",
    "answerKeyGeneratedSuccessfully": "Lösungsblatt wurde erfolgreich erstellt!",
    "pleaseSelectExactly11Letters": "Bitte wählen Sie genau 11 Buchstaben aus",
    "pleaseAssignImagesToAllLetters": "Bitte ordnen Sie allen gewählten Buchstaben Bilder zu",
    "imageAddedSuccessfully": "Bild wurde erfolgreich hinzugefügt",
    "textAddedToWorksheet": "Text wurde zum Arbeitsblatt hinzugefügt",
    "allContentCleared": "Alle Inhalte wurden gelöscht",
    "errorLoadingImages": "Fehler beim Laden der Bilder",
    "downloadStarted": "Download wurde gestartet!",
    "preparingDownload": "Download wird vorbereitet...",
    "freeVersionWatermark": "KOSTENLOSE VERSION - LessonCraftStudio.com",
    "pageSizeUpdated": "Seitenformat wurde aktualisiert.",
    "disableAutoCreateFirst": "Deaktivieren Sie 'Automatisch erstellen' für manuelle Auswahl.",
    "onlySelect11Letters": "Sie können nur genau 11 Buchstaben auswählen.",
    "loadingImageLibrary": "Bilderbibliothek wird geladen...",
    "imageThemesLoaded": "Bildthemen wurden geladen.",
    "dictionaryDisabledInAutoCreate": "Wörterbuch ist im Auto-Modus deaktiviert.",
    "pleaseSelectLettersFirst": "Bitte wählen Sie zuerst 11 Buchstaben aus.",
    "pleaseSelectAll11Letters": "Bitte wählen Sie alle 11 Buchstaben aus.",
    "autoCreateEnabled": "Auto-Modus aktiviert. Bitte wählen Sie ein Thema.",
    "manualModeEnabled": "Manueller Modus aktiviert.",
    "allSelectionsCleared": "Alle Auswahlen und das Arbeitsblatt wurden gelöscht.",
    "selectSpecificThemeForAutoCreate": "Bitte wählen Sie ein bestimmtes Thema für den Auto-Modus.",
    "autoCreateErrorNoImages": "Auto-Modus Fehler: Das gewählte Thema (und Ihre Uploads) enthält keine Bilder.",
    "autoCreateErrorNot11Unique": "Auto-Modus Fehler: Konnte keine 11 eindeutigen Buchstaben-Bild-Paare finden.",
    "manualModeError": "Manueller Modus Fehler: Wählen Sie 11 Buchstaben und ordnen Sie eindeutige Bilder zu.",
    "preparingData": "Daten werden vorbereitet...",
    "pleaseGenerateWorksheetFirst": "Bitte erstellen Sie zuerst das Arbeitsblatt.",
    "generatingAnswerKey": "Lösungsblatt wird erstellt...",
    "pleaseGenerateBeforeDownload": "Bitte erstellen Sie zuerst den Inhalt vor dem Download.",
    "downloadInitiated": "Download gestartet!",
    "pleaseGenerateContentFirst": "Bitte erstellen Sie zuerst den Inhalt.",
    "preparingPdf": "PDF wird vorbereitet...",
    "pdfDownloaded": "PDF heruntergeladen!",
    "errorCreatingPdf": "Fehler beim Erstellen der PDF.",
    "preparingJpeg": "JPEG wird vorbereitet...",
    "jpegDownloadInitiated": "JPEG-Download gestartet!",
    "errorPreparingJpeg": "Fehler beim Vorbereiten der JPEG-Datei.",
    "borderAdded": "Rahmen hinzugefügt.",
    "backgroundAdded": "Hintergrund hinzugefügt.",
    "couldNotLoadTemplate": "Die gewählte Vorlage konnte nicht geladen werden.",
    "generatingWorksheet": "Arbeitsblatt wird erstellt...",
    "customImagesAvailable": "{} eigene Bild(er) verfügbar."
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
function formatTranslation(key, ...values) {
  let text = t(key);
  values.forEach(value => {
    text = text.replace('{}', value);
  });
  return text;
}

// Make globally available
if (typeof window !== 'undefined') {
  window.translations = translations;
  window.t = t;
  window.formatTranslation = formatTranslation;
}

console.log('✅ Alphabet Train translations loaded! Available languages:', Object.keys(translations));