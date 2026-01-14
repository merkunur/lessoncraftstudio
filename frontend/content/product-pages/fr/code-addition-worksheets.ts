import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Code Addition Worksheets (Addition avec Images) - French Content
 *
 * File: frontend/content/product-pages/fr/code-addition-worksheets.ts
 * URL: /fr/apps/addition-codee-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/code-addition.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * Pricing Tier: Accès Complet (Accès Complet) - 240€/year
 */

export const codeAdditionFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'addition-codee-fiches',
    appId: 'code-addition',
    title: 'Générateur de Fiches d\'Addition avec Images - Fiches à Imprimer Gratuit pour Exercices Maths Maternelle et CP',
    description: 'Créez des fiches d\'addition originales avec notre générateur de fiches maternelle. Votre abonnement Accès Complet vous donne un accès illimité à la création de fiches à imprimer gratuit. Chaque fiche utilise des images colorées pour représenter les nombres. Téléchargez des fichiers PDF haute qualité en moins de 3 minutes.',
    keywords: 'fiches maternelle, exercices maths, exercices CP, fiches à imprimer gratuit, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet, tables de multiplication, écriture cursive, calcul',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/addition-codee-fiches',
  },

  // Hero Section - FULL text from code-addition.md paragraphs 1-4
  hero: {
    title: 'Générateur de Fiches d\'Addition avec Images',
    subtitle: 'Fiches à Imprimer Gratuit pour Exercices Maths Maternelle et CP',
    description: `Créez des fiches d'addition originales avec notre générateur de fiches maternelle. Votre abonnement Accès Complet vous donne un accès illimité à la création de fiches à imprimer gratuit sans frais supplémentaires. Chaque fiche utilise des images colorées pour représenter les nombres. Les enfants décodent une légende puis additionnent les valeurs correspondantes.

Le concept unique de ce générateur transforme l'apprentissage des exercices maths en jeu de décodage. Une légende en haut de la fiche associe chaque image à un nombre précis. Par exemple : pomme = 3, voiture = 5, ballon = 2. L'enfant voit ensuite des opérations comme [pomme] + [voiture] = ___. Il doit d'abord identifier les valeurs dans la légende, puis calculer le résultat.

Cette approche développe plusieurs compétences simultanément. La reconnaissance visuelle améliore la mémoire de travail. Le décodage de symboles prépare à la lecture et aux exercices CP. Le calcul mental renforce les bases mathématiques. Les fiches maternelle deviennent ainsi des outils d'apprentissage complets et ludiques.

Notre générateur propose des fiches à imprimer gratuit adaptées à tous les niveaux. Pour la maternelle grande section, choisissez des nombres de 1 à 5. Pour les exercices CP, élargissez la plage de 1 à 10. Les exercices CE1 peuvent utiliser des nombres jusqu'à 20. Chaque fiche s'adapte automatiquement au niveau de difficulté choisi.`,
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

  // Sample Gallery - REAL file paths from samples/english/code addition/
  samples: {
    sectionTitle: 'Exemples de Fiches d\'Addition avec Images',
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

  // Use Cases - FULL text from code-addition.md use case sections
  useCases: {
    sectionTitle: 'Qui Utilise ces Fiches Maternelle - Exercices Maths pour Enseignants, Parents et Éducateurs',
    sectionDescription: 'Les fiches à imprimer gratuit répondent aux besoins de nombreux profils d\'utilisateurs. Des enseignants de maternelle aux parents pratiquant l\'instruction en famille. Des professeurs de CP aux éducateurs spécialisés. Découvrez comment chaque groupe tire profit de ce générateur d\'exercices maths.',
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

  // Related Apps - From code-addition.md Section 7
  relatedApps: {
    sectionTitle: 'Combinez Addition avec Coloriage à Imprimer, Tables de Multiplication et Graphisme Maternelle - Packs Pédagogiques Complets',
    sectionDescription: 'Notre plateforme propose 33 générateurs de fiches complémentaires. Combinez l\'addition avec images et d\'autres activités pour créer des packs pédagogiques complets. Du coloriage à imprimer aux tables de multiplication, chaque générateur enrichit votre offre éducative.',
    ctaTitle: 'Prêt à Créer des Fiches d\'Addition Professionnelles ?',
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

export default codeAdditionFrContent;
