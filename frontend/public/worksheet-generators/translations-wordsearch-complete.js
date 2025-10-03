/**
 * PROFESSIONAL WORDSEARCH TRANSLATIONS - ALL LANGUAGES
 * =====================================================
 * Complete multi-language translation system for Wordsearch App
 * Created: December 2024
 * Languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI
 *
 * This file combines all professional translations for the wordsearch app
 * from the individual language files in translations/wordsearch/ folder
 */

// Define translation function if not already defined
if (typeof t === 'undefined') {
    window.t = function(key) {
        if (typeof translations === 'undefined') {
            console.warn('Translations not loaded, returning key:', key);
            return key;
        }
        const translation = (translations[window.currentLocale] && translations[window.currentLocale][key]) ||
                           (translations.en && translations.en[key]) ||
                           key;
        return translation;
    };
}

// Format translation with placeholders
if (typeof formatTranslation === 'undefined') {
    window.formatTranslation = function(text, ...values) {
        let result = text;
        values.forEach((value) => {
            result = result.replace('{}', value);
        });
        return result;
    };
}

const translations = {
    // ==========================================
    // ENGLISH (Base Language)
    // ==========================================
    en: {
        // App Metadata & Titles
        "app.title": "Word Search Generator",
        "worksheetGenerator": "Worksheet Generator",

        // Language Settings
        "languageSettings": "Language Settings",
        "selectLanguage": "Select Language:",
        "worksheetContentLanguage": "Worksheet Content Language:",
        "imageLibraryLanguage": "Image Library Language:",
        "contentLanguageNote": "Image names and themes will be displayed in the selected language.",
        "imageNamesAndThemesNote": "Image names and themes will be displayed in the selected language.",

        // Language names
        "lang_en": "English",
        "lang_de": "German (Deutsch)",
        "lang_fr": "French (Français)",
        "lang_es": "Spanish (Español)",
        "lang_it": "Italian (Italiano)",
        "lang_pt": "Portuguese (Português)",
        "lang_nl": "Dutch (Nederlands)",
        "lang_sv": "Swedish (Svenska)",
        "lang_da": "Danish (Dansk)",
        "lang_no": "Norwegian (Norsk)",
        "lang_fi": "Finnish (Suomi)",

        // Page & Scene Settings
        "pageAndScene": "Page & Scene",
        "pageSetup": "Page Setup",
        "pageSize": "Page Size:",
        "letterPortrait": "Letter Portrait (8.5×11\")",
        "letterLandscape": "Letter Landscape (11×8.5\")",
        "a4Portrait": "A4 Portrait (210×297mm)",
        "a4Landscape": "A4 Landscape (297×210mm)",
        "custom": "Custom",
        "widthPx": "Width (px):",
        "heightPx": "Height (px):",
        "applySize": "Apply Size",

        // Background settings
        "background": "Background",
        "fallbackColor": "Fallback Color:",
        "backgroundTheme": "Background Theme:",
        "noneUseFallbackColor": "None (Use Fallback Color)",
        "selectThemeForBackgrounds": "Select a theme for backgrounds.",
        "backgroundOpacity": "Background Opacity:",

        // Border settings
        "border": "Border",
        "borderTheme": "Border Theme:",
        "none": "None",
        "common.none": "None",
    "none": "None",
    "none": "None",
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

        // Puzzle Settings
        "puzzleSettings": "Puzzle Settings",
        "gridSize": "Grid Size",
        "rows": "Rows:",
        "columns": "Columns:",
        "puzzleOptions": "Puzzle Options",
        "allowDiagonal": "Allow Diagonal Words",
        "allowReverseWords": "Allow Reverse Words",
        "showWordList": "Show Word/Image List",
        "showOnlyImages": "Show only images",
        "showOnlyWords": "Show only words",
        "classicMode": "Classic Mode (Text Only)",

        // Image Library
        "imageLibrary": "Image Library",
        "imageSourceForPuzzle": "Image Source for Puzzle",
        "theme": "Theme:",
        "useRandomTheme": "-- Use Random Theme --",
        "individualImageSelection": "Individual Image Selection",
        "filterByTheme": "Filter by Theme:",
        "searchImages": "Search Images:",
        "searchPlaceholder": "e.g., apple, car",
        "availableImages": "Available Images (max 8):",
        "loadingImages": "Loading images...",
        "selectedImages": "Selected Images:",
        "allThemes": "All Themes",
        "allThemesRandomly": "All Themes (Randomly)",
        "allThemesForSearch": "All Themes (for search)",

        // Upload Custom Images
        "uploadCustomImages": "Upload Custom Images",
        "selectImagesToUpload": "Select image(s) to upload:",
        "chooseFiles": "Choose files",
        "noFileChosen": "No file chosen",
        "uploadedImages": "Your Uploaded Images (This Session):",
        "yourUploadedImagesWillAppearHere": "Your uploaded images will appear here.",
        "uploadedImagesWillAppearHere": "Your uploaded images will appear here.",
        "filesSelected": "{} file(s) selected",

        // Toolbar & Alignment
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
        "newWorksheet": "New Worksheet",
        "answerKey": "Answer Key",
        "download": "Download",
        "worksheet": "Worksheet",
        "worksheetJpeg": "Worksheet (JPEG)",
        "answerKeyJpeg": "Answer Key (JPEG)",
        "worksheetPdf": "Worksheet (PDF)",
        "answerKeyPdf": "Answer Key (PDF)",
        "grayscale": "Grayscale",
        "clearAll": "Clear All",

        // Success Messages
        "worksheetGeneratedSuccessfully": "Worksheet generated successfully!",
        "answerKeyGenerated": "Answer key generated!",
        "allSettingsCleared": "All settings cleared.",
        "puzzleWillGenerateUsing": "Puzzle will generate using the '{}' theme.",
        "customImagesAvailable": "{} custom image(s) available.",
        "jpegDownloadInitiated": "JPEG download initiated!",
        "pdfDownloaded": "PDF downloaded!",

        // Loading Messages
        "searching": "Searching...",
        "loadingTheme": "Loading theme...",
        "loadingImagesCount": "Loading {} image(s)...",
        "loadingThemeBorders": "Loading {} borders...",
        "loadingThemeBackgrounds": "Loading {} backgrounds...",
        "preparingJpeg": "Preparing JPEG...",
        "preparingPdf": "Preparing PDF...",
        "preparingJPEG": "Preparing JPEG...",
        "preparingPDF": "Preparing PDF...",

        // Error Messages
        "pleaseGenerateWorksheetFirst": "Please generate a worksheet first.",
        "pleaseGenerateContentFirst": "Please generate content first.",
        "themeNeedsMinImages": "Theme '{}' needs at least {} images.",
        "pleaseWaitForThemes": "Please wait for themes to load...",
        "noImagesSelectedOrAvailable": "No images selected or available to generate the puzzle.",
        "failedToPlaceWords": "Failed to place any words. Try a larger grid or different words.",
        "noImagesFound": "No images found",
        "maxImagesSelected": "You can select a maximum of {} images.",
        "errorReadingFile": "Error reading file: {}",
        "noBordersInTheme": "No borders in this theme.",
        "noBackgroundsInTheme": "No backgrounds in this theme.",
        "errorPreparingJpeg": "Error preparing JPEG.",
        "errorCreatingPdf": "Error creating PDF.",
        "errorPreparingJPEG": "Error preparing JPEG.",
        "errorCreatingPDF": "Error creating PDF.",

        // Watermarks & Defaults
        "watermarkText": "FREE VERSION - LessonCraftStudio.com",
        "watermarkSmall": "FREE VERSION",
        "defaultNewText": "New Text",
        "puzzle": "Puzzle",
        "exercise": "Exercise"
    },

    // ==========================================
    // GERMAN / DEUTSCH
    // ==========================================
    de: {
        // App-Metadaten & Titel
        "app.title": "Worträtsel-Generator",
        "worksheetGenerator": "Arbeitsblatt-Generator",

        // Spracheinstellungen
        "languageSettings": "Spracheinstellungen",
        "selectLanguage": "Sprache auswählen:",
        "worksheetContentLanguage": "Arbeitsblatt-Inhaltssprache:",
        "imageLibraryLanguage": "Bilderbibliothek-Sprache:",
        "contentLanguageNote": "Bildnamen und Themenbereiche werden in der gewählten Sprache angezeigt.",
        "imageNamesAndThemesNote": "Bildnamen und Themenbereiche werden in der gewählten Sprache angezeigt.",

        // Sprachnamen
        "lang_en": "Englisch",
        "lang_de": "Deutsch",
        "lang_fr": "Französisch",
        "lang_es": "Spanisch",
        "lang_it": "Italienisch",
        "lang_pt": "Portugiesisch",
        "lang_nl": "Niederländisch",
        "lang_sv": "Schwedisch",
        "lang_da": "Dänisch",
        "lang_no": "Norwegisch",
        "lang_fi": "Finnisch",

        // Seiten- & Szeneneinstellungen
        "pageAndScene": "Seite & Gestaltung",
        "pageSetup": "Seiteneinrichtung",
        "pageSize": "Seitenformat:",
        "letterPortrait": "US Letter Hochformat (8,5×11\")",
        "letterLandscape": "US Letter Querformat (11×8,5\")",
        "a4Portrait": "DIN A4 Hochformat (210×297mm)",
        "a4Landscape": "DIN A4 Querformat (297×210mm)",
        "custom": "Benutzerdefiniert",
        "widthPx": "Breite (px):",
        "heightPx": "Höhe (px):",
        "applySize": "Format anwenden",

        // Hintergrundeinstellungen
        "background": "Hintergrund",
        "fallbackColor": "Grundfarbe:",
        "backgroundTheme": "Hintergrundthema:",
        "noneUseFallbackColor": "Kein Thema (Grundfarbe verwenden)",
        "selectThemeForBackgrounds": "Wählen Sie ein Thema für Hintergründe aus.",
        "backgroundOpacity": "Hintergrund-Transparenz:",

        // Rahmeneinstellungen
        "border": "Rahmen",
        "borderTheme": "Rahmenthema:",
        "none": "Kein Rahmen",
        "common.none": "Kein",
        "none": "Kein",
        "selectThemeToSeeBorders": "Wählen Sie ein Thema für Rahmen aus.",
        "borderOpacity": "Rahmen-Transparenz:",

        // Textwerkzeuge
        "textTools": "Textwerkzeuge",
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

        // Rätsel-Einstellungen
        "puzzleSettings": "Rätsel-Einstellungen",
        "gridSize": "Gittergröße",
        "rows": "Zeilen:",
        "columns": "Spalten:",
        "puzzleOptions": "Rätsel-Optionen",
        "allowDiagonal": "Diagonale Wörter erlauben",
        "allowReverseWords": "Rückwärts geschriebene Wörter erlauben",
        "showWordList": "Wort-/Bilderliste anzeigen",
        "showOnlyImages": "Nur Bilder anzeigen",
        "showOnlyWords": "Nur Wörter anzeigen",
        "classicMode": "Klassischer Modus (nur Text)",

        // Bilderbibliothek
        "imageLibrary": "Bilderbibliothek",
        "imageSourceForPuzzle": "Bildquelle für Rätsel",
        "theme": "Thema:",
        "useRandomTheme": "-- Zufälliges Thema verwenden --",
        "individualImageSelection": "Einzelne Bildauswahl",
        "filterByTheme": "Nach Thema filtern:",
        "searchImages": "Bilder suchen:",
        "searchPlaceholder": "z.B. Apfel, Auto",
        "availableImages": "Verfügbare Bilder (max. 8):",
        "loadingImages": "Bilder werden geladen...",
        "selectedImages": "Ausgewählte Bilder:",
        "allThemes": "Alle Themen",
        "allThemesRandomly": "Alle Themen (zufällig)",
        "allThemesForSearch": "Alle Themen (für Suche)",

        // Eigene Bilder hochladen
        "uploadCustomImages": "Eigene Bilder hochladen",
        "selectImagesToUpload": "Bild(er) zum Hochladen auswählen:",
        "chooseFiles": "Dateien auswählen",
        "noFileChosen": "Keine Datei ausgewählt",
        "uploadedImages": "Ihre hochgeladenen Bilder (diese Sitzung):",
        "yourUploadedImagesWillAppearHere": "Ihre hochgeladenen Bilder erscheinen hier.",
        "uploadedImagesWillAppearHere": "Ihre hochgeladenen Bilder erscheinen hier.",
        "filesSelected": "{} Datei(en) ausgewählt",

        // Werkzeugleiste & Ausrichtung
        "layers": "Ebenen",
        "bringForward": "Nach vorne",
        "sendBackward": "Nach hinten",
        "align": "Ausrichten",
        "alignSelected": "Auswahl ausrichten:",
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

        // Aktionsschaltflächen
        "generate": "Erstellen",
        "newWorksheet": "Neues Arbeitsblatt",
        "answerKey": "Lösungsblatt",
        "download": "Herunterladen",
        "worksheet": "Arbeitsblatt",
        "worksheetJpeg": "Arbeitsblatt (JPEG)",
        "answerKeyJpeg": "Lösungsblatt (JPEG)",
        "worksheetPdf": "Arbeitsblatt (PDF)",
        "answerKeyPdf": "Lösungsblatt (PDF)",
        "grayscale": "Graustufen",
        "clearAll": "Alles löschen",

        // Erfolgsmeldungen
        "worksheetGeneratedSuccessfully": "Arbeitsblatt erfolgreich erstellt!",
        "answerKeyGenerated": "Lösungsblatt erstellt!",
        "allSettingsCleared": "Alle Einstellungen gelöscht.",
        "puzzleWillGenerateUsing": "Rätsel wird mit dem Thema '{}' erstellt.",
        "customImagesAvailable": "{} benutzerdefinierte(s) Bild(er) verfügbar.",
        "jpegDownloadInitiated": "JPEG-Download gestartet!",
        "pdfDownloaded": "PDF heruntergeladen!",

        // Lademeldungen
        "searching": "Suche läuft...",
        "loadingTheme": "Thema wird geladen...",
        "loadingImagesCount": "{} Bild(er) werden geladen...",
        "loadingThemeBorders": "{} Rahmen werden geladen...",
        "loadingThemeBackgrounds": "{} Hintergründe werden geladen...",
        "preparingJpeg": "JPEG wird vorbereitet...",
        "preparingPdf": "PDF wird vorbereitet...",
        "preparingJPEG": "JPEG wird vorbereitet...",
        "preparingPDF": "PDF wird vorbereitet...",

        // Fehlermeldungen
        "pleaseGenerateWorksheetFirst": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
        "pleaseGenerateContentFirst": "Bitte erstellen Sie zuerst Inhalte.",
        "themeNeedsMinImages": "Thema '{}' benötigt mindestens {} Bilder.",
        "pleaseWaitForThemes": "Bitte warten Sie, bis die Themen geladen sind...",
        "noImagesSelectedOrAvailable": "Keine Bilder ausgewählt oder verfügbar für das Rätsel.",
        "failedToPlaceWords": "Keine Wörter konnten platziert werden. Versuchen Sie ein größeres Gitter oder andere Wörter.",
        "noImagesFound": "Keine Bilder gefunden",
        "maxImagesSelected": "Sie können maximal {} Bilder auswählen.",
        "errorReadingFile": "Fehler beim Lesen der Datei: {}",
        "noBordersInTheme": "Keine Rahmen in diesem Thema.",
        "noBackgroundsInTheme": "Keine Hintergründe in diesem Thema.",
        "errorPreparingJpeg": "Fehler bei der JPEG-Vorbereitung.",
        "errorCreatingPdf": "Fehler beim PDF-Erstellen.",
        "errorPreparingJPEG": "Fehler bei der JPEG-Vorbereitung.",
        "errorCreatingPDF": "Fehler beim PDF-Erstellen.",

        // Wasserzeichen & Standards
        "watermarkText": "KOSTENLOSE VERSION - LessonCraftStudio.com",
        "watermarkSmall": "KOSTENLOSE VERSION",
        "defaultNewText": "Neuer Text",
        "puzzle": "Rätsel",
        "exercise": "Übung"
    },

    // ==========================================
    // FRENCH / FRANÇAIS
    // ==========================================
    fr: {
        // Métadonnées et titres
        "app.title": "Générateur de mots mêlés",
        "worksheetGenerator": "Générateur de fiches d'exercices",

        // Paramètres de langue
        "languageSettings": "Paramètres de langue",
        "selectLanguage": "Sélectionner la langue :",
        "worksheetContentLanguage": "Langue du contenu de la fiche :",
        "imageLibraryLanguage": "Langue de la bibliothèque d'images :",
        "contentLanguageNote": "Les noms d'images et les thèmes seront affichés dans la langue sélectionnée.",
        "imageNamesAndThemesNote": "Les noms d'images et les thèmes seront affichés dans la langue sélectionnée.",

        // Noms des langues
        "lang_en": "Anglais",
        "lang_de": "Allemand",
        "lang_fr": "Français",
        "lang_es": "Espagnol",
        "lang_it": "Italien",
        "lang_pt": "Portugais",
        "lang_nl": "Néerlandais",
        "lang_sv": "Suédois",
        "lang_da": "Danois",
        "lang_no": "Norvégien",
        "lang_fi": "Finnois",

        // Paramètres de page
        "pageAndScene": "Page et mise en page",
        "pageSetup": "Configuration de la page",
        "pageSize": "Format de page :",
        "letterPortrait": "Lettre US Portrait (8,5×11\")",
        "letterLandscape": "Lettre US Paysage (11×8,5\")",
        "a4Portrait": "A4 Portrait (210×297mm)",
        "a4Landscape": "A4 Paysage (297×210mm)",
        "custom": "Personnalisé",
        "widthPx": "Largeur (px) :",
        "heightPx": "Hauteur (px) :",
        "applySize": "Appliquer le format",

        // Paramètres d'arrière-plan
        "background": "Arrière-plan",
        "fallbackColor": "Couleur de base :",
        "backgroundTheme": "Thème d'arrière-plan :",
        "noneUseFallbackColor": "Aucun (utiliser la couleur de base)",
        "selectThemeForBackgrounds": "Sélectionnez un thème pour les arrière-plans.",
        "backgroundOpacity": "Opacité de l'arrière-plan :",

        // Paramètres de bordure
        "border": "Bordure",
        "borderTheme": "Thème de bordure :",
        "none": "Aucune",
        "common.none": "Aucun",
    "none": "Aucun",
    "none": "Aucun",
        "selectThemeToSeeBorders": "Sélectionnez un thème pour voir les bordures.",
        "borderOpacity": "Opacité de la bordure :",

        // Outils de texte
        "textTools": "Outils de texte",
        "addNewText": "Ajouter un nouveau texte",
        "content": "Contenu :",
        "helloPlaceholder": "Bonjour !",
        "addText": "Ajouter le texte",
        "selectedTextProperties": "Propriétés du texte sélectionné",
        "color": "Couleur :",
        "size": "Taille :",
        "font": "Police :",
        "outlineColor": "Couleur du contour :",
        "outlineWidth": "Largeur du contour (0-10) :",

        // Paramètres du puzzle
        "puzzleSettings": "Paramètres du puzzle",
        "gridSize": "Taille de la grille",
        "rows": "Lignes :",
        "columns": "Colonnes :",
        "puzzleOptions": "Options du puzzle",
        "allowDiagonal": "Autoriser les mots en diagonale",
        "allowReverseWords": "Autoriser les mots inversés",
        "showWordList": "Afficher la liste des mots/images",
        "showOnlyImages": "Afficher uniquement les images",
        "showOnlyWords": "Afficher uniquement les mots",
        "classicMode": "Mode classique (texte uniquement)",

        // Bibliothèque d'images
        "imageLibrary": "Bibliothèque d'images",
        "imageSourceForPuzzle": "Source d'images pour le puzzle",
        "theme": "Thème :",
        "useRandomTheme": "-- Utiliser un thème aléatoire --",
        "individualImageSelection": "Sélection individuelle d'images",
        "filterByTheme": "Filtrer par thème :",
        "searchImages": "Rechercher des images :",
        "searchPlaceholder": "ex : pomme, voiture",
        "availableImages": "Images disponibles (max 8) :",
        "loadingImages": "Chargement des images...",
        "selectedImages": "Images sélectionnées :",
        "allThemes": "Tous les thèmes",
        "allThemesRandomly": "Tous les thèmes (aléatoire)",
        "allThemesForSearch": "Tous les thèmes (pour recherche)",

        // Télécharger des images personnalisées
        "uploadCustomImages": "Télécharger des images personnalisées",
        "selectImagesToUpload": "Sélectionner une ou plusieurs images à télécharger :",
        "chooseFiles": "Choisir des fichiers",
        "noFileChosen": "Aucun fichier choisi",
        "uploadedImages": "Vos images téléchargées (cette session) :",
        "yourUploadedImagesWillAppearHere": "Vos images téléchargées apparaîtront ici.",
        "uploadedImagesWillAppearHere": "Vos images téléchargées apparaîtront ici.",
        "filesSelected": "{} fichier(s) sélectionné(s)",

        // Barre d'outils et alignement
        "layers": "Calques",
        "bringForward": "Avancer",
        "sendBackward": "Reculer",
        "align": "Aligner",
        "alignSelected": "Aligner la sélection :",
        "alignLeft": "Aligner à gauche",
        "centerHorizontally": "Centrer horizontalement",
        "alignRight": "Aligner à droite",
        "alignTop": "Aligner en haut",
        "centerVertically": "Centrer verticalement",
        "alignBottom": "Aligner en bas",
        "alignToPage": "Aligner sur la page :",
        "centerOnPageHorizontally": "Centrer horizontalement sur la page",
        "centerOnPageVertically": "Centrer verticalement sur la page",
        "deleteSelected": "Supprimer la sélection",

        // Boutons d'action
        "generate": "Générer",
        "newWorksheet": "Nouvelle fiche",
        "answerKey": "Corrigé",
        "download": "Télécharger",
        "worksheet": "Fiche d'exercices",
        "worksheetJpeg": "Fiche d'exercices (JPEG)",
        "answerKeyJpeg": "Corrigé (JPEG)",
        "worksheetPdf": "Fiche d'exercices (PDF)",
        "answerKeyPdf": "Corrigé (PDF)",
        "grayscale": "Niveaux de gris",
        "clearAll": "Tout effacer",

        // Messages de succès
        "worksheetGeneratedSuccessfully": "Fiche d'exercices générée avec succès !",
        "answerKeyGenerated": "Corrigé généré !",
        "allSettingsCleared": "Tous les paramètres ont été effacés.",
        "puzzleWillGenerateUsing": "Le puzzle sera généré avec le thème '{}'.",
        "customImagesAvailable": "{} image(s) personnalisée(s) disponible(s).",
        "jpegDownloadInitiated": "Téléchargement JPEG lancé !",
        "pdfDownloaded": "PDF téléchargé !",

        // Messages de chargement
        "searching": "Recherche en cours...",
        "loadingTheme": "Chargement du thème...",
        "loadingImagesCount": "Chargement de {} image(s)...",
        "loadingThemeBorders": "Chargement de {} bordures...",
        "loadingThemeBackgrounds": "Chargement de {} arrière-plans...",
        "preparingJpeg": "Préparation du JPEG...",
        "preparingPdf": "Préparation du PDF...",
        "preparingJPEG": "Préparation du JPEG...",
        "preparingPDF": "Préparation du PDF...",

        // Messages d'erreur
        "pleaseGenerateWorksheetFirst": "Veuillez d'abord générer une fiche d'exercices.",
        "pleaseGenerateContentFirst": "Veuillez d'abord générer du contenu.",
        "themeNeedsMinImages": "Le thème '{}' nécessite au moins {} images.",
        "pleaseWaitForThemes": "Veuillez attendre le chargement des thèmes...",
        "noImagesSelectedOrAvailable": "Aucune image sélectionnée ou disponible pour générer le puzzle.",
        "failedToPlaceWords": "Impossible de placer les mots. Essayez une grille plus grande ou des mots différents.",
        "noImagesFound": "Aucune image trouvée",
        "maxImagesSelected": "Vous pouvez sélectionner un maximum de {} images.",
        "errorReadingFile": "Erreur lors de la lecture du fichier : {}",
        "noBordersInTheme": "Aucune bordure dans ce thème.",
        "noBackgroundsInTheme": "Aucun arrière-plan dans ce thème.",
        "errorPreparingJpeg": "Erreur lors de la préparation du JPEG.",
        "errorCreatingPdf": "Erreur lors de la création du PDF.",
        "errorPreparingJPEG": "Erreur lors de la préparation du JPEG.",
        "errorCreatingPDF": "Erreur lors de la création du PDF.",

        // Filigranes et valeurs par défaut
        "watermarkText": "VERSION GRATUITE - LessonCraftStudio.com",
        "watermarkSmall": "VERSION GRATUITE",
        "defaultNewText": "Nouveau texte",
        "puzzle": "Puzzle",
        "exercise": "Exercice"
    },

    // ==========================================
    // SPANISH / ESPAÑOL
    // ==========================================
    es: {
        // Metadatos y títulos
        "app.title": "Generador de sopas de letras",
        "worksheetGenerator": "Generador de hojas de ejercicios",

        // Configuración de idioma
        "languageSettings": "Configuración de idioma",
        "selectLanguage": "Seleccionar idioma:",
        "worksheetContentLanguage": "Idioma del contenido de la hoja:",
        "imageLibraryLanguage": "Idioma de la biblioteca de imágenes:",
        "contentLanguageNote": "Los nombres de imágenes y temas se mostrarán en el idioma seleccionado.",
        "imageNamesAndThemesNote": "Los nombres de imágenes y temas se mostrarán en el idioma seleccionado.",

        // Nombres de idiomas
        "lang_en": "Inglés",
        "lang_de": "Alemán",
        "lang_fr": "Francés",
        "lang_es": "Español",
        "lang_it": "Italiano",
        "lang_pt": "Portugués",
        "lang_nl": "Neerlandés",
        "lang_sv": "Sueco",
        "lang_da": "Danés",
        "lang_no": "Noruego",
        "lang_fi": "Finlandés",

        // Configuración de página
        "pageAndScene": "Página y diseño",
        "pageSetup": "Configuración de página",
        "pageSize": "Tamaño de página:",
        "letterPortrait": "Carta Vertical (8,5×11\")",
        "letterLandscape": "Carta Horizontal (11×8,5\")",
        "a4Portrait": "A4 Vertical (210×297mm)",
        "a4Landscape": "A4 Horizontal (297×210mm)",
        "custom": "Personalizado",
        "widthPx": "Ancho (px):",
        "heightPx": "Alto (px):",
        "applySize": "Aplicar tamaño",

        // Configuración de fondo
        "background": "Fondo",
        "fallbackColor": "Color base:",
        "backgroundTheme": "Tema de fondo:",
        "noneUseFallbackColor": "Ninguno (usar color base)",
        "selectThemeForBackgrounds": "Seleccione un tema para los fondos.",
        "backgroundOpacity": "Opacidad del fondo:",

        // Configuración de borde
        "border": "Borde",
        "borderTheme": "Tema de borde:",
        "none": "Ninguno",
        "common.none": "Ninguno",
    "none": "Ninguno",
    "none": "Ninguno",
        "selectThemeToSeeBorders": "Seleccione un tema para ver los bordes.",
        "borderOpacity": "Opacidad del borde:",

        // Herramientas de texto
        "textTools": "Herramientas de texto",
        "addNewText": "Añadir nuevo texto",
        "content": "Contenido:",
        "helloPlaceholder": "¡Hola!",
        "addText": "Añadir texto",
        "selectedTextProperties": "Propiedades del texto seleccionado",
        "color": "Color:",
        "size": "Tamaño:",
        "font": "Fuente:",
        "outlineColor": "Color del contorno:",
        "outlineWidth": "Ancho del contorno (0-10):",

        // Configuración del rompecabezas
        "puzzleSettings": "Configuración del rompecabezas",
        "gridSize": "Tamaño de la cuadrícula",
        "rows": "Filas:",
        "columns": "Columnas:",
        "puzzleOptions": "Opciones del rompecabezas",
        "allowDiagonal": "Permitir palabras en diagonal",
        "allowReverseWords": "Permitir palabras invertidas",
        "showWordList": "Mostrar lista de palabras/imágenes",
        "showOnlyImages": "Mostrar solo imágenes",
        "showOnlyWords": "Mostrar solo palabras",
        "classicMode": "Modo clásico (solo texto)",

        // Biblioteca de imágenes
        "imageLibrary": "Biblioteca de imágenes",
        "imageSourceForPuzzle": "Fuente de imágenes para el rompecabezas",
        "theme": "Tema:",
        "useRandomTheme": "-- Usar tema aleatorio --",
        "individualImageSelection": "Selección individual de imágenes",
        "filterByTheme": "Filtrar por tema:",
        "searchImages": "Buscar imágenes:",
        "searchPlaceholder": "ej.: manzana, coche",
        "availableImages": "Imágenes disponibles (máx. 8):",
        "loadingImages": "Cargando imágenes...",
        "selectedImages": "Imágenes seleccionadas:",
        "allThemes": "Todos los temas",
        "allThemesRandomly": "Todos los temas (aleatorio)",
        "allThemesForSearch": "Todos los temas (para búsqueda)",

        // Cargar imágenes personalizadas
        "uploadCustomImages": "Cargar imágenes personalizadas",
        "selectImagesToUpload": "Seleccionar imagen(es) para cargar:",
        "chooseFiles": "Elegir archivos",
        "noFileChosen": "Ningún archivo elegido",
        "uploadedImages": "Sus imágenes cargadas (esta sesión):",
        "yourUploadedImagesWillAppearHere": "Sus imágenes cargadas aparecerán aquí.",
        "uploadedImagesWillAppearHere": "Sus imágenes cargadas aparecerán aquí.",
        "filesSelected": "{} archivo(s) seleccionado(s)",

        // Barra de herramientas y alineación
        "layers": "Capas",
        "bringForward": "Traer al frente",
        "sendBackward": "Enviar atrás",
        "align": "Alinear",
        "alignSelected": "Alinear selección:",
        "alignLeft": "Alinear a la izquierda",
        "centerHorizontally": "Centrar horizontalmente",
        "alignRight": "Alinear a la derecha",
        "alignTop": "Alinear arriba",
        "centerVertically": "Centrar verticalmente",
        "alignBottom": "Alinear abajo",
        "alignToPage": "Alinear a la página:",
        "centerOnPageHorizontally": "Centrar horizontalmente en la página",
        "centerOnPageVertically": "Centrar verticalmente en la página",
        "deleteSelected": "Eliminar selección",

        // Botones de acción
        "generate": "Generar",
        "newWorksheet": "Nueva hoja",
        "answerKey": "Clave de respuestas",
        "download": "Descargar",
        "worksheet": "Hoja de ejercicios",
        "worksheetJpeg": "Hoja de ejercicios (JPEG)",
        "answerKeyJpeg": "Clave de respuestas (JPEG)",
        "worksheetPdf": "Hoja de ejercicios (PDF)",
        "answerKeyPdf": "Clave de respuestas (PDF)",
        "grayscale": "Escala de grises",
        "clearAll": "Borrar todo",

        // Mensajes de éxito
        "worksheetGeneratedSuccessfully": "¡Hoja de ejercicios generada con éxito!",
        "answerKeyGenerated": "¡Clave de respuestas generada!",
        "allSettingsCleared": "Toda la configuración ha sido borrada.",
        "puzzleWillGenerateUsing": "El rompecabezas se generará usando el tema '{}'.",
        "customImagesAvailable": "{} imagen(es) personalizada(s) disponible(s).",
        "jpegDownloadInitiated": "¡Descarga de JPEG iniciada!",
        "pdfDownloaded": "¡PDF descargado!",

        // Mensajes de carga
        "searching": "Buscando...",
        "loadingTheme": "Cargando tema...",
        "loadingImagesCount": "Cargando {} imagen(es)...",
        "loadingThemeBorders": "Cargando {} bordes...",
        "loadingThemeBackgrounds": "Cargando {} fondos...",
        "preparingJpeg": "Preparando JPEG...",
        "preparingPdf": "Preparando PDF...",
        "preparingJPEG": "Preparando JPEG...",
        "preparingPDF": "Preparando PDF...",

        // Mensajes de error
        "pleaseGenerateWorksheetFirst": "Por favor, genere primero una hoja de ejercicios.",
        "pleaseGenerateContentFirst": "Por favor, genere primero el contenido.",
        "themeNeedsMinImages": "El tema '{}' necesita al menos {} imágenes.",
        "pleaseWaitForThemes": "Por favor, espere a que se carguen los temas...",
        "noImagesSelectedOrAvailable": "No hay imágenes seleccionadas o disponibles para generar el rompecabezas.",
        "failedToPlaceWords": "No se pudieron colocar palabras. Intente con una cuadrícula más grande o palabras diferentes.",
        "noImagesFound": "No se encontraron imágenes",
        "maxImagesSelected": "Puede seleccionar un máximo de {} imágenes.",
        "errorReadingFile": "Error al leer el archivo: {}",
        "noBordersInTheme": "No hay bordes en este tema.",
        "noBackgroundsInTheme": "No hay fondos en este tema.",
        "errorPreparingJpeg": "Error al preparar el JPEG.",
        "errorCreatingPdf": "Error al crear el PDF.",
        "errorPreparingJPEG": "Error al preparar el JPEG.",
        "errorCreatingPDF": "Error al crear el PDF.",

        // Marcas de agua y valores por defecto
        "watermarkText": "VERSIÓN GRATUITA - LessonCraftStudio.com",
        "watermarkSmall": "VERSIÓN GRATUITA",
        "defaultNewText": "Nuevo texto",
        "puzzle": "Rompecabezas",
        "exercise": "Ejercicio"
    },

    // ==========================================
    // ITALIAN / ITALIANO
    // ==========================================
    it: {
        // Metadati e titoli
        "app.title": "Generatore di cruciverba",
        "worksheetGenerator": "Generatore di schede didattiche",

        // Impostazioni lingua
        "languageSettings": "Impostazioni lingua",
        "selectLanguage": "Seleziona lingua:",
        "worksheetContentLanguage": "Lingua contenuto scheda:",
        "imageLibraryLanguage": "Lingua libreria immagini:",
        "contentLanguageNote": "I nomi delle immagini e i temi verranno visualizzati nella lingua selezionata.",
        "imageNamesAndThemesNote": "I nomi delle immagini e i temi verranno visualizzati nella lingua selezionata.",

        // Nomi delle lingue
        "lang_en": "Inglese",
        "lang_de": "Tedesco",
        "lang_fr": "Francese",
        "lang_es": "Spagnolo",
        "lang_it": "Italiano",
        "lang_pt": "Portoghese",
        "lang_nl": "Olandese",
        "lang_sv": "Svedese",
        "lang_da": "Danese",
        "lang_no": "Norvegese",
        "lang_fi": "Finlandese",

        // Impostazioni pagina
        "pageAndScene": "Pagina e layout",
        "pageSetup": "Configurazione pagina",
        "pageSize": "Formato pagina:",
        "letterPortrait": "Lettera verticale (8,5×11\")",
        "letterLandscape": "Lettera orizzontale (11×8,5\")",
        "a4Portrait": "A4 verticale (210×297mm)",
        "a4Landscape": "A4 orizzontale (297×210mm)",
        "custom": "Personalizzato",
        "widthPx": "Larghezza (px):",
        "heightPx": "Altezza (px):",
        "applySize": "Applica formato",

        // Impostazioni sfondo
        "background": "Sfondo",
        "fallbackColor": "Colore base:",
        "backgroundTheme": "Tema sfondo:",
        "noneUseFallbackColor": "Nessuno (usa colore base)",
        "selectThemeForBackgrounds": "Seleziona un tema per gli sfondi.",
        "backgroundOpacity": "Opacità sfondo:",

        // Impostazioni bordo
        "border": "Bordo",
        "borderTheme": "Tema bordo:",
        "none": "Nessuno",
        "common.none": "Nessuno",
    "none": "Nessuno",
    "none": "Nessuno",
        "selectThemeToSeeBorders": "Seleziona un tema per vedere i bordi.",
        "borderOpacity": "Opacità bordo:",

        // Strumenti testo
        "textTools": "Strumenti testo",
        "addNewText": "Aggiungi nuovo testo",
        "content": "Contenuto:",
        "helloPlaceholder": "Ciao!",
        "addText": "Aggiungi testo",
        "selectedTextProperties": "Proprietà testo selezionato",
        "color": "Colore:",
        "size": "Dimensione:",
        "font": "Carattere:",
        "outlineColor": "Colore contorno:",
        "outlineWidth": "Larghezza contorno (0-10):",

        // Impostazioni puzzle
        "puzzleSettings": "Impostazioni puzzle",
        "gridSize": "Dimensione griglia",
        "rows": "Righe:",
        "columns": "Colonne:",
        "puzzleOptions": "Opzioni puzzle",
        "allowDiagonal": "Permetti parole diagonali",
        "allowReverseWords": "Permetti parole inverse",
        "showWordList": "Mostra lista parole/immagini",
        "showOnlyImages": "Mostra solo immagini",
        "showOnlyWords": "Mostra solo parole",
        "classicMode": "Modalità classica (solo testo)",

        // Libreria immagini
        "imageLibrary": "Libreria immagini",
        "imageSourceForPuzzle": "Fonte immagini per il puzzle",
        "theme": "Tema:",
        "useRandomTheme": "-- Usa tema casuale --",
        "individualImageSelection": "Selezione individuale immagini",
        "filterByTheme": "Filtra per tema:",
        "searchImages": "Cerca immagini:",
        "searchPlaceholder": "es.: mela, auto",
        "availableImages": "Immagini disponibili (max 8):",
        "loadingImages": "Caricamento immagini...",
        "selectedImages": "Immagini selezionate:",
        "allThemes": "Tutti i temi",
        "allThemesRandomly": "Tutti i temi (casuale)",
        "allThemesForSearch": "Tutti i temi (per ricerca)",

        // Carica immagini personalizzate
        "uploadCustomImages": "Carica immagini personalizzate",
        "selectImagesToUpload": "Seleziona immagine/i da caricare:",
        "chooseFiles": "Scegli file",
        "noFileChosen": "Nessun file scelto",
        "uploadedImages": "Le tue immagini caricate (questa sessione):",
        "yourUploadedImagesWillAppearHere": "Le tue immagini caricate appariranno qui.",
        "uploadedImagesWillAppearHere": "Le tue immagini caricate appariranno qui.",
        "filesSelected": "{} file selezionato/i",

        // Barra strumenti e allineamento
        "layers": "Livelli",
        "bringForward": "Porta avanti",
        "sendBackward": "Porta indietro",
        "align": "Allinea",
        "alignSelected": "Allinea selezione:",
        "alignLeft": "Allinea a sinistra",
        "centerHorizontally": "Centra orizzontalmente",
        "alignRight": "Allinea a destra",
        "alignTop": "Allinea in alto",
        "centerVertically": "Centra verticalmente",
        "alignBottom": "Allinea in basso",
        "alignToPage": "Allinea alla pagina:",
        "centerOnPageHorizontally": "Centra orizzontalmente nella pagina",
        "centerOnPageVertically": "Centra verticalmente nella pagina",
        "deleteSelected": "Elimina selezione",

        // Pulsanti azione
        "generate": "Genera",
        "newWorksheet": "Nuova scheda",
        "answerKey": "Soluzioni",
        "download": "Scarica",
        "worksheet": "Scheda didattica",
        "worksheetJpeg": "Scheda didattica (JPEG)",
        "answerKeyJpeg": "Soluzioni (JPEG)",
        "worksheetPdf": "Scheda didattica (PDF)",
        "answerKeyPdf": "Soluzioni (PDF)",
        "grayscale": "Scala di grigi",
        "clearAll": "Cancella tutto",

        // Messaggi di successo
        "worksheetGeneratedSuccessfully": "Scheda didattica generata con successo!",
        "answerKeyGenerated": "Soluzioni generate!",
        "allSettingsCleared": "Tutte le impostazioni sono state cancellate.",
        "puzzleWillGenerateUsing": "Il puzzle verrà generato usando il tema '{}'.",
        "customImagesAvailable": "{} immagine/i personalizzata/e disponibile/i.",
        "jpegDownloadInitiated": "Download JPEG avviato!",
        "pdfDownloaded": "PDF scaricato!",

        // Messaggi di caricamento
        "searching": "Ricerca in corso...",
        "loadingTheme": "Caricamento tema...",
        "loadingImagesCount": "Caricamento {} immagine/i...",
        "loadingThemeBorders": "Caricamento {} bordi...",
        "loadingThemeBackgrounds": "Caricamento {} sfondi...",
        "preparingJpeg": "Preparazione JPEG...",
        "preparingPdf": "Preparazione PDF...",
        "preparingJPEG": "Preparazione JPEG...",
        "preparingPDF": "Preparazione PDF...",

        // Messaggi di errore
        "pleaseGenerateWorksheetFirst": "Si prega di generare prima una scheda didattica.",
        "pleaseGenerateContentFirst": "Si prega di generare prima il contenuto.",
        "themeNeedsMinImages": "Il tema '{}' richiede almeno {} immagini.",
        "pleaseWaitForThemes": "Si prega di attendere il caricamento dei temi...",
        "noImagesSelectedOrAvailable": "Nessuna immagine selezionata o disponibile per generare il puzzle.",
        "failedToPlaceWords": "Impossibile posizionare le parole. Prova con una griglia più grande o parole diverse.",
        "noImagesFound": "Nessuna immagine trovata",
        "maxImagesSelected": "Puoi selezionare un massimo di {} immagini.",
        "errorReadingFile": "Errore nella lettura del file: {}",
        "noBordersInTheme": "Nessun bordo in questo tema.",
        "noBackgroundsInTheme": "Nessuno sfondo in questo tema.",
        "errorPreparingJpeg": "Errore nella preparazione del JPEG.",
        "errorCreatingPdf": "Errore nella creazione del PDF.",
        "errorPreparingJPEG": "Errore nella preparazione del JPEG.",
        "errorCreatingPDF": "Errore nella creazione del PDF.",

        // Filigrane e valori predefiniti
        "watermarkText": "VERSIONE GRATUITA - LessonCraftStudio.com",
        "watermarkSmall": "VERSIONE GRATUITA",
        "defaultNewText": "Nuovo testo",
        "puzzle": "Puzzle",
        "exercise": "Esercizio"
    },

    // ==========================================
    // PORTUGUESE / PORTUGUÊS
    // ==========================================
    pt: {
        // Metadados e títulos
        "app.title": "Gerador de caça-palavras",
        "worksheetGenerator": "Gerador de fichas de exercícios",

        // Configurações de idioma
        "languageSettings": "Configurações de idioma",
        "selectLanguage": "Selecionar idioma:",
        "worksheetContentLanguage": "Idioma do conteúdo da ficha:",
        "imageLibraryLanguage": "Idioma da biblioteca de imagens:",
        "contentLanguageNote": "Os nomes das imagens e temas serão exibidos no idioma selecionado.",
        "imageNamesAndThemesNote": "Os nomes das imagens e temas serão exibidos no idioma selecionado.",

        // Nomes dos idiomas
        "lang_en": "Inglês",
        "lang_de": "Alemão",
        "lang_fr": "Francês",
        "lang_es": "Espanhol",
        "lang_it": "Italiano",
        "lang_pt": "Português",
        "lang_nl": "Holandês",
        "lang_sv": "Sueco",
        "lang_da": "Dinamarquês",
        "lang_no": "Norueguês",
        "lang_fi": "Finlandês",

        // Configurações de página
        "pageAndScene": "Página e layout",
        "pageSetup": "Configuração de página",
        "pageSize": "Tamanho da página:",
        "letterPortrait": "Carta Retrato (8,5×11\")",
        "letterLandscape": "Carta Paisagem (11×8,5\")",
        "a4Portrait": "A4 Retrato (210×297mm)",
        "a4Landscape": "A4 Paisagem (297×210mm)",
        "custom": "Personalizado",
        "widthPx": "Largura (px):",
        "heightPx": "Altura (px):",
        "applySize": "Aplicar tamanho",

        // Configurações de fundo
        "background": "Fundo",
        "fallbackColor": "Cor base:",
        "backgroundTheme": "Tema de fundo:",
        "noneUseFallbackColor": "Nenhum (usar cor base)",
        "selectThemeForBackgrounds": "Selecione um tema para os fundos.",
        "backgroundOpacity": "Opacidade do fundo:",

        // Configurações de borda
        "border": "Borda",
        "borderTheme": "Tema de borda:",
        "none": "Nenhuma",
        "common.none": "Nenhum",
    "none": "Nenhum",
    "none": "Nenhum",
        "selectThemeToSeeBorders": "Selecione um tema para ver as bordas.",
        "borderOpacity": "Opacidade da borda:",

        // Ferramentas de texto
        "textTools": "Ferramentas de texto",
        "addNewText": "Adicionar novo texto",
        "content": "Conteúdo:",
        "helloPlaceholder": "Olá!",
        "addText": "Adicionar texto",
        "selectedTextProperties": "Propriedades do texto selecionado",
        "color": "Cor:",
        "size": "Tamanho:",
        "font": "Fonte:",
        "outlineColor": "Cor do contorno:",
        "outlineWidth": "Largura do contorno (0-10):",

        // Configurações do quebra-cabeça
        "puzzleSettings": "Configurações do quebra-cabeça",
        "gridSize": "Tamanho da grade",
        "rows": "Linhas:",
        "columns": "Colunas:",
        "puzzleOptions": "Opções do quebra-cabeça",
        "allowDiagonal": "Permitir palavras diagonais",
        "allowReverseWords": "Permitir palavras invertidas",
        "showWordList": "Mostrar lista de palavras/imagens",
        "showOnlyImages": "Mostrar apenas imagens",
        "showOnlyWords": "Mostrar apenas palavras",
        "classicMode": "Modo clássico (apenas texto)",

        // Biblioteca de imagens
        "imageLibrary": "Biblioteca de imagens",
        "imageSourceForPuzzle": "Fonte de imagens para o quebra-cabeça",
        "theme": "Tema:",
        "useRandomTheme": "-- Usar tema aleatório --",
        "individualImageSelection": "Seleção individual de imagens",
        "filterByTheme": "Filtrar por tema:",
        "searchImages": "Pesquisar imagens:",
        "searchPlaceholder": "ex.: maçã, carro",
        "availableImages": "Imagens disponíveis (máx. 8):",
        "loadingImages": "Carregando imagens...",
        "selectedImages": "Imagens selecionadas:",
        "allThemes": "Todos os temas",
        "allThemesRandomly": "Todos os temas (aleatório)",
        "allThemesForSearch": "Todos os temas (para pesquisa)",

        // Carregar imagens personalizadas
        "uploadCustomImages": "Carregar imagens personalizadas",
        "selectImagesToUpload": "Selecionar imagem(ns) para carregar:",
        "chooseFiles": "Escolher arquivos",
        "noFileChosen": "Nenhum arquivo escolhido",
        "uploadedImages": "Suas imagens carregadas (esta sessão):",
        "yourUploadedImagesWillAppearHere": "Suas imagens carregadas aparecerão aqui.",
        "uploadedImagesWillAppearHere": "Suas imagens carregadas aparecerão aqui.",
        "filesSelected": "{} arquivo(s) selecionado(s)",

        // Barra de ferramentas e alinhamento
        "layers": "Camadas",
        "bringForward": "Trazer para frente",
        "sendBackward": "Enviar para trás",
        "align": "Alinhar",
        "alignSelected": "Alinhar seleção:",
        "alignLeft": "Alinhar à esquerda",
        "centerHorizontally": "Centralizar horizontalmente",
        "alignRight": "Alinhar à direita",
        "alignTop": "Alinhar no topo",
        "centerVertically": "Centralizar verticalmente",
        "alignBottom": "Alinhar na base",
        "alignToPage": "Alinhar à página:",
        "centerOnPageHorizontally": "Centralizar horizontalmente na página",
        "centerOnPageVertically": "Centralizar verticalmente na página",
        "deleteSelected": "Excluir seleção",

        // Botões de ação
        "generate": "Gerar",
        "newWorksheet": "Nova ficha",
        "answerKey": "Gabarito",
        "download": "Baixar",
        "worksheet": "Ficha de exercícios",
        "worksheetJpeg": "Ficha de exercícios (JPEG)",
        "answerKeyJpeg": "Gabarito (JPEG)",
        "worksheetPdf": "Ficha de exercícios (PDF)",
        "answerKeyPdf": "Gabarito (PDF)",
        "grayscale": "Escala de cinza",
        "clearAll": "Limpar tudo",

        // Mensagens de sucesso
        "worksheetGeneratedSuccessfully": "Ficha de exercícios gerada com sucesso!",
        "answerKeyGenerated": "Gabarito gerado!",
        "allSettingsCleared": "Todas as configurações foram limpas.",
        "puzzleWillGenerateUsing": "O quebra-cabeça será gerado usando o tema '{}'.",
        "customImagesAvailable": "{} imagem(ns) personalizada(s) disponível(is).",
        "jpegDownloadInitiated": "Download de JPEG iniciado!",
        "pdfDownloaded": "PDF baixado!",

        // Mensagens de carregamento
        "searching": "Pesquisando...",
        "loadingTheme": "Carregando tema...",
        "loadingImagesCount": "Carregando {} imagem(ns)...",
        "loadingThemeBorders": "Carregando {} bordas...",
        "loadingThemeBackgrounds": "Carregando {} fundos...",
        "preparingJpeg": "Preparando JPEG...",
        "preparingPdf": "Preparando PDF...",
        "preparingJPEG": "Preparando JPEG...",
        "preparingPDF": "Preparando PDF...",

        // Mensagens de erro
        "pleaseGenerateWorksheetFirst": "Por favor, gere primeiro uma ficha de exercícios.",
        "pleaseGenerateContentFirst": "Por favor, gere primeiro o conteúdo.",
        "themeNeedsMinImages": "O tema '{}' precisa de pelo menos {} imagens.",
        "pleaseWaitForThemes": "Por favor, aguarde o carregamento dos temas...",
        "noImagesSelectedOrAvailable": "Nenhuma imagem selecionada ou disponível para gerar o quebra-cabeça.",
        "failedToPlaceWords": "Falha ao posicionar palavras. Tente uma grade maior ou palavras diferentes.",
        "noImagesFound": "Nenhuma imagem encontrada",
        "maxImagesSelected": "Você pode selecionar no máximo {} imagens.",
        "errorReadingFile": "Erro ao ler o arquivo: {}",
        "noBordersInTheme": "Sem bordas neste tema.",
        "noBackgroundsInTheme": "Sem fundos neste tema.",
        "errorPreparingJpeg": "Erro ao preparar o JPEG.",
        "errorCreatingPdf": "Erro ao criar o PDF.",
        "errorPreparingJPEG": "Erro ao preparar o JPEG.",
        "errorCreatingPDF": "Erro ao criar o PDF.",

        // Marcas d'água e padrões
        "watermarkText": "VERSÃO GRATUITA - LessonCraftStudio.com",
        "watermarkSmall": "VERSÃO GRATUITA",
        "defaultNewText": "Novo texto",
        "puzzle": "Quebra-cabeça",
        "exercise": "Exercício"
    },

    // ==========================================
    // DUTCH / NEDERLANDS
    // ==========================================
    nl: {
        // Metadata en titels
        "app.title": "Woordzoeker generator",
        "worksheetGenerator": "Werkblad generator",

        // Taalinstellingen
        "languageSettings": "Taalinstellingen",
        "selectLanguage": "Selecteer taal:",
        "worksheetContentLanguage": "Werkblad inhoudstaal:",
        "imageLibraryLanguage": "Afbeeldingenbibliotheek taal:",
        "contentLanguageNote": "Afbeeldingsnamen en thema's worden weergegeven in de geselecteerde taal.",
        "imageNamesAndThemesNote": "Afbeeldingsnamen en thema's worden weergegeven in de geselecteerde taal.",

        // Taalnamen
        "lang_en": "Engels",
        "lang_de": "Duits",
        "lang_fr": "Frans",
        "lang_es": "Spaans",
        "lang_it": "Italiaans",
        "lang_pt": "Portugees",
        "lang_nl": "Nederlands",
        "lang_sv": "Zweeds",
        "lang_da": "Deens",
        "lang_no": "Noors",
        "lang_fi": "Fins",

        // Pagina-instellingen
        "pageAndScene": "Pagina en indeling",
        "pageSetup": "Pagina-instelling",
        "pageSize": "Paginaformaat:",
        "letterPortrait": "Letter Staand (8,5×11\")",
        "letterLandscape": "Letter Liggend (11×8,5\")",
        "a4Portrait": "A4 Staand (210×297mm)",
        "a4Landscape": "A4 Liggend (297×210mm)",
        "custom": "Aangepast",
        "widthPx": "Breedte (px):",
        "heightPx": "Hoogte (px):",
        "applySize": "Formaat toepassen",

        // Achtergrondinstellingen
        "background": "Achtergrond",
        "fallbackColor": "Basiskleur:",
        "backgroundTheme": "Achtergrondthema:",
        "noneUseFallbackColor": "Geen (gebruik basiskleur)",
        "selectThemeForBackgrounds": "Selecteer een thema voor achtergronden.",
        "backgroundOpacity": "Achtergrond transparantie:",

        // Randinstellingen
        "border": "Rand",
        "borderTheme": "Randthema:",
        "none": "Geen",
        "common.none": "Geen",
    "none": "Geen",
    "none": "Geen",
        "selectThemeToSeeBorders": "Selecteer een thema om randen te zien.",
        "borderOpacity": "Rand transparantie:",

        // Tekstgereedschappen
        "textTools": "Tekstgereedschappen",
        "addNewText": "Nieuwe tekst toevoegen",
        "content": "Inhoud:",
        "helloPlaceholder": "Hallo!",
        "addText": "Tekst toevoegen",
        "selectedTextProperties": "Eigenschappen geselecteerde tekst",
        "color": "Kleur:",
        "size": "Grootte:",
        "font": "Lettertype:",
        "outlineColor": "Omlijningskleur:",
        "outlineWidth": "Omlijningsbreedte (0-10):",

        // Puzzelinstellingen
        "puzzleSettings": "Puzzelinstellingen",
        "gridSize": "Rastergrootte",
        "rows": "Rijen:",
        "columns": "Kolommen:",
        "puzzleOptions": "Puzzelopties",
        "allowDiagonal": "Diagonale woorden toestaan",
        "allowReverseWords": "Omgekeerde woorden toestaan",
        "showWordList": "Woord-/afbeeldingslijst tonen",
        "showOnlyImages": "Alleen afbeeldingen tonen",
        "showOnlyWords": "Alleen woorden tonen",
        "classicMode": "Klassieke modus (alleen tekst)",

        // Afbeeldingsbibliotheek
        "imageLibrary": "Afbeeldingsbibliotheek",
        "imageSourceForPuzzle": "Afbeeldingsbron voor puzzel",
        "theme": "Thema:",
        "useRandomTheme": "-- Willekeurig thema gebruiken --",
        "individualImageSelection": "Individuele afbeeldingsselectie",
        "filterByTheme": "Filteren op thema:",
        "searchImages": "Zoek afbeeldingen:",
        "searchPlaceholder": "bijv. appel, auto",
        "availableImages": "Beschikbare afbeeldingen (max. 8):",
        "loadingImages": "Afbeeldingen laden...",
        "selectedImages": "Geselecteerde afbeeldingen:",
        "allThemes": "Alle thema's",
        "allThemesRandomly": "Alle thema's (willekeurig)",
        "allThemesForSearch": "Alle thema's (voor zoeken)",

        // Aangepaste afbeeldingen uploaden
        "uploadCustomImages": "Aangepaste afbeeldingen uploaden",
        "selectImagesToUpload": "Selecteer afbeelding(en) om te uploaden:",
        "chooseFiles": "Bestanden kiezen",
        "noFileChosen": "Geen bestand gekozen",
        "uploadedImages": "Uw geüploade afbeeldingen (deze sessie):",
        "yourUploadedImagesWillAppearHere": "Uw geüploade afbeeldingen verschijnen hier.",
        "uploadedImagesWillAppearHere": "Uw geüploade afbeeldingen verschijnen hier.",
        "filesSelected": "{} bestand(en) geselecteerd",

        // Werkbalk en uitlijning
        "layers": "Lagen",
        "bringForward": "Naar voren",
        "sendBackward": "Naar achteren",
        "align": "Uitlijnen",
        "alignSelected": "Selectie uitlijnen:",
        "alignLeft": "Links uitlijnen",
        "centerHorizontally": "Horizontaal centreren",
        "alignRight": "Rechts uitlijnen",
        "alignTop": "Boven uitlijnen",
        "centerVertically": "Verticaal centreren",
        "alignBottom": "Onder uitlijnen",
        "alignToPage": "Uitlijnen op pagina:",
        "centerOnPageHorizontally": "Horizontaal centreren op pagina",
        "centerOnPageVertically": "Verticaal centreren op pagina",
        "deleteSelected": "Selectie verwijderen",

        // Actieknoppen
        "generate": "Genereren",
        "newWorksheet": "Nieuw werkblad",
        "answerKey": "Antwoordsleutel",
        "download": "Downloaden",
        "worksheet": "Werkblad",
        "worksheetJpeg": "Werkblad (JPEG)",
        "answerKeyJpeg": "Antwoordsleutel (JPEG)",
        "worksheetPdf": "Werkblad (PDF)",
        "answerKeyPdf": "Antwoordsleutel (PDF)",
        "grayscale": "Grijstinten",
        "clearAll": "Alles wissen",

        // Succesboodschappen
        "worksheetGeneratedSuccessfully": "Werkblad succesvol gegenereerd!",
        "answerKeyGenerated": "Antwoordsleutel gegenereerd!",
        "allSettingsCleared": "Alle instellingen gewist.",
        "puzzleWillGenerateUsing": "Puzzel wordt gegenereerd met thema '{}'.",
        "customImagesAvailable": "{} aangepaste afbeelding(en) beschikbaar.",
        "jpegDownloadInitiated": "JPEG download gestart!",
        "pdfDownloaded": "PDF gedownload!",

        // Laadberichten
        "searching": "Zoeken...",
        "loadingTheme": "Thema laden...",
        "loadingImagesCount": "{} afbeelding(en) laden...",
        "loadingThemeBorders": "{} randen laden...",
        "loadingThemeBackgrounds": "{} achtergronden laden...",
        "preparingJpeg": "JPEG voorbereiden...",
        "preparingPdf": "PDF voorbereiden...",
        "preparingJPEG": "JPEG voorbereiden...",
        "preparingPDF": "PDF voorbereiden...",

        // Foutmeldingen
        "pleaseGenerateWorksheetFirst": "Genereer eerst een werkblad.",
        "pleaseGenerateContentFirst": "Genereer eerst inhoud.",
        "themeNeedsMinImages": "Thema '{}' heeft minstens {} afbeeldingen nodig.",
        "pleaseWaitForThemes": "Wacht tot de thema's zijn geladen...",
        "noImagesSelectedOrAvailable": "Geen afbeeldingen geselecteerd of beschikbaar om de puzzel te genereren.",
        "failedToPlaceWords": "Kon geen woorden plaatsen. Probeer een groter raster of andere woorden.",
        "noImagesFound": "Geen afbeeldingen gevonden",
        "maxImagesSelected": "U kunt maximaal {} afbeeldingen selecteren.",
        "errorReadingFile": "Fout bij lezen bestand: {}",
        "noBordersInTheme": "Geen randen in dit thema.",
        "noBackgroundsInTheme": "Geen achtergronden in dit thema.",
        "errorPreparingJpeg": "Fout bij voorbereiden JPEG.",
        "errorCreatingPdf": "Fout bij maken PDF.",
        "errorPreparingJPEG": "Fout bij voorbereiden JPEG.",
        "errorCreatingPDF": "Fout bij maken PDF.",

        // Watermerken en standaarden
        "watermarkText": "GRATIS VERSIE - LessonCraftStudio.com",
        "watermarkSmall": "GRATIS VERSIE",
        "defaultNewText": "Nieuwe tekst",
        "puzzle": "Puzzel",
        "exercise": "Oefening"
    },

    // ==========================================
    // SWEDISH / SVENSKA
    // ==========================================
    sv: {
        // Metadata och titlar
        "app.title": "Ordsöksgenerator",
        "worksheetGenerator": "Arbetsbladssgenerator",

        // Språkinställningar
        "languageSettings": "Språkinställningar",
        "selectLanguage": "Välj språk:",
        "worksheetContentLanguage": "Arbetsbladets innehållsspråk:",
        "imageLibraryLanguage": "Bildbiblioteksspråk:",
        "contentLanguageNote": "Bildnamn och teman visas på det valda språket.",
        "imageNamesAndThemesNote": "Bildnamn och teman visas på det valda språket.",

        // Språknamn
        "lang_en": "Engelska",
        "lang_de": "Tyska",
        "lang_fr": "Franska",
        "lang_es": "Spanska",
        "lang_it": "Italienska",
        "lang_pt": "Portugisiska",
        "lang_nl": "Nederländska",
        "lang_sv": "Svenska",
        "lang_da": "Danska",
        "lang_no": "Norska",
        "lang_fi": "Finska",

        // Sidinställningar
        "pageAndScene": "Sida och layout",
        "pageSetup": "Sidinställning",
        "pageSize": "Sidstorlek:",
        "letterPortrait": "Letter stående (8,5×11\")",
        "letterLandscape": "Letter liggande (11×8,5\")",
        "a4Portrait": "A4 stående (210×297mm)",
        "a4Landscape": "A4 liggande (297×210mm)",
        "custom": "Anpassad",
        "widthPx": "Bredd (px):",
        "heightPx": "Höjd (px):",
        "applySize": "Tillämpa storlek",

        // Bakgrundsinställningar
        "background": "Bakgrund",
        "fallbackColor": "Grundfärg:",
        "backgroundTheme": "Bakgrundstema:",
        "noneUseFallbackColor": "Ingen (använd grundfärg)",
        "selectThemeForBackgrounds": "Välj ett tema för bakgrunder.",
        "backgroundOpacity": "Bakgrundsopacitet:",

        // Raminställningar
        "border": "Ram",
        "borderTheme": "Ramtema:",
        "none": "Ingen",
        "common.none": "Ingen",
    "none": "Ingen",
    "none": "Ingen",
        "selectThemeToSeeBorders": "Välj ett tema för att se ramar.",
        "borderOpacity": "Ramopacitet:",

        // Textverktyg
        "textTools": "Textverktyg",
        "addNewText": "Lägg till ny text",
        "content": "Innehåll:",
        "helloPlaceholder": "Hej!",
        "addText": "Lägg till text",
        "selectedTextProperties": "Egenskaper för vald text",
        "color": "Färg:",
        "size": "Storlek:",
        "font": "Typsnitt:",
        "outlineColor": "Konturfärg:",
        "outlineWidth": "Konturbredd (0-10):",

        // Pusselinställningar
        "puzzleSettings": "Pusselinställningar",
        "gridSize": "Rutstorlek",
        "rows": "Rader:",
        "columns": "Kolumner:",
        "puzzleOptions": "Pusselalternativ",
        "allowDiagonal": "Tillåt diagonala ord",
        "allowReverseWords": "Tillåt omvända ord",
        "showWordList": "Visa ord-/bildlista",
        "showOnlyImages": "Visa endast bilder",
        "showOnlyWords": "Visa endast ord",
        "classicMode": "Klassiskt läge (endast text)",

        // Bildbibliotek
        "imageLibrary": "Bildbibliotek",
        "imageSourceForPuzzle": "Bildkälla för pussel",
        "theme": "Tema:",
        "useRandomTheme": "-- Använd slumpmässigt tema --",
        "individualImageSelection": "Individuellt bildval",
        "filterByTheme": "Filtrera efter tema:",
        "searchImages": "Sök bilder:",
        "searchPlaceholder": "t.ex. äpple, bil",
        "availableImages": "Tillgängliga bilder (max 8):",
        "loadingImages": "Laddar bilder...",
        "selectedImages": "Valda bilder:",
        "allThemes": "Alla teman",
        "allThemesRandomly": "Alla teman (slumpmässigt)",
        "allThemesForSearch": "Alla teman (för sökning)",

        // Ladda upp anpassade bilder
        "uploadCustomImages": "Ladda upp anpassade bilder",
        "selectImagesToUpload": "Välj bild(er) att ladda upp:",
        "chooseFiles": "Välj filer",
        "noFileChosen": "Ingen fil vald",
        "uploadedImages": "Dina uppladdade bilder (denna session):",
        "yourUploadedImagesWillAppearHere": "Dina uppladdade bilder visas här.",
        "uploadedImagesWillAppearHere": "Dina uppladdade bilder visas här.",
        "filesSelected": "{} fil(er) valda",

        // Verktygsfält och justering
        "layers": "Lager",
        "bringForward": "Flytta framåt",
        "sendBackward": "Flytta bakåt",
        "align": "Justera",
        "alignSelected": "Justera val:",
        "alignLeft": "Vänsterjustera",
        "centerHorizontally": "Centrera horisontellt",
        "alignRight": "Högerjustera",
        "alignTop": "Justera upptill",
        "centerVertically": "Centrera vertikalt",
        "alignBottom": "Justera nedtill",
        "alignToPage": "Justera till sida:",
        "centerOnPageHorizontally": "Centrera horisontellt på sida",
        "centerOnPageVertically": "Centrera vertikalt på sida",
        "deleteSelected": "Ta bort val",

        // Åtgärdsknappar
        "generate": "Generera",
        "newWorksheet": "Nytt arbetsblad",
        "answerKey": "Facit",
        "download": "Ladda ner",
        "worksheet": "Arbetsblad",
        "worksheetJpeg": "Arbetsblad (JPEG)",
        "answerKeyJpeg": "Facit (JPEG)",
        "worksheetPdf": "Arbetsblad (PDF)",
        "answerKeyPdf": "Facit (PDF)",
        "grayscale": "Gråskala",
        "clearAll": "Rensa allt",

        // Framgångsmeddelanden
        "worksheetGeneratedSuccessfully": "Arbetsblad genererat framgångsrikt!",
        "answerKeyGenerated": "Facit genererat!",
        "allSettingsCleared": "Alla inställningar rensade.",
        "puzzleWillGenerateUsing": "Pusslet kommer att genereras med temat '{}'.",
        "customImagesAvailable": "{} anpassad(e) bild(er) tillgängliga.",
        "jpegDownloadInitiated": "JPEG-nedladdning startad!",
        "pdfDownloaded": "PDF nedladdad!",

        // Laddningsmeddelanden
        "searching": "Söker...",
        "loadingTheme": "Laddar tema...",
        "loadingImagesCount": "Laddar {} bild(er)...",
        "loadingThemeBorders": "Laddar {} ramar...",
        "loadingThemeBackgrounds": "Laddar {} bakgrunder...",
        "preparingJpeg": "Förbereder JPEG...",
        "preparingPdf": "Förbereder PDF...",
        "preparingJPEG": "Förbereder JPEG...",
        "preparingPDF": "Förbereder PDF...",

        // Felmeddelanden
        "pleaseGenerateWorksheetFirst": "Vänligen generera ett arbetsblad först.",
        "pleaseGenerateContentFirst": "Vänligen generera innehåll först.",
        "themeNeedsMinImages": "Temat '{}' behöver minst {} bilder.",
        "pleaseWaitForThemes": "Vänligen vänta medan teman laddas...",
        "noImagesSelectedOrAvailable": "Inga bilder valda eller tillgängliga för att generera pusslet.",
        "failedToPlaceWords": "Kunde inte placera några ord. Prova ett större rutnät eller andra ord.",
        "noImagesFound": "Inga bilder hittades",
        "maxImagesSelected": "Du kan välja maximalt {} bilder.",
        "errorReadingFile": "Fel vid läsning av fil: {}",
        "noBordersInTheme": "Inga ramar i detta tema.",
        "noBackgroundsInTheme": "Inga bakgrunder i detta tema.",
        "errorPreparingJpeg": "Fel vid förberedelse av JPEG.",
        "errorCreatingPdf": "Fel vid skapande av PDF.",
        "errorPreparingJPEG": "Fel vid förberedelse av JPEG.",
        "errorCreatingPDF": "Fel vid skapande av PDF.",

        // Vattenstämplar och standardvärden
        "watermarkText": "GRATIS VERSION - LessonCraftStudio.com",
        "watermarkSmall": "GRATIS VERSION",
        "defaultNewText": "Ny text",
        "puzzle": "Pussel",
        "exercise": "Övning"
    },

    // ==========================================
    // DANISH / DANSK
    // ==========================================
    da: {
        // Metadata og titler
        "app.title": "Ordsøgningsgenerator",
        "worksheetGenerator": "Arbejdsarkgenerator",

        // Sprogindstillinger
        "languageSettings": "Sprogindstillinger",
        "selectLanguage": "Vælg sprog:",
        "worksheetContentLanguage": "Arbejdsarkets indholdssprog:",
        "imageLibraryLanguage": "Billedbibliotekssprog:",
        "contentLanguageNote": "Billednavne og temaer vises på det valgte sprog.",
        "imageNamesAndThemesNote": "Billednavne og temaer vises på det valgte sprog.",

        // Sprognavne
        "lang_en": "Engelsk",
        "lang_de": "Tysk",
        "lang_fr": "Fransk",
        "lang_es": "Spansk",
        "lang_it": "Italiensk",
        "lang_pt": "Portugisisk",
        "lang_nl": "Hollandsk",
        "lang_sv": "Svensk",
        "lang_da": "Dansk",
        "lang_no": "Norsk",
        "lang_fi": "Finsk",

        // Sideindstillinger
        "pageAndScene": "Side og layout",
        "pageSetup": "Sideopsætning",
        "pageSize": "Sidestørrelse:",
        "letterPortrait": "Letter stående (8,5×11\")",
        "letterLandscape": "Letter liggende (11×8,5\")",
        "a4Portrait": "A4 stående (210×297mm)",
        "a4Landscape": "A4 liggende (297×210mm)",
        "custom": "Tilpasset",
        "widthPx": "Bredde (px):",
        "heightPx": "Højde (px):",
        "applySize": "Anvend størrelse",

        // Baggrundsindstillinger
        "background": "Baggrund",
        "fallbackColor": "Grundfarve:",
        "backgroundTheme": "Baggrundstema:",
        "noneUseFallbackColor": "Ingen (brug grundfarve)",
        "selectThemeForBackgrounds": "Vælg et tema for baggrunde.",
        "backgroundOpacity": "Baggrundsgennemsigtighed:",

        // Kantindstillinger
        "border": "Kant",
        "borderTheme": "Kanttema:",
        "none": "Ingen",
        "common.none": "Ingen",
    "none": "Ingen",
    "none": "Ingen",
        "selectThemeToSeeBorders": "Vælg et tema for at se kanter.",
        "borderOpacity": "Kantgennemsigtighed:",

        // Tekstværktøjer
        "textTools": "Tekstværktøjer",
        "addNewText": "Tilføj ny tekst",
        "content": "Indhold:",
        "helloPlaceholder": "Hej!",
        "addText": "Tilføj tekst",
        "selectedTextProperties": "Egenskaber for valgt tekst",
        "color": "Farve:",
        "size": "Størrelse:",
        "font": "Skrifttype:",
        "outlineColor": "Konturfarve:",
        "outlineWidth": "Konturbredde (0-10):",

        // Puslespilsindstillinger
        "puzzleSettings": "Puslespilsindstillinger",
        "gridSize": "Gitterstørrelse",
        "rows": "Rækker:",
        "columns": "Kolonner:",
        "puzzleOptions": "Puslespilsmuligheder",
        "allowDiagonal": "Tillad diagonale ord",
        "allowReverseWords": "Tillad omvendte ord",
        "showWordList": "Vis ord-/billedliste",
        "showOnlyImages": "Vis kun billeder",
        "showOnlyWords": "Vis kun ord",
        "classicMode": "Klassisk tilstand (kun tekst)",

        // Billedbibliotek
        "imageLibrary": "Billedbibliotek",
        "imageSourceForPuzzle": "Billedkilde til puslespil",
        "theme": "Tema:",
        "useRandomTheme": "-- Brug tilfældigt tema --",
        "individualImageSelection": "Individuel billedvalg",
        "filterByTheme": "Filtrer efter tema:",
        "searchImages": "Søg billeder:",
        "searchPlaceholder": "f.eks. æble, bil",
        "availableImages": "Tilgængelige billeder (maks. 8):",
        "loadingImages": "Indlæser billeder...",
        "selectedImages": "Valgte billeder:",
        "allThemes": "Alle temaer",
        "allThemesRandomly": "Alle temaer (tilfældigt)",
        "allThemesForSearch": "Alle temaer (til søgning)",

        // Upload tilpassede billeder
        "uploadCustomImages": "Upload tilpassede billeder",
        "selectImagesToUpload": "Vælg billede(r) til upload:",
        "chooseFiles": "Vælg filer",
        "noFileChosen": "Ingen fil valgt",
        "uploadedImages": "Dine uploadede billeder (denne session):",
        "yourUploadedImagesWillAppearHere": "Dine uploadede billeder vises her.",
        "uploadedImagesWillAppearHere": "Dine uploadede billeder vises her.",
        "filesSelected": "{} fil(er) valgt",

        // Værktøjslinje og justering
        "layers": "Lag",
        "bringForward": "Flyt fremad",
        "sendBackward": "Flyt bagud",
        "align": "Juster",
        "alignSelected": "Juster valgte:",
        "alignLeft": "Venstrejuster",
        "centerHorizontally": "Centrer vandret",
        "alignRight": "Højrejuster",
        "alignTop": "Juster øverst",
        "centerVertically": "Centrer lodret",
        "alignBottom": "Juster nederst",
        "alignToPage": "Juster til side:",
        "centerOnPageHorizontally": "Centrer vandret på side",
        "centerOnPageVertically": "Centrer lodret på side",
        "deleteSelected": "Slet valgte",

        // Handlingsknapper
        "generate": "Generer",
        "newWorksheet": "Nyt arbejdsark",
        "answerKey": "Løsningsnøgle",
        "download": "Download",
        "worksheet": "Arbejdsark",
        "worksheetJpeg": "Arbejdsark (JPEG)",
        "answerKeyJpeg": "Løsningsnøgle (JPEG)",
        "worksheetPdf": "Arbejdsark (PDF)",
        "answerKeyPdf": "Løsningsnøgle (PDF)",
        "grayscale": "Gråtoneskala",
        "clearAll": "Ryd alt",

        // Succesbeskeder
        "worksheetGeneratedSuccessfully": "Arbejdsark genereret med succes!",
        "answerKeyGenerated": "Løsningsnøgle genereret!",
        "allSettingsCleared": "Alle indstillinger ryddet.",
        "puzzleWillGenerateUsing": "Puslespillet genereres med temaet '{}'.",
        "customImagesAvailable": "{} tilpasset(e) billede(r) tilgængelige.",
        "jpegDownloadInitiated": "JPEG-download startet!",
        "pdfDownloaded": "PDF downloadet!",

        // Indlæsningsbeskeder
        "searching": "Søger...",
        "loadingTheme": "Indlæser tema...",
        "loadingImagesCount": "Indlæser {} billede(r)...",
        "loadingThemeBorders": "Indlæser {} kanter...",
        "loadingThemeBackgrounds": "Indlæser {} baggrunde...",
        "preparingJpeg": "Forbereder JPEG...",
        "preparingPdf": "Forbereder PDF...",
        "preparingJPEG": "Forbereder JPEG...",
        "preparingPDF": "Forbereder PDF...",

        // Fejlbeskeder
        "pleaseGenerateWorksheetFirst": "Generer venligst et arbejdsark først.",
        "pleaseGenerateContentFirst": "Generer venligst indhold først.",
        "themeNeedsMinImages": "Temaet '{}' kræver mindst {} billeder.",
        "pleaseWaitForThemes": "Vent venligst på at temaerne indlæses...",
        "noImagesSelectedOrAvailable": "Ingen billeder valgt eller tilgængelige til at generere puslespillet.",
        "failedToPlaceWords": "Kunne ikke placere ord. Prøv et større gitter eller andre ord.",
        "noImagesFound": "Ingen billeder fundet",
        "maxImagesSelected": "Du kan vælge maksimalt {} billeder.",
        "errorReadingFile": "Fejl ved læsning af fil: {}",
        "noBordersInTheme": "Ingen kanter i dette tema.",
        "noBackgroundsInTheme": "Ingen baggrunde i dette tema.",
        "errorPreparingJpeg": "Fejl ved forberedelse af JPEG.",
        "errorCreatingPdf": "Fejl ved oprettelse af PDF.",
        "errorPreparingJPEG": "Fejl ved forberedelse af JPEG.",
        "errorCreatingPDF": "Fejl ved oprettelse af PDF.",

        // Vandmærker og standarder
        "watermarkText": "GRATIS VERSION - LessonCraftStudio.com",
        "watermarkSmall": "GRATIS VERSION",
        "defaultNewText": "Ny tekst",
        "puzzle": "Puslespil",
        "exercise": "Øvelse"
    },

    // ==========================================
    // NORWEGIAN / NORSK
    // ==========================================
    no: {
        // Metadata og titler
        "app.title": "Ordsøkgenerator",
        "worksheetGenerator": "Arbeidsarkgenerator",

        // Språkinnstillinger
        "languageSettings": "Språkinnstillinger",
        "selectLanguage": "Velg språk:",
        "worksheetContentLanguage": "Arbeidsarkets innholdsspråk:",
        "imageLibraryLanguage": "Bildbiblioteksspråk:",
        "contentLanguageNote": "Bildenavn og temaer vises på det valgte språket.",
        "imageNamesAndThemesNote": "Bildenavn og temaer vises på det valgte språket.",

        // Språknavn
        "lang_en": "Engelsk",
        "lang_de": "Tysk",
        "lang_fr": "Fransk",
        "lang_es": "Spansk",
        "lang_it": "Italiensk",
        "lang_pt": "Portugisisk",
        "lang_nl": "Nederlandsk",
        "lang_sv": "Svensk",
        "lang_da": "Dansk",
        "lang_no": "Norsk",
        "lang_fi": "Finsk",

        // Sideinnstillinger
        "pageAndScene": "Side og oppsett",
        "pageSetup": "Sideoppsett",
        "pageSize": "Sidestørrelse:",
        "letterPortrait": "Letter stående (8,5×11\")",
        "letterLandscape": "Letter liggende (11×8,5\")",
        "a4Portrait": "A4 stående (210×297mm)",
        "a4Landscape": "A4 liggende (297×210mm)",
        "custom": "Tilpasset",
        "widthPx": "Bredde (px):",
        "heightPx": "Høyde (px):",
        "applySize": "Bruk størrelse",

        // Bakgrunnsinnstillinger
        "background": "Bakgrunn",
        "fallbackColor": "Grunnfarge:",
        "backgroundTheme": "Bakgrunnstema:",
        "noneUseFallbackColor": "Ingen (bruk grunnfarge)",
        "selectThemeForBackgrounds": "Velg et tema for bakgrunner.",
        "backgroundOpacity": "Bakgrunnssynlighet:",

        // Kantinnstillinger
        "border": "Ramme",
        "borderTheme": "Rammetema:",
        "none": "Ingen",
        "common.none": "Ingen",
    "none": "Ingen",
    "none": "Ingen",
        "selectThemeToSeeBorders": "Velg et tema for å se rammer.",
        "borderOpacity": "Rammesynlighet:",

        // Tekstverktøy
        "textTools": "Tekstverktøy",
        "addNewText": "Legg til ny tekst",
        "content": "Innhold:",
        "helloPlaceholder": "Hei!",
        "addText": "Legg til tekst",
        "selectedTextProperties": "Egenskaper for valgt tekst",
        "color": "Farge:",
        "size": "Størrelse:",
        "font": "Skrifttype:",
        "outlineColor": "Konturfarr:",
        "outlineWidth": "Konturbredde (0-10):",

        // Puslespillinnstillinger
        "puzzleSettings": "Puslespillinnstillinger",
        "gridSize": "Rutenettstørrelse",
        "rows": "Rader:",
        "columns": "Kolonner:",
        "puzzleOptions": "Puslespillalternativer",
        "allowDiagonal": "Tillat diagonale ord",
        "allowReverseWords": "Tillat baklengs ord",
        "showWordList": "Vis ord-/bildeliste",
        "showOnlyImages": "Vis kun bilder",
        "showOnlyWords": "Vis kun ord",
        "classicMode": "Klassisk modus (kun tekst)",

        // Bildebibliotek
        "imageLibrary": "Bildebibliotek",
        "imageSourceForPuzzle": "Bildekilde for puslespill",
        "theme": "Tema:",
        "useRandomTheme": "-- Bruk tilfeldig tema --",
        "individualImageSelection": "Individuelt bildevalg",
        "filterByTheme": "Filtrer etter tema:",
        "searchImages": "Søk bilder:",
        "searchPlaceholder": "f.eks. eple, bil",
        "availableImages": "Tilgjengelige bilder (maks. 8):",
        "loadingImages": "Laster bilder...",
        "selectedImages": "Valgte bilder:",
        "allThemes": "Alle temaer",
        "allThemesRandomly": "Alle temaer (tilfeldig)",
        "allThemesForSearch": "Alle temaer (for søk)",

        // Last opp egne bilder
        "uploadCustomImages": "Last opp egne bilder",
        "selectImagesToUpload": "Velg bilde(r) å laste opp:",
        "chooseFiles": "Velg filer",
        "noFileChosen": "Ingen fil valgt",
        "uploadedImages": "Dine opplastede bilder (denne økten):",
        "yourUploadedImagesWillAppearHere": "Dine opplastede bilder vises her.",
        "uploadedImagesWillAppearHere": "Dine opplastede bilder vises her.",
        "filesSelected": "{} fil(er) valgt",

        // Verktøylinje og justering
        "layers": "Lag",
        "bringForward": "Flytt fremover",
        "sendBackward": "Flytt bakover",
        "align": "Juster",
        "alignSelected": "Juster valgte:",
        "alignLeft": "Venstrejuster",
        "centerHorizontally": "Sentrer horisontalt",
        "alignRight": "Høyrejuster",
        "alignTop": "Juster øverst",
        "centerVertically": "Sentrer vertikalt",
        "alignBottom": "Juster nederst",
        "alignToPage": "Juster til side:",
        "centerOnPageHorizontally": "Sentrer horisontalt på side",
        "centerOnPageVertically": "Sentrer vertikalt på side",
        "deleteSelected": "Slett valgte",

        // Handlingsknapper
        "generate": "Generer",
        "newWorksheet": "Nytt arbeidsark",
        "answerKey": "Fasit",
        "download": "Last ned",
        "worksheet": "Arbeidsark",
        "worksheetJpeg": "Arbeidsark (JPEG)",
        "answerKeyJpeg": "Fasit (JPEG)",
        "worksheetPdf": "Arbeidsark (PDF)",
        "answerKeyPdf": "Fasit (PDF)",
        "grayscale": "Gråtoner",
        "clearAll": "Tøm alt",

        // Suksessmeldinger
        "worksheetGeneratedSuccessfully": "Arbeidsark generert vellykket!",
        "answerKeyGenerated": "Fasit generert!",
        "allSettingsCleared": "Alle innstillinger tømt.",
        "puzzleWillGenerateUsing": "Puslespillet vil genereres med temaet '{}'.",
        "customImagesAvailable": "{} egendefinert(e) bilde(r) tilgjengelig.",
        "jpegDownloadInitiated": "JPEG-nedlasting startet!",
        "pdfDownloaded": "PDF lastet ned!",

        // Lastemeldinger
        "searching": "Søker...",
        "loadingTheme": "Laster tema...",
        "loadingImagesCount": "Laster {} bilde(r)...",
        "loadingThemeBorders": "Laster {} rammer...",
        "loadingThemeBackgrounds": "Laster {} bakgrunner...",
        "preparingJpeg": "Forbereder JPEG...",
        "preparingPdf": "Forbereder PDF...",
        "preparingJPEG": "Forbereder JPEG...",
        "preparingPDF": "Forbereder PDF...",

        // Feilmeldinger
        "pleaseGenerateWorksheetFirst": "Vennligst generer et arbeidsark først.",
        "pleaseGenerateContentFirst": "Vennligst generer innhold først.",
        "themeNeedsMinImages": "Temaet '{}' trenger minst {} bilder.",
        "pleaseWaitForThemes": "Vennligst vent på at temaene lastes...",
        "noImagesSelectedOrAvailable": "Ingen bilder valgt eller tilgjengelige for å generere puslespillet.",
        "failedToPlaceWords": "Kunne ikke plassere ord. Prøv et større rutenett eller andre ord.",
        "noImagesFound": "Ingen bilder funnet",
        "maxImagesSelected": "Du kan velge maksimalt {} bilder.",
        "errorReadingFile": "Feil ved lesing av fil: {}",
        "noBordersInTheme": "Ingen rammer i dette temaet.",
        "noBackgroundsInTheme": "Ingen bakgrunner i dette temaet.",
        "errorPreparingJpeg": "Feil ved forberedelse av JPEG.",
        "errorCreatingPdf": "Feil ved opprettelse av PDF.",
        "errorPreparingJPEG": "Feil ved forberedelse av JPEG.",
        "errorCreatingPDF": "Feil ved opprettelse av PDF.",

        // Vannmerker og standarder
        "watermarkText": "GRATIS VERSJON - LessonCraftStudio.com",
        "watermarkSmall": "GRATIS VERSJON",
        "defaultNewText": "Ny tekst",
        "puzzle": "Puslespill",
        "exercise": "Øvelse"
    },

    // ==========================================
    // FINNISH / SUOMI
    // ==========================================
    fi: {
        // Metadata ja otsikot
        "app.title": "Sanaristikkogeneraattori",
        "worksheetGenerator": "Tehtäväpaperigeneraattori",

        // Kieliasetukset
        "languageSettings": "Kieliasetukset",
        "selectLanguage": "Valitse kieli:",
        "worksheetContentLanguage": "Tehtäväpaperin sisältökieli:",
        "imageLibraryLanguage": "Kuvakirjaston kieli:",
        "contentLanguageNote": "Kuvien nimet ja teemat näytetään valitulla kielellä.",
        "imageNamesAndThemesNote": "Kuvien nimet ja teemat näytetään valitulla kielellä.",

        // Kielten nimet
        "lang_en": "Englanti",
        "lang_de": "Saksa",
        "lang_fr": "Ranska",
        "lang_es": "Espanja",
        "lang_it": "Italia",
        "lang_pt": "Portugali",
        "lang_nl": "Hollanti",
        "lang_sv": "Ruotsi",
        "lang_da": "Tanska",
        "lang_no": "Norja",
        "lang_fi": "Suomi",

        // Sivuasetukset
        "pageAndScene": "Sivu ja asettelu",
        "pageSetup": "Sivun asetukset",
        "pageSize": "Sivukoko:",
        "letterPortrait": "Letter pysty (8,5×11\")",
        "letterLandscape": "Letter vaaka (11×8,5\")",
        "a4Portrait": "A4 pysty (210×297mm)",
        "a4Landscape": "A4 vaaka (297×210mm)",
        "custom": "Mukautettu",
        "widthPx": "Leveys (px):",
        "heightPx": "Korkeus (px):",
        "applySize": "Käytä kokoa",

        // Tausta-asetukset
        "background": "Tausta",
        "fallbackColor": "Perusväri:",
        "backgroundTheme": "Taustateema:",
        "noneUseFallbackColor": "Ei mitään (käytä perusväriä)",
        "selectThemeForBackgrounds": "Valitse teema taustoille.",
        "backgroundOpacity": "Taustan läpinäkyvyys:",

        // Reunusasetukset
        "border": "Reunus",
        "borderTheme": "Reunusteema:",
        "none": "Ei mitään",
        "common.none": "Ei mitään",
    "none": "Ei mitään",
    "none": "Ei mitään",
        "selectThemeToSeeBorders": "Valitse teema nähdäksesi reunukset.",
        "borderOpacity": "Reunuksen läpinäkyvyys:",

        // Tekstityökalut
        "textTools": "Tekstityökalut",
        "addNewText": "Lisää uusi teksti",
        "content": "Sisältö:",
        "helloPlaceholder": "Hei!",
        "addText": "Lisää teksti",
        "selectedTextProperties": "Valitun tekstin ominaisuudet",
        "color": "Väri:",
        "size": "Koko:",
        "font": "Fontti:",
        "outlineColor": "Ääriviivan väri:",
        "outlineWidth": "Ääriviivan leveys (0-10):",

        // Pulma-asetukset
        "puzzleSettings": "Pulma-asetukset",
        "gridSize": "Ruudukon koko",
        "rows": "Rivit:",
        "columns": "Sarakkeet:",
        "puzzleOptions": "Pulmavaihtoehdot",
        "allowDiagonal": "Salli vinosanat",
        "allowReverseWords": "Salli käänteissanat",
        "showWordList": "Näytä sana-/kuvalista",
        "showOnlyImages": "Näytä vain kuvat",
        "showOnlyWords": "Näytä vain sanat",
        "classicMode": "Klassinen tila (vain teksti)",

        // Kuvakirjasto
        "imageLibrary": "Kuvakirjasto",
        "imageSourceForPuzzle": "Kuvalähde pulmalle",
        "theme": "Teema:",
        "useRandomTheme": "-- Käytä satunnaista teemaa --",
        "individualImageSelection": "Yksittäinen kuvanvalinta",
        "filterByTheme": "Suodata teeman mukaan:",
        "searchImages": "Etsi kuvia:",
        "searchPlaceholder": "esim. omena, auto",
        "availableImages": "Saatavilla olevat kuvat (max. 8):",
        "loadingImages": "Ladataan kuvia...",
        "selectedImages": "Valitut kuvat:",
        "allThemes": "Kaikki teemat",
        "allThemesRandomly": "Kaikki teemat (satunnaisesti)",
        "allThemesForSearch": "Kaikki teemat (hakua varten)",

        // Lataa mukautettuja kuvia
        "uploadCustomImages": "Lataa mukautettuja kuvia",
        "selectImagesToUpload": "Valitse ladattava(t) kuva(t):",
        "chooseFiles": "Valitse tiedostot",
        "noFileChosen": "Ei valittua tiedostoa",
        "uploadedImages": "Ladatut kuvasi (tämä istunto):",
        "yourUploadedImagesWillAppearHere": "Ladatut kuvasi näkyvät täällä.",
        "uploadedImagesWillAppearHere": "Ladatut kuvasi näkyvät täällä.",
        "filesSelected": "{} tiedosto(a) valittu",

        // Työkalupalkki ja kohdistus
        "layers": "Tasot",
        "bringForward": "Tuo eteen",
        "sendBackward": "Vie taakse",
        "align": "Kohdista",
        "alignSelected": "Kohdista valittu:",
        "alignLeft": "Tasaa vasemmalle",
        "centerHorizontally": "Keskitä vaakasuunnassa",
        "alignRight": "Tasaa oikealle",
        "alignTop": "Tasaa ylös",
        "centerVertically": "Keskitä pystysuunnassa",
        "alignBottom": "Tasaa alas",
        "alignToPage": "Kohdista sivulle:",
        "centerOnPageHorizontally": "Keskitä sivulle vaakasuunnassa",
        "centerOnPageVertically": "Keskitä sivulle pystysuunnassa",
        "deleteSelected": "Poista valittu",

        // Toimintopainikkeet
        "generate": "Luo",
        "newWorksheet": "Uusi tehtäväpaperi",
        "answerKey": "Vastausavain",
        "download": "Lataa",
        "worksheet": "Tehtäväpaperi",
        "worksheetJpeg": "Tehtäväpaperi (JPEG)",
        "answerKeyJpeg": "Vastausavain (JPEG)",
        "worksheetPdf": "Tehtäväpaperi (PDF)",
        "answerKeyPdf": "Vastausavain (PDF)",
        "grayscale": "Harmaasävy",
        "clearAll": "Tyhjennä kaikki",

        // Onnistumisviestit
        "worksheetGeneratedSuccessfully": "Tehtäväpaperi luotu onnistuneesti!",
        "answerKeyGenerated": "Vastausavain luotu!",
        "allSettingsCleared": "Kaikki asetukset tyhjennetty.",
        "puzzleWillGenerateUsing": "Pulma luodaan teemalla '{}'.",
        "customImagesAvailable": "{} mukautettu(a) kuva(a) saatavilla.",
        "jpegDownloadInitiated": "JPEG-lataus aloitettu!",
        "pdfDownloaded": "PDF ladattu!",

        // Latausviestit
        "searching": "Etsitään...",
        "loadingTheme": "Ladataan teemaa...",
        "loadingImagesCount": "Ladataan {} kuva(a)...",
        "loadingThemeBorders": "Ladataan {} reunusta...",
        "loadingThemeBackgrounds": "Ladataan {} taustaa...",
        "preparingJpeg": "Valmistellaan JPEG...",
        "preparingPdf": "Valmistellaan PDF...",
        "preparingJPEG": "Valmistellaan JPEG...",
        "preparingPDF": "Valmistellaan PDF...",

        // Virheviestit
        "pleaseGenerateWorksheetFirst": "Luo ensin tehtäväpaperi.",
        "pleaseGenerateContentFirst": "Luo ensin sisältö.",
        "themeNeedsMinImages": "Teema '{}' tarvitsee vähintään {} kuvaa.",
        "pleaseWaitForThemes": "Odota kunnes teemat on ladattu...",
        "noImagesSelectedOrAvailable": "Ei valittuja tai saatavilla olevia kuvia pulman luomiseen.",
        "failedToPlaceWords": "Sanojen sijoitus epäonnistui. Kokeile suurempaa ruudukkoa tai eri sanoja.",
        "noImagesFound": "Kuvia ei löytynyt",
        "maxImagesSelected": "Voit valita enintään {} kuvaa.",
        "errorReadingFile": "Virhe tiedostoa luettaessa: {}",
        "noBordersInTheme": "Ei reunuksia tässä teemassa.",
        "noBackgroundsInTheme": "Ei taustoja tässä teemassa.",
        "errorPreparingJpeg": "Virhe JPEG:n valmistelussa.",
        "errorCreatingPdf": "Virhe PDF:n luomisessa.",
        "errorPreparingJPEG": "Virhe JPEG:n valmistelussa.",
        "errorCreatingPDF": "Virhe PDF:n luomisessa.",

        // Vesileimät ja oletusarvot
        "watermarkText": "ILMAINEN VERSIO - LessonCraftStudio.com",
        "watermarkSmall": "ILMAINEN VERSIO",
        "defaultNewText": "Uusi teksti",
        "puzzle": "Pulma",
        "exercise": "Harjoitus"
    }
};

// Export for use in wordsearch.html
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}