import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-word-search-puzzles",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Mots Mêlés | Guide Gratuit",
    metaDescription: "Les mots mêlés sont le format de puzzle le plus polyvalent et le plus vendu dans le marché des imprimables. Créez des grilles personnalisées avec images ou",
    primaryKeyword: "créer mots mêlés imprimables",
    secondaryKeywords: ["générateur mots mêlés","mots cachés imprimables","fiches mots mêlés PDF","puzzles mots enfants","mots mêlés éducatifs"],
    lsiKeywords: ["grille de lettres","vocabulaire","reconnaissance mots","orthographe","lecture","mots horizontaux","mots diagonaux","difficulté ajustable"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create word search puzzles",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create word search puzzles",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Mots Mêlés — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Mots Mêlés",
    description: "Les mots mêlés sont le format de puzzle le plus polyvalent et le plus vendu dans le marché des imprimables. Créez des grilles personnalisées avec images ou listes de mots, difficulté ajustable et 104 thèmes illustrés.",
  },

  introduction: "Les mots mêlés renforcent le vocabulaire, l'orthographe et la reconnaissance de mots tout en divertissant. Notre générateur produit des grilles uniques à chaque génération avec placement aléatoire des mots.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Mots Mêlés",
    steps: [
      {
        title: "Choisissez le mode",
        description: "Mode images (indices visuels) ou mode texte (liste de mots). Le mode texte est idéal pour KDP.",
      },
      {
        title: "Sélectionnez un thème ou entrez vos mots",
        description: "104 thèmes prédéfinis ou liste personnalisée.",
      },
      {
        title: "Configurez la grille",
        description: "Taille, directions (horizontal, vertical, diagonal, inversé), difficulté.",
      },
      {
        title: "Générez avec corrigé",
        description: "PDF avec puzzle et corrigé généré automatiquement.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Best-seller Etsy",
      description: "Les mots mêlés thématiques sont parmi les produits les plus vendus sur Etsy éducation.",
    },
    {
      platform: "Amazon KDP",
      title: "Livres de mots mêlés KDP",
      description: "Les livres de mots mêlés sont une catégorie KDP à très forte demande.",
    }
  ],

  monetization: [
    {
      title: "Livres thématiques",
      description: "50–100 mots mêlés par thème en cahier broché.",
    },
    {
      title: "Collections saisonnières",
      description: "Noël, Halloween, été — revenez chaque année.",
    }
  ],

  examples: "Les mots mêlés sont le produit le plus vendu de nombreux vendeurs. Un vendeur spécialisé en mots mêlés thématiques génère 500€/mois avec 30 listings Etsy.",

  faq: [
    {
      question: "Les grilles sont-elles uniques ?",
      answer: "Oui, chaque génération produit un placement de mots entièrement aléatoire.",
    },
    {
      question: "Puis-je créer des mots mêlés en français ?",
      answer: "Oui, le vocabulaire intégré inclut 11 langues dont le français.",
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
    { slug: "wordsearch", pageType: "app", anchorText: "Générateur de Mots Mêlés" },
    { slug: "create-crossword-puzzles", pageType: "guide", anchorText: "Créer des Mots Croisés" }
  ],
};
