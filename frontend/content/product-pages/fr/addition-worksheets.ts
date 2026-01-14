import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Addition Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/addition-worksheets.ts
 * URL: /fr/apps/addition-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/addition.md
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const additionFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'addition-fiches',
    appId: 'image-addition',
    title: 'Fiches d\'Addition à Imprimer Gratuit | Générateur d\'Exercices Maths pour Maternelle et CP',
    description: 'Créez des fiches d\'addition professionnelles avec notre générateur d\'exercices maths. Parfait pour les enseignants de maternelle, CP et CE1. Téléchargez des fiches à imprimer gratuit en PDF haute qualité en moins de trois minutes.',
    keywords: 'fiches addition, exercices maths, fiches maternelle, fiches à imprimer gratuit, exercices CP, exercices CE1, addition avec images, générateur fiches, mathématiques maternelle, calcul visuel',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/addition-fiches',
  },

  // Hero Section - FULL text from addition.md paragraphs 1-4
  hero: {
    title: 'Générateur de Fiches d\'Addition Gratuit',
    subtitle: 'Fiches à Imprimer Gratuit pour la Maternelle et le CP',
    description: `Créez des fiches d'addition professionnelles avec notre générateur d'exercices maths. Votre abonnement Pack Essentiel à 144€ par an vous donne un accès illimité sans frais supplémentaires par fiche. Générez des fiches à imprimer gratuit parfaitement adaptées aux élèves de maternelle, CP et CE1. Téléchargez des PDF haute qualité en moins de trois minutes.

Notre créateur de fiches d'addition utilise des images colorées pour enseigner les concepts mathématiques fondamentaux. Les jeunes élèves comptent des objets visuels avant d'écrire leurs réponses. Choisissez parmi quatre modes d'exercices différents. Le mode image plus image montre des dessins pour les deux nombres. Le mode image plus nombre combine images et chiffres. Le mode trouver l'addend crée des problèmes à trous. Le mode mixte mélange différents types sur une même fiche.

Les fiches maternelle deviennent des outils pédagogiques attrayants avec notre générateur. Chaque fiche inclut automatiquement une fiche de correction pour gagner du temps de vérification. Configurez de 1 à 10 problèmes par page selon le niveau des élèves. Ajustez les nombres minimum et maximum pour contrôler la difficulté. Les exercices CP et exercices CE1 s'adaptent parfaitement aux programmes officiels français.`,
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

  // Sample Gallery - REAL file paths from samples/english/addition/
  samples: {
    sectionTitle: 'Exemples de Fiches d\'Addition',
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

  // Use Cases - FULL text from addition.md use case sections
  useCases: {
    sectionTitle: 'Parfait pour les Enseignants et les Parents',
    sectionDescription: 'Les fiches d\'addition bénéficient à de multiples contextes éducatifs. Les enseignants de maternelle utilisent les images visuelles pour introduire les concepts de comptage. Les professeurs de CP et CE1 renforcent les faits d\'addition avec une pratique répétée.',
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
    sectionTitle: 'Combinez avec d\'Autres Générateurs de Fiches',
    sectionDescription: 'Créez des paquets d\'apprentissage complets en combinant les fiches d\'addition avec ces générateurs complémentaires.',
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

export default additionFrContent;
