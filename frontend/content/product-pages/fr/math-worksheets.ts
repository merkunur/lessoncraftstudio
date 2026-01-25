import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Math Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/math-worksheets.ts
 * URL: /fr/apps/exercices-maths-fiches
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/math-worksheet.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * CRITICAL: ALL UI labels MUST be in French - ZERO ENGLISH allowed
 */

export const mathWorksheetsFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'exercices-maths-fiches',
    appId: 'math-worksheet',
    title: 'Exercices Maths à Imprimer - Générateur Fiches Maternelle CP CE1',
    description: 'Créez des exercices maths avec notre générateur de fiches maternelle. Fiches à imprimer gratuit pour CP et CE1. Puzzles de décodage visuels. PDF 300 DPI.',
    keywords: 'exercices maths, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, générateur fiches maths, puzzles mathématiques, calcul maternelle, graphisme maternelle, tables de multiplication, coloriage à imprimer, écriture cursive, apprendre à lire, alphabet maternelle',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/exercices-maths-fiches',
      },

  // Hero Section - FULL text from math-worksheet.md paragraphs 1-6
  hero: {
    title: 'Exercices Maths à Imprimer - Générateur de Fiches Maternelle',
    subtitle: 'Créateur de Fiches à Imprimer Gratuit pour CP et CE1',
    description: `Créez des exercices maths professionnels avec notre générateur de fiches mathématiques. Votre abonnement Pack Essentiel à 144€ par an vous donne un accès illimité sans frais supplémentaires par fiche. Générez des fiches à imprimer gratuit parfaitement adaptées aux élèves de maternelle, CP et CE1. Téléchargez des PDF haute qualité en moins de trois minutes.

Notre créateur de fiches maths utilise un système unique de décodage par symboles. Chaque image représente un nombre secret que les élèves doivent découvrir. Les enfants analysent les équations visuelles pour trouver la valeur de chaque symbole. Cette approche développe le raisonnement logique et la pensée mathématique. Les fiches maternelle deviennent des énigmes passionnantes qui captivent les jeunes apprenants.

Le générateur crée des puzzles mathématiques avec 1 à 6 exercices par page. Choisissez parmi quatre niveaux de difficulté selon l'âge des élèves. Le mode très facile utilise seulement deux symboles pour les débutants. Le mode difficile présente quatre symboles pour les élèves avancés. Sélectionnez entre addition seule ou addition et soustraction combinées. Les exercices CP et exercices CE1 s'adaptent parfaitement aux programmes officiels français.

Ces fiches mathématiques fonctionnent idéalement pour les centres de numération et la pratique en autonomie. Les enseignants économisent des heures de préparation chaque semaine. Aucune compétence en design requise pour créer du matériel professionnel. Sélectionnez simplement vos paramètres, choisissez vos images et générez des fiches instantanément. Votre abonnement Pack Essentiel inclut une licence commerciale pour vendre vos créations sur Teachers Pay Teachers ou Etsy.`,
    previewImageSrc: '/samples/french/math/sample-1.jpeg',
    ctaLabels: {
      tryFree: 'Essai Gratuit',
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

  // Sample Gallery - REAL file paths from samples/english/math worksheet/
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

  // Features Grid - FULL descriptions from math-worksheet.md H3 sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur d\'exercices maths inclut sept fonctionnalités puissantes pour créer des fiches maternelle de qualité professionnelle. Votre abonnement Pack Essentiel vous donne accès à toutes les fonctionnalités avec création illimitée. Créez des fiches à imprimer gratuit personnalisées pour les besoins spécifiques de vos élèves. Chaque fonctionnalité travaille ensemble pour vous faire gagner du temps tout en produisant des exercices CP et exercices CE1 de haute qualité.',
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

  // How-To Guide - FULL text from math-worksheet.md Step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créer des exercices maths professionnels prend moins de trois minutes avec notre générateur. Suivez ces cinq étapes simples pour produire des fiches maternelle et des exercices CP de qualité. Aucune expérience en design requise. Aucun logiciel compliqué à apprendre. Sélectionnez simplement vos options et générez des fiches à imprimer gratuit instantanément. Votre abonnement Pack Essentiel vous donne un accès illimité pour créer autant d\'exercices CE1 et de puzzles mathématiques que nécessaire.',
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
        title: 'Choisissez Vos Images pour les Exercices Maths',
        description: 'Commencez par sélectionner les images pour vos puzzles mathématiques. Parcourez plus de 3000 images adaptées aux enfants organisées par thème. Cliquez sur n\'importe quel thème pour voir toutes les images disponibles. Sélectionnez les animaux pour des exercices maths sur le thème du zoo. Choisissez les images de nourriture pour des activités de calcul sur la nutrition. Prenez les images saisonnières pour des fiches maternelle sur les fêtes. Recherchez des images spécifiques en utilisant la barre de recherche par mot-clé. Tapez « pomme » pour trouver les images de fruits parfaites pour les tables de multiplication visuelles. Cherchez « voiture » pour les illustrations de véhicules. Filtrez les résultats pour trouver exactement ce dont vous avez besoin. Cliquez sur les images individuelles pour les sélectionner. Les images sélectionnées apparaissent avec une bordure de mise en évidence. Téléversez vos propres images personnalisées pour des exercices maths uniques. Cliquez sur le bouton de téléversement et sélectionnez des fichiers images. Choisissez plusieurs fichiers pour téléverser plusieurs images simultanément. Utilisez des photos de classe ou des images spécifiques au programme. Combinez les images téléversées avec les images de la bibliothèque sur la même fiche pour préparer les élèves aux tables de multiplication.',
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Configurez les Paramètres de Calcul',
        description: 'Choisissez votre taille et orientation de page pour vos fiches à imprimer gratuit. Sélectionnez Lettre Portrait pour les fiches françaises standard. Prenez A4 Portrait pour l\'impression aux normes européennes. Utilisez le mode Paysage pour des mises en page de problèmes plus larges. Le format Carré fonctionne parfaitement pour les affichages numériques. L\'option de taille personnalisée est disponible pour les besoins spéciaux. Définissez le nombre d\'exercices par fiche selon les capacités des élèves. Choisissez de 1 à 6 puzzles de décodage par page. Moins d\'exercices conviennent mieux aux élèves de maternelle qui découvrent le calcul. Plus d\'exercices challengent les apprenants de CP et CE1. Ajustez selon le temps de travail disponible. Les exercices CP nécessitent généralement 3 à 4 puzzles par page. Sélectionnez le niveau de difficulté parmi quatre options. Le mode très facile utilise deux symboles pour les débutants en numération. Le mode facile convient aux élèves de grande section. Le mode moyen présente trois symboles pour les exercices CE1 standard. Le mode difficile utilise quatre symboles pour stimuler les élèves avancés travaillant vers les tables de multiplication. Configurez les valeurs minimum et maximum pour contrôler la plage de nombres. Définissez les deux sur de petits nombres pour le calcul débutant. Utilisez des plages plus larges pour les exercices maths avancés. Activez l\'option résultats négatifs pour les élèves prêts pour ce défi. Choisissez entre addition seule ou addition et soustraction combinées.',
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Générez Vos Fiches à Imprimer Gratuit',
        description: 'Cliquez sur le bouton Générer pour créer vos exercices maths. Le générateur construit les puzzles en quelques secondes. Des équations aléatoires apparaissent avec vos images sélectionnées. Les symboles colorés se placent selon vos paramètres. La fiche complète apparaît instantanément sur le canevas. Pas d\'attente ni de délais de traitement. L\'aperçu montre exactement ce que les élèves verront. Les puzzles s\'arrangent automatiquement avec un espacement optimal. Le générateur calcule la mise en page selon la taille de page. Plus de puzzles créent un espacement plus serré. Moins de puzzles s\'étalent pour une lecture plus facile. Chaque symbole représente un nombre secret. Les élèves analysent les équations pour décoder les valeurs. Les cases de réponse s\'alignent parfaitement pour les solutions. Régénérez si vous voulez des puzzles différents. Cliquez à nouveau sur Générer pour de nouvelles équations aléatoires. Les images changent à chaque génération. Les valeurs des symboles se randomisent dans vos paramètres. Créez des variations illimitées de fiches maternelle. Combinez avec du coloriage à imprimer pour des packs d\'activités complets. Le texte personnalisé ajouté par l\'utilisateur reste en place pendant la régénération.',
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Modifiez Vos Fiches Maternelle',
        description: 'Personnalisez chaque élément de vos exercices maths en utilisant les outils d\'édition du canevas. Cliquez sur n\'importe quel objet pour le sélectionner. Faites glisser les objets sélectionnés vers de nouvelles positions. Redimensionnez les images en tirant les poignées de coin. Faites pivoter les objets en utilisant la poignée de rotation. Les capacités d\'édition professionnelles transforment vos fiches en outils de graphisme maternelle complets. Ajoutez du texte personnalisé n\'importe où sur vos fiches maternelle. Cliquez sur le bouton Ajouter du Texte et tapez votre contenu. Créez des instructions pour les élèves qui commencent à apprendre à lire. Ajoutez des noms d\'enseignants ou des numéros de classe. Incluez des messages de motivation ou des thèmes. Personnalisez les exercices CP pour des élèves individuels. Intégrez des activités d\'alphabet pour renforcer l\'apprentissage des lettres. Formatez le texte en utilisant le panneau de propriétés. Choisissez parmi sept polices professionnelles adaptées aux enfants. Ajustez la taille de petite à grande selon les besoins de graphisme maternelle. Changez les couleurs pour correspondre aux thèmes de la classe. Ajoutez des contours au texte pour une meilleure visibilité sur les arrière-plans colorés. Soutenez les élèves qui apprennent à lire avec des polices claires et lisibles. Arrangez les objets en utilisant les outils d\'alignement professionnels. Sélectionnez plusieurs objets en cliquant tout en maintenant Shift. Alignez les éléments sélectionnés à gauche, au centre ou à droite. Centrez les objets sur la page pour des mises en page équilibrées. Les boutons Annuler et Rétablir corrigent les erreurs instantanément.',
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Téléchargez et Imprimez',
        description: 'Téléchargez vos exercices maths terminés comme imprimables professionnels. Choisissez le format PDF pour une impression nette et un partage facile. Sélectionnez le format JPEG pour une compatibilité maximale avec tous les appareils. Les deux formats s\'exportent en haute résolution 300 DPI. Qualité parfaite pour l\'impression en classe et les ventes commerciales. Combinez avec des fiches d\'écriture cursive pour des packs d\'apprentissage intégrés. Cliquez sur le menu déroulant Télécharger pour voir toutes les options disponibles. Télécharger Fiche PDF crée un document imprimable haute qualité. Télécharger Fiche de Correction PDF sauvegarde les solutions séparément. Les options JPEG fonctionnent de la même manière pour les exercices CE1. Téléchargez les deux versions pour créer des packs complets de fiches à imprimer gratuit. Activez le mode niveaux de gris avant de télécharger pour économiser l\'encre d\'imprimante. La case à cocher convertit toutes les couleurs en noir et blanc. Les images restent claires et reconnaissables pour le calcul. Le texte reste net et lisible. Parfait pour les écoles avec des contraintes budgétaires. Désactivez les niveaux de gris pour des fiches maternelle colorées qui engagent les jeunes apprenants. Ajoutez des activités d\'écriture pour un apprentissage complet. Les fichiers téléchargés s\'enregistrent immédiatement sur votre ordinateur. Les fichiers se nomment automatiquement avec le type de fiche et l\'horodatage. Organisez les exercices maths téléchargés dans des dossiers par unité ou semaine. Imprimez directement depuis le PDF. Téléversez vers les systèmes de gestion d\'apprentissage. Partagez avec les parents par email ou applications de classe. Créez des packs combinant calcul et écriture cursive pour un apprentissage multi-compétences.',
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL descriptions from math-worksheet.md persona sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Les exercices maths de décodage par symboles bénéficient à de multiples contextes éducatifs. Les enseignants de maternelle utilisent les puzzles visuels pour introduire le raisonnement logique. Les professeurs de CP et CE1 renforcent les faits mathématiques avec une pratique stimulante. Les parents en instruction à domicile créent des exercices personnalisés pour leurs enfants. Les enseignants spécialisés adaptent les fiches aux besoins individuels. Les enseignants entrepreneurs vendent leurs créations sur les plateformes éducatives. Votre abonnement Pack Essentiel sert tous ces objectifs avec une seule inscription.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - ALL 12 questions from math-worksheet.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Découvrez les réponses aux questions les plus posées sur notre générateur de puzzles mathématiques. Cette FAQ couvre les fonctionnalités, les prix et les utilisations pédagogiques. Trouvez rapidement les informations dont vous avez besoin pour créer des exercices de décodage efficaces. Apprenez comment optimiser l\'outil pour vos élèves et préparer les tables de multiplication avec des activités engageantes.',
    showMoreText: 'Afficher plus de questions',
    showLessText: 'Afficher moins',
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
      'Fiches de correction incluses',
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
    sectionDescription: 'Notre plateforme propose 33 générateurs de fiches différents au-delà des exercices maths. Combinez les fiches mathématiques avec des fiches de phonétique, d\'alphabet, de mots fréquents, de traçage et de coloriage pour des packs d\'apprentissage complets. Créez des lots de fiches CP thématiques couvrant plusieurs matières en utilisant les mêmes images. Les enseignants de maternelle construisent des unités intégrées en générant des exercices maths, des fiches ABC, des fiches de traçage de lettres et plus, tous correspondant au même thème. Votre abonnement Pack Essentiel inclut l\'accès à tous les types de fiches. Générez des fiches à imprimer gratuit illimitées couvrant lecture, maths, écriture et art. Cette approche complète crée des collections de fiches cohérentes que les élèves adorent.',
    ctaTitle: 'Prêt à Créer des Fiches Exceptionnelles ?',
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

export default mathWorksheetsFrContent;
