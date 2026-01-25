import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Guess Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/word-guess-worksheets.ts
 * URL: /fr/apps/deviner-mots-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/word-guess.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Accès Complet = €240/an (Accès Complet)
 * App ID: word-guess
 */

export const wordGuessFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'deviner-mots-fiches',
    appId: 'word-guess',
    title: 'Deviner les Mots | Fiches Gratuites Maternelle CP CE1',
    description: 'Créez des fiches deviner les mots en 3 minutes. Abonnement 240€/an, création illimitée. Vocabulaire et orthographe pour maternelle et CP. Parfait pour enseignants et parents.',
    keywords: 'deviner les mots, fiches maternelle, exercices CP, fiches à imprimer gratuit, apprendre à lire, fiches alphabet, graphisme maternelle, exercices maths, apprendre les lettres, coloriage à imprimer, écriture cursive, tables de multiplication, exercices CE1',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/deviner-mots-fiches',
    images: [
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/word-guess/sample-1.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche deviner les mots gratuite avec indices visuels pour maternelle',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/word-guess/sample-2.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche deviner les mots gratuite niveau facile pour exercices CP',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/word-guess/sample-3.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche deviner les mots à imprimer gratuit vocabulaire pour enfants',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/word-guess/sample-4.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiches gratuites deviner les mots thème animaux maternelle',
      },
      {
        url: 'https://www.lessoncraftstudio.com/samples/french/word-guess/sample-5.jpeg',
        width: 2480,
        height: 3508,
        caption: 'Fiche gratuite deviner les mots orthographe exercices CE1',
      },
    ],
  },

  // Hero Section - FULL text from word-guess.md paragraphs 1-4
  hero: {
    title: 'Générateur de Fiches Deviner les Mots',
    subtitle: 'Fiches à Imprimer Gratuit pour Maternelle et CP',
    description: `Créez des fiches maternelle professionnelles avec notre générateur de devinettes à indices visuels. Votre abonnement Accès Complet à 240 € par an vous donne accès illimité à la création de fiches sans frais supplémentaires. Générez des exercices CP personnalisés parfaits pour l'apprentissage du vocabulaire et de l'écriture. Téléchargez des fiches à imprimer gratuit de haute qualité en PDF en moins de 3 minutes.

Notre outil facilite la création d'exercices d'apprentissage à lire pour les élèves de maternelle et CP. Les enfants voient une image et doivent deviner le mot en remplissant les lettres manquantes. Parfait pour renforcer la reconnaissance des lettres de l'alphabet et l'apprentissage des lettres. Chaque fiche maternelle inclut des indices visuels clairs qui aident les jeunes apprenants.

Les enseignants adorent notre générateur pour créer rapidement des exercices maths adaptés et des fiches de graphisme maternelle. Ajustez le niveau de difficulté pour différencier l'instruction. Créez des exercices CE1 plus complexes ou des fiches maternelle plus simples. Les options de personnalisation incluent la taille de la page, les couleurs et les polices. Générez jusqu'à 10 devinettes par page.

Votre abonnement Accès Complet inclut une licence commerciale pour vendre vos fiches. Parfait pour les enseignants entrepreneurs sur Teachers Pay Teachers ou Etsy. Téléchargez en format PDF ou JPEG à 300 DPI. L'option niveaux de gris économise l'encre lors de l'impression. Les corrigés sont générés automatiquement pour faciliter la correction.`,
    previewImageSrc: '/samples/french/word-guess/sample-1.jpeg',
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

  // Sample Gallery - REAL file paths from samples/english/word guess/
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

  // Features Grid - FULL text from word-guess.md feature sections
  features: {
    sectionTitle: 'Fiches Gratuites et Fiche pour Enfants - Imprimables Gratuits et Fiche pour Maternelle',
    sectionDescription: 'Notre générateur de fiches à imprimer gratuit offre toutes les fonctionnalités dont vous avez besoin. Créez des exercices maternelle professionnels en quelques clics. Personnalisez chaque élément pour correspondre à vos besoins pédagogiques. Les enseignants de maternelle et CP apprécient la simplicité et la flexibilité. Chaque fiche maternelle que vous créez peut être modifiée entièrement sur le canevas. Les sept fonctionnalités clés transforment votre façon de créer des exercices. Gagnez du temps tout en produisant des fiches de qualité supérieure. Votre abonnement Accès Complet débloque toutes ces capacités professionnelles. Aucun frais supplémentaire pour les fonctionnalités premium.',
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

  // How-To Guide - FULL text from word-guess.md step sections
  howTo: {
    sectionTitle: 'Fiche Gratuite pour Enfants Créer - Fiche pour Maternelle',
    sectionDescription: 'Créez vos premières fiches maternelle en moins de 3 minutes. Ce guide explique chaque étape du processus de création. Suivez ces cinq étapes simples pour générer des exercices CP professionnels. Aucune compétence technique requise pour créer des fiches à imprimer gratuit parfaites. Le processus est identique pour tous les niveaux scolaires. Créez des fiches maternelle pour la petite section ou des exercices CE1 plus avancés. Ajustez simplement le niveau de difficulté selon vos besoins. Chaque enseignant peut maîtriser ce générateur dès la première utilisation.',
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
        title: 'Étape 1: Choisir vos Images pour Fiches Maternelle - Exercices CP et CE1 sur l\'Alphabet et Apprendre les Lettres',
        description: `Commencez par sélectionner les images pour vos fiches maternelle. Ouvrez le menu Bibliothèque d'Images dans le panneau latéral. Choisissez un thème complet ou sélectionnez des images individuelles. Les exercices CP fonctionnent mieux avec 6 à 8 images par fiche.

Les thèmes organisés facilitent la création d'exercices thématiques cohérents. Sélectionnez le thème Animaux pour enseigner le vocabulaire animalier. Le thème Fruits et Légumes parfait pour les exercices CE1 sur l'alimentation. Chaque thème contient 20 à 50 images adaptées aux jeunes enfants. Idéal pour créer des fiches sur l'alphabet et apprendre les lettres.

Utilisez la fonction recherche pour trouver des images spécifiques. Tapez le nom d'un animal ou d'un objet pour voir toutes les images correspondantes. Parfait pour créer des fiches maternelle sur des sujets précis. Combinez des images de différents thèmes pour des exercices variés.

Téléchargez vos propres images si nécessaire. Cliquez sur le bouton Télécharger Images Personnalisées. Sélectionnez plusieurs fichiers simultanément depuis votre ordinateur. Les images téléchargées apparaissent immédiatement dans votre liste. Parfait pour créer des exercices CP ultra-personnalisés avec le vocabulaire de votre classe.`,
        icon: '🖼️',
      },
      {
        id: '2',
        number: 2,
        title: 'Étape 2: Personnaliser les Fiches à Imprimer Gratuit - Difficulté des Exercices pour Apprendre à Lire et Écriture Cursive',
        description: `Configurez les paramètres dans le menu Configuration des Exercices. Choisissez le nombre de devinettes par page de 1 à 10. Sélectionnez le niveau de difficulté adapté à vos élèves. Quatre niveaux disponibles pour différencier l'instruction dans vos fiches à imprimer gratuit.

Le niveau Sans indices laisse toutes les cases vides. Les enfants doivent deviner et écrire toutes les lettres eux-mêmes. Parfait pour les exercices CE1 avancés qui maîtrisent l'orthographe. Excellent pour pratiquer l'écriture cursive et renforcer la mémoire orthographique.

Le niveau Facile affiche la moitié des lettres comme indices. Un mot de 6 lettres montre 3 lettres pré-remplies. Idéal pour les débutants en maternelle qui apprennent à lire. Les indices visuels aident les élèves à deviner le mot plus facilement.

Le niveau Normal affiche un quart des lettres comme indices. Un équilibre parfait entre défi et support pour les exercices CP. Les élèves utilisent les indices et l'image pour compléter le mot. Développe les compétences de déduction et d'orthographe simultanément.

Choisissez entre majuscules et minuscules pour les lettres. Les majuscules conviennent mieux aux jeunes enfants de maternelle. Les minuscules préparent à l'écriture cursive pour les élèves de CP et CE1.`,
        icon: '⚙️',
      },
      {
        id: '3',
        number: 3,
        title: 'Étape 3: Générer les Fiches Maternelle - Exercices de Graphisme Maternelle et Apprendre l\'Alphabet',
        description: `Cliquez sur le bouton Générer pour créer vos fiches maternelle. Le générateur calcule automatiquement la mise en page optimale. Les exercices apparaissent instantanément dans l'onglet Fiche de Travail. La génération prend moins de 2 secondes pour créer des exercices de graphisme maternelle professionnels.

Chaque devinette affiche l'image à gauche et les cases de lettres à droite. Les cases sont dimensionnées parfaitement pour l'écriture des enfants. Les lettres pré-remplies apparaissent selon le niveau de difficulté choisi. Les cases vides attendent que l'enfant écrive les lettres manquantes pour apprendre l'alphabet.

Le générateur adapte automatiquement la taille selon le nombre de devinettes. Une fiche avec 3 devinettes affiche de grandes images et cases. Une fiche avec 10 devinettes réduit proportionnellement la taille. Tout s'adapte parfaitement au format de page sélectionné.

La mise en page passe automatiquement en deux colonnes si nécessaire. Format paysage avec plus de 5 devinettes utilise deux colonnes. Optimise l'utilisation de l'espace sur la page. Les fiches maternelle restent claires et bien organisées visuellement.`,
        icon: '✨',
      },
      {
        id: '4',
        number: 4,
        title: 'Étape 4: Modifier sur le Canevas - Personnaliser vos Fiches à Imprimer Gratuit avec Coloriage à Imprimer',
        description: `Personnalisez entièrement votre fiche après génération. Cliquez sur n'importe quel élément pour le sélectionner. Déplacez les images et les boîtes de lettres avec la souris. Redimensionnez en tirant les coins de sélection. Parfait pour ajuster vos fiches à imprimer gratuit selon vos besoins.

Ajoutez du texte personnalisé n'importe où sur la page. Ouvrez le menu Outils Texte dans le panneau latéral. Tapez votre titre, vos instructions ou vos consignes. Cliquez sur Ajouter Texte pour placer le texte sur le canevas. Idéal pour créer des consignes spécifiques à votre classe.

Changez les couleurs du texte et des éléments visuels. Sélectionnez l'élément puis choisissez une nouvelle couleur. Ajoutez des contours colorés au texte pour plus de visibilité. Les options de personnalisation sont illimitées pour vos fiches maternelle.

Ajoutez un thème de fond ou de bordure décoratif. Sélectionnez un thème dans les menus Fond et Bordure. Les arrière-plans thématiques créent des fiches visuellement attrayantes. Parfait pour motiver les jeunes élèves avec des designs colorés comme du coloriage à imprimer.`,
        icon: '✏️',
      },
      {
        id: '5',
        number: 5,
        title: 'Étape 5: Télécharger et Imprimer - Fiches à Imprimer Gratuit pour Exercices CP et Exercices Maths',
        description: `Téléchargez votre fiche terminée en format PDF ou JPEG. Cliquez sur le bouton Télécharger dans le coin supérieur droit. Choisissez Télécharger Fiche (PDF) pour la meilleure qualité d'impression. Le PDF conserve la netteté parfaite à 300 DPI pour vos fiches à imprimer gratuit.

Le format JPEG fonctionne parfaitement pour partager numériquement. Envoyez par email aux parents ou publiez sur votre plateforme scolaire. Les deux formats garantissent une qualité professionnelle. Vos exercices CP restent nets et clairs quelle que soit la méthode d'impression.

Activez l'option Niveaux de Gris avant de télécharger pour économiser l'encre. Cochez la case dans le menu Téléchargement. Toutes les couleurs se convertissent automatiquement en nuances de gris. Parfait pour imprimer de nombreuses copies sans épuiser les cartouches couleur.

Téléchargez également le corrigé automatiquement généré. Cliquez sur l'onglet Corrigé pour voir toutes les lettres remplies. Téléchargez en PDF ou JPEG comme la fiche de travail. Le corrigé facilite la correction rapide des exercices en classe. Parfait aussi pour créer des exercices maths avec corrigés.`,
        icon: '📥',
      },
    ],
  },

  // Use Cases - FULL text from word-guess.md use case sections
  useCases: {
    sectionTitle: 'Fiche Gratuite pour Enfants - Fiche pour Maternelle avec Imprimables Gratuits. Fiche pour Enfants',
    sectionDescription: 'Notre générateur de fiches maternelle s\'adapte à tous les contextes éducatifs. Les enseignants de maternelle, CP et CE1 l\'utilisent quotidiennement. Les parents qui font l\'école à la maison créent des exercices personnalisés. Les orthophonistes et enseignants spécialisés différencient l\'instruction facilement. Chaque type d\'utilisateur trouve des applications pédagogiques pertinentes. Les six groupes d\'utilisateurs principaux bénéficient différemment du générateur. Chacun adapte les fiches à imprimer gratuit selon ses besoins spécifiques.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [], // Samples loaded dynamically from content manager
    
  },

  // FAQ Section - Selected FAQs from word-guess.md
  faq: {
    sectionTitle: 'FAQ - Fiche Gratuite pour Enfants et Fiche pour Maternelle. Fiche pour Enfants',
    sectionDescription: 'Les enseignants et parents ont des questions courantes sur notre générateur de fiches. Voici les réponses détaillées aux questions les plus fréquentes. Ces réponses couvrent l\'abonnement, l\'utilisation en classe, la personnalisation et les fonctionnalités techniques pour apprendre à lire et apprendre les lettres.',
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
      'Création illimitée de fiches deviner les mots',
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

  // Related Apps - From word-guess.md Section 7
  relatedApps: {
    sectionTitle: 'Fiches Gratuites Combiner - Fiche pour Enfants et Imprimables Gratuits',
    sectionDescription: 'Notre plateforme offre 33 générateurs différents de fiches pédagogiques. Les enseignants créent des packs d\'apprentissage complets en combinant plusieurs types d\'activités. Fiches deviner les mots pour le vocabulaire, exercices maths pour les nombres, coloriage à imprimer pour la motricité fine et fiches d\'alphabet pour apprendre les lettres. Ces combinaisons créent des expériences d\'apprentissage riches qui engagent les élèves sur plusieurs niveaux.',
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

export default wordGuessFrContent;
