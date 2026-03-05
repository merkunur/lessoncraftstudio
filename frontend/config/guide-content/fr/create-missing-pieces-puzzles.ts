import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-missing-pieces-puzzles",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Fiches Pièces Manquantes | Guide Gratuit",
    metaDescription: "Les fiches pièces manquantes développent la perception spatiale et l'attention aux détails. Les enfants identifient la pièce correcte pour compléter une im",
    primaryKeyword: "créer fiches pièces manquantes",
    secondaryKeywords: ["puzzles pièces manquantes","fiches observation maternelle","missing pieces français","jeux perception visuelle","fiches compléter image"],
    lsiKeywords: ["perception spatiale","attention détails","complétion image","raisonnement spatial","puzzle visuel","observation fine","discrimination","reconstruction"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/missing-pieces/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create missing pieces puzzles",
      secondary: '/samples/english/missing-pieces/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create missing pieces puzzles",
    },
    sampleGallery: [
      { src: '/samples/english/missing-pieces/sample-1.jpeg', alt: "Exemple fiche missing-pieces", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/missing-pieces/sample-2.jpeg', alt: "Fiche avec corrigé missing-pieces", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Fiches Pièces Manquantes — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Fiches Pièces Manquantes",
    description: "Les fiches pièces manquantes développent la perception spatiale et l'attention aux détails. Les enfants identifient la pièce correcte pour compléter une image.",
  },

  introduction: "Ce format de puzzle engageant entraîne l'œil à observer les détails et développe le raisonnement spatial, des compétences clés pour la lecture et les maths.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Fiches Pièces Manquantes",
    steps: [
      {
        title: "Sélectionnez un thème",
        description: "Images thématiques avec pièces découpées aléatoirement.",
      },
      {
        title: "Configurez la difficulté",
        description: "1 pièce manquante (facile) à 3+ (difficile).",
      },
      {
        title: "Générez le PDF",
        description: "Images avec pièces candidates et corrigé.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Vendre sur Etsy",
      description: "Format unique qui se démarque des fiches classiques.",
    }
  ],

  monetization: [
    {
      title: "Pack puzzles visuels",
      description: "Combinez pièces manquantes, ombres et intrus.",
    }
  ],

  examples: "Les enseignants utilisent ces fiches en ateliers autonomes. Format idéal pour les coins activités.",

  faq: [
    {
      question: "C'est quoi exactement ?",
      answer: "Une image avec une zone manquante et plusieurs choix de pièces. L'enfant trouve la bonne.",
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
    { slug: "missing-pieces", pageType: "app", anchorText: "Générateur Pièces Manquantes" }
  ],
};
