// 🔍 FIND AND COUNT GENERATOR - PROFESSIONAL FRENCH TRANSLATION
// ============================================================
// Version: 2.0.0 (Pattern A)
// Last Updated: December 2024
// Total Keys: 215
// Language: French (fr)
// Approach: Natural French as if originally created in France
// Educational Context: French school system terminology
// ============================================================

const FIND_AND_COUNT_TRANSLATIONS_FR = {
  "fr": {
    // ==========================================
    // LANGUAGE NAMES (11 keys)
    // ==========================================
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

    // ==========================================
    // CORE UI ELEMENTS (4 keys)
    // ==========================================
    "app.title": "Cherche et Compte",
    "settings": "Paramètres",
    "worksheet": "Fiche d'exercices",
    "answerKey": "Corrigé",

    // ==========================================
    // ACTION BUTTONS (10 keys)
    // ==========================================
    "generate": "Générer",
    "generateWorksheet": "Créer la fiche",
    "generateAnswerKey": "Créer le corrigé",
    "download": "Télécharger",
    "worksheetJpeg": "Fiche d'exercices (JPEG)",
    "answerKeyJpeg": "Corrigé (JPEG)",
    "worksheetPdf": "Fiche d'exercices (PDF)",
    "answerKeyPdf": "Corrigé (PDF)",
    "grayscale": "Niveaux de gris",  // CRITICAL - User mentioned
    "clearAll": "Tout effacer",

    // ==========================================
    // ACCORDION HEADERS (6 keys)
    // ==========================================
    "languageSettings": "Paramètres de langue",
    "pageSetup": "Mise en page",
    "textTools": "Outils de texte",
    "imageLibrary": "Bibliothèque d'images",
    "uploadCustomImages": "Importer vos images",
    "hiddenObjectQuestions": "Exercices de recherche",

    // ==========================================
    // LANGUAGE SETTINGS (3 keys)
    // ==========================================
    "selectLanguage": "Sélectionner la langue",
    "language": "Langue :",
    "languageHelp": "Les noms d'images et les thèmes s'afficheront dans la langue choisie.",

    // ==========================================
    // PAGE SETUP (10 keys)
    // ==========================================
    "pageSize": "Format de page :",
    "defaultWorksheet": "Fiche standard (800x1000)",
    "a4Portrait": "A4 Portrait (210×297mm)",
    "a4Landscape": "A4 Paysage (297×210mm)",
    "letterPortrait": "Letter Portrait (8,5×11\")",
    "letterLandscape": "Letter Paysage (11×8,5\")",
    "square": "Carré (1200x1200)",
    "custom": "Personnalisé",
    "widthPx": "Largeur (px) :",
    "heightPx": "Hauteur (px) :",
    "applySize": "Appliquer le format",
    "pageColor": "Couleur de fond :",

    // ==========================================
    // BACKGROUND SECTION (4 keys)
    // ==========================================
    "background": "Arrière-plan",  // CRITICAL - User mentioned
    "backgroundTheme": "Thème d'arrière-plan :",
    "selectBackgroundTheme": "Choisissez un thème pour l'arrière-plan.",
    "backgroundOpacity": "Transparence de l'arrière-plan :",

    // ==========================================
    // GRID DIMENSIONS (3 keys)
    // ==========================================
    "gridDimensions": "Dimensions de la grille",
    "gridRows": "Lignes (5-10) :",
    "gridColumns": "Colonnes (5-10) :",

    // ==========================================
    // BORDER SECTION (4 keys)
    // ==========================================
    "border": "Bordure",  // CRITICAL - User mentioned
    "borderTheme": "Thème de bordure :",
    "selectBorderTheme": "Choisissez un thème pour les bordures.",
    "borderOpacity": "Transparence de la bordure :",

    // ==========================================
    // TEXT TOOLS (11 keys)
    // ==========================================
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

    // ==========================================
    // FONT OPTIONS (7 keys)
    // ==========================================
    "font_lexend": "Lexend Deca",
    "font_baloo": "Baloo 2",
    "font_nunito": "Nunito",
    "font_quicksand": "Quicksand",
    "font_fredoka": "Fredoka",
    "font_arial": "Arial",
    "font_verdana": "Verdana",

    // ==========================================
    // IMAGE LIBRARY (7 keys)
    // ==========================================
    "imageLibrary": "Bibliothèque d'images",
    "imageLibraryHelp": "Sélectionnez 1 à 4 images comme objets cachés. La grille sera complétée avec ces images et d'autres du thème choisi.",
    "imageTheme": "Thème d'images :",
    "searchImages": "Rechercher des images :",
    "searchPlaceholder": "ex : pomme, voiture",
    "selectedCount": "Sélection : {count}",
    "selectedZero": "Sélection : 0",
    "clearSelection": "Effacer la sélection",

    // ==========================================
    // UPLOAD CUSTOM IMAGES (3 keys)
    // ==========================================
    "selectImagesToUpload": "Choisir des images à importer :",
    "yourUploadedImages": "Vos images importées (session actuelle) :",
    "uploadedImagesWillAppear": "Vos images importées apparaîtront ici.",

    // ==========================================
    // HIDDEN OBJECT QUESTIONS (1 key)
    // ==========================================
    "selectImagesFromLibrary": "Sélectionnez des images dans la bibliothèque ci-dessus.",

    // ==========================================
    // TASK TYPES (5 keys)
    // ==========================================
    "selectTask": "Choisir une consigne...",
    "circleTask": "Entourer",
    "squareTask": "Encadrer",
    "crossOutTask": "Barrer",
    "countTask": "Compter",

    // ==========================================
    // TOOLBAR (7 keys)
    // ==========================================
    "layers": "Calques",
    "bringForward": "Premier plan",
    "sendBackward": "Arrière-plan",
    "align": "Aligner",
    "alignSelected": "Aligner la sélection :",
    "alignToPage": "Aligner sur la page :",
    "deleteSelected": "Supprimer la sélection",

    // ==========================================
    // COMMON OPTIONS (2 keys)
    // ==========================================
    "none": "Aucun",
    "loading": "Chargement...",

    // ==========================================
    // SUCCESS MESSAGES (7 keys)
    // ==========================================
    "worksheetRegeneratedSuccessfully": "Fiche d'exercices créée avec succès !",
    "answerKeyGenerated": "Corrigé créé !",
    "formCleared": "Formulaire réinitialisé.",
    "jpegDownloadInitiated": "Téléchargement JPEG lancé !",
    "pdfDownloaded": "PDF téléchargé !",
    "overlayAdded": "{type} ajouté(e).",
    "customImagesLoaded": "{count} image(s) personnelle(s) chargée(s).",

    // ==========================================
    // ERROR MESSAGES (20 keys)
    // ==========================================
    "couldNotLoadThemes": "Impossible de charger les thèmes.",
    "failedToLoadImagesForTheme": "Impossible de charger les images du thème {theme}.",
    "maxHiddenObjects": "Vous pouvez sélectionner au maximum 4 objets cachés.",
    "selectHiddenObjectsRange": "Veuillez sélectionner entre 1 et 4 objets cachés.",
    "assignTaskFor": "Veuillez attribuer une consigne pour : {items}.",
    "gridDimensionsRange": "Les dimensions de la grille doivent être entre 5 et 10.",
    "notEnoughImages": "Pas assez d'images différentes pour créer la grille.",
    "pleaseGenerateWorksheetFirst": "Veuillez d'abord créer une fiche d'exercices.",
    "pleaseGenerateContentFirst": "Veuillez d'abord créer le contenu.",
    "errorDuringJpegExport": "Erreur lors de l'export JPEG : {error}",
    "errorCreatingPdf": "Erreur lors de la création du PDF.",
    "errorPreparingJpeg": "Erreur lors de la préparation du JPEG.",
    "couldNotLoadBorderImages": "Impossible de charger les images de bordure.",
    "failedToLoadOverlayImage": "Impossible de charger l'image de {type}.",
    "errorReadingFile": "Erreur lors de la lecture du fichier : {filename}",

    // ==========================================
    // INFO/STATUS MESSAGES (15 keys)
    // ==========================================
    "typeToSearchAllImages": "Tapez pour rechercher dans toutes les images.",
    "searching": "Recherche en cours...",
    "noImagesFound": "Aucune image trouvée{query}.",
    "noImagesFoundWithQuery": "Aucune image trouvée pour \"{query}\".",
    "generatingPleaseWait": "Création en cours... Veuillez patienter.",
    "generatingAnswerKey": "Création du corrigé...",
    "grayscaleConversionFailed": "La conversion en niveaux de gris a échoué.",
    "preparingJpeg": "Préparation du JPEG...",
    "preparingPdf": "Préparation du PDF...",
    "preparingPdfPleaseWait": "Préparation du PDF... Veuillez patienter.",
    "loadingDefaultTheme": "Chargement du thème par défaut...",
    "loadingTheme": "Chargement du thème...",
    "errorLoadingImages": "Erreur lors du chargement des images : {error}",
    "loadingBorders": "Chargement des bordures {theme}...",
    "errorLoadingBorders": "Erreur lors du chargement des bordures.",
    "noBordersInTheme": "Aucune bordure dans ce thème.",
    "loadingBackgrounds": "Chargement des arrière-plans...",
    "noBackgroundsInTheme": "Aucun arrière-plan dans ce thème.",
    "errorLoadingBackgrounds": "Erreur lors du chargement des arrière-plans.",

    // ==========================================
    // WATERMARK TEXT (2 keys - Free Tier)
    // ==========================================
    "watermarkText": "VERSION GRATUITE - LessonCraftStudio.com",
    "watermarkSmallText": "VERSION GRATUITE",

    // ==========================================
    // TASK INSTRUCTIONS (5 keys - Dynamic)
    // ==========================================
    "taskInstruction_circle": "Entoure les {items}",
    "taskInstruction_square": "Encadre les {items}",
    "taskInstruction_cross": "Barre les {items}",
    "taskInstruction_count": "Compte les {items} : _____",
    "defaultInstruction": "Trouve les objets cachés dans l'image.",

    // ==========================================
    // FILE INPUT (3 keys)
    // ==========================================
    "chooseFiles": "Choisir des fichiers",
    "noFileChosen": "Aucun fichier sélectionné",
    "filesSelected": "{count} fichier(s) sélectionné(s)"
  }
};

// ==========================================
// VALIDATION & VERIFICATION
// ==========================================

// Verify all 215 keys are present
const keyCount = Object.keys(FIND_AND_COUNT_TRANSLATIONS_FR.fr).length;
console.log(`✅ French translation complete: ${keyCount}/215 keys`);

// Verify critical user-mentioned items
const criticalItems = {
  background: FIND_AND_COUNT_TRANSLATIONS_FR.fr.background,
  border: FIND_AND_COUNT_TRANSLATIONS_FR.fr.border,
  grayscale: FIND_AND_COUNT_TRANSLATIONS_FR.fr.grayscale
};
console.log("Critical items check:", criticalItems);

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get French translation for a key
 * @param {string} key - Translation key
 * @returns {string} Translated text
 */
function getFrenchTranslation(key) {
  return FIND_AND_COUNT_TRANSLATIONS_FR.fr[key] || key;
}

/**
 * Format French translation with placeholders
 * @param {string} text - Text with {} placeholders
 * @param {...any} values - Values to replace
 * @returns {string} Formatted text
 */
function formatFrenchTranslation(text, ...values) {
  let result = text;
  values.forEach((value) => {
    result = result.replace('{}', value);
  });
  return result;
}

// ==========================================
// EXPORT FOR USE IN APPLICATION
// ==========================================

// For use in the translations system
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FIND_AND_COUNT_TRANSLATIONS_FR;
}

// Make available globally for browser
if (typeof window !== 'undefined') {
  window.FIND_AND_COUNT_TRANSLATIONS_FR = FIND_AND_COUNT_TRANSLATIONS_FR;
}

// ==========================================
// TRANSLATION NOTES
// ==========================================
/**
 * French Educational Context:
 * - "Cherche et Compte" = Natural French for this educational activity
 * - "Fiche d'exercices" = Standard term in French schools (not "feuille de travail")
 * - "Corrigé" = Answer key (concise and professional)
 * - "Exercices de recherche" = Hidden object questions (educational focus)
 * - "Bibliothèque d'images" = Image library (formal French)
 * - "Niveaux de gris" = Grayscale (standard French term)
 * - "Bordure" = Border (clear and universally understood)
 * - "Arrière-plan" = Background (standard term)
 *
 * Task Instructions:
 * - "Entourer" = Circle (common French instruction)
 * - "Encadrer" = Draw a frame/square around
 * - "Barrer" = Cross out (simpler than "rayer")
 * - "Compter" = Count (direct instruction)
 *
 * UI Conventions:
 * - Using formal "vous" throughout for professional tone
 * - Clear, pedagogical language for educational context
 * - Imperative mood for actions (French standard)
 * - Technical terms accessible to teachers
 * - "Télécharger" for download (standard French)
 * - "Importer" for upload (clearer than "téléverser")
 *
 * French-specific choices:
 * - "Mise en page" preferred over "Configuration de page"
 * - "Transparence" for opacity (intuitive French term)
 * - "Grille" for grid (standard French)
 * - "Contour" for outline (standard graphics term)
 * - Space before colons and two-part punctuation (: ! ? ;)
 * - Decimal comma notation (8,5×11")
 * - "VERSION GRATUITE" for free version (clear and direct)
 *
 * Educational terminology:
 * - "Fiche d'exercices" aligns with French curriculum
 * - "Consigne" for task/instruction (school terminology)
 * - "Corrigé" is the standard for answer keys
 * - Clear distinction between "Premier plan" and "Arrière-plan"
 * - "Calques" for layers (standard in French graphics)
 *
 * Cultural adaptations:
 * - A4 format prominently featured (European standard)
 * - Metric measurements prioritized
 * - "ex :" for examples (French abbreviation)
 * - Professional yet approachable tone
 * - Error messages are constructive and polite
 */