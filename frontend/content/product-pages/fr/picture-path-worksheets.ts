import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Picture Path Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/picture-path-worksheets.ts
 * URL: /fr/apps/parcours-images-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/picture-path.md
 * App ID: picture-path (Visual maze/path worksheets)
 * Bundle: Accès Complet ($240/year) - NOT Pack Essentiel
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const picturePathFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'parcours-images-fiches',
    appId: 'picture-path',
    title: 'Fiches à Imprimer Gratuit | Générateur de Parcours d\'Images - Fiches Maternelle et Exercices CP',
    description: 'Créez des parcours d\'images professionnels en quelques clics. Notre générateur transforme vos fiches maternelle en activités ludiques et éducatives. Parfait pour le graphisme maternelle et les exercices CP. Téléchargez en PDF haute résolution en 3 minutes.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, parcours images, labyrinthe, exercices CP, graphisme maternelle, motricité fine, coloriage à imprimer, exercices maths, apprendre à lire, alphabet, tables de multiplication',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/parcours-images-fiches',
  },

  // Hero Section - FULL text from picture-path.md paragraphs 1-4
  hero: {
    title: 'Générateur de Parcours d\'Images',
    subtitle: 'Fiches Maternelle et Exercices CP - Fiches à Imprimer Gratuit',
    description: `Créez des parcours d'images professionnels en quelques clics. Notre générateur transforme vos fiches maternelle en activités ludiques et éducatives. Parfait pour le graphisme maternelle et les exercices CP. Les enfants adorent suivre les chemins visuels tout en apprenant.

Votre abonnement Accès Complet vous donne un accès illimité. Créez autant de fiches à imprimer gratuit que nécessaire. Pas de frais supplémentaires par fiche. Téléchargez des parcours d'images de qualité professionnelle en 3 minutes.

Le générateur propose trois modes de jeu différents. Le mode Parcours d'Images crée des chemins entre images. Le mode Labyrinthe Classique génère des labyrinthes avec images à collectionner. Le mode Choisir le Bon Chemin propose plusieurs chemins dont un seul est correct. Chaque mode s'adapte aux besoins de vos élèves.

Les fiches maternelle créées développent plusieurs compétences. Le graphisme maternelle progresse en suivant les lignes. La motricité fine s'améliore avec le tracé des chemins. La concentration augmente en cherchant le bon parcours. Les exercices CP renforcent la logique et le raisonnement spatial.`,
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

  // Sample Gallery - REAL file paths from samples/english/picture path/
  samples: {
    sectionTitle: 'Exemples de Fiches Parcours d\'Images',
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

  // Use Cases - FULL text from picture-path.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour les Enseignants et Parents - Fiches Maternelle et Exercices CP pour Tous les Besoins',
    sectionDescription: 'Le générateur de parcours d\'images répond aux besoins de tous les éducateurs. Les enseignants de maternelle l\'utilisent quotidiennement pour le graphisme. Les professeurs de CP créent des exercices de lecture. Les parents en IEF génèrent des activités variées. Les enseignants de langues étrangères multiplient les ressources multilingues. Les professeurs spécialisés adaptent chaque fiche aux besoins spécifiques. Les enseignants entrepreneurs vendent leurs créations en ligne.',
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

  // Related Apps - From picture-path.md Section 7
  relatedApps: {
    sectionTitle: 'Combiner les Apps - Apprendre à Lire, Alphabet et Écriture Cursive Ensemble',
    sectionDescription: 'L\'abonnement Accès Complet inclut 33 générateurs de fiches différents. Combinez le générateur de parcours avec d\'autres apps. Créez des ressources pédagogiques ultra-complètes. Les élèves travaillent plusieurs compétences simultanément. Votre temps de préparation diminue drastiquement.',
    ctaTitle: 'Prêt à Créer des Fiches Professionnelles ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches maternelle de qualité. Création illimitée, licence commerciale incluse.',
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

export default picturePathFrContent;
