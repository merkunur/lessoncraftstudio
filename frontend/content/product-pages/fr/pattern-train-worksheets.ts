import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Pattern Train Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/pattern-train-worksheets.ts
 * URL: /fr/apps/train-suites-logiques-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/pattern-train.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const patternTrainFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'train-suites-logiques-fiches',
    appId: 'pattern-train',
    title: 'Fiches à Imprimer Gratuit | Générateur de Suites Logiques Train pour Fiches Maternelle',
    description: 'Créez des fiches maternelle professionnelles de reconnaissance de suites logiques avec notre générateur de train à motifs. Générez des exercices CP personnalisés parfaits pour la maternelle et le CP. Téléchargez des fiches de haute qualité en PDF en moins de 3 minutes.',
    keywords: 'fiches maternelle, suites logiques, fiches à imprimer gratuit, exercices CP, train à motifs, reconnaissance de motifs, maternelle, CP, générateur fiches, suites AB ABC',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/train-suites-logiques-fiches',
  },

  // Hero Section - FULL text from pattern-train.md paragraphs 1-4
  hero: {
    title: 'Générateur de Suites Logiques Train',
    subtitle: 'Fiches à Imprimer Gratuit pour Fiches Maternelle',
    description: `Créez des fiches maternelle professionnelles de reconnaissance de suites logiques avec notre générateur de train à motifs. Votre abonnement Accès Complet vous donne accès illimité à la création de fiches à imprimer gratuit sans frais par fiche. Générez des exercices CP personnalisés parfaits pour la maternelle et le CP. Téléchargez des fiches de haute qualité en PDF en moins de 3 minutes.

Notre générateur permet aux enseignants de créer des fiches maternelle de suites logiques avec des thèmes visuels engageants. Les enfants apprennent à reconnaître et compléter les suites visuelles en utilisant un modèle de train attractif. Chaque fiche à imprimer gratuit enseigne les concepts de suites logiques (AB, AAB, ABB, ABC, AABB) à travers des activités de découpage-collage interactives.

Le générateur s'adapte à tous les niveaux de maternelle. Créez des fiches maternelle simples avec des suites AB pour les petits. Développez des exercices CP plus complexes avec des suites ABC pour les grands. Chaque fiche inclut des images colorées, des instructions claires et une correction automatique.

Les enseignants gagnent du temps précieux. Créer des fiches maternelle de suites logiques manuellement prend 30-60 minutes. Notre générateur produit des fiches à imprimer gratuit professionnelles en 3 minutes. Ajustez la difficulté, choisissez les thèmes visuels et téléchargez instantanément. Vos exercices CP sont prêts pour la classe.`,
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

  // Sample Gallery - REAL file paths from samples/english/pattern train/
  samples: {
    sectionTitle: 'Exemples de Fiches Suites Logiques',
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

  // Use Cases - FULL text from pattern-train.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour Enseignants, Parents et Éducateurs',
    sectionDescription: 'Notre générateur de fiches maternelle sert tous les professionnels de l\'éducation. Les enseignants de maternelle créent des exercices CP adaptés. Les parents en instruction à domicile produisent des fiches à imprimer gratuit personnalisées. Les orthophonistes développent du matériel thérapeutique ciblé.',
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
    sectionDescription: 'Créez des paquets d\'apprentissage complets en combinant les fiches de suites logiques avec ces générateurs complémentaires.',
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

export default patternTrainFrContent;
