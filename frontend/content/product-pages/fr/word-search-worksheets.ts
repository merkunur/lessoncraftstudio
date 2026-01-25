import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Search Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/word-search-worksheets.ts
 * URL: /fr/apps/mots-caches-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/wordsearch.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordSearchFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'mots-caches-fiches',
    appId: 'wordsearch',
    title: 'Mots Mêlés Fiches Gratuites | Générateur Maternelle CP - LessonCraft',
    description: 'Créez des mots mêlés professionnels en 3 clics. Fiches gratuites maternelle et CP à imprimer. 3000+ images, 11 langues. Téléchargez en PDF 300 DPI maintenant.',
    keywords: 'mots mêlés, générateur mots cachés, fiches maternelle, fiches à imprimer gratuit, exercices CP, apprendre à lire, alphabet, graphisme maternelle, tables de multiplication, coloriage à imprimer',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/mots-caches-fiches',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/wordsearch/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Mots mêlés fiches gratuites - puzzle vocabulaire format portrait pour maternelle'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/wordsearch/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Générateur mots mêlés - fiche gratuite avec images thématiques pour CP'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/wordsearch/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Mots cachés fiches pour enfants - grille de lettres éducative pour CE1'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/wordsearch/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiches vocabulaire mots mêlés - puzzle recherche de mots pour primaire'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/wordsearch/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Jeu de mots fiches gratuites - activité vocabulaire personnalisable pour classe'
      }
    ],
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-4
  hero: {
    title: 'Générateur de Mots Mêlés Gratuit',
    subtitle: 'Fiches à Imprimer Gratuit pour la Maternelle et le CP',
    description: `Créez des mots mêlés professionnels en quelques secondes avec notre générateur de fiches maternelle. Votre abonnement Pack Essentiel à 144€ par an vous donne un accès illimité sans filigrane. Parfait pour les enseignants de maternelle, les professeurs de CP et CE1, et les parents en instruction à domicile. Générez des puzzles de mots cachés personnalisés avec des images ou des mots en trois clics seulement. La version gratuite permet de tester l'outil avec un filigrane pour un usage personnel.

Notre outil de création de mots mêlés aide à concevoir des activités d'apprentissage captivantes pour les jeunes élèves. Choisissez parmi plus de 3000 images adaptées aux enfants et organisées par thème. Chaque fiche de mots mêlés se télécharge en PDF ou JPEG haute qualité à 300 DPI. Vos élèves adoreront chercher les mots cachés associés à des images colorées. Les fiches maternelle deviennent des outils pédagogiques professionnels. Les exercices CP et CE1 gagnent en attrait avec des visuels engageants.

Ce générateur de mots mêlés fonctionne en 11 langues complètes. Français, anglais, allemand, espagnol, portugais, italien, néerlandais, danois, suédois, norvégien et finnois. Sélectionnez un thème comme les animaux, les transports ou les fruits. L'application crée un puzzle complet avec sa fiche de correction automatique. Modifiez tout sur le canevas avant le téléchargement. Ajoutez du texte personnalisé avec différentes polices. Changez les couleurs et les arrière-plans. Téléversez vos propres images pour des fiches à imprimer gratuit personnalisées.`,
    previewImageSrc: '/samples/french/wordsearch/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
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
    items: [
      {
        id: 'sample-1',
        worksheetSrc: '/samples/french/wordsearch/sample-1.jpeg',
        answerKeySrc: '/samples/french/wordsearch/sample-1.jpeg',
        altText: 'Mots mêlés fiches gratuites - puzzle vocabulaire format portrait pour maternelle',
        imageTitle: 'Mots mêlés fiches gratuites',
      },
      {
        id: 'sample-2',
        worksheetSrc: '/samples/french/wordsearch/sample-2.jpeg',
        answerKeySrc: '/samples/french/wordsearch/sample-2.jpeg',
        altText: 'Générateur mots mêlés - fiche gratuite avec images thématiques pour CP',
        imageTitle: 'Générateur mots mêlés',
      },
      {
        id: 'sample-3',
        worksheetSrc: '/samples/french/wordsearch/sample-3.jpeg',
        answerKeySrc: '/samples/french/wordsearch/sample-3.jpeg',
        altText: 'Mots cachés fiches pour enfants - grille de lettres éducative pour CE1',
        imageTitle: 'Mots cachés fiches pour enfants',
      },
      {
        id: 'sample-4',
        worksheetSrc: '/samples/french/wordsearch/sample-4.jpeg',
        answerKeySrc: '/samples/french/wordsearch/sample-4.jpeg',
        altText: 'Fiches vocabulaire mots mêlés - puzzle recherche de mots pour primaire',
        imageTitle: 'Fiches vocabulaire mots mêlés',
      },
      {
        id: 'sample-5',
        worksheetSrc: '/samples/french/wordsearch/sample-5.jpeg',
        answerKeySrc: '/samples/french/wordsearch/sample-5.jpeg',
        altText: 'Jeu de mots fiches gratuites - activité vocabulaire personnalisable pour classe',
        imageTitle: 'Jeu de mots fiches gratuites',
      },
    ],
    
  },

  // Features Grid - FULL text from wordsearch.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de mots mêlés inclut toutes les fonctionnalités dont vous avez besoin. Créez des fiches à imprimer gratuit pour la maternelle et le CP. Le générateur est parfait pour créer des exercices de mathématiques et des fiches de vocabulaire.',
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

  // How-To Guide - FULL text from wordsearch.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créez des puzzles de mots mêlés professionnels en moins de trois minutes au total. Suivez ces cinq étapes simples pour générer des fiches maternelle professionnelles. Aucune expérience en design requise. Sélectionnez simplement des images, personnalisez les paramètres et téléchargez.',
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
        title: 'Choisissez Votre Contenu',
        description: `Commencez par sélectionner des images pour votre puzzle de mots mêlés. Trois méthodes vous offrent une flexibilité complète. Choisissez un thème aléatoire pour une génération instantanée de fiches. Parcourez la bibliothèque de plus de 3000 images pour des photos spécifiques. Téléversez vos propres images pour des fiches maternelle personnalisées. Chaque méthode produit des résultats professionnels. Les enseignants alternent entre les méthodes selon les besoins de leurs leçons.

L'option thème aléatoire crée des fiches en quelques secondes. Cliquez sur le menu déroulant. Sélectionnez « Utiliser un thème aléatoire » et cliquez sur générer. L'application choisit automatiquement un thème. Parfait pour les plans de remplacement d'urgence ou les activités de dernière minute. Vous obtenez une fiche de mots mêlés complète sans aucune décision. Les thèmes aléatoires fonctionnent bien pour la pratique générale du vocabulaire.

La sélection individuelle d'images vous donne un contrôle précis. Ouvrez le panneau de la bibliothèque d'images. Choisissez une catégorie thématique pour filtrer les images. Animaux, transports, nourriture, fournitures scolaires et des dizaines d'autres thèmes disponibles. Recherchez par mot-clé pour trouver des images spécifiques. Sélectionnez jusqu'à huit images en cliquant sur chacune. Cette méthode crée des fiches pour apprendre à lire ciblées et du matériel spécifique au vocabulaire.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Personnalisez les Paramètres',
        description: `Configurez vos paramètres de mots mêlés avant de générer. La taille de la grille détermine la difficulté du puzzle. Les grilles plus petites conviennent aux fiches maternelle. Les grilles plus grandes challengent les élèves de CP et CE1. Ajustez les lignes et les colonnes indépendamment. Définissez n'importe quelle taille de 5x5 à 30x30 cases. L'application mémorise vos paramètres préférés pour les futures fiches.

Choisissez les options de direction du puzzle pour contrôler la difficulté. Activez les mots en diagonale pour plus de défi. Autorisez les mots inversés pour augmenter la complexité. Désactivez les deux options pour les lecteurs débutants. Ces paramètres créent des fiches de graphisme maternelle et des exercices adaptés à l'âge. Les enseignants de maternelle désactivent généralement la diagonale et l'inversion. Les professeurs de CP et CE1 activent la diagonale pour les élèves avancés.

Sélectionnez votre format et taille de page. Le format A4 portrait est idéal pour les écoles utilisant des standards européens. L'orientation paysage offre des grilles de puzzle plus larges. Les dimensions personnalisées s'adaptent aux besoins d'impression spéciaux. Le paramètre de taille de page affecte l'impression de votre fiche de mots mêlés.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générez',
        description: `Cliquez sur le bouton générer pour créer votre fiche de mots mêlés. L'application construit votre puzzle en quelques secondes. Regardez les images apparaître sur le canevas. La liste de mots se génère automatiquement. Chaque élément se positionne parfaitement sur la page. Vous voyez la fiche complète immédiatement. Pas d'attente ni de délais de traitement. L'aperçu montre exactement ce que les élèves verront.

L'algorithme de mots mêlés place les mots intelligemment. Les mots ne se chevauchent jamais de manière confuse. La grille se remplit de lettres aléatoires autour des mots cachés. La distribution des lettres semble naturelle et équilibrée. Les élèves obtiennent un puzzle de mots mêlés propre et professionnel. L'algorithme fonctionne de la même manière que vous choisissiez trois images ou huit mots.

La génération de la fiche de correction se fait automatiquement. L'application sait où se cache chaque mot. Cliquez sur l'onglet fiche de correction pour voir la solution. Les mots cachés apparaissent surlignés en différentes couleurs. Chaque mot utilise une couleur unique pour plus de clarté. Les enseignants peuvent vérifier la difficulté du puzzle avant d'imprimer. La fiche de correction aide à assister les élèves en difficulté.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Modifiez',
        description: `Cliquez sur n'importe quel élément pour le modifier directement sur le canevas. Le texte devient modifiable en un clic. Changez la famille de police parmi sept options disponibles. Ajustez la taille du texte avec le contrôle de curseur. Choisissez de nouvelles couleurs pour les lettres et les mots. Ajoutez un contour au texte pour une meilleure lisibilité. Chaque propriété de texte s'ajuste en temps réel. Regardez vos modifications se mettre à jour instantanément sur la fiche.

Faites glisser les éléments vers de nouvelles positions n'importe où sur la page. Déplacez la grille de mots mêlés plus haut ou plus bas. Repositionnez la liste de mots sur le côté. Faites glisser les images individuelles vers de meilleurs emplacements. Cliquez et maintenez pour déplacer n'importe quel objet. Tout se met en place en douceur. Le canevas mémorise chaque changement de position. Créez des mises en page uniques pour vos fiches d'alphabet et fiches d'écriture.

Redimensionnez les images et les éléments avec les poignées de coin. Cliquez sur une image pour la sélectionner. Faites glisser les poignées de coin pour l'agrandir ou la réduire. Maintenez Shift pour conserver les proportions. Redimensionnez toute la grille de mots mêlés plus grande ou plus petite. Ajustez la taille du texte de la liste de mots. Chaque élément se redimensionne précisément selon vos spécifications.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez',
        description: `Téléchargez votre fiche de mots mêlés terminée dans deux formats. Le format PDF préserve la mise en page et la qualité exactes. Le JPEG fonctionne pour le partage rapide et la publication web. Les deux formats s'exportent en résolution professionnelle 300 DPI. Vos fiches imprimées sont cristallines sur n'importe quelle imprimante. Choisissez le format qui correspond à vos besoins d'utilisation.

Cliquez sur le menu déroulant de téléchargement pour voir toutes les options. Téléchargez la fiche principale en JPEG pour une impression immédiate. Enregistrez la fiche en PDF pour une qualité d'archivage. Téléchargez la fiche de correction en JPEG pour référence de l'enseignant. Enregistrez la fiche de correction en PDF pour une impression professionnelle. Toutes les options de téléchargement maintiennent une qualité parfaite. Vous obtenez quatre fichiers d'une seule session de création.

Activez le mode niveaux de gris avant de télécharger pour économiser l'encre. La case à cocher convertit tout en noir et blanc. L'impression en niveaux de gris réduit drastiquement les coûts d'encre. Parfait pour les écoles avec des budgets d'impression limités. La conversion maintient la lisibilité tout en éliminant l'utilisation d'encre couleur. Vos exercices CE1 s'impriment clairement en niveaux de gris.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Le générateur de mots mêlés est parfait pour tous ceux qui enseignent aux enfants. Les enseignants de maternelle et du primaire l\'utilisent quotidiennement. Les parents en instruction à domicile créent des fiches à imprimer gratuit pour leurs enfants. Les enseignants spécialisés créent des fiches adaptées aux différents besoins.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from wordsearch.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Questions fréquentes sur notre générateur de mots mêlés et nos fiches à imprimer gratuit.',
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
    sectionDescription: 'Créez des paquets d\'apprentissage complets en combinant les fiches de mots mêlés avec ces générateurs complémentaires.',
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

export default wordSearchFrContent;
