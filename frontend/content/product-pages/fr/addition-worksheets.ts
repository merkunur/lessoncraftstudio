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
    title: 'Fiches d\'Addition à Imprimer | Générateur Maternelle CP',
    description: 'Créez des fiches d\'addition personnalisées avec 4 modes d\'exercices et corrigés automatiques. Parfait pour maternelle et CP. PDF haute qualité en 3 minutes.',
    keywords: 'fiches addition, exercices maths, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, addition avec images, générateur fiches, mathématiques maternelle, calcul visuel',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/addition-fiches',
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
    videos: {
      commonFeatures: {
        videoId: 'Df9fknBBRFA',
        buttonText: 'Découvrir en vidéo',
        modalTitle: 'Aperçu des fonctionnalités',
      },
      appSpecific: {
        videoId: '6O5aCzHkh8M',
        buttonText: 'Fonctions Addition',
        modalTitle: 'Tutoriel Addition',
      },
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
    secureCheckout: 'Paiement s\u00e9curis\u00e9',
    cancelAnytime: 'R\u00e9siliez \u00e0 tout moment',
    items: [
      {
        id: 'faq-1',
        question: 'Comment fonctionne le g\u00e9n\u00e9rateur de fiches d\'addition avec images ?',
        answer: 'Notre g\u00e9n\u00e9rateur propose cinq modes d\'exercices diff\u00e9rents : image + image, image + nombre, nombre + image, trouver l\'addend manquant et mode mixte. Chaque mode utilise des images color\u00e9es pour illustrer les op\u00e9rations d\'addition, ce qui rend l\'apprentissage visuel et concret. Les \u00e9l\u00e8ves comptent les objets repr\u00e9sent\u00e9s puis \u00e9crivent le r\u00e9sultat de l\'addition.',
      },
      {
        id: 'faq-2',
        question: '\u00c0 quel \u00e2ge et quel niveau scolaire sont destin\u00e9es les fiches d\'addition ?',
        answer: 'Les fiches d\'addition sont con\u00e7ues pour les enfants de la maternelle au CE1, soit environ de 4 \u00e0 8 ans. Vous pouvez ajuster les plages de nombres pour adapter la difficult\u00e9 : des nombres de 1 \u00e0 5 pour la maternelle, de 1 \u00e0 10 pour le CP, et jusqu\'\u00e0 20 pour le CE1. Cette flexibilit\u00e9 permet de suivre la progression de chaque \u00e9l\u00e8ve.',
      },
      {
        id: 'faq-3',
        question: 'Puis-je personnaliser la difficult\u00e9 des exercices d\'addition ?',
        answer: 'Oui, vous avez un contr\u00f4le total sur la difficult\u00e9. D\u00e9finissez les valeurs minimales et maximales des op\u00e9randes, choisissez le nombre d\'exercices par fiche (de 1 \u00e0 10), et s\u00e9lectionnez le mode d\'exercice souhait\u00e9. Ces param\u00e8tres permettent de cr\u00e9er des fiches parfaitement adapt\u00e9es au niveau de vos \u00e9l\u00e8ves.',
      },
      {
        id: 'faq-4',
        question: 'Les fiches d\'addition incluent-elles un corrig\u00e9 ?',
        answer: 'Oui, chaque fiche d\'addition g\u00e9n\u00e8re automatiquement un corrig\u00e9 correspondant. Le corrig\u00e9 reprend la m\u00eame mise en page que la fiche \u00e9l\u00e8ve avec toutes les r\u00e9ponses compl\u00e9t\u00e9es. Vous pouvez t\u00e9l\u00e9charger la fiche et le corrig\u00e9 s\u00e9par\u00e9ment en format PDF ou JPEG.',
      },
      {
        id: 'faq-5',
        question: 'Quels th\u00e8mes d\'images sont disponibles pour les fiches d\'addition ?',
        answer: 'Notre biblioth\u00e8que contient plus de 3000 images r\u00e9parties dans plus de 50 cat\u00e9gories th\u00e9matiques : animaux, v\u00e9hicules, fruits, saisons, f\u00eates et bien d\'autres. Vous pouvez \u00e9galement t\u00e9l\u00e9verser vos propres images personnalis\u00e9es pour cr\u00e9er des fiches d\'addition uniques, parfaitement adapt\u00e9es \u00e0 votre programme scolaire.',
      },
      {
        id: 'faq-6',
        question: 'Quels formats de fichier sont disponibles pour le t\u00e9l\u00e9chargement ?',
        answer: 'Les fiches d\'addition se t\u00e9l\u00e9chargent en format PDF pour une impression nette ou en JPEG pour un partage num\u00e9rique facile. Les deux formats offrent une r\u00e9solution professionnelle de 300 DPI, garantissant des images claires et des lignes pr\u00e9cises sur papier.',
      },
      {
        id: 'faq-7',
        question: 'Combien de langues sont disponibles pour les fiches d\'addition ?',
        answer: 'Le g\u00e9n\u00e9rateur prend en charge onze langues : fran\u00e7ais, anglais, allemand, espagnol, portugais, italien, n\u00e9erlandais, su\u00e9dois, danois, norv\u00e9gien et finnois. Les noms des images s\'adaptent automatiquement \u00e0 la langue choisie dans la biblioth\u00e8que.',
      },
      {
        id: 'faq-8',
        question: 'Quels modes d\'exercices propose le g\u00e9n\u00e9rateur d\'addition ?',
        answer: 'Cinq modes sont disponibles : image plus image, image plus nombre, nombre plus image, trouver l\'addend manquant et mode mixte. Le mode image plus image convient aux d\u00e9butants de maternelle, tandis que le mode mixte offre une vari\u00e9t\u00e9 d\'exercices sur une m\u00eame fiche pour les \u00e9l\u00e8ves de CP.',
      },
      {
        id: 'faq-9',
        question: 'Comment optimiser l\'impression des fiches d\'addition ?',
        answer: 'Pour une impression optimale, t\u00e9l\u00e9chargez le format PDF et imprimez en qualit\u00e9 maximale sur du papier standard A4 ou Letter. Activez l\'option niveaux de gris pour \u00e9conomiser l\'encre couleur. Le format 300 DPI garantit des r\u00e9sultats nets m\u00eame avec les images color\u00e9es.',
      },
      {
        id: 'faq-10',
        question: 'Puis-je vendre les fiches d\'addition cr\u00e9\u00e9es ?',
        answer: 'Oui, votre abonnement inclut une licence commerciale compl\u00e8te. Vous pouvez vendre les fiches d\'addition sur des plateformes comme Teachers Pay Teachers ou Etsy. Aucune restriction sur le nombre de fiches vendues ni sur les revenus g\u00e9n\u00e9r\u00e9s.',
      },
      {
        id: 'faq-11',
        question: 'Comment fonctionne l\'abonnement pour le g\u00e9n\u00e9rateur d\'addition ?',
        answer: 'L\'abonnement Pack Essentiel \u00e0 144 \u20ac par an donne acc\u00e8s illimit\u00e9 \u00e0 10 g\u00e9n\u00e9rateurs de fiches, dont l\'addition. Aucun frais suppl\u00e9mentaire par fiche cr\u00e9\u00e9e. Vous pouvez r\u00e9silier \u00e0 tout moment depuis votre espace client.',
      },
      {
        id: 'faq-12',
        question: 'Comment utiliser mes propres images pour les fiches d\'addition ?',
        answer: 'Cliquez sur le bouton de t\u00e9l\u00e9versement et s\u00e9lectionnez vos fichiers images au format JPEG, PNG ou GIF. Vos images apparaissent dans la biblioth\u00e8que personnelle et peuvent \u00eatre utilis\u00e9es seules ou combin\u00e9es avec les 3000 images de la biblioth\u00e8que.',
      },
      {
        id: 'faq-13',
        question: 'Les fiches d\'addition respectent-elles le programme scolaire fran\u00e7ais ?',
        answer: 'Les fiches s\'adaptent parfaitement aux programmes de maternelle, CP et CE1. Les plages de nombres de 1 \u00e0 5 correspondent aux attendus de grande section, de 1 \u00e0 10 au CP, et jusqu\'\u00e0 20 au CE1. Chaque fiche renforce les comp\u00e9tences de calcul et de num\u00e9ration du cycle 1 et 2.',
      },
      {
        id: 'faq-14',
        question: 'Comment adapter les fiches d\'addition pour les \u00e9l\u00e8ves en difficult\u00e9 ?',
        answer: 'R\u00e9duisez le nombre de probl\u00e8mes par fiche \u00e0 1 ou 2 et limitez la plage de nombres \u00e0 1-3. Le mode image plus image est le plus accessible pour les d\u00e9butants. Vous pouvez aussi agrandir les images et espacer les exercices pour une meilleure lisibilit\u00e9.',
      },
      {
        id: 'faq-15',
        question: 'Quels formats de page sont propos\u00e9s pour les fiches d\'addition ?',
        answer: 'Quatre formats sont disponibles : Letter Portrait, Letter Paysage, A4 Portrait et A4 Paysage. Le format A4 Portrait est le plus utilis\u00e9 en France pour les fiches scolaires. Le format carr\u00e9 convient aux publications num\u00e9riques et r\u00e9seaux sociaux.',
      },
      {
        id: 'faq-16',
        question: 'L\'option noir et blanc est-elle disponible pour les fiches d\'addition ?',
        answer: 'Oui, la case niveaux de gris convertit toutes les couleurs en noir et blanc avant le t\u00e9l\u00e9chargement. Les images restent claires et reconnaissables. Cette option est id\u00e9ale pour les \u00e9coles qui souhaitent r\u00e9duire les co\u00fbts d\'impression couleur.',
      },
      {
        id: 'faq-17',
        question: 'Comment personnaliser la fiche d\'addition sur le canevas ?',
        answer: 'Cliquez sur n\'importe quel \u00e9l\u00e9ment pour le s\u00e9lectionner, puis d\u00e9placez-le, redimensionnez-le ou faites-le pivoter. Ajoutez du texte personnalis\u00e9 avec sept polices professionnelles. Les boutons Annuler et R\u00e9tablir permettent de corriger toute modification instantan\u00e9ment.',
      },
      {
        id: 'faq-18',
        question: 'Puis-je combiner les fiches d\'addition avec d\'autres g\u00e9n\u00e9rateurs ?',
        answer: 'Oui, votre abonnement donne acc\u00e8s \u00e0 tous les g\u00e9n\u00e9rateurs de la plateforme. Cr\u00e9ez des packs p\u00e9dagogiques en combinant addition avec soustraction, coloriages ou mots crois\u00e9s. Les \u00e9l\u00e8ves b\u00e9n\u00e9ficient ainsi d\'un apprentissage vari\u00e9 et engageant.',
      },
      {
        id: 'faq-19',
        question: 'Comment suivre la progression des \u00e9l\u00e8ves avec les fiches d\'addition ?',
        answer: 'Cr\u00e9ez des fiches de difficult\u00e9 croissante en augmentant progressivement les plages de nombres et le nombre de probl\u00e8mes. Le corrig\u00e9 automatique facilite la correction rapide. Vous pouvez g\u00e9n\u00e9rer des fiches sp\u00e9cifiques pour \u00e9valuer les comp\u00e9tences individuelles.',
      },
      {
        id: 'faq-20',
        question: 'Combien de temps faut-il pour cr\u00e9er une fiche d\'addition ?',
        answer: 'Moins de trois minutes du d\u00e9but au t\u00e9l\u00e9chargement. S\u00e9lectionnez un th\u00e8me d\'images, configurez les param\u00e8tres de difficult\u00e9 et cliquez sur G\u00e9n\u00e9rer. La fiche et son corrig\u00e9 sont pr\u00eats imm\u00e9diatement. Aucune comp\u00e9tence en design n\'est requise.',
      },
    ],

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
