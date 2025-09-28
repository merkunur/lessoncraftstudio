// Writing App - Professional French Translation
// Total: 103 unique translation keys
// Approach: Natural, educational French as if originally developed in France
// App name: "Générateur d'Exercices d'Écriture" (Writing Exercises Generator - standard educational term)

const WRITING_FRENCH_TRANSLATIONS = {
  fr: {
    // ===== 1. PAGE & HERO (2 items) =====
    "page.title": "Générateur d'Exercices d'Écriture",
    "settings.title": "Feuille d'Exercices d'Écriture",

    // ===== 2. LANGUAGE SECTION (12 items) =====
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

    // ===== 3. ACCORDION HEADERS (4 items) =====
    "settings.pageSetup": "Configuration de la Page",
    "library.title": "Bibliothèque d'Images",
    "library.uploadTitle": "Télécharger Vos Images",
    "settings.textTools": "Outils de Texte",

    // ===== 4. PAGE SETUP (14 items) =====
    "settings.pageSize": "Format de Page :",
    "pageSize.letterPortrait": "Letter Portrait (8,5×11\")",
    "pageSize.letterLandscape": "Letter Paysage (11×8,5\")",
    "pageSize.a4Portrait": "A4 Portrait (210×297mm)",
    "pageSize.a4Landscape": "A4 Paysage (297×210mm)",
    "pageSize.custom": "Personnalisé",
    "settings.width": "Largeur (px) :",
    "settings.height": "Hauteur (px) :",
    "decoration.backgroundTheme": "Thème de Fond :",
    "decoration.none": "Aucun",
    "decoration.backgroundOpacity": "Opacité du Fond :",
    "decoration.borderTheme": "Thème de Bordure :",
    "decoration.borderOpacity": "Opacité de la Bordure :",

    // ===== 5. WRITING ROW CONFIGURATION (19 items) =====
    "row.title": "Ligne {number}",
    "row.type": "Type de Ligne :",
    "rowType.trace": "Tracer",
    "rowType.fadingTrace": "Tracé Progressif",
    "rowType.guidedCopy": "Copie Guidée",
    "rowType.fill": "Compléter",
    "row.fontStyle": "Style d'Écriture :",
    "fontStyle.printRegular": "Écriture Script",
    "fontStyle.printRegularArrow": "Écriture Script avec Flèches",
    "fontStyle.printTracing": "Script à Tracer",
    "fontStyle.printTracingArrow": "Script à Tracer avec Flèches",
    "fontStyle.cursive": "Écriture Cursive",
    "row.content": "Contenu :",
    "content.empty": "Vide",
    "content.beginningLetter": "Lettre Initiale",
    "content.wholeFileName": "Nom Complet du Fichier",
    "content.customText": "Texte Personnalisé",
    "content.preWriting": "Graphisme",
    "row.customTextPlaceholder": "Entrez le texte à tracer...",

    // ===== 6. CASE OPTIONS (4 items) =====
    "row.case": "Casse :",
    "case.uppercase": "Majuscules",
    "case.lowercase": "Minuscules",
    "case.titleCase": "Première Lettre en Majuscule",

    // ===== 7. STROKE TYPES (5 items) =====
    "row.strokeType": "Type de Trait :",
    "stroke.vertical": "Ligne Verticale",
    "stroke.horizontal": "Ligne Horizontale",
    "stroke.circle": "Cercle",
    "stroke.zigzag": "Ligne Zigzag",

    // ===== 8. IMAGE LIBRARY (11 items) =====
    "library.imageMode": "Mode Image :",
    "imageMode.exercise": "Image d'Exercice",
    "imageMode.custom": "Images Personnalisées",
    "library.pickExercise": "Choisir une image d'exercice (optionnel) :",
    "library.searchPlaceholder": "Rechercher des images...",
    "library.selectedStatus": "Sélectionné : {word}",
    "library.selectUpload": "Sélectionner image(s) à télécharger :",
    "library.uploadedImages": "Vos Images Téléchargées :",
    "button.unselectImage": "Désélectionner l'Image",
    "button.clearSelection": "Effacer la Sélection",
    "button.addSelectedImage": "Ajouter l'Image Sélectionnée",

    // ===== 9. TEXT TOOLS (9 items) =====
    "text.addNewTitle": "Ajouter un Nouveau Texte",
    "text.content": "Contenu :",
    "text.placeholder": "Nouveau Texte",
    "text.selectedProperties": "Propriétés du Texte Sélectionné",
    "text.color": "Couleur :",
    "text.size": "Taille :",
    "text.font": "Police :",
    "text.outlineColor": "Couleur du Contour :",
    "text.outlineWidth": "Contour (0-10) :",

    // ===== 10. TOOLBAR (14 items) =====
    "toolbar.bringForward": "Mettre au Premier Plan",
    "toolbar.sendBackward": "Mettre à l'Arrière-Plan",
    "toolbar.align": "Aligner",
    "toolbar.alignLeft": "Aligner à Gauche",
    "toolbar.centerH": "Centrer Horizontalement",
    "toolbar.alignRight": "Aligner à Droite",
    "toolbar.alignTop": "Aligner en Haut",
    "toolbar.centerV": "Centrer Verticalement",
    "toolbar.alignBottom": "Aligner en Bas",
    "toolbar.centerPageH": "Centrer sur la Page Horizontalement",
    "toolbar.centerPageV": "Centrer sur la Page Verticalement",
    "toolbar.cropOverflow": "Recadrer le Débordement",
    "toolbar.lock": "Verrouiller",
    "toolbar.delete": "Supprimer",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "button.deleteRow": "Supprimer la Ligne",
    "button.addRow": "Ajouter une Ligne",
    "button.addText": "Ajouter du Texte à la Feuille",
    "button.deleteSelectedText": "Supprimer le Texte Sélectionné",
    "button.download": "Télécharger",
    "button.downloadPdf": "Télécharger en PDF",
    "button.downloadJpeg": "Télécharger en JPEG",
    "settings.grayscale": "Niveaux de Gris",
    "button.clearAll": "Tout Effacer",

    // ===== 12. SUCCESS MESSAGES (5 items) =====
    "message.rowCropped": "Ligne recadrée avec succès.",
    "message.worksheetCleared": "Feuille d'exercices effacée.",
    "message.pdfDownloaded": "PDF téléchargé !",
    "message.jpegDownloaded": "Téléchargement JPEG lancé !",

    // ===== 13. ERROR MESSAGES (7 items) =====
    "message.cropNotSupported": "Le recadrage n'est pas pris en charge pour ce type de ligne.",
    "message.noContentToCrop": "Cette ligne n'a pas de contenu à recadrer.",
    "message.noOverflow": "Aucun débordement à recadrer.",
    "message.generateContent": "Veuillez d'abord générer du contenu.",
    "message.pdfError": "Erreur lors de la création du PDF.",
    "message.generateWorksheet": "Veuillez d'abord générer une feuille d'exercices.",
    "message.jpegError": "Erreur lors de la préparation du JPEG.",

    // ===== 14. INFO/LOADING MESSAGES (9 items) =====
    "message.selectBackgroundTheme": "Sélectionnez un thème pour les fonds.",
    "message.selectBorderTheme": "Sélectionnez un thème pour les bordures.",
    "message.noImages": "Aucune image trouvée. Sélectionnez un thème ou essayez une autre recherche.",
    "message.themeLoadError": "Erreur lors du chargement des thèmes {type} :",
    "message.selectTheme": "Sélectionnez un thème.",
    "message.loading": "Chargement...",
    "message.loadError": "Erreur lors du chargement de {type}.",
    "message.preparingPdf": "Préparation du PDF...",
    "message.preparingJpeg": "Préparation du JPEG...",

    // ===== 15. CONFIRM/PROMPT MESSAGES (1 item) =====
    "message.confirmClear": "Êtes-vous sûr de vouloir effacer la feuille d'exercices ? Cette action ne peut pas être annulée.",

    // ===== 16. WATERMARKS (2 items) =====
    "watermark.free": "VERSION GRATUITE - LessonCraftStudio.com",
    "watermark.freeShort": "VERSION GRATUITE"
  }
};

// Helper functions
function getTranslation(key, locale = 'fr', params = {}) {
  const translation = WRITING_FRENCH_TRANSLATIONS[locale]?.[key] || key;
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
    WRITING_FRENCH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}