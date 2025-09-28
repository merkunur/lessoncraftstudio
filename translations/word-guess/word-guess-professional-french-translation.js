// Word Guess App - Professional French Translation
// Total: 93 unique translation keys
// Approach: Natural, educational French as if originally developed in France
// App name: "Générateur de Mots Mystères" (Mystery Words Generator - engaging educational term)

const WORD_GUESS_FRENCH_TRANSLATIONS = {
  fr: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Générateur de Mots Mystères",
    "settings.title": "Paramètres des Mots Mystères",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Paramètres de Langue",
    "settings.pageSetup": "Mise en Page",
    "settings.textTools": "Outils de Texte",
    "settings.exerciseConfig": "Configuration de l'Exercice",
    "library.title": "Bibliothèque d'Images",
    "library.uploadTitle": "Téléverser vos Images",

    // ===== 3. LANGUAGE SECTION (12 items) =====
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
    "decoration.backgroundOpacity": "Opacité du Fond :",
    "decoration.borderTheme": "Thème de Bordure :",
    "decoration.borderOpacity": "Opacité de la Bordure :",

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

    // ===== 7. IMAGE LIBRARY (8 items) =====
    "library.selectTheme": "Sélectionner un Thème :",
    "library.search": "Rechercher des Images :",
    "library.searchPlaceholder": "ex : pomme, voiture",
    "library.availableImages": "Images Disponibles :",
    "library.selectedImages": "Images Sélectionnées pour les Devinettes :",
    "library.selectUpload": "Sélectionner des images à téléverser :",
    "library.uploadedImages": "Vos Images Téléversées (Cette Session) :",
    "library.selectedCount": "Sélectionnées : {x} / {y}",

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
    "toolbar.delete": "Supprimer la Sélection",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Générer",
    "button.generateWorksheet": "Créer la Fiche",
    "button.generateAnswer": "Créer le Corrigé",
    "button.download": "Télécharger",
    "button.worksheetJpeg": "Fiche (JPEG)",
    "button.answerJpeg": "Corrigé (JPEG)",
    "button.worksheetPdf": "Fiche (PDF)",
    "button.answerPdf": "Corrigé (PDF)",
    "settings.grayscale": "Niveaux de Gris",
    "button.clearAll": "Tout Effacer",

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
    "message.uploadedHere": "Vos images téléversées apparaissent ici.",
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
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'fr', params = {}) {
  const translation = WORD_GUESS_FRENCH_TRANSLATIONS[locale]?.[key] || key;
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
    WORD_GUESS_FRENCH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}