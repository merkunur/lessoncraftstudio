import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Sudoku Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/sudoku-worksheets.ts
 * URL: /fr/apps/sudoku-enfants-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/sudoku.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const sudokuFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'sudoku-enfants-fiches',
    appId: 'sudoku',
    title: 'Sudoku pour Enfants - Fiches Maternelle et Exercices Maths à Imprimer Gratuit',
    description: 'Créez des puzzles sudoku visuels avec notre générateur de fiches maternelle. Votre abonnement Pack Essentiel vous offre une création illimitée de fiches à imprimer gratuit. Téléchargez des PDF professionnels 300 DPI avec clés de correction en moins de 3 minutes.',
    keywords: 'sudoku enfants, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, exercices maths, graphisme maternelle, coloriage à imprimer, apprendre à lire, tables de multiplication',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/sudoku-enfants-fiches',
  },

  // Hero Section - FULL text from sudoku.md paragraphs 1-3
  hero: {
    title: 'Sudoku pour Enfants',
    subtitle: 'Fiches Maternelle et Exercices Maths à Imprimer Gratuit',
    description: `Découvrez notre générateur de sudoku pour enfants. Cet outil vous permet de créer des fiches à imprimer gratuit en quelques clics. Votre abonnement Pack Essentiel vous donne accès illimité à la création de fiches maternelle. Les puzzles utilisent des images colorées au lieu de chiffres. Parfait pour les enfants de 3 à 8 ans.

Le sudoku visuel transforme un jeu classique en activité éducative. Les enfants reconnaissent des images au lieu de chiffres. Cette approche développe la logique sans exiger de compétences en calcul. Idéal pour accompagner les exercices maths et les fiches maternelle traditionnelles. Chaque puzzle imprimable renforce la concentration et le raisonnement. Notre générateur propose trois niveaux de difficulté. Le mode facile comporte 4 cases vides. Le mode moyen propose 6 cases vides. Le mode difficile présente 8 cases vides.

Les puzzles sudoku complètent parfaitement les exercices maths traditionnels. La logique du sudoku prépare les enfants aux exercices CP et CE1. Le raisonnement spatial développé aide aussi pour le graphisme maternelle. Les élèves apprennent à analyser, déduire et vérifier leurs réponses. Avec votre abonnement Pack Essentiel à 144€ par an, créez des fiches illimitées. Aucun frais par fiche téléchargée. Accédez à plus de 3000 images thématiques. Téléchargez en PDF ou JPEG haute qualité 300 DPI. Les fiches incluent automatiquement une clé de correction.`,
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

  // Sample Gallery - REAL file paths from samples/english/sudoku/
  samples: {
    sectionTitle: 'Exemples de Fiches Sudoku',
    sectionDescription: 'Téléchargez des exemples gratuits pour voir notre qualité professionnelle',
    downloadLabel: 'Télécharger Exemple Gratuit',
    worksheetLabel: 'Fiche Sudoku',
    answerKeyLabel: 'Clé de Correction',
    viewAllLabel: 'Agrandir',
    noPdfLabel: 'Aperçu uniquement',
    freePdfCountLabel: 'téléchargements gratuits',
    badgeText: 'Exemples Gratuits',
    downloadingLabel: 'Téléchargement...',
    ofLabel: 'sur',
    items: [],
  },

  // Use Cases - FULL text from sudoku.md use case sections
  useCases: {
    sectionTitle: 'Qui Utilise le Sudoku pour Enfants - Fiches Maternelle, Exercices CP et Apprendre à Lire',
    sectionDescription: 'Notre générateur de sudoku répond aux besoins de nombreux professionnels de l\'éducation. Les enseignants de maternelle créent des fiches maternelle ludiques. Les professeurs d\'élémentaire développent des exercices CP stimulants. Les parents accompagnent leurs enfants pour apprendre à lire et raisonner.',
    badgeText: 'Cas d\'Utilisation',
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

  // Related Apps - From sudoku.md Section 7
  relatedApps: {
    sectionTitle: 'Combinez le Sudoku avec d\'Autres Applications - Coloriage à Imprimer, Apprendre à Lire et Tables de Multiplication',
    sectionDescription: 'Le sudoku pour enfants s\'intègre parfaitement aux autres générateurs de la plateforme. Créez des packs pédagogiques complets combinant plusieurs activités. Du coloriage à imprimer aux supports pour apprendre à lire, tout est possible. Les fiches sur les tables de multiplication complètent naturellement les puzzles logiques.',
    ctaTitle: 'Prêt à Créer des Puzzles Sudoku Professionnels ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches maternelle de qualité. Création illimitée, licence commerciale incluse.',
    primaryCtaText: 'Essai Gratuit',
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

export default sudokuFrContent;
