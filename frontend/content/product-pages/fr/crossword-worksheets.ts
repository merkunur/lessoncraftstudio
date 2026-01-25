import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Crossword Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/crossword-worksheets.ts
 * URL: /fr/apps/mots-croises-images-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/crossword.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Accès Complet = €240/an (Accès Complet)
 * App ID: image-crossword
 */

export const crosswordFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'mots-croises-images-fiches',
    appId: 'image-crossword',
    title: 'Mots Croisés en Images | Fiches Gratuites Maternelle CP - Créateur',
    description: 'Créez des mots croisés en images professionnels. Fiches gratuites maternelle et CP à imprimer. 3000+ images, 11 langues, licence commerciale. PDF en 3 minutes.',
    keywords: 'mots croisés en images, fiches maternelle, exercices CP, fiches à imprimer gratuit, apprendre à lire, fiches alphabet, graphisme maternelle, exercices maths, apprendre les lettres, coloriage à imprimer, écriture cursive, tables de multiplication, exercices CE1',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/mots-croises-images-fiches',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/crossword/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Mots croisés en images fiches gratuites - exercices vocabulaire pour maternelle et CP'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/crossword/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiches mots croisés à imprimer gratuit - apprendre les lettres pour enfants'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/crossword/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Mots croisés vocabulaire fiches maternelle - exercices CP graphisme'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/crossword/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiches alphabet mots croisés images - apprendre à lire pour maternelle'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/crossword/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Mots croisés en images exercices CP - fiches à imprimer gratuit pour enfants'
      }
    ],
  },

  // Hero Section - FULL text from crossword.md paragraphs 1-4
  hero: {
    title: 'Générateur de Mots Croisés en Images',
    subtitle: 'Fiches à Imprimer Gratuit pour Maternelle et CP',
    description: `Créez des mots croisés en images professionnels avec notre générateur de fiches à imprimer gratuit. Votre abonnement Accès Complet à 240 € par an vous permet de générer des fiches maternelle et exercices CP illimités sans frais par fiche. Créez des mots croisés personnalisés parfaits pour apprendre à lire en maternelle, CP et CE1. Téléchargez des fiches pédagogiques de haute qualité en PDF en moins de 3 minutes.

Notre générateur de mots croisés combine l'apprentissage du vocabulaire avec la reconnaissance visuelle. Les enfants regardent les images et remplissent les mots dans la grille. Parfait pour les fiches maternelle centrées sur l'alphabet et apprendre les lettres. Chaque mot croisé en images renforce les compétences en écriture et lecture tout en gardant les élèves engagés avec des images colorées.

Les enseignants utilisent nos mots croisés en images pour créer des exercices CP et exercices CE1 adaptés à leurs thèmes d'enseignement. Sélectionnez parmi 3000 images ou téléchargez vos propres photos. Générez des fiches à imprimer gratuit qui correspondent parfaitement à votre programme de classe. Chaque fiche est entièrement personnalisable avec des arrière-plans, des bordures et du texte.

Générez votre premier mot croisé en images en 3 clics. Choisissez un thème ou sélectionnez 8 images individuelles. Cliquez sur Générer et téléchargez votre fiche PDF. Simple, rapide et professionnel pour toutes vos fiches maternelle.`,
    previewImageSrc: '/samples/french/crossword/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/french/crossword/
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
        worksheetSrc: '/samples/french/crossword/sample-1.jpeg',
        answerKeySrc: '/samples/french/crossword/sample-1.jpeg',
        altText: 'Mots croisés en images fiches gratuites - exercices vocabulaire pour maternelle et CP',
        imageTitle: 'Mots croisés en images fiches gratuites',
      },
      {
        id: 'sample-2',
        worksheetSrc: '/samples/french/crossword/sample-2.jpeg',
        answerKeySrc: '/samples/french/crossword/sample-2.jpeg',
        altText: 'Fiches mots croisés à imprimer gratuit - apprendre les lettres pour enfants',
        imageTitle: 'Fiches mots croisés à imprimer gratuit',
      },
      {
        id: 'sample-3',
        worksheetSrc: '/samples/french/crossword/sample-3.jpeg',
        answerKeySrc: '/samples/french/crossword/sample-3.jpeg',
        altText: 'Mots croisés vocabulaire fiches maternelle - exercices CP graphisme',
        imageTitle: 'Mots croisés vocabulaire fiches maternelle',
      },
      {
        id: 'sample-4',
        worksheetSrc: '/samples/french/crossword/sample-4.jpeg',
        answerKeySrc: '/samples/french/crossword/sample-4.jpeg',
        altText: 'Fiches alphabet mots croisés images - apprendre à lire pour maternelle',
        imageTitle: 'Fiches alphabet mots croisés images',
      },
      {
        id: 'sample-5',
        worksheetSrc: '/samples/french/crossword/sample-5.jpeg',
        answerKeySrc: '/samples/french/crossword/sample-5.jpeg',
        altText: 'Mots croisés en images exercices CP - fiches à imprimer gratuit pour enfants',
        imageTitle: 'Mots croisés en images exercices CP',
      },
    ],
    
  },

  // Features Grid - FULL text from crossword.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de mots croisés en images offre toutes les fonctionnalités dont les enseignants ont besoin pour créer des fiches à imprimer gratuit professionnelles. Créez des exercices CP et exercices CE1 personnalisés en quelques minutes. Chaque fonctionnalité est conçue pour vous faire gagner du temps tout en produisant des fiches maternelle de qualité supérieure. Voici tout ce que vous pouvez faire avec notre générateur.',
    highlightBadgeText: 'Fonctionnalité Clé',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    badgeText: 'Fonctionnalités',
    trustBadges: {
      allFeatures: 'Toutes les fonctionnalités incluses',
      noHiddenFees: 'Aucun frais caché',
      cancelAnytime: 'Annulez à tout moment',
    },
    items: [], // Samples loaded dynamically from content manager
    
  },

  // How-To Guide - FULL text from crossword.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créer des mots croisés en images professionnels prend moins de 3 minutes du début à la fin. Ces 5 étapes simples vous guident du choix des images au téléchargement de vos fiches à imprimer gratuit. Aucune compétence technique requise. Même les enseignants qui découvrent les outils numériques peuvent créer des exercices CP et exercices CE1 parfaits dès leur première utilisation. Suivez ces étapes pour générer vos premières fiches maternelle.',
    ctaText: 'Commencer Maintenant',
    badgeText: 'Guide Étape par Étape',
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
        title: 'Étape 1: Choisissez vos Images pour Fiches Maternelle - Thème, Images Individuelles ou Photos Personnalisées',
        description: `Commencez par sélectionner les 8 images qui apparaîtront dans votre mot croisé. Trois méthodes s'offrent à vous. La méthode la plus rapide utilise la génération par thème. Ouvrez le menu déroulant des thèmes et choisissez une catégorie. Animaux, nourriture, transport, école et nature sont des options populaires pour les fiches maternelle. Le générateur sélectionne automatiquement 8 images du thème choisi. Parfait quand vous voulez des mots croisés rapides sur l'alphabet ou le vocabulaire thématique.

La deuxième méthode permet une sélection individuelle précise. Utilisez le filtre de thème pour parcourir des catégories spécifiques. Tapez dans la barre de recherche pour trouver des images précises. Cliquez sur les images pour les ajouter à votre sélection. Vous devez choisir exactement 8 images. Cette méthode fonctionne bien pour créer des exercices CP centrés sur un vocabulaire spécifique pour apprendre à lire.

La troisième méthode utilise vos propres images téléchargées. Cliquez sur le bouton de téléchargement et sélectionnez jusqu'à 8 fichiers depuis votre ordinateur. Utilisez des photos de votre classe, de sorties scolaires ou d'objets familiers. Les images personnalisées créent des fiches à imprimer gratuit plus pertinentes pour vos élèves.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Étape 2: Personnalisez les Paramètres de Page pour Exercices CP et Coloriage à Imprimer - Format, Arrière-plan et Bordures',
        description: `Maintenant configurez l'apparence de votre fiche maternelle. Choisissez d'abord le format de page. Letter Portrait convient aux imprimantes américaines. A4 Portrait est standard en Europe. Les formats paysage fonctionnent bien pour les mots croisés avec plus d'images latérales. Sélectionnez le format qui correspond à votre imprimante habituelle. Vous pouvez aussi définir des dimensions personnalisées si nécessaire.

Ensuite ajoutez un arrière-plan si vous le souhaitez. Ouvrez le sélecteur de thèmes d'arrière-plan. Des centaines d'options apparaissent organisées par catégorie. Nature, saisons, fêtes et motifs abstraits sont disponibles. Les arrière-plans légers fonctionnent mieux pour les fiches à imprimer gratuit car ils n'interfèrent pas avec la grille. Ajustez l'opacité pour rendre l'arrière-plan plus subtil.

Les bordures ajoutent une touche professionnelle à vos exercices CP. Choisissez parmi des centaines de bordures thématiques. Bordures saisonnières, animaux, fêtes et motifs éducatifs. Les bordures encadrent joliment votre mot croisé. Réglez l'opacité de la bordure si elle semble trop prononcée.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Étape 3: Générez votre Mot Croisé pour Apprendre les Lettres et Alphabet - Aperçu Instantané de vos Fiches à Imprimer Gratuit',
        description: `Une fois vos 8 images sélectionnées et vos paramètres configurés, cliquez sur le bouton Générer. Le mot croisé apparaît instantanément sur le canevas. La grille 15×15 se positionne automatiquement au centre. Les images de repère avec leurs numéros s'organisent autour de la grille. En orientation portrait, les images apparaissent au-dessus et en-dessous de la grille. En orientation paysage, les images se placent à gauche et à droite.

Un en-tête attrayant apparaît en haut de la page. Le titre Mots Croisés en Images dans une belle police. Une description invitant les enfants à regarder les images et remplir les mots. L'en-tête est entièrement personnalisable si vous voulez changer le texte. Parfait pour créer des fiches maternelle avec des instructions spécifiques pour apprendre les lettres.

Le générateur place automatiquement les mots dans la grille en les croisant intelligemment. Les mots se croisent pour partager des lettres communes. Chaque mot correspond à une image numérotée. Les cases vides attendent que les élèves remplissent les lettres. Générez immédiatement la version corrigé en cliquant sur l'onglet Corrigé.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Étape 4: Personnalisez sur le Canevas vos Exercices CE1 et Écriture Cursive - Modifiez Chaque Élément de vos Fiches Maternelle',
        description: `Après génération, chaque élément est entièrement modifiable. Cliquez sur n'importe quel élément pour le sélectionner. Des poignées de redimensionnement apparaissent. Faites glisser les coins pour agrandir ou réduire. Faites glisser l'élément pour le déplacer. Utilisez la poignée de rotation pour faire pivoter les éléments. Cette flexibilité totale vous permet de créer exactement les fiches à imprimer gratuit dont vous avez besoin.

Ajoutez du texte supplémentaire avec l'outil Texte. Tapez votre texte et cliquez sur Ajouter. Le texte apparaît sur le canevas. Cliquez dessus pour changer la police, la taille et la couleur. Ajoutez le nom de votre élève pour des exercices CP personnalisés. Ajoutez des instructions supplémentaires pour les devoirs. Ajoutez la date ou le numéro de la leçon. Le texte personnalisé rend vos fiches maternelle plus utiles pour apprendre à lire et pratiquer l'écriture cursive.

Changez les couleurs de la grille si vous le souhaitez. Modifiez la taille de la grille en la redimensionnant. Déplacez les images de repère pour une meilleure composition. Créez des exercices CE1 vraiment uniques qui reflètent votre style d'enseignement.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Étape 5: Téléchargez vos Fiches à Imprimer Gratuit et Exercices Maths - Fichiers PDF et JPEG Haute Qualité pour Graphisme Maternelle',
        description: `Quand votre mot croisé est parfait, il est temps de télécharger. Ouvrez le menu déroulant Télécharger. Plusieurs options s'offrent à vous. Téléchargez le Mot Croisé en JPEG pour une image haute résolution 300 DPI. Téléchargez le Mot Croisé en PDF pour un fichier parfait pour l'impression. Téléchargez aussi le Corrigé dans les deux formats.

Le format PDF fonctionne mieux pour l'impression directe. Les PDF conservent une qualité parfaite à n'importe quelle échelle. Imprimez à la maison ou envoyez à un service d'impression professionnel. Les JPEG fonctionnent bien pour partager numériquement ou insérer dans d'autres documents. La résolution 300 DPI garantit une qualité professionnelle pour vos fiches maternelle et exercices CP.

Cochez la case Niveaux de Gris avant de télécharger pour économiser l'encre. Les versions en noir et blanc utilisent beaucoup moins d'encre d'imprimante. Parfait quand vous imprimez 30 copies pour toute votre classe. Les fiches à imprimer gratuit en niveaux de gris restent claires et lisibles.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from crossword.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Notre générateur de mots croisés en images sert différents types d\'utilisateurs dans le domaine éducatif. Enseignants de maternelle, professeurs de CP et CE1, parents en instruction à domicile et enseignants de langues étrangères. Chacun trouve des applications spécifiques pour créer des fiches à imprimer gratuit adaptées à ses besoins. Voici comment différents éducateurs utilisent nos mots croisés pour apprendre à lire, développer le graphisme maternelle et renforcer l\'alphabet.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from crossword.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Les enseignants et parents ont des questions courantes sur notre générateur de mots croisés. Voici les réponses détaillées aux questions les plus fréquentes. Ces réponses couvrent l\'abonnement, l\'utilisation en classe, la personnalisation et les fonctionnalités techniques pour apprendre à lire et apprendre les lettres.',
    showMoreText: 'Voir plus de questions',
    showLessText: 'Voir moins',
    badgeText: 'FAQ',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Résiliez à tout moment',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - FULL ACCESS (€240/an)
  pricing: {
    title: 'Accès Complet',
    price: '240€',
    priceInterval: '/an',
    priceSuffix: 'Facturé annuellement',
    benefits: [
      'Création illimitée de mots croisés',
      'Licence commerciale incluse',
      '11 langues disponibles',
      '3000+ images thématiques',
      'Qualité 300 DPI professionnelle',
      'Corrigés automatiques inclus',
    ],
    ctaText: 'Commencer Maintenant',
    bundleDescription: 'Votre abonnement inclut l\'accès aux 33 générateurs de fiches:',
    bundleApps: [
      'Addition Images',
      'Train Alphabet',
      'Grand ou Petit',
      'Bingo Images',
      'Graphique et Comptage',
      'Code Addition',
      'Coloriages',
      'Mots Croisés',
      'Cryptogramme',
      'Dessiner et Colorier',
      'Tracer des Lignes',
      'Cherche et Compte',
      'Cherche les Objets',
      'Puzzle Grille',
      'Jeu d\'Association',
      'Puzzle Maths',
      'Fiches de Maths',
      'Pièces Manquantes',
      'Plus ou Moins',
      'L\'Intrus',
      'Train Suites Logiques',
      'Fiches Séquences',
      'Parcours d\'Images',
      'Tri d\'Images',
      'Prépositions',
      'Ombres',
      'Soustraction',
      'Sudoku',
      'Chasse au Trésor',
      'Deviner les Mots',
      'Mots Mélangés',
      'Mots Mêlés',
      'Écriture',
    ],
  },

  // Related Apps - From crossword.md Section 7
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Notre plateforme offre 33 générateurs différents de fiches pédagogiques. Les enseignants créent des packs d\'apprentissage complets en combinant plusieurs types d\'activités. Mots croisés pour le vocabulaire, exercices maths pour les nombres, coloriage à imprimer pour la motricité fine et fiches d\'alphabet pour apprendre les lettres. Ces combinaisons créent des expériences d\'apprentissage riches qui engagent les élèves sur plusieurs niveaux.',
    ctaTitle: 'Prêt à Créer des Fiches Professionnelles ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches maternelle de qualité. Création illimitée, licence commerciale incluse.',
    primaryCtaText: 'Essai Gratuit',
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

export default crosswordFrContent;
