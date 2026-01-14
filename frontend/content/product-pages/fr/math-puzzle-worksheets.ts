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
    title: 'Puzzle Maths à Imprimer | Générateur d\'Exercices de Décodage pour Maternelle et CP',
    description: 'Créez des puzzles mathématiques de décodage par symboles avec notre générateur. Parfait pour les enseignants de maternelle, CP et CE1. Téléchargez des fiches à imprimer gratuit en PDF haute qualité.',
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
    previewImageSrc: '',
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

  // Sample Gallery - REAL file paths from samples/english/math puzzle/
  samples: {
    sectionTitle: 'Exemples de Puzzles Maths',
    sectionDescription: 'Téléchargez des exemples gratuits pour voir notre qualité professionnelle',
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

  // Use Cases - FULL text from math-worksheet.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour les Enseignants et les Parents',
    sectionDescription: 'Les puzzles de décodage mathématique bénéficient à de multiples contextes éducatifs. Les enseignants de maternelle utilisent les puzzles visuels pour introduire le raisonnement logique. Les professeurs de CP et CE1 renforcent les faits mathématiques avec une pratique stimulante.',
    badgeText: 'Pour Qui',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [],
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
    sectionTitle: 'Combinez avec d\'Autres Générateurs de Fiches',
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
    items: [],
  },
};

export default mathPuzzleFrContent;
