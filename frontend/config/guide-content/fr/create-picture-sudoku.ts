import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-picture-sudoku",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Sudoku en Images | Guide Gratuit",
    metaDescription: "Les sudoku en images rendent la logique accessible aux jeunes enfants. Au lieu de chiffres, les enfants placent des images dans une grille en respectant le",
    primaryKeyword: "créer sudoku images imprimables",
    secondaryKeywords: ["sudoku enfants images","sudoku maternelle","générateur sudoku images","puzzle logique enfants","sudoku visuel imprimable"],
    lsiKeywords: ["logique déductive","grille sudoku","pensée analytique","puzzle","images","complétion grille","raisonnement","concentration"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/picture-sudoku/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create picture sudoku",
      secondary: '/samples/english/picture-sudoku/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create picture sudoku",
    },
    sampleGallery: [
      { src: '/samples/english/picture-sudoku/sample-1.jpeg', alt: "Exemple fiche picture-sudoku", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/picture-sudoku/sample-2.jpeg', alt: "Fiche avec corrigé picture-sudoku", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Sudoku en Images — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Sudoku en Images",
    description: "Les sudoku en images rendent la logique accessible aux jeunes enfants. Au lieu de chiffres, les enfants placent des images dans une grille en respectant les règles du sudoku.",
  },

  introduction: "Le sudoku traditionnel utilise des chiffres, ce qui le rend inaccessible aux pré-lecteurs. Notre version en images permet aux enfants dès 4 ans de développer la pensée logique.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Sudoku en Images",
    steps: [
      {
        title: "Choisissez la taille de grille",
        description: "4×4 pour débutants, 6×6 pour intermédiaires, 9×9 pour avancés.",
      },
      {
        title: "Sélectionnez un thème",
        description: "Les images du thème remplissent la grille.",
      },
      {
        title: "Générez avec solution",
        description: "PDF avec grille partiellement remplie et solution complète.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Vendre sur Etsy",
      description: "Les sudoku en images sont un créneau unique et peu saturé.",
    },
    {
      platform: "Amazon KDP",
      title: "Livres sudoku enfants",
      description: "Les cahiers de sudoku enfants sont en croissance sur KDP.",
    }
  ],

  monetization: [
    {
      title: "Cahier sudoku progressif",
      description: "Du 4×4 au 9×9, progression douce vers le sudoku classique.",
    }
  ],

  examples: "Les sudoku en images sont utilisés dans les classes Montessori pour développer la logique dès le plus jeune âge.",

  faq: [
    {
      question: "Dès quel âge ?",
      answer: "Dès 4 ans avec les grilles 4×4. Les grilles 9×9 conviennent aux 8+ ans.",
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
    { slug: "picture-sudoku", pageType: "app", anchorText: "Générateur Sudoku Images" }
  ],
};
