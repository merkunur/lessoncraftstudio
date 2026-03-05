import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "publish-puzzle-books-kdp",
  locale: 'fr',

  seo: {
    titleTag: "Publier des Livres de Puzzles sur KDP | Guide Gratuit",
    metaDescription: "Les livres de puzzles sont une catégorie KDP en pleine croissance. Ce guide couvre la publication de livres de mots mêlés, labyrinthes, sudoku et mots croi",
    primaryKeyword: "publier livres puzzles kdp",
    secondaryKeywords: ["livre puzzles amazon","cahier puzzles KDP","puzzle book publication","publier jeux amazon","livres jeux enfants KDP"],
    lsiKeywords: ["mots mêlés livre","sudoku livre","labyrinthe livre","mots croisés livre","compilation","formatage","couverture","catégorie"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/wordsearch/sample-1.jpeg',
      primaryAlt: "Fiche imprimable publish puzzle books kdp",
      secondary: '/samples/english/wordsearch/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche publish puzzle books kdp",
    },
    sampleGallery: [
      { src: '/samples/english/wordsearch/sample-1.jpeg', alt: "Exemple fiche wordsearch", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/wordsearch/sample-2.jpeg', alt: "Fiche avec corrigé wordsearch", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Publier des Livres de Puzzles sur KDP — Tutoriel",
  },

  hero: {
    title: "Publier des Livres de Puzzles sur KDP",
    description: "Les livres de puzzles sont une catégorie KDP en pleine croissance. Ce guide couvre la publication de livres de mots mêlés, labyrinthes, sudoku et mots croisés.",
  },

  introduction: "Les livres de puzzles sont parmi les mieux vendus en KDP enfants et adultes. La demande est constante et le contenu est facile à générer avec nos outils.",

  tutorial: {
    title: "Étape par étape : Publier des Livres de Puzzles sur KDP",
    steps: [
      {
        title: "Générez 50–100 puzzles",
        description: "Utilisez nos générateurs pour créer du contenu unique rapidement.",
      },
      {
        title: "Compilez en PDF conforme",
        description: "Respectez les spécifications KDP (300 DPI, marges, fond perdu).",
      },
      {
        title: "Créez une couverture attractive",
        description: "La couverture fait 80% de la décision d'achat sur Amazon.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Amazon KDP",
      title: "Publication KDP puzzles",
      description: "Catégorie 'Activity Books' pour enfants, 'Puzzle Books' pour adultes.",
    }
  ],

  monetization: [
    {
      title: "Séries thématiques",
      description: "Animaux vol. 1, vol. 2, vol. 3... Créez des séries.",
    }
  ],

  examples: "Un livre de 100 mots mêlés à 6,99€ peut générer 2€+ de redevance par vente.",

  faq: [
    {
      question: "Quel type de puzzle se vend le mieux?",
      answer: "Les mots mêlés dominent en volume. Les sudoku ont les meilleures marges.",
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
