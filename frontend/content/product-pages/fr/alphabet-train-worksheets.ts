import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Alphabet Train Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/alphabet-train-worksheets.ts
 * URL: /fr/apps/train-alphabet-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/alphabet-train.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const alphabetTrainFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'train-alphabet-fiches',
    appId: 'alphabet-train',
    title: 'Fiches Alphabet à Imprimer Gratuit | Générateur de Fiches Maternelle pour Apprendre les Lettres',
    description: 'Créez des fiches alphabet professionnelles avec notre générateur de train alphabet multilingue. Parfait pour les enseignants de maternelle, CP et CE1. Téléchargez des fiches à imprimer gratuit en PDF haute qualité en moins de trois minutes.',
    keywords: 'fiches alphabet, fiches maternelle, apprendre les lettres, fiches à imprimer gratuit, exercices CP, exercices CE1, train alphabet, générateur fiches, graphisme maternelle, coloriage à imprimer',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/train-alphabet-fiches',
  },

  // Hero Section - FULL text from alphabet-train.md paragraphs 1-5
  hero: {
    title: 'Générateur de Fiches Alphabet Gratuit',
    subtitle: 'Fiches à Imprimer Gratuit pour la Maternelle et le CP',
    description: `Créez des fiches alphabet professionnelles avec notre générateur de train alphabet multilingue. Votre abonnement Pack Essentiel vous offre une création illimitée de fiches maternelle. Générez des fiches à imprimer gratuit personnalisées en onze langues. Téléchargez vos fiches alphabet en PDF haute qualité en moins de trois minutes.

Notre générateur de train alphabet prend en charge onze alphabets complets avec les caractères appropriés. Les fiches alphabet allemandes incluent Ä, Ö et Ü aux positions correctes. Les fiches alphabet espagnoles incluent Ñ après N. Les fiches suédoises, danoises et norvégiennes comprennent Æ, Ø et Å. Les fiches finlandaises incluent Ä et Ö à la fin.

La bibliothèque d'images s'adapte automatiquement à la langue sélectionnée. Choisissez l'allemand et voyez les images étiquetées en allemand. Choisissez l'espagnol et voyez les images étiquetées en espagnol. Plus de 3000 images traduites dans les onze langues. Cela rend nos fiches alphabet parfaites pour l'apprentissage des langues en maternelle et en CP.

Chaque fiche alphabet présente un modèle de train coloré avec onze wagons. Les élèves associent les lettres aux images sur le train. Le design du train rend l'apprentissage de l'alphabet amusant et engageant. Parfait pour les fiches maternelle, les exercices CP et les exercices CE1.`,
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

  // Sample Gallery - REAL file paths from samples/english/alphabet train/
  samples: {
    sectionTitle: 'Exemples de Fiches Alphabet',
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

  // Use Cases - FULL text from alphabet-train.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour les Enseignants et les Parents',
    sectionDescription: 'Les fiches alphabet servent des environnements éducatifs divers et des situations d\'enseignement variées à tous les niveaux. Les enseignants de maternelle utilisent les fiches alphabet pour l\'instruction quotidienne en littératie. Les parents en instruction à domicile comptent sur les fiches pour un apprentissage structuré à la maison.',
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
    sectionDescription: 'Créez des paquets d\'apprentissage complets en combinant les fiches alphabet avec ces générateurs complémentaires.',
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

export default alphabetTrainFrContent;
