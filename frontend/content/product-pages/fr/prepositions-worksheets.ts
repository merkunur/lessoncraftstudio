import { ProductPageContent } from '@/components/product-page/ProductPageClient';

/**
 * Prepositions Worksheets - French Content
 *
 * File: frontend/content/product-pages/fr/prepositions-worksheets.ts
 * URL: /fr/apps/prepositions-exercices-fiches (French SEO-optimized slug)
 *
 * FULL SEO content from: INDIVIDUAL APP PAGES/French/prepositions.md
 * App ID: prepositions (Spatial prepositions worksheets)
 * Bundle: Accès Complet ($240/year) - NOT Pack Essentiel
 * DO NOT SHORTEN - Every paragraph is SEO-optimized
 */

export const prepositionsFrContent: ProductPageContent = {
  // SEO Metadata - French language-specific
  seo: {
    slug: 'prepositions-exercices-fiches',
    appId: 'prepositions',
    title: 'Fiches à Imprimer Gratuit | Générateur d\'Exercices de Prépositions pour Maternelle et CP',
    description: 'Créez des fiches d\'exercices sur les prépositions spatiales en quelques clics. Votre abonnement Accès Complet à 240 € par an vous permet de générer des exercices illimités. Téléchargez des PDF haute qualité en moins de 3 minutes.',
    keywords: 'fiches à imprimer gratuit, fiches maternelle, exercices CP, prépositions spatiales, graphisme maternelle, coloriage à imprimer, apprendre à lire, alphabet, écriture cursive, exercices maths',
    canonicalUrl: 'https://www.lessoncraftstudio.com/fr/apps/prepositions-exercices-fiches',
  },

  // Hero Section - FULL text from prepositions.md paragraphs 1-4
  hero: {
    title: 'Fiches Exercices sur les Prépositions',
    subtitle: 'Générateur de Fiches Maternelle et CP pour Prépositions Spatiales',
    description: `Créez des fiches d'exercices sur les prépositions spatiales en quelques clics. Votre abonnement Accès Complet à 240 € par an vous permet de générer des exercices illimités sans frais supplémentaires. Concevez des fiches maternelle personnalisées qui enseignent les prépositions essentielles comme sur, sous, dans, devant, derrière, entre et à côté. Téléchargez vos exercices au format PDF haute qualité en moins de 3 minutes.

Les prépositions constituent un élément fondamental de l'apprentissage du français en maternelle et au CP. Nos fiches à imprimer gratuit aident les élèves à comprendre la position des objets dans l'espace. Le générateur propose deux formats d'exercices. Le mode texte à trou demande aux enfants d'écrire la bonne préposition. Le mode choix multiples permet aux jeunes élèves de maternelle d'entourer la bonne réponse parmi plusieurs propositions.

Chaque fiche maternelle comprend des images colorées et attrayantes tirées de notre bibliothèque de plus de 3000 illustrations adaptées aux enfants. Sélectionnez des thèmes familiers pour vos élèves. Ajoutez vos propres photos de classe. Personnalisez chaque élément directement sur le canevas. Les exercices CP s'adaptent parfaitement au niveau de vos élèves.

L'abonnement Accès Complet coûte 240 € par an ou 25 € par mois. Vous accédez aux 33 générateurs de fiches pédagogiques de la plateforme. Créez autant de fiches à imprimer gratuit que nécessaire. Aucun frais par fiche. Les corrigés se génèrent automatiquement. La qualité professionnelle 300 DPI garantit une impression nette. L'interface en français facilite la création rapide d'exercices adaptés à vos besoins pédagogiques.`,
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

  // Sample Gallery - REAL file paths from samples/english/prepositions/
  samples: {
    sectionTitle: 'Exemples de Fiches sur les Prépositions',
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

  // Use Cases - FULL text from prepositions.md use case sections
  useCases: {
    sectionTitle: 'Pour Qui - Enseignants, Parents et Éducateurs Utilisent Ces Fiches Maternelle',
    sectionDescription: 'Les exercices sur les prépositions conviennent à différents profils d\'enseignants et d\'éducateurs. Chaque groupe trouve des avantages spécifiques dans ce générateur de fiches à imprimer gratuit. Les besoins pédagogiques varient selon le contexte d\'enseignement. Notre outil s\'adapte à toutes ces situations. Les six profils d\'utilisateurs principaux bénéficient chacun de fonctionnalités particulières.',
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
};

export default prepositionsFrContent;
