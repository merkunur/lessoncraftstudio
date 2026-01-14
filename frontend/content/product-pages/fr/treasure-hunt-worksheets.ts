import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Treasure Hunt Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/treasure-hunt-worksheets.ts
 * URL: /fr/apps/chasse-au-tresor-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/treasure-hunt.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 *
 * PRICING: Accès Complet = 240€/an (Accès Complet)
 * App ID: treasure-hunt
 */

export const treasureHuntFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'chasse-au-tresor-fiches',
    appId: 'treasure-hunt',
    title: 'Fiches Chasse au Trésor à Imprimer Gratuit - Générateur de Fiches Maternelle et CP avec Directions',
    description: 'Créez des fiches chasse au trésor professionnelles en moins de 3 minutes. Votre abonnement Accès Complet à 240 € par an vous donne un accès illimité à notre générateur. Créez autant de fiches maternelle que vous le souhaitez. Parfait pour enseigner les directions spatiales aux élèves de maternelle, CP et CE1.',
    keywords: 'fiches chasse au trésor, fiches à imprimer gratuit, fiches maternelle, exercices CP, directions spatiales, exercices CE1, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, tables de multiplication',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/chasse-au-tresor-fiches',
  },

  // Hero Section - FULL text from French treasure-hunt.md Section 1
  hero: {
    title: 'Générateur de Fiches Chasse au Trésor',
    subtitle: 'Fiches à Imprimer - Exercices Maternelle et CP avec Directions',
    description: `Créez des fiches chasse au trésor professionnelles en moins de 3 minutes. Votre abonnement Accès Complet à 240 € par an vous donne un accès illimité à notre générateur. Créez autant de fiches maternelle que vous le souhaitez, sans frais supplémentaires par fiche. Parfait pour enseigner les directions spatiales aux élèves de maternelle, CP et CE1.

Les fiches chasse au trésor combinent l'apprentissage des directions avec le plaisir de la résolution de problèmes. Vos élèves suivent des instructions écrites pour trouver le trésor sur une grille de 3×3. Choisissez entre des directions de base (haut/bas/gauche/droite) pour la maternelle ou des directions cardinales (nord/sud/est/ouest) pour les élèves de CE1 et plus. Le générateur crée automatiquement les indices et la fiche corrigée.

Notre générateur propose deux types de vocabulaire de directions adaptés à l'âge des élèves. Les directions de base conviennent parfaitement aux élèves de maternelle et CP qui apprennent les concepts spatiaux fondamentaux. Les directions cardinales sont idéales pour les élèves de CE1 et CE2 qui étudient la géographie et l'orientation. Téléchargez vos fiches en PDF ou JPEG haute résolution de 300 DPI, prêtes à imprimer.`,
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

  // Sample Gallery - REAL file paths from samples/english/treasure hunt/
  samples: {
    sectionTitle: 'Exemples de Fiches Chasse au Trésor',
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

  // Use Cases - FULL text from French treasure-hunt.md Section 4
  useCases: {
    sectionTitle: 'Parfait pour Enseignants, Parents et Éducateurs - Fiches Maternelle et Exercices CP pour Tous les Besoins',
    sectionDescription: 'Les fiches chasse au trésor conviennent à de nombreux contextes éducatifs différents. Les enseignants de maternelle les utilisent pour enseigner les directions spatiales. Les parents en IEF créent des exercices personnalisés. Les enseignants FLE intègrent le vocabulaire des directions. Les éducateurs spécialisés adaptent la difficulté pour leurs élèves. Les enseignants entrepreneurs vendent leurs créations en ligne. Découvrez comment chaque groupe bénéficie de ce générateur polyvalent.',
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

  // Related Apps - From French treasure-hunt.md Section 7
  relatedApps: {
    sectionTitle: 'Combinez les Fiches Chasse au Trésor avec d\'Autres Générateurs - Paquets Complets',
    sectionDescription: 'Les enseignants créent des paquets d\'apprentissage thématiques en combinant plusieurs types de fiches. Les fiches chasse au trésor se combinent parfaitement avec nos 32 autres générateurs. Votre abonnement Accès Complet à 240 € par an vous donne accès à tous les générateurs.',
    ctaTitle: 'Prêt à Créer des Fiches Exceptionnelles ?',
    ctaDescription: 'Rejoignez des milliers d\'enseignants qui créent des fiches professionnelles. Génération illimitée, licence commerciale incluse.',
    primaryCtaText: 'Commencer l\'Essai Gratuit',
    secondaryCtaText: 'Voir les 33 Applications',
    badgeText: 'Fonctionne Bien Avec',
    exploreText: 'Explorer toutes les applications',
    trustBadges: {
      securePayment: 'Paiement sécurisé',
      cancelAnytime: 'Annulez à tout moment',
    },
    items: [],
  },
};

export default treasureHuntFrContent;
