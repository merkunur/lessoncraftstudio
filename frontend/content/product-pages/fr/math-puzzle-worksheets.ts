import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Math Puzzle Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/math-puzzle-worksheets.ts
 * URL: /fr/apps/puzzle-maths-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/math-worksheet.md
 * App ID: math-puzzle (symbol decoding puzzles)
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const mathPuzzleFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'puzzle-maths-fiches',
    appId: 'math-puzzle',
    title: 'Puzzle Maths à Imprimer | Décodage Maternelle CP',
    description: 'Créez des puzzles maths avec décodage par symboles visuels et 3 000+ images. Générateur pour maternelle, CP et CE1. Fiches à imprimer en PDF haute qualité.',
    keywords: 'puzzle maths, exercices maths, décodage symboles, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, énigmes mathématiques, générateur fiches, calcul visuel',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/puzzle-maths-fiches',
      },

  // Hero Section - FULL text from math-worksheet.md paragraphs 1-4
  hero: {
    title: 'Puzzle Maths Décodage',
    subtitle: 'Fiches à Imprimer Gratuit pour la Maternelle et le CP',
    description: `Créez des exercices maths professionnels avec notre générateur de puzzles mathématiques. Votre abonnement Accès Complet à 240€ par an vous donne un accès illimité sans frais supplémentaires par fiche. Générez des fiches à imprimer gratuit parfaitement adaptées aux élèves de maternelle, CP et CE1. Téléchargez des PDF haute qualité en moins de trois minutes.

Notre créateur de fiches maths utilise un système unique de décodage par symboles. Chaque image représente un nombre secret que les élèves doivent découvrir. Les enfants analysent les équations visuelles pour trouver la valeur de chaque symbole. Cette approche développe le raisonnement logique et la pensée mathématique. Les fiches maternelle deviennent des énigmes passionnantes qui captivent les jeunes apprenants.

Le générateur crée des puzzles mathématiques avec 1 à 6 exercices par page. Choisissez parmi quatre niveaux de difficulté selon l'âge des élèves. Le mode très facile utilise seulement deux symboles pour les débutants. Le mode difficile présente quatre symboles pour les élèves avancés. Sélectionnez entre addition seule ou addition et soustraction combinées. Les exercices CP et exercices CE1 s'adaptent parfaitement aux programmes officiels français.`,
    previewImageSrc: '/samples/french/math-puzzle/sample-1.jpeg',
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
        videoId: 'n5QO39Lq5l8',
        buttonText: 'Fonctions Puzzle Maths',
        modalTitle: 'Tutoriel Puzzle Maths',
      },
    },
  },

  // Sample Gallery - REAL file paths from samples/english/math puzzle/
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

  // Features Grid - FULL text from math-worksheet.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de puzzles maths inclut sept fonctionnalités puissantes pour créer des fiches de décodage de qualité professionnelle. Votre abonnement Accès Complet vous donne accès à toutes les fonctionnalités avec création illimitée.',
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

  // How-To Guide - FULL text from math-worksheet.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créer des puzzles maths professionnels prend moins de trois minutes avec notre générateur. Suivez ces cinq étapes simples pour produire des fiches de décodage de qualité. Aucune expérience en design requise.',
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
        description: `Commencez par sélectionner les images pour vos puzzles mathématiques. Parcourez plus de 3000 images adaptées aux enfants organisées par thème. Cliquez sur n'importe quel thème pour voir toutes les images disponibles. Sélectionnez les animaux pour des exercices maths sur le thème du zoo. Choisissez les images de nourriture pour des activités de calcul sur la nutrition.

Recherchez des images spécifiques en utilisant la barre de recherche par mot-clé. Tapez « pomme » pour trouver les images de fruits parfaites. Cherchez « voiture » pour les illustrations de véhicules. Filtrez les résultats pour trouver exactement ce dont vous avez besoin. Cliquez sur les images individuelles pour les sélectionner. Les images sélectionnées apparaissent avec une bordure de mise en évidence.

Téléversez vos propres images personnalisées pour des puzzles maths uniques. Cliquez sur le bouton de téléversement et sélectionnez des fichiers images. Choisissez plusieurs fichiers pour téléverser plusieurs images simultanément. Utilisez des photos de classe ou des images spécifiques au programme. Combinez les images téléversées avec les images de la bibliothèque sur la même fiche.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configurez les Paramètres',
        description: `Choisissez votre taille et orientation de page pour vos fiches à imprimer gratuit. Sélectionnez Lettre Portrait pour les fiches françaises standard. Prenez A4 Portrait pour l'impression aux normes européennes. Utilisez le mode Paysage pour des mises en page plus larges. Le format Carré fonctionne parfaitement pour les affichages numériques.

Définissez le nombre d'exercices par fiche selon les capacités des élèves. Choisissez de 1 à 6 puzzles de décodage par page. Moins d'exercices conviennent mieux aux élèves de maternelle qui découvrent le calcul. Plus d'exercices challengent les apprenants de CP et CE1.

Sélectionnez le niveau de difficulté parmi quatre options. Le mode très facile utilise deux symboles pour les débutants. Le mode facile convient aux élèves de grande section. Le mode moyen présente trois symboles pour les exercices CE1 standard. Le mode difficile utilise quatre symboles pour stimuler les élèves avancés.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générez la Fiche',
        description: `Cliquez sur le bouton Générer pour créer vos puzzles maths. Le générateur construit les puzzles en quelques secondes. Des équations aléatoires apparaissent avec vos images sélectionnées. Les symboles colorés se placent selon vos paramètres. La fiche complète apparaît instantanément sur le canevas. Pas d'attente ni de délais de traitement. L'aperçu montre exactement ce que les élèves verront.

Les puzzles s'arrangent automatiquement avec un espacement optimal. Le générateur calcule la mise en page selon la taille de page. Plus de puzzles créent un espacement plus serré. Moins de puzzles s'étalent pour une lecture plus facile. Chaque symbole représente un nombre secret. Les élèves analysent les équations pour décoder les valeurs.

Régénérez si vous voulez des puzzles différents. Cliquez à nouveau sur Générer pour de nouvelles équations aléatoires. Les images changent à chaque génération. Les valeurs des symboles se randomisent dans vos paramètres. Créez des variations illimitées de fiches maternelle.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Personnalisez le Contenu',
        description: `Personnalisez chaque élément de vos puzzles maths en utilisant les outils d'édition du canevas. Cliquez sur n'importe quel objet pour le sélectionner. Faites glisser les objets sélectionnés vers de nouvelles positions. Redimensionnez les images en tirant les poignées de coin. Faites pivoter les objets en utilisant la poignée de rotation.

Ajoutez du texte personnalisé n'importe où sur vos fiches maternelle. Cliquez sur le bouton Ajouter du Texte et tapez votre contenu. Créez des instructions pour les élèves. Ajoutez des noms d'enseignants ou des numéros de classe. Incluez des messages de motivation ou des thèmes. Personnalisez les exercices CP pour des élèves individuels.

Formatez le texte en utilisant le panneau de propriétés. Choisissez parmi sept polices professionnelles adaptées aux enfants. Ajustez la taille de petite à grande selon les besoins. Changez les couleurs pour correspondre aux thèmes de la classe. Les boutons Annuler et Rétablir corrigent les erreurs instantanément.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez et Imprimez',
        description: `Téléchargez vos puzzles maths terminés comme imprimables professionnels. Choisissez le format PDF pour une impression nette et un partage facile. Sélectionnez le format JPEG pour une compatibilité maximale avec tous les appareils. Les deux formats s'exportent en haute résolution 300 DPI. Qualité parfaite pour l'impression en classe et les ventes commerciales.

Cliquez sur le menu déroulant Télécharger pour voir toutes les options disponibles. Télécharger Fiche (PDF) crée un document imprimable haute qualité. Télécharger Fiche de Correction (PDF) sauvegarde les solutions séparément. Les options JPEG fonctionnent de la même manière. Téléchargez les deux versions pour créer des packs complets de fiches à imprimer gratuit.

Activez le mode niveaux de gris avant de télécharger pour économiser l'encre d'imprimante. La case à cocher convertit toutes les couleurs en noir et blanc. Les images restent claires et reconnaissables pour le calcul. Parfait pour les écoles avec des contraintes budgétaires.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from math-worksheet.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Les puzzles de décodage mathématique bénéficient à de multiples contextes éducatifs. Les enseignants de maternelle utilisent les puzzles visuels pour introduire le raisonnement logique. Les professeurs de CP et CE1 renforcent les faits mathématiques avec une pratique stimulante.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from math-worksheet.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Questions fréquentes sur notre générateur de puzzles maths et nos fiches à imprimer gratuit.',
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
        question: 'Comment fonctionne le g\u00e9n\u00e9rateur de puzzles maths ?',
        answer: 'Le g\u00e9n\u00e9rateur cr\u00e9e des \u00e9quations visuelles o\u00f9 chaque image repr\u00e9sente un nombre secret. Les \u00e9l\u00e8ves analysent les \u00e9quations pour d\u00e9couvrir la valeur cach\u00e9e de chaque symbole. Cette approche de d\u00e9codage transforme les exercices maths en \u00e9nigmes passionnantes.',
      },
      {
        id: 'faq-2',
        question: 'Quelles op\u00e9rations math\u00e9matiques sont support\u00e9es ?',
        answer: 'Le g\u00e9n\u00e9rateur propose l\u2019addition seule ou l\u2019addition et la soustraction combin\u00e9es. Vous pouvez configurer les plages de nombres et activer les r\u00e9sultats n\u00e9gatifs pour les \u00e9l\u00e8ves avanc\u00e9s. Les op\u00e9rations s\u2019adaptent aux programmes de maternelle, CP et CE1.',
      },
      {
        id: 'faq-3',
        question: 'Peut-on ajuster la difficult\u00e9 des puzzles maths ?',
        answer: 'Oui, quatre niveaux de difficult\u00e9 sont disponibles. Le mode tr\u00e8s facile utilise deux symboles pour les d\u00e9butants de maternelle. Le mode difficile pr\u00e9sente quatre symboles et des op\u00e9rations mixtes pour les exercices CE1 avanc\u00e9s.',
      },
      {
        id: 'faq-4',
        question: 'Comment fonctionne le syst\u00e8me de d\u00e9codage par symboles ?',
        answer: 'Chaque image de la fiche repr\u00e9sente un nombre que l\u2019\u00e9l\u00e8ve doit d\u00e9couvrir en r\u00e9solvant les \u00e9quations. Les enfants utilisent la logique et le calcul pour d\u00e9terminer la valeur de chaque symbole. Les r\u00e9ponses correctes r\u00e9v\u00e8lent le code secret du puzzle.',
      },
      {
        id: 'faq-5',
        question: 'Pour quels niveaux scolaires les puzzles maths sont-ils adapt\u00e9s ?',
        answer: 'Les puzzles maths conviennent de la maternelle au CE1 avec une complexit\u00e9 progressive. Les fiches maternelle utilisent des nombres simples et peu de symboles. Les exercices CP et CE1 int\u00e8grent des op\u00e9rations plus complexes avec des plages de nombres \u00e9largies.',
      },
      {
        id: 'faq-6',
        question: 'Quels formats de fichier sont disponibles pour les fiches puzzle maths ?',
        answer: 'Les fiches se t\u00e9l\u00e9chargent en PDF pour l\u2019impression professionnelle ou en JPEG pour le partage num\u00e9rique. La r\u00e9solution 300 DPI assure que les symboles, la l\u00e9gende de d\u00e9codage et les \u00e9quations restent parfaitement nets et lisibles.',
      },
      {
        id: 'faq-7',
        question: 'Le g\u00e9n\u00e9rateur de puzzle maths fonctionne-t-il en plusieurs langues ?',
        answer: 'Oui, onze langues sont support\u00e9es pour les noms d\u2019images dans la biblioth\u00e8que. La recherche et les \u00e9tiquettes s\u2019adaptent \u00e0 la langue s\u00e9lectionn\u00e9e. Les \u00e9quations math\u00e9matiques \u00e9tant universelles, les fiches fonctionnent dans toutes les langues.',
      },
      {
        id: 'faq-8',
        question: 'Comment fonctionnent les quatre niveaux de difficult\u00e9 ?',
        answer: 'Le niveau tr\u00e8s facile utilise 2 symboles avec addition seule pour les d\u00e9butants. Le niveau facile propose 3 symboles. Le niveau moyen ajoute la soustraction aux op\u00e9rations. Le niveau difficile combine 4 symboles avec addition et soustraction pour un d\u00e9fi cognitif complet.',
      },
      {
        id: 'faq-9',
        question: 'Comment optimiser l\u2019impression des fiches puzzle maths ?',
        answer: 'Imprimez le PDF en qualit\u00e9 maximale sur papier A4 blanc. La l\u00e9gende de d\u00e9codage en haut doit \u00eatre clairement visible car les \u00e9l\u00e8ves s\u2019y r\u00e9f\u00e8rent constamment. V\u00e9rifiez que les symboles images sont bien identifiables dans les \u00e9quations.',
      },
      {
        id: 'faq-10',
        question: 'Puis-je vendre les fiches puzzle maths cr\u00e9\u00e9es ?',
        answer: 'Oui, votre abonnement Acc\u00e8s Complet inclut une licence commerciale pour toutes les cr\u00e9ations. Les cahiers de puzzles math\u00e9matiques th\u00e9matiques sont tr\u00e8s recherch\u00e9s sur les plateformes \u00e9ducatives. Cr\u00e9ez des s\u00e9ries progressives pour un contenu attractif.',
      },
      {
        id: 'faq-11',
        question: 'Comment fonctionne l\u2019abonnement pour le g\u00e9n\u00e9rateur de puzzle maths ?',
        answer: 'L\u2019abonnement Acc\u00e8s Complet \u00e0 240 \u20ac par an donne acc\u00e8s aux 33 g\u00e9n\u00e9rateurs, dont le puzzle maths. Cr\u00e9ation illimit\u00e9e de fiches avec corrig\u00e9s automatiques. Paiement s\u00e9curis\u00e9 et r\u00e9siliation disponible \u00e0 tout moment.',
      },
      {
        id: 'faq-12',
        question: 'Peut-on utiliser des images personnalis\u00e9es comme symboles ?',
        answer: 'Oui, t\u00e9l\u00e9versez vos propres images pour remplacer celles de la biblioth\u00e8que. Les mascottes d\u2019\u00e9cole, les photos d\u2019objets ou les dessins d\u2019\u00e9l\u00e8ves deviennent des symboles math\u00e9matiques personnalis\u00e9s. Cela rend les puzzles plus motivants et concrets.',
      },
      {
        id: 'faq-13',
        question: 'Les puzzles maths sont-ils conformes au programme scolaire ?',
        answer: 'Oui, le d\u00e9codage de symboles et le calcul mental sont des comp\u00e9tences cl\u00e9s des cycles 1 et 2. Les puzzles combinent logique d\u00e9ductive et calcul, pr\u00e9parant aux probl\u00e8mes math\u00e9matiques plus complexes. Les plages de nombres correspondent aux attendus de chaque niveau.',
      },
      {
        id: 'faq-14',
        question: 'Comment adapter les puzzles maths pour les \u00e9l\u00e8ves en difficult\u00e9 ?',
        answer: 'Choisissez le niveau tr\u00e8s facile avec 2 symboles et des nombres de 1 \u00e0 5. L\u2019addition seule simplifie le raisonnement. Agrandissez la l\u00e9gende sur le canevas pour am\u00e9liorer la lisibilit\u00e9 et r\u00e9duisez le nombre d\u2019\u00e9quations par fiche.',
      },
      {
        id: 'faq-15',
        question: 'Quels formats de page sont propos\u00e9s pour les puzzles maths ?',
        answer: 'Les formats Letter et A4 sont disponibles en portrait ou paysage. Le portrait A4 convient parfaitement avec la l\u00e9gende en haut et les \u00e9quations en dessous. Le format paysage offre plus d\u2019espace horizontal pour les \u00e9quations longues.',
      },
      {
        id: 'faq-16',
        question: 'L\u2019option niveaux de gris fonctionne-t-elle avec les symboles images ?',
        answer: 'Oui, les images symboles restent reconnaissables en noir et blanc gr\u00e2ce \u00e0 leurs contours distinctifs. Toutefois, les versions couleur sont recommand\u00e9es pour les plus jeunes car les couleurs facilitent l\u2019identification rapide des symboles dans les \u00e9quations.',
      },
      {
        id: 'faq-17',
        question: 'Comment personnaliser le puzzle maths sur le canevas ?',
        answer: 'D\u00e9placez la l\u00e9gende et les \u00e9quations librement sur la page. Redimensionnez les symboles pour les adapter aux besoins des \u00e9l\u00e8ves. Ajoutez un titre personnalis\u00e9, des consignes sp\u00e9cifiques ou le nom de l\u2019\u00e9l\u00e8ve avec les polices disponibles.',
      },
      {
        id: 'faq-18',
        question: 'Peut-on combiner le puzzle maths avec d\u2019autres g\u00e9n\u00e9rateurs ?',
        answer: 'Oui, associez les puzzles maths avec l\u2019addition classique pour varier les approches de calcul. Combinez avec l\u2019addition cod\u00e9e pour renforcer le d\u00e9codage ou avec les coloriages pour des pauses cr\u00e9atives. Ces associations cr\u00e9ent des cahiers \u00e9quilibr\u00e9s.',
      },
      {
        id: 'faq-19',
        question: 'Quels avantages cognitifs offrent les puzzles maths ?',
        answer: 'Les puzzles sollicitent la m\u00e9moire de travail en obligeant l\u2019\u00e9l\u00e8ve \u00e0 retenir les valeurs des symboles. La logique d\u00e9ductive s\u2019exerce par \u00e9limination progressive. Le va-et-vient entre la l\u00e9gende et les \u00e9quations d\u00e9veloppe la flexibilit\u00e9 cognitive et l\u2019autonomie.',
      },
      {
        id: 'faq-20',
        question: 'Combien de temps faut-il pour cr\u00e9er un puzzle maths ?',
        answer: 'La cr\u00e9ation prend moins de trois minutes. S\u00e9lectionnez les images symboles, d\u00e9finissez le niveau de difficult\u00e9 et les plages de nombres, puis cliquez sur Cr\u00e9er. Le puzzle avec sa l\u00e9gende et son corrig\u00e9 sont g\u00e9n\u00e9r\u00e9s instantan\u00e9ment.',
      },
    ],

  },

  // Pricing
  pricing: {
    title: 'Accès Complet',
    price: '240€',
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

  // Related Apps
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Créez des paquets d\'apprentissage complets en combinant les puzzles maths avec ces générateurs complémentaires.',
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

export default mathPuzzleFrContent;
