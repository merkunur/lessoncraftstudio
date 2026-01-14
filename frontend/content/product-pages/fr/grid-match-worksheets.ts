import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Grid Match Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/grid-match-worksheets.ts
 * URL: /fr/apps/puzzle-grille-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/grid-match.md
 * App ID: grid-match (Grid puzzle / picture completion worksheets)
 * Bundle: Accès Complet (240€/year) - NOT Pack Essentiel
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const gridMatchFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'puzzle-grille-fiches',
    appId: 'grid-match',
    title: 'Puzzle Grille - Fiches à Imprimer Gratuit pour Maternelle et Exercices CP',
    description: 'Créez des fiches puzzle grille professionnelles avec notre générateur avancé. Votre abonnement Accès Complet vous donne une création illimitée de fiches sans frais par fiche. Téléchargez des fiches PDF de haute qualité en moins de 3 minutes.',
    keywords: 'fiches maternelle, exercices CP, graphisme maternelle, coloriage à imprimer, apprendre à lire, exercices maths, alphabet, tables de multiplication, fiches à imprimer gratuit, écriture cursive',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/puzzle-grille-fiches',
  },

  // Hero Section - FULL text from grid-match.md paragraphs 1-3
  hero: {
    title: 'Puzzle Grille - Fiches à Imprimer Gratuit pour Maternelle et Exercices CP',
    subtitle: 'Générateur de Fiches Maternelle pour Discrimination Visuelle et Raisonnement Spatial',
    description: `Créez des fiches puzzle grille professionnelles avec notre générateur avancé. Votre abonnement Accès Complet vous donne une création illimitée de fiches sans frais par fiche. Générez des fiches à imprimer personnalisées parfaites pour la maternelle et les exercices CP. Téléchargez des fiches PDF de haute qualité en moins de 3 minutes.

Les puzzles grille aident les jeunes apprenants à développer la discrimination visuelle et le raisonnement spatial. Les élèves associent les pièces numérotées pour compléter les images. Chaque fiche comprend le puzzle et le corrigé. Parfait pour le travail du matin et les ateliers.

Les enseignants adorent les fiches puzzle grille car elles combinent plaisir et apprentissage. Créez des variations illimitées avec notre bibliothèque de 3000+ images. Personnalisez chaque élément incluant la taille de la grille et le niveau de difficulté. Exportez en PDF ou JPEG pour l'impression ou l'usage numérique.`,
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

  // Sample Gallery - REAL file paths from samples/english/grid match/
  samples: {
    sectionTitle: 'Exemples de Fiches Puzzle Grille',
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

  // Use Cases - FULL text from grid-match.md use case sections
  useCases: {
    sectionTitle: 'Utilisations en Classe - Fiches Maternelle et Exercices CP pour Tous les Besoins',
    sectionDescription: 'Les fiches puzzle grille servent de multiples objectifs éducatifs au-delà de la simple résolution de puzzles. Découvrez six applications en classe éprouvées qui maximisent les résultats d\'apprentissage. Ces stratégies pratiques fonctionnent pour les fiches maternelle et les exercices CP à travers tous les domaines.',
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

  // Related Apps - Combined with other apps from grid-match.md Section 7
  relatedApps: {
    sectionTitle: 'Combiner le Puzzle Grille avec D\'autres Applications - Fiches à Imprimer Gratuit pour Programmes Complets',
    sectionDescription: 'Le puzzle grille fonctionne encore mieux combiné avec d\'autres générateurs de fiches. Créez des programmes d\'apprentissage complets couvrant plusieurs compétences. Ces combinaisons stratégiques maximisent les résultats d\'apprentissage tout en minimisant le temps de préparation.',
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

export default gridMatchFrContent;
