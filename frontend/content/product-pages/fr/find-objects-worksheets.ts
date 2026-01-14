import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Find Objects Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/find-objects-worksheets.ts
 * URL: /fr/apps/cherche-objets-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/find-objects.md
 * App ID: find-objects (Visual discrimination / I Spy worksheets)
 * Bundle: Accès Complet ($240/year) - NOT Pack Essentiel
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const findObjectsFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'cherche-objets-fiches',
    appId: 'find-objects',
    title: 'Fiches à Imprimer Gratuit | Générateur de Fiches Maternelle pour Apprendre à Lire',
    description: 'Créez des fiches professionnelles de discrimination visuelle avec notre générateur. Votre abonnement Accès Complet vous donne un accès illimité. Téléchargez des PDF haute qualité en moins de 3 minutes.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices CP, discrimination visuelle, je vois, intrus, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/cherche-objets-fiches',
  },

  // Hero Section - FULL text from find-objects.md paragraphs 1-4
  hero: {
    title: 'Fiches Cherche les Objets',
    subtitle: 'Générateur de Fiches Maternelle pour Discrimination Visuelle',
    description: `Créez des fiches professionnelles de discrimination visuelle avec notre générateur. Votre abonnement Accès Complet vous donne un accès illimité sans frais par fiche. Générez des fiches maternelle personnalisées parfaites pour les exercices CP et Grande Section. Téléchargez des PDF haute qualité en moins de 3 minutes.

Notre créateur de fiches à imprimer gratuit aide les enseignants à créer deux types d'activités visuelles. Le mode Je Vois invite les élèves à trouver des objets cachés parmi des distracteurs. Le mode Intrus demande aux enfants d'identifier les images non appariées. Les deux formats conviennent aux fiches maternelle et exercices CP avec niveaux de difficulté ajustables.

L'abonnement Accès Complet inclut les 33 types de générateurs de fiches. Créez des activités de discrimination visuelle combinées avec des exercices maths, apprendre à lire, et alphabet. Votre abonnement comprend la licence commerciale pour vendre vos fiches sur Teachers Pay Teachers et Etsy. La qualité professionnelle 300 DPI garantit une impression parfaite à chaque fois.

Les enseignants utilisent notre générateur pour développer les compétences de perception visuelle chez les jeunes apprenants. Les enseignants de maternelle créent des fiches simples avec moins d'objets pour développer l'attention. Les enseignants de CP conçoivent des fiches complexes avec plus d'objets et des distracteurs difficiles. Toutes les fiches se téléchargent en PDF prêtes pour la classe ou la vente commerciale.`,
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

  // Sample Gallery - REAL file paths from samples/english/find objects/
  samples: {
    sectionTitle: 'Exemples de Fiches Cherche les Objets',
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

  // Use Cases - FULL text from find-objects.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour Enseignants, Parents et Éducateurs',
    sectionDescription: 'Les fiches de discrimination visuelle servent divers contextes éducatifs et styles d\'enseignement. Les enseignants de maternelle utilisent des fiches d\'objets cachés pour développer l\'attention. Les enseignants de CP développent des compétences avancées de perception visuelle. Les parents en instruction à domicile créent des supports d\'apprentissage personnalisés. Les enseignants FLE développent le vocabulaire par contexte visuel. Les enseignants spécialisés adaptent les niveaux de difficulté aux besoins individuels. Les enseignants entrepreneurs génèrent des revenus en vendant des fiches à imprimer gratuit. Le générateur soutient tous ces utilisateurs avec une personnalisation flexible et une qualité de sortie professionnelle.',
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
    sectionDescription: 'Votre abonnement Accès Complet inclut 33 générateurs complémentaires. Combinez la discrimination visuelle avec d\'autres outils pour créer des séquences pédagogiques complètes.',
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

export default findObjectsFrContent;
