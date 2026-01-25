import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Prepositions Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/prepositions-worksheets.ts
 * URL: /fr/apps/prepositions-exercices-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/prepositions.md
 * App ID: prepositions (Spatial prepositions worksheets)
 * Bundle: Accès Complet ($240/year) - NOT Pack Essentiel
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const prepositionsFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'prepositions-exercices-fiches',
    appId: 'prepositions',
    title: 'Fiches à Imprimer Gratuit | Générateur d\'Exercices de Prépositions',
    description: 'Créez des fiches d\'exercices sur les prépositions spatiales en quelques clics. Votre abonnement Accès Complet à 240 € par an vous permet de générer des.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices CP, prépositions spatiales, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, exercices maths',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/prepositions-exercices-fiches',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/prepositions/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche exercices prépositions spatiales maternelle - fiches à imprimer gratuit pour enfants',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/prepositions/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Exercices CP prépositions - fiche gratuite avec images colorées',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/prepositions/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche maternelle prépositions dans sous sur - graphisme maternelle',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/prepositions/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Prépositions spatiales exercices CP - fiche pour enfants à imprimer',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/prepositions/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiches gratuites prépositions maternelle - apprendre à lire les prépositions',
      },
    ],
  },

  // Hero Section - FULL text from prepositions.md paragraphs 1-4
  hero: {
    title: 'Fiches Exercices sur les Prépositions',
    subtitle: 'Générateur de Fiches Maternelle et CP pour Prépositions Spatiales',
    description: `Créez des fiches d'exercices sur les prépositions spatiales en quelques clics. Votre abonnement Accès Complet à 240 € par an vous permet de générer des exercices illimités sans frais supplémentaires. Concevez des fiches maternelle personnalisées qui enseignent les prépositions essentielles comme sur, sous, dans, devant, derrière, entre et à côté. Téléchargez vos exercices au format PDF haute qualité en moins de 3 minutes.

Les prépositions constituent un élément fondamental de l'apprentissage du français en maternelle et au CP. Nos fiches à imprimer gratuit aident les élèves à comprendre la position des objets dans l'espace. Le générateur propose deux formats d'exercices. Le mode texte à trou demande aux enfants d'écrire la bonne préposition. Le mode choix multiples permet aux jeunes élèves de maternelle d'entourer la bonne réponse parmi plusieurs propositions.

Chaque fiche maternelle comprend des images colorées et attrayantes tirées de notre bibliothèque de plus de 3000 illustrations adaptées aux enfants. Sélectionnez des thèmes familiers pour vos élèves. Ajoutez vos propres photos de classe. Personnalisez chaque élément directement sur le canevas. Les exercices CP s'adaptent parfaitement au niveau de vos élèves.

L'abonnement Accès Complet coûte 240 € par an ou 25 € par mois. Vous accédez aux 33 générateurs de fiches pédagogiques de la plateforme. Créez autant de fiches à imprimer gratuit que nécessaire. Aucun frais par fiche. Les corrigés se génèrent automatiquement. La qualité professionnelle 300 DPI garantit une impression nette. L'interface en français facilite la création rapide d'exercices adaptés à vos besoins pédagogiques.`,
    previewImageSrc: '/samples/french/prepositions/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/prepositions/
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
        worksheetSrc: '/samples/french/prepositions/sample-1.jpeg',
        answerKeySrc: '/samples/french/prepositions/sample-1.jpeg',
        altText: 'Fiche exercices prépositions spatiales maternelle - fiches à imprimer gratuit pour enfants',
        imageTitle: 'Fiche exercices prépositions spatiales maternelle',
      },
      {
        id: 'sample-2',
        worksheetSrc: '/samples/french/prepositions/sample-2.jpeg',
        answerKeySrc: '/samples/french/prepositions/sample-2.jpeg',
        altText: 'Exercices CP prépositions - fiche gratuite avec images colorées',
        imageTitle: 'Exercices CP prépositions',
      },
      {
        id: 'sample-3',
        worksheetSrc: '/samples/french/prepositions/sample-3.jpeg',
        answerKeySrc: '/samples/french/prepositions/sample-3.jpeg',
        altText: 'Fiche maternelle prépositions dans sous sur - graphisme maternelle',
        imageTitle: 'Fiche maternelle prépositions dans sous sur',
      },
      {
        id: 'sample-4',
        worksheetSrc: '/samples/french/prepositions/sample-4.jpeg',
        answerKeySrc: '/samples/french/prepositions/sample-4.jpeg',
        altText: 'Prépositions spatiales exercices CP - fiche pour enfants à imprimer',
        imageTitle: 'Prépositions spatiales exercices CP',
      },
      {
        id: 'sample-5',
        worksheetSrc: '/samples/french/prepositions/sample-5.jpeg',
        answerKeySrc: '/samples/french/prepositions/sample-5.jpeg',
        altText: 'Fiches gratuites prépositions maternelle - apprendre à lire les prépositions',
        imageTitle: 'Fiches gratuites prépositions maternelle',
      },
    ],
    
  },

  // Features Grid - FULL text from prepositions.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur d\'exercices sur les prépositions propose toutes les fonctionnalités nécessaires pour créer des fiches maternelle professionnelles. Chaque outil a été conçu pour répondre aux besoins des enseignants de maternelle et de CP. L\'interface intuitive permet de produire rapidement des exercices de qualité. Les sept fonctionnalités principales garantissent une flexibilité totale pour vos fiches à imprimer gratuit.',
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

  // How-To Guide - FULL text from prepositions.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créez vos fiches à imprimer gratuit sur les prépositions en moins de 3 minutes. Le processus de création se décompose en cinq étapes faciles à suivre. Aucune compétence technique requise. L\'interface intuitive guide les enseignants de maternelle et de CP à travers chaque étape. Suivez simplement les instructions pour obtenir des exercices professionnels rapidement. Les captures d\'écran et explications détaillées rendent le processus encore plus simple.',
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
        title: 'Choisissez la Langue et les Prépositions pour Vos Fiches Maternelle',
        description: `Sélectionnez d'abord la langue française dans le menu déroulant en haut de l'interface. Cette sélection détermine quelles prépositions apparaîtront dans vos exercices CP. Le système affiche automatiquement les prépositions françaises essentielles. Vous voyez apparaître sur, sous, dans, devant, derrière, entre, à côté de, au-dessus et en dessous. Cochez les prépositions que vous souhaitez travailler avec vos élèves de maternelle. Concentrez-vous sur 3 à 5 prépositions pour les jeunes enfants. Incluez davantage de prépositions pour les élèves de CP plus avancés. Choisissez ensuite le mode d'exercice. Le mode texte à trou convient aux élèves qui commencent l'écriture cursive et le graphisme maternelle. Le mode choix multiples s'adapte mieux aux très jeunes élèves qui découvrent les prépositions spatiales. Personnalisez le texte d'instruction pour le mode choix multiples si vous le souhaitez.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configurez le Format de Vos Fiches à Imprimer Gratuit et Exercices CP',
        description: `Définissez le format de page selon vos besoins d'impression. Sélectionnez Lettre Portrait pour le papier américain standard. Choisissez A4 Portrait pour le format européen classique. Les formats paysage offrent plus d'espace horizontal pour les illustrations. Le format carré crée des fiches originales parfaites pour Instagram. Déterminez ensuite le contenu visuel de vos fiches maternelle. Le mode sélection manuelle vous permet de choisir précisément les images. Parcourez les thèmes disponibles comme les animaux, les jouets ou les objets scolaires. Recherchez des images spécifiques grâce à la barre de recherche. Sélectionnez 8 objets différents maximum pour vos exercices CP. Le mode tous les thèmes génère automatiquement une sélection variée d'images. Choisissez également si vous utilisez des formes géométriques simples ou des objets réels. Ajoutez un fond thématique et des bordures décoratives pour embellir vos fiches à imprimer gratuit. Réglez l'opacité des fonds pour ne pas surcharger visuellement la page.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générez Vos Fiches Maternelle et Exercices CP avec Apprendre à Lire les Prépositions',
        description: `Cliquez sur le bouton Générer pour créer votre fiche d'exercices instantanément. Le système compose automatiquement la page en quelques secondes. Chaque exercice montre une image avec une préposition manquante ou à identifier. Les questions se répartissent harmonieusement sur la page. Les images sélectionnées apparaissent dans des positions variées illustrant les prépositions choisies. Un chat peut se trouver sous une table. Un oiseau se pose sur une branche. Un ballon flotte au-dessus d'une boîte. Ces situations concrètes aident les élèves de maternelle à visualiser les concepts spatiaux. La mise en page respecte les principes du graphisme maternelle avec des espaces clairs et une hiérarchie visuelle évidente. Les textes utilisent des polices adaptées aux jeunes lecteurs. La taille des caractères facilite la lecture pour les enfants en apprentissage. L'aperçu instantané vous permet d'évaluer le résultat immédiatement. Si le résultat ne vous convient pas entièrement, régénérez simplement pour obtenir une nouvelle disposition des éléments.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Personnalisez Vos Fiches à Imprimer Gratuit Directement sur le Canevas',
        description: `Modifiez chaque élément de vos exercices CP directement sur le canevas de travail. Cliquez sur n'importe quelle image pour la sélectionner. Des poignées de redimensionnement apparaissent autour de l'objet sélectionné. Agrandissez ou réduisez l'image en tirant sur les coins. Faites pivoter l'illustration en utilisant la poignée de rotation circulaire. Déplacez les éléments simplement en les faisant glisser avec votre souris. Supprimez les objets non souhaités en appuyant sur la touche Suppr. Ajoutez du texte personnalisé pour créer un titre accrocheur pour vos fiches maternelle. Tapez le nom de l'élève, la date ou des instructions spécifiques. Sélectionnez le texte pour modifier sa couleur, sa taille ou sa police. Changez les couleurs pour correspondre au thème de votre classe ou à une saison particulière. Importez vos propres photos en cliquant sur le bouton de téléchargement d'images. Ajoutez des photos de votre salle de classe ou d'objets familiers aux enfants. Ces personnalisations rendent vos exercices CP uniques et particulièrement pertinents pour votre groupe d'élèves. Prenez le temps d'ajuster la composition jusqu'à obtenir exactement le résultat souhaité.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez et Imprimez Vos Exercices CP et Fiches Maternelle avec Corrigés',
        description: `Générez d'abord le corrigé en cliquant sur Générer Corrigé dans le menu déroulant. Le système crée automatiquement la version avec les réponses complétées. Passez d'un onglet à l'autre pour comparer la fiche d'exercice et son corrigé. Vérifiez que tout correspond à vos attentes pédagogiques. Cliquez ensuite sur le bouton Télécharger pour accéder aux options d'export. Téléchargez la fiche d'exercice au format PDF pour une impression directe. Le format PDF préserve parfaitement la mise en page et les polices. Téléchargez le corrigé au format PDF également. Le format JPEG convient si vous souhaitez intégrer les fiches à imprimer gratuit dans d'autres documents. Insérez les images JPEG dans vos présentations PowerPoint ou vos newsletters. Tous les téléchargements utilisent une résolution professionnelle 300 DPI. Cette qualité garantit des impressions nettes même sur du papier épais. Imprimez vos fiches maternelle en couleur pour maximiser l'engagement visuel. Choisissez l'impression en noir et blanc pour économiser l'encre de votre imprimante. Photocopiez les exercices CP autant de fois que nécessaire pour toute votre classe. Conservez les fichiers numériques pour réutilisation future ou pour créer des packs de fiches à imprimer gratuit thématiques.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from prepositions.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Les exercices sur les prépositions conviennent à différents profils d\'enseignants et d\'éducateurs. Chaque groupe trouve des avantages spécifiques dans ce générateur de fiches à imprimer gratuit. Les besoins pédagogiques varient selon le contexte d\'enseignement. Notre outil s\'adapte à toutes ces situations. Les six profils d\'utilisateurs principaux bénéficient chacun de fonctionnalités particulières.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - FULL text from prepositions.md FAQ sections
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Les enseignants se posent souvent les mêmes questions avant de s\'abonner. Cette section répond aux interrogations les plus courantes concernant le générateur d\'exercices sur les prépositions. Clarifiez vos doutes avant de commencer à créer vos fiches maternelle. Les réponses détaillées vous aident à comprendre toutes les possibilités de l\'outil.',
    showMoreText: 'Afficher plus de questions',
    showLessText: 'Afficher moins',
    badgeText: 'FAQ',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    secureCheckout: 'Paiement sécurisé',
    cancelAnytime: 'Résiliez à tout moment',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // Related Apps Section
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Votre abonnement Accès Complet vous donne accès à 33 générateurs de fiches pédagogiques différents. Combinez les exercices sur les prépositions avec d\'autres types de fiches pour créer des parcours d\'apprentissage complets. Les enseignants de maternelle et CP bénéficient particulièrement de cette approche intégrée. Créez des packs thématiques couvrant plusieurs compétences simultanément.',
    ctaTitle: 'Prêt à Créer des Fiches Professionnelles sur les Prépositions ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches maternelle et exercices CP professionnels en moins de 3 minutes.',
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

  // Pricing Section
  pricing: {
    title: 'Accès Complet',
    price: '240€',
    priceInterval: '/an',
    priceSuffix: 'Facturé annuellement',
    benefits: [
      '33 générateurs de fiches',
      'Création illimitée de fiches',
      'Qualité professionnelle 300 DPI',
      'Licence commerciale incluse',
      '11 langues disponibles',
      '3000+ images',
      'Corrigés automatiques',
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
};

export default prepositionsFrContent;
