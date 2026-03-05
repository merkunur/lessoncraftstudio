import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "word-search-books-kdp",
  locale: 'fr',

  seo: {
    titleTag: "Publier des Livres de Mots Mêlés sur KDP | Guide Gratuit",
    metaDescription: "Les livres de mots mêlés sont la catégorie puzzle la plus vendue sur KDP. Ce guide couvre la publication de A à Z.",
    primaryKeyword: "publier livres mots mêlés kdp",
    secondaryKeywords: ["livre mots cachés amazon","word search book KDP","cahier mots mêlés publication","mots mêlés livre enfants","puzzle mots amazon"],
    lsiKeywords: ["compilation","thèmes variés","niveaux difficulté","solutions","formatage KDP","couverture","best-seller","volume"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable word search books kdp",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche word search books kdp",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Publier des Livres de Mots Mêlés sur KDP — Tutoriel",
  },

  hero: {
    title: "Publier des Livres de Mots Mêlés sur KDP",
    description: "Les livres de mots mêlés sont la catégorie puzzle la plus vendue sur KDP. Ce guide couvre la publication de A à Z.",
  },

  introduction: "Les mots mêlés sont le format de puzzle le plus accessible et le plus populaire sur Amazon. La demande est énorme et constante.",

  tutorial: {
    title: "Étape par étape : Publier des Livres de Mots Mêlés sur KDP",
    steps: [
      {
        title: "Générez 50–100 grilles thématiques",
        description: "Utilisez le mode texte pour KDP (pas d'images nécessaires).",
      },
      {
        title: "Compilez avec solutions",
        description: "Grilles numérotées avec solutions à la fin.",
      },
      {
        title: "Publiez dans la bonne catégorie",
        description: "Activity Books > Word Search pour enfants. Puzzle Books pour adultes.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Amazon KDP",
      title: "Mots mêlés KDP",
      description: "Catégorie best-seller. Fort volume, bonne passivité.",
    }
  ],

  monetization: [
    {
      title: "Séries thématiques",
      description: "Animaux, nature, voyages — un livre par thème.",
    }
  ],

  examples: "Un livre de 100 mots mêlés bien positionné peut vendre 2–5 exemplaires par jour.",

  faq: [
    {
      question: "Mode images ou texte pour KDP?",
      answer: "Texte uniquement pour KDP (impression noir et blanc). Les images augmentent les coûts d'impression.",
    },
    {
      question: "Combien co\u00fbtent les licences ?",
      answer: "Les licences individuelles co\u00fbtent 27\u202f$ (Commercial) et 47\u202f$ (Acc\u00e8s Complet). Les packs cat\u00e9gorie sont \u00e0 79\u202f$ (Commercial) et 119\u202f$ (Acc\u00e8s Complet). Chaque application est gratuite \u00e0 essayer.",
    },
    {
      question: "Quelle est votre politique de remboursement ?",
      answer: "Toutes les ventes sont d\u00e9finitives en raison de la nature num\u00e9rique du produit. Une fois qu'une cl\u00e9 de licence est livr\u00e9e et activ\u00e9e, elle ne peut \u00eatre retourn\u00e9e. Utilisez la version gratuite pour tout tester d'abord.",
    }
  ],

  internalLinks: [
    { slug: "wordsearch", pageType: "app", anchorText: "Mots Mêlés" }
  ],
};
