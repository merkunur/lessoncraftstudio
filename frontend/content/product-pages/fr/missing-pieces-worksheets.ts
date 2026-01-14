import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Missing Pieces Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/missing-pieces-worksheets.ts
 * URL: /fr/apps/pieces-manquantes-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/missing-pieces.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Accès Complet = 240 $/an (Accès Complet)
 * App ID: missing-pieces
 */

export const missingPiecesFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'pieces-manquantes-fiches',
    appId: 'missing-pieces',
    title: 'Fiches à Imprimer Gratuit - Fiches Maternelle - Générateur d\'Exercices Pièces Manquantes',
    description: 'Créez des fiches d\'exercices de pièces manquantes professionnelles en quelques clics. Notre générateur transforme n\'importe quelle image en puzzle éducatif. Les élèves identifient les morceaux manquants et choisissent la bonne pièce parmi plusieurs options. Un outil idéal pour développer l\'observation visuelle et la discrimination.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices CP, pièces manquantes, puzzles éducatifs, discrimination visuelle, exercices CE1, observation visuelle, graphisme maternelle, exercices maths, apprendre à lire, tables de multiplication, écriture cursive, alphabet, coloriage',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/pieces-manquantes-fiches',
  },

  // Hero Section - FULL text from French missing-pieces.md paragraphs 1-7
  hero: {
    title: 'Générateur d\'Exercices Pièces Manquantes',
    subtitle: 'Fiches à Imprimer Gratuit - Fiches Maternelle et Exercices CP',
    description: `Créez des fiches d'exercices de pièces manquantes professionnelles en quelques clics. Notre générateur transforme n'importe quelle image en puzzle éducatif. Les élèves identifient les morceaux manquants et choisissent la bonne pièce parmi plusieurs options. Un outil idéal pour développer l'observation visuelle et la discrimination.

Votre abonnement Accès Complet vous donne accès illimité à la création de fiches. Générez autant d'exercices pièces manquantes que nécessaire sans frais supplémentaires. L'abonnement Accès Complet coûte 240 $ par an ou 25 $ par mois. Il inclut les 33 générateurs de fiches disponibles sur la plateforme.

Parfait pour la maternelle, le CP et le CE1. Les enseignants utilisent ces puzzles pour travailler la perception visuelle. Les pièces manquantes aident les enfants à développer leur sens de l'observation. Chaque fiche téléchargeable est en haute qualité 300 DPI. Imprimez directement ou vendez vos créations avec la licence commerciale incluse.

Ajustez la difficulté selon le niveau de vos élèves. Configurez de 1 à 5 pièces manquantes par puzzle. Choisissez entre 2 et 6 options de réponses possibles. Sélectionnez la forme des pièces : carrée, ronde, rectangle ou ellipse. Plus il y a de pièces manquantes, plus l'exercice est complexe.

Utilisez notre bibliothèque de plus de 3000 images thématiques. Animaux, transport, nourriture, objets du quotidien. Ou téléchargez vos propres images pour personnaliser vos fiches. Combinez les images de la bibliothèque avec vos photos personnelles. Créez des exercices adaptés aux intérêts de votre classe.

Téléchargez vos fiches en format JPEG ou PDF. L'option niveau de gris permet d'économiser l'encre à l'impression. Chaque puzzle génère automatiquement un corrigé. Les élèves peuvent vérifier leurs réponses de manière autonome. Gagnez un temps précieux dans la préparation de vos supports pédagogiques.`,
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

  // Sample Gallery - REAL file paths from samples/english/missing pieces/
  samples: {
    sectionTitle: 'Exemples de Fiches Pièces Manquantes',
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

  // Use Cases - FULL text from French missing-pieces.md persona sections
  useCases: {
    sectionTitle: 'Fiches Maternelle pour Enseignants et Parents - Exercices CP, Coloriage et Graphisme pour Tous les Besoins',
    sectionDescription: 'Les puzzles de pièces manquantes conviennent à de nombreux contextes éducatifs différents. Enseignants de maternelle, professeurs de CP et CE1, parents en instruction à domicile. Chaque groupe trouve des applications uniques pour ces fiches à imprimer gratuit. Les exercices s\'adaptent facilement à différents objectifs pédagogiques. Découvrez comment intégrer ces outils dans votre pratique éducative quotidienne.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [],
    ctaText: 'Commencer à Créer',
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

  // Related Apps - French translations
  relatedApps: {
    sectionTitle: 'Combinez avec d\'Autres Générateurs de Fiches',
    sectionDescription: 'Notre plateforme propose 33 générateurs de fiches différents au-delà des puzzles de pièces manquantes. Votre abonnement Accès Complet vous donne accès à tous les générateurs pour créer des paquets d\'apprentissage complets. Combinez les fiches de pièces manquantes avec les fiches de phonétique, les fiches d\'alphabet et les fiches de coloriage. Construisez des unités thématiques complètes mélangeant la pratique de la discrimination visuelle avec les activités de motricité fine.',
    ctaTitle: 'Prêt à Créer des Fiches Incroyables ?',
    ctaDescription: 'Rejoignez les éducateurs qui créent des fiches professionnelles. Génération illimitée, licence commerciale incluse.',
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

export default missingPiecesFrContent;
