import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Path Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/picture-path-worksheets.ts
 * URL: /fr/apps/parcours-images-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/picture-path.md
 * App ID: picture-path (Visual maze/path worksheets)
 * Bundle: Accès Complet ($240/year) - NOT Pack Essentiel
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const picturePathFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'parcours-images-fiches',
    appId: 'picture-path',
    title: 'Fiches à Imprimer Gratuit | Générateur de Parcours d\'Images',
    description: 'Créez des parcours d\'images professionnels en quelques clics. Notre générateur transforme vos fiches maternelle en activités ludiques et éducatives.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, parcours images, labyrinthe, exercices CP, graphisme maternelle, motricité fine, coloriage à imprimer, exercices maths, apprendre à lire, alphabet, tables de multiplication',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/parcours-images-fiches',
      },

  // Hero Section - FULL text from picture-path.md paragraphs 1-4
  hero: {
    title: 'Générateur de Parcours d\'Images',
    subtitle: 'Fiches Maternelle et Exercices CP - Fiches à Imprimer Gratuit',
    description: `Créez des parcours d'images professionnels en quelques clics. Notre générateur transforme vos fiches maternelle en activités ludiques et éducatives. Parfait pour le graphisme maternelle et les exercices CP. Les enfants adorent suivre les chemins visuels tout en apprenant.

Votre abonnement Accès Complet vous donne un accès illimité. Créez autant de fiches à imprimer gratuit que nécessaire. Pas de frais supplémentaires par fiche. Téléchargez des parcours d'images de qualité professionnelle en 3 minutes.

Le générateur propose trois modes de jeu différents. Le mode Parcours d'Images crée des chemins entre images. Le mode Labyrinthe Classique génère des labyrinthes avec images à collectionner. Le mode Choisir le Bon Chemin propose plusieurs chemins dont un seul est correct. Chaque mode s'adapte aux besoins de vos élèves.

Les fiches maternelle créées développent plusieurs compétences. Le graphisme maternelle progresse en suivant les lignes. La motricité fine s'améliore avec le tracé des chemins. La concentration augmente en cherchant le bon parcours. Les exercices CP renforcent la logique et le raisonnement spatial.`,
    previewImageSrc: '/samples/french/picture-path/sample-1.jpeg',
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
        videoId: 'Sl1o0uPBDCg',
        buttonText: 'Fonctions Parcours d\'Images',
        modalTitle: 'Tutoriel Parcours d\'Images',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/french/picture-path/
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

  // Features Grid - FULL text from picture-path.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de parcours d\'images offre tout ce dont vous avez besoin. Créez des fiches maternelle professionnelles en quelques clics. Générez des exercices CP adaptés à chaque élève. Les fiches à imprimer gratuit se personnalisent entièrement. Chaque fonctionnalité a été conçue pour les enseignants français.',
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

  // How-To Guide - FULL text from picture-path.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'La création de fiches maternelle prend moins de 3 minutes au total. Suivez ces cinq étapes faciles pour créer vos exercices CP professionnels. Aucune compétence technique n\'est requise. Le processus est intuitif et rapide. Vos fiches seront prêtes pour l\'impression en quelques clics.',
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
        title: 'Étape 1 : Sélectionner les Images - Fiches à Imprimer Gratuit et Coloriage pour Votre Thème',
        description: `Ouvrez la section Bibliothèque d'Images dans le panneau latéral. Choisissez d'abord le type d'image à ajouter. Sélectionnez Image de Départ pour le point de départ du parcours. Une seule image de départ est nécessaire pour chaque fiche.

Parcourez les thèmes disponibles dans le menu déroulant. Plus de 50 thèmes organisent les 3000+ images. Animaux, nourriture, transports, nature, fêtes, objets du quotidien. Cliquez sur un thème pour voir toutes les images correspondantes. La barre de recherche filtre rapidement par mot-clé.

Cliquez sur l'image de votre choix pour l'ajouter. Elle apparaît dans le panneau de sélection en bas. Le compteur indique combien d'images sont sélectionnées. Répétez le processus pour l'Image d'Arrivée. Choisissez ensuite au moins une Image de Parcours.

Les Images Distractrices ajoutent de la difficulté. Sélectionnez au moins 6 images distractrices recommandées. Plus vous en ajoutez, plus l'exercice devient difficile. Les enfants doivent distinguer le bon chemin des faux chemins. Cette sélection crée l'aspect pédagogique du labyrinthe.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Étape 2 : Personnaliser les Réglages - Exercices Maths et Tables de Multiplication Adaptés',
        description: `Ouvrez la section Configuration du Parcours dans le panneau. Sélectionnez d'abord le mode de jeu souhaité. Parcours d'Images crée un chemin simple entre images. Labyrinthe Classique génère un vrai labyrinthe avec murs. Choisir le Bon Chemin propose plusieurs chemins possibles.

Les exercices maths utilisent parfaitement les trois modes. Créez un Parcours d'Images avec des nombres à suivre dans l'ordre. Les enfants comptent de 1 à 10 en suivant le chemin. Ou générez un Labyrinthe Classique avec des opérations mathématiques. Les élèves collectent les bonnes réponses en résolvant le labyrinthe.

Les tables de multiplication s'intègrent naturellement dans les parcours. Placez les résultats de la table de 2 le long du bon chemin. Les résultats incorrects deviennent des distracteurs. L'enfant suit uniquement les multiples de 2, 3, 5 ou 10. Cette méthode rend l'apprentissage des tables de multiplication ludique et visuel.

Ajustez la taille de la grille selon la difficulté souhaitée. 12×12 convient parfaitement pour les débutants en maternelle. 13×13 ou 14×14 augmentent la complexité pour le CP. 15×15 créent des labyrinthes plus longs et difficiles. La taille influence directement la durée de l'activité.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Étape 3 : Générer Votre Fiche Maternelle - Exercices CP et Graphisme Maternelle Automatiques',
        description: `Cliquez sur le bouton Créer en haut à droite. Le système génère automatiquement votre fiche en quelques secondes. L'algorithme place intelligemment toutes les images sélectionnées. Le parcours ou labyrinthe se crée selon vos réglages. Aucune intervention manuelle n'est nécessaire.

La fiche maternelle apparaît instantanément sur le canevas. Toutes les images de départ, parcours et arrivée sont positionnées. Les images distractrices remplissent l'espace restant. Le chemin correct est défini mais invisible pour l'élève. Seul le corrigé montre la solution complète.

Les exercices CP générés sont immédiatement utilisables. Les espacements entre images sont optimaux pour le tracé. La taille des images favorise la concentration visuelle. Les chemins évitent les croisements complexes pour les jeunes élèves. Le niveau de difficulté correspond à vos réglages.

L'onglet Corrigé se génère simultanément. Basculez entre Fiche et Corrigé avec les onglets en haut. Le corrigé affiche clairement le chemin correct. Une ligne colorée traverse le parcours de départ à arrivée. Vous voyez immédiatement la solution pour vérifier le travail des élèves.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Étape 4 : Modifier sur le Canevas - Écriture Cursive et Alphabet Personnalisables',
        description: `Le canevas d'édition offre un contrôle total sur chaque élément. Cliquez sur n'importe quelle image pour la sélectionner. Les poignées de redimensionnement apparaissent autour de l'image. Déplacez, tournez, agrandissez ou réduisez librement. Chaque modification se fait en temps réel.

Ajoutez du texte personnalisé avec les Outils de Texte. Cliquez sur Ajouter du Texte dans le panneau latéral. Tapez votre instruction ou votre titre. Le texte apparaît au centre du canevas. Déplacez-le où vous le souhaitez sur la fiche.

L'écriture cursive se pratique facilement avec les outils de texte. Sélectionnez une police cursive dans le menu déroulant. Écrivez un mot ou une phrase modèle. Les enfants tracent par-dessus pour pratiquer l'écriture. Ou ils copient le modèle sur les lignes vierges en dessous.

Les activités sur l'alphabet utilisent le texte de multiples façons. Ajoutez les lettres A, B, C le long du parcours. Les enfants suivent l'ordre alphabétique pour trouver le chemin. Ou placez une lettre majuscule au départ et sa minuscule à l'arrivée. L'association majuscule-minuscule devient un jeu de parcours.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Étape 5 : Télécharger et Imprimer - Fiches à Imprimer Gratuit et Exercices pour Apprendre à Lire',
        description: `Cliquez sur le bouton Télécharger en haut à droite. Un menu déroulant affiche toutes les options d'export. Choisissez entre formats JPEG et PDF selon vos besoins. Sélectionnez Fiche pour la version élève ou Corrigé pour la solution.

Les fiches à imprimer gratuit se téléchargent en haute qualité 300 DPI. Cette résolution garantit une impression nette et professionnelle. Les lignes restent précises sur tout type de papier. Les couleurs s'impriment vivement sans bavures. La qualité égale celle des ressources commerciales.

Le format PDF convient parfaitement pour l'archivage et le partage. Sauvegardez vos fiches dans un dossier organisé par thème. Partagez-les avec vos collègues par email. Imprimez-les à la demande sans perte de qualité. Le PDF préserve exactement votre mise en page.

Activez l'option Niveau de Gris avant le téléchargement pour économiser l'encre. Les couleurs se convertissent automatiquement en nuances de gris. La qualité visuelle reste excellente pour les activités de tracé. Votre budget d'impression diminue significativement. Cette option est parfaite pour les grandes quantités de fiches.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from picture-path.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Le générateur de parcours d\'images répond aux besoins de tous les éducateurs. Les enseignants de maternelle l\'utilisent quotidiennement pour le graphisme. Les professeurs de CP créent des exercices de lecture. Les parents en IEF génèrent des activités variées. Les enseignants de langues étrangères multiplient les ressources multilingues. Les professeurs spécialisés adaptent chaque fiche aux besoins spécifiques. Les enseignants entrepreneurs vendent leurs créations en ligne.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from picture-path.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Les enseignants posent régulièrement les mêmes questions avant de s\'abonner. Voici les réponses détaillées aux questions les plus fréquentes. Chaque réponse vous aide à comprendre exactement comment le générateur fonctionne. Vous saurez précisément ce que vous pouvez créer.',
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
        question: 'Comment fonctionne le g\u00e9n\u00e9rateur de parcours d\'images ?',
        answer: 'Le g\u00e9n\u00e9rateur cr\u00e9e des exercices de suivi de chemin o\u00f9 les images servent de points de rep\u00e8re. Les enfants suivent le parcours d\'une image \u00e0 l\'autre en tra\u00e7ant le chemin correct entre les points de d\u00e9part et d\'arriv\u00e9e. Chaque fiche est g\u00e9n\u00e9r\u00e9e automatiquement avec un corrig\u00e9 inclus.',
      },
      {
        id: 'faq-2',
        question: 'Quels types de parcours peut-on cr\u00e9er ?',
        answer: 'Vous pouvez cr\u00e9er trois types de parcours diff\u00e9rents : des chemins droits entre images, des labyrinthes classiques avec des murs, et des exercices \u00ab choisir le bon chemin \u00bb avec plusieurs itin\u00e9raires possibles. Chaque mode s\'adapte au niveau de difficult\u00e9 souhait\u00e9 pour vos \u00e9l\u00e8ves.',
      },
      {
        id: 'faq-3',
        question: 'Pour quelle tranche d\'\u00e2ge ces fiches sont-elles con\u00e7ues ?',
        answer: 'Les fiches de parcours d\'images sont con\u00e7ues pour les enfants de 3 \u00e0 6 ans, de la petite section \u00e0 la grande section de maternelle. Elles d\u00e9veloppent la motricit\u00e9 fine, le suivi visuel et la coordination \u0153il-main de mani\u00e8re ludique.',
      },
      {
        id: 'faq-4',
        question: 'Puis-je personnaliser les images utilis\u00e9es dans les parcours ?',
        answer: 'Oui, vous pouvez choisir parmi plus de 3 000 images organis\u00e9es par th\u00e8mes ou t\u00e9l\u00e9verser vos propres illustrations. S\u00e9lectionnez des images de d\u00e9part, d\'arriv\u00e9e, de parcours et des distracteurs pour cr\u00e9er des fiches parfaitement adapt\u00e9es \u00e0 vos le\u00e7ons.',
      },
      {
        id: 'faq-5',
        question: 'Les corrig\u00e9s sont-ils fournis avec chaque fiche ?',
        answer: 'Oui, chaque fiche de parcours d\'images g\u00e9n\u00e8re automatiquement un corrig\u00e9 avec le chemin correct clairement mis en \u00e9vidence. Une ligne color\u00e9e indique le parcours exact du d\u00e9part \u00e0 l\'arriv\u00e9e, facilitant la correction rapide par l\'enseignant.',
      },
    ],

  },

  // Pricing - Accès Complet Bundle for Picture Path
  pricing: {
    title: 'Accès Complet',
    price: '240€',
    priceInterval: '/an',
    priceSuffix: 'Facturation annuelle',
    benefits: [
      'Création de fiches illimitée',
      '33 types de générateurs',
      'Licence commerciale incluse',
      '11 langues supportées',
      '3000+ images thématiques',
      'Qualité d\'impression 300 DPI',
      'Corrigés inclus',
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

  // Related Apps - From picture-path.md Section 7
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'L\'abonnement Accès Complet inclut 33 générateurs de fiches différents. Combinez le générateur de parcours avec d\'autres apps. Créez des ressources pédagogiques ultra-complètes. Les élèves travaillent plusieurs compétences simultanément. Votre temps de préparation diminue drastiquement.',
    ctaTitle: 'Prêt à Créer des Fiches Professionnelles ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches maternelle de qualité. Création illimitée, licence commerciale incluse.',
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

export default picturePathFrContent;
