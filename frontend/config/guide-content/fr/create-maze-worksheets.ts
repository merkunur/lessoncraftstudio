import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-maze-worksheets",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Fiches de Labyrinthes | Guide Gratuit",
    metaDescription: "Les labyrinthes développent la planification, la résolution de problèmes et la motricité fine. Créez des labyrinthes thématiques de difficulté ajustable.",
    primaryKeyword: "créer labyrinthes imprimables",
    secondaryKeywords: ["générateur labyrinthe","fiches labyrinthe maternelle","labyrinthes enfants PDF","puzzles labyrinthe éducatif","labyrinthe imprimable"],
    lsiKeywords: ["résolution problèmes","planification","motricité fine","parcours","chemin","stratégie","patience","persévérance"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/maze/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create maze worksheets",
      secondary: '/samples/english/maze/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create maze worksheets",
    },
    sampleGallery: [
      { src: '/samples/english/maze/sample-1.jpeg', alt: "Exemple fiche maze", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/maze/sample-2.jpeg', alt: "Fiche avec corrigé maze", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Fiches de Labyrinthes — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Fiches de Labyrinthes",
    description: "Les labyrinthes développent la planification, la résolution de problèmes et la motricité fine. Créez des labyrinthes thématiques de difficulté ajustable.",
  },

  introduction: "Les labyrinthes sont un classique indémodable qui développe des compétences cognitives cruciales tout en divertissant. Notre générateur crée des labyrinthes uniques à chaque génération.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Fiches de Labyrinthes",
    steps: [
      {
        title: "Définissez la difficulté",
        description: "Simple (peu de chemins) à complexe (multiples impasses).",
      },
      {
        title: "Sélectionnez un thème",
        description: "Le labyrinthe peut être décoré avec des images thématiques.",
      },
      {
        title: "Générez et exportez",
        description: "PDF avec labyrinthe et solution sur page séparée.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Vendre sur Etsy",
      description: "Les labyrinthes sont un complément parfait aux packs d'activités.",
    },
    {
      platform: "Amazon KDP",
      title: "Cahier labyrinthes KDP",
      description: "Les cahiers de labyrinthes sont populaires en KDP enfants.",
    }
  ],

  monetization: [
    {
      title: "Cahier labyrinthes progressif",
      description: "50–100 labyrinthes du plus simple au plus complexe.",
    }
  ],

  examples: "Les cahiers de labyrinthes se vendent bien toute l'année. Idéal pour les trajets et les salles d'attente.",

  faq: [
    {
      question: "Les labyrinthes sont-ils uniques ?",
      answer: "Oui, chaque génération crée un parcours entièrement nouveau.",
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
    { slug: "maze", pageType: "app", anchorText: "Générateur de Labyrinthes" }
  ],
};
