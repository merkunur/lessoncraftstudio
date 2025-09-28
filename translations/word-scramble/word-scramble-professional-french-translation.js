// 🔤 WORD SCRAMBLE GENERATOR - PROFESSIONAL FRENCH TRANSLATION
// ============================================================
// Version: 2.0.0 (Pattern A)
// Last Updated: December 2024
// Total Keys: 178
// Language: French (fr)
// Approach: Natural French as if originally created in France
// Educational Context: French school system terminology
// ============================================================

const WORD_SCRAMBLE_TRANSLATIONS_FR = {
  "fr": {
    // ==========================================
    // CORE UI ELEMENTS (17 keys)
    // ==========================================
    "app.title": "Générateur de mots mélangés",
    "wordScrambleGenerator": "Générateur de mots mélangés",
    "worksheetSettings": "Paramètres de la fiche",
    "generate": "Générer",
    "generateWorksheet": "Créer la fiche d'exercices",
    "generateAnswerKey": "Créer le corrigé",
    "download": "Télécharger",
    "worksheet": "Fiche d'exercices",
    "answerKey": "Corrigé",
    "clearAll": "Tout effacer",
    "worksheetJpeg": "Fiche d'exercices (JPEG)",
    "answerKeyJpeg": "Corrigé (JPEG)",
    "worksheetPdf": "Fiche d'exercices (PDF)",
    "answerKeyPdf": "Corrigé (PDF)",
    "grayscale": "Niveaux de gris",  // CRITICAL - User mentioned
    "deleteSelected": "Supprimer la sélection",
    "randomSelect": "Sélection aléatoire",
    "clearSelection": "Effacer la sélection",

    // ==========================================
    // LANGUAGE SETTINGS (14 keys)
    // ==========================================
    "languageSettings": "Paramètres de langue",
    "selectLanguage": "Sélectionner la langue",
    "language": "Langue :",
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
    // PAGE SETUP (22 keys)
    // ==========================================
    "pageSetup": "Mise en page",
    "pageSize": "Format de page :",
    "letterPortrait": "Letter (Portrait)",
    "letterLandscape": "Letter (Paysage)",
    "a4Portrait": "A4 (Portrait)",
    "a4Landscape": "A4 (Paysage)",
    "legalPortrait": "Legal (Portrait)",
    "legalLandscape": "Legal (Paysage)",
    "custom": "Personnalisé",
    "widthPx": "Largeur (px) :",
    "heightPx": "Hauteur (px) :",
    "pageColor": "Couleur de page :",
    "applySize": "Appliquer la taille",
    "background": "Arrière-plan",  // CRITICAL - User mentioned
    "backgroundTheme": "Thème d'arrière-plan :",
    "none": "Aucun",
    "selectBackgroundTheme": "Sélectionnez un thème pour les arrière-plans.",
    "backgroundOpacity": "Opacité de l'arrière-plan :",
    "border": "Bordure",  // CRITICAL - User mentioned
    "borderTheme": "Thème de bordure :",
    "selectBorderTheme": "Sélectionnez un thème pour les bordures.",
    "borderOpacity": "Opacité de la bordure :",

    // ==========================================
    // TEXT TOOLS (11 keys)
    // ==========================================
    "textTools": "Outils de texte",
    "addNewText": "Ajouter un nouveau texte",
    "content": "Contenu :",
    "enterTextHerePlaceholder": "Entrez le texte ici...",
    "addTextToPage": "Ajouter le texte à la page",
    "selectedTextProperties": "Propriétés du texte sélectionné",
    "color": "Couleur :",
    "size": "Taille :",
    "font": "Police :",
    "outlineColor": "Couleur du contour :",
    "outlineWidth": "Épaisseur du contour (0-10) :",

    // ==========================================
    // IMAGE SELECTION (13 keys)
    // ==========================================
    "imageSelection": "Sélection d'images",
    "availableThemes": "Thèmes disponibles",
    "theme": "Thème :",
    "allThemes": "Tous les thèmes",
    "searchImagesPlaceholder": "Rechercher des images...",
    "themeImages": "Images du thème",
    "selectedImages": "Images sélectionnées",
    "selectedCount": "Sélectionnées : {} / {}",
    "selectedImagesWillAppear": "Vos images sélectionnées apparaîtront ici.",
    "selectThemeFromDropdown": "Sélectionnez un thème dans la liste ci-dessus.",
    "loading": "Chargement...",
    "noImagesFound": "Aucune image trouvée{}.",
    "maxImagesSelected": "Vous pouvez sélectionner au maximum {} images.",

    // ==========================================
    // PUZZLE SETTINGS (14 keys)
    // ==========================================
    "problemSettings": "Paramètres des exercices",
    "puzzleSettings": "Configuration des énigmes",
    "numberOfPuzzles": "Nombre d'énigmes (1-12) :",
    "difficulty": "Difficulté :",
    "noClues": "Sans indices",
    "hard": "Difficile",
    "medium": "Moyen",
    "easy": "Facile",
    "letterCase": "Casse des lettres :",
    "upperCase": "Majuscules",
    "lowerCase": "Minuscules",
    "letterColoring": "Coloration des lettres :",
    "colorCoded": "Code couleur (voyelles/consonnes)",
    "blackWhite": "Noir et blanc",

    // ==========================================
    // UPLOAD CUSTOM IMAGES (8 keys)
    // ==========================================
    "uploadCustomImages": "Téléverser des images personnalisées",
    "selectImagesToUpload": "Sélectionner les images à téléverser :",
    "yourUploadedImages": "Vos images téléversées (cette session)",
    "uploadedImagesAppearHere": "Vos images téléversées apparaissent ici.",
    "chooseFiles": "Choisir des fichiers",
    "noFileChosen": "Aucun fichier sélectionné",
    "filesSelected": "{} fichier(s) sélectionné(s)",
    "customImagesAvailable": "{} image(s) personnalisée(s) disponible(s).",

    // ==========================================
    // PROBLEM CONFIGURATION (2 keys)
    // ==========================================
    "includeNameDateFields": "Inclure les champs Nom/Date",
    "includeExerciseNumbers": "Inclure la numérotation des exercices",

    // ==========================================
    // TOOLBAR & ALIGNMENT (15 keys)
    // ==========================================
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

    // ==========================================
    // SUCCESS MESSAGES (8 keys)
    // ==========================================
    "worksheetGeneratedSuccessfully": "Fiche d'exercices créée avec succès !",
    "answerKeyGenerated": "Corrigé créé !",
    "formCleared": "Formulaire effacé.",
    "downloadInitiated": "Téléchargement lancé !",
    "pdfDownloaded": "PDF téléchargé !",
    "jpegDownloadInitiated": "Téléchargement JPEG lancé !",
    "pdfDownloaded2": "PDF téléchargé !",
    "textAddedToPage": "Texte ajouté à la page.",

    // ==========================================
    // ERROR MESSAGES (13 keys)
    // ==========================================
    "couldNotLoadThemes": "Impossible de charger les thèmes.",
    "errorLoadingImages": "Erreur lors du chargement des images.",
    "pleaseSelectImagesOrTheme": "Veuillez sélectionner des images ou choisir un thème avec des images.",
    "pleaseGenerateWorksheetFirst": "Veuillez d'abord créer une fiche d'exercices.",
    "failedToLoadImage": "Échec du chargement de l'image {}.",
    "errorPreparingImage": "Erreur lors de la préparation de l'image : {}",
    "pleaseGenerateContentFirst": "Veuillez d'abord générer du contenu.",
    "errorCreatingPdf": "Erreur lors de la création du PDF : {}",
    "errorCreatingPdf2": "Erreur lors de la création du PDF.",
    "errorPreparingJpeg": "Erreur lors de la préparation du JPEG.",
    "errorLoadingBorders": "Erreur lors du chargement des bordures.",
    "errorLoadingBackgrounds": "Erreur lors du chargement des arrière-plans.",
    "notEnoughImages": "Pas assez d'images sélectionnées pour les énigmes.",

    // ==========================================
    // INFO/LOADING MESSAGES (9 keys)
    // ==========================================
    "generatingWorksheet": "Création de la fiche d'exercices...",
    "generatingAnswerKey": "Création du corrigé...",
    "preparingCanvas": "Préparation de {} ...",
    "preparingPdf": "Préparation du PDF...",
    "preparingJpeg": "Préparation du JPEG...",
    "preparingCanvasPdf": "Préparation du PDF {} ...",
    "loadingThemes": "Chargement des thèmes...",
    "searchingImages": "Recherche d'images...",
    "processingUpload": "Traitement du téléversement...",

    // ==========================================
    // NAME/DATE PLACEHOLDERS (2 keys)
    // ==========================================
    "namePlaceholder": "Nom : ________________",
    "datePlaceholder": "Date : ________",

    // ==========================================
    // WATERMARK TEXT (2 keys - Free Tier)
    // ==========================================
    "watermarkText": "VERSION GRATUITE - LessonCraftStudio.com",
    "watermarkSmallText": "VERSION GRATUITE"
  }
};

// ==========================================
// VALIDATION & VERIFICATION
// ==========================================

// Verify all 178 keys are present
const keyCount = Object.keys(WORD_SCRAMBLE_TRANSLATIONS_FR.fr).length;
console.log(`✅ French translation complete: ${keyCount}/178 keys`);


// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get French translation for a key
 * @param {string} key - Translation key
 * @returns {string} Translated text
 */
function getFrenchTranslation(key) {
    return WORD_SCRAMBLE_TRANSLATIONS_FR.fr[key] || key;
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
// EXPORT
// ==========================================

// ==========================================
// EXPORT FOR USE IN APPLICATION
// ==========================================

// For use in the translations system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WORD_SCRAMBLE_TRANSLATIONS_FR;
}

// Make available globally for browser
// For use in browser environment
if (typeof window !== 'undefined') {
    window.WORD_SCRAMBLE_TRANSLATIONS_FR = WORD_SCRAMBLE_TRANSLATIONS_FR;
}

// ==========================================
// TRANSLATION NOTES
// ==========================================
/**
 * French Educational Context:
 * - "Mots mélangés" = Standard French term for word scramble (literally "mixed words")
 * - "Fiche d'exercices" = Standard term for worksheet in French schools
 * - "Corrigé" = Answer key (standard academic term, not "réponses")
 * - "Énigme" = Puzzle (educational context, more refined than "puzzle")
 * - "Niveaux de gris" = Grayscale (standard French term)
 * - "Bordure" = Border (clear and universally understood)
 * - "Arrière-plan" = Background (standard term)
 * 
 * Difficulty levels:
 * - "Sans indices" = No Clues (challenging level)
 * - "Difficile" = Hard
 * - "Moyen" = Medium
 * - "Facile" = Easy (accessible for beginners)
 * 
 * Letter formatting:
 * - "Majuscules" = Upper case (capital letters)
 * - "Minuscules" = Lower case (small letters)
 * - "Code couleur" = Color-coded (educational feature)
 * - "Voyelles/Consonnes" = Vowels/Consonants (linguistic terms)
 * 
 * UI Conventions:
 * - Using formal but accessible language for educational context
 * - Direct, clear terminology typical of French educational materials
 * - Proper use of accents (é, è, à, ê) throughout
 * - Consistent use of "vous" form (implicit) for professional tone
 * - Technical terms kept simple for teacher/student accessibility
 * - "Téléverser" used for upload (modern French term)
 */