import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "sudoku-books-kdp",
  locale: 'fr',

  seo: {
    titleTag: "Publier des Livres de Sudoku sur KDP | Guide Gratuit",
    metaDescription: "Les livres de sudoku sont un classique KDP avec une demande constante. Découvrez comment publier des cahiers de sudoku en images pour enfants.",
    primaryKeyword: "publier livres sudoku kdp",
    secondaryKeywords: ["sudoku amazon KDP","cahier sudoku publication","livre sudoku enfants","sudoku images KDP","puzzle sudoku livre"],
    lsiKeywords: ["grilles sudoku","niveaux difficulté","solutions","formatage","intérieur livre","couverture","catégorie","niche"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/picture-sudoku/sample-1.jpeg',
      primaryAlt: "Fiche imprimable sudoku books kdp",
      secondary: '/samples/english/picture-sudoku/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche sudoku books kdp",
    },
    sampleGallery: [
      { src: '/samples/english/picture-sudoku/sample-1.jpeg', alt: "Exemple fiche picture-sudoku", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/picture-sudoku/sample-2.jpeg', alt: "Fiche avec corrigé picture-sudoku", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Publier des Livres de Sudoku sur KDP — Tutoriel",
  },

  hero: {
    title: "Publier des Livres de Sudoku sur KDP",
    description: "Les livres de sudoku sont un classique KDP avec une demande constante. Découvrez comment publier des cahiers de sudoku en images pour enfants.",
  },

  introduction: "Le sudoku est un puzzle universellement populaire. Les versions en images rendent le format accessible aux enfants dès 4 ans.",

  tutorial: {
    title: "Étape par étape : Publier des Livres de Sudoku sur KDP",
    steps: [
      {
        title: "Générez 50–100 grilles",
        description: "Mix de tailles (4×4, 6×6, 9×9) et thèmes.",
      },
      {
        title: "Compilez avec solutions",
        description: "Grilles au recto, solutions à la fin du livre.",
      },
      {
        title: "Publiez sur KDP",
        description: "Catégorie Activity Books > Puzzles.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Amazon KDP",
      title: "Sudoku KDP",
      description: "Les cahiers de sudoku se vendent régulièrement.",
    }
  ],

  monetization: [
    {
      title: "Série par difficulté",
      description: "Facile, Moyen, Difficile = 3 titres minimum.",
    }
  ],

  examples: "Les livres de sudoku pour enfants ont moins de concurrence que les versions adultes.",

  faq: [
    {
      question: "Sudoku images vs chiffres?",
      answer: "Les images pour les 4–7 ans, les chiffres pour les 7+ ans. Couvrez les deux.",
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
    { slug: "picture-sudoku", pageType: "app", anchorText: "Sudoku en Images" }
  ],
};
