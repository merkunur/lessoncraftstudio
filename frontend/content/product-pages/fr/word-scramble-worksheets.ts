import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Word Scramble Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/word-scramble-worksheets.ts
 * URL: /fr/apps/mots-melanges-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/word-scramble.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const wordScrambleFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'mots-melanges-fiches',
    appId: 'word-scramble',
    title: 'Générateur de Mots Mélangés | Fiches à Imprimer Gratuit pour Maternelle et CP',
    description: 'Créez des exercices de mots mélangés en quelques clics. Votre abonnement Pack Essentiel vous donne accès à la création illimitée de fiches maternelle et exercices CP. Téléchargez vos fiches à imprimer gratuit en format PDF haute qualité.',
    keywords: 'mots mélangés, générateur mots mélangés, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, apprendre à lire, alphabet, apprendre les lettres, graphisme maternelle, écriture cursive, coloriage à imprimer, exercices maths, tables de multiplication',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/mots-melanges-fiches',
  },

  // Hero Section - FULL text from word-scramble.md paragraphs 1-4
  hero: {
    title: 'Générateur de Mots Mélangés',
    subtitle: 'Fiches à Imprimer Gratuit pour Maternelle et CP',
    description: `Créez des exercices de mots mélangés en quelques clics. Votre abonnement Pack Essentiel vous donne accès à la création illimitée de fiches. Générez des fiches maternelle et exercices CP personnalisés sans frais supplémentaires. Téléchargez vos fiches à imprimer gratuit en format PDF haute qualité.

Les mots mélangés sont parfaits pour apprendre à lire. Les élèves remettent les lettres dans le bon ordre. Chaque exercice inclut une image comme indice visuel. Cet outil pédagogique renforce le vocabulaire et l'orthographe.

Notre générateur propose 11 langues. L'interface et le contenu s'adaptent à votre langue. Les fiches maternelle utilisent des images adaptées aux enfants. Parfait pour les classes bilingues et l'apprentissage du français langue étrangère.`,
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

  // Sample Gallery - REAL file paths from samples/english/word scramble/
  samples: {
    sectionTitle: 'Exemples de Mots Mélangés',
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

  // Use Cases - FULL text from word-scramble.md use case sections
  useCases: {
    sectionTitle: 'Qui Utilise les Mots Mélangés - Fiches Maternelle et Exercices CP pour Tous les Éducateurs',
    sectionDescription: 'Les mots mélangés conviennent à de nombreux profils d\'utilisateurs. Enseignants, parents et éducateurs trouvent tous leur compte. Découvrez comment chaque groupe utilise cet outil. Trouvez l\'inspiration pour vos propres usages.',
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

  // Related Apps - From word-scramble.md Section 7
  relatedApps: {
    sectionTitle: 'Combinez les Mots Mélangés avec d\'Autres Générateurs - Coloriage à Imprimer et Exercices Maths',
    sectionDescription: 'Le générateur de mots mélangés fait partie du Pack Essentiel. Neuf autres générateurs complètent parfaitement cet outil. Créez des parcours pédagogiques complets en combinant plusieurs applications.',
    ctaTitle: 'Prêt à Créer des Fiches Professionnelles ?',
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

export default wordScrambleFrContent;
