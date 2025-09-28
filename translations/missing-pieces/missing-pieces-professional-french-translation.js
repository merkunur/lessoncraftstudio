/**
 * Missing Pieces Professional French Translation
 * Version: 1.0.0
 * Date: 2024-12-20
 *
 * French (fr) - Complete Professional Translation
 * Total Keys: 176+
 *
 * Translation Philosophy:
 * - Natural French as if originally developed in France
 * - Uses formal "vous" form (vouvoiement) for professional educational software
 * - Educational terminology familiar to French teachers and parents
 * - Consistent shape and puzzle terminology throughout
 */

const MISSING_PIECES_FRENCH_TRANSLATIONS = {
  fr: {
    // ============= 1. Language Names (11 keys) =============
    "language.english": "Anglais",
    "language.german.full": "Allemand (Deutsch)",
    "language.french.full": "Français",
    "language.spanish.full": "Espagnol (Español)",
    "language.portuguese.full": "Portugais (Português)",
    "language.italian.full": "Italien (Italiano)",
    "language.dutch.full": "Néerlandais (Nederlands)",
    "language.swedish.full": "Suédois (Svenska)",
    "language.danish.full": "Danois (Dansk)",
    "language.norwegian.full": "Norvégien (Norsk)",
    "language.finnish.full": "Finnois (Suomi)",

    // ============= 2. Page Title & Headers (8 keys) =============
    "missingpieces.page.title": "Générateur de fiches - Pièces manquantes",
    "missingpieces.title": "Pièces manquantes",
    "missingpieces.language.settings": "Paramètres de langue",
    "missingpieces.page.setup": "Mise en page",
    "missingpieces.text.tools": "Outils de texte",
    "missingpieces.puzzle.config": "Configuration du puzzle",
    "missingpieces.image.library": "Bibliothèque d'images",
    "missingpieces.upload.custom": "Téléverser vos images",

    // ============= 3. Page Setup (19 keys) =============
    "missingpieces.select.language": "Sélectionner la langue",
    "missingpieces.language.label": "Langue :",
    "missingpieces.page.size": "Format de page :",
    "page.size.letter.portrait": "Letter Portrait (8,5×11\")",
    "page.size.default": "Fiche standard (800x1000)",
    "page.size.a4.portrait": "A4 Portrait (210×297mm)",
    "page.size.a4.landscape": "A4 Paysage (297×210mm)",
    "page.size.letter.landscape": "Letter Paysage (11×8,5\")",
    "page.size.square": "Carré (1200x1200)",
    "page.size.custom": "Personnalisé",
    "missingpieces.width.label": "Largeur (px) :",
    "missingpieces.height.label": "Hauteur (px) :",
    "missingpieces.page.color": "Couleur de page :",
    "missingpieces.apply.size": "Appliquer le format",
    "missingpieces.background.title": "Arrière-plan",
    "missingpieces.background.theme": "Thème d'arrière-plan :",
    "missingpieces.background.message": "Sélectionnez un thème pour les arrière-plans.",
    "missingpieces.background.opacity": "Opacité de l'arrière-plan :",
    "missingpieces.border.title": "Bordure",
    "missingpieces.border.theme": "Thème de bordure :",
    "missingpieces.border.message": "Sélectionnez un thème pour les bordures.",
    "missingpieces.border.opacity": "Opacité de la bordure :",

    // ============= 4. Text Tools (15 keys) =============
    "missingpieces.text.add.new": "Ajouter un nouveau texte",
    "missingpieces.text.content": "Contenu :",
    "missingpieces.text.placeholder": "Bonjour !",
    "missingpieces.text.add.button": "Ajouter le texte",
    "missingpieces.text.properties": "Propriétés du texte sélectionné",
    "missingpieces.text.color": "Couleur :",
    "missingpieces.text.size": "Taille :",
    "missingpieces.text.font": "Police :",
    "missingpieces.text.outline.color": "Couleur du contour :",
    "missingpieces.text.outline.width": "Épaisseur du contour (0-10) :",
    "missingpieces.text.default": "Nouveau texte",
    "missingpieces.msg.text.added": "Texte ajouté à la fiche.",
    "missingpieces.msg.text.updated": "Propriétés du texte mises à jour.",
    "missingpieces.msg.text.deleted": "Texte supprimé.",
    "missingpieces.msg.form.cleared": "Formulaire effacé.",

    // ============= 5. Puzzle Configuration (9 keys) =============
    "missingpieces.missing.count": "Pièces manquantes (1–5) :",
    "missingpieces.solution.options": "Options de solution (2–6) :",
    "missingpieces.piece.shape": "Forme des pièces :",
    "missingpieces.msg.select.image": "Veuillez d'abord sélectionner une image pour le puzzle.",
    "missingpieces.msg.pieces.range": "Les pièces manquantes doivent être entre 1 et 5.",
    "missingpieces.msg.options.range": "Les options de solution doivent être entre 2 et 6.",
    "missingpieces.msg.pieces.less": "Le nombre de pièces manquantes doit être inférieur aux options de solution.",
    "missingpieces.msg.distinct.pieces": "Impossible de trouver suffisamment de pièces distinctes.",
    "missingpieces.msg.image.failed": "Échec du chargement de l'image sélectionnée.",

    // ============= 6. Shape Options (6 keys) =============
    "shape.square": "Carré",
    "shape.circle": "Cercle",
    "shape.rect.portrait": "Rectangle (Portrait)",
    "shape.rect.landscape": "Rectangle (Paysage)",
    "shape.ellipse.portrait": "Ellipse (Portrait)",
    "shape.ellipse.landscape": "Ellipse (Paysage)",

    // ============= 7. Image Library (7 keys) =============
    "missingpieces.select.theme": "Sélectionner un thème :",
    "missingpieces.search.images": "Rechercher des images :",
    "missingpieces.search.placeholder": "ex. pomme, voiture",
    "missingpieces.available.images": "Images disponibles :",
    "missingpieces.loading.images": "Chargement des images...",
    "missingpieces.selected.image": "Image sélectionnée pour le puzzle :",
    "missingpieces.msg.none.selected": "Aucun élément sélectionné.",

    // ============= 8. Upload Section (4 keys) =============
    "missingpieces.upload.select": "Sélectionner des images à téléverser :",
    "missingpieces.uploaded.images": "Vos images téléversées (cette session) :",
    "missingpieces.uploaded.placeholder": "Vos images téléversées apparaîtront ici.",
    "missingpieces.msg.images.loaded": "{count} image(s) chargée(s).",

    // ============= 9. Font Options (7 keys) =============
    "font.lexend": "Lexend Deca",
    "font.baloo": "Baloo 2",
    "font.nunito": "Nunito",
    "font.quicksand": "Quicksand",
    "font.fredoka": "Fredoka",
    "font.arial": "Arial",
    "font.verdana": "Verdana",

    // ============= 10. Toolbar Actions (20 keys) =============
    "toolbar.layers": "Calques",
    "toolbar.bring.forward": "Avancer",
    "toolbar.send.backward": "Reculer",
    "toolbar.align": "Aligner",
    "toolbar.align.selected": "Aligner la sélection :",
    "toolbar.align.left": "Aligner à gauche",
    "toolbar.center.h": "Centrer horizontalement",
    "toolbar.align.right": "Aligner à droite",
    "toolbar.align.top": "Aligner en haut",
    "toolbar.center.v": "Centrer verticalement",
    "toolbar.align.bottom": "Aligner en bas",
    "toolbar.align.to.page": "Aligner à la page :",
    "toolbar.center.page.h": "Centrer horizontalement sur la page",
    "toolbar.center.page.v": "Centrer verticalement sur la page",
    "toolbar.delete": "Supprimer la sélection",
    "toolbar.msg.aligned": "Objets alignés.",
    "toolbar.msg.layer.changed": "Ordre des calques modifié.",
    "toolbar.msg.deleted": "Objets sélectionnés supprimés.",
    "toolbar.msg.select.first": "Veuillez d'abord sélectionner un objet.",
    "toolbar.msg.nothing.selected": "Aucun objet sélectionné.",

    // ============= 11. Action Buttons (13 keys) =============
    "missingpieces.generate": "Générer",
    "missingpieces.generate.worksheet": "Générer la fiche",
    "missingpieces.generate.answer": "Générer le corrigé",
    "missingpieces.download": "Télécharger",
    "missingpieces.download.worksheet.jpeg": "Fiche (JPEG)",
    "missingpieces.download.answer.jpeg": "Corrigé (JPEG)",
    "missingpieces.download.worksheet.pdf": "Fiche (PDF)",
    "missingpieces.download.answer.pdf": "Corrigé (PDF)",
    "common.grayscale": "Niveaux de gris",
    "missingpieces.clear.all": "Tout effacer",
    "missingpieces.msg.generate.complete": "Puzzle généré avec succès !",
    "missingpieces.msg.cleared": "Tout le contenu a été effacé.",
    "missingpieces.msg.download.ready": "Téléchargement prêt.",

    // ============= 12. Tab Labels (2 keys) =============
    "missingpieces.tab.worksheet": "Fiche d'exercice",
    "missingpieces.tab.answer": "Corrigé",

    // ============= 13. Theme Messages (9 keys) =============
    "missingpieces.themes.all": "Tous les thèmes",
    "missingpieces.msg.themes.error": "Impossible de charger les thèmes.",
    "missingpieces.msg.loading.default": "Chargement du thème par défaut...",
    "missingpieces.msg.type.search": "Tapez pour rechercher dans toutes les images.",
    "missingpieces.msg.searching": "Recherche en cours...",
    "missingpieces.msg.no.images": "Aucune image trouvée{query}",
    "missingpieces.msg.theme.loaded": "Thème chargé avec succès.",
    "missingpieces.msg.search.error": "Erreur lors de la recherche.",
    "missingpieces.msg.loading.theme": "Chargement des images du thème...",

    // ============= 14. Puzzle Generation Messages (10 keys) =============
    "missingpieces.msg.generating": "Génération des données du puzzle...",
    "missingpieces.msg.generation.failed": "Échec de la génération du puzzle. Veuillez vérifier vos sélections.",
    "missingpieces.msg.worksheet.success": "Fiche générée avec succès !",
    "missingpieces.msg.unexpected.error": "Une erreur inattendue s'est produite lors de la génération.",
    "missingpieces.msg.validation.error": "Veuillez vérifier la configuration du puzzle.",
    "missingpieces.msg.processing.image": "Traitement de l'image pour le puzzle...",
    "missingpieces.msg.creating.pieces": "Création des pièces du puzzle...",
    "missingpieces.msg.arranging.solution": "Organisation des options de solution...",
    "missingpieces.msg.finalizing": "Finalisation de la mise en page du puzzle...",
    "missingpieces.msg.ready": "Puzzle prêt pour l'impression.",

    // ============= 15. Answer Key Messages (4 keys) =============
    "missingpieces.msg.generate.first": "Veuillez d'abord générer une fiche.",
    "missingpieces.msg.generating.answer": "Génération du corrigé...",
    "missingpieces.msg.answer.generated": "Corrigé généré !",
    "missingpieces.msg.answer.error": "Une erreur s'est produite lors de la génération du corrigé.",

    // ============= 16. Download & Export Messages (20 keys) =============
    "missingpieces.msg.canvas.empty": "La zone de travail est vide. Générez d'abord du contenu.",
    "missingpieces.msg.preparing.jpeg": "Préparation du JPEG haute qualité... Veuillez patienter.",
    "missingpieces.msg.jpeg.success": "JPEG haute qualité téléchargé !",
    "missingpieces.msg.jpeg.error": "Erreur lors de la préparation du JPEG : {error}",
    "missingpieces.watermark.main": "VERSION GRATUITE - LessonCraftStudio.com",
    "missingpieces.watermark.text": "VERSION GRATUITE",
    "missingpieces.msg.generate.content": "Veuillez d'abord générer du contenu.",
    "missingpieces.msg.preparing.pdf": "Préparation du PDF...",
    "missingpieces.msg.pdf.success": "PDF téléchargé !",
    "missingpieces.msg.pdf.error": "Erreur lors de la création du PDF.",
    "missingpieces.msg.generate.worksheet.first": "Veuillez d'abord générer une fiche.",
    "missingpieces.msg.preparing.jpeg.simple": "Préparation du JPEG...",
    "missingpieces.msg.jpeg.initiated": "Téléchargement JPEG lancé !",
    "missingpieces.msg.jpeg.error.simple": "Erreur lors de la préparation du JPEG.",
    "missingpieces.msg.preparing.pdf.quality": "Préparation du PDF haute qualité... Veuillez patienter.",
    "missingpieces.msg.pdf.quality.success": "PDF haute qualité téléchargé !",
    "missingpieces.msg.pdf.error.detailed": "Erreur lors de la création du PDF : {error}",
    "missingpieces.msg.export.progress": "Progression de l'export : {percent}%",
    "missingpieces.msg.export.complete": "Export terminé.",
    "missingpieces.msg.export.cancelled": "Export annulé.",

    // ============= 17. Common Terms (3 keys) =============
    "common.none": "Aucun",
    "common.loading": "Chargement...",
    "common.error": "Erreur",

    // ============= 18. Placeholders (4 keys) =============
    "placeholder.search": "Rechercher...",
    "placeholder.enter.text": "Entrez votre texte ici",
    "placeholder.custom.width": "Largeur",
    "placeholder.custom.height": "Hauteur",

    // ============= 19. Error Messages (30+ keys) =============
    "error.invalid.dimensions": "Dimensions invalides. Veuillez vérifier la largeur et la hauteur.",
    "error.no.image.selected": "Veuillez sélectionner une image pour le puzzle.",
    "error.no.theme.selected": "Veuillez d'abord sélectionner un thème.",
    "error.upload.failed": "Échec du téléversement. Veuillez réessayer.",
    "error.file.too.large": "Fichier trop volumineux. La taille maximale est de 5MB.",
    "error.invalid.file.type": "Type de fichier invalide. Veuillez téléverser uniquement des images.",
    "error.canvas.creation": "Erreur lors de la création de la zone de travail.",
    "error.export.failed": "Échec de l'export. Veuillez réessayer.",
    "error.network": "Erreur réseau. Veuillez vérifier votre connexion.",
    "error.puzzle.generation": "Impossible de générer le puzzle. Essayez d'autres paramètres.",
    "error.invalid.configuration": "Configuration du puzzle invalide.",
    "error.shape.not.supported": "La forme sélectionnée n'est pas prise en charge.",
    "error.pieces.overlap": "Les pièces se chevauchent. Veuillez ajuster la configuration.",
    "error.solution.conflict": "Les options de solution sont en conflit avec le nombre de pièces manquantes.",
    "error.image.loading": "Erreur lors du chargement de l'image.",
    "error.theme.loading": "Erreur lors du chargement du thème.",
    "error.border.loading": "Erreur lors du chargement de la bordure.",
    "error.background.loading": "Erreur lors du chargement de l'arrière-plan.",
    "error.text.empty": "Veuillez entrer du contenu texte.",
    "error.object.selection": "Veuillez sélectionner un objet à modifier.",
    "error.alignment": "Erreur lors de l'alignement des objets.",
    "error.layer.operation": "Erreur lors du changement d'ordre des calques.",
    "error.delete.operation": "Erreur lors de la suppression des objets.",
    "error.color.invalid": "Valeur de couleur invalide.",
    "error.size.invalid": "Valeur de taille invalide.",
    "error.outline.invalid": "Épaisseur de contour invalide.",
    "error.opacity.invalid": "Valeur d'opacité invalide.",
    "error.theme.not.found": "Thème introuvable.",
    "error.api.connection": "Impossible de se connecter au serveur.",
    "error.session.expired": "Session expirée. Veuillez recharger la page.",
    "error.browser.unsupported": "Votre navigateur n'est pas pris en charge. Utilisez un navigateur moderne.",
    "error.feature.unavailable": "Cette fonctionnalité n'est pas disponible dans la version gratuite."
  }
};

// Helper functions for translation management
function getTranslation(key, locale = 'fr', params = {}) {
  const translation = MISSING_PIECES_FRENCH_TRANSLATIONS[locale]?.[key] ||
                     key;

  // Handle parameter interpolation
  let formattedText = translation;
  for (const [param, value] of Object.entries(params)) {
    formattedText = formattedText.replace(new RegExp(`\\{${param}\\}`, 'g'), value);
  }
  return formattedText;
}

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MISSING_PIECES_FRENCH_TRANSLATIONS;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
  window.MISSING_PIECES_FRENCH_TRANSLATIONS = MISSING_PIECES_FRENCH_TRANSLATIONS;
}