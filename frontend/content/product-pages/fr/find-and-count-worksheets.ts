import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find and Count Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/find-and-count-worksheets.ts
 * URL: /fr/apps/cherche-et-compte-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/find-and-count.md
 * App ID: find-and-count (I Spy counting worksheets)
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const findAndCountFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'cherche-et-compte-fiches',
    appId: 'find-and-count',
    title: 'Fiches Cherche et Compte à Imprimer Gratuit | Générateur de Fiches Maternelle et Exercices CP',
    description: 'Créez des fiches de cherche et compte personnalisées avec notre générateur professionnel. Parfait pour les enseignants de maternelle, CP et CE1. Téléchargez des PDF haute qualité en moins de 3 minutes.',
    keywords: 'fiches cherche et compte, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, graphisme maternelle, coloriage à imprimer, apprendre à compter, dénombrement, générateur fiches',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/cherche-et-compte-fiches',
  },

  // Hero Section - FULL text from find-and-count.md paragraphs 1-4
  hero: {
    title: 'Fiches Cherche et Compte',
    subtitle: 'Générateur de Fiches Maternelle et Exercices CP',
    description: `Créez des fiches de cherche et compte personnalisées avec notre générateur professionnel. Votre abonnement Pack Essentiel vous donne accès à la création illimitée de fiches à imprimer gratuit sans frais supplémentaires par fiche. Téléchargez des PDF haute qualité en moins de 3 minutes. Parfait pour les enseignants de maternelle et les parents qui font l'école à la maison.

Les activités de cherche et compte captivent les jeunes enfants. Ce type d'exercice développe l'attention visuelle et les compétences de dénombrement. Notre générateur de fiches maternelle simplifie la création de ces supports pédagogiques. Vous choisissez les images, le générateur remplit la grille automatiquement.

Le dénombrement constitue une compétence fondamentale en mathématiques. Nos fiches à imprimer gratuit transforment cet apprentissage en jeu. Les enfants adorent chercher et compter des objets cachés dans une grille colorée. Chaque fiche devient une aventure visuelle qui renforce les exercices maths de façon ludique.

Combinez le cherche et compte avec des activités de graphisme maternelle. Nos fiches s'intègrent parfaitement dans une séquence pédagogique complète. Après avoir compté les objets, les élèves peuvent colorier les éléments trouvés. Cette approche multi-sensorielle renforce l'apprentissage. Le coloriage à imprimer développe également la motricité fine.`,
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

  // Sample Gallery - REAL file paths from samples/english/find and count/
  samples: {
    sectionTitle: 'Exemples de Fiches Cherche et Compte',
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

  // Use Cases - FULL text from find-and-count.md use case sections
  useCases: {
    sectionTitle: 'À Qui S\'Adressent les Fiches Cherche et Compte',
    sectionDescription: 'Nos fiches de cherche et compte répondent aux besoins de nombreux professionnels de l\'éducation. Découvrez comment chaque profil utilise cet outil pour créer des supports pédagogiques adaptés. Des enseignants de maternelle aux entrepreneurs du numérique éducatif.',
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
    sectionDescription: 'Votre abonnement Pack Essentiel inclut 10 générateurs complémentaires. Combinez le cherche et compte avec d\'autres outils pour créer des séquences pédagogiques complètes.',
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

export default findAndCountFrContent;
