/**
 * PROFESSIONAL COLORING TRANSLATIONS - ALL LANGUAGES
 * =====================================================
 * Complete multi-language translation system for Coloring App
 * Created: December 2024
 * Languages: EN, DE, FR, ES, IT, PT, NL, SV, DA, NO, FI
 */

// Define translation function if not already defined
if (typeof t === 'undefined') {
    window.t = function(key) {
        if (typeof translations === 'undefined') {
            console.warn('Translations not loaded, returning key:', key);
            return key;
        }
        const locale = window.currentLocale || 'en';
        const translation = (translations[locale] && translations[locale][key]) ||
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
    en: {
        // Core UI Elements
        "coloringPageDesigner": "Coloring Page Designer",
        "coloringDesigner": "Coloring Designer",
        "download": "Download",
        "downloadAsJPEG": "Download as JPEG",
        "downloadAsPDF": "Download as PDF",
        "grayscale": "Grayscale",
        "clearAll": "Clear All",
        "clearCanvasConfirmation": "Are you sure you want to permanently clear the canvas?",
        "cancel": "Cancel",
        "yesClear": "Yes, Clear",
        "opacity": "Opacity",
        "deleteSelected": "Delete Selected",
        "lockObject": "Lock Object",

        // Common keys often missing
        "none": "None",
        "common.none": "None",
    "none": "None",
        "allThemes": "All Themes",
        "yourUploadedImagesWillAppearHere": "Your uploaded images will appear here.",

        // Language Settings
        "languageSettings": "Language Settings",
        "language": "Language:",
        "imageLibraryLanguage": "Image Library Language:",

        // Page Setup
        "pageSetup": "Page Setup",
        "pageDimensions": "Page Dimensions",
        "pageSize": "Page Size:",
        "letterPortrait": "Letter Portrait (8.5×11\")",
        "letterLandscape": "Letter Landscape (11×8.5\")",
        "a4Portrait": "A4 Portrait (210×297mm)",
        "a4Landscape": "A4 Landscape (297×210mm)",
        "square": "Square (1200x1200)",
        "custom": "Custom",
        "widthPx": "Width (px):",
        "heightPx": "Height (px):",
        "applySize": "Apply Size",
        "pageColor": "Page Color:",

        // Border
        "border": "Border",
        "borderTheme": "Border Theme:",
        "selectThemeToSeeBorders": "Select a theme to see borders.",

        // Classroom Helpers
        "classroomHelpers": "Classroom Helpers",
        "addNameField": "Add \"Name: ___\"",
        "addHandwritingLines": "Add Handwriting Lines",

        // Drawing Tools
        "drawingTools": "Drawing Tools",
        "selectTool": "Select Tool",
        "drawingTool": "Drawing Tool",
        "brushColor": "Brush Color:",
        "brushSize": "Brush Size:",

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

        // Image Library
        "imageLibrary": "Image Library",
        "selectTheme": "Select Theme:",
        "searchImages": "Search Images:",
        "searchPlaceholder": "e.g., apple, car",
        "selectThemeOrTypeToSearch": "Select a theme or type to search.",
        "availableImagesClickToAdd": "Available Images (Click to Add):",
        "loadingImages": "Loading images...",

        // Upload Custom Images
        "uploadCustomImages": "Upload Custom Images",
        "selectImagesToUpload": "Select image(s) to upload:",
        "chooseFiles": "Choose files",
        "noFileChosen": "No file chosen",
        "filesSelected": "{} file(s) selected",
        "yourUploadedImagesClickToAdd": "Your Uploaded Images (Click to Add):",

        // Zoom & History Controls
        "zoomIn": "Zoom In",
        "zoomOut": "Zoom Out",
        "resetZoom": "Reset Zoom",
        "undo": "Undo (Ctrl+Z)",
        "redo": "Redo (Ctrl+Y)",

        // Toolbar & Layer Controls
        "layers": "Layers",
        "bringForward": "Bring Forward",
        "bringToFront": "Bring to Front",
        "sendBackward": "Send Backward",
        "sendToBack": "Send to Back",

        // Lock/Unlock
        "unlockObject": "Unlock Object",
        "objectLocked": "Object Locked",
        "objectUnlocked": "Object Unlocked",

        // Flip & Align
        "flip": "Flip",
        "flipHorizontal": "Flip Horizontal",
        "flipVertical": "Flip Vertical",
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
        "centerOnPageVertically": "Center on Page Vertically"
    },

    de: {
        // Core UI Elements
        "coloringPageDesigner": "Malvorlagen-Designer",
        "coloringDesigner": "Mal-Designer",
        "download": "Herunterladen",
        "downloadAsJPEG": "Als JPEG herunterladen",
        "downloadAsPDF": "Als PDF herunterladen",
        "grayscale": "Graustufen",
        "clearAll": "Alles zurücksetzen",
        "clearCanvasConfirmation": "Möchtest du wirklich die gesamte Zeichenfläche dauerhaft löschen?",
        "cancel": "Abbrechen",
        "yesClear": "Ja, löschen",
        "opacity": "Deckkraft",
        "deleteSelected": "Ausgewähltes löschen",
        "lockObject": "Objekt sperren",

        // Common keys
        "none": "Keine",
        "common.none": "Kein",
        "allThemes": "Alle Themen",
        "yourUploadedImagesWillAppearHere": "Deine hochgeladenen Bilder erscheinen hier.",

        // Language Settings
        "languageSettings": "Spracheinstellungen",
        "language": "Sprache:",
        "imageLibraryLanguage": "Bilderbibliothek-Sprache:",

        // Page Setup
        "pageSetup": "Seiteneinrichtung",
        "pageDimensions": "Seitenmaße",
        "pageSize": "Papierformat:", // Changed from "Seitengröße:"
        "letterPortrait": "Letter Hochformat (8.5×11\")",
        "letterLandscape": "Letter Querformat (11×8.5\")",
        "a4Portrait": "A4 Hochformat (210×297mm)",
        "a4Landscape": "A4 Querformat (297×210mm)",
        "square": "Quadrat (1200x1200)",
        "custom": "Benutzerdefiniert",
        "widthPx": "Breite (px):",
        "heightPx": "Höhe (px):",
        "applySize": "Größe anwenden",
        "pageColor": "Seitenfarbe:",

        // Border
        "border": "Rahmen",
        "borderTheme": "Rahmenthema:",
        "selectThemeToSeeBorders": "Wähle ein Thema, um Rahmen zu sehen.",

        // Classroom Helpers
        "classroomHelpers": "Klassenzimmer-Helfer",
        "addNameField": "\"Name: ___\" hinzufügen",
        "addHandwritingLines": "Schreiblinien hinzufügen",

        // Drawing Tools
        "drawingTools": "Zeichenwerkzeuge",
        "selectTool": "Auswahlwerkzeug",
        "drawingTool": "Zeichenwerkzeug",
        "brushColor": "Pinselfarbe:",
        "brushSize": "Pinselgröße:",

        // Text Tools
        "textTools": "Textbearbeitung", // Changed from "Textwerkzeuge"
        "addNewText": "Neuen Text hinzufügen",
        "content": "Inhalt:",
        "helloPlaceholder": "Hallo!",
        "addText": "Text hinzufügen",
        "selectedTextProperties": "Eigenschaften des ausgewählten Texts",
        "color": "Farbe:",
        "size": "Größe:",
        "font": "Schriftart:",
        "outlineColor": "Konturfarbe:",
        "outlineWidth": "Kontur (0-10):",

        // Image Library
        "imageLibrary": "Bilderbibliothek",
        "selectTheme": "Thema auswählen:",
        "searchImages": "Bilder suchen:",
        "searchPlaceholder": "z.B. Apfel, Auto",
        "selectThemeOrTypeToSearch": "Wähle ein Thema oder tippe zum Suchen.",
        "availableImagesClickToAdd": "Verfügbare Bilder (Zum Hinzufügen anklicken):",
        "loadingImages": "Bilder werden geladen...",

        // Upload Custom Images
        "uploadCustomImages": "Eigene Bilder hochladen",
        "selectImagesToUpload": "Bild(er) zum Hochladen auswählen:",
        "chooseFiles": "Dateien auswählen",
        "noFileChosen": "Keine Datei ausgewählt",
        "filesSelected": "{} Datei(en) ausgewählt",
        "yourUploadedImagesClickToAdd": "Deine hochgeladenen Bilder (Zum Hinzufügen anklicken):",

        // Zoom & History Controls
        "zoomIn": "Vergrößern",
        "zoomOut": "Verkleinern",
        "resetZoom": "Zoom zurücksetzen",
        "undo": "Rückgängig (Strg+Z)",
        "redo": "Wiederholen (Strg+Y)",

        // Toolbar & Layer Controls
        "layers": "Ebenen",
        "bringForward": "Nach vorne",
        "bringToFront": "Ganz nach vorne",
        "sendBackward": "Nach hinten",
        "sendToBack": "Ganz nach hinten",

        // Lock/Unlock
        "unlockObject": "Objekt entsperren",
        "objectLocked": "Objekt gesperrt",
        "objectUnlocked": "Objekt entsperrt",

        // Flip & Align
        "flip": "Spiegeln",
        "flipHorizontal": "Horizontal spiegeln",
        "flipVertical": "Vertikal spiegeln",
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
        "centerOnPageVertically": "Auf Seite vertikal zentrieren"
    },

    fr: {
        // Core UI Elements
        "coloringPageDesigner": "Concepteur de pages à colorier",
        "coloringDesigner": "Concepteur de coloriage",
        "download": "Télécharger",
        "downloadAsJPEG": "Télécharger en JPEG",
        "downloadAsPDF": "Télécharger en PDF",
        "grayscale": "Niveaux de gris",
        "clearAll": "Tout effacer",
        "clearCanvasConfirmation": "Êtes-vous sûr de vouloir effacer définitivement le canevas ?",
        "cancel": "Annuler",
        "yesClear": "Oui, effacer",
        "opacity": "Opacité",
        "deleteSelected": "Supprimer la sélection",
        "lockObject": "Verrouiller l'objet",

        // Common keys
        "none": "Aucun",
        "common.none": "Aucun",
    "none": "Aucun",
        "allThemes": "Tous les thèmes",
        "yourUploadedImagesWillAppearHere": "Vos images téléversées apparaîtront ici.",

        // Language Settings
        "languageSettings": "Paramètres de langue",
        "language": "Langue :",
        "imageLibraryLanguage": "Langue de la bibliothèque d'images :",

        // Page Setup
        "pageSetup": "Configuration de page",
        "pageDimensions": "Dimensions de page",
        "pageSize": "Taille de page :",
        "letterPortrait": "Lettre Portrait (8,5×11\")",
        "letterLandscape": "Lettre Paysage (11×8,5\")",
        "a4Portrait": "A4 Portrait (210×297mm)",
        "a4Landscape": "A4 Paysage (297×210mm)",
        "square": "Carré (1200x1200)",
        "custom": "Personnalisé",
        "widthPx": "Largeur (px) :",
        "heightPx": "Hauteur (px) :",
        "applySize": "Appliquer la taille",
        "pageColor": "Couleur de page :",

        // Border
        "border": "Bordure",
        "borderTheme": "Thème de bordure :",
        "selectThemeToSeeBorders": "Sélectionnez un thème pour voir les bordures.",

        // Classroom Helpers
        "classroomHelpers": "Aides pour la classe",
        "addNameField": "Ajouter \"Nom : ___\"",
        "addHandwritingLines": "Ajouter des lignes d'écriture",

        // Drawing Tools
        "drawingTools": "Outils de dessin",
        "selectTool": "Outil de sélection",
        "drawingTool": "Outil de dessin",
        "brushColor": "Couleur du pinceau :",
        "brushSize": "Taille du pinceau :",

        // Text Tools
        "textTools": "Options de texte", // Changed from "Outils de texte"
        "addNewText": "Ajouter un nouveau texte",
        "content": "Contenu :",
        "helloPlaceholder": "Bonjour !",
        "addText": "Ajouter du texte",
        "selectedTextProperties": "Propriétés du texte sélectionné",
        "color": "Couleur :",
        "size": "Taille :",
        "font": "Police :",
        "outlineColor": "Couleur du contour :",
        "outlineWidth": "Contour (0-10) :",

        // Image Library
        "imageLibrary": "Bibliothèque d'images",
        "selectTheme": "Sélectionner un thème :",
        "searchImages": "Rechercher des images :",
        "searchPlaceholder": "ex. pomme, voiture",
        "selectThemeOrTypeToSearch": "Sélectionnez un thème ou tapez pour rechercher.",
        "availableImagesClickToAdd": "Images disponibles (Cliquez pour ajouter) :",
        "loadingImages": "Chargement des images...",

        // Upload Custom Images
        "uploadCustomImages": "Téléverser des images personnalisées",
        "selectImagesToUpload": "Sélectionner image(s) à téléverser :",
        "chooseFiles": "Choisir des fichiers",
        "noFileChosen": "Aucun fichier choisi",
        "filesSelected": "{} fichier(s) sélectionné(s)",
        "yourUploadedImagesClickToAdd": "Vos images téléversées (Cliquez pour ajouter) :",

        // Zoom & History Controls
        "zoomIn": "Zoomer",
        "zoomOut": "Dézoomer",
        "resetZoom": "Réinitialiser le zoom",
        "undo": "Annuler (Ctrl+Z)",
        "redo": "Rétablir (Ctrl+Y)",

        // Toolbar & Layer Controls
        "layers": "Calques",
        "bringForward": "Avancer",
        "bringToFront": "Mettre tout au premier plan",
        "sendBackward": "Reculer",
        "sendToBack": "Mettre tout à l'arrière-plan",

        // Lock/Unlock
        "unlockObject": "Déverrouiller l'objet",
        "objectLocked": "Objet verrouillé",
        "objectUnlocked": "Objet déverrouillé",

        // Flip & Align
        "flip": "Retourner",
        "flipHorizontal": "Retourner horizontalement",
        "flipVertical": "Retourner verticalement",
        "align": "Aligner",
        "alignSelected": "Aligner la sélection :",
        "alignLeft": "Aligner à gauche",
        "centerHorizontally": "Centrer horizontalement",
        "alignRight": "Aligner à droite",
        "alignTop": "Aligner en haut",
        "centerVertically": "Centrer verticalement",
        "alignBottom": "Aligner en bas",
        "alignToPage": "Aligner sur la page :",
        "centerOnPageHorizontally": "Centrer sur la page horizontalement",
        "centerOnPageVertically": "Centrer sur la page verticalement"
    },

    es: {
        // Core UI Elements
        "coloringPageDesigner": "Diseñador de páginas para colorear",
        "coloringDesigner": "Diseñador de colorear",
        "download": "Descargar",
        "downloadAsJPEG": "Descargar como JPEG",
        "downloadAsPDF": "Descargar como PDF",
        "grayscale": "Escala de grises",
        "clearAll": "Borrar todo",
        "clearCanvasConfirmation": "¿Estás seguro de que quieres borrar permanentemente el lienzo?",
        "cancel": "Cancelar",
        "yesClear": "Sí, borrar",
        "opacity": "Opacidad",
        "deleteSelected": "Eliminar seleccionado",
        "lockObject": "Bloquear objeto",

        // Common keys
        "none": "Ninguno",
        "common.none": "Ninguno",
    "none": "Ninguno",
        "allThemes": "Todos los temas",
        "yourUploadedImagesWillAppearHere": "Tus imágenes cargadas aparecerán aquí.",

        // Language Settings
        "languageSettings": "Configuración de idioma",
        "language": "Idioma:",
        "imageLibraryLanguage": "Idioma de la biblioteca de imágenes:",

        // Page Setup
        "pageSetup": "Configuración de página",
        "pageDimensions": "Dimensiones de página",
        "pageSize": "Tamaño de página:",
        "letterPortrait": "Carta Vertical (8.5×11\")",
        "letterLandscape": "Carta Horizontal (11×8.5\")",
        "a4Portrait": "A4 Vertical (210×297mm)",
        "a4Landscape": "A4 Horizontal (297×210mm)",
        "square": "Cuadrado (1200x1200)",
        "custom": "Personalizado",
        "widthPx": "Ancho (px):",
        "heightPx": "Alto (px):",
        "applySize": "Aplicar tamaño",
        "pageColor": "Color de página:",

        // Border
        "border": "Borde",
        "borderTheme": "Tema del borde:",
        "selectThemeToSeeBorders": "Selecciona un tema para ver los bordes.",

        // Classroom Helpers
        "classroomHelpers": "Ayudas para el aula",
        "addNameField": "Añadir \"Nombre: ___\"",
        "addHandwritingLines": "Añadir líneas de escritura",

        // Drawing Tools
        "drawingTools": "Herramientas de dibujo",
        "selectTool": "Herramienta de selección",
        "drawingTool": "Herramienta de dibujo",
        "brushColor": "Color del pincel:",
        "brushSize": "Tamaño del pincel:",

        // Text Tools
        "textTools": "Opciones de texto", // Changed from "Herramientas de texto"
        "addNewText": "Añadir nuevo texto",
        "content": "Contenido:",
        "helloPlaceholder": "¡Hola!",
        "addText": "Añadir texto",
        "selectedTextProperties": "Propiedades del texto seleccionado",
        "color": "Color:",
        "size": "Tamaño:",
        "font": "Fuente:",
        "outlineColor": "Color del contorno:",
        "outlineWidth": "Contorno (0-10):",

        // Image Library
        "imageLibrary": "Biblioteca de imágenes",
        "selectTheme": "Seleccionar tema:",
        "searchImages": "Buscar imágenes:",
        "searchPlaceholder": "ej. manzana, coche",
        "selectThemeOrTypeToSearch": "Selecciona un tema o escribe para buscar.",
        "availableImagesClickToAdd": "Imágenes disponibles (Haz clic para añadir):",
        "loadingImages": "Cargando imágenes...",

        // Upload Custom Images
        "uploadCustomImages": "Subir imágenes personalizadas",
        "selectImagesToUpload": "Seleccionar imagen(es) para subir:",
        "chooseFiles": "Elegir archivos",
        "noFileChosen": "Ningún archivo seleccionado",
        "filesSelected": "{} archivo(s) seleccionado(s)",
        "yourUploadedImagesClickToAdd": "Tus imágenes subidas (Haz clic para añadir):",

        // Zoom & History Controls
        "zoomIn": "Acercar",
        "zoomOut": "Alejar",
        "resetZoom": "Restablecer zoom",
        "undo": "Deshacer (Ctrl+Z)",
        "redo": "Rehacer (Ctrl+Y)",

        // Toolbar & Layer Controls
        "layers": "Capas",
        "bringForward": "Traer adelante",
        "bringToFront": "Traer al frente completo",
        "sendBackward": "Enviar atrás",
        "sendToBack": "Enviar al fondo",

        // Lock/Unlock
        "unlockObject": "Desbloquear objeto",
        "objectLocked": "Objeto bloqueado",
        "objectUnlocked": "Objeto desbloqueado",

        // Flip & Align
        "flip": "Voltear",
        "flipHorizontal": "Voltear horizontalmente",
        "flipVertical": "Voltear verticalmente",
        "align": "Alinear",
        "alignSelected": "Alinear selección:",
        "alignLeft": "Alinear a la izquierda",
        "centerHorizontally": "Centrar horizontalmente",
        "alignRight": "Alinear a la derecha",
        "alignTop": "Alinear arriba",
        "centerVertically": "Centrar verticalmente",
        "alignBottom": "Alinear abajo",
        "alignToPage": "Alinear a la página:",
        "centerOnPageHorizontally": "Centrar en la página horizontalmente",
        "centerOnPageVertically": "Centrar en la página verticalmente"
    },

    it: {
        // Core UI Elements
        "coloringPageDesigner": "Designer di pagine da colorare",
        "coloringDesigner": "Designer da colorare",
        "download": "Scarica",
        "downloadAsJPEG": "Scarica come JPEG",
        "downloadAsPDF": "Scarica come PDF",
        "grayscale": "Scala di grigi",
        "clearAll": "Cancella tutto",
        "clearCanvasConfirmation": "Sei sicuro di voler cancellare permanentemente la tela?",
        "cancel": "Annulla",
        "yesClear": "Sì, cancella",
        "opacity": "Opacità",
        "deleteSelected": "Elimina selezionato",
        "lockObject": "Blocca oggetto",

        // Common keys
        "none": "Nessuno",
        "common.none": "Nessuno",
    "none": "Nessuno",
        "allThemes": "Tutti i temi",
        "yourUploadedImagesWillAppearHere": "Le tue immagini caricate appariranno qui.",

        // Language Settings
        "languageSettings": "Impostazioni lingua",
        "language": "Lingua:",
        "imageLibraryLanguage": "Lingua libreria immagini:",

        // Page Setup
        "pageSetup": "Impostazione pagina",
        "pageDimensions": "Dimensioni pagina",
        "pageSize": "Formato pagina:",
        "letterPortrait": "Letter Verticale (8.5×11\")",
        "letterLandscape": "Letter Orizzontale (11×8.5\")",
        "a4Portrait": "A4 Verticale (210×297mm)",
        "a4Landscape": "A4 Orizzontale (297×210mm)",
        "square": "Quadrato (1200x1200)",
        "custom": "Personalizzato",
        "widthPx": "Larghezza (px):",
        "heightPx": "Altezza (px):",
        "applySize": "Applica dimensione",
        "pageColor": "Colore pagina:",

        // Border
        "border": "Bordo",
        "borderTheme": "Tema del bordo:",
        "selectThemeToSeeBorders": "Seleziona un tema per vedere i bordi.",

        // Classroom Helpers
        "classroomHelpers": "Aiuti per la classe",
        "addNameField": "Aggiungi \"Nome: ___\"",
        "addHandwritingLines": "Aggiungi linee per la scrittura",

        // Drawing Tools
        "drawingTools": "Strumenti di disegno",
        "selectTool": "Strumento di selezione",
        "drawingTool": "Strumento di disegno",
        "brushColor": "Colore del pennello:",
        "brushSize": "Dimensione del pennello:",

        // Text Tools
        "textTools": "Opzioni di testo", // Changed from "Strumenti di testo"
        "addNewText": "Aggiungi nuovo testo",
        "content": "Contenuto:",
        "helloPlaceholder": "Ciao!",
        "addText": "Aggiungi testo",
        "selectedTextProperties": "Proprietà del testo selezionato",
        "color": "Colore:",
        "size": "Dimensione:",
        "font": "Carattere:",
        "outlineColor": "Colore del contorno:",
        "outlineWidth": "Contorno (0-10):",

        // Image Library
        "imageLibrary": "Libreria immagini",
        "selectTheme": "Seleziona tema:",
        "searchImages": "Cerca immagini:",
        "searchPlaceholder": "es. mela, auto",
        "selectThemeOrTypeToSearch": "Seleziona un tema o digita per cercare.",
        "availableImagesClickToAdd": "Immagini disponibili (Clicca per aggiungere):",
        "loadingImages": "Caricamento immagini...",

        // Upload Custom Images
        "uploadCustomImages": "Carica immagini personalizzate",
        "selectImagesToUpload": "Seleziona immagine/i da caricare:",
        "chooseFiles": "Scegli file",
        "noFileChosen": "Nessun file scelto",
        "filesSelected": "{} file selezionato/i",
        "yourUploadedImagesClickToAdd": "Le tue immagini caricate (Clicca per aggiungere):",

        // Zoom & History Controls
        "zoomIn": "Ingrandisci",
        "zoomOut": "Riduci",
        "resetZoom": "Ripristina zoom",
        "undo": "Annulla (Ctrl+Z)",
        "redo": "Ripeti (Ctrl+Y)",

        // Toolbar & Layer Controls
        "layers": "Livelli",
        "bringForward": "Porta avanti",
        "bringToFront": "Porta in primo piano",
        "sendBackward": "Porta indietro",
        "sendToBack": "Manda in fondo",

        // Lock/Unlock
        "unlockObject": "Sblocca oggetto",
        "objectLocked": "Oggetto bloccato",
        "objectUnlocked": "Oggetto sbloccato",

        // Flip & Align
        "flip": "Capovolgi",
        "flipHorizontal": "Capovolgi orizzontalmente",
        "flipVertical": "Capovolgi verticalmente",
        "align": "Allinea",
        "alignSelected": "Allinea selezione:",
        "alignLeft": "Allinea a sinistra",
        "centerHorizontally": "Centra orizzontalmente",
        "alignRight": "Allinea a destra",
        "alignTop": "Allinea in alto",
        "centerVertically": "Centra verticalmente",
        "alignBottom": "Allinea in basso",
        "alignToPage": "Allinea alla pagina:",
        "centerOnPageHorizontally": "Centra sulla pagina orizzontalmente",
        "centerOnPageVertically": "Centra sulla pagina verticalmente"
    },

    pt: {
        // Core UI Elements
        "coloringPageDesigner": "Designer de páginas para colorir",
        "coloringDesigner": "Designer de colorir",
        "download": "Baixar",
        "downloadAsJPEG": "Baixar como JPEG",
        "downloadAsPDF": "Baixar como PDF",
        "grayscale": "Escala de cinza",
        "clearAll": "Limpar tudo",
        "clearCanvasConfirmation": "Tem certeza de que deseja limpar permanentemente a tela?",
        "cancel": "Cancelar",
        "yesClear": "Sim, limpar",
        "opacity": "Opacidade",
        "deleteSelected": "Excluir selecionado",
        "lockObject": "Bloquear objeto",

        // Common keys
        "none": "Nenhum",
        "common.none": "Nenhum",
    "none": "Nenhum",
        "allThemes": "Todos os temas",
        "yourUploadedImagesWillAppearHere": "As suas imagens carregadas aparecerão aqui.",

        // Language Settings
        "languageSettings": "Configurações de idioma",
        "language": "Idioma:",
        "imageLibraryLanguage": "Idioma da biblioteca de imagens:",

        // Page Setup
        "pageSetup": "Configuração da página",
        "pageDimensions": "Dimensões da página",
        "pageSize": "Tamanho da página:",
        "letterPortrait": "Carta Retrato (8,5×11\")",
        "letterLandscape": "Carta Paisagem (11×8,5\")",
        "a4Portrait": "A4 Retrato (210×297mm)",
        "a4Landscape": "A4 Paisagem (297×210mm)",
        "square": "Quadrado (1200x1200)",
        "custom": "Personalizado",
        "widthPx": "Largura (px):",
        "heightPx": "Altura (px):",
        "applySize": "Aplicar tamanho",
        "pageColor": "Cor da página:",

        // Border
        "border": "Borda",
        "borderTheme": "Tema da borda:",
        "selectThemeToSeeBorders": "Selecione um tema para ver as bordas.",

        // Classroom Helpers
        "classroomHelpers": "Auxiliares de sala de aula",
        "addNameField": "Adicionar \"Nome: ___\"",
        "addHandwritingLines": "Adicionar linhas de escrita",

        // Drawing Tools
        "drawingTools": "Ferramentas de desenho",
        "selectTool": "Ferramenta de seleção",
        "drawingTool": "Ferramenta de desenho",
        "brushColor": "Cor do pincel:",
        "brushSize": "Tamanho do pincel:",

        // Text Tools
        "textTools": "Opções de texto", // Changed from "Ferramentas de texto"
        "addNewText": "Adicionar novo texto",
        "content": "Conteúdo:",
        "helloPlaceholder": "Olá!",
        "addText": "Adicionar texto",
        "selectedTextProperties": "Propriedades do texto selecionado",
        "color": "Cor:",
        "size": "Tamanho:",
        "font": "Fonte:",
        "outlineColor": "Cor do contorno:",
        "outlineWidth": "Contorno (0-10):",

        // Image Library
        "imageLibrary": "Biblioteca de imagens",
        "selectTheme": "Selecionar tema:",
        "searchImages": "Pesquisar imagens:",
        "searchPlaceholder": "ex. maçã, carro",
        "selectThemeOrTypeToSearch": "Selecione um tema ou digite para pesquisar.",
        "availableImagesClickToAdd": "Imagens disponíveis (Clique para adicionar):",
        "loadingImages": "Carregando imagens...",

        // Upload Custom Images
        "uploadCustomImages": "Carregar imagens personalizadas",
        "selectImagesToUpload": "Selecionar imagem(ns) para carregar:",
        "chooseFiles": "Escolher arquivos",
        "noFileChosen": "Nenhum arquivo escolhido",
        "filesSelected": "{} arquivo(s) selecionado(s)",
        "yourUploadedImagesClickToAdd": "Suas imagens carregadas (Clique para adicionar):",

        // Zoom & History Controls
        "zoomIn": "Aproximar",
        "zoomOut": "Afastar",
        "resetZoom": "Redefinir zoom",
        "undo": "Desfazer (Ctrl+Z)",
        "redo": "Refazer (Ctrl+Y)",

        // Toolbar & Layer Controls
        "layers": "Camadas",
        "bringForward": "Trazer para frente",
        "bringToFront": "Trazer para frente completo",
        "sendBackward": "Enviar para trás",
        "sendToBack": "Enviar para o fundo",

        // Lock/Unlock
        "unlockObject": "Desbloquear objeto",
        "objectLocked": "Objeto bloqueado",
        "objectUnlocked": "Objeto desbloqueado",

        // Flip & Align
        "flip": "Virar",
        "flipHorizontal": "Virar horizontalmente",
        "flipVertical": "Virar verticalmente",
        "align": "Alinhar",
        "alignSelected": "Alinhar seleção:",
        "alignLeft": "Alinhar à esquerda",
        "centerHorizontally": "Centralizar horizontalmente",
        "alignRight": "Alinhar à direita",
        "alignTop": "Alinhar no topo",
        "centerVertically": "Centralizar verticalmente",
        "alignBottom": "Alinhar na base",
        "alignToPage": "Alinhar à página:",
        "centerOnPageHorizontally": "Centralizar na página horizontalmente",
        "centerOnPageVertically": "Centralizar na página verticalmente"
    },

    nl: {
        // Core UI Elements
        "coloringPageDesigner": "Kleurplaat ontwerper",
        "coloringDesigner": "Kleur ontwerper",
        "download": "Downloaden",
        "downloadAsJPEG": "Downloaden als JPEG",
        "downloadAsPDF": "Downloaden als PDF",
        "grayscale": "Grijstinten",
        "clearAll": "Alles wissen",
        "clearCanvasConfirmation": "Weet je zeker dat je het canvas permanent wilt wissen?",
        "cancel": "Annuleren",
        "yesClear": "Ja, wissen",
        "opacity": "Dekking",
        "deleteSelected": "Selectie verwijderen",
        "lockObject": "Object vergrendelen",

        // Common keys
        "none": "Geen",
        "common.none": "Geen",
    "none": "Geen",
        "allThemes": "Alle thema's",
        "yourUploadedImagesWillAppearHere": "Je geüploade afbeeldingen verschijnen hier.",

        // Language Settings
        "languageSettings": "Taalinstellingen",
        "language": "Taal:",
        "imageLibraryLanguage": "Afbeeldingenbibliotheek taal:",

        // Page Setup
        "pageSetup": "Pagina-instelling",
        "pageDimensions": "Pagina-afmetingen",
        "pageSize": "Paginagrootte:",
        "letterPortrait": "Letter Staand (8,5×11\")",
        "letterLandscape": "Letter Liggend (11×8,5\")",
        "a4Portrait": "A4 Staand (210×297mm)",
        "a4Landscape": "A4 Liggend (297×210mm)",
        "square": "Vierkant (1200x1200)",
        "custom": "Aangepast",
        "widthPx": "Breedte (px):",
        "heightPx": "Hoogte (px):",
        "applySize": "Grootte toepassen",
        "pageColor": "Paginakleur:",

        // Border
        "border": "Rand",
        "borderTheme": "Randthema:",
        "selectThemeToSeeBorders": "Selecteer een thema om randen te zien.",

        // Classroom Helpers
        "classroomHelpers": "Klaslokaal helpers",
        "addNameField": "\"Naam: ___\" toevoegen",
        "addHandwritingLines": "Schrijflijnen toevoegen",

        // Drawing Tools
        "drawingTools": "Tekengereedschappen",
        "selectTool": "Selectiegereedschap",
        "drawingTool": "Tekengereedschap",
        "brushColor": "Penseelkleur:",
        "brushSize": "Penseelgrootte:",

        // Text Tools
        "textTools": "Tekstopties", // Changed from "Tekstgereedschappen"
        "addNewText": "Nieuwe tekst toevoegen",
        "content": "Inhoud:",
        "helloPlaceholder": "Hallo!",
        "addText": "Tekst toevoegen",
        "selectedTextProperties": "Eigenschappen van geselecteerde tekst",
        "color": "Kleur:",
        "size": "Grootte:",
        "font": "Lettertype:",
        "outlineColor": "Omlijningskleur:",
        "outlineWidth": "Omlijning (0-10):",

        // Image Library
        "imageLibrary": "Afbeeldingsbibliotheek",
        "selectTheme": "Thema selecteren:",
        "searchImages": "Afbeeldingen zoeken:",
        "searchPlaceholder": "bijv. appel, auto",
        "selectThemeOrTypeToSearch": "Selecteer een thema of typ om te zoeken.",
        "availableImagesClickToAdd": "Beschikbare afbeeldingen (Klik om toe te voegen):",
        "loadingImages": "Afbeeldingen laden...",

        // Upload Custom Images
        "uploadCustomImages": "Aangepaste afbeeldingen uploaden",
        "selectImagesToUpload": "Afbeelding(en) selecteren om te uploaden:",
        "chooseFiles": "Bestanden kiezen",
        "noFileChosen": "Geen bestand gekozen",
        "filesSelected": "{} bestand(en) geselecteerd",
        "yourUploadedImagesClickToAdd": "Je geüploade afbeeldingen (Klik om toe te voegen):",

        // Zoom & History Controls
        "zoomIn": "Inzoomen",
        "zoomOut": "Uitzoomen",
        "resetZoom": "Zoom resetten",
        "undo": "Ongedaan maken (Ctrl+Z)",
        "redo": "Opnieuw (Ctrl+Y)",

        // Toolbar & Layer Controls
        "layers": "Lagen",
        "bringForward": "Naar voren",
        "bringToFront": "Helemaal naar voren",
        "sendBackward": "Naar achteren",
        "sendToBack": "Helemaal naar achteren",

        // Lock/Unlock
        "unlockObject": "Object ontgrendelen",
        "objectLocked": "Object vergrendeld",
        "objectUnlocked": "Object ontgrendeld",

        // Flip & Align
        "flip": "Omdraaien",
        "flipHorizontal": "Horizontaal omdraaien",
        "flipVertical": "Verticaal omdraaien",
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
        "centerOnPageVertically": "Verticaal centreren op pagina"
    },

    sv: {
        // Core UI Elements
        "coloringPageDesigner": "Målarbok-designer",
        "coloringDesigner": "Målar-designer",
        "download": "Ladda ner",
        "downloadAsJPEG": "Ladda ner som JPEG",
        "downloadAsPDF": "Ladda ner som PDF",
        "grayscale": "Gråskala",
        "clearAll": "Rensa allt",
        "clearCanvasConfirmation": "Är du säker på att du vill rensa duken permanent?",
        "cancel": "Avbryt",
        "yesClear": "Ja, rensa",
        "opacity": "Opacitet",
        "deleteSelected": "Ta bort valt",
        "lockObject": "Lås objekt",

        // Common keys
        "none": "Ingen",
        "common.none": "Ingen",
    "none": "Ingen",
        "allThemes": "Alla teman",
        "yourUploadedImagesWillAppearHere": "Dina uppladdade bilder visas här.",

        // Language Settings
        "languageSettings": "Språkinställningar",
        "language": "Språk:",
        "imageLibraryLanguage": "Bildbiblioteksspråk:",

        // Page Setup
        "pageSetup": "Sidinställning",
        "pageDimensions": "Siddimensioner",
        "pageSize": "Sidstorlek:",
        "letterPortrait": "Letter Stående (8,5×11\")",
        "letterLandscape": "Letter Liggande (11×8,5\")",
        "a4Portrait": "A4 Stående (210×297mm)",
        "a4Landscape": "A4 Liggande (297×210mm)",
        "square": "Kvadrat (1200x1200)",
        "custom": "Anpassad",
        "widthPx": "Bredd (px):",
        "heightPx": "Höjd (px):",
        "applySize": "Tillämpa storlek",
        "pageColor": "Sidfärg:",

        // Border
        "border": "Ram",
        "borderTheme": "Ramtema:",
        "selectThemeToSeeBorders": "Välj ett tema för att se ramar.",

        // Classroom Helpers
        "classroomHelpers": "Klassrumshjälpare",
        "addNameField": "Lägg till \"Namn: ___\"",
        "addHandwritingLines": "Lägg till skrivlinjer",

        // Drawing Tools
        "drawingTools": "Ritverktyg",
        "selectTool": "Markeringsverktyg",
        "drawingTool": "Ritverktyg",
        "brushColor": "Penselfärg:",
        "brushSize": "Penselstorlek:",

        // Text Tools
        "textTools": "Textalternativ", // Changed from "Textverktyg"
        "addNewText": "Lägg till ny text",
        "content": "Innehåll:",
        "helloPlaceholder": "Hej!",
        "addText": "Lägg till text",
        "selectedTextProperties": "Egenskaper för vald text",
        "color": "Färg:",
        "size": "Storlek:",
        "font": "Typsnitt:",
        "outlineColor": "Konturfärg:",
        "outlineWidth": "Kontur (0-10):",

        // Image Library
        "imageLibrary": "Bildbibliotek",
        "selectTheme": "Välj tema:",
        "searchImages": "Sök bilder:",
        "searchPlaceholder": "t.ex. äpple, bil",
        "selectThemeOrTypeToSearch": "Välj ett tema eller skriv för att söka.",
        "availableImagesClickToAdd": "Tillgängliga bilder (Klicka för att lägga till):",
        "loadingImages": "Laddar bilder...",

        // Upload Custom Images
        "uploadCustomImages": "Ladda upp egna bilder",
        "selectImagesToUpload": "Välj bild(er) att ladda upp:",
        "chooseFiles": "Välj filer",
        "noFileChosen": "Ingen fil vald",
        "filesSelected": "{} fil(er) valda",
        "yourUploadedImagesClickToAdd": "Dina uppladdade bilder (Klicka för att lägga till):",

        // Zoom & History Controls
        "zoomIn": "Zooma in",
        "zoomOut": "Zooma ut",
        "resetZoom": "Återställ zoom",
        "undo": "Ångra (Ctrl+Z)",
        "redo": "Gör om (Ctrl+Y)",

        // Toolbar & Layer Controls
        "layers": "Lager",
        "bringForward": "Flytta framåt",
        "bringToFront": "Flytta längst fram",
        "sendBackward": "Flytta bakåt",
        "sendToBack": "Skicka längst bak",

        // Lock/Unlock
        "unlockObject": "Lås upp objekt",
        "objectLocked": "Objekt låst",
        "objectUnlocked": "Objekt upplåst",

        // Flip & Align
        "flip": "Vänd",
        "flipHorizontal": "Vänd horisontellt",
        "flipVertical": "Vänd vertikalt",
        "align": "Justera",
        "alignSelected": "Justera markerat:",
        "alignLeft": "Vänsterjustera",
        "centerHorizontally": "Centrera horisontellt",
        "alignRight": "Högerjustera",
        "alignTop": "Toppjustera",
        "centerVertically": "Centrera vertikalt",
        "alignBottom": "Bottenjustera",
        "alignToPage": "Justera mot sida:",
        "centerOnPageHorizontally": "Centrera på sidan horisontellt",
        "centerOnPageVertically": "Centrera på sidan vertikalt"
    },

    da: {
        // Core UI Elements
        "coloringPageDesigner": "Farvelægningsside-designer",
        "coloringDesigner": "Farvelægnings-designer",
        "download": "Download",
        "downloadAsJPEG": "Download som JPEG",
        "downloadAsPDF": "Download som PDF",
        "grayscale": "Gråtoner",
        "clearAll": "Ryd alt",
        "clearCanvasConfirmation": "Er du sikker på, at du vil slette lærredet permanent?",
        "cancel": "Annuller",
        "yesClear": "Ja, ryd",
        "opacity": "Uigennemsigtighed",
        "deleteSelected": "Slet valgte",
        "lockObject": "Lås objekt",

        // Common keys
        "none": "Ingen",
        "common.none": "Ingen",
    "none": "Ingen",
        "allThemes": "Alle temaer",
        "yourUploadedImagesWillAppearHere": "Dine uploadede billeder vises her.",

        // Language Settings
        "languageSettings": "Sprogindstillinger",
        "language": "Sprog:",
        "imageLibraryLanguage": "Billedbibliotekssprog:",

        // Page Setup
        "pageSetup": "Sideopsætning",
        "pageDimensions": "Sidedimensioner",
        "pageSize": "Sidestørrelse:",
        "letterPortrait": "Letter Stående (8,5×11\")",
        "letterLandscape": "Letter Liggende (11×8,5\")",
        "a4Portrait": "A4 Stående (210×297mm)",
        "a4Landscape": "A4 Liggende (297×210mm)",
        "square": "Kvadrat (1200x1200)",
        "custom": "Tilpasset",
        "widthPx": "Bredde (px):",
        "heightPx": "Højde (px):",
        "applySize": "Anvend størrelse",
        "pageColor": "Sidefarve:",

        // Border
        "border": "Ramme",
        "borderTheme": "Rammetema:",
        "selectThemeToSeeBorders": "Vælg et tema for at se rammer.",

        // Classroom Helpers
        "classroomHelpers": "Klasseværelseshjælpere",
        "addNameField": "Tilføj \"Navn: ___\"",
        "addHandwritingLines": "Tilføj skrivelinjer",

        // Drawing Tools
        "drawingTools": "Tegneværktøjer",
        "selectTool": "Valgværktøj",
        "drawingTool": "Tegneværktøj",
        "brushColor": "Penselfarve:",
        "brushSize": "Penselstørrelse:",

        // Text Tools
        "textTools": "Tekstindstillinger", // Changed from "Tekstværktøjer"
        "addNewText": "Tilføj ny tekst",
        "content": "Indhold:",
        "helloPlaceholder": "Hej!",
        "addText": "Tilføj tekst",
        "selectedTextProperties": "Egenskaber for valgt tekst",
        "color": "Farve:",
        "size": "Størrelse:",
        "font": "Skrifttype:",
        "outlineColor": "Konturfarve:",
        "outlineWidth": "Kontur (0-10):",

        // Image Library
        "imageLibrary": "Billedbibliotek",
        "selectTheme": "Vælg tema:",
        "searchImages": "Søg billeder:",
        "searchPlaceholder": "f.eks. æble, bil",
        "selectThemeOrTypeToSearch": "Vælg et tema eller skriv for at søge.",
        "availableImagesClickToAdd": "Tilgængelige billeder (Klik for at tilføje):",
        "loadingImages": "Indlæser billeder...",

        // Upload Custom Images
        "uploadCustomImages": "Upload tilpassede billeder",
        "selectImagesToUpload": "Vælg billede(r) at uploade:",
        "chooseFiles": "Vælg filer",
        "noFileChosen": "Ingen fil valgt",
        "filesSelected": "{} fil(er) valgt",
        "yourUploadedImagesClickToAdd": "Dine uploadede billeder (Klik for at tilføje):",

        // Zoom & History Controls
        "zoomIn": "Zoom ind",
        "zoomOut": "Zoom ud",
        "resetZoom": "Nulstil zoom",
        "undo": "Fortryd (Ctrl+Z)",
        "redo": "Gentag (Ctrl+Y)",

        // Toolbar & Layer Controls
        "layers": "Lag",
        "bringForward": "Flyt fremad",
        "bringToFront": "Bring helt frem",
        "sendBackward": "Flyt bagud",
        "sendToBack": "Send helt tilbage",

        // Lock/Unlock
        "unlockObject": "Lås objekt op",
        "objectLocked": "Objekt låst",
        "objectUnlocked": "Objekt ulåst",

        // Flip & Align
        "flip": "Vend",
        "flipHorizontal": "Vend vandret",
        "flipVertical": "Vend lodret",
        "align": "Juster",
        "alignSelected": "Juster valgte:",
        "alignLeft": "Venstrejuster",
        "centerHorizontally": "Centrer vandret",
        "alignRight": "Højrejuster",
        "alignTop": "Topjuster",
        "centerVertically": "Centrer lodret",
        "alignBottom": "Bundjuster",
        "alignToPage": "Juster til side:",
        "centerOnPageHorizontally": "Centrer på siden vandret",
        "centerOnPageVertically": "Centrer på siden lodret"
    },

    no: {
        // Core UI Elements
        "coloringPageDesigner": "Fargeark-designer",
        "coloringDesigner": "Farge-designer",
        "download": "Last ned",
        "downloadAsJPEG": "Last ned som JPEG",
        "downloadAsPDF": "Last ned som PDF",
        "grayscale": "Gråtoner",
        "clearAll": "Slett alt",
        "clearCanvasConfirmation": "Er du sikker på at du vil tømme lerretet permanent?",
        "cancel": "Avbryt",
        "yesClear": "Ja, tøm",
        "opacity": "Ugjennomsiktighet",
        "deleteSelected": "Slett valgte",
        "lockObject": "Lås objekt",

        // Common keys
        "none": "Ingen",
        "common.none": "Ingen",
    "none": "Ingen",
        "allThemes": "Alle temaer",
        "yourUploadedImagesWillAppearHere": "Dine opplastede bilder vises her.",

        // Language Settings
        "languageSettings": "Språkinnstillinger",
        "language": "Språk:",
        "imageLibraryLanguage": "Bildbiblioteksspråk:",

        // Page Setup
        "pageSetup": "Sideoppsett",
        "pageDimensions": "Sidedimensjoner",
        "pageSize": "Sidestørrelse:",
        "letterPortrait": "Letter Stående (8,5×11\")",
        "letterLandscape": "Letter Liggende (11×8,5\")",
        "a4Portrait": "A4 Stående (210×297mm)",
        "a4Landscape": "A4 Liggende (297×210mm)",
        "square": "Kvadrat (1200x1200)",
        "custom": "Tilpasset",
        "widthPx": "Bredde (px):",
        "heightPx": "Høyde (px):",
        "applySize": "Bruk størrelse",
        "pageColor": "Sidefarge:",

        // Border
        "border": "Ramme",
        "borderTheme": "Rammetema:",
        "selectThemeToSeeBorders": "Velg et tema for å se rammer.",

        // Classroom Helpers
        "classroomHelpers": "Klasseromhjelpere",
        "addNameField": "Legg til \"Navn: ___\"",
        "addHandwritingLines": "Legg til skrivelinjer",

        // Drawing Tools
        "drawingTools": "Tegneverktøy",
        "selectTool": "Valgverktøy",
        "drawingTool": "Tegneverktøy",
        "brushColor": "Penselfarge:",
        "brushSize": "Penselstørrelse:",

        // Text Tools
        "textTools": "Tekstinnstillinger", // Changed from "Tekstverktøy"
        "addNewText": "Legg til ny tekst",
        "content": "Innhold:",
        "helloPlaceholder": "Hei!",
        "addText": "Legg til tekst",
        "selectedTextProperties": "Egenskaper for valgt tekst",
        "color": "Farge:",
        "size": "Størrelse:",
        "font": "Skrifttype:",
        "outlineColor": "Konturfarge:",
        "outlineWidth": "Kontur (0-10):",

        // Image Library
        "imageLibrary": "Bildebibliotek",
        "selectTheme": "Velg tema:",
        "searchImages": "Søk bilder:",
        "searchPlaceholder": "f.eks. eple, bil",
        "selectThemeOrTypeToSearch": "Velg et tema eller skriv for å søke.",
        "availableImagesClickToAdd": "Tilgjengelige bilder (Klikk for å legge til):",
        "loadingImages": "Laster bilder...",

        // Upload Custom Images
        "uploadCustomImages": "Last opp tilpassede bilder",
        "selectImagesToUpload": "Velg bilde(r) å laste opp:",
        "chooseFiles": "Velg filer",
        "noFileChosen": "Ingen fil valgt",
        "filesSelected": "{} fil(er) valgt",
        "yourUploadedImagesClickToAdd": "Dine opplastede bilder (Klikk for å legge til):",

        // Zoom & History Controls
        "zoomIn": "Zoom inn",
        "zoomOut": "Zoom ut",
        "resetZoom": "Tilbakestill zoom",
        "undo": "Angre (Ctrl+Z)",
        "redo": "Gjør om (Ctrl+Y)",

        // Toolbar & Layer Controls
        "layers": "Lag",
        "bringForward": "Flytt fremover",
        "bringToFront": "Bring helt frem",
        "sendBackward": "Flytt bakover",
        "sendToBack": "Send helt bak",

        // Lock/Unlock
        "unlockObject": "Lås opp objekt",
        "objectLocked": "Objekt låst",
        "objectUnlocked": "Objekt ulåst",

        // Flip & Align
        "flip": "Vend",
        "flipHorizontal": "Vend horisontalt",
        "flipVertical": "Vend vertikalt",
        "align": "Juster",
        "alignSelected": "Juster valgte:",
        "alignLeft": "Venstrejuster",
        "centerHorizontally": "Sentrer horisontalt",
        "alignRight": "Høyrejuster",
        "alignTop": "Toppjuster",
        "centerVertically": "Sentrer vertikalt",
        "alignBottom": "Bunnjuster",
        "alignToPage": "Juster til side:",
        "centerOnPageHorizontally": "Sentrer på siden horisontalt",
        "centerOnPageVertically": "Sentrer på siden vertikalt"
    },

    fi: {
        // Core UI Elements
        "coloringPageDesigner": "Värityssivu-suunnittelija",
        "coloringDesigner": "Väritys-suunnittelija",
        "download": "Lataa",
        "downloadAsJPEG": "Lataa JPEG-muodossa",
        "downloadAsPDF": "Lataa PDF-muodossa",
        "grayscale": "Harmaasävy",
        "clearAll": "Tyhjennä kaikki",
        "clearCanvasConfirmation": "Oletko varma, että haluat tyhjentää piirtoalustan pysyvästi?",
        "cancel": "Peruuta",
        "yesClear": "Kyllä, tyhjennä",
        "opacity": "Peittävyys",
        "deleteSelected": "Poista valittu",
        "lockObject": "Lukitse objekti",

        // Common keys
        "none": "Ei mitään",
        "common.none": "Ei mitään",
    "none": "Ei mitään",
        "allThemes": "Kaikki teemat",
        "yourUploadedImagesWillAppearHere": "Lataamasi kuvat näkyvät täällä.",

        // Language Settings
        "languageSettings": "Kieliasetukset",
        "language": "Kieli:",
        "imageLibraryLanguage": "Kuvakirjaston kieli:",

        // Page Setup
        "pageSetup": "Sivun asetukset",
        "pageDimensions": "Sivun mitat",
        "pageSize": "Sivun koko:",
        "letterPortrait": "Letter Pysty (8,5×11\")",
        "letterLandscape": "Letter Vaaka (11×8,5\")",
        "a4Portrait": "A4 Pysty (210×297mm)",
        "a4Landscape": "A4 Vaaka (297×210mm)",
        "square": "Neliö (1200x1200)",
        "custom": "Mukautettu",
        "widthPx": "Leveys (px):",
        "heightPx": "Korkeus (px):",
        "applySize": "Käytä kokoa",
        "pageColor": "Sivun väri:",

        // Border
        "border": "Reunus",
        "borderTheme": "Reunuksen teema:",
        "selectThemeToSeeBorders": "Valitse teema nähdäksesi reunukset.",

        // Classroom Helpers
        "classroomHelpers": "Luokkahuoneen apuvälineet",
        "addNameField": "Lisää \"Nimi: ___\"",
        "addHandwritingLines": "Lisää kirjoitusviivoja",

        // Drawing Tools
        "drawingTools": "Piirtotyökalut",
        "selectTool": "Valintatyökalu",
        "drawingTool": "Piirtotyökalu",
        "brushColor": "Siveltimen väri:",
        "brushSize": "Siveltimen koko:",

        // Text Tools
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
        "outlineWidth": "Ääriviiva (0-10):",

        // Image Library
        "imageLibrary": "Kuvakirjasto",
        "selectTheme": "Valitse teema:",
        "searchImages": "Etsi kuvia:",
        "searchPlaceholder": "esim. omena, auto",
        "selectThemeOrTypeToSearch": "Valitse teema tai kirjoita hakeaksesi.",
        "availableImagesClickToAdd": "Käytettävissä olevat kuvat (Klikkaa lisätäksesi):",
        "loadingImages": "Ladataan kuvia...",

        // Upload Custom Images
        "uploadCustomImages": "Lataa omia kuvia",
        "selectImagesToUpload": "Valitse ladattava(t) kuva(t):",
        "chooseFiles": "Valitse tiedostot",
        "noFileChosen": "Ei tiedostoa valittuna",
        "filesSelected": "{} tiedosto(a) valittu",
        "yourUploadedImagesClickToAdd": "Lataamasi kuvat (Klikkaa lisätäksesi):",

        // Zoom & History Controls
        "zoomIn": "Lähennä",
        "zoomOut": "Loitonna",
        "resetZoom": "Nollaa zoomaus",
        "undo": "Kumoa (Ctrl+Z)",
        "redo": "Tee uudelleen (Ctrl+Y)",

        // Toolbar & Layer Controls
        "layers": "Tasot",
        "bringForward": "Siirrä eteenpäin",
        "bringToFront": "Tuo etualalle",
        "sendBackward": "Siirrä taaksepäin",
        "sendToBack": "Lähetä taustalle",

        // Lock/Unlock
        "unlockObject": "Avaa objektin lukitus",
        "objectLocked": "Objekti lukittu",
        "objectUnlocked": "Objektin lukitus avattu",

        // Flip & Align
        "flip": "Käännä",
        "flipHorizontal": "Käännä vaakasuunnassa",
        "flipVertical": "Käännä pystysuunnassa",
        "align": "Tasaa",
        "alignSelected": "Tasaa valittu:",
        "alignLeft": "Tasaa vasemmalle",
        "centerHorizontally": "Keskitä vaakasuunnassa",
        "alignRight": "Tasaa oikealle",
        "alignTop": "Tasaa ylös",
        "centerVertically": "Keskitä pystysuunnassa",
        "alignBottom": "Tasaa alas",
        "alignToPage": "Tasaa sivulle:",
        "centerOnPageHorizontally": "Keskitä sivulle vaakasuunnassa",
        "centerOnPageVertically": "Keskitä sivulle pystysuunnassa"
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}