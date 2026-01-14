import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * More or Less Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/more-less-worksheets.ts
 * URL: /fr/apps/plus-moins-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/more-less.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Accès Complet = 240 $/an (Accès Complet)
 * App ID: more-less
 */

export const moreLessFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'comparaison-quantites-fiches',
    appId: 'more-less',
    title: 'Fiches à Imprimer Gratuit de Comparaison - Exercices Maths Plus Moins Égal - Fiches Maternelle et Exercices CP',
    description: 'Créez des fiches de comparaison mathématique professionnelles avec notre générateur d\'exercices maths. Générez des exercices CP de comparaison de quantités parfaits pour la maternelle et le CP. Téléchargez des fichiers PDF de haute qualité en moins de 3 minutes.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices maths, exercices CP, plus moins égal, comparaison, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, tables de multiplication, exercices CE1',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/comparaison-quantites-fiches',
  },

  // Hero Section - FULL text from French more-less.md Section 1
  hero: {
    title: 'Générateur d\'Exercices de Comparaison',
    subtitle: 'Fiches à Imprimer Gratuit - Exercices Maths Plus Moins Égal',
    description: `Créez des fiches de comparaison mathématique professionnelles avec notre générateur d'exercices maths. Votre abonnement Accès Complet vous permet de créer des fiches à imprimer en illimité sans frais supplémentaires par fiche. Générez des exercices CP de comparaison de quantités parfaits pour la maternelle et le CP. Téléchargez des fichiers PDF de haute qualité en moins de 3 minutes.

Les exercices maths de comparaison enseignent aux élèves à comparer deux quantités et choisir le bon symbole mathématique. Les enfants apprennent les concepts de plus que, moins que et égal à. Notre générateur crée des fiches maternelle visuellement attrayantes qui maintiennent l'attention des jeunes apprenants. Les exercices CP progressifs s'adaptent au niveau de chaque élève.

Notre générateur de fiches à imprimer offre deux modes de comparaison distincts. Comparez des groupes d'images entre eux pour renforcer le comptage. Comparez des images à des chiffres écrits pour apprendre à lire les nombres. Choisissez des symboles illustrés colorés ou des symboles mathématiques traditionnels. Personnalisez complètement vos fiches maternelle avec notre éditeur sur canevas.

Les enseignants choisissent l'abonnement Accès Complet pour trois raisons essentielles. Premièrement, la création d'exercices maths en 11 langues facilite l'enseignement multilingue et l'apprentissage du français langue étrangère. Deuxièmement, la licence commerciale incluse permet de vendre vos fiches à imprimer sur Teachers Pay Teachers et Etsy. Troisièmement, le gain de temps considérable vous permet de créer des exercices CP professionnels en 3 minutes au lieu de 30 minutes avec les méthodes traditionnelles.`,
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

  // Sample Gallery - REAL file paths from samples/english/more less/
  samples: {
    sectionTitle: 'Exemples de Fiches de Comparaison',
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

  // Use Cases - FULL text from French more-less.md Section 4
  useCases: {
    sectionTitle: 'Parfait pour Enseignants et Parents - Fiches Maternelle et Exercices CP pour Tous les Besoins en Exercices Maths',
    sectionDescription: 'Notre générateur d\'exercices maths répond aux besoins de différents utilisateurs. Les enseignants de maternelle créent des fiches à imprimer adaptées aux jeunes apprenants. Les professeurs de CP et CE1 génèrent des exercices maths de comparaison plus complexes. Les parents en instruction à domicile profitent de la flexibilité complète du générateur. Chaque groupe d\'utilisateurs bénéficie des fonctionnalités professionnelles incluses dans l\'abonnement Accès Complet.',
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
    sectionTitle: 'Combinez avec d\'Autres Générateurs de Fiches - Tables de Multiplication, Graphisme Maternelle et Coloriage',
    sectionDescription: 'Notre plateforme propose 33 générateurs de fiches à imprimer différents. Combinez les exercices maths de comparaison avec d\'autres types de fiches pédagogiques. Créez des packs d\'apprentissage complets couvrant plusieurs domaines. Les enseignants apprécient cette approche intégrée qui maximise l\'efficacité pédagogique. Votre abonnement Accès Complet donne accès à tous les générateurs sans frais supplémentaires.',
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

export default moreLessFrContent;
