import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Odd One Out Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/odd-one-out-worksheets.ts
 * URL: /fr/apps/intrus-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/odd-one-out.md
 * App ID: odd-one-out (Visual discrimination / find the odd one worksheets)
 * Bundle: Accès Complet ($240/year) - NOT Pack Essentiel
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const oddOneOutFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'intrus-fiches',
    appId: 'odd-one-out',
    title: 'Fiches à Imprimer Gratuit Intrus - Fiches Maternelle Exercices CP - Générateur Exercices Maths',
    description: 'Créez des fiches à imprimer gratuit pour trouver l\'intrus en quelques clics. Votre abonnement Accès Complet à 240€/an vous donne accès illimité à ce générateur professionnel. Générez des fiches maternelle personnalisées parfaites pour développer l\'observation et la logique.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices CP, intrus, graphisme maternelle, exercices maths, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, tables de multiplication',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/intrus-fiches',
  },

  // Hero Section - FULL text from odd-one-out.md paragraphs 1-4
  hero: {
    title: 'Fiches Intrus',
    subtitle: 'Générateur de Fiches Maternelle pour Observation et Logique',
    description: `Créez des fiches à imprimer gratuit pour trouver l'intrus en quelques clics. Votre abonnement Accès Complet à 240€/an vous donne accès illimité à ce générateur professionnel. Générez des fiches maternelle personnalisées parfaites pour développer l'observation et la logique. Téléchargez des exercices CP de qualité supérieure en moins de 3 minutes.

Notre générateur de fiches intrus transforme la création d'exercices pédagogiques. Parfait pour les enseignants de maternelle et CP qui cherchent des fiches à imprimer gratuit. Chaque fiche développe les capacités d'observation et de raisonnement logique. Les enfants adorent ces exercices ludiques et colorés.

Les fiches maternelle intrus sont essentielles pour l'apprentissage précoce. Les élèves apprennent à comparer, catégoriser et identifier les différences. Ces compétences sont fondamentales pour apprendre à lire et calculer. Le graphisme maternelle se développe naturellement en manipulant ces exercices. Les exercices CP renforcent la discrimination visuelle nécessaire à la lecture.

Créez des fiches personnalisées avec plus de 3000 images thématiques. Choisissez parmi des thèmes variés : animaux, nourriture, objets quotidiens, formes géométriques. Combinez deux thèmes pour créer des exercices de difficulté progressive. Ajoutez vos propres images pour personnaliser selon vos élèves. Modifiez tous les éléments directement sur le canevas.`,
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

  // Sample Gallery - REAL file paths from samples/english/odd one out/
  samples: {
    sectionTitle: 'Exemples de Fiches Intrus',
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

  // Use Cases - FULL text from odd-one-out.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour Enseignants, Parents et Éducateurs',
    sectionDescription: 'Nos fiches à imprimer gratuit servent de multiples contextes éducatifs. Enseignants de maternelle et CP adorent la flexibilité. Parents en instruction à domicile trouvent tout le nécessaire. Professeurs de langues créent des exercices maths multilingues. Les exercices CE1 s\'adaptent à tous les niveaux. Chaque utilisateur bénéficie pleinement des fonctionnalités.',
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
    sectionTitle: 'Combinez avec D\'Autres Générateurs de Fiches',
    sectionDescription: 'Votre abonnement Accès Complet inclut 33 générateurs complémentaires. Combinez les fiches intrus avec d\'autres outils pour créer des séquences pédagogiques complètes.',
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

export default oddOneOutFrContent;
