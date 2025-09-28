// Pattern Worksheet - Professional French Translation
// Total: 192 translation keys (185 unique)
// Approach: Natural, educational French as if originally developed in France
// App name: "Fiche de Motifs" (Pattern Worksheet)

const PATTERN_WORKSHEET_FRENCH_TRANSLATIONS = {
  fr: {
    // ===== 1. PAGE & HERO (2 items) =====
    "pattern.worksheet.page.title": "Générateur de Fiches de Motifs",
    "pattern.worksheet.settings": "Paramètres des Motifs",

    // ===== 2. ACCORDION HEADERS (6 items) =====
    "pattern.worksheet.language.settings": "Paramètres de Langue",
    "pattern.worksheet.page.setup": "Mise en Page",
    "pattern.worksheet.text.tools": "Outils de Texte",
    "pattern.worksheet.pattern.settings": "Configuration des Motifs",
    "pattern.worksheet.image.library": "Bibliothèque d'Images",
    "pattern.worksheet.upload.custom": "Télécharger des Images Personnalisées",

    // ===== 3. LANGUAGE SECTION (12 items) =====
    "pattern.worksheet.language.label": "Langue :",
    "language.english": "English",
    "language.german": "Deutsch",
    "language.french": "Français",
    "language.spanish": "Español",
    "language.portuguese": "Português",
    "language.italian": "Italiano",
    "language.dutch": "Nederlands",
    "language.swedish": "Svenska",
    "language.danish": "Dansk",
    "language.norwegian": "Norsk",
    "language.finnish": "Suomi",

    // ===== 4. PAGE SETUP (19 items) =====
    "pattern.worksheet.page.size": "Format de Page :",
    "page.size.letter.portrait": "Letter Portrait (8,5×11\")",
    "page.size.letter.landscape": "Letter Paysage (11×8,5\")",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.a4.landscape": "A4 Paysage (297×210mm)",
    "page.size.square": "Carré (1200x1200)",
    "page.size.custom": "Personnalisé",
    "pattern.worksheet.width.label": "Largeur (px) :",
    "pattern.worksheet.height.label": "Hauteur (px) :",
    "pattern.worksheet.page.color": "Couleur de Page :",
    "pattern.worksheet.apply.size": "Appliquer la Taille",
    "pattern.worksheet.background.title": "Arrière-plan",
    "pattern.worksheet.background.theme": "Thème d'Arrière-plan :",
    "pattern.worksheet.background.message": "Sélectionnez un thème.",
    "pattern.worksheet.background.opacity": "Transparence de l'Arrière-plan :",
    "pattern.worksheet.border.title": "Bordure",
    "pattern.worksheet.border.theme": "Thème de Bordure :",
    "pattern.worksheet.border.message": "Sélectionnez un thème.",
    "pattern.worksheet.border.opacity": "Transparence de la Bordure :",

    // ===== 5. COMMON (2 items) =====
    "common.none": "Aucun",
    "common.grayscale": "Niveaux de gris",

    // ===== 6. TEXT TOOLS (18 items) =====
    "pattern.worksheet.text.add.new": "Ajouter un Nouveau Texte",
    "pattern.worksheet.text.content": "Contenu :",
    "pattern.worksheet.text.placeholder": "Bonjour !",
    "pattern.worksheet.text.add.button": "Ajouter le Texte",
    "pattern.worksheet.text.properties": "Propriétés du Texte Sélectionné",
    "pattern.worksheet.text.color": "Couleur :",
    "pattern.worksheet.text.size": "Taille :",
    "pattern.worksheet.text.font": "Police :",
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",
    "pattern.worksheet.text.outline.color": "Couleur du Contour :",
    "pattern.worksheet.text.outline.width": "Contour (0-10) :",
    "pattern.worksheet.text.default": "Nouveau Texte",

    // ===== 7. PATTERN CONFIGURATION (35 items) =====
    "pattern.worksheet.global.settings": "Paramètres Globaux",
    "pattern.worksheet.exercises.count": "Nombre d'Exercices (1-8) :",
    "pattern.worksheet.overall.theme": "Thème Général de la Fiche :",
    "pattern.worksheet.theme.none": "Aucun (utiliser les paramètres individuels)",
    "pattern.worksheet.use.overall": "Utiliser le Thème Général",
    "pattern.worksheet.include.numbers": "Afficher les Numéros d'Exercice",
    "pattern.worksheet.random.start": "Commencer par un élément aléatoire",
    "pattern.worksheet.individual.settings": "Paramètres Individuels des Exercices",
    "pattern.worksheet.configure.puzzle": "Configurer l'Exercice :",
    "pattern.worksheet.pattern.type": "Type de Motif :",
    "pattern.worksheet.pattern.ab": "AB (2 images)",
    "pattern.worksheet.pattern.aab": "AAB (2 images)",
    "pattern.worksheet.pattern.abb": "ABB (2 images)",
    "pattern.worksheet.pattern.abc": "ABC (3 images)",
    "pattern.worksheet.pattern.aabb": "AABB (2 images)",
    "pattern.worksheet.pattern.abbc": "ABBC (3 images)",
    "pattern.worksheet.pattern.aabc": "AABC (3 images)",
    "pattern.worksheet.pattern.abcc": "ABCC (3 images)",
    "pattern.worksheet.pattern.abcd": "ABCD (4 images)",
    "pattern.worksheet.question.type": "Type de Question :",
    "pattern.worksheet.blank.box": "Case Vide",
    "pattern.worksheet.choose.options": "Choix Multiple",
    "pattern.worksheet.random.blank": "Position aléatoire de la case vide",
    "pattern.worksheet.images.selected": "Images pour l'Exercice Sélectionné",
    "pattern.worksheet.image.theme": "Thème d'Images :",
    "pattern.worksheet.assigned.images": "Images Assignées :",
    "pattern.worksheet.msg.puzzle.settings": "Paramètres de l'Exercice {number}",
    "pattern.worksheet.msg.all.images": "Toutes les Images (recherche requise)",
    "pattern.worksheet.msg.click.below": "Cliquez sur une image ci-dessous",
    "pattern.worksheet.msg.element": "Élément {elementSymbol}",
    "pattern.worksheet.puzzle.number": "{puzzleNumber}.",
    "pattern.worksheet.question.mark": "?",

    // ===== 8. IMAGE LIBRARY (4 items) =====
    "pattern.worksheet.search.images": "Rechercher des Images :",
    "pattern.worksheet.search.placeholder": "ex : pomme, voiture",
    "pattern.worksheet.available.images": "Images Disponibles (cliquez pour assigner) :",
    "pattern.worksheet.select.theme": "Sélectionnez un thème pour voir les images.",

    // ===== 9. UPLOAD SECTION (3 items) =====
    "pattern.worksheet.upload.select": "Sélectionner image(s) à télécharger :",
    "pattern.worksheet.uploaded.images": "Vos Images Téléchargées :",
    "pattern.worksheet.uploaded.placeholder": "Vos images téléchargées apparaîtront ici.",

    // ===== 10. TOOLBAR (15 items) =====
    "toolbar.layers": "Calques",
    "toolbar.bring.forward": "Avancer",
    "toolbar.send.backward": "Reculer",
    "toolbar.align": "Aligner",
    "toolbar.align.selected": "Aligner la Sélection :",
    "toolbar.align.left": "Aligner à Gauche",
    "toolbar.center.h": "Centrer Horizontalement",
    "toolbar.align.right": "Aligner à Droite",
    "toolbar.align.top": "Aligner en Haut",
    "toolbar.center.v": "Centrer Verticalement",
    "toolbar.align.bottom": "Aligner en Bas",
    "toolbar.align.to.page": "Aligner sur la Page :",
    "toolbar.center.page.h": "Centrer sur la Page Horizontalement",
    "toolbar.center.page.v": "Centrer sur la Page Verticalement",
    "toolbar.delete": "Supprimer la Sélection",

    // ===== 11. ACTION BUTTONS (10 items) =====
    "pattern.worksheet.generate": "Créer",
    "pattern.worksheet.generate.worksheet": "Créer la Fiche",
    "pattern.worksheet.generate.answer": "Créer le Corrigé",
    "pattern.worksheet.download": "Télécharger",
    "pattern.worksheet.download.worksheet.jpeg": "Fiche (JPEG)",
    "pattern.worksheet.download.answer.jpeg": "Corrigé (JPEG)",
    "pattern.worksheet.download.worksheet.pdf": "Fiche (PDF)",
    "pattern.worksheet.download.answer.pdf": "Corrigé (PDF)",
    "pattern.worksheet.clear.all": "Tout Effacer",

    // ===== 12. TABS (2 items) =====
    "pattern.worksheet.tab.worksheet": "Fiche d'Exercices",
    "pattern.worksheet.tab.answer": "Corrigé",

    // ===== 13. LOADING & SEARCH MESSAGES (5 items) =====
    "pattern.worksheet.msg.cleared": "Tous les paramètres ont été effacés.",
    "pattern.worksheet.msg.loading": "Chargement des images...",
    "pattern.worksheet.msg.loading.error": "Erreur lors du chargement des images.",
    "pattern.worksheet.msg.no.images": "Aucune image trouvée{query}.",
    "pattern.worksheet.msg.loading.simple": "Chargement...",

    // ===== 14. PATTERN CONFIGURATION MESSAGES (8 items) =====
    "pattern.worksheet.msg.already.assigned": "Cette image est déjà assignée à cet exercice.",
    "pattern.worksheet.msg.slots.full": "Toutes les places pour ce motif sont remplies. Cliquez d'abord sur une image assignée pour la retirer.",
    "pattern.worksheet.msg.building": "Construction des données de l'exercice...",
    "pattern.worksheet.msg.build.failed": "Impossible de construire les données. Vérifiez les paramètres.",
    "pattern.worksheet.msg.rendering": "Création de la fiche...",
    "pattern.worksheet.msg.generated": "Fiche créée avec succès !",
    "pattern.worksheet.msg.select.theme.required": "Veuillez sélectionner un thème général ou décocher 'Utiliser le Thème Général'.",
    "pattern.worksheet.msg.incomplete.puzzle": "L'exercice {number} est incomplet et sera généré aléatoirement.",

    // ===== 15. ANSWER KEY MESSAGES (4 items) =====
    "pattern.worksheet.msg.generate.first": "Veuillez d'abord créer une fiche.",
    "pattern.worksheet.msg.rendering.answer": "Création du corrigé...",
    "pattern.worksheet.msg.answer.generated": "Corrigé créé !",

    // ===== 16. DOWNLOAD & EXPORT MESSAGES (17 items) =====
    "pattern.worksheet.msg.empty.page": "Téléchargement impossible, la page sélectionnée est vide.",
    "pattern.worksheet.msg.preparing": "Préparation du {format}...",
    "pattern.worksheet.msg.download.initiated": "Téléchargement démarré !",
    "pattern.worksheet.msg.file.error": "Erreur lors de la création du fichier : {message}",
    "pattern.worksheet.watermark.main": "VERSION GRATUITE - LessonCraftStudio.com",
    "pattern.worksheet.watermark.small": "VERSION GRATUITE",
    "pattern.worksheet.msg.generate.content.first": "Veuillez d'abord créer du contenu.",
    "pattern.worksheet.msg.preparing.pdf": "Préparation du PDF...",
    "pattern.worksheet.msg.pdf.downloaded": "PDF téléchargé !",
    "pattern.worksheet.msg.pdf.downloaded.alt": "PDF téléchargé !",
    "pattern.worksheet.msg.pdf.error": "Erreur lors de la création du PDF.",
    "pattern.worksheet.msg.pdf.error.detailed": "Erreur lors de la création du PDF : {message}",
    "pattern.worksheet.msg.generate.worksheet.first": "Veuillez d'abord créer une fiche.",
    "pattern.worksheet.msg.preparing.jpeg": "Préparation du JPEG...",
    "pattern.worksheet.msg.jpeg.initiated": "Téléchargement JPEG démarré !",
    "pattern.worksheet.msg.jpeg.error": "Erreur lors de la préparation du JPEG.",

    // ===== 17. ASSET MANAGEMENT MESSAGES (4 items) =====
    "pattern.worksheet.msg.select.asset.theme": "Sélectionnez un thème pour voir les {type}s.",
    "pattern.worksheet.msg.error.loading": "Erreur lors du chargement.",
    "pattern.worksheet.msg.asset.failed": "Impossible de charger l'image de ressource."
  }
};

// Helper functions (same as master template)
function getTranslation(key, locale = 'fr', params = {}) {
  const translation = PATTERN_WORKSHEET_FRENCH_TRANSLATIONS[locale]?.[key] || key;
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
    PATTERN_WORKSHEET_FRENCH_TRANSLATIONS,
    getTranslation,
    formatTranslation
  };
}