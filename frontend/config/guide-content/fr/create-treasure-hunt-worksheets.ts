import type { CreateXContent } from '../types';

export const content: CreateXContent = {
  guideId: "create-treasure-hunt-worksheets",
  locale: 'fr',

  seo: {
    titleTag: "Comment Créer des Fiches Chasse au Trésor | Guide Gratuit",
    metaDescription: "Les fiches chasse au trésor combinent observation, lecture et aventure. Créez des jeux de piste thématiques que les enfants adorent.",
    primaryKeyword: "créer chasse au trésor imprimable",
    secondaryKeywords: ["fiches chasse trésor enfants","générateur chasse trésor","jeu de piste imprimable","activité chasse PDF","chasse objets imprimable"],
    lsiKeywords: ["jeu de piste","indices","aventure","exploration","découverte","fête enfants","animation","activité extérieure"],
  },

  visuals: {
    heroImages: {
      primary: '/samples/english/treasure-hunt/sample-1.jpeg',
      primaryAlt: "Fiche imprimable create treasure hunt worksheets",
      secondary: '/samples/english/treasure-hunt/sample-2.jpeg',
      secondaryAlt: "Exemple de fiche create treasure hunt worksheets",
    },
    sampleGallery: [
      { src: '/samples/english/treasure-hunt/sample-1.jpeg', alt: "Exemple fiche treasure-hunt", caption: 'Exemple de qualité professionnelle' },
      { src: '/samples/english/treasure-hunt/sample-2.jpeg', alt: "Fiche avec corrigé treasure-hunt", caption: 'Corrigé automatique inclus' },
    ],
    youtubeId: '36keBFzJbPo',
    videoTitle: "Comment Créer des Fiches Chasse au Trésor — Tutoriel",
  },

  hero: {
    title: "Comment Créer des Fiches Chasse au Trésor",
    description: "Les fiches chasse au trésor combinent observation, lecture et aventure. Créez des jeux de piste thématiques que les enfants adorent.",
  },

  introduction: "Les chasses au trésor sont les activités les plus populaires pour les fêtes d'enfants. Nos fiches imprimables rendent l'organisation simple et rapide.",

  tutorial: {
    title: "Étape par étape : Comment Créer des Fiches Chasse au Trésor",
    steps: [
      {
        title: "Choisissez le thème",
        description: "Pirates, aventure, nature, fête et plus.",
      },
      {
        title: "Configurez les étapes",
        description: "Nombre d'indices et difficulté selon l'âge.",
      },
      {
        title: "Générez et imprimez",
        description: "Fiches d'indices prêtes à découper et cacher.",
      }
    ],
  },

  platformTips: [
    {
      platform: "Etsy",
      title: "Vendre sur Etsy",
      description: "Les chasses au trésor sont des best-sellers saisonniers (anniversaires, Halloween).",
    }
  ],

  monetization: [
    {
      title: "Kits chasse thématiques",
      description: "Pirates, détectives, explorateurs — chaque thème est un produit.",
    }
  ],

  examples: "Les kits chasse au trésor prêts à l'emploi se vendent entre 4,99€ et 9,99€ sur Etsy avec de fortes marges.",

  faq: [
    {
      question: "Pour quel âge ?",
      answer: "4–12 ans. Les indices sont adaptables au niveau de lecture.",
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
    { slug: "treasure-hunt", pageType: "app", anchorText: "Générateur Chasse au Trésor" }
  ],
};
