import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Cryptogram Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/cryptogram-worksheets.ts
 * URL: /fr/apps/cryptogramme-images-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/cryptogram.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Accès Complet = €240/an (Accès Complet)
 * App ID: image-cryptogram
 */

export const cryptogramFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'cryptogramme-images-fiches',
    appId: 'cryptogram',
    title: 'Cryptogramme en Images | Fiches Maternelle et Exercices CP pour',
    description: 'Créez des cryptogrammes en images professionnels avec notre générateur de fiches à imprimer gratuit. Votre abonnement Accès Complet à 240 € par an vous permet.',
    keywords: 'cryptogramme en images, fiches maternelle, exercices CP, fiches à imprimer gratuit, apprendre à lire, fiches alphabet, graphisme maternelle, exercices maths, apprendre les lettres, coloriage à imprimer, écriture cursive, tables de multiplication, exercices CE1',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/cryptogramme-images-fiches',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/cryptogram/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Cryptogramme en images fiches gratuites - exercices décodage pour maternelle et CP'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/cryptogram/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiches cryptogramme à imprimer gratuit - apprendre les lettres pour enfants'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/cryptogram/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Cryptogramme vocabulaire fiches maternelle - exercices CP graphisme'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/cryptogram/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiches alphabet cryptogramme images - apprendre à lire pour maternelle'
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/cryptogram/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Cryptogramme en images exercices CP - fiches à imprimer gratuit pour enfants'
      }
    ],
  },

  // Hero Section - FULL text from cryptogram.md paragraphs 1-4
  hero: {
    title: 'Générateur de Cryptogrammes en Images',
    subtitle: 'Fiches Maternelle et Exercices CP pour Apprendre à Lire',
    description: `Créez des cryptogrammes en images professionnels avec notre générateur de fiches à imprimer gratuit. Votre abonnement Accès Complet à 240 € par an vous permet de générer des fiches maternelle et exercices CP illimités sans frais par fiche. Créez des cryptogrammes personnalisés parfaits pour apprendre à lire en maternelle, CP et CE1. Téléchargez des fiches pédagogiques de haute qualité en PDF en moins de 3 minutes.

Notre générateur de cryptogrammes combine l'apprentissage de l'alphabet avec le décodage de messages secrets. Les enfants regardent les images qui remplacent les lettres et déchiffrent les phrases cachées. Parfait pour les fiches maternelle centrées sur apprendre les lettres et la logique. Chaque cryptogramme renforce les compétences en lecture et écriture tout en gardant les élèves engagés avec des énigmes amusantes.

Les enseignants utilisent nos cryptogrammes pour créer des exercices CE1 et exercices CP adaptés à leur vocabulaire d'enseignement. Sélectionnez parmi 3000 images ou téléchargez vos propres photos. Générez des fiches à imprimer gratuit qui correspondent parfaitement à votre programme de classe. Chaque fiche est entièrement personnalisable avec des arrière-plans, des bordures et du texte. Les cryptogrammes développent la pensée critique et les compétences en résolution de problèmes.

Générez votre premier cryptogramme en 3 clics. Tapez une phrase et assignez des images aux lettres. Cliquez sur Générer et téléchargez votre fiche PDF. Simple, rapide et professionnel pour toutes vos fiches maternelle et exercices maths.`,
    previewImageSrc: '/samples/french/cryptogram/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/cryptogram/
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
        worksheetSrc: '/samples/french/cryptogram/sample-1.jpeg',
        answerKeySrc: '/samples/french/cryptogram/sample-1.jpeg',
        altText: 'Cryptogramme en images fiches gratuites - exercices décodage pour maternelle et CP',
        imageTitle: 'Cryptogramme en images fiches gratuites',
      },
      {
        id: 'sample-2',
        worksheetSrc: '/samples/french/cryptogram/sample-2.jpeg',
        answerKeySrc: '/samples/french/cryptogram/sample-2.jpeg',
        altText: 'Fiches cryptogramme à imprimer gratuit - apprendre les lettres pour enfants',
        imageTitle: 'Fiches cryptogramme à imprimer gratuit',
      },
      {
        id: 'sample-3',
        worksheetSrc: '/samples/french/cryptogram/sample-3.jpeg',
        answerKeySrc: '/samples/french/cryptogram/sample-3.jpeg',
        altText: 'Cryptogramme vocabulaire fiches maternelle - exercices CP graphisme',
        imageTitle: 'Cryptogramme vocabulaire fiches maternelle',
      },
      {
        id: 'sample-4',
        worksheetSrc: '/samples/french/cryptogram/sample-4.jpeg',
        answerKeySrc: '/samples/french/cryptogram/sample-4.jpeg',
        altText: 'Fiches alphabet cryptogramme images - apprendre à lire pour maternelle',
        imageTitle: 'Fiches alphabet cryptogramme images',
      },
      {
        id: 'sample-5',
        worksheetSrc: '/samples/french/cryptogram/sample-5.jpeg',
        answerKeySrc: '/samples/french/cryptogram/sample-5.jpeg',
        altText: 'Cryptogramme en images exercices CP - fiches à imprimer gratuit pour enfants',
        imageTitle: 'Cryptogramme en images exercices CP',
      },
    ],
    
  },

  // Features Grid - FULL text from cryptogram.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de cryptogrammes en images offre toutes les fonctionnalités dont les enseignants ont besoin pour créer des fiches maternelle et exercices CE1 professionnels. Créez des énigmes de décodage personnalisées en quelques minutes. Chaque fonctionnalité est conçue pour vous faire gagner du temps tout en produisant des fiches à imprimer gratuit de qualité supérieure. Les cryptogrammes développent la logique et renforcent l\'apprentissage de l\'alphabet. Voici tout ce que vous pouvez faire avec notre générateur pour apprendre à lire et apprendre les lettres.',
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

  // How-To Guide - FULL text from cryptogram.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créer des cryptogrammes en images professionnels prend moins de 3 minutes du début à la fin. Ces 5 étapes simples vous guident du choix des phrases au téléchargement de vos fiches à imprimer gratuit. Aucune compétence technique requise pour créer des exercices CE1. Même les enseignants qui découvrent les outils numériques peuvent créer des cryptogrammes parfaits pour apprendre les lettres dès leur première utilisation. Les cryptogrammes développent la logique et renforcent l\'alphabet. Suivez ces étapes pour générer vos premières fiches maternelle pour apprendre à lire et créer des exercices CP engageants.',
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
        title: 'Étape 1: Tapez vos Phrases pour Fiches Maternelle - Créez des Exercices CP et Exercices CE1 pour Apprendre l\'Alphabet',
        description: `Commencez par taper les phrases que vous voulez transformer en cryptogramme dans vos fiches à imprimer gratuit. Ouvrez la zone de texte des phrases. Tapez une phrase par ligne pour vos exercices CP. Utilisez des phrases courtes et simples pour les fiches maternelle de grande section. Chat noir dort sous l'arbre ou Le soleil brille aujourd'hui fonctionnent bien pour apprendre à lire. Pour les exercices CE1 plus avancés utilisez des phrases plus longues avec vocabulaire complexe.

Les cryptogrammes fonctionnent mieux avec des phrases de 3 à 8 mots pour apprendre les lettres. Trop court et le défi manque pour vos exercices CP. Trop long et la fiche devient surchargée pour les fiches maternelle. Vous pouvez taper jusqu'à 8 lignes de phrases maximum dans vos fiches à imprimer gratuit. Le générateur enveloppe automatiquement le texte à 15 caractères par ligne pour apprendre l'alphabet.

Choisissez des phrases correspondant à vos unités d'enseignement pour vos exercices CE1. Si vous enseignez les animaux utilisez des phrases sur les animaux pour apprendre à lire. Si vous travaillez les saisons créez des phrases saisonnières dans vos fiches maternelle. Les phrases thématiques rendent les cryptogrammes plus pertinents pour vos exercices CP. Les enfants s'engagent davantage quand le contenu correspond à leurs leçons sur l'alphabet et apprendre les lettres dans ces fiches à imprimer gratuit.`,
        icon: '📝',
      },
      {
        id: '2',
        number: 2,
        title: 'Étape 2: Assignez des Images aux Lettres pour Exercices Maths et Graphisme Maternelle - Personnalisez vos Fiches à Imprimer Gratuit',
        description: `Maintenant assignez une image à chaque lettre utilisée dans vos phrases pour créer vos fiches maternelle. Trois méthodes s'offrent à vous pour vos exercices CP. La méthode la plus rapide utilise l'assignation automatique pour ces fiches à imprimer gratuit. Cochez la case Auto-Assigner et sélectionnez un thème dans le menu déroulant. Animaux ferme transport ou nourriture sont des options populaires pour apprendre à lire. Cliquez sur le bouton Auto-Assigner et le générateur assigne automatiquement une image à chaque lettre de l'alphabet dans vos exercices CE1.

La deuxième méthode permet une assignation manuelle précise pour vos fiches maternelle. Cliquez sur une lettre dans la grille de boutons pour vos exercices CP. La lettre s'affiche en haut et la bibliothèque d'images apparaît en bas pour apprendre les lettres. Parcourez les 3000 images disponibles dans vos fiches à imprimer gratuit. Cliquez sur une image pour l'assigner à la lettre sélectionnée dans vos exercices CE1. Répétez pour chaque lettre utilisée dans vos phrases pour apprendre l'alphabet.

La troisième méthode utilise vos propres images téléchargées pour créer des fiches maternelle personnalisées. Cliquez sur Télécharger Images et sélectionnez vos fichiers pour vos exercices CP. Utilisez des photos d'objets de votre classe pour apprendre à lire. Les images personnalisées rendent les cryptogrammes plus pertinents pour vos fiches à imprimer gratuit. Combinez avec la bibliothèque si vous manquez d'images pour certaines lettres dans vos exercices CE1. Cette méthode fonctionne excellemment pour créer des exercices maths visuels où chaque nombre est représenté par une quantité d'objets pour apprendre les lettres et le graphisme maternelle dans ces fiches maternelle.`,
        icon: '🖼️',
      },
      {
        id: '3',
        number: 3,
        title: 'Étape 3: Configurez les Paramètres pour Coloriage à Imprimer et Exercices CP - Format de Page pour Fiches Maternelle',
        description: `Configurez maintenant l'apparence de votre cryptogramme pour vos fiches à imprimer gratuit. Choisissez d'abord le format de page pour vos exercices CE1. Letter Portrait convient aux imprimantes américaines. A4 Portrait est standard en Europe pour les fiches maternelle. Les formats paysage fonctionnent bien pour les phrases longues dans vos exercices CP. Sélectionnez le format qui correspond à votre imprimante habituelle pour apprendre à lire.

Ajoutez ensuite un arrière-plan si vous le souhaitez pour vos fiches à imprimer gratuit. Ouvrez le sélecteur de thèmes d'arrière-plan pour vos exercices CE1. Des centaines d'options apparaissent organisées par catégorie. Nature saisons fêtes et motifs abstraits sont disponibles pour les fiches maternelle. Les arrière-plans légers fonctionnent mieux pour les cryptogrammes pour apprendre les lettres. Ajustez l'opacité pour rendre l'arrière-plan plus subtil dans vos exercices CP. Une opacité de 30 à 50 pour cent crée un effet délicat parfait pour apprendre l'alphabet.

Les bordures ajoutent une touche professionnelle à vos fiches à imprimer gratuit. Choisissez parmi des centaines de bordures thématiques pour vos exercices CE1. Bordures saisonnières animaux fêtes et motifs éducatifs encadrent joliment vos fiches maternelle. Réglez l'opacité de la bordure si elle semble trop prononcée pour vos exercices CP. Les bordures colorées rendent les cryptogrammes plus attrayants pour apprendre à lire. Combinez arrière-plan et bordure pour créer des fiches cohérentes qui fonctionnent aussi comme coloriage à imprimer pour apprendre les lettres dans ces fiches à imprimer gratuit pour le graphisme maternelle.`,
        icon: '⚙️',
      },
      {
        id: '4',
        number: 4,
        title: 'Étape 4: Générez et Personnalisez pour Exercices Maths et Écriture Cursive - Modifiez vos Fiches Maternelle et Exercices CE1',
        description: `Une fois vos phrases tapées et vos images assignées cliquez sur le bouton Générer pour vos fiches à imprimer gratuit. Le cryptogramme apparaît instantanément sur le canevas pour vos exercices CP. Les cellules avec images s'organisent automatiquement ligne par ligne pour apprendre à lire. Les cases vides attendent que les élèves écrivent les lettres décodées dans vos fiches maternelle. Un en-tête attrayant apparaît en haut avec le titre Cryptogramme en Images pour vos exercices CE1.

La légende montre toutes les lettres utilisées avec leurs images correspondantes pour apprendre l'alphabet. Certaines lettres apparaissent déjà révélées comme indices dans vos fiches à imprimer gratuit. Le nombre de lettres révélées dépend de votre paramètre dans le menu Règles du Puzzle pour vos exercices CP. Trois lettres révélées par défaut aident les enfants à démarrer le décodage pour apprendre à lire dans ces fiches maternelle.

Après génération chaque élément est entièrement modifiable pour vos exercices CE1. Cliquez sur n'importe quel élément pour le sélectionner dans vos fiches à imprimer gratuit. Faites glisser pour déplacer des cellules ou la légende pour vos exercices CP. Utilisez les poignées pour redimensionner les éléments pour apprendre les lettres. Ajoutez du texte supplémentaire avec l'outil Texte pour vos fiches maternelle. Tapez le nom de l'élève ou des instructions pour l'écriture cursive. Ajoutez la date ou le numéro de la leçon pour vos exercices CE1. Cette flexibilité totale permet de créer exactement les fiches à imprimer gratuit dont vous avez besoin pour apprendre l'alphabet et pratiquer les exercices maths avec des cryptogrammes numériques.`,
        icon: '✨',
      },
      {
        id: '5',
        number: 5,
        title: 'Étape 5: Téléchargez vos Fiches Maternelle et Exercices CP - PDF et JPEG pour Apprendre à Lire',
        description: `Quand votre cryptogramme est parfait il est temps de télécharger vos fiches à imprimer gratuit. Ouvrez le menu déroulant Télécharger pour vos exercices CE1. Plusieurs options s'offrent à vous pour les fiches maternelle. Téléchargez le Cryptogramme en JPEG pour une image haute résolution 300 DPI pour vos exercices CP. Téléchargez le Cryptogramme en PDF pour un fichier parfait pour l'impression pour apprendre à lire.

Téléchargez aussi le Corrigé dans les deux formats pour vos fiches à imprimer gratuit. Le corrigé montre toutes les lettres remplies dans les cases pour vos exercices CE1. Utilisez le corrigé pour l'autocorrection par les élèves dans vos fiches maternelle. Ou gardez-le comme référence pour vos exercices CP. Les deux versions maintiennent la qualité professionnelle 300 DPI pour apprendre les lettres.

Le format PDF fonctionne mieux pour l'impression directe de vos fiches à imprimer gratuit. Les PDF conservent une qualité parfaite à n'importe quelle échelle pour vos exercices CE1. Imprimez à la maison ou envoyez à un service d'impression professionnel pour les fiches maternelle. Les JPEG fonctionnent bien pour partager numériquement vos exercices CP ou insérer dans d'autres documents pour apprendre à lire.

Cochez la case Niveaux de Gris avant de télécharger pour économiser l'encre dans vos fiches à imprimer gratuit. Les versions en noir et blanc utilisent beaucoup moins d'encre d'imprimante pour vos exercices CE1. Parfait quand vous imprimez 30 copies pour toute votre classe de fiches maternelle. Les cryptogrammes en niveaux de gris restent clairs et lisibles pour apprendre les lettres. Cette option vous fait économiser sur les coûts d'impression pour vos exercices CP tout en maintenant la qualité professionnelle pour apprendre l'alphabet.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from cryptogram.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Notre générateur de cryptogrammes en images sert différents types d\'utilisateurs dans le domaine éducatif. Enseignants de maternelle pour graphisme maternelle, professeurs de CP et CE1, parents en instruction à domicile et enseignants de langues. Chacun trouve des applications spécifiques pour créer des fiches à imprimer gratuit adaptées à ses besoins d\'exercices maths et coloriage à imprimer. Les cryptogrammes développent la logique et les compétences en résolution de problèmes. Voici comment différents éducateurs utilisent nos cryptogrammes pour apprendre à lire, développer le graphisme maternelle et renforcer l\'alphabet avec des exercices CE1.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from cryptogram.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Les enseignants et parents ont des questions courantes sur notre générateur de cryptogrammes pour exercices CE1. Voici les réponses détaillées aux questions les plus fréquentes sur les tables de multiplication et apprendre à lire. Ces réponses couvrent l\'abonnement, l\'utilisation en classe, la personnalisation et les fonctionnalités techniques. Découvrez comment créer des fiches maternelle pour l\'alphabet et le coloriage à imprimer.',
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
      'Création illimitée de cryptogrammes',
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

  // Related Apps - From cryptogram.md Section 7
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Votre abonnement Accès Complet à 240 euros par an donne accès à 33 générateurs différents de fiches à imprimer gratuit. Combinez les cryptogrammes avec d\'autres types de fiches maternelle pour créer des forfaits d\'apprentissage complets. Mélangez exercices maths et tables de multiplication avec des énigmes de décodage pour apprendre à lire. Cette approche variée maintient l\'engagement des élèves et renforce l\'apprentissage à travers différentes modalités. Créez des cahiers d\'activités thématiques combinant plusieurs types de fiches pour écriture cursive.',
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

export default cryptogramFrContent;
