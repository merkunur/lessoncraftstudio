// Word Scramble Complete Translations - All 11 Languages
// Based on CRITICAL-TRANSLATION-IMPLEMENTATION-GUIDE patterns
// Includes all dynamic messages, file inputs, and UI elements

const translations = {
    en: {
        // Page title and main headers
        "wordScrambleTitle": "Image Word Scramble Worksheet",
        "worksheetSettings": "Worksheet Settings",

        // Accordion headers
        "languageSettings": "Language Settings",
        "pageSetup": "Page Setup",
        "textTools": "Text Tools",
        "imageSelection": "Image Selection",
        "uploadCustomImages": "Upload Custom Images",
        "problemSettings": "Problem Settings",

        // Tab labels
        "worksheet": "Worksheet",
        "answerKey": "Answer Key",

        // Common UI elements
        "language": "Language:",
        "none": "None",
        "common.none": "None",
    "none": "None",
        "loading": "Loading...",
        "error": "Error",
        "success": "Success",
        "create": "Create",
        "newWorksheet": "New Worksheet",
        "download": "Download",
        "clearAll": "Clear All",

        // Generate dropdown options
        "generateWorksheet": "Create Worksheet",
        "generateAnswerKey": "Create Answer Key",

        // Page setup
        "pageSize": "Page Size:",
        "letterPortrait": "Letter (Portrait)",
        "letterLandscape": "Letter (Landscape)",
        "a4Portrait": "A4 (Portrait)",
        "a4Landscape": "A4 (Landscape)",
        "legalPortrait": "Legal (Portrait)",
        "legalLandscape": "Legal (Landscape)",
        "custom": "Custom",
        "width": "Width:",
        "height": "Height:",
        "setPageSize": "Set Page Size",
        "pageColor": "Page Color:",

        // Backgrounds and borders
        "backgroundTheme": "Background Theme:",
        "selectThemeForBackgrounds": "Select a theme for backgrounds.",
        "backgroundOpacity": "Background Opacity:",
        "borderTheme": "Border Theme:",
        "selectThemeToSeeBorders": "Select a theme to see borders.",
        "borderOpacity": "Border Opacity:",

        // Text tools
        "selectedTextProperties": "Selected Text Properties",
        "textToAdd": "Text to add:",
        "addText": "Add Text",
        "textColor": "Text Color:",
        "fontSize": "Font Size:",
        "fontFamily": "Font Family:",
        "strokeColor": "Stroke Color:",
        "strokeWidth": "Stroke Width:",

        // Image selection
        "selectTheme": "Select Theme:",
        "allThemes": "All Themes",
        "searchImages": "Search Images:",
        "searchPlaceholder": "e.g., apple, car",
        "selectedCountMsg": "Selected: {count} / {max}",
        "selectedImagesForPuzzles": "Selected Images for Puzzles:",

        // Upload section
        "selectImagesToUpload": "Select image(s) to upload:",
        "chooseFiles": "Choose Files",
        "noFileChosen": "No file chosen",
        "filesSelected": "{count} file(s) selected",
        "yourUploadedImages": "Your uploaded images",
        "yourUploadedImagesAppearHere": "Your uploaded images appear here.",

        // Problem settings
        "puzzlesPerPage": "Puzzles per page:",
        "difficulty": "Difficulty (Number of Clues)",
        "noClues": "No clues",
        "easy": "Easy (1/2)",
        "normal": "Normal (1/4)",
        "tough": "Tough (1/6)",
        "letterCase": "Letter Case",
        "uppercase": "Uppercase",
        "lowercase": "Lowercase",
        "letterColors": "Letter Colors",
        "colorCodedVowelConsonant": "Color Coded (Vowel/Consonant)",
        "allBlack": "All Black",
        "includeNameDateLine": "Include name/date line",
        "includeExerciseNumbers": "Include exercise numbers",
        "letterColor": "Letter color:",
        "blackWhite": "Black & White",
        "colorCoded": "Color-coded",

        // Zoom Controls
        "zoomIn": "Zoom In",
        "zoomOut": "Zoom Out",
        "resetZoom": "Reset Zoom",

        // History Controls
        "undo": "Undo (Ctrl+Z)",
        "redo": "Redo (Ctrl+Y)",

        // Layer Controls
        "layers": "Layers",
        "bringToFront": "Bring to Front",
        "bringForward": "Bring Forward",
        "sendBackward": "Send Backward",
        "sendToBack": "Send to Back",

        // Alignment Toolbar
        "align": "Align",
        "alignSelected": "Align Selected:",
        "alignToPage": "Align to Page:",
        "alignLeft": "Align Left",
        "centerHorizontally": "Center Horizontally",
        "alignRight": "Align Right",
        "alignTop": "Align Top",
        "centerVertically": "Center Vertically",
        "alignBottom": "Align Bottom",
        "centerOnPageHorizontally": "Center on Page Horizontally",
        "centerOnPageVertically": "Center on Page Vertically",
        "lockUnlock": "Lock/Unlock",
        "unlockAll": "Unlock All",
        "deleteSelected": "Delete Selected",

        // Dynamic messages
        "loadingImages": "Loading images...",
        "noImagesFound": "No images found",
        "noImagesFoundFor": "No images found for \"{query}\"",
        "errorLoadingImages": "Error loading images.",
        "couldNotLoadThemes": "Could not load themes.",
        "maxImagesSelected": "You can select a maximum of {max} images.",
        "customImagesAvailable": "{count} custom image(s) available.",
        "creatingWorksheet": "Creating worksheet...",
        "pleaseSelectImages": "Please select some images or choose a theme with images.",
        "worksheetGeneratedSuccessfully": "Worksheet created successfully!",
        "pleaseGenerateWorksheetFirst": "Please create a worksheet first.",
        "creatingAnswerKey": "Creating answer key...",
        "answerKeyGenerated": "Answer key created!",
        "failedToLoadImage": "Failed to load {type} image.",
        "formCleared": "Form cleared.",
        "preparingCanvas": "Preparing {canvas}...",
        "downloadInitiated": "Download Initiated!",
        "errorPreparingImage": "Error preparing image: {error}",
        "pleaseGenerateContentFirst": "Please create content first.",
        "preparingPdf": "Preparing PDF...",
        "pdfDownloaded": "PDF downloaded!",
        "errorCreatingPdf": "Error creating PDF.",
        "preparingJpeg": "Preparing JPEG...",
        "jpegDownloadInitiated": "JPEG download initiated!",
        "errorPreparingJpeg": "Error preparing JPEG.",
        "preparingCanvasPdf": "Preparing {canvas} PDF...",
        "pdfDownloadComplete": "PDF Downloaded!",
        "errorCreatingPdfWithMessage": "Error creating PDF: {error}",

        // Download menu
        "worksheetJpeg": "Worksheet (JPEG)",
        "answerKeyJpeg": "Answer Key (JPEG)",
        "worksheetPdf": "Worksheet (PDF)",
        "answerKeyPdf": "Answer Key (PDF)",
        "grayscale": "Grayscale"
    },

    de: {
        // Page title and main headers
        "wordScrambleTitle": "Buchstabensalat-Generator",
        "worksheetSettings": "Arbeitsblatteinstellungen",

        // Accordion headers
        "languageSettings": "Spracheinstellungen",
        "pageSetup": "Seitenformat",
        "textTools": "Textwerkzeuge",
        "imageSelection": "Bildauswahl",
        "uploadCustomImages": "Eigene Bilder hochladen",
        "problemSettings": "Rätseleinstellungen",

        // Tab labels
        "worksheet": "Arbeitsblatt",
        "answerKey": "Lösungsblatt",

        // Common UI elements
        "language": "Sprache:",
        "none": "Keine",
        "common.none": "Kein",
        "loading": "Lädt...",
        "error": "Fehler",
        "success": "Erfolg",
        "generate": "Erstellen",
        "newWorksheet": "Neues Arbeitsblatt",
        "download": "Herunterladen",
        "clearAll": "Alles zurücksetzen",

        // Generate dropdown options
        "generateWorksheet": "Arbeitsblatt erstellen",
        "generateAnswerKey": "Lösungsblatt erstellen",

        // Page setup
        "pageSize": "Papierformat:",
        "letterPortrait": "Letter (Hochformat)",
        "letterLandscape": "Letter (Querformat)",
        "a4Portrait": "DIN A4 (Hochformat)",
        "a4Landscape": "DIN A4 (Querformat)",
        "legalPortrait": "Legal (Hochformat)",
        "legalLandscape": "Legal (Querformat)",
        "custom": "Benutzerdefiniert",
        "width": "Breite:",
        "height": "Höhe:",
        "setPageSize": "Format festlegen",
        "pageColor": "Seitenfarbe:",

        // Backgrounds and borders
        "backgroundTheme": "Hintergrundthema:",
        "selectThemeForBackgrounds": "Wählen Sie ein Thema für Hintergründe.",
        "backgroundOpacity": "Hintergrund-Transparenz:",
        "borderTheme": "Rahmenthema:",
        "selectThemeToSeeBorders": "Wählen Sie ein Thema für Rahmen.",
        "borderOpacity": "Rahmen-Transparenz:",

        // Text tools
        "selectedTextProperties": "Ausgewählte Texteigenschaften",
        "textToAdd": "Text hinzufügen:",
        "addText": "Text hinzufügen",
        "textColor": "Textfarbe:",
        "fontSize": "Schriftgröße:",
        "fontFamily": "Schriftart:",
        "strokeColor": "Umrissfarbe:",
        "strokeWidth": "Umrissstärke:",

        // Image selection
        "selectTheme": "Thema auswählen:",
        "allThemes": "Alle Themen",
        "searchImages": "Bilder suchen:",
        "searchPlaceholder": "z.B. Apfel, Auto",
        "selectedCountMsg": "Ausgewählt: {count} / {max}",
        "selectedImagesForPuzzles": "Ausgewählte Bilder für Rätsel:",

        // Upload section
        "selectImagesToUpload": "Bilder zum Hochladen auswählen:",
        "chooseFiles": "Dateien auswählen",
        "noFileChosen": "Keine Datei ausgewählt",
        "filesSelected": "{count} Datei(en) ausgewählt",
        "yourUploadedImages": "Ihre hochgeladenen Bilder",
        "yourUploadedImagesAppearHere": "Ihre hochgeladenen Bilder erscheinen hier.",

        // Problem settings
        "puzzlesPerPage": "Rätsel pro Seite:",
        "difficulty": "Schwierigkeitsgrad (Anzahl Hinweise)",
        "noClues": "Keine Hinweise",
        "easy": "Leicht (1/2)",
        "normal": "Mittel (1/4)",
        "tough": "Schwer (1/6)",
        "letterCase": "Buchstabengröße",
        "uppercase": "Großbuchstaben",
        "lowercase": "Kleinbuchstaben",
        "letterColors": "Buchstabenfarben",
        "colorCodedVowelConsonant": "Farbcodiert (Vokal/Konsonant)",
        "allBlack": "Alles Schwarz",
        "includeNameDateLine": "Name/Datum-Zeile einfügen",
        "includeExerciseNumbers": "Rätselnummern einfügen",
        "letterColor": "Buchstabenfarbe:",
        "blackWhite": "Schwarz & Weiß",
        "colorCoded": "Farbcodiert",

        // Zoom Controls
        "zoomIn": "Vergrößern",
        "zoomOut": "Verkleinern",
        "resetZoom": "Zoom zurücksetzen",

        // History Controls
        "undo": "Rückgängig (Strg+Z)",
        "redo": "Wiederholen (Strg+Y)",

        // Layer Controls
        "layers": "Ebenen",
        "bringToFront": "Ganz nach vorne",
        "bringForward": "Nach vorne",
        "sendBackward": "Nach hinten",
        "sendToBack": "Ganz nach hinten",

        // Alignment Toolbar
        "align": "Ausrichten",
        "alignSelected": "Ausgewählte ausrichten:",
        "alignToPage": "An Seite ausrichten:",
        "alignLeft": "Links ausrichten",
        "centerHorizontally": "Horizontal zentrieren",
        "alignRight": "Rechts ausrichten",
        "alignTop": "Oben ausrichten",
        "centerVertically": "Vertikal zentrieren",
        "alignBottom": "Unten ausrichten",
        "centerOnPageHorizontally": "Horizontal auf Seite zentrieren",
        "centerOnPageVertically": "Vertikal auf Seite zentrieren",
        "lockUnlock": "Sperren/Entsperren",
        "unlockAll": "Alle entsperren",
        "deleteSelected": "Ausgewählte löschen",

        // Dynamic messages
        "loadingImages": "Bilder werden geladen...",
        "noImagesFound": "Keine Bilder gefunden",
        "noImagesFoundFor": "Keine Bilder gefunden für \"{query}\"",
        "errorLoadingImages": "Fehler beim Laden der Bilder.",
        "couldNotLoadThemes": "Themen konnten nicht geladen werden.",
        "maxImagesSelected": "Maximal {max} Bilder können ausgewählt werden.",
        "customImagesAvailable": "{count} eigene Bild(er) verfügbar.",
        "generatingWorksheet": "Arbeitsblatt wird erstellt...",
        "pleaseSelectImages": "Bitte Bilder auswählen oder ein Thema mit Bildern wählen.",
        "worksheetGeneratedSuccessfully": "Arbeitsblatt erfolgreich erstellt!",
        "pleaseGenerateWorksheetFirst": "Bitte zuerst ein Arbeitsblatt erstellen.",
        "generatingAnswerKey": "Lösungsblatt wird erstellt...",
        "answerKeyGenerated": "Lösungsblatt erstellt!",
        "failedToLoadImage": "{type}-Bild konnte nicht geladen werden.",
        "formCleared": "Formular zurückgesetzt.",
        "preparingCanvas": "{canvas} wird vorbereitet...",
        "downloadInitiated": "Download gestartet!",
        "errorPreparingImage": "Fehler beim Vorbereiten des Bildes: {error}",
        "pleaseGenerateContentFirst": "Bitte zuerst Inhalte erstellen.",
        "preparingPdf": "PDF wird vorbereitet...",
        "pdfDownloaded": "PDF heruntergeladen!",
        "errorCreatingPdf": "Fehler beim Erstellen der PDF.",
        "preparingJpeg": "JPEG wird vorbereitet...",
        "jpegDownloadInitiated": "JPEG-Download gestartet!",
        "errorPreparingJpeg": "Fehler beim Vorbereiten des JPEG.",
        "preparingCanvasPdf": "{canvas} PDF wird vorbereitet...",
        "pdfDownloadComplete": "PDF heruntergeladen!",
        "errorCreatingPdfWithMessage": "Fehler beim Erstellen der PDF: {error}",

        // Download menu
        "worksheetJpeg": "Arbeitsblatt (JPEG)",
        "answerKeyJpeg": "Lösungsblatt (JPEG)",
        "worksheetPdf": "Arbeitsblatt (PDF)",
        "answerKeyPdf": "Lösungsblatt (PDF)",
        "grayscale": "Graustufen"
    },

    fr: {
        // Page title and main headers
        "wordScrambleTitle": "Générateur de mots mélangés",
        "worksheetSettings": "Paramètres de la fiche d'exercices",

        // Accordion headers
        "languageSettings": "Paramètres de langue",
        "pageSetup": "Mise en page",
        "textTools": "Options de texte", // Platform standard - retroactive update 2025-11-27
        "imageSelection": "Sélection d'images",
        "uploadCustomImages": "Importer vos images",
        "problemSettings": "Paramètres des énigmes",

        // Tab labels
        "worksheet": "Fiche d'exercices",
        "answerKey": "Corrigé",

        // Common UI elements
        "language": "Langue :",
        "none": "Aucun",
        "common.none": "Aucun",
        "loading": "Chargement...",
        "error": "Erreur",
        "success": "Succès",
        "generate": "Créer",
        "newWorksheet": "Nouvelle fiche",
        "download": "Télécharger",
        "clearAll": "Tout effacer",

        // Generate dropdown options
        "generateWorksheet": "Créer la fiche",
        "generateAnswerKey": "Créer le corrigé",

        // Page setup
        "pageSize": "Format de page :",
        "letterPortrait": "Lettre (Portrait)",
        "letterLandscape": "Lettre (Paysage)",
        "a4Portrait": "A4 (Portrait)",
        "a4Landscape": "A4 (Paysage)",
        "legalPortrait": "Légal (Portrait)",
        "legalLandscape": "Légal (Paysage)",
        "custom": "Personnalisé",
        "width": "Largeur :",
        "height": "Hauteur :",
        "setPageSize": "Définir la taille",
        "pageColor": "Couleur de page :",

        // Backgrounds and borders
        "backgroundTheme": "Thème d'arrière-plan :",
        "selectThemeForBackgrounds": "Sélectionnez un thème pour les arrière-plans.",
        "backgroundOpacity": "Opacité de l'arrière-plan :",
        "borderTheme": "Thème de bordure :",
        "selectThemeToSeeBorders": "Sélectionnez un thème pour les bordures.",
        "borderOpacity": "Opacité de la bordure :",

        // Text tools
        "selectedTextProperties": "Propriétés du texte sélectionné",
        "textToAdd": "Texte à ajouter :",
        "addText": "Ajouter du texte",
        "textColor": "Couleur du texte :",
        "fontSize": "Taille de police :",
        "fontFamily": "Police :",
        "strokeColor": "Couleur du contour :",
        "strokeWidth": "Largeur du contour :",

        // Image selection
        "selectTheme": "Sélectionner le thème :",
        "allThemes": "Tous les thèmes",
        "searchImages": "Rechercher des images :",
        "searchPlaceholder": "ex : pomme, voiture",
        "selectedCountMsg": "Sélectionné : {count} / {max}",
        "selectedImagesForPuzzles": "Images sélectionnées pour les énigmes :",

        // Upload section
        "selectImagesToUpload": "Sélectionner des images à importer :",
        "chooseFiles": "Choisir les fichiers",
        "noFileChosen": "Aucun fichier choisi",
        "filesSelected": "{count} fichier(s) sélectionné(s)",
        "yourUploadedImages": "Vos images importées",
        "yourUploadedImagesAppearHere": "Vos images importées apparaissent ici.",

        // Problem settings
        "puzzlesPerPage": "Énigmes par page :",
        "difficulty": "Difficulté (Nombre d'indices)",
        "noClues": "Sans indices",
        "easy": "Facile (1/2)",
        "normal": "Moyen (1/4)",
        "tough": "Difficile (1/6)",
        "letterCase": "Casse des lettres",
        "uppercase": "Majuscules",
        "lowercase": "Minuscules",
        "letterColors": "Couleurs des lettres",
        "colorCodedVowelConsonant": "Code couleur (voyelles/consonnes)",
        "allBlack": "Noir et blanc",
        "includeNameDateLine": "Inclure ligne nom/date",
        "includeExerciseNumbers": "Inclure numéros d'énigmes",
        "letterColor": "Couleur des lettres :",
        "blackWhite": "Noir et blanc",
        "colorCoded": "Code couleur",

        // Zoom Controls
        "zoomIn": "Zoom avant",
        "zoomOut": "Zoom arrière",
        "resetZoom": "Réinitialiser le zoom",

        // History Controls
        "undo": "Annuler (Ctrl+Z)",
        "redo": "Refaire (Ctrl+Y)",

        // Layer Controls
        "layers": "Calques",
        "bringToFront": "Mettre au premier plan",
        "bringForward": "Avancer",
        "sendBackward": "Reculer",
        "sendToBack": "Mettre à l'arrière-plan",

        // Alignment Toolbar
        "align": "Aligner",
        "alignSelected": "Aligner la sélection :",
        "alignToPage": "Aligner sur la page :",
        "alignLeft": "Aligner à gauche",
        "centerHorizontally": "Centrer horizontalement",
        "alignRight": "Aligner à droite",
        "alignTop": "Aligner en haut",
        "centerVertically": "Centrer verticalement",
        "alignBottom": "Aligner en bas",
        "centerOnPageHorizontally": "Centrer horizontalement sur la page",
        "centerOnPageVertically": "Centrer verticalement sur la page",
        "lockUnlock": "Verrouiller/Déverrouiller",
        "unlockAll": "Tout déverrouiller",
        "deleteSelected": "Supprimer la sélection",

        // Dynamic messages
        "loadingImages": "Chargement des images...",
        "noImagesFound": "Aucune image trouvée",
        "noImagesFoundFor": "Aucune image trouvée pour \"{query}\"",
        "errorLoadingImages": "Erreur lors du chargement des images.",
        "couldNotLoadThemes": "Impossible de charger les thèmes.",
        "maxImagesSelected": "Vous pouvez sélectionner un maximum de {max} images.",
        "customImagesAvailable": "{count} image(s) personnalisée(s) disponible(s).",
        "generatingWorksheet": "Création de la fiche d'exercices...",
        "pleaseSelectImages": "Veuillez sélectionner des images ou choisir un thème avec des images.",
        "worksheetGeneratedSuccessfully": "Fiche d'exercices créée avec succès !",
        "pleaseGenerateWorksheetFirst": "Veuillez d'abord créer une fiche d'exercices.",
        "generatingAnswerKey": "Création du corrigé...",
        "answerKeyGenerated": "Corrigé créé !",
        "failedToLoadImage": "Échec du chargement de l'image {type}.",
        "formCleared": "Formulaire effacé.",
        "preparingCanvas": "Préparation de {canvas}...",
        "downloadInitiated": "Téléchargement lancé !",
        "errorPreparingImage": "Erreur lors de la préparation de l'image : {error}",
        "pleaseGenerateContentFirst": "Veuillez d'abord créer du contenu.",
        "preparingPdf": "Préparation du PDF...",
        "pdfDownloaded": "PDF téléchargé !",
        "errorCreatingPdf": "Erreur lors de la création du PDF.",
        "preparingJpeg": "Préparation du JPEG...",
        "jpegDownloadInitiated": "Téléchargement JPEG lancé !",
        "errorPreparingJpeg": "Erreur lors de la préparation du JPEG.",
        "preparingCanvasPdf": "Préparation du PDF {canvas}...",
        "pdfDownloadComplete": "PDF téléchargé !",
        "errorCreatingPdfWithMessage": "Erreur lors de la création du PDF : {error}",

        // Download menu
        "worksheetJpeg": "Fiche d'exercices (JPEG)",
        "answerKeyJpeg": "Corrigé (JPEG)",
        "worksheetPdf": "Fiche d'exercices (PDF)",
        "answerKeyPdf": "Corrigé (PDF)",
        "grayscale": "Niveaux de gris"
    },

    es: {
        // Page title and main headers
        "wordScrambleTitle": "Generador de palabras desordenadas",
        "worksheetSettings": "Configuración de la Hoja",

        // Accordion headers
        "languageSettings": "Configuración de Idioma",
        "pageSetup": "Configuración de Página",
        "textTools": "Opciones de texto", // Changed from "Herramientas de Texto"
        "imageSelection": "Selección de Imágenes",
        "uploadCustomImages": "Subir Imágenes Propias",
        "problemSettings": "Configuración de Actividades",

        // Tab labels
        "worksheet": "Hoja de Ejercicios",
        "answerKey": "Hoja de Respuestas",

        // Common UI elements
        "language": "Idioma:",
        "none": "Ninguno",
        "common.none": "Ninguno",
    "none": "Ninguno",
        "loading": "Cargando...",
        "error": "Error",
        "success": "Éxito",
        "generate": "Crear",
        "newWorksheet": "Nueva Hoja",
        "download": "Descargar",
        "clearAll": "Borrar Todo",

        // Generate dropdown options
        "generateWorksheet": "Crear Hoja de Ejercicios",
        "generateAnswerKey": "Crear Hoja de Respuestas",

        // Page setup
        "pageSize": "Tamaño de Página:",
        "letterPortrait": "Carta (Vertical)",
        "letterLandscape": "Carta (Horizontal)",
        "a4Portrait": "A4 (Vertical)",
        "a4Landscape": "A4 (Horizontal)",
        "legalPortrait": "Oficio (Vertical)",
        "legalLandscape": "Oficio (Horizontal)",
        "custom": "Personalizado",
        "width": "Ancho:",
        "height": "Alto:",
        "setPageSize": "Establecer Tamaño",
        "pageColor": "Color de Página:",

        // Backgrounds and borders
        "backgroundTheme": "Tema de Fondo:",
        "selectThemeForBackgrounds": "Seleccione un tema para fondos.",
        "backgroundOpacity": "Opacidad del Fondo:",
        "borderTheme": "Tema de Borde:",
        "selectThemeToSeeBorders": "Seleccione un tema para bordes.",
        "borderOpacity": "Opacidad del Borde:",

        // Text tools
        "selectedTextProperties": "Propiedades del Texto Seleccionado",
        "textToAdd": "Texto a añadir:",
        "addText": "Añadir Texto",
        "textColor": "Color del Texto:",
        "fontSize": "Tamaño de Fuente:",
        "fontFamily": "Fuente:",
        "strokeColor": "Color del Contorno:",
        "strokeWidth": "Ancho del Contorno:",

        // Image selection
        "selectTheme": "Seleccionar Tema:",
        "allThemes": "Todos los Temas",
        "searchImages": "Buscar Imágenes:",
        "searchPlaceholder": "ej: manzana, coche",
        "selectedCountMsg": "Seleccionado: {count} / {max}",
        "selectedImagesForPuzzles": "Imágenes Seleccionadas para Actividades:",

        // Upload section
        "selectImagesToUpload": "Seleccionar imágenes para subir:",
        "chooseFiles": "Elegir Archivos",
        "noFileChosen": "Ningún archivo elegido",
        "filesSelected": "{count} archivo(s) seleccionado(s)",
        "yourUploadedImages": "Sus imágenes subidas",
        "yourUploadedImagesAppearHere": "Sus imágenes subidas aparecen aquí.",

        // Problem settings
        "puzzlesPerPage": "Actividades por página:",
        "allBlack": "Todo Negro",
        "colorCodedVowelConsonant": "Codificado por Color (Vocal/Consonante)",
        "letterColors": "Colores de las Letras",
        "lowercase": "Minúsculas",
        "uppercase": "Mayúsculas",
        "letterCase": "Mayúsculas/Minúsculas",
        "tough": "Difícil (1/6)",
        "normal": "Intermedio (1/4)",
        "easy": "Fácil (1/2)",
        "noClues": "Sin pistas",
        "difficulty": "Dificultad (Número de Pistas)",
        "includeNameDateLine": "Incluir línea de nombre/fecha",
        "includeExerciseNumbers": "Incluir números de actividades",
        "letterColor": "Color de las letras:",
        "blackWhite": "Blanco y Negro",
        "colorCoded": "Codificado por colores",

        // Zoom Controls
        "zoomIn": "Acercar",
        "zoomOut": "Alejar",
        "resetZoom": "Restablecer zoom",

        // History Controls
        "undo": "Deshacer (Ctrl+Z)",
        "redo": "Rehacer (Ctrl+Y)",

        // Layer Controls
        "layers": "Capas",
        "bringToFront": "Traer al frente",
        "bringForward": "Traer adelante",
        "sendBackward": "Enviar atrás",
        "sendToBack": "Enviar al fondo",

        // Alignment Toolbar
        "align": "Alinear",
        "alignSelected": "Alinear selección:",
        "alignToPage": "Alinear a la página:",
        "alignLeft": "Alinear a la izquierda",
        "centerHorizontally": "Centrar horizontalmente",
        "alignRight": "Alinear a la derecha",
        "alignTop": "Alinear arriba",
        "centerVertically": "Centrar verticalmente",
        "alignBottom": "Alinear abajo",
        "centerOnPageHorizontally": "Centrar horizontalmente en la página",
        "centerOnPageVertically": "Centrar verticalmente en la página",
        "lockUnlock": "Bloquear/Desbloquear",
        "unlockAll": "Desbloquear todo",
        "deleteSelected": "Eliminar selección",

        // Dynamic messages
        "loadingImages": "Cargando imágenes...",
        "noImagesFound": "No se encontraron imágenes",
        "noImagesFoundFor": "No se encontraron imágenes para \"{query}\"",
        "errorLoadingImages": "Error al cargar las imágenes.",
        "couldNotLoadThemes": "No se pudieron cargar los temas.",
        "maxImagesSelected": "Puede seleccionar un máximo de {max} imágenes.",
        "customImagesAvailable": "{count} imagen(es) personalizada(s) disponible(s).",
        "generatingWorksheet": "Creando hoja de ejercicios...",
        "pleaseSelectImages": "Por favor, seleccione imágenes o elija un tema con imágenes.",
        "worksheetGeneratedSuccessfully": "¡Hoja de ejercicios creada con éxito!",
        "pleaseGenerateWorksheetFirst": "Por favor, cree primero una hoja de ejercicios.",
        "generatingAnswerKey": "Creando hoja de respuestas...",
        "answerKeyGenerated": "¡Hoja de respuestas creada!",
        "failedToLoadImage": "Error al cargar la imagen {type}.",
        "formCleared": "Formulario borrado.",
        "preparingCanvas": "Preparando {canvas}...",
        "downloadInitiated": "¡Descarga iniciada!",
        "errorPreparingImage": "Error al preparar la imagen: {error}",
        "pleaseGenerateContentFirst": "Por favor, cree primero el contenido.",
        "preparingPdf": "Preparando PDF...",
        "pdfDownloaded": "¡PDF descargado!",
        "errorCreatingPdf": "Error al crear el PDF.",
        "preparingJpeg": "Preparando JPEG...",
        "jpegDownloadInitiated": "¡Descarga de JPEG iniciada!",
        "errorPreparingJpeg": "Error al preparar el JPEG.",
        "preparingCanvasPdf": "Preparando PDF de {canvas}...",
        "pdfDownloadComplete": "¡PDF descargado!",
        "errorCreatingPdfWithMessage": "Error al crear el PDF: {error}",

        // Download menu
        "worksheetJpeg": "Hoja de Ejercicios (JPEG)",
        "answerKeyJpeg": "Hoja de Respuestas (JPEG)",
        "worksheetPdf": "Hoja de Ejercicios (PDF)",
        "answerKeyPdf": "Hoja de Respuestas (PDF)",
        "grayscale": "Escala de Grises"
    },

    it: {
        // Page title and main headers
        "wordScrambleTitle": "Generatore di parole mescolate",
        "worksheetSettings": "Impostazioni della scheda didattica",

        // Accordion headers
        "languageSettings": "Impostazioni Lingua",
        "pageSetup": "Impostazione Pagina",
        "textTools": "Opzioni di testo", // Changed from "Strumenti di Testo"
        "imageSelection": "Selezione Immagini",
        "uploadCustomImages": "Carica le Tue Immagini",
        "problemSettings": "Impostazioni Attività",

        // Tab labels
        "worksheet": "Scheda didattica",
        "answerKey": "Soluzioni",

        // Common UI elements
        "language": "Lingua:",
        "none": "Nessuno",
        "common.none": "Nessuno",
    "none": "Nessuno",
        "loading": "Caricamento...",
        "error": "Errore",
        "success": "Successo",
        "generate": "Crea",
        "newWorksheet": "Nuova scheda",
        "download": "Scarica",
        "clearAll": "Cancella tutto",

        // Generate dropdown options
        "generateWorksheet": "Crea Scheda didattica",
        "generateAnswerKey": "Crea Soluzioni",

        // Page setup
        "pageSize": "Formato Pagina:",
        "letterPortrait": "Lettera (Verticale)",
        "letterLandscape": "Lettera (Orizzontale)",
        "a4Portrait": "A4 (Verticale)",
        "a4Landscape": "A4 (Orizzontale)",
        "legalPortrait": "Legale (Verticale)",
        "legalLandscape": "Legale (Orizzontale)",
        "custom": "Personalizzato",
        "width": "Larghezza:",
        "height": "Altezza:",
        "setPageSize": "Imposta dimensione",
        "pageColor": "Colore della pagina:",

        // Backgrounds and borders
        "backgroundTheme": "Tema sfondo:",
        "selectThemeForBackgrounds": "Seleziona un tema per gli sfondi.",
        "backgroundOpacity": "Opacità sfondo:",
        "borderTheme": "Tema bordo:",
        "selectThemeToSeeBorders": "Seleziona un tema per i bordi.",
        "borderOpacity": "Opacità bordo:",

        // Text tools
        "selectedTextProperties": "Proprietà del testo selezionato",
        "textToAdd": "Testo da aggiungere:",
        "addText": "Aggiungi testo",
        "textColor": "Colore del testo:",
        "fontSize": "Dimensione carattere:",
        "fontFamily": "Carattere:",
        "strokeColor": "Colore del contorno:",
        "strokeWidth": "Larghezza del contorno:",

        // Image selection
        "selectTheme": "Seleziona tema:",
        "allThemes": "Tutti i temi",
        "searchImages": "Cerca immagini:",
        "searchPlaceholder": "es: mela, auto",
        "selectedCountMsg": "Selezionato: {count} / {max}",
        "selectedImagesForPuzzles": "Immagini selezionate per le attività:",

        // Upload section
        "selectImagesToUpload": "Seleziona immagini da caricare:",
        "chooseFiles": "Scegli file",
        "noFileChosen": "Nessun file scelto",
        "filesSelected": "{count} file selezionato/i",
        "yourUploadedImages": "Le tue immagini caricate",
        "yourUploadedImagesAppearHere": "Le tue immagini caricate appaiono qui.",

        // Problem settings
        "puzzlesPerPage": "Attività per pagina:",
        "allBlack": "Tutto nero",
        "colorCodedVowelConsonant": "Codice colori (Vocali/Consonanti)",
        "letterColors": "Colori delle lettere",
        "lowercase": "Minuscolo",
        "uppercase": "Maiuscolo",
        "letterCase": "Tipo di lettere",
        "tough": "Difficile (1/6)",
        "normal": "Medio (1/4)",
        "easy": "Facile (1/2)",
        "noClues": "Senza indizi",
        "difficulty": "Difficoltà (Numero di Indizi)",
        "includeNameDateLine": "Includi riga nome/data",
        "includeExerciseNumbers": "Includi numeri attività",
        "letterColor": "Colore delle lettere:",
        "blackWhite": "Bianco e nero",
        "colorCoded": "Codice colori",

        // Zoom Controls
        "zoomIn": "Ingrandisci",
        "zoomOut": "Riduci",
        "resetZoom": "Reimposta zoom",

        // History Controls
        "undo": "Annulla (Ctrl+Z)",
        "redo": "Ripristina (Ctrl+Y)",

        // Layer Controls
        "layers": "Livelli",
        "bringToFront": "Porta in primo piano",
        "bringForward": "Porta avanti",
        "sendBackward": "Porta indietro",
        "sendToBack": "Porta in secondo piano",

        // Alignment Toolbar
        "align": "Allinea",
        "alignSelected": "Allinea selezione:",
        "alignToPage": "Allinea alla pagina:",
        "alignLeft": "Allinea a sinistra",
        "centerHorizontally": "Centra orizzontalmente",
        "alignRight": "Allinea a destra",
        "alignTop": "Allinea in alto",
        "centerVertically": "Centra verticalmente",
        "alignBottom": "Allinea in basso",
        "centerOnPageHorizontally": "Centra orizzontalmente sulla pagina",
        "centerOnPageVertically": "Centra verticalmente sulla pagina",
        "lockUnlock": "Blocca/Sblocca",
        "unlockAll": "Sblocca tutto",
        "deleteSelected": "Elimina selezione",

        // Dynamic messages
        "loadingImages": "Caricamento immagini...",
        "noImagesFound": "Nessuna immagine trovata",
        "noImagesFoundFor": "Nessuna immagine trovata per \"{query}\"",
        "errorLoadingImages": "Errore nel caricamento delle immagini.",
        "couldNotLoadThemes": "Impossibile caricare i temi.",
        "maxImagesSelected": "Puoi selezionare un massimo di {max} immagini.",
        "customImagesAvailable": "{count} immagine/i personalizzata/e disponibile/i.",
        "generatingWorksheet": "Creazione scheda didattica...",
        "pleaseSelectImages": "Seleziona delle immagini o scegli un tema con immagini.",
        "worksheetGeneratedSuccessfully": "Scheda didattica creata con successo!",
        "pleaseGenerateWorksheetFirst": "Crea prima una scheda didattica.",
        "generatingAnswerKey": "Creazione soluzioni...",
        "answerKeyGenerated": "Soluzioni create!",
        "failedToLoadImage": "Impossibile caricare l'immagine {type}.",
        "formCleared": "Modulo cancellato.",
        "preparingCanvas": "Preparazione {canvas}...",
        "downloadInitiated": "Download avviato!",
        "errorPreparingImage": "Errore nella preparazione dell'immagine: {error}",
        "pleaseGenerateContentFirst": "Crea prima il contenuto.",
        "preparingPdf": "Preparazione PDF...",
        "pdfDownloaded": "PDF scaricato!",
        "errorCreatingPdf": "Errore nella creazione del PDF.",
        "preparingJpeg": "Preparazione JPEG...",
        "jpegDownloadInitiated": "Download JPEG avviato!",
        "errorPreparingJpeg": "Errore nella preparazione del JPEG.",
        "preparingCanvasPdf": "Preparazione PDF {canvas}...",
        "pdfDownloadComplete": "PDF scaricato!",
        "errorCreatingPdfWithMessage": "Errore nella creazione del PDF: {error}",

        // Download menu
        "worksheetJpeg": "Scheda didattica (JPEG)",
        "answerKeyJpeg": "Soluzioni (JPEG)",
        "worksheetPdf": "Scheda didattica (PDF)",
        "answerKeyPdf": "Soluzioni (PDF)",
        "grayscale": "Scala di grigi"
    },

    pt: {
        // Page title and main headers
        "wordScrambleTitle": "Gerador de Palavras Embaralhadas",
        "worksheetSettings": "Configurações da Folha de Atividades",

        // Accordion headers
        "languageSettings": "Configurações de Idioma",
        "pageSetup": "Configuração da Página",
        "textTools": "Opções de Texto", // Changed from "Ferramentas de Texto"
        "imageSelection": "Seleção de Imagens",
        "uploadCustomImages": "Enviar Imagens Personalizadas",
        "problemSettings": "Configurações de Atividades",

        // Tab labels
        "worksheet": "Folha de Atividades",
        "answerKey": "Gabarito",

        // Common UI elements
        "language": "Idioma:",
        "none": "Nenhum",
        "common.none": "Nenhum",
        "loading": "Carregando...",
        "error": "Erro",
        "success": "Sucesso",
        "generate": "Criar",
        "newWorksheet": "Nova Folha",
        "download": "Baixar",
        "clearAll": "Limpar Tudo",

        // Generate dropdown options
        "generateWorksheet": "Criar Folha de Atividades",
        "generateAnswerKey": "Criar Gabarito",

        // Page setup
        "pageSize": "Tamanho da Página:",
        "letterPortrait": "Carta (Retrato)",
        "letterLandscape": "Carta (Paisagem)",
        "a4Portrait": "A4 (Retrato)",
        "a4Landscape": "A4 (Paisagem)",
        "legalPortrait": "Ofício (Retrato)",
        "legalLandscape": "Ofício (Paisagem)",
        "custom": "Personalizado",
        "width": "Largura:",
        "height": "Altura:",
        "setPageSize": "Definir Tamanho",
        "pageColor": "Cor da Página:",

        // Backgrounds and borders
        "backgroundTheme": "Tema de Fundo:",
        "selectThemeForBackgrounds": "Selecione um tema para o fundo.",
        "backgroundOpacity": "Opacidade do Fundo:",
        "borderTheme": "Tema de Borda:",
        "selectThemeToSeeBorders": "Selecione um tema para as bordas.",
        "borderOpacity": "Opacidade da Borda:",

        // Text tools
        "selectedTextProperties": "Propriedades do Texto Selecionado",
        "textToAdd": "Texto a adicionar:",
        "addText": "Adicionar Texto",
        "textColor": "Cor do Texto:",
        "fontSize": "Tamanho da Fonte:",
        "fontFamily": "Fonte:",
        "strokeColor": "Cor do Contorno:",
        "strokeWidth": "Largura do Contorno:",

        // Image selection
        "selectTheme": "Selecionar Tema:",
        "allThemes": "Todos os Temas",
        "searchImages": "Buscar Imagens:",
        "searchPlaceholder": "ex: maçã, carro",
        "selectedCountMsg": "Selecionado: {count} / {max}",
        "selectedImagesForPuzzles": "Imagens Selecionadas para Atividades:",

        // Upload section
        "selectImagesToUpload": "Selecionar imagens para carregar:",
        "chooseFiles": "Escolher Arquivos",
        "noFileChosen": "Nenhum arquivo escolhido",
        "filesSelected": "{count} arquivo(s) selecionado(s)",
        "yourUploadedImages": "Suas imagens carregadas",
        "yourUploadedImagesAppearHere": "Suas imagens carregadas aparecem aqui.",

        // Problem settings
        "puzzlesPerPage": "Atividades por página:",
        "allBlack": "Tudo Preto",
        "colorCodedVowelConsonant": "Codificado por Cor (Vogal/Consoante)",
        "letterColors": "Cores das Letras",
        "lowercase": "Minúsculas",
        "uppercase": "Maiúsculas",
        "letterCase": "Tipo de Letra",
        "tough": "Difícil (1/6)",
        "normal": "Normal (1/4)",
        "easy": "Fácil (1/2)",
        "noClues": "Sem pistas",
        "difficulty": "Dificuldade (Número de Pistas)",
        "includeNameDateLine": "Incluir linha nome/data",
        "includeExerciseNumbers": "Incluir números das atividades",
        "letterColor": "Cor das Letras:",
        "blackWhite": "Preto e Branco",
        "colorCoded": "Codificado por cores",

        // Zoom Controls
        "zoomIn": "Aumentar zoom",
        "zoomOut": "Diminuir zoom",
        "resetZoom": "Redefinir zoom",

        // History Controls
        "undo": "Desfazer (Ctrl+Z)",
        "redo": "Refazer (Ctrl+Y)",

        // Layer Controls
        "layers": "Camadas",
        "bringToFront": "Trazer para frente",
        "bringForward": "Avançar",
        "sendBackward": "Recuar",
        "sendToBack": "Enviar para trás",

        // Alignment Toolbar
        "align": "Alinhar",
        "alignSelected": "Alinhar seleção:",
        "alignToPage": "Alinhar à página:",
        "alignLeft": "Alinhar à esquerda",
        "centerHorizontally": "Centralizar horizontalmente",
        "alignRight": "Alinhar à direita",
        "alignTop": "Alinhar ao topo",
        "centerVertically": "Centralizar verticalmente",
        "alignBottom": "Alinhar embaixo",
        "centerOnPageHorizontally": "Centralizar horizontalmente na página",
        "centerOnPageVertically": "Centralizar verticalmente na página",
        "lockUnlock": "Bloquear/Desbloquear",
        "unlockAll": "Desbloquear tudo",
        "deleteSelected": "Excluir seleção",

        // Dynamic messages
        "loadingImages": "Carregando imagens...",
        "noImagesFound": "Nenhuma imagem encontrada",
        "noImagesFoundFor": "Nenhuma imagem encontrada para \"{query}\"",
        "errorLoadingImages": "Erro ao carregar imagens.",
        "couldNotLoadThemes": "Não foi possível carregar os temas.",
        "maxImagesSelected": "Você pode selecionar no máximo {max} imagens.",
        "customImagesAvailable": "{count} imagem(ns) personalizada(s) disponível(is).",
        "generatingWorksheet": "Criando folha de atividades...",
        "pleaseSelectImages": "Por favor, selecione imagens ou escolha um tema com imagens.",
        "worksheetGeneratedSuccessfully": "Folha de atividades criada com sucesso!",
        "pleaseGenerateWorksheetFirst": "Por favor, crie primeiro uma folha de atividades.",
        "generatingAnswerKey": "Criando gabarito...",
        "answerKeyGenerated": "Gabarito criado!",
        "failedToLoadImage": "Falha ao carregar imagem {type}.",
        "formCleared": "Formulário limpo.",
        "preparingCanvas": "Preparando {canvas}...",
        "downloadInitiated": "Download iniciado!",
        "errorPreparingImage": "Erro ao preparar imagem: {error}",
        "pleaseGenerateContentFirst": "Por favor, crie o conteúdo primeiro.",
        "preparingPdf": "Preparando PDF...",
        "pdfDownloaded": "PDF baixado!",
        "errorCreatingPdf": "Erro ao criar PDF.",
        "preparingJpeg": "Preparando JPEG...",
        "jpegDownloadInitiated": "Download de JPEG iniciado!",
        "errorPreparingJpeg": "Erro ao preparar JPEG.",
        "preparingCanvasPdf": "Preparando PDF de {canvas}...",
        "pdfDownloadComplete": "PDF baixado!",
        "errorCreatingPdfWithMessage": "Erro ao criar PDF: {error}",

        // Download menu
        "worksheetJpeg": "Folha de Atividades (JPEG)",
        "answerKeyJpeg": "Gabarito (JPEG)",
        "worksheetPdf": "Folha de Atividades (PDF)",
        "answerKeyPdf": "Gabarito (PDF)",
        "grayscale": "Escala de Cinza"
    },

    nl: {
        // Page title and main headers
        "wordScrambleTitle": "Letterhusselen generator",
        "worksheetSettings": "Werkbladinstellingen",

        // Accordion headers
        "languageSettings": "Taalinstellingen",
        "pageSetup": "Paginainstellingen",
        "textTools": "Tekstgereedschappen",
        "imageSelection": "Afbeeldingselectie",
        "uploadCustomImages": "Eigen Afbeeldingen Uploaden",
        "problemSettings": "Oefeningingstellingen",

        // Tab labels
        "worksheet": "Werkblad",
        "answerKey": "Antwoordblad",

        // Common UI elements
        "language": "Taal:",
        "none": "Geen",
        "common.none": "Geen",
        "loading": "Laden...",
        "error": "Fout",
        "success": "Succes",
        "generate": "Maken",
        "newWorksheet": "Nieuw Werkblad",
        "download": "Downloaden",
        "clearAll": "Alles Wissen",

        // Generate dropdown options
        "generateWorksheet": "Werkblad Maken",
        "generateAnswerKey": "Antwoordblad Maken",

        // Page setup
        "pageSize": "Paginaformaat:",
        "letterPortrait": "Letter (Staand)",
        "letterLandscape": "Letter (Liggend)",
        "a4Portrait": "A4 (Staand)",
        "a4Landscape": "A4 (Liggend)",
        "legalPortrait": "Legal (Staand)",
        "legalLandscape": "Legal (Liggend)",
        "custom": "Aangepast",
        "width": "Breedte:",
        "height": "Hoogte:",
        "setPageSize": "Formaat Instellen",
        "pageColor": "Paginakleur:",

        // Backgrounds and borders
        "backgroundTheme": "Achtergrondthema:",
        "selectThemeForBackgrounds": "Selecteer een thema voor achtergronden.",
        "backgroundOpacity": "Achtergronddekking:",
        "borderTheme": "Randthema:",
        "selectThemeToSeeBorders": "Selecteer een thema voor randen.",
        "borderOpacity": "Randdekking:",

        // Text tools
        "selectedTextProperties": "Geselecteerde Teksteigenschappen",
        "textToAdd": "Toe te voegen tekst:",
        "addText": "Tekst Toevoegen",
        "textColor": "Tekstkleur:",
        "fontSize": "Lettergrootte:",
        "fontFamily": "Lettertype:",
        "strokeColor": "Omlijningskleur:",
        "strokeWidth": "Omlijningsbreedte:",

        // Image selection
        "selectTheme": "Selecteer Thema:",
        "allThemes": "Alle Thema's",
        "searchImages": "Zoek Afbeeldingen:",
        "searchPlaceholder": "bijv: appel, auto",
        "selectedCountMsg": "Geselecteerd: {count} / {max}",
        "selectedImagesForPuzzles": "Geselecteerde Afbeeldingen voor Puzzels:",

        // Upload section
        "selectImagesToUpload": "Selecteer afbeeldingen om te uploaden:",
        "chooseFiles": "Bestanden Kiezen",
        "noFileChosen": "Geen bestand gekozen",
        "filesSelected": "{count} bestand(en) geselecteerd",
        "yourUploadedImages": "Geüploade afbeeldingen",
        "yourUploadedImagesAppearHere": "Geüploade afbeeldingen verschijnen hier.",

        // Problem settings
        "puzzlesPerPage": "Puzzels per pagina:",
        "allBlack": "Alles Zwart",
        "colorCodedVowelConsonant": "Kleurgecodeerd (Klinker/Medeklinker)",
        "letterColors": "Letterkleuren",
        "lowercase": "Kleine Letters",
        "uppercase": "Hoofdletters",
        "letterCase": "Hoofdletters/Kleine Letters",
        "tough": "Moeilijk (1/6)",
        "normal": "Normaal (1/4)",
        "easy": "Makkelijk (1/2)",
        "noClues": "Geen aanwijzingen",
        "difficulty": "Moeilijkheidsgraad (Aantal Aanwijzingen)",
        "includeNameDateLine": "Naam/datum regel toevoegen",
        "includeExerciseNumbers": "Puzzelnummers toevoegen",
        "letterColor": "Letterkleur:",
        "blackWhite": "Zwart & Wit",
        "colorCoded": "Kleurgecodeerd",

        // Zoom Controls
        "zoomIn": "Inzoomen",
        "zoomOut": "Uitzoomen",
        "resetZoom": "Zoom terugzetten",

        // History Controls
        "undo": "Ongedaan Maken (Ctrl+Z)",
        "redo": "Opnieuw (Ctrl+Y)",

        // Layer Controls
        "layers": "Lagen",
        "bringToFront": "Naar Voorgrond",
        "bringForward": "Naar Voren",
        "sendBackward": "Naar Achteren",
        "sendToBack": "Naar Achtergrond",

        // Alignment Toolbar
        "align": "Uitlijnen",
        "alignSelected": "Selectie uitlijnen:",
        "alignToPage": "Uitlijnen op pagina:",
        "alignLeft": "Links Uitlijnen",
        "centerHorizontally": "Horizontaal Centreren",
        "alignRight": "Rechts Uitlijnen",
        "alignTop": "Boven Uitlijnen",
        "centerVertically": "Verticaal Centreren",
        "alignBottom": "Onder Uitlijnen",
        "centerOnPageHorizontally": "Horizontaal Centreren op Pagina",
        "centerOnPageVertically": "Verticaal Centreren op Pagina",
        "lockUnlock": "Vergrendelen/Ontgrendelen",
        "unlockAll": "Alles ontgrendelen",
        "deleteSelected": "Selectie verwijderen",

        // Dynamic messages
        "loadingImages": "Afbeeldingen laden...",
        "noImagesFound": "Geen afbeeldingen gevonden",
        "noImagesFoundFor": "Geen afbeeldingen gevonden voor \"{query}\"",
        "errorLoadingImages": "Fout bij het laden van afbeeldingen.",
        "couldNotLoadThemes": "Kon thema's niet laden.",
        "maxImagesSelected": "Maximaal {max} afbeeldingen kunnen worden geselecteerd.",
        "customImagesAvailable": "{count} aangepaste afbeelding(en) beschikbaar.",
        "generatingWorksheet": "Werkblad maken...",
        "pleaseSelectImages": "Selecteer afbeeldingen of kies een thema met afbeeldingen.",
        "worksheetGeneratedSuccessfully": "Werkblad succesvol gemaakt!",
        "pleaseGenerateWorksheetFirst": "Maak eerst een werkblad.",
        "generatingAnswerKey": "Antwoordblad maken...",
        "answerKeyGenerated": "Antwoordblad gemaakt!",
        "failedToLoadImage": "Kan {type} afbeelding niet laden.",
        "formCleared": "Formulier gewist.",
        "preparingCanvas": "{canvas} voorbereiden...",
        "downloadInitiated": "Download gestart!",
        "errorPreparingImage": "Fout bij het voorbereiden van afbeelding: {error}",
        "pleaseGenerateContentFirst": "Maak eerst inhoud.",
        "preparingPdf": "PDF voorbereiden...",
        "pdfDownloaded": "PDF gedownload!",
        "errorCreatingPdf": "Fout bij het maken van PDF.",
        "preparingJpeg": "JPEG voorbereiden...",
        "jpegDownloadInitiated": "JPEG download gestart!",
        "errorPreparingJpeg": "Fout bij het voorbereiden van JPEG.",
        "preparingCanvasPdf": "{canvas} PDF voorbereiden...",
        "pdfDownloadComplete": "PDF gedownload!",
        "errorCreatingPdfWithMessage": "Fout bij het maken van PDF: {error}",

        // Download menu
        "worksheetJpeg": "Werkblad (JPEG)",
        "answerKeyJpeg": "Antwoordblad (JPEG)",
        "worksheetPdf": "Werkblad (PDF)",
        "answerKeyPdf": "Antwoordblad (PDF)",
        "grayscale": "Grijstinten"
    },

    sv: {
        // Page title and main headers
        "wordScrambleTitle": "Bokstavspusselgenerator",
        "worksheetSettings": "Övningsbladsinställningar",

        // Accordion headers
        "languageSettings": "Språkinställningar",
        "pageSetup": "Sidinställningar",
        "textTools": "Textverktyg",
        "imageSelection": "Bildval",
        "uploadCustomImages": "Ladda upp egna bilder",
        "problemSettings": "Uppgiftsinställningar",

        // Tab labels
        "worksheet": "Övningsblad",
        "answerKey": "Facit",

        // Common UI elements
        "language": "Språk:",
        "none": "Ingen",
        "common.none": "Ingen",
    "none": "Ingen",
        "loading": "Laddar...",
        "error": "Fel",
        "success": "Lyckades",
        "generate": "Skapa",
        "newWorksheet": "Nytt övningsblad",
        "download": "Ladda ner",
        "clearAll": "Rensa allt",

        // Generate dropdown options
        "generateWorksheet": "Skapa övningsblad",
        "generateAnswerKey": "Skapa facit",

        // Page setup
        "pageSize": "Sidstorlek:",
        "letterPortrait": "Letter (Stående)",
        "letterLandscape": "Letter (Liggande)",
        "a4Portrait": "A4 (Stående)",
        "a4Landscape": "A4 (Liggande)",
        "legalPortrait": "Legal (Stående)",
        "legalLandscape": "Legal (Liggande)",
        "custom": "Anpassad",
        "width": "Bredd:",
        "height": "Höjd:",
        "setPageSize": "Ställ in storlek",
        "pageColor": "Sidfärg:",

        // Backgrounds and borders
        "backgroundTheme": "Bakgrundstema:",
        "selectThemeForBackgrounds": "Välj ett tema för bakgrunder.",
        "backgroundOpacity": "Bakgrundsgenomskinlighet:",
        "borderTheme": "Ramtema:",
        "selectThemeToSeeBorders": "Välj ett tema för ramar.",
        "borderOpacity": "Ramgenomskinlighet:",

        // Text tools
        "selectedTextProperties": "Markerade textegenskaper",
        "textToAdd": "Text att lägga till:",
        "addText": "Lägg till text",
        "textColor": "Textfärg:",
        "fontSize": "Teckenstorlek:",
        "fontFamily": "Typsnitt:",
        "strokeColor": "Konturfärg:",
        "strokeWidth": "Konturbredd:",

        // Image selection
        "selectTheme": "Välj tema:",
        "allThemes": "Alla teman",
        "searchImages": "Sök bilder:",
        "searchPlaceholder": "t.ex. äpple, bil",
        "selectedCountMsg": "Vald: {count} / {max}",
        "selectedImagesForPuzzles": "Valda bilder för uppgifter:",

        // Upload section
        "selectImagesToUpload": "Välj bilder att ladda upp:",
        "chooseFiles": "Välj filer",
        "noFileChosen": "Ingen fil vald",
        "filesSelected": "{count} fil(er) valda",
        "yourUploadedImages": "Dina uppladdade bilder",
        "yourUploadedImagesAppearHere": "Dina uppladdade bilder visas här.",

        // Problem settings
        "puzzlesPerPage": "Uppgifter per sida:",
        "allBlack": "Allt svart",
        "colorCodedVowelConsonant": "Färgkodad (vokal/konsonant)",
        "letterColors": "Bokstavsfärger",
        "lowercase": "Gemener",
        "uppercase": "Versaler",
        "letterCase": "Bokstavsläge",
        "tough": "Svår (1/6)",
        "normal": "Normal (1/4)",
        "easy": "Lätt (1/2)",
        "noClues": "Inga ledtrådar",
        "difficulty": "Svårighetsgrad (Antal ledtrådar)",
        "includeNameDateLine": "Inkludera namn/datum-rad",
        "includeExerciseNumbers": "Inkludera uppgiftsnummer",
        "letterColor": "Bokstavsfärg:",
        "blackWhite": "Svart & vit",
        "colorCoded": "Färgkodad",

        // Zoom Controls
        "zoomIn": "Zooma in",
        "zoomOut": "Zooma ut",
        "resetZoom": "Återställ zoom",

        // History Controls
        "undo": "Ångra (Ctrl+Z)",
        "redo": "Gör om (Ctrl+Y)",

        // Layer Controls
        "layers": "Lager",
        "bringToFront": "Flytta längst fram",
        "bringForward": "Flytta framåt",
        "sendBackward": "Flytta bakåt",
        "sendToBack": "Flytta längst bak",

        // Alignment Toolbar
        "align": "Justera",
        "alignSelected": "Justera markering:",
        "alignToPage": "Justera till sidan:",
        "alignLeft": "Vänsterjustera",
        "centerHorizontally": "Centrera horisontellt",
        "alignRight": "Högerjustera",
        "alignTop": "Justera överkant",
        "centerVertically": "Centrera vertikalt",
        "alignBottom": "Justera underkant",
        "centerOnPageHorizontally": "Centrera horisontellt på sidan",
        "centerOnPageVertically": "Centrera vertikalt på sidan",
        "lockUnlock": "Lås/Lås upp",
        "unlockAll": "Lås upp alla",
        "deleteSelected": "Ta bort markering",

        // Dynamic messages
        "loadingImages": "Laddar bilder...",
        "noImagesFound": "Inga bilder hittades",
        "noImagesFoundFor": "Inga bilder hittades för \"{query}\"",
        "errorLoadingImages": "Fel vid laddning av bilder.",
        "couldNotLoadThemes": "Kunde inte ladda teman.",
        "maxImagesSelected": "Du kan välja max {max} bilder.",
        "customImagesAvailable": "{count} egen/egna bild(er) tillgänglig(a).",
        "generatingWorksheet": "Skapar övningsblad...",
        "pleaseSelectImages": "Välj bilder eller välj ett tema med bilder.",
        "worksheetGeneratedSuccessfully": "Övningsblad skapat!",
        "pleaseGenerateWorksheetFirst": "Skapa ett övningsblad först.",
        "generatingAnswerKey": "Skapar facit...",
        "answerKeyGenerated": "Facit skapat!",
        "failedToLoadImage": "Kunde inte ladda {type}-bild.",
        "formCleared": "Formulär rensat.",
        "preparingCanvas": "Förbereder {canvas}...",
        "downloadInitiated": "Nedladdning startad!",
        "errorPreparingImage": "Fel vid förberedelse av bild: {error}",
        "pleaseGenerateContentFirst": "Skapa innehåll först.",
        "preparingPdf": "Förbereder PDF...",
        "pdfDownloaded": "PDF nedladdad!",
        "errorCreatingPdf": "Fel vid skapande av PDF.",
        "preparingJpeg": "Förbereder JPEG...",
        "jpegDownloadInitiated": "JPEG-nedladdning startad!",
        "errorPreparingJpeg": "Fel vid förberedelse av JPEG.",
        "preparingCanvasPdf": "Förbereder {canvas} PDF...",
        "pdfDownloadComplete": "PDF nedladdad!",
        "errorCreatingPdfWithMessage": "Fel vid skapande av PDF: {error}",

        // Download menu
        "worksheetJpeg": "Övningsblad (JPEG)",
        "answerKeyJpeg": "Facit (JPEG)",
        "worksheetPdf": "Övningsblad (PDF)",
        "answerKeyPdf": "Facit (PDF)",
        "grayscale": "Gråskala"
    },

    da: {
        // Page title and main headers
        "wordScrambleTitle": "Bogstavblanding",
        "worksheetSettings": "Opgavearkindstillinger",

        // Accordion headers
        "languageSettings": "Sprogindstillinger",
        "pageSetup": "Sideopsætning",
        "textTools": "Tekstindstillinger", // Fixed: Platform standard (retroactive fix 2025-11-30)
        "imageSelection": "Billedvalg",
        "uploadCustomImages": "Upload egne billeder",
        "problemSettings": "Opgaveindstillinger",

        // Tab labels
        "worksheet": "Opgaveark",
        "answerKey": "Facitliste",

        // Common UI elements
        "language": "Sprog:",
        "none": "Ingen",
        "common.none": "Ingen",
    "none": "Ingen",
        "loading": "Indlæser...",
        "error": "Fejl",
        "success": "Succes",
        "generate": "Opret",
        "newWorksheet": "Nyt opgaveark",
        "download": "Download",
        "clearAll": "Ryd alt",

        // Generate dropdown options
        "generateWorksheet": "Opret opgaveark",
        "generateAnswerKey": "Opret facitliste",

        // Page setup
        "pageSize": "Sidestørrelse:",
        "letterPortrait": "Letter (stående)",
        "letterLandscape": "Letter (liggende)",
        "a4Portrait": "A4 (stående)",
        "a4Landscape": "A4 (liggende)",
        "legalPortrait": "Legal (stående)",
        "legalLandscape": "Legal (liggende)",
        "custom": "Brugerdefineret",
        "width": "Bredde:",
        "height": "Højde:",
        "setPageSize": "Indstil størrelse",
        "pageColor": "Sidefarve:",

        // Backgrounds and borders
        "backgroundTheme": "Baggrundstema:",
        "selectThemeForBackgrounds": "Vælg et tema til baggrunde.",
        "backgroundOpacity": "Baggrundsgennemsigtighed:",
        "borderTheme": "Rammetema:",
        "selectThemeToSeeBorders": "Vælg et tema til rammer.",
        "borderOpacity": "Rammegennemsigtighed:",

        // Text tools
        "selectedTextProperties": "Markerede tekstegenskaber",
        "textToAdd": "Tekst at tilføje:",
        "addText": "Tilføj tekst",
        "textColor": "Tekstfarve:",
        "fontSize": "Skriftstørrelse:",
        "fontFamily": "Skrifttype:",
        "strokeColor": "Konturfarve:",
        "strokeWidth": "Konturbredde:",

        // Image selection
        "selectTheme": "Vælg tema:",
        "allThemes": "Alle temaer",
        "searchImages": "Søg billeder:",
        "searchPlaceholder": "f.eks. æble, bil",
        "selectedCountMsg": "Valgt: {count} / {max}",
        "selectedImagesForPuzzles": "Valgte billeder til opgaver:",

        // Upload section
        "selectImagesToUpload": "Vælg billeder at uploade:",
        "chooseFiles": "Vælg filer",
        "noFileChosen": "Ingen fil valgt",
        "filesSelected": "{count} fil(er) valgt",
        "yourUploadedImages": "Dine uploadede billeder",
        "yourUploadedImagesAppearHere": "Dine uploadede billeder vises her.",

        // Problem settings
        "puzzlesPerPage": "Opgaver per side:",
        "allBlack": "Alt sort",
        "colorCodedVowelConsonant": "Farvekodet (vokal/konsonant)",
        "letterColors": "Bogstavfarver",
        "lowercase": "Små bogstaver",
        "uppercase": "Store bogstaver",
        "letterCase": "Store/små bogstaver",
        "tough": "Svær (1/6)",
        "normal": "Normal (1/4)",
        "easy": "Let (1/2)",
        "noClues": "Ingen ledetråde",
        "difficulty": "Sværhedsgrad (antal ledetråde)",
        "includeNameDateLine": "Inkluder navn/dato-linje",
        "includeExerciseNumbers": "Inkluder opgavenumre",
        "letterColor": "Bogstavfarve:",
        "blackWhite": "Sort og hvid",
        "colorCoded": "Farvekodede",

        // Zoom Controls
        "zoomIn": "Zoom ind",
        "zoomOut": "Zoom ud",
        "resetZoom": "Nulstil zoom",

        // History Controls
        "undo": "Fortryd (Ctrl+Z)",
        "redo": "Gentag (Ctrl+Y)",

        // Layer Controls
        "layers": "Lag",
        "bringToFront": "Flyt forrest",
        "bringForward": "Flyt fremad",
        "sendBackward": "Flyt bagud",
        "sendToBack": "Flyt bagerst",

        // Alignment Toolbar
        "align": "Juster",
        "alignSelected": "Juster markering:",
        "alignToPage": "Juster til siden:",
        "alignLeft": "Venstrejuster",
        "centerHorizontally": "Centrer vandret",
        "alignRight": "Højrejuster",
        "alignTop": "Juster øverst",
        "centerVertically": "Centrer lodret",
        "alignBottom": "Juster nederst",
        "centerOnPageHorizontally": "Centrer vandret på siden",
        "centerOnPageVertically": "Centrer lodret på siden",
        "lockUnlock": "Lås/lås op",
        "unlockAll": "Lås alle op",
        "deleteSelected": "Slet markering",

        // Dynamic messages
        "loadingImages": "Indlæser billeder...",
        "noImagesFound": "Ingen billeder fundet",
        "noImagesFoundFor": "Ingen billeder fundet for \"{query}\"",
        "errorLoadingImages": "Fejl ved indlæsning af billeder.",
        "couldNotLoadThemes": "Kunne ikke indlæse temaer.",
        "maxImagesSelected": "Du kan vælge maksimalt {max} billeder.",
        "customImagesAvailable": "{count} brugerdefinerede billede(r) tilgængelig(e).",
        "generatingWorksheet": "Opretter opgaveark...",
        "pleaseSelectImages": "Vælg billeder eller vælg et tema med billeder.",
        "worksheetGeneratedSuccessfully": "Opgaveark oprettet!",
        "pleaseGenerateWorksheetFirst": "Opret først et opgaveark.",
        "generatingAnswerKey": "Opretter facitliste...",
        "answerKeyGenerated": "Facitliste oprettet!",
        "failedToLoadImage": "Kunne ikke indlæse {type}-billede.",
        "formCleared": "Formular ryddet.",
        "preparingCanvas": "Forbereder {canvas}...",
        "downloadInitiated": "Download startet!",
        "errorPreparingImage": "Fejl ved forberedelse af billede: {error}",
        "pleaseGenerateContentFirst": "Opret først indhold.",
        "preparingPdf": "Forbereder PDF...",
        "pdfDownloaded": "PDF downloadet!",
        "errorCreatingPdf": "Fejl ved oprettelse af PDF.",
        "preparingJpeg": "Forbereder JPEG...",
        "jpegDownloadInitiated": "JPEG-download startet!",
        "errorPreparingJpeg": "Fejl ved forberedelse af JPEG.",
        "preparingCanvasPdf": "Forbereder {canvas} PDF...",
        "pdfDownloadComplete": "PDF downloadet!",
        "errorCreatingPdfWithMessage": "Fejl ved oprettelse af PDF: {error}",

        // Download menu
        "worksheetJpeg": "Opgaveark (JPEG)",
        "answerKeyJpeg": "Facitliste (JPEG)",
        "worksheetPdf": "Opgaveark (PDF)",
        "answerKeyPdf": "Facitliste (PDF)",
        "grayscale": "Gråtoner"
    },

    no: {
        // Page title and main headers
        "wordScrambleTitle": "Bokstavkaos-generator",
        "worksheetSettings": "Oppgavearkinnstillinger",

        // Accordion headers
        "languageSettings": "Språkinnstillinger",
        "pageSetup": "Sideoppsett",
        "textTools": "Tekstverktøy",
        "imageSelection": "Bildevalg",
        "uploadCustomImages": "Last opp egne bilder",
        "problemSettings": "Oppgaveinnstillinger",

        // Tab labels
        "worksheet": "Oppgaveark",
        "answerKey": "Fasit",

        // Common UI elements
        "language": "Språk:",
        "none": "Ingen",
        "common.none": "Ingen",
    "none": "Ingen",
        "loading": "Laster...",
        "error": "Feil",
        "success": "Suksess",
        "generate": "Lag",
        "newWorksheet": "Nytt oppgaveark",
        "download": "Last ned",
        "clearAll": "Tøm alt",

        // Generate dropdown options
        "generateWorksheet": "Lag oppgaveark",
        "generateAnswerKey": "Lag fasit",

        // Page setup
        "pageSize": "Sidestørrelse:",
        "letterPortrait": "Letter (stående)",
        "letterLandscape": "Letter (liggende)",
        "a4Portrait": "A4 (stående)",
        "a4Landscape": "A4 (liggende)",
        "legalPortrait": "Legal (stående)",
        "legalLandscape": "Legal (liggende)",
        "custom": "Egendefinert",
        "width": "Bredde:",
        "height": "Høyde:",
        "setPageSize": "Sett størrelse",
        "pageColor": "Sidefarge:",

        // Backgrounds and borders
        "backgroundTheme": "Bakgrunnstema:",
        "selectThemeForBackgrounds": "Velg et tema for bakgrunner.",
        "backgroundOpacity": "Bakgrunnssynlighet:",
        "borderTheme": "Rammetema:",
        "selectThemeToSeeBorders": "Velg et tema for rammer.",
        "borderOpacity": "Rammesynlighet:",

        // Text tools
        "selectedTextProperties": "Valgte tekstegenskaper",
        "textToAdd": "Tekst å legge til:",
        "addText": "Legg til tekst",
        "textColor": "Tekstfarge:",
        "fontSize": "Skriftstørrelse:",
        "fontFamily": "Skrifttype:",
        "strokeColor": "Omrissfarge:",
        "strokeWidth": "Omrissbredde:",

        // Image selection
        "selectTheme": "Velg tema:",
        "allThemes": "Alle temaer",
        "searchImages": "Søk i bilder:",
        "searchPlaceholder": "f.eks. eple, bil",
        "selectedCountMsg": "Valgt: {count} / {max}",
        "selectedImagesForPuzzles": "Valgte bilder for oppgaver:",

        // Upload section
        "selectImagesToUpload": "Velg bilder å laste opp:",
        "chooseFiles": "Velg filer",
        "noFileChosen": "Ingen fil valgt",
        "filesSelected": "{count} fil(er) valgt",
        "yourUploadedImages": "Dine opplastede bilder",
        "yourUploadedImagesAppearHere": "Dine opplastede bilder vises her.",

        // Problem settings
        "puzzlesPerPage": "Gåter per side:",
        "allBlack": "Alt svart",
        "colorCodedVowelConsonant": "Fargekodet (vokal/konsonant)",
        "letterColors": "Bokstavfarger",
        "lowercase": "Små bokstaver",
        "uppercase": "Store bokstaver",
        "letterCase": "Store/små bokstaver",
        "tough": "Vanskelig (1/6)",
        "normal": "Normal (1/4)",
        "easy": "Lett (1/2)",
        "noClues": "Ingen hint",
        "difficulty": "Vanskelighetsgrad (antall hint)",
        "includeNameDateLine": "Inkluder navn/dato-linje",
        "includeExerciseNumbers": "Inkluder oppgavenummer",
        "letterColor": "Bokstavfarge:",
        "blackWhite": "Svart og hvitt",
        "colorCoded": "Fargekodet",

        // Zoom Controls
        "zoomIn": "Zoom inn",
        "zoomOut": "Zoom ut",
        "resetZoom": "Tilbakestill zoom",

        // History Controls
        "undo": "Angre (Ctrl+Z)",
        "redo": "Gjør om (Ctrl+Y)",

        // Layer Controls
        "layers": "Lag",
        "bringToFront": "Flytt fremst",
        "bringForward": "Flytt fremover",
        "sendBackward": "Flytt bakover",
        "sendToBack": "Flytt bakerst",

        // Alignment Toolbar
        "align": "Juster",
        "alignSelected": "Juster markering:",
        "alignToPage": "Juster til siden:",
        "alignLeft": "Venstrejuster",
        "centerHorizontally": "Sentrer horisontalt",
        "alignRight": "Høyrejuster",
        "alignTop": "Juster topp",
        "centerVertically": "Sentrer vertikalt",
        "alignBottom": "Juster bunn",
        "centerOnPageHorizontally": "Sentrer horisontalt på siden",
        "centerOnPageVertically": "Sentrer vertikalt på siden",
        "lockUnlock": "Lås/Lås opp",
        "unlockAll": "Lås opp alle",
        "deleteSelected": "Slett markerte",

        // Dynamic messages
        "loadingImages": "Laster bilder...",
        "noImagesFound": "Ingen bilder funnet",
        "noImagesFoundFor": "Ingen bilder funnet for «{query}»",
        "errorLoadingImages": "Feil ved lasting av bilder.",
        "couldNotLoadThemes": "Kunne ikke laste temaer.",
        "maxImagesSelected": "Du kan velge maksimalt {max} bilder.",
        "customImagesAvailable": "{count} egendefinert(e) bilde(r) tilgjengelig.",
        "generatingWorksheet": "Lager oppgaveark...",
        "pleaseSelectImages": "Velg bilder eller velg et tema med bilder.",
        "worksheetGeneratedSuccessfully": "Oppgaveark laget!",
        "pleaseGenerateWorksheetFirst": "Lag et oppgaveark først.",
        "generatingAnswerKey": "Lager fasit...",
        "answerKeyGenerated": "Fasit laget!",
        "failedToLoadImage": "Kunne ikke laste {type}-bilde.",
        "formCleared": "Skjema tømt.",
        "preparingCanvas": "Forbereder {canvas}...",
        "downloadInitiated": "Nedlasting startet!",
        "errorPreparingImage": "Feil ved forberedelse av bilde: {error}",
        "pleaseGenerateContentFirst": "Lag innhold først.",
        "preparingPdf": "Forbereder PDF...",
        "pdfDownloaded": "PDF lastet ned!",
        "errorCreatingPdf": "Feil ved laging av PDF.",
        "preparingJpeg": "Forbereder JPEG...",
        "jpegDownloadInitiated": "JPEG-nedlasting startet!",
        "errorPreparingJpeg": "Feil ved forberedelse av JPEG.",
        "preparingCanvasPdf": "Forbereder {canvas}-PDF...",
        "pdfDownloadComplete": "PDF lastet ned!",
        "errorCreatingPdfWithMessage": "Feil ved laging av PDF: {error}",

        // Download menu
        "worksheetJpeg": "Oppgaveark (JPEG)",
        "answerKeyJpeg": "Fasit (JPEG)",
        "worksheetPdf": "Oppgaveark (PDF)",
        "answerKeyPdf": "Fasit (PDF)",
        "grayscale": "Gråtoner"
    },

    fi: {
        // Page title and main headers
        "wordScrambleTitle": "Kirjainsalaatti-generaattori",
        "worksheetSettings": "Tehtävämonisteen Asetukset",

        // Accordion headers
        "languageSettings": "Kieliasetukset",
        "pageSetup": "Sivun Asetukset",
        "textTools": "Tekstityökalut",
        "imageSelection": "Kuvan Valinta",
        "uploadCustomImages": "Lähetä Omia Kuvia",
        "problemSettings": "Tehtäväasetukset",

        // Tab labels
        "worksheet": "Tehtävämoniste",
        "answerKey": "Vastaukset",

        // Common UI elements
        "language": "Kieli:",
        "none": "Ei mitään",
        "common.none": "Ei mitään",
    "none": "Ei mitään",
        "loading": "Ladataan...",
        "error": "Virhe",
        "success": "Onnistui",
        "generate": "Luo",
        "newWorksheet": "Uusi Tehtävämoniste",
        "download": "Lataa",
        "clearAll": "Tyhjennä Kaikki",

        // Generate dropdown options
        "generateWorksheet": "Luo Tehtävämoniste",
        "generateAnswerKey": "Luo Vastaukset",

        // Page setup
        "pageSize": "Sivukoko:",
        "letterPortrait": "Letter (Pysty)",
        "letterLandscape": "Letter (Vaaka)",
        "a4Portrait": "A4 (Pysty)",
        "a4Landscape": "A4 (Vaaka)",
        "legalPortrait": "Legal (Pysty)",
        "legalLandscape": "Legal (Vaaka)",
        "custom": "Mukautettu",
        "width": "Leveys:",
        "height": "Korkeus:",
        "setPageSize": "Aseta Koko",
        "pageColor": "Sivun Väri:",

        // Backgrounds and borders
        "backgroundTheme": "Taustateema:",
        "selectThemeForBackgrounds": "Valitse teema taustoille.",
        "backgroundOpacity": "Taustan Läpinäkyvyys:",
        "borderTheme": "Kehysteema:",
        "selectThemeToSeeBorders": "Valitse teema kehyksille.",
        "borderOpacity": "Kehyksen Läpinäkyvyys:",

        // Text tools
        "selectedTextProperties": "Valitun Tekstin Ominaisuudet",
        "textToAdd": "Lisättävä teksti:",
        "addText": "Lisää Teksti",
        "textColor": "Tekstin Väri:",
        "fontSize": "Fonttikoko:",
        "fontFamily": "Fontti:",
        "strokeColor": "Reunaviivan Väri:",
        "strokeWidth": "Reunaviivan Leveys:",

        // Image selection
        "selectTheme": "Valitse Teema:",
        "allThemes": "Kaikki Teemat",
        "searchImages": "Hae Kuvia:",
        "searchPlaceholder": "esim. omena, auto",
        "selectedCountMsg": "Valittu: {count} / {max}",
        "selectedImagesForPuzzles": "Valitut Kuvat Pulmiin:",

        // Upload section
        "selectImagesToUpload": "Valitse lähetettävät kuvat:",
        "chooseFiles": "Valitse Tiedostot",
        "noFileChosen": "Ei tiedostoa valittuna",
        "filesSelected": "{count} tiedosto(a) valittu",
        "yourUploadedImages": "Lähettämäsi kuvat",
        "yourUploadedImagesAppearHere": "Lähettämäsi kuvat näkyvät täällä.",

        // Problem settings
        "puzzlesPerPage": "Pulmia per sivu:",
        "allBlack": "Kaikki Musta",
        "colorCodedVowelConsonant": "Värikoodattu (Vokaali/Konsonantti)",
        "letterColors": "Kirjainten Värit",
        "lowercase": "Pienet Kirjaimet",
        "uppercase": "Isot Kirjaimet",
        "letterCase": "Kirjainkoko",
        "tough": "Vaikea (1/6)",
        "normal": "Normaali (1/4)",
        "easy": "Helppo (1/2)",
        "noClues": "Ei vihjeitä",
        "difficulty": "Vaikeustaso (Vihjeiden Määrä)",
        "includeNameDateLine": "Sisällytä nimi/päivämäärä-rivi",
        "includeExerciseNumbers": "Sisällytä tehtävänumerot",
        "letterColor": "Kirjainten väri:",
        "blackWhite": "Mustavalkoinen",
        "colorCoded": "Värikoodattu",

        // Zoom Controls
        "zoomIn": "Lähennä",
        "zoomOut": "Loitonna",
        "resetZoom": "Palauta zoomaus",

        // History Controls
        "undo": "Kumoa (Ctrl+Z)",
        "redo": "Tee uudelleen (Ctrl+Y)",

        // Layer Controls
        "layers": "Tasot",
        "bringToFront": "Tuo etualalle",
        "bringForward": "Siirrä eteenpäin",
        "sendBackward": "Siirrä taaksepäin",
        "sendToBack": "Lähetä taka-alalle",

        // Alignment Toolbar
        "align": "Tasaa",
        "alignSelected": "Kohdista valinta:",
        "alignToPage": "Tasaa sivulle:",
        "alignLeft": "Tasaa vasemmalle",
        "centerHorizontally": "Keskitä vaakasuunnassa",
        "alignRight": "Tasaa oikealle",
        "alignTop": "Tasaa ylös",
        "centerVertically": "Keskitä pystysuunnassa",
        "alignBottom": "Tasaa alas",
        "centerOnPageHorizontally": "Keskitä vaakasuunnassa sivulle",
        "centerOnPageVertically": "Keskitä pystysuunnassa sivulle",
        "lockUnlock": "Lukitse/Avaa",
        "unlockAll": "Avaa kaikki",
        "deleteSelected": "Poista valinta",

        // Dynamic messages
        "loadingImages": "Ladataan kuvia...",
        "noImagesFound": "Kuvia ei löytynyt",
        "noImagesFoundFor": "Kuvia ei löytynyt haulle \"{query}\"",
        "errorLoadingImages": "Virhe kuvien latauksessa.",
        "couldNotLoadThemes": "Teemoja ei voitu ladata.",
        "maxImagesSelected": "Voit valita enintään {max} kuvaa.",
        "customImagesAvailable": "{count} mukautettu(a) kuva(a) saatavilla.",
        "generatingWorksheet": "Luodaan tehtävämonistetta...",
        "pleaseSelectImages": "Valitse kuvia tai valitse teema, jossa on kuvia.",
        "worksheetGeneratedSuccessfully": "Tehtävämoniste luotu onnistuneesti!",
        "pleaseGenerateWorksheetFirst": "Luo ensin tehtävämoniste.",
        "generatingAnswerKey": "Luodaan vastauksia...",
        "answerKeyGenerated": "Vastaukset luotu!",
        "failedToLoadImage": "{type}-kuvan lataus epäonnistui.",
        "formCleared": "Lomake tyhjennetty.",
        "preparingCanvas": "Valmistellaan {canvas}...",
        "downloadInitiated": "Lataus aloitettu!",
        "errorPreparingImage": "Virhe kuvan valmistelussa: {error}",
        "pleaseGenerateContentFirst": "Luo ensin sisältö.",
        "preparingPdf": "Valmistellaan PDF:ää...",
        "pdfDownloaded": "PDF ladattu!",
        "errorCreatingPdf": "Virhe PDF:n luonnissa.",
        "preparingJpeg": "Valmistellaan JPEG:iä...",
        "jpegDownloadInitiated": "JPEG-lataus aloitettu!",
        "errorPreparingJpeg": "Virhe JPEG:n valmistelussa.",
        "preparingCanvasPdf": "Valmistellaan {canvas} PDF:ää...",
        "pdfDownloadComplete": "PDF ladattu!",
        "errorCreatingPdfWithMessage": "Virhe PDF:n luonnissa: {error}",

        // Download menu
        "worksheetJpeg": "Tehtävämoniste (JPEG)",
        "answerKeyJpeg": "Vastaukset (JPEG)",
        "worksheetPdf": "Tehtävämoniste (PDF)",
        "answerKeyPdf": "Vastaukset (PDF)",
        "grayscale": "Harmaasävy"
    }
};