import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Addition Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/addition-worksheets.ts
 * URL: /fr/apps/addition-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/addition.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const additionFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'addition-fiches',
    appId: 'addition',
    title: 'Fiches d\'Addition Gratuites à Imprimer | Générateur Maternelle CP',
    description: 'Créez des fiches d\'addition gratuites avec notre générateur. Parfait pour maternelle, CP et CE1. Téléchargez en PDF haute qualité en moins de 3 minutes.',
    keywords: 'fiches addition, exercices maths, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, addition avec images, générateur fiches, mathématiques maternelle, calcul visuel',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/addition-fiches',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/addition/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche d\'addition gratuite format portrait pour maternelle et CP',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/addition/sample-2.jpeg',
        width: 3508,
        height: 2480,
        caption: 'Fiche d\'addition gratuite format paysage avec exercices maths visuels',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/addition/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche d\'addition gratuite mode image plus nombre pour enfants',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/addition/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche d\'addition gratuite mode trouver l\'addend pour CP',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/addition/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche d\'addition gratuite mode mixte pour exercices maths variés',
      },
    ],
  },

  // Hero Section - FULL text from addition.md paragraphs 1-4
  hero: {
    title: 'Générateur de Fiches d\'Addition Gratuit',
    subtitle: 'Fiches à Imprimer Gratuit pour la Maternelle et le CP',
    description: `Créez des fiches d'addition professionnelles avec notre générateur d'exercices maths. Votre abonnement Pack Essentiel à 144€ par an vous donne un accès illimité sans frais supplémentaires par fiche. Générez des fiches à imprimer gratuit parfaitement adaptées aux élèves de maternelle, CP et CE1. Téléchargez des PDF haute qualité en moins de trois minutes.

Notre créateur de fiches d'addition utilise des images colorées pour enseigner les concepts mathématiques fondamentaux. Les jeunes élèves comptent des objets visuels avant d'écrire leurs réponses. Choisissez parmi quatre modes d'exercices différents. Le mode image plus image montre des dessins pour les deux nombres. Le mode image plus nombre combine images et chiffres. Le mode trouver l'addend crée des problèmes à trous. Le mode mixte mélange différents types sur une même fiche.

Les fiches maternelle deviennent des outils pédagogiques attrayants avec notre générateur. Chaque fiche inclut automatiquement une fiche de correction pour gagner du temps de vérification. Configurez de 1 à 10 problèmes par page selon le niveau des élèves. Ajustez les nombres minimum et maximum pour contrôler la difficulté. Les exercices CP et exercices CE1 s'adaptent parfaitement aux programmes officiels français.`,
    previewImageSrc: '/samples/french/addition/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/french/addition/
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
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Features Grid - FULL text from addition.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de fiches d\'addition inclut sept fonctionnalités puissantes pour créer des fiches maternelle et des exercices CP de qualité professionnelle. Votre abonnement Pack Essentiel vous donne accès à toutes les fonctionnalités avec création illimitée.',
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

  // How-To Guide - FULL text from addition.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créer des fiches d\'addition professionnelles prend moins de trois minutes avec notre générateur. Suivez ces cinq étapes simples pour produire des fiches maternelle et des exercices CP de qualité. Aucune expérience en design requise.',
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
        title: 'Sélectionnez les Images',
        description: `Commencez par choisir les images pour vos exercices maths. Parcourez plus de 3000 images adaptées aux enfants organisées par thème. Cliquez sur n'importe quel thème pour voir toutes les images disponibles. Sélectionnez les animaux pour des fiches d'addition sur le thème du zoo. Choisissez les images de nourriture pour des activités mathématiques sur la nutrition. Prenez les images saisonnières pour des fiches maternelle sur les fêtes.

Recherchez des images spécifiques en utilisant la barre de recherche par mot-clé. Tapez « pomme » pour trouver les images de fruits. Cherchez « voiture » pour les illustrations de véhicules. Filtrez les résultats pour trouver exactement ce dont vous avez besoin. Cliquez sur les images individuelles pour les sélectionner. Les images sélectionnées apparaissent avec une bordure de mise en évidence.

Téléversez vos propres images personnalisées pour des exercices maths uniques. Cliquez sur le bouton de téléversement et sélectionnez des fichiers images. Utilisez des photos de classe ou des images spécifiques au programme. Combinez les images téléversées avec les images de la bibliothèque sur la même fiche.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configurez les Paramètres',
        description: `Choisissez votre taille et orientation de page. Sélectionnez Lettre Portrait pour les fiches françaises standard. Prenez A4 Portrait pour l'impression aux normes européennes. Utilisez le mode Paysage pour des mises en page de problèmes plus larges. Le format Carré fonctionne parfaitement pour les affichages numériques.

Définissez le nombre de problèmes d'addition par fiche. Choisissez de 1 à 10 problèmes selon les capacités des élèves. Moins de problèmes conviennent mieux aux élèves de maternelle. Plus de problèmes challengent les apprenants de CP et CE1. Ajustez le nombre de problèmes pour correspondre au temps de travail disponible.

Configurez les éléments minimum et maximum par groupe. Définissez les deux sur de petits nombres pour l'addition débutante. Utilisez des plages plus larges pour les exercices CE1 avancés. Le générateur crée des problèmes aléatoires dans votre plage spécifiée. Sélectionnez votre mode d'exercice parmi quatre options.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générez la Fiche',
        description: `Cliquez sur le bouton Générer pour créer vos fiches d'addition. Le générateur construit les problèmes en quelques secondes. Des faits d'addition aléatoires apparaissent dans vos plages spécifiées. Des images colorées se placent selon vos sélections. La fiche complète apparaît instantanément sur le canevas. Pas d'attente ni de délais de traitement. L'aperçu montre exactement ce que les élèves verront.

Les problèmes s'arrangent automatiquement avec un espacement optimal. Le générateur calcule la mise en page selon la taille de page. Plus de problèmes créent un espacement plus serré. Moins de problèmes s'étalent pour une lecture plus facile. Les numéros d'exercices apparaissent sur la gauche. Les groupes d'images s'affichent avec des signes plus entre eux.

Régénérez si vous voulez des problèmes différents. Cliquez à nouveau sur Générer pour de nouveaux faits d'addition aléatoires. Les images changent à chaque génération. La fiche de correction se génère simultanément avec chaque fiche.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Personnalisez le Contenu',
        description: `Personnalisez chaque élément de vos fiches d'addition en utilisant les outils d'édition du canevas. Cliquez sur n'importe quel objet pour le sélectionner. Faites glisser les objets sélectionnés vers de nouvelles positions. Redimensionnez les images en tirant les poignées de coin. Faites pivoter les objets en faisant glisser la poignée de rotation.

Ajoutez du texte personnalisé n'importe où sur vos exercices maths. Cliquez sur le bouton Ajouter du Texte et tapez votre contenu. Créez des instructions pour les élèves. Ajoutez des noms d'enseignants ou des numéros de classe. Incluez des messages de motivation ou des thèmes. Personnalisez les fiches maternelle pour des élèves individuels.

Formatez le texte en utilisant le panneau de propriétés du texte. Choisissez parmi sept polices professionnelles. Ajustez la taille de petite à grande. Changez les couleurs pour correspondre aux thèmes de la classe. Les boutons Annuler et Rétablir corrigent les erreurs instantanément.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez et Imprimez',
        description: `Téléchargez vos fiches d'addition terminées comme imprimables professionnels. Choisissez le format PDF pour une impression nette et un partage facile. Sélectionnez le format JPEG pour une compatibilité maximale. Les deux formats s'exportent en haute résolution 300 DPI. Qualité parfaite pour l'impression en classe et les ventes commerciales.

Cliquez sur le menu déroulant Télécharger pour voir toutes les options. Télécharger Fiche (PDF) crée un document imprimable. Télécharger Fiche de Correction (PDF) sauvegarde les solutions séparément. Les options JPEG fonctionnent de la même manière. Téléchargez les deux versions pour créer des packs complets.

Activez le mode niveaux de gris avant de télécharger pour économiser l'encre. La case à cocher convertit toutes les couleurs en noir et blanc. Les images restent claires et reconnaissables. Parfait pour les écoles avec des contraintes budgétaires.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from addition.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Les fiches d\'addition bénéficient à de multiples contextes éducatifs. Les enseignants de maternelle utilisent les images visuelles pour introduire les concepts de comptage. Les professeurs de CP et CE1 renforcent les faits d\'addition avec une pratique répétée.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from addition.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Questions fréquentes sur notre générateur de fiches d\'addition et nos fiches à imprimer gratuit.',
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
    sectionDescription: 'Créez des paquets d\'apprentissage complets en combinant les fiches d\'addition avec ces générateurs complémentaires.',
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

export default additionFrContent;
