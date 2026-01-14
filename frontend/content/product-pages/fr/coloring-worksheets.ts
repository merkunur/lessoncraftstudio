import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Coloring Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/coloring-worksheets.ts
 * URL: /fr/apps/coloriage-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/coloring.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const coloringFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'coloriage-fiches',
    appId: 'coloring',
    title: 'Coloriage à Imprimer Gratuit | Générateur de Fiches Maternelle et CP',
    description: 'Créez des pages de coloriage personnalisées avec notre générateur de fiches maternelle. Plus de 3000 images adaptées aux enfants. Téléchargez en PDF haute qualité 300 DPI. Parfait pour les enseignants de maternelle, CP et CE1.',
    keywords: 'coloriage à imprimer, fiches maternelle, graphisme maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, coloriage enfant, générateur coloriage, coloriage maternelle, pages de coloriage',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/coloriage-fiches',
  },

  // Hero Section - FULL text from coloring.md paragraphs 1-3
  hero: {
    title: 'Coloriage à Imprimer Gratuit',
    subtitle: 'Créateur de Fiches Maternelle et Exercices CP',
    description: `Créez des pages de coloriage personnalisées en quelques clics. Avec votre abonnement Pack Essentiel, vous accédez à un générateur professionnel de coloriage à imprimer. Transformez vos idées en fiches maternelle prêtes à l'emploi. Plus de 3000 images adaptées aux enfants vous attendent.

Les enseignants de maternelle et CP adorent cet outil. Fini les heures passées à chercher des coloriages adaptés. Votre abonnement vous donne accès illimité à la création de fiches à imprimer gratuit. Aucun frais supplémentaire par fiche créée.

Le créateur de coloriage fonctionne en 11 langues. Parfait pour les classes bilingues et l'enseignement du français langue étrangère. Téléchargez vos créations en PDF haute qualité 300 DPI. Idéal pour l'impression professionnelle et la vente sur Teachers Pay Teachers.`,
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

  // Sample Gallery - REAL file paths from samples/english/coloring/
  samples: {
    sectionTitle: 'Exemples de Coloriages',
    sectionDescription: 'Découvrez des exemples de coloriages créés avec notre générateur',
    downloadLabel: 'Télécharger Exemple',
    worksheetLabel: 'Coloriage',
    answerKeyLabel: 'Corrigé',
    viewAllLabel: 'Agrandir',
    noPdfLabel: 'Aperçu uniquement',
    freePdfCountLabel: 'téléchargements gratuits',
    badgeText: 'Exemples Gratuits',
    downloadingLabel: 'Téléchargement...',
    ofLabel: 'sur',
    items: [],
  },

  // Use Cases - FULL text from coloring.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour les Enseignants et les Parents',
    sectionDescription: 'Notre créateur de coloriages répond aux besoins de nombreux utilisateurs. Enseignants, parents et éducateurs trouvent des solutions adaptées. Découvrez comment chaque profil exploite les fiches à imprimer gratuit.',
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
    sectionDescription: 'Créez des paquets d\'apprentissage complets en combinant les coloriages avec ces générateurs complémentaires.',
    ctaTitle: 'Prêt à Créer des Coloriages Fantastiques ?',
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

export default coloringFrContent;
