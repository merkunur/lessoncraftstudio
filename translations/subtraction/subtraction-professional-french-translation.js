// Subtraction App - Professional French Translation
// Total: 145 translation keys (140 unique)
// Approach: Natural, educational French as if originally developed in France
// App name: "Fiches de Soustraction" (Subtraction Worksheets - clear educational term)

const SUBTRACTION_FRENCH_TRANSLATIONS = {
  fr: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Générateur de Fiches de Soustraction",
    "settings.title": "Paramètres de la Fiche",

    // ===== 2. ACCORDION HEADERS (7 items) =====
    "settings.language": "Paramètres de Langue",
    "settings.pageSetup": "Mise en Page",
    "settings.textTools": "Outils de Texte",
    "settings.exerciseConfig": "Configuration des Exercices",
    "library.title": "Bibliothèque d'Images",
    "decoration.title": "Bordures et Arrière-plans",
    "problemSettings": "Paramètres des Problèmes",

    // ===== 3. LANGUAGE SECTION (13 items) =====
    "selectLanguage": "Sélectionner la langue",
    "language": "Langue :",
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

    // ===== 4. PAGE SETUP (24 items) =====
    "pageSize": "Format de page :",
    "pageSize.usLetterPortrait": "US Letter (Portrait)",
    "pageSize.usLetterLandscape": "US Letter (Paysage)",
    "pageSize.a4Portrait": "A4 (Portrait)",
    "pageSize.a4Landscape": "A4 (Paysage)",
    "pageSize.a3Portrait": "A3 (Portrait)",
    "pageSize.a3Landscape": "A3 (Paysage)",
    "pageSize.tabloidPortrait": "Tabloïd (Portrait)",
    "pageSize.tabloidLandscape": "Tabloïd (Paysage)",
    "pageSize.legalPortrait": "Legal (Portrait)",
    "pageSize.legalLandscape": "Legal (Paysage)",
    "pageSize.custom": "Personnalisé",
    "widthPx": "Largeur (px) :",
    "heightPx": "Hauteur (px) :",
    "applySize": "Appliquer la taille",
    "pageColor": "Couleur de page :",
    "background": "Arrière-plan",
    "backgroundTheme": "Thème d'arrière-plan :",
    "selectBackgroundTheme": "Sélectionnez un thème pour les arrière-plans.",
    "backgroundOpacity": "Opacité de l'arrière-plan :",
    "border": "Bordure",
    "borderTheme": "Thème de bordure :",
    "selectBorderTheme": "Sélectionnez un thème pour les bordures.",
    "borderOpacity": "Opacité de la bordure :",

    // ===== 5. COMMON (2 items) =====
    "none": "Aucun",
    "grayscale": "Niveaux de gris",

    // ===== 6. DOWNLOAD OPTIONS (7 items) =====
    "settings.downloadOptions": "Options de Téléchargement d'Image",
    "settings.quality": "Qualité :",
    "quality.standard": "Standard (100%)",
    "quality.high": "Haute Résolution (200%)",
    "quality.ultra": "Ultra HD (300%)",
    "quality.max": "Maximum (400%)",
    "settings.grayscale": "Niveaux de gris",

    // ===== 7. TEXT TOOLS (12 items) =====
    "addNewText": "Ajouter un nouveau texte",
    "content": "Contenu :",
    "enterTextHerePlaceholder": "Saisissez le texte ici...",
    "addTextToPage": "Ajouter le texte à la page",
    "selectedTextProperties": "Propriétés du texte sélectionné",
    "color": "Couleur :",
    "size": "Taille :",
    "font": "Police :",
    "outlineColor": "Couleur du contour :",
    "outlineWidth": "Contour (0-10) :",
    "text.strokeColor": "Couleur du trait :",
    "text.strokeWidth": "Largeur :",

    // ===== 8. FONTS (7 items) =====
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ===== 9. EXERCISE CONFIGURATION (5 items) =====
    "config.exerciseCount": "Nombre d'exercices :",
    "config.maxMinuend": "Diminuende maximum :",
    "config.includeNameDate": "Inclure Nom et Date",
    "config.includeExerciseNumbers": "Inclure les numéros d'exercice",
    "config.useFriendlyBox": "Utiliser la présentation claire",

    // ===== 10. IMAGE LIBRARY (13 items) =====
    "imageLibrary": "Bibliothèque d'images",
    "imageTheme": "Thème d'images :",
    "searchImagesPlaceholder": "Rechercher des images...",
    "selectThemeFromDropdown": "Sélectionnez un thème dans le menu déroulant ci-dessus.",
    "selectedImages": "Images sélectionnées",
    "selectedCount": "Sélectionnées : {count} / {max}",
    "selectedImagesWillAppear": "Vos images sélectionnées apparaîtront ici.",
    "multipleChoice": "Choix multiple (corrigé avec toutes les bonnes réponses)",
    "orderMatters": "L'ordre compte (ordre fixe des images)",
    "randomSelect": "Sélection aléatoire",
    "clearSelection": "Effacer la sélection",
    "themes.all": "Tous les thèmes",
    "library.selectedCount": "Sélectionnées : {x} / {y}",

    // ===== 11. UPLOAD SECTION (3 items) =====
    "selectImagesToUpload": "Sélectionner les images à télécharger :",
    "yourUploadedImages": "Vos images téléchargées (cette session)",
    "uploadedImagesWillAppear": "Vos images téléchargées apparaîtront ici.",

    // ===== 12. PROBLEM SETTINGS (6 items) =====
    "numberOfProblems": "Nombre de problèmes (1-30) :",
    "columns": "Colonnes (1-6) :",
    "imageSize": "Taille de l'image (px, 20-200) :",
    "spacingBetweenImages": "Espacement entre les images (px, 0-50) :",
    "verticalSpacing": "Espacement vertical entre les problèmes (px, 0-100) :",
    "includeNameDateFields": "Inclure les champs Nom/Date",

    // ===== 13. ACTION BUTTONS (14 items) =====
    "generate": "Générer",
    "generateWorksheet": "Générer la fiche",
    "generateAnswerKey": "Générer le corrigé",
    "download": "Télécharger",
    "worksheetJpeg": "Fiche (JPEG)",
    "answerKeyJpeg": "Corrigé (JPEG)",
    "worksheetPdf": "Fiche (PDF)",
    "answerKeyPdf": "Corrigé (PDF)",
    "clearAll": "Tout effacer",
    "button.generate": "Générer la fiche",
    "button.generateAnswer": "Générer le corrigé",
    "button.downloadJpeg": "Télécharger JPEG",
    "button.downloadPdf": "Télécharger PDF",
    "button.clearAll": "Tout effacer",

    // ===== 14. TABS (2 items) =====
    "worksheet": "Fiche",
    "answerKey": "Corrigé",

    // ===== 15. TOOLBAR (15 items) =====
    "layers": "Calques",
    "bringForward": "Avancer",
    "sendBackward": "Reculer",
    "align": "Aligner",
    "alignSelected": "Aligner la sélection :",
    "alignToPage": "Aligner sur la page :",
    "deleteSelected": "Supprimer la sélection",
    "toolbar.alignLeft": "Aligner à gauche",
    "toolbar.centerH": "Centrer horizontalement",
    "toolbar.alignRight": "Aligner à droite",
    "toolbar.alignTop": "Aligner en haut",
    "toolbar.centerV": "Centrer verticalement",
    "toolbar.alignBottom": "Aligner en bas",
    "toolbar.centerPageH": "Centrer horizontalement sur la page",
    "toolbar.centerPageV": "Centrer verticalement sur la page",

    // ===== 16. SUCCESS MESSAGES (10 items) =====
    "textAdded": "Texte ajouté.",
    "formCleared": "Formulaire effacé.",
    "worksheetGeneratedSuccessfully": "Fiche générée avec succès !",
    "answerKeyGenerated": "Corrigé généré !",
    "downloadInitiated": "Téléchargement lancé !",
    "pdfDownloaded": "PDF téléchargé !",
    "jpegDownloadInitiated": "Téléchargement JPEG lancé !",
    "message.pdfSuccess": "PDF téléchargé !",
    "message.backgroundAdded": "Arrière-plan ajouté.",
    "message.worksheetGenerated": "Fiche générée avec succès !",

    // ===== 17. ERROR MESSAGES (15 items) =====
    "couldNotLoadThemes": "Impossible de charger les thèmes.",
    "errorLoadingThemes": "Erreur lors du chargement des thèmes.",
    "errorDuringSearch": "Erreur lors de la recherche.",
    "errorLoadingImages": "Erreur lors du chargement des images.",
    "maxImagesSelected": "Maximum de {count} image(s) sélectionnée(s).",
    "pleaseSelectImagesFirst": "Veuillez d'abord sélectionner des images, soit depuis la bibliothèque, soit en téléchargeant vos propres images.",
    "pleaseGenerateWorksheetFirst": "Veuillez d'abord générer une fiche.",
    "canvasIsEmpty": "La zone de travail est vide. Rien à télécharger.",
    "errorPreparingJpeg": "Erreur lors de la préparation du JPEG : {error}",
    "pleaseGenerateContentFirst": "Veuillez d'abord générer du contenu.",
    "errorCreatingPdf": "Erreur lors de la création du PDF.",
    "message.pdfError": "Erreur lors de la création du PDF.",
    "message.jpegError": "Erreur lors de la préparation du JPEG.",
    "message.imageLoadFailed": "Impossible de charger l'image de bordure/arrière-plan.",
    "message.pdfCreateError": "Erreur lors de la création du PDF : {error}",

    // ===== 18. INFO MESSAGES (9 items) =====
    "loadingDefaultTheme": "Chargement du thème par défaut...",
    "searching": "Recherche en cours...",
    "loadingImagesForTheme": "Chargement des images pour le thème...",
    "noImagesFound": "Aucune image trouvée{query}.",
    "preparingFile": "Préparation de {filename}...",
    "preparingPdf": "Préparation du PDF...",
    "preparingJpeg": "Préparation du JPEG...",
    "message.loading": "Chargement...",
    "message.preparingDownload": "Préparation du téléchargement...",

    // ===== 19. NAME/DATE FIELDS (2 items) =====
    "form.nameField": "Nom : _________________________",
    "form.dateField": "Date : ____________",

    // ===== 20. WATERMARKS (2 items) =====
    "watermark.free": "VERSION GRATUITE - LessonCraftStudio.com",
    "watermark.freeShort": "VERSION GRATUITE",

    // ===== 21. PREVIEW (1 item) =====
    "preview.title": "Aperçu",

    // ===== 22. SUBTRACTION-SPECIFIC FEATURES =====
    // Note: Mathematical terms and visual concepts
    // - Images barrées pour la soustraction visuelle
    // - Diminuende/Diminuteur pour les termes mathématiques
    // - Présentation claire au lieu de "Friendly Box"
    // - Lignes de réponse pour les élèves
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'fr', params = {}) {
  const translation = SUBTRACTION_FRENCH_TRANSLATIONS[locale]?.[key] || key;
  return formatTranslation(translation, params);
}

function formatTranslation(template, params) {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return params.hasOwnProperty(key) ? params[key] : match;
  });
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SUBTRACTION_FRENCH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}