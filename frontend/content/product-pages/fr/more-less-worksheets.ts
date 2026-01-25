import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * More or Less Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/more-less-worksheets.ts
 * URL: /fr/apps/plus-moins-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/more-less.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Accès Complet = 240 $/an (Accès Complet)
 * App ID: more-less
 */

export const moreLessFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'comparaison-quantites-fiches',
    appId: 'more-less',
    title: 'Fiches Comparaison Plus Moins Égal | Exercices Maths Gratuits',
    description: 'Créez des fiches de comparaison plus/moins/égal professionnelles. Exercices maths maternelle et CP. PDF haute qualité en 3 minutes. Essai gratuit ! Parfait pour enseignants et parents.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices maths, exercices CP, plus moins égal, comparaison, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, tables de multiplication, exercices CE1',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/comparaison-quantites-fiches',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/more-less/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche de comparaison de quantités plus moins égal - exercices maths pour maternelle'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/more-less/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche gratuite comparaison mathématique - exercices CP pour enfants'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/more-less/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche maternelle plus grand plus petit - fiches à imprimer gratuites'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/more-less/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Exercices de comparaison de quantités - fiche pour enfants avec corrigé'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/more-less/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Comparaison plus moins égal fiches gratuites - exercices maths maternelle CP'
      }
    ],
  },

  // Hero Section - FULL text from French more-less.md Section 1
  hero: {
    title: 'Générateur d\'Exercices de Comparaison',
    subtitle: 'Fiches à Imprimer Gratuit - Exercices Maths Plus Moins Égal',
    description: `Créez des fiches de comparaison mathématique professionnelles avec notre générateur d'exercices maths. Votre abonnement Accès Complet vous permet de créer des fiches à imprimer en illimité sans frais supplémentaires par fiche. Générez des exercices CP de comparaison de quantités parfaits pour la maternelle et le CP. Téléchargez des fichiers PDF de haute qualité en moins de 3 minutes.

Les exercices maths de comparaison enseignent aux élèves à comparer deux quantités et choisir le bon symbole mathématique. Les enfants apprennent les concepts de plus que, moins que et égal à. Notre générateur crée des fiches maternelle visuellement attrayantes qui maintiennent l'attention des jeunes apprenants. Les exercices CP progressifs s'adaptent au niveau de chaque élève.

Notre générateur de fiches à imprimer offre deux modes de comparaison distincts. Comparez des groupes d'images entre eux pour renforcer le comptage. Comparez des images à des chiffres écrits pour apprendre à lire les nombres. Choisissez des symboles illustrés colorés ou des symboles mathématiques traditionnels. Personnalisez complètement vos fiches maternelle avec notre éditeur sur canevas.

Les enseignants choisissent l'abonnement Accès Complet pour trois raisons essentielles. Premièrement, la création d'exercices maths en 11 langues facilite l'enseignement multilingue et l'apprentissage du français langue étrangère. Deuxièmement, la licence commerciale incluse permet de vendre vos fiches à imprimer sur Teachers Pay Teachers et Etsy. Troisièmement, le gain de temps considérable vous permet de créer des exercices CP professionnels en 3 minutes au lieu de 30 minutes avec les méthodes traditionnelles.`,
    previewImageSrc: '/samples/french/more-less/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/french/more-less/
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
        worksheetSrc: '/samples/french/more-less/sample-1.jpeg',
        answerKeySrc: '/samples/french/more-less/sample-1.jpeg',
        altText: 'Fiche de comparaison de quantités plus moins égal - exercices maths pour maternelle',
        imageTitle: 'Fiche de comparaison de quantités plus moins égal',
      },
      {
        id: 'sample-2',
        worksheetSrc: '/samples/french/more-less/sample-2.jpeg',
        answerKeySrc: '/samples/french/more-less/sample-2.jpeg',
        altText: 'Fiche gratuite comparaison mathématique - exercices CP pour enfants',
        imageTitle: 'Fiche gratuite comparaison mathématique',
      },
      {
        id: 'sample-3',
        worksheetSrc: '/samples/french/more-less/sample-3.jpeg',
        answerKeySrc: '/samples/french/more-less/sample-3.jpeg',
        altText: 'Fiche maternelle plus grand plus petit - fiches à imprimer gratuites',
        imageTitle: 'Fiche maternelle plus grand plus petit',
      },
      {
        id: 'sample-4',
        worksheetSrc: '/samples/french/more-less/sample-4.jpeg',
        answerKeySrc: '/samples/french/more-less/sample-4.jpeg',
        altText: 'Exercices de comparaison de quantités - fiche pour enfants avec corrigé',
        imageTitle: 'Exercices de comparaison de quantités',
      },
      {
        id: 'sample-5',
        worksheetSrc: '/samples/french/more-less/sample-5.jpeg',
        answerKeySrc: '/samples/french/more-less/sample-5.jpeg',
        altText: 'Comparaison plus moins égal fiches gratuites - exercices maths maternelle CP',
        imageTitle: 'Comparaison plus moins égal fiches gratuites',
      },
    ],
    
  },

  // Features Grid - FULL text from French more-less.md Section 2
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur d\'exercices maths offre toutes les fonctionnalités nécessaires pour créer des fiches à imprimer professionnelles. Chaque outil a été conçu pour faciliter la création de fiches maternelle et exercices CP de comparaison. Les enseignants économisent des heures de préparation chaque semaine. Votre abonnement Accès Complet inclut toutes ces fonctionnalités sans frais supplémentaires.',
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

  // How-To Guide - FULL text from French more-less.md Section 3
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créer des exercices maths de comparaison professionnels prend moins de 3 minutes avec notre générateur. Suivez ces cinq étapes simples pour produire des fiches maternelle de qualité. Aucune compétence en conception graphique n\'est nécessaire. Les enseignants de maternelle et de CP créent des fiches à imprimer parfaites dès la première utilisation. Le processus intuitif permet de générer plusieurs exercices CP en quelques minutes.',
    ctaText: 'Commencer à Créer',
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
        title: 'Choisissez les Images pour vos Fiches Maternelle et Exercices CP - Mode Thème ou Images Individuelles',
        description: 'Commencez par sélectionner le mode de choix d\'images pour vos fiches maternelle. Le mode images individuelles vous permet de choisir 1 à 5 images spécifiques. Parcourez la bibliothèque organisée par thèmes pour trouver les images parfaites. Sélectionnez des animaux, des fruits, des véhicules ou tout autre thème adapté aux exercices CP. Le mode thème pour la fiche complète sélectionne automatiquement des images aléatoires. Choisissez un thème et le générateur crée des exercices maths variés. Cette option accélère la création de fiches à imprimer thématiques. Les élèves découvrent des images différentes à chaque exercice de comparaison. Téléchargez vos propres images pour personnaliser complètement les fiches maternelle. Utilisez des photos de votre classe ou des objets familiers aux élèves. Les images personnalisées rendent les exercices CP plus pertinents et engageants. Combinez images de la bibliothèque et photos personnelles librement. Le compteur affiche combien d\'images vous avez sélectionnées.',
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configurez vos Exercices Maths et Fiches à Imprimer Gratuit - Nombre d\'Exercices et Symboles de Comparaison',
        description: 'Sélectionnez le nombre d\'exercices de comparaison par fiche maternelle. Choisissez entre 1 et 8 exercices selon le niveau de vos élèves. Les fiches avec 3 à 4 exercices conviennent aux débutants en maternelle. Les fiches avec 6 à 8 exercices CP défient les élèves plus avancés. Cochez les symboles mathématiques à inclure dans vos exercices maths. Sélectionnez plus grand que, plus petit que ou égal à. Les jeunes élèves de maternelle commencent souvent avec seulement plus et moins. Les exercices CP peuvent inclure les trois symboles pour une pratique complète. Choisissez entre symboles illustrés colorés ou symboles mathématiques traditionnels. Les symboles illustrés utilisent des images attrayantes pour représenter plus, moins et égal. Les symboles traditionnels préparent aux fiches à imprimer de mathématiques standards. Sélectionnez le mode de comparaison pour vos fiches maternelle. Le mode image contre image compare des groupes d\'objets entre eux. Le mode image contre nombre compare des objets à un chiffre écrit.',
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Sélectionnez le Format de Page et les Décorations - Fiches Maternelle et Exercices CP Personnalisés',
        description: 'Choisissez le format de page adapté à votre imprimante. Le format A4 Portrait est standard en France et en Europe. Le format Letter Portrait convient aux imprimantes américaines. Les formats paysage fonctionnent bien pour certaines mises en page d\'exercices maths. Sélectionnez une couleur de fond pour vos fiches à imprimer. Le blanc standard économise l\'encre d\'imprimante à l\'école. Les couleurs pastel douces rendent les fiches maternelle plus attrayantes visuellement. Les couleurs vives captent l\'attention des jeunes élèves de maternelle et CP. Ajoutez un arrière-plan thématique à vos exercices CP. Parcourez les thèmes d\'arrière-plans disponibles dans le menu déroulant. Les motifs subtils ajoutent de l\'intérêt visuel sans distraire des exercices maths. Sélectionnez une bordure décorative pour encadrer vos fiches maternelle. Ajoutez du texte personnalisé à vos exercices CP. Tapez le nom de votre classe ou la date du jour.',
        icon: '📐',
      },
      {
        id: '4',
        number: 4,
        title: 'Générez et Modifiez vos Fiches Maternelle - Personnalisation Complète des Exercices Maths sur Canevas',
        description: 'Cliquez sur le bouton de génération pour créer vos exercices maths. Le générateur place automatiquement les groupes d\'objets sur la fiche. Les symboles de comparaison apparaissent entre les groupes. Le tout se génère en moins de 5 secondes pour vos fiches à imprimer. Le corrigé se crée automatiquement sur un onglet séparé. Basculez entre la fiche élève et le corrigé en cliquant sur les onglets. Le corrigé affiche les symboles corrects pour chaque comparaison. Tous les éléments sur le canevas sont entièrement modifiables. Cliquez sur n\'importe quelle image ou symbole pour le sélectionner. Déplacez les éléments en les faisant glisser avec votre souris. Redimensionnez les images pour les rendre plus grandes et plus visibles sur les fiches maternelle. Ajoutez des éléments supplémentaires pour personnaliser vos exercices maths. Utilisez les outils d\'alignement pour organiser les éléments parfaitement. Verrouillez les éléments que vous ne voulez plus modifier accidentellement.',
        icon: '✨',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez et Imprimez vos Exercices Maths et Fiches Maternelle - PDF et JPEG Haute Qualité',
        description: 'Cliquez sur le bouton de téléchargement pour exporter vos fiches à imprimer. Choisissez le format PDF pour une qualité d\'impression maximale. Le PDF préserve tous les détails de vos exercices maths. Le format JPEG fonctionne bien pour partager en ligne ou insérer dans d\'autres documents. Sélectionnez l\'option couleur pour des fiches maternelle vibrantes et attrayantes. Choisissez niveaux de gris pour économiser l\'encre d\'imprimante. Les exercices CP restent parfaitement lisibles en noir et blanc. Cette option réduit considérablement les coûts d\'impression pour les écoles. Téléchargez la fiche élève et le corrigé séparément. La fiche élève montre seulement les groupes d\'objets sans symboles. Le corrigé affiche les symboles de comparaison corrects. Tous les téléchargements sont en résolution 300 DPI professionnelle. Imprimez vos fiches maternelle immédiatement ou enregistrez-les pour plus tard.',
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from French more-less.md Section 4
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Notre générateur d\'exercices maths répond aux besoins de différents utilisateurs. Les enseignants de maternelle créent des fiches à imprimer adaptées aux jeunes apprenants. Les professeurs de CP et CE1 génèrent des exercices maths de comparaison plus complexes. Les parents en instruction à domicile profitent de la flexibilité complète du générateur. Chaque groupe d\'utilisateurs bénéficie des fonctionnalités professionnelles incluses dans l\'abonnement Accès Complet.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - ALL questions from French more-less.md Section 6
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Les enseignants posent souvent les mêmes questions sur nos exercices maths et fiches maternelle. Cette section répond aux interrogations les plus courantes. Comprenez comment utiliser notre générateur de fiches à imprimer efficacement. Découvrez toutes les possibilités offertes par l\'abonnement Accès Complet. Ces réponses vous aident à maximiser la valeur de votre investissement.',
    showMoreText: 'Afficher plus de questions',
    showLessText: 'Voir moins',
    badgeText: 'FAQ',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Résiliez à tout moment',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Pricing - French translations with Accès Complet
  pricing: {
    title: 'Accès Complet',
    price: '240 $',
    priceInterval: '/an',
    priceSuffix: 'Facturé annuellement',
    benefits: [
      'Création illimitée de fiches',
      'Licence commerciale incluse',
      '11 langues supportées',
      '3000+ images thématiques',
      'Qualité impression 300 DPI',
      'Corrigés inclus',
    ],
    ctaText: 'Commencer à Créer',
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

  // Related Apps - French translations
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Notre plateforme propose 33 générateurs de fiches à imprimer différents. Combinez les exercices maths de comparaison avec d\'autres types de fiches pédagogiques. Créez des packs d\'apprentissage complets couvrant plusieurs domaines. Les enseignants apprécient cette approche intégrée qui maximise l\'efficacité pédagogique. Votre abonnement Accès Complet donne accès à tous les générateurs sans frais supplémentaires.',
    ctaTitle: 'Prêt à Créer des Fiches Incroyables ?',
    ctaDescription: 'Rejoignez les éducateurs qui créent des fiches professionnelles. Génération illimitée, licence commerciale incluse.',
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

export default moreLessFrContent;
