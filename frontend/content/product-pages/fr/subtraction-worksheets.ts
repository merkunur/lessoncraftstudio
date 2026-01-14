import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Subtraction Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/subtraction-worksheets.ts
 * URL: /fr/apps/soustraction-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/subtraction.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Accès Complet = 240€/an (Accès Complet)
 * App ID: subtraction
 */

export const subtractionFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'soustraction-fiches',
    appId: 'subtraction',
    title: 'Générateur de Fiches de Soustraction - Exercices Maths à Imprimer - Fiches Maternelle et CP',
    description: 'Créez des exercices de soustraction visuels avec notre générateur de fiches à imprimer. Générez des exercices maths adaptés aux élèves de maternelle, CP et CE1 avec des images qui rendent la soustraction concrète et amusante. Téléchargez des PDF haute qualité en moins de 3 minutes.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices maths, exercices CP, soustraction, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, tables de multiplication, exercices CE1',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/soustraction-fiches',
  },

  // Hero Section - FULL text from French subtraction.md Section 1
  hero: {
    title: 'Générateur de Fiches de Soustraction',
    subtitle: 'Exercices Maths à Imprimer - Fiches Maternelle et CP',
    description: `Créez des exercices de soustraction visuels avec notre générateur de fiches à imprimer. Votre abonnement Accès Complet vous donne accès illimité à la création de fiches sans frais supplémentaires par fiche. Générez des exercices maths adaptés aux élèves de maternelle, CP et CE1 avec des images qui rendent la soustraction concrète et amusante. Téléchargez vos fiches de soustraction en format PDF haute qualité en moins de 3 minutes.

Notre générateur transforme la soustraction en activité visuelle captivante pour les jeunes élèves. Utilisez plus de 3000 images adaptées aux enfants pour créer des exercices de calcul où les élèves peuvent voir physiquement le concept de retirer des objets. Choisissez parmi quatre modes différents : barrer des images (traditionnel), image moins chiffre, trouver le nombre soustrait, ou exercices mixtes. Personnalisez le niveau de difficulté de 2 à 20 pour correspondre exactement aux capacités de vos élèves. Chaque fiche génère automatiquement un corrigé, vous faisant gagner un temps précieux.

Les enseignants de maternelle et de CP utilisent ces fiches de soustraction pour enseigner les premières notions de calcul. Les images concrètes aident les enfants à comprendre que soustraire signifie enlever ou retirer. Parfait pour compléter vos exercices maths quotidiens, ces fiches à imprimer offrent une approche multisensorielle de la soustraction. Modifiez chaque élément sur le canevas après génération : déplacez les images, changez les couleurs, ajoutez du texte personnalisé. Exportez en 300 DPI pour une qualité professionnelle parfaite pour l'impression en classe ou la vente sur Teachers Pay Teachers.`,
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

  // Sample Gallery - REAL file paths from samples/english/subtraction/
  samples: {
    sectionTitle: 'Exemples de Fiches de Soustraction',
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

  // Use Cases - FULL text from French subtraction.md Section 4
  useCases: {
    sectionTitle: 'Parfait pour Enseignants et Parents - Fiches à Imprimer Gratuit pour Tous les Besoins d\'Exercices CP',
    sectionDescription: 'Notre générateur de soustraction sert différents types d\'enseignants et éducateurs. Chaque groupe trouve des applications spécifiques pour ces fiches maternelle. Les exercices visuels s\'adaptent à tous les contextes d\'apprentissage.',
    badgeText: 'Cas d\'Utilisation',
    readMoreLabel: 'Lire la suite',
    showLessLabel: 'Voir moins',
    items: [],
    benefits: [
      '33 générateurs de fiches inclus',
      'Création illimitée de fiches',
      'Bibliothèque de 3000+ images',
      'Support de 11 langues',
      'Licence commerciale POD incluse',
      'Export 300 DPI haute qualité',
      'Corrigés automatiques',
    ],
  },

  // Related Apps - From French subtraction.md Section 7
  relatedApps: {
    sectionTitle: 'Combinez Soustraction avec Autres Apps - Alphabet, Graphisme Maternelle, Tables de Multiplication',
    sectionDescription: 'Votre abonnement Accès Complet inclut 33 générateurs différents. Combinez soustraction avec autres applications pour créer cahiers pédagogiques complets.',
    ctaTitle: 'Prêt à Créer des Fiches Exceptionnelles ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches professionnelles. Génération illimitée, licence commerciale incluse.',
    primaryCtaText: 'Commencer l\'Essai Gratuit',
    secondaryCtaText: 'Voir les 33 Applications',
    badgeText: 'Fonctionne Bien Avec',
    exploreText: 'Explorer toutes les applications',
    trustBadges: {      securePayment: 'Paiement sécurisé',
      cancelAnytime: 'Annulez à tout moment',
    },
    items: [],
  },
};

export default subtractionFrContent;
