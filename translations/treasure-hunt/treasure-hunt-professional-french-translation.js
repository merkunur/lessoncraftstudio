// Treasure Hunt App - Professional French Translation
// Total: 80+ translation keys (75 unique)
// Approach: Natural, educational French as if originally developed in France
// App name: "Générateur de Chasse au Trésor" (Treasure Hunt Generator - playful educational term)

const TREASURE_HUNT_FRENCH_TRANSLATIONS = {
  fr: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Générateur de Chasse au Trésor",
    "settings.title": "Paramètres de la Fiche",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "settings.language": "Paramètres de Langue",
    "settings.pageSetup": "Configuration de la Page",
    "settings.textTools": "Outils de Texte",
    "settings.puzzleSetup": "Configuration du Jeu",
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

    // ===== 4. PAGE SETUP (17 items) =====
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
    "decoration.backgroundTheme": "Thème d'Arrière-plan :",
    "decoration.none": "Aucun",
    "decoration.backgroundOpacity": "Opacité de l'Arrière-plan :",
    "decoration.borderTheme": "Thème de Bordure :",
    "decoration.borderOpacity": "Opacité de la Bordure :",
    "button.applySize": "Appliquer le Format",
    "settings.grayscale": "Niveaux de gris",

    // ===== 5. TEXT TOOLS (7 items) =====
    "text.content": "Contenu :",
    "text.placeholder": "Bonjour !",
    "button.addText": "Ajouter le Texte",
    "text.color": "Couleur :",
    "text.size": "Taille :",
    "text.font": "Police :",
    "text.default": "Nouveau Texte",

    // ===== 6. PUZZLE SETUP (2 items) =====
    "puzzle.generateFromTheme": "Générer depuis un Thème (Remplace la Sélection Manuelle) :",
    "puzzle.selectTheme": "-- Sélectionnez un Thème pour la Fiche --",

    // ===== 7. IMAGE LIBRARY (7 items) =====
    "library.selectTheme": "Sélectionner le Thème du Dictionnaire :",
    "library.search": "Rechercher des Images :",
    "library.searchPlaceholder": "ex : pomme, voiture",
    "library.availableImages": "Images Disponibles (Cliquez pour ajouter à la sélection manuelle) :",
    "library.selectUpload": "Sélectionner des images à téléverser :",
    "library.uploadedImages": "Vos Images Téléversées (Cliquez pour Sélectionner) :",
    "library.selectedCount": "Sélectionnées : {x} / 6",

    // ===== 8. TOOLBAR (6 items) =====
    "toolbar.layers": "Calques",
    "toolbar.bringForward": "Avancer",
    "toolbar.sendBackward": "Reculer",
    "toolbar.delete": "Supprimer la Sélection",
    "toolbar.align": "Aligner",
    "toolbar.center": "Centrer",

    // ===== 9. ACTION BUTTONS (11 items) =====
    "button.generate": "Générer",
    "button.generateWorksheet": "Générer la Fiche",
    "button.generateAnswer": "Générer le Corrigé",
    "button.download": "Télécharger",
    "button.worksheetJpeg": "Fiche (JPEG)",
    "button.answerJpeg": "Corrigé (JPEG)",
    "button.worksheetPdf": "Fiche (PDF)",
    "button.answerPdf": "Corrigé (PDF)",
    "button.clearAll": "Tout Effacer",
    "button.downloadJpeg": "Télécharger en JPEG",
    "button.downloadPdf": "Télécharger en PDF",

    // ===== 10. TABS (2 items) =====
    "tab.worksheet": "Fiche d'exercices",
    "tab.answerKey": "Corrigé",

    // ===== 11. SUCCESS MESSAGES (10 items) =====
    "message.textAdded": "Texte ajouté.",
    "message.formCleared": "Formulaire effacé.",
    "message.worksheetGenerated": "Fiche générée !",
    "message.answerGenerated": "Corrigé généré !",
    "message.downloadStarted": "Téléchargement lancé !",
    "message.pdfDownloaded": "PDF téléchargé !",
    "message.pdfSuccess": "PDF téléchargé !",
    "message.jpegDownloaded": "Téléchargement JPEG lancé !",
    "message.assetAdded": "{type} ajouté.",
    "message.downloadInitiated": "Téléchargement lancé !",

    // ===== 12. ERROR MESSAGES (14 items) =====
    "message.themesLoadError": "Impossible de charger les thèmes.",
    "message.maxImages": "Maximum de 6 images sélectionnées.",
    "message.themeNoImages": 'Le thème "{theme}" n\'a pas d\'images.',
    "message.themeLoadError": "Erreur lors du chargement des images du thème.",
    "message.selectSixImages": "Sélectionne exactement 6 images manuellement, ou choisis un thème pour générer automatiquement.",
    "message.noPuzzleData": "Aucune donnée de jeu générée.",
    "message.generateFirst": "Génère d'abord une fiche.",
    "message.canvasEmpty": "La zone de travail est vide.",
    "message.jpegError": "Erreur lors de la préparation du JPEG.",
    "message.pdfError": "Erreur lors de la création du PDF.",
    "message.pdfCreateError": "Erreur lors de la création du PDF.",
    "message.generateContent": "Génère d'abord du contenu.",
    "message.generateWorksheet": "Génère d'abord une fiche.",
    "message.jpegPrepError": "Erreur lors de la préparation du JPEG.",

    // ===== 13. INFO MESSAGES (11 items) =====
    "message.selectBorderTheme": "Sélectionne un thème pour voir les bordures.",
    "message.selectBackgroundTheme": "Sélectionne un thème pour les arrière-plans.",
    "message.loading": "Chargement...",
    "message.typeToSearch": "Tape pour rechercher dans toutes les images.",
    "message.searchError": "Erreur pendant la recherche.",
    "message.imagesError": "Erreur lors du chargement des images.",
    "message.noImages": "Aucune image trouvée.",
    "message.uploadedHere": "Tes images téléversées apparaîtront ici.",
    "message.preparingJpeg": "Préparation du JPEG...",
    "message.preparingPdf": "Préparation du PDF...",
    "themes.all": "Tous les Thèmes (utilise les traductions)",

    // ===== 14. WATERMARKS (2 items) =====
    "watermark.free": "VERSION GRATUITE - LessonCraftStudio.com",
    "watermark.freeShort": "VERSION GRATUITE"

    // ===== 15. TREASURE HUNT GAME TEXT (Already in treasureHuntTranslations) =====
    // NOTE: These are already implemented in the app's treasureHuntTranslations object:
    // - startAt: "Commence à"
    // - move: "Avance de"
    // - north: "nord"
    // - south: "sud"
    // - east: "est"
    // - west: "ouest"
    // - square: "case"
    // - squares: "cases"
    // - whereIsTreasure: "Où est le trésor ?"
    // These remain in treasureHuntTranslations for backward compatibility
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'fr', params = {}) {
  const translation = TREASURE_HUNT_FRENCH_TRANSLATIONS[locale]?.[key] || key;
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
    TREASURE_HUNT_FRENCH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}