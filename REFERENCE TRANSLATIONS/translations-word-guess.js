// Word Guess App - Complete Multi-Language Translations
// Compiled from professional translation files
// Total: 93 unique translation keys across 11 languages
// Languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI

const translations = {
  en: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Image Clue Grid Worksheet",
    "settings.title": "Clue Grid Settings",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Language Settings",
    "settings.pageSetup": "Page Setup",
    "settings.textTools": "Text Tools",
    "settings.exerciseConfig": "Exercise Configuration",
    "library.title": "Image Library",
    "library.uploadTitle": "Upload Custom Images",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "settings.languageLabel": "Language:",
    "lang.en": "English",
    "lang.de": "Deutsch (German)",
    "lang.fr": "Français (French)",
    "lang.es": "Español (Spanish)",
    "lang.pt": "Português (Portuguese)",
    "lang.it": "Italiano (Italian)",
    "lang.nl": "Nederlands (Dutch)",
    "lang.sv": "Svenska (Swedish)",
    "lang.da": "Dansk (Danish)",
    "lang.no": "Norsk (Norwegian)",
    "lang.fi": "Suomi (Finnish)",
    "word.guess.language.description": "Selects the content language. UI language is controlled by the main language selector in the header.",

    // ===== 4. PAGE SETUP (16 items) =====
    "settings.pageSize": "Page Size:",
    "pageSize.letterPortrait": "Letter Portrait (612×792)",
    "pageSize.letterLandscape": "Letter Landscape (792×612)",
    "pageSize.a4Portrait": "A4 Portrait (595×842)",
    "pageSize.a4Landscape": "A4 Landscape (842×595)",
    "pageSize.square": "Square (1200×1200)",
    "pageSize.custom": "Custom",
    "settings.width": "Width (px):",
    "settings.height": "Height (px):",
    "settings.pageColor": "Page Color:",
    "button.applySize": "Apply Size",
    "decoration.backgroundTheme": "Background Theme:",
    "decoration.none": "None",
    "none": "None",
    "decoration.backgroundOpacity": "Background Opacity:",
    "decoration.borderTheme": "Border Theme:",
    "decoration.borderOpacity": "Border Opacity:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Content:",
    "text.placeholder": "Hello!",
    "button.addText": "Add Text",
    "text.color": "Color:",
    "text.size": "Size:",
    "text.font": "Font:",
    "text.outlineColor": "Outline Color:",
    "text.outlineWidth": "Outline (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Number of Puzzles (1–10):",
    "config.difficulty": "Difficulty (Number of Clues)",
    "difficulty.noClues": "No clues",
    "difficulty.easy": "Easy (1/2)",
    "difficulty.normal": "Normal (1/4)",
    "difficulty.tough": "Tough (1/6)",
    "config.excludeLetters": "Exclude Letters from Clues:",
    "config.excludePlaceholder": "e.g. AEIOU",
    "config.letterCase": "Letter Case",
    "case.uppercase": "Uppercase",
    "case.lowercase": "Lowercase",
    "config.includeNameDate": "Include Name & Date",
    "config.includeExerciseNumbers": "Include Exercise Numbers",

    // ===== 7. IMAGE LIBRARY (12 items) =====
    "library.selectTheme": "Select Theme:",
    "library.allThemes": "All Themes",
    "library.search": "Search Images:",
    "library.searchPlaceholder": "e.g., apple, car",
    "library.availableImages": "Available Images:",
    "library.selectedImages": "Selected Images for Puzzles:",
    "library.selectUpload": "Select image(s) to upload:",
    "library.chooseFiles": "Choose Files",
    "library.noFileChosen": "No file chosen",
    "library.filesSelected": "{x} file(s) selected",
    "library.uploadedImages": "Your Uploaded Images (This Session):",
    "library.selectedCount": "Selected: {x} / {y}",

    // Manual edit mode
    "manualImageEdit": "Manual Image Name Editing",
    "enableManualEdit": "Edit image names before generating",
    "manualEditDescription": "When enabled, you can manually select images and edit their names below before generating the puzzle.",
    "selectAndEditImages": "Select and Edit Images",
    "manualEditInstructions": "Click to add images, then edit names below:",
    "clickImagesToAddThem": "Click images from the library to add them here for editing.",

    // Custom Word List
    "customWordList": "Custom Word List",
    "useCustomWords": "Use custom word list",
    "customWordListDescription": "When enabled, generate text-only exercises using your custom word list (no images).",
    "enterWords": "Enter words (one per line, max 8):",
    "customWordsPlaceholder": "apple\nbanana\norange\ngrape",
    "customWordListNote": "Only letters are allowed. Special characters and numbers will be removed.",
    "customWordListEnabled": "Custom word list mode enabled. Exercise will be text-only.",
    "customWordListEmpty": "Please enter at least one word in the custom word list.",
    "customWordListTruncated": "Using {count} word(s) from your list. Add more words for more exercises.",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Layers",
    "toolbar.bringForward": "Bring Forward",
    "toolbar.sendBackward": "Send Backward",
    "toolbar.align": "Align",
    "toolbar.alignLeft": "Align Left",
    "toolbar.centerH": "Center Horizontally",
    "toolbar.alignRight": "Align Right",
    "toolbar.alignTop": "Align Top",
    "toolbar.centerV": "Center Vertically",
    "toolbar.alignBottom": "Align Bottom",
    "toolbar.centerPageH": "Center on Page Horizontally",
    "toolbar.centerPageV": "Center on Page Vertically",
    "lockUnlock": "Lock/Unlock",
    "unlockAll": "Unlock All",
    "toolbar.delete": "Delete Selected",

    // ===== ZOOM & HISTORY CONTROLS (5 items) =====
    "zoomIn": "Zoom In",
    "zoomOut": "Zoom Out",
    "zoomReset": "Reset Zoom",
    "undo": "Undo",
    "redo": "Redo",

    // ===== LAYER CONTROLS (4 items) =====
    "bringForward": "Bring Forward",
    "bringToFront": "Bring to Front",
    "sendBackward": "Send Backward",
    "sendToBack": "Send to Back",

    // ===== NON-PREFIXED ACTION KEYS (12 items) =====
    "answerKey": "Answer Key",
    "answerKeyJpeg": "Answer Key (JPEG)",
    "answerKeyPdf": "Answer Key (PDF)",
    "clearAll": "Clear All",
    "download": "Download",
    "generate": "Create",
    "grayscale": "Grayscale",
    "newWorksheet": "New Worksheet",
    "worksheet": "Worksheet",
    "worksheetJpeg": "Worksheet (JPEG)",
    "worksheetPdf": "Worksheet (PDF)",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Generate",
    "button.generateWorksheet": "Generate Worksheet",
    "button.generateAnswer": "Generate Answer Key",
    "button.download": "Download",
    "button.worksheetJpeg": "Worksheet (JPEG)",
    "button.answerJpeg": "Answer Key (JPEG)",
    "button.worksheetPdf": "Worksheet (PDF)",
    "button.answerPdf": "Answer Key (PDF)",
    "settings.grayscale": "Grayscale",
    "button.clearAll": "Clear All",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Worksheet",
    "tab.answerKey": "Answer Key",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} custom image(s) available.",
    "message.creatingWorksheet": "Creating worksheet...",
    "message.worksheetGenerated": "Worksheet recreated successfully!",
    "message.creatingAnswer": "Creating answer key...",
    "message.answerGenerated": "Answer key created!",
    "message.assetAdded": "{type} added.",
    "message.formCleared": "Form cleared.",
    "message.downloadStarted": "Download Initiated!",
    "message.pdfDownloaded": "PDF downloaded!",
    "message.pdfSuccess": "PDF Downloaded!",
    "message.jpegDownloaded": "JPEG download initiated!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Could not load themes.",
    "message.maxImages": "You can select a maximum of {count} images.",
    "message.selectImages": "Please select some images or choose a theme with images.",
    "message.generateFirst": "Please create a worksheet first.",
    "message.cannotDownloadEmpty": "Cannot download empty {fileName}.",
    "message.imageError": "Error preparing image: {error}",
    "message.generateContent": "Please create content first.",
    "message.pdfError": "Error creating PDF.",
    "message.generateWorksheet": "Please create a worksheet first.",
    "message.jpegError": "Error preparing JPEG.",
    "message.pdfCreateError": "Error creating PDF: {error}",
    "message.imagesError": "Error loading images.",
    "message.borderError": "Error loading borders.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "All Themes (uses translations)",
    "message.loading": "Loading...",
    "message.typeToSearch": "Type to search all images.",
    "message.noImages": "No images found {query}.",
    "message.uploadedHere": "Your uploaded images appear here.",
    "message.preparing": "Preparing {format}...",
    "message.preparingPdf": "Preparing PDF...",
    "message.preparingJpeg": "Preparing JPEG...",
    "decoration.allBorders": "All Borders",
    "message.selectBorderTheme": "Select a theme to see borders.",
    "message.loadingBorders": "Loading {theme} borders...",
    "message.noBorders": "No borders found.",
    "decoration.allBackgrounds": "All Backgrounds",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Name: ________________",
    "form.dateField": "Date: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "FREE VERSION - LessonCraftStudio.com",
    "watermark.freeShort": "FREE VERSION"
  },

  de: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Bilderrätsel-Generator",
    "settings.title": "Bilderrätsel-Einstellungen",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Spracheinstellungen",
    "settings.pageSetup": "Seiteneinrichtung",
    "settings.textTools": "Textwerkzeuge",
    "settings.exerciseConfig": "Übungseinstellungen",
    "library.title": "Bilderbibliothek",
    "library.uploadTitle": "Eigene Bilder Hochladen",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "settings.languageLabel": "Sprache:",
    "lang.en": "English (Englisch)",
    "lang.de": "Deutsch",
    "lang.fr": "Français (Französisch)",
    "lang.es": "Español (Spanisch)",
    "lang.pt": "Português (Portugiesisch)",
    "lang.it": "Italiano (Italienisch)",
    "lang.nl": "Nederlands (Niederländisch)",
    "lang.sv": "Svenska (Schwedisch)",
    "lang.da": "Dansk (Dänisch)",
    "lang.no": "Norsk (Norwegisch)",
    "lang.fi": "Suomi (Finnisch)",
    "word.guess.language.description": "Wählt die Inhaltssprache. Die UI-Sprache wird durch den Haupt-Sprachselektor in der Kopfzeile gesteuert.",

    // ===== 4. PAGE SETUP (16 items) =====
    "settings.pageSize": "Papierformat:",
    "pageSize.letterPortrait": "Letter Hochformat (612×792)",
    "pageSize.letterLandscape": "Letter Querformat (792×612)",
    "pageSize.a4Portrait": "A4 Hochformat (595×842)",
    "pageSize.a4Landscape": "A4 Querformat (842×595)",
    "pageSize.square": "Quadratisch (1200×1200)",
    "pageSize.custom": "Benutzerdefiniert",
    "settings.width": "Breite (px):",
    "settings.height": "Höhe (px):",
    "settings.pageColor": "Seitenfarbe:",
    "button.applySize": "Größe Anwenden",
    "decoration.backgroundTheme": "Hintergrund-Thema:",
    "decoration.none": "Kein",
    "none": "Kein",
    "decoration.backgroundOpacity": "Hintergrund-Transparenz:",
    "decoration.borderTheme": "Rahmen-Thema:",
    "decoration.borderOpacity": "Rahmen-Transparenz:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Inhalt:",
    "text.placeholder": "Hallo!",
    "button.addText": "Text Hinzufügen",
    "text.color": "Farbe:",
    "text.size": "Größe:",
    "text.font": "Schriftart:",
    "text.outlineColor": "Umrissfarbe:",
    "text.outlineWidth": "Umriss (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Anzahl der Rätsel (1–10):",
    "config.difficulty": "Schwierigkeitsgrad (Anzahl Hinweise)",
    "difficulty.noClues": "Keine Hinweise",
    "difficulty.easy": "Leicht (1/2)",
    "difficulty.normal": "Normal (1/4)",
    "difficulty.tough": "Schwer (1/6)",
    "config.excludeLetters": "Buchstaben von Hinweisen Ausschließen:",
    "config.excludePlaceholder": "z.B. AEIOU",
    "config.letterCase": "Groß-/Kleinschreibung",
    "case.uppercase": "Großbuchstaben",
    "case.lowercase": "Kleinbuchstaben",
    "config.includeNameDate": "Name & Datum Hinzufügen",
    "config.includeExerciseNumbers": "Übungen Nummerieren",

    // ===== 7. IMAGE LIBRARY (12 items) =====
    "library.selectTheme": "Thema Auswählen:",
    "library.allThemes": "Alle Themen",
    "library.search": "Bilder Suchen:",
    "library.searchPlaceholder": "z.B. Apfel, Auto",
    "library.availableImages": "Verfügbare Bilder:",
    "library.selectedImages": "Ausgewählte Bilder für Rätsel:",
    "library.selectUpload": "Bilder zum Hochladen auswählen:",
    "library.chooseFiles": "Dateien auswählen",
    "library.noFileChosen": "Keine Datei ausgewählt",
    "library.filesSelected": "{x} Datei(en) ausgewählt",
    "library.uploadedImages": "Ihre hochgeladenen Bilder (Diese Sitzung):",
    "library.selectedCount": "Ausgewählt: {x} / {y}",

    // Manual edit mode
    "manualImageEdit": "Manuelle Bildnamensbearbeitung",
    "enableManualEdit": "Bildnamen vor dem Generieren bearbeiten",
    "manualEditDescription": "Wenn aktiviert, können Sie Bilder manuell auswählen und deren Namen unten bearbeiten, bevor Sie das Rätsel generieren.",
    "selectAndEditImages": "Bilder auswählen und bearbeiten",
    "manualEditInstructions": "Klicken Sie, um Bilder hinzuzufügen, und bearbeiten Sie die Namen unten:",
    "clickImagesToAddThem": "Klicken Sie auf Bilder aus der Bibliothek, um sie hier zur Bearbeitung hinzuzufügen.",

    // Eigene Wortliste
    "customWordList": "Eigene Wortliste",
    "useCustomWords": "Eigene Wortliste verwenden",
    "customWordListDescription": "Wenn aktiviert, werden reine Textübungen mit Ihrer eigenen Wortliste erstellt (ohne Bilder).",
    "enterWords": "Wörter eingeben (ein Wort pro Zeile, max. 8):",
    "customWordsPlaceholder": "Apfel\nBanane\nOrange\nTraube",
    "customWordListNote": "Nur Buchstaben sind erlaubt. Sonderzeichen und Zahlen werden entfernt.",
    "customWordListEnabled": "Eigene Wortliste aktiviert. Die Übung wird nur aus Text bestehen.",
    "customWordListEmpty": "Bitte geben Sie mindestens ein Wort in die eigene Wortliste ein.",
    "customWordListTruncated": "{count} Wort/Wörter aus Ihrer Liste verwendet. Fügen Sie mehr Wörter für mehr Übungen hinzu.",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Ebenen",
    "toolbar.bringForward": "Nach Vorne",
    "toolbar.sendBackward": "Nach Hinten",
    "toolbar.align": "Ausrichten",
    "toolbar.alignLeft": "Links Ausrichten",
    "toolbar.centerH": "Horizontal Zentrieren",
    "toolbar.alignRight": "Rechts Ausrichten",
    "toolbar.alignTop": "Oben Ausrichten",
    "toolbar.centerV": "Vertikal Zentrieren",
    "toolbar.alignBottom": "Unten Ausrichten",
    "toolbar.centerPageH": "Auf Seite Horizontal Zentrieren",
    "toolbar.centerPageV": "Auf Seite Vertikal Zentrieren",
    "lockUnlock": "Sperren/Entsperren",
    "unlockAll": "Alle entsperren",
    "toolbar.delete": "Ausgewählte Löschen",

    // ===== ZOOM & HISTORY CONTROLS (5 items) =====
    "zoomIn": "Vergrößern",
    "zoomOut": "Verkleinern",
    "zoomReset": "Zoom Zurücksetzen",
    "undo": "Rückgängig",
    "redo": "Wiederholen",

    // ===== LAYER CONTROLS (4 items) =====
    "bringForward": "Nach Vorne Bringen",
    "bringToFront": "In den Vordergrund",
    "sendBackward": "Nach Hinten Senden",
    "sendToBack": "In den Hintergrund",

    // ===== NON-PREFIXED ACTION KEYS (12 items) =====
    "answerKey": "Lösungsblatt",
    "answerKeyJpeg": "Lösungsblatt (JPEG)",
    "answerKeyPdf": "Lösungsblatt (PDF)",
    "clearAll": "Alles Löschen",
    "download": "Herunterladen",
    "generate": "Erstellen",
    "grayscale": "Graustufen",
    "newWorksheet": "Neues Arbeitsblatt",
    "worksheet": "Arbeitsblatt",
    "worksheetJpeg": "Arbeitsblatt (JPEG)",
    "worksheetPdf": "Arbeitsblatt (PDF)",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Erstellen",
    "button.generateWorksheet": "Arbeitsblatt Erstellen",
    "button.generateAnswer": "Lösungsblatt Erstellen",
    "button.download": "Herunterladen",
    "button.worksheetJpeg": "Arbeitsblatt (JPEG)",
    "button.answerJpeg": "Lösungsblatt (JPEG)",
    "button.worksheetPdf": "Arbeitsblatt (PDF)",
    "button.answerPdf": "Lösungsblatt (PDF)",
    "settings.grayscale": "Graustufen",
    "button.clearAll": "Alles Löschen",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Arbeitsblatt",
    "tab.answerKey": "Lösungsblatt",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} benutzerdefinierte Bild(er) verfügbar.",
    "message.generatingWorksheet": "Arbeitsblatt wird erstellt...",
    "message.worksheetGenerated": "Arbeitsblatt erfolgreich erstellt!",
    "message.generatingAnswer": "Lösungsblatt wird erstellt...",
    "message.answerGenerated": "Lösungsblatt erstellt!",
    "message.assetAdded": "{type} hinzugefügt.",
    "message.formCleared": "Formular gelöscht.",
    "message.downloadStarted": "Download gestartet!",
    "message.pdfDownloaded": "PDF heruntergeladen!",
    "message.pdfSuccess": "PDF heruntergeladen!",
    "message.jpegDownloaded": "JPEG-Download gestartet!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Themen konnten nicht geladen werden.",
    "message.maxImages": "Sie können maximal {count} Bilder auswählen.",
    "message.selectImages": "Bitte wählen Sie einige Bilder aus oder wählen Sie ein Thema mit Bildern.",
    "message.generateFirst": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
    "message.cannotDownloadEmpty": "Leere Datei kann nicht heruntergeladen werden: {fileName}.",
    "message.imageError": "Fehler beim Vorbereiten des Bildes: {error}",
    "message.generateContent": "Bitte erstellen Sie zuerst Inhalt.",
    "message.pdfError": "Fehler beim Erstellen des PDFs.",
    "message.generateWorksheet": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
    "message.jpegError": "Fehler beim Vorbereiten des JPEG.",
    "message.pdfCreateError": "Fehler beim Erstellen des PDFs: {error}",
    "message.imagesError": "Fehler beim Laden der Bilder.",
    "message.borderError": "Fehler beim Laden der Rahmen.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Alle Themen (verwendet Übersetzungen)",
    "message.loading": "Laden...",
    "message.typeToSearch": "Tippen Sie, um alle Bilder zu durchsuchen.",
    "message.noImages": "Keine Bilder gefunden {query}.",
    "message.uploadedHere": "Ihre hochgeladenen Bilder erscheinen hier.",
    "message.preparing": "{format} wird vorbereitet...",
    "message.preparingPdf": "PDF wird vorbereitet...",
    "message.preparingJpeg": "JPEG wird vorbereitet...",
    "decoration.allBorders": "Alle Rahmen",
    "message.selectBorderTheme": "Wählen Sie ein Thema, um Rahmen zu sehen.",
    "message.loadingBorders": "Laden von {theme}-Rahmen...",
    "message.noBorders": "Keine Rahmen gefunden.",
    "decoration.allBackgrounds": "Alle Hintergründe",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Name: ________________",
    "form.dateField": "Datum: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "KOSTENLOSE VERSION - LessonCraftStudio.com",
    "watermark.freeShort": "KOSTENLOSE VERSION"
  },

  fr: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Générateur de Mots Mystères",
    "settings.title": "Paramètres des Mots Mystères",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Paramètres de Langue",
    "settings.pageSetup": "Mise en Page",
    "settings.textTools": "Options de texte",
    "settings.exerciseConfig": "Configuration de l'Exercice",
    "library.title": "Bibliothèque d'Images",
    "library.uploadTitle": "Ajouter vos Images",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "settings.languageLabel": "Langue :",
    "lang.en": "English (Anglais)",
    "lang.de": "Deutsch (Allemand)",
    "lang.fr": "Français",
    "lang.es": "Español (Espagnol)",
    "lang.pt": "Português (Portugais)",
    "lang.it": "Italiano (Italien)",
    "lang.nl": "Nederlands (Néerlandais)",
    "lang.sv": "Svenska (Suédois)",
    "lang.da": "Dansk (Danois)",
    "lang.no": "Norsk (Norvégien)",
    "lang.fi": "Suomi (Finnois)",
    "word.guess.language.description": "Permet de sélectionner la langue du contenu. La langue de l'interface est contrôlée par le sélecteur de langue principal dans l'en-tête.",

    // ===== 4. PAGE SETUP (16 items) =====
    "settings.pageSize": "Format de Page :",
    "pageSize.letterPortrait": "Letter Portrait (612×792)",
    "pageSize.letterLandscape": "Letter Paysage (792×612)",
    "pageSize.a4Portrait": "A4 Portrait (595×842)",
    "pageSize.a4Landscape": "A4 Paysage (842×595)",
    "pageSize.square": "Carré (1200×1200)",
    "pageSize.custom": "Personnalisé",
    "settings.width": "Largeur (px) :",
    "settings.height": "Hauteur (px) :",
    "settings.pageColor": "Couleur de Page :",
    "button.applySize": "Appliquer la Taille",
    "decoration.backgroundTheme": "Thème de Fond :",
    "decoration.none": "Aucun",
    "none": "Aucun",
    "decoration.backgroundOpacity": "Transparence du Fond :",
    "decoration.borderTheme": "Thème de Bordure :",
    "decoration.borderOpacity": "Transparence de la Bordure :",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Contenu :",
    "text.placeholder": "Bonjour !",
    "button.addText": "Ajouter du Texte",
    "text.color": "Couleur :",
    "text.size": "Taille :",
    "text.font": "Police :",
    "text.outlineColor": "Couleur du Contour :",
    "text.outlineWidth": "Épaisseur du Contour (0-10) :",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Nombre de Devinettes (1–10) :",
    "config.difficulty": "Difficulté (Nombre d'Indices)",
    "difficulty.noClues": "Sans indices",
    "difficulty.easy": "Facile (1/2)",
    "difficulty.normal": "Normal (1/4)",
    "difficulty.tough": "Difficile (1/6)",
    "config.excludeLetters": "Exclure des Lettres des Indices :",
    "config.excludePlaceholder": "ex : AEIOU",
    "config.letterCase": "Casse des Lettres",
    "case.uppercase": "Majuscules",
    "case.lowercase": "Minuscules",
    "config.includeNameDate": "Inclure Nom & Date",
    "config.includeExerciseNumbers": "Numéroter les Exercices",

    // ===== 7. IMAGE LIBRARY (12 items) =====
    "library.selectTheme": "Sélectionner un Thème :",
    "library.allThemes": "Tous les Thèmes",
    "library.search": "Rechercher des Images :",
    "library.searchPlaceholder": "ex : pomme, voiture",
    "library.availableImages": "Images Disponibles :",
    "library.selectedImages": "Images Sélectionnées pour les Devinettes :",
    "library.selectUpload": "Sélectionner des images à ajouter :",
    "library.chooseFiles": "Choisir des fichiers",
    "library.noFileChosen": "Aucun fichier choisi",
    "library.filesSelected": "{x} fichier(s) sélectionné(s)",
    "library.uploadedImages": "Vos Images Ajoutées (Cette Session) :",
    "library.selectedCount": "Sélectionnées : {x} / {y}",

    // Modification manuelle des noms d'images
    "manualImageEdit": "Modification manuelle des noms d'images",
    "enableManualEdit": "Modifier les noms d'images avant la création",
    "manualEditDescription": "Lorsque cette option est activée, vous pouvez sélectionner manuellement les images et modifier leurs noms ci-dessous avant de créer l'exercice.",
    "selectAndEditImages": "Sélectionner et modifier les images",
    "manualEditInstructions": "Cliquez pour ajouter des images, puis modifiez les noms ci-dessous :",
    "clickImagesToAddThem": "Cliquez sur des images de la bibliothèque pour les ajouter ici et les modifier.",

    // Liste de mots personnalisée
    "customWordList": "Liste de mots personnalisée",
    "useCustomWords": "Utiliser une liste de mots personnalisée",
    "customWordListDescription": "Lorsque cette option est activée, créez des exercices contenant uniquement du texte à partir de votre liste de mots personnalisée (sans images).",
    "enterWords": "Entrez les mots (un par ligne, 8 max.) :",
    "customWordsPlaceholder": "pomme\nbanane\norange\nraisin",
    "customWordListNote": "Seules les lettres sont autorisées. Les caractères spéciaux et les chiffres seront supprimés.",
    "customWordListEnabled": "Mode liste de mots personnalisée activé. L'exercice sera uniquement textuel.",
    "customWordListEmpty": "Veuillez entrer au moins un mot dans la liste de mots personnalisée.",
    "customWordListTruncated": "Utilisation de {count} mot(s) de votre liste. Ajoutez plus de mots pour plus d'exercices.",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Calques",
    "toolbar.bringForward": "Avancer",
    "toolbar.sendBackward": "Reculer",
    "toolbar.align": "Aligner",
    "toolbar.alignLeft": "Aligner à Gauche",
    "toolbar.centerH": "Centrer Horizontalement",
    "toolbar.alignRight": "Aligner à Droite",
    "toolbar.alignTop": "Aligner en Haut",
    "toolbar.centerV": "Centrer Verticalement",
    "toolbar.alignBottom": "Aligner en Bas",
    "toolbar.centerPageH": "Centrer sur la Page Horizontalement",
    "toolbar.centerPageV": "Centrer sur la Page Verticalement",
    "lockUnlock": "Verrouiller/Déverrouiller",
    "unlockAll": "Tout déverrouiller",
    "toolbar.delete": "Supprimer la Sélection",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Créer",
    "button.generateWorksheet": "Créer la Fiche",
    "button.generateAnswer": "Créer le Corrigé",
    "button.download": "Télécharger",
    "button.worksheetJpeg": "Fiche (JPEG)",
    "button.answerJpeg": "Corrigé (JPEG)",
    "button.worksheetPdf": "Fiche (PDF)",
    "button.answerPdf": "Corrigé (PDF)",
    "settings.grayscale": "Niveaux de Gris",
    "button.clearAll": "Tout Effacer",

    // ===== ZOOM & HISTORY CONTROLS (5 items) =====
    "zoomIn": "Zoomer",
    "zoomOut": "Dézoomer",
    "zoomReset": "Réinitialiser le Zoom",
    "undo": "Annuler",
    "redo": "Rétablir",

    // ===== LAYER CONTROLS (4 items) =====
    "bringForward": "Avancer",
    "bringToFront": "Mettre au Premier Plan",
    "sendBackward": "Reculer",
    "sendToBack": "Mettre à l'Arrière-Plan",

    // ===== NON-PREFIXED ACTION KEYS (12 items) =====
    "answerKey": "Corrigé",
    "answerKeyJpeg": "Corrigé (JPEG)",
    "answerKeyPdf": "Corrigé (PDF)",
    "clearAll": "Tout Effacer",
    "download": "Télécharger",
    "generate": "Créer",
    "grayscale": "Niveaux de Gris",
    "newWorksheet": "Nouvelle Fiche",
    "worksheet": "Fiche",
    "worksheetJpeg": "Fiche (JPEG)",
    "worksheetPdf": "Fiche (PDF)",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Fiche d'Exercices",
    "tab.answerKey": "Corrigé",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} image(s) personnalisée(s) disponible(s).",
    "message.generatingWorksheet": "Création de la fiche en cours...",
    "message.worksheetGenerated": "Fiche créée avec succès !",
    "message.generatingAnswer": "Création du corrigé en cours...",
    "message.answerGenerated": "Corrigé créé !",
    "message.assetAdded": "{type} ajouté.",
    "message.formCleared": "Formulaire effacé.",
    "message.downloadStarted": "Téléchargement lancé !",
    "message.pdfDownloaded": "PDF téléchargé !",
    "message.pdfSuccess": "PDF téléchargé !",
    "message.jpegDownloaded": "Téléchargement JPEG lancé !",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Impossible de charger les thèmes.",
    "message.maxImages": "Vous pouvez sélectionner un maximum de {count} images.",
    "message.selectImages": "Veuillez sélectionner des images ou choisir un thème avec des images.",
    "message.generateFirst": "Veuillez d'abord créer une fiche d'exercices.",
    "message.cannotDownloadEmpty": "Impossible de télécharger le fichier vide : {fileName}.",
    "message.imageError": "Erreur lors de la préparation de l'image : {error}",
    "message.generateContent": "Veuillez d'abord créer du contenu.",
    "message.pdfError": "Erreur lors de la création du PDF.",
    "message.generateWorksheet": "Veuillez d'abord créer une fiche d'exercices.",
    "message.jpegError": "Erreur lors de la préparation du JPEG.",
    "message.pdfCreateError": "Erreur lors de la création du PDF : {error}",
    "message.imagesError": "Erreur lors du chargement des images.",
    "message.borderError": "Erreur lors du chargement des bordures.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Tous les Thèmes (utilise les traductions)",
    "message.loading": "Chargement...",
    "message.typeToSearch": "Tapez pour rechercher dans toutes les images.",
    "message.noImages": "Aucune image trouvée {query}.",
    "message.uploadedHere": "Vos images ajoutées apparaissent ici.",
    "message.preparing": "Préparation du {format}...",
    "message.preparingPdf": "Préparation du PDF...",
    "message.preparingJpeg": "Préparation du JPEG...",
    "decoration.allBorders": "Toutes les Bordures",
    "message.selectBorderTheme": "Sélectionnez un thème pour voir les bordures.",
    "message.loadingBorders": "Chargement des bordures {theme}...",
    "message.noBorders": "Aucune bordure trouvée.",
    "decoration.allBackgrounds": "Tous les Fonds",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Nom : ________________",
    "form.dateField": "Date : ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "VERSION GRATUITE - LessonCraftStudio.com",
    "watermark.freeShort": "VERSION GRATUITE"
  },

  es: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Creador de Palabras Ocultas",
    "settings.title": "Configuración de Palabras Ocultas",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Configuración de Idioma",
    "settings.pageSetup": "Configuración de Página",
    "settings.textTools": "Herramientas de texto",
    "settings.exerciseConfig": "Configuración del Ejercicio",
    "library.title": "Biblioteca de Imágenes",
    "library.uploadTitle": "Subir Imágenes Propias",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "settings.languageLabel": "Idioma:",
    "lang.en": "English (Inglés)",
    "lang.de": "Deutsch (Alemán)",
    "lang.fr": "Français (Francés)",
    "lang.es": "Español",
    "lang.pt": "Português (Portugués)",
    "lang.it": "Italiano",
    "lang.nl": "Nederlands (Holandés)",
    "lang.sv": "Svenska (Sueco)",
    "lang.da": "Dansk (Danés)",
    "lang.no": "Norsk (Noruego)",
    "word.guess.language.description": "Selecciona el idioma del contenido. El idioma de la interfaz se controla mediante el selector de idioma principal en el encabezado.",
    "lang.fi": "Suomi (Finés)",

    // ===== 4. PAGE SETUP (16 items) =====
    "settings.pageSize": "Tamaño de Página:",
    "pageSize.letterPortrait": "Carta Vertical (612×792)",
    "pageSize.letterLandscape": "Carta Horizontal (792×612)",
    "pageSize.a4Portrait": "A4 Vertical (595×842)",
    "pageSize.a4Landscape": "A4 Horizontal (842×595)",
    "pageSize.square": "Cuadrado (1200×1200)",
    "pageSize.custom": "Personalizado",
    "settings.width": "Ancho (px):",
    "settings.height": "Alto (px):",
    "settings.pageColor": "Color de Página:",
    "button.applySize": "Aplicar Tamaño",
    "decoration.backgroundTheme": "Tema de Fondo:",
    "decoration.none": "Ninguno",
    "none": "Ninguno",
    "decoration.backgroundOpacity": "Transparencia del Fondo:",
    "decoration.borderTheme": "Tema del Marco:",
    "decoration.borderOpacity": "Transparencia del Marco:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Contenido:",
    "text.placeholder": "¡Hola!",
    "button.addText": "Añadir Texto",
    "text.color": "Color:",
    "text.size": "Tamaño:",
    "text.font": "Fuente:",
    "text.outlineColor": "Color del Contorno:",
    "text.outlineWidth": "Grosor del Contorno (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Número de Acertijos (1–10):",
    "config.difficulty": "Dificultad (Cantidad de Pistas)",
    "difficulty.noClues": "Sin pistas",
    "difficulty.easy": "Fácil (1/2)",
    "difficulty.normal": "Normal (1/4)",
    "difficulty.tough": "Difícil (1/6)",
    "config.excludeLetters": "Excluir Letras de las Pistas:",
    "config.excludePlaceholder": "ej: AEIOU",
    "config.letterCase": "Tipo de Letra",
    "case.uppercase": "Mayúsculas",
    "case.lowercase": "Minúsculas",
    "config.includeNameDate": "Incluir Nombre y Fecha",
    "config.includeExerciseNumbers": "Numerar los Ejercicios",

    // ===== 7. IMAGE LIBRARY (12 items) =====
    "library.selectTheme": "Seleccionar Tema:",
    "library.allThemes": "Todos los Temas",
    "library.search": "Buscar Imágenes:",
    "library.searchPlaceholder": "ej: manzana, coche",
    "library.availableImages": "Imágenes Disponibles:",
    "library.selectedImages": "Imágenes Seleccionadas para los Acertijos:",
    "library.selectUpload": "Seleccionar imágenes para subir:",
    "library.chooseFiles": "Seleccionar imágenes",
    "library.noFileChosen": "Ningún archivo elegido",
    "library.filesSelected": "{x} archivo(s) seleccionado(s)",
    "library.uploadedImages": "Tus Imágenes Subidas (Esta Sesión):",
    "library.selectedCount": "Seleccionadas: {x} / {y}",

    // Edición manual de nombres de imágenes
    "manualImageEdit": "Edición manual de nombres de imágenes",
    "enableManualEdit": "Editar nombres de imágenes antes de crear",
    "manualEditDescription": "Cuando está activado, puedes seleccionar manualmente las imágenes y editar sus nombres a continuación antes de crear el ejercicio.",
    "selectAndEditImages": "Seleccionar y editar imágenes",
    "manualEditInstructions": "Haz clic para agregar imágenes, luego edita los nombres a continuación:",
    "clickImagesToAddThem": "Haz clic en las imágenes de la biblioteca para agregarlas aquí y editarlas.",

    // Lista de palabras personalizada
    "customWordList": "Lista de palabras personalizada",
    "useCustomWords": "Usar lista de palabras personalizada",
    "customWordListDescription": "Cuando está activado, crea ejercicios de solo texto usando tu lista de palabras personalizada (sin imágenes).",
    "enterWords": "Ingresa las palabras (una por línea, máx. 8):",
    "customWordsPlaceholder": "manzana\nplátano\nnaranja\nuva",
    "customWordListNote": "Solo se permiten letras. Los caracteres especiales y números serán eliminados.",
    "customWordListEnabled": "Modo de lista de palabras personalizada activado. El ejercicio será solo de texto.",
    "customWordListEmpty": "Por favor, ingresa al menos una palabra en la lista de palabras personalizada.",
    "customWordListTruncated": "Usando {count} palabra(s) de tu lista. Agrega más palabras para más ejercicios.",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Capas",
    "toolbar.bringForward": "Traer al Frente",
    "toolbar.sendBackward": "Enviar Atrás",
    "toolbar.align": "Alinear",
    "toolbar.alignLeft": "Alinear a la Izquierda",
    "toolbar.centerH": "Centrar Horizontalmente",
    "toolbar.alignRight": "Alinear a la Derecha",
    "toolbar.alignTop": "Alinear Arriba",
    "toolbar.centerV": "Centrar Verticalmente",
    "toolbar.alignBottom": "Alinear Abajo",
    "toolbar.centerPageH": "Centrar en la Página Horizontalmente",
    "toolbar.centerPageV": "Centrar en la Página Verticalmente",
    "lockUnlock": "Bloquear/Desbloquear",
    "unlockAll": "Desbloquear todo",
    "toolbar.delete": "Eliminar Selección",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Crear",
    "button.generateWorksheet": "Crear Ficha de Trabajo",
    "button.generateAnswer": "Crear Solucionario",
    "button.download": "Descargar",
    "button.worksheetJpeg": "Ficha de Trabajo (JPEG)",
    "button.answerJpeg": "Solucionario (JPEG)",
    "button.worksheetPdf": "Ficha de Trabajo (PDF)",
    "button.answerPdf": "Solucionario (PDF)",
    "settings.grayscale": "Escala de Grises",
    "button.clearAll": "Borrar Todo",

    // ===== ZOOM & HISTORY CONTROLS (5 items) =====
    "zoomIn": "Acercar",
    "zoomOut": "Alejar",
    "zoomReset": "Restablecer Zoom",
    "undo": "Deshacer",
    "redo": "Rehacer",

    // ===== LAYER CONTROLS (4 items) =====
    "bringForward": "Traer Adelante",
    "bringToFront": "Traer al Frente",
    "sendBackward": "Enviar Atrás",
    "sendToBack": "Enviar al Fondo",

    // ===== NON-PREFIXED ACTION KEYS (12 items) =====
    "answerKey": "Solucionario",
    "answerKeyJpeg": "Solucionario (JPEG)",
    "answerKeyPdf": "Solucionario (PDF)",
    "clearAll": "Borrar Todo",
    "download": "Descargar",
    "generate": "Crear",
    "grayscale": "Escala de Grises",
    "newWorksheet": "Nueva Ficha",
    "worksheet": "Ficha de Trabajo",
    "worksheetJpeg": "Ficha de Trabajo (JPEG)",
    "worksheetPdf": "Ficha de Trabajo (PDF)",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Ficha de Trabajo",
    "tab.answerKey": "Solucionario",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} imagen(es) personalizada(s) disponible(s).",
    "message.generatingWorksheet": "Creando ficha de trabajo...",
    "message.worksheetGenerated": "¡Ficha de trabajo creada con éxito!",
    "message.generatingAnswer": "Creando solucionario...",
    "message.answerGenerated": "¡Solucionario creado!",
    "message.assetAdded": "{type} añadido.",
    "message.formCleared": "Formulario borrado.",
    "message.downloadStarted": "¡Descarga iniciada!",
    "message.pdfDownloaded": "¡PDF descargado!",
    "message.pdfSuccess": "¡PDF descargado!",
    "message.jpegDownloaded": "¡Descarga JPEG iniciada!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "No se pudieron cargar los temas.",
    "message.maxImages": "Puede seleccionar un máximo de {count} imágenes.",
    "message.selectImages": "Por favor, seleccione algunas imágenes o elija un tema con imágenes.",
    "message.generateFirst": "Por favor, primero cree una ficha de trabajo.",
    "message.cannotDownloadEmpty": "No se puede descargar el archivo vacío: {fileName}.",
    "message.imageError": "Error al preparar la imagen: {error}",
    "message.generateContent": "Por favor, primero cree contenido.",
    "message.pdfError": "Error al crear el PDF.",
    "message.generateWorksheet": "Por favor, primero cree una ficha de trabajo.",
    "message.jpegError": "Error al preparar el JPEG.",
    "message.pdfCreateError": "Error al crear el PDF: {error}",
    "message.imagesError": "Error al cargar las imágenes.",
    "message.borderError": "Error al cargar los marcos.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Todos los Temas (usa traducciones)",
    "message.loading": "Cargando...",
    "message.typeToSearch": "Escriba para buscar en todas las imágenes.",
    "message.noImages": "No se encontraron imágenes {query}.",
    "message.uploadedHere": "Tus imágenes subidas aparecen aquí.",
    "message.preparing": "Preparando {format}...",
    "message.preparingPdf": "Preparando PDF...",
    "message.preparingJpeg": "Preparando JPEG...",
    "decoration.allBorders": "Todos los Marcos",
    "message.selectBorderTheme": "Seleccione un tema para ver los marcos.",
    "message.loadingBorders": "Cargando marcos de {theme}...",
    "message.noBorders": "No se encontraron marcos.",
    "decoration.allBackgrounds": "Todos los Fondos",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Nombre: ________________",
    "form.dateField": "Fecha: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "VERSIÓN GRATUITA - LessonCraftStudio.com",
    "watermark.freeShort": "VERSIÓN GRATUITA"
  },

  it: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Generatore di Indovinelli",
    "settings.title": "Impostazioni Indovinelli",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Impostazioni Lingua",
    "settings.pageSetup": "Impostazione Pagina",
    "settings.textTools": "Strumenti testo",
    "settings.exerciseConfig": "Configurazione Esercizio",
    "library.title": "Raccolta Immagini",
    "library.uploadTitle": "Carica le tue immagini",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "settings.languageLabel": "Lingua:",
    "lang.en": "English (Inglese)",
    "lang.de": "Deutsch (Tedesco)",
    "lang.fr": "Français (Francese)",
    "lang.es": "Español (Spagnolo)",
    "lang.pt": "Português (Portoghese)",
    "lang.it": "Italiano",
    "lang.nl": "Nederlands (Olandese)",
    "lang.sv": "Svenska (Svedese)",
    "lang.da": "Dansk (Danese)",
    "lang.no": "Norsk (Norvegese)",
    "word.guess.language.description": "Seleziona la lingua dei contenuti. La lingua dell'interfaccia è controllata dal selettore della lingua principale nell'intestazione.",
    "lang.fi": "Suomi (Finlandese)",

    // ===== 4. PAGE SETUP (16 items) =====
    "settings.pageSize": "Formato Pagina:",
    "pageSize.letterPortrait": "Letter Verticale (612×792)",
    "pageSize.letterLandscape": "Letter Orizzontale (792×612)",
    "pageSize.a4Portrait": "A4 Verticale (595×842)",
    "pageSize.a4Landscape": "A4 Orizzontale (842×595)",
    "pageSize.square": "Quadrato (1200×1200)",
    "pageSize.custom": "Personalizzato",
    "settings.width": "Larghezza (px):",
    "settings.height": "Altezza (px):",
    "settings.pageColor": "Colore Pagina:",
    "button.applySize": "Applica Dimensioni",
    "decoration.backgroundTheme": "Tema Sfondo:",
    "decoration.none": "Nessuno",
    "none": "Nessuno",
    "decoration.backgroundOpacity": "Opacità Sfondo:",
    "decoration.borderTheme": "Tema Bordo:",
    "decoration.borderOpacity": "Opacità Bordo:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Contenuto:",
    "text.placeholder": "Ciao!",
    "button.addText": "Aggiungi Testo",
    "text.color": "Colore:",
    "text.size": "Dimensione:",
    "text.font": "Carattere:",
    "text.outlineColor": "Colore Contorno:",
    "text.outlineWidth": "Spessore Contorno (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Numero di Indovinelli (1–10):",
    "config.difficulty": "Difficoltà (Quantità di Indizi)",
    "difficulty.noClues": "Senza indizi",
    "difficulty.easy": "Facile (1/2)",
    "difficulty.normal": "Normale (1/4)",
    "difficulty.tough": "Difficile (1/6)",
    "config.excludeLetters": "Escludi Lettere dagli Indizi:",
    "config.excludePlaceholder": "es: AEIOU",
    "config.letterCase": "Tipo di Carattere",
    "case.uppercase": "Maiuscolo",
    "case.lowercase": "Minuscolo",
    "config.includeNameDate": "Includi Nome e Data",
    "config.includeExerciseNumbers": "Numera gli Esercizi",

    // ===== 7. IMAGE LIBRARY (12 items) =====
    "library.selectTheme": "Seleziona Tema:",
    "library.allThemes": "Tutti i Temi",
    "library.search": "Cerca Immagini:",
    "library.searchPlaceholder": "es: mela, auto",
    "library.availableImages": "Immagini Disponibili:",
    "library.selectedImages": "Immagini Selezionate per gli Indovinelli:",
    "library.selectUpload": "Seleziona immagini da caricare:",
    "library.chooseFiles": "Scegli file",
    "library.noFileChosen": "Nessun file scelto",
    "library.filesSelected": "{x} file selezionato/i",
    "library.uploadedImages": "Le Tue Immagini Caricate (Questa Sessione):",
    "library.selectedCount": "Selezionate: {x} / {y}",

    // Modifica manuale dei nomi delle immagini
    "manualImageEdit": "Modifica manuale dei nomi delle immagini",
    "enableManualEdit": "Modifica i nomi delle immagini prima di creare",
    "manualEditDescription": "Quando è abilitata, puoi selezionare manualmente le immagini e modificarne i nomi qui sotto prima di creare l'esercizio.",
    "selectAndEditImages": "Seleziona e modifica le immagini",
    "manualEditInstructions": "Clicca per aggiungere immagini, poi modifica i nomi qui sotto:",
    "clickImagesToAddThem": "Clicca sulle immagini della biblioteca per aggiungerle qui e modificarle.",

    // Lista di parole personalizzata
    "customWordList": "Lista di parole personalizzata",
    "useCustomWords": "Usa lista di parole personalizzata",
    "customWordListDescription": "Quando è abilitata, crea esercizi di solo testo usando la tua lista di parole personalizzata (senza immagini).",
    "enterWords": "Inserisci le parole (una per riga, max 8):",
    "customWordsPlaceholder": "mela\nbanana\narancia\nuva",
    "customWordListNote": "Sono consentite solo lettere. I caratteri speciali e i numeri verranno rimossi.",
    "customWordListEnabled": "Modalità lista di parole personalizzata attivata. L'esercizio sarà di solo testo.",
    "customWordListEmpty": "Inserisci almeno una parola nella lista di parole personalizzata.",
    "customWordListTruncated": "Usando {count} parola/e dalla tua lista. Aggiungi più parole per più esercizi.",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Livelli",
    "toolbar.bringForward": "Porta Avanti",
    "toolbar.sendBackward": "Porta Indietro",
    "toolbar.align": "Allinea",
    "toolbar.alignLeft": "Allinea a Sinistra",
    "toolbar.centerH": "Centra Orizzontalmente",
    "toolbar.alignRight": "Allinea a Destra",
    "toolbar.alignTop": "Allinea in Alto",
    "toolbar.centerV": "Centra Verticalmente",
    "toolbar.alignBottom": "Allinea in Basso",
    "toolbar.centerPageH": "Centra sulla Pagina Orizzontalmente",
    "toolbar.centerPageV": "Centra sulla Pagina Verticalmente",
    "lockUnlock": "Blocca/Sblocca",
    "unlockAll": "Sblocca tutto",
    "toolbar.delete": "Elimina Selezione",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Crea",
    "button.generateWorksheet": "Crea Scheda di Lavoro",
    "button.generateAnswer": "Crea Soluzioni",
    "button.download": "Scarica",
    "button.worksheetJpeg": "Scheda di Lavoro (JPEG)",
    "button.answerJpeg": "Soluzioni (JPEG)",
    "button.worksheetPdf": "Scheda di Lavoro (PDF)",
    "button.answerPdf": "Soluzioni (PDF)",
    "settings.grayscale": "Scala di Grigi",
    "button.clearAll": "Cancella Tutto",

    // ===== ZOOM & HISTORY CONTROLS (5 items) =====
    "zoomIn": "Ingrandisci",
    "zoomOut": "Rimpicciolisci",
    "zoomReset": "Reimposta Zoom",
    "undo": "Annulla",
    "redo": "Ripristina",

    // ===== LAYER CONTROLS (4 items) =====
    "bringForward": "Porta Avanti",
    "bringToFront": "Porta in Primo Piano",
    "sendBackward": "Porta Indietro",
    "sendToBack": "Porta sullo Sfondo",

    // ===== NON-PREFIXED ACTION KEYS (12 items) =====
    "answerKey": "Soluzioni",
    "answerKeyJpeg": "Soluzioni (JPEG)",
    "answerKeyPdf": "Soluzioni (PDF)",
    "clearAll": "Cancella Tutto",
    "download": "Scarica",
    "generate": "Crea",
    "grayscale": "Scala di Grigi",
    "newWorksheet": "Nuova Scheda",
    "worksheet": "Scheda di Lavoro",
    "worksheetJpeg": "Scheda di Lavoro (JPEG)",
    "worksheetPdf": "Scheda di Lavoro (PDF)",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Scheda di Lavoro",
    "tab.answerKey": "Soluzioni",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} immagine/i personalizzata/e disponibile/i.",
    "message.generatingWorksheet": "Creazione scheda di lavoro...",
    "message.worksheetGenerated": "Scheda di lavoro creata con successo!",
    "message.generatingAnswer": "Creazione soluzioni...",
    "message.answerGenerated": "Soluzioni create!",
    "message.assetAdded": "{type} aggiunto.",
    "message.formCleared": "Modulo cancellato.",
    "message.downloadStarted": "Scaricamento avviato!",
    "message.pdfDownloaded": "PDF scaricato!",
    "message.pdfSuccess": "PDF scaricato!",
    "message.jpegDownloaded": "Scaricamento JPEG avviato!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Impossibile caricare i temi.",
    "message.maxImages": "Puoi selezionare un massimo di {count} immagini.",
    "message.selectImages": "Per favore, seleziona alcune immagini o scegli un tema con immagini.",
    "message.generateFirst": "Per favore, crea prima una scheda di lavoro.",
    "message.cannotDownloadEmpty": "Impossibile scaricare il file vuoto: {fileName}.",
    "message.imageError": "Errore nella preparazione dell'immagine: {error}",
    "message.generateContent": "Per favore, crea prima il contenuto.",
    "message.pdfError": "Errore nella creazione del PDF.",
    "message.generateWorksheet": "Per favore, crea prima una scheda di lavoro.",
    "message.jpegError": "Errore nella preparazione del JPEG.",
    "message.pdfCreateError": "Errore nella creazione del PDF: {error}",
    "message.imagesError": "Errore nel caricamento delle immagini.",
    "message.borderError": "Errore nel caricamento dei bordi.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Tutti i Temi (usa traduzioni)",
    "message.loading": "Caricamento...",
    "message.typeToSearch": "Digita per cercare tra tutte le immagini.",
    "message.noImages": "Nessuna immagine trovata {query}.",
    "message.uploadedHere": "Le tue immagini caricate appaiono qui.",
    "message.preparing": "Preparazione {format}...",
    "message.preparingPdf": "Preparazione PDF...",
    "message.preparingJpeg": "Preparazione JPEG...",
    "decoration.allBorders": "Tutti i Bordi",
    "message.selectBorderTheme": "Seleziona un tema per vedere i bordi.",
    "message.loadingBorders": "Caricamento bordi {theme}...",
    "message.noBorders": "Nessun bordo trovato.",
    "decoration.allBackgrounds": "Tutti gli Sfondi",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Nome: ________________",
    "form.dateField": "Data: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "VERSIONE GRATUITA - LessonCraftStudio.com",
    "watermark.freeShort": "VERSIONE GRATUITA"
  },

  pt: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Gerador de Palavras Enigma",
    "settings.title": "Configurações de Palavras Enigma",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Configurações de Idioma",
    "settings.pageSetup": "Configuração da Página",
    "settings.textTools": "Ferramentas de Texto",
    "settings.exerciseConfig": "Configuração do Exercício",
    "library.title": "Biblioteca de Imagens",
    "library.uploadTitle": "Enviar Suas Imagens",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "settings.languageLabel": "Idioma:",
    "lang.en": "English (Inglês)",
    "lang.de": "Deutsch (Alemão)",
    "lang.fr": "Français (Francês)",
    "lang.es": "Español (Espanhol)",
    "lang.pt": "Português",
    "lang.it": "Italiano",
    "lang.nl": "Nederlands (Holandês)",
    "lang.sv": "Svenska (Sueco)",
    "lang.da": "Dansk (Dinamarquês)",
    "lang.no": "Norsk (Norueguês)",
    "lang.fi": "Suomi (Finlandês)",
    "word.guess.language.description": "Seleciona o idioma do conteúdo. O idioma da interface é controlado pelo seletor de idioma principal no cabeçalho.",

    // ===== 4. PAGE SETUP (16 items) =====
    "settings.pageSize": "Tamanho da Página:",
    "pageSize.letterPortrait": "Carta Retrato (612×792)",
    "pageSize.letterLandscape": "Carta Paisagem (792×612)",
    "pageSize.a4Portrait": "A4 Retrato (595×842)",
    "pageSize.a4Landscape": "A4 Paisagem (842×595)",
    "pageSize.square": "Quadrado (1200×1200)",
    "pageSize.custom": "Personalizado",
    "settings.width": "Largura (px):",
    "settings.height": "Altura (px):",
    "settings.pageColor": "Cor da Página:",
    "button.applySize": "Aplicar Tamanho",
    "decoration.backgroundTheme": "Tema de Fundo:",
    "decoration.none": "Nenhum",
    "none": "Nenhum",
    "decoration.backgroundOpacity": "Opacidade do Fundo:",
    "decoration.borderTheme": "Tema da Moldura:",
    "decoration.borderOpacity": "Opacidade da Moldura:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Conteúdo:",
    "text.placeholder": "Olá!",
    "button.addText": "Adicionar Texto",
    "text.color": "Cor:",
    "text.size": "Tamanho:",
    "text.font": "Fonte:",
    "text.outlineColor": "Cor do Contorno:",
    "text.outlineWidth": "Espessura do Contorno (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Número de Enigmas (1–10):",
    "config.difficulty": "Dificuldade (Quantidade de Dicas)",
    "difficulty.noClues": "Sem dicas",
    "difficulty.easy": "Fácil (1/2)",
    "difficulty.normal": "Normal (1/4)",
    "difficulty.tough": "Difícil (1/6)",
    "config.excludeLetters": "Excluir Letras das Dicas:",
    "config.excludePlaceholder": "ex: AEIOU",
    "config.letterCase": "Tipo de Letra",
    "case.uppercase": "Maiúsculas",
    "case.lowercase": "Minúsculas",
    "config.includeNameDate": "Incluir Nome e Data",
    "config.includeExerciseNumbers": "Numerar os Exercícios",

    // ===== 7. IMAGE LIBRARY (12 items) =====
    "library.selectTheme": "Selecionar Tema:",
    "library.allThemes": "Todos os Temas",
    "library.search": "Pesquisar Imagens:",
    "library.searchPlaceholder": "ex: maçã, carro",
    "library.availableImages": "Imagens Disponíveis:",
    "library.selectedImages": "Imagens Selecionadas para os Enigmas:",
    "library.selectUpload": "Selecionar imagens para enviar:",
    "library.chooseFiles": "Escolher arquivos",
    "library.noFileChosen": "Nenhum arquivo escolhido",
    "library.filesSelected": "{x} arquivo(s) selecionado(s)",
    "library.uploadedImages": "Suas Imagens Enviadas (Esta Sessão):",
    "library.selectedCount": "Selecionadas: {x} / {y}",

    // Edição manual de nomes de imagens
    "manualImageEdit": "Edição manual de nomes de imagens",
    "enableManualEdit": "Editar nomes de imagens antes de criar",
    "manualEditDescription": "Quando ativado, você pode selecionar manualmente as imagens e editar seus nomes abaixo antes de criar o exercício.",
    "selectAndEditImages": "Selecionar e editar imagens",
    "manualEditInstructions": "Clique para adicionar imagens, depois edite os nomes abaixo:",
    "clickImagesToAddThem": "Clique nas imagens da biblioteca para adicioná-las aqui e editá-las.",

    // Lista de palavras personalizada
    "customWordList": "Lista de palavras personalizada",
    "useCustomWords": "Usar lista de palavras personalizada",
    "customWordListDescription": "Quando ativado, cria exercícios apenas com texto usando sua lista de palavras personalizada (sem imagens).",
    "enterWords": "Digite as palavras (uma por linha, máx. 8):",
    "customWordsPlaceholder": "maçã\nbanana\nlaranja\nuva",
    "customWordListNote": "Apenas letras são permitidas. Caracteres especiais e números serão removidos.",
    "customWordListEnabled": "Modo de lista de palavras personalizada ativado. O exercício será apenas texto.",
    "customWordListEmpty": "Por favor, digite pelo menos uma palavra na lista de palavras personalizada.",
    "customWordListTruncated": "Usando {count} palavra(s) da sua lista. Adicione mais palavras para mais exercícios.",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Camadas",
    "toolbar.bringForward": "Trazer para Frente",
    "toolbar.sendBackward": "Enviar para Trás",
    "toolbar.align": "Alinhar",
    "toolbar.alignLeft": "Alinhar à Esquerda",
    "toolbar.centerH": "Centrar Horizontalmente",
    "toolbar.alignRight": "Alinhar à Direita",
    "toolbar.alignTop": "Alinhar ao Topo",
    "toolbar.centerV": "Centrar Verticalmente",
    "toolbar.alignBottom": "Alinhar à Base",
    "toolbar.centerPageH": "Centrar na Página Horizontalmente",
    "toolbar.centerPageV": "Centrar na Página Verticalmente",
    "lockUnlock": "Bloquear/Desbloquear",
    "unlockAll": "Desbloquear tudo",
    "toolbar.delete": "Excluir Seleção",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Gerar",
    "button.generateWorksheet": "Criar Folha de Exercícios",
    "button.generateAnswer": "Criar Gabarito",
    "button.download": "Baixar",
    "button.worksheetJpeg": "Folha de Exercícios (JPEG)",
    "button.answerJpeg": "Gabarito (JPEG)",
    "button.worksheetPdf": "Folha de Exercícios (PDF)",
    "button.answerPdf": "Gabarito (PDF)",
    "settings.grayscale": "Escala de Cinza",
    "button.clearAll": "Limpar Tudo",

    // ===== ZOOM & HISTORY CONTROLS (5 items) =====
    "zoomIn": "Ampliar",
    "zoomOut": "Reduzir",
    "zoomReset": "Redefinir Zoom",
    "undo": "Desfazer",
    "redo": "Refazer",

    // ===== LAYER CONTROLS (4 items) =====
    "bringForward": "Trazer para Frente",
    "bringToFront": "Trazer para o Primeiro Plano",
    "sendBackward": "Enviar para Trás",
    "sendToBack": "Enviar para o Último Plano",

    // ===== NON-PREFIXED ACTION KEYS (12 items) =====
    "answerKey": "Gabarito",
    "answerKeyJpeg": "Gabarito (JPEG)",
    "answerKeyPdf": "Gabarito (PDF)",
    "clearAll": "Limpar Tudo",
    "download": "Baixar",
    "generate": "Gerar",
    "grayscale": "Escala de Cinza",
    "newWorksheet": "Nova Folha",
    "worksheet": "Folha de Exercícios",
    "worksheetJpeg": "Folha de Exercícios (JPEG)",
    "worksheetPdf": "Folha de Exercícios (PDF)",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Folha de Exercícios",
    "tab.answerKey": "Gabarito",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} imagem(ns) personalizada(s) disponível(is).",
    "message.generatingWorksheet": "Gerando folha de exercícios...",
    "message.worksheetGenerated": "Folha de exercícios criada com sucesso!",
    "message.generatingAnswer": "Gerando gabarito...",
    "message.answerGenerated": "Gabarito criado!",
    "message.assetAdded": "{type} adicionado.",
    "message.formCleared": "Formulário limpo.",
    "message.downloadStarted": "Download iniciado!",
    "message.pdfDownloaded": "PDF baixado!",
    "message.pdfSuccess": "PDF baixado!",
    "message.jpegDownloaded": "Download JPEG iniciado!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Não foi possível carregar os temas.",
    "message.maxImages": "Você pode selecionar no máximo {count} imagens.",
    "message.selectImages": "Por favor, selecione algumas imagens ou escolha um tema com imagens.",
    "message.generateFirst": "Por favor, crie primeiro uma folha de exercícios.",
    "message.cannotDownloadEmpty": "Não é possível baixar o arquivo vazio: {fileName}.",
    "message.imageError": "Erro ao preparar a imagem: {error}",
    "message.generateContent": "Por favor, gere o conteúdo primeiro.",
    "message.pdfError": "Erro ao criar o PDF.",
    "message.generateWorksheet": "Por favor, crie primeiro uma folha de exercícios.",
    "message.jpegError": "Erro ao preparar o JPEG.",
    "message.pdfCreateError": "Erro ao criar o PDF: {error}",
    "message.imagesError": "Erro ao carregar as imagens.",
    "message.borderError": "Erro ao carregar as molduras.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Todos os Temas (usa traduções)",
    "message.loading": "Carregando...",
    "message.typeToSearch": "Digite para pesquisar em todas as imagens.",
    "message.noImages": "Nenhuma imagem encontrada {query}.",
    "message.uploadedHere": "Suas imagens enviadas aparecem aqui.",
    "message.preparing": "Preparando {format}...",
    "message.preparingPdf": "Preparando PDF...",
    "message.preparingJpeg": "Preparando JPEG...",
    "decoration.allBorders": "Todas as Molduras",
    "message.selectBorderTheme": "Selecione um tema para ver as molduras.",
    "message.loadingBorders": "Carregando molduras de {theme}...",
    "message.noBorders": "Nenhuma moldura encontrada.",
    "decoration.allBackgrounds": "Todos os Fundos",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Nome: ________________",
    "form.dateField": "Data: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "VERSÃO GRATUITA - LessonCraftStudio.com",
    "watermark.freeShort": "VERSÃO GRATUITA"
  },

  nl: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Woordpuzzelgenerator",
    "settings.title": "Woordpuzzelinstellingen",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Taalinstellingen",
    "settings.pageSetup": "Pagina-instelling",
    "settings.textTools": "Tekstgereedschappen",
    "settings.exerciseConfig": "Oefenconfiguratie",
    "library.title": "Afbeeldingenbibliotheek",
    "library.uploadTitle": "Upload Je Eigen Afbeeldingen",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "settings.languageLabel": "Taal:",
    "lang.en": "English (Engels)",
    "lang.de": "Deutsch (Duits)",
    "lang.fr": "Français (Frans)",
    "lang.es": "Español (Spaans)",
    "lang.pt": "Português (Portugees)",
    "lang.it": "Italiano (Italiaans)",
    "lang.nl": "Nederlands",
    "lang.sv": "Svenska (Zweeds)",
    "lang.da": "Dansk (Deens)",
    "lang.no": "Norsk (Noors)",
    "word.guess.language.description": "Selecteert de inhoudstaal. De UI-taal wordt geregeld door de hoofdtaalselector in de header.",
    "lang.fi": "Suomi (Fins)",

    // ===== 4. PAGE SETUP (16 items) =====
    "settings.pageSize": "Paginaformaat:",
    "pageSize.letterPortrait": "Letter Staand (612×792)",
    "pageSize.letterLandscape": "Letter Liggend (792×612)",
    "pageSize.a4Portrait": "A4 Staand (595×842)",
    "pageSize.a4Landscape": "A4 Liggend (842×595)",
    "pageSize.square": "Vierkant (1200×1200)",
    "pageSize.custom": "Aangepast",
    "settings.width": "Breedte (px):",
    "settings.height": "Hoogte (px):",
    "settings.pageColor": "Paginakleur:",
    "button.applySize": "Formaat Toepassen",
    "decoration.backgroundTheme": "Achtergrondthema:",
    "decoration.none": "Geen",
    "none": "Geen",
    "decoration.backgroundOpacity": "Achtergronddekking:",
    "decoration.borderTheme": "Kaderthema:",
    "decoration.borderOpacity": "Randdekking:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Inhoud:",
    "text.placeholder": "Hallo!",
    "button.addText": "Tekst Toevoegen",
    "text.color": "Kleur:",
    "text.size": "Grootte:",
    "text.font": "Lettertype:",
    "text.outlineColor": "Omlijningskleur:",
    "text.outlineWidth": "Omlijningsdikte (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Aantal Puzzels (1–10):",
    "config.difficulty": "Moeilijkheidsgraad (Aantal Hints)",
    "difficulty.noClues": "Geen hints",
    "difficulty.easy": "Makkelijk (1/2)",
    "difficulty.normal": "Normaal (1/4)",
    "difficulty.tough": "Moeilijk (1/6)",
    "config.excludeLetters": "Letters Uitsluiten van Hints:",
    "config.excludePlaceholder": "bijv. AEIOU",
    "config.letterCase": "Letterkeuze",
    "case.uppercase": "Hoofdletters",
    "case.lowercase": "Kleine letters",
    "config.includeNameDate": "Naam en Datum Toevoegen",
    "config.includeExerciseNumbers": "Oefeningen Nummeren",

    // ===== 7. IMAGE LIBRARY (12 items) =====
    "library.selectTheme": "Selecteer Thema:",
    "library.allThemes": "Alle Thema's",
    "library.search": "Zoek Afbeeldingen:",
    "library.searchPlaceholder": "bijv. appel, auto",
    "library.availableImages": "Beschikbare Afbeeldingen:",
    "library.selectedImages": "Geselecteerde Afbeeldingen voor Puzzels:",
    "library.selectUpload": "Selecteer afbeeldingen om te uploaden:",
    "library.chooseFiles": "Bestanden kiezen",
    "library.noFileChosen": "Geen bestand gekozen",
    "library.filesSelected": "{x} bestand(en) geselecteerd",
    "library.uploadedImages": "Jouw Geüploade Afbeeldingen (Deze Sessie):",
    "library.selectedCount": "Geselecteerd: {x} / {y}",

    // Handmatige bewerking van afbeeldingsnamen
    "manualImageEdit": "Handmatige bewerking van afbeeldingsnamen",
    "enableManualEdit": "Afbeeldingsnamen bewerken voor maken",
    "manualEditDescription": "Wanneer ingeschakeld, kun je handmatig afbeeldingen selecteren en hun namen hieronder bewerken voordat je de oefening maakt.",
    "selectAndEditImages": "Afbeeldingen selecteren en bewerken",
    "manualEditInstructions": "Klik om afbeeldingen toe te voegen, bewerk dan de namen hieronder:",
    "clickImagesToAddThem": "Klik op afbeeldingen in de bibliotheek om ze hier toe te voegen en te bewerken.",

    // Aangepaste woordenlijst
    "customWordList": "Aangepaste woordenlijst",
    "useCustomWords": "Aangepaste woordenlijst gebruiken",
    "customWordListDescription": "Wanneer ingeschakeld, maak alleen-tekst oefeningen met je aangepaste woordenlijst (geen afbeeldingen).",
    "enterWords": "Voer woorden in (één per regel, max. 8):",
    "customWordsPlaceholder": "appel\nbanaan\nsinaasappel\ndruif",
    "customWordListNote": "Alleen letters zijn toegestaan. Speciale tekens en cijfers worden verwijderd.",
    "customWordListEnabled": "Aangepaste woordenlijst modus ingeschakeld. De oefening bevat alleen tekst.",
    "customWordListEmpty": "Voer minstens één woord in de aangepaste woordenlijst in.",
    "customWordListTruncated": "{count} woord(en) uit je lijst gebruikt. Voeg meer woorden toe voor meer oefeningen.",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Lagen",
    "toolbar.bringForward": "Naar Voren",
    "toolbar.sendBackward": "Naar Achteren",
    "toolbar.align": "Uitlijnen",
    "toolbar.alignLeft": "Links Uitlijnen",
    "toolbar.centerH": "Horizontaal Centreren",
    "toolbar.alignRight": "Rechts Uitlijnen",
    "toolbar.alignTop": "Boven Uitlijnen",
    "toolbar.centerV": "Verticaal Centreren",
    "toolbar.alignBottom": "Onder Uitlijnen",
    "toolbar.centerPageH": "Op Pagina Horizontaal Centreren",
    "toolbar.centerPageV": "Op Pagina Verticaal Centreren",
    "lockUnlock": "Vergrendelen/Ontgrendelen",
    "unlockAll": "Alles ontgrendelen",
    "toolbar.delete": "Selectie Verwijderen",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Maken",
    "button.generateWorksheet": "Werkblad Maken",
    "button.generateAnswer": "Antwoordblad Maken",
    "button.download": "Downloaden",
    "button.worksheetJpeg": "Werkblad (JPEG)",
    "button.answerJpeg": "Antwoordblad (JPEG)",
    "button.worksheetPdf": "Werkblad (PDF)",
    "button.answerPdf": "Antwoordblad (PDF)",
    "settings.grayscale": "Grijswaarden",
    "button.clearAll": "Alles Wissen",

    // ===== ZOOM & HISTORY CONTROLS (5 items) =====
    "zoomIn": "Inzoomen",
    "zoomOut": "Uitzoomen",
    "zoomReset": "Zoom terugzetten",
    "undo": "Ongedaan Maken",
    "redo": "Opnieuw",

    // ===== LAYER CONTROLS (4 items) =====
    "bringForward": "Naar Voren",
    "bringToFront": "Helemaal Naar Voren",
    "sendBackward": "Naar Achteren",
    "sendToBack": "Helemaal Naar Achteren",

    // ===== NON-PREFIXED ACTION KEYS (12 items) =====
    "answerKey": "Antwoordblad",
    "answerKeyJpeg": "Antwoordblad (JPEG)",
    "answerKeyPdf": "Antwoordblad (PDF)",
    "clearAll": "Alles Wissen",
    "download": "Downloaden",
    "generate": "Maken",
    "grayscale": "Grijswaarden",
    "newWorksheet": "Nieuw Werkblad",
    "worksheet": "Werkblad",
    "worksheetJpeg": "Werkblad (JPEG)",
    "worksheetPdf": "Werkblad (PDF)",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Werkblad",
    "tab.answerKey": "Antwoordblad",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} eigen afbeelding(en) beschikbaar.",
    "message.generatingWorksheet": "Werkblad wordt aangemaakt...",
    "message.worksheetGenerated": "Werkblad succesvol aangemaakt!",
    "message.generatingAnswer": "Antwoordblad wordt aangemaakt...",
    "message.answerGenerated": "Antwoordblad gemaakt!",
    "message.assetAdded": "{type} toegevoegd.",
    "message.formCleared": "Formulier gewist.",
    "message.downloadStarted": "Download gestart!",
    "message.pdfDownloaded": "PDF gedownload!",
    "message.pdfSuccess": "PDF gedownload!",
    "message.jpegDownloaded": "JPEG download gestart!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Kon thema's niet laden.",
    "message.maxImages": "Je kunt maximaal {count} afbeeldingen selecteren.",
    "message.selectImages": "Selecteer enkele afbeeldingen of kies een thema met afbeeldingen.",
    "message.generateFirst": "Maak eerst een werkblad aan.",
    "message.cannotDownloadEmpty": "Kan leeg bestand niet downloaden: {fileName}.",
    "message.imageError": "Fout bij het voorbereiden van de afbeelding: {error}",
    "message.generateContent": "Maak eerst de inhoud.",
    "message.pdfError": "Fout bij het maken van de PDF.",
    "message.generateWorksheet": "Maak eerst een werkblad aan.",
    "message.jpegError": "Fout bij het voorbereiden van de JPEG.",
    "message.pdfCreateError": "Fout bij het maken van de PDF: {error}",
    "message.imagesError": "Fout bij het laden van afbeeldingen.",
    "message.borderError": "Fout bij het laden van kaders.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Alle Thema's (gebruikt vertalingen)",
    "message.loading": "Laden...",
    "message.typeToSearch": "Typ om te zoeken in alle afbeeldingen.",
    "message.noImages": "Geen afbeeldingen gevonden {query}.",
    "message.uploadedHere": "Jouw geüploade afbeeldingen verschijnen hier.",
    "message.preparing": "Voorbereiden {format}...",
    "message.preparingPdf": "PDF voorbereiden...",
    "message.preparingJpeg": "JPEG voorbereiden...",
    "decoration.allBorders": "Alle Kaders",
    "message.selectBorderTheme": "Selecteer een thema om kaders te zien.",
    "message.loadingBorders": "{theme}-kaders laden...",
    "message.noBorders": "Geen kaders gevonden.",
    "decoration.allBackgrounds": "Alle Achtergronden",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Naam: ________________",
    "form.dateField": "Datum: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "GRATIS VERSIE - LessonCraftStudio.com",
    "watermark.freeShort": "GRATIS VERSIE"
  },

  sv: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Bildgåtor Generator",
    "settings.title": "Bildgåtor Inställningar",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Språkinställningar",
    "settings.pageSetup": "Sidformat",
    "settings.textTools": "Textalternativ",
    "settings.exerciseConfig": "Övningsinställningar",
    "library.title": "Bildsamling",
    "library.uploadTitle": "Ladda Upp Egna Bilder",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "settings.languageLabel": "Språk:",
    "lang.en": "English (Engelska)",
    "lang.de": "Deutsch (Tyska)",
    "lang.fr": "Français (Franska)",
    "lang.es": "Español (Spanska)",
    "lang.pt": "Português (Portugisiska)",
    "lang.it": "Italiano (Italienska)",
    "lang.nl": "Nederlands (Nederländska)",
    "lang.sv": "Svenska",
    "lang.da": "Dansk (Danska)",
    "lang.no": "Norsk (Norska)",
    "word.guess.language.description": "Väljer innehållsspråk. Gränssnittsspråket styrs av huvudspråkväljaren i sidhuvudet.",
    "lang.fi": "Suomi (Finska)",

    // ===== 4. PAGE SETUP (16 items) =====
    "settings.pageSize": "Sidstorlek:",
    "pageSize.letterPortrait": "Letter Stående (612×792)",
    "pageSize.letterLandscape": "Letter Liggande (792×612)",
    "pageSize.a4Portrait": "A4 Stående (595×842)",
    "pageSize.a4Landscape": "A4 Liggande (842×595)",
    "pageSize.square": "Kvadrat (1200×1200)",
    "pageSize.custom": "Anpassad",
    "settings.width": "Bredd (px):",
    "settings.height": "Höjd (px):",
    "settings.pageColor": "Sidfärg:",
    "button.applySize": "Tillämpa Storlek",
    "decoration.backgroundTheme": "Bakgrundstema:",
    "decoration.none": "Ingen",
    "none": "Ingen",
    "decoration.backgroundOpacity": "Bakgrundens genomskinlighet:", // Fixed: Platform standard (2025-11-30)
    "decoration.borderTheme": "Ramtema:",
    "decoration.borderOpacity": "Ramens genomskinlighet:", // Fixed: Platform standard (2025-11-30)

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Innehåll:",
    "text.placeholder": "Hej!",
    "button.addText": "Lägg Till Text",
    "text.color": "Färg:",
    "text.size": "Storlek:",
    "text.font": "Typsnitt:",
    "text.outlineColor": "Konturfärg:",
    "text.outlineWidth": "Konturtjocklek (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Antal Gåtor (1–10):",
    "config.difficulty": "Svårighetsgrad (Antal Ledtrådar)",
    "difficulty.noClues": "Inga ledtrådar",
    "difficulty.easy": "Lätt (1/2)",
    "difficulty.normal": "Normal (1/4)",
    "difficulty.tough": "Svår (1/6)",
    "config.excludeLetters": "Uteslut Bokstäver från Ledtrådar:",
    "config.excludePlaceholder": "t.ex. AEIOUÅÄÖ",
    "config.letterCase": "Bokstavstyp",
    "case.uppercase": "Versaler",
    "case.lowercase": "Gemener",
    "config.includeNameDate": "Inkludera Namn & Datum",
    "config.includeExerciseNumbers": "Numrera Övningarna",

    // ===== 7. IMAGE LIBRARY (12 items) =====
    "library.selectTheme": "Välj Tema:",
    "library.allThemes": "Alla Teman",
    "library.search": "Sök Bilder:",
    "library.searchPlaceholder": "t.ex. äpple, bil",
    "library.availableImages": "Tillgängliga Bilder:",
    "library.selectedImages": "Valda Bilder för Gåtor:",
    "library.selectUpload": "Välj bilder att ladda upp:",
    "library.chooseFiles": "Välj filer",
    "library.noFileChosen": "Ingen fil vald",
    "library.filesSelected": "{x} fil(er) valda",
    "library.uploadedImages": "Dina Uppladdade Bilder (Denna Session):",
    "library.selectedCount": "Valda: {x} / {y}",

    // Manuell redigering av bildnamn
    "manualImageEdit": "Manuell redigering av bildnamn",
    "enableManualEdit": "Redigera bildnamn före skapande",
    "manualEditDescription": "När den är aktiverad kan du manuellt välja bilder och redigera deras namn nedan innan du skapar övningen.",
    "selectAndEditImages": "Välj och redigera bilder",
    "manualEditInstructions": "Klicka för att lägga till bilder, redigera sedan namnen nedan:",
    "clickImagesToAddThem": "Klicka på bilder från biblioteket för att lägga till dem här och redigera dem.",

    // Anpassad ordlista
    "customWordList": "Anpassad ordlista",
    "useCustomWords": "Använd anpassad ordlista",
    "customWordListDescription": "När den är aktiverad, skapa endast textövningar med din anpassade ordlista (inga bilder).",
    "enterWords": "Ange ord (ett per rad, max 8):",
    "customWordsPlaceholder": "äpple\nbanan\napelsin\ndruvа",
    "customWordListNote": "Endast bokstäver är tillåtna. Specialtecken och siffror kommer att tas bort.",
    "customWordListEnabled": "Anpassat ordlisteläge aktiverat. Övningen kommer endast att vara text.",
    "customWordListEmpty": "Vänligen ange minst ett ord i den anpassade ordlistan.",
    "customWordListTruncated": "Använder {count} ord från din lista. Lägg till fler ord för fler övningar.",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Lager",
    "toolbar.bringForward": "Flytta Framåt",
    "toolbar.sendBackward": "Flytta Bakåt",
    "toolbar.align": "Justera",
    "toolbar.alignLeft": "Vänsterjustera",
    "toolbar.centerH": "Centrera Horisontellt",
    "toolbar.alignRight": "Högerjustera",
    "toolbar.alignTop": "Justera Uppåt",
    "toolbar.centerV": "Centrera Vertikalt",
    "toolbar.alignBottom": "Justera Nedåt",
    "toolbar.centerPageH": "Centrera på Sidan Horisontellt",
    "toolbar.centerPageV": "Centrera på Sidan Vertikalt",
    "lockUnlock": "Lås/Lås upp",
    "unlockAll": "Lås upp alla",
    "toolbar.delete": "Ta Bort Markering",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Skapa",
    "button.generateWorksheet": "Skapa Övningsblad",
    "button.generateAnswer": "Skapa Facit",
    "button.download": "Ladda Ner",
    "button.worksheetJpeg": "Övningsblad (JPEG)",
    "button.answerJpeg": "Facit (JPEG)",
    "button.worksheetPdf": "Övningsblad (PDF)",
    "button.answerPdf": "Facit (PDF)",
    "settings.grayscale": "Gråskala",
    "button.clearAll": "Rensa Allt",

    // ===== ZOOM & HISTORY CONTROLS (5 items) =====
    "zoomIn": "Zooma In",
    "zoomOut": "Zooma Ut",
    "zoomReset": "Återställ Zoom",
    "undo": "Ångra",
    "redo": "Gör Om",

    // ===== LAYER CONTROLS (4 items) =====
    "bringForward": "Flytta Framåt",
    "bringToFront": "Flytta Längst Fram",
    "sendBackward": "Flytta Bakåt",
    "sendToBack": "Flytta Längst Bak",

    // ===== NON-PREFIXED ACTION KEYS (12 items) =====
    "answerKey": "Facit",
    "answerKeyJpeg": "Facit (JPEG)",
    "answerKeyPdf": "Facit (PDF)",
    "clearAll": "Rensa Allt",
    "download": "Ladda Ner",
    "generate": "Skapa",
    "grayscale": "Gråskala",
    "newWorksheet": "Nytt Övningsblad",
    "worksheet": "Övningsblad",
    "worksheetJpeg": "Övningsblad (JPEG)",
    "worksheetPdf": "Övningsblad (PDF)",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Övningsblad",
    "tab.answerKey": "Facit",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} egen/egna bild(er) tillgänglig(a).",
    "message.generatingWorksheet": "Skapar övningsblad...",
    "message.worksheetGenerated": "Övningsblad skapat!",
    "message.generatingAnswer": "Skapar facit...",
    "message.answerGenerated": "Facit skapat!",
    "message.assetAdded": "{type} tillagd.",
    "message.formCleared": "Formulär rensat.",
    "message.downloadStarted": "Nedladdning startad!",
    "message.pdfDownloaded": "PDF nedladdad!",
    "message.pdfSuccess": "PDF nedladdad!",
    "message.jpegDownloaded": "JPEG-nedladdning startad!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Kunde inte ladda teman.",
    "message.maxImages": "Du kan välja max {count} bilder.",
    "message.selectImages": "Välj några bilder eller välj ett tema med bilder.",
    "message.generateFirst": "Skapa ett övningsblad först.",
    "message.cannotDownloadEmpty": "Kan inte ladda ner tom fil: {fileName}.",
    "message.imageError": "Fel vid förberedelse av bild: {error}",
    "message.generateContent": "Skapa innehållet först.",
    "message.pdfError": "Fel vid skapande av PDF.",
    "message.generateWorksheet": "Skapa ett övningsblad först.",
    "message.jpegError": "Fel vid förberedelse av JPEG.",
    "message.pdfCreateError": "Fel vid skapande av PDF: {error}",
    "message.imagesError": "Fel vid laddning av bilder.",
    "message.borderError": "Fel vid laddning av ramar.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Alla Teman (använder översättningar)",
    "message.loading": "Laddar...",
    "message.typeToSearch": "Skriv för att söka bland alla bilder.",
    "message.noImages": "Inga bilder hittades {query}.",
    "message.uploadedHere": "Dina uppladdade bilder visas här.",
    "message.preparing": "Förbereder {format}...",
    "message.preparingPdf": "Förbereder PDF...",
    "message.preparingJpeg": "Förbereder JPEG...",
    "decoration.allBorders": "Alla Ramar",
    "message.selectBorderTheme": "Välj ett tema för att se ramar.",
    "message.loadingBorders": "Laddar ramar från {theme}...",
    "message.noBorders": "Inga ramar hittades.",
    "decoration.allBackgrounds": "Alla Bakgrunder",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Namn: ________________",
    "form.dateField": "Datum: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "GRATISVERSION - LessonCraftStudio.com",
    "watermark.freeShort": "GRATISVERSION"
  },

  da: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Ordgåder Generator",
    "settings.title": "Ordgåder Indstillinger",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Sprogindstillinger",
    "settings.pageSetup": "Sideopsætning",
    "settings.textTools": "Tekstværktøjer", // Fixed: Platform standard (2025-11-30)
    "settings.exerciseConfig": "Opgaveindstillinger",
    "library.title": "Billedbibliotek", // Fixed: Platform standard (2025-11-30)
    "library.uploadTitle": "Upload Dine Egne Billeder",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "settings.languageLabel": "Sprog:",
    "lang.en": "English (Engelsk)",
    "lang.de": "Deutsch (Tysk)",
    "lang.fr": "Français (Fransk)",
    "lang.es": "Español (Spansk)",
    "lang.pt": "Português (Portugisisk)",
    "lang.it": "Italiano (Italiensk)",
    "lang.nl": "Nederlands (Nederlandsk)", // Fixed: Platform standard (2025-11-30)
    "lang.sv": "Svenska (Svensk)",
    "lang.da": "Dansk",
    "lang.no": "Norsk",
    "word.guess.language.description": "Vælger indholdssprog. UI-sproget styres af hovedsprogvælgeren i overskriften.",
    "lang.fi": "Suomi (Finsk)",

    // ===== 4. PAGE SETUP (16 items) =====
    "settings.pageSize": "Sidestørrelse:",
    "pageSize.letterPortrait": "Letter Stående (612×792)",
    "pageSize.letterLandscape": "Letter Liggende (792×612)",
    "pageSize.a4Portrait": "A4 Stående (595×842)",
    "pageSize.a4Landscape": "A4 Liggende (842×595)",
    "pageSize.square": "Kvadratisk (1200×1200)",
    "pageSize.custom": "Brugerdefineret", // Fixed: Platform standard (2025-11-30)
    "settings.width": "Bredde (px):",
    "settings.height": "Højde (px):",
    "settings.pageColor": "Sidefarve:",
    "button.applySize": "Anvend Størrelse",
    "decoration.backgroundTheme": "Baggrundstema:",
    "decoration.none": "Ingen",
    "none": "Ingen",
    "decoration.backgroundOpacity": "Baggrundsgennemsigtighed:",
    "decoration.borderTheme": "Rammetema:",
    "decoration.borderOpacity": "Rammegennemsigtighed:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Indhold:",
    "text.placeholder": "Hej!",
    "button.addText": "Tilføj Tekst",
    "text.color": "Farve:",
    "text.size": "Størrelse:",
    "text.font": "Skrifttype:",
    "text.outlineColor": "Konturfarve:",
    "text.outlineWidth": "Konturtykkelse (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Antal Gåder (1–10):",
    "config.difficulty": "Sværhedsgrad (Antal Ledetråde)",
    "difficulty.noClues": "Ingen ledetråde",
    "difficulty.easy": "Let (1/2)",
    "difficulty.normal": "Normal (1/4)",
    "difficulty.tough": "Svær (1/6)",
    "config.excludeLetters": "Udeluk Bogstaver fra Ledetråde:",
    "config.excludePlaceholder": "f.eks. AEIOUÆØÅ",
    "config.letterCase": "Bogstavtype",
    "case.uppercase": "Store bogstaver",
    "case.lowercase": "Små bogstaver",
    "config.includeNameDate": "Inkluder Navn & Dato",
    "config.includeExerciseNumbers": "Nummerer Opgaverne",

    // ===== 7. IMAGE LIBRARY (12 items) =====
    "library.selectTheme": "Vælg Tema:",
    "library.allThemes": "Alle Temaer",
    "library.search": "Søg Billeder:",
    "library.searchPlaceholder": "f.eks. æble, bil",
    "library.availableImages": "Tilgængelige Billeder:",
    "library.selectedImages": "Valgte Billeder til Gåder:",
    "library.selectUpload": "Vælg billeder til upload:",
    "library.chooseFiles": "Vælg filer",
    "library.noFileChosen": "Ingen fil valgt",
    "library.filesSelected": "{x} fil(er) valgt",
    "library.uploadedImages": "Dine Uploadede Billeder (Denne Session):",
    "library.selectedCount": "Valgt: {x} / {y}",

    // Manuel redigering af billednavne
    "manualImageEdit": "Manuel redigering af billednavne",
    "enableManualEdit": "Rediger billednavne før oprettelse",
    "manualEditDescription": "Når den er aktiveret, kan du manuelt vælge billeder og redigere deres navne nedenfor, før du opretter opgaven.",
    "selectAndEditImages": "Vælg og rediger billeder",
    "manualEditInstructions": "Klik for at tilføje billeder, rediger derefter navnene nedenfor:",
    "clickImagesToAddThem": "Klik på billeder fra biblioteket for at tilføje dem her og redigere dem.",

    // Tilpasset ordliste
    "customWordList": "Tilpasset ordliste",
    "useCustomWords": "Brug tilpasset ordliste",
    "customWordListDescription": "Når den er aktiveret, opret opgaver med kun tekst ved hjælp af din tilpassede ordliste (ingen billeder).",
    "enterWords": "Indtast ord (ét pr. linje, maks. 8):",
    "customWordsPlaceholder": "æble\nbanan\napelsin\ndrue",
    "customWordListNote": "Kun bogstaver er tilladt. Specialtegn og tal vil blive fjernet.",
    "customWordListEnabled": "Tilpasset ordliste-tilstand aktiveret. Opgaven vil kun være tekst.",
    "customWordListEmpty": "Indtast venligst mindst ét ord i den tilpassede ordliste.",
    "customWordListTruncated": "Bruger {count} ord fra din liste. Tilføj flere ord for flere opgaver.",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Lag",
    "toolbar.bringForward": "Flyt Fremad",
    "toolbar.sendBackward": "Flyt Bagud",
    "toolbar.align": "Juster",
    "toolbar.alignLeft": "Venstrejuster",
    "toolbar.centerH": "Centrer Vandret",
    "toolbar.alignRight": "Højrejuster",
    "toolbar.alignTop": "Juster Øverst", // Fixed: Cross-app consistency with Alphabet-Train (2025-11-30)
    "toolbar.centerV": "Centrer Lodret",
    "toolbar.alignBottom": "Juster Nederst", // Fixed: Cross-app consistency with Alphabet-Train (2025-11-30)
    "toolbar.centerPageH": "Centrer på Siden Vandret",
    "toolbar.centerPageV": "Centrer på Siden Lodret",
    "lockUnlock": "Lås/Lås op",
    "unlockAll": "Lås alle op",
    "toolbar.delete": "Slet Markering",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Opret",
    "button.generateWorksheet": "Opret Opgaveark",
    "button.generateAnswer": "Opret Facitliste",
    "button.download": "Download",
    "button.worksheetJpeg": "Opgaveark (JPEG)",
    "button.answerJpeg": "Facitliste (JPEG)",
    "button.worksheetPdf": "Opgaveark (PDF)",
    "button.answerPdf": "Facitliste (PDF)",
    "settings.grayscale": "Gråtoner",
    "button.clearAll": "Ryd Alt",

    // ===== ZOOM & HISTORY CONTROLS (5 items) =====
    "zoomIn": "Zoom Ind",
    "zoomOut": "Zoom Ud",
    "zoomReset": "Nulstil Zoom",
    "undo": "Fortryd",
    "redo": "Gentag",

    // ===== LAYER CONTROLS (4 items) =====
    "bringForward": "Flyt Fremad",
    "bringToFront": "Bring til Forgrunden",
    "sendBackward": "Flyt Bagud",
    "sendToBack": "Send til Baggrunden",

    // ===== NON-PREFIXED ACTION KEYS (12 items) =====
    "answerKey": "Facitliste",
    "answerKeyJpeg": "Facitliste (JPEG)",
    "answerKeyPdf": "Facitliste (PDF)",
    "clearAll": "Ryd Alt",
    "download": "Download",
    "generate": "Opret",
    "grayscale": "Gråtoner",
    "newWorksheet": "Nyt Opgaveark",
    "worksheet": "Opgaveark",
    "worksheetJpeg": "Opgaveark (JPEG)",
    "worksheetPdf": "Opgaveark (PDF)",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Opgaveark",
    "tab.answerKey": "Facitliste",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} brugerdefiner(et/ede) billed(er) tilgængelig(e).",
    "message.generatingWorksheet": "Opretter opgaveark...",
    "message.worksheetGenerated": "Opgaveark oprettet!",
    "message.generatingAnswer": "Opretter facitliste...",
    "message.answerGenerated": "Facitliste oprettet!",
    "message.assetAdded": "{type} tilføjet.",
    "message.formCleared": "Formular ryddet.",
    "message.downloadStarted": "Download startet!",
    "message.pdfDownloaded": "PDF downloadet!",
    "message.pdfSuccess": "PDF downloadet!",
    "message.jpegDownloaded": "JPEG-download startet!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Kunne ikke indlæse temaer.",
    "message.maxImages": "Du kan vælge maksimalt {count} billeder.",
    "message.selectImages": "Vælg venligst nogle billeder eller vælg et tema med billeder.",
    "message.generateFirst": "Opret et opgaveark først.", // Fixed: Internal consistency with button.generate (2025-11-30)
    "message.cannotDownloadEmpty": "Kan ikke downloade tom fil: {fileName}.",
    "message.imageError": "Fejl ved forberedelse af billede: {error}",
    "message.generateContent": "Opret indholdet først.",
    "message.pdfError": "Fejl ved oprettelse af PDF.",
    "message.generateWorksheet": "Opret et opgaveark først.", // Fixed: Internal consistency with button.generate (2025-11-30)
    "message.jpegError": "Fejl ved forberedelse af JPEG.",
    "message.pdfCreateError": "Fejl ved oprettelse af PDF: {error}",
    "message.imagesError": "Fejl ved indlæsning af billeder.",
    "message.borderError": "Fejl ved indlæsning af rammer.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Alle Temaer (bruger oversættelser)",
    "message.loading": "Indlæser...",
    "message.typeToSearch": "Skriv for at søge i alle billeder.",
    "message.noImages": "Ingen billeder fundet {query}.",
    "message.uploadedHere": "Dine uploadede billeder vises her.",
    "message.preparing": "Forbereder {format}...",
    "message.preparingPdf": "Forbereder PDF...",
    "message.preparingJpeg": "Forbereder JPEG...",
    "decoration.allBorders": "Alle rammer",
    "message.selectBorderTheme": "Vælg et tema for at se rammer.",
    "message.loadingBorders": "Indlæser rammer fra {theme}...",
    "message.noBorders": "Ingen rammer fundet.",
    "decoration.allBackgrounds": "Alle Baggrunde",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Navn: ________________",
    "form.dateField": "Dato: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "GRATIS VERSION - LessonCraftStudio.com",
    "watermark.freeShort": "GRATIS VERSION"
  },

  no: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Bildegåter Generator",
    "settings.title": "Bildegåter Innstillinger",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Språkinnstillinger",
    "settings.pageSetup": "Sideoppsett",
    "settings.textTools": "Tekstinnstillinger",
    "settings.exerciseConfig": "Oppgaveinnstillinger",
    "library.title": "Bildesamling",
    "library.uploadTitle": "Last opp egne bilder",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "settings.languageLabel": "Språk:",
    "lang.en": "English (Engelsk)",
    "lang.de": "Deutsch (Tysk)",
    "lang.fr": "Français (Fransk)",
    "lang.es": "Español (Spansk)",
    "lang.pt": "Português (Portugisisk)",
    "lang.it": "Italiano (Italiensk)",
    "lang.nl": "Nederlands (Nederlandsk)",
    "lang.sv": "Svenska (Svensk)",
    "lang.da": "Dansk",
    "lang.no": "Norsk",
    "word.guess.language.description": "Velger innholdsspråk. UI-språket styres av hovedspråkvelgeren i overskriften.",
    "lang.fi": "Suomi (Finsk)",

    // ===== 4. PAGE SETUP (16 items) =====
    "settings.pageSize": "Sidestørrelse:",
    "pageSize.letterPortrait": "Letter Stående (612×792)",
    "pageSize.letterLandscape": "Letter Liggende (792×612)",
    "pageSize.a4Portrait": "A4 Stående (595×842)",
    "pageSize.a4Landscape": "A4 Liggende (842×595)",
    "pageSize.square": "Kvadratisk (1200×1200)",
    "pageSize.custom": "Egendefinert",
    "settings.width": "Bredde (px):",
    "settings.height": "Høyde (px):",
    "settings.pageColor": "Sidefarge:",
    "button.applySize": "Bruk størrelse",
    "decoration.backgroundTheme": "Bakgrunnstema:",
    "decoration.none": "Ingen",
    "none": "Ingen",
    "decoration.backgroundOpacity": "Bakgrunnssynlighet:",
    "decoration.borderTheme": "Rammetema:",
    "decoration.borderOpacity": "Rammesynlighet:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Innhold:",
    "text.placeholder": "Hei!",
    "button.addText": "Legg til tekst",
    "text.color": "Farge:",
    "text.size": "Størrelse:",
    "text.font": "Skrifttype:",
    "text.outlineColor": "Omrissfarge:",
    "text.outlineWidth": "Omrisstykkelse (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Antall Gåter (1–10):",
    "config.difficulty": "Vanskelighetsgrad (Antall Hint)",
    "difficulty.noClues": "Ingen hint",
    "difficulty.easy": "Lett (1/2)",
    "difficulty.normal": "Normal (1/4)",
    "difficulty.tough": "Vanskelig (1/6)",
    "config.excludeLetters": "Utelukk bokstaver fra hint:",
    "config.excludePlaceholder": "f.eks. AEIOUÆØÅ",
    "config.letterCase": "Bokstavtype",
    "case.uppercase": "Store bokstaver",
    "case.lowercase": "Små bokstaver",
    "config.includeNameDate": "Ta med navn & dato",
    "config.includeExerciseNumbers": "Nummerer oppgavene",

    // ===== 7. IMAGE LIBRARY (12 items) =====
    "library.selectTheme": "Velg tema:",
    "library.allThemes": "Alle temaer",
    "library.search": "Søk bilder:",
    "library.searchPlaceholder": "f.eks. eple, bil",
    "library.availableImages": "Tilgjengelige bilder:",
    "library.selectedImages": "Valgte bilder for gåter:",
    "library.selectUpload": "Velg bilder for opplasting:",
    "library.chooseFiles": "Velg filer",
    "library.noFileChosen": "Ingen fil valgt",
    "library.filesSelected": "{x} fil(er) valgt",
    "library.uploadedImages": "Dine Opplastede Bilder (Denne Økten):",
    "library.selectedCount": "Valgt: {x} / {y}",

    // Manuell redigering av bildenavn
    "manualImageEdit": "Manuell redigering av bildenavn",
    "enableManualEdit": "Rediger bildenavn før opprettelse",
    "manualEditDescription": "Når den er aktivert, kan du manuelt velge bilder og redigere navnene deres nedenfor før du oppretter oppgaven.",
    "selectAndEditImages": "Velg og rediger bilder",
    "manualEditInstructions": "Klikk for å legge til bilder, rediger deretter navnene nedenfor:",
    "clickImagesToAddThem": "Klikk på bilder fra biblioteket for å legge dem til her og redigere dem.",

    // Tilpasset ordliste
    "customWordList": "Tilpasset ordliste",
    "useCustomWords": "Bruk tilpasset ordliste",
    "customWordListDescription": "Når den er aktivert, opprett oppgaver med kun tekst ved hjelp av din tilpassede ordliste (ingen bilder).",
    "enterWords": "Skriv inn ord (ett per linje, maks. 8):",
    "customWordsPlaceholder": "eple\nbanan\nappelsin\ndrue",
    "customWordListNote": "Kun bokstaver er tillatt. Spesialtegn og tall vil bli fjernet.",
    "customWordListEnabled": "Tilpasset ordliste-modus aktivert. Oppgaven vil kun være tekst.",
    "customWordListEmpty": "Vennligst skriv inn minst ett ord i den tilpassede ordlisten.",
    "customWordListTruncated": "Bruker {count} ord fra listen din. Legg til flere ord for flere oppgaver.",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Lag",
    "toolbar.bringForward": "Flytt fremover",
    "toolbar.sendBackward": "Flytt bakover",
    "toolbar.align": "Juster",
    "toolbar.alignLeft": "Venstrejuster",
    "toolbar.centerH": "Sentrer horisontalt",
    "toolbar.alignRight": "Høyrejuster",
    "toolbar.alignTop": "Juster øverst",
    "toolbar.centerV": "Sentrer vertikalt",
    "toolbar.alignBottom": "Juster nederst",
    "toolbar.centerPageH": "Sentrer på siden horisontalt",
    "toolbar.centerPageV": "Sentrer på siden vertikalt",
    "lockUnlock": "Lås/Lås opp",
    "unlockAll": "Lås opp alle",
    "toolbar.delete": "Slett markering",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Lag",
    "button.generateWorksheet": "Lag oppgaveark",
    "button.generateAnswer": "Lag fasit",
    "button.download": "Last ned",
    "button.worksheetJpeg": "Oppgaveark (JPEG)",
    "button.answerJpeg": "Fasit (JPEG)",
    "button.worksheetPdf": "Oppgaveark (PDF)",
    "button.answerPdf": "Fasit (PDF)",
    "settings.grayscale": "Gråtoner",
    "button.clearAll": "Tøm alt",

    // ===== ZOOM & HISTORY CONTROLS (5 items) =====
    "zoomIn": "Zoom inn",
    "zoomOut": "Zoom ut",
    "zoomReset": "Tilbakestill zoom",
    "undo": "Angre",
    "redo": "Gjør om",

    // ===== LAYER CONTROLS (4 items) =====
    "bringForward": "Flytt fremover",
    "bringToFront": "Flytt til front",
    "sendBackward": "Flytt bakover",
    "sendToBack": "Flytt til bakgrunn",

    // ===== NON-PREFIXED ACTION KEYS (12 items) =====
    "answerKey": "Fasit",
    "answerKeyJpeg": "Fasit (JPEG)",
    "answerKeyPdf": "Fasit (PDF)",
    "clearAll": "Tøm alt",
    "download": "Last ned",
    "generate": "Lag",
    "grayscale": "Gråtoner",
    "newWorksheet": "Nytt oppgaveark",
    "worksheet": "Oppgaveark",
    "worksheetJpeg": "Oppgaveark (JPEG)",
    "worksheetPdf": "Oppgaveark (PDF)",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Oppgaveark",
    "tab.answerKey": "Fasit",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} egendefinert(e) bilde(r) tilgjengelig(e).",
    "message.generatingWorksheet": "Lager oppgaveark...",
    "message.worksheetGenerated": "Oppgaveark laget!",
    "message.generatingAnswer": "Lager fasit...",
    "message.answerGenerated": "Fasit laget!",
    "message.assetAdded": "{type} lagt til.",
    "message.formCleared": "Skjema tømt.",
    "message.downloadStarted": "Nedlasting startet!",
    "message.pdfDownloaded": "PDF lastet ned!",
    "message.pdfSuccess": "PDF lastet ned!",
    "message.jpegDownloaded": "JPEG-nedlasting startet!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Kunne ikke laste inn temaer.",
    "message.maxImages": "Du kan velge maksimalt {count} bilder.",
    "message.selectImages": "Vennligst velg noen bilder eller velg et tema med bilder.",
    "message.generateFirst": "Lag et oppgaveark først.",
    "message.cannotDownloadEmpty": "Kan ikke laste ned tom fil: {fileName}.",
    "message.imageError": "Feil ved klargjøring av bilde: {error}",
    "message.generateContent": "Lag innholdet først.",
    "message.pdfError": "Feil ved laging av PDF.",
    "message.generateWorksheet": "Lag et oppgaveark først.",
    "message.jpegError": "Feil ved klargjøring av JPEG.",
    "message.pdfCreateError": "Feil ved laging av PDF: {error}",
    "message.imagesError": "Feil ved lasting av bilder.",
    "message.borderError": "Feil ved lasting av rammer.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Alle Temaer (bruker oversettelser)",
    "message.loading": "Laster inn...",
    "message.typeToSearch": "Skriv for å søke blant alle bilder.",
    "message.noImages": "Ingen bilder funnet {query}.",
    "message.uploadedHere": "Dine opplastede bilder vises her.",
    "message.preparing": "Klargjør {format}...",
    "message.preparingPdf": "Klargjør PDF...",
    "message.preparingJpeg": "Klargjør JPEG...",
    "decoration.allBorders": "Alle rammer",
    "message.selectBorderTheme": "Velg et tema for å se rammer.",
    "message.loadingBorders": "Laster rammer fra {theme}...",
    "message.noBorders": "Ingen rammer funnet.",
    "decoration.allBackgrounds": "Alle bakgrunner",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Navn: ________________",
    "form.dateField": "Dato: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "GRATIS VERSJON - LessonCraftStudio.com",
    "watermark.freeShort": "GRATIS VERSJON"
  },

  fi: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Sana-arvoitusten Luoja",
    "settings.title": "Sana-arvoitusten Asetukset",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Kieliasetukset",
    "settings.pageSetup": "Sivun Asetukset",
    "settings.textTools": "Tekstityökalut",
    "settings.exerciseConfig": "Tehtävän Asetukset",
    "library.title": "Kuvakirjasto",
    "library.uploadTitle": "Lataa Omia Kuvia",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "settings.languageLabel": "Kieli:",
    "lang.en": "English (Englanti)",
    "lang.de": "Deutsch (Saksa)",
    "lang.fr": "Français (Ranska)",
    "lang.es": "Español (Espanja)",
    "lang.pt": "Português (Portugali)",
    "lang.it": "Italiano (Italia)",
    "lang.nl": "Nederlands (Hollanti)",
    "lang.sv": "Svenska (Ruotsi)",
    "lang.da": "Dansk (Tanska)",
    "lang.no": "Norsk (Norja)",
    "word.guess.language.description": "Valitsee sisällön kielen. Käyttöliittymän kieli ohjataan pääkielivalitsimella otsikossa.",
    "lang.fi": "Suomi",

    // ===== 4. PAGE SETUP (16 items) =====
    "settings.pageSize": "Sivukoko:",
    "pageSize.letterPortrait": "Letter Pysty (612×792)",
    "pageSize.letterLandscape": "Letter Vaaka (792×612)",
    "pageSize.a4Portrait": "A4 Pysty (595×842)",
    "pageSize.a4Landscape": "A4 Vaaka (842×595)",
    "pageSize.square": "Neliö (1200×1200)",
    "pageSize.custom": "Mukautettu",
    "settings.width": "Leveys (px):",
    "settings.height": "Korkeus (px):",
    "settings.pageColor": "Sivun Väri:",
    "button.applySize": "Käytä Kokoa",
    "decoration.backgroundTheme": "Taustateema:",
    "decoration.none": "Ei mitään",
    "none": "Ei mitään",
    "decoration.backgroundOpacity": "Taustan läpinäkyvyys:",
    "decoration.borderTheme": "Reunusteema:",
    "decoration.borderOpacity": "Reunuksen läpinäkyvyys:",

    // ===== 5. TEXT TOOLS (8 items) =====
    "text.content": "Sisältö:",
    "text.placeholder": "Hei!",
    "button.addText": "Lisää Teksti",
    "text.color": "Väri:",
    "text.size": "Koko:",
    "text.font": "Fontti:",
    "text.outlineColor": "Ääriviivan Väri:",
    "text.outlineWidth": "Ääriviivan Paksuus (0-10):",

    // ===== 6. EXERCISE CONFIGURATION (13 items) =====
    "config.puzzleCount": "Arvoitusten Määrä (1–10):",
    "config.difficulty": "Vaikeustaso (Vihjeiden Määrä)",
    "difficulty.noClues": "Ei vihjeitä",
    "difficulty.easy": "Helppo (1/2)",
    "difficulty.normal": "Normaali (1/4)",
    "difficulty.tough": "Vaikea (1/6)",
    "config.excludeLetters": "Jätä Kirjaimet Pois Vihjeistä:",
    "config.excludePlaceholder": "esim. AEIOUÄÖY",
    "config.letterCase": "Kirjaintyyppi",
    "case.uppercase": "Isot kirjaimet",
    "case.lowercase": "Pienet kirjaimet",
    "config.includeNameDate": "Lisää Nimi & Päivämäärä",
    "config.includeExerciseNumbers": "Numeroi Tehtävät",

    // ===== 7. IMAGE LIBRARY (12 items) =====
    "library.selectTheme": "Valitse Teema:",
    "library.allThemes": "Kaikki Teemat",
    "library.search": "Hae Kuvia:",
    "library.searchPlaceholder": "esim. omena, auto",
    "library.availableImages": "Saatavilla Olevat Kuvat:",
    "library.selectedImages": "Valitut Kuvat Arvoituksiin:",
    "library.selectUpload": "Valitse ladattavat kuvat:",
    "library.chooseFiles": "Valitse tiedostot",
    "library.noFileChosen": "Ei valittua tiedostoa",
    "library.filesSelected": "{x} tiedosto(a) valittu",
    "library.uploadedImages": "Lataamasi Kuvat (Tämä Istunto):",
    "library.selectedCount": "Valittu: {x} / {y}",

    // Kuvien nimien manuaalinen muokkaus
    "manualImageEdit": "Kuvien nimien manuaalinen muokkaus",
    "enableManualEdit": "Muokkaa kuvien nimiä ennen luomista",
    "manualEditDescription": "Kun tämä on käytössä, voit valita kuvat manuaalisesti ja muokata niiden nimiä alla ennen tehtävän luomista.",
    "selectAndEditImages": "Valitse ja muokkaa kuvia",
    "manualEditInstructions": "Napsauta lisätäksesi kuvia, muokkaa sitten nimiä alla:",
    "clickImagesToAddThem": "Napsauta kirjaston kuvia lisätäksesi ne tähän ja muokataksesi niitä.",

    // Mukautettu sanalista
    "customWordList": "Mukautettu sanalista",
    "useCustomWords": "Käytä mukautettua sanalistaa",
    "customWordListDescription": "Kun tämä on käytössä, luo vain tekstistä koostuvia tehtäviä käyttäen mukautettua sanalistaasi (ei kuvia).",
    "enterWords": "Kirjoita sanat (yksi per rivi, enintään 8):",
    "customWordsPlaceholder": "omena\nbanaani\nappelsiini\nrypäle",
    "customWordListNote": "Vain kirjaimet ovat sallittuja. Erikoismerkit ja numerot poistetaan.",
    "customWordListEnabled": "Mukautettu sanalista -tila käytössä. Tehtävä on vain tekstiä.",
    "customWordListEmpty": "Ole hyvä ja kirjoita vähintään yksi sana mukautettuun sanalistaan.",
    "customWordListTruncated": "Käytetään {count} sanaa listaltasi. Lisää sanoja saadaksesi lisää tehtäviä.",

    // ===== 8. TOOLBAR (13 items) =====
    "toolbar.layers": "Tasot",
    "toolbar.bringForward": "Siirrä Eteenpäin",
    "toolbar.sendBackward": "Siirrä Taaksepäin",
    "toolbar.align": "Tasaa",
    "toolbar.alignLeft": "Tasaa Vasemmalle",
    "toolbar.centerH": "Keskitä Vaakasuunnassa",
    "toolbar.alignRight": "Tasaa Oikealle",
    "toolbar.alignTop": "Tasaa Ylös",
    "toolbar.centerV": "Keskitä Pystysuunnassa",
    "toolbar.alignBottom": "Tasaa Alas",
    "toolbar.centerPageH": "Keskitä Sivulle Vaakasuunnassa",
    "toolbar.centerPageV": "Keskitä Sivulle Pystysuunnassa",
    "lockUnlock": "Lukitse/Avaa",
    "unlockAll": "Avaa kaikki",
    "toolbar.delete": "Poista Valinta",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Luo",
    "button.generateWorksheet": "Luo Tehtävämoniste",
    "button.generateAnswer": "Luo Vastaukset",
    "button.download": "Lataa",
    "button.worksheetJpeg": "Tehtävämoniste (JPEG)",
    "button.answerJpeg": "Vastaukset (JPEG)",
    "button.worksheetPdf": "Tehtävämoniste (PDF)",
    "button.answerPdf": "Vastaukset (PDF)",
    "settings.grayscale": "Harmaasävy",
    "button.clearAll": "Tyhjennä Kaikki",

    // ===== ZOOM & HISTORY CONTROLS (5 items) =====
    "zoomIn": "Lähennä",
    "zoomOut": "Loitonna",
    "zoomReset": "Palauta Zoom",
    "undo": "Kumoa",
    "redo": "Tee Uudelleen",

    // ===== LAYER CONTROLS (4 items) =====
    "bringForward": "Siirrä Eteenpäin",
    "bringToFront": "Tuo Etualalle",
    "sendBackward": "Siirrä Taaksepäin",
    "sendToBack": "Vie Taustalle",

    // ===== NON-PREFIXED ACTION KEYS (12 items) =====
    "answerKey": "Vastaukset",
    "answerKeyJpeg": "Vastaukset (JPEG)",
    "answerKeyPdf": "Vastaukset (PDF)",
    "clearAll": "Tyhjennä Kaikki",
    "download": "Lataa",
    "generate": "Luo",
    "grayscale": "Harmaasävy",
    "newWorksheet": "Uusi Tehtävämoniste",
    "worksheet": "Tehtävämoniste",
    "worksheetJpeg": "Tehtävämoniste (JPEG)",
    "worksheetPdf": "Tehtävämoniste (PDF)",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Tehtävämoniste",
    "tab.answerKey": "Vastaukset",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.customImagesAvailable": "{count} omaa kuvaa käytettävissä.",
    "message.creatingWorksheet": "Luodaan tehtävämonistetta...",
    "message.worksheetGenerated": "Tehtävämoniste luotu!",
    "message.creatingAnswer": "Luodaan vastauksia...",
    "message.answerGenerated": "Vastaukset luotu!",
    "message.assetAdded": "{type} lisätty.",
    "message.formCleared": "Lomake tyhjennetty.",
    "message.downloadStarted": "Lataus aloitettu!",
    "message.pdfDownloaded": "PDF ladattu!",
    "message.pdfSuccess": "PDF ladattu!",
    "message.jpegDownloaded": "JPEG-lataus aloitettu!",

    // ===== 12. ERROR MESSAGES (13 items) =====
    "message.themesLoadError": "Teemoja ei voitu ladata.",
    "message.maxImages": "Voit valita enintään {count} kuvaa.",
    "message.selectImages": "Valitse kuvia tai valitse teema, jossa on kuvia.",
    "message.generateFirst": "Luo ensin tehtävämoniste.",
    "message.cannotDownloadEmpty": "Tyhjää tiedostoa ei voi ladata: {fileName}.",
    "message.imageError": "Virhe kuvan valmistelussa: {error}",
    "message.generateContent": "Luo sisältö ensin.",
    "message.pdfError": "Virhe PDF:n luomisessa.",
    "message.generateWorksheet": "Luo ensin tehtävämoniste.",
    "message.jpegError": "Virhe JPEG:n valmistelussa.",
    "message.pdfCreateError": "Virhe PDF:n luomisessa: {error}",
    "message.imagesError": "Virhe kuvien lataamisessa.",
    "message.borderError": "Virhe reunusten lataamisessa.",

    // ===== 13. INFO/LOADING MESSAGES (12 items) =====
    "themes.all": "Kaikki Teemat (käyttää käännöksiä)",
    "message.loading": "Ladataan...",
    "message.typeToSearch": "Kirjoita hakeaksesi kaikista kuvista.",
    "message.noImages": "Kuvia ei löytynyt {query}.",
    "message.uploadedHere": "Lataamasi kuvat näkyvät täällä.",
    "message.preparing": "Valmistellaan {format}...",
    "message.preparingPdf": "Valmistellaan PDF:ää...",
    "message.preparingJpeg": "Valmistellaan JPEG:tä...",
    "decoration.allBorders": "Kaikki Reunukset",
    "message.selectBorderTheme": "Valitse teema nähdäksesi reunukset.",
    "message.loadingBorders": "Ladataan reunuksia teemasta {theme}...",
    "message.noBorders": "Reunuksia ei löytynyt.",
    "decoration.allBackgrounds": "Kaikki Taustat",

    // ===== 14. FORM FIELDS (2 items) =====
    "form.nameField": "Nimi: ________________",
    "form.dateField": "Päivämäärä: ________",

    // ===== 15. WATERMARKS (2 items) =====
    "watermark.free": "ILMAISVERSIO - LessonCraftStudio.com",
    "watermark.freeShort": "ILMAISVERSIO"
  }
};

// Make translations globally available for BulletproofLoader and other components
window.translations = translations;

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { translations };
}
