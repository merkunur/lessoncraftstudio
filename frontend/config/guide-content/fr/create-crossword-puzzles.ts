import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-crossword-puzzles",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Mots Croisés | Guide Gratuit",
    metaDescription: "Les mots croisés combinent vocabulaire et résolution de problèmes. Créez des grilles avec indices images pour les jeunes ou indices texte pour les plus âgé",
    primaryKeyword: "créer mots croisés imprimables",
    secondaryKeywords: ["générateur mots croisés","mots croisés enfants PDF","mots croisés éducatifs","fiches mots croisés","puzzles croisés imprimables"],
    lsiKeywords: ["indices images","indices texte","grille croisée","vocabulaire croisé","définitions","mots interconnectés","culture générale","jeu de lettres"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/crossword/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create crossword puzzles",
      secondary: '/samples/english/crossword/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create crossword puzzles",
    },
    sampleGallery: [
      { src: '/samples/english/crossword/sample-1.jpeg', alt: "Exemple fiche crossword", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/crossword/sample-2.jpeg', alt: "Fiche avec corrigé crossword", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Mots Croisés — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Mots Croisés",
    description: "Les mots croisés combinent vocabulaire et résolution de problèmes. Créez des grilles avec indices images pour les jeunes ou indices texte pour les plus âgés. Génération automatique de la grille avec placement optimal des mots.",
  },

  introduction: "Les mots croisés sont appréciés de toutes les tranches d'âge. Pour les enfants, ils renforcent le vocabulaire. Pour les adultes, ils offrent un divertissement intellectuel. Notre générateur crée des grilles optimisées automatiquement.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Mots Croisés",
    steps: [
      {
        title: "Choisissez le type d'indices",
        description: "Images pour les jeunes (maternelle/CP), texte pour les plus âgés.",
      },
      {
        title: "Sélectionnez un thème",
        description: "104 thèmes avec vocabulaire adapté à chaque langue.",
      },
      {
        title: "Générez la grille",
        description: "L'algorithme optimise le placement des mots interconnectés.",
      },
      {
        title: "Téléchargez avec corrigé",
        description: "PDF prêt à imprimer, corrigé sur page séparée.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Mots croisés Etsy",
      description: "Format populaire pour toutes les tranches d'âge.",
    },
    {
      platform: "Amazon KDP",
      title: "Livres de mots croisés",
      description: "Les livres de mots croisés pour enfants sont une niche croissante sur KDP.",
    }
  ],

  monetization: [
    {
      title: "Mots croisés thématiques",
      description: "Collections par thème avec difficulté progressive.",
    },
    {
      title: "Pack puzzle mixte",
      description: "Combinez mots croisés, mots mêlés et mots brouillés.",
    }
  ],

  examples: "Les mots croisés avec indices images sont particulièrement populaires pour les enfants de 5–8 ans. Les enseignants les utilisent comme activité de vocabulaire récompense.",

  faq: [
    {
      question: "Les grilles sont-elles générées automatiquement ?",
      answer: "Oui, l'algorithme place les mots de manière optimale avec un maximum d'intersections.",
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
    { slug: "crossword", pageType: "app", anchorText: "Générateur de Mots Croisés" },
    { slug: "create-word-search-puzzles", pageType: "guide", anchorText: "Créer des Mots Mêlés" }
  ],
};
