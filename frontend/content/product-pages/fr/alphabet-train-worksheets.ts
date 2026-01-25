import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Alphabet Train Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/alphabet-train-worksheets.ts
 * URL: /fr/apps/train-alphabet-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/alphabet-train.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const alphabetTrainFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'train-alphabet-fiches',
    appId: 'alphabet-train',
    title: 'Fiches Alphabet à Imprimer Gratuit | Générateur Train Alphabet',
    description: 'Créez des fiches alphabet professionnelles avec notre générateur de train alphabet. Téléchargez vos fiches maternelle en PDF haute qualité en moins de 3.',
    keywords: 'fiches alphabet, fiches maternelle, apprendre les lettres, fiches à imprimer gratuit, exercices CP, exercices CE1, train alphabet, générateur fiches, graphisme maternelle, coloriage à imprimer',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/train-alphabet-fiches',
      },

  // Hero Section - FULL text from alphabet-train.md paragraphs 1-5
  hero: {
    title: 'Générateur de Fiches Alphabet Gratuit',
    subtitle: 'Fiches à Imprimer Gratuit pour la Maternelle et le CP',
    description: `Créez des fiches alphabet professionnelles avec notre générateur de train alphabet multilingue. Votre abonnement Pack Essentiel vous offre une création illimitée de fiches maternelle. Générez des fiches à imprimer gratuit personnalisées en onze langues. Téléchargez vos fiches alphabet en PDF haute qualité en moins de trois minutes.

Notre générateur de train alphabet prend en charge onze alphabets complets avec les caractères appropriés. Les fiches alphabet allemandes incluent Ä, Ö et Ü aux positions correctes. Les fiches alphabet espagnoles incluent Ñ après N. Les fiches suédoises, danoises et norvégiennes comprennent Æ, Ø et Å. Les fiches finlandaises incluent Ä et Ö à la fin.

La bibliothèque d'images s'adapte automatiquement à la langue sélectionnée. Choisissez l'allemand et voyez les images étiquetées en allemand. Choisissez l'espagnol et voyez les images étiquetées en espagnol. Plus de 3000 images traduites dans les onze langues. Cela rend nos fiches alphabet parfaites pour l'apprentissage des langues en maternelle et en CP.

Chaque fiche alphabet présente un modèle de train coloré avec onze wagons. Les élèves associent les lettres aux images sur le train. Le design du train rend l'apprentissage de l'alphabet amusant et engageant. Parfait pour les fiches maternelle, les exercices CP et les exercices CE1.`,
    previewImageSrc: '/samples/french/alphabet-train/sample-1.jpeg',
    ctaLabels: {
      tryFree: 'Essayer Gratuitement',
      viewSamples: 'Voir les Exemples',
    },
    trustBadges: {
      languages: '11 Langues',
      images: '3000+ Images',
      license: 'Licence Commerciale',
    },
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    floatingStats: {
      time: '3 min',
      action: 'Créer & Télécharger',
      quality: '300 DPI',
    },
  },

  // Sample Gallery - REAL file paths from samples/english/alphabet train/
  samples: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiches Gratuites et Imprimables Gratuits',
    sectionDescription: 'Téléchargez imprimables gratuits - Fiche gratuite pour enfants de qualité professionnelle. Fiches gratuites et fiche pour enfants parfaites pour fiche pour maternelle. Fiche gratuite pour enfants et fiches gratuites inclus matériel éducatif. Fiche gratuite et fiches gratuites disponible',
    downloadLabel: 'Télécharger Exemple Gratuit',
    worksheetLabel: 'Fiche',
    answerKeyLabel: 'Corrigé',
    viewAllLabel: 'Agrandir',
    noPdfLabel: 'Aperçu uniquement',
    freePdfCountLabel: 'téléchargements gratuits',
    badgeText: 'Exemples Gratuits',
    downloadingLabel: 'Téléchargement...',
    ofLabel: 'sur',
    items: [],
    
  },

  // Features Grid - FULL text from alphabet-train.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de train alphabet comprend des fonctionnalités puissantes conçues spécifiquement pour l\'éducation en maternelle. Créez des fiches alphabet professionnelles plus rapidement qu\'avec les méthodes traditionnelles. Les enseignants économisent trente à soixante minutes par fiche comparé à la création manuelle.',
    highlightBadgeText: 'Fonctionnalité Clé',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    badgeText: 'Fonctionnalités',
    trustBadges: {
      allFeatures: 'Toutes les fonctionnalités incluses',
      noHiddenFees: 'Aucun frais caché',
      cancelAnytime: 'Résiliez à tout moment',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from alphabet-train.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créer des fiches alphabet professionnelles prend moins de trois minutes du début à la fin. Ce guide étape par étape montre exactement comment générer des fiches personnalisées pour votre classe. Aucune expérience en design n\'est nécessaire.',
    ctaText: 'Commencer Maintenant',
    badgeText: 'Comment Ça Marche',
    stepLabel: 'Étape',
    completionTitle: 'Terminé !',
    completionSubtitle: 'Votre fiche est prête',
    readyTime: 'Prêt en moins de 3 minutes',
    noSkillsNeeded: 'Aucune compétence en design requise',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    steps: [
      {
        id: '1',
        number: 1,
        title: 'Choisissez Votre Langue et Sélectionnez Onze Lettres',
        description: `Commencez par sélectionner la langue souhaitée dans le menu déroulant. Choisissez parmi l'anglais, l'allemand, le français, l'espagnol, le portugais, l'italien, le néerlandais, le suédois, le danois, le norvégien ou le finnois. La grille alphabétique se met à jour instantanément pour afficher les lettres correctes de la langue sélectionnée.

Cliquez sur exactement onze lettres de l'alphabet affiché pour construire votre fiche. Le compteur de lettres montre votre progression vers l'exigence de onze lettres. Les lettres sélectionnées se mettent en surbrillance bleue pour que vous sachiez toujours lesquelles vous avez choisies.

Choisissez des lettres consécutives comme A à K pour des fiches alphabet séquentielles. Sélectionnez des lettres aléatoires pour des fiches de révision mixte. Pour une création plus rapide, activez la case création automatique.`,
        icon: '🔤',
      },
      {
        id: '2',
        number: 2,
        title: 'Associez les Images aux Lettres',
        description: `Après avoir sélectionné onze lettres, associez une image à chaque lettre pour votre fiche alphabet. Choisissez un thème dans le menu déroulant pour voir des collections d'images organisées. Sélectionnez le thème animaux pour des fiches alphabet de la ferme et du zoo.

Cliquez sur n'importe quelle image dans le panneau dictionnaire pour la prévisualiser. La boîte de prévisualisation montre l'image sélectionnée en grand avant l'association. Le système associe automatiquement les images aux lettres basé sur la première lettre du nom de l'image.

Recherchez des images spécifiques en utilisant la boîte de recherche pour des fiches alphabet personnalisées. Téléchargez vos propres images pour personnaliser les fiches alphabet pour votre classe.`,
        icon: '🖼️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générez Votre Fiche Alphabet en Quelques Secondes',
        description: `Cliquez sur le bouton Créer dans le menu déroulant de l'en-tête une fois que les onze lettres ont des images. Le système génère votre fiche alphabet complète en moins de trois secondes. Un train coloré apparaît avec onze wagons montrant vos lettres et images sélectionnées.

L'onglet fiche de travail affiche votre fiche alphabet principale prête pour l'utilisation par les élèves. Des blocs de lettres apparaissent en bas de la page pour l'activité de découpage et collage. Ajustez le paramètre du nombre d'indices pour changer la difficulté de la fiche.

Activez la case nom et date pour ajouter des champs d'information élève aux fiches alphabet. Générez le corrigé après avoir créé votre fiche en utilisant la deuxième option du menu déroulant.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Personnalisez le Contenu sur le Canevas',
        description: `Chaque élément de votre fiche alphabet générée est entièrement modifiable sur le canevas. Cliquez sur n'importe quelle lettre pour la sélectionner et la déplacer, la faire pivoter ou la redimensionner. Faites glisser les images vers de nouvelles positions sur vos fiches.

Ajoutez du texte personnalisé n'importe où sur vos fiches maternelle en utilisant le panneau d'outils texte. Tapez un titre comme « Mon Train Alphabet » ou « Pratique de Correspondance de Lettres ». Choisissez parmi sept polices professionnelles pour vos fiches.

Utilisez la barre d'outils contextuelle pour superposer les éléments et aligner les objets. Le bouton annuler inverse tous les changements que vous regrettez sur vos fiches alphabet.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez et Imprimez Vos Fiches Alphabet',
        description: `Cliquez sur le bouton déroulant de téléchargement pour voir toutes les options d'exportation pour votre fiche alphabet. Choisissez le format JPEG pour un partage rapide par email de vos fiches. Sélectionnez le format PDF pour une impression de la plus haute qualité. Les deux formats s'exportent en résolution professionnelle 300 DPI.

Téléchargez d'abord la version fiche de travail pour que vos élèves la complètent. Téléchargez ensuite la version corrigé pour vos matériaux de référence enseignant. Activez le basculement niveaux de gris avant de télécharger pour économiser l'encre d'imprimante.

Imprimez votre fiche alphabet immédiatement ou sauvegardez-la pour une utilisation ultérieure. Partagez vos fiches avec les membres de votre équipe enseignante par email ou stockage cloud.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from alphabet-train.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Les fiches alphabet servent des environnements éducatifs divers et des situations d\'enseignement variées à tous les niveaux. Les enseignants de maternelle utilisent les fiches alphabet pour l\'instruction quotidienne en littératie. Les parents en instruction à domicile comptent sur les fiches pour un apprentissage structuré à la maison.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from alphabet-train.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Questions fréquentes sur notre générateur de fiches alphabet et nos fiches à imprimer gratuit.',
    showMoreText: 'Voir plus de questions',
    showLessText: 'Voir moins',
    badgeText: 'FAQ',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Résiliez à tout moment',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing
  pricing: {
    title: 'Pack Essentiel',
    price: '144€',
    priceInterval: '/an',
    priceSuffix: 'Facturation annuelle',
    benefits: [
      'Création de fiches illimitée',
      'Licence commerciale incluse',
      '11 langues supportées',
      '3000+ images thématiques',
      'Qualité d\'impression 300 DPI',
      'Corrigés inclus',
    ],
    ctaText: 'Commencer Maintenant',
    bundleDescription: 'Votre abonnement inclut l\'acces a 10 generateurs de fiches:',
    bundleApps: [
      'Addition Images',
      'Train Alphabet',
      'Coloriages',
      'Fiches de Maths',
      'Mots Melanges',
      'Cherche et Compte',
      'Jeu d\'Association',
      'Tracer des Lignes',
      'Bingo Images',
      'Sudoku',
    ],
  },

  // Related Apps
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Créez des paquets d\'apprentissage complets en combinant les fiches alphabet avec ces générateurs complémentaires.',
    ctaTitle: 'Prêt à Créer des Fiches Fantastiques ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches professionnelles. Génération illimitée, licence commerciale incluse.',
    primaryCtaText: 'Commencer l\'Essai Gratuit',
    secondaryCtaText: 'Voir les 33 Applications',
    badgeText: 'Fonctionne Parfaitement Avec',
    exploreText: 'Explorer toutes les applications',
    trustBadges: {
      securePayment: 'Paiement sécurisé',
      cancelAnytime: 'Résiliez à tout moment',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },
};

export default alphabetTrainFrContent;
