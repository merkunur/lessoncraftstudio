import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Search Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/word-search-worksheets.ts
 * URL: /fr/apps/mots-caches-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/wordsearch.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordSearchFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'mots-caches-fiches',
    appId: 'word-search',
    title: 'Générateur de Mots Mêlés Gratuit | Fiches à Imprimer Gratuit Maternelle et CP',
    description: 'Créez des mots mêlés professionnels avec notre générateur de fiches maternelle. Parfait pour les enseignants de maternelle, CP et CE1. Téléchargez des fiches à imprimer gratuit en PDF haute qualité en moins de trois minutes.',
    keywords: 'mots mêlés, générateur mots cachés, fiches maternelle, fiches à imprimer gratuit, exercices CP, apprendre à lire, alphabet, graphisme maternelle, tables de multiplication, coloriage à imprimer',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/mots-caches-fiches',
  },

  // Hero Section - FULL text from wordsearch.md paragraphs 1-4
  hero: {
    title: 'Générateur de Mots Mêlés Gratuit',
    subtitle: 'Fiches à Imprimer Gratuit pour la Maternelle et le CP',
    description: `Créez des mots mêlés professionnels en quelques secondes avec notre générateur de fiches maternelle. Votre abonnement Pack Essentiel à 144€ par an vous donne un accès illimité sans filigrane. Parfait pour les enseignants de maternelle, les professeurs de CP et CE1, et les parents en instruction à domicile. Générez des puzzles de mots cachés personnalisés avec des images ou des mots en trois clics seulement. La version gratuite permet de tester l'outil avec un filigrane pour un usage personnel.

Notre outil de création de mots mêlés aide à concevoir des activités d'apprentissage captivantes pour les jeunes élèves. Choisissez parmi plus de 3000 images adaptées aux enfants et organisées par thème. Chaque fiche de mots mêlés se télécharge en PDF ou JPEG haute qualité à 300 DPI. Vos élèves adoreront chercher les mots cachés associés à des images colorées. Les fiches maternelle deviennent des outils pédagogiques professionnels. Les exercices CP et CE1 gagnent en attrait avec des visuels engageants.

Ce générateur de mots mêlés fonctionne en 11 langues complètes. Français, anglais, allemand, espagnol, portugais, italien, néerlandais, danois, suédois, norvégien et finnois. Sélectionnez un thème comme les animaux, les transports ou les fruits. L'application crée un puzzle complet avec sa fiche de correction automatique. Modifiez tout sur le canevas avant le téléchargement. Ajoutez du texte personnalisé avec différentes polices. Changez les couleurs et les arrière-plans. Téléversez vos propres images pour des fiches à imprimer gratuit personnalisées.`,
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

  // Sample Gallery - REAL file paths from samples/english/wordsearch/
  samples: {
    sectionTitle: 'Exemples de Mots Mêlés',
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

  // Use Cases - FULL text from wordsearch.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour les Enseignants et les Parents',
    sectionDescription: 'Le générateur de mots mêlés est parfait pour tous ceux qui enseignent aux enfants. Les enseignants de maternelle et du primaire l\'utilisent quotidiennement. Les parents en instruction à domicile créent des fiches à imprimer gratuit pour leurs enfants. Les enseignants spécialisés créent des fiches adaptées aux différents besoins.',
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
    sectionDescription: 'Créez des paquets d\'apprentissage complets en combinant les fiches de mots mêlés avec ces générateurs complémentaires.',
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

export default wordSearchFrContent;
