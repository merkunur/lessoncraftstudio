import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Matching Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/matching-worksheets.ts
 * URL: /fr/apps/association-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/matching.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const matchingFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'association-fiches',
    appId: 'matching-app',
    title: 'Fiches d\'Association | Fiches Maternelle et Exercices CP pour Apprendre à Lire',
    description: 'Créez des fiches d\'association professionnelles avec notre générateur MatchUp Maker. Votre abonnement Pack Essentiel vous donne un accès illimité à la création de fiches maternelle personnalisées. Téléchargez des fichiers PDF haute qualité en moins de 3 minutes.',
    keywords: 'fiches association, fiches maternelle, exercices CP, fiches à imprimer gratuit, apprendre à lire, fiches alphabet, graphisme maternelle, exercices maths, apprendre les lettres, coloriage à imprimer, écriture cursive, tables de multiplication',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/association-fiches',
  },

  // Hero Section - FULL text from matching.md paragraphs 1-6
  hero: {
    title: 'Générateur de Fiches d\'Association',
    subtitle: 'Fiches Maternelle et Exercices CP pour Apprendre à Lire',
    description: `Créez des fiches d'association professionnelles avec notre générateur MatchUp Maker. Votre abonnement Pack Essentiel vous donne un accès illimité à la création de fiches sans frais supplémentaires par fiche. Générez des fiches maternelle personnalisées parfaites pour les élèves de maternelle et de CP. Téléchargez des fichiers PDF haute qualité en moins de 3 minutes. Économisez des heures de préparation chaque semaine.

Notre générateur de fiches d'association aide les enseignants à créer des exercices éducatifs où les élèves tracent des lignes pour relier des paires correspondantes. Choisissez parmi quatre modes d'association incluant l'association image-lettre pour apprendre les lettres de l'alphabet. Essayez l'association image-mot pour les exercices CP de lecture. Utilisez l'association vocabulaire personnalisé pour les fiches de phonologie et la compréhension en lecture. Parfait pour le développement des compétences en lecture dans les classes de maternelle et d'école élémentaire.

MatchUp Maker offre une création de contenu flexible pour toutes les matières. Créez des exercices maths avec association visuelle pour la reconnaissance des nombres et la pratique du calcul. Générez des fiches d'addition où les élèves associent problèmes et réponses. Construisez des fiches alphabet pour la reconnaissance des lettres en maternelle. Concevez des activités de graphisme maternelle combinées avec des exercices d'association pour le développement de la motricité fine. Tout le contenu utilise notre bibliothèque de plus de 3000 images adaptées aux enfants.`,
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

  // Sample Gallery - REAL file paths from samples/english/matching/
  samples: {
    sectionTitle: 'Exemples de Fiches d\'Association',
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

  // Use Cases - FULL text from matching.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour Enseignants, Parents et Éducateurs - Fiches Maternelle et Exercices CP pour Tous les Besoins',
    sectionDescription: 'Les fiches d\'association répondent à différents besoins éducatifs dans divers environnements d\'enseignement. Les enseignants de maternelle utilisent les fiches d\'association pour la reconnaissance des lettres et la pratique du graphisme. Les enseignants de CP construisent des fiches pour apprendre à lire et développer la lecture. Les parents pratiquant l\'instruction en famille créent des fiches alphabet personnalisées au rythme d\'apprentissage individuel. Les enseignants de FLE conçoivent des exercices maths avec support visuel du vocabulaire. Les enseignants spécialisés génèrent des fiches à imprimer gratuit différenciées pour différents niveaux.',
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

  // Related Apps - From matching.md Section 7
  relatedApps: {
    sectionTitle: 'Combinez les Fiches d\'Association avec d\'Autres Générateurs - Coloriage à Imprimer et Exercices Maths',
    sectionDescription: 'Les fiches d\'association se combinent parfaitement avec d\'autres fiches à imprimer pour créer des packs d\'apprentissage complets. Les enseignants utilisent l\'association aux côtés des exercices maths pour une instruction complète des nombres. Associez fiches alphabet et association pour des programmes complets de reconnaissance des lettres.',
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

export default matchingFrContent;
