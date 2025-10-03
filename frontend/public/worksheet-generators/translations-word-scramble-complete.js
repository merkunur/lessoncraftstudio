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
        "generate": "Generate",
        "download": "Download",
        "clearAll": "Clear All",

        // Generate dropdown options
        "generateWorksheet": "Generate Worksheet",
        "generateAnswerKey": "Generate Answer Key",

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

        // Alignment toolbar
        "alignSelected": "Align Selected:",
        "deleteSelected": "Delete Selected",

        // Dynamic messages
        "loadingImages": "Loading images...",
        "noImagesFound": "No images found",
        "noImagesFoundFor": "No images found for \"{query}\"",
        "errorLoadingImages": "Error loading images.",
        "couldNotLoadThemes": "Could not load themes.",
        "maxImagesSelected": "You can select a maximum of {max} images.",
        "customImagesAvailable": "{count} custom image(s) available.",
        "generatingWorksheet": "Generating worksheet...",
        "pleaseSelectImages": "Please select some images or choose a theme with images.",
        "worksheetGeneratedSuccessfully": "Worksheet generated successfully!",
        "pleaseGenerateWorksheetFirst": "Please generate a worksheet first.",
        "generatingAnswerKey": "Generating answer key...",
        "answerKeyGenerated": "Answer key generated!",
        "failedToLoadImage": "Failed to load {type} image.",
        "formCleared": "Form cleared.",
        "preparingCanvas": "Preparing {canvas}...",
        "downloadInitiated": "Download Initiated!",
        "errorPreparingImage": "Error preparing image: {error}",
        "pleaseGenerateContentFirst": "Please generate content first.",
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
        "textTools": "Textgestaltung",
        "imageSelection": "Bildauswahl",
        "uploadCustomImages": "Eigene Bilder hochladen",
        "problemSettings": "Aufgabeneinstellungen",

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
        "backgroundOpacity": "Hintergrundtransparenz:",
        "borderTheme": "Rahmenthema:",
        "selectThemeToSeeBorders": "Wählen Sie ein Thema für Rahmen.",
        "borderOpacity": "Rahmentransparenz:",

        // Text tools
        "selectedTextProperties": "Ausgewählte Texteigenschaften",
        "textToAdd": "Text hinzufügen:",
        "addText": "Text hinzufügen",
        "textColor": "Textfarbe:",
        "fontSize": "Schriftgröße:",
        "fontFamily": "Schriftart:",
        "strokeColor": "Konturfarbe:",
        "strokeWidth": "Konturstärke:",

        // Image selection
        "selectTheme": "Thema auswählen:",
        "allThemes": "Alle Themen",
        "searchImages": "Bilder suchen:",
        "searchPlaceholder": "z.B. Apfel, Auto",
        "selectedCountMsg": "Ausgewählt: {count} / {max}",
        "selectedImagesForPuzzles": "Ausgewählte Bilder für Aufgaben:",

        // Upload section
        "selectImagesToUpload": "Bilder zum Hochladen auswählen:",
        "chooseFiles": "Dateien auswählen",
        "noFileChosen": "Keine Datei ausgewählt",
        "filesSelected": "{count} Datei(en) ausgewählt",
        "yourUploadedImages": "Ihre hochgeladenen Bilder",
        "yourUploadedImagesAppearHere": "Ihre hochgeladenen Bilder erscheinen hier.",

        // Problem settings
        "puzzlesPerPage": "Aufgaben pro Seite:",
        "difficulty": "Schwierigkeit (Anzahl Hinweise)",
        "noClues": "Keine Hinweise",
        "easy": "Einfach (1/2)",
        "normal": "Normal (1/4)",
        "tough": "Schwer (1/6)",
        "letterCase": "Buchstabengröße",
        "uppercase": "Großbuchstaben",
        "lowercase": "Kleinbuchstaben",
        "letterColors": "Buchstabenfarben",
        "colorCodedVowelConsonant": "Farbcodiert (Vokal/Konsonant)",
        "allBlack": "Alles Schwarz",
        "includeNameDateLine": "Name/Datum-Zeile einfügen",
        "includeExerciseNumbers": "Aufgabennummern einfügen",
        "letterColor": "Buchstabenfarbe:",
        "blackWhite": "Schwarz & Weiß",
        "colorCoded": "Farbcodiert",

        // Alignment toolbar
        "alignSelected": "Ausgewählte ausrichten:",
        "deleteSelected": "Ausgewählte löschen",

        // Dynamic messages
        "loadingImages": "Bilder werden geladen...",
        "noImagesFound": "Keine Bilder gefunden",
        "noImagesFoundFor": "Keine Bilder gefunden für \"{query}\"",
        "errorLoadingImages": "Fehler beim Laden der Bilder.",
        "couldNotLoadThemes": "Themen konnten nicht geladen werden.",
        "maxImagesSelected": "Sie können maximal {max} Bilder auswählen.",
        "customImagesAvailable": "{count} eigene Bild(er) verfügbar.",
        "generatingWorksheet": "Arbeitsblatt wird erstellt...",
        "pleaseSelectImages": "Bitte wählen Sie Bilder aus oder wählen Sie ein Thema mit Bildern.",
        "worksheetGeneratedSuccessfully": "Arbeitsblatt erfolgreich erstellt!",
        "pleaseGenerateWorksheetFirst": "Bitte erstellen Sie zuerst ein Arbeitsblatt.",
        "generatingAnswerKey": "Lösungsblatt wird erstellt...",
        "answerKeyGenerated": "Lösungsblatt erstellt!",
        "failedToLoadImage": "{type}-Bild konnte nicht geladen werden.",
        "formCleared": "Formular zurückgesetzt.",
        "preparingCanvas": "{canvas} wird vorbereitet...",
        "downloadInitiated": "Download gestartet!",
        "errorPreparingImage": "Fehler beim Vorbereiten des Bildes: {error}",
        "pleaseGenerateContentFirst": "Bitte erstellen Sie zuerst Inhalte.",
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
        "wordScrambleTitle": "Générateur de Mots Mélangés",
        "worksheetSettings": "Paramètres de la Feuille",

        // Accordion headers
        "languageSettings": "Paramètres de Langue",
        "pageSetup": "Configuration de Page",
        "textTools": "Outils de Texte",
        "imageSelection": "Sélection d'Images",
        "uploadCustomImages": "Télécharger Vos Images",
        "problemSettings": "Paramètres des Exercices",

        // Tab labels
        "worksheet": "Feuille d'Exercices",
        "answerKey": "Corrigé",

        // Common UI elements
        "language": "Langue :",
        "none": "Aucun",
        "common.none": "Aucun",
    "none": "Aucun",
        "loading": "Chargement...",
        "error": "Erreur",
        "success": "Succès",
        "generate": "Générer",
        "download": "Télécharger",
        "clearAll": "Tout Effacer",

        // Generate dropdown options
        "generateWorksheet": "Générer la Feuille",
        "generateAnswerKey": "Générer le Corrigé",

        // Page setup
        "pageSize": "Format de Page :",
        "letterPortrait": "Lettre (Portrait)",
        "letterLandscape": "Lettre (Paysage)",
        "a4Portrait": "A4 (Portrait)",
        "a4Landscape": "A4 (Paysage)",
        "legalPortrait": "Légal (Portrait)",
        "legalLandscape": "Légal (Paysage)",
        "custom": "Personnalisé",
        "width": "Largeur :",
        "height": "Hauteur :",
        "setPageSize": "Définir la Taille",
        "pageColor": "Couleur de Page :",

        // Backgrounds and borders
        "backgroundTheme": "Thème de Fond :",
        "selectThemeForBackgrounds": "Sélectionnez un thème pour les arrière-plans.",
        "backgroundOpacity": "Opacité du Fond :",
        "borderTheme": "Thème de Bordure :",
        "selectThemeToSeeBorders": "Sélectionnez un thème pour les bordures.",
        "borderOpacity": "Opacité de Bordure :",

        // Text tools
        "selectedTextProperties": "Propriétés du Texte Sélectionné",
        "textToAdd": "Texte à ajouter :",
        "addText": "Ajouter du Texte",
        "textColor": "Couleur du Texte :",
        "fontSize": "Taille de Police :",
        "fontFamily": "Police :",
        "strokeColor": "Couleur de Contour :",
        "strokeWidth": "Largeur de Contour :",

        // Image selection
        "selectTheme": "Sélectionner le Thème :",
        "allThemes": "Tous les Thèmes",
        "searchImages": "Rechercher des Images :",
        "searchPlaceholder": "ex: pomme, voiture",
        "selectedCountMsg": "Sélectionné : {count} / {max}",
        "selectedImagesForPuzzles": "Images Sélectionnées pour les Exercices :",

        // Upload section
        "selectImagesToUpload": "Sélectionner des images à télécharger :",
        "chooseFiles": "Choisir les Fichiers",
        "noFileChosen": "Aucun fichier choisi",
        "filesSelected": "{count} fichier(s) sélectionné(s)",
        "yourUploadedImages": "Vos images téléchargées",
        "yourUploadedImagesAppearHere": "Vos images téléchargées apparaissent ici.",

        // Problem settings
        "puzzlesPerPage": "Exercices par page :",
        "allBlack": "Todo Negro",
        "colorCodedVowelConsonant": "Codificado por Color (Vocal/Consonante)",
        "letterColors": "Colores de las Letras",
        "lowercase": "Minúsculas",
        "uppercase": "Mayúsculas",
        "letterCase": "Mayúsculas/Minúsculas",
        "tough": "Difícil (1/6)",
        "normal": "Normal (1/4)",
        "easy": "Fácil (1/2)",
        "noClues": "Sin pistas",
        "difficulty": "Dificultad (Número de Pistas)",
        "allBlack": "Tout Noir",
        "colorCodedVowelConsonant": "Codé par Couleur (Voyelle/Consonne)",
        "letterColors": "Couleurs des Lettres",
        "lowercase": "Minuscules",
        "uppercase": "Majuscules",
        "letterCase": "Casse des Lettres",
        "tough": "Difficile (1/6)",
        "normal": "Normal (1/4)",
        "easy": "Facile (1/2)",
        "noClues": "Aucun indice",
        "difficulty": "Difficulté (Nombre d'Indices)",
        "includeNameDateLine": "Inclure ligne nom/date",
        "includeExerciseNumbers": "Inclure numéros d'exercices",
        "letterColor": "Couleur des lettres :",
        "blackWhite": "Noir & Blanc",
        "colorCoded": "Codé par couleur",

        // Alignment toolbar
        "alignSelected": "Aligner la sélection :",
        "deleteSelected": "Supprimer la sélection",

        // Dynamic messages
        "loadingImages": "Chargement des images...",
        "noImagesFound": "Aucune image trouvée",
        "noImagesFoundFor": "Aucune image trouvée pour \"{query}\"",
        "errorLoadingImages": "Erreur lors du chargement des images.",
        "couldNotLoadThemes": "Impossible de charger les thèmes.",
        "maxImagesSelected": "Vous pouvez sélectionner un maximum de {max} images.",
        "customImagesAvailable": "{count} image(s) personnalisée(s) disponible(s).",
        "generatingWorksheet": "Génération de la feuille d'exercices...",
        "pleaseSelectImages": "Veuillez sélectionner des images ou choisir un thème avec des images.",
        "worksheetGeneratedSuccessfully": "Feuille d'exercices générée avec succès !",
        "pleaseGenerateWorksheetFirst": "Veuillez d'abord générer une feuille d'exercices.",
        "generatingAnswerKey": "Génération du corrigé...",
        "answerKeyGenerated": "Corrigé généré !",
        "failedToLoadImage": "Échec du chargement de l'image {type}.",
        "formCleared": "Formulaire effacé.",
        "preparingCanvas": "Préparation de {canvas}...",
        "downloadInitiated": "Téléchargement lancé !",
        "errorPreparingImage": "Erreur lors de la préparation de l'image : {error}",
        "pleaseGenerateContentFirst": "Veuillez d'abord générer du contenu.",
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
        "worksheetJpeg": "Feuille d'Exercices (JPEG)",
        "answerKeyJpeg": "Corrigé (JPEG)",
        "worksheetPdf": "Feuille d'Exercices (PDF)",
        "answerKeyPdf": "Corrigé (PDF)",
        "grayscale": "Niveaux de Gris"
    },

    es: {
        // Page title and main headers
        "wordScrambleTitle": "Generador de Palabras Revueltas",
        "worksheetSettings": "Configuración de la Hoja",

        // Accordion headers
        "languageSettings": "Configuración de Idioma",
        "pageSetup": "Configuración de Página",
        "textTools": "Herramientas de Texto",
        "imageSelection": "Selección de Imágenes",
        "uploadCustomImages": "Subir Imágenes Propias",
        "problemSettings": "Configuración de Ejercicios",

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
        "generate": "Generar",
        "download": "Descargar",
        "clearAll": "Borrar Todo",

        // Generate dropdown options
        "generateWorksheet": "Generar Hoja de Ejercicios",
        "generateAnswerKey": "Generar Hoja de Respuestas",

        // Page setup
        "pageSize": "Tamaño de Página:",
        "letterPortrait": "Carta (Vertical)",
        "letterLandscape": "Carta (Horizontal)",
        "a4Portrait": "A4 (Vertical)",
        "a4Landscape": "A4 (Horizontal)",
        "legalPortrait": "Legal (Vertical)",
        "legalLandscape": "Legal (Horizontal)",
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
        "selectedImagesForPuzzles": "Imágenes Seleccionadas para Ejercicios:",

        // Upload section
        "selectImagesToUpload": "Seleccionar imágenes para subir:",
        "chooseFiles": "Elegir Archivos",
        "noFileChosen": "Ningún archivo elegido",
        "filesSelected": "{count} archivo(s) seleccionado(s)",
        "yourUploadedImages": "Sus imágenes subidas",
        "yourUploadedImagesAppearHere": "Sus imágenes subidas aparecen aquí.",

        // Problem settings
        "puzzlesPerPage": "Ejercicios por página:",
        "allBlack": "Todo Negro",
        "colorCodedVowelConsonant": "Codificado por Color (Vocal/Consonante)",
        "letterColors": "Colores de las Letras",
        "lowercase": "Minúsculas",
        "uppercase": "Mayúsculas",
        "letterCase": "Mayúsculas/Minúsculas",
        "tough": "Difícil (1/6)",
        "normal": "Normal (1/4)",
        "easy": "Fácil (1/2)",
        "noClues": "Sin pistas",
        "difficulty": "Dificultad (Número de Pistas)",
        "includeNameDateLine": "Incluir línea de nombre/fecha",
        "includeExerciseNumbers": "Incluir números de ejercicios",
        "letterColor": "Color de las letras:",
        "blackWhite": "Blanco y Negro",
        "colorCoded": "Codificado por colores",

        // Alignment toolbar
        "alignSelected": "Alinear selección:",
        "deleteSelected": "Eliminar selección",

        // Dynamic messages
        "loadingImages": "Cargando imágenes...",
        "noImagesFound": "No se encontraron imágenes",
        "noImagesFoundFor": "No se encontraron imágenes para \"{query}\"",
        "errorLoadingImages": "Error al cargar las imágenes.",
        "couldNotLoadThemes": "No se pudieron cargar los temas.",
        "maxImagesSelected": "Puede seleccionar un máximo de {max} imágenes.",
        "customImagesAvailable": "{count} imagen(es) personalizada(s) disponible(s).",
        "generatingWorksheet": "Generando hoja de ejercicios...",
        "pleaseSelectImages": "Por favor, seleccione imágenes o elija un tema con imágenes.",
        "worksheetGeneratedSuccessfully": "¡Hoja de ejercicios generada con éxito!",
        "pleaseGenerateWorksheetFirst": "Por favor, genere primero una hoja de ejercicios.",
        "generatingAnswerKey": "Generando hoja de respuestas...",
        "answerKeyGenerated": "¡Hoja de respuestas generada!",
        "failedToLoadImage": "Error al cargar la imagen {type}.",
        "formCleared": "Formulario borrado.",
        "preparingCanvas": "Preparando {canvas}...",
        "downloadInitiated": "¡Descarga iniciada!",
        "errorPreparingImage": "Error al preparar la imagen: {error}",
        "pleaseGenerateContentFirst": "Por favor, genere primero el contenido.",
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
        "wordScrambleTitle": "Generatore di Parole Mescolate",
        "worksheetSettings": "Impostazioni del Foglio",

        // Accordion headers
        "languageSettings": "Impostazioni Lingua",
        "pageSetup": "Impostazione Pagina",
        "textTools": "Strumenti di Testo",
        "imageSelection": "Selezione Immagini",
        "uploadCustomImages": "Carica le Tue Immagini",
        "problemSettings": "Impostazioni Esercizi",

        // Tab labels
        "worksheet": "Scheda di Lavoro",
        "answerKey": "Foglio Risposte",

        // Common UI elements
        "language": "Lingua:",
        "none": "Nessuno",
        "common.none": "Nessuno",
    "none": "Nessuno",
        "loading": "Caricamento...",
        "error": "Errore",
        "success": "Successo",
        "generate": "Genera",
        "download": "Scarica",
        "clearAll": "Cancella Tutto",

        // Generate dropdown options
        "generateWorksheet": "Genera Scheda di Lavoro",
        "generateAnswerKey": "Genera Foglio Risposte",

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
        "setPageSize": "Imposta Dimensione",
        "pageColor": "Colore Pagina:",

        // Backgrounds and borders
        "backgroundTheme": "Tema Sfondo:",
        "selectThemeForBackgrounds": "Seleziona un tema per gli sfondi.",
        "backgroundOpacity": "Opacità Sfondo:",
        "borderTheme": "Tema Bordo:",
        "selectThemeToSeeBorders": "Seleziona un tema per i bordi.",
        "borderOpacity": "Opacità Bordo:",

        // Text tools
        "selectedTextProperties": "Proprietà del Testo Selezionato",
        "textToAdd": "Testo da aggiungere:",
        "addText": "Aggiungi Testo",
        "textColor": "Colore Testo:",
        "fontSize": "Dimensione Font:",
        "fontFamily": "Font:",
        "strokeColor": "Colore Contorno:",
        "strokeWidth": "Larghezza Contorno:",

        // Image selection
        "selectTheme": "Seleziona Tema:",
        "allThemes": "Tutti i Temi",
        "searchImages": "Cerca Immagini:",
        "searchPlaceholder": "es: mela, auto",
        "selectedCountMsg": "Selezionato: {count} / {max}",
        "selectedImagesForPuzzles": "Immagini Selezionate per gli Esercizi:",

        // Upload section
        "selectImagesToUpload": "Seleziona immagini da caricare:",
        "chooseFiles": "Scegli File",
        "noFileChosen": "Nessun file scelto",
        "filesSelected": "{count} file selezionato/i",
        "yourUploadedImages": "Le tue immagini caricate",
        "yourUploadedImagesAppearHere": "Le tue immagini caricate appaiono qui.",

        // Problem settings
        "puzzlesPerPage": "Esercizi per pagina:",
        "allBlack": "Tutto Nero",
        "colorCodedVowelConsonant": "Codificato a Colori (Vocale/Consonante)",
        "letterColors": "Colori delle Lettere",
        "lowercase": "Minuscole",
        "uppercase": "Maiuscole",
        "letterCase": "Maiuscole/Minuscole",
        "tough": "Difficile (1/6)",
        "normal": "Normale (1/4)",
        "easy": "Facile (1/2)",
        "noClues": "Nessun indizio",
        "difficulty": "Difficoltà (Numero di Indizi)",
        "includeNameDateLine": "Includi riga nome/data",
        "includeExerciseNumbers": "Includi numeri esercizi",
        "letterColor": "Colore delle lettere:",
        "blackWhite": "Bianco e Nero",
        "colorCoded": "Codificato a colori",

        // Alignment toolbar
        "alignSelected": "Allinea selezione:",
        "deleteSelected": "Elimina selezione",

        // Dynamic messages
        "loadingImages": "Caricamento immagini...",
        "noImagesFound": "Nessuna immagine trovata",
        "noImagesFoundFor": "Nessuna immagine trovata per \"{query}\"",
        "errorLoadingImages": "Errore nel caricamento delle immagini.",
        "couldNotLoadThemes": "Impossibile caricare i temi.",
        "maxImagesSelected": "Puoi selezionare un massimo di {max} immagini.",
        "customImagesAvailable": "{count} immagine/i personalizzata/e disponibile/i.",
        "generatingWorksheet": "Generazione scheda di lavoro...",
        "pleaseSelectImages": "Seleziona delle immagini o scegli un tema con immagini.",
        "worksheetGeneratedSuccessfully": "Scheda di lavoro generata con successo!",
        "pleaseGenerateWorksheetFirst": "Genera prima una scheda di lavoro.",
        "generatingAnswerKey": "Generazione foglio risposte...",
        "answerKeyGenerated": "Foglio risposte generato!",
        "failedToLoadImage": "Impossibile caricare l'immagine {type}.",
        "formCleared": "Modulo cancellato.",
        "preparingCanvas": "Preparazione {canvas}...",
        "downloadInitiated": "Download avviato!",
        "errorPreparingImage": "Errore nella preparazione dell'immagine: {error}",
        "pleaseGenerateContentFirst": "Genera prima il contenuto.",
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
        "worksheetJpeg": "Scheda di Lavoro (JPEG)",
        "answerKeyJpeg": "Foglio Risposte (JPEG)",
        "worksheetPdf": "Scheda di Lavoro (PDF)",
        "answerKeyPdf": "Foglio Risposte (PDF)",
        "grayscale": "Scala di Grigi"
    },

    pt: {
        // Page title and main headers
        "wordScrambleTitle": "Gerador de Palavras Embaralhadas",
        "worksheetSettings": "Configurações da Folha",

        // Accordion headers
        "languageSettings": "Configurações de Idioma",
        "pageSetup": "Configuração da Página",
        "textTools": "Ferramentas de Texto",
        "imageSelection": "Seleção de Imagens",
        "uploadCustomImages": "Carregar Suas Imagens",
        "problemSettings": "Configurações de Exercícios",

        // Tab labels
        "worksheet": "Folha de Exercícios",
        "answerKey": "Gabarito",

        // Common UI elements
        "language": "Idioma:",
        "none": "Nenhum",
        "common.none": "Nenhum",
    "none": "Nenhum",
        "loading": "Carregando...",
        "error": "Erro",
        "success": "Sucesso",
        "generate": "Gerar",
        "download": "Baixar",
        "clearAll": "Limpar Tudo",

        // Generate dropdown options
        "generateWorksheet": "Gerar Folha de Exercícios",
        "generateAnswerKey": "Gerar Gabarito",

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
        "selectThemeForBackgrounds": "Selecione um tema para fundos.",
        "backgroundOpacity": "Opacidade do Fundo:",
        "borderTheme": "Tema de Borda:",
        "selectThemeToSeeBorders": "Selecione um tema para bordas.",
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
        "selectedImagesForPuzzles": "Imagens Selecionadas para Exercícios:",

        // Upload section
        "selectImagesToUpload": "Selecionar imagens para carregar:",
        "chooseFiles": "Escolher Arquivos",
        "noFileChosen": "Nenhum arquivo escolhido",
        "filesSelected": "{count} arquivo(s) selecionado(s)",
        "yourUploadedImages": "Suas imagens carregadas",
        "yourUploadedImagesAppearHere": "Suas imagens carregadas aparecem aqui.",

        // Problem settings
        "puzzlesPerPage": "Exercícios por página:",
        "allBlack": "Todo Preto",
        "colorCodedVowelConsonant": "Codificado por Cor (Vogal/Consoante)",
        "letterColors": "Cores das Letras",
        "lowercase": "Minúsculas",
        "uppercase": "Maiúsculas",
        "letterCase": "Caixa das Letras",
        "tough": "Difícil (1/6)",
        "normal": "Normal (1/4)",
        "easy": "Fácil (1/2)",
        "noClues": "Sem pistas",
        "difficulty": "Dificuldade (Número de Pistas)",
        "includeNameDateLine": "Incluir linha nome/data",
        "includeExerciseNumbers": "Incluir números dos exercícios",
        "letterColor": "Cor das letras:",
        "blackWhite": "Preto e Branco",
        "colorCoded": "Codificado por cores",

        // Alignment toolbar
        "alignSelected": "Alinhar seleção:",
        "deleteSelected": "Excluir seleção",

        // Dynamic messages
        "loadingImages": "Carregando imagens...",
        "noImagesFound": "Nenhuma imagem encontrada",
        "noImagesFoundFor": "Nenhuma imagem encontrada para \"{query}\"",
        "errorLoadingImages": "Erro ao carregar imagens.",
        "couldNotLoadThemes": "Não foi possível carregar os temas.",
        "maxImagesSelected": "Você pode selecionar no máximo {max} imagens.",
        "customImagesAvailable": "{count} imagem(ns) personalizada(s) disponível(is).",
        "generatingWorksheet": "Gerando folha de exercícios...",
        "pleaseSelectImages": "Por favor, selecione imagens ou escolha um tema com imagens.",
        "worksheetGeneratedSuccessfully": "Folha de exercícios gerada com sucesso!",
        "pleaseGenerateWorksheetFirst": "Por favor, gere primeiro uma folha de exercícios.",
        "generatingAnswerKey": "Gerando gabarito...",
        "answerKeyGenerated": "Gabarito gerado!",
        "failedToLoadImage": "Falha ao carregar imagem {type}.",
        "formCleared": "Formulário limpo.",
        "preparingCanvas": "Preparando {canvas}...",
        "downloadInitiated": "Download iniciado!",
        "errorPreparingImage": "Erro ao preparar imagem: {error}",
        "pleaseGenerateContentFirst": "Por favor, gere o conteúdo primeiro.",
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
        "worksheetJpeg": "Folha de Exercícios (JPEG)",
        "answerKeyJpeg": "Gabarito (JPEG)",
        "worksheetPdf": "Folha de Exercícios (PDF)",
        "answerKeyPdf": "Gabarito (PDF)",
        "grayscale": "Escala de Cinza"
    },

    nl: {
        // Page title and main headers
        "wordScrambleTitle": "Lettermix Generator",
        "worksheetSettings": "Werkbladinstellingen",

        // Accordion headers
        "languageSettings": "Taalinstellingen",
        "pageSetup": "Pagina-instelling",
        "textTools": "Tekstgereedschap",
        "imageSelection": "Afbeelding Selectie",
        "uploadCustomImages": "Upload Eigen Afbeeldingen",
        "problemSettings": "Oefening Instellingen",

        // Tab labels
        "worksheet": "Werkblad",
        "answerKey": "Antwoordblad",

        // Common UI elements
        "language": "Taal:",
        "none": "Geen",
        "common.none": "Geen",
    "none": "Geen",
        "loading": "Laden...",
        "error": "Fout",
        "success": "Succes",
        "generate": "Genereren",
        "download": "Downloaden",
        "clearAll": "Alles Wissen",

        // Generate dropdown options
        "generateWorksheet": "Werkblad Genereren",
        "generateAnswerKey": "Antwoordblad Genereren",

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
        "backgroundOpacity": "Achtergrond Transparantie:",
        "borderTheme": "Randthema:",
        "selectThemeToSeeBorders": "Selecteer een thema voor randen.",
        "borderOpacity": "Rand Transparantie:",

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
        "selectedImagesForPuzzles": "Geselecteerde Afbeeldingen voor Oefeningen:",

        // Upload section
        "selectImagesToUpload": "Selecteer afbeeldingen om te uploaden:",
        "chooseFiles": "Bestanden Kiezen",
        "noFileChosen": "Geen bestand gekozen",
        "filesSelected": "{count} bestand(en) geselecteerd",
        "yourUploadedImages": "Uw geüploade afbeeldingen",
        "yourUploadedImagesAppearHere": "Uw geüploade afbeeldingen verschijnen hier.",

        // Problem settings
        "puzzlesPerPage": "Oefeningen per pagina:",
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
        "difficulty": "Moeilijkheid (Aantal Aanwijzingen)",
        "includeNameDateLine": "Naam/datum regel toevoegen",
        "includeExerciseNumbers": "Oefening nummers toevoegen",
        "letterColor": "Letterkleur:",
        "blackWhite": "Zwart & Wit",
        "colorCoded": "Kleurgecodeerd",

        // Alignment toolbar
        "alignSelected": "Selectie uitlijnen:",
        "deleteSelected": "Selectie verwijderen",

        // Dynamic messages
        "loadingImages": "Afbeeldingen laden...",
        "noImagesFound": "Geen afbeeldingen gevonden",
        "noImagesFoundFor": "Geen afbeeldingen gevonden voor \"{query}\"",
        "errorLoadingImages": "Fout bij het laden van afbeeldingen.",
        "couldNotLoadThemes": "Kon thema's niet laden.",
        "maxImagesSelected": "U kunt maximaal {max} afbeeldingen selecteren.",
        "customImagesAvailable": "{count} aangepaste afbeelding(en) beschikbaar.",
        "generatingWorksheet": "Werkblad genereren...",
        "pleaseSelectImages": "Selecteer afbeeldingen of kies een thema met afbeeldingen.",
        "worksheetGeneratedSuccessfully": "Werkblad succesvol gegenereerd!",
        "pleaseGenerateWorksheetFirst": "Genereer eerst een werkblad.",
        "generatingAnswerKey": "Antwoordblad genereren...",
        "answerKeyGenerated": "Antwoordblad gegenereerd!",
        "failedToLoadImage": "Kan {type} afbeelding niet laden.",
        "formCleared": "Formulier gewist.",
        "preparingCanvas": "{canvas} voorbereiden...",
        "downloadInitiated": "Download gestart!",
        "errorPreparingImage": "Fout bij het voorbereiden van afbeelding: {error}",
        "pleaseGenerateContentFirst": "Genereer eerst inhoud.",
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
        "wordScrambleTitle": "Bokstavsblandare",
        "worksheetSettings": "Arbetsbladsinställningar",

        // Accordion headers
        "languageSettings": "Språkinställningar",
        "pageSetup": "Sidinställning",
        "textTools": "Textverktyg",
        "imageSelection": "Bildval",
        "uploadCustomImages": "Ladda upp Egna Bilder",
        "problemSettings": "Uppgiftsinställningar",

        // Tab labels
        "worksheet": "Arbetsblad",
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
        "download": "Ladda ner",
        "clearAll": "Rensa Allt",

        // Generate dropdown options
        "generateWorksheet": "Skapa Arbetsblad",
        "generateAnswerKey": "Skapa Facit",

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
        "setPageSize": "Ställ in Storlek",
        "pageColor": "Sidfärg:",

        // Backgrounds and borders
        "backgroundTheme": "Bakgrundstema:",
        "selectThemeForBackgrounds": "Välj ett tema för bakgrunder.",
        "backgroundOpacity": "Bakgrundsopacitet:",
        "borderTheme": "Ramtema:",
        "selectThemeToSeeBorders": "Välj ett tema för ramar.",
        "borderOpacity": "Ramopacitet:",

        // Text tools
        "selectedTextProperties": "Markerad Textegenskaper",
        "textToAdd": "Text att lägga till:",
        "addText": "Lägg till Text",
        "textColor": "Textfärg:",
        "fontSize": "Teckenstorlek:",
        "fontFamily": "Typsnitt:",
        "strokeColor": "Konturfärg:",
        "strokeWidth": "Konturbredd:",

        // Image selection
        "selectTheme": "Välj Tema:",
        "allThemes": "Alla Teman",
        "searchImages": "Sök Bilder:",
        "searchPlaceholder": "t.ex. äpple, bil",
        "selectedCountMsg": "Vald: {count} / {max}",
        "selectedImagesForPuzzles": "Valda Bilder för Uppgifter:",

        // Upload section
        "selectImagesToUpload": "Välj bilder att ladda upp:",
        "chooseFiles": "Välj Filer",
        "noFileChosen": "Ingen fil vald",
        "filesSelected": "{count} fil(er) valda",
        "yourUploadedImages": "Dina uppladdade bilder",
        "yourUploadedImagesAppearHere": "Dina uppladdade bilder visas här.",

        // Problem settings
        "puzzlesPerPage": "Uppgifter per sida:",
        "allBlack": "Allt Svart",
        "colorCodedVowelConsonant": "Färgkodad (Vokal/Konsonant)",
        "letterColors": "Bokstavsfärger",
        "lowercase": "Gemener",
        "uppercase": "Versaler",
        "letterCase": "Bokstavsstorlek",
        "tough": "Svår (1/6)",
        "normal": "Normal (1/4)",
        "easy": "Lätt (1/2)",
        "noClues": "Inga ledtrådar",
        "difficulty": "Svårighet (Antal Ledtrådar)",
        "includeNameDateLine": "Inkludera namn/datum-rad",
        "includeExerciseNumbers": "Inkludera uppgiftsnummer",
        "letterColor": "Bokstavsfärg:",
        "blackWhite": "Svart & Vit",
        "colorCoded": "Färgkodad",

        // Alignment toolbar
        "alignSelected": "Justera markering:",
        "deleteSelected": "Ta bort markering",

        // Dynamic messages
        "loadingImages": "Laddar bilder...",
        "noImagesFound": "Inga bilder hittades",
        "noImagesFoundFor": "Inga bilder hittades för \"{query}\"",
        "errorLoadingImages": "Fel vid laddning av bilder.",
        "couldNotLoadThemes": "Kunde inte ladda teman.",
        "maxImagesSelected": "Du kan välja max {max} bilder.",
        "customImagesAvailable": "{count} egen/egna bild(er) tillgänglig(a).",
        "generatingWorksheet": "Skapar arbetsblad...",
        "pleaseSelectImages": "Välj bilder eller välj ett tema med bilder.",
        "worksheetGeneratedSuccessfully": "Arbetsblad skapat framgångsrikt!",
        "pleaseGenerateWorksheetFirst": "Skapa ett arbetsblad först.",
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
        "worksheetJpeg": "Arbetsblad (JPEG)",
        "answerKeyJpeg": "Facit (JPEG)",
        "worksheetPdf": "Arbetsblad (PDF)",
        "answerKeyPdf": "Facit (PDF)",
        "grayscale": "Gråskala"
    },

    da: {
        // Page title and main headers
        "wordScrambleTitle": "Bogstavblander",
        "worksheetSettings": "Arbejdsarkindstillinger",

        // Accordion headers
        "languageSettings": "Sprogindstillinger",
        "pageSetup": "Sideopsætning",
        "textTools": "Tekstværktøjer",
        "imageSelection": "Billedvalg",
        "uploadCustomImages": "Upload Egne Billeder",
        "problemSettings": "Opgaveindstillinger",

        // Tab labels
        "worksheet": "Arbejdsark",
        "answerKey": "Facitliste",

        // Common UI elements
        "language": "Sprog:",
        "none": "Ingen",
        "common.none": "Ingen",
    "none": "Ingen",
        "loading": "Indlæser...",
        "error": "Fejl",
        "success": "Succes",
        "generate": "Generer",
        "download": "Download",
        "clearAll": "Ryd Alt",

        // Generate dropdown options
        "generateWorksheet": "Generer Arbejdsark",
        "generateAnswerKey": "Generer Facitliste",

        // Page setup
        "pageSize": "Sidestørrelse:",
        "letterPortrait": "Letter (Stående)",
        "letterLandscape": "Letter (Liggende)",
        "a4Portrait": "A4 (Stående)",
        "a4Landscape": "A4 (Liggende)",
        "legalPortrait": "Legal (Stående)",
        "legalLandscape": "Legal (Liggende)",
        "custom": "Tilpasset",
        "width": "Bredde:",
        "height": "Højde:",
        "setPageSize": "Indstil Størrelse",
        "pageColor": "Sidefarve:",

        // Backgrounds and borders
        "backgroundTheme": "Baggrundstema:",
        "selectThemeForBackgrounds": "Vælg et tema til baggrunde.",
        "backgroundOpacity": "Baggrundsgennemsigtighed:",
        "borderTheme": "Rammetema:",
        "selectThemeToSeeBorders": "Vælg et tema til rammer.",
        "borderOpacity": "Rammegennemsigtighed:",

        // Text tools
        "selectedTextProperties": "Markerede Tekstegenskaber",
        "textToAdd": "Tekst at tilføje:",
        "addText": "Tilføj Tekst",
        "textColor": "Tekstfarve:",
        "fontSize": "Skriftstørrelse:",
        "fontFamily": "Skrifttype:",
        "strokeColor": "Konturfarve:",
        "strokeWidth": "Konturbredde:",

        // Image selection
        "selectTheme": "Vælg Tema:",
        "allThemes": "Alle Temaer",
        "searchImages": "Søg Billeder:",
        "searchPlaceholder": "f.eks. æble, bil",
        "selectedCountMsg": "Valgt: {count} / {max}",
        "selectedImagesForPuzzles": "Valgte Billeder til Opgaver:",

        // Upload section
        "selectImagesToUpload": "Vælg billeder at uploade:",
        "chooseFiles": "Vælg Filer",
        "noFileChosen": "Ingen fil valgt",
        "filesSelected": "{count} fil(er) valgt",
        "yourUploadedImages": "Dine uploadede billeder",
        "yourUploadedImagesAppearHere": "Dine uploadede billeder vises her.",

        // Problem settings
        "puzzlesPerPage": "Opgaver per side:",
        "allBlack": "Alt Sort",
        "colorCodedVowelConsonant": "Farvekodet (Vokal/Konsonant)",
        "letterColors": "Bogstavfarver",
        "lowercase": "Små Bogstaver",
        "uppercase": "Store Bogstaver",
        "letterCase": "Store/Små Bogstaver",
        "tough": "Svær (1/6)",
        "normal": "Normal (1/4)",
        "easy": "Let (1/2)",
        "noClues": "Ingen ledetråde",
        "difficulty": "Sværhedsgrad (Antal Ledetråde)",
        "includeNameDateLine": "Inkluder navn/dato-linje",
        "includeExerciseNumbers": "Inkluder opgavenumre",
        "letterColor": "Bogstavfarve:",
        "blackWhite": "Sort & Hvid",
        "colorCoded": "Farvekodede",

        // Alignment toolbar
        "alignSelected": "Juster markering:",
        "deleteSelected": "Slet markering",

        // Dynamic messages
        "loadingImages": "Indlæser billeder...",
        "noImagesFound": "Ingen billeder fundet",
        "noImagesFoundFor": "Ingen billeder fundet for \"{query}\"",
        "errorLoadingImages": "Fejl ved indlæsning af billeder.",
        "couldNotLoadThemes": "Kunne ikke indlæse temaer.",
        "maxImagesSelected": "Du kan vælge maksimalt {max} billeder.",
        "customImagesAvailable": "{count} tilpasset/tilpassede billede(r) tilgængelig(e).",
        "generatingWorksheet": "Genererer arbejdsark...",
        "pleaseSelectImages": "Vælg billeder eller vælg et tema med billeder.",
        "worksheetGeneratedSuccessfully": "Arbejdsark genereret succesfuldt!",
        "pleaseGenerateWorksheetFirst": "Generer først et arbejdsark.",
        "generatingAnswerKey": "Genererer facitliste...",
        "answerKeyGenerated": "Facitliste genereret!",
        "failedToLoadImage": "Kunne ikke indlæse {type}-billede.",
        "formCleared": "Formular ryddet.",
        "preparingCanvas": "Forbereder {canvas}...",
        "downloadInitiated": "Download startet!",
        "errorPreparingImage": "Fejl ved forberedelse af billede: {error}",
        "pleaseGenerateContentFirst": "Generer først indhold.",
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
        "worksheetJpeg": "Arbejdsark (JPEG)",
        "answerKeyJpeg": "Facitliste (JPEG)",
        "worksheetPdf": "Arbejdsark (PDF)",
        "answerKeyPdf": "Facitliste (PDF)",
        "grayscale": "Gråtoner"
    },

    no: {
        // Page title and main headers
        "wordScrambleTitle": "Bokstavblander",
        "worksheetSettings": "Arbeidsarkinnstillinger",

        // Accordion headers
        "languageSettings": "Språkinnstillinger",
        "pageSetup": "Sideoppsett",
        "textTools": "Tekstverktøy",
        "imageSelection": "Bildevalg",
        "uploadCustomImages": "Last opp Egne Bilder",
        "problemSettings": "Oppgaveinnstillinger",

        // Tab labels
        "worksheet": "Arbeidsark",
        "answerKey": "Fasit",

        // Common UI elements
        "language": "Språk:",
        "none": "Ingen",
        "common.none": "Ingen",
    "none": "Ingen",
        "loading": "Laster...",
        "error": "Feil",
        "success": "Suksess",
        "generate": "Generer",
        "download": "Last ned",
        "clearAll": "Tøm Alt",

        // Generate dropdown options
        "generateWorksheet": "Generer Arbeidsark",
        "generateAnswerKey": "Generer Fasit",

        // Page setup
        "pageSize": "Sidestørrelse:",
        "letterPortrait": "Letter (Stående)",
        "letterLandscape": "Letter (Liggende)",
        "a4Portrait": "A4 (Stående)",
        "a4Landscape": "A4 (Liggende)",
        "legalPortrait": "Legal (Stående)",
        "legalLandscape": "Legal (Liggende)",
        "custom": "Tilpasset",
        "width": "Bredde:",
        "height": "Høyde:",
        "setPageSize": "Sett Størrelse",
        "pageColor": "Sidefarge:",

        // Backgrounds and borders
        "backgroundTheme": "Bakgrunnstema:",
        "selectThemeForBackgrounds": "Velg et tema for bakgrunner.",
        "backgroundOpacity": "Bakgrunnsopasitet:",
        "borderTheme": "Rammetema:",
        "selectThemeToSeeBorders": "Velg et tema for rammer.",
        "borderOpacity": "Rammeopasitet:",

        // Text tools
        "selectedTextProperties": "Valgte Tekstegenskaper",
        "textToAdd": "Tekst å legge til:",
        "addText": "Legg til Tekst",
        "textColor": "Tekstfarge:",
        "fontSize": "Skriftstørrelse:",
        "fontFamily": "Skrifttype:",
        "strokeColor": "Konturfarge:",
        "strokeWidth": "Konturbredde:",

        // Image selection
        "selectTheme": "Velg Tema:",
        "allThemes": "Alle Temaer",
        "searchImages": "Søk Bilder:",
        "searchPlaceholder": "f.eks. eple, bil",
        "selectedCountMsg": "Valgt: {count} / {max}",
        "selectedImagesForPuzzles": "Valgte Bilder for Oppgaver:",

        // Upload section
        "selectImagesToUpload": "Velg bilder å laste opp:",
        "chooseFiles": "Velg Filer",
        "noFileChosen": "Ingen fil valgt",
        "filesSelected": "{count} fil(er) valgt",
        "yourUploadedImages": "Dine opplastede bilder",
        "yourUploadedImagesAppearHere": "Dine opplastede bilder vises her.",

        // Problem settings
        "puzzlesPerPage": "Oppgaver per side:",
        "allBlack": "Alt Svart",
        "colorCodedVowelConsonant": "Fargekodet (Vokal/Konsonant)",
        "letterColors": "Bokstavfarger",
        "lowercase": "Små Bokstaver",
        "uppercase": "Store Bokstaver",
        "letterCase": "Store/Små Bokstaver",
        "tough": "Vanskelig (1/6)",
        "normal": "Normal (1/4)",
        "easy": "Lett (1/2)",
        "noClues": "Ingen ledetråder",
        "difficulty": "Vanskelighetsgrad (Antall Ledetråder)",
        "includeNameDateLine": "Inkluder navn/dato-linje",
        "includeExerciseNumbers": "Inkluder oppgavenummer",
        "letterColor": "Bokstavfarge:",
        "blackWhite": "Svart & Hvit",
        "colorCoded": "Fargekodet",

        // Alignment toolbar
        "alignSelected": "Juster markering:",
        "deleteSelected": "Slett markering",

        // Dynamic messages
        "loadingImages": "Laster bilder...",
        "noImagesFound": "Ingen bilder funnet",
        "noImagesFoundFor": "Ingen bilder funnet for \"{query}\"",
        "errorLoadingImages": "Feil ved lasting av bilder.",
        "couldNotLoadThemes": "Kunne ikke laste temaer.",
        "maxImagesSelected": "Du kan velge maksimalt {max} bilder.",
        "customImagesAvailable": "{count} tilpasset(e) bilde(r) tilgjengelig.",
        "generatingWorksheet": "Genererer arbeidsark...",
        "pleaseSelectImages": "Velg bilder eller velg et tema med bilder.",
        "worksheetGeneratedSuccessfully": "Arbeidsark generert vellykket!",
        "pleaseGenerateWorksheetFirst": "Generer et arbeidsark først.",
        "generatingAnswerKey": "Genererer fasit...",
        "answerKeyGenerated": "Fasit generert!",
        "failedToLoadImage": "Kunne ikke laste {type}-bilde.",
        "formCleared": "Skjema tømt.",
        "preparingCanvas": "Forbereder {canvas}...",
        "downloadInitiated": "Nedlasting startet!",
        "errorPreparingImage": "Feil ved forberedelse av bilde: {error}",
        "pleaseGenerateContentFirst": "Generer innhold først.",
        "preparingPdf": "Forbereder PDF...",
        "pdfDownloaded": "PDF lastet ned!",
        "errorCreatingPdf": "Feil ved oppretting av PDF.",
        "preparingJpeg": "Forbereder JPEG...",
        "jpegDownloadInitiated": "JPEG-nedlasting startet!",
        "errorPreparingJpeg": "Feil ved forberedelse av JPEG.",
        "preparingCanvasPdf": "Forbereder {canvas} PDF...",
        "pdfDownloadComplete": "PDF lastet ned!",
        "errorCreatingPdfWithMessage": "Feil ved oppretting av PDF: {error}",

        // Download menu
        "worksheetJpeg": "Arbeidsark (JPEG)",
        "answerKeyJpeg": "Fasit (JPEG)",
        "worksheetPdf": "Arbeidsark (PDF)",
        "answerKeyPdf": "Fasit (PDF)",
        "grayscale": "Gråtoner"
    },

    fi: {
        // Page title and main headers
        "wordScrambleTitle": "Kirjainsekoittaja",
        "worksheetSettings": "Tehtäväpaperin Asetukset",

        // Accordion headers
        "languageSettings": "Kieliasetukset",
        "pageSetup": "Sivun Asetus",
        "textTools": "Tekstityökalut",
        "imageSelection": "Kuvan Valinta",
        "uploadCustomImages": "Lataa Omia Kuvia",
        "problemSettings": "Tehtäväasetukset",

        // Tab labels
        "worksheet": "Tehtäväpaperi",
        "answerKey": "Vastauslomake",

        // Common UI elements
        "language": "Kieli:",
        "none": "Ei mitään",
        "common.none": "Ei mitään",
    "none": "Ei mitään",
        "loading": "Ladataan...",
        "error": "Virhe",
        "success": "Onnistui",
        "generate": "Luo",
        "download": "Lataa",
        "clearAll": "Tyhjennä Kaikki",

        // Generate dropdown options
        "generateWorksheet": "Luo Tehtäväpaperi",
        "generateAnswerKey": "Luo Vastauslomake",

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
        "borderTheme": "Reunateema:",
        "selectThemeToSeeBorders": "Valitse teema reunoille.",
        "borderOpacity": "Reunan Läpinäkyvyys:",

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
        "selectedImagesForPuzzles": "Valitut Kuvat Tehtäviin:",

        // Upload section
        "selectImagesToUpload": "Valitse ladattavat kuvat:",
        "chooseFiles": "Valitse Tiedostot",
        "noFileChosen": "Ei tiedostoa valittuna",
        "filesSelected": "{count} tiedosto(a) valittu",
        "yourUploadedImages": "Lataamasi kuvat",
        "yourUploadedImagesAppearHere": "Lataamasi kuvat näkyvät täällä.",

        // Problem settings
        "puzzlesPerPage": "Tehtäviä per sivu:",
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
        "difficulty": "Vaikeus (Vihjeiden Määrä)",
        "includeNameDateLine": "Sisällytä nimi/päivämäärä-rivi",
        "includeExerciseNumbers": "Sisällytä tehtävänumerot",
        "letterColor": "Kirjainten väri:",
        "blackWhite": "Mustavalkoinen",
        "colorCoded": "Värikoodattu",

        // Alignment toolbar
        "alignSelected": "Kohdista valinta:",
        "deleteSelected": "Poista valinta",

        // Dynamic messages
        "loadingImages": "Ladataan kuvia...",
        "noImagesFound": "Kuvia ei löytynyt",
        "noImagesFoundFor": "Kuvia ei löytynyt haulle \"{query}\"",
        "errorLoadingImages": "Virhe kuvien latauksessa.",
        "couldNotLoadThemes": "Teemoja ei voitu ladata.",
        "maxImagesSelected": "Voit valita enintään {max} kuvaa.",
        "customImagesAvailable": "{count} mukautettu(a) kuva(a) saatavilla.",
        "generatingWorksheet": "Luodaan tehtäväpaperia...",
        "pleaseSelectImages": "Valitse kuvia tai valitse teema, jossa on kuvia.",
        "worksheetGeneratedSuccessfully": "Tehtäväpaperi luotu onnistuneesti!",
        "pleaseGenerateWorksheetFirst": "Luo ensin tehtäväpaperi.",
        "generatingAnswerKey": "Luodaan vastauslomaketta...",
        "answerKeyGenerated": "Vastauslomake luotu!",
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
        "worksheetJpeg": "Tehtäväpaperi (JPEG)",
        "answerKeyJpeg": "Vastauslomake (JPEG)",
        "worksheetPdf": "Tehtäväpaperi (PDF)",
        "answerKeyPdf": "Vastauslomake (PDF)",
        "grayscale": "Harmaasävy"
    }
};