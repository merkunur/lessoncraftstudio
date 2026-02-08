import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find and Count Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/find-and-count-worksheets.ts
 * URL: /fr/apps/cherche-et-compte-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/find-and-count.md
 * App ID: find-and-count (I Spy counting worksheets)
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const findAndCountFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'cherche-et-compte-fiches',
    appId: 'find-and-count',
    title: 'Fiches Cherche et Compte à Imprimer Gratuit | Fiches Gratuites',
    description: 'Créez des fiches cherche et compte personnalisées avec 3000+ images. Générateur maternelle CP gratuit en PDF 300 DPI. Parfait pour enseignants et parents.',
    keywords: 'fiches cherche et compte, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, graphisme maternelle, coloriage à imprimer, apprendre à compter, dénombrement, générateur fiches',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/cherche-et-compte-fiches',
      },

  // Hero Section - FULL text from find-and-count.md paragraphs 1-4
  hero: {
    title: 'Fiches Cherche et Compte',
    subtitle: 'Générateur de Fiches Maternelle et Exercices CP',
    description: `Créez des fiches de cherche et compte personnalisées avec notre générateur professionnel. Votre abonnement Pack Essentiel vous donne accès à la création illimitée de fiches à imprimer gratuit sans frais supplémentaires par fiche. Téléchargez des PDF haute qualité en moins de 3 minutes. Parfait pour les enseignants de maternelle et les parents qui font l'école à la maison.

Les activités de cherche et compte captivent les jeunes enfants. Ce type d'exercice développe l'attention visuelle et les compétences de dénombrement. Notre générateur de fiches maternelle simplifie la création de ces supports pédagogiques. Vous choisissez les images, le générateur remplit la grille automatiquement.

Le dénombrement constitue une compétence fondamentale en mathématiques. Nos fiches à imprimer gratuit transforment cet apprentissage en jeu. Les enfants adorent chercher et compter des objets cachés dans une grille colorée. Chaque fiche devient une aventure visuelle qui renforce les exercices maths de façon ludique.

Combinez le cherche et compte avec des activités de graphisme maternelle. Nos fiches s'intègrent parfaitement dans une séquence pédagogique complète. Après avoir compté les objets, les élèves peuvent colorier les éléments trouvés. Cette approche multi-sensorielle renforce l'apprentissage. Le coloriage à imprimer développe également la motricité fine.`,
    previewImageSrc: '/samples/french/find-and-count/sample-1.jpeg',
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
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Découvrir en vidéo',
        modalTitle: 'Aperçu des fonctionnalités',
      },
      appSpecific: {
        videoId: '0cOPi7eajLs',
        buttonText: 'Fonctions Cherche et Compte',
        modalTitle: 'Tutoriel Cherche et Compte',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/find and count/
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

  // Features Grid - FULL text from find-and-count.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de cherche et compte offre toutes les fonctionnalités nécessaires pour créer des fiches pédagogiques professionnelles. Chaque outil a été conçu pour simplifier votre travail. Découvrez comment créer des fiches maternelle exceptionnelles en quelques clics.',
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

  // How-To Guide - FULL text from find-and-count.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créer des fiches de cherche et compte ne prend que quelques minutes. Notre générateur simplifie chaque étape du processus. Suivez ce guide pour produire vos premières fiches maternelle professionnelles. Aucune expérience technique nécessaire.',
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
        title: 'Choisir Votre Thème',
        description: `Commencez par sélectionner un thème dans la bibliothèque. Animaux de la ferme pour les fiches à imprimer gratuit sur la nature. Fruits et légumes pour les exercices de vocabulaire. Véhicules pour captiver les garçons. Fournitures scolaires pour la rentrée. Chaque thème contient des dizaines d'images adaptées aux enfants.

Dans le thème choisi, sélectionnez 1 à 4 images différentes. Ces images deviendront les objets à chercher et compter. Pour les exercices maths, choisissez des quantités variées. Le calcul devient concret avec des objets familiers. Les fiches maternelle gagnent en pertinence pédagogique. Cliquez sur chaque image pour la sélectionner.

Téléversez vos propres images personnalisées pour des fiches uniques. Cliquez sur le bouton de téléversement et sélectionnez des fichiers images. Choisissez plusieurs fichiers pour téléverser plusieurs images simultanément.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configurer la Grille',
        description: `Ajustez les dimensions de la grille selon l'âge des élèves. Grille 5x5 pour les plus jeunes en maternelle. Grille 7x7 pour les exercices CP intermédiaires. Grille 10x10 pour les défis avancés. Plus la grille est grande, plus le défi augmente. Parfait pour apprendre à lire les nombres en contexte visuel.

Choisissez le format de page adapté à votre imprimante. A4 portrait pour les fiches standard françaises. Letter pour les formats américains. Format carré pour les activités spéciales. Sélectionnez une couleur de fond ou un arrière-plan thématique. Ajoutez une bordure décorative pour le coloriage à imprimer.

Définissez le nombre d'objets à chercher selon les capacités des élèves. Moins d'objets conviennent mieux aux élèves de maternelle qui découvrent le dénombrement. Plus d'objets challengent les apprenants de CP et CE1.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générer la Fiche',
        description: `Cliquez sur le bouton "Créer" pour générer votre fiche. Le générateur place automatiquement les images dans la grille. Les objets sélectionnés apparaissent plusieurs fois de façon aléatoire. D'autres images du thème complètent la grille. Les exercices CE1 prennent forme instantanément. Utilisez cette méthode pour introduire les tables de multiplication visuellement.

Les fiches s'arrangent automatiquement avec un espacement optimal. Le générateur calcule la mise en page selon la taille de page. L'aperçu montre exactement ce que les élèves verront. Pas d'attente ni de délais de traitement.

Personnalisez les questions de comptage sous la grille. Chaque objet sélectionné génère une question automatique. "Combien de pommes ?" avec l'image correspondante. Les enfants cherchent et comptent dans la grille.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Personnaliser sur le Canevas',
        description: `Modifiez chaque élément directement sur le canevas. Ajoutez un titre personnalisé avec le nom de l'élève. Insérez des consignes en écriture cursive pour les plus grands. Déplacez les images pour équilibrer la composition. Redimensionnez les éléments selon vos préférences. Les fiches à imprimer deviennent uniques à votre classe.

Utilisez l'outil texte pour enrichir vos fiches. Écrivez les nombres en lettres sous les questions. Ajoutez des phrases simples pour apprendre à lire. Variez les polices parmi les 7 options disponibles. Choisissez des couleurs vives pour les exercices maths ludiques. Le contour de texte améliore la lisibilité sur les fonds colorés.

Les boutons Annuler et Rétablir corrigent les erreurs instantanément. Expérimentez sans crainte avec vos exercices CP. Testez différentes dispositions de graphisme maternelle.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Télécharger et Imprimer',
        description: `Générez d'abord le corrigé en cliquant sur "Corrigé". Téléchargez ensuite la fiche au format PDF ou JPEG. Choisissez PDF pour la meilleure qualité d'impression. Activez l'option noir et blanc pour économiser l'encre. Les zones de coloriage ressortent parfaitement. Le graphisme maternelle s'imprime avec précision professionnelle.

Le corrigé affiche les mêmes images avec les nombres corrects. Chaque objet à chercher montre sa quantité exacte. Les enseignants corrigent rapidement les fiches à imprimer gratuit. Les parents vérifient facilement le travail à la maison. Les exercices CP incluent toujours leur solution.

Téléchargez fiche et corrigé en un seul clic. La qualité 300 DPI garantit des impressions nettes. Parfait pour l'impression en classe et les ventes commerciales.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from find-and-count.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Nos fiches de cherche et compte répondent aux besoins de nombreux professionnels de l\'éducation. Découvrez comment chaque profil utilise cet outil pour créer des supports pédagogiques adaptés. Des enseignants de maternelle aux entrepreneurs du numérique éducatif.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from find-and-count.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Questions fréquentes sur notre générateur de fiches cherche et compte et nos fiches maternelle.',
    showMoreText: 'Voir plus de questions',
    showLessText: 'Voir moins',
    badgeText: 'FAQ',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Résiliez à tout moment',
    items: [
      {
        id: 'faq-1',
        question: 'Comment fonctionne le g\u00e9n\u00e9rateur de fiches cherche et compte ?',
        answer: 'Le g\u00e9n\u00e9rateur cr\u00e9e des grilles remplies d\u2019images th\u00e9matiques dans lesquelles les \u00e9l\u00e8ves doivent trouver et compter des objets sp\u00e9cifiques. Vous s\u00e9lectionnez les images \u00e0 chercher, le g\u00e9n\u00e9rateur les place al\u00e9atoirement parmi d\u2019autres illustrations, et des questions de d\u00e9nombrement sont ajout\u00e9es automatiquement sous la grille.',
      },
      {
        id: 'faq-2',
        question: 'Quelles plages de comptage sont disponibles pour les fiches cherche et compte ?',
        answer: 'Les plages de comptage sont personnalisables de 1 \u00e0 20, ce qui convient parfaitement aux \u00e9l\u00e8ves de maternelle et de CP. Vous pouvez ajuster la taille de la grille pour contr\u00f4ler la quantit\u00e9 d\u2019objets \u00e0 trouver. Les grilles plus petites facilitent le d\u00e9nombrement pour les d\u00e9butants.',
      },
      {
        id: 'faq-3',
        question: 'Puis-je choisir quelles images les \u00e9l\u00e8ves doivent chercher ?',
        answer: 'Oui, vous s\u00e9lectionnez pr\u00e9cis\u00e9ment les images \u00e0 chercher parmi notre biblioth\u00e8que de plus de 3000 illustrations th\u00e9matiques. Vous pouvez \u00e9galement t\u00e9l\u00e9verser vos propres images personnalis\u00e9es pour cr\u00e9er des fiches maternelle adapt\u00e9es \u00e0 votre programme.',
      },
      {
        id: 'faq-4',
        question: 'Combien d\u2019images diff\u00e9rentes peut-on chercher par fiche ?',
        answer: 'Vous pouvez d\u00e9finir de 1 \u00e0 4 images diff\u00e9rentes \u00e0 chercher et compter par page. Chaque image g\u00e9n\u00e8re automatiquement une question de d\u00e9nombrement avec son illustration correspondante. Moins d\u2019images conviennent aux d\u00e9butants, plus d\u2019images augmentent la difficult\u00e9.',
      },
      {
        id: 'faq-5',
        question: 'Les corrig\u00e9s sont-ils inclus avec les fiches cherche et compte ?',
        answer: 'Oui, chaque fiche g\u00e9n\u00e8re automatiquement un corrig\u00e9 avec le nombre exact de chaque type d\u2019image pr\u00e9sent dans la grille. Les enseignants peuvent corriger rapidement les fiches \u00e0 imprimer gratuit et les parents v\u00e9rifient facilement le travail \u00e0 la maison.',
      },
    ],

  },

  // Pricing - Pack Essentiel for Find and Count
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
    sectionDescription: 'Votre abonnement Pack Essentiel inclut 10 générateurs complémentaires. Combinez le cherche et compte avec d\'autres outils pour créer des séquences pédagogiques complètes.',
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

export default findAndCountFrContent;
