import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Big Small Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/big-small-worksheets.ts
 * URL: /fr/apps/grand-petit-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/big-small.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Pricing Tier: Accès Complet (Accès Complet) - 240€/year
 */

export const bigSmallFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'grand-petit-fiches',
    appId: 'big-small-app',
    title: 'Fiches Grand et Petit à Imprimer Gratuit - Exercices CP et Fiches Maternelle pour Comparer les Tailles',
    description: 'Créez des fiches pédagogiques pour enseigner les notions de grand et petit à vos élèves. Votre abonnement Accès Complet vous donne accès à la création illimitée de fiches sans frais supplémentaires. Générez des exercices de comparaison de tailles en moins de 3 minutes.',
    keywords: 'fiches grand et petit, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, exercices maths, graphisme maternelle, coloriage à imprimer, apprendre à lire, comparaison de tailles',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/grand-petit-fiches',
  },

  // Hero Section - FULL text from big-small.md paragraphs 1-3
  hero: {
    title: 'Fiches Grand et Petit à Imprimer',
    subtitle: 'Exercices CP et Fiches Maternelle pour Comparer les Tailles',
    description: `Créez des fiches pédagogiques pour enseigner les notions de grand et petit à vos élèves. Votre abonnement Accès Complet vous donne accès à la création illimitée de fiches sans frais supplémentaires. Générez des exercices de comparaison de tailles en moins de 3 minutes. Téléchargez des fichiers PDF haute résolution prêts à imprimer.

Les exercices de comparaison de tailles sont essentiels au développement cognitif des enfants. Cette compétence mathématique fondamentale prépare les élèves aux concepts de mesure et de numération. Notre générateur de fiches simplifie la création de ces activités pédagogiques.

Les fiches de comparaison de tailles conviennent parfaitement aux classes de maternelle. De la Petite Section à la Grande Section, les enfants apprennent à distinguer le grand du petit. Ces exercices développent le sens de l'observation et la discrimination visuelle.`,
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

  // Sample Gallery - REAL file paths from samples/english/big small/
  samples: {
    sectionTitle: 'Exemples de Fiches Grand et Petit',
    sectionDescription: 'Téléchargez des exemples gratuits pour voir notre qualité professionnelle',
    downloadLabel: 'Télécharger Exemple Gratuit',
    worksheetLabel: 'Fiche Grand et Petit',
    answerKeyLabel: 'Clé de Correction',
    viewAllLabel: 'Agrandir',
    noPdfLabel: 'Aperçu uniquement',
    freePdfCountLabel: 'téléchargements gratuits',
    badgeText: 'Exemples Gratuits',
    downloadingLabel: 'Téléchargement...',
    ofLabel: 'sur',
    items: [],
  },

  // Use Cases - FULL text from big-small.md use case sections
  useCases: {
    sectionTitle: 'Fiches Maternelle et Exercices CP pour Tous les Enseignants - Qui Utilise nos Fiches à Imprimer Gratuit',
    sectionDescription: 'Notre générateur de fiches s\'adresse à tous les professionnels de l\'éducation. Les enseignants de maternelle et de CP y trouvent des ressources adaptées. Les parents pratiquant l\'instruction en famille apprécient également cet outil. Découvrez comment chaque profil utilise nos fiches à imprimer gratuit.',
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

  // Related Apps - From big-small.md Section 7
  relatedApps: {
    sectionTitle: 'Combinez les Fiches Grand et Petit avec d\'Autres Fiches à Imprimer Gratuit - Packs Pédagogiques Complets avec Tables de Multiplication',
    sectionDescription: 'Les fiches grand et petit s\'intègrent parfaitement à des packs pédagogiques complets. Combinez-les avec les 32 autres générateurs de la plateforme. Les tables de multiplication, les exercices de lecture et bien d\'autres outils créent des ensembles cohérents. Vos fiches à imprimer gratuit forment des séquences d\'apprentissage structurées pour tous les niveaux.',
    ctaTitle: 'Prêt à Créer des Fiches Grand et Petit Professionnelles ?',
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

export default bigSmallFrContent;
