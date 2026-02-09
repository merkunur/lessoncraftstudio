import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Scramble Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/word-scramble-worksheets.ts
 * URL: /fr/apps/mots-melanges-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/word-scramble.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordScrambleFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'mots-melanges-fiches',
    appId: 'word-scramble',
    title: 'Mots Mélangés Fiches | Générateur Maternelle CP',
    description: 'Créez des mots mélangés en 3 clics. Fiches gratuites pour maternelle et CP. Téléchargez PDF 300 DPI. Licence commerciale incluse. Essai gratuit disponible.',
    keywords: 'mots mélangés, générateur mots mélangés, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, apprendre à lire, alphabet, apprendre les lettres, graphisme maternelle, écriture cursive, coloriage à imprimer, exercices maths, tables de multiplication',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/mots-melanges-fiches',
      },

  // Hero Section - FULL text from word-scramble.md paragraphs 1-4
  hero: {
    title: 'Générateur de Mots Mélangés',
    subtitle: 'Fiches à Imprimer Gratuit pour Maternelle et CP',
    description: `Créez des exercices de mots mélangés en quelques clics. Votre abonnement Pack Essentiel vous donne accès à la création illimitée de fiches. Générez des fiches maternelle et exercices CP personnalisés sans frais supplémentaires. Téléchargez vos fiches à imprimer gratuit en format PDF haute qualité.

Les mots mélangés sont parfaits pour apprendre à lire. Les élèves remettent les lettres dans le bon ordre. Chaque exercice inclut une image comme indice visuel. Cet outil pédagogique renforce le vocabulaire et l'orthographe.

Notre générateur propose 11 langues. L'interface et le contenu s'adaptent à votre langue. Les fiches maternelle utilisent des images adaptées aux enfants. Parfait pour les classes bilingues et l'apprentissage du français langue étrangère.`,
    previewImageSrc: '/samples/french/word-scramble/sample-1.jpeg',
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
        videoId: 'Hc3g5VsSHEU',
        buttonText: 'Fonctions Mots mélangés',
        modalTitle: 'Tutoriel Mots mélangés',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/word scramble/
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

  // Features Grid - FULL text from word-scramble.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de mots mélangés offre tout ce dont vous avez besoin. Créez des fiches maternelle professionnelles en quelques minutes. Chaque fonctionnalité a été pensée pour les enseignants. Découvrez les sept fonctionnalités principales de cet outil.',
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

  // How-To Guide - FULL text from word-scramble.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créer des fiches de mots mélangés prend moins de trois minutes. Suivez ce guide étape par étape. Aucune compétence technique requise. Même les débutants réussissent du premier coup.',
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
        title: 'Étape 1 : Choisissez vos Images pour Fiches à Imprimer Gratuit - Apprendre à Lire avec des Visuels',
        description: `Commencez par sélectionner vos images. Ouvrez le panneau de la bibliothèque d'images. Choisissez un thème comme "Animaux" ou "Nourriture". Les images du thème s'affichent instantanément.

Cliquez sur les images souhaitées pour les sélectionner. Un compteur indique combien d'images sont choisies. Sélectionnez entre 1 et 10 images par fiche. Le nombre d'exercices dépend de vos images sélectionnées.

Utilisez la barre de recherche pour trouver une image précise. Tapez "chat" et toutes les images de chats apparaissent. Combinez des images de différents thèmes. Créez des fiches à imprimer gratuit variées pour apprendre à lire.

Vous pouvez aussi téléverser vos propres images. Cliquez sur "Téléverser" et sélectionnez vos fichiers. Donnez un nom à chaque image téléversée. Ce nom deviendra le mot à déchiffrer.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Étape 2 : Configurez les Exercices CP et Exercices CE1 - Fiches Maternelle Personnalisées',
        description: `Après avoir choisi vos images, configurez les paramètres. Définissez le nombre d'exercices par page. Choisissez entre 1 et 10 puzzles.

Sélectionnez le niveau de difficulté approprié. Le mode "Sans indices" convient aux élèves avancés. Le mode "Facile" révèle la moitié des lettres. Les modes intermédiaires offrent une progression.

Choisissez majuscules ou minuscules pour vos exercices CP. Les majuscules conviennent mieux en maternelle. Les minuscules préparent aux exercices CE1. Adaptez selon le niveau de votre classe.

Activez le code couleur si souhaité. Les voyelles et consonnes s'affichent en couleurs différentes. Excellent pour les fiches maternelle de phonologie. Désactivez pour des exercices plus avancés.

Cochez "Inclure nom et date" pour ajouter ces champs. Cochez "Numéroter les exercices" pour une organisation claire. Ces options facilitent la correction et le suivi.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Étape 3 : Générez votre Fiche de Mots Mélangés - Alphabet et Apprendre les Lettres',
        description: `Cliquez sur le bouton "Créer" en haut de l'écran. Le menu déroulant propose plusieurs options. Sélectionnez "Nouvelle fiche" pour générer.

Votre fiche apparaît instantanément sur le canevas. Chaque image s'affiche avec ses lettres mélangées. Les élèves verront l'image et devront reconstituer le mot. Parfait pour apprendre les lettres de l'alphabet.

La génération prend quelques secondes seulement. Vérifiez que tout correspond à vos attentes. Les images sont bien positionnées automatiquement. Les lettres mélangées sont lisibles et claires.

Si le résultat ne convient pas, régénérez simplement. Chaque génération propose un mélange différent. Les lettres sont disposées aléatoirement à chaque fois. Créez plusieurs versions du même exercice.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Étape 4 : Personnalisez sur le Canevas - Fiches Maternelle et Graphisme Maternelle',
        description: `Après génération, personnalisez votre fiche librement. Chaque élément sur le canevas est modifiable. Cliquez sur un élément pour le sélectionner. Des poignées de manipulation apparaissent.

Déplacez les images où vous voulez sur la page. Faites glisser pour repositionner n'importe quel élément. Redimensionnez en tirant sur les poignées. Faites pivoter pour un effet créatif.

Ajoutez du texte personnalisé avec l'outil texte. Écrivez des instructions ou un titre. Changez la police et la taille selon vos préférences. Ajoutez une couleur de contour pour plus de visibilité.

Modifiez les couleurs et l'apparence des lettres. Sélectionnez un groupe de lettres mélangées. Changez la couleur ou la taille. Créez des fiches maternelle uniques pour le graphisme maternelle.

Ajoutez un arrière-plan thématique si souhaité. Choisissez parmi les thèmes disponibles. Ajustez l'opacité pour ne pas gêner la lecture. Ajoutez une bordure décorative assortie.

Utilisez les outils d'alignement pour un résultat professionnel. Centrez les éléments horizontalement ou verticalement. Alignez plusieurs éléments entre eux. Créez une mise en page soignée.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Étape 5 : Téléchargez vos Fiches à Imprimer Gratuit - Exercices CP Format PDF',
        description: `Votre fiche est prête pour le téléchargement. Cliquez sur le bouton "Télécharger" en haut. Un menu propose plusieurs formats de sortie.

Choisissez "Fiche (PDF)" pour le format imprimable standard. Le PDF préserve parfaitement la mise en page. Idéal pour impression en classe ou à la maison. Format professionnel 300 DPI.

Choisissez "Fiche (JPEG)" pour un partage numérique. Le JPEG convient aux plateformes en ligne. Partagez facilement par email ou messagerie. Format compatible avec tous les appareils.

N'oubliez pas de télécharger le corrigé aussi. Sélectionnez "Corrigé (PDF)" ou "Corrigé (JPEG)". Le corrigé montre les mots correctement orthographiés. Parfait pour l'auto-correction des exercices CP.

Activez l'option "Niveaux de gris" pour économiser l'encre. La fiche se convertit en noir et blanc. Idéal pour les impressions quotidiennes. Gardez la couleur pour les fiches spéciales.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from word-scramble.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Les mots mélangés conviennent à de nombreux profils d\'utilisateurs. Enseignants, parents et éducateurs trouvent tous leur compte. Découvrez comment chaque groupe utilise cet outil. Trouvez l\'inspiration pour vos propres usages.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from word-scramble.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Vous avez des questions sur notre générateur de mots mélangés ? Retrouvez les réponses aux questions les plus fréquentes. Tout ce que vous devez savoir sur les fiches maternelle et exercices CP.',
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
        question: 'Comment fonctionne le g\u00e9n\u00e9rateur de mots m\u00e9lang\u00e9s ?',
        answer: 'Le g\u00e9n\u00e9rateur m\u00e9lange les lettres d\'un mot et les enfants doivent les remettre dans le bon ordre. Chaque exercice inclut une image comme indice visuel pour aider les \u00e9l\u00e8ves \u00e0 identifier le mot \u00e0 reconstituer.',
      },
      {
        id: 'faq-2',
        question: 'Quel vocabulaire est disponible pour les exercices ?',
        answer: 'Plus de 50 cat\u00e9gories th\u00e9matiques proposent des listes de mots avec des images associ\u00e9es : animaux, fruits, v\u00e9hicules, objets du quotidien et bien d\'autres. Vous pouvez aussi t\u00e9l\u00e9verser vos propres images avec un nom de fichier personnalis\u00e9.',
      },
      {
        id: 'faq-3',
        question: 'Peut-on ajuster la difficult\u00e9 des exercices ?',
        answer: 'Oui, vous pouvez r\u00e9gler la longueur des mots, le nombre d\'exercices par page et le nombre de lettres r\u00e9v\u00e9l\u00e9es comme indices. Le code couleur voyelles/consonnes peut \u00e9galement \u00eatre activ\u00e9 pour les d\u00e9butants.',
      },
      {
        id: 'faq-4',
        question: 'Pour quelle tranche d\'\u00e2ge ces fiches sont-elles con\u00e7ues ?',
        answer: 'Les mots m\u00e9lang\u00e9s sont con\u00e7us pour les \u00e9l\u00e8ves du CP au CE2, parfaits pour d\u00e9velopper l\'orthographe et le vocabulaire. La difficult\u00e9 r\u00e9glable permet d\'adapter les exercices du d\u00e9butant au niveau avanc\u00e9.',
      },
      {
        id: 'faq-5',
        question: 'Les corrig\u00e9s sont-ils inclus avec les fiches ?',
        answer: 'Oui, chaque fiche de mots m\u00e9lang\u00e9s g\u00e9n\u00e8re automatiquement un corrig\u00e9 montrant les mots correctement orthographi\u00e9s. T\u00e9l\u00e9chargez le corrig\u00e9 en PDF ou JPEG pour la correction en classe.',
      },
    ],

  },

  // Pricing
  pricing: {
    title: 'Pack Essentiel',
    price: '144€',
    priceInterval: '/an',
    priceSuffix: 'Facturé annuellement',
    benefits: [
      'Création illimitée de fiches',
      'Licence commerciale incluse',
      '11 langues disponibles',
      '3000+ images thématiques',
      'Qualité 300 DPI professionnelle',
      'Corrigés automatiques inclus',
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

  // Related Apps - From word-scramble.md Section 7
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Le générateur de mots mélangés fait partie du Pack Essentiel. Neuf autres générateurs complètent parfaitement cet outil. Créez des parcours pédagogiques complets en combinant plusieurs applications.',
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

export default wordScrambleFrContent;
