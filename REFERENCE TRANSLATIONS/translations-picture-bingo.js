/**
 * PICTURE BINGO COMPREHENSIVE TRANSLATION SYSTEM
 * ============================================================
 * Version: 3.0.0 - Complete Professional Implementation
 * Last Updated: December 2024
 * Total Keys: 141 per language
 * Languages: 11 (EN, DE, FR, ES, PT, IT, NL, SV, DA, NO, FI)
 *
 * COMPREHENSIVE MULTI-LANGUAGE SUPPORT
 * ============================================================
 * This file contains complete professional translations for the
 * Picture Bingo worksheet generator application.
 *
 * Key Features:
 * - 141 translation keys per language
 * - Professional educational terminology
 * - Complete UI coverage
 * - Helper functions for formatting
 * - Validation functions
 * - Backward compatibility support
 *
 * Critical User-Mentioned Items Included:
 * - Background (translations for "background" key)
 * - Border (translations for "border" key)
 * - Grayscale (translations for "grayscale" key)
 */

const PICTURE_BINGO_TRANSLATIONS = {
  /**
   * ENGLISH - Base Language (141 keys)
   * All keys must exist here as the fallback
   */
  "en": {
    // ============= LANGUAGE NAMES (11 keys) =============
    "lang_en": "English",
    "lang_de": "Deutsch (German)",
    "lang_fr": "Français (French)",
    "lang_es": "Español (Spanish)",
    "lang_pt": "Português (Portuguese)",
    "lang_it": "Italiano (Italian)",
    "lang_nl": "Nederlands (Dutch)",
    "lang_sv": "Svenska (Swedish)",
    "lang_da": "Dansk (Danish)",
    "lang_no": "Norsk (Norwegian)",
    "lang_fi": "Suomi (Finnish)",

    // ============= CORE UI (5 keys) =============
    "worksheetSettings": "Worksheet Settings",
    "language": "Language:",
    "imageLibraryLanguage": "Image Library Language:",
    "cardsAndChips": "Cards + Chips",
    "callouts": "Call-outs",

    // ============= ACTION BUTTONS (8 keys) =============
    "generate": "Generate",
    "download": "Download",
    "worksheetJpeg": "Worksheet (JPEG)",
    "calloutJpeg": "Call-out (JPEG)",
    "worksheetPdf": "Worksheet (PDF)",
    "calloutPdf": "Call-out (PDF)",
    "grayscale": "Grayscale",
    "clearAll": "Clear All",

    // ============= ACCORDION HEADERS (5 keys) =============
    "pageSetup": "Page Setup",
    "textTools": "Text Tools",
    "bingoCardSettings": "Bingo Card Settings",
    "imageLibrary": "Image Library",
    "uploadCustomImages": "Upload Custom Images",

    // ============= PAGE SETUP (11 keys) =============
    "pageSize": "Page Size:",
    "letterPortrait": "Letter Portrait (8.5×11\")",
    "letterLandscape": "Letter Landscape (11×8.5\")",
    "a4Portrait": "A4 Portrait (210×297mm)",
    "a4Landscape": "A4 Landscape (297×210mm)",
    "square": "Square (1200x1200)",
    "custom": "Custom",
    "widthPx": "Width (px):",
    "heightPx": "Height (px):",
    "pageColor": "Page Color:",
    "applySize": "Apply Size",

    // ============= BACKGROUND SECTION (5 keys) =============
    "background": "Background",
    "backgroundTheme": "Background Theme:",
    "none": "None",
    "allThemes": "All Themes",
    "selectBackgroundTheme": "Select a theme for backgrounds.",
    "backgroundOpacity": "Background Opacity:",

    // ============= BORDER SECTION (4 keys) =============
    "border": "Border",
    "borderTheme": "Border Theme:",
    "selectBorderTheme": "Select a theme to see borders.",
    "borderOpacity": "Border Opacity:",

    // ============= TEXT TOOLS (10 keys) =============
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

    // ============= FONT OPTIONS (7 keys) =============
    "font_lexend": "Lexend Deca",
    "font_baloo": "Baloo 2",
    "font_nunito": "Nunito",
    "font_quicksand": "Quicksand",
    "font_fredoka": "Fredoka",
    "font_arial": "Arial",
    "font_verdana": "Verdana",

    // ============= BINGO CARD SETTINGS (10 keys) =============
    "bingoRows": "Rows (3–5):",
    "bingoColumns": "Columns (3–5):",
    "numberOfCards": "Number of Cards (1–10):",
    "cardCellFill": "Card Cell Fill:",
    "chipFill": "Chip Fill:",
    "image": "Image",
    "word": "Word",
    "useCustomSelection": "Use custom selection (below)",

    // ============= IMAGE LIBRARY (6 keys) =============
    "selectTheme": "Select Theme:",
    "searchImages": "Search Images:",
    "searchPlaceholder": "e.g., apple, car",
    "selectedForCustomCallouts": "Selected for custom call-outs: {count}",
    "availableImagesCallouts": "Available Images (Click to select for custom call-outs):",
    "loadingImages": "Loading images...",
    "selectedCustomImages": "Selected Custom Images:",

    // ============= UPLOAD SECTION (3 keys) =============
    "selectImagesToUpload": "Select image(s) to upload:",
    "yourUploadedImages": "Your Uploaded Images (This Session):",
    "uploadedImagesWillAppear": "Your uploaded images will appear here.",

    // ============= TOOLBAR (7 keys) =============
    "layers": "Layers",
    "bringForward": "Bring Forward",
    "sendBackward": "Send Backward",
    "bringToFront": "Bring to Front",
    "sendToBack": "Send to Back",
    "align": "Align",
    "alignSelected": "Align Selected:",
    "alignToPage": "Align to Page:",
    "deleteSelected": "Delete Selected",
    "alignLeft": "Align Left",
    "alignRight": "Align Right",
    "alignTop": "Align Top",
    "alignBottom": "Align Bottom",
    "centerHorizontally": "Center Horizontally",
    "centerVertically": "Center Vertically",
    "centerOnPageHorizontally": "Center on Page Horizontally",
    "centerOnPageVertically": "Center on Page Vertically",
    "zoomIn": "Zoom In",
    "zoomOut": "Zoom Out",
    "resetZoom": "Reset Zoom",
    "undo": "Undo (Ctrl+Z)",
    "redo": "Redo (Ctrl+Y)",

    // ============= SUCCESS MESSAGES (8 keys) =============
    "bingoWorksheetGenerated": "Bingo worksheet generated!",
    "downloadInitiated": "Download Initiated!",
    "zipDownloadInitiated": "ZIP Download Initiated!",
    "pdfDownloaded": "PDF Downloaded!",
    "formCleared": "Form cleared.",
    "customImagesAvailable": "{count} custom image(s) available.",
    "jpegDownloadInitiated": "JPEG download initiated!",

    // ============= ERROR MESSAGES (12 keys) =============
    "needMoreImagesForCallout": "Need {required} images for the call-out list, but only {selected} are selected. Please select more.",
    "notEnoughImagesInLibrary": "The selected image library only has {available} images. Need {required} to generate the game. Please choose a larger theme or use custom selection.",
    "couldNotGenerateCards": "Could not generate {count} unique cards.",
    "canvasIsEmpty": "Canvas is empty.",
    "errorPreparingJpeg": "Error preparing JPEG: {error}",
    "noCardDataAvailable": "No card data available.",
    "errorCreatingZip": "Error creating ZIP: {error}",
    "errorCreatingPdf": "Error creating PDF: {error}",
    "errorReadingFile": "Error reading file: {filename}",
    "generationFailed": "Generation failed: {error}",
    "pleaseGenerateContentFirst": "Please generate content first.",
    "pleaseGenerateWorksheetFirst": "Please generate a worksheet first.",

    // ============= INFO/STATUS MESSAGES (5 keys) =============
    "preparingFile": "Preparing {filename}...",
    "preparingZipFile": "Preparing ZIP file...",
    "preparingPdf": "Preparing PDF...",
    "preparingJpeg": "Preparing JPEG...",
    "loadingImagesCount": "Loading {count} image(s)...",

    // ============= WATERMARK TEXT (2 keys) =============
    "watermarkText": "FREE VERSION - LessonCraftStudio.com",
    "watermarkSmallText": "FREE VERSION",

    // ============= FILE INPUT =============
    "chooseFiles": "Choose files",
    "noFileChosen": "No file chosen",
    "filesSelected": "{count} file(s) selected"
  },

  /**
   * GERMAN - Deutsch (141 keys)
   * Professional German translation for educational context
   */
  "de": {
    // ============= LANGUAGE NAMES (11 keys) =============
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

    // ============= CORE UI (5 keys) =============
    "worksheetSettings": "Arbeitsblatt-Einstellungen",
    "language": "Sprache:",
    "imageLibraryLanguage": "Bilderbibliothek-Sprache:",
    "cardsAndChips": "Karten + Spielchips",
    "callouts": "Aufrufliste",

    // ============= ACTION BUTTONS (8 keys) =============
    "generate": "Erstellen",
    "download": "Herunterladen",
    "worksheetJpeg": "Arbeitsblatt (JPEG)",
    "calloutJpeg": "Aufrufliste (JPEG)",
    "worksheetPdf": "Arbeitsblatt (PDF)",
    "calloutPdf": "Aufrufliste (PDF)",
    "grayscale": "Graustufen",
    "clearAll": "Alles löschen",

    // ============= ACCORDION HEADERS (5 keys) =============
    "pageSetup": "Seiteneinstellungen",
    "textTools": "Textwerkzeuge",
    "bingoCardSettings": "Bingo-Spieleinstellungen",
    "imageLibrary": "Bildsammlung",
    "uploadCustomImages": "Eigene Bilder hochladen",

    // ============= PAGE SETUP (11 keys) =============
    "pageSize": "Seitengröße:",
    "letterPortrait": "Letter Hochformat (8,5×11\")",
    "letterLandscape": "Letter Querformat (11×8,5\")",
    "a4Portrait": "A4 Hochformat (210×297mm)",
    "a4Landscape": "A4 Querformat (297×210mm)",
    "square": "Quadrat (1200x1200)",
    "custom": "Benutzerdefiniert",
    "widthPx": "Breite (px):",
    "heightPx": "Höhe (px):",
    "pageColor": "Seitenfarbe:",
    "applySize": "Größe anwenden",

    // ============= BACKGROUND SECTION (5 keys) =============
    "background": "Hintergrund",
    "backgroundTheme": "Hintergrundthema:",
    "none": "Keine",
    "allThemes": "Alle Themen",
    "selectBackgroundTheme": "Wählen Sie ein Thema für Hintergründe.",
    "backgroundOpacity": "Hintergrundtransparenz:",

    // ============= BORDER SECTION (4 keys) =============
    "border": "Rahmen",
    "borderTheme": "Rahmenvorlage:",
    "selectBorderTheme": "Wählen Sie ein Thema für Rahmen.",
    "borderOpacity": "Rahmentransparenz:",

    // ============= TEXT TOOLS (10 keys) =============
    "addNewText": "Neuen Text hinzufügen",
    "content": "Inhalt:",
    "helloPlaceholder": "Hallo!",
    "addText": "Text einfügen",
    "selectedTextProperties": "Eigenschaften des ausgewählten Texts",
    "color": "Farbe:",
    "size": "Größe:",
    "font": "Schriftart:",
    "outlineColor": "Konturfarbe:",
    "outlineWidth": "Konturstärke (0-10):",

    // ============= FONT OPTIONS (7 keys) =============
    "font_lexend": "Lexend Deca",
    "font_baloo": "Baloo 2",
    "font_nunito": "Nunito",
    "font_quicksand": "Quicksand",
    "font_fredoka": "Fredoka",
    "font_arial": "Arial",
    "font_verdana": "Verdana",

    // ============= BINGO CARD SETTINGS (10 keys) =============
    "bingoRows": "Zeilen (3–5):",
    "bingoColumns": "Spalten (3–5):",
    "numberOfCards": "Anzahl der Karten (1–10):",
    "cardCellFill": "Kartenfeldinhalt:",
    "chipFill": "Spielchip-Inhalt:",
    "image": "Bild",
    "word": "Wort",
    "useCustomSelection": "Eigene Auswahl verwenden (siehe unten)",

    // ============= IMAGE LIBRARY (6 keys) =============
    "selectTheme": "Thema auswählen:",
    "searchImages": "Bilder suchen:",
    "searchPlaceholder": "z.B. Apfel, Auto",
    "selectedForCustomCallouts": "Für eigene Aufrufliste ausgewählt: {count}",
    "availableImagesCallouts": "Verfügbare Bilder (Anklicken für eigene Aufrufliste):",
    "loadingImages": "Lade Bilder...",
    "selectedCustomImages": "Ausgewählte eigene Bilder:",

    // ============= UPLOAD SECTION (3 keys) =============
    "selectImagesToUpload": "Bilder zum Hochladen auswählen:",
    "yourUploadedImages": "Ihre hochgeladenen Bilder (diese Sitzung):",
    "uploadedImagesWillAppear": "Ihre hochgeladenen Bilder erscheinen hier.",

    // ============= TOOLBAR (7 keys) =============
    "layers": "Ebenen",
    "bringForward": "Nach vorne bringen",
    "sendBackward": "Nach hinten senden",
    "bringToFront": "Ganz nach vorne",
    "sendToBack": "Ganz nach hinten",
    "align": "Ausrichten",
    "alignSelected": "Auswahl ausrichten:",
    "alignToPage": "An Seite ausrichten:",
    "deleteSelected": "Auswahl löschen",
    "alignLeft": "Links ausrichten",
    "alignRight": "Rechts ausrichten",
    "alignTop": "Oben ausrichten",
    "alignBottom": "Unten ausrichten",
    "centerHorizontally": "Horizontal zentrieren",
    "centerVertically": "Vertikal zentrieren",
    "centerOnPageHorizontally": "Horizontal auf Seite zentrieren",
    "centerOnPageVertically": "Vertikal auf Seite zentrieren",
    "zoomIn": "Vergrößern",
    "zoomOut": "Verkleinern",
    "resetZoom": "Zoom zurücksetzen",
    "undo": "Rückgängig (Strg+Z)",
    "redo": "Wiederholen (Strg+Y)",

    // ============= SUCCESS MESSAGES (8 keys) =============
    "bingoWorksheetGenerated": "Bingo-Arbeitsblatt erstellt!",
    "downloadInitiated": "Download gestartet!",
    "zipDownloadInitiated": "ZIP-Download gestartet!",
    "pdfDownloaded": "PDF heruntergeladen!",
    "formCleared": "Formular geleert.",
    "customImagesAvailable": "{count} eigene(s) Bild(er) verfügbar.",
    "jpegDownloadInitiated": "JPEG-Download gestartet!",

    // ============= ERROR MESSAGES (12 keys) =============
    "needMoreImagesForCallout": "Benötige {required} Bilder für die Aufrufliste, aber nur {selected} sind ausgewählt. Bitte wählen Sie mehr aus.",
    "notEnoughImagesInLibrary": "Die gewählte Bildsammlung enthält nur {available} Bilder. Benötigt werden {required} für das Spiel. Bitte wählen Sie ein größeres Thema oder verwenden Sie die eigene Auswahl.",
    "couldNotGenerateCards": "Konnte {count} einzigartige Karten nicht erstellen.",
    "canvasIsEmpty": "Die Arbeitsfläche ist leer.",
    "errorPreparingJpeg": "Fehler bei der JPEG-Vorbereitung: {error}",
    "noCardDataAvailable": "Keine Kartendaten verfügbar.",
    "errorCreatingZip": "Fehler beim Erstellen der ZIP-Datei: {error}",
    "errorCreatingPdf": "Fehler beim Erstellen der PDF-Datei: {error}",
    "errorReadingFile": "Fehler beim Lesen der Datei: {filename}",
    "generationFailed": "Erstellung fehlgeschlagen: {error}",
    "pleaseGenerateContentFirst": "Bitte erstellen Sie zuerst Inhalte.",
    "pleaseGenerateWorksheetFirst": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",

    // ============= INFO/STATUS MESSAGES (5 keys) =============
    "preparingFile": "Bereite {filename} vor...",
    "preparingZipFile": "Bereite ZIP-Datei vor...",
    "preparingPdf": "Bereite PDF vor...",
    "preparingJpeg": "Bereite JPEG vor...",
    "loadingImagesCount": "Lade {count} Bild(er)...",

    // ============= WATERMARK TEXT (2 keys) =============
    "watermarkText": "KOSTENLOSE VERSION - LessonCraftStudio.com",
    "watermarkSmallText": "KOSTENLOSE VERSION",

    // ============= FILE INPUT =============
    "chooseFiles": "Dateien wählen",
    "noFileChosen": "Keine Datei gewählt",
    "filesSelected": "{count} Datei(en) ausgewählt"
  },

  /**
   * FRENCH - Français (141 keys)
   * Professional French translation for educational context
   */
  "fr": {
    // ============= LANGUAGE NAMES (11 keys) =============
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

    // ============= CORE UI (5 keys) =============
    "worksheetSettings": "Paramètres de la fiche",
    "language": "Langue :",
    "imageLibraryLanguage": "Langue de la bibliothèque d'images :",
    "cardsAndChips": "Cartes + Jetons",
    "callouts": "Grille d'appel",

    // ============= ACTION BUTTONS (8 keys) =============
    "generate": "Créer",
    "download": "Télécharger",
    "worksheetJpeg": "Fiche d'activité (JPEG)",
    "calloutJpeg": "Grille d'appel (JPEG)",
    "worksheetPdf": "Fiche d'activité (PDF)",
    "calloutPdf": "Grille d'appel (PDF)",
    "grayscale": "Niveaux de gris",
    "clearAll": "Tout effacer",

    // ============= ACCORDION HEADERS (5 keys) =============
    "pageSetup": "Mise en page",
    "textTools": "Outils de texte",
    "bingoCardSettings": "Paramètres du jeu de bingo",
    "imageLibrary": "Bibliothèque d'images",
    "uploadCustomImages": "Importer vos images",

    // ============= PAGE SETUP (11 keys) =============
    "pageSize": "Format de page :",
    "letterPortrait": "Letter Portrait (8,5×11\")",
    "letterLandscape": "Letter Paysage (11×8,5\")",
    "a4Portrait": "A4 Portrait (210×297mm)",
    "a4Landscape": "A4 Paysage (297×210mm)",
    "square": "Carré (1200x1200)",
    "custom": "Personnalisé",
    "widthPx": "Largeur (px) :",
    "heightPx": "Hauteur (px) :",
    "pageColor": "Couleur de page :",
    "applySize": "Appliquer le format",

    // ============= BACKGROUND SECTION (5 keys) =============
    "background": "Arrière-plan",
    "backgroundTheme": "Thème d'arrière-plan :",
    "none": "Aucun",
    "allThemes": "Tous les thèmes",
    "selectBackgroundTheme": "Sélectionnez un thème pour les arrière-plans.",
    "backgroundOpacity": "Opacité de l'arrière-plan :",

    // ============= BORDER SECTION (4 keys) =============
    "border": "Bordure",
    "borderTheme": "Thème de bordure :",
    "selectBorderTheme": "Sélectionnez un thème pour les bordures.",
    "borderOpacity": "Opacité de la bordure :",

    // ============= TEXT TOOLS (10 keys) =============
    "addNewText": "Ajouter du texte",
    "content": "Contenu :",
    "helloPlaceholder": "Bonjour !",
    "addText": "Insérer le texte",
    "selectedTextProperties": "Propriétés du texte sélectionné",
    "color": "Couleur :",
    "size": "Taille :",
    "font": "Police :",
    "outlineColor": "Couleur du contour :",
    "outlineWidth": "Épaisseur du contour (0-10) :",

    // ============= FONT OPTIONS (7 keys) =============
    "font_lexend": "Lexend Deca",
    "font_baloo": "Baloo 2",
    "font_nunito": "Nunito",
    "font_quicksand": "Quicksand",
    "font_fredoka": "Fredoka",
    "font_arial": "Arial",
    "font_verdana": "Verdana",

    // ============= BINGO CARD SETTINGS (10 keys) =============
    "bingoRows": "Lignes (3–5) :",
    "bingoColumns": "Colonnes (3–5) :",
    "numberOfCards": "Nombre de cartes (1–10) :",
    "cardCellFill": "Contenu des cases :",
    "chipFill": "Contenu des jetons :",
    "image": "Image",
    "word": "Mot",
    "useCustomSelection": "Utiliser la sélection personnalisée (ci-dessous)",

    // ============= IMAGE LIBRARY (6 keys) =============
    "selectTheme": "Sélectionner le thème :",
    "searchImages": "Rechercher des images :",
    "searchPlaceholder": "ex. : pomme, voiture",
    "selectedForCustomCallouts": "Sélectionnées pour la grille d'appel personnalisée : {count}",
    "availableImagesCallouts": "Images disponibles (Cliquez pour ajouter à la grille d'appel) :",
    "loadingImages": "Chargement des images...",
    "selectedCustomImages": "Images personnalisées sélectionnées :",

    // ============= UPLOAD SECTION (3 keys) =============
    "selectImagesToUpload": "Sélectionner les images à importer :",
    "yourUploadedImages": "Vos images importées (cette session) :",
    "uploadedImagesWillAppear": "Vos images importées apparaîtront ici.",

    // ============= TOOLBAR (7 keys) =============
    "layers": "Calques",
    "bringForward": "Mettre au premier plan",
    "sendBackward": "Mettre à l'arrière-plan",
    "bringToFront": "Mettre au premier plan",
    "sendToBack": "Mettre à l'arrière-plan",
    "align": "Aligner",
    "alignSelected": "Aligner la sélection :",
    "alignToPage": "Aligner sur la page :",
    "deleteSelected": "Supprimer la sélection",
    "alignLeft": "Aligner à gauche",
    "alignRight": "Aligner à droite",
    "alignTop": "Aligner en haut",
    "alignBottom": "Aligner en bas",
    "centerHorizontally": "Centrer horizontalement",
    "centerVertically": "Centrer verticalement",
    "centerOnPageHorizontally": "Centrer sur la page horizontalement",
    "centerOnPageVertically": "Centrer sur la page verticalement",
    "zoomIn": "Zoomer",
    "zoomOut": "Dézoomer",
    "resetZoom": "Réinitialiser le zoom",
    "undo": "Annuler (Ctrl+Z)",
    "redo": "Rétablir (Ctrl+Y)",

    // ============= SUCCESS MESSAGES (8 keys) =============
    "bingoWorksheetGenerated": "Fiche de bingo créée !",
    "downloadInitiated": "Téléchargement lancé !",
    "zipDownloadInitiated": "Téléchargement ZIP lancé !",
    "pdfDownloaded": "PDF téléchargé !",
    "formCleared": "Formulaire réinitialisé.",
    "customImagesAvailable": "{count} image(s) personnalisée(s) disponible(s).",
    "jpegDownloadInitiated": "Téléchargement JPEG lancé !",

    // ============= ERROR MESSAGES (12 keys) =============
    "needMoreImagesForCallout": "Il faut {required} images pour la grille d'appel, mais seulement {selected} sont sélectionnées. Veuillez en sélectionner davantage.",
    "notEnoughImagesInLibrary": "La bibliothèque sélectionnée ne contient que {available} images. Il en faut {required} pour créer le jeu. Veuillez choisir un thème plus large ou utiliser la sélection personnalisée.",
    "couldNotGenerateCards": "Impossible de créer {count} cartes uniques.",
    "canvasIsEmpty": "L'espace de travail est vide.",
    "errorPreparingJpeg": "Erreur lors de la préparation du JPEG : {error}",
    "noCardDataAvailable": "Aucune donnée de carte disponible.",
    "errorCreatingZip": "Erreur lors de la création du fichier ZIP : {error}",
    "errorCreatingPdf": "Erreur lors de la création du PDF : {error}",
    "errorReadingFile": "Erreur lors de la lecture du fichier : {filename}",
    "generationFailed": "Échec de la création : {error}",
    "pleaseGenerateContentFirst": "Veuillez d'abord créer du contenu.",
    "pleaseGenerateWorksheetFirst": "Veuillez d'abord créer une fiche d'activité.",

    // ============= INFO/STATUS MESSAGES (5 keys) =============
    "preparingFile": "Préparation de {filename}...",
    "preparingZipFile": "Préparation du fichier ZIP...",
    "preparingPdf": "Préparation du PDF...",
    "preparingJpeg": "Préparation du JPEG...",
    "loadingImagesCount": "Chargement de {count} image(s)...",

    // ============= WATERMARK TEXT (2 keys) =============
    "watermarkText": "VERSION GRATUITE - LessonCraftStudio.com",
    "watermarkSmallText": "VERSION GRATUITE",

    // ============= FILE INPUT =============
    "chooseFiles": "Choisir des fichiers",
    "noFileChosen": "Aucun fichier choisi",
    "filesSelected": "{count} fichier(s) sélectionné(s)"
  },

  /**
   * SPANISH - Español (141 keys)
   * Professional Spanish translation for educational context
   */
  "es": {
    // ============= LANGUAGE NAMES (11 keys) =============
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

    // ============= CORE UI (5 keys) =============
    "worksheetSettings": "Configuración de la hoja",
    "language": "Idioma:",
    "imageLibraryLanguage": "Idioma de la biblioteca de imágenes:",
    "cardsAndChips": "Cartones + Fichas",
    "callouts": "Lista de llamada",

    // ============= ACTION BUTTONS (8 keys) =============
    "generate": "Crear",
    "download": "Descargar",
    "worksheetJpeg": "Hoja de actividad (JPEG)",
    "calloutJpeg": "Lista de llamada (JPEG)",
    "worksheetPdf": "Hoja de actividad (PDF)",
    "calloutPdf": "Lista de llamada (PDF)",
    "grayscale": "Escala de grises",
    "clearAll": "Borrar todo",

    // ============= ACCORDION HEADERS (5 keys) =============
    "pageSetup": "Configuración de página",
    "textTools": "Herramientas de texto",
    "bingoCardSettings": "Configuración del bingo",
    "imageLibrary": "Biblioteca de imágenes",
    "uploadCustomImages": "Cargar imágenes propias",

    // ============= PAGE SETUP (11 keys) =============
    "pageSize": "Tamaño de página:",
    "letterPortrait": "Carta Vertical (8,5×11\")",
    "letterLandscape": "Carta Horizontal (11×8,5\")",
    "a4Portrait": "A4 Vertical (210×297mm)",
    "a4Landscape": "A4 Horizontal (297×210mm)",
    "square": "Cuadrado (1200x1200)",
    "custom": "Personalizado",
    "widthPx": "Ancho (px):",
    "heightPx": "Alto (px):",
    "pageColor": "Color de página:",
    "applySize": "Aplicar tamaño",

    // ============= BACKGROUND SECTION (5 keys) =============
    "background": "Fondo",
    "backgroundTheme": "Tema de fondo:",
    "none": "Ninguno",
    "allThemes": "Todos los temas",
    "selectBackgroundTheme": "Selecciona un tema para los fondos.",
    "backgroundOpacity": "Opacidad del fondo:",

    // ============= BORDER SECTION (4 keys) =============
    "border": "Borde",
    "borderTheme": "Tema de borde:",
    "selectBorderTheme": "Selecciona un tema para los bordes.",
    "borderOpacity": "Opacidad del borde:",

    // ============= TEXT TOOLS (10 keys) =============
    "addNewText": "Añadir texto",
    "content": "Contenido:",
    "helloPlaceholder": "¡Hola!",
    "addText": "Insertar texto",
    "selectedTextProperties": "Propiedades del texto seleccionado",
    "color": "Color:",
    "size": "Tamaño:",
    "font": "Fuente:",
    "outlineColor": "Color del contorno:",
    "outlineWidth": "Grosor del contorno (0-10):",

    // ============= FONT OPTIONS (7 keys) =============
    "font_lexend": "Lexend Deca",
    "font_baloo": "Baloo 2",
    "font_nunito": "Nunito",
    "font_quicksand": "Quicksand",
    "font_fredoka": "Fredoka",
    "font_arial": "Arial",
    "font_verdana": "Verdana",

    // ============= BINGO CARD SETTINGS (10 keys) =============
    "bingoRows": "Filas (3–5):",
    "bingoColumns": "Columnas (3–5):",
    "numberOfCards": "Número de cartones (1–10):",
    "cardCellFill": "Contenido de las casillas:",
    "chipFill": "Contenido de las fichas:",
    "image": "Imagen",
    "word": "Palabra",
    "useCustomSelection": "Usar selección personalizada (abajo)",

    // ============= IMAGE LIBRARY (6 keys) =============
    "selectTheme": "Seleccionar tema:",
    "searchImages": "Buscar imágenes:",
    "searchPlaceholder": "ej. manzana, coche",
    "selectedForCustomCallouts": "Seleccionadas para la lista personalizada: {count}",
    "availableImagesCallouts": "Imágenes disponibles (Haz clic para añadir a la lista de llamada):",
    "loadingImages": "Cargando imágenes...",
    "selectedCustomImages": "Imágenes personalizadas seleccionadas:",

    // ============= UPLOAD SECTION (3 keys) =============
    "selectImagesToUpload": "Seleccionar imágenes para cargar:",
    "yourUploadedImages": "Tus imágenes cargadas (esta sesión):",
    "uploadedImagesWillAppear": "Tus imágenes cargadas aparecerán aquí.",

    // ============= TOOLBAR (7 keys) =============
    "layers": "Capas",
    "bringForward": "Traer al frente",
    "sendBackward": "Enviar atrás",
    "bringToFront": "Traer al frente",
    "sendToBack": "Enviar al fondo",
    "align": "Alinear",
    "alignSelected": "Alinear selección:",
    "alignToPage": "Alinear a la página:",
    "deleteSelected": "Eliminar selección",
    "alignLeft": "Alinear a la izquierda",
    "alignRight": "Alinear a la derecha",
    "alignTop": "Alinear arriba",
    "alignBottom": "Alinear abajo",
    "centerHorizontally": "Centrar horizontalmente",
    "centerVertically": "Centrar verticalmente",
    "centerOnPageHorizontally": "Centrar en la página horizontalmente",
    "centerOnPageVertically": "Centrar en la página verticalmente",
    "zoomIn": "Acercar",
    "zoomOut": "Alejar",
    "resetZoom": "Restablecer zoom",
    "undo": "Deshacer (Ctrl+Z)",
    "redo": "Rehacer (Ctrl+Y)",

    // ============= SUCCESS MESSAGES (8 keys) =============
    "bingoWorksheetGenerated": "¡Hoja de bingo creada!",
    "downloadInitiated": "¡Descarga iniciada!",
    "zipDownloadInitiated": "¡Descarga ZIP iniciada!",
    "pdfDownloaded": "¡PDF descargado!",
    "formCleared": "Formulario borrado.",
    "customImagesAvailable": "{count} imagen(es) personalizada(s) disponible(s).",
    "jpegDownloadInitiated": "¡Descarga JPEG iniciada!",

    // ============= ERROR MESSAGES (12 keys) =============
    "needMoreImagesForCallout": "Se necesitan {required} imágenes para la lista de llamada, pero solo hay {selected} seleccionadas. Por favor, selecciona más.",
    "notEnoughImagesInLibrary": "La biblioteca seleccionada solo tiene {available} imágenes. Se necesitan {required} para crear el juego. Por favor, elige un tema más amplio o usa la selección personalizada.",
    "couldNotGenerateCards": "No se pudieron crear {count} cartones únicos.",
    "canvasIsEmpty": "El área de trabajo está vacía.",
    "errorPreparingJpeg": "Error al preparar el JPEG: {error}",
    "noCardDataAvailable": "No hay datos de cartón disponibles.",
    "errorCreatingZip": "Error al crear el archivo ZIP: {error}",
    "errorCreatingPdf": "Error al crear el PDF: {error}",
    "errorReadingFile": "Error al leer el archivo: {filename}",
    "generationFailed": "Error en la creación: {error}",
    "pleaseGenerateContentFirst": "Por favor, primero crea el contenido.",
    "pleaseGenerateWorksheetFirst": "Por favor, primero crea una hoja de actividad.",

    // ============= INFO/STATUS MESSAGES (5 keys) =============
    "preparingFile": "Preparando {filename}...",
    "preparingZipFile": "Preparando archivo ZIP...",
    "preparingPdf": "Preparando PDF...",
    "preparingJpeg": "Preparando JPEG...",
    "loadingImagesCount": "Cargando {count} imagen(es)...",

    // ============= WATERMARK TEXT (2 keys) =============
    "watermarkText": "VERSIÓN GRATUITA - LessonCraftStudio.com",
    "watermarkSmallText": "VERSIÓN GRATUITA",

    // ============= FILE INPUT =============
    "chooseFiles": "Elegir archivos",
    "noFileChosen": "Ningún archivo elegido",
    "filesSelected": "{count} archivo(s) seleccionado(s)"
  },

  /**
   * ITALIAN - Italiano (141 keys)
   * Professional Italian translation for educational context
   */
  "it": {
    // ============= LANGUAGE NAMES (11 keys) =============
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

    // ============= CORE UI (5 keys) =============
    "worksheetSettings": "Impostazioni della scheda",
    "language": "Lingua:",
    "imageLibraryLanguage": "Lingua della biblioteca di immagini:",
    "cardsAndChips": "Cartelle + Segnaposto",
    "callouts": "Tabellone di chiamata",

    // ============= ACTION BUTTONS (8 keys) =============
    "generate": "Crea",
    "download": "Scarica",
    "worksheetJpeg": "Scheda attività (JPEG)",
    "calloutJpeg": "Tabellone di chiamata (JPEG)",
    "worksheetPdf": "Scheda attività (PDF)",
    "calloutPdf": "Tabellone di chiamata (PDF)",
    "grayscale": "Scala di grigi",
    "clearAll": "Cancella tutto",

    // ============= ACCORDION HEADERS (5 keys) =============
    "pageSetup": "Impostazioni pagina",
    "textTools": "Strumenti di testo",
    "bingoCardSettings": "Impostazioni del gioco",
    "imageLibrary": "Raccolta immagini",
    "uploadCustomImages": "Carica le tue immagini",

    // ============= PAGE SETUP (11 keys) =============
    "pageSize": "Formato pagina:",
    "letterPortrait": "Letter Verticale (8,5×11\")",
    "letterLandscape": "Letter Orizzontale (11×8,5\")",
    "a4Portrait": "A4 Verticale (210×297mm)",
    "a4Landscape": "A4 Orizzontale (297×210mm)",
    "square": "Quadrato (1200x1200)",
    "custom": "Personalizzato",
    "widthPx": "Larghezza (px):",
    "heightPx": "Altezza (px):",
    "pageColor": "Colore pagina:",
    "applySize": "Applica dimensioni",

    // ============= BACKGROUND SECTION (5 keys) =============
    "background": "Sfondo",
    "backgroundTheme": "Tema sfondo:",
    "none": "Nessuno",
    "allThemes": "Tutti i temi",
    "selectBackgroundTheme": "Seleziona un tema per gli sfondi.",
    "backgroundOpacity": "Opacità sfondo:",

    // ============= BORDER SECTION (4 keys) =============
    "border": "Cornice",
    "borderTheme": "Tema cornice:",
    "selectBorderTheme": "Seleziona un tema per le cornici.",
    "borderOpacity": "Opacità cornice:",

    // ============= TEXT TOOLS (10 keys) =============
    "addNewText": "Aggiungi testo",
    "content": "Contenuto:",
    "helloPlaceholder": "Ciao!",
    "addText": "Inserisci testo",
    "selectedTextProperties": "Proprietà del testo selezionato",
    "color": "Colore:",
    "size": "Dimensione:",
    "font": "Carattere:",
    "outlineColor": "Colore contorno:",
    "outlineWidth": "Spessore contorno (0-10):",

    // ============= FONT OPTIONS (7 keys) =============
    "font_lexend": "Lexend Deca",
    "font_baloo": "Baloo 2",
    "font_nunito": "Nunito",
    "font_quicksand": "Quicksand",
    "font_fredoka": "Fredoka",
    "font_arial": "Arial",
    "font_verdana": "Verdana",

    // ============= BINGO CARD SETTINGS (10 keys) =============
    "bingoRows": "Righe (3–5):",
    "bingoColumns": "Colonne (3–5):",
    "numberOfCards": "Numero di cartelle (1–10):",
    "cardCellFill": "Contenuto delle caselle:",
    "chipFill": "Contenuto dei segnaposto:",
    "image": "Immagine",
    "word": "Parola",
    "useCustomSelection": "Usa selezione personalizzata (sotto)",

    // ============= IMAGE LIBRARY (6 keys) =============
    "selectTheme": "Seleziona tema:",
    "searchImages": "Cerca immagini:",
    "searchPlaceholder": "es. mela, auto",
    "selectedForCustomCallouts": "Selezionate per il tabellone personalizzato: {count}",
    "availableImagesCallouts": "Immagini disponibili (Clicca per aggiungere al tabellone):",
    "loadingImages": "Caricamento immagini...",
    "selectedCustomImages": "Immagini personalizzate selezionate:",

    // ============= UPLOAD SECTION (3 keys) =============
    "selectImagesToUpload": "Seleziona immagini da caricare:",
    "yourUploadedImages": "Le tue immagini caricate (questa sessione):",
    "uploadedImagesWillAppear": "Le tue immagini caricate appariranno qui.",

    // ============= TOOLBAR (7 keys) =============
    "layers": "Livelli",
    "bringForward": "Porta avanti",
    "sendBackward": "Porta indietro",
    "bringToFront": "Porta in primo piano",
    "sendToBack": "Porta in secondo piano",
    "align": "Allinea",
    "alignSelected": "Allinea selezione:",
    "alignToPage": "Allinea alla pagina:",
    "deleteSelected": "Elimina selezione",
    "alignLeft": "Allinea a sinistra",
    "alignRight": "Allinea a destra",
    "alignTop": "Allinea in alto",
    "alignBottom": "Allinea in basso",
    "centerHorizontally": "Centra orizzontalmente",
    "centerVertically": "Centra verticalmente",
    "centerOnPageHorizontally": "Centra sulla pagina orizzontalmente",
    "centerOnPageVertically": "Centra sulla pagina verticalmente",
    "zoomIn": "Ingrandisci",
    "zoomOut": "Riduci",
    "resetZoom": "Ripristina zoom",
    "undo": "Annulla (Ctrl+Z)",
    "redo": "Ripeti (Ctrl+Y)",

    // ============= SUCCESS MESSAGES (8 keys) =============
    "bingoWorksheetGenerated": "Scheda di bingo creata!",
    "downloadInitiated": "Download avviato!",
    "zipDownloadInitiated": "Download ZIP avviato!",
    "pdfDownloaded": "PDF scaricato!",
    "formCleared": "Modulo cancellato.",
    "customImagesAvailable": "{count} immagine/i personalizzata/e disponibile/i.",
    "jpegDownloadInitiated": "Download JPEG avviato!",

    // ============= ERROR MESSAGES (12 keys) =============
    "needMoreImagesForCallout": "Servono {required} immagini per il tabellone, ma solo {selected} sono selezionate. Per favore, selezionane altre.",
    "notEnoughImagesInLibrary": "La raccolta selezionata ha solo {available} immagini. Ne servono {required} per creare il gioco. Per favore, scegli un tema più ampio o usa la selezione personalizzata.",
    "couldNotGenerateCards": "Impossibile creare {count} cartelle uniche.",
    "canvasIsEmpty": "L'area di lavoro è vuota.",
    "errorPreparingJpeg": "Errore nella preparazione del JPEG: {error}",
    "noCardDataAvailable": "Nessun dato cartella disponibile.",
    "errorCreatingZip": "Errore nella creazione del file ZIP: {error}",
    "errorCreatingPdf": "Errore nella creazione del PDF: {error}",
    "errorReadingFile": "Errore nella lettura del file: {filename}",
    "generationFailed": "Creazione fallita: {error}",
    "pleaseGenerateContentFirst": "Per favore, prima crea il contenuto.",
    "pleaseGenerateWorksheetFirst": "Per favore, prima crea una scheda attività.",

    // ============= INFO/STATUS MESSAGES (5 keys) =============
    "preparingFile": "Preparazione di {filename}...",
    "preparingZipFile": "Preparazione file ZIP...",
    "preparingPdf": "Preparazione PDF...",
    "preparingJpeg": "Preparazione JPEG...",
    "loadingImagesCount": "Caricamento di {count} immagine/i...",

    // ============= WATERMARK TEXT (2 keys) =============
    "watermarkText": "VERSIONE GRATUITA - LessonCraftStudio.com",
    "watermarkSmallText": "VERSIONE GRATUITA",

    // ============= FILE INPUT =============
    "chooseFiles": "Scegli file",
    "noFileChosen": "Nessun file scelto",
    "filesSelected": "{count} file selezionato/i"
  },

  /**
   * PORTUGUESE - Português (141 keys)
   * Professional Portuguese translation for educational context (PT/BR compatible)
   */
  "pt": {
    // ============= LANGUAGE NAMES (11 keys) =============
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

    // ============= CORE UI (5 keys) =============
    "worksheetSettings": "Configurações da atividade",
    "language": "Idioma:",
    "imageLibraryLanguage": "Idioma da biblioteca de imagens:",
    "cardsAndChips": "Cartelas + Fichas",
    "callouts": "Lista de chamadas",

    // ============= ACTION BUTTONS (8 keys) =============
    "generate": "Criar",
    "download": "Baixar",
    "worksheetJpeg": "Folha de atividades (JPEG)",
    "calloutJpeg": "Lista de chamadas (JPEG)",
    "worksheetPdf": "Folha de atividades (PDF)",
    "calloutPdf": "Lista de chamadas (PDF)",
    "grayscale": "Tons de cinza",
    "clearAll": "Limpar tudo",

    // ============= ACCORDION HEADERS (5 keys) =============
    "pageSetup": "Configuração da página",
    "textTools": "Ferramentas de texto",
    "bingoCardSettings": "Configurações do bingo",
    "imageLibrary": "Biblioteca de imagens",
    "uploadCustomImages": "Carregar suas imagens",

    // ============= PAGE SETUP (11 keys) =============
    "pageSize": "Tamanho da página:",
    "letterPortrait": "Carta Retrato (8,5×11\")",
    "letterLandscape": "Carta Paisagem (11×8,5\")",
    "a4Portrait": "A4 Retrato (210×297mm)",
    "a4Landscape": "A4 Paisagem (297×210mm)",
    "square": "Quadrado (1200x1200)",
    "custom": "Personalizado",
    "widthPx": "Largura (px):",
    "heightPx": "Altura (px):",
    "pageColor": "Cor da página:",
    "applySize": "Aplicar tamanho",

    // ============= BACKGROUND SECTION (5 keys) =============
    "background": "Fundo",
    "backgroundTheme": "Tema do fundo:",
    "none": "Nenhum",
    "allThemes": "Todos os temas",
    "selectBackgroundTheme": "Selecione um tema para os fundos.",
    "backgroundOpacity": "Opacidade do fundo:",

    // ============= BORDER SECTION (4 keys) =============
    "border": "Borda",
    "borderTheme": "Tema da borda:",
    "selectBorderTheme": "Selecione um tema para as bordas.",
    "borderOpacity": "Opacidade da borda:",

    // ============= TEXT TOOLS (10 keys) =============
    "addNewText": "Adicionar texto",
    "content": "Conteúdo:",
    "helloPlaceholder": "Olá!",
    "addText": "Inserir texto",
    "selectedTextProperties": "Propriedades do texto selecionado",
    "color": "Cor:",
    "size": "Tamanho:",
    "font": "Fonte:",
    "outlineColor": "Cor do contorno:",
    "outlineWidth": "Espessura do contorno (0-10):",

    // ============= FONT OPTIONS (7 keys) =============
    "font_lexend": "Lexend Deca",
    "font_baloo": "Baloo 2",
    "font_nunito": "Nunito",
    "font_quicksand": "Quicksand",
    "font_fredoka": "Fredoka",
    "font_arial": "Arial",
    "font_verdana": "Verdana",

    // ============= BINGO CARD SETTINGS (10 keys) =============
    "bingoRows": "Linhas (3–5):",
    "bingoColumns": "Colunas (3–5):",
    "numberOfCards": "Número de cartelas (1–10):",
    "cardCellFill": "Conteúdo das casas:",
    "chipFill": "Conteúdo das fichas:",
    "image": "Imagem",
    "word": "Palavra",
    "useCustomSelection": "Usar seleção personalizada (abaixo)",

    // ============= IMAGE LIBRARY (6 keys) =============
    "selectTheme": "Selecionar tema:",
    "searchImages": "Pesquisar imagens:",
    "searchPlaceholder": "ex: maçã, carro",
    "selectedForCustomCallouts": "Selecionadas para chamadas personalizadas: {count}",
    "availableImagesCallouts": "Imagens disponíveis (Clique para adicionar às chamadas):",
    "loadingImages": "Carregando imagens...",
    "selectedCustomImages": "Imagens personalizadas selecionadas:",

    // ============= UPLOAD SECTION (3 keys) =============
    "selectImagesToUpload": "Selecionar imagens para carregar:",
    "yourUploadedImages": "Suas imagens carregadas (esta sessão):",
    "uploadedImagesWillAppear": "Suas imagens carregadas aparecerão aqui.",

    // ============= TOOLBAR (7 keys) =============
    "layers": "Camadas",
    "bringForward": "Trazer para frente",
    "sendBackward": "Enviar para trás",
    "bringToFront": "Trazer para frente",
    "sendToBack": "Enviar para trás",
    "align": "Alinhar",
    "alignSelected": "Alinhar seleção:",
    "alignToPage": "Alinhar à página:",
    "deleteSelected": "Apagar seleção",
    "alignLeft": "Alinhar à esquerda",
    "alignRight": "Alinhar à direita",
    "alignTop": "Alinhar ao topo",
    "alignBottom": "Alinhar à base",
    "centerHorizontally": "Centralizar horizontalmente",
    "centerVertically": "Centralizar verticalmente",
    "centerOnPageHorizontally": "Centralizar na página horizontalmente",
    "centerOnPageVertically": "Centralizar na página verticalmente",
    "zoomIn": "Ampliar",
    "zoomOut": "Reduzir",
    "resetZoom": "Redefinir zoom",
    "undo": "Desfazer (Ctrl+Z)",
    "redo": "Refazer (Ctrl+Y)",

    // ============= SUCCESS MESSAGES (8 keys) =============
    "bingoWorksheetGenerated": "Folha de bingo criada!",
    "downloadInitiated": "Download iniciado!",
    "zipDownloadInitiated": "Download ZIP iniciado!",
    "pdfDownloaded": "PDF baixado!",
    "formCleared": "Formulário limpo.",
    "customImagesAvailable": "{count} imagem(ns) personalizada(s) disponível(is).",
    "jpegDownloadInitiated": "Download JPEG iniciado!",

    // ============= ERROR MESSAGES (12 keys) =============
    "needMoreImagesForCallout": "São necessárias {required} imagens para a lista de chamadas, mas apenas {selected} estão selecionadas. Por favor, selecione mais.",
    "notEnoughImagesInLibrary": "A biblioteca selecionada tem apenas {available} imagens. São necessárias {required} para criar o jogo. Por favor, escolha um tema maior ou use seleção personalizada.",
    "couldNotGenerateCards": "Não foi possível criar {count} cartelas únicas.",
    "canvasIsEmpty": "A área de trabalho está vazia.",
    "errorPreparingJpeg": "Erro ao preparar JPEG: {error}",
    "noCardDataAvailable": "Nenhum dado de cartela disponível.",
    "errorCreatingZip": "Erro ao criar arquivo ZIP: {error}",
    "errorCreatingPdf": "Erro ao criar PDF: {error}",
    "errorReadingFile": "Erro ao ler arquivo: {filename}",
    "generationFailed": "Falha na criação: {error}",
    "pleaseGenerateContentFirst": "Por favor, crie o conteúdo primeiro.",
    "pleaseGenerateWorksheetFirst": "Por favor, crie uma folha de atividades primeiro.",

    // ============= INFO/STATUS MESSAGES (5 keys) =============
    "preparingFile": "Preparando {filename}...",
    "preparingZipFile": "Preparando arquivo ZIP...",
    "preparingPdf": "Preparando PDF...",
    "preparingJpeg": "Preparando JPEG...",
    "loadingImagesCount": "Carregando {count} imagem(ns)...",

    // ============= WATERMARK TEXT (2 keys) =============
    "watermarkText": "VERSÃO GRATUITA - LessonCraftStudio.com",
    "watermarkSmallText": "VERSÃO GRATUITA",

    // ============= FILE INPUT =============
    "chooseFiles": "Escolher arquivos",
    "noFileChosen": "Nenhum arquivo escolhido",
    "filesSelected": "{count} arquivo(s) selecionado(s)"
  },

  /**
   * DUTCH - Nederlands (141 keys)
   * Professional Dutch translation for educational context
   */
  "nl": {
    // ============= LANGUAGE NAMES (11 keys) =============
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

    // ============= CORE UI (5 keys) =============
    "worksheetSettings": "Werkblad instellingen",
    "language": "Taal:",
    "imageLibraryLanguage": "Afbeeldingsbibliotheek-taal:",
    "cardsAndChips": "Kaarten + Fiches",
    "callouts": "Oproeplijst",

    // ============= ACTION BUTTONS (8 keys) =============
    "generate": "Maken",
    "download": "Downloaden",
    "worksheetJpeg": "Werkblad (JPEG)",
    "calloutJpeg": "Oproeplijst (JPEG)",
    "worksheetPdf": "Werkblad (PDF)",
    "calloutPdf": "Oproeplijst (PDF)",
    "grayscale": "Grijstinten",
    "clearAll": "Alles wissen",

    // ============= ACCORDION HEADERS (5 keys) =============
    "pageSetup": "Pagina-instelling",
    "textTools": "Tekstgereedschap",
    "bingoCardSettings": "Bingo-instellingen",
    "imageLibrary": "Afbeeldingenbibliotheek",
    "uploadCustomImages": "Eigen afbeeldingen uploaden",

    // ============= PAGE SETUP (11 keys) =============
    "pageSize": "Paginaformaat:",
    "letterPortrait": "Letter Staand (8,5×11\")",
    "letterLandscape": "Letter Liggend (11×8,5\")",
    "a4Portrait": "A4 Staand (210×297mm)",
    "a4Landscape": "A4 Liggend (297×210mm)",
    "square": "Vierkant (1200x1200)",
    "custom": "Aangepast",
    "widthPx": "Breedte (px):",
    "heightPx": "Hoogte (px):",
    "pageColor": "Pagina kleur:",
    "applySize": "Formaat toepassen",

    // ============= BACKGROUND SECTION (5 keys) =============
    "background": "Achtergrond",
    "backgroundTheme": "Achtergrond thema:",
    "none": "Geen",
    "allThemes": "Alle thema's",
    "selectBackgroundTheme": "Selecteer een thema voor achtergronden.",
    "backgroundOpacity": "Achtergrond transparantie:",

    // ============= BORDER SECTION (4 keys) =============
    "border": "Rand",
    "borderTheme": "Rand thema:",
    "selectBorderTheme": "Selecteer een thema voor randen.",
    "borderOpacity": "Rand transparantie:",

    // ============= TEXT TOOLS (10 keys) =============
    "addNewText": "Tekst toevoegen",
    "content": "Inhoud:",
    "helloPlaceholder": "Hallo!",
    "addText": "Tekst invoegen",
    "selectedTextProperties": "Eigenschappen geselecteerde tekst",
    "color": "Kleur:",
    "size": "Grootte:",
    "font": "Lettertype:",
    "outlineColor": "Omlijningskleur:",
    "outlineWidth": "Omlijningsdikte (0-10):",

    // ============= FONT OPTIONS (7 keys) =============
    "font_lexend": "Lexend Deca",
    "font_baloo": "Baloo 2",
    "font_nunito": "Nunito",
    "font_quicksand": "Quicksand",
    "font_fredoka": "Fredoka",
    "font_arial": "Arial",
    "font_verdana": "Verdana",

    // ============= BINGO CARD SETTINGS (10 keys) =============
    "bingoRows": "Rijen (3–5):",
    "bingoColumns": "Kolommen (3–5):",
    "numberOfCards": "Aantal kaarten (1–10):",
    "cardCellFill": "Inhoud van vakjes:",
    "chipFill": "Inhoud van fiches:",
    "image": "Afbeelding",
    "word": "Woord",
    "useCustomSelection": "Gebruik eigen selectie (hieronder)",

    // ============= IMAGE LIBRARY (6 keys) =============
    "selectTheme": "Selecteer thema:",
    "searchImages": "Zoek afbeeldingen:",
    "searchPlaceholder": "bijv. appel, auto",
    "selectedForCustomCallouts": "Geselecteerd voor eigen oproeplijst: {count}",
    "availableImagesCallouts": "Beschikbare afbeeldingen (Klik om toe te voegen aan oproeplijst):",
    "loadingImages": "Afbeeldingen laden...",
    "selectedCustomImages": "Geselecteerde eigen afbeeldingen:",

    // ============= UPLOAD SECTION (3 keys) =============
    "selectImagesToUpload": "Selecteer afbeeldingen om te uploaden:",
    "yourUploadedImages": "Je geüploade afbeeldingen (deze sessie):",
    "uploadedImagesWillAppear": "Je geüploade afbeeldingen verschijnen hier.",

    // ============= TOOLBAR (7 keys) =============
    "layers": "Lagen",
    "bringForward": "Naar voren",
    "sendBackward": "Naar achteren",
    "bringToFront": "Helemaal naar voren",
    "sendToBack": "Helemaal naar achteren",
    "align": "Uitlijnen",
    "alignSelected": "Selectie uitlijnen:",
    "alignToPage": "Uitlijnen op pagina:",
    "deleteSelected": "Selectie verwijderen",
    "alignLeft": "Links uitlijnen",
    "alignRight": "Rechts uitlijnen",
    "alignTop": "Boven uitlijnen",
    "alignBottom": "Onder uitlijnen",
    "centerHorizontally": "Horizontaal centreren",
    "centerVertically": "Verticaal centreren",
    "centerOnPageHorizontally": "Horizontaal centreren op pagina",
    "centerOnPageVertically": "Verticaal centreren op pagina",
    "zoomIn": "Inzoomen",
    "zoomOut": "Uitzoomen",
    "resetZoom": "Zoom resetten",
    "undo": "Ongedaan maken (Ctrl+Z)",
    "redo": "Opnieuw uitvoeren (Ctrl+Y)",

    // ============= SUCCESS MESSAGES (8 keys) =============
    "bingoWorksheetGenerated": "Bingo werkblad gemaakt!",
    "downloadInitiated": "Download gestart!",
    "zipDownloadInitiated": "ZIP download gestart!",
    "pdfDownloaded": "PDF gedownload!",
    "formCleared": "Formulier gewist.",
    "customImagesAvailable": "{count} eigen afbeelding(en) beschikbaar.",
    "jpegDownloadInitiated": "JPEG download gestart!",

    // ============= ERROR MESSAGES (12 keys) =============
    "needMoreImagesForCallout": "Er zijn {required} afbeeldingen nodig voor de oproeplijst, maar er zijn slechts {selected} geselecteerd. Selecteer er meer.",
    "notEnoughImagesInLibrary": "De geselecteerde bibliotheek heeft slechts {available} afbeeldingen. Er zijn er {required} nodig voor het spel. Kies een groter thema of gebruik eigen selectie.",
    "couldNotGenerateCards": "Kon geen {count} unieke kaarten maken.",
    "canvasIsEmpty": "Het werkveld is leeg.",
    "errorPreparingJpeg": "Fout bij voorbereiden JPEG: {error}",
    "noCardDataAvailable": "Geen kaartgegevens beschikbaar.",
    "errorCreatingZip": "Fout bij maken ZIP-bestand: {error}",
    "errorCreatingPdf": "Fout bij maken PDF: {error}",
    "errorReadingFile": "Fout bij lezen bestand: {filename}",
    "generationFailed": "Maken mislukt: {error}",
    "pleaseGenerateContentFirst": "Maak eerst de inhoud.",
    "pleaseGenerateWorksheetFirst": "Maak eerst een werkblad.",

    // ============= INFO/STATUS MESSAGES (5 keys) =============
    "preparingFile": "Voorbereiden {filename}...",
    "preparingZipFile": "ZIP-bestand voorbereiden...",
    "preparingPdf": "PDF voorbereiden...",
    "preparingJpeg": "JPEG voorbereiden...",
    "loadingImagesCount": "{count} afbeelding(en) laden...",

    // ============= WATERMARK TEXT (2 keys) =============
    "watermarkText": "GRATIS VERSIE - LessonCraftStudio.com",
    "watermarkSmallText": "GRATIS VERSIE",

    // ============= FILE INPUT =============
    "chooseFiles": "Bestanden kiezen",
    "noFileChosen": "Geen bestand gekozen",
    "filesSelected": "{count} bestand(en) geselecteerd"
  },

  /**
   * SWEDISH - Svenska (141 keys)
   * Professional Swedish translation for educational context
   */
  "sv": {
    // ============= LANGUAGE NAMES (11 keys) =============
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

    // ============= CORE UI (5 keys) =============
    "worksheetSettings": "Arbetsblad inställningar",
    "language": "Språk:",
    "imageLibraryLanguage": "Bildbiblioteksspråk:",
    "cardsAndChips": "Brickor + Marker",
    "callouts": "Uppropslista",

    // ============= ACTION BUTTONS (8 keys) =============
    "generate": "Skapa",
    "download": "Ladda ner",
    "worksheetJpeg": "Arbetsblad (JPEG)",
    "calloutJpeg": "Uppropslista (JPEG)",
    "worksheetPdf": "Arbetsblad (PDF)",
    "calloutPdf": "Uppropslista (PDF)",
    "grayscale": "Gråskala",
    "clearAll": "Rensa allt",

    // ============= ACCORDION HEADERS (5 keys) =============
    "pageSetup": "Sidlayout",
    "textTools": "Textverktyg",
    "bingoCardSettings": "Bingoinställningar",
    "imageLibrary": "Bildbibliotek",
    "uploadCustomImages": "Ladda upp egna bilder",

    // ============= PAGE SETUP (11 keys) =============
    "pageSize": "Sidstorlek:",
    "letterPortrait": "Letter Stående (8,5×11\")",
    "letterLandscape": "Letter Liggande (11×8,5\")",
    "a4Portrait": "A4 Stående (210×297mm)",
    "a4Landscape": "A4 Liggande (297×210mm)",
    "square": "Kvadrat (1200x1200)",
    "custom": "Anpassad",
    "widthPx": "Bredd (px):",
    "heightPx": "Höjd (px):",
    "pageColor": "Sidfärg:",
    "applySize": "Tillämpa storlek",

    // ============= BACKGROUND SECTION (5 keys) =============
    "background": "Bakgrund",
    "backgroundTheme": "Bakgrundstema:",
    "none": "Ingen",
    "allThemes": "Alla teman",
    "selectBackgroundTheme": "Välj ett tema för bakgrunder.",
    "backgroundOpacity": "Bakgrundsopacitet:",

    // ============= BORDER SECTION (4 keys) =============
    "border": "Ram",
    "borderTheme": "Ramtema:",
    "selectBorderTheme": "Välj ett tema för ramar.",
    "borderOpacity": "Ramopacitet:",

    // ============= TEXT TOOLS (10 keys) =============
    "addNewText": "Lägg till text",
    "content": "Innehåll:",
    "helloPlaceholder": "Hej!",
    "addText": "Infoga text",
    "selectedTextProperties": "Egenskaper för markerad text",
    "color": "Färg:",
    "size": "Storlek:",
    "font": "Typsnitt:",
    "outlineColor": "Konturfärg:",
    "outlineWidth": "Konturbredd (0-10):",

    // ============= FONT OPTIONS (7 keys) =============
    "font_lexend": "Lexend Deca",
    "font_baloo": "Baloo 2",
    "font_nunito": "Nunito",
    "font_quicksand": "Quicksand",
    "font_fredoka": "Fredoka",
    "font_arial": "Arial",
    "font_verdana": "Verdana",

    // ============= BINGO CARD SETTINGS (10 keys) =============
    "bingoRows": "Rader (3–5):",
    "bingoColumns": "Kolumner (3–5):",
    "numberOfCards": "Antal brickor (1–10):",
    "cardCellFill": "Innehåll i rutor:",
    "chipFill": "Innehåll på marker:",
    "image": "Bild",
    "word": "Ord",
    "useCustomSelection": "Använd eget urval (nedan)",

    // ============= IMAGE LIBRARY (6 keys) =============
    "selectTheme": "Välj tema:",
    "searchImages": "Sök bilder:",
    "searchPlaceholder": "t.ex. äpple, bil",
    "selectedForCustomCallouts": "Valda för egen uppropslista: {count}",
    "availableImagesCallouts": "Tillgängliga bilder (Klicka för att lägga till i uppropslistan):",
    "loadingImages": "Laddar bilder...",
    "selectedCustomImages": "Valda egna bilder:",

    // ============= UPLOAD SECTION (3 keys) =============
    "selectImagesToUpload": "Välj bilder att ladda upp:",
    "yourUploadedImages": "Dina uppladdade bilder (denna session):",
    "uploadedImagesWillAppear": "Dina uppladdade bilder visas här.",

    // ============= TOOLBAR (7 keys) =============
    "layers": "Lager",
    "bringForward": "Flytta framåt",
    "sendBackward": "Flytta bakåt",
    "bringToFront": "Flytta längst fram",
    "sendToBack": "Flytta längst bak",
    "align": "Justera",
    "alignSelected": "Justera markering:",
    "alignToPage": "Justera mot sidan:",
    "deleteSelected": "Ta bort markering",
    "alignLeft": "Justera vänster",
    "alignRight": "Justera höger",
    "alignTop": "Justera överst",
    "alignBottom": "Justera nederst",
    "centerHorizontally": "Centrera horisontellt",
    "centerVertically": "Centrera vertikalt",
    "centerOnPageHorizontally": "Centrera på sidan horisontellt",
    "centerOnPageVertically": "Centrera på sidan vertikalt",
    "zoomIn": "Zooma in",
    "zoomOut": "Zooma ut",
    "resetZoom": "Återställ zoom",
    "undo": "Ångra (Ctrl+Z)",
    "redo": "Gör om (Ctrl+Y)",

    // ============= SUCCESS MESSAGES (8 keys) =============
    "bingoWorksheetGenerated": "Bingoarbetsblad skapat!",
    "downloadInitiated": "Nedladdning påbörjad!",
    "zipDownloadInitiated": "ZIP-nedladdning påbörjad!",
    "pdfDownloaded": "PDF nedladdad!",
    "formCleared": "Formulär rensat.",
    "customImagesAvailable": "{count} egen/egna bild(er) tillgänglig(a).",
    "jpegDownloadInitiated": "JPEG-nedladdning påbörjad!",

    // ============= ERROR MESSAGES (12 keys) =============
    "needMoreImagesForCallout": "Det behövs {required} bilder för uppropslistan, men endast {selected} är valda. Välj fler.",
    "notEnoughImagesInLibrary": "Det valda biblioteket har bara {available} bilder. Det behövs {required} för att skapa spelet. Välj ett större tema eller använd eget urval.",
    "couldNotGenerateCards": "Kunde inte skapa {count} unika brickor.",
    "canvasIsEmpty": "Arbetsytan är tom.",
    "errorPreparingJpeg": "Fel vid förberedelse av JPEG: {error}",
    "noCardDataAvailable": "Ingen brickdata tillgänglig.",
    "errorCreatingZip": "Fel vid skapande av ZIP-fil: {error}",
    "errorCreatingPdf": "Fel vid skapande av PDF: {error}",
    "errorReadingFile": "Fel vid läsning av fil: {filename}",
    "generationFailed": "Skapande misslyckades: {error}",
    "pleaseGenerateContentFirst": "Skapa innehåll först.",
    "pleaseGenerateWorksheetFirst": "Skapa ett arbetsblad först.",

    // ============= INFO/STATUS MESSAGES (5 keys) =============
    "preparingFile": "Förbereder {filename}...",
    "preparingZipFile": "Förbereder ZIP-fil...",
    "preparingPdf": "Förbereder PDF...",
    "preparingJpeg": "Förbereder JPEG...",
    "loadingImagesCount": "Laddar {count} bild(er)...",

    // ============= WATERMARK TEXT (2 keys) =============
    "watermarkText": "GRATIS VERSION - LessonCraftStudio.com",
    "watermarkSmallText": "GRATIS VERSION",

    // ============= FILE INPUT =============
    "chooseFiles": "Välj filer",
    "noFileChosen": "Ingen fil vald",
    "filesSelected": "{count} fil(er) valda"
  },

  /**
   * DANISH - Dansk (141 keys)
   * Professional Danish translation for educational context
   */
  "da": {
    // ============= LANGUAGE NAMES (11 keys) =============
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

    // ============= CORE UI (5 keys) =============
    "worksheetSettings": "Arbejdsark indstillinger",
    "language": "Sprog:",
    "imageLibraryLanguage": "Billedbibliotekssprog:",
    "cardsAndChips": "Plader + Brikker",
    "callouts": "Opråbsliste",

    // ============= ACTION BUTTONS (8 keys) =============
    "generate": "Opret",
    "download": "Hent",
    "worksheetJpeg": "Arbejdsark (JPEG)",
    "calloutJpeg": "Opråbsliste (JPEG)",
    "worksheetPdf": "Arbejdsark (PDF)",
    "calloutPdf": "Opråbsliste (PDF)",
    "grayscale": "Gråtoner",
    "clearAll": "Ryd alt",

    // ============= ACCORDION HEADERS (5 keys) =============
    "pageSetup": "Sideopsætning",
    "textTools": "Tekstværktøjer",
    "bingoCardSettings": "Bingoindstillinger",
    "imageLibrary": "Billedbibliotek",
    "uploadCustomImages": "Upload egne billeder",

    // ============= PAGE SETUP (11 keys) =============
    "pageSize": "Sidestørrelse:",
    "letterPortrait": "Letter Stående (8,5×11\")",
    "letterLandscape": "Letter Liggende (11×8,5\")",
    "a4Portrait": "A4 Stående (210×297mm)",
    "a4Landscape": "A4 Liggende (297×210mm)",
    "square": "Kvadrat (1200x1200)",
    "custom": "Tilpasset",
    "widthPx": "Bredde (px):",
    "heightPx": "Højde (px):",
    "pageColor": "Sidefarve:",
    "applySize": "Anvend størrelse",

    // ============= BACKGROUND SECTION (5 keys) =============
    "background": "Baggrund",
    "backgroundTheme": "Baggrundstema:",
    "none": "Ingen",
    "allThemes": "Alle temaer",
    "selectBackgroundTheme": "Vælg et tema til baggrunde.",
    "backgroundOpacity": "Baggrundsgennemsigtighed:",

    // ============= BORDER SECTION (4 keys) =============
    "border": "Ramme",
    "borderTheme": "Rammetema:",
    "selectBorderTheme": "Vælg et tema til rammer.",
    "borderOpacity": "Rammegennemsigtighed:",

    // ============= TEXT TOOLS (10 keys) =============
    "addNewText": "Tilføj tekst",
    "content": "Indhold:",
    "helloPlaceholder": "Hej!",
    "addText": "Indsæt tekst",
    "selectedTextProperties": "Egenskaber for valgt tekst",
    "color": "Farve:",
    "size": "Størrelse:",
    "font": "Skrifttype:",
    "outlineColor": "Konturfarve:",
    "outlineWidth": "Konturbredde (0-10):",

    // ============= FONT OPTIONS (7 keys) =============
    "font_lexend": "Lexend Deca",
    "font_baloo": "Baloo 2",
    "font_nunito": "Nunito",
    "font_quicksand": "Quicksand",
    "font_fredoka": "Fredoka",
    "font_arial": "Arial",
    "font_verdana": "Verdana",

    // ============= BINGO CARD SETTINGS (10 keys) =============
    "bingoRows": "Rækker (3–5):",
    "bingoColumns": "Kolonner (3–5):",
    "numberOfCards": "Antal plader (1–10):",
    "cardCellFill": "Indhold i felter:",
    "chipFill": "Indhold på brikker:",
    "image": "Billede",
    "word": "Ord",
    "useCustomSelection": "Brug eget udvalg (nedenfor)",

    // ============= IMAGE LIBRARY (6 keys) =============
    "selectTheme": "Vælg tema:",
    "searchImages": "Søg billeder:",
    "searchPlaceholder": "fx æble, bil",
    "selectedForCustomCallouts": "Valgt til egen opråbsliste: {count}",
    "availableImagesCallouts": "Tilgængelige billeder (Klik for at tilføje til opråbslisten):",
    "loadingImages": "Indlæser billeder...",
    "selectedCustomImages": "Valgte egne billeder:",

    // ============= UPLOAD SECTION (3 keys) =============
    "selectImagesToUpload": "Vælg billeder til upload:",
    "yourUploadedImages": "Dine uploadede billeder (denne session):",
    "uploadedImagesWillAppear": "Dine uploadede billeder vises her.",

    // ============= TOOLBAR (7 keys) =============
    "layers": "Lag",
    "bringForward": "Flyt fremad",
    "sendBackward": "Flyt bagud",
    "bringToFront": "Flyt forrest",
    "sendToBack": "Flyt bagerst",
    "align": "Juster",
    "alignSelected": "Juster markering:",
    "alignToPage": "Juster til siden:",
    "deleteSelected": "Slet markering",
    "alignLeft": "Juster til venstre",
    "alignRight": "Juster til højre",
    "alignTop": "Juster til top",
    "alignBottom": "Juster til bund",
    "centerHorizontally": "Centrer vandret",
    "centerVertically": "Centrer lodret",
    "centerOnPageHorizontally": "Centrer på siden vandret",
    "centerOnPageVertically": "Centrer på siden lodret",
    "zoomIn": "Zoom ind",
    "zoomOut": "Zoom ud",
    "resetZoom": "Nulstil zoom",
    "undo": "Fortryd (Ctrl+Z)",
    "redo": "Gentag (Ctrl+Y)",

    // ============= SUCCESS MESSAGES (8 keys) =============
    "bingoWorksheetGenerated": "Bingoarbejdsark oprettet!",
    "downloadInitiated": "Download startet!",
    "zipDownloadInitiated": "ZIP-download startet!",
    "pdfDownloaded": "PDF hentet!",
    "formCleared": "Formular ryddet.",
    "customImagesAvailable": "{count} eget/egne billede(r) tilgængelig(t).",
    "jpegDownloadInitiated": "JPEG-download startet!",

    // ============= ERROR MESSAGES (12 keys) =============
    "needMoreImagesForCallout": "Der skal bruges {required} billeder til opråbslisten, men kun {selected} er valgt. Vælg venligst flere.",
    "notEnoughImagesInLibrary": "Det valgte bibliotek har kun {available} billeder. Der skal bruges {required} for at oprette spillet. Vælg et større tema eller brug eget udvalg.",
    "couldNotGenerateCards": "Kunne ikke oprette {count} unikke plader.",
    "canvasIsEmpty": "Arbejdsområdet er tomt.",
    "errorPreparingJpeg": "Fejl ved forberedelse af JPEG: {error}",
    "noCardDataAvailable": "Ingen pladedata tilgængelig.",
    "errorCreatingZip": "Fejl ved oprettelse af ZIP-fil: {error}",
    "errorCreatingPdf": "Fejl ved oprettelse af PDF: {error}",
    "errorReadingFile": "Fejl ved læsning af fil: {filename}",
    "generationFailed": "Oprettelse mislykkedes: {error}",
    "pleaseGenerateContentFirst": "Opret venligst indhold først.",
    "pleaseGenerateWorksheetFirst": "Opret venligst et arbejdsark først.",

    // ============= INFO/STATUS MESSAGES (5 keys) =============
    "preparingFile": "Forbereder {filename}...",
    "preparingZipFile": "Forbereder ZIP-fil...",
    "preparingPdf": "Forbereder PDF...",
    "preparingJpeg": "Forbereder JPEG...",
    "loadingImagesCount": "Indlæser {count} billede(r)...",

    // ============= WATERMARK TEXT (2 keys) =============
    "watermarkText": "GRATIS VERSION - LessonCraftStudio.com",
    "watermarkSmallText": "GRATIS VERSION",

    // ============= FILE INPUT =============
    "chooseFiles": "Välj filer",
    "noFileChosen": "Ingen fil vald",
    "filesSelected": "{count} fil(er) valda"
  },

  /**
   * NORWEGIAN - Norsk (141 keys)
   * Professional Norwegian translation for educational context
   */
  "no": {
    // ============= LANGUAGE NAMES (11 keys) =============
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

    // ============= CORE UI (5 keys) =============
    "worksheetSettings": "Arbeidsark innstillinger",
    "language": "Språk:",
    "imageLibraryLanguage": "Bildebiblioteksspråk:",
    "cardsAndChips": "Brett + Brikker",
    "callouts": "Oppropsliste",

    // ============= ACTION BUTTONS (8 keys) =============
    "generate": "Lag",
    "download": "Last ned",
    "worksheetJpeg": "Arbeidsark (JPEG)",
    "calloutJpeg": "Oppropsliste (JPEG)",
    "worksheetPdf": "Arbeidsark (PDF)",
    "calloutPdf": "Oppropsliste (PDF)",
    "grayscale": "Gråtoner",
    "clearAll": "Fjern alt",

    // ============= ACCORDION HEADERS (5 keys) =============
    "pageSetup": "Sideoppsett",
    "textTools": "Tekstverktøy",
    "bingoCardSettings": "Bingoinnstillinger",
    "imageLibrary": "Bildebibliotek",
    "uploadCustomImages": "Last opp egne bilder",

    // ============= PAGE SETUP (11 keys) =============
    "pageSize": "Sidestørrelse:",
    "letterPortrait": "Letter Stående (8,5×11\")",
    "letterLandscape": "Letter Liggende (11×8,5\")",
    "a4Portrait": "A4 Stående (210×297mm)",
    "a4Landscape": "A4 Liggende (297×210mm)",
    "square": "Kvadrat (1200x1200)",
    "custom": "Tilpasset",
    "widthPx": "Bredde (px):",
    "heightPx": "Høyde (px):",
    "pageColor": "Sidefarge:",
    "applySize": "Bruk størrelse",

    // ============= BACKGROUND SECTION (5 keys) =============
    "background": "Bakgrunn",
    "backgroundTheme": "Bakgrunnstema:",
    "none": "Ingen",
    "allThemes": "Alle temaer",
    "selectBackgroundTheme": "Velg et tema for bakgrunner.",
    "backgroundOpacity": "Bakgrunnsdekkevne:",

    // ============= BORDER SECTION (4 keys) =============
    "border": "Ramme",
    "borderTheme": "Rammetema:",
    "selectBorderTheme": "Velg et tema for rammer.",
    "borderOpacity": "Rammedekkevne:",

    // ============= TEXT TOOLS (10 keys) =============
    "addNewText": "Legg til tekst",
    "content": "Innhold:",
    "helloPlaceholder": "Hei!",
    "addText": "Sett inn tekst",
    "selectedTextProperties": "Egenskaper for valgt tekst",
    "color": "Farge:",
    "size": "Størrelse:",
    "font": "Skrifttype:",
    "outlineColor": "Omrissfarge:",
    "outlineWidth": "Omrissbredde (0-10):",

    // ============= FONT OPTIONS (7 keys) =============
    "font_lexend": "Lexend Deca",
    "font_baloo": "Baloo 2",
    "font_nunito": "Nunito",
    "font_quicksand": "Quicksand",
    "font_fredoka": "Fredoka",
    "font_arial": "Arial",
    "font_verdana": "Verdana",

    // ============= BINGO CARD SETTINGS (10 keys) =============
    "bingoRows": "Rader (3–5):",
    "bingoColumns": "Kolonner (3–5):",
    "numberOfCards": "Antall brett (1–10):",
    "cardCellFill": "Innhold i ruter:",
    "chipFill": "Innhold på brikker:",
    "image": "Bilde",
    "word": "Ord",
    "useCustomSelection": "Bruk eget utvalg (nedenfor)",

    // ============= IMAGE LIBRARY (6 keys) =============
    "selectTheme": "Velg tema:",
    "searchImages": "Søk bilder:",
    "searchPlaceholder": "f.eks. eple, bil",
    "selectedForCustomCallouts": "Valgt for egen oppropsliste: {count}",
    "availableImagesCallouts": "Tilgjengelige bilder (Klikk for å legge til i oppropslisten):",
    "loadingImages": "Laster inn bilder...",
    "selectedCustomImages": "Valgte egne bilder:",

    // ============= UPLOAD SECTION (3 keys) =============
    "selectImagesToUpload": "Velg bilder å laste opp:",
    "yourUploadedImages": "Dine opplastede bilder (denne økten):",
    "uploadedImagesWillAppear": "Dine opplastede bilder vises her.",

    // ============= TOOLBAR (7 keys) =============
    "layers": "Lag",
    "bringForward": "Flytt fremover",
    "sendBackward": "Flytt bakover",
    "bringToFront": "Flytt lengst frem",
    "sendToBack": "Flytt lengst bak",
    "align": "Juster",
    "alignSelected": "Juster markering:",
    "alignToPage": "Juster til siden:",
    "deleteSelected": "Slett markering",
    "alignLeft": "Juster til venstre",
    "alignRight": "Juster til høyre",
    "alignTop": "Juster til topp",
    "alignBottom": "Juster til bunn",
    "centerHorizontally": "Sentrér horisontalt",
    "centerVertically": "Sentrér vertikalt",
    "centerOnPageHorizontally": "Sentrér på siden horisontalt",
    "centerOnPageVertically": "Sentrér på siden vertikalt",
    "zoomIn": "Zoom inn",
    "zoomOut": "Zoom ut",
    "resetZoom": "Tilbakestill zoom",
    "undo": "Angre (Ctrl+Z)",
    "redo": "Gjør om (Ctrl+Y)",

    // ============= SUCCESS MESSAGES (8 keys) =============
    "bingoWorksheetGenerated": "Bingo-arbeidsark laget!",
    "downloadInitiated": "Nedlasting startet!",
    "zipDownloadInitiated": "ZIP-nedlasting startet!",
    "pdfDownloaded": "PDF lastet ned!",
    "formCleared": "Skjema tømt.",
    "customImagesAvailable": "{count} eget/egne bilde(r) tilgjengelig.",
    "jpegDownloadInitiated": "JPEG-nedlasting startet!",

    // ============= ERROR MESSAGES (12 keys) =============
    "needMoreImagesForCallout": "Trenger {required} bilder for oppropslisten, men bare {selected} er valgt. Velg flere.",
    "notEnoughImagesInLibrary": "Det valgte biblioteket har bare {available} bilder. Trenger {required} for å lage spillet. Velg et større tema eller bruk eget utvalg.",
    "couldNotGenerateCards": "Kunne ikke lage {count} unike brett.",
    "canvasIsEmpty": "Arbeidsområdet er tomt.",
    "errorPreparingJpeg": "Feil ved klargjøring av JPEG: {error}",
    "noCardDataAvailable": "Ingen brettdata tilgjengelig.",
    "errorCreatingZip": "Feil ved opprettelse av ZIP-fil: {error}",
    "errorCreatingPdf": "Feil ved opprettelse av PDF: {error}",
    "errorReadingFile": "Feil ved lesing av fil: {filename}",
    "generationFailed": "Generering mislyktes: {error}",
    "pleaseGenerateContentFirst": "Vennligst lag innhold først.",
    "pleaseGenerateWorksheetFirst": "Vennligst lag et arbeidsark først.",

    // ============= INFO/STATUS MESSAGES (5 keys) =============
    "preparingFile": "Klargjør {filename}...",
    "preparingZipFile": "Klargjør ZIP-fil...",
    "preparingPdf": "Klargjør PDF...",
    "preparingJpeg": "Klargjør JPEG...",
    "loadingImagesCount": "Laster inn {count} bilde(r)...",

    // ============= WATERMARK TEXT (2 keys) =============
    "watermarkText": "GRATIS VERSJON - LessonCraftStudio.com",
    "watermarkSmallText": "GRATIS VERSJON",

    // ============= FILE INPUT =============
    "chooseFiles": "Velg filer",
    "noFileChosen": "Ingen fil valgt",
    "filesSelected": "{count} fil(er) valgt"
  },

  /**
   * FINNISH - Suomi (141 keys)
   * Professional Finnish translation for educational context
   */
  "fi": {
    // ============= LANGUAGE NAMES (11 keys) =============
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

    // ============= CORE UI (5 keys) =============
    "worksheetSettings": "Tehtäväarkin asetukset",
    "language": "Kieli:",
    "imageLibraryLanguage": "Kuvakirjaston kieli:",
    "cardsAndChips": "Pelilaudat + Pelimerkit",
    "callouts": "Huutolista",

    // ============= ACTION BUTTONS (8 keys) =============
    "generate": "Luo",
    "download": "Lataa",
    "worksheetJpeg": "Tehtäväarkki (JPEG)",
    "calloutJpeg": "Huutolista (JPEG)",
    "worksheetPdf": "Tehtäväarkki (PDF)",
    "calloutPdf": "Huutolista (PDF)",
    "grayscale": "Harmaasävy",
    "clearAll": "Tyhjennä kaikki",

    // ============= ACCORDION HEADERS (5 keys) =============
    "pageSetup": "Sivun asetukset",
    "textTools": "Tekstityökalut",
    "bingoCardSettings": "Bingon asetukset",
    "imageLibrary": "Kuvakirjasto",
    "uploadCustomImages": "Lataa omia kuvia",

    // ============= PAGE SETUP (11 keys) =============
    "pageSize": "Sivun koko:",
    "letterPortrait": "Letter Pysty (8,5×11\")",
    "letterLandscape": "Letter Vaaka (11×8,5\")",
    "a4Portrait": "A4 Pysty (210×297mm)",
    "a4Landscape": "A4 Vaaka (297×210mm)",
    "square": "Neliö (1200x1200)",
    "custom": "Mukautettu",
    "widthPx": "Leveys (px):",
    "heightPx": "Korkeus (px):",
    "pageColor": "Sivun väri:",
    "applySize": "Käytä kokoa",

    // ============= BACKGROUND SECTION (5 keys) =============
    "background": "Tausta",
    "backgroundTheme": "Taustateema:",
    "none": "Ei mitään",
    "allThemes": "Kaikki teemat",
    "selectBackgroundTheme": "Valitse taustojen teema.",
    "backgroundOpacity": "Taustan läpinäkyvyys:",

    // ============= BORDER SECTION (4 keys) =============
    "border": "Kehys",
    "borderTheme": "Kehysteema:",
    "selectBorderTheme": "Valitse kehysten teema.",
    "borderOpacity": "Kehyksen läpinäkyvyys:",

    // ============= TEXT TOOLS (10 keys) =============
    "addNewText": "Lisää tekstiä",
    "content": "Sisältö:",
    "helloPlaceholder": "Hei!",
    "addText": "Lisää teksti",
    "selectedTextProperties": "Valitun tekstin ominaisuudet",
    "color": "Väri:",
    "size": "Koko:",
    "font": "Fontti:",
    "outlineColor": "Ääriviivan väri:",
    "outlineWidth": "Ääriviivan leveys (0-10):",

    // ============= FONT OPTIONS (7 keys) =============
    "font_lexend": "Lexend Deca",
    "font_baloo": "Baloo 2",
    "font_nunito": "Nunito",
    "font_quicksand": "Quicksand",
    "font_fredoka": "Fredoka",
    "font_arial": "Arial",
    "font_verdana": "Verdana",

    // ============= BINGO CARD SETTINGS (10 keys) =============
    "bingoRows": "Rivit (3–5):",
    "bingoColumns": "Sarakkeet (3–5):",
    "numberOfCards": "Pelilautojen määrä (1–10):",
    "cardCellFill": "Ruutujen sisältö:",
    "chipFill": "Pelimerkkien sisältö:",
    "image": "Kuva",
    "word": "Sana",
    "useCustomSelection": "Käytä omaa valintaa (alla)",

    // ============= IMAGE LIBRARY (6 keys) =============
    "selectTheme": "Valitse teema:",
    "searchImages": "Hae kuvia:",
    "searchPlaceholder": "esim. omena, auto",
    "selectedForCustomCallouts": "Valittu omaan huutolistaan: {count}",
    "availableImagesCallouts": "Saatavilla olevat kuvat (Klikkaa lisätäksesi huutolistaan):",
    "loadingImages": "Ladataan kuvia...",
    "selectedCustomImages": "Valitut omat kuvat:",

    // ============= UPLOAD SECTION (3 keys) =============
    "selectImagesToUpload": "Valitse ladattavat kuvat:",
    "yourUploadedImages": "Omat ladatut kuvat (tämä istunto):",
    "uploadedImagesWillAppear": "Ladatut kuvat näkyvät tässä.",

    // ============= TOOLBAR (7 keys) =============
    "layers": "Tasot",
    "bringForward": "Tuo eteen",
    "sendBackward": "Vie taakse",
    "bringToFront": "Tuo etualalle",
    "sendToBack": "Vie taustalle",
    "align": "Tasaa",
    "alignSelected": "Tasaa valinta:",
    "alignToPage": "Tasaa sivulle:",
    "deleteSelected": "Poista valinta",
    "alignLeft": "Tasaa vasemmalle",
    "alignRight": "Tasaa oikealle",
    "alignTop": "Tasaa ylös",
    "alignBottom": "Tasaa alas",
    "centerHorizontally": "Keskitä vaakasuoraan",
    "centerVertically": "Keskitä pystysuoraan",
    "centerOnPageHorizontally": "Keskitä sivulle vaakasuoraan",
    "centerOnPageVertically": "Keskitä sivulle pystysuoraan",
    "zoomIn": "Lähennä",
    "zoomOut": "Loitonna",
    "resetZoom": "Palauta zoomaus",
    "undo": "Kumoa (Ctrl+Z)",
    "redo": "Tee uudelleen (Ctrl+Y)",

    // ============= SUCCESS MESSAGES (8 keys) =============
    "bingoWorksheetGenerated": "Bingo-tehtäväarkki luotu!",
    "downloadInitiated": "Lataus aloitettu!",
    "zipDownloadInitiated": "ZIP-lataus aloitettu!",
    "pdfDownloaded": "PDF ladattu!",
    "formCleared": "Lomake tyhjennetty.",
    "customImagesAvailable": "{count} oma(a) kuva(a) saatavilla.",
    "jpegDownloadInitiated": "JPEG-lataus aloitettu!",

    // ============= ERROR MESSAGES (12 keys) =============
    "needMoreImagesForCallout": "Huutolistaan tarvitaan {required} kuvaa, mutta vain {selected} on valittu. Valitse lisää.",
    "notEnoughImagesInLibrary": "Valitussa kirjastossa on vain {available} kuvaa. Peliin tarvitaan {required}. Valitse suurempi teema tai käytä omaa valintaa.",
    "couldNotGenerateCards": "Ei voitu luoda {count} yksilöllistä pelilautaa.",
    "canvasIsEmpty": "Työskentelyalue on tyhjä.",
    "errorPreparingJpeg": "Virhe JPEG:n valmistelussa: {error}",
    "noCardDataAvailable": "Ei pelilautatietoja saatavilla.",
    "errorCreatingZip": "Virhe ZIP-tiedoston luomisessa: {error}",
    "errorCreatingPdf": "Virhe PDF:n luomisessa: {error}",
    "errorReadingFile": "Virhe tiedoston lukemisessa: {filename}",
    "generationFailed": "Luominen epäonnistui: {error}",
    "pleaseGenerateContentFirst": "Luo ensin sisältö.",
    "pleaseGenerateWorksheetFirst": "Luo ensin tehtäväarkki.",

    // ============= INFO/STATUS MESSAGES (5 keys) =============
    "preparingFile": "Valmistellaan {filename}...",
    "preparingZipFile": "Valmistellaan ZIP-tiedostoa...",
    "preparingPdf": "Valmistellaan PDF:ää...",
    "preparingJpeg": "Valmistellaan JPEG:iä...",
    "loadingImagesCount": "Ladataan {count} kuva(a)...",

    // ============= WATERMARK TEXT (2 keys) =============
    "watermarkText": "ILMAISVERSIO - LessonCraftStudio.com",
    "watermarkSmallText": "ILMAISVERSIO",

    // ============= FILE INPUT =============
    "chooseFiles": "Valitse tiedostot",
    "noFileChosen": "Ei tiedostoa valittuna",
    "filesSelected": "{count} tiedosto(a) valittu"
  }
};

/**
 * HELPER FUNCTIONS
 * ============================================================
 */

/**
 * Get translation for a key in specified locale
 * @param {string} key - Translation key
 * @param {string} locale - Language locale code (default: 'en')
 * @param {object} params - Optional parameters for placeholder replacement
 * @returns {string} Translated text
 */
function getTranslation(key, locale = 'en', params = {}) {
  const translation = (PICTURE_BINGO_TRANSLATIONS[locale] && PICTURE_BINGO_TRANSLATIONS[locale][key]) ||
                     (PICTURE_BINGO_TRANSLATIONS['en'] && PICTURE_BINGO_TRANSLATIONS['en'][key]) ||
                     key;

  return formatTranslation(translation, params);
}

/**
 * Format translation with placeholder replacement
 * @param {string} text - Text with placeholders like {count}, {filename}
 * @param {object} params - Parameters to replace
 * @returns {string} Formatted text
 */
function formatTranslation(text, params) {
  let formatted = text;
  for (const [key, value] of Object.entries(params)) {
    formatted = formatted.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return formatted;
}

/**
 * Validate translations for a locale
 * @param {string} locale - Locale to validate
 * @returns {object} Validation results with coverage stats
 */
function validateTranslations(locale) {
  const englishKeys = Object.keys(PICTURE_BINGO_TRANSLATIONS.en);
  const localeKeys = Object.keys(PICTURE_BINGO_TRANSLATIONS[locale] || {});

  const missing = englishKeys.filter(key => !localeKeys.includes(key));
  const extra = localeKeys.filter(key => !englishKeys.includes(key));

  return {
    locale,
    totalKeys: englishKeys.length,
    translatedKeys: localeKeys.length,
    missingKeys: missing,
    extraKeys: extra,
    coverage: ((localeKeys.length / englishKeys.length) * 100).toFixed(1) + '%',
    isComplete: missing.length === 0
  };
}

/**
 * Get all supported locales
 * @returns {array} Array of locale codes
 */
function getSupportedLocales() {
  return Object.keys(PICTURE_BINGO_TRANSLATIONS);
}

/**
 * Check if a locale is supported
 * @param {string} locale - Locale code to check
 * @returns {boolean} True if supported
 */
function isLocaleSupported(locale) {
  return locale in PICTURE_BINGO_TRANSLATIONS;
}

/**
 * Validate all translations and return summary
 * @returns {object} Complete validation summary
 */
function validateAllTranslations() {
  const supportedLocales = getSupportedLocales();
  const results = {};

  supportedLocales.forEach(locale => {
    results[locale] = validateTranslations(locale);
  });

  return {
    totalLanguages: supportedLocales.length,
    results: results,
    summary: {
      complete: Object.values(results).filter(r => r.isComplete).length,
      incomplete: Object.values(results).filter(r => !r.isComplete).length
    }
  };
}

/**
 * BACKWARD COMPATIBILITY SUPPORT
 * ============================================================
 * This section provides compatibility with existing translation systems
 * that might be expecting the translations object under different names.
 */

// Alternative function name for compatibility (used in some apps)
const t = getTranslation;

// Compatibility with existing code that expects a different structure
// Note: Not declaring as const/var to avoid conflicts with main translations.js
// The translations object is assigned to window.translations below

/**
 * EXPORT AND GLOBAL ASSIGNMENTS
 * ============================================================
 */

// Export for use in Node.js/module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PICTURE_BINGO_TRANSLATIONS,
    getTranslation,
    formatTranslation,
    validateTranslations,
    validateAllTranslations,
    getSupportedLocales,
    isLocaleSupported,
    t,
    translations: PICTURE_BINGO_TRANSLATIONS
  };
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.PICTURE_BINGO_TRANSLATIONS = PICTURE_BINGO_TRANSLATIONS;
  window.getTranslation = getTranslation;
  window.formatTranslation = formatTranslation;
  window.validateTranslations = validateTranslations;
  window.validateAllTranslations = validateAllTranslations;
  window.getSupportedLocales = getSupportedLocales;
  window.isLocaleSupported = isLocaleSupported;
  window.t = t;

  // Compatibility assignments for existing code
  window.translations = PICTURE_BINGO_TRANSLATIONS;
}

/**
 * VALIDATION SUMMARY
 * ============================================================
 * This section can be used to verify all translations are complete
 */

// Verify all languages have the same number of keys as English
const validationSummary = validateAllTranslations();
console.log(`Picture Bingo Translations Loaded: ${validationSummary.totalLanguages} languages`);
console.log(`Complete translations: ${validationSummary.summary.complete}/${validationSummary.totalLanguages}`);

if (validationSummary.summary.incomplete > 0) {
  console.warn(`${validationSummary.summary.incomplete} languages have incomplete translations`);
  Object.entries(validationSummary.results).forEach(([locale, result]) => {
    if (!result.isComplete) {
      console.warn(`${locale.toUpperCase()}: ${result.coverage} coverage (${result.missingKeys.length} missing keys)`);
    }
  });
}

/**
 * USAGE EXAMPLES
 * ============================================================
 *
 * Basic usage:
 * const text = getTranslation('generate', 'de'); // Returns "Erstellen"
 *
 * With parameters:
 * const text = getTranslation('customImagesAvailable', 'fr', {count: 5});
 * // Returns "5 image(s) personnalisée(s) disponible(s)."
 *
 * Validation:
 * const validation = validateTranslations('sv');
 * console.log(validation.coverage); // "100%"
 *
 * Check support:
 * if (isLocaleSupported('de')) {
 *   // German is supported
 * }
 *
 * INTEGRATION WITH PICTURE BINGO APP:
 * ============================================================
 *
 * 1. Include this file in your HTML:
 *    <script src="js/translations-picture-bingo.js"></script>
 *
 * 2. In your app, replace hardcoded text with translation calls:
 *    // Instead of: button.textContent = "Generate";
 *    button.textContent = getTranslation('generate', currentLocale);
 *
 * 3. For dynamic messages with parameters:
 *    // Instead of: `${count} custom images available`
 *    getTranslation('customImagesAvailable', currentLocale, {count: count});
 *
 * 4. Add data-translate attributes to HTML elements:
 *    <button data-translate="generate">Generate</button>
 *
 * 5. Set up language change handling:
 *    function changeLanguage(newLocale) {
 *      currentLocale = newLocale;
 *      updateAllTranslations();
 *    }
 */